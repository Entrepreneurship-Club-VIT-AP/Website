"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="mt-5 p-10 grid grid-cols-2 backdrop-blur-[10px]"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(2, 2, 2,0.3) 100%)" }}
        >
            <motion.div
                className="flex flex-col text-lg justify-center items-center gap-2">
                <motion.p className="justify-self-center">Entrepreneurship Club, VIT-AP.</motion.p>
                <motion.p className="justify-self-center">© 2025 All rights reserved</motion.p>
                <motion.p className="justify-self-center">Made with ❤️ by the Technical Team</motion.p>
            </motion.div>
            <motion.div className="flex flex-col justify-center text-lg items-center gap-2">
                <motion.p className="justify-self-center">Follow us on:</motion.p>
                <motion.div className="flex flex-wrap gap-2 justify-center items-center">
                    <Link href="https://www.instagram.com/entrepreneurshipclub_vitap/" target="_blank" rel="noopener noreferrer" className="text-orange-500">Instagram</Link>
                    <Link href="https://www.linkedin.com/company/entrepreneurship-club-vit-ap/" target="_blank" rel="noopener noreferrer" className="text-orange-500">LinkedIn</Link>
                    <Link href="https://vitap.ac.in" target="_blank" rel="noopener noreferrer" className="text-orange-500">VIT-AP University</Link>
                </motion.div>
            </motion.div>
        </motion.footer>
    );
}