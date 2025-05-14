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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-4 lg:px-8 max-w-7xl mx-auto'>
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='bg-white shadow-md rounded-lg overflow-hidden'
          >
            <div className='w-full h-56 bg-gray-200 animate-pulse' />
            <div className='p-4 space-y-4'>
              <div className='space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse' />
                <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse' />
              </div>
              <div className='flex items-center space-x-2'>
                <div className='h-8 w-8 bg-gray-200 rounded-full animate-pulse' />
                <div className='h-4 bg-gray-200 rounded w-24 animate-pulse' />
              </div>
              <div className='h-4 bg-gray-200 rounded w-full animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-2/3 animate-pulse' />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-4 lg:px-8 max-w-7xl mx-auto'>
      {post.slice(0, 8).map((post: BlogPost, index: number) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className='bg-white relative flex flex-col h-full justify-start items-start gap-4 shadow-md rounded-lg overflow-hidden group'
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
              href={`/post/${post.slug}`}
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
