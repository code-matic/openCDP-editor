import { jsx as e, jsxs as y, Fragment as $e } from "react/jsx-runtime";
import kt, { lazy as Ve, Suspense as ze, useState as x, useEffect as T, useRef as ke, forwardRef as vt, useMemo as Ct, useImperativeHandle as Nt } from "react";
import { Form as ye, Modal as Ge, Input as Lt, Tooltip as M, ColorPicker as Et, Dropdown as se } from "antd";
import { toast as qe } from "sonner";
import { Liquid as It } from "liquidjs";
import { codes as Mt } from "currency-codes";
import Rt from "juice";
const St = Ve(() => import("react-simple-wysiwyg")), At = ({
  value: t,
  onChange: r,
  placeholder: o,
  containerProps: l,
  disabled: s,
  onFocus: a,
  onBlur: d
}) => /* @__PURE__ */ e("div", { ...l, children: /* @__PURE__ */ e(ze, { fallback: /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-100 animate-pulse rounded flex items-center justify-center text-gray-400 text-sm", children: "Loading editor…" }), children: /* @__PURE__ */ e(
  St,
  {
    value: t,
    onChange: r,
    placeholder: o,
    spellCheck: !1,
    disabled: s,
    onFocus: a,
    onBlur: d
  }
) }) }), Dt = Ve(() => import("@monaco-editor/react"));
function Tt(t) {
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
const Bt = ({
  height: t = "100%",
  defaultLanguage: r = "html",
  defaultValue: o = "",
  onChange: l,
  theme: s = "vs-dark",
  options: a = {},
  className: d,
  onMount: c
}) => {
  const [u, k] = x(!1), S = kt.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (R) => {
      Tt(R), c == null || c(R);
    },
    [c]
  );
  T(() => {
    k(!0);
  }, []);
  const N = /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-900 rounded flex items-center justify-center text-gray-400 text-sm animate-pulse", children: "Loading code editor…" });
  return u ? /* @__PURE__ */ e("div", { className: d, children: /* @__PURE__ */ e(ze, { fallback: N, children: /* @__PURE__ */ e(
    Dt,
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
}, Ht = ({ srcDoc: t }) => /* @__PURE__ */ e("div", { className: "flex justify-center items-start", children: /* @__PURE__ */ e("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ y("div", { className: "relative !max-w-[340px] w-full !h-[640px] border-8 border-black rounded-[40px] overflow-hidden shadow-xl bg-black", children: [
  /* @__PURE__ */ y("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20 flex justify-center items-center", children: [
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
    Ge,
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
          children: /* @__PURE__ */ e(Lt, { placeholder: u.placeholder })
        },
        u.name
      )) })
    }
  );
}, Ft = ({
  show: t,
  onClose: r,
  onSelectImage: o,
  onFetchImages: l,
  onUploadImage: s,
  onDeleteImage: a
}) => {
  const [d, c] = x([]), [u, k] = x(!1), [S, N] = x(!1), [R, O] = x(null), [v, J] = x(""), [D, ee] = x(""), [W, re] = x("library"), V = ke(null);
  T(() => {
    t && l && (k(!0), O(null), l().then((b) => c(b)).catch(() => O("Failed to load images.")).finally(() => k(!1)));
  }, [t, l]);
  const te = async (b) => {
    var K;
    const h = (K = b.target.files) == null ? void 0 : K[0];
    if (h) {
      if (!h.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      if (!s) {
        alert("Image upload handler not configured.");
        return;
      }
      N(!0);
      try {
        const j = await s(h);
        o(j), r();
      } catch {
        alert("Failed to upload image.");
      } finally {
        N(!1), b.target.value = "";
      }
    }
  }, z = () => {
    D.trim() && (o(D.trim()), r(), ee(""));
  }, G = d.filter(
    (b) => !b.isFolder && b.filename.toLowerCase().includes(v.toLowerCase())
  );
  return /* @__PURE__ */ y(
    Ge,
    {
      open: t,
      onCancel: r,
      title: "Insert Image",
      footer: null,
      width: 700,
      destroyOnHidden: !0,
      children: [
        /* @__PURE__ */ y("div", { className: "flex border-b mb-4", children: [
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
        W === "url" && /* @__PURE__ */ y("div", { className: "space-y-3", children: [
          /* @__PURE__ */ e("p", { className: "text-sm text-gray-500", children: "Paste a public image URL to insert it directly." }),
          /* @__PURE__ */ y("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "url",
                value: D,
                onChange: (b) => ee(b.target.value),
                placeholder: "https://example.com/image.png",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400",
                onKeyDown: (b) => b.key === "Enter" && z()
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
        W === "library" && /* @__PURE__ */ y("div", { children: [
          /* @__PURE__ */ y("div", { className: "flex justify-between items-center mb-3 gap-3", children: [
            /* @__PURE__ */ e(
              "input",
              {
                value: v,
                onChange: (b) => J(b.target.value),
                placeholder: "Search images…",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              }
            ),
            s && /* @__PURE__ */ y($e, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => {
                    var b;
                    return (b = V.current) == null ? void 0 : b.click();
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
          u && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3", children: Array.from({ length: 6 }).map((b, h) => /* @__PURE__ */ e("div", { className: "h-32 bg-gray-100 animate-pulse rounded" }, h)) }),
          R && /* @__PURE__ */ e("p", { className: "text-red-500 text-sm py-8 text-center", children: R }),
          !u && !R && G.length === 0 && /* @__PURE__ */ e("div", { className: "py-12 text-center text-gray-400", children: l ? "No images found. Upload one to get started." : "No image library connected. Use the URL tab to insert images." }),
          !u && !R && G.length > 0 && /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1", children: G.map((b) => /* @__PURE__ */ y(
            "div",
            {
              className: "group relative border rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all",
              onClick: () => {
                o(b.url), r();
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
                /* @__PURE__ */ y("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-white text-gray-800 text-xs px-2 py-1 rounded font-medium",
                      onClick: (h) => {
                        h.stopPropagation(), o(b.url), r();
                      },
                      children: "Select"
                    }
                  ),
                  a && /* @__PURE__ */ e(
                    "button",
                    {
                      className: "bg-red-500 text-white text-xs px-2 py-1 rounded font-medium",
                      onClick: async (h) => {
                        h.stopPropagation(), await a(b.path), c((K) => K.filter((j) => j.path !== b.path));
                      },
                      children: "Delete"
                    }
                  )
                ] }),
                /* @__PURE__ */ e(M, { title: b.filename.split("/").pop(), children: /* @__PURE__ */ e("p", { className: "text-xs text-gray-600 truncate px-2 py-1 bg-white", children: b.filename.split("/").pop() }) })
              ]
            },
            b.path
          )) })
        ] })
      ]
    }
  );
}, Pt = [
  { label: "Red", color: "#ef4444" },
  { label: "Green", color: "#10b981" },
  { label: "Blue", color: "#3b82f6" },
  { label: "Orange", color: "#f59e0b" },
  { label: "Purple", color: "#8b5cf6" },
  { label: "Black", color: "#000000" },
  { label: "White", color: "#ffffff" }
], Ut = (t) => ({
  items: [
    {
      key: "color-grid",
      label: /* @__PURE__ */ e(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", padding: "8px" },
          onClick: (r) => r.stopPropagation(),
          children: Pt.map((r) => /* @__PURE__ */ e(M, { title: r.label, children: /* @__PURE__ */ e(
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
}), Ot = (t, r, o, l) => ({
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
}), Wt = (t, r, o, l, s, a, d, c, u) => ({
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
}), jt = (t, r, o) => ({
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
}), _t = [
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
], qt = (t) => ({
  items: _t.map((r) => ({
    key: r.value,
    label: /* @__PURE__ */ e("span", { style: { fontFamily: r.value }, children: r.label })
  })),
  onClick: ({ key: r }) => {
    t(r);
  }
}), X = new It({
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
const Xt = X.filters.date;
X.registerFilter("date", function(t, r) {
  return t == null || t === "" ? "" : Xt.call(this, t, r);
});
const Yn = [
  "USD",
  "EUR",
  "GBP",
  "NGN",
  "CAD",
  "AUD",
  "JPY",
  "INR"
], $t = /* @__PURE__ */ new Set([
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
]), Vt = new Set(Mt().filter((t) => !$t.has(t)));
function zt(t) {
  return t ? Vt.has(t.toUpperCase()) : !1;
}
function Gt(t) {
  const r = /\|\s*(?:money|money_with_currency|money_no_decimals)\s*:\s*["']([^"']+)["']/g, o = [];
  let l;
  for (; (l = r.exec(t)) !== null; )
    o.push(l[1].toUpperCase());
  return o;
}
function Yt(t) {
  return Gt(t).filter((o) => !zt(o));
}
const Jt = ".rsw-editor .rsw-ce";
function Jn(t) {
  const r = [...new Set(Yt(t))];
  return r.length === 0 ? null : `Invalid currency code${r.length > 1 ? "s" : ""}: ${r.join(", ")}. Messages may render with incorrect formatting.`;
}
function Kn(t) {
  try {
    return X.parse(t), { valid: !0 };
  } catch (r) {
    return { valid: !1, error: r };
  }
}
function Kt(t, r) {
  const o = new DOMParser(), l = o.parseFromString(t, "text/html"), s = o.parseFromString(r, "text/html");
  return l.body.innerHTML = s.body.innerHTML, s.head.querySelectorAll("style").forEach((d) => {
    Array.from(l.head.querySelectorAll("style")).some(
      (u) => u.innerHTML === d.innerHTML
    ) || l.head.appendChild(d.cloneNode(!0));
  }), `<!DOCTYPE html>
` + l.documentElement.outerHTML;
}
function Zn(t) {
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
function U() {
  return typeof document > "u" ? null : document.querySelector(Jt);
}
function Zt(t) {
  var l;
  if (!t || typeof document > "u") return;
  const r = window.getSelection();
  if (!r) return;
  const o = document.createRange();
  o.setStartAfter(t), o.collapse(!0), r.removeAllRanges(), r.addRange(o), (l = t.parentNode) == null || l.removeChild(t);
}
function we(t, r) {
  var O;
  const o = U();
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
  const r = U();
  r && (t(r.innerHTML), r.dispatchEvent(new Event("input", { bubbles: !0 })));
}
function Qt(t, r, o) {
  const l = U();
  if (!l) return;
  t.style.outline = "";
  const s = t.closest("div");
  s && s.parentElement === l ? s.remove() : t.remove(), B(r), o == null || o();
}
function en(t, r, o, l) {
  t && (t.style.width = r, t.removeAttribute("width"), t.style.outline = "", B(o), l == null || l());
}
function tn(t, r, o, l) {
  t && (t.style.display = "", t.style.margin = "", r === "left" ? (t.style.display = "block", t.style.margin = "0 auto 0 0") : r === "center" ? (t.style.display = "block", t.style.margin = "0 auto") : r === "right" && (t.style.display = "block", t.style.margin = "0 0 0 auto"), t.style.outline = "", B(o), l == null || l());
}
const nn = (t, r, o, l, s) => {
  if (typeof document < "u") {
    const a = U();
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
}, rn = (t) => {
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
}, on = (t, r, o, l, s) => {
  const a = U();
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
function ln(t, r, o, l) {
  t && (t.style.backgroundColor = r, t.style.border = "none", $(t, o, l));
}
function Xe(t, r, o, l) {
  t && (t.style.color = r, $(t, o, l));
}
function sn(t, r, o, l) {
  t && (t.style.borderRadius = r, $(t, o, l));
}
function an(t, r, o, l) {
  if (!t) return;
  const s = t.closest("div");
  s && (s.style.textAlign = r, $(t, o, l));
}
function cn(t, r, o, l) {
  t && (t.style.padding = r, $(t, o, l));
}
function dn(t, r, o) {
  const l = U();
  if (!l) return;
  t.style.outline = "";
  const s = t.closest("[data-editor-button-wrapper='true']");
  s && l.contains(s) ? s.remove() : t.remove(), B(r), o == null || o();
}
function un(t, r, o) {
  t && (t.style.color = "#000000", t.style.backgroundColor = "transparent", t.style.border = "2px solid #000000", $(t, r, o));
}
function mn(t, r, o) {
  t && (t.style.border = "none", $(t, r, o));
}
function fn(t, r, o) {
  t && (t.style.padding = "0", $(t, r, o));
}
function hn(t, r, o, l) {
  t.src = r, t.style.outline = "", B(o), l == null || l();
}
function pn(t, r, o, l) {
  const s = U();
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
const gn = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
`;
function yn(t, r, o, l, s) {
  const a = U();
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
  k.href = r, k.textContent = t, k.style.cssText = gn, k.setAttribute("target", "_blank"), k.setAttribute("rel", "noopener noreferrer"), u.appendChild(k);
  const S = document.createElement("p");
  S.innerHTML = "<br>", c.insertNode(u), c.insertNode(S), c.setStartAfter(S), c.collapse(!0), d.removeAllRanges(), d.addRange(c);
  const N = a.innerHTML;
  o(N), s == null || s(N);
}
function bn(t, r, o) {
  const l = U();
  if (!l) return;
  const s = window.getSelection();
  if (!s || s.rangeCount === 0) return;
  const a = s.getRangeAt(0);
  if (!l.contains(a.commonAncestorContainer)) return;
  a.deleteContents();
  const d = document.createTextNode(t);
  a.insertNode(d), a.setStartAfter(d), a.setEndAfter(d), s.removeAllRanges(), s.addRange(a), r(l.innerHTML), o == null || o();
}
function xn(t) {
  return Rt(t, {
    removeStyleTags: !0,
    applyAttributesTableElements: !0,
    preserveImportant: !0
  });
}
function wn(t) {
  return new DOMParser().parseFromString(t, "text/html").querySelectorAll("style").length > 0;
}
const kn = () => /* @__PURE__ */ y("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M3 7v6h6" }),
  /* @__PURE__ */ e("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" })
] }), vn = () => /* @__PURE__ */ y("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M21 7v6h-6" }),
  /* @__PURE__ */ e("path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" })
] }), Cn = () => /* @__PURE__ */ y("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" }),
  /* @__PURE__ */ e("path", { d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" })
] }), Nn = () => /* @__PURE__ */ y("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "19", y1: "4", x2: "10", y2: "4" }),
  /* @__PURE__ */ e("line", { x1: "14", y1: "20", x2: "5", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "4", x2: "9", y2: "20" })
] }), Ln = () => /* @__PURE__ */ y("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "21", x2: "20", y2: "21" })
] }), En = () => /* @__PURE__ */ y("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 6.5 3.9h.2m6.2 3.8c.2.5.3 1.1.3 1.7 0 4-3.3 4.7-7 4.7-3.5 0-5.5-.5-7.5-2" }),
  /* @__PURE__ */ e("line", { x1: "2", y1: "12", x2: "22", y2: "12" })
] }), In = () => /* @__PURE__ */ y("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "10", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "18", x2: "21", y2: "18" }),
  /* @__PURE__ */ e("path", { d: "M4 6h1v4" }),
  /* @__PURE__ */ e("path", { d: "M4 10h2" }),
  /* @__PURE__ */ e("path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" })
] }), Mn = () => /* @__PURE__ */ y("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "9", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "12", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "18", r: "1", fill: "currentColor", stroke: "none" })
] }), Rn = () => /* @__PURE__ */ y("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
  /* @__PURE__ */ e("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
] }), Sn = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H1" }), An = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H2" }), Dn = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H3" }), Tn = () => /* @__PURE__ */ e(
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
), Bn = () => /* @__PURE__ */ e(
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
), Hn = () => /* @__PURE__ */ e(
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
), Fn = () => /* @__PURE__ */ e(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ y(
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
), Pn = () => /* @__PURE__ */ y(
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
), Un = () => /* @__PURE__ */ e("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ e("polyline", { points: "6 9 12 15 18 9" }) }), On = () => /* @__PURE__ */ y("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ e("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  /* @__PURE__ */ e("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
] }), Wn = ({
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
  const [V, te] = x(t), [z, G] = x(t), [b, h] = x(t), [K, j] = x(b), [Ye, Je] = x(!1), [Ke, Ze] = x(!1), Qe = O !== void 0, et = J !== void 0, _ = Qe ? O : Ke, P = et ? J : Ye, ve = (n) => {
    const i = typeof n == "function" ? n(_) : n;
    v ? v(i) : Ze(i);
  }, Ce = (n) => {
    const i = typeof n == "function" ? n(P) : n;
    D ? D(i) : Je(i);
  }, [tt, Ne] = x(!1), [nt, oe] = x(!1), [rt, ce] = x(!1), [ot, de] = x(!1), [Le, ue] = x(null), [L, Y] = x(null), [Ee, lt] = x({ top: 0, left: 0 }), [F, me] = x(null), [H, fe] = x(null), [he, le] = x(null), [Ie, it] = x(null), [st, pe] = x(!1), [Me, Re] = x("#000000"), [Se, Ae] = x("#000000"), [at, De] = x([]), [ct, Te] = x(null), [C, Z] = x(null), [Be, dt] = x({ top: 0, left: 0 }), [m, A] = x(null), [He, ut] = x({ top: 0, left: 0 }), Fe = ke(null), ie = ke(null);
  T(() => {
    t !== z && (te(t), G(t), h(t));
  }, [t]), T(() => {
    const n = document.querySelector(".rsw-editor .rsw-ce");
    if (!n) return;
    const i = n.querySelector("#selection-marker");
    i && Zt(i);
  }, [z]), T(() => {
    let n = null;
    const i = (g) => {
      const f = g.target;
      if (!f) return;
      const p = f.closest(".rsw-editor .rsw-ce img"), w = document.querySelector(".rsw-editor .rsw-ce");
      p && (w != null && w.contains(p)) ? (n && n !== p && (n.style.outline = "none"), p.style.outline = "2px solid red", n = p, Z({ element: p, x: g.clientX, y: g.clientY })) : (n && (n.style.outline = "none", n = null), Z(null));
    };
    return document.addEventListener("click", i), () => document.removeEventListener("click", i);
  }, []), T(() => {
    let n = null, i = null;
    const g = (f) => {
      const p = f.target;
      if (!p) return;
      const w = p.closest(".rsw-editor .rsw-ce a"), I = document.querySelector(".rsw-editor .rsw-ce");
      w && (I != null && I.contains(w)) ? (f.preventDefault(), !!w.closest("[data-editor-button-wrapper='true']") || !!w.style.backgroundColor && !!w.style.padding ? (i && (i.style.outline = "none", i = null), Y(null), n && n !== w && (n.style.outline = "none"), w.style.outline = "2px solid #4f46e5", n = w, A({ element: w, x: f.clientX, y: f.clientY })) : (n && (n.style.outline = "none", n = null), A(null), i && i !== w && (i.style.outline = "none"), w.style.outline = "2px solid #0ea5e9", i = w, Y({ element: w, x: f.clientX, y: f.clientY }))) : (n && (n.style.outline = "none", n = null), i && (i.style.outline = "none", i = null), A(null), Y(null));
    };
    return document.addEventListener("click", g), () => document.removeEventListener("click", g);
  }, []), T(() => {
    const n = () => {
      const i = Fe.current, g = window.getSelection();
      if (!g || !i || !i.contains(g.anchorNode)) {
        De([]), Te(null);
        return;
      }
      const f = g.getRangeAt(0);
      De(g.isCollapsed ? [] : Array.from(f.getClientRects()));
      let p = g.anchorNode;
      if ((p == null ? void 0 : p.nodeType) === Node.TEXT_NODE && (p = p.parentElement), p instanceof HTMLElement) {
        Re(rn(window.getComputedStyle(p).color));
        const w = p.closest("h1, h2, h3");
        Te(w ? w.tagName.toLowerCase() : null);
      }
    };
    return document.addEventListener("selectionchange", n), window.addEventListener("scroll", n, !0), () => {
      document.removeEventListener("selectionchange", n), window.removeEventListener("scroll", n, !0);
    };
  }, []), T(() => {
    if (!(C != null && C.element)) return;
    const n = C.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const g = n.getBoundingClientRect(), f = i.getBoundingClientRect(), p = 150, w = 50;
    let I = g.top - f.top, E = g.right - f.left + 8;
    E + p > f.width && (E = g.left - f.left - p - 8), I + w > f.height && (I = f.height - w - 8), I < 0 && (I = 8), E < 0 && (E = 8), dt({ top: I, left: E });
  }, [C == null ? void 0 : C.element]), T(() => {
    if (!(m != null && m.element)) return;
    const n = m.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const g = n.getBoundingClientRect(), f = i.getBoundingClientRect(), p = 100, w = 200;
    let I = g.top - f.top, E = g.right - f.left + p;
    E + w > f.width && (E = g.left - f.left - w - p), E < p && (E = p), I < p && (I = p), ut({ top: I, left: E });
  }, [m]), T(() => {
    if (!(L != null && L.element)) return;
    const n = L.element, i = n.closest(".rsw-editor .rsw-ce");
    if (!i) return;
    const g = n.getBoundingClientRect(), f = i.getBoundingClientRect(), p = 8, w = 200;
    let I = g.bottom - f.top + p, E = g.left - f.left;
    E + w > f.width && (E = f.width - w - p), E < p && (E = p), I + 100 > f.height && (I = g.top - f.top - 100), lt({ top: I, left: E });
  }, [L]);
  const ge = N != null && Object.keys(N).length > 0;
  T(() => {
    if (!P || !ge) {
      j(b);
      return;
    }
    j(b), X.parseAndRender(b, N).then(j).catch(() => j(b));
  }, [P, ge, b, N]);
  const mt = Ct(() => wn(V), [V]), q = (n) => {
    te(n);
    const i = Kt(z, n);
    G(i), h(i), r == null || r(i);
  }, Pe = () => {
    const n = window.getSelection();
    n && n.rangeCount > 0 && it(n.getRangeAt(0).cloneRange());
  }, Ue = (n) => {
    nn(n, q, h, () => {
    }, Ie), Re(n), pe(!1);
  }, ft = (n) => {
    on(n, q, h, () => {
    }, Ie);
  }, Oe = () => {
    try {
      const n = xn(V);
      te(n), G(n), h(n), r == null || r(n), qe.success("CSS inlined successfully!");
    } catch {
      qe.error("Failed to inline CSS.");
    }
  }, We = () => {
    if (!he) {
      const n = document.querySelector(".rsw-editor .rsw-ce");
      if (n) {
        const i = window.getSelection();
        if (i && i.rangeCount > 0) {
          const g = i.getRangeAt(0);
          n.contains(g.commonAncestorContainer) && (ie.current = g.cloneRange());
        }
      }
    }
    W ? W() : Ne(!0);
  }, je = (n) => {
    if (he) {
      hn(he, n, h, () => le(null));
      return;
    }
    pn(n, h, ie);
  }, ht = () => {
    const n = window.getSelection();
    n && n.rangeCount > 0 && (ie.current = n.getRangeAt(0).cloneRange()), oe(!0);
  }, pt = (n) => {
    const { buttonText: i, buttonUrl: g } = n;
    !i || !g || (H ? (H.textContent = i, H.href = g, H.style.outline = "", B(h), fe(null)) : yn(i, g, h, ie, q), oe(!1));
  };
  Nt(re, () => ({
    insert: (n) => {
      bn(n, h);
    },
    inlineCss: () => Oe(),
    insertImage: (n) => je(n),
    clearImageToReplace: () => le(null)
  }));
  const gt = Ot(
    () => {
      C != null && C.element && (le(C.element), We());
    },
    () => (C == null ? void 0 : C.element) && Qt(C.element, h, () => Z(null)),
    (n) => (C == null ? void 0 : C.element) && tn(C.element, n, h, () => Z(null)),
    (n) => (C == null ? void 0 : C.element) && en(C.element, n, h, () => Z(null))
  ), yt = () => {
    m != null && m.element && (fe(m.element), A(null), oe(!0));
  }, bt = (() => {
    const n = Wt(
      () => (m == null ? void 0 : m.element) && dn(m.element, h, () => A(null)),
      () => (m == null ? void 0 : m.element) && un(m.element, h, () => A(null)),
      () => (m == null ? void 0 : m.element) && mn(m.element, h, () => A(null)),
      () => (m == null ? void 0 : m.element) && fn(m.element, h, () => A(null)),
      (i) => (m == null ? void 0 : m.element) && ln(m.element, i, h, () => A(null)),
      (i) => (m == null ? void 0 : m.element) && Xe(m.element, i, h, () => A(null)),
      (i) => (m == null ? void 0 : m.element) && sn(m.element, i, h, () => A(null)),
      (i) => (m == null ? void 0 : m.element) && cn(m.element, i, h, () => A(null)),
      (i) => (m == null ? void 0 : m.element) && an(m.element, i, h, () => A(null))
    );
    return {
      ...n,
      items: [
        { key: "edit-button", label: "✏️ Edit Button", onClick: yt },
        { type: "divider" },
        ...n.items ?? []
      ]
    };
  })(), xt = jt(
    () => {
      L != null && L.element && (me(L.element), Y(null), de(!0));
    },
    () => {
      L != null && L.element && (L.element.style.outline = "", L.element.replaceWith(...Array.from(L.element.childNodes)), B(h), Y(null));
    },
    (n) => (L == null ? void 0 : L.element) && Xe(L.element, n, h, () => Y(null))
  );
  Ut(Ue);
  const wt = qt(ft), _e = typeof k == "number" ? `${k}px` : k;
  return /* @__PURE__ */ y("div", { className: `bg-white border rounded-md overflow-hidden flex flex-col ${S}`, style: { minWidth: 400 }, children: [
    /* @__PURE__ */ y(
      "div",
      {
        className: `flex items-center gap-0.5 px-2 py-1.5 border-b bg-gray-50 overflow-x-auto ${o && !_ && !P ? "pointer-events-none opacity-50" : ""}`,
        style: { scrollbarWidth: "none" },
        children: [
          !_ && !P && /* @__PURE__ */ y($e, { children: [
            /* @__PURE__ */ y("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(M, { title: "Undo", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("undo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(kn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Redo", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("redo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(vn, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: ["h1", "h2", "h3"].map((n, i) => {
              const g = [Sn, An, Dn][i], f = ct === n;
              return /* @__PURE__ */ e(M, { title: f ? "Remove heading" : `Heading ${i + 1}`, children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (p) => {
                    p.preventDefault(), document.execCommand("formatBlock", !1, f ? "p" : n), setTimeout(() => B(h), 0);
                  },
                  className: "toolbar-btn",
                  style: f ? { background: "#1e293b", color: "#fff", borderColor: "#1e293b" } : void 0,
                  children: /* @__PURE__ */ e(g, {})
                }
              ) }, n);
            }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ y("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(M, { title: "Bold (Ctrl+B)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("bold");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Cn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Italic (Ctrl+I)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("italic");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Nn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Underline (Ctrl+U)", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("underline");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Ln, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Strikethrough", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("strikeThrough");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(En, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ y("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(M, { title: "Numbered List", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("insertOrderedList"), setTimeout(() => B(h), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(In, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Bullet List", children: /* @__PURE__ */ e("button", { onMouseDown: (n) => {
                n.preventDefault(), document.execCommand("insertUnorderedList"), setTimeout(() => B(h), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Mn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Insert Link", children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (n) => {
                    n.preventDefault();
                    const i = window.getSelection();
                    i && i.rangeCount > 0 && ue(i.getRangeAt(0).cloneRange()), ce(!0);
                  },
                  className: "toolbar-btn",
                  children: /* @__PURE__ */ e(Rn, {})
                }
              ) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ y("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(M, { title: "Align Left", children: /* @__PURE__ */ e("button", { onClick: () => we("left", q), className: "toolbar-btn", children: /* @__PURE__ */ e(Tn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Align Center", children: /* @__PURE__ */ e("button", { onClick: () => we("center", q), className: "toolbar-btn", children: /* @__PURE__ */ e(Bn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Align Right", children: /* @__PURE__ */ e("button", { onClick: () => we("right", q), className: "toolbar-btn", children: /* @__PURE__ */ e(Hn, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ y("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(M, { title: "Insert Image", children: /* @__PURE__ */ e("button", { onClick: We, className: "toolbar-btn", children: /* @__PURE__ */ e(Fn, {}) }) }),
              /* @__PURE__ */ e(M, { title: "Insert Button", children: /* @__PURE__ */ e("button", { onClick: ht, className: "toolbar-btn", children: /* @__PURE__ */ e(Pn, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(M, { title: "Text Color", children: /* @__PURE__ */ e(
              Et,
              {
                value: Se,
                open: st,
                onOpenChange: (n) => {
                  pe(n), n && (Pe(), Ae(Me));
                },
                onChange: (n) => Ae(n.toHexString()),
                panelRender: (n) => /* @__PURE__ */ y("div", { children: [
                  n,
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "border text-xs px-2 py-1 mt-1 rounded hover:bg-gray-50",
                      onClick: () => {
                        Ue(Se), pe(!1);
                      },
                      children: "Apply"
                    }
                  )
                ] }),
                children: /* @__PURE__ */ e("button", { type: "button", className: "toolbar-btn", children: /* @__PURE__ */ e("div", { style: { width: 18, height: 18, backgroundColor: Me, borderRadius: 2, border: "1px solid #ccc" } }) })
              }
            ) }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(M, { title: "Font Family", children: /* @__PURE__ */ e(se, { menu: wt, trigger: ["click"], onOpenChange: (n) => {
              n && Pe();
            }, children: /* @__PURE__ */ y("button", { className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              "Aa ",
              /* @__PURE__ */ e(Un, {})
            ] }) }) }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" })
          ] }),
          !ee && _ && mt && /* @__PURE__ */ e(M, { title: "Inline all <style> tags into element attributes for email clients", children: /* @__PURE__ */ y(
            "button",
            {
              onClick: Oe,
              className: "flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-white animate-pulse flex-shrink-0",
              children: [
                /* @__PURE__ */ e(On, {}),
                " Inline CSS"
              ]
            }
          ) }),
          !ee && /* @__PURE__ */ y("div", { className: "ml-auto flex items-center gap-1 flex-shrink-0 pl-2", children: [
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
                className: `text-xs px-2.5 py-1.5 rounded border transition-colors whitespace-nowrap ${P ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`,
                children: P ? "Hide Preview" : "Preview"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex flex-1 min-h-0", style: { height: _e }, children: /* @__PURE__ */ e(
      "div",
      {
        className: "flex-1 relative overflow-hidden min-h-0",
        style: _ || P ? { minHeight: 300 } : void 0,
        children: P ? /* @__PURE__ */ e("div", { className: "h-full overflow-y-auto flex items-start justify-center p-4 bg-gray-100", children: /* @__PURE__ */ e(Ht, { srcDoc: ge ? K : b }) }) : _ ? /* @__PURE__ */ e(
          Bt,
          {
            height: _e,
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
        ) : /* @__PURE__ */ y("div", { className: "relative h-full", ref: Fe, children: [
          /* @__PURE__ */ e(
            At,
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
          C && /* @__PURE__ */ e("div", { style: { position: "absolute", top: Be.top - 100, left: Be.left - 100, zIndex: 1e3, width: 150 }, children: /* @__PURE__ */ e(se, { menu: gt, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || Z(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          m && /* @__PURE__ */ e("div", { style: { position: "absolute", top: He.top, left: He.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(se, { menu: bt, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || A(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          L && /* @__PURE__ */ e("div", { style: { position: "absolute", top: Ee.top, left: Ee.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(se, { menu: xt, trigger: ["click"], open: !0, onOpenChange: (n) => {
            n || (L.element.style.outline = "none", Y(null));
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          at.map((n, i) => /* @__PURE__ */ e(
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
      Ft,
      {
        show: tt,
        onClose: () => {
          Ne(!1), le(null);
        },
        onSelectImage: je,
        onFetchImages: s,
        onUploadImage: a,
        onDeleteImage: d
      }
    ),
    /* @__PURE__ */ e(
      be,
      {
        show: nt,
        title: H ? "Edit Button" : "Insert Button",
        fields: [
          { name: "buttonText", label: "Button Text", placeholder: "Click Here", defaultValue: (H == null ? void 0 : H.textContent) ?? "" },
          { name: "buttonUrl", label: "Button URL", placeholder: "https://", defaultValue: (H == null ? void 0 : H.getAttribute("href")) ?? "" }
        ],
        onConfirm: pt,
        onClose: () => {
          oe(!1), fe(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      be,
      {
        show: ot,
        title: "Edit Link",
        fields: [
          { name: "linkText", label: "Link Text", placeholder: "Click here", defaultValue: (F == null ? void 0 : F.textContent) ?? "", required: !0 },
          { name: "url", label: "URL", placeholder: "https://", defaultValue: (F == null ? void 0 : F.getAttribute("href")) ?? "", required: !0 }
        ],
        onConfirm: ({ linkText: n, url: i }) => {
          F && (F.textContent = n, F.href = i, F.style.outline = "", B(h), me(null)), de(!1);
        },
        onClose: () => {
          de(!1), me(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      be,
      {
        show: rt,
        title: "Insert Link",
        fields: [
          { name: "url", label: "URL", placeholder: "https://", required: !0 },
          { name: "linkText", label: "Link Text", placeholder: "Displayed text (optional)", required: !1 }
        ],
        onConfirm: ({ url: n, linkText: i }) => {
          var I, E;
          ce(!1);
          const g = document.querySelector(".rsw-editor .rsw-ce");
          if (!g || !n) return;
          g.focus();
          const f = window.getSelection();
          Le && (f == null || f.removeAllRanges(), f == null || f.addRange(Le)), document.execCommand("createLink", !1, n);
          const p = window.getSelection(), w = (E = (I = p == null ? void 0 : p.anchorNode) == null ? void 0 : I.parentElement) == null ? void 0 : E.closest("a");
          w && (w.style.color = "#0ea5e9", i && (w.textContent = i)), ue(null), setTimeout(() => B(h), 0);
        },
        onClose: () => {
          ce(!1), ue(null);
        }
      }
    )
  ] });
}, Qn = vt(
  Wn
);
function er() {
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
  Qn as CDPEditor,
  Yn as COMMON_CURRENCY_CODES,
  Ft as ImagePickerModal,
  be as InputModal,
  Bt as MonacoEditorWrapper,
  Ht as PhonePreview,
  Vt as VALID_CURRENCY_CODES,
  At as WysiwygEditor,
  on as changeFontFamily,
  nn as changeHighlightColor,
  Qn as default,
  xn as handleInlineCSS,
  yn as insertButtonAtCursorInEditor,
  pn as insertImageAtCursorInEditor,
  bn as insertTextIntoEditorAtSelection,
  zt as isValidCurrencyCode,
  X as liquidEngine,
  wn as needsInliningDetailed,
  rn as normalizeColor,
  Kt as replaceBodyContent,
  er as useOnlineStatus,
  Jn as validateCurrencyCodes,
  Kn as validateLiquidTemplate,
  Zn as wrapEmailBodyHtml
};
//# sourceMappingURL=email-editor.es.js.map
