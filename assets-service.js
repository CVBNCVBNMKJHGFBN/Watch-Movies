const R = "modulepreload"
  , O = function(e) {
    return "/" + e
}
  , b = {}
  , T = function(t, r, i) {
    let a = Promise.resolve();
    if (r && r.length > 0) {
        const o = document.getElementsByTagName("link");
        a = Promise.all(r.map(s=>{
            if (s = O(s),
            s in b)
                return;
            b[s] = !0;
            const n = s.endsWith(".css")
              , d = n ? '[rel="stylesheet"]' : "";
            if (!!i)
                for (let c = o.length - 1; c >= 0; c--) {
                    const m = o[c];
                    if (m.href === s && (!n || m.rel === "stylesheet"))
                        return
                }
            else if (document.querySelector(`link[href="${s}"]${d}`))
                return;
            const l = document.createElement("link");
            if (l.rel = n ? "stylesheet" : R,
            n || (l.as = "script",
            l.crossOrigin = ""),
            l.href = s,
            document.head.appendChild(l),
            n)
                return new Promise((c,m)=>{
                    l.addEventListener("load", c),
                    l.addEventListener("error", ()=>m(new Error(`Unable to preload CSS for ${s}`)))
                }
                )
        }
        ))
    }
    return a.then(()=>t()).catch(o=>{
        const s = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (s.payload = o,
        window.dispatchEvent(s),
        !s.defaultPrevented)
            throw o
    }
    )
}
  , ee = {
    name: "InvalidComponentArgs",
    title: "Invalid component arguments.",
    message: e=>`Invalid arguments passed to${e ? ` <${e}>` : ""} component.`,
    hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."
}
  , te = {
    name: "ImageMissingAlt",
    title: 'Image missing required "alt" property.',
    message: 'Image missing "alt" property. "alt" text is required to describe important images on the page.',
    hint: 'Use an empty string ("") for decorative images.'
}
  , re = {
    name: "InvalidImageService",
    title: "Error while loading image service.",
    message: "There was an error loading the configured image service. Please see the stack trace for more information."
}
  , v = {
    name: "MissingImageDimension",
    title: "Missing image dimensions",
    message: (e,t)=>`Missing ${e === "both" ? "width and height attributes" : `${e} attribute`} for ${t}. When using remote images, both dimensions are always required in order to avoid CLS.`,
    hint: "If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](https://docs.astro.build/en/guides/imports/#other-assets)."
}
  , S = {
    name: "UnsupportedImageFormat",
    title: "Unsupported image format",
    message: (e,t,r)=>`Received unsupported format \`${e}\` from \`${t}\`. Currently only ${r.join(", ")} are supported by our image services.`,
    hint: "Using an `img` tag directly instead of the `Image` component might be what you're looking for."
}
  , _ = {
    name: "UnsupportedImageConversion",
    title: "Unsupported image conversion",
    message: "Converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images is not currently supported."
}
  , I = {
    name: "ExpectedImage",
    title: "Expected src to be an image.",
    message: (e,t,r)=>`Expected \`src\` property for \`getImage\` or \`<Image />\` to be either an ESM imported image or a string with the path of a remote image. Received \`${e}\` (type: \`${t}\`).

Full serialized options received: \`${r}\`.`,
    hint: "This error can often happen because of a wrong path. Make sure the path to your image is correct. If you're passing an async function, make sure to call and await it."
}
  , se = {
    name: "ExpectedImageOptions",
    title: "Expected image options.",
    message: e=>`Expected getImage() parameter to be an object. Received \`${e}\`.`
}
  , x = {
    name: "IncompatibleDescriptorOptions",
    title: "Cannot set both `densities` and `widths`",
    message: "Only one of `densities` or `widths` can be specified. In most cases, you'll probably want to use only `widths` if you require specific widths.",
    hint: "Those attributes are used to construct a `srcset` attribute, which cannot have both `x` and `w` descriptors."
}
  , E = {
    name: "LocalImageUsedWrongly",
    title: "Local images must be imported.",
    message: e=>`\`Image\`'s and \`getImage\`'s \`src\` parameter must be an imported image or an URL, it cannot be a string filepath. Received \`${e}\`.`,
    hint: "If you want to use an image from your `src` folder, you need to either import it or if the image is coming from a content collection, use the [image() schema helper](https://docs.astro.build/en/guides/images/#images-in-content-collections) See https://docs.astro.build/en/guides/images/#src-required for more information on the `src` property."
}
  , ie = {
    name: "AstroGlobUsedOutside",
    title: "Astro.glob() used outside of an Astro file.",
    message: e=>`\`Astro.glob(${e})\` can only be used in \`.astro\` files. \`import.meta.glob(${e})\` can be used instead to achieve a similar result.`,
    hint: "See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import"
}
  , ae = {
    name: "AstroGlobNoMatch",
    title: "Astro.glob() did not match any files.",
    message: e=>`\`Astro.glob(${e})\` did not return any matching files. Check the pattern for typos.`
}
  , C = {
    name: "MissingSharp",
    title: "Could not find Sharp.",
    message: "Could not find Sharp. Please install Sharp (`sharp`) manually into your project or migrate to another image service.",
    hint: "See Sharp's installation instructions for more information: https://sharp.pixelplumbing.com/install. If you are not relying on `astro:assets` to optimize, transform, or process any images, you can configure a passthrough image service instead of installing Sharp. See https://docs.astro.build/en/reference/errors/missing-sharp for more information.\n\nSee https://docs.astro.build/en/guides/images/#default-image-service for more information on how to migrate to another image service."
};
function q(e) {
    return e.replace(/\r\n|\r(?!\n)|\n/g, `
`)
}
function j(e, t) {
    if (!t || t.line === void 0 || t.column === void 0)
        return "";
    const r = q(e).split(`
`).map(s=>s.replace(/\t/g, "  "))
      , i = [];
    for (let s = -2; s <= 2; s++)
        r[t.line + s] && i.push(t.line + s);
    let a = 0;
    for (const s of i) {
        let n = `> ${s}`;
        n.length > a && (a = n.length)
    }
    let o = "";
    for (const s of i) {
        const n = s === t.line - 1;
        o += n ? "> " : "  ",
        o += `${s + 1} | ${r[s]}
`,
        n && (o += `${Array.from({
            length: a
        }).join(" ")}  | ${Array.from({
            length: t.column
        }).join(" ")}^
`)
    }
    return o
}
class g extends Error {
    loc;
    title;
    hint;
    frame;
    type = "AstroError";
    constructor(t, ...r) {
        super(...r);
        const {name: i, title: a, message: o, stack: s, location: n, hint: d, frame: u} = t;
        this.title = a,
        this.name = i,
        o && (this.message = o),
        this.stack = s || this.stack,
        this.loc = n,
        this.hint = d,
        this.frame = u
    }
    setLocation(t) {
        this.loc = t
    }
    setName(t) {
        this.name = t
    }
    setMessage(t) {
        this.message = t
    }
    setHint(t) {
        this.hint = t
    }
    setFrame(t, r) {
        this.frame = j(t, r)
    }
    static is(t) {
        return t.type === "AstroError"
    }
}
const A = ["jpeg", "jpg", "png", "tiff", "webp", "gif", "svg", "avif"]
  , W = "webp"
  , F = ["src", "width", "height", "format", "quality"];
