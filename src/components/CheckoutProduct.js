import React from 'react'
import './CheckoutProduct.css'
import {useStateValue} from './StateProvider'

function CheckoutProduct({id, title, image, price, rating, hideButton}) {
    const [{basket}, dispatch] = useStateValue()

    const removeFromBasket = () =>{
        //remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,

        })
    }

    return (
        <div className='checkoutProduct'>
            <div className="checkoutProduct_image_contaiener">
                <img className='checkoutProduct_image' src={image} alt="장바구니 상품 이미지"/>
            </div>
            <div className="checkoutProduct_info">
                <p className='checkoutProduct_title'>{title}</p>
                <p className='checkoutProduct_price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct_rating">
                     {Array(rating).fill().map(() =>(
                        <p>⭐</p>   
                    ))}
                </div>
                {!hideButton && (
                    <button className='checkoutProduct_button' onClick={removeFromBasket}>Remove from Basket <br/> 삭제하기 </button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct 