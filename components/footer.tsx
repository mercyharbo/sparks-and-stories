'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-gray-900 text-white py-12'
    >
      <div className='container max-w-7xl px-4 lg:px-8 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div className='space-y-4'>
            <h3 className='text-xl font-bold'>About Us</h3>
            <p className='text-gray-400'>
              Sparks and Stories is your go-to destination for insightful
              articles, engaging stories, and thought-provoking content across
              various categories.
            </p>
            <div className='flex space-x-4'>
              <Link
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Facebook'
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Twitter'
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Instagram'
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='LinkedIn'
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-xl font-bold'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/technology'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href='/entertainment'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Entertainment
                </Link>
              </li>
              <li>
                <Link
                  href='/anime'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Anime
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h3 className='text-xl font-bold'>Newsletter</h3>
            <p className='text-gray-400'>
              Subscribe to our newsletter for the latest updates and exclusive
              content.
            </p>
            <form className='space-y-2'>
              <input
                type='email'
                placeholder='Your email address'
                className='w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500'
              />
              <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; {currentYear} Sparks and Stories. All rights reserved.</p>
          <p className='mt-2 text-sm'>
            Made with ❤️ by{' '}
            <a
              href='https://github.com/mercyharbo'
              className='text-blue-400 hover:text-blue-300 capitalize'
              target='_blank'
              rel='noopener noreferrer'
            >
              code with mercy
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
