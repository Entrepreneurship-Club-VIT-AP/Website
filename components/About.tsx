"use client";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
    return (
        <motion.section
            id="about"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="border-white/10 border backdrop-blur-[10px] rounded-xl">
            <motion.div
                className="flex flex-col gap-5 items-center justify-center w-full p-10 my-3"
            >
                <h2
                    className="text-2xl text-center md:text-4xl w-full max-w-fit text-orange-500 font-bold">
                    About Us
                </h2>
                <p
                    className="text-lg md:text-xl">
                    We, The Entrepreneurship Club of VIT-AP is a playground for innovators, founders, and creators driven by passion, big ideas, and those random 3 AM thoughts (yes, usually powered by some premium coffee) <br />
                    Whether it&rsquo;s hosting exciting competitions, hands-on workshops, inspiring seminars, or classic hackathons&mdash;we have it all! And of course, we can&rsquo;t forget our favorite live-pitch Shark Tank events that bring ideas to life.
                </p>
            </motion.div>
            <motion.div
                className="flex flex-col gap-5 items-center justify-start w-full p-10 my-3">
                <h2
                    className="text-2xl text-center md:text-4xl w-full max-w-fit text-orange-500 font-bold"
                >
                    Our Mission
                </h2>
                <p className="text-lg md:text-xl">
                    If you&rsquo;re someone with an idea, an ambition, or simply the drive to build something meaningful, this is where it begins. <br />
                    At the Entrepreneurship Club of VIT-AP, we are not just shaping dreamers. We are developing doers. You will gain the mindset to innovate, the courage to take risks, and the leadership to turn ideas into real-world impact. <br />
                    Because here, you do not just learn entrepreneurship.&nbsp;You&nbsp;live&nbsp;it.
                </p>
            </motion.div>
        </motion.section>
    )
}