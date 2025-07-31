const fs = require("fs");
const path = require("path");

// Function to generate sitemap XML
function generateSitemapXML(urls) {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetStart =
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetEnd = "</urlset>";

  const urlEntries = urls
    .map((url) => {
      return `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified.toISOString()}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `${xmlHeader}
${urlsetStart}
${urlEntries}
${urlsetEnd}`;
}

// Define all the static routes
const baseUrl = "https://incerto.com";
const staticRoutes = [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${baseUrl}/features`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${baseUrl}/pricing`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${baseUrl}/download`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${baseUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${baseUrl}/blogs`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    url: `${baseUrl}/real-co-pilot-for-databases`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${baseUrl}/legal/privacy-policy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

// Get blog posts from the content directory
function getBlogPosts() {
  const blogsDir = path.join(__dirname, "../src/content/blogs");
  const blogFiles = fs
    .readdirSync(blogsDir)
    .filter((file) => file.endsWith(".md"));

  return blogFiles.map((file) => {
    const slug = file.replace(".md", "");
    return {
      url: `${baseUrl}/blogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    };
  });
}

// Generate the complete sitemap
const blogRoutes = getBlogPosts();
const allRoutes = [...staticRoutes, ...blogRoutes];
const sitemapXML = generateSitemapXML(allRoutes);

// For development, we'll just log the sitemap info
// The dynamic sitemap is handled by Next.js at /sitemap.xml
console.log(`✅ Sitemap will be available at: https://incerto.com/sitemap.xml`);
console.log(`📊 Total URLs: ${allRoutes.length}`);
console.log(`📝 Static routes: ${staticRoutes.length}`);
console.log(`📝 Blog posts: ${blogRoutes.length}`);
console.log(
  `🌐 Dynamic sitemap: http://localhost:3000/sitemap.xml (in development)`
);
