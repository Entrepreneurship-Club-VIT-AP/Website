

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSubmitMessage("🎉 Thank you for your message! We'll get back to you soon.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            setSubmitMessage("❌ Sorry, there was an error sending your message. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.5
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const contactMethods = [
        {
            icon: "📧",
            title: "Email Us",
            details: "epc202330@gmail.com",
            description: "Drop us a line anytime"
        },
        {
            icon: "📱",
            title: "Social Media",
            details: "@entrepreneurshipclub_vitap",
            description: "Follow us for updates"
        }
    ];

    return (
        <motion.div
            className="min-h-screen py-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Hero Section */}
            <motion.section
                className="text-center mb-16"
                variants={itemVariants}
            >
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-orange-500 mb-6"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Get In Touch
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300"
                    variants={itemVariants}
                >
                    Have an idea? Want to collaborate? Or just want to say hello? 
                    We&apos;d love to hear from you. Let&apos;s turn your entrepreneurial dreams into reality together.
                </motion.p>
            </motion.section>

            {/* Contact Methods Grid */}
            <motion.section
                className="mb-16"
                variants={itemVariants}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <motion.div
                            key={index}
                            className="border-white/10 border backdrop-blur-[10px] rounded-xl p-6 text-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ 
                                scale: 1.05, 
                                borderColor: "rgba(252, 86, 3, 0.3)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="text-4xl mb-3">{method.icon}</div>
                            <h3 className="text-xl font-bold text-orange-500 mb-2">{method.title}</h3>
                            <p className="text-gray-300 mb-1">{method.details}</p>
                            <p className="text-sm text-gray-400">{method.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Contact Form */}
            <motion.section
                className="max-w-4xl mx-auto"
                variants={itemVariants}
            >
                <motion.div
                    className="border-white/10 border backdrop-blur-[10px] rounded-xl p-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        className="text-3xl font-bold text-orange-500 mb-6 text-center"
                        variants={itemVariants}
                    >
                        Send Us a Message
                    </motion.h2>
                    
                    {submitMessage && (
                        <motion.div
                            className={`border rounded-lg p-4 mb-6 ${
                                submitMessage.includes("🎉") 
                                    ? "bg-green-500/20 border-green-500/50 text-green-300" 
                                    : "bg-red-500/20 border-red-500/50 text-red-300"
                            }`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {submitMessage}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={itemVariants}>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name *
                                </label>
                                <motion.input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:border-orange-500 focus:outline-none transition-all duration-300"
                                    placeholder="Your name"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>
                            
                            <motion.div variants={itemVariants}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address *
                                </label>
                                <motion.input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:border-orange-500 focus:outline-none transition-all duration-300"
                                    placeholder="your.email@example.com"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>
                        </div>

                        <motion.div variants={itemVariants}>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                Subject *
                            </label>
                            <motion.input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:border-orange-500 focus:outline-none transition-all duration-300"
                                placeholder="What's this about?"
                                whileFocus={{ scale: 1.02 }}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                Message *
                            </label>
                            <motion.textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg focus:border-orange-500 focus:outline-none transition-all duration-300 resize-vertical"
                                placeholder="Tell us about your idea, question, or how we can help..."
                                whileFocus={{ scale: 1.02 }}
                            />
                        </motion.div>

                        <motion.div
                            className="text-center"
                            variants={itemVariants}
                        >
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ 
                                    scale: 1.05,
                                    backgroundColor: "#e04503",
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <motion.div
                                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        Sending...
                                    </span>
                                ) : (
                                    "Send Message"
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
                className="text-center mt-16"
                variants={itemVariants}
            >
                <motion.div
                    className="border-white/10 border backdrop-blur-[10px] rounded-xl p-8 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-2xl font-bold text-orange-500 mb-4">
                        Ready to Start Your Journey?
                    </h3>
                    <p className="text-gray-300 mb-6">
                        Join the Entrepreneurship Club of VIT-AP and turn your ideas into reality. 
                        Connect with like-minded innovators and start building your future today.
                    </p>
                    <motion.a
                        href="/"
                        className="inline-block px-6 py-3 bg-black border-2 border-orange-500 rounded-xl text-white font-semibold"
                        whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(252, 86, 3, 0.1)",
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Join the Club
                    </motion.a>
                </motion.div>
            </motion.section>
        </motion.div>
    );
}