'use client'

import { BlogPost } from '@/types/blog'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface BlogListProps {
  post: BlogPost[]
}

const BlogList = ({ post }: BlogListProps) => {
  if (!post?.length) {
    return (
      <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-4 lg:px-8 max-w-7xl mx-auto w-full'>
        {[...Array(8)].map((_, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='bg-white relative flex flex-col h-full w-full justify-start items-start gap-4 shadow-md rounded-lg overflow-hidden group'
          >
            <div className='relative w-full h-48 overflow-hidden'>
              <div className='w-full h-full bg-gray-200 animate-pulse rounded-t-lg' />
              <div className='absolute top-3 left-4 z-30 flex justify-start items-center flex-wrap gap-2'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className='h-5 w-16 bg-[#0000008d] rounded-md animate-pulse backdrop-blur-sm'
                  />
                ))}
              </div>
            </div>
            <div className='flex flex-col justify-start items-start gap-3 w-full p-4 flex-grow'>
              <div className='h-6 bg-gray-200 rounded w-3/4 animate-pulse' />
              <div className='flex justify-between items-center w-auto gap-3'>
                <div className='flex justify-start items-center gap-2'>
                  <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
                  <div className='h-4 w-4 bg-gray-200 rounded animate-pulse' />
                  <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                </div>
              </div>
              <div className='space-y-2 w-full'>
                <div className='h-4 bg-gray-200 rounded w-full animate-pulse' />
                <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse' />
                <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse' />
              </div>
              <div className='h-5 w-24 bg-gray-200 rounded animate-pulse mt-auto' />
            </div>
          </motion.article>
        ))}
      </article>
    )
  }

  return (
    <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-4 lg:px-8 max-w-7xl mx-auto w-full'>
      {post.slice(0, 8).map((post: BlogPost, index: number) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className='bg-white relative flex flex-col h-full w-full justify-start items-start gap-4 shadow-md rounded-lg overflow-hidden group'
        >
          <div className='relative w-full h-48 overflow-hidden'>
            <Image
              src={post.cover_image.url}
              alt={post.cover_image.alt}
              width={500}
              height={300}
              className='w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300'
            />
            <div className='absolute top-3 left-4 z-30 flex justify-start items-center flex-wrap gap-2'>
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className='bg-[#0000008d] text-white text-xs capitalize font-semibold px-2 py-1 rounded-md backdrop-blur-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className='flex flex-col justify-start items-start gap-3 w-full p-4 flex-grow'>
            <h3 className='text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300 line-clamp-2'>
              {post.title}
            </h3>
            <div className='flex justify-between items-center w-auto gap-3 text-xs text-gray-500'>
              <div className='flex justify-start items-center gap-2 text-sm lg:text-xs'>
                <span className='text-black capitalize font-semibold'>
                  {post.author}
                </span>
                <span>&mdash;</span>
                <span>
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
            <div
              className='text-gray-500 text-sm line-clamp-3'
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <Link
              href={`/post/${post.id}`}
              className='mt-auto underline text-black font-semibold hover:text-blue-400 transition-colors duration-300'
            >
              View Post
            </Link>
          </div>
        </motion.article>
      ))}
    </article>
  )
}

export default BlogList
