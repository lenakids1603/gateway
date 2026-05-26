import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function App() {
  const getIsMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  const [isMobile, setIsMobile] = useState(getIsMobile);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const videoSrc = isMobile ? "/background-mobile.mp4" : "/background-pc.mp4";
  const posterSrc = isMobile ? "/background-poster-mobile.jpg" : "/background-poster-pc.jpg";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset video started state on source change
    setIsVideoPlaying(false);

    // Forceful settings for maximum mobile and WeChat built-in browser compatibility
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-video-player-type", "h5");
    video.setAttribute("x5-video-player-fullscreen", "false");

    // Explicitly load the new resource source
    video.load();

    const tryPlay = () => {
      video.play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch(() => {
          // Failure is caught quietly, preserving the active poster display
        });
    };

    // Attempt to play immediately
    tryPlay();

    // Attach event listeners to catch state changes and trigger plays
    const handleMetadata = () => tryPlay();
    const handleData = () => tryPlay();
    const handleCanPlay = () => tryPlay();
    const handlePlaying = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("loadeddata", handleData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);

    // WeChat JSBridge trigger handler
    const handleWeixinJSBridgeReady = () => {
      tryPlay();
    };

    // General interaction event handler to bypass user-interaction restrictions
    const handleInteraction = () => {
      tryPlay();
    };

    // Replay when the user changes tab visibility back to active page
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };

    // If industrial WeChat JSBridge is already loaded, invoke play immediately
    if (typeof window !== "undefined" && (window as any).WeixinJSBridge) {
      tryPlay();
    }

    document.addEventListener("WeixinJSBridgeReady", handleWeixinJSBridgeReady);
    document.addEventListener("touchstart", handleInteraction, { once: true });
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("loadeddata", handleData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);

      document.removeEventListener("WeixinJSBridgeReady", handleWeixinJSBridgeReady);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoSrc]);

  return (
    <main className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between font-sans text-neutral-900 select-none bg-[#fcfcfc]">
      
      {/* 1. 全屏背景视频层 - 支持 PC/手机端分离适配与微信/iOS兼容性配置 */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        className="fixed inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
        autoPlay
        muted
        loop
        playsInline
        preload={isMobile ? "auto" : "metadata"}
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
