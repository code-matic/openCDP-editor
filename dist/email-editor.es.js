import { jsx as e, jsxs as f, Fragment as H } from "react/jsx-runtime";
import wn, { lazy as At, Suspense as Dt, useState as x, useEffect as R, useRef as de, forwardRef as kn, useMemo as vt, useCallback as Cn, useImperativeHandle as Nn } from "react";
import { createPortal as Ln } from "react-dom";
import { Form as Fe, Modal as Bt, Input as En, Tooltip as L, ColorPicker as Ft, Dropdown as ne } from "antd";
import { toast as wt } from "sonner";
import { Liquid as Sn } from "liquidjs";
import { codes as Mn } from "currency-codes";
import In from "juice";
const Tn = At(() => import("react-simple-wysiwyg")), Rn = ({
  value: t,
  onChange: n,
  placeholder: r,
  containerProps: l,
  disabled: a,
  onFocus: i,
  onBlur: d
}) => /* @__PURE__ */ e("div", { ...l, children: /* @__PURE__ */ e(Dt, { fallback: /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-100 animate-pulse rounded flex items-center justify-center text-gray-400 text-sm", children: "Loading editor…" }), children: /* @__PURE__ */ e(
  Tn,
  {
    value: t,
    onChange: n,
    placeholder: r,
    spellCheck: !1,
    disabled: a,
    onFocus: i,
    onBlur: d
  }
) }) }), An = At(() => import("@monaco-editor/react"));
function Dn(t) {
  typeof t.addAction == "function" && t.addAction({
    id: "editor.action.formatDocument.menu",
    label: "Format Document",
    contextMenuOrder: 1.5,
    run: (n) => {
      var l;
      const r = (l = n == null ? void 0 : n.getAction) == null ? void 0 : l.call(n, "editor.action.formatDocument");
      r != null && r.run && r.run();
    }
  });
}
const Bn = ({
  height: t = "100%",
  defaultLanguage: n = "html",
  defaultValue: r = "",
  onChange: l,
  theme: a = "vs-dark",
  options: i = {},
  className: d,
  onMount: u
}) => {
  const [m, y] = x(!1), N = wn.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (D) => {
      Dn(D), u == null || u(D);
    },
    [u]
  );
  R(() => {
    y(!0);
  }, []);
  const S = /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-900 rounded flex items-center justify-center text-gray-400 text-sm animate-pulse", children: "Loading code editor…" });
  return m ? /* @__PURE__ */ e("div", { className: d, children: /* @__PURE__ */ e(Dt, { fallback: S, children: /* @__PURE__ */ e(
    An,
    {
      height: t,
      defaultLanguage: n,
      defaultValue: r,
      onChange: l,
      theme: a,
      options: i,
      onMount: N
    }
  ) }) }) : S;
}, Fn = ({ srcDoc: t }) => /* @__PURE__ */ e("div", { className: "flex justify-center items-start", children: /* @__PURE__ */ e("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ f("div", { className: "relative !max-w-[340px] w-full !h-[640px] border-8 border-black rounded-[40px] overflow-hidden shadow-xl bg-black", children: [
  /* @__PURE__ */ f("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20 flex justify-center items-center", children: [
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
] }) }) }), He = ({ show: t, title: n, fields: r, onConfirm: l, onClose: a }) => {
  const [i] = Fe.useForm();
  return R(() => {
    if (t) {
      const m = {};
      r.forEach((y) => {
        y.defaultValue && (m[y.name] = y.defaultValue);
      }), i.setFieldsValue(m);
    }
  }, [t, i]), /* @__PURE__ */ e(
    Bt,
    {
      title: n,
      open: t,
      onOk: async () => {
        try {
          const m = await i.validateFields();
          l(m), i.resetFields();
        } catch {
        }
      },
      onCancel: () => {
        i.resetFields(), a();
      },
      okText: "Confirm",
      cancelText: "Cancel",
      destroyOnHidden: !0,
      children: /* @__PURE__ */ e(Fe, { form: i, layout: "vertical", className: "mt-4", children: r.map((m) => /* @__PURE__ */ e(
        Fe.Item,
        {
          name: m.name,
          label: m.label,
          rules: [{ required: m.required !== !1, message: `Please enter ${m.label.toLowerCase()}` }],
          children: /* @__PURE__ */ e(En, { placeholder: m.placeholder })
        },
        m.name
      )) })
    }
  );
}, Hn = ({
  show: t,
  onClose: n,
  onSelectImage: r,
  onFetchImages: l,
  onUploadImage: a,
  onDeleteImage: i
}) => {
  const [d, u] = x([]), [m, y] = x(!1), [N, S] = x(!1), [D, re] = x(null), [le, fe] = x(""), [X, ie] = x(""), [V, $] = x("library"), he = de(null);
  R(() => {
    t && l && (y(!0), re(null), l().then((k) => u(k)).catch(() => re("Failed to load images.")).finally(() => y(!1)));
  }, [t, l]);
  const G = async (k) => {
    var w;
    const T = (w = k.target.files) == null ? void 0 : w[0];
    if (T) {
      if (!T.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      if (!a) {
        alert("Image upload handler not configured.");
        return;
      }
      S(!0);
      try {
        const se = await a(T);
        r(se), n();
      } catch {
        alert("Failed to upload image.");
      } finally {
        S(!1), k.target.value = "";
      }
    }
  }, ee = () => {
    X.trim() && (r(X.trim()), n(), ie(""));
  }, Y = d.filter(
    (k) => !k.isFolder && k.filename.toLowerCase().includes(le.toLowerCase())
  );
  return /* @__PURE__ */ f(
    Bt,
    {
      open: t,
      onCancel: n,
      title: "Insert Image",
      footer: null,
      width: 700,
      destroyOnHidden: !0,
      children: [
        /* @__PURE__ */ f("div", { className: "flex border-b mb-4", children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => $("library"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${V === "library" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image Library"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => $("url"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${V === "url" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image URL"
            }
          )
        ] }),
        V === "url" && /* @__PURE__ */ f("div", { className: "space-y-3", children: [
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-500", children: "Paste a public image URL to insert it directly." }),
          /* @__PURE__ */ f("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "url",
                value: X,
                onChange: (k) => ie(k.target.value),
                placeholder: "https://example.com/image.png",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400",
                onKeyDown: (k) => k.key === "Enter" && ee()
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: ee,
                disabled: !X.trim(),
                className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700",
                children: "Insert"
              }
            )
          ] }),
          X && /* @__PURE__ */ e("div", { className: "border rounded p-2 text-center", children: /* @__PURE__ */ e("img", { src: X, alt: "preview", className: "max-h-48 mx-auto object-contain" }) })
        ] }),
        V === "library" && /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ f("div", { className: "flex justify-between items-center mb-3 gap-3", children: [
            /* @__PURE__ */ e(
              "input",
              {
                value: le,
                onChange: (k) => fe(k.target.value),
                placeholder: "Search images…",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              }
            ),
            a && /* @__PURE__ */ f(H, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => {
                    var k;
                    return (k = he.current) == null ? void 0 : k.click();
                  },
                  disabled: N,
                  className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700 whitespace-nowrap",
                  children: N ? "Uploading…" : "+ Upload"
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  ref: he,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: G
                }
              )
            ] })
          ] }),
          m && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3", children: Array.from({ length: 6 }).map((k, T) => /* @__PURE__ */ e("div", { className: "h-32 bg-gray-100 animate-pulse rounded" }, T)) }),
          D && /* @__PURE__ */ e("p", { className: "text-red-500 text-sm py-8 text-center", children: D }),
          !m && !D && Y.length === 0 && /* @__PURE__ */ e("div", { className: "py-12 text-center text-gray-400", children: l ? "No images found. Upload one to get started." : "No image library connected. Use the URL tab to insert images." }),
          !m && !D && Y.length > 0 && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1", children: Y.map((k) => /* @__PURE__ */ f(
            "div",
            {
              className: "group relative border rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all",
              onClick: () => {
                r(k.url), n();
              },
              children: [
                /* @__PURE__ */ e(
                  "img",
                  {
                    src: k.url,
                    alt: k.filename,
                    className: "w-full h-28 object-cover",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ f("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-white text-gray-800 text-xs px-2 py-1 rounded font-medium",
                      onClick: (T) => {
                        T.stopPropagation(), r(k.url), n();
                      },
                      children: "Select"
                    }
                  ),
                  i && /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-red-500 text-white text-xs px-2 py-1 rounded font-medium",
                      onClick: async (T) => {
                        T.stopPropagation(), await i(k.path), u((w) => w.filter((se) => se.path !== k.path));
                      },
                      children: "Delete"
                    }
                  )
                ] }),
                /* @__PURE__ */ e(L, { title: k.filename.split("/").pop(), children: /* @__PURE__ */ e("p", { className: "text-xs text-gray-600 truncate px-2 py-1 bg-white", children: k.filename.split("/").pop() }) })
              ]
            },
            k.path
          )) })
        ] })
      ]
    }
  );
}, U = (t, n = 13) => /* @__PURE__ */ e("svg", { width: n, height: n, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", flexShrink: 0 }, children: t }), Pn = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
  /* @__PURE__ */ e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
] }), t), je = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "3 6 5 6 21 6" }),
  /* @__PURE__ */ e("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }),
  /* @__PURE__ */ e("path", { d: "M10 11v6M14 11v6" }),
  /* @__PURE__ */ e("path", { d: "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" })
] }), t), On = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "1 4 1 10 7 10" }),
  /* @__PURE__ */ e("path", { d: "M3.51 15a9 9 0 1 0 .49-3.8" })
] }), t), Wn = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" }),
  /* @__PURE__ */ e("circle", { cx: "6.5", cy: "11.5", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "8.5", cy: "7.5", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "12", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "15.5", cy: "7.5", r: "1", fill: "currentColor", stroke: "none" })
] }), t), Ht = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "4 7 4 4 20 4 20 7" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "20", x2: "15", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "4", x2: "12", y2: "20" })
] }), t), _n = ({ size: t = 13 }) => U(/* @__PURE__ */ e(H, { children: /* @__PURE__ */ e("path", { d: "M3 9V6a3 3 0 0 1 3-3h3M21 9V6a3 3 0 0 0-3-3h-3M3 15v3a3 3 0 0 0 3 3h3m6 0h3a3 3 0 0 0 3-3v-3" }) }), t), Un = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("rect", { x: "3", y: "8", width: "18", height: "8", rx: "1" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "2", x2: "12", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
  /* @__PURE__ */ e("polyline", { points: "9 5 12 2 15 5" }),
  /* @__PURE__ */ e("polyline", { points: "9 19 12 22 15 19" })
] }), t), Pt = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "12", x2: "15", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "18", x2: "18", y2: "18" })
] }), t), we = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "6", y1: "12", x2: "18", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "18", x2: "20", y2: "18" })
] }), t), Ot = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "6", y1: "18", x2: "21", y2: "18" })
] }), t), zn = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "15 3 21 3 21 9" }),
  /* @__PURE__ */ e("polyline", { points: "9 21 3 21 3 15" }),
  /* @__PURE__ */ e("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
] }), t), Pe = ({ size: t = 13 }) => U(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
] }), t), M = (t, n) => /* @__PURE__ */ f("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
  t,
  n
] }), J = (t, n) => /* @__PURE__ */ f("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
  /* @__PURE__ */ e("span", { style: { display: "inline-block", width: 10, height: 10, borderRadius: 2, background: t, border: "1px solid rgba(0,0,0,0.15)", flexShrink: 0 } }),
  n
] });
function ce(t) {
  t.stopPropagation();
}
const kt = ({ defaultColor: t, onApply: n, buttonLabel: r = "Custom color" }) => {
  const [l, a] = x(t), [i, d] = x(!1);
  return R(() => {
    a(t);
  }, [t]), /* @__PURE__ */ e("div", { onClick: ce, onMouseDown: ce, children: /* @__PURE__ */ e(
    Ft,
    {
      value: l,
      open: i,
      onOpenChange: d,
      onChange: (u) => a(u.toHexString()),
      getPopupContainer: (u) => u.parentElement ?? document.body,
      panelRender: (u) => /* @__PURE__ */ f("div", { onClick: ce, onMouseDown: ce, children: [
        u,
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "border text-xs px-2 py-1 mt-1 mb-1 mx-1 rounded hover:bg-gray-50",
            style: { width: "calc(100% - 8px)" },
            onClick: () => {
              n(l), d(!1);
            },
            children: "Apply"
          }
        )
      ] }),
      children: /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          className: "flex w-full items-center gap-2 text-left text-xs",
          onClick: ce,
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                style: {
                  width: 14,
                  height: 14,
                  borderRadius: 2,
                  backgroundColor: l,
                  border: "1px solid rgba(0,0,0,0.15)",
                  flexShrink: 0
                }
              }
            ),
            r
          ]
        }
      )
    }
  ) });
}, qn = [
  { key: "bg-#3b82f6", color: "#3b82f6", label: "Blue" },
  { key: "bg-#10b981", color: "#10b981", label: "Green" },
  { key: "bg-#ef4444", color: "#ef4444", label: "Red" },
  { key: "bg-#f59e0b", color: "#f59e0b", label: "Orange" },
  { key: "bg-#8b5cf6", color: "#8b5cf6", label: "Purple" },
  { key: "bg-#000000", color: "#000000", label: "Black" }
], jn = [
  { key: "text-#ffffff", color: "#ffffff", label: "White" },
  { key: "text-#000000", color: "#000000", label: "Black" }
], Xn = [
  { label: "Red", color: "#ef4444" },
  { label: "Green", color: "#10b981" },
  { label: "Blue", color: "#3b82f6" },
  { label: "Orange", color: "#f59e0b" },
  { label: "Purple", color: "#8b5cf6" },
  { label: "Black", color: "#000000" },
  { label: "White", color: "#ffffff" }
], $n = (t) => ({
  items: [
    {
      key: "color-grid",
      label: /* @__PURE__ */ e(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", padding: "8px" },
          onClick: (n) => n.stopPropagation(),
          children: Xn.map((n) => /* @__PURE__ */ e(L, { title: n.label, children: /* @__PURE__ */ e(
            "div",
            {
              onClick: (r) => {
                r.preventDefault(), t(n.color);
              },
              style: {
                width: "24px",
                height: "24px",
                backgroundColor: n.color,
                borderRadius: "4px",
                border: "1px solid #ddd",
                cursor: "pointer",
                transition: "transform 0.1s ease"
              },
              onMouseEnter: (r) => r.currentTarget.style.transform = "scale(1.1)",
              onMouseLeave: (r) => r.currentTarget.style.transform = "scale(1)"
            }
          ) }, n.color))
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
}), Vn = (t, n, r, l) => ({
  items: [
    { key: "replace", label: M(/* @__PURE__ */ e(On, {}), "Replace Image"), onClick: t },
    { key: "delete", label: M(/* @__PURE__ */ e(je, {}), "Delete Image"), onClick: n, danger: !0 },
    { type: "divider" },
    {
      key: "resize",
      label: M(/* @__PURE__ */ e(zn, {}), "Resize Width"),
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
      label: M(/* @__PURE__ */ e(we, {}), "Align Image"),
      children: [
        { key: "align-left", label: M(/* @__PURE__ */ e(Pt, {}), "Left"), onClick: () => r("left") },
        { key: "align-center", label: M(/* @__PURE__ */ e(we, {}), "Center"), onClick: () => r("center") },
        { key: "align-right", label: M(/* @__PURE__ */ e(Ot, {}), "Right"), onClick: () => r("right") }
      ]
    }
  ]
}), Gn = (t, n, r, l, a, i, d, u, m, y) => ({
  items: [
    {
      key: "bg-color",
      label: M(/* @__PURE__ */ e(Wn, {}), "Background Color"),
      children: [
        {
          key: "bg-custom",
          label: /* @__PURE__ */ e(
            kt,
            {
              defaultColor: (y == null ? void 0 : y.background) ?? "#3b82f6",
              onApply: a,
              buttonLabel: "Custom background"
            }
          )
        },
        { type: "divider" },
        ...qn.map((N) => ({
          key: N.key,
          label: J(N.color, N.label),
          onClick: () => a(N.color)
        }))
      ]
    },
    {
      key: "text-color",
      label: M(/* @__PURE__ */ e(Ht, {}), "Text Color"),
      children: [
        {
          key: "text-custom",
          label: /* @__PURE__ */ e(
            kt,
            {
              defaultColor: (y == null ? void 0 : y.text) ?? "#ffffff",
              onApply: i,
              buttonLabel: "Custom text color"
            }
          )
        },
        { type: "divider" },
        ...jn.map((N) => ({
          key: N.key,
          label: J(N.color, N.label),
          onClick: () => i(N.color)
        }))
      ]
    },
    {
      key: "border-radius",
      label: M(/* @__PURE__ */ e(_n, {}), "Border Radius"),
      children: [
        { key: "radius-0px", label: "Square (0px)", onClick: () => d("0px") },
        { key: "radius-2px", label: "Rounded (2px)", onClick: () => d("2px") },
        { key: "radius-4px", label: "Large (4px)", onClick: () => d("4px") },
        { key: "radius-9999px", label: "Pill", onClick: () => d("9999px") }
      ]
    },
    {
      key: "padding",
      label: M(/* @__PURE__ */ e(Un, {}), "Padding"),
      children: [
        { key: "padding-8px 16px", label: "Small", onClick: () => u("8px 16px") },
        { key: "padding-12px 24px", label: "Default", onClick: () => u("12px 24px") },
        { key: "padding-16px 32px", label: "Large", onClick: () => u("16px 32px") },
        { key: "padding-20px 40px", label: "Extra Large", onClick: () => u("20px 40px") }
      ]
    },
    {
      key: "align",
      label: M(/* @__PURE__ */ e(we, {}), "Align"),
      children: [
        { key: "align-left", label: M(/* @__PURE__ */ e(Pt, {}), "Left"), onClick: () => m("left") },
        { key: "align-center", label: M(/* @__PURE__ */ e(we, {}), "Center"), onClick: () => m("center") },
        { key: "align-right", label: M(/* @__PURE__ */ e(Ot, {}), "Right"), onClick: () => m("right") }
      ]
    },
    { type: "divider" },
    { key: "remove-bg", label: M(/* @__PURE__ */ e(Pe, {}), "Remove Background"), onClick: n },
    { key: "remove-border", label: M(/* @__PURE__ */ e(Pe, {}), "Remove Border"), onClick: r },
    { key: "remove-padding", label: M(/* @__PURE__ */ e(Pe, {}), "Remove Padding"), onClick: l },
    { type: "divider" },
    { key: "delete", label: M(/* @__PURE__ */ e(je, {}), "Delete Button"), danger: !0, onClick: t }
  ]
}), Yn = (t, n, r) => ({
  items: [
    { key: "edit-link", label: M(/* @__PURE__ */ e(Pn, {}), "Edit Link"), onClick: t },
    {
      key: "text-color",
      label: M(/* @__PURE__ */ e(Ht, {}), "Text Color"),
      children: [
        { key: "text-#0ea5e9", label: J("#0ea5e9", "Blue"), onClick: () => r("#0ea5e9") },
        { key: "text-#10b981", label: J("#10b981", "Green"), onClick: () => r("#10b981") },
        { key: "text-#ef4444", label: J("#ef4444", "Red"), onClick: () => r("#ef4444") },
        { key: "text-#f59e0b", label: J("#f59e0b", "Orange"), onClick: () => r("#f59e0b") },
        { key: "text-#8b5cf6", label: J("#8b5cf6", "Purple"), onClick: () => r("#8b5cf6") },
        { key: "text-#000000", label: J("#000000", "Black"), onClick: () => r("#000000") }
      ]
    },
    { type: "divider" },
    { key: "delete", label: M(/* @__PURE__ */ e(je, {}), "Remove Link"), danger: !0, onClick: n }
  ]
}), Jn = [
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
], Zn = (t) => ({
  items: Jn.map((n) => ({
    key: n.value,
    label: /* @__PURE__ */ e("span", { style: { fontFamily: n.value }, children: n.label })
  })),
  onClick: ({ key: n }) => {
    t(n);
  }
}), Kn = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32], Qn = (t) => ({
  items: [
    { key: "default", label: "Default" },
    ...Kn.map((n) => ({
      key: String(n),
      label: /* @__PURE__ */ f("span", { style: { fontSize: Math.min(n, 20) }, children: [
        n,
        "px"
      ] })
    }))
  ],
  onClick: ({ key: n }) => {
    t(n === "default" ? "" : String(n));
  },
  style: { maxHeight: 280, overflowY: "auto" }
}), eo = [
  { label: "Default", value: "default" },
  { label: "Single (1.0)", value: "1" },
  { label: "1.15", value: "1.15" },
  { label: "1.5", value: "1.5" },
  { label: "Double (2.0)", value: "2" },
  { label: "2.5", value: "2.5" }
], to = (t) => ({
  items: eo.map((n) => ({
    key: n.value,
    label: n.label
  })),
  onClick: ({ key: n }) => {
    t(n === "default" ? "" : String(n));
  }
}), Z = new Sn({
  strictVariables: !1,
  strictFilters: !1
});
function ke(t) {
  const n = Number(t);
  return Number.isFinite(n) ? n : 0;
}
const ue = { minimumFractionDigits: 2, maximumFractionDigits: 2 }, Oe = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
function oe(t, n) {
  return new Intl.NumberFormat("en-US", n).format(t);
}
Z.registerFilter("money", (t, n) => {
  const r = ke(t);
  if (!n) return oe(r, ue);
  try {
    return new Intl.NumberFormat("en-US", {
      ...ue,
      style: "currency",
      currency: n,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${n} ${oe(r, ue)}`;
  }
});
Z.registerFilter("money_with_currency", (t, n) => {
  const r = ke(t);
  return n ? `${n} ${oe(r, ue)}` : oe(r, ue);
});
Z.registerFilter("money_no_decimals", (t, n) => {
  const r = ke(t);
  if (!n) return oe(r, Oe);
  try {
    return new Intl.NumberFormat("en-US", {
      ...Oe,
      style: "currency",
      currency: n,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${n} ${oe(r, Oe)}`;
  }
});
Z.registerFilter("number", (t) => new Intl.NumberFormat("en-US").format(ke(t)));
const no = Z.filters.date;
Z.registerFilter("date", function(t, n) {
  return t == null || t === "" ? "" : no.call(this, t, n);
});
const Lr = [
  "USD",
  "EUR",
  "GBP",
  "NGN",
  "CAD",
  "AUD",
  "JPY",
  "INR"
], oo = /* @__PURE__ */ new Set([
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
]), ro = new Set(Mn().filter((t) => !oo.has(t)));
function lo(t) {
  return t ? ro.has(t.toUpperCase()) : !1;
}
function io(t) {
  const n = /\|\s*(?:money|money_with_currency|money_no_decimals)\s*:\s*["']([^"']+)["']/g, r = [];
  let l;
  for (; (l = n.exec(t)) !== null; )
    r.push(l[1].toUpperCase());
  return r;
}
function so(t) {
  return io(t).filter((r) => !lo(r));
}
const ao = ".rsw-editor .rsw-ce";
function Er(t) {
  const n = [...new Set(so(t))];
  return n.length === 0 ? null : `Invalid currency code${n.length > 1 ? "s" : ""}: ${n.join(", ")}. Messages may render with incorrect formatting.`;
}
function Sr(t) {
  try {
    return Z.parse(t), { valid: !0 };
  } catch (n) {
    return { valid: !1, error: n };
  }
}
function co(t, n) {
  const r = new DOMParser(), l = r.parseFromString(t, "text/html"), a = r.parseFromString(n, "text/html");
  return l.body.innerHTML = a.body.innerHTML, a.head.querySelectorAll("style").forEach((d) => {
    Array.from(l.head.querySelectorAll("style")).some(
      (m) => m.innerHTML === d.innerHTML
    ) || l.head.appendChild(d.cloneNode(!0));
  }), `<!DOCTYPE html>
` + l.documentElement.outerHTML;
}
function Mr(t) {
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
function A() {
  return typeof document > "u" ? null : document.querySelector(ao);
}
function uo(t) {
  var l;
  if (!t || typeof document > "u") return;
  const n = window.getSelection();
  if (!n) return;
  const r = document.createRange();
  r.setStartAfter(t), r.collapse(!0), n.removeAllRanges(), n.addRange(r), (l = t.parentNode) == null || l.removeChild(t);
}
const fo = /* @__PURE__ */ new Set(["p", "div", "li", "section", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre"]);
function We(t, n) {
  for (; n && n !== t; ) {
    if (n instanceof HTMLElement) {
      const r = n.tagName.toLowerCase(), l = window.getComputedStyle(n).display;
      if (fo.has(r) || l === "block" || l === "list-item" || l === "table")
        return n;
    }
    n = n.parentNode;
  }
  return null;
}
function Wt(t, n) {
  const r = /* @__PURE__ */ new Set(), l = We(t, n.startContainer);
  l && r.add(l);
  const a = We(t, n.endContainer);
  a && r.add(a);
  const i = document.createTreeWalker(
    n.commonAncestorContainer,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(u) {
        return n.intersectsNode(u) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    }
  );
  let d = i.nextNode();
  for (; d; ) {
    const u = We(t, d);
    u && r.add(u), d = i.nextNode();
  }
  return r;
}
function _t(t, n, r) {
  var a;
  if (!r) return;
  const l = document.createRange();
  l.selectNodeContents(r), l.collapse(!1), n.removeAllRanges(), n.addRange(l), (a = r.focus) == null || a.call(r), t.focus();
}
function ve(t, n) {
  const r = A();
  if (!r) return;
  const l = window.getSelection();
  if (!l || l.rangeCount === 0) return;
  const a = l.getRangeAt(0);
  if (!r.contains(a.commonAncestorContainer)) return;
  const i = Wt(r, a);
  let d = null;
  i.forEach((u) => {
    u.style.textAlign = t, d = u;
  }), _t(r, l, d), n(r.innerHTML);
}
function ho(t, n) {
  const r = A();
  if (!r) return;
  const l = window.getSelection();
  if (!l || l.rangeCount === 0) return;
  const a = l.getRangeAt(0);
  if (!r.contains(a.commonAncestorContainer)) return;
  const i = Wt(r, a);
  let d = null;
  i.forEach((u) => {
    t ? u.style.lineHeight = t : u.style.removeProperty("line-height"), d = u;
  }), _t(r, l, d), n(r.innerHTML);
}
function W(t) {
  const n = A();
  n && (t(n.innerHTML), n.dispatchEvent(new Event("input", { bubbles: !0 })));
}
function mo(t, n, r) {
  const l = A();
  if (!l) return;
  t.style.outline = "";
  const a = t.closest("div");
  a && a.parentElement === l ? a.remove() : t.remove(), W(n), r == null || r();
}
function po(t, n, r, l) {
  t && (t.style.width = n, t.removeAttribute("width"), t.style.outline = "", W(r), l == null || l());
}
function go(t, n, r, l) {
  t && (t.style.display = "", t.style.margin = "", n === "left" ? (t.style.display = "block", t.style.margin = "0 auto 0 0") : n === "center" ? (t.style.display = "block", t.style.margin = "0 auto") : n === "right" && (t.style.display = "block", t.style.margin = "0 0 0 auto"), t.style.outline = "", W(r), l == null || l());
}
const yo = (t, n, r, l, a) => {
  if (typeof document < "u") {
    const i = A();
    if (i) {
      if (a) {
        const u = window.getSelection();
        u == null || u.removeAllRanges(), u == null || u.addRange(a);
      }
      document.execCommand("foreColor", !1, t);
      const d = i.innerHTML;
      n(d), r(d), l(!0);
    }
  }
}, _e = (t) => {
  if (!t || t === "transparent" || t === "rgba(0, 0, 0, 0)") return "#000000";
  if (t.startsWith("rgb")) {
    const n = t.match(/\d+/g);
    if (n && (n.length === 3 || n.length === 4))
      return "#" + n.slice(0, 3).map((r) => {
        const l = parseInt(r).toString(16);
        return l.length === 1 ? "0" + l : l;
      }).join("");
  }
  return t;
}, Ct = 16;
function Nt(t) {
  if (!t) return null;
  const n = t.match(/^([\d.]+)px$/);
  return n ? Math.round(parseFloat(n[1])) : null;
}
function Lt(t, n) {
  let r = t;
  (r == null ? void 0 : r.nodeType) === Node.TEXT_NODE && (r = r.parentElement);
  const l = n ?? A();
  if (!r || !(r instanceof HTMLElement)) return Ct;
  let a = r;
  for (; a && a !== l; ) {
    if (a.style.fontSize) {
      const d = Nt(a.style.fontSize);
      if (d) return d;
    }
    a = a.parentElement;
  }
  return Nt(window.getComputedStyle(r).fontSize) ?? Ct;
}
const xo = (t, n, r, l, a) => {
  const i = A();
  if (!i) return;
  if (a) {
    const u = window.getSelection();
    u == null || u.removeAllRanges(), u == null || u.addRange(a);
  }
  document.execCommand("fontName", !1, t);
  const d = i.innerHTML;
  n(d), r(d), l(!0);
}, bo = 32;
function vo(t) {
  const n = t.commonAncestorContainer.nodeType === Node.TEXT_NODE ? t.commonAncestorContainer.parentNode : t.commonAncestorContainer;
  if (!n) return;
  const r = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
    acceptNode(i) {
      return t.intersectsNode(i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  }), l = [];
  let a = r.nextNode();
  for (; a; )
    a instanceof HTMLElement && l.push(a), a = r.nextNode();
  l.forEach((i) => {
    var d, u;
    if (i.style.fontSize && (i.style.removeProperty("font-size"), (d = i.getAttribute("style")) != null && d.trim() || i.removeAttribute("style")), i.tagName === "FONT" && i.hasAttribute("size") && i.removeAttribute("size"), i.tagName === "SPAN" && !((u = i.getAttribute("style")) != null && u.trim()) && i.attributes.length === 0) {
      const m = i.parentNode;
      if (m) {
        for (; i.firstChild; ) m.insertBefore(i.firstChild, i);
        m.removeChild(i);
      }
    }
  });
}
const wo = (t, n, r, l, a) => {
  const i = A();
  if (!i) return;
  if (a) {
    const y = window.getSelection();
    y == null || y.removeAllRanges(), y == null || y.addRange(a);
  }
  const d = window.getSelection();
  if (!d || d.rangeCount === 0) return;
  const u = d.getRangeAt(0);
  if (!i.contains(u.commonAncestorContainer)) return;
  if (!t || t === "default")
    vo(u);
  else {
    const y = parseInt(t, 10);
    if (Number.isNaN(y) || y < 1 || y > bo) return;
    if (u.collapsed)
      document.execCommand("styleWithCSS", !1, "true"), document.execCommand("fontSize", !1, `${y}px`);
    else {
      const N = u.extractContents(), S = document.createElement("span");
      S.style.fontSize = `${y}px`, S.appendChild(N), u.insertNode(S);
      const D = document.createRange();
      D.selectNodeContents(S), d.removeAllRanges(), d.addRange(D);
    }
  }
  const m = i.innerHTML;
  n(m), r(m), l(!0);
};
function K(t, n, r) {
  t.style.outline = "", W(n), r == null || r();
}
function ko(t, n, r, l) {
  t && (t.style.backgroundColor = n, t.style.border = "none", K(t, r, l));
}
function Et(t, n, r, l) {
  t && (t.style.color = n, K(t, r, l));
}
function Co(t, n, r, l) {
  t && (t.style.borderRadius = n, K(t, r, l));
}
function No(t, n, r, l) {
  if (!t) return;
  const a = t.closest("div");
  a && (a.style.textAlign = n, K(t, r, l));
}
function Lo(t, n, r, l) {
  t && (t.style.padding = n, K(t, r, l));
}
function Eo(t, n, r) {
  const l = A();
  if (!l) return;
  t.style.outline = "";
  const a = t.closest("[data-editor-button-wrapper='true']");
  a && l.contains(a) ? a.remove() : t.remove(), W(n), r == null || r();
}
function So(t, n, r) {
  t && (t.style.color = "#000000", t.style.backgroundColor = "transparent", t.style.border = "2px solid #000000", K(t, n, r));
}
function Mo(t, n, r) {
  t && (t.style.border = "none", K(t, n, r));
}
function Io(t, n, r) {
  t && (t.style.padding = "0", K(t, n, r));
}
function To(t, n, r, l) {
  t.src = n, t.style.outline = "", W(r), l == null || l();
}
function Ro(t, n, r, l) {
  const a = A();
  if (!a) return;
  a.focus();
  const i = window.getSelection();
  if (r.current && (i == null || i.removeAllRanges(), i == null || i.addRange(r.current), r.current = null), !i || i.rangeCount === 0) return;
  const d = i.getRangeAt(0);
  if (!a.contains(d.commonAncestorContainer)) return;
  d.deleteContents();
  const u = document.createElement("div");
  u.style.textAlign = "center", u.style.margin = "1rem 0";
  const m = document.createElement("img");
  m.src = t, m.alt = "Inserted image", m.style.display = "block", m.style.margin = "1rem auto", m.style.width = "100%", m.style.height = "auto", m.style.objectFit = "contain", m.style.borderRadius = "2px", u.appendChild(m);
  const y = document.createElement("p"), N = document.createTextNode(" ");
  y.appendChild(N), d.insertNode(u), d.insertNode(y), d.collapse();
  const S = document.createRange();
  S.setStart(N, 0), S.collapse(!0), i.removeAllRanges(), i.addRange(S), y.scrollIntoView({ behavior: "smooth", block: "center" });
  const D = a.innerHTML;
  n(D), l == null || l(D);
}
const Ao = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
`;
function Do(t, n, r, l, a) {
  const i = A();
  if (!i) return;
  i.focus();
  const d = window.getSelection();
  if (l.current && (d == null || d.removeAllRanges(), d == null || d.addRange(l.current), l.current = null), !d || d.rangeCount === 0) return;
  const u = d.getRangeAt(0);
  if (!i.contains(u.commonAncestorContainer)) return;
  u.deleteContents();
  const m = document.createElement("div");
  m.contentEditable = "false", m.style.textAlign = "center", m.style.margin = "20px 0", m.style.userSelect = "none", m.setAttribute("data-editor-button-wrapper", "true");
  const y = document.createElement("a");
  y.href = n, y.textContent = t, y.style.cssText = Ao, y.setAttribute("target", "_blank"), y.setAttribute("rel", "noopener noreferrer"), m.appendChild(y);
  const N = document.createElement("p");
  N.innerHTML = "<br>", u.insertNode(m), u.insertNode(N), u.setStartAfter(N), u.collapse(!0), d.removeAllRanges(), d.addRange(u);
  const S = i.innerHTML;
  r(S), a == null || a(S);
}
function Bo(t, n, r) {
  const l = A();
  if (!l) return;
  const a = window.getSelection();
  if (!a || a.rangeCount === 0) return;
  const i = a.getRangeAt(0);
  if (!l.contains(i.commonAncestorContainer)) return;
  i.deleteContents();
  const d = document.createTextNode(t);
  i.insertNode(d), i.setStartAfter(d), i.setEndAfter(d), a.removeAllRanges(), a.addRange(i), n(l.innerHTML), r == null || r();
}
function Fo(t, n, r) {
  const l = A();
  if (!l || !l.contains(t.commonAncestorContainer)) return;
  t.deleteContents();
  const a = document.createTextNode(n);
  t.insertNode(a);
  const i = window.getSelection();
  if (i) {
    const d = document.createRange();
    d.setStartAfter(a), d.collapse(!0), i.removeAllRanges(), i.addRange(d);
  }
  r(l.innerHTML);
}
function Ho(t) {
  return In(t, {
    removeStyleTags: !0,
    applyAttributesTableElements: !0,
    preserveImportant: !0
  });
}
function Po(t) {
  return new DOMParser().parseFromString(t, "text/html").querySelectorAll("style").length > 0;
}
function Oo(t, n, r) {
  let l = "";
  const a = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null);
  let i;
  for (; i = a.nextNode(); ) {
    const d = i;
    if (d === n) {
      l += d.data.slice(0, r);
      break;
    }
    l += d.data;
  }
  return l;
}
function St(t, n) {
  let r = n;
  const l = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null);
  let a;
  for (; a = l.nextNode(); ) {
    const i = a, d = i.data.length;
    if (r < d) return { node: i, offset: r };
    if (r === d) return { node: i, offset: d };
    r -= d;
  }
  return null;
}
const Ue = "customer", ze = "event";
function Wo(t) {
  return t === "" ? { group: "both", query: "" } : t.startsWith(Ue) ? { group: "customer", query: t.slice(Ue.length) } : t.startsWith(ze) ? { group: "event", query: t.slice(ze.length) } : Ue.startsWith(t) ? { group: "customer", query: "" } : ze.startsWith(t) ? { group: "event", query: "" } : null;
}
function Mt(t, n, r) {
  if (n.nodeType !== Node.TEXT_NODE) return null;
  const l = Oo(t, n, r), a = l.lastIndexOf("@");
  if (a < 0 || a > 0 && /[a-zA-Z0-9_]/.test(l.charAt(a - 1))) return null;
  const d = l.slice(a).match(/^@([a-zA-Z0-9_]*)$/);
  if (!d) return null;
  const u = d[1] ?? "", m = Wo(u);
  if (!m) return null;
  const y = `@${u}`, N = l.length - y.length;
  return {
    group: m.group,
    query: m.query,
    matchLength: y.length,
    startOffset: N
  };
}
function It(t) {
  return /\{\{\s*customer\./.test(t.value);
}
function Tt(t) {
  return /\{\{\s*event\./.test(t.value);
}
function _o(t, n, r) {
  const l = n === "both" ? t.filter((i) => It(i) || Tt(i)) : t.filter((i) => n === "customer" ? It(i) : Tt(i)), a = r.trim().toLowerCase();
  return a ? l.filter(
    (i) => i.label.toLowerCase().includes(a) || i.value.toLowerCase().replace(/\s/g, "").includes(a)
  ) : l;
}
const Rt = 280, Uo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M3 7v6h6" }),
  /* @__PURE__ */ e("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" })
] }), zo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M21 7v6h-6" }),
  /* @__PURE__ */ e("path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" })
] }), qo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" }),
  /* @__PURE__ */ e("path", { d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" })
] }), jo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "19", y1: "4", x2: "10", y2: "4" }),
  /* @__PURE__ */ e("line", { x1: "14", y1: "20", x2: "5", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "4", x2: "9", y2: "20" })
] }), Xo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "21", x2: "20", y2: "21" })
] }), $o = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 6.5 3.9h.2m6.2 3.8c.2.5.3 1.1.3 1.7 0 4-3.3 4.7-7 4.7-3.5 0-5.5-.5-7.5-2" }),
  /* @__PURE__ */ e("line", { x1: "2", y1: "12", x2: "22", y2: "12" })
] }), Vo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "10", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "18", x2: "21", y2: "18" }),
  /* @__PURE__ */ e("path", { d: "M4 6h1v4" }),
  /* @__PURE__ */ e("path", { d: "M4 10h2" }),
  /* @__PURE__ */ e("path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" })
] }), Go = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "9", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "12", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "18", r: "1", fill: "currentColor", stroke: "none" })
] }), Yo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
  /* @__PURE__ */ e("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
] }), Jo = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H1" }), Zo = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H2" }), Ko = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H3" }), Qo = () => /* @__PURE__ */ e(
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
), er = () => /* @__PURE__ */ e(
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
), tr = () => /* @__PURE__ */ e(
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
), nr = () => /* @__PURE__ */ e(
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
        d: "M4 6h16M4 10h16M4 14h16M4 18h16"
      }
    )
  }
), or = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "4", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ e("polyline", { points: "2 4 2 8" }),
  /* @__PURE__ */ e("polyline", { points: "2 16 2 20" }),
  /* @__PURE__ */ e("line", { x1: "2", y1: "4", x2: "2", y2: "20" })
] }), rr = () => /* @__PURE__ */ f(
  "span",
  {
    className: "inline-flex items-baseline leading-none",
    style: { letterSpacing: "-0.5px" },
    "aria-hidden": !0,
    children: [
      /* @__PURE__ */ e("span", { style: { fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 13, fontWeight: 600 }, children: "A" }),
      /* @__PURE__ */ e("span", { style: { fontFamily: "Arial, sans-serif", fontSize: 13, fontWeight: 400 }, children: "a" })
    ]
  }
), lr = ({ size: t }) => /* @__PURE__ */ f("span", { className: "inline-flex items-center leading-none gap-0.5", "aria-hidden": !0, children: [
  /* @__PURE__ */ e("span", { style: { fontSize: 11, fontWeight: 700, fontVariantNumeric: "tabular-nums", minWidth: 14, textAlign: "center" }, children: t }),
  /* @__PURE__ */ f("svg", { width: "8", height: "12", viewBox: "0 0 8 12", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M4 1v10" }),
    /* @__PURE__ */ e("path", { d: "M1.5 3.5 4 1l2.5 2.5" }),
    /* @__PURE__ */ e("path", { d: "M1.5 8.5 4 11l2.5-2.5" })
  ] })
] }), ir = () => /* @__PURE__ */ e(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ f(
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
), sr = () => /* @__PURE__ */ f(
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
), qe = () => /* @__PURE__ */ e("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ e("polyline", { points: "6 9 12 15 18 9" }) }), ar = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ e("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  /* @__PURE__ */ e("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
] }), cr = () => /* @__PURE__ */ f("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("polyline", { points: "16 18 22 12 16 6" }),
  /* @__PURE__ */ e("polyline", { points: "8 6 2 12 8 18" })
] }), dr = () => /* @__PURE__ */ f("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2", ry: "2" }),
  /* @__PURE__ */ e("circle", { cx: "12", cy: "17", r: "1", fill: "currentColor", stroke: "none" })
] }), ur = ({
  value: t = "",
  onChange: n,
  readOnly: r = !1,
  placeholder: l,
  onFetchImages: a,
  onUploadImage: i,
  onDeleteImage: d,
  enablePreview: u = !0,
  enableCodeEditor: m = !0,
  height: y = 500,
  className: N = "",
  previewData: S,
  toolbarContent: D,
  showCodeEditor: re,
  onShowCodeEditorChange: le,
  showPreview: fe,
  onShowPreviewChange: X,
  hideViewToggles: ie = !1,
  onOpenImageModal: V,
  insertableAttributes: $
}, he) => {
  const [G, ee] = x(t), [Y, k] = x(t), [T, w] = x(t), [se, me] = x(T), [Ut, zt] = x(!1), [qt, jt] = x(!1), Xt = re !== void 0, $t = fe !== void 0, _ = Xt ? re : qt, P = $t ? fe : Ut, Xe = (o) => {
    const s = typeof o == "function" ? o(_) : o;
    le ? le(s) : jt(s);
  }, $e = (o) => {
    const s = typeof o == "function" ? o(P) : o;
    X ? X(s) : zt(s);
  }, [Vt, Ve] = x(!1), [Gt, pe] = x(!1), [Yt, Ce] = x(!1), [Jt, Ne] = x(!1), [Ge, Le] = x(null), [I, Q] = x(null), [Ye, Zt] = x({ top: 0, left: 0 }), [j, Ee] = x(null), [z, Se] = x(null), [Me, ge] = x(null), [ae, Kt] = x(null), [Qt, Ie] = x(!1), [Je, Ze] = x("#000000"), [en, Te] = x(16), [Ke, Qe] = x("#000000"), [tn, et] = x([]), [nn, tt] = x(null), [fr, nt] = x(!1), [hr, ot] = x(!1), [mr, rt] = x(!1), [pr, lt] = x(!1), [E, te] = x(null), [it, on] = x({ top: 0, left: 0 }), [p, B] = x(null), [st, rn] = x({ top: 0, left: 0 }), [at, ln] = x({ top: 0, left: 0 }), [q, F] = x(null), ct = de($);
  ct.current = $;
  const dt = de(null), ye = de(null);
  R(() => {
    t !== Y && (ee(t), k(t), w(t));
  }, [t]), R(() => {
    const o = document.querySelector(".rsw-editor .rsw-ce");
    if (!o) return;
    const s = o.querySelector("#selection-marker");
    s && uo(s);
  }, [Y]), R(() => {
    let o = null;
    const s = (c) => {
      const h = c.target;
      if (!h) return;
      const g = h.closest(".rsw-editor .rsw-ce img"), b = document.querySelector(".rsw-editor .rsw-ce");
      g && (b != null && b.contains(g)) ? (o && o !== g && (o.style.outline = "none"), g.style.outline = "2px solid red", o = g, te({ element: g, x: c.clientX, y: c.clientY })) : (o && (o.style.outline = "none", o = null), te(null));
    };
    return document.addEventListener("click", s), () => document.removeEventListener("click", s);
  }, []), R(() => {
    let o = null, s = null;
    const c = (h) => {
      const g = h.target;
      if (!g) return;
      const b = g.closest(".rsw-editor .rsw-ce a"), v = document.querySelector(".rsw-editor .rsw-ce");
      b && (v != null && v.contains(b)) ? (h.preventDefault(), !!b.closest("[data-editor-button-wrapper='true']") || !!b.style.backgroundColor && !!b.style.padding ? (s && (s.style.outline = "none", s = null), Q(null), o && o !== b && (o.style.outline = "none", o.style.boxShadow = ""), b.style.outline = "3px solid #4f46e5", b.style.boxShadow = "0 0 0 5px rgba(79,70,229,0.18)", o = b, B({ element: b, x: h.clientX, y: h.clientY })) : (o && (o.style.outline = "none", o.style.boxShadow = "", o = null), B(null), s && s !== b && (s.style.outline = "none"), b.style.outline = "2px solid #0ea5e9", s = b, Q({ element: b, x: h.clientX, y: h.clientY }))) : (o && (o.style.outline = "none", o.style.boxShadow = "", o = null), s && (s.style.outline = "none", s = null), B(null), Q(null));
    };
    return document.addEventListener("click", c), () => document.removeEventListener("click", c);
  }, []), R(() => {
    const o = () => {
      const s = dt.current, c = window.getSelection();
      if (!c || !s || !s.contains(c.anchorNode)) {
        et([]), tt(null), nt(!1), ot(!1), rt(!1), lt(!1);
        return;
      }
      const h = c.getRangeAt(0);
      et(c.isCollapsed ? [] : Array.from(h.getClientRects()));
      let g = c.anchorNode;
      const b = s.querySelector(".rsw-ce");
      if ((g == null ? void 0 : g.nodeType) === Node.TEXT_NODE && (g = g.parentElement), g instanceof HTMLElement) {
        Ze(_e(window.getComputedStyle(g).color)), Te(Lt(g, b));
        const v = g.closest("h1, h2, h3");
        tt(v ? v.tagName.toLowerCase() : null), nt(document.queryCommandState("bold")), ot(document.queryCommandState("italic")), rt(document.queryCommandState("underline")), lt(document.queryCommandState("strikeThrough"));
      }
    };
    return document.addEventListener("selectionchange", o), window.addEventListener("scroll", o, !0), () => {
      document.removeEventListener("selectionchange", o), window.removeEventListener("scroll", o, !0);
    };
  }, []), R(() => {
    if (!(E != null && E.element)) return;
    const o = E.element, s = o.closest(".rsw-editor .rsw-ce");
    if (!s) return;
    const c = o.getBoundingClientRect(), h = s.getBoundingClientRect(), g = 150, b = 50;
    let v = c.top - h.top, C = c.right - h.left + 8;
    C + g > h.width && (C = c.left - h.left - g - 8), v + b > h.height && (v = h.height - b - 8), v < 0 && (v = 8), C < 0 && (C = 8), on({ top: v, left: C });
  }, [E == null ? void 0 : E.element]), R(() => {
    if (!(p != null && p.element)) return;
    const o = p.element, s = o.closest(".rsw-editor .rsw-ce");
    if (!s) return;
    const c = o.getBoundingClientRect(), h = s.getBoundingClientRect(), g = 100, b = 200;
    let v = c.top - h.top, C = c.right - h.left + g;
    C + b > h.width && (C = c.left - h.left - b - g), C < g && (C = g), v < g && (v = g), rn({ top: v, left: C }), ln({
      top: Math.max(4, c.top - h.top - 26),
      left: c.left - h.left + c.width / 2
    });
  }, [p]), R(() => {
    if (!(I != null && I.element)) return;
    const o = I.element, s = o.closest(".rsw-editor .rsw-ce");
    if (!s) return;
    const c = o.getBoundingClientRect(), h = s.getBoundingClientRect(), g = 8, b = 200;
    let v = c.bottom - h.top + g, C = c.left - h.left;
    C + b > h.width && (C = h.width - b - g), C < g && (C = g), v + 100 > h.height && (v = c.top - h.top - 100), Zt({ top: v, left: C });
  }, [I]);
  const Re = S != null && Object.keys(S).length > 0;
  R(() => {
    if (!P || !Re) {
      me(T);
      return;
    }
    me(T), Z.parseAndRender(T, S).then(me).catch(() => me(T));
  }, [P, Re, T, S]);
  const sn = vt(() => Po(G), [G]), { wordCount: ut, charCount: ft } = vt(() => {
    const o = G.replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
    return { wordCount: o.length === 0 ? 0 : o.split(" ").filter(Boolean).length, charCount: o.replace(/ /g, "").length };
  }, [G]), O = (o) => {
    ee(o);
    const s = co(Y, o);
    k(s), w(s), n == null || n(s);
  }, ht = de(O);
  ht.current = O;
  const Ae = Cn((o) => {
    const s = A(), c = window.getSelection();
    if (!s || !c || c.rangeCount === 0) return;
    const h = c.anchorNode;
    if (!h) return;
    const g = c.anchorOffset, b = Mt(s, h, g);
    if (!b) return;
    const v = St(s, b.startOffset);
    if (!v || h.nodeType !== Node.TEXT_NODE) return;
    const C = document.createRange();
    C.setStart(v.node, v.offset), C.setEnd(h, g), Fo(C, o, ht.current);
  }, []);
  R(() => {
    if (!($ != null && $.length) || r || _ || P) {
      F(null);
      return;
    }
    const o = () => {
      const s = ct.current;
      if (!(s != null && s.length)) {
        F(null);
        return;
      }
      const c = A(), h = window.getSelection();
      if (!c || !h || h.rangeCount === 0 || !h.isCollapsed) {
        F(null);
        return;
      }
      const g = h.anchorNode, b = h.anchorOffset;
      if (!g || !c.contains(g)) {
        F(null);
        return;
      }
      if (g.nodeType !== Node.TEXT_NODE) {
        F(null);
        return;
      }
      const v = Mt(c, g, b);
      if (!v) {
        F(null);
        return;
      }
      const C = _o(s, v.group, v.query), De = St(c, v.startOffset);
      if (!De) {
        F(null);
        return;
      }
      const Be = document.createRange();
      Be.setStart(De.node, De.offset), Be.setEnd(g, b);
      const bt = Be.getBoundingClientRect();
      F((be) => {
        const vn = be && be.group === v.group && be.query === v.query;
        return {
          group: v.group,
          query: v.query,
          items: C,
          highlightIndex: vn ? Math.min(be.highlightIndex, Math.max(0, C.length - 1)) : 0,
          left: bt.left,
          top: bt.bottom + 4
        };
      });
    };
    return document.addEventListener("input", o, !0), document.addEventListener("keyup", o, !0), document.addEventListener("selectionchange", o), () => {
      document.removeEventListener("input", o, !0), document.removeEventListener("keyup", o, !0), document.removeEventListener("selectionchange", o);
    };
  }, [$, r, _, P]), R(() => {
    if (!q) return;
    const o = (s) => {
      if (s.key === "Escape") {
        s.preventDefault(), F(null);
        return;
      }
      if (s.key === "ArrowDown") {
        s.preventDefault(), F(
          (c) => c && c.items.length ? { ...c, highlightIndex: Math.min(c.items.length - 1, c.highlightIndex + 1) } : c
        );
        return;
      }
      if (s.key === "ArrowUp") {
        s.preventDefault(), F((c) => c && c.items.length ? { ...c, highlightIndex: Math.max(0, c.highlightIndex - 1) } : c);
        return;
      }
      (s.key === "Enter" || s.key === "Tab" && !s.shiftKey) && (s.preventDefault(), F((c) => {
        if (!c || c.items.length === 0) return null;
        const h = c.items[c.highlightIndex];
        return h && Ae(h.value), null;
      }));
    };
    return document.addEventListener("keydown", o, !0), () => document.removeEventListener("keydown", o, !0);
  }, [q, Ae]);
  const xe = () => {
    const o = window.getSelection();
    o && o.rangeCount > 0 && Kt(o.getRangeAt(0).cloneRange());
  }, mt = (o) => {
    yo(o, O, w, () => {
    }, ae), Ze(o), Ie(!1);
  }, an = (o) => {
    xo(o, O, w, () => {
    }, ae);
  }, cn = (o) => {
    wo(o, O, w, () => {
    }, ae);
    const s = document.querySelector(".rsw-editor .rsw-ce"), c = window.getSelection();
    if (o) {
      const h = parseInt(o, 10);
      Number.isNaN(h) || Te(h);
    } else c != null && c.anchorNode && s && Te(Lt(c.anchorNode, s));
  }, dn = (o) => {
    if (ae) {
      const s = window.getSelection();
      s == null || s.removeAllRanges(), s == null || s.addRange(ae);
    }
    ho(o, O);
  }, pt = () => {
    try {
      const o = Ho(G);
      ee(o), k(o), w(o), n == null || n(o), wt.success("CSS inlined successfully!");
    } catch {
      wt.error("Failed to inline CSS.");
    }
  }, gt = () => {
    if (!Me) {
      const o = document.querySelector(".rsw-editor .rsw-ce");
      if (o) {
        const s = window.getSelection();
        if (s && s.rangeCount > 0) {
          const c = s.getRangeAt(0);
          o.contains(c.commonAncestorContainer) && (ye.current = c.cloneRange());
        }
      }
    }
    V ? V() : Ve(!0);
  }, yt = (o) => {
    if (Me) {
      To(Me, o, w, () => ge(null));
      return;
    }
    Ro(o, w, ye);
  }, un = () => {
    const o = window.getSelection();
    o && o.rangeCount > 0 && (ye.current = o.getRangeAt(0).cloneRange()), pe(!0);
  }, fn = (o) => {
    const { buttonText: s, buttonUrl: c } = o;
    !s || !c || (z ? (z.textContent = s, z.href = c, z.style.outline = "", W(w), Se(null)) : Do(s, c, w, ye, O), pe(!1));
  };
  Nn(he, () => ({
    insert: (o) => {
      Bo(o, w);
    },
    inlineCss: () => pt(),
    insertImage: (o) => yt(o),
    clearImageToReplace: () => ge(null)
  }));
  const hn = Vn(
    () => {
      E != null && E.element && (ge(E.element), gt());
    },
    () => (E == null ? void 0 : E.element) && mo(E.element, w, () => te(null)),
    (o) => (E == null ? void 0 : E.element) && go(E.element, o, w, () => te(null)),
    (o) => (E == null ? void 0 : E.element) && po(E.element, o, w, () => te(null))
  ), mn = () => {
    p != null && p.element && (Se(p.element), B(null), pe(!0));
  }, pn = (() => {
    const o = p == null ? void 0 : p.element, s = Gn(
      () => (p == null ? void 0 : p.element) && Eo(p.element, w, () => B(null)),
      () => (p == null ? void 0 : p.element) && So(p.element, w, () => B(null)),
      () => (p == null ? void 0 : p.element) && Mo(p.element, w, () => B(null)),
      () => (p == null ? void 0 : p.element) && Io(p.element, w, () => B(null)),
      (c) => (p == null ? void 0 : p.element) && ko(p.element, c, w, () => B(null)),
      (c) => (p == null ? void 0 : p.element) && Et(p.element, c, w, () => B(null)),
      (c) => (p == null ? void 0 : p.element) && Co(p.element, c, w, () => B(null)),
      (c) => (p == null ? void 0 : p.element) && Lo(p.element, c, w, () => B(null)),
      (c) => (p == null ? void 0 : p.element) && No(p.element, c, w, () => B(null)),
      {
        background: o ? _e(o.style.backgroundColor || "#3b82f6") : "#3b82f6",
        text: o ? _e(o.style.color || "#ffffff") : "#ffffff"
      }
    );
    return {
      ...s,
      items: [
        { key: "edit-button", label: /* @__PURE__ */ f("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ f("svg", { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", flexShrink: 0 }, children: [
            /* @__PURE__ */ e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
            /* @__PURE__ */ e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
          ] }),
          "Edit Button"
        ] }), onClick: mn },
        { type: "divider" },
        ...s.items ?? []
      ]
    };
  })(), gn = Yn(
    () => {
      I != null && I.element && (Ee(I.element), Q(null), Ne(!0));
    },
    () => {
      I != null && I.element && (I.element.style.outline = "", I.element.replaceWith(...Array.from(I.element.childNodes)), W(w), Q(null));
    },
    (o) => (I == null ? void 0 : I.element) && Et(I.element, o, w, () => Q(null))
  );
  $n(mt);
  const yn = Zn(an), xn = Qn(cn), bn = to(dn), xt = typeof y == "number" ? `${y}px` : y;
  return /* @__PURE__ */ f("div", { className: `bg-white border rounded-xl overflow-hidden flex flex-col ${N}`, style: { minWidth: 400 }, children: [
    /* @__PURE__ */ f(
      "div",
      {
        className: `bg-white flex flex-wrap items-center gap-0.5 px-2 py-1.5 ${r && !_ && !P ? "pointer-events-none opacity-50" : ""}`,
        style: { boxShadow: "0 1px 0 #e5e7eb" },
        children: [
          !_ && !P && /* @__PURE__ */ f(H, { children: [
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(L, { title: "Undo", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("undo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Uo, {}) }) }),
              /* @__PURE__ */ e(L, { title: "Redo", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("redo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(zo, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: ["h1", "h2", "h3"].map((o, s) => {
              const c = [Jo, Zo, Ko][s], h = nn === o;
              return /* @__PURE__ */ e(L, { title: h ? "Remove heading" : `Heading ${s + 1}`, children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (g) => {
                    g.preventDefault(), document.execCommand("formatBlock", !1, h ? "p" : o), setTimeout(() => W(w), 0);
                  },
                  className: "toolbar-btn",
                  style: h ? { background: "#1e293b", color: "#fff", borderColor: "#1e293b" } : void 0,
                  children: /* @__PURE__ */ e(c, {})
                }
              ) }, o);
            }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(L, { title: "Bold (Ctrl+B)", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("bold");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(qo, {}) }) }),
              /* @__PURE__ */ e(L, { title: "Italic (Ctrl+I)", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("italic");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(jo, {}) }) }),
              /* @__PURE__ */ e(L, { title: "Underline (Ctrl+U)", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("underline");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Xo, {}) }) }),
              /* @__PURE__ */ e(L, { title: "Strikethrough", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("strikeThrough");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e($o, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(L, { title: "Numbered List", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("insertOrderedList"), setTimeout(() => W(w), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Vo, {}) }) }),
              /* @__PURE__ */ e(L, { title: "Bullet List", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("insertUnorderedList"), setTimeout(() => W(w), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Go, {}) }) }),
              /* @__PURE__ */ e(L, { title: "Insert Link", children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (o) => {
                    o.preventDefault();
                    const s = window.getSelection();
                    s && s.rangeCount > 0 && Le(s.getRangeAt(0).cloneRange()), Ce(!0);
                  },
                  className: "toolbar-btn",
                  children: /* @__PURE__ */ e(Yo, {})
                }
              ) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(L, { title: "Align Left", children: /* @__PURE__ */ e("button", { onClick: () => ve("left", O), className: "toolbar-btn", children: /* @__PURE__ */ e(Qo, {}) }) }),
              /* @__PURE__ */ e(L, { title: "Align Center", children: /* @__PURE__ */ e("button", { onClick: () => ve("center", O), className: "toolbar-btn", children: /* @__PURE__ */ e(er, {}) }) }),
              /* @__PURE__ */ e(L, { title: "Align Right", children: /* @__PURE__ */ e("button", { onClick: () => ve("right", O), className: "toolbar-btn", children: /* @__PURE__ */ e(tr, {}) }) }),
              /* @__PURE__ */ e(L, { title: "Justify", children: /* @__PURE__ */ e("button", { onClick: () => ve("justify", O), className: "toolbar-btn", children: /* @__PURE__ */ e(nr, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(L, { title: "Line spacing", children: /* @__PURE__ */ e(ne, { menu: bn, trigger: ["click"], onOpenChange: (o) => {
              o && xe();
            }, children: /* @__PURE__ */ f("button", { type: "button", className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              /* @__PURE__ */ e(or, {}),
              /* @__PURE__ */ e(qe, {})
            ] }) }) }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(L, { title: "Insert Image", children: /* @__PURE__ */ e("button", { onClick: gt, className: "toolbar-btn", children: /* @__PURE__ */ e(ir, {}) }) }),
              /* @__PURE__ */ e(L, { title: "Insert Button", children: /* @__PURE__ */ e("button", { onClick: un, className: "toolbar-btn", children: /* @__PURE__ */ e(sr, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(L, { title: "Text Color", children: /* @__PURE__ */ e(
              Ft,
              {
                value: Ke,
                open: Qt,
                onOpenChange: (o) => {
                  Ie(o), o && (xe(), Qe(Je));
                },
                onChange: (o) => Qe(o.toHexString()),
                panelRender: (o) => /* @__PURE__ */ f("div", { children: [
                  o,
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "border text-xs px-2 py-1 mt-1 rounded hover:bg-gray-50",
                      onClick: () => {
                        mt(Ke), Ie(!1);
                      },
                      children: "Apply"
                    }
                  )
                ] }),
                children: /* @__PURE__ */ e("button", { type: "button", className: "toolbar-btn", children: /* @__PURE__ */ e("div", { style: { width: 18, height: 18, backgroundColor: Je, borderRadius: 2, border: "1px solid #e5e7eb" } }) })
              }
            ) }) }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(L, { title: "Font Family", children: /* @__PURE__ */ e(ne, { menu: yn, trigger: ["click"], onOpenChange: (o) => {
              o && xe();
            }, children: /* @__PURE__ */ f("button", { className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              /* @__PURE__ */ e(rr, {}),
              " ",
              /* @__PURE__ */ e(qe, {})
            ] }) }) }) }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(L, { title: "Font Size", children: /* @__PURE__ */ e(ne, { menu: xn, trigger: ["click"], onOpenChange: (o) => {
              o && xe();
            }, children: /* @__PURE__ */ f("button", { type: "button", className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              /* @__PURE__ */ e(lr, { size: en }),
              " ",
              /* @__PURE__ */ e(qe, {})
            ] }) }) }) })
          ] }),
          !ie && _ && sn && /* @__PURE__ */ e(L, { title: "Inline all <style> tags into element attributes for email clients", children: /* @__PURE__ */ f(
            "button",
            {
              onClick: pt,
              className: "flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-white animate-pulse flex-shrink-0",
              children: [
                /* @__PURE__ */ e(ar, {}),
                " Inline CSS"
              ]
            }
          ) }),
          !ie && /* @__PURE__ */ f("div", { className: "ml-auto flex items-center gap-1 flex-shrink-0", children: [
            m && /* @__PURE__ */ e(L, { title: "Toggle HTML source editor", children: /* @__PURE__ */ f(
              "button",
              {
                onClick: () => {
                  Xe((o) => !o), $e(!1);
                },
                className: `flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${_ ? "bg-gray-800 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`,
                children: [
                  /* @__PURE__ */ e(cr, {}),
                  _ ? "Editor" : "HTML"
                ]
              }
            ) }),
            u && /* @__PURE__ */ e(L, { title: "Toggle phone preview", children: /* @__PURE__ */ f(
              "button",
              {
                onClick: () => {
                  $e((o) => !o), Xe(!1);
                },
                className: `flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${P ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`,
                children: [
                  /* @__PURE__ */ e(dr, {}),
                  P ? "Close" : "Preview"
                ]
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex flex-1 min-h-0", style: { height: xt }, children: /* @__PURE__ */ e(
      "div",
      {
        className: "flex-1 relative overflow-hidden min-h-0",
        style: _ || P ? { minHeight: 300 } : void 0,
        children: P ? /* @__PURE__ */ e("div", { className: "h-full overflow-y-auto flex items-start justify-center p-4 bg-gray-100", children: /* @__PURE__ */ e(Fn, { srcDoc: Re ? se : T }) }) : _ ? /* @__PURE__ */ e(
          Bn,
          {
            height: xt,
            defaultLanguage: "html",
            defaultValue: Y,
            onChange: (o) => O(o ?? ""),
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
        ) : /* @__PURE__ */ f("div", { className: "relative h-full", ref: dt, children: [
          /* @__PURE__ */ e(
            Rn,
            {
              value: G,
              onChange: (o) => O(o.target.value),
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
          E && /* @__PURE__ */ e("div", { style: { position: "absolute", top: it.top - 100, left: it.left - 100, zIndex: 1e3, width: 150 }, children: /* @__PURE__ */ e(ne, { menu: hn, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || te(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          p && /* @__PURE__ */ e("div", { style: { position: "absolute", top: st.top, left: st.left, zIndex: 1e3, width: 260 }, children: /* @__PURE__ */ e(ne, { menu: pn, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || B(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          p && /* @__PURE__ */ e(
            "div",
            {
              style: {
                position: "absolute",
                top: at.top,
                left: at.left,
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
          I && /* @__PURE__ */ e("div", { style: { position: "absolute", top: Ye.top, left: Ye.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(ne, { menu: gn, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || (I.element.style.outline = "none", Q(null));
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          tn.map((o, s) => /* @__PURE__ */ e(
            "div",
            {
              style: {
                position: "fixed",
                top: o.top,
                left: o.left,
                width: o.width,
                height: o.height,
                border: "1px solid #4f46e5",
                backgroundColor: "rgba(79,70,229,0.1)",
                pointerEvents: "none",
                zIndex: 10
              }
            },
            s
          ))
        ] })
      }
    ) }),
    /* @__PURE__ */ f(
      "div",
      {
        className: "flex items-center justify-between px-4 bg-white select-none",
        style: { borderTop: "1px solid #e5e7eb", minHeight: 28 },
        children: [
          /* @__PURE__ */ e("span", { className: "text-xs", style: { color: "#cbd5e1" }, children: _ ? "HTML source" : P ? "Phone preview" : "Rich text" }),
          !_ && !P && /* @__PURE__ */ e(L, { title: `${ft.toLocaleString()} characters`, children: /* @__PURE__ */ f("span", { className: "text-xs tabular-nums cursor-default", style: { color: "#cbd5e1" }, children: [
            ut.toLocaleString(),
            " ",
            ut === 1 ? "word" : "words",
            " · ",
            ft.toLocaleString(),
            " chars"
          ] }) })
        ]
      }
    ),
    !V && /* @__PURE__ */ e(
      Hn,
      {
        show: Vt,
        onClose: () => {
          Ve(!1), ge(null);
        },
        onSelectImage: yt,
        onFetchImages: a,
        onUploadImage: i,
        onDeleteImage: d
      }
    ),
    /* @__PURE__ */ e(
      He,
      {
        show: Gt,
        title: z ? "Edit Button" : "Insert Button",
        fields: [
          { name: "buttonText", label: "Button Text", placeholder: "Click Here", defaultValue: (z == null ? void 0 : z.textContent) ?? "" },
          { name: "buttonUrl", label: "Button URL", placeholder: "https://", defaultValue: (z == null ? void 0 : z.getAttribute("href")) ?? "" }
        ],
        onConfirm: fn,
        onClose: () => {
          pe(!1), Se(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      He,
      {
        show: Jt,
        title: "Edit Link",
        fields: [
          { name: "linkText", label: "Link Text", placeholder: "Click here", defaultValue: (j == null ? void 0 : j.textContent) ?? "", required: !0 },
          { name: "url", label: "URL", placeholder: "https://", defaultValue: (j == null ? void 0 : j.getAttribute("href")) ?? "", required: !0 }
        ],
        onConfirm: ({ linkText: o, url: s }) => {
          j && (j.textContent = o, j.href = s, j.style.outline = "", W(w), Ee(null)), Ne(!1);
        },
        onClose: () => {
          Ne(!1), Ee(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      He,
      {
        show: Yt,
        title: "Insert Link",
        fields: [
          { name: "url", label: "URL", placeholder: "https://", required: !0 },
          { name: "linkText", label: "Link Text", placeholder: "Displayed text (optional)", required: !1 }
        ],
        onConfirm: ({ url: o, linkText: s }) => {
          var v, C;
          Ce(!1);
          const c = document.querySelector(".rsw-editor .rsw-ce");
          if (!c || !o) return;
          c.focus();
          const h = window.getSelection();
          Ge && (h == null || h.removeAllRanges(), h == null || h.addRange(Ge)), document.execCommand("createLink", !1, o);
          const g = window.getSelection(), b = (C = (v = g == null ? void 0 : g.anchorNode) == null ? void 0 : v.parentElement) == null ? void 0 : C.closest("a");
          b && (b.style.color = "#0ea5e9", s && (b.textContent = s)), Le(null), setTimeout(() => W(w), 0);
        },
        onClose: () => {
          Ce(!1), Le(null);
        }
      }
    ),
    q && typeof document < "u" && Ln(
      /* @__PURE__ */ e(
        "div",
        {
          role: "listbox",
          "aria-label": q.group === "customer" ? "Customer attributes" : q.group === "event" ? "Event attributes" : "Customer and event attributes",
          className: "flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-xl",
          style: {
            position: "fixed",
            zIndex: 10050,
            left: q.left,
            top: q.top,
            minWidth: 220,
            maxWidth: 320,
            maxHeight: Rt
          },
          onMouseDown: (o) => o.preventDefault(),
          children: /* @__PURE__ */ e(
            "div",
            {
              className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-1",
              style: {
                maxHeight: Rt,
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch"
              },
              children: q.items.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 py-2 text-xs text-gray-500", children: "No matching attributes" }) : q.items.map((o, s) => /* @__PURE__ */ f(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": s === q.highlightIndex,
                  className: `flex w-full flex-col items-start px-3 py-2 text-left text-xs ${s === q.highlightIndex ? "bg-indigo-50 text-indigo-900" : "text-gray-800 hover:bg-gray-50"}`,
                  onMouseDown: (c) => {
                    c.preventDefault(), Ae(o.value), F(null);
                  },
                  onMouseEnter: () => F((c) => c && { ...c, highlightIndex: s }),
                  children: [
                    /* @__PURE__ */ e("span", { className: "font-medium", children: o.label }),
                    /* @__PURE__ */ e("span", { className: "mt-0.5 font-mono text-[10px] text-gray-500", children: o.value })
                  ]
                },
                o.value
              ))
            }
          )
        }
      ),
      document.body
    )
  ] });
}, Ir = kn(
  ur
);
function Tr() {
  const [t, n] = x(!0);
  return R(() => {
    function r() {
      n(!0);
    }
    function l() {
      n(!1);
    }
    return window.addEventListener("online", r), window.addEventListener("offline", l), typeof navigator.onLine < "u" && n(navigator.onLine), () => {
      window.removeEventListener("online", r), window.removeEventListener("offline", l);
    };
  }, []), t;
}
export {
  Ir as CDPEditor,
  Lr as COMMON_CURRENCY_CODES,
  Hn as ImagePickerModal,
  He as InputModal,
  Bn as MonacoEditorWrapper,
  Fn as PhonePreview,
  ro as VALID_CURRENCY_CODES,
  Rn as WysiwygEditor,
  ho as applyLineHeightToSelection,
  xo as changeFontFamily,
  wo as changeFontSize,
  yo as changeHighlightColor,
  Ir as default,
  Ho as handleInlineCSS,
  Do as insertButtonAtCursorInEditor,
  Ro as insertImageAtCursorInEditor,
  Bo as insertTextIntoEditorAtSelection,
  lo as isValidCurrencyCode,
  Z as liquidEngine,
  Po as needsInliningDetailed,
  _e as normalizeColor,
  co as replaceBodyContent,
  Fo as replaceEditorRangeWithText,
  Tr as useOnlineStatus,
  Er as validateCurrencyCodes,
  Sr as validateLiquidTemplate,
  Mr as wrapEmailBodyHtml
};
//# sourceMappingURL=email-editor.es.js.map
