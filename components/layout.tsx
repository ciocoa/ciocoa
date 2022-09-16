import { NextPage } from 'next'
import { PropsWithChildren } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

type Props = PropsWithChildren & {
  home?: boolean
  footer?: boolean
}

const name = 'ciocoa'
export const siteTitle = 'ciocoa'

const Layout: NextPage<Props> = ({ children, home, footer }) => (
  <>
    <Head>
      <meta name="description" content={siteTitle} />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Image
            priority
            src="/images/avatar.png"
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt={name}
          />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </a>
      </Link>
    </header>
    <main className={styles.main}>{children}</main>
    {home && (
      <div className={styles.backToHome}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    )}
    {footer && (
      <footer className={styles.footer}>
        <span>
          Copyright &copy; 2022 <a href="https://github.com/ciocoa">{name}</a>
        </span>
      </footer>
    )}
  </>
)

export default Layout
