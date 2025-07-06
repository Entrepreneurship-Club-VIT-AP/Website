"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-row items-center justify-between p-4 backdrop-blur-[5px] z-100 rounded-b-xl border-t-0 h-16 sticky top-0"
        >
            <Link
                href="/"
                className="flex flex-row justify-center items-center gap-2"
            >
                <Image
                    src="/logo.webp"
                    alt="Entrepreneurship Club Logo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <motion.div
                    className="flex flex-col justify-center items-center">
                    <p className="underline underline-offset-7 not-none:hidden none:text-sm xs:text-xl">
                        Entrepreneurship Club
                    </p>
                    <p className="text-xl not-xs:hidden">
                        VIT-AP
                    </p>
                </motion.div>
            </Link>
            <div
                className="flex flex-row gap-4">
                {
                    [{ name: "Home", href: "/" },
                    { name: "About", href: "/#about" },
                    { name: "Events", href: "/events" },
                    { name: "Contact", href: "/contact" }].map((item) => (
                        <Link
                            href={item.href}
                            key={item.name}
                            className="text-white text-xl hidden sm:block hover:text-orange-500 transition-colors duration-300"
                        >
                            {item.name}
                        </Link>
                    ))
                }
                <Image
                    src="menu.svg"
                    alt="Menu Icon"
                    width={30}
                    height={30}
                    className="cursor-pointer sm:hidden hover:scale-110 transition-transform duration-300"
                    onClick={() => {
                        setIsOpen(x => !x);
                    }}
                />
            </div>
            {isOpen && <motion.menu
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed flex flex-col top-15.5 right-2 gap-2 w-fit p-3 h-fit bg-gradient-to-b from-black/40 backdrop-blur-[10px] to-black rounded-b-xl z-100">
                {
                    [{ name: "Home", href: "/" },
                    { name: "About", href: "/#about" },
                    { name: "Events", href: "/events" },
                    { name: "Contact", href: "/contact" }].map((item) => (
                        <Link
                            href={item.href}
                            key={item.name}
                            className="text-white text-xl hover:text-orange-500 transition-colors duration-300"
                        >
                            {item.name}
                        </Link>
                    ))
                }
            </motion.menu>}
        </motion.nav>
    )
}