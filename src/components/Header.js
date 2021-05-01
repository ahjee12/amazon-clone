// 컴포넌트 파일 이름 첫글자는 대문자여야 함!!
import React from 'react'
import './Header.css'
import logo from './amazon_logo1.png'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// 링크
import {Link} from 'react-router-dom'
import {useStateValue} from './StateProvider'
import { auth } from '../firebase';

function Header() {
    const [{basket, user} , dispatch] = useStateValue()

    const handleAuthentication = () =>{
        if(user){
            auth.signOut()
        }
    }
    return (
        <div className='header'>
            <Link to='/'>
                <img className='header_logo' src={logo} alt="헤더 아마존 로고"/>
            </Link>

            <div className='header_search'>
                <input className='header_searchInPut' type="text"/>
                <SearchIcon className='header_searchIcon' />
            </div>
            <div className='header_nav'>
                {/*user true로 로그아웃 클릭하면 login페이지로 direct됨! / user false로 클릭할 때 login페이지로 direct되도록 하기 */}
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className='header_option'>
                        {/* user?.email || 'Guest' */}
                        <span className='header_optionLineOne'>Hello {user? user.email: 'Guest'}</span>
                        <span className='header_optionLineTwo'>{user? '로그아웃': '로그인'}</span>
                    </div>
                </Link>
                <Link to='/orders'>
                    <div className='header_option'>
                        <span className='header_optionLineOne'>Returns</span>
                        <span className='header_optionLineTwo'>&주문</span>
                    </div>
                </Link>
                <div className='header_option'>
                    <span className='header_optionLineOne'>Your</span>
                    <span className='header_optionLineTwo'>Prime</span>
                </div>

                <Link to='/checkout'>
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header_optionLineTwo header_basketCount'>{basket?.length}</span>
                    </div>
                </Link>
                
            </div>
        </div>
    )
}

export default Header
