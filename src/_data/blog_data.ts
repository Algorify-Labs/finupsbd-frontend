import { blog } from "@/types";
import blog_image_1 from "/src/assets/images/blog/thumb-1.jpg";
import blog_image_2 from "/src/assets/images/blog/thumb-2.jpg";
import blog_image_3 from "/src/assets/images/blog/thumb-3.jpg";

export const blogs: blog[] = [
  {
    id: "1",
    title: "Top 5 Investment Strategies for 2025",
    description:
      "Explore the most promising investment strategies to grow your wealth this year.",
    isActive: true,
    createdBy: "admin",
    thumb: blog_image_1.src,
    largeImage: "/images/investment-strategies-large.jpg",
    slug: "top-5-investment-strategies-2025",
    publishDate: "2025-03-02",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01",
    category: "Investment",
  },
  {
    id: "2",
    title: "Understanding Credit Scores: A Complete Guide",
    description:
      "Learn how credit scores work and tips to improve yours effectively.",
    isActive: true,
    createdBy: "admin",
    thumb: blog_image_2.src,
    largeImage: "/images/credit-score-large.jpg",
    slug: "understanding-credit-scores",
    publishDate: "2025-03-02",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01",
    category: "Credit",
  },
  {
    id: "3",
    title: "Digital Banking Trends to Watch in 2025",
    description:
      "An insight into the latest trends shaping the future of digital banking.",
    isActive: true,
    createdBy: "admin",
    thumb: blog_image_3.src,
    largeImage: "/images/digital-banking-large.jpg",
    slug: "digital-banking-trends-2025",
    publishDate: "2025-03-02",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01",
    category: "Banking",
  },
];
