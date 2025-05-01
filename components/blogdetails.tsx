'use client'

import {
  BarChart2,
  Calendar,
  Clock,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Separator } from './ui/separator'

import { urlFor } from '@/lib/utils'
import { client } from '@/sanity/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { PortableTextBlock } from '@portabletext/types'
import { PortableText, SanityDocument } from 'next-sanity'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  body,
  categories[]->{
    _id,
    title,
    slug
  },
  mainImage {
    asset->{
      _id,
      url
    }
  },
  "author": author->name,
  "authorImage": author->image.asset->url
}`

const options = { next: { revalidate: 30 } }

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  body: PortableTextBlock[] // You might want to type this more specifically
  categories: Array<{
    _id: string
    title: string
    slug: { current: string }
  }>
  mainImage: {
    asset: {
      _id: string
      url: string
    }
  }
  author: string
  authorBio: PortableTextBlock[]
  authorImage: string
  authorJoined: string
  authorPostsCount: number
  authorFollowers: number
  authorFollowing: number
  authorSocial?: {
    instagram: string
    twitter: string
    linkedin: string
  }
}

interface BlogDetailsCompProps {
  post: Post
}

export default function BlogDetailsComp({ post }: BlogDetailsCompProps) {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  // const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<SanityDocument[]>([])

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await client.fetch<SanityDocument[]>(
        POSTS_QUERY,
        {},
        options
      )
      setPosts(fetchedPosts)
      // setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
      // setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

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
          src={post.mainImage.asset.url}
          fill
          alt={post.title}
          className='object-cover object-center w-full'
          priority
        />

        <div className='absolute inset-0 bg-black/70'>
          <div className='flex flex-col justify-center items-center gap-3 lg:w-1/2 w-full px-5 m-auto text-center h-full text-white'>
            <div className='flex flex-wrap gap-2'>
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className='bg-[#0000008d] text-white text-xs capitalize font-semibold p-2 rounded-md'
                >
                  {category.title}
                </span>
              ))}
            </div>
            <div className='flex flex-col justify-start items-start gap-3 w-full'>
              <h1 className='lg:text-4xl text-2xl font-semibold uppercase'>
                {post.title}
              </h1>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-3 text-sm text-center lg:text-xs'>
              <span className='font-semibold text-gray-300'>
                By {post.author}
              </span>
              <span className='text-gray-300'>&mdash;</span>
              <span className='text-gray-300'>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
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
        <div className='prose prose-lg max-w-full px-4 w-full lg:w-[70%]'>
          <PortableText
            value={post.body}
            components={{
              block: {
                h1: ({ children }) => (
                  <h1 className='text-4xl font-bold my-4'>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className='text-3xl font-bold my-3'>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className='text-2xl font-bold my-2'>{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className='text-xl font-bold my-2'>{children}</h4>
                ),
                normal: ({ children }) => <p className='my-4'>{children}</p>,
                blockquote: ({ children }) => (
                  <blockquote className='border-l-4 border-gray-200 pl-4 my-4 italic'>
                    {children}
                  </blockquote>
                ),
              },
              types: {
                image: ({ value }) => {
                  return (
                    <figure className='my-6'>
                      <div className='relative h-[450px] w-full'>
                        {value?.asset?._ref && (
                          <Image
                            src={urlFor(value).url()}
                            alt={value.alt || 'Blog post image'}
                            fill
                            className='object-contain rounded-lg '
                          />
                        )}
                      </div>
                      {value?.caption && (
                        <figcaption className='text-center mt-2 text-gray-600 italic'>
                          {value.caption}
                        </figcaption>
                      )}
                    </figure>
                  )
                },
                code: ({ value }) => (
                  <pre className='bg-gray-800 text-white p-4 rounded-lg my-4 overflow-x-auto'>
                    <code>{value.code}</code>
                  </pre>
                ),
              },
              marks: {
                strong: ({ children }) => (
                  <strong className='font-bold'>{children}</strong>
                ),
                em: ({ children }) => <em className='italic'>{children}</em>,
                link: ({ children, value }) => (
                  <Link
                    href={value.href}
                    className='text-blue-500 hover:underline'
                  >
                    {children}
                  </Link>
                ),
              },
            }}
          />

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

        <Card className='w-full h-auto border-gray-200 lg:w-[30%] group hover:shadow-lg transition-all duration-300'>
          <CardHeader className='gap-3 relative'>
            <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
              <Avatar className='w-24 h-24 ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300'>
                <AvatarImage
                  src={post.authorImage}
                  alt={`${post.author}'s profile picture`}
                  className='object-cover object-center'
                />
                <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold'>
                  {post.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className='mt-[6rem] text-center'>
              <CardTitle className='text-2xl font-bold mb-2'>
                {post.author}
              </CardTitle>
              <div className='flex justify-center items-center gap-2 text-gray-500 mb-4'>
                <Calendar size={16} />
                <span className='text-sm'>
                  Joined{' '}
                  {new Date(post.authorJoined).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <CardDescription className='text-gray-600'>
                <PortableText
                  value={post.authorBio}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className='text-center leading-relaxed'>
                          {children}
                        </p>
                      ),
                    },
                  }}
                />
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className=''>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between items-center p-4 bg-gray-50 rounded-lg'>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-blue-600'>
                    {post.authorPostsCount}
                  </p>
                  <p className='text-sm text-gray-500'>Posts</p>
                </div>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-purple-600'>
                    {post.authorFollowers}
                  </p>
                  <p className='text-sm text-gray-500'>Followers</p>
                </div>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-green-600'>
                    {post.authorFollowing}
                  </p>
                  <p className='text-sm text-gray-500'>Following</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className='flex justify-center items-center gap-4 pt-4 border-t border-gray-100'>
            <Link
              href={post.authorSocial?.instagram || '#'}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-110 transition-transform duration-300'
            >
              <Instagram size={20} />
            </Link>
            <Link
              href={post.authorSocial?.twitter || '#'}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:scale-110 transition-transform duration-300'
            >
              <Twitter size={20} />
            </Link>
            <Link
              href={post.authorSocial?.linkedin || '#'}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:scale-110 transition-transform duration-300'
            >
              <Linkedin size={20} />
            </Link>
          </CardFooter>
        </Card>
      </article>

      <article className='relative h-[60vh] lg:h-[80vh] w-[90vw] lg:w-[80vw] mx-auto rounded-lg overflow-hidden '>
        <Image
          src={post.mainImage.asset.url}
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
                Subscribe to our newsletter for the latest updates and exclusive
                content.
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
                      <FormControl>
                        <Input
                          placeholder='enter your email'
                          {...field}
                          className='h-14'
                        />
                      </FormControl>

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

      <article className='grid grid-cols-1 px-5 lg:px-[8rem] lg:grid-cols-3 gap-10 my-5 lg:my-20 lg:gap-5 w-full'>
        {posts.slice(0, 3).map((post, index) => (
          <article
            key={index}
            className='bg-white flex flex-col justify-start items-start gap-5'
          >
            <Image
              src={post.mainImage.asset.url}
              alt={post.title}
              width={500}
              height={300}
              className='w-full h-56 object-cover rounded-lg'
            />
            <div className='flex flex-col justify-start items-start gap-2 w-full'>
              <h3 className='font-semibold text-lg'>{post.title}</h3>
              <div className='flex justify-start items-center gap-3'>
                <div className='flex justify-start items-center gap-2'>
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={20}
                    height={20}
                    className='w-8 h-8 object-cover object-top rounded-full'
                  />
                  <span className='text-black capitalize font-semibold'>
                    {post.author}
                  </span>
                </div>
                <span>&mdash;</span>
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className='text-gray-500 line-clamp-3'>
                {post.body[0].children[0].text}
              </p>

              <Link
                href={`/blog/${post.slug.current}`}
                className='underline text-black font-semibold hover:text-blue-400'
              >
                View Post
              </Link>
            </div>
          </article>
        ))}
      </article>
    </main>
  )
}
