import BlogDetailsComp from '@/components/blogdetails'
import { client } from '@/sanity/client'
import { Metadata } from 'next'

import { groq } from 'next-sanity'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  body,
  categories[]->{
    _id,
    title,
    slug
  },
  mainImage {
    asset->{
      _id,
      url
    }
  },
  "author": author->name,
  "authorImage": author->image.asset->url,
  "authorBio": author->bio
}`

export async function generateMetadata(
  { params }: Props
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
  const post = await client.fetch(query, { slug })

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: post.title,
    description: post.body?.[0]?.children?.[0]?.text || '',
    openGraph: {
      title: post.title,
      description: post.body?.[0]?.children?.[0]?.text || '',
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post.slug.current}`,
      images: [
        {
          url: post.mainImage?.asset?.url || '',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.body?.[0]?.children?.[0]?.text || '',
      images: [post.mainImage?.asset?.url || ''],
    },
  }
}

export default async function BlogDetails({ params }: Props) {
  const slug = (await params).slug
  const post = await client.fetch(query, { slug })

  if (!post) return <div>Post not found</div>

  return <BlogDetailsComp post={post} />
}
