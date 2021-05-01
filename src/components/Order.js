import React from 'react'
import './Order.css'
import moment from 'moment'
import CheckoutProduct from './CheckoutProduct'
import CurrencyFormat from 'react-currency-format';

function Order({order}) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p className='order_moment'>{moment.unix(order.data.created).format('MMMM Do YYYY, h: mma')}</p>
            <p className='order_id'>
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item =>(
                <CheckoutProduct 
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    // 버튼 숨기기 checkoutProduct에 hideButton 
                    hideButton
                />
            ))}
            <CurrencyFormat 
                renderText={(value) =>(
                    <>
                        <p>Order Total: <strong>{value}</strong></p>
                    </>
                )}

                decimalScale = {2}
                value = {order.data.amount / 100}
                displayType = {'text'}
                thousandSeparator = {true}
                prefix = {"$"}
            />
           
        </div>
    )
}

export default Order
