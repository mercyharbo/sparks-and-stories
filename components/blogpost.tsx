'use client'

import { Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import blogPosts from './blogcontent'
import { Button } from './ui/button'

const BlogList = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className='bg-white shadow-md rounded-lg overflow-hidden animate-pulse'
          >
            <div className='w-full h-56 bg-gray-200' />
            <div className='p-4'>
              <div className='h-6 bg-gray-200 rounded w-3/4' />
              <div className='h-4 bg-gray-200 rounded mt-2' />
              <div className='h-10 w-24 bg-gray-200 rounded-md mt-4' />
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <section className='flex flex-col justify-center items-center gap-5 w-full py-10 lg:py-20'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-10 px-5 lg:px-16'>
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className='bg-white relative flex flex-col justify-start items-start gap-5'
          >
            <Image
              src={post.image}
              alt={post.title}
              width={500}
              height={300}
              className='w-full h-56 object-cover rounded-lg'
            />
            <div className='absolute top-3 left-4 z-30 flex justify-start items-center flex-wrap gap-2'>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className='bg-[#0000008d] text-white text-xs capitalize font-semibold p-2 rounded-md'
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className='flex flex-col justify-start items-start gap-4 w-full'>
              <h3 className='text-lg font-semibold'>{post.title}</h3>
              <div className='flex justify-between items-center w-auto gap-5 text-xs text-gray-500'>
                <div className='flex justify-start items-center gap-3 text-sm lg:text-xs'>
                  <span className='font-semibold text-black'>
                    {post.author}
                  </span>
                  <span>&mdash;</span>
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <span>&bull;</span>
                <span className='text-xs text-gray-500 flex justify-start items-center gap-2'>
                  {' '}
                  <Share2 size={15} /> {post.shares} shares
                </span>
              </div>
              <p className='text-gray-500'>{post.excerpt}</p>
              <Link
                href={`/post/${post.title.replace(/\s+/g, '-').toLowerCase()}`}
                className='underline text-black font-semibold hover:text-blue-400'
              >
                View Post
              </Link>
            </div>
          </article>
        ))}
      </div>

      <Button
        type='button'
        variant={'outline'}
        size={'xl'}
        onClick={() => {
          setLoading(true)
          setTimeout(() => setLoading(false), 1000)
        }}
        className=''
      >
        Load More
      </Button>
    </section>
  )
}

export default BlogList
