import BlogList from '@/components/blogpost'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { client } from '@/sanity/client'
import { SanityDocument } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'

interface Category {
  _id: string
  title: string
}

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

const CATEGORIES_QUERY = `*[_type == "category"]{
  _id,
  title,
  
}`
const POSTS_COUNT_QUERY = `count(*[_type == "post"])`
const AUTHORS_QUERY = `*[_type == "author"]{
  _id,
  name,
  slug,
  image {
    asset->{
      url
    }
  },
  bio
}`
const options = { next: { revalidate: 30 } }

export default async function Home() {
  const result = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options)
  const categories = await client.fetch(CATEGORIES_QUERY, {}, options)
  const authors = await client.fetch(AUTHORS_QUERY, {}, options)
  const postsCount = await client.fetch(POSTS_COUNT_QUERY, {}, options)

  console.log('Posts:', result)
  console.log('Categories:', categories)
  console.log('Authors:', authors)
  console.log('Total Posts:', postsCount)

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

      <BlogList post={result} />

      <article className='relative h-[80vh] w-[90vw] lg:w-[80vw] mx-auto rounded-lg overflow-hidden my-5 lg:my-10'>
        <Image
          src={result[1]?.mainImage?.asset?.url}
          fill
          alt='cover image'
          className='object-cover object-center w-full'
        />
        <div className='absolute inset-0 bg-black/50'>
          <div className='flex flex-col justify-center items-center gap-3 lg:w-1/2 w-full px-5 m-auto text-center h-full text-white'>
            <h1 className='lg:text-3xl text-2xl uppercase font-semibold'>
              {result[1]?.title}
            </h1>
            <p className='text-lg lg:text-base'>
              {result[1]?.body?.[0]?.children?.[0]?.text}
            </p>
            <Link
              href={`/post/${result[1]?.slug?.current}`}
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

      <article className='flex flex-col justify-start items-start gap-5 w-full px-5 lg:px-20 py-10'>
        <Tabs defaultValue={categories[0]._id} className='w-full'>
          <TabsList className='flex justify-start gap-5 w-full h-12 overflow-x-auto snap-x snap-mandatory bg-transparent scrollbar-hide'>
            {categories.map((category: Category) => (
              <TabsTrigger
                key={category._id}
                value={category._id}
                className='snap-start flex-shrink-0 cursor-pointer'
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category: Category) => (
            <TabsContent
              key={category._id}
              value={category._id}
              className='border border-gray-300 w-full rounded-lg p-5'
            >
              <div className='container mx-auto max-w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5'>
                  {result
                    .filter((post) =>
                      post.categories?.some(
                        (cat: Category) => cat._id === category._id
                      )
                    )
                    .slice(0, 1)
                    .map((post) => (
                      <article
                        key={post._id}
                        className='bg-white relative flex flex-col justify-start items-start gap-5'
                      >
                        <div className='w-full aspect-video relative'>
                          <Image
                            src={post.mainImage.asset.url}
                            alt={post.title}
                            fill
                            className='object-cover rounded-lg'
                          />
                        </div>
                        <div className='absolute top-3 left-4 z-30 flex justify-start items-center flex-wrap gap-2'>
                          {post.categories.map(
                            (tag: { _id: string; title: string }) => (
                              <span
                                key={tag._id}
                                className='bg-[#0000008d] text-white text-xs capitalize font-semibold p-2 rounded-md'
                              >
                                {tag.title}
                              </span>
                            )
                          )}
                        </div>
                        <div className='flex flex-col justify-start items-start gap-4 w-full'>
                          <h3 className='text-lg font-semibold line-clamp-2'>
                            {post.title}
                          </h3>
                          <div className='flex flex-wrap justify-between items-center gap-5 w-full text-sm text-gray-500'>
                            <div className='flex justify-start items-center gap-3'>
                              <div className='flex justify-start items-center gap-2'>
                                <Image
                                  src={post.authorImage}
                                  alt={post.author}
                                  width={20}
                                  height={20}
                                  className='w-8 h-8 object-cover object-top rounded-full'
                                />
                                <span className='font-semibold text-black'>
                                  {post.author}
                                </span>
                              </div>
                              <span>&mdash;</span>
                              <span>
                                {new Date(post.publishedAt).toLocaleDateString(
                                  'en-US',
                                  {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                          <p className='text-gray-500 line-clamp-3'>
                            {post.body[0].children[0].text}
                          </p>
                          <Link
                            href={`/post/${post.slug.current}`}
                            className='underline text-black font-semibold hover:text-blue-400'
                          >
                            View Post
                          </Link>
                        </div>
                      </article>
                    ))}

                  <div className='flex flex-col gap-5'>
                    {result
                      .filter((post) =>
                        post.categories?.some(
                          (cat: Category) => cat._id === category._id
                        )
                      )
                      .slice(1, 4)
                      .map((post) => (
                        <Link
                          key={post._id}
                          href={`/post/${post.slug.current}`}
                          className='bg-white flex flex-col lg:flex-row justify-start items-start gap-3'
                        >
                          <div className='w-full h-full lg:w-1/2 aspect-video relative'>
                            <Image
                              src={post.mainImage.asset.url}
                              alt={post.title}
                              fill
                              className='object-cover h-full rounded-lg'
                            />
                          </div>
                          <div className='flex flex-col justify-start items-start gap-2 lg:w-2/3'>
                            <h3 className='font-semibold text-lg line-clamp-2'>
                              {post.title}
                            </h3>
                            <span className='text-sm text-gray-500'>
                              {new Date(post.publishedAt).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </article>
    </main>
  )
}
