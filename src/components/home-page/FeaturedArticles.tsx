import { blogs } from "@/_data/blog_data";
import { blog } from "@/types";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import BlogCard from "../core/BlogCard";
import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";
import { Button } from "../ui/button";

type TBlogProps = {
  blog?: blog[];
};
const FeaturedArticles = ({ blog = [] }: TBlogProps) => {
  return (
    <SectionWrapper>
      <div className="py-0 lg:py-16">
        <div className="container-md">
          <div className="mb-16 text-center">
            <SectionBadge className="before:bg-[#FF5F00]">
              Blogs & Articles
            </SectionBadge>
            <SectionTitle>Financial Insights & Tips</SectionTitle>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} data={blog} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="">
              <Button variant="default" className="h-12 w-36">
                View All
                <MoveUpRight size={28} strokeWidth={2.5} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FeaturedArticles;
