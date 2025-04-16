'use client'

import { MenubarSeparator } from '@/components/ui/menubar'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { cn } from '@/lib/utils'
import { LogOutIcon, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Blogs', link: '/blogs' },
  { name: 'Schedules', link: '/schedules' },
  { name: 'Draft', link: '/draft' },
]

export default function NavbarComp() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  return (
    <div className='bg-white fixed top-0 left-0 z-40 h-[5rem] w-full flex flex-row justify-between items-center px-5 py-3 lg:px-16 lg:py-5'>
      <Link href='/'>
        <h1 className='text-3xl font-semibold capitalize '>Sparks & stories</h1>
      </Link>

      <NavigationMenu className='lg:block hidden'>
        <NavigationMenuList className='gap-5'>
          {navItems.map((item) => {
            const isActive = pathname === item.link

            return (
              <NavigationMenuItem key={item.name}>
                <Link href={item.link} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive ? 'bg-gray-600 text-white' : ''
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
      <div className='relative flex flex-row justify-start items-center gap-3'>
        <Avatar
          onMouseDown={() => setIsOpen(!isOpen)}
          className={cn(
            'w-14 h-14 cursor-pointer rounded-full',
            isOpen ? 'ring-1 ring-gray-400 p-1 rounded-full' : ''
          )}
        >
          <AvatarImage
            src='https://ik.imagekit.io/m17ea4jzw/image.png?updatedAt=1744584867568'
            className='object-cover object-center'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <button
          type='button'
          className='lg:hidden text-4xl text-gray-500 hover:text-gray-700'
          onClick={() => setIsMobile(!isMobile)}
        >
          <Menu />
        </button>

        {isOpen && (
          <div className='absolute top-16 right-2 w-[250px] rounded-md p-2 bg-white ring-1 ring-gray-400 flex flex-col justify-start items-start'>
            <Link
              href='/login'
              passHref
              className='h-12 bg-gray-100 rounded-md px-2 cursor-pointer flex justify-start items-center w-full hover:bg-gray-400'
            >
              Login
            </Link>
            <MenubarSeparator />
            <Link
              href='/signup'
              passHref
              className='h-12 bg-gray-100 rounded-md px-2 cursor-pointer flex justify-start items-center w-full hover:bg-gray-400'
            >
              Signup
            </Link>
            <MenubarSeparator />
            <Link
              href='/profile'
              passHref
              className='h-12 bg-gray-100 rounded-md px-2 cursor-pointer flex justify-start items-center w-full hover:bg-gray-400'
            >
              Profile
            </Link>
          </div>
        )}
      </div>

      {isMobile && (
        <div className='fixed top-0 left-0 h-screen w-[80vw] bg-black text-white p-5 z-30'>
          <div className='flex flex-col justify-between items-start h-[80vh]'>
            <Link href='/'>
              <h1 className='text-3xl capitalize font-semibold text-white'>
                Sparks & stories
              </h1>
            </Link>

            <div className='flex flex-col justify-start items-start gap-3 w-full'>
              {navItems.map((item) => {
                const isActive = pathname === item.link

                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    legacyBehavior
                    passHref
                  >
                    <span
                      className={cn(
                        `text-white h-12 w-full rounded-md flex justify-start items-center px-2 text-xl`,
                        isActive ? 'bg-gray-600' : 'hover:bg-gray-400'
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                )
              })}
            </div>

            <button
              type='button'
              className='flex flex-row justify-start items-center gap-3 w-full rounded-md h-12 hover:bg-gray-400'
            >
              {' '}
              <LogOutIcon /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
