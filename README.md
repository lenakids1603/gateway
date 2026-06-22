# LENAKIDS — Coming Soon

LENAKIDS 高定童装品牌的「即将上线」预告页。整屏沉浸式背景视频 + 极简排版，针对桌面端 / 移动端分别适配，并对微信、iOS Safari 等环境做了完善的视频自动播放兼容处理。

线上入口：[lenakids.com](https://lenakids.com) ｜ 企业门户：[op.lenakids.com](https://op.lenakids.com)

## 技术栈

| 用途 | 选型 |
| --- | --- |
| 框架 | [React 19](https://react.dev/) |
| 构建 | [Vite 6](https://vitejs.dev/) |
| 语言 | TypeScript |
| 样式 | [Tailwind CSS 4](https://tailwindcss.com/)（`@tailwindcss/vite`） |
| 动效 | [Motion](https://motion.dev/)（Framer Motion） |
| 图标 | [lucide-react](https://lucide.dev/) |

## 功能特性

- **自适应背景视频** —— 按屏幕尺寸 / 指针类型自动切换桌面与移动端视频源（`background-pc.mp4` / `background-mobile.mp4`）。
- **自动播放兼容** —— 针对微信 X5 内核（`x5-video-player-type`）、`WeixinJSBridgeReady`、iOS `playsInline` 及可见性变化等多重场景兜底触发播放。
- **海报占位** —— 视频加载完成前先显示海报图（已压缩，约 160 KB），首屏不留白。
- **入场动效** —— Logo、标题、分割线、按钮逐帧淡入。
- **响应式排版** —— 桌面端文案居右留白，移动端下沉至画面底部，避让主体。
- **SEO / 社交分享** —— 内置 Open Graph、Twitter Card、`description` 与 SVG favicon。

## 目录结构

```
.
├── index.html            # HTML 入口（含 SEO / OG / 字体预连接）
├── src/
│   ├── main.tsx          # React 挂载入口
│   ├── App.tsx           # 页面主体（背景视频 + 文案布局）
│   └── index.css         # Tailwind 引入与全局样式
├── public/               # 静态资源（构建时原样复制到 dist/）
│   ├── background-pc.mp4
│   ├── background-mobile.mp4
│   ├── background-poster-pc.jpg
│   ├── background-poster-mobile.jpg
│   └── favicon.svg
├── vite.config.ts
└── tsconfig.json
```

## 本地开发

环境要求：Node.js 18+。

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://127.0.0.1:3090）
npm run dev
```

可用脚本：

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器（`--host 0.0.0.0`，支持局域网访问） |
| `npm run build` | 生产构建，输出到 `dist/` |
| `npm run preview` | 本地预览生产构建产物 |
| `npm run lint` | 运行 `tsc --noEmit` 做类型检查 |
| `npm run clean` | 删除 `dist/` 与 `server.js` |

## 配置

开发 / 预览端口与主机可通过环境变量调整（见 [`vite.config.ts`](vite.config.ts)）：

| 变量 | 作用 |
| --- | --- |
| `PORT` | 自定义端口（默认 `3090`） |
| `DISABLE_HMR=true` / `APPLET_ID` | 切换至托管模式：`host 0.0.0.0`、端口 `3000`、关闭 HMR |

生产 `preview` 默认仅放行 `lenakids.com` 域名（`allowedHosts`）。

## 静态资源约定

背景视频与海报放在 `public/` 下，命名需与 [`src/App.tsx`](src/App.tsx) 中的引用保持一致：

- 桌面端：`background-pc.mp4` + `background-poster-pc.jpg`
- 移动端：`background-mobile.mp4` + `background-poster-mobile.jpg`

更新素材后，请同步修改 `App.tsx` 中的 `assetVersion`（形如 `?v=20260527`），用于刷新 CDN / 浏览器缓存。

## 构建与部署

```bash
npm run build
```

构建产物为纯静态文件，位于 `dist/`，可直接托管于任意静态服务器或 CDN（Nginx、Vercel、对象存储等）。

---

© LENAKIDS · Haute Couture
