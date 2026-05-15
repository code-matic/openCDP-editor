import { jsx as e, jsxs as u, Fragment as W } from "react/jsx-runtime";
import on, { lazy as Ct, Suspense as Nt, useState as y, useEffect as D, useRef as ae, forwardRef as rn, useMemo as pt, useCallback as ln, useImperativeHandle as sn } from "react";
import { createPortal as an } from "react-dom";
import { Form as Re, Modal as Lt, Input as cn, Tooltip as E, ColorPicker as dn, Dropdown as ge } from "antd";
import { toast as gt } from "sonner";
import { Liquid as un } from "liquidjs";
import { codes as fn } from "currency-codes";
import hn from "juice";
const mn = Ct(() => import("react-simple-wysiwyg")), pn = ({
  value: t,
  onChange: o,
  placeholder: r,
  containerProps: l,
  disabled: s,
  onFocus: c,
  onBlur: d
}) => /* @__PURE__ */ e("div", { ...l, children: /* @__PURE__ */ e(Nt, { fallback: /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-100 animate-pulse rounded flex items-center justify-center text-gray-400 text-sm", children: "Loading editor…" }), children: /* @__PURE__ */ e(
  mn,
  {
    value: t,
    onChange: o,
    placeholder: r,
    spellCheck: !1,
    disabled: s,
    onFocus: c,
    onBlur: d
  }
) }) }), gn = Ct(() => import("@monaco-editor/react"));
function yn(t) {
  typeof t.addAction == "function" && t.addAction({
    id: "editor.action.formatDocument.menu",
    label: "Format Document",
    contextMenuOrder: 1.5,
    run: (o) => {
      var l;
      const r = (l = o == null ? void 0 : o.getAction) == null ? void 0 : l.call(o, "editor.action.formatDocument");
      r != null && r.run && r.run();
    }
  });
}
const xn = ({
  height: t = "100%",
  defaultLanguage: o = "html",
  defaultValue: r = "",
  onChange: l,
  theme: s = "vs-dark",
  options: c = {},
  className: d,
  onMount: h
}) => {
  const [m, k] = y(!1), R = on.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (T) => {
      yn(T), h == null || h(T);
    },
    [h]
  );
  D(() => {
    k(!0);
  }, []);
  const M = /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-900 rounded flex items-center justify-center text-gray-400 text-sm animate-pulse", children: "Loading code editor…" });
  return m ? /* @__PURE__ */ e("div", { className: d, children: /* @__PURE__ */ e(Nt, { fallback: M, children: /* @__PURE__ */ e(
    gn,
    {
      height: t,
      defaultLanguage: o,
      defaultValue: r,
      onChange: l,
      theme: s,
      options: c,
      onMount: R
    }
  ) }) }) : M;
}, bn = ({ srcDoc: t }) => /* @__PURE__ */ e("div", { className: "flex justify-center items-start", children: /* @__PURE__ */ e("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ u("div", { className: "relative !max-w-[340px] w-full !h-[640px] border-8 border-black rounded-[40px] overflow-hidden shadow-xl bg-black", children: [
  /* @__PURE__ */ u("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20 flex justify-center items-center", children: [
    /* @__PURE__ */ e("div", { className: "w-3 h-3 bg-gray-800 rounded-full mr-2" }),
    /* @__PURE__ */ e("div", { className: "w-10 h-2 bg-gray-700 rounded" })
  ] }),
  /* @__PURE__ */ e("div", { className: "absolute -left-[3px] top-24 w-1 h-12 bg-gray-700 rounded-r" }),
  /* @__PURE__ */ e("div", { className: "absolute -left-[3px] top-40 w-1 h-8 bg-gray-700 rounded-r" }),
  /* @__PURE__ */ e("div", { className: "absolute -right-[3px] top-32 w-1 h-16 bg-gray-700 rounded-l" }),
  /* @__PURE__ */ e(
    "iframe",
    {
      srcDoc: t,
      title: "Email Preview",
      className: "max-w-[400px] w-full h-full bg-white",
      style: { border: "none", paddingTop: "40px" }
    }
  ),
  /* @__PURE__ */ e("div", { className: "absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gray-500 rounded-full" })
] }) }) }), Te = ({ show: t, title: o, fields: r, onConfirm: l, onClose: s }) => {
  const [c] = Re.useForm();
  return D(() => {
    if (t) {
      const m = {};
      r.forEach((k) => {
        k.defaultValue && (m[k.name] = k.defaultValue);
      }), c.setFieldsValue(m);
    }
  }, [t, c]), /* @__PURE__ */ e(
    Lt,
    {
      title: o,
      open: t,
      onOk: async () => {
        try {
          const m = await c.validateFields();
          l(m), c.resetFields();
        } catch {
        }
      },
      onCancel: () => {
        c.resetFields(), s();
      },
      okText: "Confirm",
      cancelText: "Cancel",
      destroyOnHidden: !0,
      children: /* @__PURE__ */ e(Re, { form: c, layout: "vertical", className: "mt-4", children: r.map((m) => /* @__PURE__ */ e(
        Re.Item,
        {
          name: m.name,
          label: m.label,
          rules: [{ required: m.required !== !1, message: `Please enter ${m.label.toLowerCase()}` }],
          children: /* @__PURE__ */ e(cn, { placeholder: m.placeholder })
        },
        m.name
      )) })
    }
  );
}, vn = ({
  show: t,
  onClose: o,
  onSelectImage: r,
  onFetchImages: l,
  onUploadImage: s,
  onDeleteImage: c
}) => {
  const [d, h] = y([]), [m, k] = y(!1), [R, M] = y(!1), [T, Y] = y(null), [N, ne] = y(""), [P, ie] = y(""), [K, G] = y("library"), de = ae(null);
  D(() => {
    t && l && (k(!0), Y(null), l().then((w) => h(w)).catch(() => Y("Failed to load images.")).finally(() => k(!1)));
  }, [t, l]);
  const Z = async (w) => {
    var b;
    const A = (b = w.target.files) == null ? void 0 : b[0];
    if (A) {
      if (!A.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      if (!s) {
        alert("Image upload handler not configured.");
        return;
      }
      M(!0);
      try {
        const se = await s(A);
        r(se), o();
      } catch {
        alert("Failed to upload image.");
      } finally {
        M(!1), w.target.value = "";
      }
    }
  }, oe = () => {
    P.trim() && (r(P.trim()), o(), ie(""));
  }, J = d.filter(
    (w) => !w.isFolder && w.filename.toLowerCase().includes(N.toLowerCase())
  );
  return /* @__PURE__ */ u(
    Lt,
    {
      open: t,
      onCancel: o,
      title: "Insert Image",
      footer: null,
      width: 700,
      destroyOnHidden: !0,
      children: [
        /* @__PURE__ */ u("div", { className: "flex border-b mb-4", children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => G("library"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${K === "library" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image Library"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => G("url"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${K === "url" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image URL"
            }
          )
        ] }),
        K === "url" && /* @__PURE__ */ u("div", { className: "space-y-3", children: [
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-500", children: "Paste a public image URL to insert it directly." }),
          /* @__PURE__ */ u("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "url",
                value: P,
                onChange: (w) => ie(w.target.value),
                placeholder: "https://example.com/image.png",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400",
                onKeyDown: (w) => w.key === "Enter" && oe()
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: oe,
                disabled: !P.trim(),
                className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700",
                children: "Insert"
              }
            )
          ] }),
          P && /* @__PURE__ */ e("div", { className: "border rounded p-2 text-center", children: /* @__PURE__ */ e("img", { src: P, alt: "preview", className: "max-h-48 mx-auto object-contain" }) })
        ] }),
        K === "library" && /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ u("div", { className: "flex justify-between items-center mb-3 gap-3", children: [
            /* @__PURE__ */ e(
              "input",
              {
                value: N,
                onChange: (w) => ne(w.target.value),
                placeholder: "Search images…",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              }
            ),
            s && /* @__PURE__ */ u(W, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => {
                    var w;
                    return (w = de.current) == null ? void 0 : w.click();
                  },
                  disabled: R,
                  className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700 whitespace-nowrap",
                  children: R ? "Uploading…" : "+ Upload"
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  ref: de,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: Z
                }
              )
            ] })
          ] }),
          m && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3", children: Array.from({ length: 6 }).map((w, A) => /* @__PURE__ */ e("div", { className: "h-32 bg-gray-100 animate-pulse rounded" }, A)) }),
          T && /* @__PURE__ */ e("p", { className: "text-red-500 text-sm py-8 text-center", children: T }),
          !m && !T && J.length === 0 && /* @__PURE__ */ e("div", { className: "py-12 text-center text-gray-400", children: l ? "No images found. Upload one to get started." : "No image library connected. Use the URL tab to insert images." }),
          !m && !T && J.length > 0 && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1", children: J.map((w) => /* @__PURE__ */ u(
            "div",
            {
              className: "group relative border rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all",
              onClick: () => {
                r(w.url), o();
              },
              children: [
                /* @__PURE__ */ e(
                  "img",
                  {
                    src: w.url,
                    alt: w.filename,
                    className: "w-full h-28 object-cover",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ u("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-white text-gray-800 text-xs px-2 py-1 rounded font-medium",
                      onClick: (A) => {
                        A.stopPropagation(), r(w.url), o();
                      },
                      children: "Select"
                    }
                  ),
                  c && /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-red-500 text-white text-xs px-2 py-1 rounded font-medium",
                      onClick: async (A) => {
                        A.stopPropagation(), await c(w.path), h((b) => b.filter((se) => se.path !== w.path));
                      },
                      children: "Delete"
                    }
                  )
                ] }),
                /* @__PURE__ */ e(E, { title: w.filename.split("/").pop(), children: /* @__PURE__ */ e("p", { className: "text-xs text-gray-600 truncate px-2 py-1 bg-white", children: w.filename.split("/").pop() }) })
              ]
            },
            w.path
          )) })
        ] })
      ]
    }
  );
}, j = (t, o = 13) => /* @__PURE__ */ e("svg", { width: o, height: o, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", flexShrink: 0 }, children: t }), wn = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
  /* @__PURE__ */ e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
] }), t), We = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("polyline", { points: "3 6 5 6 21 6" }),
  /* @__PURE__ */ e("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }),
  /* @__PURE__ */ e("path", { d: "M10 11v6M14 11v6" }),
  /* @__PURE__ */ e("path", { d: "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" })
] }), t), kn = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("polyline", { points: "1 4 1 10 7 10" }),
  /* @__PURE__ */ e("path", { d: "M3.51 15a9 9 0 1 0 .49-3.8" })
] }), t), Cn = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" }),
  /* @__PURE__ */ e("circle", { cx: "6.5", cy: "11.5", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "8.5", cy: "7.5", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "12", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "15.5", cy: "7.5", r: "1", fill: "currentColor", stroke: "none" })
] }), t), Et = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("polyline", { points: "4 7 4 4 20 4 20 7" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "20", x2: "15", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "4", x2: "12", y2: "20" })
] }), t), Nn = ({ size: t = 13 }) => j(/* @__PURE__ */ e(W, { children: /* @__PURE__ */ e("path", { d: "M3 9V6a3 3 0 0 1 3-3h3M21 9V6a3 3 0 0 0-3-3h-3M3 15v3a3 3 0 0 0 3 3h3m6 0h3a3 3 0 0 0 3-3v-3" }) }), t), Ln = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("rect", { x: "3", y: "8", width: "18", height: "8", rx: "1" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "2", x2: "12", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
  /* @__PURE__ */ e("polyline", { points: "9 5 12 2 15 5" }),
  /* @__PURE__ */ e("polyline", { points: "9 19 12 22 15 19" })
] }), t), It = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "12", x2: "15", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "18", x2: "18", y2: "18" })
] }), t), ye = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "6", y1: "12", x2: "18", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "18", x2: "20", y2: "18" })
] }), t), Mt = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "6", y1: "18", x2: "21", y2: "18" })
] }), t), En = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("polyline", { points: "15 3 21 3 21 9" }),
  /* @__PURE__ */ e("polyline", { points: "9 21 3 21 3 15" }),
  /* @__PURE__ */ e("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
] }), t), Ae = ({ size: t = 13 }) => j(/* @__PURE__ */ u(W, { children: [
  /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
] }), t), I = (t, o) => /* @__PURE__ */ u("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
  t,
  o
] }), O = (t, o) => /* @__PURE__ */ u("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
  /* @__PURE__ */ e("span", { style: { display: "inline-block", width: 10, height: 10, borderRadius: 2, background: t, border: "1px solid rgba(0,0,0,0.15)", flexShrink: 0 } }),
  o
] }), In = [
  { label: "Red", color: "#ef4444" },
  { label: "Green", color: "#10b981" },
  { label: "Blue", color: "#3b82f6" },
  { label: "Orange", color: "#f59e0b" },
  { label: "Purple", color: "#8b5cf6" },
  { label: "Black", color: "#000000" },
  { label: "White", color: "#ffffff" }
], Mn = (t) => ({
  items: [
    {
      key: "color-grid",
      label: /* @__PURE__ */ e(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", padding: "8px" },
          onClick: (o) => o.stopPropagation(),
          children: In.map((o) => /* @__PURE__ */ e(E, { title: o.label, children: /* @__PURE__ */ e(
            "div",
            {
              onClick: (r) => {
                r.preventDefault(), t(o.color);
              },
              style: {
                width: "24px",
                height: "24px",
                backgroundColor: o.color,
                borderRadius: "4px",
                border: "1px solid #ddd",
                cursor: "pointer",
                transition: "transform 0.1s ease"
              },
              onMouseEnter: (r) => r.currentTarget.style.transform = "scale(1.1)",
              onMouseLeave: (r) => r.currentTarget.style.transform = "scale(1)"
            }
          ) }, o.color))
        }
      )
    },
    { type: "divider" },
    {
      key: "default",
      label: "Reset to Black",
      onClick: () => t("#000000")
    }
  ]
}), Sn = (t, o, r, l) => ({
  items: [
    { key: "replace", label: I(/* @__PURE__ */ e(kn, {}), "Replace Image"), onClick: t },
    { key: "delete", label: I(/* @__PURE__ */ e(We, {}), "Delete Image"), onClick: o, danger: !0 },
    { type: "divider" },
    {
      key: "resize",
      label: I(/* @__PURE__ */ e(En, {}), "Resize Width"),
      children: [
        { key: "10%", label: "10%", onClick: () => l("10%") },
        { key: "25%", label: "25%", onClick: () => l("25%") },
        { key: "50%", label: "50%", onClick: () => l("50%") },
        { key: "75%", label: "75%", onClick: () => l("75%") },
        { key: "100%", label: "100%", onClick: () => l("100%") }
      ]
    },
    {
      key: "align",
      label: I(/* @__PURE__ */ e(ye, {}), "Align Image"),
      children: [
        { key: "align-left", label: I(/* @__PURE__ */ e(It, {}), "Left"), onClick: () => r("left") },
        { key: "align-center", label: I(/* @__PURE__ */ e(ye, {}), "Center"), onClick: () => r("center") },
        { key: "align-right", label: I(/* @__PURE__ */ e(Mt, {}), "Right"), onClick: () => r("right") }
      ]
    }
  ]
}), Rn = (t, o, r, l, s, c, d, h, m) => ({
  items: [
    {
      key: "bg-color",
      label: I(/* @__PURE__ */ e(Cn, {}), "Background Color"),
      children: [
        { key: "bg-#3b82f6", label: O("#3b82f6", "Blue"), onClick: () => s("#3b82f6") },
        { key: "bg-#10b981", label: O("#10b981", "Green"), onClick: () => s("#10b981") },
        { key: "bg-#ef4444", label: O("#ef4444", "Red"), onClick: () => s("#ef4444") },
        { key: "bg-#f59e0b", label: O("#f59e0b", "Orange"), onClick: () => s("#f59e0b") },
        { key: "bg-#8b5cf6", label: O("#8b5cf6", "Purple"), onClick: () => s("#8b5cf6") },
        { key: "bg-#000000", label: O("#000000", "Black"), onClick: () => s("#000000") }
      ]
    },
    {
      key: "text-color",
      label: I(/* @__PURE__ */ e(Et, {}), "Text Color"),
      children: [
        { key: "text-#ffffff", label: O("#ffffff", "White"), onClick: () => c("#ffffff") },
        { key: "text-#000000", label: O("#000000", "Black"), onClick: () => c("#000000") }
      ]
    },
    {
      key: "border-radius",
      label: I(/* @__PURE__ */ e(Nn, {}), "Border Radius"),
      children: [
        { key: "radius-0px", label: "Square (0px)", onClick: () => d("0px") },
        { key: "radius-2px", label: "Rounded (2px)", onClick: () => d("2px") },
        { key: "radius-4px", label: "Large (4px)", onClick: () => d("4px") },
        { key: "radius-9999px", label: "Pill", onClick: () => d("9999px") }
      ]
    },
    {
      key: "padding",
      label: I(/* @__PURE__ */ e(Ln, {}), "Padding"),
      children: [
        { key: "padding-8px 16px", label: "Small", onClick: () => h("8px 16px") },
        { key: "padding-12px 24px", label: "Default", onClick: () => h("12px 24px") },
        { key: "padding-16px 32px", label: "Large", onClick: () => h("16px 32px") },
        { key: "padding-20px 40px", label: "Extra Large", onClick: () => h("20px 40px") }
      ]
    },
    {
      key: "align",
      label: I(/* @__PURE__ */ e(ye, {}), "Align"),
      children: [
        { key: "align-left", label: I(/* @__PURE__ */ e(It, {}), "Left"), onClick: () => m("left") },
        { key: "align-center", label: I(/* @__PURE__ */ e(ye, {}), "Center"), onClick: () => m("center") },
        { key: "align-right", label: I(/* @__PURE__ */ e(Mt, {}), "Right"), onClick: () => m("right") }
      ]
    },
    { type: "divider" },
    { key: "remove-bg", label: I(/* @__PURE__ */ e(Ae, {}), "Remove Background"), onClick: o },
    { key: "remove-border", label: I(/* @__PURE__ */ e(Ae, {}), "Remove Border"), onClick: r },
    { key: "remove-padding", label: I(/* @__PURE__ */ e(Ae, {}), "Remove Padding"), onClick: l },
    { type: "divider" },
    { key: "delete", label: I(/* @__PURE__ */ e(We, {}), "Delete Button"), danger: !0, onClick: t }
  ]
}), Tn = (t, o, r) => ({
  items: [
    { key: "edit-link", label: I(/* @__PURE__ */ e(wn, {}), "Edit Link"), onClick: t },
    {
      key: "text-color",
      label: I(/* @__PURE__ */ e(Et, {}), "Text Color"),
      children: [
        { key: "text-#0ea5e9", label: O("#0ea5e9", "Blue"), onClick: () => r("#0ea5e9") },
        { key: "text-#10b981", label: O("#10b981", "Green"), onClick: () => r("#10b981") },
        { key: "text-#ef4444", label: O("#ef4444", "Red"), onClick: () => r("#ef4444") },
        { key: "text-#f59e0b", label: O("#f59e0b", "Orange"), onClick: () => r("#f59e0b") },
        { key: "text-#8b5cf6", label: O("#8b5cf6", "Purple"), onClick: () => r("#8b5cf6") },
        { key: "text-#000000", label: O("#000000", "Black"), onClick: () => r("#000000") }
      ]
    },
    { type: "divider" },
    { key: "delete", label: I(/* @__PURE__ */ e(We, {}), "Remove Link"), danger: !0, onClick: o }
  ]
}), An = [
  { label: "Sans Serif", value: "Arial, sans-serif" },
  { label: "Fixed Width", value: "Courier New, monospace" },
  { label: "Wide", value: "Arial Black, sans-serif" },
  { label: "Narrow", value: "Arial Narrow, sans-serif" },
  { label: "Comic Sans MS", value: "Comic Sans MS, cursive" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
  { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
  { label: "Verdana", value: "Verdana, sans-serif" }
], Dn = (t) => ({
  items: An.map((o) => ({
    key: o.value,
    label: /* @__PURE__ */ e("span", { style: { fontFamily: o.value }, children: o.label })
  })),
  onClick: ({ key: o }) => {
    t(o);
  }
}), Q = new un({
  strictVariables: !1,
  strictFilters: !1
});
function xe(t) {
  const o = Number(t);
  return Number.isFinite(o) ? o : 0;
}
const ce = { minimumFractionDigits: 2, maximumFractionDigits: 2 }, De = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
function le(t, o) {
  return new Intl.NumberFormat("en-US", o).format(t);
}
Q.registerFilter("money", (t, o) => {
  const r = xe(t);
  if (!o) return le(r, ce);
  try {
    return new Intl.NumberFormat("en-US", {
      ...ce,
      style: "currency",
      currency: o,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${o} ${le(r, ce)}`;
  }
});
Q.registerFilter("money_with_currency", (t, o) => {
  const r = xe(t);
  return o ? `${o} ${le(r, ce)}` : le(r, ce);
});
Q.registerFilter("money_no_decimals", (t, o) => {
  const r = xe(t);
  if (!o) return le(r, De);
  try {
    return new Intl.NumberFormat("en-US", {
      ...De,
      style: "currency",
      currency: o,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${o} ${le(r, De)}`;
  }
});
Q.registerFilter("number", (t) => new Intl.NumberFormat("en-US").format(xe(t)));
const Bn = Q.filters.date;
Q.registerFilter("date", function(t, o) {
  return t == null || t === "" ? "" : Bn.call(this, t, o);
});
const Ko = [
  "USD",
  "EUR",
  "GBP",
  "NGN",
  "CAD",
  "AUD",
  "JPY",
  "INR"
], Hn = /* @__PURE__ */ new Set([
  "XAU",
  "XAG",
  "XPT",
  "XPD",
  "XBA",
  "XBB",
  "XBC",
  "XBD",
  "XDR",
  "XSU",
  "XUA",
  "XXX",
  "XTS",
  "USN",
  "UYI",
  "UYW",
  "CLF",
  "COU",
  "MXV",
  "BOV",
  "CHE",
  "CHW",
  "CUC",
  "VED",
  "ZWL"
]), On = new Set(fn().filter((t) => !Hn.has(t)));
function Wn(t) {
  return t ? On.has(t.toUpperCase()) : !1;
}
function Pn(t) {
  const o = /\|\s*(?:money|money_with_currency|money_no_decimals)\s*:\s*["']([^"']+)["']/g, r = [];
  let l;
  for (; (l = o.exec(t)) !== null; )
    r.push(l[1].toUpperCase());
  return r;
}
function Fn(t) {
  return Pn(t).filter((r) => !Wn(r));
}
const Un = ".rsw-editor .rsw-ce";
function Zo(t) {
  const o = [...new Set(Fn(t))];
  return o.length === 0 ? null : `Invalid currency code${o.length > 1 ? "s" : ""}: ${o.join(", ")}. Messages may render with incorrect formatting.`;
}
function Jo(t) {
  try {
    return Q.parse(t), { valid: !0 };
  } catch (o) {
    return { valid: !1, error: o };
  }
}
function qn(t, o) {
  const r = new DOMParser(), l = r.parseFromString(t, "text/html"), s = r.parseFromString(o, "text/html");
  return l.body.innerHTML = s.body.innerHTML, s.head.querySelectorAll("style").forEach((d) => {
    Array.from(l.head.querySelectorAll("style")).some(
      (m) => m.innerHTML === d.innerHTML
    ) || l.head.appendChild(d.cloneNode(!0));
  }), `<!DOCTYPE html>
` + l.documentElement.outerHTML;
}
function Qo(t) {
  return `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body style="word-spacing:normal;">
    <div style="margin:0px auto;max-width:600px;font-family:sans-serif;">
      ${t}
    </div>
  </body>
</html>
`;
}
function _() {
  return typeof document > "u" ? null : document.querySelector(Un);
}
function _n(t) {
  var l;
  if (!t || typeof document > "u") return;
  const o = window.getSelection();
  if (!o) return;
  const r = document.createRange();
  r.setStartAfter(t), r.collapse(!0), o.removeAllRanges(), o.addRange(r), (l = t.parentNode) == null || l.removeChild(t);
}
function Be(t, o) {
  var Y;
  const r = _();
  if (!r) return;
  const l = window.getSelection();
  if (!l || l.rangeCount === 0) return;
  const s = l.getRangeAt(0);
  if (!r.contains(s.commonAncestorContainer)) return;
  const c = /* @__PURE__ */ new Set(["p", "div", "li", "section", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre"]), d = (N) => {
    for (; N && N !== r; ) {
      if (N instanceof HTMLElement) {
        const ne = N.tagName.toLowerCase(), P = window.getComputedStyle(N).display;
        if (c.has(ne) || P === "block" || P === "list-item" || P === "table")
          return N;
      }
      N = N.parentNode;
    }
    return null;
  }, h = /* @__PURE__ */ new Set(), m = d(s.startContainer);
  m && h.add(m);
  const k = d(s.endContainer);
  k && h.add(k);
  const R = document.createTreeWalker(
    s.commonAncestorContainer,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(N) {
        return s.intersectsNode(N) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    }
  );
  let M = R.nextNode();
  for (; M; ) {
    const N = d(M);
    N && h.add(N), M = R.nextNode();
  }
  let T = null;
  if (h.forEach((N) => {
    N.style.textAlign = t, T = N;
  }), T) {
    const N = document.createRange();
    N.selectNodeContents(T), N.collapse(!1), l.removeAllRanges(), l.addRange(N), (Y = T.focus) == null || Y.call(T), r.focus();
  }
  o(r.innerHTML);
}
function U(t) {
  const o = _();
  o && (t(o.innerHTML), o.dispatchEvent(new Event("input", { bubbles: !0 })));
}
function jn(t, o, r) {
  const l = _();
  if (!l) return;
  t.style.outline = "";
  const s = t.closest("div");
  s && s.parentElement === l ? s.remove() : t.remove(), U(o), r == null || r();
}
function Xn(t, o, r, l) {
  t && (t.style.width = o, t.removeAttribute("width"), t.style.outline = "", U(r), l == null || l());
}
function zn(t, o, r, l) {
  t && (t.style.display = "", t.style.margin = "", o === "left" ? (t.style.display = "block", t.style.margin = "0 auto 0 0") : o === "center" ? (t.style.display = "block", t.style.margin = "0 auto") : o === "right" && (t.style.display = "block", t.style.margin = "0 0 0 auto"), t.style.outline = "", U(r), l == null || l());
}
const $n = (t, o, r, l, s) => {
  if (typeof document < "u") {
    const c = _();
    if (c) {
      if (s) {
        const h = window.getSelection();
        h == null || h.removeAllRanges(), h == null || h.addRange(s);
      }
      document.execCommand("foreColor", !1, t);
      const d = c.innerHTML;
      o(d), r(d), l(!0);
    }
  }
}, Vn = (t) => {
  if (!t || t === "transparent" || t === "rgba(0, 0, 0, 0)") return "#000000";
  if (t.startsWith("rgb")) {
    const o = t.match(/\d+/g);
    if (o && (o.length === 3 || o.length === 4))
      return "#" + o.slice(0, 3).map((r) => {
        const l = parseInt(r).toString(16);
        return l.length === 1 ? "0" + l : l;
      }).join("");
  }
  return t;
}, Gn = (t, o, r, l, s) => {
  const c = _();
  if (!c) return;
  if (s) {
    const h = window.getSelection();
    h == null || h.removeAllRanges(), h == null || h.addRange(s);
  }
  document.execCommand("fontName", !1, t);
  const d = c.innerHTML;
  o(d), r(d), l(!0);
};
function ee(t, o, r) {
  t.style.outline = "", U(o), r == null || r();
}
function Yn(t, o, r, l) {
  t && (t.style.backgroundColor = o, t.style.border = "none", ee(t, r, l));
}
function yt(t, o, r, l) {
  t && (t.style.color = o, ee(t, r, l));
}
function Kn(t, o, r, l) {
  t && (t.style.borderRadius = o, ee(t, r, l));
}
function Zn(t, o, r, l) {
  if (!t) return;
  const s = t.closest("div");
  s && (s.style.textAlign = o, ee(t, r, l));
}
function Jn(t, o, r, l) {
  t && (t.style.padding = o, ee(t, r, l));
}
function Qn(t, o, r) {
  const l = _();
  if (!l) return;
  t.style.outline = "";
  const s = t.closest("[data-editor-button-wrapper='true']");
  s && l.contains(s) ? s.remove() : t.remove(), U(o), r == null || r();
}
function eo(t, o, r) {
  t && (t.style.color = "#000000", t.style.backgroundColor = "transparent", t.style.border = "2px solid #000000", ee(t, o, r));
}
function to(t, o, r) {
  t && (t.style.border = "none", ee(t, o, r));
}
function no(t, o, r) {
  t && (t.style.padding = "0", ee(t, o, r));
}
function oo(t, o, r, l) {
  t.src = o, t.style.outline = "", U(r), l == null || l();
}
function ro(t, o, r, l) {
  const s = _();
  if (!s) return;
  s.focus();
  const c = window.getSelection();
  if (r.current && (c == null || c.removeAllRanges(), c == null || c.addRange(r.current), r.current = null), !c || c.rangeCount === 0) return;
  const d = c.getRangeAt(0);
  if (!s.contains(d.commonAncestorContainer)) return;
  d.deleteContents();
  const h = document.createElement("div");
  h.style.textAlign = "center", h.style.margin = "1rem 0";
  const m = document.createElement("img");
  m.src = t, m.alt = "Inserted image", m.style.display = "block", m.style.margin = "1rem auto", m.style.width = "100%", m.style.height = "auto", m.style.objectFit = "contain", m.style.borderRadius = "2px", h.appendChild(m);
  const k = document.createElement("p"), R = document.createTextNode(" ");
  k.appendChild(R), d.insertNode(h), d.insertNode(k), d.collapse();
  const M = document.createRange();
  M.setStart(R, 0), M.collapse(!0), c.removeAllRanges(), c.addRange(M), k.scrollIntoView({ behavior: "smooth", block: "center" });
  const T = s.innerHTML;
  o(T), l == null || l(T);
}
const lo = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
`;
function io(t, o, r, l, s) {
  const c = _();
  if (!c) return;
  c.focus();
  const d = window.getSelection();
  if (l.current && (d == null || d.removeAllRanges(), d == null || d.addRange(l.current), l.current = null), !d || d.rangeCount === 0) return;
  const h = d.getRangeAt(0);
  if (!c.contains(h.commonAncestorContainer)) return;
  h.deleteContents();
  const m = document.createElement("div");
  m.contentEditable = "false", m.style.textAlign = "center", m.style.margin = "20px 0", m.style.userSelect = "none", m.setAttribute("data-editor-button-wrapper", "true");
  const k = document.createElement("a");
  k.href = o, k.textContent = t, k.style.cssText = lo, k.setAttribute("target", "_blank"), k.setAttribute("rel", "noopener noreferrer"), m.appendChild(k);
  const R = document.createElement("p");
  R.innerHTML = "<br>", h.insertNode(m), h.insertNode(R), h.setStartAfter(R), h.collapse(!0), d.removeAllRanges(), d.addRange(h);
  const M = c.innerHTML;
  r(M), s == null || s(M);
}
function so(t, o, r) {
  const l = _();
  if (!l) return;
  const s = window.getSelection();
  if (!s || s.rangeCount === 0) return;
  const c = s.getRangeAt(0);
  if (!l.contains(c.commonAncestorContainer)) return;
  c.deleteContents();
  const d = document.createTextNode(t);
  c.insertNode(d), c.setStartAfter(d), c.setEndAfter(d), s.removeAllRanges(), s.addRange(c), o(l.innerHTML), r == null || r();
}
function ao(t, o, r) {
  const l = _();
  if (!l || !l.contains(t.commonAncestorContainer)) return;
  t.deleteContents();
  const s = document.createTextNode(o);
  t.insertNode(s);
  const c = window.getSelection();
  if (c) {
    const d = document.createRange();
    d.setStartAfter(s), d.collapse(!0), c.removeAllRanges(), c.addRange(d);
  }
  r(l.innerHTML);
}
function co(t) {
  return hn(t, {
    removeStyleTags: !0,
    applyAttributesTableElements: !0,
    preserveImportant: !0
  });
}
function uo(t) {
  return new DOMParser().parseFromString(t, "text/html").querySelectorAll("style").length > 0;
}
function fo(t, o, r) {
  let l = "";
  const s = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null);
  let c;
  for (; c = s.nextNode(); ) {
    const d = c;
    if (d === o) {
      l += d.data.slice(0, r);
      break;
    }
    l += d.data;
  }
  return l;
}
function xt(t, o) {
  let r = o;
  const l = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null);
  let s;
  for (; s = l.nextNode(); ) {
    const c = s, d = c.data.length;
    if (r < d) return { node: c, offset: r };
    if (r === d) return { node: c, offset: d };
    r -= d;
  }
  return null;
}
const He = "customer", Oe = "event";
function ho(t) {
  return t === "" ? { group: "both", query: "" } : t.startsWith(He) ? { group: "customer", query: t.slice(He.length) } : t.startsWith(Oe) ? { group: "event", query: t.slice(Oe.length) } : He.startsWith(t) ? { group: "customer", query: "" } : Oe.startsWith(t) ? { group: "event", query: "" } : null;
}
function bt(t, o, r) {
  if (o.nodeType !== Node.TEXT_NODE) return null;
  const l = fo(t, o, r), s = l.lastIndexOf("@");
  if (s < 0 || s > 0 && /[a-zA-Z0-9_]/.test(l.charAt(s - 1))) return null;
  const d = l.slice(s).match(/^@([a-zA-Z0-9_]*)$/);
  if (!d) return null;
  const h = d[1] ?? "", m = ho(h);
  if (!m) return null;
  const k = `@${h}`, R = l.length - k.length;
  return {
    group: m.group,
    query: m.query,
    matchLength: k.length,
    startOffset: R
  };
}
function vt(t) {
  return /\{\{\s*customer\./.test(t.value);
}
function wt(t) {
  return /\{\{\s*event\./.test(t.value);
}
function mo(t, o, r) {
  const l = o === "both" ? t.filter((c) => vt(c) || wt(c)) : t.filter((c) => o === "customer" ? vt(c) : wt(c)), s = r.trim().toLowerCase();
  return s ? l.filter(
    (c) => c.label.toLowerCase().includes(s) || c.value.toLowerCase().replace(/\s/g, "").includes(s)
  ) : l;
}
const kt = 280, po = () => /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M3 7v6h6" }),
  /* @__PURE__ */ e("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" })
] }), go = () => /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M21 7v6h-6" }),
  /* @__PURE__ */ e("path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" })
] }), yo = () => /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" }),
  /* @__PURE__ */ e("path", { d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" })
] }), xo = () => /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "19", y1: "4", x2: "10", y2: "4" }),
  /* @__PURE__ */ e("line", { x1: "14", y1: "20", x2: "5", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "4", x2: "9", y2: "20" })
] }), bo = () => /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "21", x2: "20", y2: "21" })
] }), vo = () => /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 6.5 3.9h.2m6.2 3.8c.2.5.3 1.1.3 1.7 0 4-3.3 4.7-7 4.7-3.5 0-5.5-.5-7.5-2" }),
  /* @__PURE__ */ e("line", { x1: "2", y1: "12", x2: "22", y2: "12" })
] }), wo = () => /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "10", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "18", x2: "21", y2: "18" }),
  /* @__PURE__ */ e("path", { d: "M4 6h1v4" }),
  /* @__PURE__ */ e("path", { d: "M4 10h2" }),
  /* @__PURE__ */ e("path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" })
] }), ko = () => /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "9", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "12", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "18", r: "1", fill: "currentColor", stroke: "none" })
] }), Co = () => /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
  /* @__PURE__ */ e("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
] }), No = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H1" }), Lo = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H2" }), Eo = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H3" }), Io = () => /* @__PURE__ */ e(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ e(
      "path",
      {
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M6 6h8m-8 4h12M6 14h8m-8 4h12"
      }
    )
  }
), Mo = () => /* @__PURE__ */ e(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ e(
      "path",
      {
        fill: "currentColor",
        d: "M21 7H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2m-4 4H7a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2m4 4H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2m-4 4H7a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2"
      }
    )
  }
), So = () => /* @__PURE__ */ e(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ e(
      "path",
      {
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M18 6h-8m8 4H6m12 4h-8m8 4H6"
      }
    )
  }
), Ro = () => /* @__PURE__ */ e(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ u(
      "g",
      {
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "1.5",
        children: [
          /* @__PURE__ */ e("path", { d: "M16.24 3.5h-8.5a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h8.5a5 5 0 0 0 5-5v-7a5 5 0 0 0-5-5" }),
          /* @__PURE__ */ e("path", { d: "m2.99 17l2.75-3.2a2.2 2.2 0 0 1 2.77-.27a2.2 2.2 0 0 0 2.77-.27l2.33-2.33a4 4 0 0 1 5.16-.43l2.49 1.93M7.99 10.17a1.66 1.66 0 1 0 0-3.32a1.66 1.66 0 0 0 0 3.32" })
        ]
      }
    )
  }
), To = () => /* @__PURE__ */ u(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    children: [
      /* @__PURE__ */ e(
        "rect",
        {
          x: "3",
          y: "3",
          width: "18",
          height: "18",
          rx: "2",
          ry: "2"
        }
      ),
      /* @__PURE__ */ e("line", { x1: "9", y1: "9", x2: "15", y2: "9" })
    ]
  }
), Ao = () => /* @__PURE__ */ e("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ e("polyline", { points: "6 9 12 15 18 9" }) }), Do = () => /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ e("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  /* @__PURE__ */ e("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
] }), Bo = () => /* @__PURE__ */ u("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("polyline", { points: "16 18 22 12 16 6" }),
  /* @__PURE__ */ e("polyline", { points: "8 6 2 12 8 18" })
] }), Ho = () => /* @__PURE__ */ u("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2", ry: "2" }),
  /* @__PURE__ */ e("circle", { cx: "12", cy: "17", r: "1", fill: "currentColor", stroke: "none" })
] }), Oo = ({
  value: t = "",
  onChange: o,
  readOnly: r = !1,
  placeholder: l,
  onFetchImages: s,
  onUploadImage: c,
  onDeleteImage: d,
  enablePreview: h = !0,
  enableCodeEditor: m = !0,
  height: k = 500,
  className: R = "",
  previewData: M,
  toolbarContent: T,
  showCodeEditor: Y,
  onShowCodeEditorChange: N,
  showPreview: ne,
  onShowPreviewChange: P,
  hideViewToggles: ie = !1,
  onOpenImageModal: K,
  insertableAttributes: G
}, de) => {
  const [Z, oe] = y(t), [J, w] = y(t), [A, b] = y(t), [se, ue] = y(A), [St, Rt] = y(!1), [Tt, At] = y(!1), Dt = Y !== void 0, Bt = ne !== void 0, q = Dt ? Y : Tt, F = Bt ? ne : St, Pe = (n) => {
    const i = typeof n == "function" ? n(q) : n;
    N ? N(i) : At(i);
  }, Fe = (n) => {
    const i = typeof n == "function" ? n(F) : n;
    P ? P(i) : Rt(i);
  }, [Ht, Ue] = y(!1), [Ot, fe] = y(!1), [Wt, be] = y(!1), [Pt, ve] = y(!1), [qe, we] = y(null), [S, te] = y(null), [_e, Ft] = y({ top: 0, left: 0 }), [$, ke] = y(null), [X, Ce] = y(null), [Ne, he] = y(null), [je, Ut] = y(null), [qt, Le] = y(!1), [Xe, ze] = y("#000000"), [$e, Ve] = y("#000000"), [_t, Ge] = y([]), [jt, Ye] = y(null), [Wo, Ke] = y(!1), [Po, Ze] = y(!1), [Fo, Je] = y(!1), [Uo, Qe] = y(!1), [L, re] = y(null), [et, Xt] = y({ top: 0, left: 0 }), [g, B] = y(null), [tt, zt] = y({ top: 0, left: 0 }), [nt, $t] = y({ top: 0, left: 0 }), [z, H] = y(null), ot = ae(G);
  ot.current = G;
  const rt = ae(null), me = ae(null);
  D(() => {
    t !== J && (oe(t), w(t), b(t));
  }, [t]), D(() => {
    const n = document.querySelector(".rsw-editor .rsw-ce");
    if (!n) return;
    const i = n.querySelector("#selection-marker");
    i && _n(i);
  }, [J]), D(() => {
    let n = null;
    const i = (a) => {
      const f = a.target;
      if (!f) return;
      const p = f.closest(".rsw-editor .rsw-ce img"), x = document.querySelector(".rsw-editor .rsw-ce");
      p && (x != null && x.contains(p)) ? (n && n !== p && (n.style.outline = "none"), p.style.outline = "2px solid red", n = p, re({ element: p, x: a.clientX, y: a.clientY })) : (n && (n.style.outline = "none", n = null), re(null));
    };
    return document.addEventListener("click", i), () => document.removeEventListener("click", i);
  }, []), D(() => {
    let n = null, i = null;
    const a = (f) => {
      const p = f.target;
      if (!p) return;
      const x = p.closest(".rsw-editor .rsw-ce a"), v = document.querySelector(".rsw-editor .rsw-ce");
      x && (v != null && v.contains(x)) ? (f.preventDefault(), !!x.closest("[data-editor-button-wrapper='true']") || !!x.style.backgroundColor && !!x.style.padding ? (i && (i.style.outline = "none", i = null), te(null), n && n !== x && (n.style.outline = "none", n.style.boxShadow = ""), x.style.outline = "3px solid #4f46e5", x.style.boxShadow = "0 0 0 5px rgba(79,70,229,0.18)", n = x, B({ element: x, x: f.clientX, y: f.clientY })) : (n && (n.style.outline = "none", n.style.boxShadow = "", n = null), B(null), i && i !== x && (i.style.outline = "none"), x.style.outline = "2px solid #0ea5e9", i = x, te({ element: x, x: f.clientX, y: f.clientY }))) : (n && (n.style.outline = "none", n.style.boxShadow = "", n = null), i && (i.style.outline = "none", i = null), B(null), te(null));
    };
    return document.addEventListener("click", a), () => document.removeEventListener("click", a);
  }, []), D(() => {
    const n = () => {
      const i = rt.current, a = window.getSelection();
      if (!a || !i || !i.contains(a.anchorNode)) {
        Ge([]), Ye(null), Ke(!1), Ze(!1), Je(!1), Qe(!1);
        return;
      }
      const f = a.getRangeAt(0);
      Ge(a.isCollapsed ? [] : Array.from(f.getClientRects()));
      let p = a.anchorNode;
      if ((p == null ? void 0 : p.nodeType) === Node.TEXT_NODE && (p = p.parentElement), p instanceof HTMLElement) {
        ze(Vn(window.getComputedStyle(p).color));
        const x = p.closest("h1, h2, h3");
        Ye(x ? x.tagName.toLowerCase() : null), Ke(document.queryCommandState("bold")), Ze(document.queryCommandState("italic")), Je(document.queryCommandState("underline")), Qe(document.queryCommandState("strikeThrough"));
      }
    };
    return document.addEventListener("selectionchange", n), window.addEventListener("scroll", n, !0), () => {
      document.removeEventListener("selectionchange", n), window.removeEventListener("scroll", n, !0);
    };
  }, []), D(() => {
    if (!(L != null && L.element)) return;
    const n = L.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const a = n.getBoundingClientRect(), f = i.getBoundingClientRect(), p = 150, x = 50;
    let v = a.top - f.top, C = a.right - f.left + 8;
    C + p > f.width && (C = a.left - f.left - p - 8), v + x > f.height && (v = f.height - x - 8), v < 0 && (v = 8), C < 0 && (C = 8), Xt({ top: v, left: C });
  }, [L == null ? void 0 : L.element]), D(() => {
    if (!(g != null && g.element)) return;
    const n = g.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const a = n.getBoundingClientRect(), f = i.getBoundingClientRect(), p = 100, x = 200;
    let v = a.top - f.top, C = a.right - f.left + p;
    C + x > f.width && (C = a.left - f.left - x - p), C < p && (C = p), v < p && (v = p), zt({ top: v, left: C }), $t({
      top: Math.max(4, a.top - f.top - 26),
      left: a.left - f.left + a.width / 2
    });
  }, [g]), D(() => {
    if (!(S != null && S.element)) return;
    const n = S.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const a = n.getBoundingClientRect(), f = i.getBoundingClientRect(), p = 8, x = 200;
    let v = a.bottom - f.top + p, C = a.left - f.left;
    C + x > f.width && (C = f.width - x - p), C < p && (C = p), v + 100 > f.height && (v = a.top - f.top - 100), Ft({ top: v, left: C });
  }, [S]);
  const Ee = M != null && Object.keys(M).length > 0;
  D(() => {
    if (!F || !Ee) {
      ue(A);
      return;
    }
    ue(A), Q.parseAndRender(A, M).then(ue).catch(() => ue(A));
  }, [F, Ee, A, M]);
  const Vt = pt(() => uo(Z), [Z]), { wordCount: lt, charCount: it } = pt(() => {
    const n = Z.replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
    return { wordCount: n.length === 0 ? 0 : n.split(" ").filter(Boolean).length, charCount: n.replace(/ /g, "").length };
  }, [Z]), V = (n) => {
    oe(n);
    const i = qn(J, n);
    w(i), b(i), o == null || o(i);
  }, st = ae(V);
  st.current = V;
  const Ie = ln((n) => {
    const i = _(), a = window.getSelection();
    if (!i || !a || a.rangeCount === 0) return;
    const f = a.anchorNode;
    if (!f) return;
    const p = a.anchorOffset, x = bt(i, f, p);
    if (!x) return;
    const v = xt(i, x.startOffset);
    if (!v || f.nodeType !== Node.TEXT_NODE) return;
    const C = document.createRange();
    C.setStart(v.node, v.offset), C.setEnd(f, p), ao(C, n, st.current);
  }, []);
  D(() => {
    if (!(G != null && G.length) || r || q || F) {
      H(null);
      return;
    }
    const n = () => {
      const i = ot.current;
      if (!(i != null && i.length)) {
        H(null);
        return;
      }
      const a = _(), f = window.getSelection();
      if (!a || !f || f.rangeCount === 0 || !f.isCollapsed) {
        H(null);
        return;
      }
      const p = f.anchorNode, x = f.anchorOffset;
      if (!p || !a.contains(p)) {
        H(null);
        return;
      }
      if (p.nodeType !== Node.TEXT_NODE) {
        H(null);
        return;
      }
      const v = bt(a, p, x);
      if (!v) {
        H(null);
        return;
      }
      const C = mo(i, v.group, v.query), Me = xt(a, v.startOffset);
      if (!Me) {
        H(null);
        return;
      }
      const Se = document.createRange();
      Se.setStart(Me.node, Me.offset), Se.setEnd(p, x);
      const mt = Se.getBoundingClientRect();
      H((pe) => {
        const nn = pe && pe.group === v.group && pe.query === v.query;
        return {
          group: v.group,
          query: v.query,
          items: C,
          highlightIndex: nn ? Math.min(pe.highlightIndex, Math.max(0, C.length - 1)) : 0,
          left: mt.left,
          top: mt.bottom + 4
        };
      });
    };
    return document.addEventListener("input", n, !0), document.addEventListener("keyup", n, !0), document.addEventListener("selectionchange", n), () => {
      document.removeEventListener("input", n, !0), document.removeEventListener("keyup", n, !0), document.removeEventListener("selectionchange", n);
    };
  }, [G, r, q, F]), D(() => {
    if (!z) return;
    const n = (i) => {
      if (i.key === "Escape") {
        i.preventDefault(), H(null);
        return;
      }
      if (i.key === "ArrowDown") {
        i.preventDefault(), H(
          (a) => a && a.items.length ? { ...a, highlightIndex: Math.min(a.items.length - 1, a.highlightIndex + 1) } : a
        );
        return;
      }
      if (i.key === "ArrowUp") {
        i.preventDefault(), H((a) => a && a.items.length ? { ...a, highlightIndex: Math.max(0, a.highlightIndex - 1) } : a);
        return;
      }
      (i.key === "Enter" || i.key === "Tab" && !i.shiftKey) && (i.preventDefault(), H((a) => {
        if (!a || a.items.length === 0) return null;
        const f = a.items[a.highlightIndex];
        return f && Ie(f.value), null;
      }));
    };
    return document.addEventListener("keydown", n, !0), () => document.removeEventListener("keydown", n, !0);
  }, [z, Ie]);
  const at = () => {
    const n = window.getSelection();
    n && n.rangeCount > 0 && Ut(n.getRangeAt(0).cloneRange());
  }, ct = (n) => {
    $n(n, V, b, () => {
    }, je), ze(n), Le(!1);
  }, Gt = (n) => {
    Gn(n, V, b, () => {
    }, je);
  }, dt = () => {
    try {
      const n = co(Z);
      oe(n), w(n), b(n), o == null || o(n), gt.success("CSS inlined successfully!");
    } catch {
      gt.error("Failed to inline CSS.");
    }
  }, ut = () => {
    if (!Ne) {
      const n = document.querySelector(".rsw-editor .rsw-ce");
      if (n) {
        const i = window.getSelection();
        if (i && i.rangeCount > 0) {
          const a = i.getRangeAt(0);
          n.contains(a.commonAncestorContainer) && (me.current = a.cloneRange());
        }
      }
    }
    K ? K() : Ue(!0);
  }, ft = (n) => {
    if (Ne) {
      oo(Ne, n, b, () => he(null));
      return;
    }
    ro(n, b, me);
  }, Yt = () => {
    const n = window.getSelection();
    n && n.rangeCount > 0 && (me.current = n.getRangeAt(0).cloneRange()), fe(!0);
  }, Kt = (n) => {
    const { buttonText: i, buttonUrl: a } = n;
    !i || !a || (X ? (X.textContent = i, X.href = a, X.style.outline = "", U(b), Ce(null)) : io(i, a, b, me, V), fe(!1));
  };
  sn(de, () => ({
    insert: (n) => {
      so(n, b);
    },
    inlineCss: () => dt(),
    insertImage: (n) => ft(n),
    clearImageToReplace: () => he(null)
  }));
  const Zt = Sn(
    () => {
      L != null && L.element && (he(L.element), ut());
    },
    () => (L == null ? void 0 : L.element) && jn(L.element, b, () => re(null)),
    (n) => (L == null ? void 0 : L.element) && zn(L.element, n, b, () => re(null)),
    (n) => (L == null ? void 0 : L.element) && Xn(L.element, n, b, () => re(null))
  ), Jt = () => {
    g != null && g.element && (Ce(g.element), B(null), fe(!0));
  }, Qt = (() => {
    const n = Rn(
      () => (g == null ? void 0 : g.element) && Qn(g.element, b, () => B(null)),
      () => (g == null ? void 0 : g.element) && eo(g.element, b, () => B(null)),
      () => (g == null ? void 0 : g.element) && to(g.element, b, () => B(null)),
      () => (g == null ? void 0 : g.element) && no(g.element, b, () => B(null)),
      (i) => (g == null ? void 0 : g.element) && Yn(g.element, i, b, () => B(null)),
      (i) => (g == null ? void 0 : g.element) && yt(g.element, i, b, () => B(null)),
      (i) => (g == null ? void 0 : g.element) && Kn(g.element, i, b, () => B(null)),
      (i) => (g == null ? void 0 : g.element) && Jn(g.element, i, b, () => B(null)),
      (i) => (g == null ? void 0 : g.element) && Zn(g.element, i, b, () => B(null))
    );
    return {
      ...n,
      items: [
        { key: "edit-button", label: /* @__PURE__ */ u("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ u("svg", { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", flexShrink: 0 }, children: [
            /* @__PURE__ */ e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
            /* @__PURE__ */ e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
          ] }),
          "Edit Button"
        ] }), onClick: Jt },
        { type: "divider" },
        ...n.items ?? []
      ]
    };
  })(), en = Tn(
    () => {
      S != null && S.element && (ke(S.element), te(null), ve(!0));
    },
    () => {
      S != null && S.element && (S.element.style.outline = "", S.element.replaceWith(...Array.from(S.element.childNodes)), U(b), te(null));
    },
    (n) => (S == null ? void 0 : S.element) && yt(S.element, n, b, () => te(null))
  );
  Mn(ct);
  const tn = Dn(Gt), ht = typeof k == "number" ? `${k}px` : k;
  return /* @__PURE__ */ u("div", { className: `bg-white border rounded-xl overflow-hidden flex flex-col ${R}`, style: { minWidth: 400 }, children: [
    /* @__PURE__ */ u(
      "div",
      {
        className: `bg-white flex flex-wrap items-center gap-0.5 px-2 py-1.5 ${r && !q && !F ? "pointer-events-none opacity-50" : ""}`,
        style: { boxShadow: "0 1px 0 #e5e7eb" },
        children: [
          !q && !F && /* @__PURE__ */ u(W, { children: [
            /* @__PURE__ */ u("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Undo", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("undo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(po, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Redo", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("redo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(go, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: ["h1", "h2", "h3"].map((n, i) => {
              const a = [No, Lo, Eo][i], f = jt === n;
              return /* @__PURE__ */ e(E, { title: f ? "Remove heading" : `Heading ${i + 1}`, children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (p) => {
                    p.preventDefault(), document.execCommand("formatBlock", !1, f ? "p" : n), setTimeout(() => U(b), 0);
                  },
                  className: "toolbar-btn",
                  style: f ? { background: "#1e293b", color: "#fff", borderColor: "#1e293b" } : void 0,
                  children: /* @__PURE__ */ e(a, {})
                }
              ) }, n);
            }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ u("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Bold (Ctrl+B)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("bold");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(yo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Italic (Ctrl+I)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("italic");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(xo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Underline (Ctrl+U)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("underline");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(bo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Strikethrough", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("strikeThrough");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(vo, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ u("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Numbered List", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("insertOrderedList"), setTimeout(() => U(b), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(wo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Bullet List", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("insertUnorderedList"), setTimeout(() => U(b), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(ko, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Insert Link", children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (n) => {
                    n.preventDefault();
                    const i = window.getSelection();
                    i && i.rangeCount > 0 && we(i.getRangeAt(0).cloneRange()), be(!0);
                  },
                  className: "toolbar-btn",
                  children: /* @__PURE__ */ e(Co, {})
                }
              ) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ u("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Align Left", children: /* @__PURE__ */ e("button", { onClick: () => Be("left", V), className: "toolbar-btn", children: /* @__PURE__ */ e(Io, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Align Center", children: /* @__PURE__ */ e("button", { onClick: () => Be("center", V), className: "toolbar-btn", children: /* @__PURE__ */ e(Mo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Align Right", children: /* @__PURE__ */ e("button", { onClick: () => Be("right", V), className: "toolbar-btn", children: /* @__PURE__ */ e(So, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ u("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Insert Image", children: /* @__PURE__ */ e("button", { onClick: ut, className: "toolbar-btn", children: /* @__PURE__ */ e(Ro, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Insert Button", children: /* @__PURE__ */ e("button", { onClick: Yt, className: "toolbar-btn", children: /* @__PURE__ */ e(To, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(E, { title: "Text Color", children: /* @__PURE__ */ e(
              dn,
              {
                value: $e,
                open: qt,
                onOpenChange: (n) => {
                  Le(n), n && (at(), Ve(Xe));
                },
                onChange: (n) => Ve(n.toHexString()),
                panelRender: (n) => /* @__PURE__ */ u("div", { children: [
                  n,
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "border text-xs px-2 py-1 mt-1 rounded hover:bg-gray-50",
                      onClick: () => {
                        ct($e), Le(!1);
                      },
                      children: "Apply"
                    }
                  )
                ] }),
                children: /* @__PURE__ */ e("button", { type: "button", className: "toolbar-btn", children: /* @__PURE__ */ e("div", { style: { width: 18, height: 18, backgroundColor: Xe, borderRadius: 2, border: "1px solid #e5e7eb" } }) })
              }
            ) }) }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(E, { title: "Font Family", children: /* @__PURE__ */ e(ge, { menu: tn, trigger: ["click"], onOpenChange: (n) => {
              n && at();
            }, children: /* @__PURE__ */ u("button", { className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              "Aa ",
              /* @__PURE__ */ e(Ao, {})
            ] }) }) }) })
          ] }),
          !ie && q && Vt && /* @__PURE__ */ e(E, { title: "Inline all <style> tags into element attributes for email clients", children: /* @__PURE__ */ u(
            "button",
            {
              onClick: dt,
              className: "flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-white animate-pulse flex-shrink-0",
              children: [
                /* @__PURE__ */ e(Do, {}),
                " Inline CSS"
              ]
            }
          ) }),
          !ie && /* @__PURE__ */ u("div", { className: "ml-auto flex items-center gap-1 flex-shrink-0", children: [
            m && /* @__PURE__ */ e(E, { title: "Toggle HTML source editor", children: /* @__PURE__ */ u(
              "button",
              {
                onClick: () => {
                  Pe((n) => !n), Fe(!1);
                },
                className: `flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${q ? "bg-gray-800 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`,
                children: [
                  /* @__PURE__ */ e(Bo, {}),
                  q ? "Editor" : "HTML"
                ]
              }
            ) }),
            h && /* @__PURE__ */ e(E, { title: "Toggle phone preview", children: /* @__PURE__ */ u(
              "button",
              {
                onClick: () => {
                  Fe((n) => !n), Pe(!1);
                },
                className: `flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${F ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`,
                children: [
                  /* @__PURE__ */ e(Ho, {}),
                  F ? "Close" : "Preview"
                ]
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex flex-1 min-h-0", style: { height: ht }, children: /* @__PURE__ */ e(
      "div",
      {
        className: "flex-1 relative overflow-hidden min-h-0",
        style: q || F ? { minHeight: 300 } : void 0,
        children: F ? /* @__PURE__ */ e("div", { className: "h-full overflow-y-auto flex items-start justify-center p-4 bg-gray-100", children: /* @__PURE__ */ e(bn, { srcDoc: Ee ? se : A }) }) : q ? /* @__PURE__ */ e(
          xn,
          {
            height: ht,
            defaultLanguage: "html",
            defaultValue: J,
            onChange: (n) => V(n ?? ""),
            theme: "vs-dark",
            options: {
              minimap: { enabled: !0 },
              formatOnPaste: !0,
              fontSize: 12,
              wordWrap: "on",
              readOnly: r,
              scrollBeyondLastLine: !1,
              glyphMargin: !1,
              renderValidationDecorations: "off"
            }
          }
        ) : /* @__PURE__ */ u("div", { className: "relative h-full", ref: rt, children: [
          /* @__PURE__ */ e(
            pn,
            {
              value: Z,
              onChange: (n) => V(n.target.value),
              disabled: r,
              placeholder: l,
              containerProps: {
                className: "h-full",
                style: {
                  opacity: r ? 0.6 : 1,
                  pointerEvents: r ? "none" : "auto"
                }
              }
            }
          ),
          L && /* @__PURE__ */ e("div", { style: { position: "absolute", top: et.top - 100, left: et.left - 100, zIndex: 1e3, width: 150 }, children: /* @__PURE__ */ e(ge, { menu: Zt, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || re(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          g && /* @__PURE__ */ e("div", { style: { position: "absolute", top: tt.top, left: tt.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(ge, { menu: Qt, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || B(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          g && /* @__PURE__ */ e(
            "div",
            {
              style: {
                position: "absolute",
                top: nt.top,
                left: nt.left,
                transform: "translateX(-50%)",
                zIndex: 998,
                background: "#4f46e5",
                color: "#fff",
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: 999,
                pointerEvents: "none",
                whiteSpace: "nowrap",
                fontWeight: 600,
                lineHeight: 1.6,
                letterSpacing: 0.3,
                boxShadow: "0 2px 8px rgba(79,70,229,0.35)"
              },
              children: "✎ Button"
            }
          ),
          S && /* @__PURE__ */ e("div", { style: { position: "absolute", top: _e.top, left: _e.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(ge, { menu: en, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || (S.element.style.outline = "none", te(null));
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          _t.map((n, i) => /* @__PURE__ */ e(
            "div",
            {
              style: {
                position: "fixed",
                top: n.top,
                left: n.left,
                width: n.width,
                height: n.height,
                border: "1px solid #4f46e5",
                backgroundColor: "rgba(79,70,229,0.1)",
                pointerEvents: "none",
                zIndex: 10
              }
            },
            i
          ))
        ] })
      }
    ) }),
    /* @__PURE__ */ u(
      "div",
      {
        className: "flex items-center justify-between px-4 bg-white select-none",
        style: { borderTop: "1px solid #e5e7eb", minHeight: 28 },
        children: [
          /* @__PURE__ */ e("span", { className: "text-xs", style: { color: "#cbd5e1" }, children: q ? "HTML source" : F ? "Phone preview" : "Rich text" }),
          !q && !F && /* @__PURE__ */ e(E, { title: `${it.toLocaleString()} characters`, children: /* @__PURE__ */ u("span", { className: "text-xs tabular-nums cursor-default", style: { color: "#cbd5e1" }, children: [
            lt.toLocaleString(),
            " ",
            lt === 1 ? "word" : "words",
            " · ",
            it.toLocaleString(),
            " chars"
          ] }) })
        ]
      }
    ),
    !K && /* @__PURE__ */ e(
      vn,
      {
        show: Ht,
        onClose: () => {
          Ue(!1), he(null);
        },
        onSelectImage: ft,
        onFetchImages: s,
        onUploadImage: c,
        onDeleteImage: d
      }
    ),
    /* @__PURE__ */ e(
      Te,
      {
        show: Ot,
        title: X ? "Edit Button" : "Insert Button",
        fields: [
          { name: "buttonText", label: "Button Text", placeholder: "Click Here", defaultValue: (X == null ? void 0 : X.textContent) ?? "" },
          { name: "buttonUrl", label: "Button URL", placeholder: "https://", defaultValue: (X == null ? void 0 : X.getAttribute("href")) ?? "" }
        ],
        onConfirm: Kt,
        onClose: () => {
          fe(!1), Ce(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      Te,
      {
        show: Pt,
        title: "Edit Link",
        fields: [
          { name: "linkText", label: "Link Text", placeholder: "Click here", defaultValue: ($ == null ? void 0 : $.textContent) ?? "", required: !0 },
          { name: "url", label: "URL", placeholder: "https://", defaultValue: ($ == null ? void 0 : $.getAttribute("href")) ?? "", required: !0 }
        ],
        onConfirm: ({ linkText: n, url: i }) => {
          $ && ($.textContent = n, $.href = i, $.style.outline = "", U(b), ke(null)), ve(!1);
        },
        onClose: () => {
          ve(!1), ke(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      Te,
      {
        show: Wt,
        title: "Insert Link",
        fields: [
          { name: "url", label: "URL", placeholder: "https://", required: !0 },
          { name: "linkText", label: "Link Text", placeholder: "Displayed text (optional)", required: !1 }
        ],
        onConfirm: ({ url: n, linkText: i }) => {
          var v, C;
          be(!1);
          const a = document.querySelector(".rsw-editor .rsw-ce");
          if (!a || !n) return;
          a.focus();
          const f = window.getSelection();
          qe && (f == null || f.removeAllRanges(), f == null || f.addRange(qe)), document.execCommand("createLink", !1, n);
          const p = window.getSelection(), x = (C = (v = p == null ? void 0 : p.anchorNode) == null ? void 0 : v.parentElement) == null ? void 0 : C.closest("a");
          x && (x.style.color = "#0ea5e9", i && (x.textContent = i)), we(null), setTimeout(() => U(b), 0);
        },
        onClose: () => {
          be(!1), we(null);
        }
      }
    ),
    z && typeof document < "u" && an(
      /* @__PURE__ */ e(
        "div",
        {
          role: "listbox",
          "aria-label": z.group === "customer" ? "Customer attributes" : z.group === "event" ? "Event attributes" : "Customer and event attributes",
          className: "flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-xl",
          style: {
            position: "fixed",
            zIndex: 10050,
            left: z.left,
            top: z.top,
            minWidth: 220,
            maxWidth: 320,
            maxHeight: kt
          },
          onMouseDown: (n) => n.preventDefault(),
          children: /* @__PURE__ */ e(
            "div",
            {
              className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-1",
              style: {
                maxHeight: kt,
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch"
              },
              children: z.items.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 py-2 text-xs text-gray-500", children: "No matching attributes" }) : z.items.map((n, i) => /* @__PURE__ */ u(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": i === z.highlightIndex,
                  className: `flex w-full flex-col items-start px-3 py-2 text-left text-xs ${i === z.highlightIndex ? "bg-indigo-50 text-indigo-900" : "text-gray-800 hover:bg-gray-50"}`,
                  onMouseDown: (a) => {
                    a.preventDefault(), Ie(n.value), H(null);
                  },
                  onMouseEnter: () => H((a) => a && { ...a, highlightIndex: i }),
                  children: [
                    /* @__PURE__ */ e("span", { className: "font-medium", children: n.label }),
                    /* @__PURE__ */ e("span", { className: "mt-0.5 font-mono text-[10px] text-gray-500", children: n.value })
                  ]
                },
                n.value
              ))
            }
          )
        }
      ),
      document.body
    )
  ] });
}, er = rn(
  Oo
);
function tr() {
  const [t, o] = y(!0);
  return D(() => {
    function r() {
      o(!0);
    }
    function l() {
      o(!1);
    }
    return window.addEventListener("online", r), window.addEventListener("offline", l), typeof navigator.onLine < "u" && o(navigator.onLine), () => {
      window.removeEventListener("online", r), window.removeEventListener("offline", l);
    };
  }, []), t;
}
export {
  er as CDPEditor,
  Ko as COMMON_CURRENCY_CODES,
  vn as ImagePickerModal,
  Te as InputModal,
  xn as MonacoEditorWrapper,
  bn as PhonePreview,
  On as VALID_CURRENCY_CODES,
  pn as WysiwygEditor,
  Gn as changeFontFamily,
  $n as changeHighlightColor,
  er as default,
  co as handleInlineCSS,
  io as insertButtonAtCursorInEditor,
  ro as insertImageAtCursorInEditor,
  so as insertTextIntoEditorAtSelection,
  Wn as isValidCurrencyCode,
  Q as liquidEngine,
  uo as needsInliningDetailed,
  Vn as normalizeColor,
  qn as replaceBodyContent,
  ao as replaceEditorRangeWithText,
  tr as useOnlineStatus,
  Zo as validateCurrencyCodes,
  Jo as validateLiquidTemplate,
  Qo as wrapEmailBodyHtml
};
//# sourceMappingURL=email-editor.es.js.map
