# Fan Chen · 个人主页与内容工作室

主页：**https://fancCoco.github.io/**  
中文编辑后台：**https://fancCoco.github.io/admin/**

一个适合 GitHub Pages 的轻量学术个人主页模板。无需安装工具或运行服务器，即可通过网页维护个人资料、动态、研究项目和文章。示例研究与经历均为占位内容，请替换成自己的信息。

## 日常更新（无需改代码）

1. 打开后台，选择「个人资料」「最新动态」「研究与项目」或「文章与笔记」。
2. 直接填写表单；内容自动保存到当前浏览器。右侧实时预览包含本地草稿。
3. 添加内容后，将需要上线的条目设为「公开」。处于「草稿」状态的内容不会上传。
4. 点击「连接 GitHub」，按下方说明授权；点击「发布更新」，确认本次发布内容。
5. 等待 GitHub Pages 部署完成（通常数分钟），刷新主页即可看到更新。后台提供部署进度入口。

## 首次连接 GitHub

本模板无需第三方 CMS 账号，也不需要额外付费服务器。发布通过 GitHub 官方 API 完成；编辑界面本身可公开访问，只有拥有仓库写入权限的令牌才能提交。

1. 在 GitHub 登录自己的账号，打开 [Fine-grained token 创建页](https://github.com/settings/personal-access-tokens/new)。
2. 设置名称、合适的到期日，Resource owner 选择自己的账号。
3. Repository access 选择 **Only select repositories**，仅勾选 **fancCoco.github.io**。
4. Repository permissions 中，**Contents → Read and write**。Metadata 保持 GitHub 自动授予的只读权限，无需其他写入权限。
5. 生成后，将令牌粘贴到后台的「访问令牌」输入框。用户名填 `fancCoco`，仓库填 `fancCoco.github.io`，分支填 `main`。

令牌只在当前页面内存中使用，不写入本地备份、浏览器存储或仓库。**每次刷新或重新打开后台，需要重新粘贴令牌**；可以自行保存在密码管理器中。不要将令牌发到聊天、文章或提交记录中。过期后按上述步骤重新创建。

## 草稿、备份与多设备

- 本地草稿只存在当前浏览器、当前网站地址下；隐私窗口、清理浏览器数据或更换设备后不会自动同步。请定期使用「导出完整备份」。
- 「导入备份」恢复所有内容，包括草稿；它不会立即发布。
- 公开仓库和历史提交对任何人可见。把已经发布的条目改为草稿并发布，会从当前主页撤下，但不会删除 Git 历史。
- 在其他设备更新后，后台会阻止覆盖较新的版本。先导出本地备份，再重新连接并选择「重新加载远程内容」，整理修改后发布。
- 动态和文章按日期降序展示；研究项目按后台列表顺序展示，可用上移 / 下移调整。

## 图片、文章和链接

- 头像和项目图片支持完整图片网址，也支持本地 PNG / JPG / WebP 上传（单张原图不超过 15MB）。上传会自动缩小至最长边 1000px 并压缩为 JPEG，透明背景会转为白色。
- 图片随内容保存，不依赖额外图床。公开内容文件总量限制约 900KB；大量图片建议使用自己托管的完整 HTTPS 图片网址。
- 正文支持换行分段、`# 标题`、`## 小标题`、`**加粗**`。这是轻量格式编辑器，不是完整 Markdown 编辑器；原始 HTML 不会执行。
- 简历可在内容工作室中粘贴 PDF 网址，或直接上传 PDF；发布时会保存为仓库根目录的 `CV.pdf` 并显示下载链接。论文、代码、项目、学术主页通过对应的网址字段添加。

## GitHub Pages 设置

在仓库 **Settings → Pages → Build and deployment** 中，将 Source 设为 **Deploy from a branch**，选择 **main / (root)** 并保存。本模板有 `.nojekyll`，不依赖构建工具或第三方 Actions。

仓库名与用户名一致（`fancCoco.github.io`），发布地址即为 `https://fancCoco.github.io/`。也支持项目仓库的子路径部署。

## 文件结构

```text
index.html          主页入口
style.css           主页样式与移动端适配
shared.js           安全的内容渲染与校验
site.js             主页数据加载
content/site.json   已公开的内容
admin/index.html    中文内容管理后台
admin/admin.css     后台布局
admin/admin.js      本地草稿、图片、预览与 GitHub 发布
.nojekyll           直接发布静态文件
```

本地预览：在此目录运行 `python -m http.server 8765`，打开 `http://localhost:8765/`。不要直接双击 HTML 文件，浏览器会限制本地数据读取。

设计参考：[Christopher Agia](https://www.chrisagia.com/)、[Rohan Sinha](https://rohansinha.nl/)、[Zac Ravichandran](https://zacravichandran.github.io/)。模板独立实现，没有复制参考网站的论文、照片或个人经历。

技术依据：[GitHub Contents API](https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents)、[GitHub Pages 发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 界面语言 / Interface language

公开主页及示例内容使用英文。后台左上角可选择 **中文 / English**，选择会保存在当前浏览器，刷新后保留。切换语言只改变后台界面，不会翻译或覆盖个人资料、文章及草稿。预览始终显示英文主页界面。

The public website and example content are in English. Select **中文 / English** at the top of the studio sidebar. Your choice is remembered in this browser. Switching the interface language does not translate or overwrite your content or drafts.
