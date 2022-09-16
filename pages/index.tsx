import { ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { NextPageWithLayout } from './_app'
import { getSortedPostsData, PostsData } from '../lib/post'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'
import styles from '../styles/main.module.css'

type Props = {
  allPostsData: PostsData[]
}

export const getStaticProps = async () => ({
  props: {
    allPostsData: getSortedPostsData(),
  },
})

const Home: NextPageWithLayout<Props> = ({ allPostsData }) => (
  <>
    <Head>
      <title>{siteTitle}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <p className={styles.description}>
      Hello! I&apos;m <code className={styles.code}>{siteTitle}</code>
    </p>
    <div className={styles.grid}>
      {allPostsData.map(({ id, date, title }) => (
        <div className={styles.card} key={id}>
          <Link href={`/posts/${id}`}>
            <a>
              <h2>{title} &rarr;</h2>
              <Date dateString={date}></Date>
            </a>
          </Link>
        </div>
      ))}
    </div>
  </>
)

Home.getLayout = (page: ReactElement) => <Layout footer>{page}</Layout>

export default Home
