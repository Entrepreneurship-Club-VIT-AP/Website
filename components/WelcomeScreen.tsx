"use client";
import { motion } from 'framer-motion';
import React from 'react';

export default function WelcomeScreen({children}: {children: React.ReactNode}) {
    const [isVisible, setIsVisible] = React.useState(true);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
        {isVisible && 
            <motion.div
                className='fixed flex z-100 flex-col h-screen w-screen bg-black items-center justify-center'
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 2.7, ease: "easeInOut" }}
            >
                <motion.div
                    className='flex flex-col items-start'>
                    <motion.h1
                        className='text-white text-2xl md:text-4xl lg:text-6xl font-extrabold'
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, repeatDelay: 1, repeatType: "mirror", repeat: 1 }}
                    >ENTREPRENEURSHIP CLUB
                    </motion.h1>
                    <motion.div>
                        <motion.p
                            className='text-orange-500 font-bold text-lg md:text-xl lg:text-2xl mt-4'
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, repeatDelay: 0.5, repeatType: "mirror", repeat: 1 }}
                        >
                            Empower, Execute, Excel.
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div> }
            { !isVisible && children}
        </>
    )
}