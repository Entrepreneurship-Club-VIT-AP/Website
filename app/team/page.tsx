"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import teamsData from "../../team.json";
import Image from "next/image";

export default function TeamPage() {
    const [activeTab, setActiveTab] = useState(0);
    const membersRef = useRef<HTMLElement>(null);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        // Scroll to the members section with a small delay to allow content to update
        setTimeout(() => {
            if (membersRef.current) {
                membersRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.6
            }
        }
    };

    const memberVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.4 }
        },
        hover: {
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="w-full">
            <motion.div
                className="py-10 px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Hero Section */}
                <motion.section
                    className="text-center mb-16 px-4"
                    variants={itemVariants}
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-orange-500 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        👥 Our Teams
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl max-w-4xl mx-auto text-orange-300/90 leading-relaxed"
                        variants={itemVariants}
                    >
                        We&apos;re not just one team &mdash; we&apos;re an ecosystem of passionate individuals working together to build something extraordinary.
                    </motion.p>
                </motion.section>

                {/* Team Tabs */}
                <motion.section 
                    className="max-w-7xl mx-auto mb-12"
                    variants={itemVariants}
                >
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {teamsData.teams.map((team, index) => (
                            <motion.button
                                key={index}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    activeTab === index
                                        ? 'bg-orange-500 text-white shadow-lg'
                                        : 'bg-orange-500/10 text-orange-300 border border-orange-500/30 hover:bg-orange-500/20'
                                }`}
                                onClick={() => handleTabClick(index)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                layout
                            >
                                {team.department}
                            </motion.button>
                        ))}
                    </div>
                </motion.section>

                {/* Team Members */}
                <motion.section className="max-w-7xl mx-auto" ref={membersRef}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.h2 
                                className="text-3xl font-bold text-orange-500 text-center mb-8"
                            >
                                {teamsData.teams[activeTab].department}
                            </motion.h2>
                            
                            <motion.div 
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                            >
                                {teamsData.teams[activeTab].members.map((member, memberIndex) => {
                                    const CardContent = (
                                        <motion.div
                                            className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 backdrop-blur-[10px] rounded-xl overflow-hidden relative group cursor-pointer"
                                            variants={memberVariants}
                                            whileHover="hover"
                                        >
                                            {/* Member Photo with overlay text */}
                                            <motion.div 
                                                className="relative w-full aspect-[3/4] overflow-hidden"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Image
                                                    src={member.photo}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover object-top"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = '/logo.webp'; // Fallback image
                                                    }}
                                                />
                                                
                                                {/* LinkedIn Link - Top Right */}
                                                {member.linkedin && (
                                                    <motion.div
                                                        className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200 shadow-lg"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <svg 
                                                            className="w-4 h-4 text-white" 
                                                            fill="currentColor" 
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                        </svg>
                                                    </motion.div>
                                                )}
                                                
                                                {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                
                                                {/* Text overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                                    <motion.h3 
                                                        className="text-xl font-bold text-white mb-1 drop-shadow-lg"
                                                    >
                                                        {member.name}
                                                    </motion.h3>
                                                    
                                                    <motion.p 
                                                        className="text-orange-300 text-sm font-medium drop-shadow-lg"
                                                    >
                                                        {member.role}
                                                    </motion.p>
                                                </div>
                                            </motion.div>

                                            {/* Subtle hover effect */}
                                            <motion.div 
                                                className="absolute inset-0 bg-orange-500/10 opacity-0"
                                                whileHover={{ opacity: 1 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </motion.div>
                                    );

                                    return (
                                        <div key={memberIndex}>
                                            {member.linkedin ? (
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block"
                                                >
                                                    {CardContent}
                                                </a>
                                            ) : (
                                                CardContent
                                            )}
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </motion.section>

                {/* Call to Action */}
                <motion.section
                    className="text-center mt-20"
                    variants={itemVariants}
                >
                    <motion.div
                        className="border-white/10 border backdrop-blur-[10px] rounded-xl p-8 max-w-2xl mx-auto relative overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ 
                            scale: 1.01,
                            borderColor: "rgba(252, 86, 3, 0.3)"
                        }}
                    >
                        <motion.h3 
                            className="text-2xl font-bold text-orange-500 mb-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            Ready to Join Our Ecosystem?
                        </motion.h3>
                        <p className="text-orange-300/90 mb-6">
                            Each team plays a crucial role in our success. Find your passion, contribute your skills, 
                            and be part of building the future of entrepreneurship at VIT-AP.
                        </p>
                        <motion.a
                            href="/contact"
                            className="inline-block px-6 py-3 bg-orange-500 rounded-xl text-white font-semibold relative overflow-hidden"
                            whileHover={{ 
                                scale: 1.05,
                                backgroundColor: "#e04503",
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                            />
                            Get Involved
                        </motion.a>
                    </motion.div>
                </motion.section>
            </motion.div>
        </div>
    );
}