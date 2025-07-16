"use client";
import React from "react";
import { motion } from "framer-motion";

export default function InitiativesPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.6
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1] as any
            }
        }
    };

    const floatingVariants = {
        float: {
            y: [-10, 10, -10],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: [0.25, 0.1, 0.25, 1] as any
            }
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center py-20 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className="text-center max-w-4xl mx-auto px-6"
                variants={itemVariants}
            >
                {/* Main Icon/Visual */}
                <motion.div
                    className="mb-12"
                    variants={floatingVariants}
                    animate="float"
                >
                    <div className="relative">
                        <motion.div
                            className="text-8xl md:text-9xl mb-6"
                            whileHover={{ 
                                scale: 1.1,
                                rotate: [0, -5, 5, 0]
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            🚀
                        </motion.div>
                        
                        {/* Animated rings around the rocket */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <motion.div
                                className="w-40 h-40 border-2 border-orange-500/30 rounded-full"
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0, 0.3]
                                }}
                                transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 0
                                }}
                            />
                            <motion.div
                                className="absolute w-32 h-32 border-2 border-orange-400/40 rounded-full"
                                animate={{ 
                                    scale: [1, 1.3, 1],
                                    opacity: [0.4, 0, 0.4]
                                }}
                                transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: 0.5
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    className="text-4xl md:text-7xl font-bold text-orange-500 mb-8"
                    variants={itemVariants}
                    whileHover={{ 
                        scale: 1.05,
                        textShadow: "0 0 20px rgba(252, 86, 3, 0.5)"
                    }}
                >
                    🌟 Initiatives
                </motion.h1>

                {/* Coming Soon Message */}
                <motion.div
                    className="border-white/10 border backdrop-blur-[10px] rounded-xl p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-purple-500/10"
                    variants={itemVariants}
                    whileHover={{ 
                        scale: 1.02,
                        borderColor: "rgba(252, 86, 3, 0.4)"
                    }}
                >
                    {/* Background glow effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-purple-500/5"
                        animate={{
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity
                        }}
                    />

                    <motion.h2
                        className="text-2xl md:text-4xl font-bold text-white mb-6 relative z-10"
                        variants={itemVariants}
                    >
                        Coming Soon
                    </motion.h2>
                    
                    <motion.p
                        className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed relative z-10"
                        variants={itemVariants}
                    >
                        We&apos;re crafting something extraordinary! Our initiatives page will showcase all the amazing projects, 
                        programs, and impact-driven activities that make our entrepreneurship community thrive.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
                        variants={itemVariants}
                    >
                        <motion.a
                            href="/events"
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
                            Check Our Events
                        </motion.a>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
