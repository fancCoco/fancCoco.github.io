# Fan Chen 个人学术主页实现技术书

**版本：** v1.1 · 2026-09-20
**交付范围：** 实现规格与操作手册；本文中的代码是实施参考，尚未作为完整网站执行构建。  
**目标平台：** GitHub Pages  
**推荐技术栈：** Astro + TypeScript + Tailwind CSS + 少量 React + GitHub Actions  
**文档定位：** 可直接用于个人开发、交给前端开发者实施，或作为 AI 编程工具的项目规格说明书

---

## 1. 项目概述

### 1.1 建设目标

建设一个现代、简洁、可信、易维护的个人学术主页，用于集中展示：

- 个人身份、教育经历与当前学术归属；
- 研究方向与长期研究主线；
- 论文、项目、报告和学术动态；
- CV、联系方式与外部学术主页；
- 面向博士申请、学术合作、会议交流和未来求职的专业形象。

网站首先部署在 GitHub Pages，默认地址可采用：

`https://<github-username>.github.io`

后续绑定个人域名时，不重写页面；调整 GitHub Pages 设置、DNS、Astro 的 site/base，并重新生成 canonical、sitemap 和分享链接。

### 1.2 核心原则

1. **内容与布局分离**：论文、项目、新闻等使用 Markdown/MDX 或结构化数据维护。
2. **静态优先**：默认输出纯静态 HTML，减少依赖、提高加载速度和可靠性。
3. **渐进式交互**：只有搜索、筛选等必要功能加载 React；其余交互优先使用 Astro 与原生 JavaScript。
4. **移动端优先**：手机、平板和桌面端均应完整可用。
5. **学术可信度优先**：避免过度动画、营销化语言和华而不实的视觉元素。
6. **可迁移**：代码不依赖 GitHub Pages 专属能力，未来可迁往 Cloudflare Pages、Vercel 或 Netlify。

### 1.3 非目标

首版不建设以下功能：

- 用户账户和登录系统；
- 服务端数据库；
- 后台 CMS；
- 在线评论系统；
- 复杂 Three.js 场景；
- 需要长期维护的服务端 API。

---

## 2. 目标用户与使用场景

| 用户 | 主要目标 | 设计响应 |
|---|---|---|
| 教授与潜在合作者 | 快速判断研究方向与成果 | 首页首屏明确身份、研究主题和代表成果 |
| 会议参会者 | 找到论文、项目和联系方式 | 论文卡片提供 Paper、Project、BibTeX 等入口 |
| 招聘者 | 快速浏览经历和技能 | 提供简洁 About、Projects 和可下载 CV |
| 同领域学生 | 了解研究内容和代码 | 项目页展示问题、方法、结果和资源链接 |
| 本人 | 低成本持续更新 | 内容集合、模板化字段、自动部署 |

典型访问路径：

1. 搜索姓名进入首页；
2. 10 秒内识别当前身份和研究方向；
3. 浏览代表论文或项目；
4. 打开 CV、Google Scholar、GitHub 或发送邮件。

---

## 3. 信息架构

### 3.1 顶层导航

建议首版设置以下导航：

- Home
- Research
- Publications
- Projects
- News
- CV

About 内容可直接并入首页，Contact 放入首页和页脚，无需为短内容单独建页。

### 3.2 页面职责

#### Home `/`

首页由以下模块组成：

1. 顶部导航；
2. Hero：姓名、身份、单位、简短研究定位、头像、主要链接；
3. About：150–220 词英文简介；
4. Research Interests：3 个研究主题卡片；
5. Selected Publications：2–4 篇代表作；
6. Selected Projects：2–4 个代表项目；
7. Recent News：最近 4–6 条动态；
8. 页脚。

推荐首屏文案结构：

> Fan Chen  
> Incoming Ph.D. Student in Electrical Engineering  
> University of Notre Dame  
> Researching safe autonomous systems, multi-robot planning, and foundation models for robotics.

正式上线时，身份描述应以当时真实入学状态为准；在博士项目正式开始前，可写为 incoming Ph.D. student。

#### Research `/research/`

围绕三条主线组织，而不是简单罗列关键词：

1. **Safe Autonomous Systems**  
   语义安全监测、不确定性建模、风险感知规划、鲁棒控制。
2. **Multi-Robot Planning and Coordination**  
   多机器人任务执行、分布式感知、协同决策、通信约束与安全保障。
3. **Foundation Models for Robotics**  
   视觉语言模型、任务条件化语义判断、在线适应及推理延迟。

每条主线包含：研究问题、技术方法、当前工作、关联成果。

#### Publications `/publications/`

功能要求：

- 默认按年份倒序；
- 支持按主题、年份、类型筛选；
- 支持标题与作者关键词搜索；
- 突出本人姓名；
- 支持 Paper、Project、Code、Video、Slides、BibTeX 链接；
- 无链接时不显示按钮；
- 代表作显示缩略图或 teaser。

#### Projects `/projects/`

首批可规划：

- TC-SafePlan；
- Multi-Robot TC-SafePlan；
- UAV Semantic Anomaly Detection；
- Robust and Risk-Aware UAV Planning；
- Selected Robotics Systems Projects。

尚未公开或尚处于计划阶段的工作应明确标记为 “Ongoing”，不要暗示已有公开成果。

#### News `/news/`

采用时间轴或紧凑列表，记录：

- 论文接收与发表；
- 会议报告；
- 学位与入学；
- 奖项；
- 代码或项目发布。

#### CV `/cv/`

- 页面内提供简化版经历；
- 提供 `Download CV` 按钮；
- PDF 在新标签页打开；
- 页面注明 CV 最近更新时间。

---

## 4. 视觉与交互规范

