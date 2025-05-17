'use client'

import { BlogPost } from '@/types/blog'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface SlideshowProps {
  posts: BlogPost[]
}

export default function Slideshow({ posts }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  // const [direction, setDirection] = useState(0)
  // const [isError, setIsError] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (posts.length > 1) {
        // setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [posts.length])

  // const slideVariants = {
  //   enter: (direction: number) => ({
  //     x: direction > 0 ? '100%' : '-100%',
  //     opacity: 0,
  //     position: 'absolute',
  //   }),
  //   center: {
  //     zIndex: 1,
  //     x: 0,
  //     opacity: 1,
  //     position: 'relative',
  //     transition: {
  //       x: { type: 'tween', ease: 'easeInOut', duration: 0.7 },
  //       opacity: { duration: 0.4 },
  //     },
  //   },
  //   exit: (direction: number) => ({
  //     zIndex: 0,
  //     x: direction < 0 ? '100%' : '-100%',
  //     opacity: 0,
  //     position: 'absolute',
  //     transition: {
  //       x: { type: 'tween', ease: 'easeInOut', duration: 0.7 },
  //       opacity: { duration: 0.4 },
  //     },
  //   }),
  // }
  // const contentVariants = {
  //   initial: {
  //     opacity: 0,
  //     y: 20,
  //   },
  //   animate: {
  //     opacity: 1,
  //     y: 0,
  //   },
  //   exit: {
  //     opacity: 0,
  //     y: -20,
  //   },
  // }

  if (!posts?.length) {
    return null
  }

  const currentPost = posts[currentIndex]

  if (!currentPost) {
    return null
  }

  return (
    <article className='relative h-[70vh] w-11/12 lg:max-w-7xl mx-auto rounded-lg overflow-hidden my-5 lg:my-10'>
      <Image
        src={currentPost.cover_image.url}
        alt={currentPost.cover_image.alt}
        className='object-cover object-center w-full h-full '
        width={500}
        height={300}
        priority
      />
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='absolute inset-0'
        >
          <div className='absolute inset-0 bg-black/50' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='relative z-10 flex flex-col items-center justify-center gap-3 w-full lg:w-1/2 px-5 text-center text-white'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='flex flex-wrap justify-center gap-2 mb-4'
              >
                {currentPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className='bg-[#0000008d] text-white text-xs capitalize font-semibold px-3 py-1.5 rounded-md backdrop-blur-sm'
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='lg:text-4xl text-2xl font-bold'
              >
                {currentPost.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='text-lg lg:text-base text-gray-200 line-clamp-2'
                dangerouslySetInnerHTML={{
                  __html: currentPost.content,
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='mt-4'
              >
                <Link href={`/post/${currentPost.id}`} className='inline-block'>
                  <Button
                    type='button'
                    variant='default'
                    className='capitalize h-12 px-6 rounded-md transition-all duration-300 bg-white text-black hover:bg-gray-100'
                  >
                    Read More
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </article>
  )
}
