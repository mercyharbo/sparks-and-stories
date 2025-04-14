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
import Link from 'next/link'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function NavbarComp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='bg-transparent fixed top-0 left-0 z-20 h-[5rem] w-full flex flex-row justify-between items-center px-5 py-3 lg:px-16 lg:py-5'>
      <h1 className='text-3xl font-semibold '>Sparks & stories</h1>
      <NavigationMenu className='lg:block hidden'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href='/' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/blogs' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Blogs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/schedules' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Schedules
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/draft' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Draft
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className='relative'>
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
    </div>
  )
}