### 4.1 设计方向

风格定义为：**modern academic portfolio**。

关键词：克制、清晰、可信、轻量、技术感。避免传统教授主页的密集纯文本，也避免商业落地页式的大量渐变和夸张动画。

### 4.2 配色建议

建议使用冷色科技感方案：

| Token | Light | Dark | 用途 |
|---|---|---|---|
| `--color-bg` | `#F8FAFC` | `#0B1120` | 页面背景 |
| `--color-surface` | `#FFFFFF` | `#111827` | 卡片背景 |
| `--color-text` | `#0F172A` | `#E5E7EB` | 主文字 |
| `--color-muted` | `#64748B` | `#94A3B8` | 次要文字 |
| `--color-primary` | `#2563EB` | `#60A5FA` | 链接与主按钮 |
| `--color-accent` | `#0F766E` | `#2DD4BF` | 标签与强调 |
| `--color-border` | `#E2E8F0` | `#243044` | 边框 |

如希望体现 Notre Dame 身份，可少量使用 ND Navy / Gold，但不要让整站变成学校官网复制品。

### 4.3 字体

- 正文与界面：Inter 或 Geist Sans；
- 标题：Inter/Geist 的较高字重；
- 数学、代码：JetBrains Mono；
- 使用本地或可稳定加载的 Web Font，并配置系统字体回退。

### 4.4 响应式断点

| 范围 | 典型设备 | 布局 |
|---|---|---|
| `< 640px` | 手机 | 单列、折叠菜单、紧凑间距 |
| `640–1023px` | 平板 | 1–2 列卡片 |
| `>= 1024px` | 桌面 | 最大宽度 1120–1200px，多列布局 |

### 4.5 动效

允许：

- 150–250ms hover/focus 过渡；
- 首屏轻微淡入；
- 卡片 hover 上浮 2–4px；
- 导航滚动状态变化；
- 主题切换。

禁止：

- 大面积视差滚动；
- 自动播放背景视频；
- 妨碍阅读的粒子动画；
- 频繁弹窗；
- 每个模块都使用滚动触发动画。

必须尊重 `prefers-reduced-motion`。

### 4.6 无障碍

- 正文颜色对比度达到 WCAG AA；
- 所有交互可用键盘操作；
- `focus-visible` 清晰可见；
- 图片必须有有效 `alt`；
- 图标按钮必须有 `aria-label`；
- 页面只能有一个主 `h1`，标题层级连续；
- 不仅依靠颜色表达状态。

---

## 5. 技术架构

### 5.1 技术选型

| 层级 | 技术 | 作用 |
|---|---|---|
| 框架 | Astro | 静态生成、页面路由、内容集合 |
| 语言 | TypeScript | 类型安全的数据模型和组件参数 |
| 样式 | Tailwind CSS | 快速实现统一设计系统 |
| 交互 | React | 仅用于论文筛选等状态型组件 |
| 内容 | Markdown/MDX | 维护论文、项目、新闻和研究内容 |
| 图标 | Lucide | 统一、轻量的 SVG 图标 |
| 部署 | GitHub Actions + Pages | 自动构建和发布 |
| 质量 | ESLint + Prettier | 代码检查和格式化 |

### 5.2 Astro Islands 策略

默认组件不发送 JavaScript 到浏览器。只有状态较复杂的组件需要 React 水合；交互分工如下：

- `PublicationExplorer.tsx`：搜索与筛选；
- `MobileMenu`：原生 `<details>` 或原生脚本；
- `ThemeToggle`：原生主题脚本；
- BibTeX：原生 `<details>` 与复制按钮。

首屏论文筛选使用 `client:load`，保证控件及时可用；下方非关键交互才使用 `client:visible` 或 `client:idle`。导航和主题切换使用原生脚本，不需要 React 水合。

### 5.3 URL 策略

采用稳定、可读的英文 slug：

- `/research/`
- `/publications/`
- `/projects/`
- `/projects/tc-safeplan/`
- `/news/`
- `/cv/`

所有内部链接不得硬编码域名，应使用相对路径或统一的站点配置。

---

## 6. 项目目录

```text
fanchen.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── profile/
│   │   ├── publications/
│   │   └── projects/
│   ├── files/
│   │   └── Fan_Chen_CV.pdf
│   ├── og/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.astro
│   │   │   ├── IconLink.astro
│   │   │   ├── SectionHeading.astro
│   │   │   └── Tag.astro
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── ThemeToggle.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── ResearchCards.astro
│   │   │   └── RecentNews.astro
│   │   ├── publications/
│   │   │   ├── PublicationCard.astro
│   │   │   └── PublicationExplorer.tsx
│   │   └── projects/
│   │       └── ProjectCard.astro
│   ├── content/
│   │   ├── publications/
│   │   ├── projects/
│   │   ├── news/
│   │   └── research/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ContentLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── research.astro
│   │   ├── publications.astro
│   │   ├── news.astro
│   │   ├── cv.astro
│   │   └── projects/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   ├── styles/
│   │   └── global.css
│   ├── config.ts
│   ├── content.config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

## 7. 内容模型

### 7.1 全局配置

`src/config.ts` 集中维护不会频繁变化的信息：

```ts
export const siteConfig = {
  name: 'Fan Chen',
  title: 'Fan Chen | Robotics Researcher',
  description:
    'Research in safe autonomous systems, multi-robot planning, and foundation models for robotics.',
  affiliation: 'University of Notre Dame',
  role: 'Incoming Ph.D. Student in Electrical Engineering',
  email: null, // 待填写公开邮箱；缺失时不渲染链接
  links: {
    github: null,
    scholar: null,
    linkedin: null,
    orcid: null,
  },
};
```

邮箱可使用 `mailto:`；若担心垃圾邮件，可在页面上拆分显示，但不要采用影响复制和无障碍的复杂混淆。

### 7.2 Publication Schema

推荐字段：

```ts
const publicationSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  venue: z.string(),
  year: z.number(),
  type: z.enum(['conference', 'journal', 'workshop', 'preprint', 'thesis']),
  topics: z.array(z.string()).default([]),
  status: z.enum(['published', 'accepted', 'under-review', 'preprint']),
  selected: z.boolean().default(false),
  featuredOrder: z.number().optional(),
  image: z.string().optional(),
  abstract: z.string().optional(),
  doi: z.string().optional(),
  paperUrl: z.string().url().optional(),
  projectId: z.string().optional(), // 站内项目使用稳定 ID
  projectUrl: z.string().url().optional(), // 仅用于外部项目页
  codeUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  slidesUrl: z.string().url().optional(),
  bibtex: z.string().optional(),
});
```

示例：

```md
---
title: "Task-Conditioned Semantic Safety Monitoring and Latency-Aware Planning for Unmanned Aerial Vehicles"
authors:
  - "Fan Chen"
  - "Naira Hovakimyan"
