export type Social = {
  github?: string
  twitter?: string
  juejin?: string
  csdn?: string
  qq?: string
  wx?: string
  cloudmusic?: string
  zhihu?: string
  email?: string
  steam?: string
}

const social: Social = {
  github: 'https://github.com/AngusWG',
  twitter: 'https://twitter.com/Angus_Zou',
  // juejin: 'https://juejin.cn/user/1565318510545901',
  // csdn: 'https://blog.csdn.net/AngusWG',
  // qq: 'https://img.AngusWG.cn/qq.png',
  // wx: 'https://img.AngusWG.cn/wechat.png',
  wx: 'https://github.com/AngusWG/anguswg.github.io/blob/main/blog/images/wechat.png?raw=true',
  // zhihu: 'https://www.zhihu.com/people/AngusWG',
  // cloudmusic: 'https://music.163.com/#/user/home?id=1333010742',
  email: 'mailto:z740713651@outlook.com',
  steam: 'https://steamcommunity.com/profiles/76561198216863856/',
}

const SOCIAL = {
  github: {
    href: social.github,
    title: 'GitHub',
    icon: 'ri:github-line',
    color: '#010409',
  },
  juejin: {
    href: social.juejin,
    title: '掘金',
    icon: 'simple-icons:juejin',
    color: '#1E81FF',
  },
  twitter: {
    href: social.twitter,
    title: 'Twitter',
    icon: 'ri:twitter-line',
    color: '#1da1f2',
  },
  qq: {
    href: social.qq,
    title: 'QQ',
    icon: 'ri:qq-line',
    color: '#1296db',
  },
  wx: {
    href: social.wx,
    title: '微信',
    icon: 'ri:wechat-2-line',
    color: '#07c160',
  },
  zhihu: {
    href: social.zhihu,
    title: '知乎',
    icon: 'ri:zhihu-line',
    color: '#1772F6',
  },
  steam: {
    href: social.steam,
    title: 'steam',
    icon: 'ri:steam-line',
    color: '#1772F6',
  },
  email: {
    href: social.email,
    title: '邮箱',
    icon: 'ri:mail-line',
    color: '#D44638',
  },
  cloudmusic: {
    href: social.cloudmusic,
    title: '网易云',
    icon: 'ri:netease-cloud-music-line',
    color: '#C20C0C',
  },
  rss: {
    href: '/blog/rss.xml',
    title: 'RSS',
    icon: 'ri:rss-line',
    color: '#FFA501',
  },
}

export default SOCIAL
