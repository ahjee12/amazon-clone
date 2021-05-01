import React, { useState } from 'react'
import './Login.css'
import logo from './amazon_logo1.png'
import {Link, useHistory} from 'react-router-dom'
import {auth} from '../firebase'

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = e =>{
        e.preventDefault()

        //☆firebase login
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) =>{
                console.log(auth);
                history.push('/')
            })
            // .then((auth) => {
            //     console.log(auth);
            //     if (auth) {
            //         history.push('/');
            //     }
            // })
            .catch(error => alert(error.message))

    }

    const register = e =>{
        e.preventDefault()

        //☆firebase register
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) =>{
                //successfully create a new user with email and password
                console.log(auth);
                if(auth){
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <div className="login_container_logo">
                <Link to ='/'>
                    <img className='login_logo' src={logo} alt="로그인 아마존 로고"/>
                </Link>
            </div>
            <div className="login_container_form">
                <h1>Sign in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type="password"  value={password} onChange={e => setPassword(e.target.value)}/>
                    {/* button onClick 써야 함!!! */}
                    <button className='login_signInButton' onClick={signIn}>로그인</button>
                </form>
                <p>
                    By signing-in you agree to Amazon's Conditions of Use & Sale.
                    등 등 아마존 정책
                </p>
                <button className='login_registerButton' onClick={register}>Create your amazon account</button>
            </div>
        </div>
    )
}

export default Login
