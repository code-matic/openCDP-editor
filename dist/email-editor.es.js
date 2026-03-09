import { jsx as t, jsxs as f, Fragment as Te } from "react/jsx-runtime";
import lt, { lazy as Be, Suspense as Fe, useState as b, useEffect as I, useRef as fe, forwardRef as it, useMemo as st, useImperativeHandle as at } from "react";
import { Form as ce, Modal as Ue, Input as ct, Tooltip as k, ColorPicker as dt, Dropdown as de } from "antd";
import { toast as Se } from "sonner";
import { Liquid as ut } from "liquidjs";
import { codes as mt } from "currency-codes";
import ft from "juice";
const pt = Be(() => import("react-simple-wysiwyg")), ht = ({
  value: e,
  onChange: n,
  placeholder: r,
  containerProps: l,
  disabled: i,
  onFocus: a,
  onBlur: m
}) => /* @__PURE__ */ t("div", { ...l, children: /* @__PURE__ */ t(Fe, { fallback: /* @__PURE__ */ t("div", { className: "h-full min-h-[300px] bg-gray-100 animate-pulse rounded flex items-center justify-center text-gray-400 text-sm", children: "Loading editor…" }), children: /* @__PURE__ */ t(
  pt,
  {
    value: e,
    onChange: n,
    placeholder: r,
    spellCheck: !1,
    disabled: i,
    onFocus: a,
    onBlur: m
  }
) }) }), gt = Be(() => import("@monaco-editor/react"));
function yt(e) {
  typeof e.addAction == "function" && e.addAction({
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
const bt = ({
  height: e = "100%",
  defaultLanguage: n = "html",
  defaultValue: r = "",
  onChange: l,
  theme: i = "vs-dark",
  options: a = {},
  className: m,
  onMount: d
}) => {
  const [s, x] = b(!1), N = lt.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (M) => {
      yt(M), d == null || d(M);
    },
    [d]
  );
  I(() => {
    x(!0);
  }, []);
  const C = /* @__PURE__ */ t("div", { className: "h-full min-h-[300px] bg-gray-900 rounded flex items-center justify-center text-gray-400 text-sm animate-pulse", children: "Loading code editor…" });
  return s ? /* @__PURE__ */ t("div", { className: m, children: /* @__PURE__ */ t(Fe, { fallback: C, children: /* @__PURE__ */ t(
    gt,
    {
      height: e,
      defaultLanguage: n,
      defaultValue: r,
      onChange: l,
      theme: i,
      options: a,
      onMount: N
    }
  ) }) }) : C;
}, xt = ({ srcDoc: e }) => /* @__PURE__ */ t("div", { className: "flex justify-center items-start", children: /* @__PURE__ */ t("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ f("div", { className: "relative !max-w-[340px] w-full !h-[640px] border-8 border-black rounded-[40px] overflow-hidden shadow-xl bg-black", children: [
  /* @__PURE__ */ f("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20 flex justify-center items-center", children: [
    /* @__PURE__ */ t("div", { className: "w-3 h-3 bg-gray-800 rounded-full mr-2" }),
    /* @__PURE__ */ t("div", { className: "w-10 h-2 bg-gray-700 rounded" })
  ] }),
  /* @__PURE__ */ t("div", { className: "absolute -left-[3px] top-24 w-1 h-12 bg-gray-700 rounded-r" }),
  /* @__PURE__ */ t("div", { className: "absolute -left-[3px] top-40 w-1 h-8 bg-gray-700 rounded-r" }),
  /* @__PURE__ */ t("div", { className: "absolute -right-[3px] top-32 w-1 h-16 bg-gray-700 rounded-l" }),
  /* @__PURE__ */ t(
    "iframe",
    {
      srcDoc: e,
      title: "Email Preview",
      className: "max-w-[400px] w-full h-full bg-white",
      style: { border: "none", paddingTop: "40px" }
    }
  ),
  /* @__PURE__ */ t("div", { className: "absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gray-500 rounded-full" })
] }) }) }), wt = ({ show: e, title: n, fields: r, onConfirm: l, onClose: i }) => {
  const [a] = ce.useForm();
  return I(() => {
    if (e) {
      const s = {};
      r.forEach((x) => {
        x.defaultValue && (s[x.name] = x.defaultValue);
      }), a.setFieldsValue(s);
    }
  }, [e, a]), /* @__PURE__ */ t(
    Ue,
    {
      title: n,
      open: e,
      onOk: async () => {
        try {
          const s = await a.validateFields();
          l(s), a.resetFields();
        } catch {
        }
      },
      onCancel: () => {
        a.resetFields(), i();
      },
      okText: "Confirm",
      cancelText: "Cancel",
      destroyOnHidden: !0,
      children: /* @__PURE__ */ t(ce, { form: a, layout: "vertical", className: "mt-4", children: r.map((s) => /* @__PURE__ */ t(
        ce.Item,
        {
          name: s.name,
          label: s.label,
          rules: [{ required: s.required !== !1, message: `Please enter ${s.label.toLowerCase()}` }],
          children: /* @__PURE__ */ t(ct, { placeholder: s.placeholder })
        },
        s.name
      )) })
    }
  );
}, vt = ({
  show: e,
  onClose: n,
  onSelectImage: r,
  onFetchImages: l,
  onUploadImage: i,
  onDeleteImage: a
}) => {
  const [m, d] = b([]), [s, x] = b(!1), [N, C] = b(!1), [M, Y] = b(null), [G, Q] = b(""), [D, J] = b(""), [F, ee] = b("library"), j = fe(null);
  I(() => {
    e && l && (x(!0), Y(null), l().then((p) => d(p)).catch(() => Y("Failed to load images.")).finally(() => x(!1)));
  }, [e, l]);
  const K = async (p) => {
    var $;
    const h = ($ = p.target.files) == null ? void 0 : $[0];
    if (h) {
      if (!h.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      if (!i) {
        alert("Image upload handler not configured.");
        return;
      }
      C(!0);
      try {
        const U = await i(h);
        r(U), n();
      } catch {
        alert("Failed to upload image.");
      } finally {
        C(!1), p.target.value = "";
      }
    }
  }, _ = () => {
    D.trim() && (r(D.trim()), n(), J(""));
  }, X = m.filter(
    (p) => !p.isFolder && p.filename.toLowerCase().includes(G.toLowerCase())
  );
  return /* @__PURE__ */ f(
    Ue,
    {
      open: e,
      onCancel: n,
      title: "Insert Image",
      footer: null,
      width: 700,
      destroyOnHidden: !0,
      children: [
        /* @__PURE__ */ f("div", { className: "flex border-b mb-4", children: [
          /* @__PURE__ */ t(
            "button",
            {
              onClick: () => ee("library"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${F === "library" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image Library"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: () => ee("url"),
              className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${F === "url" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: "Image URL"
            }
          )
        ] }),
        F === "url" && /* @__PURE__ */ f("div", { className: "space-y-3", children: [
          /* @__PURE__ */ t("p", { className: "text-sm text-gray-500", children: "Paste a public image URL to insert it directly." }),
          /* @__PURE__ */ f("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ t(
              "input",
              {
                type: "url",
                value: D,
                onChange: (p) => J(p.target.value),
                placeholder: "https://example.com/image.png",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400",
                onKeyDown: (p) => p.key === "Enter" && _()
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                onClick: _,
                disabled: !D.trim(),
                className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700",
                children: "Insert"
              }
            )
          ] }),
          D && /* @__PURE__ */ t("div", { className: "border rounded p-2 text-center", children: /* @__PURE__ */ t("img", { src: D, alt: "preview", className: "max-h-48 mx-auto object-contain" }) })
        ] }),
        F === "library" && /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ f("div", { className: "flex justify-between items-center mb-3 gap-3", children: [
            /* @__PURE__ */ t(
              "input",
              {
                value: G,
                onChange: (p) => Q(p.target.value),
                placeholder: "Search images…",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              }
            ),
            i && /* @__PURE__ */ f(Te, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    var p;
                    return (p = j.current) == null ? void 0 : p.click();
                  },
                  disabled: N,
                  className: "px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium disabled:opacity-50 hover:bg-indigo-700 whitespace-nowrap",
                  children: N ? "Uploading…" : "+ Upload"
                }
              ),
              /* @__PURE__ */ t(
                "input",
                {
                  ref: j,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: K
                }
              )
            ] })
          ] }),
          s && /* @__PURE__ */ t("div", { className: "grid grid-cols-3 gap-3", children: Array.from({ length: 6 }).map((p, h) => /* @__PURE__ */ t("div", { className: "h-32 bg-gray-100 animate-pulse rounded" }, h)) }),
          M && /* @__PURE__ */ t("p", { className: "text-red-500 text-sm py-8 text-center", children: M }),
          !s && !M && X.length === 0 && /* @__PURE__ */ t("div", { className: "py-12 text-center text-gray-400", children: l ? "No images found. Upload one to get started." : "No image library connected. Use the URL tab to insert images." }),
          !s && !M && X.length > 0 && /* @__PURE__ */ t("div", { className: "grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1", children: X.map((p) => /* @__PURE__ */ f(
            "div",
            {
              className: "group relative border rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all",
              onClick: () => {
                r(p.url), n();
              },
              children: [
                /* @__PURE__ */ t(
                  "img",
                  {
                    src: p.url,
                    alt: p.filename,
                    className: "w-full h-28 object-cover",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ f("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      className: "bg-white text-gray-800 text-xs px-2 py-1 rounded font-medium",
                      onClick: (h) => {
                        h.stopPropagation(), r(p.url), n();
                      },
                      children: "Select"
                    }
                  ),
                  a && /* @__PURE__ */ t(
                    "button",
                    {
                      className: "bg-red-500 text-white text-xs px-2 py-1 rounded font-medium",
                      onClick: async (h) => {
                        h.stopPropagation(), await a(p.path), d(($) => $.filter((U) => U.path !== p.path));
                      },
                      children: "Delete"
                    }
                  )
                ] }),
                /* @__PURE__ */ t(k, { title: p.filename.split("/").pop(), children: /* @__PURE__ */ t("p", { className: "text-xs text-gray-600 truncate px-2 py-1 bg-white", children: p.filename.split("/").pop() }) })
              ]
            },
            p.path
          )) })
        ] })
      ]
    }
  );
}, kt = [
  { label: "Red", color: "#ef4444" },
  { label: "Green", color: "#10b981" },
  { label: "Blue", color: "#3b82f6" },
  { label: "Orange", color: "#f59e0b" },
  { label: "Purple", color: "#8b5cf6" },
  { label: "Black", color: "#000000" },
  { label: "White", color: "#ffffff" }
], Ct = (e) => ({
  items: [
    {
      key: "color-grid",
      label: /* @__PURE__ */ t(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", padding: "8px" },
          onClick: (n) => n.stopPropagation(),
          children: kt.map((n) => /* @__PURE__ */ t(k, { title: n.label, children: /* @__PURE__ */ t(
            "div",
            {
              onClick: (r) => {
                r.preventDefault(), e(n.color);
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
      onClick: () => e("#000000")
    }
  ]
}), Nt = (e, n, r, l) => ({
  items: [
    { key: "replace", label: "Replace Image", onClick: e },
    { key: "delete", label: "Delete Image", onClick: n, danger: !0 },
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
        { key: "align-left", label: "Left", onClick: () => r("left") },
        { key: "align-center", label: "Center", onClick: () => r("center") },
        { key: "align-right", label: "Right", onClick: () => r("right") }
      ]
    }
  ]
}), Lt = (e, n, r, l, i, a, m, d, s) => ({
  items: [
    {
      key: "bg-color",
      label: "Background Color",
      children: [
        { key: "bg-#3b82f6", label: "Blue", onClick: () => i("#3b82f6") },
        { key: "bg-#10b981", label: "Green", onClick: () => i("#10b981") },
        { key: "bg-#ef4444", label: "Red", onClick: () => i("#ef4444") },
        { key: "bg-#f59e0b", label: "Orange", onClick: () => i("#f59e0b") },
        { key: "bg-#8b5cf6", label: "Purple", onClick: () => i("#8b5cf6") },
        { key: "bg-#000000", label: "Black", onClick: () => i("#000000") }
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
        { key: "radius-0px", label: "Square", onClick: () => m("0px") },
        { key: "radius-2px", label: "Default", onClick: () => m("2px") },
        { key: "radius-4px", label: "Large", onClick: () => m("4px") },
        { key: "radius-9999px", label: "Pill", onClick: () => m("9999px") }
      ]
    },
    {
      key: "padding",
      label: "Padding",
      children: [
        { key: "padding-8px 16px", label: "Small", onClick: () => d("8px 16px") },
        { key: "padding-12px 24px", label: "Default", onClick: () => d("12px 24px") },
        { key: "padding-16px 32px", label: "Large", onClick: () => d("16px 32px") },
        { key: "padding-20px 40px", label: "Extra Large", onClick: () => d("20px 40px") }
      ]
    },
    {
      key: "align",
      label: "Align",
      children: [
        { key: "align-left", label: "Left", onClick: () => s("left") },
        { key: "align-center", label: "Center", onClick: () => s("center") },
        { key: "align-right", label: "Right", onClick: () => s("right") }
      ]
    },
    { type: "divider" },
    { key: "remove-bg", label: "Remove Background", onClick: n },
    { key: "remove-border", label: "Remove Border", onClick: r },
    { key: "remove-padding", label: "Remove Padding", onClick: l },
    { type: "divider" },
    { key: "delete", label: "Delete", danger: !0, onClick: e }
  ]
}), Et = [
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
], It = (e) => ({
  items: Et.map((n) => ({
    key: n.value,
    label: /* @__PURE__ */ t("span", { style: { fontFamily: n.value }, children: n.label })
  })),
  onClick: ({ key: n }) => {
    e(n);
  }
}), O = new ut({
  strictVariables: !1,
  strictFilters: !1
});
function oe(e) {
  const n = Number(e);
  return Number.isFinite(n) ? n : 0;
}
const Z = { minimumFractionDigits: 2, maximumFractionDigits: 2 }, ue = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
function z(e, n) {
  return new Intl.NumberFormat("en-US", n).format(e);
}
O.registerFilter("money", (e, n) => {
  const r = oe(e);
  if (!n) return z(r, Z);
  try {
    return new Intl.NumberFormat("en-US", {
      ...Z,
      style: "currency",
      currency: n,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${n} ${z(r, Z)}`;
  }
});
O.registerFilter("money_with_currency", (e, n) => {
  const r = oe(e);
  return n ? `${n} ${z(r, Z)}` : z(r, Z);
});
O.registerFilter("money_no_decimals", (e, n) => {
  const r = oe(e);
  if (!n) return z(r, ue);
  try {
    return new Intl.NumberFormat("en-US", {
      ...ue,
      style: "currency",
      currency: n,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${n} ${z(r, ue)}`;
  }
});
O.registerFilter("number", (e) => new Intl.NumberFormat("en-US").format(oe(e)));
const Mt = O.filters.date;
O.registerFilter("date", function(e, n) {
  return e == null || e === "" ? "" : Mt.call(this, e, n);
});
const An = [
  "USD",
  "EUR",
  "GBP",
  "NGN",
  "CAD",
  "AUD",
  "JPY",
  "INR"
], Rt = /* @__PURE__ */ new Set([
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
]), At = new Set(mt().filter((e) => !Rt.has(e)));
function Dt(e) {
  return e ? At.has(e.toUpperCase()) : !1;
}
function St(e) {
  const n = /\|\s*(?:money|money_with_currency|money_no_decimals)\s*:\s*["']([^"']+)["']/g, r = [];
  let l;
  for (; (l = n.exec(e)) !== null; )
    r.push(l[1].toUpperCase());
  return r;
}
function Tt(e) {
  return St(e).filter((r) => !Dt(r));
}
const Bt = ".rsw-editor .rsw-ce";
function Dn(e) {
  const n = [...new Set(Tt(e))];
  return n.length === 0 ? null : `Invalid currency code${n.length > 1 ? "s" : ""}: ${n.join(", ")}. Messages may render with incorrect formatting.`;
}
function Sn(e) {
  try {
    return O.parse(e), { valid: !0 };
  } catch (n) {
    return { valid: !1, error: n };
  }
}
function Ft(e, n) {
  const r = new DOMParser(), l = r.parseFromString(e, "text/html"), i = r.parseFromString(n, "text/html");
  return l.body.innerHTML = i.body.innerHTML, i.head.querySelectorAll("style").forEach((m) => {
    Array.from(l.head.querySelectorAll("style")).some(
      (s) => s.innerHTML === m.innerHTML
    ) || l.head.appendChild(m.cloneNode(!0));
  }), `<!DOCTYPE html>
` + l.documentElement.outerHTML;
}
function Tn(e) {
  return `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body style="word-spacing:normal;">
    <div style="margin:0px auto;max-width:600px;font-family:sans-serif;">
      ${e}
    </div>
  </body>
</html>
`;
}
function B() {
  return typeof document > "u" ? null : document.querySelector(Bt);
}
function Ut() {
  if (typeof document > "u") return null;
  const e = window.getSelection();
  if (!e || e.rangeCount === 0) return null;
  const n = e.getRangeAt(0), r = document.createElement("span");
  return r.id = "selection-marker", r.appendChild(document.createTextNode("​")), n.insertNode(r), n.setStartAfter(r), n.collapse(!0), e.removeAllRanges(), e.addRange(n), r;
}
function He(e) {
  var l;
  if (!e || typeof document > "u") return;
  const n = window.getSelection();
  if (!n) return;
  const r = document.createRange();
  r.setStartAfter(e), r.collapse(!0), n.removeAllRanges(), n.addRange(r), (l = e.parentNode) == null || l.removeChild(e);
}
function me(e, n) {
  const r = B();
  if (!r) return;
  const l = window.getSelection();
  if (!l || l.rangeCount === 0) return;
  const i = l.getRangeAt(0);
  if (!r.contains(i.commonAncestorContainer)) return;
  const a = Ut();
  if (!a) return;
  const d = ((s) => {
    for (; s && s !== r; ) {
      if (s instanceof HTMLElement) {
        const x = window.getComputedStyle(s).display;
        if (x === "block" || x === "list-item" || x === "table" || s.tagName.toLowerCase() === "p" || s.tagName.toLowerCase() === "div" || s.tagName.toLowerCase() === "li" || s.tagName.toLowerCase() === "section")
          return s;
      }
      s = s.parentNode;
    }
    return null;
  })(a);
  d && (d.style.textAlign = e), He(a), n(r.innerHTML);
}
function q(e) {
  const n = B();
  n && (e(n.innerHTML), n.dispatchEvent(new Event("input", { bubbles: !0 })));
}
function Ht(e, n, r) {
  const l = B();
  if (!l) return;
  e.style.outline = "";
  const i = e.closest("div");
  i && i.parentElement === l ? i.remove() : e.remove(), q(n), r == null || r();
}
function Pt(e, n, r, l) {
  e && (e.style.width = n, e.removeAttribute("width"), e.style.outline = "", q(r), l == null || l());
}
function Ot(e, n, r, l) {
  e && (e.style.display = "", e.style.margin = "", n === "left" ? (e.style.display = "block", e.style.margin = "0 auto 0 0") : n === "center" ? (e.style.display = "block", e.style.margin = "0 auto") : n === "right" && (e.style.display = "block", e.style.margin = "0 0 0 auto"), e.style.outline = "", q(r), l == null || l());
}
const Wt = (e, n, r, l, i) => {
  if (typeof document < "u") {
    const a = B();
    if (a) {
      if (i) {
        const d = window.getSelection();
        d == null || d.removeAllRanges(), d == null || d.addRange(i);
      }
      document.execCommand("foreColor", !1, e);
      const m = a.innerHTML;
      n(m), r(m), l(!0);
    }
  }
}, jt = (e) => {
  if (!e || e === "transparent" || e === "rgba(0, 0, 0, 0)") return "#000000";
  if (e.startsWith("rgb")) {
    const n = e.match(/\d+/g);
    if (n && (n.length === 3 || n.length === 4))
      return "#" + n.slice(0, 3).map((r) => {
        const l = parseInt(r).toString(16);
        return l.length === 1 ? "0" + l : l;
      }).join("");
  }
  return e;
}, _t = (e, n, r, l, i) => {
  const a = B();
  if (!a) return;
  if (i) {
    const d = window.getSelection();
    d == null || d.removeAllRanges(), d == null || d.addRange(i);
  }
  document.execCommand("fontName", !1, e);
  const m = a.innerHTML;
  n(m), r(m), l(!0);
};
function W(e, n, r) {
  e.style.outline = "", q(n), r == null || r();
}
function Xt(e, n, r, l) {
  e && (e.style.backgroundColor = n, e.style.border = "none", W(e, r, l));
}
function qt(e, n, r, l) {
  e && (e.style.color = n, W(e, r, l));
}
function $t(e, n, r, l) {
  e && (e.style.borderRadius = n, W(e, r, l));
}
function Vt(e, n, r, l) {
  if (!e) return;
  const i = e.closest("div");
  i && (i.style.textAlign = n, W(e, r, l));
}
function zt(e, n, r, l) {
  e && (e.style.padding = n, W(e, r, l));
}
function Yt(e, n, r) {
  const l = B();
  if (!l) return;
  e.style.outline = "";
  const i = e.closest("[data-editor-button-wrapper='true']");
  i && l.contains(i) ? i.remove() : e.remove(), q(n), r == null || r();
}
function Gt(e, n, r) {
  e && (e.style.color = "#000000", e.style.backgroundColor = "transparent", e.style.border = "2px solid #000000", W(e, n, r));
}
function Jt(e, n, r) {
  e && (e.style.border = "none", W(e, n, r));
}
function Kt(e, n, r) {
  e && (e.style.padding = "0", W(e, n, r));
}
function Zt(e, n, r, l) {
  e.src = n, e.style.outline = "", q(r), l == null || l();
}
function Qt(e, n, r, l) {
  const i = B();
  if (!i) return;
  i.focus();
  const a = window.getSelection();
  if (r.current && (a == null || a.removeAllRanges(), a == null || a.addRange(r.current), r.current = null), !a || a.rangeCount === 0) return;
  const m = a.getRangeAt(0);
  if (!i.contains(m.commonAncestorContainer)) return;
  m.deleteContents();
  const d = document.createElement("div");
  d.style.textAlign = "center", d.style.margin = "1rem 0";
  const s = document.createElement("img");
  s.src = e, s.alt = "Inserted image", s.style.display = "block", s.style.margin = "1rem auto", s.style.width = "100%", s.style.height = "auto", s.style.objectFit = "contain", s.style.borderRadius = "2px", d.appendChild(s);
  const x = document.createElement("p"), N = document.createTextNode(" ");
  x.appendChild(N), m.insertNode(d), m.insertNode(x), m.collapse();
  const C = document.createRange();
  C.setStart(N, 0), C.collapse(!0), a.removeAllRanges(), a.addRange(C), x.scrollIntoView({ behavior: "smooth", block: "center" });
  const M = i.innerHTML;
  n(M), l == null || l(M);
}
const en = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
`;
function tn(e, n, r, l, i) {
  const a = B();
  if (!a) return;
  a.focus();
  const m = window.getSelection();
  if (l.current && (m == null || m.removeAllRanges(), m == null || m.addRange(l.current), l.current = null), !m || m.rangeCount === 0) return;
  const d = m.getRangeAt(0);
  if (!a.contains(d.commonAncestorContainer)) return;
  d.deleteContents();
  const s = document.createElement("div");
  s.contentEditable = "false", s.style.textAlign = "center", s.style.margin = "20px 0", s.style.userSelect = "none", s.setAttribute("data-editor-button-wrapper", "true");
  const x = document.createElement("a");
  x.href = n, x.textContent = e, x.style.cssText = en, x.setAttribute("target", "_blank"), x.setAttribute("rel", "noopener noreferrer"), s.appendChild(x);
  const N = document.createElement("p");
  N.innerHTML = "<br>", d.insertNode(s), d.insertNode(N), d.setStartAfter(N), d.collapse(!0), m.removeAllRanges(), m.addRange(d);
  const C = a.innerHTML;
  r(C), i == null || i(C);
}
function nn(e, n, r) {
  const l = B();
  if (!l) return;
  const i = window.getSelection();
  if (!i || i.rangeCount === 0) return;
  const a = i.getRangeAt(0);
  if (!l.contains(a.commonAncestorContainer)) return;
  a.deleteContents();
  const m = document.createTextNode(e);
  a.insertNode(m), a.setStartAfter(m), a.setEndAfter(m), i.removeAllRanges(), i.addRange(a), n(l.innerHTML), r == null || r();
}
function rn(e) {
  return ft(e, {
    removeStyleTags: !0,
    applyAttributesTableElements: !0,
    preserveImportant: !0
  });
}
function on(e) {
  return new DOMParser().parseFromString(e, "text/html").querySelectorAll("style").length > 0;
}
const ln = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ t("path", { d: "M3 7v6h6" }),
  /* @__PURE__ */ t("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" })
] }), sn = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ t("path", { d: "M21 7v6h-6" }),
  /* @__PURE__ */ t("path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" })
] }), an = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ t("path", { d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" }),
  /* @__PURE__ */ t("path", { d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" })
] }), cn = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ t("line", { x1: "19", y1: "4", x2: "10", y2: "4" }),
  /* @__PURE__ */ t("line", { x1: "14", y1: "20", x2: "5", y2: "20" }),
  /* @__PURE__ */ t("line", { x1: "15", y1: "4", x2: "9", y2: "20" })
] }), dn = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ t("path", { d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" }),
  /* @__PURE__ */ t("line", { x1: "4", y1: "21", x2: "20", y2: "21" })
] }), un = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ t("path", { d: "M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 6.5 3.9h.2m6.2 3.8c.2.5.3 1.1.3 1.7 0 4-3.3 4.7-7 4.7-3.5 0-5.5-.5-7.5-2" }),
  /* @__PURE__ */ t("line", { x1: "2", y1: "12", x2: "22", y2: "12" })
] }), mn = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ t("line", { x1: "10", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ t("line", { x1: "10", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ t("line", { x1: "10", y1: "18", x2: "21", y2: "18" }),
  /* @__PURE__ */ t("path", { d: "M4 6h1v4" }),
  /* @__PURE__ */ t("path", { d: "M4 10h2" }),
  /* @__PURE__ */ t("path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" })
] }), fn = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ t("line", { x1: "9", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ t("line", { x1: "9", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ t("line", { x1: "9", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ t("circle", { cx: "4", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ t("circle", { cx: "4", cy: "12", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ t("circle", { cx: "4", cy: "18", r: "1", fill: "currentColor", stroke: "none" })
] }), pn = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ t("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
  /* @__PURE__ */ t("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
] }), hn = () => /* @__PURE__ */ t(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ t(
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
), gn = () => /* @__PURE__ */ t(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ t(
      "path",
      {
        fill: "currentColor",
        d: "M21 7H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2m-4 4H7a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2m4 4H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2m-4 4H7a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2"
      }
    )
  }
), yn = () => /* @__PURE__ */ t(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ t(
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
), bn = () => /* @__PURE__ */ t(
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
          /* @__PURE__ */ t("path", { d: "M16.24 3.5h-8.5a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h8.5a5 5 0 0 0 5-5v-7a5 5 0 0 0-5-5" }),
          /* @__PURE__ */ t("path", { d: "m2.99 17l2.75-3.2a2.2 2.2 0 0 1 2.77-.27a2.2 2.2 0 0 0 2.77-.27l2.33-2.33a4 4 0 0 1 5.16-.43l2.49 1.93M7.99 10.17a1.66 1.66 0 1 0 0-3.32a1.66 1.66 0 0 0 0 3.32" })
        ]
      }
    )
  }
), xn = () => /* @__PURE__ */ f(
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
      /* @__PURE__ */ t(
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
      /* @__PURE__ */ t("line", { x1: "9", y1: "9", x2: "15", y2: "9" })
    ]
  }
), wn = () => /* @__PURE__ */ t("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ t("polyline", { points: "6 9 12 15 18 9" }) }), vn = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ t("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  /* @__PURE__ */ t("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  /* @__PURE__ */ t("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
] }), kn = ({
  value: e = "",
  onChange: n,
  readOnly: r = !1,
  placeholder: l,
  onFetchImages: i,
  onUploadImage: a,
  onDeleteImage: m,
  enablePreview: d = !0,
  enableCodeEditor: s = !0,
  height: x = 500,
  className: N = "",
  previewData: C,
  toolbarContent: M,
  showCodeEditor: Y,
  onShowCodeEditorChange: G,
  showPreview: Q,
  onShowPreviewChange: D,
  hideViewToggles: J = !1,
  onOpenImageModal: F
}, ee) => {
  const [j, K] = b(e), [_, X] = b(e), [p, h] = b(e), [$, U] = b(p), [Pe, Oe] = b(!1), [We, je] = b(!1), _e = Y !== void 0, Xe = Q !== void 0, H = _e ? Y : We, S = Xe ? Q : Pe, pe = (o) => {
    const c = typeof o == "function" ? o(H) : o;
    G ? G(c) : je(c);
  }, he = (o) => {
    const c = typeof o == "function" ? o(S) : o;
    D ? D(c) : Oe(c);
  }, [qe, ge] = b(!1), [$e, te] = b(!1), [R, le] = b(null), [ie, ne] = b(null), [ye, Ve] = b(null), [ze, se] = b(!1), [be, xe] = b("#000000"), [we, ve] = b("#000000"), [Ye, ke] = b([]), [w, V] = b(null), [Ce, Ge] = b({ top: 0, left: 0 }), [u, L] = b(null), [Ne, Je] = b({ top: 0, left: 0 }), Le = fe(null), re = fe(null);
  I(() => {
    e !== _ && (K(e), X(e), h(e));
  }, [e]), I(() => {
    const o = document.querySelector(".rsw-editor .rsw-ce");
    if (!o) return;
    const c = o.querySelector("#selection-marker");
    c && He(c);
  }, [_]), I(() => {
    let o = null;
    const c = (y) => {
      const v = y.target;
      if (!v) return;
      const g = v.closest(".rsw-editor .rsw-ce img"), E = document.querySelector(".rsw-editor .rsw-ce");
      g && (E != null && E.contains(g)) ? (o && o !== g && (o.style.outline = "none"), g.style.outline = "2px solid red", o = g, V({ element: g, x: y.clientX, y: y.clientY })) : (o && (o.style.outline = "none", o = null), V(null));
    };
    return document.addEventListener("click", c), () => document.removeEventListener("click", c);
  }, []), I(() => {
    let o = null;
    const c = (y) => {
      const v = y.target;
      if (!v) return;
      const g = v.closest(".rsw-editor .rsw-ce a"), E = document.querySelector(".rsw-editor .rsw-ce");
      g && (E != null && E.contains(g)) ? (y.preventDefault(), o && o !== g && (o.style.outline = "none"), g.style.outline = "2px solid #4f46e5", o = g, L({ element: g, x: y.clientX, y: y.clientY })) : (o && (o.style.outline = "none", o = null), L(null));
    };
    return document.addEventListener("click", c), () => document.removeEventListener("click", c);
  }, []), I(() => {
    const o = () => {
      const c = Le.current, y = window.getSelection();
      if (!y || !c || !c.contains(y.anchorNode)) {
        ke([]);
        return;
      }
      const v = y.getRangeAt(0);
      ke(y.isCollapsed ? [] : Array.from(v.getClientRects()));
      let g = y.anchorNode;
      (g == null ? void 0 : g.nodeType) === Node.TEXT_NODE && (g = g.parentElement), g instanceof HTMLElement && xe(jt(window.getComputedStyle(g).color));
    };
    return document.addEventListener("selectionchange", o), window.addEventListener("scroll", o, !0), () => {
      document.removeEventListener("selectionchange", o), window.removeEventListener("scroll", o, !0);
    };
  }, []), I(() => {
    if (!(w != null && w.element)) return;
    const o = w.element, c = o.closest(".rsw-editor .rsw-ce");
    if (!c) return;
    const y = o.getBoundingClientRect(), v = c.getBoundingClientRect(), g = 150, E = 50;
    let T = y.top - v.top, A = y.right - v.left + 8;
    A + g > v.width && (A = y.left - v.left - g - 8), T + E > v.height && (T = v.height - E - 8), T < 0 && (T = 8), A < 0 && (A = 8), Ge({ top: T, left: A });
  }, [w == null ? void 0 : w.element]), I(() => {
    if (!(u != null && u.element)) return;
    const o = u.element, c = o.closest(".rsw-editor .rsw-ce");
    if (!c) return;
    const y = o.getBoundingClientRect(), v = c.getBoundingClientRect(), g = 100, E = 200;
    let T = y.top - v.top, A = y.right - v.left + g;
    A + E > v.width && (A = y.left - v.left - E - g), A < g && (A = g), T < g && (T = g), Je({ top: T, left: A });
  }, [u]);
  const ae = C != null && Object.keys(C).length > 0;
  I(() => {
    if (!S || !ae) {
      U(p);
      return;
    }
    U(p), O.parseAndRender(p, C).then(U).catch(() => U(p));
  }, [S, ae, p, C]);
  const Ke = st(() => on(j), [j]), P = (o) => {
    K(o);
    const c = Ft(_, o);
    X(c), h(c), n == null || n(c);
  }, Ee = () => {
    const o = window.getSelection();
    o && o.rangeCount > 0 && Ve(o.getRangeAt(0).cloneRange());
  }, Ie = (o) => {
    Wt(o, P, h, () => {
    }, ye), xe(o), se(!1);
  }, Ze = (o) => {
    _t(o, P, h, () => {
    }, ye);
  }, Me = () => {
    try {
      const o = rn(j);
      K(o), X(o), h(o), n == null || n(o), Se.success("CSS inlined successfully!");
    } catch {
      Se.error("Failed to inline CSS.");
    }
  }, Re = () => {
    if (!ie) {
      const o = document.querySelector(".rsw-editor .rsw-ce");
      if (o) {
        const c = window.getSelection();
        if (c && c.rangeCount > 0) {
          const y = c.getRangeAt(0);
          o.contains(y.commonAncestorContainer) && (re.current = y.cloneRange());
        }
      }
    }
    F ? F() : ge(!0);
  }, Ae = (o) => {
    if (ie) {
      Zt(ie, o, h, () => ne(null));
      return;
    }
    Qt(o, h, re);
  }, Qe = () => {
    const o = window.getSelection();
    o && o.rangeCount > 0 && (re.current = o.getRangeAt(0).cloneRange()), te(!0);
  }, et = (o) => {
    const { buttonText: c, buttonUrl: y } = o;
    !c || !y || (R ? (R.textContent = c, R.href = y, R.style.outline = "", q(h), le(null)) : tn(c, y, h, re, P), te(!1));
  };
  at(ee, () => ({
    insert: (o) => {
      nn(o, h);
    },
    inlineCss: () => Me(),
    insertImage: (o) => Ae(o),
    clearImageToReplace: () => ne(null)
  }));
  const tt = Nt(
    () => {
      w != null && w.element && (ne(w.element), Re());
    },
    () => (w == null ? void 0 : w.element) && Ht(w.element, h, () => V(null)),
    (o) => (w == null ? void 0 : w.element) && Ot(w.element, o, h, () => V(null)),
    (o) => (w == null ? void 0 : w.element) && Pt(w.element, o, h, () => V(null))
  ), nt = () => {
    u != null && u.element && (le(u.element), L(null), te(!0));
  }, rt = (() => {
    const o = Lt(
      () => (u == null ? void 0 : u.element) && Yt(u.element, h, () => L(null)),
      () => (u == null ? void 0 : u.element) && Gt(u.element, h, () => L(null)),
      () => (u == null ? void 0 : u.element) && Jt(u.element, h, () => L(null)),
      () => (u == null ? void 0 : u.element) && Kt(u.element, h, () => L(null)),
      (c) => (u == null ? void 0 : u.element) && Xt(u.element, c, h, () => L(null)),
      (c) => (u == null ? void 0 : u.element) && qt(u.element, c, h, () => L(null)),
      (c) => (u == null ? void 0 : u.element) && $t(u.element, c, h, () => L(null)),
      (c) => (u == null ? void 0 : u.element) && zt(u.element, c, h, () => L(null)),
      (c) => (u == null ? void 0 : u.element) && Vt(u.element, c, h, () => L(null))
    );
    return {
      ...o,
      items: [
        { key: "edit-button", label: "✏️ Edit Button", onClick: nt },
        { type: "divider" },
        ...o.items ?? []
      ]
    };
  })();
  Ct(Ie);
  const ot = It(Ze), De = typeof x == "number" ? `${x}px` : x;
  return /* @__PURE__ */ f("div", { className: `bg-white border rounded-md overflow-hidden flex flex-col ${N}`, style: { minWidth: 400 }, children: [
    /* @__PURE__ */ f(
      "div",
      {
        className: `flex items-center gap-0.5 px-2 py-1.5 border-b bg-gray-50 overflow-x-auto ${r && !H && !S ? "pointer-events-none opacity-50" : ""}`,
        style: { scrollbarWidth: "none" },
        children: [
          !H && !S && /* @__PURE__ */ f(Te, { children: [
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ t(k, { title: "Undo", children: /* @__PURE__ */ t("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("undo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ t(ln, {}) }) }),
              /* @__PURE__ */ t(k, { title: "Redo", children: /* @__PURE__ */ t("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("redo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ t(sn, {}) }) })
            ] }),
            /* @__PURE__ */ t("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ t(k, { title: "Bold (Ctrl+B)", children: /* @__PURE__ */ t("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("bold");
              }, className: "toolbar-btn", children: /* @__PURE__ */ t(an, {}) }) }),
              /* @__PURE__ */ t(k, { title: "Italic (Ctrl+I)", children: /* @__PURE__ */ t("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("italic");
              }, className: "toolbar-btn", children: /* @__PURE__ */ t(cn, {}) }) }),
              /* @__PURE__ */ t(k, { title: "Underline (Ctrl+U)", children: /* @__PURE__ */ t("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("underline");
              }, className: "toolbar-btn", children: /* @__PURE__ */ t(dn, {}) }) }),
              /* @__PURE__ */ t(k, { title: "Strikethrough", children: /* @__PURE__ */ t("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("strikeThrough");
              }, className: "toolbar-btn", children: /* @__PURE__ */ t(un, {}) }) })
            ] }),
            /* @__PURE__ */ t("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ t(k, { title: "Numbered List", children: /* @__PURE__ */ t("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("insertOrderedList");
              }, className: "toolbar-btn", children: /* @__PURE__ */ t(mn, {}) }) }),
              /* @__PURE__ */ t(k, { title: "Bullet List", children: /* @__PURE__ */ t("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("insertUnorderedList");
              }, className: "toolbar-btn", children: /* @__PURE__ */ t(fn, {}) }) }),
              /* @__PURE__ */ t(k, { title: "Insert Link", children: /* @__PURE__ */ t(
                "button",
                {
                  onMouseDown: (o) => {
                    o.preventDefault();
                    const c = window.prompt("Enter URL");
                    c && document.execCommand("createLink", !1, c);
                  },
                  className: "toolbar-btn",
                  children: /* @__PURE__ */ t(pn, {})
                }
              ) })
            ] }),
            /* @__PURE__ */ t("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ t(k, { title: "Align Left", children: /* @__PURE__ */ t("button", { onClick: () => me("left", P), className: "toolbar-btn", children: /* @__PURE__ */ t(hn, {}) }) }),
              /* @__PURE__ */ t(k, { title: "Align Center", children: /* @__PURE__ */ t("button", { onClick: () => me("center", P), className: "toolbar-btn", children: /* @__PURE__ */ t(gn, {}) }) }),
              /* @__PURE__ */ t(k, { title: "Align Right", children: /* @__PURE__ */ t("button", { onClick: () => me("right", P), className: "toolbar-btn", children: /* @__PURE__ */ t(yn, {}) }) })
            ] }),
            /* @__PURE__ */ t("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ t(k, { title: "Insert Image", children: /* @__PURE__ */ t("button", { onClick: Re, className: "toolbar-btn", children: /* @__PURE__ */ t(bn, {}) }) }),
              /* @__PURE__ */ t(k, { title: "Insert Button", children: /* @__PURE__ */ t("button", { onClick: Qe, className: "toolbar-btn", children: /* @__PURE__ */ t(xn, {}) }) })
            ] }),
            /* @__PURE__ */ t("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ t(k, { title: "Text Color", children: /* @__PURE__ */ t(
              dt,
              {
                value: we,
                open: ze,
                onOpenChange: (o) => {
                  se(o), o && (Ee(), ve(be));
                },
                onChange: (o) => ve(o.toHexString()),
                panelRender: (o) => /* @__PURE__ */ f("div", { children: [
                  o,
                  /* @__PURE__ */ t(
                    "button",
                    {
                      className: "border text-xs px-2 py-1 mt-1 rounded hover:bg-gray-50",
                      onClick: () => {
                        Ie(we), se(!1);
                      },
                      children: "Apply"
                    }
                  )
                ] }),
                children: /* @__PURE__ */ t("button", { type: "button", className: "toolbar-btn", children: /* @__PURE__ */ t("div", { style: { width: 18, height: 18, backgroundColor: be, borderRadius: 2, border: "1px solid #ccc" } }) })
              }
            ) }) }),
            /* @__PURE__ */ t("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ t(k, { title: "Font Family", children: /* @__PURE__ */ t(de, { menu: ot, trigger: ["click"], onOpenChange: (o) => {
              o && Ee();
            }, children: /* @__PURE__ */ f("button", { className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              "Aa ",
              /* @__PURE__ */ t(wn, {})
            ] }) }) }) }),
            /* @__PURE__ */ t("div", { className: "w-px h-4 bg-gray-300 mx-1 flex-shrink-0" })
          ] }),
          !J && H && Ke && /* @__PURE__ */ t(k, { title: "Inline all <style> tags into element attributes for email clients", children: /* @__PURE__ */ f(
            "button",
            {
              onClick: Me,
              className: "flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-white animate-pulse flex-shrink-0",
              children: [
                /* @__PURE__ */ t(vn, {}),
                " Inline CSS"
              ]
            }
          ) }),
          !J && /* @__PURE__ */ f("div", { className: "ml-auto flex items-center gap-1 flex-shrink-0 pl-2", children: [
            s && /* @__PURE__ */ t(
              "button",
              {
                onClick: () => {
                  pe((o) => !o), he(!1);
                },
                className: `text-xs px-2.5 py-1.5 rounded border transition-colors whitespace-nowrap ${H ? "bg-gray-800 text-white border-gray-800" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`,
                children: H ? "View Editor" : "View HTML"
              }
            ),
            d && /* @__PURE__ */ t(
              "button",
              {
                onClick: () => {
                  he((o) => !o), pe(!1);
                },
                className: `text-xs px-2.5 py-1.5 rounded border transition-colors whitespace-nowrap ${S ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`,
                children: S ? "Hide Preview" : "Preview"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex flex-1 min-h-0", style: { height: De }, children: /* @__PURE__ */ t(
      "div",
      {
        className: "flex-1 relative overflow-hidden min-h-0",
        style: H || S ? { minHeight: 300 } : void 0,
        children: S ? /* @__PURE__ */ t("div", { className: "h-full overflow-y-auto flex items-start justify-center p-4 bg-gray-100", children: /* @__PURE__ */ t(xt, { srcDoc: ae ? $ : p }) }) : H ? /* @__PURE__ */ t(
          bt,
          {
            height: De,
            defaultLanguage: "html",
            defaultValue: _,
            onChange: (o) => P(o ?? ""),
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
        ) : /* @__PURE__ */ f("div", { className: "relative h-full", ref: Le, children: [
          /* @__PURE__ */ t(
            ht,
            {
              value: j,
              onChange: (o) => P(o.target.value),
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
          w && /* @__PURE__ */ t("div", { style: { position: "absolute", top: Ce.top - 100, left: Ce.left - 100, zIndex: 1e3, width: 150 }, children: /* @__PURE__ */ t(de, { menu: tt, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || V(null);
          }, children: /* @__PURE__ */ t("span", {}) }) }),
          u && /* @__PURE__ */ t("div", { style: { position: "absolute", top: Ne.top, left: Ne.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ t(de, { menu: rt, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || L(null);
          }, children: /* @__PURE__ */ t("span", {}) }) }),
          Ye.map((o, c) => /* @__PURE__ */ t(
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
            c
          ))
        ] })
      }
    ) }),
    !F && /* @__PURE__ */ t(
      vt,
      {
        show: qe,
        onClose: () => {
          ge(!1), ne(null);
        },
        onSelectImage: Ae,
        onFetchImages: i,
        onUploadImage: a,
        onDeleteImage: m
      }
    ),
    /* @__PURE__ */ t(
      wt,
      {
        show: $e,
        title: R ? "Edit Button" : "Insert Button",
        fields: [
          { name: "buttonText", label: "Button Text", placeholder: "Click Here", defaultValue: (R == null ? void 0 : R.textContent) ?? "" },
          { name: "buttonUrl", label: "Button URL", placeholder: "https://", defaultValue: (R == null ? void 0 : R.getAttribute("href")) ?? "" }
        ],
        onConfirm: et,
        onClose: () => {
          te(!1), le(null);
        }
      }
    )
  ] });
}, Bn = it(
  kn
);
function Fn() {
  const [e, n] = b(!0);
  return I(() => {
    function r() {
      n(!0);
    }
    function l() {
      n(!1);
    }
    return window.addEventListener("online", r), window.addEventListener("offline", l), typeof navigator.onLine < "u" && n(navigator.onLine), () => {
      window.removeEventListener("online", r), window.removeEventListener("offline", l);
    };
  }, []), e;
}
export {
  Bn as CDPEditor,
  An as COMMON_CURRENCY_CODES,
  vt as ImagePickerModal,
  wt as InputModal,
  bt as MonacoEditorWrapper,
  xt as PhonePreview,
  At as VALID_CURRENCY_CODES,
  ht as WysiwygEditor,
  _t as changeFontFamily,
  Wt as changeHighlightColor,
  Bn as default,
  rn as handleInlineCSS,
  tn as insertButtonAtCursorInEditor,
  Qt as insertImageAtCursorInEditor,
  nn as insertTextIntoEditorAtSelection,
  Dt as isValidCurrencyCode,
  O as liquidEngine,
  on as needsInliningDetailed,
  jt as normalizeColor,
  Ft as replaceBodyContent,
  Fn as useOnlineStatus,
  Dn as validateCurrencyCodes,
  Sn as validateLiquidTemplate,
  Tn as wrapEmailBodyHtml
};
//# sourceMappingURL=email-editor.es.js.map
