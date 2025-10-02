---
title: 删除 foam 误创的 md 文件
date: 2025-05-27 18:13:43
permalink: /pages/24ad6bd2-9e11-43c0-b591-d11160dfdc06/
tags:
  - 
categories:
  - Python
article: true
---

# 删除 foam 误创的 md 文件

```python
import os

target_dir = r"D:\CodeProjects\WG"  # 目标目录（可改为 '.' 表示当前目录）

# 存储符合条件的文件路径
matching_files = []

# 递归查找符合条件的文件
for root, dirs, files in os.walk(target_dir):
    for filename in files:
        if filename.endswith(".md"):
            file_path = os.path.join(root, filename)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read().strip()
                    if content.startswith("#") and "\n" not in content:
                        matching_files.append(file_path)
                        print(f"找到符合条件的文件：{file_path} - 内容: {content}")
            except Exception as e:
                print(f"读取 {file_path} 失败: {e}")

# 处理删除操作
if matching_files:
    choice = input("\n输入 1 确认删除上述文件，输入其他数字取消：")
    if choice == "1":
        for file_path in matching_files:
            try:
                os.remove(file_path)  # 直接删除文件
                print(f"✅ 已删除：{file_path}")
            except Exception as e:
                print(f"❌ 删除失败 {file_path}: {e}")
        print("\n操作完成，文件已永久删除。")
    else:
        print("操作已取消。")
else:
    print("未找到符合条件的文件。")
```
