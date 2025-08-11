import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - Real Co-Pilot for Databases | Incerto",
  description:
    "Insights, tutorials, and updates from our team of database experts",
  keywords:
    "database blog, database tutorials, database insights, Incerto blog",
  openGraph: {
    title: "Blog - Real Co-Pilot for Databases | Incerto",
    description:
      "Insights, tutorials, and updates from our team of database experts",
    type: "website",
    url: "https://incerto.in/blogs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Real Co-Pilot for Databases | Incerto",
    description:
      "Insights, tutorials, and updates from our team of database experts",
  },
};

// Get all blog posts from markdown files
const blogPosts = getAllBlogPosts();

export default function BlogPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Incerto Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Insights, tutorials, and updates from our team of database experts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.slug}
            className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
              <h2 className="text-2xl font-medium mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <Link
                href={`/blogs/${post.slug}`}
                className="inline-flex items-center text-primary hover:underline"
              >
                Read more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
