
"use client";
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function EventsPage() {
    const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end start"]
    });

    const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
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
                duration: 0.5
            }
        }
    };

    const cardVariants = {
        hidden: (isLeft: boolean) => ({ 
            opacity: 0, 
            x: isLeft ? -200 : 200,
            scale: 0.95
        }),
        visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: { 
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as any
            }
        },
        hover: {
            scale: 1.02,
            x: 0,
            transition: { 
                duration: 0.2
            }
        },
        tap: {
            scale: 0.99,
            transition: { duration: 0.1 }
        }
    };

    const events = [
        {
            date: "20th March 2025",
            title: "Entrepreneurial Ecosystem in Higher Studies",
            icon: "🧭",
            description: "A webinar deep-diving into campus incubators, accelerators, funding networks, and mentorships. 100+ students left with a full startup roadmap from idea to funding.",
            highlights: [],
            stats: "100+ attendees",
            color: "from-blue-500/20 to-cyan-500/20",
            borderColor: "border-blue-500/40"
        },
        {
            date: "15th February 2025",
            title: "Hult Prize &ndash; Campus Round",
            icon: "🌍",
            description: "Part of the global Hult Prize Challenge, this event called on students to pitch sustainability-focused startups. Winning teams advanced toward international rounds — all while solving real-world problems.",
            highlights: [],
            stats: "",
            color: "from-green-500/20 to-emerald-500/20",
            borderColor: "border-green-500/40"
        },
        {
            date: "22nd January 2025",
            title: "Pitch • Present • Win",
            icon: "💼",
            description: "A high-stakes pitch competition where student founders showcased startup ideas in front of industry experts. With ₹50,000+ in cash prizes and powerful post-event networking, this was a mini Shark Tank in action.",
            highlights: [],
            stats: "🧠 Boosted confidence for 80% participants",
            color: "from-yellow-500/20 to-orange-500/20",
            borderColor: "border-yellow-500/40"
        },
        {
            date: "14th December 2024",
            title: "Marketing Seminar",
            icon: "📣",
            description: "Led by experts, this hands-on seminar introduced branding, digital tools, and customer psychology tailored for startup growth. The session gave budding marketers a strong foundation for launching real ventures.",
            highlights: [],
            stats: "",
            color: "from-red-500/20 to-pink-500/20",
            borderColor: "border-red-500/40"
        },
        {
            date: "29th September 2024",
            title: "Meet & Greet",
            icon: "🎤",
            description: "An electric welcome for freshers featuring stand-up acts, dance, improv, and interactive games. From breaking the ice to building community, this event made sure new members felt right at home.",
            highlights: [],
            stats: "👥 200+ attendees | 📈 150+ new sign-ups",
            color: "from-indigo-500/20 to-purple-500/20",
            borderColor: "border-indigo-500/40"
        },
        {
            date: "21st August 2024",
            title: "World Entrepreneurs' Day",
            icon: "🧠",
            description: "A tribute to global entrepreneurial spirit! The event featured insightful talks, real-world startup stories, and interactive sessions that inspired students to dream bigger and act bolder.",
            highlights: [],
            stats: "",
            color: "from-teal-500/20 to-cyan-500/20",
            borderColor: "border-teal-500/40"
        },
        {
            date: "19th August 2024",
            title: "Intro to Entrepreneurship Workshop",
            icon: "💡",
            description: "An immersive online session covering Lean Canvas, value propositions, and pitching basics. Breakout rooms, alumni panels, and a 95% satisfaction rate made it one of our most-loved virtual sessions.",
            highlights: [],
            stats: "95% satisfaction rate",
            color: "from-amber-500/20 to-yellow-500/20",
            borderColor: "border-amber-500/40"
        },
        {
            date: "20th July 2024",
            title: "Women in Entrepreneurship &ndash; Poster Making",
            icon: "👩‍🎨",
            description: "A visual storytelling contest that celebrated the journeys of women founders and raised awareness around gender equity in business. Creativity met cause — and the walls came alive with inspiration.",
            highlights: [],
            stats: "",
            color: "from-rose-500/20 to-pink-500/20",
            borderColor: "border-rose-500/40"
        }
    ] as unknown as {
        featured: boolean;
        date: string;
        title: string;
        icon: string;
        description: string;
        highlights: string[];
        stats?: string;
        color: string;
        borderColor: string;
    }[]

    return (
        <div className="w-full">
            <motion.div
                className="py-6 md:py-10 px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
            {/* Hero Section */}
            <motion.section
                className="text-center mb-12 md:mb-16"
                variants={itemVariants}
            >
                <motion.h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-orange-500 mb-4 md:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                >
                    📅 Past Events 
                </motion.h1>
                <motion.p
                    className="text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto text-gray-300 leading-relaxed px-4"
                    variants={itemVariants}
                >
                    We don&apos;t just host events &mdash; we build experiences that shape ideas, fuel ambition, and spark innovation. 
                    Here&apos;s a look back at our greatest hits from the past year:
                </motion.p>

                {/* Interactive Progress Indicator */}
                <motion.div 
                    className="mt-6 md:mt-8 flex justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 border border-white/20">
                        <span className="text-orange-400 text-xs md:text-sm font-medium">
                            {events.length} Epic Events • Scroll to Explore
                        </span>
                    </div>
                </motion.div>
            </motion.section>

            {/* Interactive Timeline */}
            <motion.section 
                className="max-w-6xl mx-auto relative overflow-hidden px-4"
                ref={timelineRef}
            >
                {/* Animated Timeline Line */}
                <div className="absolute left-[24px] md:left-1/2 md:-translate-x-0.5 h-full w-0.5 md:w-1 bg-gray-700/50 rounded-full">
                    <motion.div 
                        className="w-full bg-gradient-to-b from-orange-500 via-orange-400 to-orange-300 rounded-full origin-top"
                        style={{ height: timelineHeight }}
                        initial={{ height: "0%" }}
                    />
                </div>

                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        className={`relative flex items-start mb-12 md:mb-16 ${
                            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                        onMouseEnter={() => setHoveredEvent(index)}
                        onMouseLeave={() => setHoveredEvent(null)}
                    >
                        {/* Interactive Timeline Dot */}
                        <motion.div 
                            className="absolute left-[1px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-orange-500 rounded-full border-2 md:border-4 border-black z-10"
                            initial={{ scale: 1 }}
                            animate={{
                                scale: hoveredEvent === index ? 1.1 : 1,
                                backgroundColor: hoveredEvent === index ? "#ff7f39" : "#fc5603",
                                boxShadow: hoveredEvent === index ? "0 0 15px rgba(252, 86, 3, 0.5)" : "none"
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div 
                                className="absolute inset-0 rounded-full border-1 md:border-2 border-orange-300"
                                animate={{
                                    scale: hoveredEvent === index ? [1, 1.4, 1] : 1,
                                    opacity: hoveredEvent === index ? [1, 0, 1] : 0
                                }}
                                transition={{ duration: 1.5, repeat: hoveredEvent === index ? Infinity : 0 }}
                            />
                        </motion.div>

                        {/* Event Card */}
                        <motion.div
                            className={`ml-14 md:ml-0 ${
                                index % 2 === 0 ? 'md:mr-16 md:ml-0' : 'md:ml-16 md:mr-0'
                            } md:w-5/12`}
                            variants={cardVariants}
                            custom={index % 2 === 0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                            whileHover="hover"
                        >
                            <motion.div
                                className={`border-white/10 border backdrop-blur-[10px] rounded-lg md:rounded-xl p-4 md:p-6 relative overflow-hidden bg-gradient-to-br ${event.color} ${event.borderColor}`}
                                animate={{
                                    borderColor: hoveredEvent === index ? "rgba(252, 86, 3, 0.4)" : undefined
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Date Badge */}
                                <motion.div 
                                    className="inline-block px-2 py-1 md:px-3 md:py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-xs md:text-sm font-medium text-orange-300 mb-3 md:mb-4"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {event.date}
                                </motion.div>

                                {/* Event Title */}
                                <motion.h3 
                                    className="text-lg sm:text-xl md:text-2xl font-bold text-orange-500 mb-2 md:mb-3 flex items-center gap-2 md:gap-3"
                                    animate={{
                                        color: hoveredEvent === index ? "#ff7f39" : "#fc5603"
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.span 
                                        className="text-xl sm:text-2xl md:text-3xl"
                                        animate={{ 
                                            scale: hoveredEvent === index ? 1.05 : 1
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {event.icon}
                                    </motion.span>
                                    {event.title}
                                </motion.h3>

                                {/* Description */}
                                <motion.p 
                                    className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 leading-relaxed"
                                >
                                    {event.description}
                                </motion.p>

                                {/* Stats */}
                                {event.stats && (
                                    <motion.div 
                                        className="bg-black/30 rounded-md md:rounded-lg p-2 md:p-3 border border-white/10 mt-3 md:mt-4"
                                        whileHover={{ 
                                            borderColor: "rgba(252, 86, 3, 0.2)"
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-green-400 font-medium text-xs md:text-sm">
                                            {event.stats}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Featured Badge */}
                                {event.featured && (
                                    <motion.div 
                                        className="absolute top-2 right-2 md:top-3 md:right-3"
                                        animate={{ 
                                            scale: [1, 1.05, 1]
                                        }}
                                        transition={{ 
                                            duration: 3,
                                            repeat: Infinity
                                        }}
                                    >
                                        <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-bold rounded-full shadow-lg">
                                            ⭐ FEATURED
                                        </span>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.section>

            {/* Enhanced Call to Action */}
            <motion.section
                className="text-center mt-16 md:mt-20 px-4"
                variants={itemVariants}
            >
                <motion.div
                    className="border-white/10 border backdrop-blur-[10px] rounded-lg md:rounded-xl p-6 md:p-8 max-w-2xl mx-auto relative overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ 
                        scale: 1.01,
                        borderColor: "rgba(252, 86, 3, 0.3)"
                    }}
                >
                    <motion.h3 
                        className="text-xl md:text-2xl font-bold text-orange-500 mb-3 md:mb-4"
                        whileHover={{ scale: 1.05 }}
                    >
                        Ready for the Next Chapter?
                    </motion.h3>
                    <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                        These are just the highlights from our incredible journey. 
                        Join us and be part of creating the next set of unforgettable experiences!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                        <motion.a
                            href="/contact"
                            className="inline-block px-5 py-2.5 md:px-6 md:py-3 bg-orange-500 rounded-lg md:rounded-xl text-white font-semibold relative overflow-hidden text-sm md:text-base"
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
                        <motion.a
                            href="/"
                            className="inline-block px-5 py-2.5 md:px-6 md:py-3 bg-black border-2 border-orange-500 rounded-lg md:rounded-xl text-white font-semibold text-sm md:text-base"
                            whileHover={{ 
                                scale: 1.05,
                                backgroundColor: "rgba(252, 86, 3, 0.1)",
                                borderColor: "#ff7f39"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.a>
                    </div>
                </motion.div>
            </motion.section>
        </motion.div>
        </div>
    );
}