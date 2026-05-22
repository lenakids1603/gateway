import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function App() {
  return (
    <main className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between font-sans text-neutral-900 select-none bg-[#fcfcfc]">
      
      {/* 1. 全屏背景视频层 - 采用用户指定的原生 video 标签与真实路径 /background.mp4 */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* 2. 奢华优雅轻量遮罩层 (Delicate white-tint overlay to ensure elegant high-fashion readability) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white/0 via-white/5 to-white/10 md:bg-gradient-to-r md:from-white/0 md:via-white/5 md:to-white/15" />

      {/* 3. 左上角时尚 Logo */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-30">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-1"
        >
          <span className="font-display font-semibold text-2xl md:text-3xl tracking-[0.35em] text-neutral-900 leading-none">
            LENAKIDS
          </span>
          <span className="text-[9px] tracking-[0.55em] text-neutral-400 font-light translate-x-0.5 uppercase">
            Haute Couture
          </span>
        </motion.div>
      </div>

      {/* 4. 右侧内容布局 (Right-aligned text positioned in the background video's natural negative space) */}
      <div className="relative z-20 flex-1 w-full h-full flex items-center justify-end">
        <div className="w-full md:w-[48%] max-w-xl px-8 sm:px-12 md:mr-12 lg:mr-24 xl:mr-32 text-left flex flex-col justify-center">
          
          {/* 主标题 - Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display font-extralight text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.1em] text-neutral-900 uppercase leading-[0.95] mb-2">
              Coming
            </h1>
            <h1 className="font-display font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.15em] text-neutral-900 uppercase leading-[0.95] mb-6">
              Soon
            </h1>
          </motion.div>

          {/* 装饰性极细分割线 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] w-24 bg-neutral-800/40 my-2 origin-left"
          />

          {/* 副标题 - A new LENAKIDS experience is on the way. */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
            className="font-sans text-xs sm:text-sm md:text-base font-light leading-relaxed text-neutral-500 tracking-[0.25em] uppercase max-w-md mt-4 mb-10"
          >
            A new LENAKIDS experience is on the way.
          </motion.p>

          {/* 按钮 - Enterprise Portal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.7, ease: "easeOut" }}
          >
            <a
              href="https://erp.lenakids.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-between gap-6 px-8 py-4 border border-neutral-800 text-neutral-900 tracking-[0.25em] text-xs font-light uppercase transition-all duration-300 w-fit hover:bg-neutral-900 hover:text-white select-none cursor-pointer bg-white/20 backdrop-blur-xs"
            >
              <span className="relative z-10 pl-1">Enterprise Portal</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 relative z-10" />
            </a>
          </motion.div>

        </div>
      </div>

      {/* 5. 简约艺术感底署名 */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="text-[9px] tracking-[0.3em] font-light uppercase text-neutral-500"
        >
          © {new Date().getFullYear()} Lena Kids. All rights reserved.
        </motion.div>
      </div>

     
    </main>
  );
}
