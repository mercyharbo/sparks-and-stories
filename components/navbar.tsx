'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Orbitron } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Sports', link: '/sports' },
  { name: 'Technology', link: '/technology' },
  { name: 'Entertainment', link: '/entertainment' },
  { name: 'Politics', link: '/politics' },
]

export default function NavbarComp() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  const mobileMenuVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    }),
  }

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className='bg-white fixed top-0 left-0 z-40 h-[5rem] w-full flex flex-row justify-between items-center px-5 py-3 lg:px-[8rem] lg:py-5 shadow-sm'
    >
      <Link href='/'>
        <motion.h1
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`text-3xl font-semibold capitalize ${orbitron.className} cursor-pointer`}
        >
          Sparks & stories
        </motion.h1>
      </Link>

      <NavigationMenu className='lg:block hidden'>
        <NavigationMenuList className='gap-3'>
          {navItems.map((item) => {
            const isActive = pathname === item.link

            return (
              <NavigationMenuItem key={item.name}>
                <Link href={item.link} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive ? 'bg-gray-600 text-white' : 'hover:bg-gray-100',
                      'transition-colors duration-300'
                    )}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type='button'
        className='lg:hidden text-4xl text-gray-500 hover:text-gray-700'
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? <X /> : <Menu />}
      </motion.button>

      <AnimatePresence>
        {isMobile && (
          <motion.div
            variants={mobileMenuVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='fixed top-0 left-0 h-screen w-[80vw] bg-black text-white p-5 z-30'
          >
            <div className='flex flex-col gap-[5rem] w-full'>
              <Link href='/'>
                <motion.h1
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-lg capitalize font-bold text-white ${orbitron.className} cursor-pointer`}
                >
                  Sparks & stories
                </motion.h1>
              </Link>

              <motion.div
                className='flex flex-col justify-start items-start gap-3 w-full'
                initial='hidden'
                animate='visible'
              >
                {navItems.map((item, i) => {
                  const isActive = pathname === item.link

                  return (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={navItemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={item.link} legacyBehavior passHref>
                        <span
                          className={cn(
                            `text-white h-12 w-full rounded-md flex justify-start items-center px-2 text-xl transition-colors duration-300`,
                            isActive
                              ? 'bg-gray-600'
                              : 'hover:bg-gray-800'
                          )}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