function k(e) {
    return e.endsWith("/") ? e.slice(0, e.length - 1) : e
}
function H(e) {
    return e.startsWith("/") ? e.substring(1) : e
}
function D(e) {
    return e.replace(/^\/|\/$/g, "")
}
function N(e) {
    return typeof e == "string" || e instanceof String
}
function z(...e) {
    return e.filter(N).map((t,r)=>r === 0 ? k(t) : r === e.length - 1 ? H(t) : D(t)).join("/")
}
function M(e) {
    return /^(http|ftp|https|ws):?\/\//.test(e) || e.startsWith("data:")
}
function p(e) {
    return typeof e == "object"
}
function ne(e) {
    return typeof e == "string"
}
function G(e, t) {
    return V(e, t.protocol) && U(e, t.hostname, !0) && B(e, t.port) && J(e, t.pathname, !0)
}
function B(e, t) {
    return !t || t === e.port
}
function V(e, t) {
    return !t || t === e.protocol.slice(0, -1)
}
function U(e, t, r) {
    if (t) {
        if (!r || !t.startsWith("*"))
            return t === e.hostname;
        if (t.startsWith("**.")) {
            const i = t.slice(2);
            return i !== e.hostname && e.hostname.endsWith(i)
        } else if (t.startsWith("*.")) {
            const i = t.slice(1);
            return e.hostname.replace(i, "").split(".").filter(Boolean).length === 1
        }
    } else
        return !0;
    return !1
}
function J(e, t, r) {
    if (t) {
        if (!r || !t.endsWith("*"))
            return t === e.pathname;
        if (t.endsWith("/**")) {
            const i = t.slice(0, -2);
            return i !== e.pathname && e.pathname.startsWith(i)
        } else if (t.endsWith("/*")) {
            const i = t.slice(0, -1);
            return e.pathname.replace(i, "").split("/").filter(Boolean).length === 1
        }
    } else
        return !0;
    return !1
}
function Q(e, {domains: t=[], remotePatterns: r=[]}) {
    if (!M(e))
        return !1;
    const i = new URL(e);
    return t.some(a=>U(i, a)) || r.some(a=>G(i, a))
}
function oe(e) {
    return e ? "transform"in e : !1
}
function K(e) {
    let t = parseInt(e);
    return Number.isNaN(t) ? e : t
}
const f = {
    propertiesToHash: F,
    validateOptions(e) {
        if (!e.src || typeof e.src != "string" && typeof e.src != "object")
            throw new g({
                ...I,
                message: I.message(JSON.stringify(e.src), typeof e.src, JSON.stringify(e, (t,r)=>r === void 0 ? null : r))
            });
        if (p(e.src)) {
            if (!A.includes(e.src.format))
                throw new g({
                    ...S,
                    message: S.message(e.src.format, e.src.src, A)
                });
            if (e.widths && e.densities)
                throw new g(x);
            if (e.src.format === "svg" && (e.format = "svg"),
            e.src.format === "svg" && e.format !== "svg" || e.src.format !== "svg" && e.format === "svg")
                throw new g(_)
        } else {
            if (e.src.startsWith("/@fs/") || !M(e.src) && !e.src.startsWith("/"))
                throw new g({
                    ...E,
                    message: E.message(e.src)
                });
            let t;
            if (!e.width && !e.height ? t = "both" : !e.width && e.height ? t = "width" : e.width && !e.height && (t = "height"),
            t)
                throw new g({
                    ...v,
                    message: v.message(t, e.src)
                })
        }
        return e.format || (e.format = W),
        e.width && (e.width = Math.round(e.width)),
        e.height && (e.height = Math.round(e.height)),
        e
    },
    getHTMLAttributes(e) {
        const {targetWidth: t, targetHeight: r} = $(e)
          , {src: i, width: a, height: o, format: s, quality: n, densities: d, widths: u, formats: l, ...c} = e;
        return {
            ...c,
            width: t,
            height: r,
            loading: c.loading ?? "lazy",
            decoding: c.decoding ?? "async"
        }
    },
    getSrcSet(e) {
        const t = []
          , {targetWidth: r} = $(e)
          , {widths: i, densities: a} = e
          , o = e.format ?? W;
        let s = e.width
          , n = 1 / 0;
        p(e.src) && (s = e.src.width,
        n = s);
        const {width: d, height: u, ...l} = e
          , c = [];
        if (a) {
            const m = a.map(h=>typeof h == "number" ? h : parseFloat(h))
              , w = m.sort().map(h=>Math.round(r * h));
            c.push(...w.map((h,P)=>({
                maxTargetWidth: Math.min(h, n),
                descriptor: `${m[P]}x`
            })))
        } else
            i && c.push(...i.map(m=>({
                maxTargetWidth: Math.min(m, n),
                descriptor: `${m}w`
            })));
        for (const {maxTargetWidth: m, descriptor: w} of c) {
            const h = {
                ...l
            };
            m !== s ? h.width = m : e.width && e.height && (h.width = e.width,
            h.height = e.height),
            t.push({
                transform: h,
                descriptor: w,
                attributes: {
                    type: `image/${o}`
                }
            })
        }
        return t
    },
    getURL(e, t) {
        const r = new URLSearchParams;
        if (p(e.src))
            r.append("href", e.src.src);
        else if (Q(e.src, t))
            r.append("href", e.src);
        else
            return e.src;
        return Object.entries({
            w: "width",
            h: "height",
            q: "quality",
            f: "format"
        }).forEach(([o,s])=>{
            e[s] && r.append(o, e[s].toString())
        }
        ),
        `${z("/", "/_image")}?${r}`
    },
    parseURL(e) {
        const t = e.searchParams;
        return t.has("href") ? {
            src: t.get("href"),
            width: t.has("w") ? parseInt(t.get("w")) : void 0,
            height: t.has("h") ? parseInt(t.get("h")) : void 0,
            format: t.get("f"),
            quality: t.get("q")
        } : void 0
    }
};
function $(e) {
    let t = e.width
      , r = e.height;
    if (p(e.src)) {
        const i = e.src.width / e.src.height;
        r && !t ? t = Math.round(r * i) : t && !r ? r = Math.round(t / i) : !t && !r && (t = e.src.width,
        r = e.src.height)
    }
    return {
        targetWidth: t,
        targetHeight: r
    }
}
let y;
const L = {
    low: 25,
    mid: 50,
    high: 80,
    max: 100
};
async function X() {
    let e;
    try {
        e = (await T(()=>import("../index.kyH8EcFA.js").then(t=>t.i), __vite__mapDeps([0, 1, 2, 3]))).default
    } catch {
        throw new g(C)
    }
    return e
}
const Y = {
    validateOptions: f.validateOptions,
    getURL: f.getURL,
    parseURL: f.parseURL,
    getHTMLAttributes: f.getHTMLAttributes,
    getSrcSet: f.getSrcSet,
    async transform(e, t) {
        y || (y = await X());
        const r = t;
        if (r.format === "svg")
            return {
                data: e,
                format: "svg"
            };
        let i = y(e, {
            failOnError: !1,
            pages: -1
        });
        if (i.rotate(),
        r.height && !r.width ? i.resize({
            height: Math.round(r.height)
        }) : r.width && i.resize({
            width: Math.round(r.width)
        }),
        r.format) {
            let s;
            if (r.quality) {
                const n = K(r.quality);
                typeof n == "number" ? s = n : s = r.quality in L ? L[r.quality] : void 0
            }
            i.toFormat(r.format, {
                quality: s
            })
        }
        const {data: a, info: o} = await i.toBuffer({
            resolveWithObject: !0
        });
        return {
            data: a,
            format: o.format
        }
    }
};
var Z = Y;
const ce = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: Z
}, Symbol.toStringTag, {
    value: "Module"
}));
export {g as A, F as D, se as E, re as I, T as _, I as a, oe as b, ne as c, ee as d, ie as e, ae as f, te as g, p as i, ce as s};
function __vite__mapDeps(indexes) {
    if (!__vite__mapDeps.viteFileDeps) {
        __vite__mapDeps.viteFileDeps = ["./index.kyH8EcFA.js", "./Image.js", "./_plugin-vue_export-helper.js", "./runtime-core.js"]
    }
    return indexes.map((i)=>__vite__mapDeps.viteFileDeps[i])
}
