"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import blogsData from "@/data/blogs";

export default function BlogsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen py-20 px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
          variants={itemVariants}
        >
          Our Blogs
        </motion.h1>
        <motion.p
          className="text-xl text-center text-gray-300 mb-12"
          variants={itemVariants}
        >
          Insights, stories, and knowledge from the world of entrepreneurship
        </motion.p>

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={containerVariants}
        >
          {blogsData.map((blog) => (
            <motion.article
              key={blog.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300 border border-white/20"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-orange-400 font-medium">
                  {blog.category}
                </span>
                <span className="text-sm text-gray-400">{blog.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">
                {blog.title}
              </h2>
              <p className="text-gray-300 mb-4">{blog.excerpt}</p>
              <div className="flex items-center justify-between">
                {blog.date ? (
                  <span className="text-sm text-gray-400">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                ) : null}
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
