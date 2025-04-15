import BlogList from '@/components/blogpost'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex flex-col gap-5 w-full'>
      <section className='relative h-[80vh] w-full'>
        <Image
          src='https://ik.imagekit.io/m17ea4jzw/Big%20tower%20in%20Verona%20Italy%20o....jpg?updatedAt=1744589531930'
          fill
          alt='cover image'
          className='object-cover object-center'
          sizes='100vw'
        />

        <div className='absolute inset-0 bg-black/50'>
          <div className='flex flex-col justify-center items-center gap-3 lg:w-1/2 w-full px-5 m-auto text-center h-full text-white'>
            <h1 className='text-3xl uppercase font-semibold'>
              Wanderlust Chronicles: Embracing the Beauty of Travel
            </h1>
            <p className='text-lg lg:text-base'>
              Travel isn&apos;t just about visiting new places; it&apos;s about
              experiencing different cultures, meeting people, and broadening
              one&apos;s perspective. Whether it&apos;s the serene beaches of
              Bali, the bustling streets of Tokyo, or the historic landmarks of
              Rome, each journey leaves an imprint on the soul.
            </p>
            <Button
              type='button'
              variant={'default'}
              className='capitalize h-12 px-5 rounded-md transition-all duration-300'
            >
              read more
            </Button>
          </div>
        </div>
      </section>

      <section className='grid grid-cols-1 lg:grid-cols-4 gap-5 px-5'>
        <BlogList />
      </section>
    </main>
  )
}
