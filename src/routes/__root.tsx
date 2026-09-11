import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Peachy";
const THEME = "#FFF7F1";

const SPLASHES: { href: string; width: number; height: number; dpr: number }[] = [
  { href: "/splash/splash-440x956@3.png", width: 440, height: 956, dpr: 3 },
  { href: "/splash/splash-430x932@3.png", width: 430, height: 932, dpr: 3 },
  { href: "/splash/splash-428x926@3.png", width: 428, height: 926, dpr: 3 },
  { href: "/splash/splash-414x896@3.png", width: 414, height: 896, dpr: 3 },
  { href: "/splash/splash-414x896@2.png", width: 414, height: 896, dpr: 2 },
  { href: "/splash/splash-402x874@3.png", width: 402, height: 874, dpr: 3 },
  { href: "/splash/splash-393x852@3.png", width: 393, height: 852, dpr: 3 },
  { href: "/splash/splash-390x844@3.png", width: 390, height: 844, dpr: 3 },
  { href: "/splash/splash-375x812@3.png", width: 375, height: 812, dpr: 3 },
  { href: "/splash/splash-375x667@2.png", width: 375, height: 667, dpr: 2 },
];

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1",
      },
      { title: APP_NAME },
      {
        name: "description",
        content: "Προσωπικό ημερολόγιο φαγητού — ιδιωτικό, απαλό, χωρίς ντροπή.",
      },
      { name: "theme-color", content: THEME },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "stylesheet", href: appCss },
      ...SPLASHES.map((s) => ({
        rel: "apple-touch-startup-image" as const,
        href: s.href,
        media: `(device-width: ${s.width}px) and (device-height: ${s.height}px) and (-webkit-device-pixel-ratio: ${s.dpr}) and (orientation: portrait)`,
      })),
    ],
  }),
  component: () => (
    <html lang="el" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.classList.add("show-gift");d.classList.remove("gift-done","gift-leaving");function dismiss(){if(!d.classList.contains("show-gift")||d.classList.contains("gift-leaving"))return;d.classList.add("gift-leaving");setTimeout(function(){d.classList.remove("show-gift","gift-leaving");d.classList.add("gift-done");},300);}document.addEventListener("click",function(){if(d.classList.contains("show-gift"))dismiss();},true);function arm(){setTimeout(dismiss,7000);}if(document.readyState==="complete")arm();else window.addEventListener("load",arm);})();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              'html,body,#app{height:100%;max-height:100svh}html,body{background:#FFF7F1;overflow:hidden}.app-root,.phone-canvas{min-height:100svh;height:100svh;max-height:100svh}html.show-gift .gift-overlay{position:fixed;inset:0;z-index:9999;opacity:1;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background-color:#FFF7F1;background-image:radial-gradient(ellipse 70% 50% at 50% 42%,rgb(255 212 194 / 55%),transparent 72%)}html.show-gift .gift-overlay::before{content:"";position:absolute;top:-16%;right:-28%;width:78%;height:46%;border-radius:50%;background:rgb(244 162 127 / 22%);pointer-events:none}html.show-gift .gift-overlay::after{content:"";position:absolute;bottom:-24%;left:-20%;width:110%;height:42%;border-radius:50% 40% 48% 52%;background:rgb(255 186 168 / 26%);pointer-events:none}html.gift-done .gift-overlay{display:none!important}html.gift-leaving .gift-overlay{animation:gift-fade-out 300ms ease both;pointer-events:none}@keyframes gift-fade-out{from{opacity:1}to{opacity:0}}',
          }}
        />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
