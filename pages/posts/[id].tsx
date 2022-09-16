import { ReactElement } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { NextPageWithLayout } from '../_app'
import {
  getAllPostIds,
  getPostData,
  PostsParams,
  PostsData,
} from '../../lib/post'
import utilStyles from '../../styles/utils.module.css'

type Props = {
  postData: PostsData
}

export const getStaticPaths = async () => ({
  paths: getAllPostIds(),
  fallback: false,
})

export const getStaticProps = async ({ params }: PostsParams) => ({
  props: { postData: await getPostData(params.id) },
})

const Post: NextPageWithLayout<Props> = ({ postData }) => (
  <>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{postData.subtitle}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml ?? '' }} />
    </article>
  </>
)

Post.getLayout = (page: ReactElement) => <Layout home>{page}</Layout>

export default Post
