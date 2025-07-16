"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Teams() {
    const teams = [
        {
            name: "Innovation & Research",
            description: "Discover market trends, validate ideas",
            icon: "🔬"
        },
        {
            name: "Marketing & PR",
            description: "Spread the word, build the brand",
            icon: "📢"
        },
        {
            name: "Design & Tech",
            description: "Turn wireframes into wow",
            icon: "💻"
        },
        {
            name: "Partnerships & Sponsorships",
            description: "Collaborate to grow",
            icon: "🤝"
        },
        {
            name: "Operations",
            description: "Behind-the-scenes magic makers",
            icon: "⚙️"
        }
    ];

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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.4 }
        },
        hover: {
            scale: 1.02,
            y: -5,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.section
            id="teams"
            className="border-white/10 border backdrop-blur-[10px] rounded-xl my-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.div
                className="flex flex-col gap-8 items-center justify-center w-full p-10"
            >
                <motion.h2
                    className="text-2xl text-center md:text-4xl w-full max-w-fit text-orange-500 font-bold"
                    variants={itemVariants}
                >
                    👥 Teams
                </motion.h2>
                
                <motion.p
                    className="text-lg md:text-xl text-center max-w-2xl text-orange-300/90"
                    variants={itemVariants}
                >
                    We&apos;re not just one team &mdash; we&apos;re an ecosystem
                </motion.p>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
                    variants={containerVariants}
                >
                    {teams.map((team, index) => (
                        <motion.div
                            key={index}
                            className="border-orange-500/30 border backdrop-blur-[10px] rounded-xl p-6 relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-600/10"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <motion.div 
                                className="text-4xl mb-4"
                                whileHover={{ 
                                    scale: 1.1,
                                    rotate: [0, -5, 5, 0]
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {team.icon}
                            </motion.div>
                            
                            <motion.h3 
                                className="text-xl font-bold text-orange-500 mb-3"
                            >
                                {team.name}
                            </motion.h3>
                            
                            <motion.p 
                                className="text-orange-300/80 text-sm leading-relaxed"
                            >
                                {team.description}
                            </motion.p>

                            {/* Subtle hover effect */}
                            <motion.div 
                                className="absolute inset-0 bg-orange-500/10 opacity-0"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
