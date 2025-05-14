'use client'

import BlogList from '@/components/blogpost'
import Slideshow from '@/components/slideshow'
import { Button } from '@/components/ui/button'
import { BlogPost } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface BlogResponse {
  contents: BlogPost[]
  page: number
  pageSize: number
  total: number
}

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  const getBlogPosts = async () => {
    try {
      const res = await fetch(
        'https://blog-cms-iml5.onrender.com/api/content/public/posts'
      )

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      const data: BlogResponse = await res.json()
      setPosts(data.contents)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      setPosts([])
    }
  }

  useEffect(() => {
    getBlogPosts()
  }, [])

  const featuredPost = posts[0]

  return (
    <main className='flex flex-col gap-10 w-full'>
      {featuredPost && (
        <section className='relative h-[80vh] w-full'>
          <Image
            src={featuredPost.cover_image.url}
            fill
            alt={featuredPost.title}
            className='object-cover object-center'
            sizes='100vw'
            priority
          />

          <div className='absolute inset-0 bg-black/50'>
            <div className='flex flex-col justify-center items-center gap-3 lg:w-1/2 w-full px-5 m-auto text-center h-full text-white'>
              <div className='flex flex-wrap justify-center gap-2 mb-4'>
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className='bg-[#0000008d] text-white text-xs capitalize font-semibold px-3 py-1.5 rounded-md backdrop-blur-sm'
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className='lg:text-4xl text-2xl font-bold'>
                {featuredPost.title}
              </h1>
              <div
                className='text-lg lg:text-base text-gray-200 line-clamp-2'
                dangerouslySetInnerHTML={{
                  __html: featuredPost.content.substring(0, 250) + '...',
                }}
              />
              <Link
                href={`/post/${featuredPost.slug}`}
                className='inline-block'
              >
                <Button
                  type='button'
                  variant='default'
                  className='capitalize h-12 px-6 rounded-md transition-all duration-300 bg-white text-black hover:bg-gray-100'
                >
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <BlogList post={posts} />

      {posts.length > 0 && <Slideshow posts={posts} />}
    </main>
  )
}
