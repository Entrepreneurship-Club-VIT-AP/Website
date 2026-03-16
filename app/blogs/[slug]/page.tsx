"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import blogsData from "@/data/blogs";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date?: string;
  readTime: string;
  category: string;
  author: string;
  content: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

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

  const blog = blogsData.find((post) => post.id === slug) as Blog | undefined;

  if (!blog) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center py-20 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blogs"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Blogs
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  const currentIndex = blogsData.findIndex((post) => post.id === slug);
  const prevBlog = currentIndex > 0 ? blogsData[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < blogsData.length - 1 ? blogsData[currentIndex + 1] : null;

  return (
    <motion.div
      className="min-h-screen py-20 px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
        <motion.div className="mb-8" variants={itemVariants}>
          <Link
            href="/blogs"
            className="text-orange-400 hover:text-orange-300 font-medium transition-colors cursor-pointer mb-4 inline-block"
          >
            ← Back to Blogs
          </Link>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-orange-400 font-medium">
              {blog.category}
            </span>
            <span className="text-sm text-gray-400">{blog.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center text-gray-400 text-sm mb-8">
            <span>{blog.author}</span>
            {blog.date && (
              <>
                <span className="mx-2">•</span>
                <span>
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
        </motion.div>

        <motion.article
          className="prose prose-lg prose-invert max-w-none"
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <motion.div
          className="mt-12 pt-8 border-t border-white/20"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Share this post
          </h3>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(blog.title);
                window.open(
                  `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
                  "_blank",
                );
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Share on Twitter
            </button>
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
                  "_blank",
                );
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Share on LinkedIn
            </button>
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                  "_blank",
                );
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Share on Facebook
            </button>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 pt-8 border-t border-white/20 flex justify-between"
          variants={itemVariants}
        >
          {prevBlog && (
            <Link
              href={`/blogs/${prevBlog.id}`}
              className="text-orange-400 hover:text-orange-300 font-medium transition-colors cursor-pointer"
            >
              ← Previous: {prevBlog.title}
            </Link>
          )}
          {nextBlog && (
            <Link
              href={`/blogs/${nextBlog.id}`}
              className="text-orange-400 hover:text-orange-300 font-medium transition-colors cursor-pointer ml-auto"
            >
              Next: {nextBlog.title} →
            </Link>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