venue: "AIAA SciTech 2027"
year: 2027
type: "conference"
topics: ["Safe Planning", "Semantic Safety", "UAV"]
status: "accepted"
selected: true
featuredOrder: 1
image: "/images/publications/tc-safeplan.webp"
---

This work introduces a task-conditioned semantic safety monitoring and
latency-aware planning framework for UAVs.
```

以上条目不含尚未提供的 URL。可选字段缺失时省略，不填空字符串；teaser 文件准备好之前也应删除 image 字段。

### 7.3 Project Schema

```ts
const projectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  status: z.enum(['completed', 'ongoing', 'planned']),
  period: z.string(),
  topics: z.array(z.string()),
  featured: z.boolean().default(false),
  cover: z.string(),
  links: z.object({
    paper: z.string().url().optional(),
    code: z.string().url().optional(),
    demo: z.string().url().optional(),
    video: z.string().url().optional(),
  }).default({}),
});
```

项目正文统一采用：

1. Problem；
2. Motivation；
3. Method；
4. System / Experimental Setup；
5. Results；
6. Resources；
7. Acknowledgments。

### 7.4 News Schema

```ts
const newsSchema = z.object({
  date: z.coerce.date(),
  title: z.string(),
  category: z.enum(['publication', 'talk', 'education', 'award', 'project']),
  link: z.string().optional(),
  featured: z.boolean().default(false),
});
```

### 7.5 内容真实性规则

- `accepted` 与 `published` 必须区分；
- under review 的论文不写目标 venue，除非公开政策允许且确有必要；
- planned 项目不得使用暗示已有结果的表达；
- 外部链接上线前逐一验证；
- 作者顺序严格按论文版本；
- 当前单位、学位状态和日期必须及时更新。

---

## 8. 核心组件设计

### 8.1 Header

- 桌面端：左侧姓名/Logo，右侧导航；
- 手机端：姓名 + 菜单按钮；
- 当前页面显示 active 状态；
- sticky 顶栏，滚动后增加半透明背景和细边框；
- 不使用占据大量高度的导航栏。

### 8.2 Hero

桌面端两列：左侧文字，右侧头像；手机端头像置顶或姓名下方。

主操作：

- View Publications；
- Download CV。

次级图标链接：Email、Google Scholar、GitHub、LinkedIn、ORCID。

### 8.3 PublicationCard

每张卡片包含：

- teaser（可选）；
- 论文标题；
- 作者；
- venue、年份和状态；
- topic 标签；
- 资源按钮。

本人姓名使用半粗体，不使用颜色制造不必要视觉噪声。论文标题链接优先指向项目页或正式论文页。

### 8.4 PublicationExplorer

交互状态：

```ts
type Filters = {
  query: string;
  year: number | 'all';
  topic: string | 'all';
  type: string | 'all';
};
```

过滤逻辑在浏览器本地完成，不请求服务端。数据量少于 100 篇时无需搜索服务。筛选结果数量应实时显示，并提供 `Clear filters`。

### 8.5 ThemeToggle

- 默认读取系统主题；
- 用户选择写入 `localStorage`；
- 在页面首屏绘制前应用主题，避免闪烁；
- 使用图标和文本/辅助标签说明状态。

---

## 9. SEO、学术检索与分享

### 9.1 页面元数据

每页至少提供：

- 唯一 `<title>`；
- meta description；
- canonical URL；
- Open Graph 标题、描述与图片；
- Twitter Card；
- favicon；
- 页面语言 `lang="en"`。

建议网站正文以英文为主。未来如需中文，采用 `/zh/` 独立路径，不在同一段落中逐句双语并排。

### 9.2 结构化数据

首页加入 `Person` JSON-LD：

- `name`；
- `url`；
- `image`；
- `jobTitle`；
- `affiliation`；
- `sameAs`。

论文详情若信息完整，可加入 `ScholarlyArticle` JSON-LD。不得填写不存在的 DOI 或发布日期。

### 9.3 Sitemap 和 Robots

- 使用 Astro sitemap 集成自动生成 sitemap；
- `robots.txt` 允许抓取公开页面；
- 草稿不得参与构建或写入 sitemap。

### 9.4 分享图片

制作 1200×630 px 默认 OG 图片，包含姓名、研究定位和简洁视觉元素。代表项目可使用独立 OG 图片。

---

## 10. 性能目标

### 10.1 指标

以下为项目目标，不是已测成绩。实验室检查使用生产构建、固定浏览器与移动端节流配置，运行三次取中位数；真实用户指标需上线后有足够数据才能评估：

| 指标 | 目标 |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Accessibility | ≥ 95，目标 100 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |
| LCP | < 2.5 s |
| CLS | < 0.1 |
| INP | 上线后有足够真实访问数据时，以第 75 百分位 ≤ 200 ms 为目标 |
| 首屏 JS | 尽量 < 80 KB gzip |

### 10.2 图片策略

- 照片优先 AVIF/WebP；
- 头像准备 320、640 px 版本；
- teaser 设置明确宽高，防止布局偏移；
- 首屏头像可 eager，非首屏图片 lazy；
- 不上传原始超大科研截图；
- 图表缩略图保证文字仍可辨识。

---

## 11. GitHub Pages 部署

### 11.1 仓库选择

推荐创建用户主页仓库：

`<github-username>.github.io`

优点是默认部署在根路径，配置最简单。若使用普通项目仓库，则必须在 Astro 中设置正确的 `base`。

### 11.2 Astro 配置

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

实际依赖版本应按创建项目时的 Astro 与 Tailwind 官方集成方式调整，锁定在 `package-lock.json` 中，不在规格书中固定长期可能过期的版本号。

### 11.3 GitHub Actions

`.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: withastro/action@v6
        with:
          node-version: 24
          build-cmd: npm run check && npm run build

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v5
```

为减少供应链风险，正式仓库可将 Actions 从标签固定到经过审核的 commit SHA，并使用 Dependabot 更新。

### 11.4 自定义域名迁移

后续迁移步骤：

1. 购买域名；
2. 在 GitHub 仓库 `Settings → Pages → Custom domain` 填入域名；
3. 按 GitHub 提示设置 DNS；
4. 验证域名；
5. 等待证书签发并启用 HTTPS；
6. 将 Astro `site` 改为正式域名；
7. 重新构建并检查 canonical、sitemap、OG URL；
8. 保留原 GitHub Pages 地址的跳转行为并更新学术平台链接。

推荐以 `www.example.com` 作为主域名或明确设置根域名与 `www` 的唯一 canonical 版本，避免重复内容。

---

## 12. 开发与更新流程

### 12.1 初始化

```bash
npm create astro@latest fanchen.github.io
cd fanchen.github.io
npx astro add react sitemap mdx
npm install tailwindcss @tailwindcss/vite lucide-react
npm install -D @astrojs/check typescript prettier prettier-plugin-astro eslint
```

具体命令以实施时的官方脚手架输出为准。

### 12.2 日常内容更新

新增论文：

1. 在 `src/content/publications/` 新建 Markdown；
2. 填写 frontmatter；
3. 添加 teaser；
4. 本地执行 `npm run check` 和 `npm run build`；
5. 提交并推送；
6. GitHub Actions 自动部署。

新增新闻同理。修改全局身份信息只需修改 `src/config.ts`。

### 12.3 分支策略

- `main`：始终保持可部署；
- 内容小改可直接提交 main；
- 页面重构使用 `feature/...` 分支并通过 Pull Request；
- 自动依赖更新单独 PR；
- 禁止将草稿 PDF、私人材料或密钥提交到仓库。

### 12.4 Commit 规范

推荐：

- `feat: add publication filtering`
- `content: add AIAA SciTech 2027 paper`
- `fix: correct mobile navigation focus`
- `style: refine publication card spacing`
- `chore: update dependencies`

---

## 13. 测试与质量保证

### 13.1 自动检查

`package.json` 至少提供：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

CI 失败时不得部署。

### 13.2 手工测试矩阵

至少检查：

- Chrome、Firefox、Safari/移动 Safari；
- Android Chrome；
- 360px、768px、1024px、1440px；
- 浅色与深色主题；
- 键盘导航；
- `prefers-reduced-motion`；
- 禁用 JavaScript 后，已加载页面仍显示完整论文、简介和项目链接；
- 所有外链和 PDF；
- 404 页面；
- 刷新深层链接是否正常。

### 13.3 内容验收

- 拼写、单位、日期无误；
- 论文作者及顺序正确；
- 会议状态措辞准确；
- CV 与网页信息一致；
- 没有 Lorem Ipsum、占位链接和测试图片；
- 公共邮箱可用；
- 所有尚未公开内容均已移除或适当概括。

---

## 14. 安全与隐私

纯静态站风险较低，但仍应遵循：

- 仓库中不得出现 API Key、Token、签证材料、住址和私人电话号码；
- 联系表单如非必要不实施；
- 若未来使用第三方统计，只使用隐私友好的无 Cookie 方案；
- 外链使用 `rel="noopener noreferrer"`；
- 依赖使用 lockfile 并定期更新；
- 自定义域名在 GitHub 中完成验证；
- 简历 PDF 应检查元数据和不希望公开的个人信息。

首版不建议接入 Google Analytics。若只需要访问趋势，可后续评估 Cloudflare Web Analytics 或 Plausible。

---

## 15. 分阶段实施计划

### Phase 0：资料准备（0.5–1 天）

- 确定 GitHub 用户名；
- 准备正式头像；
- 整理英文 Bio；
- 整理论文、项目、News、教育经历；
- 准备公开版 CV；
- 确定 Scholar/GitHub/ORCID/LinkedIn 链接。

### Phase 1：工程骨架（0.5–1 天）

- 初始化 Astro、TypeScript、Tailwind；
- 建立目录、基础 Layout 和设计 Token；
- 配置内容集合；
- 配置代码格式化与构建检查。

### Phase 2：首页 MVP（1–2 天）

- Header、Hero、About；
- Research Cards；
- Selected Publications/Projects；
- Recent News、Footer；
- 移动端导航和主题切换。

### Phase 3：内容页面（1–2 天）

- Publications；
- Projects 及详情页；
- Research；
- News；
- CV。

### Phase 4：交互与完善（1 天）

- 论文搜索与筛选；
- BibTeX；
- SEO 和 JSON-LD；
- OG 图片；
- 404 页面。

### Phase 5：测试与上线（0.5–1 天）

- Lighthouse；
- 跨浏览器与移动端检查；
- 链接、内容、CV 检查；
- GitHub Actions 部署；
- GitHub Pages 设置与最终验收。

一个内容资料齐全的首版预计需要 4–7 个有效工作日。若只做高质量 MVP，可先在 2–3 天内上线，再渐进扩展。

---

## 16. 首版内容建议

### 16.1 Hero

- Name: Fan Chen
- Current affiliation: 按上线时实际状态填写
- Research tagline: Safe Autonomous Systems · Multi-Robot Planning · Foundation Models for Robotics
- CTA: Publications / CV

### 16.2 Research Cards

1. Task-Conditioned Semantic Safety
2. Risk-Aware and Latency-Aware Planning
3. Multi-Robot Coordination under Uncertainty

### 16.3 Selected Publication

首批代表作可加入：

**Task-Conditioned Semantic Safety Monitoring and Latency-Aware Planning for Unmanned Aerial Vehicles**  
Fan Chen and Naira Hovakimyan  
AIAA SciTech 2027, accepted; in-person presentation scheduled for January 11, 2027.

若论文尚未公开，不显示 Paper 按钮；可先显示 `Accepted` 标签，待正式链接可用后再添加。

### 16.4 News 初始条目

- 2026-08: Paper accepted to AIAA SciTech 2027；
- 2026-05: Completed M.S. in Mechanical Engineering at UIUC；
- 未来确认入学与状态后，再添加 Notre Dame Ph.D. 条目。

不要提前写成已经发生的事件。

---

## 17. 验收标准（Definition of Done）

项目满足以下条件方可视为首版完成：

- [ ] 六个顶层页面均可访问；
- [ ] 首页在 10 秒内清楚传达身份、单位和研究方向；
- [ ] 论文、项目和 News 均由内容文件驱动；
- [ ] 新增论文不需要修改组件代码；
- [ ] 手机、平板和桌面布局无明显问题；
- [ ] 深色与浅色模式可用且无闪烁；
- [ ] 键盘可访问主要导航和交互；
- [ ] 无占位文字、死链和错误身份信息；
- [ ] CV 可打开和下载；
- [ ] 构建检查通过；
- [ ] GitHub Actions 可在 main 推送后自动部署；
- [ ] Lighthouse 四项均达到 95 左右或以上；
- [ ] 页面具备 canonical、OG、sitemap、robots 和基本 JSON-LD；
- [ ] 仓库不存在密钥或敏感个人资料；
- [ ] README 包含本地开发、内容更新和部署说明。

---

## 18. 后续扩展路线

完成首版后，可按实际需求添加：

1. 自动生成 BibTeX 与引用复制；
2. 中文版 `/zh/`；
3. Talks / Teaching / Awards 页面；
4. 项目交互 Demo；
5. 从 ORCID 或 BibTeX 半自动同步论文；
6. RSS feed；
7. 隐私友好的访问统计；
8. 自定义域名与专业邮箱；
9. 基于 Pagefind 的全站搜索（内容显著增加后再引入）。

不建议在内容量很少时提前加入复杂 CMS、全文搜索服务或大型 React 状态管理库。

---

## 19. 交付物清单

实施完成应交付：

- 完整 GitHub 仓库；
- 已部署的 GitHub Pages 网站；
- 响应式页面与深浅主题；
- 内容集合及示例内容；
- 公开版 CV；
- favicon 与默认 OG 图片；
- GitHub Actions 工作流；
- README 更新说明；
- 上线前测试记录；
- 自定义域名迁移说明。

---

## 20. 给 AI 编程工具的执行摘要

> Build a production-ready academic portfolio for Fan Chen using Astro, TypeScript, Tailwind CSS, and minimal React. Generate a static site deployable to GitHub Pages. Use Astro content collections with strict schemas for publications, projects, news, and research areas. Build Home, Research, Publications, Projects, News, and CV pages. Implement responsive navigation, accessible light/dark mode, publication search and filters, project detail pages, SEO metadata, JSON-LD, sitemap, Open Graph cards, and an automated GitHub Pages workflow. Keep most components server-rendered/static; use React only for stateful filtering. Follow WCAG AA, respect reduced motion, optimize images, and target Lighthouse scores of at least 95. The visual style should be a restrained modern researcher portfolio, not a traditional text-heavy faculty page or a marketing landing page. Never invent academic facts or links. Keep missing material in a private implementation checklist; hide unavailable links in production. Use Incoming status until enrollment is confirmed, and Accepted for the SciTech paper until publication is verified.

这段摘要可用于启动开发，但实现时仍应以本技术书的内容模型、真实性规则和验收标准为准。

---

## 21. 实施基线与版本管理

本节至第 29 节补齐实际开发时的工程契约。前面的设计要求与本节共同组成交付规格。

### 21.1 环境

- 使用 Node.js 24，开发机与 CI 一致；将实际使用的小版本记入 `.nvmrc` 和 README。
- 使用 npm，提交 `package-lock.json`，CI 从锁文件安装，避免每次部署解析新的依赖。
- 初始化可使用 `@latest`，完成初始化后以锁文件为准，不在每次构建时升级依赖。
- README 记录 Astro、React、Tailwind、Node、npm 的实际版本及验证日期。
- 每次大版本升级独立提交，检查迁移指南和生产构建，避免与论文内容更新混在一起。

Astro 的安装环境要求以[官方安装说明](https://docs.astro.build/en/install-and-setup/)为准。本文选用 Node 24 是项目实施基线，不表示任意未来 Astro 版本都无需再核对。

### 21.2 Tailwind 与 MDX 接入

`astro.config.mjs` 中导入 `mdx` 并将其加入 integrations；第 11 节配置中的其余项保留：

```js
import mdx from '@astrojs/mdx';
// integrations: [react(), sitemap(), mdx()]
```

`src/styles/global.css`：

```css
@import "tailwindcss";

