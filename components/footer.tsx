import { Earth, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function FooterComp() {
  return (
    <footer className='h-[10rem] bg-black w-full text-white p-3 flex flex-col justify-center items-center gap-5 text-center lg:p-5'>
      <span className=''>
        Developed by{' '}
        <Link
          href={'https://x.com/codewithmercy'}
          className='text-destructive underline hover:text-destructive/foreground'
          target='_blank'
        >
          Code With Mercy
        </Link>{' '}
      </span>
      <div className='flex justify-center items-center gap-5'>
        <Link
          href={'https://x.com/codewithmercy'}
          target='_blank'
          className='hover:text-blue-400 transition-colors'
        >
          <Twitter />
        </Link>
        <Link
          href={'https://instagram.com/codewithmercy'}
          target='_blank'
          className='hover:text-pink-500 transition-colors'
        >
          <Instagram />
        </Link>
        <Link
          href={'https://codewithmercy.netlify.app/'}
          target='_blank'
          className='hover:text-green-500 transition-colors'
        >
          <Earth />
        </Link>
      </div>
    </footer>
  )
}
