import { jsx as e, jsxs as f, Fragment as H } from "react/jsx-runtime";
import Ln, { lazy as Dt, Suspense as Bt, useState as x, useEffect as R, useRef as ue, forwardRef as En, useMemo as wt, useCallback as Sn, useImperativeHandle as Mn } from "react";
import { createPortal as In } from "react-dom";
import { Form as He, Modal as Ft, Input as Rn, Tooltip as E, ColorPicker as Ht, Dropdown as re } from "antd";
import { toast as kt } from "sonner";
import { Liquid as Tn } from "liquidjs";
import { codes as An } from "currency-codes";
import Dn from "juice";
const Bn = Dt(() => import("react-simple-wysiwyg")), Fn = ({
  value: t,
  onChange: n,
  placeholder: r,
  containerProps: l,
  disabled: a,
  onFocus: i,
  onBlur: c
}) => /* @__PURE__ */ e("div", { ...l, children: /* @__PURE__ */ e(Bt, { fallback: /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-100 animate-pulse rounded flex items-center justify-center text-gray-400 text-sm", children: "Loading editor…" }), children: /* @__PURE__ */ e(
  Bn,
  {
    value: t,
    onChange: n,
    placeholder: r,
    spellCheck: !1,
    disabled: a,
    onFocus: i,
    onBlur: c
  }
) }) }), Hn = Dt(() => import("@monaco-editor/react"));
function Pn(t) {
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
const On = ({
  height: t = "100%",
  defaultLanguage: n = "html",
  defaultValue: r = "",
  onChange: l,
  theme: a = "vs-dark",
  options: i = {},
  className: c,
  onMount: u
}) => {
  const [m, p] = x(!1), L = Ln.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (A) => {
      Pn(A), u == null || u(A);
    },
    [u]
  );
  R(() => {
    p(!0);
  }, []);
  const b = /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-900 rounded flex items-center justify-center text-gray-400 text-sm animate-pulse", children: "Loading code editor…" });
  return m ? /* @__PURE__ */ e("div", { className: c, children: /* @__PURE__ */ e(Bt, { fallback: b, children: /* @__PURE__ */ e(
    Hn,
    {
      height: t,
      defaultLanguage: n,
      defaultValue: r,
      onChange: l,
      theme: a,
      options: i,
      onMount: L
    }
  ) }) }) : b;
}, Wn = ({ srcDoc: t }) => /* @__PURE__ */ e("div", { className: "flex justify-center items-start", children: /* @__PURE__ */ e("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ f("div", { className: "relative !max-w-[340px] w-full !h-[640px] border-8 border-black rounded-[40px] overflow-hidden shadow-xl bg-black", children: [
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
] }) }) }), Pe = ({ show: t, title: n, fields: r, onConfirm: l, onClose: a }) => {
  const [i] = He.useForm();
  return R(() => {
    if (t) {
      const m = {};
      r.forEach((p) => {
        p.defaultValue && (m[p.name] = p.defaultValue);
      }), i.setFieldsValue(m);
    }
  }, [t, i]), /* @__PURE__ */ e(
    Ft,
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
      children: /* @__PURE__ */ e(He, { form: i, layout: "vertical", className: "mt-4", children: r.map((m) => /* @__PURE__ */ e(
        He.Item,
        {
          name: m.name,
          label: m.label,
          rules: [{ required: m.required !== !1, message: `Please enter ${m.label.toLowerCase()}` }],
          children: /* @__PURE__ */ e(Rn, { placeholder: m.placeholder })
        },
        m.name
      )) })
    }
  );
}, _n = ({
  show: t,
  onClose: n,
  onSelectImage: r,
  onFetchImages: l,
  onUploadImage: a,
  onDeleteImage: i
}) => {
  const [c, u] = x([]), [m, p] = x(!1), [L, b] = x(!1), [A, ie] = x(null), [se, he] = x(""), [Y, ae] = x(""), [Z, J] = x("library"), te = ue(null);
  R(() => {
    t && l && (p(!0), ie(null), l().then((k) => u(k)).catch(() => ie("Failed to load images.")).finally(() => p(!1)));
  }, [t, l]);
  const q = async (k) => {
    var K;
    const D = (K = k.target.files) == null ? void 0 : K[0];
    if (D) {
      if (!D.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      if (!a) {
        alert("Image upload handler not configured.");
        return;
      }
      b(!0);
      try {
        const j = await a(D);
        r(j), n();
      } catch {
        alert("Failed to upload image.");
      } finally {
        b(!1), k.target.value = "";
      }
    }
  }, me = () => {
    Y.trim() && (r(Y.trim()), n(), ae(""));
  }, $ = c.filter(
    (k) => !k.isFolder && k.filename.toLowerCase().includes(se.toLowerCase())
  );
  return /* @__PURE__ */ f(
    Ft,
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
              onClick: () => J("library"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${Z === "library" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image Library"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => J("url"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${Z === "url" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image URL"
            }
          )
        ] }),
        Z === "url" && /* @__PURE__ */ f("div", { className: "space-y-3", children: [
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-500", children: "Paste a public image URL to insert it directly." }),
          /* @__PURE__ */ f("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "url",
                value: Y,
                onChange: (k) => ae(k.target.value),
                placeholder: "https://example.com/image.png",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400",
                onKeyDown: (k) => k.key === "Enter" && me()
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: me,
                disabled: !Y.trim(),
                className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700",
                children: "Insert"
              }
            )
          ] }),
          Y && /* @__PURE__ */ e("div", { className: "border rounded p-2 text-center", children: /* @__PURE__ */ e("img", { src: Y, alt: "preview", className: "max-h-48 mx-auto object-contain" }) })
        ] }),
        Z === "library" && /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ f("div", { className: "flex justify-between items-center mb-3 gap-3", children: [
            /* @__PURE__ */ e(
              "input",
              {
                value: se,
                onChange: (k) => he(k.target.value),
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
                    return (k = te.current) == null ? void 0 : k.click();
                  },
                  disabled: L,
                  className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700 whitespace-nowrap",
                  children: L ? "Uploading…" : "+ Upload"
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  ref: te,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: q
                }
              )
            ] })
          ] }),
          m && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3", children: Array.from({ length: 6 }).map((k, D) => /* @__PURE__ */ e("div", { className: "h-32 bg-gray-100 animate-pulse rounded" }, D)) }),
          A && /* @__PURE__ */ e("p", { className: "text-red-500 text-sm py-8 text-center", children: A }),
          !m && !A && $.length === 0 && /* @__PURE__ */ e("div", { className: "py-12 text-center text-gray-400", children: l ? "No images found. Upload one to get started." : "No image library connected. Use the URL tab to insert images." }),
          !m && !A && $.length > 0 && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1", children: $.map((k) => /* @__PURE__ */ f(
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
                      onClick: (D) => {
                        D.stopPropagation(), r(k.url), n();
                      },
                      children: "Select"
                    }
                  ),
                  i && /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-red-500 text-white text-xs px-2 py-1 rounded font-medium",
                      onClick: async (D) => {
                        D.stopPropagation(), await i(k.path), u((K) => K.filter((j) => j.path !== k.path));
                      },
                      children: "Delete"
                    }
                  )
                ] }),
                /* @__PURE__ */ e(E, { title: k.filename.split("/").pop(), children: /* @__PURE__ */ e("p", { className: "text-xs text-gray-600 truncate px-2 py-1 bg-white", children: k.filename.split("/").pop() }) })
              ]
            },
            k.path
          )) })
        ] })
      ]
    }
  );
}, z = (t, n = 13) => /* @__PURE__ */ e("svg", { width: n, height: n, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", flexShrink: 0 }, children: t }), zn = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
  /* @__PURE__ */ e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
] }), t), Xe = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "3 6 5 6 21 6" }),
  /* @__PURE__ */ e("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }),
  /* @__PURE__ */ e("path", { d: "M10 11v6M14 11v6" }),
  /* @__PURE__ */ e("path", { d: "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" })
] }), t), qn = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "1 4 1 10 7 10" }),
  /* @__PURE__ */ e("path", { d: "M3.51 15a9 9 0 1 0 .49-3.8" })
] }), t), jn = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" }),
  /* @__PURE__ */ e("circle", { cx: "6.5", cy: "11.5", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "8.5", cy: "7.5", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "12", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "15.5", cy: "7.5", r: "1", fill: "currentColor", stroke: "none" })
] }), t), Pt = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "4 7 4 4 20 4 20 7" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "20", x2: "15", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "4", x2: "12", y2: "20" })
] }), t), Un = ({ size: t = 13 }) => z(/* @__PURE__ */ e(H, { children: /* @__PURE__ */ e("path", { d: "M3 9V6a3 3 0 0 1 3-3h3M21 9V6a3 3 0 0 0-3-3h-3M3 15v3a3 3 0 0 0 3 3h3m6 0h3a3 3 0 0 0 3-3v-3" }) }), t), Xn = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("rect", { x: "3", y: "8", width: "18", height: "8", rx: "1" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "2", x2: "12", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
  /* @__PURE__ */ e("polyline", { points: "9 5 12 2 15 5" }),
  /* @__PURE__ */ e("polyline", { points: "9 19 12 22 15 19" })
] }), t), Ot = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "12", x2: "15", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "18", x2: "18", y2: "18" })
] }), t), ke = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "6", y1: "12", x2: "18", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "18", x2: "20", y2: "18" })
] }), t), Wt = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "6", y1: "18", x2: "21", y2: "18" })
] }), t), $n = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "15 3 21 3 21 9" }),
  /* @__PURE__ */ e("polyline", { points: "9 21 3 21 3 15" }),
  /* @__PURE__ */ e("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
] }), t), Oe = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
] }), t), M = (t, n) => /* @__PURE__ */ f("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
  t,
  n
] }), G = (t, n) => /* @__PURE__ */ f("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
  /* @__PURE__ */ e("span", { style: { display: "inline-block", width: 10, height: 10, borderRadius: 2, background: t, border: "1px solid rgba(0,0,0,0.15)", flexShrink: 0 } }),
  n
] });
function de(t) {
  t.stopPropagation();
}
const Ct = ({ defaultColor: t, onApply: n, buttonLabel: r = "Custom color", recentColors: l }) => {
  const [a, i] = x(t), [c, u] = x(!1);
  R(() => {
    i(t);
  }, [t]);
  const m = l && l.length > 0 ? [{ label: "Recent", colors: l }] : void 0;
  return /* @__PURE__ */ e("div", { onClick: de, onMouseDown: de, children: /* @__PURE__ */ e(
    Ht,
    {
      value: a,
      open: c,
      onOpenChange: u,
      onChange: (p) => i(p.toHexString()),
      presets: m,
      getPopupContainer: (p) => p.parentElement ?? document.body,
      panelRender: (p) => /* @__PURE__ */ f("div", { onClick: de, onMouseDown: de, children: [
        p,
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "border text-xs px-2 py-1 mt-1 mb-1 mx-1 rounded hover:bg-gray-50",
            style: { width: "calc(100% - 8px)" },
            onClick: () => {
              n(a), u(!1);
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
          onClick: de,
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                style: {
                  width: 14,
                  height: 14,
                  borderRadius: 2,
                  backgroundColor: a,
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
}, Vn = [
  { key: "bg-#3b82f6", color: "#3b82f6", label: "Blue" },
  { key: "bg-#10b981", color: "#10b981", label: "Green" },
  { key: "bg-#ef4444", color: "#ef4444", label: "Red" },
  { key: "bg-#f59e0b", color: "#f59e0b", label: "Orange" },
  { key: "bg-#8b5cf6", color: "#8b5cf6", label: "Purple" },
  { key: "bg-#000000", color: "#000000", label: "Black" }
], Gn = [
  { key: "text-#ffffff", color: "#ffffff", label: "White" },
  { key: "text-#000000", color: "#000000", label: "Black" }
], Yn = [
  { label: "Red", color: "#ef4444" },
  { label: "Green", color: "#10b981" },
  { label: "Blue", color: "#3b82f6" },
  { label: "Orange", color: "#f59e0b" },
  { label: "Purple", color: "#8b5cf6" },
  { label: "Black", color: "#000000" },
  { label: "White", color: "#ffffff" }
], Jn = (t) => ({
  items: [
    {
      key: "color-grid",
      label: /* @__PURE__ */ e(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", padding: "8px" },
          onClick: (n) => n.stopPropagation(),
          children: Yn.map((n) => /* @__PURE__ */ e(E, { title: n.label, children: /* @__PURE__ */ e(
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
}), Zn = (t, n, r, l) => ({
  items: [
    { key: "replace", label: M(/* @__PURE__ */ e(qn, {}), "Replace Image"), onClick: t },
    { key: "delete", label: M(/* @__PURE__ */ e(Xe, {}), "Delete Image"), onClick: n, danger: !0 },
    { type: "divider" },
    {
      key: "resize",
      label: M(/* @__PURE__ */ e($n, {}), "Resize Width"),
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
      label: M(/* @__PURE__ */ e(ke, {}), "Align Image"),
      children: [
        { key: "align-left", label: M(/* @__PURE__ */ e(Ot, {}), "Left"), onClick: () => r("left") },
        { key: "align-center", label: M(/* @__PURE__ */ e(ke, {}), "Center"), onClick: () => r("center") },
        { key: "align-right", label: M(/* @__PURE__ */ e(Wt, {}), "Right"), onClick: () => r("right") }
      ]
    }
  ]
}), Kn = (t, n, r, l, a, i, c, u, m, p, L) => ({
  items: [
    {
      key: "bg-color",
      label: M(/* @__PURE__ */ e(jn, {}), "Background Color"),
      children: [
        {
          key: "bg-custom",
          label: /* @__PURE__ */ e(
            Ct,
            {
              defaultColor: (p == null ? void 0 : p.background) ?? "#3b82f6",
              onApply: a,
              buttonLabel: "Custom background",
              recentColors: L
            }
          )
        },
        ...L && L.length > 0 ? [
          { type: "divider" },
          {
            key: "bg-recent",
            type: "group",
            label: "Recent",
            children: L.map((b) => ({
              key: `bg-recent-${b}`,
              label: G(b, b.toUpperCase()),
              onClick: () => a(b)
            }))
          }
        ] : [],
        { type: "divider" },
        ...Vn.map((b) => ({
          key: b.key,
          label: G(b.color, b.label),
          onClick: () => a(b.color)
        }))
      ]
    },
    {
      key: "text-color",
      label: M(/* @__PURE__ */ e(Pt, {}), "Text Color"),
      children: [
        {
          key: "text-custom",
          label: /* @__PURE__ */ e(
            Ct,
            {
              defaultColor: (p == null ? void 0 : p.text) ?? "#ffffff",
              onApply: i,
              buttonLabel: "Custom text color",
              recentColors: L
            }
          )
        },
        ...L && L.length > 0 ? [
          { type: "divider" },
          {
            key: "text-recent",
            type: "group",
            label: "Recent",
            children: L.map((b) => ({
              key: `text-recent-${b}`,
              label: G(b, b.toUpperCase()),
              onClick: () => i(b)
            }))
          }
        ] : [],
        { type: "divider" },
        ...Gn.map((b) => ({
          key: b.key,
          label: G(b.color, b.label),
          onClick: () => i(b.color)
        }))
      ]
    },
    {
      key: "border-radius",
      label: M(/* @__PURE__ */ e(Un, {}), "Border Radius"),
      children: [
        { key: "radius-0px", label: "Square (0px)", onClick: () => c("0px") },
        { key: "radius-2px", label: "Rounded (2px)", onClick: () => c("2px") },
        { key: "radius-4px", label: "Large (4px)", onClick: () => c("4px") },
        { key: "radius-9999px", label: "Pill", onClick: () => c("9999px") }
      ]
    },
    {
      key: "padding",
      label: M(/* @__PURE__ */ e(Xn, {}), "Padding"),
      children: [
        { key: "padding-8px 16px", label: "Small", onClick: () => u("8px 16px") },
        { key: "padding-12px 24px", label: "Default", onClick: () => u("12px 24px") },
        { key: "padding-16px 32px", label: "Large", onClick: () => u("16px 32px") },
        { key: "padding-20px 40px", label: "Extra Large", onClick: () => u("20px 40px") }
      ]
    },
    {
      key: "align",
      label: M(/* @__PURE__ */ e(ke, {}), "Align"),
      children: [
        { key: "align-left", label: M(/* @__PURE__ */ e(Ot, {}), "Left"), onClick: () => m("left") },
        { key: "align-center", label: M(/* @__PURE__ */ e(ke, {}), "Center"), onClick: () => m("center") },
        { key: "align-right", label: M(/* @__PURE__ */ e(Wt, {}), "Right"), onClick: () => m("right") }
      ]
    },
    { type: "divider" },
    { key: "remove-bg", label: M(/* @__PURE__ */ e(Oe, {}), "Remove Background"), onClick: n },
    { key: "remove-border", label: M(/* @__PURE__ */ e(Oe, {}), "Remove Border"), onClick: r },
    { key: "remove-padding", label: M(/* @__PURE__ */ e(Oe, {}), "Remove Padding"), onClick: l },
    { type: "divider" },
    { key: "delete", label: M(/* @__PURE__ */ e(Xe, {}), "Delete Button"), danger: !0, onClick: t }
  ]
}), Qn = (t, n, r) => ({
  items: [
    { key: "edit-link", label: M(/* @__PURE__ */ e(zn, {}), "Edit Link"), onClick: t },
    {
      key: "text-color",
      label: M(/* @__PURE__ */ e(Pt, {}), "Text Color"),
      children: [
        { key: "text-#0ea5e9", label: G("#0ea5e9", "Blue"), onClick: () => r("#0ea5e9") },
        { key: "text-#10b981", label: G("#10b981", "Green"), onClick: () => r("#10b981") },
        { key: "text-#ef4444", label: G("#ef4444", "Red"), onClick: () => r("#ef4444") },
        { key: "text-#f59e0b", label: G("#f59e0b", "Orange"), onClick: () => r("#f59e0b") },
        { key: "text-#8b5cf6", label: G("#8b5cf6", "Purple"), onClick: () => r("#8b5cf6") },
        { key: "text-#000000", label: G("#000000", "Black"), onClick: () => r("#000000") }
      ]
    },
    { type: "divider" },
    { key: "delete", label: M(/* @__PURE__ */ e(Xe, {}), "Remove Link"), danger: !0, onClick: n }
  ]
}), eo = [
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
], to = (t) => ({
  items: eo.map((n) => ({
    key: n.value,
    label: /* @__PURE__ */ e("span", { style: { fontFamily: n.value }, children: n.label })
  })),
  onClick: ({ key: n }) => {
    t(n);
  }
}), no = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32], oo = (t) => ({
  items: [
    { key: "default", label: "Default" },
    ...no.map((n) => ({
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
}), ro = [
  { label: "Default", value: "default" },
  { label: "Single (1.0)", value: "1" },
  { label: "1.15", value: "1.15" },
  { label: "1.5", value: "1.5" },
  { label: "Double (2.0)", value: "2" },
  { label: "2.5", value: "2.5" }
], lo = (t) => ({
  items: ro.map((n) => ({
    key: n.value,
    label: n.label
  })),
  onClick: ({ key: n }) => {
    t(n === "default" ? "" : String(n));
  }
}), Q = new Tn({
  strictVariables: !1,
  strictFilters: !1
});
function Ce(t) {
  const n = Number(t);
  return Number.isFinite(n) ? n : 0;
}
const fe = { minimumFractionDigits: 2, maximumFractionDigits: 2 }, We = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
function le(t, n) {
  return new Intl.NumberFormat("en-US", n).format(t);
}
Q.registerFilter("money", (t, n) => {
  const r = Ce(t);
  if (!n) return le(r, fe);
  try {
    return new Intl.NumberFormat("en-US", {
      ...fe,
      style: "currency",
      currency: n,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${n} ${le(r, fe)}`;
  }
});
Q.registerFilter("money_with_currency", (t, n) => {
  const r = Ce(t);
  return n ? `${n} ${le(r, fe)}` : le(r, fe);
});
Q.registerFilter("money_no_decimals", (t, n) => {
  const r = Ce(t);
  if (!n) return le(r, We);
  try {
    return new Intl.NumberFormat("en-US", {
      ...We,
      style: "currency",
      currency: n,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${n} ${le(r, We)}`;
  }
});
Q.registerFilter("number", (t) => new Intl.NumberFormat("en-US").format(Ce(t)));
const io = Q.filters.date;
Q.registerFilter("date", function(t, n) {
  return t == null || t === "" ? "" : io.call(this, t, n);
});
const Ir = [
  "USD",
  "EUR",
  "GBP",
  "NGN",
  "CAD",
  "AUD",
  "JPY",
  "INR"
], so = /* @__PURE__ */ new Set([
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
]), ao = new Set(An().filter((t) => !so.has(t)));
function co(t) {
  return t ? ao.has(t.toUpperCase()) : !1;
}
function uo(t) {
  const n = /\|\s*(?:money|money_with_currency|money_no_decimals)\s*:\s*["']([^"']+)["']/g, r = [];
  let l;
  for (; (l = n.exec(t)) !== null; )
    r.push(l[1].toUpperCase());
  return r;
}
function fo(t) {
  return uo(t).filter((r) => !co(r));
}
const ho = ".rsw-editor .rsw-ce";
function Rr(t) {
  const n = [...new Set(fo(t))];
  return n.length === 0 ? null : `Invalid currency code${n.length > 1 ? "s" : ""}: ${n.join(", ")}. Messages may render with incorrect formatting.`;
}
function Tr(t) {
  try {
    return Q.parse(t), { valid: !0 };
  } catch (n) {
    return { valid: !1, error: n };
  }
}
function mo(t, n) {
  const r = new DOMParser(), l = r.parseFromString(t, "text/html"), a = r.parseFromString(n, "text/html");
  return l.body.innerHTML = a.body.innerHTML, a.head.querySelectorAll("style").forEach((c) => {
    Array.from(l.head.querySelectorAll("style")).some(
      (m) => m.innerHTML === c.innerHTML
    ) || l.head.appendChild(c.cloneNode(!0));
  }), `<!DOCTYPE html>
` + l.documentElement.outerHTML;
}
function Ar(t) {
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
function T() {
  return typeof document > "u" ? null : document.querySelector(ho);
}
function po(t) {
  var l;
  if (!t || typeof document > "u") return;
  const n = window.getSelection();
  if (!n) return;
  const r = document.createRange();
  r.setStartAfter(t), r.collapse(!0), n.removeAllRanges(), n.addRange(r), (l = t.parentNode) == null || l.removeChild(t);
}
const go = /* @__PURE__ */ new Set(["p", "div", "li", "section", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre"]);
function _e(t, n) {
  for (; n && n !== t; ) {
    if (n instanceof HTMLElement) {
      const r = n.tagName.toLowerCase(), l = window.getComputedStyle(n).display;
      if (go.has(r) || l === "block" || l === "list-item" || l === "table")
        return n;
    }
    n = n.parentNode;
  }
  return null;
}
function _t(t, n) {
  const r = /* @__PURE__ */ new Set(), l = _e(t, n.startContainer);
  l && r.add(l);
  const a = _e(t, n.endContainer);
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
  let c = i.nextNode();
  for (; c; ) {
    const u = _e(t, c);
    u && r.add(u), c = i.nextNode();
  }
  return r;
}
function zt(t, n, r) {
  var a;
  if (!r) return;
  const l = document.createRange();
  l.selectNodeContents(r), l.collapse(!1), n.removeAllRanges(), n.addRange(l), (a = r.focus) == null || a.call(r), t.focus();
}
function we(t, n) {
  const r = T();
  if (!r) return;
  const l = window.getSelection();
  if (!l || l.rangeCount === 0) return;
  const a = l.getRangeAt(0);
  if (!r.contains(a.commonAncestorContainer)) return;
  const i = _t(r, a);
  let c = null;
  i.forEach((u) => {
    u.style.textAlign = t, c = u;
  }), zt(r, l, c), n(r.innerHTML);
}
function yo(t, n) {
  const r = T();
  if (!r) return;
  const l = window.getSelection();
  if (!l || l.rangeCount === 0) return;
  const a = l.getRangeAt(0);
  if (!r.contains(a.commonAncestorContainer)) return;
  const i = _t(r, a);
  let c = null;
  i.forEach((u) => {
    t ? u.style.lineHeight = t : u.style.removeProperty("line-height"), c = u;
  }), zt(r, l, c), n(r.innerHTML);
}
function W(t) {
  const n = T();
  n && (t(n.innerHTML), n.dispatchEvent(new Event("input", { bubbles: !0 })));
}
function xo(t, n, r) {
  const l = T();
  if (!l) return;
  t.style.outline = "";
  const a = t.closest("div");
  a && a.parentElement === l ? a.remove() : t.remove(), W(n), r == null || r();
}
function bo(t, n, r, l) {
  t && (t.style.width = n, t.removeAttribute("width"), t.style.outline = "", W(r), l == null || l());
}
function vo(t, n, r, l) {
  t && (t.style.display = "", t.style.margin = "", n === "left" ? (t.style.display = "block", t.style.margin = "0 auto 0 0") : n === "center" ? (t.style.display = "block", t.style.margin = "0 auto") : n === "right" && (t.style.display = "block", t.style.margin = "0 0 0 auto"), t.style.outline = "", W(r), l == null || l());
}
const wo = (t, n, r, l, a) => {
  if (typeof document < "u") {
    const i = T();
    if (i) {
      if (a) {
        const u = window.getSelection();
        u == null || u.removeAllRanges(), u == null || u.addRange(a);
      }
      document.execCommand("foreColor", !1, t);
      const c = i.innerHTML;
      n(c), r(c), l(!0);
    }
  }
}, ze = (t) => {
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
}, Nt = 16;
function Lt(t) {
  if (!t) return null;
  const n = t.match(/^([\d.]+)px$/);
  return n ? Math.round(parseFloat(n[1])) : null;
}
function Et(t, n) {
  let r = t;
  (r == null ? void 0 : r.nodeType) === Node.TEXT_NODE && (r = r.parentElement);
  const l = n ?? T();
  if (!r || !(r instanceof HTMLElement)) return Nt;
  let a = r;
  for (; a && a !== l; ) {
    if (a.style.fontSize) {
      const c = Lt(a.style.fontSize);
      if (c) return c;
    }
    a = a.parentElement;
  }
  return Lt(window.getComputedStyle(r).fontSize) ?? Nt;
}
const ko = (t, n, r, l, a) => {
  const i = T();
  if (!i) return;
  if (a) {
    const u = window.getSelection();
    u == null || u.removeAllRanges(), u == null || u.addRange(a);
  }
  document.execCommand("fontName", !1, t);
  const c = i.innerHTML;
  n(c), r(c), l(!0);
}, Co = 32;
function No(t) {
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
    var c, u;
    if (i.style.fontSize && (i.style.removeProperty("font-size"), (c = i.getAttribute("style")) != null && c.trim() || i.removeAttribute("style")), i.tagName === "FONT" && i.hasAttribute("size") && i.removeAttribute("size"), i.tagName === "SPAN" && !((u = i.getAttribute("style")) != null && u.trim()) && i.attributes.length === 0) {
      const m = i.parentNode;
      if (m) {
        for (; i.firstChild; ) m.insertBefore(i.firstChild, i);
        m.removeChild(i);
      }
    }
  });
}
const Lo = (t, n, r, l, a) => {
  const i = T();
  if (!i) return;
  if (a) {
    const p = window.getSelection();
    p == null || p.removeAllRanges(), p == null || p.addRange(a);
  }
  const c = window.getSelection();
  if (!c || c.rangeCount === 0) return;
  const u = c.getRangeAt(0);
  if (!i.contains(u.commonAncestorContainer)) return;
  if (!t || t === "default")
    No(u);
  else {
    const p = parseInt(t, 10);
    if (Number.isNaN(p) || p < 1 || p > Co) return;
    if (u.collapsed)
      document.execCommand("styleWithCSS", !1, "true"), document.execCommand("fontSize", !1, `${p}px`);
    else {
      const L = u.extractContents(), b = document.createElement("span");
      b.style.fontSize = `${p}px`, b.appendChild(L), u.insertNode(b);
      const A = document.createRange();
      A.selectNodeContents(b), c.removeAllRanges(), c.addRange(A);
    }
  }
  const m = i.innerHTML;
  n(m), r(m), l(!0);
};
function ee(t, n, r) {
  t.style.outline = "", W(n), r == null || r();
}
function Eo(t, n, r, l) {
  t && (t.style.backgroundColor = n, t.style.border = "none", ee(t, r, l));
}
function St(t, n, r, l) {
  t && (t.style.color = n, ee(t, r, l));
}
function So(t, n, r, l) {
  t && (t.style.borderRadius = n, ee(t, r, l));
}
function Mo(t, n, r, l) {
  if (!t) return;
  const a = t.closest("div");
  a && (a.style.textAlign = n, ee(t, r, l));
}
function Io(t, n, r, l) {
  t && (t.style.padding = n, ee(t, r, l));
}
function Ro(t, n, r) {
  const l = T();
  if (!l) return;
  t.style.outline = "";
  const a = t.closest("[data-editor-button-wrapper='true']");
  a && l.contains(a) ? a.remove() : t.remove(), W(n), r == null || r();
}
function To(t, n, r) {
  t && (t.style.color = "#000000", t.style.backgroundColor = "transparent", t.style.border = "2px solid #000000", ee(t, n, r));
}
function Ao(t, n, r) {
  t && (t.style.border = "none", ee(t, n, r));
}
function Do(t, n, r) {
  t && (t.style.padding = "0", ee(t, n, r));
}
function Bo(t, n, r, l) {
  t.src = n, t.style.outline = "", W(r), l == null || l();
}
function Fo(t, n, r, l) {
  const a = T();
  if (!a) return;
  a.focus();
  const i = window.getSelection();
  if (r.current && (i == null || i.removeAllRanges(), i == null || i.addRange(r.current), r.current = null), !i || i.rangeCount === 0) return;
  const c = i.getRangeAt(0);
  if (!a.contains(c.commonAncestorContainer)) return;
  c.deleteContents();
  const u = document.createElement("div");
  u.style.textAlign = "center", u.style.margin = "1rem 0";
  const m = document.createElement("img");
  m.src = t, m.alt = "Inserted image", m.style.display = "block", m.style.margin = "1rem auto", m.style.width = "100%", m.style.height = "auto", m.style.objectFit = "contain", m.style.borderRadius = "2px", u.appendChild(m);
  const p = document.createElement("p"), L = document.createTextNode(" ");
  p.appendChild(L), c.insertNode(u), c.insertNode(p), c.collapse();
  const b = document.createRange();
  b.setStart(L, 0), b.collapse(!0), i.removeAllRanges(), i.addRange(b), p.scrollIntoView({ behavior: "smooth", block: "center" });
  const A = a.innerHTML;
  n(A), l == null || l(A);
}
const Ho = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
`;
function Po(t, n, r, l, a) {
  const i = T();
  if (!i) return;
  i.focus();
  const c = window.getSelection();
  if (l.current && (c == null || c.removeAllRanges(), c == null || c.addRange(l.current), l.current = null), !c || c.rangeCount === 0) return;
  const u = c.getRangeAt(0);
  if (!i.contains(u.commonAncestorContainer)) return;
  u.deleteContents();
  const m = document.createElement("div");
  m.contentEditable = "false", m.style.textAlign = "center", m.style.margin = "20px 0", m.style.userSelect = "none", m.setAttribute("data-editor-button-wrapper", "true");
  const p = document.createElement("a");
  p.href = n, p.textContent = t, p.style.cssText = Ho, p.setAttribute("target", "_blank"), p.setAttribute("rel", "noopener noreferrer"), m.appendChild(p);
  const L = document.createElement("p");
  L.innerHTML = "<br>", u.insertNode(m), u.insertNode(L), u.setStartAfter(L), u.collapse(!0), c.removeAllRanges(), c.addRange(u);
  const b = i.innerHTML;
  r(b), a == null || a(b);
}
function Oo(t, n, r) {
  const l = T();
  if (!l) return;
  const a = window.getSelection();
  if (!a || a.rangeCount === 0) return;
  const i = a.getRangeAt(0);
  if (!l.contains(i.commonAncestorContainer)) return;
  i.deleteContents();
  const c = document.createTextNode(t);
  i.insertNode(c), i.setStartAfter(c), i.setEndAfter(c), a.removeAllRanges(), a.addRange(i), n(l.innerHTML), r == null || r();
}
function Wo(t, n, r) {
  const l = T();
  if (!l || !l.contains(t.commonAncestorContainer)) return;
  t.deleteContents();
  const a = document.createTextNode(n);
  t.insertNode(a);
  const i = window.getSelection();
  if (i) {
    const c = document.createRange();
    c.setStartAfter(a), c.collapse(!0), i.removeAllRanges(), i.addRange(c);
  }
  r(l.innerHTML);
}
function _o(t) {
  return Dn(t, {
    removeStyleTags: !0,
    applyAttributesTableElements: !0,
    preserveImportant: !0
  });
}
function zo(t) {
  return new DOMParser().parseFromString(t, "text/html").querySelectorAll("style").length > 0;
}
function qo(t, n, r) {
  let l = "";
  const a = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null);
  let i;
  for (; i = a.nextNode(); ) {
    const c = i;
    if (c === n) {
      l += c.data.slice(0, r);
      break;
    }
    l += c.data;
  }
  return l;
}
function Mt(t, n) {
  let r = n;
  const l = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null);
  let a;
  for (; a = l.nextNode(); ) {
    const i = a, c = i.data.length;
    if (r < c) return { node: i, offset: r };
    if (r === c) return { node: i, offset: c };
    r -= c;
  }
  return null;
}
const qe = "customer", je = "event";
function jo(t) {
  return t === "" ? { group: "both", query: "" } : t.startsWith(qe) ? { group: "customer", query: t.slice(qe.length) } : t.startsWith(je) ? { group: "event", query: t.slice(je.length) } : qe.startsWith(t) ? { group: "customer", query: "" } : je.startsWith(t) ? { group: "event", query: "" } : null;
}
function It(t, n, r) {
  if (n.nodeType !== Node.TEXT_NODE) return null;
  const l = qo(t, n, r), a = l.lastIndexOf("@");
  if (a < 0 || a > 0 && /[a-zA-Z0-9_]/.test(l.charAt(a - 1))) return null;
  const c = l.slice(a).match(/^@([a-zA-Z0-9_]*)$/);
  if (!c) return null;
  const u = c[1] ?? "", m = jo(u);
  if (!m) return null;
  const p = `@${u}`, L = l.length - p.length;
  return {
    group: m.group,
    query: m.query,
    matchLength: p.length,
    startOffset: L
  };
}
function Rt(t) {
  return /\{\{\s*customer\./.test(t.value);
}
function Tt(t) {
  return /\{\{\s*event\./.test(t.value);
}
function Uo(t, n, r) {
  const l = n === "both" ? t.filter((i) => Rt(i) || Tt(i)) : t.filter((i) => n === "customer" ? Rt(i) : Tt(i)), a = r.trim().toLowerCase();
  return a ? l.filter(
    (i) => i.label.toLowerCase().includes(a) || i.value.toLowerCase().replace(/\s/g, "").includes(a)
  ) : l;
}
const At = 280, Xo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M3 7v6h6" }),
  /* @__PURE__ */ e("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" })
] }), $o = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M21 7v6h-6" }),
  /* @__PURE__ */ e("path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" })
] }), Vo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" }),
  /* @__PURE__ */ e("path", { d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" })
] }), Go = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "19", y1: "4", x2: "10", y2: "4" }),
  /* @__PURE__ */ e("line", { x1: "14", y1: "20", x2: "5", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "4", x2: "9", y2: "20" })
] }), Yo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "21", x2: "20", y2: "21" })
] }), Jo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 6.5 3.9h.2m6.2 3.8c.2.5.3 1.1.3 1.7 0 4-3.3 4.7-7 4.7-3.5 0-5.5-.5-7.5-2" }),
  /* @__PURE__ */ e("line", { x1: "2", y1: "12", x2: "22", y2: "12" })
] }), Zo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "10", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "18", x2: "21", y2: "18" }),
  /* @__PURE__ */ e("path", { d: "M4 6h1v4" }),
  /* @__PURE__ */ e("path", { d: "M4 10h2" }),
  /* @__PURE__ */ e("path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" })
] }), Ko = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "9", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "12", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "18", r: "1", fill: "currentColor", stroke: "none" })
] }), Qo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
  /* @__PURE__ */ e("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
] }), er = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H1" }), tr = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H2" }), nr = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H3" }), or = () => /* @__PURE__ */ e(
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
), rr = () => /* @__PURE__ */ e(
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
), lr = () => /* @__PURE__ */ e(
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
), ir = () => /* @__PURE__ */ e(
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
), sr = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "4", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ e("polyline", { points: "2 4 2 8" }),
  /* @__PURE__ */ e("polyline", { points: "2 16 2 20" }),
  /* @__PURE__ */ e("line", { x1: "2", y1: "4", x2: "2", y2: "20" })
] }), ar = () => /* @__PURE__ */ f(
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
), cr = ({ size: t }) => /* @__PURE__ */ f("span", { className: "inline-flex items-center leading-none gap-0.5", "aria-hidden": !0, children: [
  /* @__PURE__ */ e("span", { style: { fontSize: 11, fontWeight: 700, fontVariantNumeric: "tabular-nums", minWidth: 14, textAlign: "center" }, children: t }),
  /* @__PURE__ */ f("svg", { width: "8", height: "12", viewBox: "0 0 8 12", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M4 1v10" }),
    /* @__PURE__ */ e("path", { d: "M1.5 3.5 4 1l2.5 2.5" }),
    /* @__PURE__ */ e("path", { d: "M1.5 8.5 4 11l2.5-2.5" })
  ] })
] }), dr = () => /* @__PURE__ */ e(
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
), ur = () => /* @__PURE__ */ f(
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
), Ue = () => /* @__PURE__ */ e("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ e("polyline", { points: "6 9 12 15 18 9" }) }), fr = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ e("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  /* @__PURE__ */ e("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
] }), hr = () => /* @__PURE__ */ f("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("polyline", { points: "16 18 22 12 16 6" }),
  /* @__PURE__ */ e("polyline", { points: "8 6 2 12 8 18" })
] }), mr = () => /* @__PURE__ */ f("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2", ry: "2" }),
  /* @__PURE__ */ e("circle", { cx: "12", cy: "17", r: "1", fill: "currentColor", stroke: "none" })
] }), pr = ({
  value: t = "",
  onChange: n,
  readOnly: r = !1,
  placeholder: l,
  onFetchImages: a,
  onUploadImage: i,
  onDeleteImage: c,
  enablePreview: u = !0,
  enableCodeEditor: m = !0,
  height: p = 500,
  className: L = "",
  previewData: b,
  toolbarContent: A,
  showCodeEditor: ie,
  onShowCodeEditorChange: se,
  showPreview: he,
  onShowPreviewChange: Y,
  hideViewToggles: ae = !1,
  onOpenImageModal: Z,
  insertableAttributes: J,
  recentColors: te,
  onColorUsed: q
}, me) => {
  const [$, k] = x(t), [D, K] = x(t), [j, C] = x(t), [qt, pe] = x(j), [jt, Ut] = x(!1), [Xt, $t] = x(!1), Vt = ie !== void 0, Gt = he !== void 0, _ = Vt ? ie : Xt, P = Gt ? he : jt, $e = (o) => {
    const s = typeof o == "function" ? o(_) : o;
    se ? se(s) : $t(s);
  }, Ve = (o) => {
    const s = typeof o == "function" ? o(P) : o;
    Y ? Y(s) : Ut(s);
  }, [Yt, Ge] = x(!1), [Jt, ge] = x(!1), [Zt, Ne] = x(!1), [Kt, Le] = x(!1), [Ye, Ee] = x(null), [I, ne] = x(null), [Je, Qt] = x({ top: 0, left: 0 }), [V, Se] = x(null), [U, Me] = x(null), [Ie, ye] = x(null), [ce, en] = x(null), [tn, Re] = x(!1), [Ze, Ke] = x("#000000"), [nn, Te] = x(16), [Qe, et] = x("#000000"), [on, tt] = x([]), [rn, nt] = x(null), [gr, ot] = x(!1), [yr, rt] = x(!1), [xr, lt] = x(!1), [br, it] = x(!1), [S, oe] = x(null), [st, ln] = x({ top: 0, left: 0 }), [g, B] = x(null), [at, sn] = x({ top: 0, left: 0 }), [ct, an] = x({ top: 0, left: 0 }), [X, F] = x(null), dt = ue(J);
  dt.current = J;
  const ut = ue(null), xe = ue(null);
  R(() => {
    t !== D && (k(t), K(t), C(t));
  }, [t]), R(() => {
    const o = document.querySelector(".rsw-editor .rsw-ce");
    if (!o) return;
    const s = o.querySelector("#selection-marker");
    s && po(s);
  }, [D]), R(() => {
    let o = null;
    const s = (d) => {
      const h = d.target;
      if (!h) return;
      const y = h.closest(".rsw-editor .rsw-ce img"), v = document.querySelector(".rsw-editor .rsw-ce");
      y && (v != null && v.contains(y)) ? (o && o !== y && (o.style.outline = "none"), y.style.outline = "2px solid red", o = y, oe({ element: y, x: d.clientX, y: d.clientY })) : (o && (o.style.outline = "none", o = null), oe(null));
    };
    return document.addEventListener("click", s), () => document.removeEventListener("click", s);
  }, []), R(() => {
    let o = null, s = null;
    const d = (h) => {
      const y = h.target;
      if (!y) return;
      const v = y.closest(".rsw-editor .rsw-ce a"), w = document.querySelector(".rsw-editor .rsw-ce");
      v && (w != null && w.contains(v)) ? (h.preventDefault(), !!v.closest("[data-editor-button-wrapper='true']") || !!v.style.backgroundColor && !!v.style.padding ? (s && (s.style.outline = "none", s = null), ne(null), o && o !== v && (o.style.outline = "none", o.style.boxShadow = ""), v.style.outline = "3px solid #4f46e5", v.style.boxShadow = "0 0 0 5px rgba(79,70,229,0.18)", o = v, B({ element: v, x: h.clientX, y: h.clientY })) : (o && (o.style.outline = "none", o.style.boxShadow = "", o = null), B(null), s && s !== v && (s.style.outline = "none"), v.style.outline = "2px solid #0ea5e9", s = v, ne({ element: v, x: h.clientX, y: h.clientY }))) : (o && (o.style.outline = "none", o.style.boxShadow = "", o = null), s && (s.style.outline = "none", s = null), B(null), ne(null));
    };
    return document.addEventListener("click", d), () => document.removeEventListener("click", d);
  }, []), R(() => {
    const o = () => {
      const s = ut.current, d = window.getSelection();
      if (!d || !s || !s.contains(d.anchorNode)) {
        tt([]), nt(null), ot(!1), rt(!1), lt(!1), it(!1);
        return;
      }
      const h = d.getRangeAt(0);
      tt(d.isCollapsed ? [] : Array.from(h.getClientRects()));
      let y = d.anchorNode;
      const v = s.querySelector(".rsw-ce");
      if ((y == null ? void 0 : y.nodeType) === Node.TEXT_NODE && (y = y.parentElement), y instanceof HTMLElement) {
        Ke(ze(window.getComputedStyle(y).color)), Te(Et(y, v));
        const w = y.closest("h1, h2, h3");
        nt(w ? w.tagName.toLowerCase() : null), ot(document.queryCommandState("bold")), rt(document.queryCommandState("italic")), lt(document.queryCommandState("underline")), it(document.queryCommandState("strikeThrough"));
      }
    };
    return document.addEventListener("selectionchange", o), window.addEventListener("scroll", o, !0), () => {
      document.removeEventListener("selectionchange", o), window.removeEventListener("scroll", o, !0);
    };
  }, []), R(() => {
    if (!(S != null && S.element)) return;
    const o = S.element, s = o.closest(".rsw-editor .rsw-ce");
    if (!s) return;
    const d = o.getBoundingClientRect(), h = s.getBoundingClientRect(), y = 150, v = 50;
    let w = d.top - h.top, N = d.right - h.left + 8;
    N + y > h.width && (N = d.left - h.left - y - 8), w + v > h.height && (w = h.height - v - 8), w < 0 && (w = 8), N < 0 && (N = 8), ln({ top: w, left: N });
  }, [S == null ? void 0 : S.element]), R(() => {
    if (!(g != null && g.element)) return;
    const o = g.element, s = o.closest(".rsw-editor .rsw-ce");
    if (!s) return;
    const d = o.getBoundingClientRect(), h = s.getBoundingClientRect(), y = 100, v = 200;
    let w = d.top - h.top, N = d.right - h.left + y;
    N + v > h.width && (N = d.left - h.left - v - y), N < y && (N = y), w < y && (w = y), sn({ top: w, left: N }), an({
      top: Math.max(4, d.top - h.top - 26),
      left: d.left - h.left + d.width / 2
    });
  }, [g]), R(() => {
    if (!(I != null && I.element)) return;
    const o = I.element, s = o.closest(".rsw-editor .rsw-ce");
    if (!s) return;
    const d = o.getBoundingClientRect(), h = s.getBoundingClientRect(), y = 8, v = 200;
    let w = d.bottom - h.top + y, N = d.left - h.left;
    N + v > h.width && (N = h.width - v - y), N < y && (N = y), w + 100 > h.height && (w = d.top - h.top - 100), Qt({ top: w, left: N });
  }, [I]);
  const Ae = b != null && Object.keys(b).length > 0;
  R(() => {
    if (!P || !Ae) {
      pe(j);
      return;
    }
    pe(j), Q.parseAndRender(j, b).then(pe).catch(() => pe(j));
  }, [P, Ae, j, b]);
  const cn = wt(() => zo($), [$]), { wordCount: ft, charCount: ht } = wt(() => {
    const o = $.replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
    return { wordCount: o.length === 0 ? 0 : o.split(" ").filter(Boolean).length, charCount: o.replace(/ /g, "").length };
  }, [$]), O = (o) => {
    k(o);
    const s = mo(D, o);
    K(s), C(s), n == null || n(s);
  }, mt = ue(O);
  mt.current = O;
  const De = Sn((o) => {
    const s = T(), d = window.getSelection();
    if (!s || !d || d.rangeCount === 0) return;
    const h = d.anchorNode;
    if (!h) return;
    const y = d.anchorOffset, v = It(s, h, y);
    if (!v) return;
    const w = Mt(s, v.startOffset);
    if (!w || h.nodeType !== Node.TEXT_NODE) return;
    const N = document.createRange();
    N.setStart(w.node, w.offset), N.setEnd(h, y), Wo(N, o, mt.current);
  }, []);
  R(() => {
    if (!(J != null && J.length) || r || _ || P) {
      F(null);
      return;
    }
    const o = () => {
      const s = dt.current;
      if (!(s != null && s.length)) {
        F(null);
        return;
      }
      const d = T(), h = window.getSelection();
      if (!d || !h || h.rangeCount === 0 || !h.isCollapsed) {
        F(null);
        return;
      }
      const y = h.anchorNode, v = h.anchorOffset;
      if (!y || !d.contains(y)) {
        F(null);
        return;
      }
      if (y.nodeType !== Node.TEXT_NODE) {
        F(null);
        return;
      }
      const w = It(d, y, v);
      if (!w) {
        F(null);
        return;
      }
      const N = Uo(s, w.group, w.query), Be = Mt(d, w.startOffset);
      if (!Be) {
        F(null);
        return;
      }
      const Fe = document.createRange();
      Fe.setStart(Be.node, Be.offset), Fe.setEnd(y, v);
      const vt = Fe.getBoundingClientRect();
      F((ve) => {
        const Nn = ve && ve.group === w.group && ve.query === w.query;
        return {
          group: w.group,
          query: w.query,
          items: N,
          highlightIndex: Nn ? Math.min(ve.highlightIndex, Math.max(0, N.length - 1)) : 0,
          left: vt.left,
          top: vt.bottom + 4
        };
      });
    };
    return document.addEventListener("input", o, !0), document.addEventListener("keyup", o, !0), document.addEventListener("selectionchange", o), () => {
      document.removeEventListener("input", o, !0), document.removeEventListener("keyup", o, !0), document.removeEventListener("selectionchange", o);
    };
  }, [J, r, _, P]), R(() => {
    if (!X) return;
    const o = (s) => {
      if (s.key === "Escape") {
        s.preventDefault(), F(null);
        return;
      }
      if (s.key === "ArrowDown") {
        s.preventDefault(), F(
          (d) => d && d.items.length ? { ...d, highlightIndex: Math.min(d.items.length - 1, d.highlightIndex + 1) } : d
        );
        return;
      }
      if (s.key === "ArrowUp") {
        s.preventDefault(), F((d) => d && d.items.length ? { ...d, highlightIndex: Math.max(0, d.highlightIndex - 1) } : d);
        return;
      }
      (s.key === "Enter" || s.key === "Tab" && !s.shiftKey) && (s.preventDefault(), F((d) => {
        if (!d || d.items.length === 0) return null;
        const h = d.items[d.highlightIndex];
        return h && De(h.value), null;
      }));
    };
    return document.addEventListener("keydown", o, !0), () => document.removeEventListener("keydown", o, !0);
  }, [X, De]);
  const be = () => {
    const o = window.getSelection();
    o && o.rangeCount > 0 && en(o.getRangeAt(0).cloneRange());
  }, pt = (o) => {
    wo(o, O, C, () => {
    }, ce), Ke(o), Re(!1), q == null || q(o);
  }, dn = (o) => {
    g != null && g.element && Eo(g.element, o, C, () => B(null)), q == null || q(o);
  }, un = (o) => {
    g != null && g.element && St(g.element, o, C, () => B(null)), q == null || q(o);
  }, fn = (o) => {
    ko(o, O, C, () => {
    }, ce);
  }, hn = (o) => {
    Lo(o, O, C, () => {
    }, ce);
    const s = document.querySelector(".rsw-editor .rsw-ce"), d = window.getSelection();
    if (o) {
      const h = parseInt(o, 10);
      Number.isNaN(h) || Te(h);
    } else d != null && d.anchorNode && s && Te(Et(d.anchorNode, s));
  }, mn = (o) => {
    if (ce) {
      const s = window.getSelection();
      s == null || s.removeAllRanges(), s == null || s.addRange(ce);
    }
    yo(o, O);
  }, gt = () => {
    try {
      const o = _o($);
      k(o), K(o), C(o), n == null || n(o), kt.success("CSS inlined successfully!");
    } catch {
      kt.error("Failed to inline CSS.");
    }
  }, yt = () => {
    if (!Ie) {
      const o = document.querySelector(".rsw-editor .rsw-ce");
      if (o) {
        const s = window.getSelection();
        if (s && s.rangeCount > 0) {
          const d = s.getRangeAt(0);
          o.contains(d.commonAncestorContainer) && (xe.current = d.cloneRange());
        }
      }
    }
    Z ? Z() : Ge(!0);
  }, xt = (o) => {
    if (Ie) {
      Bo(Ie, o, C, () => ye(null));
      return;
    }
    Fo(o, C, xe);
  }, pn = () => {
    const o = window.getSelection();
    o && o.rangeCount > 0 && (xe.current = o.getRangeAt(0).cloneRange()), ge(!0);
  }, gn = (o) => {
    const { buttonText: s, buttonUrl: d } = o;
    !s || !d || (U ? (U.textContent = s, U.href = d, U.style.outline = "", W(C), Me(null)) : Po(s, d, C, xe, O), ge(!1));
  };
  Mn(me, () => ({
    insert: (o) => {
      Oo(o, C);
    },
    inlineCss: () => gt(),
    insertImage: (o) => xt(o),
    clearImageToReplace: () => ye(null)
  }));
  const yn = Zn(
    () => {
      S != null && S.element && (ye(S.element), yt());
    },
    () => (S == null ? void 0 : S.element) && xo(S.element, C, () => oe(null)),
    (o) => (S == null ? void 0 : S.element) && vo(S.element, o, C, () => oe(null)),
    (o) => (S == null ? void 0 : S.element) && bo(S.element, o, C, () => oe(null))
  ), xn = () => {
    g != null && g.element && (Me(g.element), B(null), ge(!0));
  }, bn = (() => {
    const o = g == null ? void 0 : g.element, s = Kn(
      () => (g == null ? void 0 : g.element) && Ro(g.element, C, () => B(null)),
      () => (g == null ? void 0 : g.element) && To(g.element, C, () => B(null)),
      () => (g == null ? void 0 : g.element) && Ao(g.element, C, () => B(null)),
      () => (g == null ? void 0 : g.element) && Do(g.element, C, () => B(null)),
      dn,
      un,
      (d) => (g == null ? void 0 : g.element) && So(g.element, d, C, () => B(null)),
      (d) => (g == null ? void 0 : g.element) && Io(g.element, d, C, () => B(null)),
      (d) => (g == null ? void 0 : g.element) && Mo(g.element, d, C, () => B(null)),
      {
        background: o ? ze(o.style.backgroundColor || "#3b82f6") : "#3b82f6",
        text: o ? ze(o.style.color || "#ffffff") : "#ffffff"
      },
      te
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
        ] }), onClick: xn },
        { type: "divider" },
        ...s.items ?? []
      ]
    };
  })(), vn = Qn(
    () => {
      I != null && I.element && (Se(I.element), ne(null), Le(!0));
    },
    () => {
      I != null && I.element && (I.element.style.outline = "", I.element.replaceWith(...Array.from(I.element.childNodes)), W(C), ne(null));
    },
    (o) => (I == null ? void 0 : I.element) && St(I.element, o, C, () => ne(null))
  );
  Jn(pt);
  const wn = to(fn), kn = oo(hn), Cn = lo(mn), bt = typeof p == "number" ? `${p}px` : p;
  return /* @__PURE__ */ f("div", { className: `bg-white border rounded-xl overflow-hidden flex flex-col ${L}`, style: { minWidth: 400 }, children: [
    /* @__PURE__ */ f(
      "div",
      {
        className: `bg-white flex flex-wrap items-center gap-0.5 px-2 py-1.5 ${r && !_ && !P ? "pointer-events-none opacity-50" : ""}`,
        style: { boxShadow: "0 1px 0 #e5e7eb" },
        children: [
          !_ && !P && /* @__PURE__ */ f(H, { children: [
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Undo", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("undo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Xo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Redo", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("redo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e($o, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: ["h1", "h2", "h3"].map((o, s) => {
              const d = [er, tr, nr][s], h = rn === o;
              return /* @__PURE__ */ e(E, { title: h ? "Remove heading" : `Heading ${s + 1}`, children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (y) => {
                    y.preventDefault(), document.execCommand("formatBlock", !1, h ? "p" : o), setTimeout(() => W(C), 0);
                  },
                  className: "toolbar-btn",
                  style: h ? { background: "#1e293b", color: "#fff", borderColor: "#1e293b" } : void 0,
                  children: /* @__PURE__ */ e(d, {})
                }
              ) }, o);
            }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Bold (Ctrl+B)", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("bold");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Vo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Italic (Ctrl+I)", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("italic");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Go, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Underline (Ctrl+U)", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("underline");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Yo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Strikethrough", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("strikeThrough");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Jo, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Numbered List", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("insertOrderedList"), setTimeout(() => W(C), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Zo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Bullet List", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("insertUnorderedList"), setTimeout(() => W(C), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Ko, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Insert Link", children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (o) => {
                    o.preventDefault();
                    const s = window.getSelection();
                    s && s.rangeCount > 0 && Ee(s.getRangeAt(0).cloneRange()), Ne(!0);
                  },
                  className: "toolbar-btn",
                  children: /* @__PURE__ */ e(Qo, {})
                }
              ) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Align Left", children: /* @__PURE__ */ e("button", { onClick: () => we("left", O), className: "toolbar-btn", children: /* @__PURE__ */ e(or, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Align Center", children: /* @__PURE__ */ e("button", { onClick: () => we("center", O), className: "toolbar-btn", children: /* @__PURE__ */ e(rr, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Align Right", children: /* @__PURE__ */ e("button", { onClick: () => we("right", O), className: "toolbar-btn", children: /* @__PURE__ */ e(lr, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Justify", children: /* @__PURE__ */ e("button", { onClick: () => we("justify", O), className: "toolbar-btn", children: /* @__PURE__ */ e(ir, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(E, { title: "Line spacing", children: /* @__PURE__ */ e(re, { menu: Cn, trigger: ["click"], onOpenChange: (o) => {
              o && be();
            }, children: /* @__PURE__ */ f("button", { type: "button", className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              /* @__PURE__ */ e(sr, {}),
              /* @__PURE__ */ e(Ue, {})
            ] }) }) }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Insert Image", children: /* @__PURE__ */ e("button", { onClick: yt, className: "toolbar-btn", children: /* @__PURE__ */ e(dr, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Insert Button", children: /* @__PURE__ */ e("button", { onClick: pn, className: "toolbar-btn", children: /* @__PURE__ */ e(ur, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(E, { title: "Text Color", children: /* @__PURE__ */ e(
              Ht,
              {
                value: Qe,
                open: tn,
                onOpenChange: (o) => {
                  Re(o), o && (be(), et(Ze));
                },
                onChange: (o) => et(o.toHexString()),
                presets: te && te.length > 0 ? [{ label: "Recent", colors: te }] : void 0,
                panelRender: (o) => /* @__PURE__ */ f("div", { children: [
                  o,
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "border text-xs px-2 py-1 mt-1 rounded hover:bg-gray-50",
                      onClick: () => {
                        pt(Qe), Re(!1);
                      },
                      children: "Apply"
                    }
                  )
                ] }),
                children: /* @__PURE__ */ e("button", { type: "button", className: "toolbar-btn", children: /* @__PURE__ */ e("div", { style: { width: 18, height: 18, backgroundColor: Ze, borderRadius: 2, border: "1px solid #e5e7eb" } }) })
              }
            ) }) }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(E, { title: "Font Family", children: /* @__PURE__ */ e(re, { menu: wn, trigger: ["click"], onOpenChange: (o) => {
              o && be();
            }, children: /* @__PURE__ */ f("button", { className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              /* @__PURE__ */ e(ar, {}),
              " ",
              /* @__PURE__ */ e(Ue, {})
            ] }) }) }) }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(E, { title: "Font Size", children: /* @__PURE__ */ e(re, { menu: kn, trigger: ["click"], onOpenChange: (o) => {
              o && be();
            }, children: /* @__PURE__ */ f("button", { type: "button", className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              /* @__PURE__ */ e(cr, { size: nn }),
              " ",
              /* @__PURE__ */ e(Ue, {})
            ] }) }) }) })
          ] }),
          !ae && _ && cn && /* @__PURE__ */ e(E, { title: "Inline all <style> tags into element attributes for email clients", children: /* @__PURE__ */ f(
            "button",
            {
              onClick: gt,
              className: "flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-white animate-pulse flex-shrink-0",
              children: [
                /* @__PURE__ */ e(fr, {}),
                " Inline CSS"
              ]
            }
          ) }),
          !ae && /* @__PURE__ */ f("div", { className: "ml-auto flex items-center gap-1 flex-shrink-0", children: [
            m && /* @__PURE__ */ e(E, { title: "Toggle HTML source editor", children: /* @__PURE__ */ f(
              "button",
              {
                onClick: () => {
                  $e((o) => !o), Ve(!1);
                },
                className: `flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${_ ? "bg-gray-800 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`,
                children: [
                  /* @__PURE__ */ e(hr, {}),
                  _ ? "Editor" : "HTML"
                ]
              }
            ) }),
            u && /* @__PURE__ */ e(E, { title: "Toggle phone preview", children: /* @__PURE__ */ f(
              "button",
              {
                onClick: () => {
                  Ve((o) => !o), $e(!1);
                },
                className: `flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${P ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`,
                children: [
                  /* @__PURE__ */ e(mr, {}),
                  P ? "Close" : "Preview"
                ]
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex flex-1 min-h-0", style: { height: bt }, children: /* @__PURE__ */ e(
      "div",
      {
        className: "flex-1 relative overflow-hidden min-h-0",
        style: _ || P ? { minHeight: 300 } : void 0,
        children: P ? /* @__PURE__ */ e("div", { className: "h-full overflow-y-auto flex items-start justify-center p-4 bg-gray-100", children: /* @__PURE__ */ e(Wn, { srcDoc: Ae ? qt : j }) }) : _ ? /* @__PURE__ */ e(
          On,
          {
            height: bt,
            defaultLanguage: "html",
            defaultValue: D,
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
        ) : /* @__PURE__ */ f("div", { className: "relative h-full", ref: ut, children: [
          /* @__PURE__ */ e(
            Fn,
            {
              value: $,
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
          S && /* @__PURE__ */ e("div", { style: { position: "absolute", top: st.top - 100, left: st.left - 100, zIndex: 1e3, width: 150 }, children: /* @__PURE__ */ e(re, { menu: yn, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || oe(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          g && /* @__PURE__ */ e("div", { style: { position: "absolute", top: at.top, left: at.left, zIndex: 1e3, width: 260 }, children: /* @__PURE__ */ e(re, { menu: bn, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || B(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          g && /* @__PURE__ */ e(
            "div",
            {
              style: {
                position: "absolute",
                top: ct.top,
                left: ct.left,
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
          I && /* @__PURE__ */ e("div", { style: { position: "absolute", top: Je.top, left: Je.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(re, { menu: vn, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || (I.element.style.outline = "none", ne(null));
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          on.map((o, s) => /* @__PURE__ */ e(
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
          !_ && !P && /* @__PURE__ */ e(E, { title: `${ht.toLocaleString()} characters`, children: /* @__PURE__ */ f("span", { className: "text-xs tabular-nums cursor-default", style: { color: "#cbd5e1" }, children: [
            ft.toLocaleString(),
            " ",
            ft === 1 ? "word" : "words",
            " · ",
            ht.toLocaleString(),
            " chars"
          ] }) })
        ]
      }
    ),
    !Z && /* @__PURE__ */ e(
      _n,
      {
        show: Yt,
        onClose: () => {
          Ge(!1), ye(null);
        },
        onSelectImage: xt,
        onFetchImages: a,
        onUploadImage: i,
        onDeleteImage: c
      }
    ),
    /* @__PURE__ */ e(
      Pe,
      {
        show: Jt,
        title: U ? "Edit Button" : "Insert Button",
        fields: [
          { name: "buttonText", label: "Button Text", placeholder: "Click Here", defaultValue: (U == null ? void 0 : U.textContent) ?? "" },
          { name: "buttonUrl", label: "Button URL", placeholder: "https://", defaultValue: (U == null ? void 0 : U.getAttribute("href")) ?? "" }
        ],
        onConfirm: gn,
        onClose: () => {
          ge(!1), Me(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      Pe,
      {
        show: Kt,
        title: "Edit Link",
        fields: [
          { name: "linkText", label: "Link Text", placeholder: "Click here", defaultValue: (V == null ? void 0 : V.textContent) ?? "", required: !0 },
          { name: "url", label: "URL", placeholder: "https://", defaultValue: (V == null ? void 0 : V.getAttribute("href")) ?? "", required: !0 }
        ],
        onConfirm: ({ linkText: o, url: s }) => {
          V && (V.textContent = o, V.href = s, V.style.outline = "", W(C), Se(null)), Le(!1);
        },
        onClose: () => {
          Le(!1), Se(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      Pe,
      {
        show: Zt,
        title: "Insert Link",
        fields: [
          { name: "url", label: "URL", placeholder: "https://", required: !0 },
          { name: "linkText", label: "Link Text", placeholder: "Displayed text (optional)", required: !1 }
        ],
        onConfirm: ({ url: o, linkText: s }) => {
          var w, N;
          Ne(!1);
          const d = document.querySelector(".rsw-editor .rsw-ce");
          if (!d || !o) return;
          d.focus();
          const h = window.getSelection();
          Ye && (h == null || h.removeAllRanges(), h == null || h.addRange(Ye)), document.execCommand("createLink", !1, o);
          const y = window.getSelection(), v = (N = (w = y == null ? void 0 : y.anchorNode) == null ? void 0 : w.parentElement) == null ? void 0 : N.closest("a");
          v && (v.style.color = "#0ea5e9", s && (v.textContent = s)), Ee(null), setTimeout(() => W(C), 0);
        },
        onClose: () => {
          Ne(!1), Ee(null);
        }
      }
    ),
    X && typeof document < "u" && In(
      /* @__PURE__ */ e(
        "div",
        {
          role: "listbox",
          "aria-label": X.group === "customer" ? "Customer attributes" : X.group === "event" ? "Event attributes" : "Customer and event attributes",
          className: "flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-xl",
          style: {
            position: "fixed",
            zIndex: 10050,
            left: X.left,
            top: X.top,
            minWidth: 220,
            maxWidth: 320,
            maxHeight: At
          },
          onMouseDown: (o) => o.preventDefault(),
          children: /* @__PURE__ */ e(
            "div",
            {
              className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-1",
              style: {
                maxHeight: At,
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch"
              },
              children: X.items.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 py-2 text-xs text-gray-500", children: "No matching attributes" }) : X.items.map((o, s) => /* @__PURE__ */ f(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": s === X.highlightIndex,
                  className: `flex w-full flex-col items-start px-3 py-2 text-left text-xs ${s === X.highlightIndex ? "bg-indigo-50 text-indigo-900" : "text-gray-800 hover:bg-gray-50"}`,
                  onMouseDown: (d) => {
                    d.preventDefault(), De(o.value), F(null);
                  },
                  onMouseEnter: () => F((d) => d && { ...d, highlightIndex: s }),
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
}, Dr = En(
  pr
);
function Br() {
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
  Dr as CDPEditor,
  Ir as COMMON_CURRENCY_CODES,
  _n as ImagePickerModal,
  Pe as InputModal,
  On as MonacoEditorWrapper,
  Wn as PhonePreview,
  ao as VALID_CURRENCY_CODES,
  Fn as WysiwygEditor,
  yo as applyLineHeightToSelection,
  ko as changeFontFamily,
  Lo as changeFontSize,
  wo as changeHighlightColor,
  Dr as default,
  _o as handleInlineCSS,
  Po as insertButtonAtCursorInEditor,
  Fo as insertImageAtCursorInEditor,
  Oo as insertTextIntoEditorAtSelection,
  co as isValidCurrencyCode,
  Q as liquidEngine,
  zo as needsInliningDetailed,
  ze as normalizeColor,
  mo as replaceBodyContent,
  Wo as replaceEditorRangeWithText,
  Br as useOnlineStatus,
  Rr as validateCurrencyCodes,
  Tr as validateLiquidTemplate,
  Ar as wrapEmailBodyHtml
};
//# sourceMappingURL=email-editor.es.js.map
