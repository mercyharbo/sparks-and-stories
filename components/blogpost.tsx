'use client'

import { motion } from 'framer-motion'
import { type SanityDocument } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'

interface BlogListProps {
  post: SanityDocument[]
  categoryId?: string
}

const BlogList = ({ post, categoryId }: BlogListProps) => {
  // Filter posts by category if categoryId is provided
  const filteredPosts = categoryId
    ? post.filter((post) =>
        post.categories?.some((cat: { _id: string }) => cat._id === categoryId)
      )
    : post

  if (!post?.length) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 px-5 lg:px-[8rem]'>
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

  // Empty state when no posts are found for a category
  if (categoryId && filteredPosts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-col items-center justify-center gap-4 py-20 px-5 lg:px-[8rem]'
      >
        <div className='text-6xl'>📝</div>
        <h3 className='text-2xl font-semibold text-gray-800'>
          No posts found in this category
        </h3>
        <p className='text-gray-500 text-center max-w-md'>
          We couldn&apos;t find any posts in this category. Check back later for
          new content!
        </p>
      </motion.div>
    )
  }

  return (
    <article className='grid grid-cols-1 lg:grid-cols-3 gap-10 px-5 lg:px-[8rem]'>
      {filteredPosts.slice(0, 8).map((post: SanityDocument, index: number) => (
        <motion.article
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className='bg-white relative flex flex-col justify-start items-start gap-5 shadow-md rounded-lg overflow-hidden group'
        >
          <div className='relative w-full h-56 overflow-hidden'>
            <Image
              src={post.mainImage.asset.url}
              alt={post.title}
              width={500}
              height={300}
              className='w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300'
            />
            <div className='absolute top-3 left-4 z-30 flex justify-start items-center flex-wrap gap-2'>
              {post.categories.map((tag: { _id: string; title: string }) => (
                <span
                  key={tag._id}
                  className='bg-[#0000008d] text-white text-xs capitalize font-semibold p-2 rounded-md backdrop-blur-sm'
                >
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
          <div className='flex flex-col justify-start items-start gap-4 w-full p-4'>
            <h3 className='text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300'>
              {post.title}
            </h3>
            <div className='flex justify-between items-center w-auto gap-5 text-xs text-gray-500'>
              <div className='flex justify-start items-center gap-3 text-sm lg:text-xs'>
                <div className='flex justify-start items-center gap-2'>
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={20}
                    height={20}
                    className='w-8 h-8 object-cover object-top rounded-full ring-2 ring-gray-200'
                  />
                  <span className='text-black capitalize font-semibold'>
                    {post.author}
                  </span>
                </div>
                <span>&mdash;</span>
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
            <p className='text-gray-500 line-clamp-3'>
              {post.body[0].children[0].text}
            </p>
            <Link
              href={`/post/${post.slug.current}`}
              className='underline text-black font-semibold hover:text-blue-400 transition-colors duration-300'
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
