---
title: windows 文件夹下所有 exe 文件断网脚本
date: 2025-06-20 19:38:19
permalink: /pages/f0699738-b235-4645-ae8d-6b2a05e15e05/
tags:
  - 
categories:
  - Python
article: true
---

# windows 文件夹下所有 exe 文件断网脚本

- 用于盗版游戏和未知安全工具的批量断网设置

```bat
@Echo Off
chcp 936
SetLocal EnableDelayedExpansion

echo 正在以当前权限运行防火墙规则创建。..
echo 如果看不到完整规则，请尝试以管理员身份运行
echo:

Set "Cmnd=netsh advfirewall firewall add rule action=block"

Set "TargetDir=E:\Games\CrackedGame"
For /R "%TargetDir%" %%a In (*.exe) Do (
    For %%b In (in out) Do (
        set "ruleName=blocked %%~fa %%b"
        netsh advfirewall firewall show rule name="!ruleName!" >nul 2>&1
        if !errorlevel! equ 0 (
            echo 跳过已存在的规则【%%~fa】方向：%%b
        ) else (
            echo 创建禁止 %%b 规则【%%~fa】
            %Cmnd% name="!ruleName!" dir=%%b program="%%a"
            if !errorlevel! equ 0 (
                echo -- 成功创建规则：!ruleName!
            ) else (
                echo -- 创建规则失败，请检查权限
            )
        )
    )
)

echo:
echo 处理完成
echo ----------------------------
pause
```

## 管理员方式启动

1. **创建快捷方式**：按住`Alt`键拖动`bat`文件到目标位置
2. **设置管理员运行**：
   - 右键快捷方式→属性→快捷方式选项卡
   - 点击“高级”，勾选“用管理员身份运行”
   - 点击“确定”
