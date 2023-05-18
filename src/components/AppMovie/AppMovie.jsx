import React, { useEffect, useRef, useState } from 'react';
import ButtonMovie from '../ButtonMovie/ButtonMovie';
import { Animated } from 'react-animated-css';

function AppMovie() {
    const [isVisible, setIsVisible] = useState(false);
    const myRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    // set animation
    const handleScroll = () => {
        if (myRef.current && !hasAnimated) {
            const top = myRef.current.getBoundingClientRect().top;
            if (top + 100 <= window.innerHeight) {
                setIsVisible(true);
                setHasAnimated(true);
            }
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        //remove eventListener when the animation occurs first time.
        if (hasAnimated) {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [hasAnimated]);

    return (
        <div ref={myRef} id='app' className='py-5' style={{
            backgroundImage: `url(${require("../../assets/background-1.jpg")})`,
            backgroundPosition: 'center',
            backgroundSize: '100% 100%'
        }}>
            <div className='container mx-auto grid lg:grid-cols-2 grid-cols-1'>
                <Animated className='flex justify-center' animationIn="fadeInLeft" isVisible={isVisible} animationInDuration={2000}>
                    <div className='w-4/5 flex flex-col justify-center my-4 lg:m-0'>
                        <h1 className='text-white text-2xl font-bold mb-7 lg:text-left text-center'>Movie app is convenient for movie lovers</h1>
                        <p className='text-white mb-5 lg:text-left text-center'>Not only booking tickets, you can also comment on movies, score theaters and redeem attractive gifts.</p>
                        <div className='mb-5 flex lg:justify-start justify-center lg:w-2/3 w-full'>
                            <ButtonMovie px={8} py={2}>FREE APP - DOWNLOAD !</ButtonMovie>
                        </div>

                        <p className='text-white lg:text-left text-center'>AvaStream app has two versions: <span className='underline'>Android</span> & <span className='underline'>IOS</span></p>
                    </div>
                </Animated>
                <Animated className='col-span-1 flex flex-col justify-center items-center' animationIn="fadeInRight" isVisible={isVisible} animationInDuration={2000}>
                    <div className='relative flex justify-center items-center lg:h-[600px] md:h-[500px] h-[400px]' style={{
                        width: '50%'
                    }}>
                        <img className='h-full' src={require("../../assets/phone.png")} alt='phone frame' style={{ width: '80%' }} />
                        <img className='absolute rounded-3xl' src={require("../../assets/app.jpg")} alt='app' style={{
                            height: '95%',
                            top: '2.5%',
                            left: '12%',
                            width: '76%'
                        }} />
                    </div>
                </Animated>
            </div>
        </div>
    )
}

export default AppMovie