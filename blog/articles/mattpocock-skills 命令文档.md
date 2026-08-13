---
title: mattpocock-skills 命令文档
date: 2026-06-30 11:49:30
permalink: /pages/17335563-0981-461a-9cf6-a12a9a6f70ac/
tags: 
  -
categories: 
  - 编程
article: true
---
# mattpocock-skills 命令文档

本文档列出 ZooCrush 项目中 Claude Code 可用的所有技能（Skills）及其用途。

---

## 项目核心技能

### `/project-assistant`
**用途**：Godot 项目通用助手，处理功能实现、bug 修复、文档同步和任务管理。
**特点**：
- 总是先澄清模糊需求
- 为新功能和修复编写测试
- 保持项目结构文档更新
**触发**：处理项目任务时的默认行为（CLAUDE.md 中已配置）

---

## 开发流程技能

### `/prototype`
**用途**：快速原型开发，验证想法和概念。
**适合**：探索新功能、测试游戏机制、验证技术方案。

### `/tdd`
**用途**：测试驱动开发。
**流程**：先写测试 → 实现功能 → 验证测试通过。
**适合**：确保代码质量、防止回归 bug。

### `/qa`
**用途**：质量保证检查。
**检查项**：代码规范、性能、安全性、边界情况。

### `/review`
**用途**：代码审查。
**审查维度**：正确性、可读性、性能、架构一致性。

### `/code-review`
**用途**：审查当前 diff，查找 bug 和优化点。
**参数**：`--comment`（发布 PR 评论）、`--fix`（直接修复）。
**等级**：low/medium/high/max（覆盖范围）。

### `/simplify`
**用途**：简化代码，消除重复，提升效率。
**关注**：代码质量和可维护性，不查找 bug。

### `/verify`
**用途**：验证代码修改是否真正实现了预期功能。
**方式**：运行应用并观察实际行为。

---

## 架构与设计技能

### `/codebase-design`
**用途**：分析和设计代码库架构。
**输出**：架构图、模块关系、改进建议。

### `/domain-modeling`
**用途**：建立和扩展领域模型。
**关联**：读取并更新 `CONTEXT.md`。

### `/design-an-interface`
**用途**：设计接口和 API。
**适合**：定义模块边界、设计公共接口。

### `/diagnosing-bugs`
**用途**：诊断和修复 bug。
**流程**：分析症状 → 定位原因 → 提出修复方案。
**关联**：读取 `CONTEXT.md` 和 ADR 理解系统结构。

### `/improve-codebase-architecture`
**用途**：改进代码库架构。
**输出**：重构建议、架构优化方案。
**关联**：遵循 `CONTEXT.md` 和 ADR 的决策。

### `/request-refactor-plan`
**用途**：请求重构计划。
**流程**：分析代码 → 提出重构方案 → 等待批准。

---

## 任务管理技能

### `/to-prd`
**用途**：将想法转换为产品需求文档 (PRD)。
**输出**：`.scratch/<feature>/PRD.md`。
**内容**：功能描述、用户故事、验收标准。

### `/to-issues`
**用途**：将 PRD 拆分为具体实现任务。
**输出**：`.scratch/<feature>/issues/<NN>-<slug>.md`。
**关联**：读取 `docs/agents/issue-tracker.md`。

### `/triage`
**用途**：处理和分类问题。
**流程**：评估 → 分类 → 应用标签。
**标签**：needs-triage、needs-info、ready-for-agent、ready-for-human、wontfix。
**关联**：读取 `docs/agents/triage-labels.md`。

### `/grill-me`
**用途**：深入追问，澄清需求。
**适合**：开始实现前的需求确认。

### `/grill-with-docs`
**用途**：基于文档深入追问。
**关联**：读取 `CONTEXT.md` 和相关文档。

### `/grilling`
**用途**：通用追问技能，支持多种追问模式。

---

## Git 工作流技能

### `/git-guardrails-claude-code`
**用途**：Git 安全检查，防止危险操作。
**检查**：分支保护、提交验证、推送安全。

### `/resolving-merge-conflicts`
**用途**：解决合并冲突。
**流程**：分析冲突 → 提出解决方案 → 执行合并。

---

## 辅助技能

### `/obsidian-vault`
**用途**：Obsidian 笔记库操作。
**适合**：文档管理、知识库更新。

### `/migrate-to-shoehorn`
**用途**：迁移到 Shoehorn 模式。
**适合**：架构重构、代码迁移。

### `/scaffold-exercises`
**用途**：生成练习和示例代码。
**适合**：学习、教学、演示。

