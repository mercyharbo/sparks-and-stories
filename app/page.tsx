import BlogList from '@/components/blogpost'
import { Button } from '@/components/ui/button'
import { client } from '@/sanity/client'
import { SanityDocument } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'

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

export default async function Home() {
  const result = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)

  return (
    <main className='flex flex-col gap-5 w-full'>
      <section className='relative h-[80vh] w-full'>
        <Image
          src={result[0]?.mainImage?.asset?.url}
          fill
          alt={result[0]?.title}
          className='object-cover object-center'
          sizes='100vw'
        />

        <div className='absolute inset-0 bg-black/50'>
          <div className='flex flex-col justify-center items-center gap-3 lg:w-1/2 w-full px-5 m-auto text-center h-full text-white'>
            <h1 className='lg:text-3xl text-2xl uppercase font-semibold'>
              {result[0]?.title}
            </h1>
            <p className='text-lg lg:text-base'>
              {result[0]?.body?.[0]?.children?.[0]?.text}
            </p>
            <Link
              href={`/post/${result[0]?.slug?.current}`}
              className='inline-block'
            >
              <Button
                type='button'
                variant={'default'}
                className='capitalize h-12 px-5 rounded-md transition-all duration-300'
              >
                read more
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <BlogList />

      <article className='relative h-[80vh] w-[90vw] lg:w-[80vw] mx-auto rounded-lg overflow-hidden my-5 lg:my-10'>
        <Image
          src={result[0]?.mainImage?.asset?.url}
          fill
          alt='cover image'
          className='object-cover object-center w-full'
        />
        <div className='absolute inset-0 bg-black/50'>
          <div className='flex flex-col justify-center items-center gap-3 lg:w-1/2 w-full px-5 m-auto text-center h-full text-white'>
            <h1 className='lg:text-3xl text-2xl uppercase font-semibold'>
              {result[0]?.title}
            </h1>
            <p className='text-lg lg:text-base'>
              {result[0]?.body?.[0]?.children?.[0]?.text}
            </p>
            <Link
              href={`/post/${result[0]?.slug?.current}`}
              className='inline-block'
            >
              <Button
                type='button'
                variant={'default'}
                className='capitalize h-12 px-5 rounded-md transition-all duration-300'
              >
                read more
              </Button>
            </Link>
          </div>
        </div>
      </article>

      {/* <article className='flex flex-col justify-start items-start gap-5 w-full px-5 lg:px-20 py-10'>
        <Tabs defaultValue='all' className='w-full'>
          <TabsList className='flex justify-start gap-5 w-full overflow-x-auto snap-x snap-mandatory bg-transparent scrollbar-hide'>
            <TabsTrigger value='all' className='snap-start flex-shrink-0'>
              All
            </TabsTrigger>
            <TabsTrigger value='travel' className='snap-start flex-shrink-0'>
              Travel
            </TabsTrigger>
            <TabsTrigger value='lifestyle' className='snap-start flex-shrink-0'>
              Lifestyle
            </TabsTrigger>
            <TabsTrigger value='food' className='snap-start flex-shrink-0'>
              Food
            </TabsTrigger>
            <TabsTrigger value='culture' className='snap-start flex-shrink-0'>
              Culture
            </TabsTrigger>
            <TabsTrigger
              value='photography'
              className='snap-start flex-shrink-0'
            >
              Photography
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value='all'
            className='border border-gray-300 rounded-lg p-5'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-5'>
              {blogPosts.slice(0, 1).map((post, index) => (
                <article
                  key={index}
                  className='bg-white relative flex flex-col justify-start items-start gap-5'
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={500}
                    height={300}
                    className='w-full h-auto object-cover rounded-lg'
                  />
                  <div className='absolute top-3 left-4 z-30 flex justify-start items-center flex-wrap gap-2'>
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='bg-[#0000008d] text-white text-xs capitalize font-semibold p-2 rounded-md'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className='flex flex-col justify-start items-start gap-4 w-full'>
                    <h3 className='text-lg font-semibold'>{post.title}</h3>
                    <div className='flex justify-between items-center gap-5 w-auto text-sm text-gray-500'>
                      <div className='flex justify-start items-center gap-3'>
                        <span className='font-semibold text-black'>
                          {post.author}
                        </span>
                        <span>&mdash;</span>
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <span>&bull;</span>
                      <span className='text-sm text-gray-500 flex justify-start items-center gap-2'>
                        {' '}
                        <Share2 size={15} /> {post.shares} shares
                      </span>
                    </div>
                    <p className='text-gray-500'>{post.excerpt}</p>
                    <Link
                      href={`/post/${post.title
                        .replace(/\s+/g, '-')
                        .toLowerCase()}`}
                      className='underline text-black font-semibold hover:text-blue-400'
                    >
                      View Post
                    </Link>
                  </div>
                </article>
              ))}

              <div className='grid grid-cols-1 gap-5'>
                {blogPosts.slice(1, 4).map((post, index) => (
                  <article
                    key={index}
                    className='bg-white flex justify-start items-start gap-3 flex-col lg:flex-row'
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
                        <span className='font-semibold text-black'>
                          {post.author}
                        </span>
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
                        href={`/blog/${post.title
                          .replace(/\s+/g, '-')
                          .toLowerCase()}`}
                        className='underline text-black font-semibold hover:text-blue-400'
                      >
                        View Post
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value='password'>Change your password here.</TabsContent>
        </Tabs>
      </article> */}
    </main>
  )
}
