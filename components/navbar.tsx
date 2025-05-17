'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Menu, Search, X } from 'lucide-react'
import { Orbitron } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const navItems = [
  { name: 'Home', link: '/' },
  // { name: 'Sports', link: '/sports' },
  { name: 'Technology', link: '/technology' },
  { name: 'Entertainment', link: '/entertainment' },
  { name: 'Anime', link: '/anime' },
]

export default function NavbarComp() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Handle scroll effect
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg'
          : 'bg-white shadow-sm'
      )}
    >
      <div className='flex items-center justify-between px-4 lg:px-8 h-16 lg:h-20 max-w-7xl mx-auto'>
        {/* Logo */}
        <Link href='/'>
          <motion.h1
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'text-xl lg:text-2xl font-bold tracking-tight',
              orbitron.className
            )}
          >
            Sparks & stories
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden lg:block'>
          <NavigationMenuList className='gap-1'>
            {navItems.map((item) => {
              const isActive = pathname === item.link
              return (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.link} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'px-4 py-2 rounded-md transition-colors duration-200',
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
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

        {/* Search Button */}
        <button
          className='hidden lg:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200'
          onClick={() => console.log('Search clicked')}
        >
          <Search size={20} />
        </button>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobile(!isMobile)}
          className='lg:hidden p-2 text-gray-700 hover:text-gray-900'
          aria-label='Toggle Menu'
        >
          {isMobile ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && (
            <motion.div
              variants={mobileMenuVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='fixed inset-0 z-50 lg:hidden'
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='absolute inset-0 bg-black/50 backdrop-blur-sm'
                onClick={() => setIsMobile(false)}
              />

              {/* Menu Content */}
              <motion.div className='absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl'>
                <div className='flex flex-col p-6 h-full'>
                  <div className='flex items-center justify-between mb-8'>
                    <Link href='/' onClick={() => setIsMobile(false)}>
                      <motion.h1
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          'text-lg font-bold tracking-tight',
                          orbitron.className
                        )}
                      >
                        Sparks & stories
                      </motion.h1>
                    </Link>
                    <button
                      onClick={() => setIsMobile(false)}
                      className='p-2 text-gray-500 hover:text-gray-700'
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <motion.div
                    initial='hidden'
                    animate='visible'
                    className='flex flex-col space-y-1'
                  >
                    {navItems.map((item, i) => {
                      const isActive = pathname === item.link
                      return (
                        <motion.div
                          key={item.name}
                          custom={i}
                          variants={navItemVariants}
                        >
                          <Link
                            href={item.link}
                            onClick={() => setIsMobile(false)}
                            className={cn(
                              'flex items-center px-4 py-3 text-base rounded-md transition-colors duration-200',
                              isActive
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            )}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      )
                    })}
                  </motion.div>

                  {/* Mobile Search */}
                  <div className='mt-auto pt-6 border-t'>
                    <button
                      className='flex items-center gap-2 w-full px-4 py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200'
                      onClick={() => {
                        console.log('Search clicked')
                        setIsMobile(false)
                      }}
                    >
                      <Search size={20} />
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
