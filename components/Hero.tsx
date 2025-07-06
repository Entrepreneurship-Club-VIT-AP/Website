"use client";
import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";
import Image from "next/image";

export default function Hero() {
    
    return (
        <motion.section
            className="flex relative flex-col items-center justify-center h-[85vh] mb-[5vh] w-full my-3 p-3 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <motion.div className="flex flex-col items-center justify-center w-full h-full not-sm:-translate-y-10">
                <motion.h2
                    className="text-2xl md:text-4xl lg:text-6xl text-orange-500">
                    Build. Hustle. Thrive.
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl">
                    Welcome to the Entrepreneurship Club of VIT-AP - a dynamic platform dedicated to nurturing entrepreneurial talent and cultivating innovation among students.<br />
                    We&rsquo;re thrilled to have you here, whether you&rsquo;re a curious visitor, a budding innovator, or someone who just accidentally clicked their way into greatness. 
                </motion.p>
                <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 1 } }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    href="" className="p-3 my-5 bg-black border-orange-500 border-2 rounded-xl">Join the Club &ndash; Let&rsquo;s Build Something!</motion.a>
            </motion.div>
            <Image
                src="arrow-down.svg"
                alt="Arrow Down Icon"
                className="absolute bottom-2 left-1/2 animate-bounce cursor-pointer"
                width={30}
                height={30}
                onClick={() => {
                    const section = document.getElementById("about");
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                    }
                }}
            />
        </motion.section>
    );
}