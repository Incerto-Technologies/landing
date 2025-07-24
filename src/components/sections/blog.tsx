import React from "react";
import SectionContainer from "../layouts/section-container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Sample blog posts - in a real implementation, these would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: "Optimizing Database Performance with Incerto",
    excerpt: "Learn how to improve your database performance using Incerto's advanced monitoring tools.",
    date: "July 20, 2025",
    slug: "/blogs/optimizing-database-performance"
  },
  {
    id: 2,
    title: "Understanding Real Co-Pilot for Databases",
    excerpt: "Discover how AI-powered assistance can transform your database management experience.",
    date: "July 15, 2025",
    slug: "/blogs/understanding-real-co-pilot"
  },
  {
    id: 3,
    title: "Top 5 Database Challenges Solved by Incerto",
    excerpt: "Explore how Incerto addresses the most common database management challenges faced by teams.",
    date: "July 10, 2025",
    slug: "/blogs/database-challenges-solved"
  }
];

const Blog: React.FC = () => (
  <SectionContainer className="py-16" id="blog">
    <div className="text-center mb-12">
      <h3 className="mb-4 text-2xl font-medium md:text-4xl">Latest from Our Blog</h3>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Insights, tutorials, and updates from our team of database experts
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <div key={post.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-muted h-48"></div> {/* Placeholder for blog image */}
          <div className="p-6">
            <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
            <h4 className="text-xl font-medium mb-2">{post.title}</h4>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <Link href={post.slug} className="inline-flex items-center text-primary hover:underline">
              Read more <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
    
    <div className="text-center mt-10">
      <Link 
        href="/blogs" 
        className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        View all articles <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  </SectionContainer>
);

export default Blog;
