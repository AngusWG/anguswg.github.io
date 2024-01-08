const fs = require('fs')
const path = require('path')
const grayMatter = require('gray-matter')

function updateTags(filePath) {
  // 读取 Markdown 文件内容
  const markdownFileContent = fs.readFileSync(filePath, 'utf-8')

  // 解析 FrontMatter
  const { data, content } = grayMatter(markdownFileContent)

  // 如果 tags 没有发生变化，直接跳过当前文件
  if (Array.isArray(data.tags) && data.tags.every(tag => tag !== null)) {
    // console.log(`Tags in ${filePath} are up-to-date, skipping...`)
    return
  }

  // 备份当前文件
  const backupFilePath = filePath + '.bak'
  fs.copyFileSync(filePath, backupFilePath)

  // 初始化或者确保 data.tags 是一个数组
  data.tags = Array.isArray(data.tags) ? data.tags.filter(tag => tag !== null) : []

  // 更新 Markdown 文件内容
  const updatedMarkdownFileContent = grayMatter.stringify(content, data)

  // 写回文件
  fs.writeFileSync(filePath, updatedMarkdownFileContent, 'utf-8')

  console.log(`Updated tags in ${filePath} for ${data.tags}, backup created: ${backupFilePath}`)
}

// 遍历 ./blog 文件夹下的所有 Markdown 文件
function processBlogFolder(folderPath) {
  const files = fs.readdirSync(folderPath)

  files.forEach(file => {
    const filePath = path.join(folderPath, file)

    if (fs.statSync(filePath).isDirectory()) {
      // 如果是文件夹，则递归处理
      processBlogFolder(filePath)
    } else if (path.extname(filePath) === '.md') {
      // 如果是 Markdown 文件，则更新 tags
      updateTags(filePath)
    }
  })
}

module.exports = function myPlugin(context, options) {
  // 通过 context 插件配置获取 Docusaurus 项目的根目录
  const siteDir = context.siteDir

  // 构建 blog 文件夹的绝对路径
  const blogFolderPath = path.resolve(siteDir, 'blog')

  return {
    name: 'my-docusaurus-plugin',
    async loadContent() {
      // 执行更新操作
      processBlogFolder(blogFolderPath)
    },
    async contentLoaded({ content, actions }) {
      // 在 content 加载完成后执行其他操作
    },
  }
}
