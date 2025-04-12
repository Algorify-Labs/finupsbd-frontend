export interface blog {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdBy: string;
  thumb: string;
  largeImage: string;
  slug: string;
  publishDate: string | null;
  createdAt: string;
  updatedAt: string;
  category: string;
}
