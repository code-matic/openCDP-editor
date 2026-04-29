import { jsx as e, jsxs as a, Fragment as D } from "react/jsx-runtime";
import _t, { lazy as it, Suspense as st, useState as p, useEffect as F, useRef as Ee, forwardRef as Xt, useMemo as ot, useImperativeHandle as zt } from "react";
import { Form as ve, Modal as at, Input as $t, Tooltip as N, ColorPicker as Vt, Dropdown as ue } from "antd";
import { toast as rt } from "sonner";
import { Liquid as Gt } from "liquidjs";
import { codes as Yt } from "currency-codes";
import Jt from "juice";
const Kt = it(() => import("react-simple-wysiwyg")), Zt = ({
  value: t,
  onChange: o,
  placeholder: r,
  containerProps: l,
  disabled: s,
  onFocus: c,
  onBlur: u
}) => /* @__PURE__ */ e("div", { ...l, children: /* @__PURE__ */ e(st, { fallback: /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-100 animate-pulse rounded flex items-center justify-center text-gray-400 text-sm", children: "Loading editor…" }), children: /* @__PURE__ */ e(
  Kt,
  {
    value: t,
    onChange: o,
    placeholder: r,
    spellCheck: !1,
    disabled: s,
    onFocus: c,
    onBlur: u
  }
) }) }), Qt = it(() => import("@monaco-editor/react"));
function en(t) {
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
const tn = ({
  height: t = "100%",
  defaultLanguage: o = "html",
  defaultValue: r = "",
  onChange: l,
  theme: s = "vs-dark",
  options: c = {},
  className: u,
  onMount: d
}) => {
  const [m, k] = p(!1), A = _t.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (R) => {
      en(R), d == null || d(R);
    },
    [d]
  );
  F(() => {
    k(!0);
  }, []);
  const I = /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-900 rounded flex items-center justify-center text-gray-400 text-sm animate-pulse", children: "Loading code editor…" });
  return m ? /* @__PURE__ */ e("div", { className: u, children: /* @__PURE__ */ e(st, { fallback: I, children: /* @__PURE__ */ e(
    Qt,
    {
      height: t,
      defaultLanguage: o,
      defaultValue: r,
      onChange: l,
      theme: s,
      options: c,
      onMount: A
    }
  ) }) }) : I;
}, nn = ({ srcDoc: t }) => /* @__PURE__ */ e("div", { className: "flex justify-center items-start", children: /* @__PURE__ */ e("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ a("div", { className: "relative !max-w-[340px] w-full !h-[640px] border-8 border-black rounded-[40px] overflow-hidden shadow-xl bg-black", children: [
  /* @__PURE__ */ a("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20 flex justify-center items-center", children: [
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
] }) }) }), Ce = ({ show: t, title: o, fields: r, onConfirm: l, onClose: s }) => {
  const [c] = ve.useForm();
  return F(() => {
    if (t) {
      const m = {};
      r.forEach((k) => {
        k.defaultValue && (m[k.name] = k.defaultValue);
      }), c.setFieldsValue(m);
    }
  }, [t, c]), /* @__PURE__ */ e(
    at,
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
      children: /* @__PURE__ */ e(ve, { form: c, layout: "vertical", className: "mt-4", children: r.map((m) => /* @__PURE__ */ e(
        ve.Item,
        {
          name: m.name,
          label: m.label,
          rules: [{ required: m.required !== !1, message: `Please enter ${m.label.toLowerCase()}` }],
          children: /* @__PURE__ */ e($t, { placeholder: m.placeholder })
        },
        m.name
      )) })
    }
  );
}, on = ({
  show: t,
  onClose: o,
  onSelectImage: r,
  onFetchImages: l,
  onUploadImage: s,
  onDeleteImage: c
}) => {
  const [u, d] = p([]), [m, k] = p(!1), [A, I] = p(!1), [R, z] = p(null), [v, ee] = p(""), [H, re] = p(""), [$, se] = p("library"), _ = Ee(null);
  F(() => {
    t && l && (k(!0), z(null), l().then((b) => d(b)).catch(() => z("Failed to load images.")).finally(() => k(!1)));
  }, [t, l]);
  const le = async (b) => {
    var te;
    const g = (te = b.target.files) == null ? void 0 : te[0];
    if (g) {
      if (!g.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      if (!s) {
        alert("Image upload handler not configured.");
        return;
      }
      I(!0);
      try {
        const V = await s(g);
        r(V), o();
      } catch {
        alert("Failed to upload image.");
      } finally {
        I(!1), b.target.value = "";
      }
    }
  }, K = () => {
    H.trim() && (r(H.trim()), o(), re(""));
  }, Z = u.filter(
    (b) => !b.isFolder && b.filename.toLowerCase().includes(v.toLowerCase())
  );
  return /* @__PURE__ */ a(
    at,
    {
      open: t,
      onCancel: o,
      title: "Insert Image",
      footer: null,
      width: 700,
      destroyOnHidden: !0,
      children: [
        /* @__PURE__ */ a("div", { className: "flex border-b mb-4", children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => se("library"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${$ === "library" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image Library"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => se("url"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${$ === "url" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image URL"
            }
          )
        ] }),
        $ === "url" && /* @__PURE__ */ a("div", { className: "space-y-3", children: [
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-500", children: "Paste a public image URL to insert it directly." }),
          /* @__PURE__ */ a("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "url",
                value: H,
                onChange: (b) => re(b.target.value),
                placeholder: "https://example.com/image.png",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400",
                onKeyDown: (b) => b.key === "Enter" && K()
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: K,
                disabled: !H.trim(),
                className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700",
                children: "Insert"
              }
            )
          ] }),
          H && /* @__PURE__ */ e("div", { className: "border rounded p-2 text-center", children: /* @__PURE__ */ e("img", { src: H, alt: "preview", className: "max-h-48 mx-auto object-contain" }) })
        ] }),
        $ === "library" && /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ a("div", { className: "flex justify-between items-center mb-3 gap-3", children: [
            /* @__PURE__ */ e(
              "input",
              {
                value: v,
                onChange: (b) => ee(b.target.value),
                placeholder: "Search images…",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              }
            ),
            s && /* @__PURE__ */ a(D, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => {
                    var b;
                    return (b = _.current) == null ? void 0 : b.click();
                  },
                  disabled: A,
                  className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700 whitespace-nowrap",
                  children: A ? "Uploading…" : "+ Upload"
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  ref: _,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: le
                }
              )
            ] })
          ] }),
          m && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3", children: Array.from({ length: 6 }).map((b, g) => /* @__PURE__ */ e("div", { className: "h-32 bg-gray-100 animate-pulse rounded" }, g)) }),
          R && /* @__PURE__ */ e("p", { className: "text-red-500 text-sm py-8 text-center", children: R }),
          !m && !R && Z.length === 0 && /* @__PURE__ */ e("div", { className: "py-12 text-center text-gray-400", children: l ? "No images found. Upload one to get started." : "No image library connected. Use the URL tab to insert images." }),
          !m && !R && Z.length > 0 && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1", children: Z.map((b) => /* @__PURE__ */ a(
            "div",
            {
              className: "group relative border rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all",
              onClick: () => {
                r(b.url), o();
              },
              children: [
                /* @__PURE__ */ e(
                  "img",
                  {
                    src: b.url,
                    alt: b.filename,
                    className: "w-full h-28 object-cover",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ a("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-white text-gray-800 text-xs px-2 py-1 rounded font-medium",
                      onClick: (g) => {
                        g.stopPropagation(), r(b.url), o();
                      },
                      children: "Select"
                    }
                  ),
                  c && /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-red-500 text-white text-xs px-2 py-1 rounded font-medium",
                      onClick: async (g) => {
                        g.stopPropagation(), await c(b.path), d((te) => te.filter((V) => V.path !== b.path));
                      },
                      children: "Delete"
                    }
                  )
                ] }),
                /* @__PURE__ */ e(N, { title: b.filename.split("/").pop(), children: /* @__PURE__ */ e("p", { className: "text-xs text-gray-600 truncate px-2 py-1 bg-white", children: b.filename.split("/").pop() }) })
              ]
            },
            b.path
          )) })
        ] })
      ]
    }
  );
}, U = (t, o = 13) => /* @__PURE__ */ e("svg", { width: o, height: o, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", flexShrink: 0 }, children: t }), rn = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
  /* @__PURE__ */ e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
] }), t), Me = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("polyline", { points: "3 6 5 6 21 6" }),
  /* @__PURE__ */ e("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }),
  /* @__PURE__ */ e("path", { d: "M10 11v6M14 11v6" }),
  /* @__PURE__ */ e("path", { d: "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" })
] }), t), ln = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("polyline", { points: "1 4 1 10 7 10" }),
  /* @__PURE__ */ e("path", { d: "M3.51 15a9 9 0 1 0 .49-3.8" })
] }), t), sn = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" }),
  /* @__PURE__ */ e("circle", { cx: "6.5", cy: "11.5", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "8.5", cy: "7.5", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "12", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "15.5", cy: "7.5", r: "1", fill: "currentColor", stroke: "none" })
] }), t), ct = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("polyline", { points: "4 7 4 4 20 4 20 7" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "20", x2: "15", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "4", x2: "12", y2: "20" })
] }), t), an = ({ size: t = 13 }) => U(/* @__PURE__ */ e(D, { children: /* @__PURE__ */ e("path", { d: "M3 9V6a3 3 0 0 1 3-3h3M21 9V6a3 3 0 0 0-3-3h-3M3 15v3a3 3 0 0 0 3 3h3m6 0h3a3 3 0 0 0 3-3v-3" }) }), t), cn = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("rect", { x: "3", y: "8", width: "18", height: "8", rx: "1" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "2", x2: "12", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
  /* @__PURE__ */ e("polyline", { points: "9 5 12 2 15 5" }),
  /* @__PURE__ */ e("polyline", { points: "9 19 12 22 15 19" })
] }), t), dt = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "12", x2: "15", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "18", x2: "18", y2: "18" })
] }), t), fe = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "6", y1: "12", x2: "18", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "18", x2: "20", y2: "18" })
] }), t), ut = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "6", y1: "18", x2: "21", y2: "18" })
] }), t), dn = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("polyline", { points: "15 3 21 3 21 9" }),
  /* @__PURE__ */ e("polyline", { points: "9 21 3 21 3 15" }),
  /* @__PURE__ */ e("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
] }), t), Ne = ({ size: t = 13 }) => U(/* @__PURE__ */ a(D, { children: [
  /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
] }), t), L = (t, o) => /* @__PURE__ */ a("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
  t,
  o
] }), B = (t, o) => /* @__PURE__ */ a("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
  /* @__PURE__ */ e("span", { style: { display: "inline-block", width: 10, height: 10, borderRadius: 2, background: t, border: "1px solid rgba(0,0,0,0.15)", flexShrink: 0 } }),
  o
] }), un = [
  { label: "Red", color: "#ef4444" },
  { label: "Green", color: "#10b981" },
  { label: "Blue", color: "#3b82f6" },
  { label: "Orange", color: "#f59e0b" },
  { label: "Purple", color: "#8b5cf6" },
  { label: "Black", color: "#000000" },
  { label: "White", color: "#ffffff" }
], fn = (t) => ({
  items: [
    {
      key: "color-grid",
      label: /* @__PURE__ */ e(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", padding: "8px" },
          onClick: (o) => o.stopPropagation(),
          children: un.map((o) => /* @__PURE__ */ e(N, { title: o.label, children: /* @__PURE__ */ e(
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
}), mn = (t, o, r, l) => ({
  items: [
    { key: "replace", label: L(/* @__PURE__ */ e(ln, {}), "Replace Image"), onClick: t },
    { key: "delete", label: L(/* @__PURE__ */ e(Me, {}), "Delete Image"), onClick: o, danger: !0 },
    { type: "divider" },
    {
      key: "resize",
      label: L(/* @__PURE__ */ e(dn, {}), "Resize Width"),
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
      label: L(/* @__PURE__ */ e(fe, {}), "Align Image"),
      children: [
        { key: "align-left", label: L(/* @__PURE__ */ e(dt, {}), "Left"), onClick: () => r("left") },
        { key: "align-center", label: L(/* @__PURE__ */ e(fe, {}), "Center"), onClick: () => r("center") },
        { key: "align-right", label: L(/* @__PURE__ */ e(ut, {}), "Right"), onClick: () => r("right") }
      ]
    }
  ]
}), hn = (t, o, r, l, s, c, u, d, m) => ({
  items: [
    {
      key: "bg-color",
      label: L(/* @__PURE__ */ e(sn, {}), "Background Color"),
      children: [
        { key: "bg-#3b82f6", label: B("#3b82f6", "Blue"), onClick: () => s("#3b82f6") },
        { key: "bg-#10b981", label: B("#10b981", "Green"), onClick: () => s("#10b981") },
        { key: "bg-#ef4444", label: B("#ef4444", "Red"), onClick: () => s("#ef4444") },
        { key: "bg-#f59e0b", label: B("#f59e0b", "Orange"), onClick: () => s("#f59e0b") },
        { key: "bg-#8b5cf6", label: B("#8b5cf6", "Purple"), onClick: () => s("#8b5cf6") },
        { key: "bg-#000000", label: B("#000000", "Black"), onClick: () => s("#000000") }
      ]
    },
    {
      key: "text-color",
      label: L(/* @__PURE__ */ e(ct, {}), "Text Color"),
      children: [
        { key: "text-#ffffff", label: B("#ffffff", "White"), onClick: () => c("#ffffff") },
        { key: "text-#000000", label: B("#000000", "Black"), onClick: () => c("#000000") }
      ]
    },
    {
      key: "border-radius",
      label: L(/* @__PURE__ */ e(an, {}), "Border Radius"),
      children: [
        { key: "radius-0px", label: "Square (0px)", onClick: () => u("0px") },
        { key: "radius-2px", label: "Rounded (2px)", onClick: () => u("2px") },
        { key: "radius-4px", label: "Large (4px)", onClick: () => u("4px") },
        { key: "radius-9999px", label: "Pill", onClick: () => u("9999px") }
      ]
    },
    {
      key: "padding",
      label: L(/* @__PURE__ */ e(cn, {}), "Padding"),
      children: [
        { key: "padding-8px 16px", label: "Small", onClick: () => d("8px 16px") },
        { key: "padding-12px 24px", label: "Default", onClick: () => d("12px 24px") },
        { key: "padding-16px 32px", label: "Large", onClick: () => d("16px 32px") },
        { key: "padding-20px 40px", label: "Extra Large", onClick: () => d("20px 40px") }
      ]
    },
    {
      key: "align",
      label: L(/* @__PURE__ */ e(fe, {}), "Align"),
      children: [
        { key: "align-left", label: L(/* @__PURE__ */ e(dt, {}), "Left"), onClick: () => m("left") },
        { key: "align-center", label: L(/* @__PURE__ */ e(fe, {}), "Center"), onClick: () => m("center") },
        { key: "align-right", label: L(/* @__PURE__ */ e(ut, {}), "Right"), onClick: () => m("right") }
      ]
    },
    { type: "divider" },
    { key: "remove-bg", label: L(/* @__PURE__ */ e(Ne, {}), "Remove Background"), onClick: o },
    { key: "remove-border", label: L(/* @__PURE__ */ e(Ne, {}), "Remove Border"), onClick: r },
    { key: "remove-padding", label: L(/* @__PURE__ */ e(Ne, {}), "Remove Padding"), onClick: l },
    { type: "divider" },
    { key: "delete", label: L(/* @__PURE__ */ e(Me, {}), "Delete Button"), danger: !0, onClick: t }
  ]
}), pn = (t, o, r) => ({
  items: [
    { key: "edit-link", label: L(/* @__PURE__ */ e(rn, {}), "Edit Link"), onClick: t },
    {
      key: "text-color",
      label: L(/* @__PURE__ */ e(ct, {}), "Text Color"),
      children: [
        { key: "text-#0ea5e9", label: B("#0ea5e9", "Blue"), onClick: () => r("#0ea5e9") },
        { key: "text-#10b981", label: B("#10b981", "Green"), onClick: () => r("#10b981") },
        { key: "text-#ef4444", label: B("#ef4444", "Red"), onClick: () => r("#ef4444") },
        { key: "text-#f59e0b", label: B("#f59e0b", "Orange"), onClick: () => r("#f59e0b") },
        { key: "text-#8b5cf6", label: B("#8b5cf6", "Purple"), onClick: () => r("#8b5cf6") },
        { key: "text-#000000", label: B("#000000", "Black"), onClick: () => r("#000000") }
      ]
    },
    { type: "divider" },
    { key: "delete", label: L(/* @__PURE__ */ e(Me, {}), "Remove Link"), danger: !0, onClick: o }
  ]
}), gn = [
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
], yn = (t) => ({
  items: gn.map((o) => ({
    key: o.value,
    label: /* @__PURE__ */ e("span", { style: { fontFamily: o.value }, children: o.label })
  })),
  onClick: ({ key: o }) => {
    t(o);
  }
}), Y = new Gt({
  strictVariables: !1,
  strictFilters: !1
});
function me(t) {
  const o = Number(t);
  return Number.isFinite(o) ? o : 0;
}
const ie = { minimumFractionDigits: 2, maximumFractionDigits: 2 }, Le = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
function oe(t, o) {
  return new Intl.NumberFormat("en-US", o).format(t);
}
Y.registerFilter("money", (t, o) => {
  const r = me(t);
  if (!o) return oe(r, ie);
  try {
    return new Intl.NumberFormat("en-US", {
      ...ie,
      style: "currency",
      currency: o,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${o} ${oe(r, ie)}`;
  }
});
Y.registerFilter("money_with_currency", (t, o) => {
  const r = me(t);
  return o ? `${o} ${oe(r, ie)}` : oe(r, ie);
});
Y.registerFilter("money_no_decimals", (t, o) => {
  const r = me(t);
  if (!o) return oe(r, Le);
  try {
    return new Intl.NumberFormat("en-US", {
      ...Le,
      style: "currency",
      currency: o,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${o} ${oe(r, Le)}`;
  }
});
Y.registerFilter("number", (t) => new Intl.NumberFormat("en-US").format(me(t)));
const xn = Y.filters.date;
Y.registerFilter("date", function(t, o) {
  return t == null || t === "" ? "" : xn.call(this, t, o);
});
const Lo = [
  "USD",
  "EUR",
  "GBP",
  "NGN",
  "CAD",
  "AUD",
  "JPY",
  "INR"
], bn = /* @__PURE__ */ new Set([
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
]), wn = new Set(Yt().filter((t) => !bn.has(t)));
function kn(t) {
  return t ? wn.has(t.toUpperCase()) : !1;
}
function vn(t) {
  const o = /\|\s*(?:money|money_with_currency|money_no_decimals)\s*:\s*["']([^"']+)["']/g, r = [];
  let l;
  for (; (l = o.exec(t)) !== null; )
    r.push(l[1].toUpperCase());
  return r;
}
function Cn(t) {
  return vn(t).filter((r) => !kn(r));
}
const Nn = ".rsw-editor .rsw-ce";
function Io(t) {
  const o = [...new Set(Cn(t))];
  return o.length === 0 ? null : `Invalid currency code${o.length > 1 ? "s" : ""}: ${o.join(", ")}. Messages may render with incorrect formatting.`;
}
function Eo(t) {
  try {
    return Y.parse(t), { valid: !0 };
  } catch (o) {
    return { valid: !1, error: o };
  }
}
function Ln(t, o) {
  const r = new DOMParser(), l = r.parseFromString(t, "text/html"), s = r.parseFromString(o, "text/html");
  return l.body.innerHTML = s.body.innerHTML, s.head.querySelectorAll("style").forEach((u) => {
    Array.from(l.head.querySelectorAll("style")).some(
      (m) => m.innerHTML === u.innerHTML
    ) || l.head.appendChild(u.cloneNode(!0));
  }), `<!DOCTYPE html>
` + l.documentElement.outerHTML;
}
function Mo(t) {
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
function X() {
  return typeof document > "u" ? null : document.querySelector(Nn);
}
function In(t) {
  var l;
  if (!t || typeof document > "u") return;
  const o = window.getSelection();
  if (!o) return;
  const r = document.createRange();
  r.setStartAfter(t), r.collapse(!0), o.removeAllRanges(), o.addRange(r), (l = t.parentNode) == null || l.removeChild(t);
}
function Ie(t, o) {
  var z;
  const r = X();
  if (!r) return;
  const l = window.getSelection();
  if (!l || l.rangeCount === 0) return;
  const s = l.getRangeAt(0);
  if (!r.contains(s.commonAncestorContainer)) return;
  const c = /* @__PURE__ */ new Set(["p", "div", "li", "section", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre"]), u = (v) => {
    for (; v && v !== r; ) {
      if (v instanceof HTMLElement) {
        const ee = v.tagName.toLowerCase(), H = window.getComputedStyle(v).display;
        if (c.has(ee) || H === "block" || H === "list-item" || H === "table")
          return v;
      }
      v = v.parentNode;
    }
    return null;
  }, d = /* @__PURE__ */ new Set(), m = u(s.startContainer);
  m && d.add(m);
  const k = u(s.endContainer);
  k && d.add(k);
  const A = document.createTreeWalker(
    s.commonAncestorContainer,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(v) {
        return s.intersectsNode(v) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    }
  );
  let I = A.nextNode();
  for (; I; ) {
    const v = u(I);
    v && d.add(v), I = A.nextNode();
  }
  let R = null;
  if (d.forEach((v) => {
    v.style.textAlign = t, R = v;
  }), R) {
    const v = document.createRange();
    v.selectNodeContents(R), v.collapse(!1), l.removeAllRanges(), l.addRange(v), (z = R.focus) == null || z.call(R), r.focus();
  }
  o(r.innerHTML);
}
function P(t) {
  const o = X();
  o && (t(o.innerHTML), o.dispatchEvent(new Event("input", { bubbles: !0 })));
}
function En(t, o, r) {
  const l = X();
  if (!l) return;
  t.style.outline = "";
  const s = t.closest("div");
  s && s.parentElement === l ? s.remove() : t.remove(), P(o), r == null || r();
}
function Mn(t, o, r, l) {
  t && (t.style.width = o, t.removeAttribute("width"), t.style.outline = "", P(r), l == null || l());
}
function Sn(t, o, r, l) {
  t && (t.style.display = "", t.style.margin = "", o === "left" ? (t.style.display = "block", t.style.margin = "0 auto 0 0") : o === "center" ? (t.style.display = "block", t.style.margin = "0 auto") : o === "right" && (t.style.display = "block", t.style.margin = "0 0 0 auto"), t.style.outline = "", P(r), l == null || l());
}
const Rn = (t, o, r, l, s) => {
  if (typeof document < "u") {
    const c = X();
    if (c) {
      if (s) {
        const d = window.getSelection();
        d == null || d.removeAllRanges(), d == null || d.addRange(s);
      }
      document.execCommand("foreColor", !1, t);
      const u = c.innerHTML;
      o(u), r(u), l(!0);
    }
  }
}, An = (t) => {
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
}, Tn = (t, o, r, l, s) => {
  const c = X();
  if (!c) return;
  if (s) {
    const d = window.getSelection();
    d == null || d.removeAllRanges(), d == null || d.addRange(s);
  }
  document.execCommand("fontName", !1, t);
  const u = c.innerHTML;
  o(u), r(u), l(!0);
};
function J(t, o, r) {
  t.style.outline = "", P(o), r == null || r();
}
function Bn(t, o, r, l) {
  t && (t.style.backgroundColor = o, t.style.border = "none", J(t, r, l));
}
function lt(t, o, r, l) {
  t && (t.style.color = o, J(t, r, l));
}
function Dn(t, o, r, l) {
  t && (t.style.borderRadius = o, J(t, r, l));
}
function Hn(t, o, r, l) {
  if (!t) return;
  const s = t.closest("div");
  s && (s.style.textAlign = o, J(t, r, l));
}
function Fn(t, o, r, l) {
  t && (t.style.padding = o, J(t, r, l));
}
function Pn(t, o, r) {
  const l = X();
  if (!l) return;
  t.style.outline = "";
  const s = t.closest("[data-editor-button-wrapper='true']");
  s && l.contains(s) ? s.remove() : t.remove(), P(o), r == null || r();
}
function Wn(t, o, r) {
  t && (t.style.color = "#000000", t.style.backgroundColor = "transparent", t.style.border = "2px solid #000000", J(t, o, r));
}
function Un(t, o, r) {
  t && (t.style.border = "none", J(t, o, r));
}
function On(t, o, r) {
  t && (t.style.padding = "0", J(t, o, r));
}
function jn(t, o, r, l) {
  t.src = o, t.style.outline = "", P(r), l == null || l();
}
function qn(t, o, r, l) {
  const s = X();
  if (!s) return;
  s.focus();
  const c = window.getSelection();
  if (r.current && (c == null || c.removeAllRanges(), c == null || c.addRange(r.current), r.current = null), !c || c.rangeCount === 0) return;
  const u = c.getRangeAt(0);
  if (!s.contains(u.commonAncestorContainer)) return;
  u.deleteContents();
  const d = document.createElement("div");
  d.style.textAlign = "center", d.style.margin = "1rem 0";
  const m = document.createElement("img");
  m.src = t, m.alt = "Inserted image", m.style.display = "block", m.style.margin = "1rem auto", m.style.width = "100%", m.style.height = "auto", m.style.objectFit = "contain", m.style.borderRadius = "2px", d.appendChild(m);
  const k = document.createElement("p"), A = document.createTextNode(" ");
  k.appendChild(A), u.insertNode(d), u.insertNode(k), u.collapse();
  const I = document.createRange();
  I.setStart(A, 0), I.collapse(!0), c.removeAllRanges(), c.addRange(I), k.scrollIntoView({ behavior: "smooth", block: "center" });
  const R = s.innerHTML;
  o(R), l == null || l(R);
}
const _n = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
`;
function Xn(t, o, r, l, s) {
  const c = X();
  if (!c) return;
  c.focus();
  const u = window.getSelection();
  if (l.current && (u == null || u.removeAllRanges(), u == null || u.addRange(l.current), l.current = null), !u || u.rangeCount === 0) return;
  const d = u.getRangeAt(0);
  if (!c.contains(d.commonAncestorContainer)) return;
  d.deleteContents();
  const m = document.createElement("div");
  m.contentEditable = "false", m.style.textAlign = "center", m.style.margin = "20px 0", m.style.userSelect = "none", m.setAttribute("data-editor-button-wrapper", "true");
  const k = document.createElement("a");
  k.href = o, k.textContent = t, k.style.cssText = _n, k.setAttribute("target", "_blank"), k.setAttribute("rel", "noopener noreferrer"), m.appendChild(k);
  const A = document.createElement("p");
  A.innerHTML = "<br>", d.insertNode(m), d.insertNode(A), d.setStartAfter(A), d.collapse(!0), u.removeAllRanges(), u.addRange(d);
  const I = c.innerHTML;
  r(I), s == null || s(I);
}
function zn(t, o, r) {
  const l = X();
  if (!l) return;
  const s = window.getSelection();
  if (!s || s.rangeCount === 0) return;
  const c = s.getRangeAt(0);
  if (!l.contains(c.commonAncestorContainer)) return;
  c.deleteContents();
  const u = document.createTextNode(t);
  c.insertNode(u), c.setStartAfter(u), c.setEndAfter(u), s.removeAllRanges(), s.addRange(c), o(l.innerHTML), r == null || r();
}
function $n(t) {
  return Jt(t, {
    removeStyleTags: !0,
    applyAttributesTableElements: !0,
    preserveImportant: !0
  });
}
function Vn(t) {
  return new DOMParser().parseFromString(t, "text/html").querySelectorAll("style").length > 0;
}
const Gn = () => /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M3 7v6h6" }),
  /* @__PURE__ */ e("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" })
] }), Yn = () => /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M21 7v6h-6" }),
  /* @__PURE__ */ e("path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" })
] }), Jn = () => /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" }),
  /* @__PURE__ */ e("path", { d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" })
] }), Kn = () => /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "19", y1: "4", x2: "10", y2: "4" }),
  /* @__PURE__ */ e("line", { x1: "14", y1: "20", x2: "5", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "4", x2: "9", y2: "20" })
] }), Zn = () => /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "21", x2: "20", y2: "21" })
] }), Qn = () => /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 6.5 3.9h.2m6.2 3.8c.2.5.3 1.1.3 1.7 0 4-3.3 4.7-7 4.7-3.5 0-5.5-.5-7.5-2" }),
  /* @__PURE__ */ e("line", { x1: "2", y1: "12", x2: "22", y2: "12" })
] }), eo = () => /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "10", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "18", x2: "21", y2: "18" }),
  /* @__PURE__ */ e("path", { d: "M4 6h1v4" }),
  /* @__PURE__ */ e("path", { d: "M4 10h2" }),
  /* @__PURE__ */ e("path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" })
] }), to = () => /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "9", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "12", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "18", r: "1", fill: "currentColor", stroke: "none" })
] }), no = () => /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
  /* @__PURE__ */ e("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
] }), oo = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H1" }), ro = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H2" }), lo = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H3" }), io = () => /* @__PURE__ */ e(
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
), so = () => /* @__PURE__ */ e(
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
), ao = () => /* @__PURE__ */ e(
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
), co = () => /* @__PURE__ */ e(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ a(
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
), uo = () => /* @__PURE__ */ a(
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
), fo = () => /* @__PURE__ */ e("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ e("polyline", { points: "6 9 12 15 18 9" }) }), mo = () => /* @__PURE__ */ a("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ e("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  /* @__PURE__ */ e("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
] }), ho = () => /* @__PURE__ */ a("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("polyline", { points: "16 18 22 12 16 6" }),
  /* @__PURE__ */ e("polyline", { points: "8 6 2 12 8 18" })
] }), po = () => /* @__PURE__ */ a("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2", ry: "2" }),
  /* @__PURE__ */ e("circle", { cx: "12", cy: "17", r: "1", fill: "currentColor", stroke: "none" })
] }), go = ({
  value: t = "",
  onChange: o,
  readOnly: r = !1,
  placeholder: l,
  onFetchImages: s,
  onUploadImage: c,
  onDeleteImage: u,
  enablePreview: d = !0,
  enableCodeEditor: m = !0,
  height: k = 500,
  className: A = "",
  previewData: I,
  toolbarContent: R,
  showCodeEditor: z,
  onShowCodeEditorChange: v,
  showPreview: ee,
  onShowPreviewChange: H,
  hideViewToggles: re = !1,
  onOpenImageModal: $
}, se) => {
  const [_, le] = p(t), [K, Z] = p(t), [b, g] = p(t), [te, V] = p(b), [ft, mt] = p(!1), [ht, pt] = p(!1), gt = z !== void 0, yt = ee !== void 0, O = gt ? z : ht, W = yt ? ee : ft, Se = (n) => {
    const i = typeof n == "function" ? n(O) : n;
    v ? v(i) : pt(i);
  }, Re = (n) => {
    const i = typeof n == "function" ? n(W) : n;
    H ? H(i) : mt(i);
  }, [xt, Ae] = p(!1), [bt, ae] = p(!1), [wt, he] = p(!1), [kt, pe] = p(!1), [Te, ge] = p(null), [E, Q] = p(null), [Be, vt] = p({ top: 0, left: 0 }), [q, ye] = p(null), [j, xe] = p(null), [be, ce] = p(null), [De, Ct] = p(null), [Nt, we] = p(!1), [He, Fe] = p("#000000"), [Pe, We] = p("#000000"), [Lt, Ue] = p([]), [It, Oe] = p(null), [Et, je] = p(!1), [Mt, qe] = p(!1), [St, _e] = p(!1), [Rt, Xe] = p(!1), [C, ne] = p(null), [ze, At] = p({ top: 0, left: 0 }), [f, T] = p(null), [$e, Tt] = p({ top: 0, left: 0 }), [Ve, Bt] = p({ top: 0, left: 0 }), Ge = Ee(null), de = Ee(null);
  F(() => {
    t !== K && (le(t), Z(t), g(t));
  }, [t]), F(() => {
    const n = document.querySelector(".rsw-editor .rsw-ce");
    if (!n) return;
    const i = n.querySelector("#selection-marker");
    i && In(i);
  }, [K]), F(() => {
    let n = null;
    const i = (y) => {
      const h = y.target;
      if (!h) return;
      const x = h.closest(".rsw-editor .rsw-ce img"), w = document.querySelector(".rsw-editor .rsw-ce");
      x && (w != null && w.contains(x)) ? (n && n !== x && (n.style.outline = "none"), x.style.outline = "2px solid red", n = x, ne({ element: x, x: y.clientX, y: y.clientY })) : (n && (n.style.outline = "none", n = null), ne(null));
    };
    return document.addEventListener("click", i), () => document.removeEventListener("click", i);
  }, []), F(() => {
    let n = null, i = null;
    const y = (h) => {
      const x = h.target;
      if (!x) return;
      const w = x.closest(".rsw-editor .rsw-ce a"), S = document.querySelector(".rsw-editor .rsw-ce");
      w && (S != null && S.contains(w)) ? (h.preventDefault(), !!w.closest("[data-editor-button-wrapper='true']") || !!w.style.backgroundColor && !!w.style.padding ? (i && (i.style.outline = "none", i = null), Q(null), n && n !== w && (n.style.outline = "none", n.style.boxShadow = ""), w.style.outline = "3px solid #4f46e5", w.style.boxShadow = "0 0 0 5px rgba(79,70,229,0.18)", n = w, T({ element: w, x: h.clientX, y: h.clientY })) : (n && (n.style.outline = "none", n.style.boxShadow = "", n = null), T(null), i && i !== w && (i.style.outline = "none"), w.style.outline = "2px solid #0ea5e9", i = w, Q({ element: w, x: h.clientX, y: h.clientY }))) : (n && (n.style.outline = "none", n.style.boxShadow = "", n = null), i && (i.style.outline = "none", i = null), T(null), Q(null));
    };
    return document.addEventListener("click", y), () => document.removeEventListener("click", y);
  }, []), F(() => {
    const n = () => {
      const i = Ge.current, y = window.getSelection();
      if (!y || !i || !i.contains(y.anchorNode)) {
        Ue([]), Oe(null), je(!1), qe(!1), _e(!1), Xe(!1);
        return;
      }
      const h = y.getRangeAt(0);
      Ue(y.isCollapsed ? [] : Array.from(h.getClientRects()));
      let x = y.anchorNode;
      if ((x == null ? void 0 : x.nodeType) === Node.TEXT_NODE && (x = x.parentElement), x instanceof HTMLElement) {
        Fe(An(window.getComputedStyle(x).color));
        const w = x.closest("h1, h2, h3");
        Oe(w ? w.tagName.toLowerCase() : null), je(document.queryCommandState("bold")), qe(document.queryCommandState("italic")), _e(document.queryCommandState("underline")), Xe(document.queryCommandState("strikeThrough"));
      }
    };
    return document.addEventListener("selectionchange", n), window.addEventListener("scroll", n, !0), () => {
      document.removeEventListener("selectionchange", n), window.removeEventListener("scroll", n, !0);
    };
  }, []), F(() => {
    if (!(C != null && C.element)) return;
    const n = C.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const y = n.getBoundingClientRect(), h = i.getBoundingClientRect(), x = 150, w = 50;
    let S = y.top - h.top, M = y.right - h.left + 8;
    M + x > h.width && (M = y.left - h.left - x - 8), S + w > h.height && (S = h.height - w - 8), S < 0 && (S = 8), M < 0 && (M = 8), At({ top: S, left: M });
  }, [C == null ? void 0 : C.element]), F(() => {
    if (!(f != null && f.element)) return;
    const n = f.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const y = n.getBoundingClientRect(), h = i.getBoundingClientRect(), x = 100, w = 200;
    let S = y.top - h.top, M = y.right - h.left + x;
    M + w > h.width && (M = y.left - h.left - w - x), M < x && (M = x), S < x && (S = x), Tt({ top: S, left: M }), Bt({
      top: Math.max(4, y.top - h.top - 26),
      left: y.left - h.left + y.width / 2
    });
  }, [f]), F(() => {
    if (!(E != null && E.element)) return;
    const n = E.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const y = n.getBoundingClientRect(), h = i.getBoundingClientRect(), x = 8, w = 200;
    let S = y.bottom - h.top + x, M = y.left - h.left;
    M + w > h.width && (M = h.width - w - x), M < x && (M = x), S + 100 > h.height && (S = y.top - h.top - 100), vt({ top: S, left: M });
  }, [E]);
  const ke = I != null && Object.keys(I).length > 0;
  F(() => {
    if (!W || !ke) {
      V(b);
      return;
    }
    V(b), Y.parseAndRender(b, I).then(V).catch(() => V(b));
  }, [W, ke, b, I]);
  const Dt = ot(() => Vn(_), [_]), { wordCount: Ye, charCount: Je } = ot(() => {
    const n = _.replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
    return { wordCount: n.length === 0 ? 0 : n.split(" ").filter(Boolean).length, charCount: n.replace(/ /g, "").length };
  }, [_]), G = (n) => {
    le(n);
    const i = Ln(K, n);
    Z(i), g(i), o == null || o(i);
  }, Ke = () => {
    const n = window.getSelection();
    n && n.rangeCount > 0 && Ct(n.getRangeAt(0).cloneRange());
  }, Ze = (n) => {
    Rn(n, G, g, () => {
    }, De), Fe(n), we(!1);
  }, Ht = (n) => {
    Tn(n, G, g, () => {
    }, De);
  }, Qe = () => {
    try {
      const n = $n(_);
      le(n), Z(n), g(n), o == null || o(n), rt.success("CSS inlined successfully!");
    } catch {
      rt.error("Failed to inline CSS.");
    }
  }, et = () => {
    if (!be) {
      const n = document.querySelector(".rsw-editor .rsw-ce");
      if (n) {
        const i = window.getSelection();
        if (i && i.rangeCount > 0) {
          const y = i.getRangeAt(0);
          n.contains(y.commonAncestorContainer) && (de.current = y.cloneRange());
        }
      }
    }
    $ ? $() : Ae(!0);
  }, tt = (n) => {
    if (be) {
      jn(be, n, g, () => ce(null));
      return;
    }
    qn(n, g, de);
  }, Ft = () => {
    const n = window.getSelection();
    n && n.rangeCount > 0 && (de.current = n.getRangeAt(0).cloneRange()), ae(!0);
  }, Pt = (n) => {
    const { buttonText: i, buttonUrl: y } = n;
    !i || !y || (j ? (j.textContent = i, j.href = y, j.style.outline = "", P(g), xe(null)) : Xn(i, y, g, de, G), ae(!1));
  };
  zt(se, () => ({
    insert: (n) => {
      zn(n, g);
    },
    inlineCss: () => Qe(),
    insertImage: (n) => tt(n),
    clearImageToReplace: () => ce(null)
  }));
  const Wt = mn(
    () => {
      C != null && C.element && (ce(C.element), et());
    },
    () => (C == null ? void 0 : C.element) && En(C.element, g, () => ne(null)),
    (n) => (C == null ? void 0 : C.element) && Sn(C.element, n, g, () => ne(null)),
    (n) => (C == null ? void 0 : C.element) && Mn(C.element, n, g, () => ne(null))
  ), Ut = () => {
    f != null && f.element && (xe(f.element), T(null), ae(!0));
  }, Ot = (() => {
    const n = hn(
      () => (f == null ? void 0 : f.element) && Pn(f.element, g, () => T(null)),
      () => (f == null ? void 0 : f.element) && Wn(f.element, g, () => T(null)),
      () => (f == null ? void 0 : f.element) && Un(f.element, g, () => T(null)),
      () => (f == null ? void 0 : f.element) && On(f.element, g, () => T(null)),
      (i) => (f == null ? void 0 : f.element) && Bn(f.element, i, g, () => T(null)),
      (i) => (f == null ? void 0 : f.element) && lt(f.element, i, g, () => T(null)),
      (i) => (f == null ? void 0 : f.element) && Dn(f.element, i, g, () => T(null)),
      (i) => (f == null ? void 0 : f.element) && Fn(f.element, i, g, () => T(null)),
      (i) => (f == null ? void 0 : f.element) && Hn(f.element, i, g, () => T(null))
    );
    return {
      ...n,
      items: [
        { key: "edit-button", label: /* @__PURE__ */ a("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ a("svg", { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", flexShrink: 0 }, children: [
            /* @__PURE__ */ e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
            /* @__PURE__ */ e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
          ] }),
          "Edit Button"
        ] }), onClick: Ut },
        { type: "divider" },
        ...n.items ?? []
      ]
    };
  })(), jt = pn(
    () => {
      E != null && E.element && (ye(E.element), Q(null), pe(!0));
    },
    () => {
      E != null && E.element && (E.element.style.outline = "", E.element.replaceWith(...Array.from(E.element.childNodes)), P(g), Q(null));
    },
    (n) => (E == null ? void 0 : E.element) && lt(E.element, n, g, () => Q(null))
  );
  fn(Ze);
  const qt = yn(Ht), nt = typeof k == "number" ? `${k}px` : k;
  return /* @__PURE__ */ a("div", { className: `bg-white border rounded-xl overflow-hidden flex flex-col ${A}`, style: { minWidth: 400 }, children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: `bg-white flex flex-col ${r && !O && !W ? "pointer-events-none opacity-50" : ""}`,
        style: { boxShadow: "0 1px 0 #e5e7eb" },
        children: [
          !O && !W && /* @__PURE__ */ a("div", { className: "flex items-center gap-0.5 px-2 pt-1.5 pb-1 overflow-x-auto", style: { scrollbarWidth: "none" }, children: [
            /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(N, { title: "Undo", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("undo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Gn, {}) }) }),
              /* @__PURE__ */ e(N, { title: "Redo", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("redo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Yn, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: ["h1", "h2", "h3"].map((n, i) => {
              const y = [oo, ro, lo][i], h = It === n;
              return /* @__PURE__ */ e(N, { title: h ? "Remove heading" : `Heading ${i + 1}`, children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (x) => {
                    x.preventDefault(), document.execCommand("formatBlock", !1, h ? "p" : n), setTimeout(() => P(g), 0);
                  },
                  className: "toolbar-btn",
                  style: h ? { background: "#1e293b", color: "#fff", borderColor: "#1e293b" } : void 0,
                  children: /* @__PURE__ */ e(y, {})
                }
              ) }, n);
            }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(N, { title: "Bold (Ctrl+B)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("bold");
              }, className: "toolbar-btn", style: Et ? { background: "#1e293b", color: "#fff", borderColor: "#1e293b" } : void 0, children: /* @__PURE__ */ e(Jn, {}) }) }),
              /* @__PURE__ */ e(N, { title: "Italic (Ctrl+I)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("italic");
              }, className: "toolbar-btn", style: Mt ? { background: "#1e293b", color: "#fff", borderColor: "#1e293b" } : void 0, children: /* @__PURE__ */ e(Kn, {}) }) }),
              /* @__PURE__ */ e(N, { title: "Underline (Ctrl+U)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("underline");
              }, className: "toolbar-btn", style: St ? { background: "#1e293b", color: "#fff", borderColor: "#1e293b" } : void 0, children: /* @__PURE__ */ e(Zn, {}) }) }),
              /* @__PURE__ */ e(N, { title: "Strikethrough", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("strikeThrough");
              }, className: "toolbar-btn", style: Rt ? { background: "#1e293b", color: "#fff", borderColor: "#1e293b" } : void 0, children: /* @__PURE__ */ e(Qn, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(N, { title: "Numbered List", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("insertOrderedList"), setTimeout(() => P(g), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(eo, {}) }) }),
              /* @__PURE__ */ e(N, { title: "Bullet List", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("insertUnorderedList"), setTimeout(() => P(g), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(to, {}) }) }),
              /* @__PURE__ */ e(N, { title: "Insert Link", children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (n) => {
                    n.preventDefault();
                    const i = window.getSelection();
                    i && i.rangeCount > 0 && ge(i.getRangeAt(0).cloneRange()), he(!0);
                  },
                  className: "toolbar-btn",
                  children: /* @__PURE__ */ e(no, {})
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "flex items-center gap-0.5 px-2 py-1.5 overflow-x-auto", style: { scrollbarWidth: "none" }, children: [
            !O && !W && /* @__PURE__ */ a(D, { children: [
              /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ e(N, { title: "Align Left", children: /* @__PURE__ */ e("button", { onClick: () => Ie("left", G), className: "toolbar-btn", children: /* @__PURE__ */ e(io, {}) }) }),
                /* @__PURE__ */ e(N, { title: "Align Center", children: /* @__PURE__ */ e("button", { onClick: () => Ie("center", G), className: "toolbar-btn", children: /* @__PURE__ */ e(so, {}) }) }),
                /* @__PURE__ */ e(N, { title: "Align Right", children: /* @__PURE__ */ e("button", { onClick: () => Ie("right", G), className: "toolbar-btn", children: /* @__PURE__ */ e(ao, {}) }) })
              ] }),
              /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
              /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ e(N, { title: "Insert Image", children: /* @__PURE__ */ e("button", { onClick: et, className: "toolbar-btn", children: /* @__PURE__ */ e(co, {}) }) }),
                /* @__PURE__ */ e(N, { title: "Insert Button", children: /* @__PURE__ */ e("button", { onClick: Ft, className: "toolbar-btn", children: /* @__PURE__ */ e(uo, {}) }) })
              ] }),
              /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
              /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(N, { title: "Text Color", children: /* @__PURE__ */ e(
                Vt,
                {
                  value: Pe,
                  open: Nt,
                  onOpenChange: (n) => {
                    we(n), n && (Ke(), We(He));
                  },
                  onChange: (n) => We(n.toHexString()),
                  panelRender: (n) => /* @__PURE__ */ a("div", { children: [
                    n,
                    /* @__PURE__ */ e(
                      "button",
                      {
                        className: "border text-xs px-2 py-1 mt-1 rounded hover:bg-gray-50",
                        onClick: () => {
                          Ze(Pe), we(!1);
                        },
                        children: "Apply"
                      }
                    )
                  ] }),
                  children: /* @__PURE__ */ e("button", { type: "button", className: "toolbar-btn", children: /* @__PURE__ */ e("div", { style: { width: 18, height: 18, backgroundColor: He, borderRadius: 2, border: "1px solid #e5e7eb" } }) })
                }
              ) }) }),
              /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(N, { title: "Font Family", children: /* @__PURE__ */ e(ue, { menu: qt, trigger: ["click"], onOpenChange: (n) => {
                n && Ke();
              }, children: /* @__PURE__ */ a("button", { className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
                "Aa ",
                /* @__PURE__ */ e(fo, {})
              ] }) }) }) })
            ] }),
            !re && O && Dt && /* @__PURE__ */ e(N, { title: "Inline all <style> tags into element attributes for email clients", children: /* @__PURE__ */ a(
              "button",
              {
                onClick: Qe,
                className: "flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-white animate-pulse flex-shrink-0",
                children: [
                  /* @__PURE__ */ e(mo, {}),
                  " Inline CSS"
                ]
              }
            ) }),
            !re && /* @__PURE__ */ a("div", { className: "ml-auto flex items-center gap-1 flex-shrink-0", children: [
              m && /* @__PURE__ */ e(N, { title: "Toggle HTML source editor", children: /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => {
                    Se((n) => !n), Re(!1);
                  },
                  className: `flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${O ? "bg-gray-800 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`,
                  children: [
                    /* @__PURE__ */ e(ho, {}),
                    O ? "Editor" : "HTML"
                  ]
                }
              ) }),
              d && /* @__PURE__ */ e(N, { title: "Toggle phone preview", children: /* @__PURE__ */ a(
                "button",
                {
                  onClick: () => {
                    Re((n) => !n), Se(!1);
                  },
                  className: `flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${W ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`,
                  children: [
                    /* @__PURE__ */ e(po, {}),
                    W ? "Close" : "Preview"
                  ]
                }
              ) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex flex-1 min-h-0", style: { height: nt }, children: /* @__PURE__ */ e(
      "div",
      {
        className: "flex-1 relative overflow-hidden min-h-0",
        style: O || W ? { minHeight: 300 } : void 0,
        children: W ? /* @__PURE__ */ e("div", { className: "h-full overflow-y-auto flex items-start justify-center p-4 bg-gray-100", children: /* @__PURE__ */ e(nn, { srcDoc: ke ? te : b }) }) : O ? /* @__PURE__ */ e(
          tn,
          {
            height: nt,
            defaultLanguage: "html",
            defaultValue: K,
            onChange: (n) => G(n ?? ""),
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
        ) : /* @__PURE__ */ a("div", { className: "relative h-full", ref: Ge, children: [
          /* @__PURE__ */ e(
            Zt,
            {
              value: _,
              onChange: (n) => G(n.target.value),
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
          C && /* @__PURE__ */ e("div", { style: { position: "absolute", top: ze.top - 100, left: ze.left - 100, zIndex: 1e3, width: 150 }, children: /* @__PURE__ */ e(ue, { menu: Wt, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || ne(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          f && /* @__PURE__ */ e("div", { style: { position: "absolute", top: $e.top, left: $e.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(ue, { menu: Ot, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || T(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          f && /* @__PURE__ */ e(
            "div",
            {
              style: {
                position: "absolute",
                top: Ve.top,
                left: Ve.left,
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
          E && /* @__PURE__ */ e("div", { style: { position: "absolute", top: Be.top, left: Be.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(ue, { menu: jt, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || (E.element.style.outline = "none", Q(null));
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          Lt.map((n, i) => /* @__PURE__ */ e(
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
    /* @__PURE__ */ a(
      "div",
      {
        className: "flex items-center justify-between px-4 bg-white select-none",
        style: { borderTop: "1px solid #e5e7eb", minHeight: 28 },
        children: [
          /* @__PURE__ */ e("span", { className: "text-xs", style: { color: "#cbd5e1" }, children: O ? "HTML source" : W ? "Phone preview" : "Rich text" }),
          !O && !W && /* @__PURE__ */ e(N, { title: `${Je.toLocaleString()} characters`, children: /* @__PURE__ */ a("span", { className: "text-xs tabular-nums cursor-default", style: { color: "#cbd5e1" }, children: [
            Ye.toLocaleString(),
            " ",
            Ye === 1 ? "word" : "words",
            " · ",
            Je.toLocaleString(),
            " chars"
          ] }) })
        ]
      }
    ),
    !$ && /* @__PURE__ */ e(
      on,
      {
        show: xt,
        onClose: () => {
          Ae(!1), ce(null);
        },
        onSelectImage: tt,
        onFetchImages: s,
        onUploadImage: c,
        onDeleteImage: u
      }
    ),
    /* @__PURE__ */ e(
      Ce,
      {
        show: bt,
        title: j ? "Edit Button" : "Insert Button",
        fields: [
          { name: "buttonText", label: "Button Text", placeholder: "Click Here", defaultValue: (j == null ? void 0 : j.textContent) ?? "" },
          { name: "buttonUrl", label: "Button URL", placeholder: "https://", defaultValue: (j == null ? void 0 : j.getAttribute("href")) ?? "" }
        ],
        onConfirm: Pt,
        onClose: () => {
          ae(!1), xe(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      Ce,
      {
        show: kt,
        title: "Edit Link",
        fields: [
          { name: "linkText", label: "Link Text", placeholder: "Click here", defaultValue: (q == null ? void 0 : q.textContent) ?? "", required: !0 },
          { name: "url", label: "URL", placeholder: "https://", defaultValue: (q == null ? void 0 : q.getAttribute("href")) ?? "", required: !0 }
        ],
        onConfirm: ({ linkText: n, url: i }) => {
          q && (q.textContent = n, q.href = i, q.style.outline = "", P(g), ye(null)), pe(!1);
        },
        onClose: () => {
          pe(!1), ye(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      Ce,
      {
        show: wt,
        title: "Insert Link",
        fields: [
          { name: "url", label: "URL", placeholder: "https://", required: !0 },
          { name: "linkText", label: "Link Text", placeholder: "Displayed text (optional)", required: !1 }
        ],
        onConfirm: ({ url: n, linkText: i }) => {
          var S, M;
          he(!1);
          const y = document.querySelector(".rsw-editor .rsw-ce");
          if (!y || !n) return;
          y.focus();
          const h = window.getSelection();
          Te && (h == null || h.removeAllRanges(), h == null || h.addRange(Te)), document.execCommand("createLink", !1, n);
          const x = window.getSelection(), w = (M = (S = x == null ? void 0 : x.anchorNode) == null ? void 0 : S.parentElement) == null ? void 0 : M.closest("a");
          w && (w.style.color = "#0ea5e9", i && (w.textContent = i)), ge(null), setTimeout(() => P(g), 0);
        },
        onClose: () => {
          he(!1), ge(null);
        }
      }
    )
  ] });
}, So = Xt(
  go
);
function Ro() {
  const [t, o] = p(!0);
  return F(() => {
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
  So as CDPEditor,
  Lo as COMMON_CURRENCY_CODES,
  on as ImagePickerModal,
  Ce as InputModal,
  tn as MonacoEditorWrapper,
  nn as PhonePreview,
  wn as VALID_CURRENCY_CODES,
  Zt as WysiwygEditor,
  Tn as changeFontFamily,
  Rn as changeHighlightColor,
  So as default,
  $n as handleInlineCSS,
  Xn as insertButtonAtCursorInEditor,
  qn as insertImageAtCursorInEditor,
  zn as insertTextIntoEditorAtSelection,
  kn as isValidCurrencyCode,
  Y as liquidEngine,
  Vn as needsInliningDetailed,
  An as normalizeColor,
  Ln as replaceBodyContent,
  Ro as useOnlineStatus,
  Io as validateCurrencyCodes,
  Eo as validateLiquidTemplate,
  Mo as wrapEmailBodyHtml
};
//# sourceMappingURL=email-editor.es.js.map