### `/setup-pre-commit`
**用途**：配置 pre-commit hooks。
**检查**：代码风格、测试、静态分析。

### `/teach`
**用途**：教学和知识传递。
**适合**：解释代码、教授概念、团队培训。

### `/wizard`
**用途**：交互式向导，逐步引导完成任务。
**适合**：复杂流程、新手引导。

### `/handoff`
**用途**：任务交接文档。
**适合**：切换上下文、交接工作、异步协作。

---

## 工具技能

### `/init`
**用途**：初始化新的 `CLAUDE.md` 文件。
**适合**：新项目、项目迁移。

### `/update-config`
**用途**：更新 Claude Code 配置 (`settings.json`)。
**配置项**：权限、环境变量、hooks。

### `/keybindings-help`
**用途**：自定义键盘快捷键。
**配置**：`~/.claude/keybindings.json`。

### `/fewer-permission-prompts`
**用途**：减少权限提示。
**方式**：扫描常用工具调用，添加允许列表。

### `/trigger-cost-savings`
**用途**：触发成本优化模式。

### `/token-efficiency`
**用途**：Token 优化最佳实践。
**内容**：高效文件读取、命令执行、输出处理策略。

### `/run`
**用途**：启动和运行项目应用。
**适合**：验证修改、测试功能。

### `/loop`
**用途**：循环执行任务。
**参数**：间隔时间、任务内容。
**适合**：定期检查、持续监控。

---

## 研究与搜索技能

### `/deep-research`
**用途**：深度研究，多源搜索，验证结论。
**流程**：搜索 → 获取源 → 验证 → 综合报告。
**适合**：需要事实依据的技术决策。

### `/find-skills`
**用途**：发现和安装新技能。
**适合**：查找特定功能的技能。

---

## 安全与验证技能

### `/security-review`
**用途**：安全审查。
**检查**：漏洞、风险、安全最佳实践。

---

## 写作技能

### `/edit-article`
**用途**：编辑文章和文档。

### `/writing-beats`
**用途**：写作节奏和结构。

### `/writing-fragments`
**用途**：写作片段管理。

### `/writing-great-skills`
**用途**：编写高质量技能文档。

### `/writing-shape`
**用途**：写作形式和风格。

---

## 决策与规划技能

### `/decision-mapping`
**用途**：决策映射，可视化决策路径。

### `/ubiquitous-language`
**用途**：建立通用语言，统一术语。

---

## API 参考

### `/claude-api`
**用途**：Claude API 参考。
**内容**：模型 ID、定价、参数、流式、工具调用、MCP、缓存。

---

## 技能使用示例

### 开发新功能

```
1. /to-prd → 创建产品需求文档
2. /to-issues → 拆分为具体任务
3. /triage → 分类和优先级排序
4. /tdd → 测试驱动开发
5. /verify → 验证功能正确性
6. /qa → 质量检查
```

### 修复 Bug

```
1. /diagnosing-bugs → 诊断问题
2. /grill-me → 澄清细节
3. /tdd → 编写测试重现 bug
4. 修复代码
5. /verify → 验证修复有效
6. /code-review → 审查修复代码
```

### 改进架构

```
1. /improve-codebase-architecture → 分析和提出改进
2. /request-refactor-plan → 制定重构计划
3. /domain-modeling → 更新领域模型
4. 创建新 ADR 记录决策
```

---

## 项目配置文件

技能会读取以下配置文件：

| 文件 | 被读取的技能 |
|------|--------------|
| `CLAUDE.md` | 所有技能（默认行为） |
| `CONTEXT.md` | `/domain-modeling`、`/diagnosing-bugs`、`/tdd`、`/improve-codebase-architecture` |
| `docs/adr/*.md` | `/improve-codebase-architecture`、`/diagnosing-bugs` |
| `docs/agents/issue-tracker.md` | `/to-issues`、`/triage`、`/to-prd`、`/qa` |
| `docs/agents/triage-labels.md` | `/triage` |
| `docs/agents/domain.md` | 所有读取领域文档的技能 |
| `docs/project-structure.md` | `/project-assistant`（开发前必读） |

---

## 注意事项

1. **默认行为**：所有任务会先触发 `/project-assistant`（CLAUDE.md 配置）
2. **文档优先**：修改代码前应先读取 `docs/project-structure.md`
3. **领域一致性**：使用领域术语时应参考 `CONTEXT.md`
4. **架构决策**：修改架构时应检查相关 ADR，避免违反已有决策
5. **本地追踪**：问题和任务存储在 `.scratch/<feature>/` 目录

---

*文档生成时间：2026-06-30*
