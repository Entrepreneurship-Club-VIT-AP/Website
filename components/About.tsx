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
            className="border-white/20 border bg-gray-800/20 backdrop-blur-[10px] rounded-xl">
            <motion.div
                className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full sm:gap-20 p-10 my-3"
            >
                <h2
                    className="text-2xl text-center md:text-4xl w-full max-w-fit text-orange-500 font-bold">
                    About Us
                </h2>
                <p
                    className="text-xl md:text-2xl">
                    The Entrepreneurship Club of VIT-AP is a student-led innovation hub dedicated to empowering future founders.
                    <br />
                    We cultivate a startup mindset by connecting ideas to action, students to mentors, and vision to execution.
                    <br />
                    From workshops and seminars to live pitch events and hackathons — we help students build ventures that matter.
                </p>
            </motion.div>
            <motion.div
                className="flex flex-col sm:flex-row gap-5 items-center justify-start w-full sm:gap-20 p-10 my-3">
                <h2
                    className="text-2xl text-center md:text-4xl w-full max-w-fit text-orange-500 font-bold"
                >
                    Our Mission
                </h2>
                <p className="text-lg md:text-xl">
                    •	Ignite entrepreneurial thinking <br />
                    •	Enable practical business experience <br />
                    •	Bridge the gap between classroom and boardroom <br />
                </p>
            </motion.div>
        </motion.section>
    )
}