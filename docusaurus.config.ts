import path from 'node:path'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import { themes } from 'prism-react-renderer'
import { Social } from './src/components/SocialLinks'
import { GiscusConfig } from './src/components/Comment'

const config: Config = {
  themes: ['@docusaurus/theme-mermaid'],
  title: 'AngusWG blog',
  url: 'https://anguswg.github.io/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'AngusWG',
  projectName: 'anguswg.github.io',
  customFields: {
    bio: '吾生有涯，阿巴阿巴。',
    description:
      '慢慢发现很多东西存在脑子里不靠谱，像内存一样，断个电就没了，所以啥屁事都会写点东西出来，哪怕以后忘了，也至少有文档证明自己弄过。希望我的经验能给你们带来启发。',
  },
  markdown: {
    mermaid: true,
  },
  themeConfig: {
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: ``,
    // },
    metadata: [
      {
        name: 'keywords',
        content: 'AngusWG, zza',
      },
      {
        name: 'keywords',
        content: 'blog, python, markdown, develop',
      },
      {
        name: 'keywords',
        content: '编程爱好者, Web开发者, 写过爬虫, 现在主攻全干',
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },

    navbar: {
      logo: {
        alt: 'AngusWG',
        src: 'img/logo.webp',
        srcDark: 'img/logo.webp',
      },
      hideOnScroll: true,
      items: [
        {
          label: '博客',
          position: 'right',
          to: 'blog',
        },
        {
          label: '归档',
          position: 'left',
          to: 'blog/archive',
        },
        {
          label: '友链',
          position: 'right',
          to: 'blog/friends',
        },
        // {
        //   label: 'Tags',
        //   position: 'left',
        //   to: '/blog/tags',
        // },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          label: 'GitHub',
          position: 'right',
          href: 'https://github.com/AngusWG/anguswg.github.io/',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            { label: '博客', to: 'blog' },
            { label: '归档', to: 'blog/archive' },
            { label: 'RSS', to: '/blog/rss.xml' },
          ],
        },
        {
          title: '社交媒体',
          items: [
            // { label: '关于我', to: '/about' },
            { label: 'GitHub', href: 'https://github.com/AngusWG' },
            { label: 'Twitter', href: 'https://twitter.com/Angus_Zou' },
            { label: "Linkedin", href: "https://www.linkedin.com/in/angus-zou-a48672154/"},
          ],
        },
        {
          title: '更多',
          items: [
            { label: '友链', position: 'right', to: 'blog/friends' },
            { label: '关于', position: 'right', to: '/blog/about' },
            {
              label: 'Fork by kuizuo/blog',
              position: 'right',
              href: 'https://github.com/kuizuo/blog',
            },
          ],
        },
      ],
      copyright: `Built by Docusaurus | Copyright © ${new Date().getFullYear()} AngusWG blog | MIT License`,
    },
    // algolia: {
    //   appId: 'H5ZK2BY49V',
    //   apiKey: '0c0d4b4e4b7e04317eae247ce1001393',
    //   indexName: 'AngusWG',
    // },
    prism: {
      theme: themes.oneLight,
      darkTheme: themes.oneDark,
      additionalLanguages: [
        'bash',
        'json',
        'java',
        'python',
        'php',
        'graphql',
        'rust',
        'toml',
        'protobuf',
      ],
      defaultLanguage: 'javascript',
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    giscus: {
      repo: 'AngusWG/anguswg.github.io',
      repoId: 'R_kgDOLCLxHw',
      category: 'General',
      categoryId: 'DIC_kwDOLCLxH84CcTDP',
      theme: 'light',
      darkTheme: 'dark_dimmed',
    } satisfies Partial<GiscusConfig>,
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    liveCodeBlock: { playgroundPosition: 'top' },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.scss'],
        },
        sitemap: {
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-YX6DQTJZBL',
          anonymizeIP: true,
        },
        // debug: true,
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    path.resolve(__dirname, './src/plugin/plugin-utils-tags'),
    'docusaurus-plugin-image-zoom',
    'docusaurus-plugin-sass',
    path.resolve(__dirname, './src/plugin/plugin-baidu-tongji'),
    path.resolve(__dirname, './src/plugin/plugin-baidu-push'),
    [
      path.resolve(__dirname, './src/plugin/plugin-content-blog'), // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        path: 'blog',
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/Anugus/anguswg.github.io/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogDescription: '代码人生：编织技术与生活的博客之旅',
        blogSidebarCount: 10,
        blogSidebarTitle: 'Blogs',
        postsPerPage: 10,
        showReadingTime: true,
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        feedOptions: {
          type: 'all',
          title: 'AngusWG',
          copyright: `Built by Docusaurus | Copyright © ${new Date().getFullYear()} AngusWG blog | MIT License`,
        },
      },
    ],
    // [
    //   require.resolve('@cmfcmf/docusaurus-search-local'),
    //   {
    //     // Options here
    //     language: ['en', 'zh'],
    //   },
    // ],
    ['@docusaurus/plugin-ideal-image', { disableInDev: false }],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#12affa' },
        ],
      },
    ],
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'AngusWG blog',
      },
    },
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css',
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css',
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
}

export default config
