---
title: Pandoc 批量生成多主题 html
date: 2026-08-13 19:26:05
permalink: /pages/890c39ad-4fd8-460f-a62c-29a5074ecaad/
tags:
  - 
categories:
  - 编程
article: true
---

# Pandoc 批量生成多主题 html

- [x] 旁边增加一个目录
  - 需要下载一些网上有的 template 但是巨丑
- [x] 夜间模式
- [x] 手机适配

## 1. 创建 `D:\tmp\demo.md`

```markdown
# 我的博客

- 参考
  - [Pandoc](https://pandoc.org/)
  - [Classless CSS](https://github.com/dbohdan/classless-css)

## 关于

这是一个用 Pandoc 批量生成多主题 HTML 的博客示例。

## 代码

    ```powershell
    pandoc demo.md -s -c $css -o blog.html
    ```

## 主题

| 主题 | 说明 |
|------|------|
| simple | 极简优雅 |
| github | GitHub 风格 |
| water | 干净清爽 |
| sakura | 樱花粉 |
| latex | 学术排版 |

```

## 2. 创建 `D:\tmp\md-to-html.ps1`

```powershell
$inputFile = 'D:\tmp\demo.md'
$outputDir = 'D:\tmp\blog'
$openInBrowser = $true  # 改成 $false 则不自动打开

if (!(Get-Command pandoc -ErrorAction SilentlyContinue)) {
    Write-Host "错误：未找到 pandoc" -ForegroundColor Red
    return
}

if (!(Test-Path $inputFile)) {
    Write-Host "错误：未找到输入文件 $inputFile" -ForegroundColor Red
    return
}

if (!(Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir | Out-Null }

$themes = @(
    # ===== 基础款 =====
    @{ Name = "simple";   Css = "https://cdn.jsdelivr.net/npm/simple.css@1.6.1/dist/simple.min.css";                         Highlight = "pygments"; Desc = "Simple.css - 极简优雅，默认蓝色链接" },
    @{ Name = "shadcn";   Css = "https://cdn.jsdelivr.net/gh/fordus/shadcn-classless@main/dist/shadcn-classless.css";       Highlight = "pygments"; Desc = "shadcn-classless - 现代设计感，蓝色主色" },
    @{ Name = "devcss";   Css = "https://cdn.jsdelivr.net/npm/@intergrav/dev.css@5";                                      Highlight = "pygments"; Desc = "dev.css - 轻量清新，蓝色调" },
    @{ Name = "github";   Css = "https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.css";                    Highlight = "pygments"; Desc = "GitHub Markdown - 复刻 GitHub 风格" },
    @{ Name = "pico";     Css = "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css";                 Highlight = "pygments"; Desc = "Pico.css - 功能丰富，20 种配色" },
    @{ Name = "water";    Css = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css";                                  Highlight = "pygments"; Desc = "Water.css - 干净极简，蓝色主色" },
    @{ Name = "sucss";    Css = "https://speyll.github.io/suCSS/suCSS-min.css";                                            Highlight = "pygments"; Desc = "suCSS - 简约优雅，本地字体" },
    @{ Name = "edible";   Css = "https://cdn.jsdelivr.net/npm/@svmukhin/edible-css@latest/dist/edible.min.css";             Highlight = "pygments"; Desc = "EdibleCSS - 即插即用，干净现代" },
    @{ Name = "marx";     Css = "https://cdn.jsdelivr.net/npm/marx-css@5/css/marx.min.css";                                 Highlight = "pygments"; Desc = "Marx - 极简主义，零优先级" },
    @{ Name = "aveccss";  Css = "https://cdn.jsdelivr.net/gh/bk/aveccss@main/dist/aveccss.min.css";                        Highlight = "pygments"; Desc = "AvecCSS - 轻量模块化" },
    @{ Name = "nocss";    Css = "https://unpkg.com/nocss-framework@latest/dist/nocss.min.css";                             Highlight = "pygments"; Desc = "NoCSS - 智能检测 HTML 结构" },

    # ===== 新增经典款 =====
    @{ Name = "awsm";     Css = "https://cdn.jsdelivr.net/npm/awsm.css@3.0.7/awsm.min.css";                                 Highlight = "pygments"; Desc = "awsm.css - 语义化样式，阅读友好" },
    @{ Name = "sakura";   Css = "https://cdn.jsdelivr.net/npm/sakura.css@1.4.1/sakura.min.css";                             Highlight = "pygments"; Desc = "Sakura - 樱花粉柔色调，极简" },
    @{ Name = "new";      Css = "https://cdn.jsdelivr.net/npm/new.css@1.1.3/new.min.css";                                   Highlight = "pygments"; Desc = "new.css - 零类，轻量" },
    @{ Name = "mvp";      Css = "https://cdn.jsdelivr.net/npm/mvp.css@1.12.0/mvp.min.css";                                  Highlight = "pygments"; Desc = "MVP.css - 专为原型设计，语义化" },
    @{ Name = "vanilla";  Css = "https://cdn.jsdelivr.net/npm/vanilla-framework@3.0.1/build/css/vanilla.min.css";           Highlight = "pygments"; Desc = "Vanilla Framework - Ubuntu 风格，classless 也支持" },
    @{ Name = "tufte";    Css = "https://cdn.jsdelivr.net/npm/tufte-css@1.8.0/tufte.min.css";                               Highlight = "pygments"; Desc = "Tufte CSS - 爱德华·塔夫特排版风格" },
    @{ Name = "latex";    Css = "https://cdn.jsdelivr.net/npm/latex.css@1.12.0/latex.min.css";                              Highlight = "pygments"; Desc = "LaTeX.css - 模拟 LaTeX 排版" },
    @{ Name = "bamboo";   Css = "https://cdn.jsdelivr.net/npm/bamboo.css@2.0.0/bamboo.min.css";                             Highlight = "pygments"; Desc = "Bamboo.css - 清新绿色调" },
    @{ Name = "paper";    Css = "https://cdn.jsdelivr.net/npm/papercss@1.9.2/dist/paper.min.css";                           Highlight = "pygments"; Desc = "PaperCSS - 手写纸质感" },
    @{ Name = "mini";     Css = "https://cdn.jsdelivr.net/npm/mini.css@4.0.0/dist/mini.min.css";                            Highlight = "pygments"; Desc = "mini.css - 小巧，响应式" },

    # ===== 更多类·无类 =====
    @{ Name = "kacss";    Css = "https://cdn.jsdelivr.net/npm/kacss@2.0.0/kacss.min.css";                                   Highlight = "pygments"; Desc = "kaCSS - 极简，纯语义" },
    @{ Name = "splendor"; Css = "https://cdn.jsdelivr.net/gh/splendor-css/splendor@main/dist/splendor.min.css";            Highlight = "pygments"; Desc = "Splendor - 优雅，深色主题自适应" },
    @{ Name = "fruum";    Css = "https://cdn.jsdelivr.net/gh/fruumio/fruum-css@master/fruum.min.css";                      Highlight = "pygments"; Desc = "Fruum - 专注可读性" },
    @{ Name = "emerick";  Css = "https://cdn.jsdelivr.net/gh/emerick-css/emerick@latest/emerick.min.css";                  Highlight = "pygments"; Desc = "Emerick - 极简，现代" },
    @{ Name = "primitive"; Css = "https://cdn.jsdelivr.net/npm/primitive@1.0.0/primitive.min.css";                          Highlight = "pygments"; Desc = "Primitive - 移动优先，简约" },
    @{ Name = "sus";      Css = "https://cdn.jsdelivr.net/gh/sus-css/sus@main/sus.min.css";                                 Highlight = "pygments"; Desc = "Sus - 轻量，强调内容" },
    @{ Name = "stylize";  Css = "https://cdn.jsdelivr.net/gh/stylize-css/stylize@main/stylize.min.css";                    Highlight = "pygments"; Desc = "Stylize - 风格化，多种颜色变量" },
    @{ Name = "pattern";  Css = "https://cdn.jsdelivr.net/gh/pattern-css/pattern@latest/pattern.min.css";                  Highlight = "pygments"; Desc = "Pattern - 模块化，可定制" },
    @{ Name = "system";   Css = "https://cdn.jsdelivr.net/npm/system.css@1.0.1/system.min.css";                             Highlight = "pygments"; Desc = "System.css - 模仿操作系统原生样式" },
    @{ Name = "splendid"; Css = "https://cdn.jsdelivr.net/gh/splendid-css/splendid@main/splendid.min.css";                 Highlight = "pygments"; Desc = "Splendid - 干净，可选强调色" },

    # ===== 偏重 UI 但也可以 classless 使用 =====
    @{ Name = "bulma";    Css = "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";                               Highlight = "pygments"; Desc = "Bulma - 虽然需要类，但基础标签仍有样式" },
    @{ Name = "milligram"; Css = "https://cdn.jsdelivr.net/npm/milligram@1.4.1/dist/milligram.min.css";                     Highlight = "pygments"; Desc = "Milligram - 极简，但需少量类" },
    @{ Name = "spectre";  Css = "https://cdn.jsdelivr.net/npm/spectre.css@0.5.9/dist/spectre.min.css";                     Highlight = "pygments"; Desc = "Spectre - 轻量，可作基础样式" },
    @{ Name = "blaze";    Css = "https://cdn.jsdelivr.net/npm/blaze@4.0.2/dist/blaze.min.css";                             Highlight = "pygments"; Desc = "Blaze - 原子化，但默认标签有样式" },
    @{ Name = "kutty";    Css = "https://cdn.jsdelivr.net/npm/kutty@0.6.0/dist/kutty.min.css";                             Highlight = "pygments"; Desc = "Kutty - 面向内容，类似水" },
    @{ Name = "cirrus";   Css = "https://cdn.jsdelivr.net/npm/cirrus-ui@0.6.0/dist/cirrus.min.css";                        Highlight = "pygments"; Desc = "Cirrus - 现代组件，基础样式仍可用" }
)

# 过滤掉 CSS 链接无法访问的主题
$themes = $themes | Where-Object {
    $name = $_.Name
    $css = $_.Css
    try {
        $response = Invoke-WebRequest -Uri $css -Method Head -TimeoutSec 5 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "✓ $name - CSS 可访问" -ForegroundColor Green
            $true
        } else {
            Write-Host "✗ $name - CSS 返回状态码 $($response.StatusCode)" -ForegroundColor Yellow
            $false
        }
    } catch {
        Write-Host "✗ $name - CSS 无法访问" -ForegroundColor Red
        $false
    }
}

if ($themes.Count -eq 0) {
    Write-Host "没有可用的主题，请检查网络或稍后重试。" -ForegroundColor Red
    return
}

$indexItems = @()
foreach ($t in $themes) {
    $outputFile = Join-Path $outputDir "blog-$($t.Name).html"
    Write-Host "生成 $($t.Name)" -ForegroundColor Cyan
    pandoc $inputFile -s -c $t.Css --highlight-style $t.Highlight --metadata title="博客 - $($t.Desc)" -o $outputFile
    $indexItems += "<li><a href='blog-$($t.Name).html'>$($t.Name)</a> - $($t.Desc)</li>"
}

$indexHtml = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>博客主题</title></head><body><h1>博客主题预览</h1><ul>$($indexItems -join '')</ul></body></html>"
Set-Content -Path (Join-Path $outputDir "index.html") -Value $indexHtml -Encoding UTF8

Write-Host "完成，共 $($themes.Count) 个页面" -ForegroundColor Green

if ($openInBrowser) {
    foreach ($t in $themes) {
        $htmlFile = Join-Path $outputDir "blog-$($t.Name).html"
        Start-Process $htmlFile
    }
    Start-Process (Join-Path $outputDir "index.html")
}
```

## 3. 运行

```powershell
pwsh "D:\tmp\md-to-html.ps1"
```

- 或者直接在 PowerShell 里：

```powershell
D:\tmp\md-to-html.ps1
```

- 生成后在 `D:\tmp\blog\` 下会有 `index.html` 和 多个不同主题的博客页面。
