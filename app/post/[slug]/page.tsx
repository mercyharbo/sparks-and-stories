import BlogDetailsComp from '@/components/blogdetails'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content/public/posts/${slug}`
  )
  const post = await res.json()

  return {
    title: post.content.data.title || 'Blog Post',
    description:
      post.content.data.description?.slice(0, 250) ||
      post.content.data.content?.slice(0, 250) ||
      '',
    openGraph: {
      title: post.content.data.title || 'Blog Post',
      description:
        post.content.data.description?.slice(0, 250) ||
        post.content.data.content?.slice(0, 250) ||
        '',
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/post/${slug}`,
      images: post.cover_image?.url
        ? [
            {
              url: post.content.cover_image.url,
              width: 1200,
              height: 630,
              alt: post.content.data.title || 'Blog post image',
            },
          ]
        : [],
    },
  }
}

export default async function BlogDetails({ params }: Props) {
  const slug = (await params).slug
  return <BlogDetailsComp slug={slug} />
}
