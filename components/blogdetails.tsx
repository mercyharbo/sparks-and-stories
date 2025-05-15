'use client'

import { Calendar, MessageSquare, Send, ThumbsUp } from 'lucide-react'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import BlogContentRenderer from './blog-content-renderer'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'
import { Textarea } from './ui/textarea'

type CoverImage = {
  alt: string
  url: string
}

type ArticleData = {
  slug: string
  author: string
  content: string
  cover_image: CoverImage
  meta_keywords: string[]
  meta_title: string
  reading_time: number
  tags: string[]
  title: string
}

export type ArticleResponse = {
  author: string
  content: string
  content_type: string | null
  cover_image: CoverImage
  created_at: string
  data: ArticleData
  id: string
  meta_keywords: string[]
  meta_title: string
  published_at: string
  reading_time: number
  scheduled_at: string
  slug: string
  status: string
  tags: string[]
  title: string
  type_id: string
  updated_at: string
  user_id: string
}

// const formSchema = z.object({
//   email: z.string().email('Please enter a valid email address'),
// })

const comments = [
  {
    id: 1,
    author: {
      name: 'Sarah Miller',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    content:
      "This was such an insightful article! I've been struggling with these concepts for a while, and your explanation really cleared things up for me.",
    date: '2023-05-16T09:30:00Z',
    likes: 12,
  },
  {
    id: 2,
    author: {
      name: 'David Chen',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    content:
      "Great post! I'd love to see a follow-up on how this applies to larger scale applications.",
    date: '2023-05-16T14:45:00Z',
    likes: 8,
  },
]

export default function BlogDetailsComp({ slug }: { slug: string }) {
  const [post, setPost] = useState<ArticleResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/content/public/posts/${slug}`
          // { next: { revalidate: 60 } }
        )

        if (!res.ok) {
          throw new Error('Failed to fetch post')
        }

        const response = await res.json()
        console.log('response:', response)

        if (!response?.content) {
          throw new Error('Post not found')
        }

        setPost(response.content)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: '',
  //   },
  // })

  // const [isSubscribing, setIsSubscribing] = useState(false)

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   setIsSubscribing(true)
  //   try {
  //     // Here you would typically make an API call to handle the subscription
  //     await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
  //     form.reset()
  //     // You could add a toast notification here for success
  //   } catch (error) {
  //     // Handle error, maybe show a toast notification
  //     console.error('Failed to subscribe:', error)
  //   } finally {
  //     setIsSubscribing(false)
  //   }
  // }

  const socialShareIcons = [
    {
      key: '1',
      icon: (
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      ),
    },
    {
      key: '2',
      icon: (
        <TwitterShareButton url={currentUrl}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      ),
    },
    {
      key: '3',
      icon: (
        <WhatsappShareButton url={currentUrl}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      ),
    },
  ]

  if (isLoading || !post) {
    return (
      <main className='grid grid-cols-1 lg:grid-cols-[2.5fr,1fr] gap-x-12 gap-y-8 p-4 lg:p-8'>
        <article className='w-full relative overflow-hidden rounded-lg flex flex-col gap-8'>
          {/* Cover image skeleton */}
          <Skeleton className='w-full h-[40vh] lg:h-[60vh] rounded-lg' />

          <div className='space-y-6 max-w-7xl mx-auto w-full px-4 lg:px-8'>
            {/* Tags and social icons */}
            <div className='flex justify-between items-center gap-4'>
              <div className='flex flex-wrap gap-2'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className='h-6 w-20 rounded-md' />
                ))}
              </div>
              <div className='flex gap-2'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className='h-6 w-6 rounded-full' />
                ))}
              </div>
            </div>

            {/* Title and date */}
            <div className='flex flex-col gap-4'>
              <Skeleton className='h-10 w-3/4 rounded-md' />
              <Skeleton className='h-4 w-1/2 rounded-md' />
            </div>

            {/* Content skeleton */}
            <div className='space-y-4'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className='h-4 w-full rounded-md' />
              ))}
            </div>
          </div>
        </article>
      </main>
    )
  }

  return (
    <main className='max-w-7xl mx-auto w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8 p-4 lg:p-8'>
        <article className='lg:col-span-2 w-full relative overflow-hidden flex flex-col gap-8'>
          <div className='relative w-full h-[40vh] lg:h-[50vh] rounded-xl overflow-hidden'>
            <Image
              src={post.cover_image.url || '/placeholder.svg'}
              alt={post.cover_image.alt}
              className='object-cover object-center'
              fill
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
          </div>

          <div className='space-y-8 w-full'>
            {/* Author and Date Info */}
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center gap-3'>
                <Avatar className='h-12 w-12 border-2 border-white rounded-full flex justify-center items-center text-center'>
                  <AvatarImage
                    src={post.author || '/placeholder.svg'}
                    alt={post.author}
                  />
                  <AvatarFallback className='text-sm '>
                    {post.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium text-base'>
                    {/* {post.author.name } */} Mercy
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {/* {post.author.role} */} admin
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  <span className='text-sm'>
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <span className='text-sm'>•</span>
                <span className='text-sm'>{post.reading_time} min read</span>
              </div>
            </div>

            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
              {post.title}
            </h1>

            <div className='flex flex-wrap gap-2'>
              {post.tags.map((tag) => {
                return (
                  <Badge
                    key={tag}
                    variant={'default'}
                    className='text-sm capitalize px-3 py-1'
                  >
                    {tag}
                  </Badge>
                )
              })}
            </div>

            <Separator className='my-2' />

            <BlogContentRenderer content={post.content} />

            <Separator className='my-8' />

            <div className='flex items-center  gap-2'>
              <span className=''>Share:</span>
              {socialShareIcons.map((icon) => (
                <span key={icon.key} className='text-xl'>
                  {icon.icon}
                </span>
              ))}
            </div>

            <section className='space-y-8'>
              <h2 className='text-2xl font-bold flex items-center gap-2'>
                <MessageSquare className='h-5 w-5' />
                Comments
              </h2>

              <Card className='p-6 border-accent'>
                <h3 className='text-lg font-medium mb-4'>Leave a comment</h3>
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <label htmlFor='name' className='text-sm font-medium'>
                        Name
                      </label>
                      <Input id='name' placeholder='Your name' />
                    </div>
                    <div className='space-y-2'>
                      <label htmlFor='email' className='text-sm font-medium'>
                        Email
                      </label>
                      <Input id='email' type='email' placeholder='Your email' />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor='comment' className='text-sm font-medium'>
                      Comment
                    </label>
                    <Textarea
                      id='comment'
                      placeholder='Share your thoughts...'
                      rows={4}
                    />
                  </div>
                  <Button className='gap-2'>
                    <Send className='h-4 w-4' />
                    Post Comment
                  </Button>
                </div>
              </Card>

              <div className='space-y-6'>
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className='border border-accent rounded-lg p-4 space-y-3'
                  >
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-3'>
                        <Avatar>
                          <AvatarImage
                            src={comment.author.avatar || '/placeholder.svg'}
                            alt={comment.author.name}
                          />
                          <AvatarFallback>
                            {comment?.author?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-medium'>{comment.author.name}</p>
                          <p className='text-xs text-muted-foreground'>
                            {new Date(comment.date).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <Button variant='ghost' size='sm' className='h-8 gap-1'>
                        <ThumbsUp className='h-4 w-4' />
                        <span>{comment.likes}</span>
                      </Button>
                    </div>
                    <p className='text-sm'>{comment.content}</p>
                    <div className='flex gap-2'>
                      <Button variant='ghost' size='sm'>
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>

        <aside className='lg:col-span-1 w-full space-y-8 lg:sticky lg:top-8 lg:self-start'>
          <Card className='p-6 border-accent shadow-none'>
            <h3 className='text-lg font-medium'>Subscribe to our newsletter</h3>
            <div className='space-y-4'>
              <Input
                placeholder='Your email address'
                type='email'
                className='h-12'
              />
              <Button className='w-full h-12'>Subscribe</Button>
            </div>
          </Card>

          <Card className='p-6 border-accent shadow-none'>
            <h3 className='text-lg font-medium mb-4'>Related Posts</h3>
            <div className='space-y-4'>
              <div className='flex gap-3'>
                <div className='relative w-16 h-16 rounded overflow-hidden flex-shrink-0'>
                  <Image
                    src='/placeholder.svg?height=64&width=64'
                    alt='Related post'
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h4 className='font-medium text-sm'>
                    The Rise of Serverless Architecture
                  </h4>
                  <p className='text-xs text-muted-foreground'>May 10, 2023</p>
                </div>
              </div>
              <Separator className='border-accent ' />
              <div className='flex gap-3'>
                <div className='relative w-16 h-16 rounded overflow-hidden flex-shrink-0'>
                  <Image
                    src='/placeholder.svg?height=64&width=64'
                    alt='Related post'
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h4 className='font-medium text-sm'>
                    Optimizing React Performance
                  </h4>
                  <p className='text-xs text-muted-foreground'>
                    April 28, 2023
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </main>
  )
}
