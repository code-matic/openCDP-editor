import { jsx as e, jsxs as f, Fragment as H } from "react/jsx-runtime";
import En, { lazy as Bt, useMemo as Ve, Suspense as Ft, useState as x, useEffect as T, useRef as fe, forwardRef as Sn, useCallback as Mn, useImperativeHandle as In } from "react";
import { createPortal as Tn } from "react-dom";
import { Form as Oe, Modal as Ht, Input as Rn, Tooltip as E, ColorPicker as Pt, Dropdown as re } from "antd";
import { toast as de } from "sonner";
import { Liquid as An } from "liquidjs";
import { codes as Dn } from "currency-codes";
import Bn from "juice";
const Q = new An({
  strictVariables: !1,
  strictFilters: !1
});
function Le(t) {
  const n = Number(t);
  return Number.isFinite(n) ? n : 0;
}
const he = { minimumFractionDigits: 2, maximumFractionDigits: 2 }, We = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
function le(t, n) {
  return new Intl.NumberFormat("en-US", n).format(t);
}
Q.registerFilter("money", (t, n) => {
  const r = Le(t);
  if (!n) return le(r, he);
  try {
    return new Intl.NumberFormat("en-US", {
      ...he,
      style: "currency",
      currency: n,
      currencyDisplay: "narrowSymbol"
    }).format(r);
  } catch {
    return `${n} ${le(r, he)}`;
  }
});
Q.registerFilter("money_with_currency", (t, n) => {
  const r = Le(t);
  return n ? `${n} ${le(r, he)}` : le(r, he);
});
Q.registerFilter("money_no_decimals", (t, n) => {
  const r = Le(t);
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
Q.registerFilter("number", (t) => new Intl.NumberFormat("en-US").format(Le(t)));
const Fn = Q.filters.date;
Q.registerFilter("date", function(t, n) {
  return t == null || t === "" ? "" : Fn.call(this, t, n);
});
const Dr = [
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
]), Pn = new Set(Dn().filter((t) => !Hn.has(t)));
function On(t) {
  return t ? Pn.has(t.toUpperCase()) : !1;
}
function Wn(t) {
  const n = /\|\s*(?:money|money_with_currency|money_no_decimals)\s*:\s*["']([^"']+)["']/g, r = [];
  let l;
  for (; (l = n.exec(t)) !== null; )
    r.push(l[1].toUpperCase());
  return r;
}
function _n(t) {
  return Wn(t).filter((r) => !On(r));
}
const zn = ".rsw-editor .rsw-ce";
function Br(t) {
  const n = [...new Set(_n(t))];
  return n.length === 0 ? null : `Invalid currency code${n.length > 1 ? "s" : ""}: ${n.join(", ")}. Messages may render with incorrect formatting.`;
}
function Fr(t) {
  try {
    return Q.parse(t), { valid: !0 };
  } catch (n) {
    return { valid: !1, error: n };
  }
}
const qn = /^(?:javascript|vbscript|data):/i, Un = ["href", "src", "action", "formaction", "xlink:href"];
function Ce(t) {
  const n = t.replace(/[\u0000- \u007f]/g, "");
  return /^data:image\//i.test(n) ? !0 : !qn.test(n);
}
function jn(t) {
  if (typeof DOMParser > "u" || !t) return t;
  const n = new DOMParser().parseFromString(t, "text/html");
  let r = !1;
  return n.querySelectorAll("script, iframe, object, embed, base").forEach((s) => {
    s.remove(), r = !0;
  }), n.querySelectorAll("*").forEach((s) => {
    for (const i of Array.from(s.attributes)) {
      const c = i.name.toLowerCase();
      (c.startsWith("on") || Un.includes(c) && !Ce(i.value)) && (s.removeAttribute(i.name), r = !0);
    }
  }), r ? /<html[\s>]/i.test(t) ? `<!DOCTYPE html>
` + n.documentElement.outerHTML : n.body.innerHTML : t;
}
function Xn(t, n) {
  const r = new DOMParser(), l = r.parseFromString(t, "text/html"), s = r.parseFromString(n, "text/html");
  return l.body.innerHTML = s.body.innerHTML, s.head.querySelectorAll("style").forEach((c) => {
    Array.from(l.head.querySelectorAll("style")).some(
      (m) => m.innerHTML === c.innerHTML
    ) || l.head.appendChild(c.cloneNode(!0));
  }), `<!DOCTYPE html>
` + l.documentElement.outerHTML;
}
function Hr(t) {
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
function R() {
  return typeof document > "u" ? null : document.querySelector(zn);
}
function $n(t) {
  var l;
  if (!t || typeof document > "u") return;
  const n = window.getSelection();
  if (!n) return;
  const r = document.createRange();
  r.setStartAfter(t), r.collapse(!0), n.removeAllRanges(), n.addRange(r), (l = t.parentNode) == null || l.removeChild(t);
}
const Vn = /* @__PURE__ */ new Set(["p", "div", "li", "section", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre"]);
function _e(t, n) {
  for (; n && n !== t; ) {
    if (n instanceof HTMLElement) {
      const r = n.tagName.toLowerCase(), l = window.getComputedStyle(n).display;
      if (Vn.has(r) || l === "block" || l === "list-item" || l === "table")
        return n;
    }
    n = n.parentNode;
  }
  return null;
}
function Ot(t, n) {
  const r = /* @__PURE__ */ new Set(), l = _e(t, n.startContainer);
  l && r.add(l);
  const s = _e(t, n.endContainer);
  s && r.add(s);
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
function Wt(t, n, r) {
  var s;
  if (!r) return;
  const l = document.createRange();
  l.selectNodeContents(r), l.collapse(!1), n.removeAllRanges(), n.addRange(l), (s = r.focus) == null || s.call(r), t.focus();
}
function ke(t, n) {
  const r = R();
  if (!r) return;
  const l = window.getSelection();
  if (!l || l.rangeCount === 0) return;
  const s = l.getRangeAt(0);
  if (!r.contains(s.commonAncestorContainer)) return;
  const i = Ot(r, s);
  let c = null;
  i.forEach((u) => {
    u.style.textAlign = t, c = u;
  }), Wt(r, l, c), n(r.innerHTML);
}
function Gn(t, n) {
  const r = R();
  if (!r) return;
  const l = window.getSelection();
  if (!l || l.rangeCount === 0) return;
  const s = l.getRangeAt(0);
  if (!r.contains(s.commonAncestorContainer)) return;
  const i = Ot(r, s);
  let c = null;
  i.forEach((u) => {
    t ? u.style.lineHeight = t : u.style.removeProperty("line-height"), c = u;
  }), Wt(r, l, c), n(r.innerHTML);
}
function W(t) {
  const n = R();
  n && (t(n.innerHTML), n.dispatchEvent(new Event("input", { bubbles: !0 })));
}
function Yn(t, n, r) {
  const l = R();
  if (!l) return;
  t.style.outline = "";
  const s = t.closest("div");
  s && s.parentElement === l ? s.remove() : t.remove(), W(n), r == null || r();
}
function Jn(t, n, r, l) {
  t && (t.style.width = n, t.removeAttribute("width"), t.style.outline = "", W(r), l == null || l());
}
function Zn(t, n, r, l) {
  t && (t.style.display = "", t.style.margin = "", n === "left" ? (t.style.display = "block", t.style.margin = "0 auto 0 0") : n === "center" ? (t.style.display = "block", t.style.margin = "0 auto") : n === "right" && (t.style.display = "block", t.style.margin = "0 0 0 auto"), t.style.outline = "", W(r), l == null || l());
}
const Kn = (t, n, r, l, s) => {
  if (typeof document < "u") {
    const i = R();
    if (i) {
      if (s) {
        const u = window.getSelection();
        u == null || u.removeAllRanges(), u == null || u.addRange(s);
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
  const l = n ?? R();
  if (!r || !(r instanceof HTMLElement)) return Nt;
  let s = r;
  for (; s && s !== l; ) {
    if (s.style.fontSize) {
      const c = Lt(s.style.fontSize);
      if (c) return c;
    }
    s = s.parentElement;
  }
  return Lt(window.getComputedStyle(r).fontSize) ?? Nt;
}
const Qn = (t, n, r, l, s) => {
  const i = R();
  if (!i) return;
  if (s) {
    const u = window.getSelection();
    u == null || u.removeAllRanges(), u == null || u.addRange(s);
  }
  document.execCommand("fontName", !1, t);
  const c = i.innerHTML;
  n(c), r(c), l(!0);
}, eo = 32;
function to(t) {
  const n = t.commonAncestorContainer.nodeType === Node.TEXT_NODE ? t.commonAncestorContainer.parentNode : t.commonAncestorContainer;
  if (!n) return;
  const r = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
    acceptNode(i) {
      return t.intersectsNode(i) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  }), l = [];
  let s = r.nextNode();
  for (; s; )
    s instanceof HTMLElement && l.push(s), s = r.nextNode();
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
const no = (t, n, r, l, s) => {
  const i = R();
  if (!i) return;
  if (s) {
    const p = window.getSelection();
    p == null || p.removeAllRanges(), p == null || p.addRange(s);
  }
  const c = window.getSelection();
  if (!c || c.rangeCount === 0) return;
  const u = c.getRangeAt(0);
  if (!i.contains(u.commonAncestorContainer)) return;
  if (!t || t === "default")
    to(u);
  else {
    const p = parseInt(t, 10);
    if (Number.isNaN(p) || p < 1 || p > eo) return;
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
function oo(t, n, r, l) {
  t && (t.style.backgroundColor = n, t.style.border = "none", ee(t, r, l));
}
function St(t, n, r, l) {
  t && (t.style.color = n, ee(t, r, l));
}
function ro(t, n, r, l) {
  t && (t.style.borderRadius = n, ee(t, r, l));
}
function lo(t, n, r, l) {
  if (!t) return;
  const s = t.closest("div");
  s && (s.style.textAlign = n, ee(t, r, l));
}
function io(t, n, r, l) {
  t && (t.style.padding = n, ee(t, r, l));
}
function so(t, n, r) {
  const l = R();
  if (!l) return;
  t.style.outline = "";
  const s = t.closest("[data-editor-button-wrapper='true']");
  s && l.contains(s) ? s.remove() : t.remove(), W(n), r == null || r();
}
function ao(t, n, r) {
  t && (t.style.color = "#000000", t.style.backgroundColor = "transparent", t.style.border = "2px solid #000000", ee(t, n, r));
}
function co(t, n, r) {
  t && (t.style.border = "none", ee(t, n, r));
}
function uo(t, n, r) {
  t && (t.style.padding = "0", ee(t, n, r));
}
function fo(t, n, r, l) {
  t.src = n, t.style.outline = "", W(r), l == null || l();
}
function ho(t, n, r, l) {
  const s = R();
  if (!s) return;
  s.focus();
  const i = window.getSelection();
  if (r.current && (i == null || i.removeAllRanges(), i == null || i.addRange(r.current), r.current = null), !i || i.rangeCount === 0) return;
  const c = i.getRangeAt(0);
  if (!s.contains(c.commonAncestorContainer)) return;
  c.deleteContents();
  const u = document.createElement("div");
  u.style.textAlign = "center", u.style.margin = "1rem 0";
  const m = document.createElement("img");
  m.src = t, m.alt = "Inserted image", m.style.display = "block", m.style.margin = "1rem auto", m.style.width = "100%", m.style.height = "auto", m.style.objectFit = "contain", m.style.borderRadius = "2px", u.appendChild(m);
  const p = document.createElement("p"), L = document.createTextNode(" ");
  p.appendChild(L), c.insertNode(u), c.insertNode(p), c.collapse();
  const b = document.createRange();
  b.setStart(L, 0), b.collapse(!0), i.removeAllRanges(), i.addRange(b), p.scrollIntoView({ behavior: "smooth", block: "center" });
  const A = s.innerHTML;
  n(A), l == null || l(A);
}
const mo = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
`;
function po(t, n, r, l, s) {
  const i = R();
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
  p.href = n, p.textContent = t, p.style.cssText = mo, p.setAttribute("target", "_blank"), p.setAttribute("rel", "noopener noreferrer"), m.appendChild(p);
  const L = document.createElement("p");
  L.innerHTML = "<br>", u.insertNode(m), u.insertNode(L), u.setStartAfter(L), u.collapse(!0), c.removeAllRanges(), c.addRange(u);
  const b = i.innerHTML;
  r(b), s == null || s(b);
}
function go(t, n, r) {
  const l = R();
  if (!l) return;
  const s = window.getSelection();
  if (!s || s.rangeCount === 0) return;
  const i = s.getRangeAt(0);
  if (!l.contains(i.commonAncestorContainer)) return;
  i.deleteContents();
  const c = document.createTextNode(t);
  i.insertNode(c), i.setStartAfter(c), i.setEndAfter(c), s.removeAllRanges(), s.addRange(i), n(l.innerHTML), r == null || r();
}
function yo(t, n, r) {
  const l = R();
  if (!l || !l.contains(t.commonAncestorContainer)) return;
  t.deleteContents();
  const s = document.createTextNode(n);
  t.insertNode(s);
  const i = window.getSelection();
  if (i) {
    const c = document.createRange();
    c.setStartAfter(s), c.collapse(!0), i.removeAllRanges(), i.addRange(c);
  }
  r(l.innerHTML);
}
const xo = Bt(() => import("react-simple-wysiwyg")), bo = ({
  value: t,
  onChange: n,
  placeholder: r,
  containerProps: l,
  disabled: s,
  onFocus: i,
  onBlur: c
}) => {
  const u = Ve(() => jn(t), [t]);
  return /* @__PURE__ */ e("div", { ...l, children: /* @__PURE__ */ e(Ft, { fallback: /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-100 animate-pulse rounded flex items-center justify-center text-gray-400 text-sm", children: "Loading editor…" }), children: /* @__PURE__ */ e(
    xo,
    {
      value: u,
      onChange: n,
      placeholder: r,
      spellCheck: !1,
      disabled: s,
      onFocus: i,
      onBlur: c
    }
  ) }) });
}, vo = Bt(() => import("@monaco-editor/react"));
function wo(t) {
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
const ko = ({
  height: t = "100%",
  defaultLanguage: n = "html",
  defaultValue: r = "",
  onChange: l,
  theme: s = "vs-dark",
  options: i = {},
  className: c,
  onMount: u
}) => {
  const [m, p] = x(!1), L = En.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (A) => {
      wo(A), u == null || u(A);
    },
    [u]
  );
  T(() => {
    p(!0);
  }, []);
  const b = /* @__PURE__ */ e("div", { className: "h-full min-h-[300px] bg-gray-900 rounded flex items-center justify-center text-gray-400 text-sm animate-pulse", children: "Loading code editor…" });
  return m ? /* @__PURE__ */ e("div", { className: c, children: /* @__PURE__ */ e(Ft, { fallback: b, children: /* @__PURE__ */ e(
    vo,
    {
      height: t,
      defaultLanguage: n,
      defaultValue: r,
      onChange: l,
      theme: s,
      options: i,
      onMount: L
    }
  ) }) }) : b;
}, Co = ({ srcDoc: t }) => /* @__PURE__ */ e("div", { className: "flex justify-center items-start", children: /* @__PURE__ */ e("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ f("div", { className: "relative !max-w-[340px] w-full !h-[640px] border-8 border-black rounded-[40px] overflow-hidden shadow-xl bg-black", children: [
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
      sandbox: "allow-popups allow-popups-to-escape-sandbox",
      className: "max-w-[400px] w-full h-full bg-white",
      style: { border: "none", paddingTop: "40px" }
    }
  ),
  /* @__PURE__ */ e("div", { className: "absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gray-500 rounded-full" })
] }) }) }), qe = ({ show: t, title: n, fields: r, onConfirm: l, onClose: s }) => {
  const [i] = Oe.useForm();
  return T(() => {
    if (t) {
      const m = {};
      r.forEach((p) => {
        p.defaultValue && (m[p.name] = p.defaultValue);
      }), i.setFieldsValue(m);
    }
  }, [t, i]), /* @__PURE__ */ e(
    Ht,
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
        i.resetFields(), s();
      },
      okText: "Confirm",
      cancelText: "Cancel",
      destroyOnHidden: !0,
      children: /* @__PURE__ */ e(Oe, { form: i, layout: "vertical", className: "mt-4", children: r.map((m) => /* @__PURE__ */ e(
        Oe.Item,
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
}, No = ({
  show: t,
  onClose: n,
  onSelectImage: r,
  onFetchImages: l,
  onUploadImage: s,
  onDeleteImage: i
}) => {
  const [c, u] = x([]), [m, p] = x(!1), [L, b] = x(!1), [A, ie] = x(null), [se, me] = x(""), [Y, ae] = x(""), [Z, J] = x("library"), te = fe(null);
  T(() => {
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
      if (!s) {
        alert("Image upload handler not configured.");
        return;
      }
      b(!0);
      try {
        const U = await s(D);
        r(U), n();
      } catch {
        alert("Failed to upload image.");
      } finally {
        b(!1), k.target.value = "";
      }
    }
  }, pe = () => {
    Y.trim() && (r(Y.trim()), n(), ae(""));
  }, $ = c.filter(
    (k) => !k.isFolder && k.filename.toLowerCase().includes(se.toLowerCase())
  );
  return /* @__PURE__ */ f(
    Ht,
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
                onKeyDown: (k) => k.key === "Enter" && pe()
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: pe,
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
                onChange: (k) => me(k.target.value),
                placeholder: "Search images…",
                className: "flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              }
            ),
            s && /* @__PURE__ */ f(H, { children: [
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
                        D.stopPropagation(), await i(k.path), u((K) => K.filter((U) => U.path !== k.path));
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
}, z = (t, n = 13) => /* @__PURE__ */ e("svg", { width: n, height: n, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", flexShrink: 0 }, children: t }), Lo = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
  /* @__PURE__ */ e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
] }), t), Ge = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "3 6 5 6 21 6" }),
  /* @__PURE__ */ e("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }),
  /* @__PURE__ */ e("path", { d: "M10 11v6M14 11v6" }),
  /* @__PURE__ */ e("path", { d: "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" })
] }), t), Eo = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "1 4 1 10 7 10" }),
  /* @__PURE__ */ e("path", { d: "M3.51 15a9 9 0 1 0 .49-3.8" })
] }), t), So = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" }),
  /* @__PURE__ */ e("circle", { cx: "6.5", cy: "11.5", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "8.5", cy: "7.5", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "12", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "15.5", cy: "7.5", r: "1", fill: "currentColor", stroke: "none" })
] }), t), _t = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "4 7 4 4 20 4 20 7" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "20", x2: "15", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "4", x2: "12", y2: "20" })
] }), t), Mo = ({ size: t = 13 }) => z(/* @__PURE__ */ e(H, { children: /* @__PURE__ */ e("path", { d: "M3 9V6a3 3 0 0 1 3-3h3M21 9V6a3 3 0 0 0-3-3h-3M3 15v3a3 3 0 0 0 3 3h3m6 0h3a3 3 0 0 0 3-3v-3" }) }), t), Io = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("rect", { x: "3", y: "8", width: "18", height: "8", rx: "1" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "2", x2: "12", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "18", x2: "12", y2: "22" }),
  /* @__PURE__ */ e("polyline", { points: "9 5 12 2 15 5" }),
  /* @__PURE__ */ e("polyline", { points: "9 19 12 22 15 19" })
] }), t), zt = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "12", x2: "15", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "18", x2: "18", y2: "18" })
] }), t), Ne = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "6", y1: "12", x2: "18", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "18", x2: "20", y2: "18" })
] }), t), qt = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "6", y1: "18", x2: "21", y2: "18" })
] }), t), To = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
  /* @__PURE__ */ e("polyline", { points: "15 3 21 3 21 9" }),
  /* @__PURE__ */ e("polyline", { points: "9 21 3 21 3 15" }),
  /* @__PURE__ */ e("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
  /* @__PURE__ */ e("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
] }), t), Ue = ({ size: t = 13 }) => z(/* @__PURE__ */ f(H, { children: [
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
function ue(t) {
  t.stopPropagation();
}
const Mt = ({ defaultColor: t, onApply: n, buttonLabel: r = "Custom color", recentColors: l }) => {
  const [s, i] = x(t), [c, u] = x(!1);
  T(() => {
    i(t);
  }, [t]);
  const m = l && l.length > 0 ? [{ label: "Recent", colors: l }] : void 0;
  return /* @__PURE__ */ e("div", { onClick: ue, onMouseDown: ue, children: /* @__PURE__ */ e(
    Pt,
    {
      value: s,
      open: c,
      onOpenChange: u,
      onChange: (p) => i(p.toHexString()),
      presets: m,
      getPopupContainer: (p) => p.parentElement ?? document.body,
      panelRender: (p) => /* @__PURE__ */ f("div", { onClick: ue, onMouseDown: ue, children: [
        p,
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: "border text-xs px-2 py-1 mt-1 mb-1 mx-1 rounded hover:bg-gray-50",
            style: { width: "calc(100% - 8px)" },
            onClick: () => {
              n(s), u(!1);
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
          onClick: ue,
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                style: {
                  width: 14,
                  height: 14,
                  borderRadius: 2,
                  backgroundColor: s,
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
}, Ro = [
  { key: "bg-#3b82f6", color: "#3b82f6", label: "Blue" },
  { key: "bg-#10b981", color: "#10b981", label: "Green" },
  { key: "bg-#ef4444", color: "#ef4444", label: "Red" },
  { key: "bg-#f59e0b", color: "#f59e0b", label: "Orange" },
  { key: "bg-#8b5cf6", color: "#8b5cf6", label: "Purple" },
  { key: "bg-#000000", color: "#000000", label: "Black" }
], Ao = [
  { key: "text-#ffffff", color: "#ffffff", label: "White" },
  { key: "text-#000000", color: "#000000", label: "Black" }
], Do = [
  { label: "Red", color: "#ef4444" },
  { label: "Green", color: "#10b981" },
  { label: "Blue", color: "#3b82f6" },
  { label: "Orange", color: "#f59e0b" },
  { label: "Purple", color: "#8b5cf6" },
  { label: "Black", color: "#000000" },
  { label: "White", color: "#ffffff" }
], Bo = (t) => ({
  items: [
    {
      key: "color-grid",
      label: /* @__PURE__ */ e(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", padding: "8px" },
          onClick: (n) => n.stopPropagation(),
          children: Do.map((n) => /* @__PURE__ */ e(E, { title: n.label, children: /* @__PURE__ */ e(
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
}), Fo = (t, n, r, l) => ({
  items: [
    { key: "replace", label: M(/* @__PURE__ */ e(Eo, {}), "Replace Image"), onClick: t },
    { key: "delete", label: M(/* @__PURE__ */ e(Ge, {}), "Delete Image"), onClick: n, danger: !0 },
    { type: "divider" },
    {
      key: "resize",
      label: M(/* @__PURE__ */ e(To, {}), "Resize Width"),
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
      label: M(/* @__PURE__ */ e(Ne, {}), "Align Image"),
      children: [
        { key: "align-left", label: M(/* @__PURE__ */ e(zt, {}), "Left"), onClick: () => r("left") },
        { key: "align-center", label: M(/* @__PURE__ */ e(Ne, {}), "Center"), onClick: () => r("center") },
        { key: "align-right", label: M(/* @__PURE__ */ e(qt, {}), "Right"), onClick: () => r("right") }
      ]
    }
  ]
}), Ho = (t, n, r, l, s, i, c, u, m, p, L) => ({
  items: [
    {
      key: "bg-color",
      label: M(/* @__PURE__ */ e(So, {}), "Background Color"),
      children: [
        {
          key: "bg-custom",
          label: /* @__PURE__ */ e(
            Mt,
            {
              defaultColor: (p == null ? void 0 : p.background) ?? "#3b82f6",
              onApply: s,
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
              onClick: () => s(b)
            }))
          }
        ] : [],
        { type: "divider" },
        ...Ro.map((b) => ({
          key: b.key,
          label: G(b.color, b.label),
          onClick: () => s(b.color)
        }))
      ]
    },
    {
      key: "text-color",
      label: M(/* @__PURE__ */ e(_t, {}), "Text Color"),
      children: [
        {
          key: "text-custom",
          label: /* @__PURE__ */ e(
            Mt,
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
        ...Ao.map((b) => ({
          key: b.key,
          label: G(b.color, b.label),
          onClick: () => i(b.color)
        }))
      ]
    },
    {
      key: "border-radius",
      label: M(/* @__PURE__ */ e(Mo, {}), "Border Radius"),
      children: [
        { key: "radius-0px", label: "Square (0px)", onClick: () => c("0px") },
        { key: "radius-2px", label: "Rounded (2px)", onClick: () => c("2px") },
        { key: "radius-4px", label: "Large (4px)", onClick: () => c("4px") },
        { key: "radius-9999px", label: "Pill", onClick: () => c("9999px") }
      ]
    },
    {
      key: "padding",
      label: M(/* @__PURE__ */ e(Io, {}), "Padding"),
      children: [
        { key: "padding-8px 16px", label: "Small", onClick: () => u("8px 16px") },
        { key: "padding-12px 24px", label: "Default", onClick: () => u("12px 24px") },
        { key: "padding-16px 32px", label: "Large", onClick: () => u("16px 32px") },
        { key: "padding-20px 40px", label: "Extra Large", onClick: () => u("20px 40px") }
      ]
    },
    {
      key: "align",
      label: M(/* @__PURE__ */ e(Ne, {}), "Align"),
      children: [
        { key: "align-left", label: M(/* @__PURE__ */ e(zt, {}), "Left"), onClick: () => m("left") },
        { key: "align-center", label: M(/* @__PURE__ */ e(Ne, {}), "Center"), onClick: () => m("center") },
        { key: "align-right", label: M(/* @__PURE__ */ e(qt, {}), "Right"), onClick: () => m("right") }
      ]
    },
    { type: "divider" },
    { key: "remove-bg", label: M(/* @__PURE__ */ e(Ue, {}), "Remove Background"), onClick: n },
    { key: "remove-border", label: M(/* @__PURE__ */ e(Ue, {}), "Remove Border"), onClick: r },
    { key: "remove-padding", label: M(/* @__PURE__ */ e(Ue, {}), "Remove Padding"), onClick: l },
    { type: "divider" },
    { key: "delete", label: M(/* @__PURE__ */ e(Ge, {}), "Delete Button"), danger: !0, onClick: t }
  ]
}), Po = (t, n, r) => ({
  items: [
    { key: "edit-link", label: M(/* @__PURE__ */ e(Lo, {}), "Edit Link"), onClick: t },
    {
      key: "text-color",
      label: M(/* @__PURE__ */ e(_t, {}), "Text Color"),
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
    { key: "delete", label: M(/* @__PURE__ */ e(Ge, {}), "Remove Link"), danger: !0, onClick: n }
  ]
}), Oo = [
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
], Wo = (t) => ({
  items: Oo.map((n) => ({
    key: n.value,
    label: /* @__PURE__ */ e("span", { style: { fontFamily: n.value }, children: n.label })
  })),
  onClick: ({ key: n }) => {
    t(n);
  }
}), _o = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32], zo = (t) => ({
  items: [
    { key: "default", label: "Default" },
    ..._o.map((n) => ({
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
}), qo = [
  { label: "Default", value: "default" },
  { label: "Single (1.0)", value: "1" },
  { label: "1.15", value: "1.15" },
  { label: "1.5", value: "1.5" },
  { label: "Double (2.0)", value: "2" },
  { label: "2.5", value: "2.5" }
], Uo = (t) => ({
  items: qo.map((n) => ({
    key: n.value,
    label: n.label
  })),
  onClick: ({ key: n }) => {
    t(n === "default" ? "" : String(n));
  }
});
function jo(t) {
  return Bn(t, {
    removeStyleTags: !0,
    applyAttributesTableElements: !0,
    preserveImportant: !0
  });
}
function Xo(t) {
  return new DOMParser().parseFromString(t, "text/html").querySelectorAll("style").length > 0;
}
function $o(t, n, r) {
  let l = "";
  const s = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null);
  let i;
  for (; i = s.nextNode(); ) {
    const c = i;
    if (c === n) {
      l += c.data.slice(0, r);
      break;
    }
    l += c.data;
  }
  return l;
}
function It(t, n) {
  let r = n;
  const l = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null);
  let s;
  for (; s = l.nextNode(); ) {
    const i = s, c = i.data.length;
    if (r < c) return { node: i, offset: r };
    if (r === c) return { node: i, offset: c };
    r -= c;
  }
  return null;
}
const je = "customer", Xe = "event";
function Vo(t) {
  return t === "" ? { group: "both", query: "" } : t.startsWith(je) ? { group: "customer", query: t.slice(je.length) } : t.startsWith(Xe) ? { group: "event", query: t.slice(Xe.length) } : je.startsWith(t) ? { group: "customer", query: "" } : Xe.startsWith(t) ? { group: "event", query: "" } : null;
}
function Tt(t, n, r) {
  if (n.nodeType !== Node.TEXT_NODE) return null;
  const l = $o(t, n, r), s = l.lastIndexOf("@");
  if (s < 0 || s > 0 && /[a-zA-Z0-9_]/.test(l.charAt(s - 1))) return null;
  const c = l.slice(s).match(/^@([a-zA-Z0-9_]*)$/);
  if (!c) return null;
  const u = c[1] ?? "", m = Vo(u);
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
function At(t) {
  return /\{\{\s*event\./.test(t.value);
}
function Go(t, n, r) {
  const l = n === "both" ? t.filter((i) => Rt(i) || At(i)) : t.filter((i) => n === "customer" ? Rt(i) : At(i)), s = r.trim().toLowerCase();
  return s ? l.filter(
    (i) => i.label.toLowerCase().includes(s) || i.value.toLowerCase().replace(/\s/g, "").includes(s)
  ) : l;
}
const Dt = 280, Yo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M3 7v6h6" }),
  /* @__PURE__ */ e("path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" })
] }), Jo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M21 7v6h-6" }),
  /* @__PURE__ */ e("path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" })
] }), Zo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" }),
  /* @__PURE__ */ e("path", { d: "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" })
] }), Ko = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "19", y1: "4", x2: "10", y2: "4" }),
  /* @__PURE__ */ e("line", { x1: "14", y1: "20", x2: "5", y2: "20" }),
  /* @__PURE__ */ e("line", { x1: "15", y1: "4", x2: "9", y2: "20" })
] }), Qo = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "21", x2: "20", y2: "21" })
] }), er = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 6.5 3.9h.2m6.2 3.8c.2.5.3 1.1.3 1.7 0 4-3.3 4.7-7 4.7-3.5 0-5.5-.5-7.5-2" }),
  /* @__PURE__ */ e("line", { x1: "2", y1: "12", x2: "22", y2: "12" })
] }), tr = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "10", y1: "6", x2: "21", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "12", x2: "21", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "10", y1: "18", x2: "21", y2: "18" }),
  /* @__PURE__ */ e("path", { d: "M4 6h1v4" }),
  /* @__PURE__ */ e("path", { d: "M4 10h2" }),
  /* @__PURE__ */ e("path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" })
] }), nr = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "9", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "9", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "6", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "12", r: "1", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ e("circle", { cx: "4", cy: "18", r: "1", fill: "currentColor", stroke: "none" })
] }), or = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
  /* @__PURE__ */ e("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
] }), rr = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H1" }), lr = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H2" }), ir = () => /* @__PURE__ */ e("span", { style: { fontWeight: 500, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }, children: "H3" }), sr = () => /* @__PURE__ */ e(
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
), ar = () => /* @__PURE__ */ e(
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
), cr = () => /* @__PURE__ */ e(
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
), dr = () => /* @__PURE__ */ e(
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
), ur = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("line", { x1: "4", y1: "6", x2: "20", y2: "6" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "12", x2: "20", y2: "12" }),
  /* @__PURE__ */ e("line", { x1: "4", y1: "18", x2: "20", y2: "18" }),
  /* @__PURE__ */ e("polyline", { points: "2 4 2 8" }),
  /* @__PURE__ */ e("polyline", { points: "2 16 2 20" }),
  /* @__PURE__ */ e("line", { x1: "2", y1: "4", x2: "2", y2: "20" })
] }), fr = () => /* @__PURE__ */ f(
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
), hr = ({ size: t }) => /* @__PURE__ */ f("span", { className: "inline-flex items-center leading-none gap-0.5", "aria-hidden": !0, children: [
  /* @__PURE__ */ e("span", { style: { fontSize: 11, fontWeight: 700, fontVariantNumeric: "tabular-nums", minWidth: 14, textAlign: "center" }, children: t }),
  /* @__PURE__ */ f("svg", { width: "8", height: "12", viewBox: "0 0 8 12", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M4 1v10" }),
    /* @__PURE__ */ e("path", { d: "M1.5 3.5 4 1l2.5 2.5" }),
    /* @__PURE__ */ e("path", { d: "M1.5 8.5 4 11l2.5-2.5" })
  ] })
] }), mr = () => /* @__PURE__ */ e(
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
), pr = () => /* @__PURE__ */ f(
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
), $e = () => /* @__PURE__ */ e("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ e("polyline", { points: "6 9 12 15 18 9" }) }), gr = () => /* @__PURE__ */ f("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ e("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  /* @__PURE__ */ e("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  /* @__PURE__ */ e("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
] }), yr = () => /* @__PURE__ */ f("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("polyline", { points: "16 18 22 12 16 6" }),
  /* @__PURE__ */ e("polyline", { points: "8 6 2 12 8 18" })
] }), xr = () => /* @__PURE__ */ f("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ e("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2", ry: "2" }),
  /* @__PURE__ */ e("circle", { cx: "12", cy: "17", r: "1", fill: "currentColor", stroke: "none" })
] }), br = ({
  value: t = "",
  onChange: n,
  readOnly: r = !1,
  placeholder: l,
  onFetchImages: s,
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
  showPreview: me,
  onShowPreviewChange: Y,
  hideViewToggles: ae = !1,
  onOpenImageModal: Z,
  insertableAttributes: J,
  recentColors: te,
  onColorUsed: q
}, pe) => {
  const [$, k] = x(t), [D, K] = x(t), [U, C] = x(t), [Ut, ge] = x(U), [jt, Xt] = x(!1), [$t, Vt] = x(!1), Gt = ie !== void 0, Yt = me !== void 0, _ = Gt ? ie : $t, P = Yt ? me : jt, Ye = (o) => {
    const a = typeof o == "function" ? o(_) : o;
    se ? se(a) : Vt(a);
  }, Je = (o) => {
    const a = typeof o == "function" ? o(P) : o;
    Y ? Y(a) : Xt(a);
  }, [Jt, Ze] = x(!1), [Zt, ye] = x(!1), [Kt, Ee] = x(!1), [Qt, Se] = x(!1), [Ke, Me] = x(null), [I, ne] = x(null), [Qe, en] = x({ top: 0, left: 0 }), [V, Ie] = x(null), [j, Te] = x(null), [Re, xe] = x(null), [ce, tn] = x(null), [nn, Ae] = x(!1), [et, tt] = x("#000000"), [on, De] = x(16), [nt, ot] = x("#000000"), [rn, rt] = x([]), [ln, lt] = x(null), [vr, it] = x(!1), [wr, st] = x(!1), [kr, at] = x(!1), [Cr, ct] = x(!1), [S, oe] = x(null), [dt, sn] = x({ top: 0, left: 0 }), [g, B] = x(null), [ut, an] = x({ top: 0, left: 0 }), [ft, cn] = x({ top: 0, left: 0 }), [X, F] = x(null), ht = fe(J);
  ht.current = J;
  const mt = fe(null), be = fe(null);
  T(() => {
    t !== D && (k(t), K(t), C(t));
  }, [t]), T(() => {
    const o = document.querySelector(".rsw-editor .rsw-ce");
    if (!o) return;
    const a = o.querySelector("#selection-marker");
    a && $n(a);
  }, [D]), T(() => {
    let o = null;
    const a = (d) => {
      const h = d.target;
      if (!h) return;
      const y = h.closest(".rsw-editor .rsw-ce img"), v = document.querySelector(".rsw-editor .rsw-ce");
      y && (v != null && v.contains(y)) ? (o && o !== y && (o.style.outline = "none"), y.style.outline = "2px solid red", o = y, oe({ element: y, x: d.clientX, y: d.clientY })) : (o && (o.style.outline = "none", o = null), oe(null));
    };
    return document.addEventListener("click", a), () => document.removeEventListener("click", a);
  }, []), T(() => {
    let o = null, a = null;
    const d = (h) => {
      const y = h.target;
      if (!y) return;
      const v = y.closest(".rsw-editor .rsw-ce a"), w = document.querySelector(".rsw-editor .rsw-ce");
      v && (w != null && w.contains(v)) ? (h.preventDefault(), !!v.closest("[data-editor-button-wrapper='true']") || !!v.style.backgroundColor && !!v.style.padding ? (a && (a.style.outline = "none", a = null), ne(null), o && o !== v && (o.style.outline = "none", o.style.boxShadow = ""), v.style.outline = "3px solid #4f46e5", v.style.boxShadow = "0 0 0 5px rgba(79,70,229,0.18)", o = v, B({ element: v, x: h.clientX, y: h.clientY })) : (o && (o.style.outline = "none", o.style.boxShadow = "", o = null), B(null), a && a !== v && (a.style.outline = "none"), v.style.outline = "2px solid #0ea5e9", a = v, ne({ element: v, x: h.clientX, y: h.clientY }))) : (o && (o.style.outline = "none", o.style.boxShadow = "", o = null), a && (a.style.outline = "none", a = null), B(null), ne(null));
    };
    return document.addEventListener("click", d), () => document.removeEventListener("click", d);
  }, []), T(() => {
    const o = () => {
      const a = mt.current, d = window.getSelection();
      if (!d || !a || !a.contains(d.anchorNode)) {
        rt([]), lt(null), it(!1), st(!1), at(!1), ct(!1);
        return;
      }
      const h = d.getRangeAt(0);
      rt(d.isCollapsed ? [] : Array.from(h.getClientRects()));
      let y = d.anchorNode;
      const v = a.querySelector(".rsw-ce");
      if ((y == null ? void 0 : y.nodeType) === Node.TEXT_NODE && (y = y.parentElement), y instanceof HTMLElement) {
        tt(ze(window.getComputedStyle(y).color)), De(Et(y, v));
        const w = y.closest("h1, h2, h3");
        lt(w ? w.tagName.toLowerCase() : null), it(document.queryCommandState("bold")), st(document.queryCommandState("italic")), at(document.queryCommandState("underline")), ct(document.queryCommandState("strikeThrough"));
      }
    };
    return document.addEventListener("selectionchange", o), window.addEventListener("scroll", o, !0), () => {
      document.removeEventListener("selectionchange", o), window.removeEventListener("scroll", o, !0);
    };
  }, []), T(() => {
    if (!(S != null && S.element)) return;
    const o = S.element, a = o.closest(".rsw-editor .rsw-ce");
    if (!a) return;
    const d = o.getBoundingClientRect(), h = a.getBoundingClientRect(), y = 150, v = 50;
    let w = d.top - h.top, N = d.right - h.left + 8;
    N + y > h.width && (N = d.left - h.left - y - 8), w + v > h.height && (w = h.height - v - 8), w < 0 && (w = 8), N < 0 && (N = 8), sn({ top: w, left: N });
  }, [S == null ? void 0 : S.element]), T(() => {
    if (!(g != null && g.element)) return;
    const o = g.element, a = o.closest(".rsw-editor .rsw-ce");
    if (!a) return;
    const d = o.getBoundingClientRect(), h = a.getBoundingClientRect(), y = 100, v = 200;
    let w = d.top - h.top, N = d.right - h.left + y;
    N + v > h.width && (N = d.left - h.left - v - y), N < y && (N = y), w < y && (w = y), an({ top: w, left: N }), cn({
      top: Math.max(4, d.top - h.top - 26),
      left: d.left - h.left + d.width / 2
    });
  }, [g]), T(() => {
    if (!(I != null && I.element)) return;
    const o = I.element, a = o.closest(".rsw-editor .rsw-ce");
    if (!a) return;
    const d = o.getBoundingClientRect(), h = a.getBoundingClientRect(), y = 8, v = 200;
    let w = d.bottom - h.top + y, N = d.left - h.left;
    N + v > h.width && (N = h.width - v - y), N < y && (N = y), w + 100 > h.height && (w = d.top - h.top - 100), en({ top: w, left: N });
  }, [I]);
  const Be = b != null && Object.keys(b).length > 0;
  T(() => {
    if (!P || !Be) {
      ge(U);
      return;
    }
    ge(U), Q.parseAndRender(U, b).then(ge).catch(() => ge(U));
  }, [P, Be, U, b]);
  const dn = Ve(() => Xo($), [$]), { wordCount: pt, charCount: gt } = Ve(() => {
    const o = $.replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
    return { wordCount: o.length === 0 ? 0 : o.split(" ").filter(Boolean).length, charCount: o.replace(/ /g, "").length };
  }, [$]), O = (o) => {
    k(o);
    const a = Xn(D, o);
    K(a), C(a), n == null || n(a);
  }, yt = fe(O);
  yt.current = O;
  const Fe = Mn((o) => {
    const a = R(), d = window.getSelection();
    if (!a || !d || d.rangeCount === 0) return;
    const h = d.anchorNode;
    if (!h) return;
    const y = d.anchorOffset, v = Tt(a, h, y);
    if (!v) return;
    const w = It(a, v.startOffset);
    if (!w || h.nodeType !== Node.TEXT_NODE) return;
    const N = document.createRange();
    N.setStart(w.node, w.offset), N.setEnd(h, y), yo(N, o, yt.current);
  }, []);
  T(() => {
    if (!(J != null && J.length) || r || _ || P) {
      F(null);
      return;
    }
    const o = () => {
      const a = ht.current;
      if (!(a != null && a.length)) {
        F(null);
        return;
      }
      const d = R(), h = window.getSelection();
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
      const w = Tt(d, y, v);
      if (!w) {
        F(null);
        return;
      }
      const N = Go(a, w.group, w.query), He = It(d, w.startOffset);
      if (!He) {
        F(null);
        return;
      }
      const Pe = document.createRange();
      Pe.setStart(He.node, He.offset), Pe.setEnd(y, v);
      const Ct = Pe.getBoundingClientRect();
      F((we) => {
        const Ln = we && we.group === w.group && we.query === w.query;
        return {
          group: w.group,
          query: w.query,
          items: N,
          highlightIndex: Ln ? Math.min(we.highlightIndex, Math.max(0, N.length - 1)) : 0,
          left: Ct.left,
          top: Ct.bottom + 4
        };
      });
    };
    return document.addEventListener("input", o, !0), document.addEventListener("keyup", o, !0), document.addEventListener("selectionchange", o), () => {
      document.removeEventListener("input", o, !0), document.removeEventListener("keyup", o, !0), document.removeEventListener("selectionchange", o);
    };
  }, [J, r, _, P]), T(() => {
    if (!X) return;
    const o = (a) => {
      if (a.key === "Escape") {
        a.preventDefault(), F(null);
        return;
      }
      if (a.key === "ArrowDown") {
        a.preventDefault(), F(
          (d) => d && d.items.length ? { ...d, highlightIndex: Math.min(d.items.length - 1, d.highlightIndex + 1) } : d
        );
        return;
      }
      if (a.key === "ArrowUp") {
        a.preventDefault(), F((d) => d && d.items.length ? { ...d, highlightIndex: Math.max(0, d.highlightIndex - 1) } : d);
        return;
      }
      (a.key === "Enter" || a.key === "Tab" && !a.shiftKey) && (a.preventDefault(), F((d) => {
        if (!d || d.items.length === 0) return null;
        const h = d.items[d.highlightIndex];
        return h && Fe(h.value), null;
      }));
    };
    return document.addEventListener("keydown", o, !0), () => document.removeEventListener("keydown", o, !0);
  }, [X, Fe]);
  const ve = () => {
    const o = window.getSelection();
    o && o.rangeCount > 0 && tn(o.getRangeAt(0).cloneRange());
  }, xt = (o) => {
    Kn(o, O, C, () => {
    }, ce), tt(o), Ae(!1), q == null || q(o);
  }, un = (o) => {
    g != null && g.element && oo(g.element, o, C, () => B(null)), q == null || q(o);
  }, fn = (o) => {
    g != null && g.element && St(g.element, o, C, () => B(null)), q == null || q(o);
  }, hn = (o) => {
    Qn(o, O, C, () => {
    }, ce);
  }, mn = (o) => {
    no(o, O, C, () => {
    }, ce);
    const a = document.querySelector(".rsw-editor .rsw-ce"), d = window.getSelection();
    if (o) {
      const h = parseInt(o, 10);
      Number.isNaN(h) || De(h);
    } else d != null && d.anchorNode && a && De(Et(d.anchorNode, a));
  }, pn = (o) => {
    if (ce) {
      const a = window.getSelection();
      a == null || a.removeAllRanges(), a == null || a.addRange(ce);
    }
    Gn(o, O);
  }, bt = () => {
    try {
      const o = jo($);
      k(o), K(o), C(o), n == null || n(o), de.success("CSS inlined successfully!");
    } catch {
      de.error("Failed to inline CSS.");
    }
  }, vt = () => {
    if (!Re) {
      const o = document.querySelector(".rsw-editor .rsw-ce");
      if (o) {
        const a = window.getSelection();
        if (a && a.rangeCount > 0) {
          const d = a.getRangeAt(0);
          o.contains(d.commonAncestorContainer) && (be.current = d.cloneRange());
        }
      }
    }
    Z ? Z() : Ze(!0);
  }, wt = (o) => {
    if (Re) {
      fo(Re, o, C, () => xe(null));
      return;
    }
    ho(o, C, be);
  }, gn = () => {
    const o = window.getSelection();
    o && o.rangeCount > 0 && (be.current = o.getRangeAt(0).cloneRange()), ye(!0);
  }, yn = (o) => {
    const { buttonText: a, buttonUrl: d } = o;
    if (!(!a || !d)) {
      if (!Ce(d)) {
        de.error("That URL scheme is not allowed.");
        return;
      }
      j ? (j.textContent = a, j.href = d, j.style.outline = "", W(C), Te(null)) : po(a, d, C, be, O), ye(!1);
    }
  };
  In(pe, () => ({
    insert: (o) => {
      go(o, C);
    },
    inlineCss: () => bt(),
    insertImage: (o) => wt(o),
    clearImageToReplace: () => xe(null)
  }));
  const xn = Fo(
    () => {
      S != null && S.element && (xe(S.element), vt());
    },
    () => (S == null ? void 0 : S.element) && Yn(S.element, C, () => oe(null)),
    (o) => (S == null ? void 0 : S.element) && Zn(S.element, o, C, () => oe(null)),
    (o) => (S == null ? void 0 : S.element) && Jn(S.element, o, C, () => oe(null))
  ), bn = () => {
    g != null && g.element && (Te(g.element), B(null), ye(!0));
  }, vn = (() => {
    const o = g == null ? void 0 : g.element, a = Ho(
      () => (g == null ? void 0 : g.element) && so(g.element, C, () => B(null)),
      () => (g == null ? void 0 : g.element) && ao(g.element, C, () => B(null)),
      () => (g == null ? void 0 : g.element) && co(g.element, C, () => B(null)),
      () => (g == null ? void 0 : g.element) && uo(g.element, C, () => B(null)),
      un,
      fn,
      (d) => (g == null ? void 0 : g.element) && ro(g.element, d, C, () => B(null)),
      (d) => (g == null ? void 0 : g.element) && io(g.element, d, C, () => B(null)),
      (d) => (g == null ? void 0 : g.element) && lo(g.element, d, C, () => B(null)),
      {
        background: o ? ze(o.style.backgroundColor || "#3b82f6") : "#3b82f6",
        text: o ? ze(o.style.color || "#ffffff") : "#ffffff"
      },
      te
    );
    return {
      ...a,
      items: [
        { key: "edit-button", label: /* @__PURE__ */ f("span", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ f("svg", { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline", flexShrink: 0 }, children: [
            /* @__PURE__ */ e("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
            /* @__PURE__ */ e("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
          ] }),
          "Edit Button"
        ] }), onClick: bn },
        { type: "divider" },
        ...a.items ?? []
      ]
    };
  })(), wn = Po(
    () => {
      I != null && I.element && (Ie(I.element), ne(null), Se(!0));
    },
    () => {
      I != null && I.element && (I.element.style.outline = "", I.element.replaceWith(...Array.from(I.element.childNodes)), W(C), ne(null));
    },
    (o) => (I == null ? void 0 : I.element) && St(I.element, o, C, () => ne(null))
  );
  Bo(xt);
  const kn = Wo(hn), Cn = zo(mn), Nn = Uo(pn), kt = typeof p == "number" ? `${p}px` : p;
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
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Yo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Redo", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("redo");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Jo, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: ["h1", "h2", "h3"].map((o, a) => {
              const d = [rr, lr, ir][a], h = ln === o;
              return /* @__PURE__ */ e(E, { title: h ? "Remove heading" : `Heading ${a + 1}`, children: /* @__PURE__ */ e(
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
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Zo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Italic (Ctrl+I)", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("italic");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Ko, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Underline (Ctrl+U)", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("underline");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(Qo, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Strikethrough", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("strikeThrough");
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(er, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Numbered List", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("insertOrderedList"), setTimeout(() => W(C), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(tr, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Bullet List", children: /* @__PURE__ */ e("button", { onMouseDown: (o) => {
                o.preventDefault(), document.execCommand("insertUnorderedList"), setTimeout(() => W(C), 0);
              }, className: "toolbar-btn", children: /* @__PURE__ */ e(nr, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Insert Link", children: /* @__PURE__ */ e(
                "button",
                {
                  onMouseDown: (o) => {
                    o.preventDefault();
                    const a = window.getSelection();
                    a && a.rangeCount > 0 && Me(a.getRangeAt(0).cloneRange()), Ee(!0);
                  },
                  className: "toolbar-btn",
                  children: /* @__PURE__ */ e(or, {})
                }
              ) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Align Left", children: /* @__PURE__ */ e("button", { onClick: () => ke("left", O), className: "toolbar-btn", children: /* @__PURE__ */ e(sr, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Align Center", children: /* @__PURE__ */ e("button", { onClick: () => ke("center", O), className: "toolbar-btn", children: /* @__PURE__ */ e(ar, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Align Right", children: /* @__PURE__ */ e("button", { onClick: () => ke("right", O), className: "toolbar-btn", children: /* @__PURE__ */ e(cr, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Justify", children: /* @__PURE__ */ e("button", { onClick: () => ke("justify", O), className: "toolbar-btn", children: /* @__PURE__ */ e(dr, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(E, { title: "Line spacing", children: /* @__PURE__ */ e(re, { menu: Nn, trigger: ["click"], onOpenChange: (o) => {
              o && ve();
            }, children: /* @__PURE__ */ f("button", { type: "button", className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              /* @__PURE__ */ e(ur, {}),
              /* @__PURE__ */ e($e, {})
            ] }) }) }) }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(E, { title: "Insert Image", children: /* @__PURE__ */ e("button", { onClick: vt, className: "toolbar-btn", children: /* @__PURE__ */ e(mr, {}) }) }),
              /* @__PURE__ */ e(E, { title: "Insert Button", children: /* @__PURE__ */ e("button", { onClick: gn, className: "toolbar-btn", children: /* @__PURE__ */ e(pr, {}) }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "w-px h-5 bg-gray-200 mx-1.5 flex-shrink-0" }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(E, { title: "Text Color", children: /* @__PURE__ */ e(
              Pt,
              {
                value: nt,
                open: nn,
                onOpenChange: (o) => {
                  Ae(o), o && (ve(), ot(et));
                },
                onChange: (o) => ot(o.toHexString()),
                presets: te && te.length > 0 ? [{ label: "Recent", colors: te }] : void 0,
                panelRender: (o) => /* @__PURE__ */ f("div", { children: [
                  o,
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "border text-xs px-2 py-1 mt-1 rounded hover:bg-gray-50",
                      onClick: () => {
                        xt(nt), Ae(!1);
                      },
                      children: "Apply"
                    }
                  )
                ] }),
                children: /* @__PURE__ */ e("button", { type: "button", className: "toolbar-btn", children: /* @__PURE__ */ e("div", { style: { width: 18, height: 18, backgroundColor: et, borderRadius: 2, border: "1px solid #e5e7eb" } }) })
              }
            ) }) }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(E, { title: "Font Family", children: /* @__PURE__ */ e(re, { menu: kn, trigger: ["click"], onOpenChange: (o) => {
              o && ve();
            }, children: /* @__PURE__ */ f("button", { className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              /* @__PURE__ */ e(fr, {}),
              " ",
              /* @__PURE__ */ e($e, {})
            ] }) }) }) }),
            /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ e(E, { title: "Font Size", children: /* @__PURE__ */ e(re, { menu: Cn, trigger: ["click"], onOpenChange: (o) => {
              o && ve();
            }, children: /* @__PURE__ */ f("button", { type: "button", className: "toolbar-btn px-2 text-xs font-medium flex items-center gap-0.5", children: [
              /* @__PURE__ */ e(hr, { size: on }),
              " ",
              /* @__PURE__ */ e($e, {})
            ] }) }) }) })
          ] }),
          !ae && _ && dn && /* @__PURE__ */ e(E, { title: "Inline all <style> tags into element attributes for email clients", children: /* @__PURE__ */ f(
            "button",
            {
              onClick: bt,
              className: "flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-white animate-pulse flex-shrink-0",
              children: [
                /* @__PURE__ */ e(gr, {}),
                " Inline CSS"
              ]
            }
          ) }),
          !ae && /* @__PURE__ */ f("div", { className: "ml-auto flex items-center gap-1 flex-shrink-0", children: [
            m && /* @__PURE__ */ e(E, { title: "Toggle HTML source editor", children: /* @__PURE__ */ f(
              "button",
              {
                onClick: () => {
                  Ye((o) => !o), Je(!1);
                },
                className: `flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${_ ? "bg-gray-800 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`,
                children: [
                  /* @__PURE__ */ e(yr, {}),
                  _ ? "Editor" : "HTML"
                ]
              }
            ) }),
            u && /* @__PURE__ */ e(E, { title: "Toggle phone preview", children: /* @__PURE__ */ f(
              "button",
              {
                onClick: () => {
                  Je((o) => !o), Ye(!1);
                },
                className: `flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors whitespace-nowrap ${P ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`,
                children: [
                  /* @__PURE__ */ e(xr, {}),
                  P ? "Close" : "Preview"
                ]
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex flex-1 min-h-0", style: { height: kt }, children: /* @__PURE__ */ e(
      "div",
      {
        className: "flex-1 relative overflow-hidden min-h-0",
        style: _ || P ? { minHeight: 300 } : void 0,
        children: P ? /* @__PURE__ */ e("div", { className: "h-full overflow-y-auto flex items-start justify-center p-4 bg-gray-100", children: /* @__PURE__ */ e(Co, { srcDoc: Be ? Ut : U }) }) : _ ? /* @__PURE__ */ e(
          ko,
          {
            height: kt,
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
        ) : /* @__PURE__ */ f("div", { className: "relative h-full", ref: mt, children: [
          /* @__PURE__ */ e(
            bo,
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
          S && /* @__PURE__ */ e("div", { style: { position: "absolute", top: dt.top - 100, left: dt.left - 100, zIndex: 1e3, width: 150 }, children: /* @__PURE__ */ e(re, { menu: xn, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || oe(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          g && /* @__PURE__ */ e("div", { style: { position: "absolute", top: ut.top, left: ut.left, zIndex: 1e3, width: 260 }, children: /* @__PURE__ */ e(re, { menu: vn, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || B(null);
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          g && /* @__PURE__ */ e(
            "div",
            {
              style: {
                position: "absolute",
                top: ft.top,
                left: ft.left,
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
          I && /* @__PURE__ */ e("div", { style: { position: "absolute", top: Qe.top, left: Qe.left, zIndex: 1e3, width: 200 }, children: /* @__PURE__ */ e(re, { menu: wn, trigger: ["click"], open: !0, onOpenChange: (o) => {
            o || (I.element.style.outline = "none", ne(null));
          }, children: /* @__PURE__ */ e("span", {}) }) }),
          rn.map((o, a) => /* @__PURE__ */ e(
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
            a
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
          !_ && !P && /* @__PURE__ */ e(E, { title: `${gt.toLocaleString()} characters`, children: /* @__PURE__ */ f("span", { className: "text-xs tabular-nums cursor-default", style: { color: "#cbd5e1" }, children: [
            pt.toLocaleString(),
            " ",
            pt === 1 ? "word" : "words",
            " · ",
            gt.toLocaleString(),
            " chars"
          ] }) })
        ]
      }
    ),
    !Z && /* @__PURE__ */ e(
      No,
      {
        show: Jt,
        onClose: () => {
          Ze(!1), xe(null);
        },
        onSelectImage: wt,
        onFetchImages: s,
        onUploadImage: i,
        onDeleteImage: c
      }
    ),
    /* @__PURE__ */ e(
      qe,
      {
        show: Zt,
        title: j ? "Edit Button" : "Insert Button",
        fields: [
          { name: "buttonText", label: "Button Text", placeholder: "Click Here", defaultValue: (j == null ? void 0 : j.textContent) ?? "" },
          { name: "buttonUrl", label: "Button URL", placeholder: "https://", defaultValue: (j == null ? void 0 : j.getAttribute("href")) ?? "" }
        ],
        onConfirm: yn,
        onClose: () => {
          ye(!1), Te(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      qe,
      {
        show: Qt,
        title: "Edit Link",
        fields: [
          { name: "linkText", label: "Link Text", placeholder: "Click here", defaultValue: (V == null ? void 0 : V.textContent) ?? "", required: !0 },
          { name: "url", label: "URL", placeholder: "https://", defaultValue: (V == null ? void 0 : V.getAttribute("href")) ?? "", required: !0 }
        ],
        onConfirm: ({ linkText: o, url: a }) => {
          if (!Ce(a)) {
            de.error("That URL scheme is not allowed.");
            return;
          }
          V && (V.textContent = o, V.href = a, V.style.outline = "", W(C), Ie(null)), Se(!1);
        },
        onClose: () => {
          Se(!1), Ie(null);
        }
      }
    ),
    /* @__PURE__ */ e(
      qe,
      {
        show: Kt,
        title: "Insert Link",
        fields: [
          { name: "url", label: "URL", placeholder: "https://", required: !0 },
          { name: "linkText", label: "Link Text", placeholder: "Displayed text (optional)", required: !1 }
        ],
        onConfirm: ({ url: o, linkText: a }) => {
          var w, N;
          if (o && !Ce(o)) {
            de.error("That URL scheme is not allowed.");
            return;
          }
          Ee(!1);
          const d = document.querySelector(".rsw-editor .rsw-ce");
          if (!d || !o) return;
          d.focus();
          const h = window.getSelection();
          Ke && (h == null || h.removeAllRanges(), h == null || h.addRange(Ke)), document.execCommand("createLink", !1, o);
          const y = window.getSelection(), v = (N = (w = y == null ? void 0 : y.anchorNode) == null ? void 0 : w.parentElement) == null ? void 0 : N.closest("a");
          v && (v.style.color = "#0ea5e9", a && (v.textContent = a)), Me(null), setTimeout(() => W(C), 0);
        },
        onClose: () => {
          Ee(!1), Me(null);
        }
      }
    ),
    X && typeof document < "u" && Tn(
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
            maxHeight: Dt
          },
          onMouseDown: (o) => o.preventDefault(),
          children: /* @__PURE__ */ e(
            "div",
            {
              className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-1",
              style: {
                maxHeight: Dt,
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch"
              },
              children: X.items.length === 0 ? /* @__PURE__ */ e("div", { className: "px-3 py-2 text-xs text-gray-500", children: "No matching attributes" }) : X.items.map((o, a) => /* @__PURE__ */ f(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": a === X.highlightIndex,
                  className: `flex w-full flex-col items-start px-3 py-2 text-left text-xs ${a === X.highlightIndex ? "bg-indigo-50 text-indigo-900" : "text-gray-800 hover:bg-gray-50"}`,
                  onMouseDown: (d) => {
                    d.preventDefault(), Fe(o.value), F(null);
                  },
                  onMouseEnter: () => F((d) => d && { ...d, highlightIndex: a }),
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
}, Pr = Sn(
  br
);
function Or() {
  const [t, n] = x(!0);
  return T(() => {
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
  Pr as CDPEditor,
  Dr as COMMON_CURRENCY_CODES,
  No as ImagePickerModal,
  qe as InputModal,
  ko as MonacoEditorWrapper,
  Co as PhonePreview,
  Pn as VALID_CURRENCY_CODES,
  bo as WysiwygEditor,
  Gn as applyLineHeightToSelection,
  Qn as changeFontFamily,
  no as changeFontSize,
  Kn as changeHighlightColor,
  Pr as default,
  jo as handleInlineCSS,
  po as insertButtonAtCursorInEditor,
  ho as insertImageAtCursorInEditor,
  go as insertTextIntoEditorAtSelection,
  On as isValidCurrencyCode,
  Q as liquidEngine,
  Xo as needsInliningDetailed,
  ze as normalizeColor,
  Xn as replaceBodyContent,
  yo as replaceEditorRangeWithText,
  Or as useOnlineStatus,
  Br as validateCurrencyCodes,
  Fr as validateLiquidTemplate,
  Hr as wrapEmailBodyHtml
};
//# sourceMappingURL=email-editor.es.js.map
