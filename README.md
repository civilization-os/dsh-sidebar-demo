# dsh-sidebar-demo

DeepSeek Harness (DSH) 官方右侧栏（Official Right Sidebar）标准扩展插件 Demo 脚手架。

本项目展示了如何使用 DSH 官方原生的 Tab 注册机制与 Keyed Slots 槽位系统，为 DSH 工作台开发右侧独立功能面板。

---

## 官方生态插件推荐

以下是当前基于 DeepSeek Harness 官方插件机制开发并已发布的核心插件系列：

| 插件名称 | 说明 | NPM 地址 | GitHub 仓库 |
| :--- | :--- | :--- | :--- |
| **@civilization/deepseek-harness-skill-mcp** | DSH 原生 Skill 管理面板与 MCP Server 动态挂载插件，支持自定义技能目录与双向 RPC 通信。 | [![npm](https://img.shields.io/npm/v/@civilization/deepseek-harness-skill-mcp?color=blue)](https://www.npmjs.com/package/@civilization/deepseek-harness-skill-mcp) | [civilization-os/deepseek-harness-plugins](https://github.com/civilization-os/deepseek-harness-plugins) |
| **@civilization/deepseek-harness-playwright** | 集成 Playwright 的无头/有头浏览器自动化插件，提供全套 DOM 检查、页面交互与截图调试能力。 | [![npm](https://img.shields.io/npm/v/@civilization/deepseek-harness-playwright?color=green)](https://www.npmjs.com/package/@civilization/deepseek-harness-playwright) | [civilization-os/deepseek-harness-plugins-playwright](https://github.com/civilization-os/deepseek-harness-plugins-playwright) |
| **@civilization/dsh-drawio** | 原生集成到 DSH 右侧工作台的满血版 Draw.io 离线画板，内置 39+ 专业分类图库、PlantUML 离线渲染与 Agent 语义化编辑工具。 | [![npm](https://img.shields.io/npm/v/@civilization/dsh-drawio?color=orange)](https://www.npmjs.com/package/@civilization/dsh-drawio) | [civilization-os/dsh-drawio](https://github.com/civilization-os/dsh-drawio) |

---

## 核心机制

客户端通过注入 DSH 官方的核心服务实现无侵入挂载：

```ts
export const inject = ['slots', 'sidebarRightTabs']
```

1. **注册 Tab 定义**：使用 `sidebarRightTabs.register()` 声明 Tab 的 ID、分类、优先级、标题及入口引导（guide）；
2. **注入 Tab 内容**：使用 `slots.inject('sidebar.right.pane.tab', ...)` 将 React 页面组件注册到右侧栏容器；
3. **注入 Tab 标题**：使用 `slots.inject('sidebar.right.pane.tab.title', ...)` 注册顶部图标与标题；
4. **生命周期与清理**：所有注入均包裹在 `ctx.effect()` 中，当插件停用或热重载时自动释放。

通过 Slot 的 Runtime Props，可以直接获取：
- `sessionId`：当前会话 ID
- `useSessions`：订阅当前会话的上下文（如工作区 `cwd`）
- `useTabInfo`：获取当前侧边栏布局模式（全屏/停靠）与 Tab 可见性

---

## 本地开发与调试

```powershell
# 1. 安装依赖与构建
pnpm install
pnpm typecheck
pnpm build

# 2. 将本地 demo 插件链接到 DSH 的 web profile
dsh plugin --profile web add D:\project\dsh-sidebar-demo --prefer-offline

# 3. 启动 DSH Web 实例验证
dsh web --port 3082 --no-open
```

---

## 许可证

[Apache-2.0 License](./LICENSE)
