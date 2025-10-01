---
title: python+ffmpeg 压缩视频批量处理脚本
date: 2025-09-19 17:56:29
permalink: /pages/f1f4c9a0-f250-48f3-81b6-c2b83c4ca94c/
tags:
  - 
categories:
  - 项目
article: true
---

# python+ffmpeg 压缩视频批量处理脚本

- 批量转换视频
- 有进度条
- 其他格式的视频都支持
- 转换好的视频用 "原视频名 - converted.mp4" 表示

- `pip install ffmpeg_progress_yield tqdm`

## gpu 加速检查

```bash
ffmpeg -encoders | findstr nvenc
ffmpeg -decoders | findstr cuda
```

## 完整代码

```python
import os
from tqdm import tqdm
from ffmpeg_progress_yield import FfmpegProgress

dir_path = r"D:\Downloads\tab_recorder"

def convert_webm_to_mp4(filename):
    """转换单个 WEBM 文件为 MP4，返回转换是否成功"""

    webm_path = os.path.join(dir_path, filename)
    mp4_path = os.path.splitext(webm_path)[0] + " - converted.mp4"

    # 检查是否已存在有效 MP4 文件
    if os.path.exists(mp4_path) and os.path.getsize(mp4_path) > 0:
        print(f"已跳过：{mp4_path} （已存在且有效）")
        return

    # fmt: off
    # 构建 FFmpeg 命令
    cmd = [
        "ffmpeg",
        "-hwaccel", "cuda",
        "-i", webm_path,
        "-c:v", "h264_nvenc",  # "libx264",
        "-preset", "p7",  # NVENC 支持的高质量预设（替代 veryslow）
        "-tune", "hq",  # 高质量调优
        # "-vf", "scale=iw:ih",  # 保持原分辨率 不写就继承
        # "-r", "30",  # 设置帧率为 30fps 不写就继承
        "-c:a", "aac",  # 音频编码（确保兼容性）
        "-ac", "2",  # 声道数设置为 2（立体声）
        "-ar", "48000",  # 音频采样频率设置为 48000Hz
        mp4_path,
    ]
    # fmt: on

    # 使用进度条执行转换
    with FfmpegProgress(cmd) as ff:
        with tqdm(total=100, desc=f"{filename} 转换进度", unit="%") as pbar:
            for progress in ff.run_command_with_progress():
                pbar.update(progress - pbar.n)

def main():
    # 获取目录下所有 WEBM 文件
    webm_files = [f for f in os.listdir(dir_path) if f.lower().endswith(".webm")]

    # 遍历处理每个文件
    for filename in tqdm(webm_files, desc="总进度", unit="个"):
        # 执行转换
        convert_webm_to_mp4(filename)

if __name__ == "__main__":
    main()

```
