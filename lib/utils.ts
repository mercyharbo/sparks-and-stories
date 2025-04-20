import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { client } from '@/sanity/client'
import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const imageBuilder = createImageUrlBuilder(client)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const urlFor = (source: SanityImageSource) => {
  return imageBuilder.image(source)
}
