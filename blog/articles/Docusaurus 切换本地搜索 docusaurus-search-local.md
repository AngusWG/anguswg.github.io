---
title: Docusaurus 切换本地搜索 docusaurus-search-local
date: 2024-10-10 17:12:53
permalink: /pages/95b43138-c774-4e39-816a-abb0cd449f07/
tags:
  - 
categories:
  - 编程
article: true
---

# Docusaurus 切换本地搜索 docusaurus-search-local

- Docusaurus (kuizuo-blog) 当前是 Algolia 搜索，想切换成 docusaurus-search-local 搜索。
  - Algolia 好像看我不活跃 发邮件 `Your suspended application will be removed in 2 days.` ，弄过一次，过了几个月又报这个，直接换成本地检索好了。
  - 本地检索不支持句子中的中文，只能直接搜索一段话，并不是特别好用。
    - 列如：`我最近用的版本：aaabbb`
      - 搜索`版本` 是搜索不到这句的
      - 搜索`我最近用的版本` 才搜索到对应的这篇文章。
  - 需要安装 结巴分词 jieba

## 安装

```bash
pnpm i
pnpm i @cmfcmf/docusaurus-search-local
pnpm i @node-rs/jieba
```

## 修改

`vim docusaurus.config.ts`

```typescript

module.exports = {
  // ...
  themeConfig: {
    // ⭐ 注释掉 algolia 的配置
    // algolia: {
    //   appId: 'aaaa',
    //   apiKey: 'bbbb',
    //   indexName: 'index_name',
    // },
  }
  // ...
  plugins: [require.resolve("@cmfcmf/docusaurus-search-local")],

  // or, if you want to specify options:

  // ...
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        // Options here
        // ⭐ 增加中文配置
        language: ['en', 'zh'], 
      },
    ],
  ],
};
```

## 启动

- `pnpm run` github 上说直接启动不会开启搜索
  - 需要 build serve 才行

```bash
npm run docusaurus build
npm run docusaurus serve
```

## 报错

### 安装 nodejieba 报错

- 已经改包 名为 node-rs/jieba
  - pnpm i @node-rs/jieba

