import React from "react";
import LatestBlog from "../../components/blog/LatestBlogCard";
import BlogCards from "../../components/blog/BlogCards";
import { BLOG_POSTS } from "../../data/constants";

export default function Blog() {
  // Use hardcoded data, sorted newest first
  const blogs = [...BLOG_POSTS].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const latestBlogs = blogs.slice(0, 3);
  const otherBlogs = blogs.slice(3);

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:via-slate-900 dark:to-black bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 dark:text-white">
      <LatestBlog blogs={latestBlogs} />
      <BlogCards blogs={otherBlogs} />
    </div>
  );
}
