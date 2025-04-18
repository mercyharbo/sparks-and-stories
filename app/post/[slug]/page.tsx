import BlogDetailsComp from '@/components/blogdetails'
import { Metadata } from 'next'

// type Props = {
//   params: Promise<{ slug: string }>
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }

export async function generateMetadata(): Promise<Metadata> {
  const dummyPost = {
    title: 'Sample Blog Post',
    excerpt: 'This is a sample blog post description.',
    coverImage: '/images/sample-cover.jpg',
    url: `https://img.freepik.com/free-photo/african-kid-enjoying-life_23-2151448174.jpg?t=st=1744931584~exp=1744935184~hmac=5277223d866674a8a94558fb91748e2936796dbcf5909ecf3672f69ea8f1e8f1&w=1380`,
  }

  return {
    title: dummyPost.title,
    description: dummyPost.excerpt,
    openGraph: {
      title: dummyPost.title,
      description: dummyPost.excerpt,
      type: 'article',
      url: dummyPost.url,
      images: [
        {
          url: dummyPost.coverImage,
          width: 1200,
          height: 630,
          alt: dummyPost.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dummyPost.title,
      description: dummyPost.excerpt,
      images: [dummyPost.coverImage],
    },
  }
}

export default function BlogDetails() {
  return <BlogDetailsComp />
}
