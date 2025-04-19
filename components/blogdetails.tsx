'use client'

import blogPosts from '@/components/blogcontent'
import post1 from '@/components/post.json'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BarChart2, Clock, Instagram, Twitter } from 'lucide-react'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export default function BlogDetailsComp() {
  const headerBlock = post1.blocks.find(
    (block) => block.type === 'header' && block.data.level === 2
  )
  const imageBlock = post1.blocks.find((block) => block.type === 'image')
  const contentBlocks = post1.blocks.slice(2) // Skip the header and first image

  const url = typeof window !== 'undefined' ? window.location.href : ''

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <main className='flex flex-col justify-center items-center gap-5 w-full'>
      <article className='relative h-[60vh] lg:h-[80vh] w-[90vw] lg:w-[90vw] mx-auto rounded-lg overflow-hidden mt-[3rem]'>
        <Image
          src={imageBlock?.data?.file?.url || ''}
          fill
          alt='cover image'
          className='object-cover object-center w-full'
        />

        <div className='absolute inset-0 bg-black/50'>
          <div className='flex flex-col justify-center items-center gap-3 lg:w-1/2 w-full px-5 m-auto text-center h-full text-white'>
            <div className='flex flex-wrap gap-2'>
              <span className='bg-[#0000008d] text-white text-xs capitalize font-semibold p-2 rounded-md'>
                travel
              </span>
              <span className='bg-[#0000008d] text-white text-xs capitalize font-semibold p-2 rounded-md'>
                adventure
              </span>
              <span className='bg-[#0000008d] text-white text-xs capitalize font-semibold p-2 rounded-md'>
                photography
              </span>
            </div>
            <div className='flex flex-col justify-start items-start gap-3 w-full'>
              <h1 className='lg:text-3xl text-2xl font-semibold uppercase'>
                {headerBlock?.data.text}
              </h1>
              <span className=''>{imageBlock?.data.caption}</span>
            </div>
            <div className='flex justify-start items-center gap-3 text-sm lg:text-xs'>
              <span className='font-semibold text-gray-300'>
                by Mercy Chemutai
              </span>
              <span className='text-gray-300'>&mdash;</span>
              <span className='text-gray-300'>
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span>&bull;</span>
              <span className='text-gray-300 flex justify-start items-center gap-2'>
                <Clock size={12} /> 5 min read
              </span>
              <span>&bull;</span>
              <span className='text-gray-300 flex justify-start items-center gap-2'>
                {' '}
                <BarChart2 size={12} /> 1.2K views
              </span>
            </div>
          </div>
        </div>
      </article>

      <article className='flex flex-col justify-start items-start lg:flex-row gap-10 w-full px-5 lg:px-20 lg:py-10'>
        <div className='prose prose-lg max-w-full px-4 py-8 w-full lg:w-[70%]'>
          {contentBlocks.map((block, index) => {
            switch (block.type) {
              case 'header':
                return (
                  <h2
                    key={index}
                    className={`text-2xl font-bold mt-6 mb-4 ${
                      block.data.level === 3 ? 'text-xl' : 'text-2xl'
                    }`}
                  >
                    {block.data.text}
                  </h2>
                )
              case 'paragraph':
                return (
                  <div
                    key={index}
                    className='my-4'
                    dangerouslySetInnerHTML={{ __html: block.data.text || '' }}
                  />
                )
              case 'image':
                return (
                  <figure key={index} className='my-6'>
                    <div className='relative h-[400px] w-full'>
                      <Image
                        src={block.data.file?.url || ''}
                        alt={block.data.caption || ''}
                        fill
                        className='object-cover rounded-lg'
                      />
                    </div>
                    {block.data.caption && (
                      <figcaption className='text-center mt-2 text-gray-600 italic'>
                        {block.data.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              case 'list':
                return (
                  <ul key={index} className='list-disc pl-6 my-4'>
                    {(block.data.items ?? []).map((item, i) => (
                      <li key={i} className='mb-2'>
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              case 'quote':
                return (
                  <blockquote
                    key={index}
                    className='border-l-4 border-gray-300 pl-4 my-6 italic'
                  >
                    <p>{block.data.text}</p>
                    {block.data.caption && (
                      <footer className='text-gray-600 mt-2'>
                        — {block.data.caption}
                      </footer>
                    )}
                  </blockquote>
                )
              case 'code':
                return (
                  <pre
                    key={index}
                    className='bg-gray-800 text-white p-4 rounded-lg my-4 overflow-x-auto'
                  >
                    <code>{block.data.code}</code>
                  </pre>
                )
              case 'delimiter':
                return <hr key={index} className='my-8 border-gray-200' />
              default:
                return null
            }
          })}

          <div className='flex flex-col gap-5 w-full'>
            <div className='flex gap-3 text-xl'>
              <h4 className='text-lg font-semibold uppercase'>Share:</h4>
              <FacebookShareButton url={url}>
                <FacebookIcon size={25} />
              </FacebookShareButton>
              <TwitterShareButton url={url}>
                <TwitterIcon size={25} />
              </TwitterShareButton>
              <WhatsappShareButton url={url}>
                <WhatsappIcon size={25} />
              </WhatsappShareButton>
            </div>

            <Separator />

            <span className='txt-lg text-gray-500 uppercase'>
              commnt goes here...
            </span>
          </div>
        </div>

        <Card className='w-full h-auto lg:w-[25%] '>
          <CardHeader className='gap-4'>
            <Avatar className='w-20 h-20'>
              <AvatarImage
                src='https://ik.imagekit.io/m17ea4jzw/image.png?updatedAt=1744584867568'
                className='object-cover object-center'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle>Mercy Chemutai</CardTitle>
            <CardDescription>
              {' '}
              A passionate travel enthusiast and photographer with over 5 years
              of experience capturing moments across continents. Through my lens
              and words, I share authentic stories of diverse cultures, hidden
              gems, and breathtaking landscapes. When not exploring new
              destinations, I&apos;m either planning my next adventure or
              mentoring aspiring travel photographers.
            </CardDescription>
          </CardHeader>

          <CardFooter className='flex justify-start items-center gap-4'>
            <Link
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              //   className='text-gray-600 ring-2 ring-blue-500 rounded-lg shadow-xl p-1.5 hover:text-pink-600'
            >
              <Instagram size={25} />
            </Link>
            <Link
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              //   className='text-gray-600 ring-2 ring-blue-500 rounded-lg shadow-xl p-1.5 hover:text-blue-400'
            >
              <Twitter size={25} />
            </Link>
          </CardFooter>
        </Card>
      </article>

      <article className='grid grid-cols-1 content-center place-items-center px-5 lg:px-20 lg:grid-cols-4 gap-10 lg:gap-5 w-full'>
        {blogPosts.slice(0, 4).map((post, index) => (
          <article
            key={index}
            className='bg-white flex flex-col justify-start items-start gap-5'
          >
            <Image
              src={post.image}
              alt={post.title}
              width={500}
              height={300}
              className='object-cover rounded-lg'
            />
            <div className='flex flex-col justify-start items-start gap-2 w-full'>
              <h3 className='font-semibold text-lg'>{post.title}</h3>
              <div className='flex justify-start items-center gap-3'>
                <span className='font-semibold text-black'>{post.author}</span>
                <span>&mdash;</span>
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className='text-gray-500'>{post.excerpt}</p>

              <Link
                href={`/blog/${post.title.replace(/\s+/g, '-').toLowerCase()}`}
                className='underline text-black font-semibold hover:text-blue-400'
              >
                View Post
              </Link>
            </div>
          </article>
        ))}
      </article>

      <article className='relative h-[60vh] lg:h-[80vh] w-[90vw] lg:w-[90vw] mx-auto rounded-lg overflow-hidden my-5 py-5 lg:my-20'>
        <Image
          src={imageBlock?.data?.file?.url || ''}
          fill
          alt='cover image'
          className='object-cover object-center w-full'
        />

        <div className='absolute inset-0 bg-black/80'>
          <div className='flex flex-col justify-center items-center gap-8 lg:w-1/2 w-full px-5 m-auto text-center h-full text-white'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-2xl capitalize font-semibold'>
                Sign up for our newsletter{' '}
              </h3>
              <p className='text-sm'>
                Stay updated with the latest travel tips and stories
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full flex flex-col gap-4'
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='enter your email'
                          {...field}
                          className='h-14'
                        />
                      </FormControl>
                      {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' size={'xl'}>
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </article>
    </main>
  )
}
