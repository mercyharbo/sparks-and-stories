'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import blogPosts from './blogcontent'

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
    <>
      {blogPosts.map((post, index) => (
        <div
          key={index}
          className='bg-white flex flex-col justify-start items-start gap-5'
        >
          <Image
            src={post.image}
            alt={post.title}
            width={500}
            height={300}
            className='w-full h-56 object-cover'
          />
          <div className='p-4 flex flex-col justify-start items-start gap-2 w-full'>
            <h3 className='text-lg font-semibold'>{post.title}</h3>
            <p className='text-gray-500'>{post.excerpt}</p>
            <Link
              href={post.link}
              className='underline text-black font-semibold hover:text-blue-400'
            >
              View Post
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

export default BlogList
