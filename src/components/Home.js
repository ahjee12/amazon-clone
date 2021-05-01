import React from 'react'
import  './Home.css'
import homeImage from './home_bg.jpg'
import Product from './Product'
import speaker from './speaker.jpg'
import bedSheet from './bed sheet.jpg'
import blackMask from './black mask.jpg'
import camera from './camera.jpg'
import shirt from './shirt.jpg'
// import skin from './skin.jpg'
import bobbyMagazine from './bobbyMagazine2.jpg'
import luckyMan from './lucky man.jpg'
import bobbySky1 from './bobbySky1.jpg'
import bobbySky2 from './bobbySky2.jpg'
import mobb from './mobb.jpg'

function Home() {
    return (
        <div className='home'>
            <div className="home__container">
                <img className='home_image' src={homeImage} alt="홈 메인 이미지"/>
                <div className="home__row">
                    {/* product */}
                    {/* product */}
                    <Product id='1' title='Lucky man album' price ={11.11} image={luckyMan} rating={1} />
                    <Product id='2' title='BedSheet' price ={22.22} image={bedSheet} rating={2} />
                </div>
                <div className="home__row">
                    {/* product */}
                    {/* product */}
                    {/* product */}
                    <Product id='3' title='mobb album' price ={33.33} image={mobb} rating={3} />
                    <Product id='4' title='bobby photo' price ={44.44} image={bobbySky1} rating={4} />
                    <Product id='5' title='bobby photo' price ={55.55} image={bobbySky2} rating={5} />
                </div>
                <div className="home__row">
                    {/* product */}
                    <Product id='6' title='Magazine Set' price ={66.66} image={bobbyMagazine} rating={1} />
                </div>
            </div>     
        </div>
    )
}

export default Home
