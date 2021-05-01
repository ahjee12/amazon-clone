import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import {useStateValue} from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import skin from './skin.jpg'

function Checkout() {
    const [{basket, user}, dispatch] = useStateValue()

    return (
        <div className='checkout'>
            {/* <h1>Smash the like button</h1> */}
            <div className='checkout_left'>
                    {/* <img className='checkout_ad' src="" alt=""/> */}
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className='checkout_title_left'>Shopping Cart</h2>
                    {/* test아이템 */}
                    {/* <CheckoutProduct 
                            id ={100}
                            title='Test test test test'
                            image={skin}
                            price={200}
                            rating={5}
                    /> */}
                    {/* BasketItem */}
                    <div className="checkout_product_container">
                        {basket.map ((item) => (
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
            </div>
            <div className="checkout_right">
                {/* <h2 className='checkout_title_right'>Subtotal</h2> */}
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
