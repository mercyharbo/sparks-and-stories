import Image from 'next/image'

export default function Home() {
  return (
    <div className=''>
      <div className='relative'>
        <Image
          src='https://ik.imagekit.io/m17ea4jzw/Big%20tower%20in%20Verona%20Italy%20o....jpg?updatedAt=1744589531930'
          width={1000}
          height={500}
          alt='cover image'
          className='object-cover object-center w-full h-[300px] sm:h-[500px]'
        />
      </div>
    </div>
  )
}
