globalThis.process ??= {}; globalThis.process.env ??= {};
import { p as decodeKey } from './chunks/astro/server_-3bOTmA6.mjs';
import './chunks/astro-designed-error-pages_KK5-SaER.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_DAnZjuGy.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/hannibal/Documents/portfolio/","cacheDir":"file:///home/hannibal/Documents/portfolio/node_modules/.astro/","outDir":"file:///home/hannibal/Documents/portfolio/dist/","srcDir":"file:///home/hannibal/Documents/portfolio/src/","publicDir":"file:///home/hannibal/Documents/portfolio/public/","buildClientDir":"file:///home/hannibal/Documents/portfolio/dist/","buildServerDir":"file:///home/hannibal/Documents/portfolio/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"es/404/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/es/404","isIndex":false,"type":"page","pattern":"^\\/es\\/404\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/404.astro","pathname":"/es/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"es/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/es","isIndex":true,"type":"page","pattern":"^\\/es\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/index.astro","pathname":"/es","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/hannibal/Documents/portfolio/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/home/hannibal/Documents/portfolio/src/pages/es/404.astro",{"propagation":"none","containsHead":true}],["/home/hannibal/Documents/portfolio/src/pages/es/index.astro",{"propagation":"none","containsHead":true}],["/home/hannibal/Documents/portfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/es/404@_@astro":"pages/es/404.astro.mjs","\u0000@astro-page:src/pages/es/index@_@astro":"pages/es.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_RrhZarkH.mjs","/home/hannibal/Documents/portfolio/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/home/hannibal/Documents/portfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Clatqzpc.mjs","@astrojs/react/client.js":"_astro/client.Co0vMr8l.js","/home/hannibal/Documents/portfolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.BY-3wIQL.js","/home/hannibal/Documents/portfolio/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/home/hannibal/Documents/portfolio/src/components/ThemeSelector.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeSelector.astro_astro_type_script_index_0_lang.CqQtslmv.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/hannibal/Documents/portfolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","t();function t(){let e=localStorage.getItem(\"theme\");e||(window.matchMedia(\"(prefers-color-scheme: dark)\").matches?e=\"dark\":e=\"light\",localStorage.setItem(\"theme\",e)),e===\"dark\"?(document.documentElement.classList.add(\"dark\"),localStorage.setItem(\"theme\",\"dark\")):(document.documentElement.classList.remove(\"dark\"),localStorage.setItem(\"theme\",\"light\"))}"],["/home/hannibal/Documents/portfolio/src/components/ThemeSelector.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const o=document.getElementById(\"theme-selector\"),e=document.getElementById(\"sun-icon\"),t=document.getElementById(\"moon-icon\");window.matchMedia(\"(prefers-color-scheme: dark)\").matches;function n(){localStorage.getItem(\"theme\")===\"dark\"?(e.classList.remove(\"hidden\"),t.classList.add(\"hidden\")):(e.classList.add(\"hidden\"),t.classList.remove(\"hidden\"))}n(),o?.addEventListener(\"click\",d=>{d.preventDefault(),localStorage.getItem(\"theme\")===\"dark\"?(localStorage.setItem(\"theme\",\"light\"),document.documentElement.classList.remove(\"dark\")):(localStorage.setItem(\"theme\",\"dark\"),document.documentElement.classList.add(\"dark\")),n()})});"]],"assets":["/_astro/geist-mono-cyrillic-400-normal.Ce5q_31Z.woff2","/_astro/geist-mono-latin-ext-400-normal.Cgks_Qgx.woff2","/_astro/geist-mono-latin-400-normal.LC9RFr9I.woff2","/_astro/geist-mono-cyrillic-400-normal.BPBWmzPh.woff","/_astro/geist-mono-latin-ext-400-normal.CxNRRMGd.woff","/_astro/geist-mono-latin-400-normal.CoULgQGM.woff","/_astro/bg-lake-dark.DiSCfKu6.png","/_astro/bg-lake.9WikxsBu.jpg","/_astro/index.CDf8klz7.css","/favicon.svg","/og-image.jpg","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/_astro/client.Co0vMr8l.js","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/_noop-actions.mjs","/_worker.js/index.js","/_worker.js/renderers.mjs","/fonts/geist-sans-latin-500-normal.woff2","/fonts/geist-sans-latin-900-normal.woff2","/_worker.js/_astro/bg-lake-dark.DiSCfKu6.png","/_worker.js/_astro/bg-lake.9WikxsBu.jpg","/_worker.js/_astro/geist-mono-cyrillic-400-normal.BPBWmzPh.woff","/_worker.js/_astro/geist-mono-cyrillic-400-normal.Ce5q_31Z.woff2","/_worker.js/_astro/geist-mono-latin-400-normal.CoULgQGM.woff","/_worker.js/_astro/geist-mono-latin-400-normal.LC9RFr9I.woff2","/_worker.js/_astro/geist-mono-latin-ext-400-normal.Cgks_Qgx.woff2","/_worker.js/_astro/geist-mono-latin-ext-400-normal.CxNRRMGd.woff","/_worker.js/_astro/index.CDf8klz7.css","/_worker.js/chunks/Layout_D8OYPuVk.mjs","/_worker.js/chunks/Projects_Dd4wF4_x.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_o6fpHnDo.mjs","/_worker.js/chunks/astro-designed-error-pages_KK5-SaER.mjs","/_worker.js/chunks/astro_CmyTnSie.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/index_DxmB3vRf.mjs","/_worker.js/chunks/noop-middleware_DAnZjuGy.mjs","/_worker.js/chunks/path_h5kZAkfu.mjs","/_worker.js/chunks/sharp_Clatqzpc.mjs","/_worker.js/pages/404.astro.mjs","/_worker.js/pages/es.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/chunks/astro/server_-3bOTmA6.mjs","/_worker.js/pages/es/404.astro.mjs","/404.html","/es/404/index.html","/es/index.html","/index.html"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["en","es"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"mxdHCjbMWHlUd0bbxj0nkq26IwHdxYWlDj863ray3PM=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
