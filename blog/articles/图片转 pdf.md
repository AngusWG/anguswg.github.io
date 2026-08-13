---
title: 图片转 pdf
date: 2025-11-04 10:57:27
permalink: /pages/401a030d-a064-4cca-a290-c585962200b1/
tags:
  - 
categories:
  - Python
article: true
---

# 图片转 pdf

## 工具处理

```bash
sudo apt update && sudo apt install img2pdf
cd /path/to/your/image/folder  # 替换为你的图片文件夹绝对路径
img2pdf * -o merged.pdf
```

## 命令批量处理

- 有多个文件夹
- 文件夹下也可能有文件夹
- 如果文件夹内无文件夹 则是目标文件夹
- 将目标文件夹的图片压缩
- 然后做成 pdf

`pip3 install pillow reportlab`

```python
import os
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader

def compress_image(input_path, output_path, quality=80):
    """压缩图片：JPG 直接调质量，PNG/WebP 转 JPG 压缩"""
    try:
        with Image.open(input_path) as img:
            # 处理透明通道（PNG 转 JPG 需先填充白色背景）
            if img.mode in ("RGBA", "P"):
                background = Image.new("RGB", img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3] if img.mode == "RGBA" else None)
                img = background
            
            # 保存压缩后的图片（JPG 格式）
            img.save(output_path, "JPEG", quality=quality, optimize=True)
        return True
    except Exception as e:
        print(f"⚠️  压缩图片失败：{os.path.basename(input_path)} - {e}")
        return False

def images_to_pdf(image_paths, output_pdf, page_size=A4):
    """将图片列表合并为 PDF"""
    if not image_paths:
        print("❌ 无有效图片，跳过 PDF 生成")
        return False

    c = canvas.Canvas(output_pdf, pagesize=page_size)
    page_width, page_height = page_size

    for img_path in image_paths:
        try:
            with Image.open(img_path) as img:
                img_width, img_height = img.size
                # 等比例缩放图片，适配页面（居中放置）
                scale = min(page_width / img_width, page_height / img_height)
                new_w, new_h = img_width * scale, img_height * scale
                x, y = (page_width - new_w) / 2, (page_height - new_h) / 2

                c.drawImage(ImageReader(img_path), x, y, new_w, new_h)
                c.showPage()  # 新建一页
                print(f"✅ 添加图片：{os.path.basename(img_path)}")
        except Exception as e:
            print(f"⚠️  处理图片失败：{os.path.basename(img_path)} - {e}")

    c.save()
    print(f"📄 PDF 生成成功：{output_pdf}\n")
    return True

def traverse_folders(root_dir, compress_quality=80):
    """递归遍历文件夹，处理所有目标文件夹（无下级文件夹）"""
    # 定义支持的图片格式（可补充）
    image_formats = ('.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif')
    
    # 递归遍历
    for root, dirs, files in os.walk(root_dir):
        # 判断是否为目标文件夹（无下级文件夹）
        if not dirs:
            print(f"\n==================================================")
            print(f"📂 找到目标文件夹：{root}")
            
            # 筛选图片文件，按文件名排序
            image_paths = [
                os.path.join(root, f)
                for f in sorted(files)
                if f.lower().endswith(image_formats)
            ]
            
            if not image_paths:
                print(f"❌ 该文件夹无图片，跳过")
                print(f"==================================================\n")
                continue
            
            print(f"🔍 找到 {len(image_paths)} 张图片，开始压缩。..")
            
            # 创建临时压缩文件夹（避免修改原图）
            temp_compress_dir = os.path.join(root, "_temp_compressed")
            os.makedirs(temp_compress_dir, exist_ok=True)
            
            # 批量压缩图片
            compressed_img_paths = []
            for i, img_path in enumerate(image_paths):
                img_name = os.path.basename(img_path)
                # 压缩后的文件名（保留原排序，后缀改为。jpg）
                compressed_name = f"compressed_{i:03d}.jpg"
                compressed_path = os.path.join(temp_compress_dir, compressed_name)
                
                if compress_image(img_path, compressed_path, compress_quality):
                    compressed_img_paths.append(compressed_path)
            
            # 生成 PDF（PDF 文件名=目标文件夹名，保存在目标文件夹同级目录）
            folder_name = os.path.basename(root)
            output_pdf = os.path.join(os.path.dirname(root), f"{folder_name}.pdf")
            
            # 合并压缩后的图片为 PDF
            images_to_pdf(compressed_img_paths, output_pdf)
            
            # 可选：删除临时压缩文件夹（如需保留压缩图，注释此行）
            import shutil
            shutil.rmtree(temp_compress_dir)
            print(f"🗑️  已删除临时压缩文件夹：{temp_compress_dir}")
            print(f"==================================================\n")

if __name__ == "__main__":
    # --------------------------
    # 请修改以下 3 个参数（必改！）
    # --------------------------
    ROOT_DIR = "./."  # 根文件夹路径（所有子文件夹从这里开始遍历）
    COMPRESS_QUALITY = 95          # 图片压缩质量（1-100，推荐 70-90）
    PDF_PAGE_SIZE = A4             # PDF 页面尺寸（A4/Letter 或自定义 （宽，高），单位：点）

    # 开始执行（如需自定义 PDF 页面尺寸，添加 page_size=PDF_PAGE_SIZE 参数）
    print(f"🚀 开始遍历根文件夹：{ROOT_DIR}")
    print(f"⚙️  压缩质量：{COMPRESS_QUALITY}，PDF 页面尺寸：{PDF_PAGE_SIZE}")
    traverse_folders(ROOT_DIR, COMPRESS_QUALITY)
    print("🎉 所有目标文件夹处理完成！")
```
