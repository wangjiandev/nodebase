# NodeBase

一个基于 Next.js 15 的现代化工作流管理平台，集成了 AI 功能、用户认证和数据库管理。

## 🚀 技术栈

### 前端框架
- **Next.js 15.5.6** - React 全栈框架，使用 Turbopack 进行快速开发
- **React 19.1.0** - 最新的 React 版本
- **TypeScript 5** - 类型安全的 JavaScript

### UI 组件库
- **Radix UI** - 无样式的可访问性组件库
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **Lucide React** - 美观的图标库
- **shadcn/ui** - 基于 Radix UI 的组件系统

### 状态管理与数据获取
- **tRPC** - 端到端类型安全的 API
- **TanStack Query** - 强大的数据同步库
- **React Hook Form** - 高性能表单库
- **Zod** - TypeScript 优先的模式验证

### 认证系统
- **Better Auth** - 现代化的认证解决方案
- **Prisma** - 数据库 ORM 和查询构建器

### AI 集成
- **AI SDK** - Vercel AI SDK 用于 AI 功能
- **DeepSeek** - AI 模型集成
- **Google AI** - Google AI 模型支持

### 后台任务
- **Inngest** - 后台任务和事件处理

### 开发工具
- **Biome** - 快速的代码格式化和 linting
- **Ultracite** - 代码质量检查
- **mprocs** - 多进程管理

## 📁 项目结构

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 认证相关页面
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # 仪表板页面
│   │   ├── (editor)/             # 编辑器页面
│   │   │   └── workflows/[workflowId]/
│   │   └── (rest)/               # 其他页面
│   │       ├── credentials/
│   │       ├── executions/
│   │       └── workflows/
│   └── api/                      # API 路由
│       ├── auth/
│       ├── inngest/
│       └── trpc/
├── components/                   # 可复用组件
│   ├── ui/                       # UI 组件库
│   ├── app-header.tsx
│   ├── app-sidebar.tsx
│   └── entity-components.tsx
├── features/                     # 功能模块
│   ├── auth/                     # 认证功能
│   └── workflows/                # 工作流功能
│       ├── components/
│       ├── hooks/
│       └── server/
├── lib/                          # 工具库
│   ├── auth.ts                   # 认证配置
│   ├── db.ts                     # 数据库连接
│   └── utils.ts                   # 工具函数
├── trpc/                         # tRPC 配置
├── inngest/                      # 后台任务
└── config/                       # 配置文件
```

## 🗄️ 数据库模型

### User (用户)
- 基本信息：id, name, email, image
- 认证状态：emailVerified
- 时间戳：createdAt, updatedAt
- 关联：sessions, accounts, workflows

### Session (会话)
- 会话管理：token, expiresAt
- 设备信息：ipAddress, userAgent
- 关联：user

### Account (账户)
- OAuth 信息：providerId, accountId
- 令牌管理：accessToken, refreshToken
- 关联：user

### Workflow (工作流)
- 基本信息：id, name
- 时间戳：createdAt, updatedAt
- 关联：user

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- pnpm (推荐) 或 npm
- PostgreSQL 数据库

### 安装依赖
```bash
pnpm install
```

### 环境配置
创建 `.env.local` 文件并配置以下变量：

```env
# 数据库
DATABASE_URL="postgresql://username:password@localhost:5432/nodebase"

# AI 服务
DEEPSEEK_API_KEY="your_deepseek_api_key"
GOOGLE_AI_API_KEY="your_google_ai_api_key"

# 认证
BETTER_AUTH_SECRET="your_secret_key"
BETTER_AUTH_URL="http://localhost:3000"
```

### 数据库设置
```bash
# 生成 Prisma 客户端
pnpm prisma:generate

# 运行数据库迁移
pnpm migrate

# 打开 Prisma Studio (可选)
pnpm prisma:studio
```

### 启动开发服务器
```bash
# 启动所有服务 (推荐)
pnpm dev:all

# 或者分别启动
pnpm dev          # Next.js 开发服务器
pnpm inngest:dev  # Inngest 后台任务
```

## 📝 可用脚本

```bash
# 开发
pnpm dev              # 启动 Next.js 开发服务器
pnpm dev:all          # 启动所有服务 (Next.js + Inngest)

# 构建
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器

# 数据库
pnpm migrate          # 运行数据库迁移
pnpm reset            # 重置数据库
pnpm prisma:generate  # 生成 Prisma 客户端
pnpm prisma:studio    # 打开 Prisma Studio

# 后台任务
pnpm inngest:dev      # 启动 Inngest 开发服务器

# 代码质量
pnpm lint             # 运行 linting 检查
pnpm format           # 格式化代码
```

## 🔧 核心功能

### 1. 用户认证
- 基于 Better Auth 的现代化认证系统
- 支持邮箱密码登录
- 会话管理和安全控制

### 2. 工作流管理
- 创建、编辑、删除工作流
- 工作流列表和搜索
- 分页和排序功能

### 3. AI 集成
- DeepSeek AI 模型支持
- Google AI 模型支持
- 后台任务处理

### 4. 实时数据同步
- tRPC 端到端类型安全
- TanStack Query 数据缓存
- 乐观更新和错误处理

## 🎨 UI 组件

项目使用 shadcn/ui 组件库，包含：
- 表单组件 (Input, Button, Select 等)
- 布局组件 (Card, Sheet, Dialog 等)
- 数据展示 (Table, Pagination 等)
- 反馈组件 (Toast, Alert 等)

## 🔒 安全特性

- 类型安全的 API 调用
- 服务端认证验证
- 数据库查询权限控制
- 环境变量配置管理

## 🚀 部署

### Vercel 部署
1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 设置数据库连接
4. 部署应用

### 环境变量配置
确保在生产环境中配置所有必要的环境变量：
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- AI 服务 API 密钥

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 支持

如有问题或建议，请：
1. 查看 [Issues](../../issues) 页面
2. 创建新的 Issue
3. 联系维护者

---

**NodeBase** - 现代化的工作流管理平台，让工作更高效！