```text
(base) PS D:\CodeProjects\anguswg.github.io> pnpm install nodejieba@^2.5.0
 WARN  deprecated loadsh@0.0.4: This is a typosquat on the popular Lodash package. This is not maintained nor is the original Lodash package.
 WARN  22 deprecated subdependencies found: are-we-there-yet@2.0.0, gauge@3.0.2, npmlog@5.0.1, rollup-plugin-terser@7.0.2, sourcemap-codec@1.4.8, stable@0.1.8, workbox-background-sync@6.6.1, workbox-broadcast-update@6.6.1, workbox-build@6.6.1, workbox-cacheable-response@6.6.1, workbox-core@6.6.1, workbox-expiration@6.6.1, workbox-google-analytics@6.6.1, workbox-navigation-preload@6.6.1, workbox-precaching@6.6.1, workbox-range-requests@6.6.1, workbox-recipes@6.6.1, workbox-routing@6.6.1, workbox-strategies@6.6.1, workbox-streams@6.6.1, workbox-sw@6.6.1, workbox-window@6.6.1     
Packages: +30 -1
++++++++++++++++++++++++++++++-
Progress: resolved 1524, reused 1523, downloaded 0, added 0, done
node_modules/.pnpm/nodejieba@2.6.0/node_modules/nodejieba: Running install script, failed in 1.9s
.../node_modules/nodejieba install$ node-pre-gyp install --fallback-to-build
│ node-pre-gyp info it worked if it ends with ok
│ node-pre-gyp info using node-pre-gyp@1.0.11
│ node-pre-gyp info using node@20.10.0 | win32 | x64
│ node-pre-gyp info check checked for "D:\CodeProjects\anguswg.github.io\node_modules\.pnpm\nodejieba@2.6.0\node_modules\nodejieba\build\Releas…  
│ node-pre-gyp http GET https://github.com/yanyiwu/nodejieba/releases/download/v2.6.0/nodejieba-v2.6.0-node-v115-win32-x64.tar.gz
│ node-pre-gyp ERR! install response status 404 Not Found on https://github.com/yanyiwu/nodejieba/releases/download/v2.6.0/nodejieba-v2.6.0-nod…  
│ node-pre-gyp WARN Pre-built binaries not installable for nodejieba@2.6.0 and node@20.10.0 (node-v115 ABI, unknown) (falling back to source co…  
│ node-pre-gyp WARN Hit error response status 404 Not Found on https://github.com/yanyiwu/nodejieba/releases/download/v2.6.0/nodejieba-v2.6.0-n…  
│ gyp info it worked if it ends with ok
│ gyp info using node-gyp@9.4.1
│ gyp info using node@20.10.0 | win32 | x64
│ gyp info ok
│ gyp info it worked if it ends with ok
│ gyp info using node-gyp@9.4.1
│ gyp info using node@20.10.0 | win32 | x64
│ gyp info find Python using Python version 3.10.13 found at "D:\ProgramData\miniconda3\python.exe"
│ gyp ERR! find VS
│ gyp ERR! find VS msvs_version not set from command line or npm config
│ gyp ERR! find VS VCINSTALLDIR not set, not running in VS Command Prompt
│ gyp ERR! find VS checking VS2022 (17.6.33829.357) found at:
│ gyp ERR! find VS "C:\Program Files\Microsoft Visual Studio\2022\Community"
│ gyp ERR! find VS - found "Visual Studio C++ core features"
│ gyp ERR! find VS - missing any VC++ toolset
│ gyp ERR! find VS could not find a version of Visual Studio 2017 or newer to use
│ gyp ERR! find VS not looking for VS2015 as it is only supported up to Node.js 18
│ gyp ERR! find VS not looking for VS2013 as it is only supported up to Node.js 8
│ gyp ERR! find VS
│ gyp ERR! find VS **************************************************************
│ gyp ERR! find VS You need to install the latest version of Visual Studio
│ gyp ERR! find VS including the "Desktop development with C++" workload.
│ gyp ERR! find VS For more information consult the documentation at:
│ gyp ERR! find VS https://github.com/nodejs/node-gyp#on-windows
│ gyp ERR! find VS **************************************************************
│ gyp ERR! find VS
│ gyp ERR! configure error
│ gyp ERR! stack Error: Could not find any Visual Studio installation to use
│ gyp ERR! stack     at VisualStudioFinder.fail (C:\Users\z7407\AppData\Roaming\npm\node_modules\pnpm\dist\node_modules\node-gyp\lib\find-visua…  
│ gyp ERR! stack     at C:\Users\z7407\AppData\Roaming\npm\node_modules\pnpm\dist\node_modules\node-gyp\lib\find-visualstudio.js:75:16
│ gyp ERR! stack     at VisualStudioFinder.findVisualStudio2013 (C:\Users\z7407\AppData\Roaming\npm\node_modules\pnpm\dist\node_modules\node-gy…  
│ gyp ERR! stack     at C:\Users\z7407\AppData\Roaming\npm\node_modules\pnpm\dist\node_modules\node-gyp\lib\find-visualstudio.js:71:14
│ gyp ERR! stack     at VisualStudioFinder.findVisualStudio2015 (C:\Users\z7407\AppData\Roaming\npm\node_modules\pnpm\dist\node_modules\node-gy…  
│ gyp ERR! stack     at C:\Users\z7407\AppData\Roaming\npm\node_modules\pnpm\dist\node_modules\node-gyp\lib\find-visualstudio.js:67:12
│ gyp ERR! stack     at VisualStudioFinder.parseData (C:\Users\z7407\AppData\Roaming\npm\node_modules\pnpm\dist\node_modules\node-gyp\lib\find-…  
│ gyp ERR! stack     at C:\Users\z7407\AppData\Roaming\npm\node_modules\pnpm\dist\node_modules\node-gyp\lib\find-visualstudio.js:143:14
│ gyp ERR! stack     at ChildProcess.exithandler (node:child_process:414:7)
│ gyp ERR! stack     at ChildProcess.emit (node:events:514:28)
│ gyp ERR! System Windows_NT 10.0.22631
│ gyp ERR! command "D:\\ProgramData\\nodejs\\nodejs\\node.exe" "C:\\Users\\z7407\\AppData\\Roaming\\npm\\node_modules\\pnpm\\dist\\node_modules…  
│ gyp ERR! cwd D:\CodeProjects\anguswg.github.io\node_modules\.pnpm\nodejieba@2.6.0\node_modules\nodejieba
│ gyp ERR! node -v v20.10.0
│ gyp ERR! node-gyp -v v9.4.1
│ gyp ERR! not ok
│ node-pre-gyp ERR! build error
│ node-pre-gyp ERR! stack Error: Failed to execute 'D:\ProgramData\nodejs\nodejs\node.exe C:\Users\z7407\AppData\Roaming\npm\node_modules\pnpm\…  
│ node-pre-gyp ERR! stack     at ChildProcess.<anonymous> (D:\CodeProjects\anguswg.github.io\node_modules\.pnpm\@mapbox+node-pre-gyp@1.0.11\nod…  
│ node-pre-gyp ERR! stack     at ChildProcess.emit (node:events:514:28)
│ node-pre-gyp ERR! stack     at maybeClose (node:internal/child_process:1105:16)
│ node-pre-gyp ERR! stack     at ChildProcess._handle.onexit (node:internal/child_process:305:5)
│ node-pre-gyp ERR! System Windows_NT 10.0.22631
│ node-pre-gyp ERR! command "D:\\ProgramData\\nodejs\\nodejs\\node.exe" "D:\\CodeProjects\\anguswg.github.io\\node_modules\\.pnpm\\@mapbox+node…  
│ node-pre-gyp ERR! cwd D:\CodeProjects\anguswg.github.io\node_modules\.pnpm\nodejieba@2.6.0\node_modules\nodejieba
│ node-pre-gyp ERR! node -v v20.10.0
│ node-pre-gyp ERR! node-pre-gyp -v v1.0.11
│ node-pre-gyp ERR! not ok
│ Failed to execute 'D:\ProgramData\nodejs\nodejs\node.exe C:\Users\z7407\AppData\Roaming\npm\node_modules\pnpm\dist\node_modules\node-gyp\bin\…  
└─ Failed in 1.9s at D:\CodeProjects\anguswg.github.io\node_modules\.pnpm\nodejieba@2.6.0\node_modules\nodejieba
 ELIFECYCLE  Command failed with exit code 1.
```

### Error: Cannot find module '@node-rs/jieba'

- 'pnpm i @node-rs/jieba'
