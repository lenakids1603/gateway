import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function App() {
  const MOBILE_MEDIA_QUERY =
  "(max-width: 768px), (pointer: coarse) and (max-width: 1024px)";

const getIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
};

const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);
const videoRef = useRef<HTMLVideoElement | null>(null);

useEffect(() => {
  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

  const handleChange = () => {
    setIsMobile(getIsMobile());
  };

  handleChange();

  mediaQuery.addEventListener("change", handleChange);
  window.addEventListener("resize", handleChange);
  window.addEventListener("orientationchange", handleChange);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
    window.removeEventListener("resize", handleChange);
    window.removeEventListener("orientationchange", handleChange);
  };
}, []);

  const assetVersion = "20260527";

  const videoSrc = isMobile
  ? `/background-mobile.mp4?v=${assetVersion}`
  : `/background-pc.mp4?v=${assetVersion}`;

  const posterSrc = isMobile
  ? `/background-poster-mobile.jpg?v=${assetVersion}`
  : `/background-poster-pc.jpg?v=${assetVersion}`;



  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-video-player-type", "h5");
    video.setAttribute("x5-video-player-fullscreen", "false");

    video.load();

    let cancelled = false;

    const tryPlay = async () => {
  if (cancelled) return;

  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;

  try {
    await video.play();
  } catch (error) {
    console.warn("Background video play failed", error);
  }
};

    // Repaint the background video with a tiny, reversible transform nudge so
    // the WeChat X5 / iOS WKWebView compositor rasterizes a FRESH frame (the
    // same thing the user's manual pinch-zoom does) WITHOUT ever pulling the
    // <video> out of layout the way the old display:none toggle did — that
    // toggle aborted X5's inline autoplay and made the first open regress into
    // "tap the screen to play".
    const forceVideoRepaint = () => {
      if (cancelled) return;
      const prev = video.style.transform;
      video.style.transform = "translateZ(0) scale(1.0001)";
      void video.offsetHeight; // 刷新布局 -> 强制重绘
      requestAnimationFrame(() => {
        if (cancelled) return;
        video.style.transform = prev; // 还原,肉眼无感
        if (video.paused) void tryPlay(); // 仅作兜底:真被暂停了才补一脚
      });
    };

    const handleReady = () => {
      void tryPlay();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void tryPlay();
      }
    };

    const handlePageShow = () => {
      forceVideoRepaint();
    };

    const handleWeixinJSBridgeReady = () => {
      void tryPlay();
    };

    const handleUserInteraction = () => {
      void tryPlay();
    };

    video.addEventListener("loadedmetadata", handleReady);
    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("canplay", handleReady);
    video.addEventListener("canplaythrough", handleReady);

    document.addEventListener("WeixinJSBridgeReady", handleWeixinJSBridgeReady, false);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("touchstart", handleUserInteraction, { once: true });
    document.addEventListener("click", handleUserInteraction, { once: true });

    if ((window as any).WeixinJSBridge) {
  void tryPlay();
}

    const timer = window.setTimeout(() => {
      void tryPlay();
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);

      video.removeEventListener("loadedmetadata", handleReady);
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("canplaythrough", handleReady);

      document.removeEventListener("WeixinJSBridgeReady", handleWeixinJSBridgeReady);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("click", handleUserInteraction);
    };
  }, [videoSrc]);

  return (
    <main className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between font-sans text-neutral-900 select-none bg-[#fcfcfc]">
      
      {/* 1. 全屏背景视频层 - 支持 PC/手机端分离适配与微信/iOS兼容性配置 */}
      <video
        key={videoSrc}
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        className="fixed inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // TypeScript standard custom properties using standard webkit attributes
        {...{
          "webkit-playsinline": "true",
          "x5-video-player-type": "h5",
          "x5-video-player-fullscreen": "false",
        }}
      />

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

      {/* 4. 右侧内容布局 (Desktop matches right negative space, mobile pushes down to the white skirt area to clear face/chest) */}
      <div className="relative z-20 flex-1 w-full h-full flex items-end md:items-center justify-start md:justify-end pb-24 sm:pb-28 md:pb-0 animate-fade-in">
        <div className="w-full md:w-[48%] max-w-xl px-8 sm:px-12 md:mr-12 lg:mr-24 xl:mr-32 text-left flex flex-col justify-end md:justify-center">
          
          {/* 主标题 - Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display font-extralight text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.1em] text-neutral-900 uppercase leading-[0.95] mb-1 md:mb-2">
              Coming
            </h1>
            <h1 className="font-display font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.15em] text-neutral-900 uppercase leading-[0.95] mb-4 md:mb-6">
              Soon
            </h1>
          </motion.div>

          {/* 装饰性极细分割线 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] w-20 md:w-24 bg-neutral-800/40 my-1 md:my-2 origin-left"
          />

          {/* 副标题 - A new LENAKIDS experience is on the way. */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
            className="font-sans text-[10px] sm:text-xs md:text-sm lg:text-base font-light leading-relaxed text-neutral-500 tracking-[0.25em] uppercase max-w-md mt-3 md:mt-4 mb-6 md:mb-10"
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
              className="group relative inline-flex items-center justify-between gap-6 px-6 py-3 md:px-8 md:py-4 border border-neutral-800 text-neutral-900 tracking-[0.25em] text-[10px] sm:text-xs font-light uppercase transition-all duration-300 w-fit hover:bg-neutral-900 hover:text-white select-none cursor-pointer bg-white/20 backdrop-blur-xs"
            >
              <span className="relative z-10 pl-1">Enterprise Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 relative z-10" />
            </a>
          </motion.div>

        </div>
      </div>

      {/* 5. 简约艺术感底署名 */}
      <div className="absolute bottom-6 left-8 md:bottom-12 md:left-12 z-20">
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