:root {
  color-scheme: light;
  --color-bg: #f8fafc;
  --color-surface: #fff;
  --color-text: #0f172a;
}
:root[data-theme="dark"] {
  color-scheme: dark;
  --color-bg: #0b1120;
  --color-surface: #111827;
  --color-text: #e5e7eb;
}
body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
}
```

在 `BaseLayout.astro` 中导入此 CSS。本文采用 Tailwind 4 的 Vite 插件方式，不混用 Tailwind 3 的旧集成；参考[Astro 样式文档](https://docs.astro.build/en/guides/styling/)。Markdown 正文可自行编写 `.prose` 样式；如果使用 Typography 插件，应明确安装和配置，不能只写一个未定义的 class。

## 22. 内容集合、路由与发布控制

### 22.1 注册集合

第 7 节的 schema 是字段契约，还需要在 `src/content.config.ts` 注册加载器。将那几段 schema 定义放在本文件相应位置，再接入以下代码：

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 在此放入第 7 节 publicationSchema、projectSchema、newsSchema 定义。
const publishing = {
  draft: z.boolean().default(true),
};

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
  schema: publicationSchema.extend(publishing),
});
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: projectSchema.extend(publishing),
});
const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: newsSchema.extend(publishing),
});
const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().int(),
    ...publishing,
  }),
});
export const collections = { publications, projects, news, research };
```

