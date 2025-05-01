'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { SanityDocument } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface SlideshowProps {
  posts: SanityDocument[]
}

export default function Slideshow({ posts }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    /* The `const interval = setInterval(() => { setDirection(1) setCurrentIndex((prevIndex) =>
    (prevIndex + 1) % posts.length) }, 8000)` code block is setting up an interval that runs a
    function every 8000 milliseconds (8 seconds). */
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [posts.length])

  /* The `slideVariants` constant is defining different animation variants for the slideshow component
  using Framer Motion library. These variants control how the slideshow elements enter, center, and
  exit the view based on the direction of the animation. */
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  /* The `contentVariants` constant is defining different animation variants for the content within the
 slideshow component using the Framer Motion library. These variants control how the content enters,
 animates, and exits the view based on the animation state. */
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <article className='relative h-[80vh] w-[90vw] lg:w-[80rem] mx-auto rounded-lg overflow-hidden my-5 lg:my-10'>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className='absolute inset-0'
        >
          <Image
            src={posts[currentIndex]?.mainImage?.asset?.url}
            fill
            alt='cover image'
            className='object-cover object-center w-full'
            priority
          />
          <div className='absolute inset-0 bg-black/50'>
            <motion.div
              variants={contentVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ delay: 0.2 }}
              className='flex flex-col justify-center items-center gap-3 lg:w-1/2 w-full px-5 m-auto text-center h-full text-white'
            >
              <motion.h1
                className='lg:text-3xl text-2xl uppercase font-semibold'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {posts[currentIndex]?.title}
              </motion.h1>
              <motion.p
                className='text-lg lg:text-base'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {posts[currentIndex]?.body?.[0]?.children?.[0]?.text}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  href={`/post/${posts[currentIndex]?.slug?.current}`}
                  className='inline-block'
                >
                  <Button
                    type='button'
                    variant={'default'}
                    className='capitalize h-12 px-5 rounded-md transition-all duration-300 hover:scale-105'
                  >
                    read more
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </article>
  )
}
