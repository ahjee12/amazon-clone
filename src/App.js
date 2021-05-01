import './App.css';
import Header from './components/Header';
import Home from './components/Home'
// 라우터
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './components/Checkout'
import Login from './components/Login'
import React, {useEffect} from 'react'
import {auth} from './firebase'
import {useStateValue} from './components/StateProvider'
import Payment from './components/Payment'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from './components/Orders'

const promise = loadStripe('pk_test_51IkPqiGLEib1NsjWofT27F3zuvusuRBh8ZyYrrDi3LO01l0SJgMCSZ9vxOMa0LKsotMmVwpI8Adddb2e0zF7WClr00cdAMW0h7')

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
    // will only run once when the app component loads [user, basket]으로 작성하면 바뀔 때마다 실행
    auth.onAuthStateChanged(authUser =>{
      console.log('The user is ', authUser);
      if(authUser){
        // the user just logged in / the user was logged in
        dispatch({ 
          type: 'SET_USER',
          user: authUser
        })
      }else{
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    // 라우터로 모두 묶기 -> switch -> route
    <Router>
    <div className="App">
      {/* <h1>Hello Programmers, let's build the Amazon Store</h1> */}
      <Switch>
        <Route path='/orders'>
          <Header />
          <Orders />
        </Route>
        <Route path='/login'>
          {/* <h1>Login page</h1> */}
          <Login />
        </Route>
        <Route path='/checkout'>
          {/* Header */}
          <Header />
          {/* <h1>I am a checkout, smash the like button </h1> */}
          <Checkout />
        </Route>
        <Route path='/payment'>
          {/* Header */}
          <Header />
          {/* <h1>I am the payment route</h1> */}
          {/* stripe묶기 */}
          <Elements stripe = {promise}>
             <Payment />
          </Elements>
        </Route>
        <Route path='/'>
          {/* Header */}
          <Header />
          {/* Home */}
          <Home />
        </Route>
      </Switch>

    </div>
    </Router>
  );
}

export default App;