实现前核对锁定版本支持的导入路径；此处按当前[Astro Content Collections 文档](https://docs.astro.build/en/guides/content-collections/)使用 loader 注册和 `astro/zod`。

每篇允许上线的内容显式加入 `draft: false`。默认草稿是防止误发布的项目约定；第 7 节论文示例补上此字段后才进入公开页面。

注意：`draft` 只控制网站构建，不保护公开仓库中的源文件。未公开全文、私人材料不得靠这一字段保密。

### 22.2 查询与排序

在 `src/lib/content.ts` 集中定义公开内容查询，首页、列表、详情路由与搜索数据都使用同一入口：

```ts
import { getCollection } from 'astro:content';

export async function publicPublications() {
  return (await getCollection('publications', ({ data }) => !data.draft))
    .sort((a, b) => b.data.year - a.data.year ||
      a.data.title.localeCompare(b.data.title));
}
export async function publicProjects() {
  return getCollection('projects', ({ data }) => !data.draft);
}
```

规则：

- 列表按年份倒序，同年按标题稳定排序；首页代表作按 `featuredOrder` 升序。
- News 日期使用 `YYYY-MM-DD`，显示时统一 UTC，避免访客时区导致日期前移。
- 对未来日期默认不展示；需要预告时，新增 `announcement` 分类，标题明确写 Upcoming。
- 发布状态不会因到了会议年份自动从 Accepted 变为 Published，应由本人核实后修改。
- `projectId` 必须在公开项目集合中存在；悬空关联构建时报错。
- 文件名使用小写英文与短横线。slug 发布后尽量不变。

### 22.3 详情页生成

`src/pages/projects/[...slug].astro` 的最小路由示例：

```astro
---
import { render } from 'astro:content';
import { publicProjects } from '../../lib/content';
import ContentLayout from '../../layouts/ContentLayout.astro';

export async function getStaticPaths() {
  const entries = await publicProjects();
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}
const { entry } = Astro.props;
const { Content } = await render(entry);
---
<ContentLayout title={entry.data.title} description={entry.data.summary}>
  <h1>{entry.data.title}</h1>
  <Content />
</ContentLayout>
```

`ContentLayout` 必须接受 `title`、`description` 并传递给 `BaseLayout`，通过 `<slot />` 展示正文。首版无需为每篇论文单独建立详情页，论文可关联项目；若后续需要学术检索专页，再增加 `/publications/[...slug]/`。

### 22.4 链接辅助函数

为普通项目仓库预留 base 支持。`src/lib/urls.ts`：

```ts
// 只接受站内路径，不传入 https://、mailto: 或已经带 base 的路径。
export function sitePath(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}
```

导航、`public/` 图片、PDF 使用 `sitePath('files/Fan_Chen_CV.pdf')` 等调用。外部资源直接使用完整 URL。不要将 MDX 正文里所有根路径都假定为自动加 base：正文需使用链接组件或在构建验证时检查。

| 部署情形 | `site` | `base` |
|---|---|---|
| 用户主页仓库 | `https://USERNAME.github.io` | `/` 或省略 |
| 普通项目仓库 | `https://USERNAME.github.io` | `/REPO` |
| 本站绑定个人域名并部署到根路径 | `https://www.example.com` | `/` 或省略 |

## 23. 交互行为契约

### 23.1 论文筛选

- 输入搜索词后，标题、作者、venue、topic 均参与大小写不敏感的匹配。
- 搜索词与年份、主题、类型之间使用 AND；默认每个下拉框都是 All。
- 用 URL 参数 `q`、`year`、`topic`、`type` 保存状态，刷新或复制链接后可恢复。
- 不合法的筛选参数回退 All；不存在的搜索词正常显示零结果。
- 提供结果数量、空状态和 Clear filters；清空时更新 URL。
- 初始 HTML 已含完整论文列表；禁止 `client:only` 导致无 JavaScript 时空白。
- React 只接收公开条目的轻量字段，不传整份 MDX、草稿或未公开摘要。
- 只有一篇论文时隐藏多余的年份/类型筛选，避免出现没有实际作用的控件。
- 首版采用 React 实现筛选时，列表与卡片由同一个 React island 输出，避免与 Astro 卡片双重渲染。

### 23.2 BibTeX

首版使用 `<details><summary>BibTeX</summary>…</details>`，内含可选中的 `<pre>` 与 Copy 按钮。复制成功显示 Copied，失败提示手动选择；不能在失败时仍显示成功。所有 BibTeX 以文本渲染，不使用不受控的 HTML 插入。DOI、页码、论文编号缺失时省略，不能补造出版信息。

### 23.3 主题

主题选项为 System / Light / Dark。head 中使用短小的 `is:inline` 脚本，在首屏绘制前读取已存选择并应用 `data-theme`；读写 localStorage 用 try/catch。System 模式监听系统颜色变更，Light/Dark 明确选择优先。存储不可用不影响阅读。首版不启用客户端页面路由，以减少跨页面事件重复绑定问题。

### 23.4 导航与媒体

移动菜单按钮维护 `aria-expanded`；Escape 关闭并将焦点返回按钮。若采用覆盖层菜单，应管理焦点范围并阻止背景滚动；普通展开式菜单无需模拟模态框。页面具有 Skip to content 链接。

研究视频默认展示封面与播放入口，不自动请求大型视频；外部播放器可点击后再加载。图表提供清晰标题与文字结论，不能让图表成为唯一的信息来源。

## 24. 发布、回滚与故障处理

### 24.1 发布前准备

1. 确认真实 GitHub 用户名，仓库名中的 `fanchen` 仅是示例，不能假定已拥有该账号。
2. 将代码推送到 `<USERNAME>.github.io`，在 Settings → Pages 选择 GitHub Actions。
3. 提交锁文件，配置第 11 节 workflow。Action 标签来自核对时的[Astro 部署示例](https://docs.astro.build/en/guides/deploy/github/)，实施时核对并按需要固定提交 SHA。
4. 添加独立 PR 检查工作流，只执行安装、check、build；PR 不运行生产部署，避免测试分支替换正式站点。
5. 首次运行后，检查 Actions 的 build 与 deploy 两个阶段均成功，再打开真实 Pages 地址。
6. 验证项目详情直接访问、刷新、PDF、图片与 404；只看首页截图不算完成发布验证。

GitHub Pages 不是默认提供每个 PR 独立预览的系统。首版 PR 用本地 `npm run preview` 与截图审查；以后确需在线预览再单独选择服务。

### 24.2 回滚

- 每次公开版本记录 Git commit 和部署时间。
- 内容错误通过 `git revert <提交>` 生成修复提交并推送 main，触发重新构建。
- 构建失败时先检查现网状态；不要为修复构建而删除现有发布。
- 不强推重写正常历史。回滚完成后检查真实 URL 和关键资源。
- Git 能回滚内容与配置；域名 DNS 和 GitHub Pages 设置属于外部状态，需要独立记录。

### 24.3 排障表

| 症状 | 优先检查 | 处理 |
|---|---|---|
| 首页正常，图片或 CSS 404 | base、public 路径、大小写 | 统一使用路径函数并重新构建 |
| 详情页 404 | getStaticPaths、draft、slug | 检查 dist 是否含对应 HTML |
| 本地正常，CI 失败 | Node 版本、锁文件、Linux 大小写 | 与 CI 环境对齐，运行 npm ci |
| 新论文没有出现 | draft、selected、过滤条件 | 检查公开集合与列表排序 |
| 页面还是旧内容 | workflow 是否成功、浏览器缓存 | 确认部署 commit，再强制刷新 |
| 筛选按钮无响应 | island 水合、浏览器错误 | 使用及时水合并检查传入数据 |
| 主题闪白 | head 内初始化脚本是否太晚 | 在样式绘制前应用已保存主题 |
| HTTPS 无法启用 | DNS、冲突记录、证书状态 | 按 Pages 检查提示修正并等待 |

## 25. 个人域名迁移操作手册

迁移只改变访问域名与构建配置，代码和内容继续留在原仓库。

1. 选择主域名，例如 `www.example.com`；先确认域名归属。
2. 按 GitHub 指引验证域名，记录 TXT 验证配置。
3. 在仓库 Pages 设置中填写 Custom domain，再配置 DNS。
4. `www` 使用 CNAME 指向 `USERNAME.github.io`，目标不包含协议或仓库路径；根域名按 GitHub 当时公布的 A/AAAA 或服务商支持的 ALIAS/ANAME 配置。
5. 把 Astro `site` 改成主域名；若原先是项目路径，移除原 `base`。
6. 构建部署，检查 canonical、OG 图片绝对 URL、sitemap 和 robots 中的网址。
7. DNS 检查通过且证书就绪后启用 Enforce HTTPS。
8. 分别验证根域名、www、旧 Pages 地址及至少一个深层链接，观察实际跳转目标。
9. 更新 Scholar、GitHub profile、CV 等对外链接；保留迁移记录。

本方案使用自定义 GitHub Actions workflow。GitHub 官方说明此模式不要求仓库 CNAME 文件，存在的 CNAME 文件也会被忽略；因此以 Pages 设置与 DNS 为准，不能仅添加 `public/CNAME` 就认为完成绑定。参考[GitHub 自定义域名文档](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。

取消域名绑定或迁移托管时，同时清理旧 DNS 指向。GitHub Pages 不提供任意服务端重定向规则，因此保持页面 slug 不变，减少旧链接失效；确需改 slug 可建立旧路径静态跳转页，但这不等价于服务器 301。

## 26. 本人日常维护手册

| 需求 | 修改位置 | 必要核对 |
|---|---|---|
| 修改身份和单位 | `src/config.ts` | Hero、About、JSON-LD、CV 同步 |
| 新增论文 | `src/content/publications/*.md` | 作者、状态、年份、draft |
| 上传论文或 slides | `public/files/` | 公开权限、文件大小与链接 |
| 更新项目 | `src/content/projects/*.mdx` | slug 保持稳定，结果有依据 |
| 新增动态 | `src/content/news/*.md` | 日期、时态与资源链接 |
| 更换头像 | `public/images/profile/` | 比例、清晰度、大小、alt |
| 更新 CV | `public/files/Fan_Chen_CV.pdf` | 保持下载地址，修改更新时间 |
| 切换域名 | `astro.config.mjs`、Pages、DNS | canonical、sitemap、深层路径 |

可在 GitHub 网页直接编辑 Markdown 并提交，也可本地编辑；两种方式都由 CI 校验。网页编辑之后再回本地工作应先拉取新提交，避免覆盖。

一次新增 News 的最小文件：

```md
---
title: "Our paper has been accepted to AIAA SciTech 2027."
date: "2026-08-24"
category: "publication"
featured: true
draft: false
---
```

建议用模板文件复制创建，模板放在 `docs/content-templates/`，不要放进会被 glob 读取的内容目录。每季度核对身份、外链、CV 和依赖；每次新增成果后立即更新，不需要等待全面改版。

## 27. 首版材料表与范围控制

| 材料 | 当前处理方式 | 上线要求 |
|---|---|---|
| GitHub 用户名 | 待提供 | 部署前确定 |
| 公开联系邮箱 | 待提供 | 有值才显示 Email |
| 头像 | 待提供 | 可先用姓名排版，不生成虚构真人头像 |
| 公开 CV | 待提供 | 缺失时隐藏下载按钮，不发布空白 PDF |
| Scholar/ORCID 等 | 待提供 | 不创建假链接 |
| SciTech 论文 | 已知题目和作者，Accepted | 全文、代码、DOI 分别核实后添加 |
| TC-SafePlan teaser | 待提供 | 优先使用本人论文图，并核对公开许可 |
| 多机器人扩展 | 进行中的研究方向 | 不预写实验成绩，不暗示 IROS 已接收 |
| ND 身份 | 入学前使用 Incoming | 实际开始后再更新 Student |

首版优先级：

- P0：首页、研究、论文、项目、News、CV 页面；真实内容；响应式；基础主题；自动部署与维护说明。
- P1：搜索筛选、BibTeX 复制、完整分享元数据、性能调优。
- P2：中文、复杂 demo、全站搜索、CMS、统计、自动论文导入。

若材料缺失，可交付可部署工程和缺项表；但不能把缺少 CV 或真实内容的状态宣称为通过全部内容验收。上述“网站交付物”是后续开发目标，本次交付的是技术书。

## 28. 验收用例与交接证据

| 编号 | 操作 | 预期结果 |
|---|---|---|
| A01 | 复制论文模板，填完必填字段并设 draft false | 自动出现在列表，未改组件 |
| A02 | 将 paperUrl 填成空字符串 | schema 检查失败并指出内容位置 |
| A03 | 将论文设为 draft true | 首页、列表、搜索数据均不出现 |
| A04 | 在项目路径部署并打开 PDF | URL 包含 base，文件成功打开 |
| A05 | 禁用 JavaScript 访问论文页 | 仍可阅读全部公开论文与资源链接 |
| A06 | 组合搜索与年份筛选，再刷新 | 条件保留，结果正确 |
| A07 | 连续切换主题并刷新 | 手动选择保留，系统模式响应系统 |
| A08 | 仅用键盘打开菜单和 BibTeX | 可操作、焦点清楚且不会丢失 |
| A09 | 人为制造类型或内容错误后运行 CI | 阻止新部署 |
| A10 | 访问不存在的路径 | 展示有导航入口的 404 页面 |
| A11 | 在手机上打开最长论文标题 | 无水平溢出，资源按钮可点击 |
| A12 | 更换 site/base 后构建 | 站内链接、canonical、sitemap 一致 |

交接记录包括：部署 URL、源码 commit、依赖版本、构建结果、桌面/手机与深浅主题截图、未完成事项。Lighthouse 分数附测试环境；无真实用户数据时不写“INP 已达标”。

无障碍检查不能只依靠评分：实际检查键盘、焦点、内容结构及文字对比。没有设置离线缓存时，不承诺断网后首次访问可用。

## 29. 官方资料与使用边界

以下链接用于核对平台行为；视觉布局、内容组织、性能预算、实施阶段和维护约定属于本项目设计决策。

- [Astro 安装](https://docs.astro.build/en/install-and-setup/)：环境要求与初始化。
- [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)：schema、loader 与内容查询。
- [Astro 样式](https://docs.astro.build/en/guides/styling/)：Tailwind 接入。
- [Astro GitHub Pages 部署](https://docs.astro.build/en/guides/deploy/github/)：工作流、site 和 base。
- [GitHub 自定义域名管理](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)：DNS、Pages 配置与 HTTPS。

本文已对这些关键平台规则进行文档核对；代码片段没有在本次任务中拼成完整网站并运行，开发者仍需通过第 28 节用例验证实际实现。工期为内容齐全前提下的规划估计，域名、外部服务与素材准备可能影响日历时间。
