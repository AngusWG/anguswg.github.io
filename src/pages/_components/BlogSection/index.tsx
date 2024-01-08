import React from 'react'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BlogPost } from '@docusaurus/plugin-content-blog'
import { usePluginData } from '@docusaurus/useGlobalData'
import Translate from '@docusaurus/Translate'
import Link from '@docusaurus/Link'
import Image from '@theme/IdealImage'

import styles from './styles.module.scss'
import SectionTitle from '../SectionTitle'

const BLOG_POSTS_COUNT = 12

function DateFunc({ date }: { date: Date }) {
  var iso_data = new Date(date).toISOString().slice(0, 10)
  return (
    <time dateTime={iso_data} itemProp="datePublished">
      {iso_data}
    </time>
  )
}

export function BlogItem({ post }: { post: BlogPost }) {
  const {
    metadata: { permalink, frontMatter, title, description, date },
  } = post

  return (
    <motion.li
      className={clsx('card', 'margin-bottom--md')}
      key={permalink}
      initial={{ y: 100, opacity: 0.001 }}
      whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
      whileHover={{ y: -10, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
    >
      <div className={clsx('card__body', styles.blogItem)}>
        <div className={styles.title}>
          <Link href={permalink}>{title}</Link>
        </div>
        <div className={styles.date}>
          <DateFunc date={date} />
        </div>
      </div>
    </motion.li>
  )
}

export default function BlogSection(): JSX.Element {
  const blogData = usePluginData('docusaurus-plugin-content-blog') as {
    posts: BlogPost[]
    postNum: number
    tagNum: number
  }

  const posts = blogData.posts.slice(0, BLOG_POSTS_COUNT)

  const ref = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20], {
    clamp: false,
  })

  if (blogData.postNum === 0) {
    return <>作者还没有写过博客哦</>
  }

  return (
    <section className={clsx('container padding-vert--sm', styles.blogContainer)}>
      <SectionTitle icon="ri:quill-pen-line" href={'/blog'}>
        <Translate id="homepage.blog.title">近期博客</Translate>
      </SectionTitle>
      {posts.map((post, index) => (
        // <div ref={ref} className={clsx('row', styles.list)}>
        <div className="col col-6 margin-top--sm" key={index}>
          <motion.div key={index}>
            <BlogItem key={post.id} post={post} />
          </motion.div>
        </div>
        // </div>
      ))}
    </section>
  )
}
