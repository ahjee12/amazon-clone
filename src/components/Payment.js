import React, {useEffect, useState}  from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import {db} from '../firebase'

function Payment() {
    const [{basket, user}, dispatch] = useStateValue()
    const history = useHistory()

    const stripe = useStripe()
    const elements = useElements()

    const [succeeded, setSucceeded] = useState(false)
    //form onSubmit
    const [processing, setProcessing] = useState("")
    //card onChange
    const [disabled, setDisabled] = useState(true)

    const [error, setError] = useState(null)
    
    const [clientSecret, setClientSecret] = useState('')

    //Stripe사용하는 법 아직 잘 이해 불가
    useEffect(() =>{

    //generate the special stripe secret which allows us to charge a  customer
    const getClientSecret = async() => {
        const response = await axios({
                method: 'post',
                //Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket)* 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret() 
    }, [basket])

    console.log('THE SECRET IS', clientSecret)

    // 결제 후 주문 정보 페이지로!!
    const handleSubmit = async(event) =>{
        //do all the fancy stripe stuff
        event.preventDefault();
        //submit하면 버튼 비활성화 
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {card: elements.getElement(CardElement)}
        }).then(({paymentIntent})=>{
            //paymentIntent = payment confirmation

            //RealTime Database 실시간 생성됨!!
            db.collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event =>{
        //do all the fancy stripe stuff
        // event.preventDefault();
        //비어있으면 버튼 작동 안 되게
        setDisabled(event.empty)
        setError(event.error? event.error.message: '')
    }


    return (
        <div className='payment'>
            <div className="payment_container">
                <h1>
                    Checkout(<Link to='/checkout'>{basket?.length} items</Link>)
                </h1>
                {/* Payment section - delivery address */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>안산, 경기도, KR etc.</p>
                    </div>
                </div>
                {/* Payment section - Review Items */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map(item=>(
                             <CheckoutProduct 
                                id ={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* Payment section - Payment method */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        {/* Stripe magic will go */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment_priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                {/* Subtotal {basket?.length} items: <strong>{`${value}`}</strong> */}
                                                Subtotal ({basket?.length} items): <strong>{value}</strong>
                                            </p>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // Part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                            </div>
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing? <p>Processing</p>: 'Buy Now 지금 구입!'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
