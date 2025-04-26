import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blog } from "@/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  data: blog; // Explicitly define the type of data
};

const BlogCard = ({ data }: BlogCardProps) => {
  const {
    id,
    title,
    description,
    thumb,
    largeImage,
    slug,
    publishDate,
    createdAt,
    updatedAt,
    category,
  } = data;
  return (
    <article>
      <Card className="border-none shadow-none">
        <CardHeader className="p-0">
          <Image
            src={thumb}
            alt={title}
            width={420}
            height={240}
            className="mb-6 h-auto w-full rounded-t-xl"
          />
        </CardHeader>
        <CardContent>
          <div className="mb-5 flex items-center justify-between">
            <p className="rounded-full border border-[#3538CD]/30 bg-[#3538CD]/10 px-4 py-[2px] text-sm font-medium text-[#3538CD]">
              {category}
            </p>
            <p className="text-sm font-semibold text-green-950">
              {publishDate}
            </p>
          </div>
          <CardTitle className="leading[28px] mb-3 text-2xl font-semibold text-tertiary-dark">
            {title}
          </CardTitle>
          <p className="tracking-[0.0188rem] text-gray-950">{description}</p>
        </CardContent>
        <CardFooter>
          <Link
            href=""
            className="flex items-center text-tertiary-primary group-hover:text-tertiary-dark"
          >
            Read More
            <ArrowRight className="ml-1 h-4 w-4 -rotate-45 font-semibold text-tertiary-primary transition-transform group-hover:-rotate-0 group-hover:text-tertiary-dark" />
          </Link>
        </CardFooter>
      </Card>
    </article>
  );
};

export default BlogCard;
