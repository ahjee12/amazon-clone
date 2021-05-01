import React from 'react'
import './Subtotal.css'
//react-currency-format 설치! -force,  등 해야함
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from './StateProvider'
import { getBasketTotal } from './reducer';
import {Link, useHistory} from 'react-router-dom'

function Subtotal() {
    const history = useHistory()
    const [{basket} , dispatch] = useStateValue()

    return (
        <div className = 'subtotal'>
            <CurrencyFormat 
                renderText={(value) =>(
                    <>
                        <p>Subtotal ({basket.length} items): <strong>{value}</strong></p>
                        <small className='subtotal_gift'>
                            <input type="checkbox"/> This order contains a gift
                        </small>
                    </>
                )}

                decimalScale = {2}
                value = {getBasketTotal(basket)}
                displayType = {'text'}
                thousandSeparator = {true}
                prefix = {"$"}
            />
            {/* /payment 페이지 없는 경우 디폴트로 route path = '/' 메인 페이지로 감 */}
            <button className = 'subtotal_button' onClick={e => history.push('/payment')} >Proceed to Checkout <br/>결제하기</button>
        </div>
    )
}

export default Subtotal
