---
title: GPT-SoVITS gradio_client 批量生成音频
date: 2025-05-31 00:11:32
permalink: /pages/8166e5a2-8a2f-45a5-984c-562fd832312b/
tags: 
  -
categories: 
  - 项目
article: true
---
# GPT-SoVITS gradio_client 批量生成音频

## 查看 API

``` python
from gradio_client import Client

# 连接到已部署的 Gradio 应用
client = Client("http://localhost:9872")  # 替换为你的应用地址

config = client.view_api()
print(config)
```

## 批量调用

- `ValueError: File D:\data\音频 is not in the upload folder and cannot be accessed.`
  - 看一下源代码，读取文件必须在它的特定目录下
- 要关 vpn 或者修改代理

```python
import os
import shutil

import tqdm
from gradio_client import Client

reference_audio_path = (
    r"D:\data\音频\2025年05月14日 参考语言文本，需要大概十秒钟。.m4a"
)
reference_audio_text = "参考语言文本，需要大概十秒钟。"
reference_audio_tmp_path = r"D:\CodeProjects\GPT-SoVITS-v4-20250422fix\TEMP\gradio\4c841149931f32360e312b31e81a5f81549e5584\reference_audio.m4a"
os.makedirs(os.path.dirname(reference_audio_tmp_path), exist_ok=True)
if os.path.exists(reference_audio_tmp_path):
    os.remove(reference_audio_tmp_path)  # 删除文件
shutil.copy2(reference_audio_path, reference_audio_tmp_path)  # 源路径和目标路径均为字符串

client = Client("http://localhost:9872")
output_dir = "output_audios"
os.makedirs(output_dir, exist_ok=True)

# 构造符合 Gradio 要求的文件字典（包含"path"）
ref_wav_path = {
    "name": reference_audio_path,
    # 文件名（可选，用于显示）
    "path": reference_audio_tmp_path
    # 必需的文件路径
}

prompt_language = "中文"
text_language = "中文"
how_to_cut = "按中文句号。切"
sample_steps = 8

texts = [
    "湘江北去，橘子洲头。看万山红遍，层林尽染；",
    "漫江碧透，百舸争流。鹰击长空，鱼翔浅底，万类霜天竞自由。",
    "怅寥廓，问苍茫大地，谁主沉浮？",
    "携来百侣曾游。忆往昔峥嵘岁月稠。",
    "恰同学少年，风华正茂；书生意气，挥斥方遒。",
    "指点江山，激扬文字，粪土当年万户侯。",
    "曾记否，到中流击水，浪遏飞舟？",
]

for i, text in tqdm.tqdm(enumerate(texts)):
    print(f"生成第 {i + 1} 条音频...")

    result = client.predict(
        ref_wav_path,  # 传递包含"path"的文件字典
        reference_audio_text,
        prompt_language,
        text,
        text_language,
        how_to_cut,
        15,  # top_k
        1.0,  # top_p
        1.0,  # temperature
        False,  # ref_free
        1.0,  # speed
        False,  # if_freeze
        None,  # inp_refs（无多文件）
        sample_steps,
        False,  # if_sr
        0.3,  # pause_second
        api_name="/get_tts_wav",
    )
    print(result)
    # copy file
    ori_file = result
    target_file = os.path.join(output_dir, f"{i} {text}.wav")
    shutil.copy2(result, target_file)  # 源路径和目标路径均为字符串
    print(target_file)
```
