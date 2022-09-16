import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { default as matter } from 'gray-matter'
import { remark } from 'remark'
import { default as html } from 'remark-html'

type BasePosts = {
  id: string
}

type BasePostsData = {
  date: string
  title: string
  subtitle: string
}

export type PostsParams = {
  params: BasePosts
}

export type PostsData = BasePosts &
  BasePostsData & {
    contentHtml?: string
  }

const postsDir = join(process.cwd(), 'posts')
const fileNames = readdirSync(postsDir)

export const getSortedPostsData = () => {
  const postsData = fileNames.map<PostsData>(e => {
    const id = e.replace(/\.md$/, '')
    const fullPath = join(postsDir, e)
    const fileContents = readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      id,
      ...(matterResult.data as BasePostsData),
    }
  })
  return postsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1
    else if (a > b) return -1
    else return 0
  })
}

export const getAllPostIds = () =>
  fileNames.map<PostsParams>(e => ({ params: { id: e.replace(/\.md$/, '') } }))

export const getPostData = async (id: string): Promise<PostsData> => {
  const fullPath = join(postsDir, `${id}.md`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const contentHtml = await remark().use(html).process(matterResult.content)
  return {
    id,
    contentHtml: contentHtml.toString(),
    ...(matterResult.data as BasePostsData),
  }
}
