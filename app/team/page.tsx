"use client";
import React from "react";
import { motion } from "framer-motion";

export default function TeamPage() {
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
                    We're not just one team — we're an ecosystem of passionate individuals working together to build something extraordinary.
                </motion.p>
            </motion.section>

            {/* Teams Grid */}
            <motion.section 
                className="max-w-7xl mx-auto"
                variants={containerVariants}
            >
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto"
                >
                    {teams.map((team, index) => (
                        <motion.div
                            key={index}
                            className="border-orange-500/30 border backdrop-blur-[10px] rounded-xl p-6 relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-600/10"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            {/* Team Icon */}
                            <motion.div 
                                className="text-5xl mb-6"
                                whileHover={{ 
                                    scale: 1.1,
                                    rotate: [0, -5, 5, 0]
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {team.icon}
                            </motion.div>
                            
                            {/* Team Name */}
                            <motion.h3 
                                className="text-2xl md:text-3xl font-bold text-orange-500 mb-4"
                            >
                                {team.name}
                            </motion.h3>
                            
                            {/* Team Description */}
                            <motion.p 
                                className="text-orange-300/80 text-base leading-relaxed mb-6"
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