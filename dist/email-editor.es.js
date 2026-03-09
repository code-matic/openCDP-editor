import { jsx as e, jsxs as g, Fragment as Xe } from "react/jsx-runtime";
import xt, { lazy as $e, Suspense as Ve, useState as x, useEffect as T, useRef as ke, forwardRef as wt, useMemo as kt, useImperativeHandle as vt } from "react";
import { Form as ye, Modal as ze, Input as Ct, Tooltip as M, ColorPicker as Nt, Dropdown as se } from "antd";
import { toast as _e } from "sonner";
import { Liquid as Lt } from "liquidjs";
import { codes as Et } from "currency-codes";
import It from "juice";
const Mt = $e(() => import("react-simple-wysiwyg")), Rt = ({
  value: t,
  onChange: r,
  placeholder: o,
  containerProps: l,
  disabled: s,
  onFocus: a,
  onBlur: d
}) => /* @__PURE__ */ e("div", { ...l, children: /* @__PURE__ */ e(Ve, { fallback: /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-100 animate-pulse rounded flex items-center justify-center text-gray-400 text-sm", children: "Loading editor…" }), children: /* @__PURE__ */ e(
  Mt,
  {
    value: t,
    onChange: r,
    placeholder: o,
    spellCheck: !1,
    disabled: s,
    onFocus: a,
    onBlur: d
  }
) }) }), St = $e(() => import("@monaco-editor/react"));
function At(t) {
  typeof t.addAction == "function" && t.addAction({
    id: "editor.action.formatDocument.menu",
    label: "Format Document",
    contextMenuOrder: 1.5,
    run: (r) => {
      var l;
      const o = (l = r == null ? void 0 : r.getAction) == null ? void 0 : l.call(r, "editor.action.formatDocument");
      o != null && o.run && o.run();
    }
  });
}
const Dt = ({
  height: t = "100%",
  defaultLanguage: r = "html",
  defaultValue: o = "",
  onChange: l,
  theme: s = "vs-dark",
  options: a = {},
  className: d,
  onMount: c
}) => {
  const [u, k] = x(!1), S = xt.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (R) => {
      At(R), c == null || c(R);
    },
    [c]
  );
  T(() => {
    k(!0);
  }, []);
  const N = /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-900 rounded flex items-center justify-center text-gray-400 text-sm animate-pulse", children: "Loading code editor…" });
  return u ? /* @__PURE__ */ e("div", { className: d, children: /* @__PURE__ */ e(Ve, { fallback: N, children: /* @__PURE__ */ e(
    St,
    {
      height: t,
      defaultLanguage: r,
      defaultValue: o,
      onChange: l,
      theme: s,
      options: a,
      onMount: S
    }
  ) }) }) : N;
}, Tt = ({ srcDoc: t }) => /* @__PURE__ */ e("div", { className: "flex justify-center items-start", children: /* @__PURE__ */ e("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ g("div", { className: "relative !max-w-[340px] w-full !h-[640px] border-8 border-black rounded-[40px] overflow-hidden shadow-xl bg-black", children: [
  /* @__PURE__ */ g("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20 flex justify-center items-center", children: [
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
] }) }) }), be = ({ show: t, title: r, fields: o, onConfirm: l, onClose: s }) => {
  const [a] = ye.useForm();
  return T(() => {
    if (t) {
      const u = {};
      o.forEach((k) => {
        k.defaultValue && (u[k.name] = k.defaultValue);
      }), a.setFieldsValue(u);
    }
  }, [t, a]), /* @__PURE__ */ e(
    ze,
    {
      title: r,
      open: t,
      onOk: async () => {
        try {
          const u = await a.validateFields();
          l(u), a.resetFields();
        } catch {
        }
      },
      onCancel: () => {
        a.resetFields(), s();
      },
      okText: "Confirm",
      cancelText: "Cancel",
      destroyOnHidden: !0,
      children: /* @__PURE__ */ e(ye, { form: a, layout: "vertical", className: "mt-4", children: o.map((u) => /* @__PURE__ */ e(
        ye.Item,
        {
          name: u.name,
          label: u.label,
          rules: [{ required: u.required !== !1, message: `Please enter ${u.label.toLowerCase()}` }],
          children: /* @__PURE__ */ e(Ct, { placeholder: u.placeholder })
        },
        u.name
      )) })
    }
  );
}, Bt = ({
  show: t,
  onClose: r,
  onSelectImage: o,
  onFetchImages: l,
  onUploadImage: s,
  onDeleteImage: a
}) => {
  const [d, c] = x([]), [u, k] = x(!1), [S, N] = x(!1), [R, O] = x(null), [v, J] = x(""), [D, ee] = x(""), [W, re] = x("library"), V = ke(null);
  T(() => {
    t && l && (k(!0), O(null), l().then((y) => c(y)).catch(() => O("Failed to load images.")).finally(() => k(!1)));
  }, [t, l]);
  const te = async (y) => {
    var K;
    const f = (K = y.target.files) == null ? void 0 : K[0];
    if (f) {
      if (!f.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      if (!s) {
        alert("Image upload handler not configured.");
        return;
      }
      N(!0);
      try {
        const j = await s(f);
        o(j), r();
      } catch {
        alert("Failed to upload image.");
      } finally {
        N(!1), y.target.value = "";
      }
    }
  }, z = () => {
    D.trim() && (o(D.trim()), r(), ee(""));
  }, G = d.filter(
    (y) => !y.isFolder && y.filename.toLowerCase().includes(v.toLowerCase())
  );
  return /* @__PURE__ */ g(
    ze,
    {
      open: t,
      onCancel: r,
      title: "Insert Image",
      footer: null,
      width: 700,
      destroyOnHidden: !0,
      children: [
        /* @__PURE__ */ g("div", { className: "flex border-b mb-4", children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => re("library"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${W === "library" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image Library"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => re("url"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${W === "url" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image URL"
            }
          )
        ] }),
        W === "url" && /* @__PURE__ */ g("div", { className: "space-y-3", children: [
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-500", children: "Paste a public image URL to insert it directly." }),
          /* @__PURE__ */ g("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "url",
                value: D,
                onChange: (y) => ee(y.target.value),
                placeholder: "https://example.com/image.png",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400",
                onKeyDown: (y) => y.key === "Enter" && z()
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: z,
                disabled: !D.trim(),
                className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700",
                children: "Insert"
              }
            )
          ] }),
          D && /* @__PURE__ */ e("div", { className: "border rounded p-2 text-center", children: /* @__PURE__ */ e("img", { src: D, alt: "preview", className: "max-h-48 mx-auto object-contain" }) })
        ] }),
        W === "library" && /* @__PURE__ */ g("div", { children: [
          /* @__PURE__ */ g("div", { className: "flex justify-between items-center mb-3 gap-3", children: [
            /* @__PURE__ */ e(
              "input",
              {
                value: v,
                onChange: (y) => J(y.target.value),
                placeholder: "Search images…",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              }
            ),
            s && /* @__PURE__ */ g(Xe, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => {
                    var y;
                    return (y = V.current) == null ? void 0 : y.click();
                  },
                  disabled: S,
                  className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700 whitespace-nowrap",
                  children: S ? "Uploading…" : "+ Upload"
                }
              ),
              /* @__PURE__ */ e(
                "input",
                {
                  ref: V,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: te
                }
              )
            ] })
          ] }),
          u && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3", children: Array.from({ length: 6 }).map((y, f) => /* @__PURE__ */ e("div", { className: "h-32 bg-gray-100 animate-pulse rounded" }, f)) }),
          R && /* @__PURE__ */ e("p", { className: "text-red-500 text-sm py-8 text-center", children: R }),
          !u && !R && G.length === 0 && /* @__PURE__ */ e("div", { className: "py-12 text-center text-gray-400", children: l ? "No images found. Upload one to get started." : "No image library connected. Use the URL tab to insert images." }),
          !u && !R && G.length > 0 && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1", children: G.map((y) => /* @__PURE__ */ g(
            "div",
            {
              className: "group relative border rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all",
              onClick: () => {
                o(y.url), r();
              },
              children: [
                /* @__PURE__ */ e(
                  "img",
                  {
                    src: y.url,
                    alt: y.filename,
                    className: "w-full h-28 object-cover",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ g("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-white text-gray-800 text-xs px-2 py-1 rounded font-medium",
                      onClick: (f) => {
                        f.stopPropagation(), o(y.url), r();
                      },
                      children: "Select"
                    }
                  ),
                  a && /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-red-500 text-white text-xs px-2 py-1 rounded font-medium",
                      onClick: async (f) => {
                        f.stopPropagation(), await a(y.path), c((K) => K.filter((j) => j.path !== y.path));
                      },
                      children: "Delete"
                    }
                  )
                ] }),
                /* @__PURE__ */ e(M, { title: y.filename.split("/").pop(), children: /* @__PURE__ */ e("p", { className: "text-xs text-gray-600 truncate px-2 py-1 bg-white", children: y.filename.split("/").pop() }) })
              ]
            },
            y.path
          )) })
        ] })
      ]
    }
  );
}, Ft = [
  { label: "Red", color: "#ef4444" },
  { label: "Green", color: "#10b981" },
  { label: "Blue", color: "#3b82f6" },
  { label: "Orange", color: "#f59e0b" },
  { label: "Purple", color: "#8b5cf6" },
  { label: "Black", color: "#000000" },
  { label: "White", color: "#ffffff" }
], Pt = (t) => ({
  items: [
    {
      key: "color-grid",
      label: /* @__PURE__ */ e(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", padding: "8px" },
          onClick: (r) => r.stopPropagation(),
          children: Ft.map((r) => /* @__PURE__ */ e(M, { title: r.label, children: /* @__PURE__ */ e(
            "div",
            {
              onClick: (o) => {
                o.preventDefault(), t(r.color);
              },
              style: {
                width: "24px",
                height: "24px",
                backgroundColor: r.color,
                borderRadius: "4px",
                border: "1px solid #ddd",
                cursor: "pointer",
                transition: "transform 0.1s ease"
              },
              onMouseEnter: (o) => o.currentTarget.style.transform = "scale(1.1)",
              onMouseLeave: (o) => o.currentTarget.style.transform = "scale(1)"
            }
          ) }, r.color))
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
}), Ut = (t, r, o, l) => ({
  items: [
    { key: "replace", label: "Replace Image", onClick: t },
    { key: "delete", label: "Delete Image", onClick: r, danger: !0 },
    { type: "divider" },
    {
      key: "resize",
      label: "Resize Width",
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
      label: "Align Image",
      children: [
        { key: "align-left", label: "Left", onClick: () => o("left") },
        { key: "align-center", label: "Center", onClick: () => o("center") },
        { key: "align-right", label: "Right", onClick: () => o("right") }
      ]
    }
  ]
}), Ht = (t, r, o, l, s, a, d, c, u) => ({
  items: [
    {
      key: "bg-color",
      label: "Background Color",
      children: [
        { key: "bg-#3b82f6", label: "Blue", onClick: () => s("#3b82f6") },
        { key: "bg-#10b981", label: "Green", onClick: () => s("#10b981") },
        { key: "bg-#ef4444", label: "Red", onClick: () => s("#ef4444") },
        { key: "bg-#f59e0b", label: "Orange", onClick: () => s("#f59e0b") },
        { key: "bg-#8b5cf6", label: "Purple", onClick: () => s("#8b5cf6") },
        { key: "bg-#000000", label: "Black", onClick: () => s("#000000") }
      ]
    },
    {
      key: "text-color",
      label: "Text Color",
      children: [
        { key: "text-#ffffff", label: "White", onClick: () => a("#ffffff") },
        { key: "text-#000000", label: "Black", onClick: () => a("#000000") }
      ]
    },
    {
      key: "border-radius",
      label: "Border Radius",
      children: [
        { key: "radius-0px", label: "Square", onClick: () => d("0px") },
        { key: "radius-2px", label: "Default", onClick: () => d("2px") },
        { key: "radius-4px", label: "Large", onClick: () => d("4px") },
        { key: "radius-9999px", label: "Pill", onClick: () => d("9999px") }
      ]
    },
    {
      key: "padding",
      label: "Padding",
      children: [
        { key: "padding-8px 16px", label: "Small", onClick: () => c("8px 16px") },
        { key: "padding-12px 24px", label: "Default", onClick: () => c("12px 24px") },
        { key: "padding-16px 32px", label: "Large", onClick: () => c("16px 32px") },
        { key: "padding-20px 40px", label: "Extra Large", onClick: () => c("20px 40px") }
      ]
    },
    {
      key: "align",
      label: "Align",
      children: [
        { key: "align-left", label: "Left", onClick: () => u("left") },
        { key: "align-center", label: "Center", onClick: () => u("center") },
        { key: "align-right", label: "Right", onClick: () => u("right") }
      ]
    },
    { type: "divider" },
    { key: "remove-bg", label: "Remove Background", onClick: r },
    { key: "remove-border", label: "Remove Border", onClick: o },
    { key: "remove-padding", label: "Remove Padding", onClick: l },
    { type: "divider" },
    { key: "delete", label: "Delete", danger: !0, onClick: t }
  ]
}), Ot = (t, r, o) => ({
  items: [
    { key: "edit-link", label: "Edit Link", onClick: t },
    {
      key: "text-color",
      label: "Text Color",
      children: [
        { key: "text-#0ea5e9", label: "Blue", onClick: () => o("#0ea5e9") },
        { key: "text-#10b981", label: "Green", onClick: () => o("#10b981") },
        { key: "text-#ef4444", label: "Red", onClick: () => o("#ef4444") },
        { key: "text-#f59e0b", label: "Orange", onClick: () => o("#f59e0b") },
        { key: "text-#8b5cf6", label: "Purple", onClick: () => o("#8b5cf6") },
        { key: "text-#000000", label: "Black", onClick: () => o("#000000") }
      ]
    },
    { type: "divider" },
    { key: "delete", label: "Delete", danger: !0, onClick: r }
  ]
}), Wt = [
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
], jt = (t) => ({
  items: Wt.map((r) => ({
    key: r.value,
    label: /* @__PURE__ */ e("span", { style: { fontFamily: r.value }, children: r.label })
  })),
  onClick: ({ key: r }) => {
    t(r);
  }
}), X = new Lt({
  strictVariables: !1,
  strictFilters: !1
});
function ae(t) {
  const r = Number(t);
  return Number.isFinite(r) ? r : 0;
}
const ne = { minimumFractionDigits: 2, maximumFractionDigits: 2 }, xe = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
function Q(t, r) {
  return new Intl.NumberFormat("en-US", r).format(t);
}
X.registerFilter("money", (t, r) => {
  const o = ae(t);
  if (!r) return Q(o, ne);
  try {
    return new Intl.NumberFormat("en-US", {
      ...ne,
      style: "currency",
      currency: r,
      currencyDisplay: "narrowSymbol"
    }).format(o);
  } catch {
    return `${r} ${Q(o, ne)}`;
  }
});
X.registerFilter("money_with_currency", (t, r) => {
  const o = ae(t);
  return r ? `${r} ${Q(o, ne)}` : Q(o, ne);
});
X.registerFilter("money_no_decimals", (t, r) => {
  const o = ae(t);
  if (!r) return Q(o, xe);
  try {
    return new Intl.NumberFormat("en-US", {
      ...xe,
      style: "currency",
      currency: r,
      currencyDisplay: "narrowSymbol"
    }).format(o);
  } catch {
    return `${r} ${Q(o, xe)}`;
  }
});
X.registerFilter("number", (t) => new Intl.NumberFormat("en-US").format(ae(t)));
const _t = X.filters.date;
X.registerFilter("date", function(t, r) {
  return t == null || t === "" ? "" : _t.call(this, t, r);
});
const Xn = [
  "USD",
  "EUR",
  "GBP",
  "NGN",
  "CAD",
  "AUD",
  "JPY",
  "INR"
], qt = /* @__PURE__ */ new Set([
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
]), Xt = new Set(Et().filter((t) => !qt.has(t)));
function $t(t) {
  return t ? Xt.has(t.toUpperCase()) : !1;
}
function Vt(t) {
  const r = /\|\s*(?:money|money_with_currency|money_no_decimals)\s*:\s*["']([^"']+)["']/g, o = [];
  let l;
  for (; (l = r.exec(t)) !== null; )
    o.push(l[1].toUpperCase());
  return o;
}
function zt(t) {
  return Vt(t).filter((o) => !$t(o));
}
const Gt = ".rsw-editor .rsw-ce";
function $n(t) {
  const r = [...new Set(zt(t))];
  return r.length === 0 ? null : `Invalid currency code${r.length > 1 ? "s" : ""}: ${r.join(", ")}. Messages may render with incorrect formatting.`;
}
function Vn(t) {
  try {
    return X.parse(t), { valid: !0 };
  } catch (r) {
    return { valid: !1, error: r };
  }
}
function Yt(t, r) {
  const o = new DOMParser(), l = o.parseFromString(t, "text/html"), s = o.parseFromString(r, "text/html");
  return l.body.innerHTML = s.body.innerHTML, s.head.querySelectorAll("style").forEach((d) => {
    Array.from(l.head.querySelectorAll("style")).some(
      (u) => u.innerHTML === d.innerHTML
    ) || l.head.appendChild(d.cloneNode(!0));
  }), `<!DOCTYPE html>
` + l.documentElement.outerHTML;
}
function zn(t) {
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
function H() {
  return typeof document > "u" ? null : document.querySelector(Gt);
}
function Jt(t) {
  var l;
  if (!t || typeof document > "u") return;
  const r = window.getSelection();
  if (!r) return;
  const o = document.createRange();
  o.setStartAfter(t), o.collapse(!0), r.removeAllRanges(), r.addRange(o), (l = t.parentNode) == null || l.removeChild(t);
}
function we(t, r) {
  var O;
  const o = H();
  if (!o) return;
  const l = window.getSelection();
  if (!l || l.rangeCount === 0) return;
  const s = l.getRangeAt(0);
  if (!o.contains(s.commonAncestorContainer)) return;
  const a = /* @__PURE__ */ new Set(["p", "div", "li", "section", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre"]), d = (v) => {
    for (; v && v !== o; ) {
      if (v instanceof HTMLElement) {
        const J = v.tagName.toLowerCase(), D = window.getComputedStyle(v).display;
        if (a.has(J) || D === "block" || D === "list-item" || D === "table")
          return v;
      }
      v = v.parentNode;
    }
    return null;
  }, c = /* @__PURE__ */ new Set(), u = d(s.startContainer);
  u && c.add(u);
  const k = d(s.endContainer);
  k && c.add(k);
  const S = document.createTreeWalker(
    s.commonAncestorContainer,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(v) {
        return s.intersectsNode(v) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    }
  );
  let N = S.nextNode();
  for (; N; ) {
    const v = d(N);
    v && c.add(v), N = S.nextNode();
  }
  let R = null;
  if (c.forEach((v) => {
    v.style.textAlign = t, R = v;
  }), R) {
    const v = document.createRange();
    v.selectNodeContents(R), v.collapse(!1), l.removeAllRanges(), l.addRange(v), (O = R.focus) == null || O.call(R), o.focus();
  }
  r(o.innerHTML);
}
function B(t) {
  const r = H();
  r && (t(r.innerHTML), r.dispatchEvent(new Event("input", { bubbles: !0 })));
}
function Kt(t, r, o) {
  const l = H();
  if (!l) return;
  t.style.outline = "";
  const s = t.closest("div");
  s && s.parentElement === l ? s.remove() : t.remove(), B(r), o == null || o();
}
function Zt(t, r, o, l) {
  t && (t.style.width = r, t.removeAttribute("width"), t.style.outline = "", B(o), l == null || l());
}
function Qt(t, r, o, l) {
  t && (t.style.display = "", t.style.margin = "", r === "left" ? (t.style.display = "block", t.style.margin = "0 auto 0 0") : r === "center" ? (t.style.display = "block", t.style.margin = "0 auto") : r === "right" && (t.style.display = "block", t.style.margin = "0 0 0 auto"), t.style.outline = "", B(o), l == null || l());
}
const en = (t, r, o, l, s) => {
  if (typeof document < "u") {
    const a = H();
    if (a) {
      if (s) {
        const c = window.getSelection();
        c == null || c.removeAllRanges(), c == null || c.addRange(s);
      }
      document.execCommand("foreColor", !1, t);
      const d = a.innerHTML;
      r(d), o(d), l(!0);
    }
  }
}, tn = (t) => {
  if (!t || t === "transparent" || t === "rgba(0, 0, 0, 0)") return "#000000";
  if (t.startsWith("rgb")) {
    const r = t.match(/\d+/g);
    if (r && (r.length === 3 || r.length === 4))
      return "#" + r.slice(0, 3).map((o) => {
        const l = parseInt(o).toString(16);
        return l.length === 1 ? "0" + l : l;
      }).join("");
  }
  return t;
}, nn = (t, r, o, l, s) => {
  const a = H();
  if (!a) return;
  if (s) {
    const c = window.getSelection();
    c == null || c.removeAllRanges(), c == null || c.addRange(s);
  }
  document.execCommand("fontName", !1, t);
  const d = a.innerHTML;
  r(d), o(d), l(!0);
};
function $(t, r, o) {
  t.style.outline = "", B(r), o == null || o();
}
function rn(t, r, o, l) {
  t && (t.style.backgroundColor = r, t.style.border = "none", $(t, o, l));
}
function qe(t, r, o, l) {
  t && (t.style.color = r, $(t, o, l));
}
function on(t, r, o, l) {
  t && (t.style.borderRadius = r, $(t, o, l));
}
function ln(t, r, o, l) {
  if (!t) return;
  const s = t.closest("div");
  s && (s.style.textAlign = r, $(t, o, l));
}
function sn(t, r, o, l) {
  t && (t.style.padding = r, $(t, o, l));
}
function an(t, r, o) {
  const l = H();
  if (!l) return;
  t.style.outline = "";
  const s = t.closest("[data-editor-button-wrapper='true']");
  s && l.contains(s) ? s.remove() : t.remove(), B(r), o == null || o();
}
function cn(t, r, o) {
  t && (t.style.color = "#000000", t.style.backgroundColor = "transparent", t.style.border = "2px solid #000000", $(t, r, o));
}
function dn(t, r, o) {
  t && (t.style.border = "none", $(t, r, o));
}
function un(t, r, o) {
  t && (t.style.padding = "0", $(t, r, o));
}
function mn(t, r, o, l) {
  t.src = r, t.style.outline = "", B(o), l == null || l();
}
function fn(t, r, o, l) {
  const s = H();
  if (!s) return;
  s.focus();
  const a = window.getSelection();
  if (o.current && (a == null || a.removeAllRanges(), a == null || a.addRange(o.current), o.current = null), !a || a.rangeCount === 0) return;
  const d = a.getRangeAt(0);
  if (!s.contains(d.commonAncestorContainer)) return;
  d.deleteContents();
  const c = document.createElement("div");
  c.style.textAlign = "center", c.style.margin = "1rem 0";
  const u = document.createElement("img");
  u.src = t, u.alt = "Inserted image", u.style.display = "block", u.style.margin = "1rem auto", u.style.width = "100%", u.style.height = "auto", u.style.objectFit = "contain", u.style.borderRadius = "2px", c.appendChild(u);
  const k = document.createElement("p"), S = document.createTextNode(" ");
  k.appendChild(S), d.insertNode(c), d.insertNode(k), d.collapse();
  const N = document.createRange();
  N.setStart(S, 0), N.collapse(!0), a.removeAllRanges(), a.addRange(N), k.scrollIntoView({ behavior: "smooth", block: "center" });
  const R = s.innerHTML;
  r(R), l == null || l(R);
}
const pn = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
`;
function hn(t, r, o, l, s) {
  const a = H();
  if (!a) return;
  a.focus();
  const d = window.getSelection();
  if (l.current && (d == null || d.removeAllRanges(), d == null || d.addRange(l.current), l.current = null), !d || d.rangeCount === 0) return;
  const c = d.getRangeAt(0);
  if (!a.contains(c.commonAncestorContainer)) return;
  c.deleteContents();
  const u = document.createElement("div");
  u.contentEditable = "false", u.style.textAlign = "center", u.style.margin = "20px 0", u.style.userSelect = "none", u.setAttribute("data-editor-button-wrapper", "true");
  const k = document.createElement("a");
  k.href = r, k.textContent = t, k.style.cssText = pn, k.setAttribute("target", "_blank"), k.setAttribute("rel", "noopener noreferrer"), u.appendChild(k);
  const S = document.createElement("p");
  S.innerHTML = "<br>", c.insertNode(u), c.insertNode(S), c.setStartAfter(S), c.collapse(!0), d.removeAllRanges(), d.addRange(c);
  const N = a.innerHTML;
  o(N), s == null || s(N);
}
function gn(t, r, o) {
  const l = H();
  if (!l) return;
  const s = window.getSelection();
  if (!s || s.rangeCount === 0) return;
  const a = s.getRangeAt(0);
  if (!l.contains(a.commonAncestorContainer)) return;
  a.deleteContents();
  const d = document.createTextNode(t);
  a.insertNode(d), a.setStartAfter(d), a.setEndAfter(d), s.removeAllRanges(), s.addRange(a), r(l.innerHTML), o == null || o();
}
function yn(t) {
  return It(t, {
    removeStyleTags: !0,
    applyAttributesTableElements: !0,
    preserveImportant: !0
  });
}
function bn(t) {
  return new DOMParser().parseFromString(t, "text/html").querySelectorAll("style").length > 0;
}
const xn = () => /* @__PURE__ */ g("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M3 7v6h6" }),
  /* @__PURE__ */ e("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" })
] }), wn = () => /* @__PURE__ */ g("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M21 7v6h-6" }),
  /* @__PURE__ */ e("path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" })
] }), kn = () => /* @__PURE__ */ g("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" }),
  /* @__PURE__ */ e("path", { d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" })
] }), vn = () => /* @__PURE__ */ g("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "19", y1: "4", x2: "10", y2: "4" }),
  /* @__PURE__ */ e("line", { x1: "14", y1: "20", x2: "5", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "4", x2: "9", y2: "20" })
] }), Cn = () => /* @__PURE__ */ g("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "21", x2: "20", y2: "21" })
] }), Nn = () => /* @__PURE__ */ g("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 6.5 3.9h.2m6.2 3.8c.2.5.3 1.1.3 1.7 0 4-3.3 4.7-7 4.7-3.5 0-5.5-.5-7.5-2" }),
  /* @__PURE__ */ e("line", { x1: "2", y1: "12", x2: "22", y2: "12" })
] }), Ln = () => /* @__PURE__ */ g("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "10", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "18", x2: "21", y2: "18" }),
  /* @__PURE__ */ e("path", { d: "M4 6h1v4" }),
  /* @__PURE__ */ e("path", { d: "M4 10h2" }),
  /* @__PURE__ */ e("path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" })
] }), En = () => /* @__PURE__ */ g("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "9", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "12", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "18", r: "1", fill: "currentColor", stroke: "none" })
] }), In = () => /* @__PURE__ */ g("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
  /* @__PURE__ */ e("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
] }), Mn = () => /* @__PURE__ */ e(
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
), Rn = () => /* @__PURE__ */ e(
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
), Sn = () => /* @__PURE__ */ e(
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
), An = () => /* @__PURE__ */ e(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ g(
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
), Dn = () => /* @__PURE__ */ g(
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
), Tn = () => /* @__PURE__ */ e("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ e("polyline", { points: "6 9 12 15 18 9" }) }), Bn = () => /* @__PURE__ */ g("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ e("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  /* @__PURE__ */ e("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
] }), Fn = ({
  value: t = "",
  onChange: r,
  readOnly: o = !1,
  placeholder: l,
  onFetchImages: s,
  onUploadImage: a,
  onDeleteImage: d,
  enablePreview: c = !0,
  enableCodeEditor: u = !0,
  height: k = 500,
  className: S = "",
  previewData: N,
  toolbarContent: R,
  showCodeEditor: O,
  onShowCodeEditorChange: v,
  showPreview: J,
  onShowPreviewChange: D,
  hideViewToggles: ee = !1,
  onOpenImageModal: W
}, re) => {
  const [V, te] = x(t), [z, G] = x(t), [y, f] = x(t), [K, j] = x(y), [Ge, Ye] = x(!1), [Je, Ke] = x(!1), Ze = O !== void 0, Qe = J !== void 0, _ = Ze ? O : Je, U = Qe ? J : Ge, ve = (n) => {
    const i = typeof n == "function" ? n(_) : n;
    v ? v(i) : Ke(i);
  }, Ce = (n) => {
    const i = typeof n == "function" ? n(U) : n;
    D ? D(i) : Ye(i);
  }, [et, Ne] = x(!1), [tt, oe] = x(!1), [nt, ce] = x(!1), [rt, de] = x(!1), [Le, ue] = x(null), [L, Y] = x(null), [Ee, ot] = x({ top: 0, left: 0 }), [P, me] = x(null), [F, fe] = x(null), [pe, le] = x(null), [Ie, lt] = x(null), [it, he] = x(!1), [Me, Re] = x("#000000"), [Se, Ae] = x("#000000"), [st, De] = x([]), [C, Z] = x(null), [Te, at] = x({ top: 0, left: 0 }), [m, A] = x(null), [Be, ct] = x({ top: 0, left: 0 }), Fe = ke(null), ie = ke(null);
  T(() => {
    t !== z && (te(t), G(t), f(t));
  }, [t]), T(() => {
    const n = document.querySelector(".rsw-editor .rsw-ce");
    if (!n) return;
    const i = n.querySelector("#selection-marker");
    i && Jt(i);
  }, [z]), T(() => {
    let n = null;
    const i = (b) => {
      const p = b.target;
      if (!p) return;
      const h = p.closest(".rsw-editor .rsw-ce img"), w = document.querySelector(".rsw-editor .rsw-ce");
      h && (w != null && w.contains(h)) ? (n && n !== h && (n.style.outline = "none"), h.style.outline = "2px solid red", n = h, Z({ element: h, x: b.clientX, y: b.clientY })) : (n && (n.style.outline = "none", n = null), Z(null));
    };
    return document.addEventListener("click", i), () => document.removeEventListener("click", i);
  }, []), T(() => {
    let n = null, i = null;
    const b = (p) => {
      const h = p.target;
      if (!h) return;
      const w = h.closest(".rsw-editor .rsw-ce a"), I = document.querySelector(".rsw-editor .rsw-ce");
      w && (I != null && I.contains(w)) ? (p.preventDefault(), !!w.closest("[data-editor-button-wrapper='true']") || !!w.style.backgroundColor && !!w.style.padding ? (i && (i.style.outline = "none", i = null), Y(null), n && n !== w && (n.style.outline = "none"), w.style.outline = "2px solid #4f46e5", n = w, A({ element: w, x: p.clientX, y: p.clientY })) : (n && (n.style.outline = "none", n = null), A(null), i && i !== w && (i.style.outline = "none"), w.style.outline = "2px solid #0ea5e9", i = w, Y({ element: w, x: p.clientX, y: p.clientY }))) : (n && (n.style.outline = "none", n = null), i && (i.style.outline = "none", i = null), A(null), Y(null));
    };
    return document.addEventListener("click", b), () => document.removeEventListener("click", b);
  }, []), T(() => {
    const n = () => {
      const i = Fe.current, b = window.getSelection();
      if (!b || !i || !i.contains(b.anchorNode)) {
        De([]);
        return;
      }
      const p = b.getRangeAt(0);
      De(b.isCollapsed ? [] : Array.from(p.getClientRects()));
      let h = b.anchorNode;
      (h == null ? void 0 : h.nodeType) === Node.TEXT_NODE && (h = h.parentElement), h instanceof HTMLElement && Re(tn(window.getComputedStyle(h).color));
    };
    return document.addEventListener("selectionchange", n), window.addEventListener("scroll", n, !0), () => {
      document.removeEventListener("selectionchange", n), window.removeEventListener("scroll", n, !0);
    };
  }, []), T(() => {
    if (!(C != null && C.element)) return;
    const n = C.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const b = n.getBoundingClientRect(), p = i.getBoundingClientRect(), h = 150, w = 50;
    let I = b.top - p.top, E = b.right - p.left + 8;
    E + h > p.width && (E = b.left - p.left - h - 8), I + w > p.height && (I = p.height - w - 8), I < 0 && (I = 8), E < 0 && (E = 8), at({ top: I, left: E });
  }, [C == null ? void 0 : C.element]), T(() => {
    if (!(m != null && m.element)) return;
    const n = m.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const b = n.getBoundingClientRect(), p = i.getBoundingClientRect(), h = 100, w = 200;
    let I = b.top - p.top, E = b.right - p.left + h;
    E + w > p.width && (E = b.left - p.left - w - h), E < h && (E = h), I < h && (I = h), ct({ top: I, left: E });
  }, [m]), T(() => {
    if (!(L != null && L.element)) return;
    const n = L.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const b = n.getBoundingClientRect(), p = i.getBoundingClientRect(), h = 8, w = 200;
    let I = b.bottom - p.top + h, E = b.left - p.left;
    E + w > p.width && (E = p.width - w - h), E < h && (E = h), I + 100 > p.height && (I = b.top - p.top - 100), ot({ top: I, left: E });
  }, [L]);
  const ge = N != null && Object.keys(N).length > 0;
  T(() => {
    if (!U || !ge) {
      j(y);
      return;
    }
    j(y), X.parseAndRender(y, N).then(j).catch(() => j(y));
  }, [U, ge, y, N]);
  const dt = kt(() => bn(V), [V]), q = (n) => {
    te(n);
    const i = Yt(z, n);
    G(i), f(i), r == null || r(i);
  }, Pe = () => {
    const n = window.getSelection();
    n && n.rangeCount > 0 && lt(n.getRangeAt(0).cloneRange());
  }, Ue = (n) => {
    en(n, q, f, () => {
    }, Ie), Re(n), he(!1);
  }, ut = (n) => {
    nn(n, q, f, () => {
    }, Ie);
  }, He = () => {
    try {
      const n = yn(V);
      te(n), G(n), f(n), r == null || r(n), _e.success("CSS inlined successfully!");
    } catch {
      _e.error("Failed to inline CSS.");
    }
  }, Oe = () => {
    if (!pe) {
      const n = document.querySelector(".rsw-editor .rsw-ce");
      if (n) {
        const i = window.getSelection();
        if (i && i.rangeCount > 0) {
          const b = i.getRangeAt(0);
          n.contains(b.commonAncestorContainer) && (ie.current = b.cloneRange());
        }
      }
    }
    W ? W() : Ne(!0);
  }, We = (n) => {
    if (pe) {
      mn(pe, n, f, () => le(null));
      return;
    }
    fn(n, f, ie);
  }, mt = () => {
    const n = window.getSelection();
    n && n.rangeCount > 0 && (ie.current = n.getRangeAt(0).cloneRange()), oe(!0);
  }, ft = (n) => {
    const { buttonText: i, buttonUrl: b } = n;
    !i || !b || (F ? (F.textContent = i, F.href = b, F.style.outline = "", B(f), fe(null)) : hn(i, b, f, ie, q), oe(!1));
  };
  vt(re, () => ({
    insert: (n) => {
      gn(n, f);
    },
    inlineCss: () => He(),
    insertImage: (n) => We(n),
    clearImageToReplace: () => le(null)
  }));
  const pt = Ut(
    () => {
      C != null && C.element && (le(C.element), Oe());
    },
    () => (C == null ? void 0 : C.element) && Kt(C.element, f, () => Z(null)),
    (n) => (C == null ? void 0 : C.element) && Qt(C.element, n, f, () => Z(null)),
    (n) => (C == null ? void 0 : C.element) && Zt(C.element, n, f, () => Z(null))
  ), ht = () => {
    m != null && m.element && (fe(m.element), A(null), oe(!0));
  }, gt = (() => {
    const n = Ht(
      () => (m == null ? void 0 : m.element) && an(m.element, f, () => A(null)),
      () => (m == null ? void 0 : m.element) && cn(m.element, f, () => A(null)),
      () => (m == null ? void 0 : m.element) && dn(m.element, f, () => A(null)),
      () => (m == null ? void 0 : m.element) && un(m.element, f, () => A(null)),
      (i) => (m == null ? void 0 : m.element) && rn(m.element, i, f, () => A(null)),
      (i) => (m == null ? void 0 : m.element) && qe(m.element, i, f, () => A(null)),
      (i) => (m == null ? void 0 : m.element) && on(m.element, i, f, () => A(null)),
      (i) => (m == null ? void 0 : m.element) && sn(m.element, i, f, () => A(null)),
      (i) => (m == null ? void 0 : m.element) && ln(m.element, i, f, () => A(null))
    );
    return {
      ...n,
      items: [
        { key: "edit-button", label: "✏️ Edit Button", onClick: ht },
        { type: "divider" },
        ...n.items ?? []
      ]
    };
  })(), yt = Ot(
    () => {
      L != null && L.element && (me(L.element), Y(null), de(!0));
    },
    () => {
      L != null && L.element && (L.element.style.outline = "", L.element.replaceWith(...Array.from(L.element.childNodes)), B(f), Y(null));
    },
    (n) => (L == null ? void 0 : L.element) && qe(L.element, n, f, () => Y(null))
  );
  Pt(Ue);
  const bt = jt(ut), je = typeof k == "number" ? `${k}px` : k;
  return /* @__PURE__ */ g("div", { className: `bg-white border rounded-md overflow-hidden flex flex-col ${S}`, style: { minWidth: 400 }, children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: `flex items-center gap-0.5 px-2 py-1.5 border-b bg-gray-50 overflow-x-auto ${o && !_ && !U ? "pointer-events-none opacity-50" : ""}`,
        style: { scrollbarWidth: "none" },
        children: [
          !_ && !U && /* @__PURE__ */ g(Xe, { children: [
            /* @__PURE__ */ g("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(M, { title: "Undo", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("undo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(xn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Redo", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("redo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(wn, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ g("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(M, { title: "Bold (Ctrl+B)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("bold");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(kn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Italic (Ctrl+I)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("italic");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(vn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Underline (Ctrl+U)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("underline");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Cn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Strikethrough", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("strikeThrough");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Nn, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ g("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(M, { title: "Numbered List", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("insertOrderedList"), setTimeout(() => B(f), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Ln, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Bullet List", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("insertUnorderedList"), setTimeout(() => B(f), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(En, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Insert Link", children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (n) => {
                    n.preventDefault();
                    const i = window.getSelection();
                    i && i.rangeCount > 0 && ue(i.getRangeAt(0).cloneRange()), ce(!0);
                  },
                  className: "toolbar-btn",
                  children: /* @__PURE__ */ e(In, {})
                }
              ) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ g("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(M, { title: "Align Left", children: /* @__PURE__ */ e("button", { onClick: () => we("left", q), className: "toolbar-btn", children: /* @__PURE__ */ e(Mn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Align Center", children: /* @__PURE__ */ e("button", { onClick: () => we("center", q), className: "toolbar-btn", children: /* @__PURE__ */ e(Rn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Align Right", children: /* @__PURE__ */ e("button", { onClick: () => we("right", q), className: "toolbar-btn", children: /* @__PURE__ */ e(Sn, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ g("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(M, { title: "Insert Image", children: /* @__PURE__ */ e("button", { onClick: Oe, className: "toolbar-btn", children: /* @__PURE__ */ e(An, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Insert Button", children: /* @__PURE__ */ e("button", { onClick: mt, className: "toolbar-btn", children: /* @__PURE__ */ e(Dn, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(M, { title: "Text Color", children: /* @__PURE__ */ e(
              Nt,
              {
                value: Se,
                open: it,
                onOpenChange: (n) => {
                  he(n), n && (Pe(), Ae(Me));
                },
                onChange: (n) => Ae(n.toHexString()),
                panelRender: (n) => /* @__PURE__ */ g("div", { children: [
                  n,
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "border text-xs px-2 py-1 mt-1 rounded hover:bg-gray-50",
                      onClick: () => {
                        Ue(Se), he(!1);
                      },
                      children: "Apply"
                    }
                  )
                ] }),
                children: /* @__PURE__ */ e("button", { type: "button", className: "toolbar-btn", children: /* @__PURE__ */ e("div", { style: { width: 18, height: 18, backgroundColor: Me, borderRadius: 2, border: "1px solid #ccc" } }) })
              }
            ) }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(M, { title: "Font Family", children: /* @__PURE__ */ e(se, { menu: bt, trigger: ["click"], onOpenChange: (n) => {
              n && Pe();
            }, children: /* @__PURE__ */ g("button", { className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              "Aa ",
              /* @__PURE__ */ e(Tn, {})
            ] }) }) }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" })
          ] }),
          !ee && _ && dt && /* @__PURE__ */ e(M, { title: "Inline all <style> tags into element attributes for email clients", children: /* @__PURE__ */ g(
            "button",
            {
              onClick: He,
              className: "flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-white animate-pulse flex-shrink-0",
              children: [
                /* @__PURE__ */ e(Bn, {}),
                " Inline CSS"
              ]
            }
          ) }),
          !ee && /* @__PURE__ */ g("div", { className: "ml-auto flex items-center gap-1 flex-shrink-0 pl-2", children: [
            u && /* @__PURE__ */ e(
              "button",
              {
                onClick: () => {
                  ve((n) => !n), Ce(!1);
                },
                className: `text-xs px-2.5 py-1.5 rounded border transition-colors whitespace-nowrap ${_ ? "bg-gray-800 text-white border-gray-800" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`,
                children: _ ? "View Editor" : "View HTML"
              }
            ),
            c && /* @__PURE__ */ e(
              "button",
              {
                onClick: () => {
                  Ce((n) => !n), ve(!1);
                },
                className: `text-xs px-2.5 py-1.5 rounded border transition-colors whitespace-nowrap ${U ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`,
                children: U ? "Hide Preview" : "Preview"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex flex-1 min-h-0", style: { height: je }, children: /* @__PURE__ */ e(
      "div",
      {
        className: "flex-1 relative overflow-hidden min-h-0",
        style: _ || U ? { minHeight: 300 } : void 0,
        children: U ? /* @__PURE__ */ e("div", { className: "h-full overflow-y-auto flex items-start justify-center p-4 bg-gray-100", children: /* @__PURE__ */ e(Tt, { srcDoc: ge ? K : y }) }) : _ ? /* @__PURE__ */ e(
          Dt,
          {
            height: je,
            defaultLanguage: "html",
            defaultValue: z,
            onChange: (n) => q(n ?? ""),
            theme: "vs-dark",
            options: {
              minimap: { enabled: !0 },
              formatOnPaste: !0,
              fontSize: 12,
              wordWrap: "on",
              readOnly: o,
              scrollBeyondLastLine: !1,
              glyphMargin: !1,
              renderValidationDecorations: "off"
            }
          }
        ) : /* @__PURE__ */ g("div", { className: "relative h-full", ref: Fe, children: [
          /* @__PURE__ */ e(
            Rt,
            {
              value: V,
              onChange: (n) => q(n.target.value),
              disabled: o,
              placeholder: l,
              containerProps: {
                className: "h-full",
                style: {
                  opacity: o ? 0.6 : 1,
                  pointerEvents: o ? "none" : "auto"
                }
              }
            }
          ),
          C && /* @__PURE__ */ e("div", { style: { position: "absolute", top: Te.top - 100, left: Te.left - 100, zIndex: 1e3, width: 150 }, children: /* @__PURE__ */ e(se, { menu: pt, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || Z(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          m && /* @__PURE__ */ e("div", { style: { position: "absolute", top: Be.top, left: Be.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(se, { menu: gt, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || A(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          L && /* @__PURE__ */ e("div", { style: { position: "absolute", top: Ee.top, left: Ee.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(se, { menu: yt, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || (L.element.style.outline = "none", Y(null));
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          st.map((n, i) => /* @__PURE__ */ e(
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
    !W && /* @__PURE__ */ e(
      Bt,
      {
        show: et,
        onClose: () => {
          Ne(!1), le(null);
        },
        onSelectImage: We,
        onFetchImages: s,
        onUploadImage: a,
        onDeleteImage: d
      }
    ),
    /* @__PURE__ */ e(
      be,
      {
        show: tt,
        title: F ? "Edit Button" : "Insert Button",
        fields: [
          { name: "buttonText", label: "Button Text", placeholder: "Click Here", defaultValue: (F == null ? void 0 : F.textContent) ?? "" },
          { name: "buttonUrl", label: "Button URL", placeholder: "https://", defaultValue: (F == null ? void 0 : F.getAttribute("href")) ?? "" }
        ],
        onConfirm: ft,
        onClose: () => {
          oe(!1), fe(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      be,
      {
        show: rt,
        title: "Edit Link",
        fields: [
          { name: "linkText", label: "Link Text", placeholder: "Click here", defaultValue: (P == null ? void 0 : P.textContent) ?? "", required: !0 },
          { name: "url", label: "URL", placeholder: "https://", defaultValue: (P == null ? void 0 : P.getAttribute("href")) ?? "", required: !0 }
        ],
        onConfirm: ({ linkText: n, url: i }) => {
          P && (P.textContent = n, P.href = i, P.style.outline = "", B(f), me(null)), de(!1);
        },
        onClose: () => {
          de(!1), me(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      be,
      {
        show: nt,
        title: "Insert Link",
        fields: [
          { name: "url", label: "URL", placeholder: "https://", required: !0 },
          { name: "linkText", label: "Link Text", placeholder: "Displayed text (optional)", required: !1 }
        ],
        onConfirm: ({ url: n, linkText: i }) => {
          var I, E;
          ce(!1);
          const b = document.querySelector(".rsw-editor .rsw-ce");
          if (!b || !n) return;
          b.focus();
          const p = window.getSelection();
          Le && (p == null || p.removeAllRanges(), p == null || p.addRange(Le)), document.execCommand("createLink", !1, n);
          const h = window.getSelection(), w = (E = (I = h == null ? void 0 : h.anchorNode) == null ? void 0 : I.parentElement) == null ? void 0 : E.closest("a");
          w && (w.style.color = "#0ea5e9", i && (w.textContent = i)), ue(null), setTimeout(() => B(f), 0);
        },
        onClose: () => {
          ce(!1), ue(null);
        }
      }
    )
  ] });
}, Gn = wt(
  Fn
);
function Yn() {
  const [t, r] = x(!0);
  return T(() => {
    function o() {
      r(!0);
    }
    function l() {
      r(!1);
    }
    return window.addEventListener("online", o), window.addEventListener("offline", l), typeof navigator.onLine < "u" && r(navigator.onLine), () => {
      window.removeEventListener("online", o), window.removeEventListener("offline", l);
    };
  }, []), t;
}
export {
  Gn as CDPEditor,
  Xn as COMMON_CURRENCY_CODES,
  Bt as ImagePickerModal,
  be as InputModal,
  Dt as MonacoEditorWrapper,
  Tt as PhonePreview,
  Xt as VALID_CURRENCY_CODES,
  Rt as WysiwygEditor,
  nn as changeFontFamily,
  en as changeHighlightColor,
  Gn as default,
  yn as handleInlineCSS,
  hn as insertButtonAtCursorInEditor,
  fn as insertImageAtCursorInEditor,
  gn as insertTextIntoEditorAtSelection,
  $t as isValidCurrencyCode,
  X as liquidEngine,
  bn as needsInliningDetailed,
  tn as normalizeColor,
  Yt as replaceBodyContent,
  Yn as useOnlineStatus,
  $n as validateCurrencyCodes,
  Vn as validateLiquidTemplate,
  zn as wrapEmailBodyHtml
};
//# sourceMappingURL=email-editor.es.js.map
