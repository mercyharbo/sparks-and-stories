export type BlogPost = {
  id: string
  title: string
  slug: string
  author: string
  content: string
  cover_image: {
    url: string
    alt: string
  }
  created_at: string
  published_at: string
  updated_at: string
  meta_title: string
  meta_keywords: string[]
  tags: string[]
  reading_time: number
  status: string
  type_id: string
  user_id: string
  scheduled_at: string | null
}

export interface BlogResponse {
  contents: BlogPost[]
  page: number
  pageSize: number
  total: number
}
