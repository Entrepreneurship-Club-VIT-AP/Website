"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Teams", href: "/team" },
  { name: "Events", href: "/event" },
  { name: "Initiatives", href: "/initiatives" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session, status } = useSession();

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
        <motion.div className="flex flex-col justify-center items-center">
          <p className="underline underline-offset-7 not-none:hidden none:text-sm xs:text-xl">
            Entrepreneurship Club
          </p>
          <p className="text-xl not-xs:hidden">VIT-AP</p>
        </motion.div>
      </Link>

      <div className="flex flex-row gap-4 items-center">
        {navItems.map((item) => (
          <motion.div
            key={item.name}
            className="relative hidden sm:block"
            whileHover="hover"
            initial="initial"
          >
            <Link
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-white text-xl hover:text-orange-500 transition-colors duration-300 relative z-10"
            >
              {item.name}
            </Link>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
              variants={{
                initial: { width: 0 },
                hover: { width: "100%" },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.div>
        ))}

        <div className="hidden sm:flex items-center gap-2">
          {status === "loading" ? (
            <span className="text-sm text-gray-300">...</span>
          ) : session?.user ? (
            <>
              <Link
                href="/account"
                className="text-sm px-3 py-1 rounded-lg border border-orange-500/70 text-orange-300 hover:text-white hover:border-orange-400 transition-colors duration-300"
                title={session.user.email ?? "Profile"}
              >
                Account
              </Link>
              {session.user.isAdmin ? (
                <Link
                  href="/admin/events"
                  className="text-sm px-3 py-1 rounded-lg border border-white/20 hover:text-orange-300 hover:border-orange-500 transition-colors duration-300"
                >
                  Admin
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm px-3 py-1 rounded-lg border border-white/20 hover:text-orange-300 hover:border-orange-500 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/event" })}
              className="text-sm px-3 py-1 rounded-lg border border-orange-500/70 text-orange-300 hover:text-white hover:border-orange-400 transition-colors duration-300"
              title="Login"
            >
              Login
            </button>
          )}
        </div>

        <Image
          src="/menu.svg"
          alt="Menu Icon"
          width={30}
          height={30}
          className="cursor-pointer sm:hidden hover:scale-110 transition-transform duration-300"
          onClick={() => {
            setIsOpen((x) => !x);
          }}
        />
      </div>

      {isOpen && (
        <motion.menu
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed flex flex-col top-15.5 right-2 gap-2 w-fit p-3 h-fit bg-black rounded-b-xl z-100"
        >
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              className="relative"
              whileHover="hover"
              initial="initial"
            >
              <Link
                href={item.href}
                className="text-white text-xl hover:text-orange-500 transition-colors duration-300 block"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                variants={{
                  initial: { width: 0 },
                  hover: { width: "100%" },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
          <div className="pt-2 border-t border-white/10">
            {session?.user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/account"
                  className="text-white text-lg hover:text-orange-500 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Account
                </Link>
                {session.user.isAdmin ? (
                  <Link
                    href="/admin/events"
                    className="text-white text-lg hover:text-orange-500 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-white text-lg hover:text-orange-500 transition-colors duration-300 text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/event" })}
                className="text-white text-lg hover:text-orange-500 transition-colors duration-300"
              >
                Login
              </button>
            )}
          </div>
        </motion.menu>
      )}
    </motion.nav>
  );
}
