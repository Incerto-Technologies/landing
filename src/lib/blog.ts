import fs from 'fs';
import path from 'path';

// Define the blog post type
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
};

const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  // Get all markdown files from the blogs directory
  const fileNames = fs.readdirSync(blogsDirectory);
  
  const allBlogsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');
      
      // Read markdown file as string
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse frontmatter and content
      const { frontmatter, content } = parseMdFile(fileContents);
      
      // Return combined data
      return {
        slug,
        ...frontmatter,
        content
      } as BlogPost;
    });
  
  // Sort posts by date
  return allBlogsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

// Get a specific blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { frontmatter, content } = parseMdFile(fileContents);
    
    return {
      slug,
      ...frontmatter,
      content
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

// Simple markdown parser for frontmatter and content
function parseMdFile(fileContent: string): { frontmatter: any, content: string } {
  // Check if the file has frontmatter
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = fileContent.match(frontmatterRegex);
  
  if (!match) {
    return {
      frontmatter: {},
      content: fileContent
    };
  }
  
  const frontmatterString = match[1];
  const content = fileContent.replace(frontmatterRegex, '');
  
  // Parse frontmatter
  const frontmatter: Record<string, string> = {};
  frontmatterString.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  });
  
  return {
    frontmatter,
    content
  };
}
