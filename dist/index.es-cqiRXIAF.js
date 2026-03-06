import n from "react";
var i = function() {
  return i = Object.assign || function(e) {
    for (var r, o = 1, a = arguments.length; o < a; o++) {
      r = arguments[o];
      for (var l in r) Object.prototype.hasOwnProperty.call(r, l) && (e[l] = r[l]);
    }
    return e;
  }, i.apply(this, arguments);
};
function C(t, e) {
  var r = {};
  for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && e.indexOf(o) < 0 && (r[o] = t[o]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, o = Object.getOwnPropertySymbols(t); a < o.length; a++)
      e.indexOf(o[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, o[a]) && (r[o[a]] = t[o[a]]);
  return r;
}
function H(t) {
  if (t) {
    var e = t.textContent, r = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    t.style.direction = e && r.test(e[0]) ? "rtl" : "ltr";
  }
}
function F() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  return t.filter(Boolean).join(" ");
}
function T() {
  if (document.selection)
    return document.selection.createRange().parentElement();
  var t = window.getSelection();
  if (t && t.rangeCount > 0)
    return t.getRangeAt(0).startContainer.parentNode || void 0;
}
function M(t) {
  return typeof t == "string" ? t.replace(/&nbsp;|\u202F|\u00A0/g, " ").replace(/<br \/>/g, "<br>") : String(t);
}
function O(t) {
  var e = document.createTextNode("");
  t.appendChild(e);
  var r = document.activeElement === t;
  if (e !== null && e.nodeValue !== null && r) {
    var o = window.getSelection();
    if (o !== null) {
      var a = document.createRange();
      a.setStart(e, e.nodeValue.length), a.collapse(!0), o.removeAllRanges(), o.addRange(a);
    }
    t instanceof HTMLElement && t.focus();
  }
}
function L(t, e) {
  typeof e == "function" ? e(t) : typeof e == "object" && e && (e.current = t);
}
var z = n.memo(n.forwardRef(function(e, r) {
  var o = e.className, a = e.disabled, l = e.tagName, c = e.value, d = c === void 0 ? "" : c, u = e.placeholder, m = C(e, ["className", "disabled", "tagName", "value", "placeholder"]), s = n.useRef(null), p = n.useRef(d), h = n.useRef(m);
  return n.useEffect(function() {
    h.current = m;
    var f = s.current;
    f && M(p.current) !== M(d) && (p.current = d, f.innerHTML = d, O(f));
  }), n.useMemo(function() {
    function f(v) {
      s.current = v, H(v), L(v, r);
    }
    function g(v) {
      var k, S, B = s.current;
      if (B) {
        var N = B.innerHTML;
        N !== p.current && ((S = (k = h.current).onChange) === null || S === void 0 || S.call(k, i(i({}, v), { target: {
          value: N,
          name: m.name
        } }))), H(B), p.current = N;
      }
    }
    var b = F("rsw-ce", o);
    return n.createElement(l || "div", i(i({}, m), { className: b, contentEditable: !a, dangerouslySetInnerHTML: { __html: d }, onBlur: function(v) {
      return (h.current.onBlur || g)(v);
    }, onInput: g, onKeyDown: function(v) {
      return (h.current.onKeyDown || g)(v);
    }, onKeyUp: function(v) {
      return (h.current.onKeyUp || g)(v);
    }, placeholder: u, ref: f }));
  }, [o, a, u, l]);
})), D = n.createContext(void 0);
function I(t) {
  var e = t.children, r = n.useState({
    htmlMode: !1,
    update: l
  }), o = r[0], a = r[1];
  function l(c) {
    a(function(d) {
      return i(i({}, d), c);
    });
  }
  return n.createElement(D.Provider, { value: o }, e);
}
function y() {
  var t = n.useContext(D);
  if (!t)
    throw new Error("You should wrap your component by EditorProvider");
  return t;
}
var R = [], w = [];
function A(t, e) {
  if (t && typeof document < "u") {
    var r, o = e.prepend === !0 ? "prepend" : "append", a = e.singleTag === !0, l = typeof e.container == "string" ? document.querySelector(e.container) : document.getElementsByTagName("head")[0];
    if (a) {
      var c = R.indexOf(l);
      c === -1 && (c = R.push(l) - 1, w[c] = {}), r = w[c] && w[c][o] ? w[c][o] : w[c][o] = d();
    } else r = d();
    t.charCodeAt(0) === 65279 && (t = t.substring(1)), r.styleSheet ? r.styleSheet.cssText += t : r.appendChild(document.createTextNode(t));
  }
  function d() {
    var u = document.createElement("style");
    if (u.setAttribute("type", "text/css"), e.attributes) for (var m = Object.keys(e.attributes), s = 0; s < m.length; s++) u.setAttribute(m[s], e.attributes[m[s]]);
    var p = o === "prepend" ? "afterbegin" : "beforeend";
    return l.insertAdjacentElement(p, u), u;
  }
}
var P = ".rsw-editor{border:1px solid #ddd;border-radius:.375rem;display:flex;flex-direction:column;min-height:100px;overflow:hidden}.rsw-ce{flex:1 1 auto;overflow:auto;padding:.5rem}.rsw-ce:focus{outline:1px solid #668}.rsw-ce[contentEditable=true]:empty:not(:focus):before{color:grey;content:attr(placeholder);pointer-events:none}.rsw-html{background:transparent;border:none;font-family:monospace,Courier New}.rsw-separator{align-self:stretch;border-right:1px solid #ddd;display:flex;margin:0 3px}.rsw-dd{box-sizing:border-box;outline:none}.rsw-btn{background:transparent;border:0;color:#222;cursor:pointer;font-size:1em;height:2em;outline:none;padding:0;width:2em}.rsw-btn:hover{background:#eaeaea}.rsw-btn[data-active=true]{background:#e0e0e0}.rsw-toolbar{align-items:center;background-color:#f5f5f5;border-bottom:1px solid #ddd;display:flex}";
A(P, {});
var j = n.forwardRef(function(e, r) {
  var o = e.autoFocus, a = e.children, l = e.containerProps, c = e.onSelect, d = C(e, ["autoFocus", "children", "containerProps", "onSelect"]), u = y();
  n.useEffect(function() {
    return document.addEventListener("click", m), function() {
      return document.removeEventListener("click", m);
    };
  });
  function m(f) {
    var g;
    f.target !== u.$el && (!((g = u.$el) === null || g === void 0) && g.contains(f.target) || u.update({ $selection: void 0 }));
  }
  function s(f) {
    c == null || c(f), u.update({ $selection: T() });
  }
  function p(f) {
    u.update({ $el: f }), L(f, r), o && f && u.$el === void 0 && f.focus();
  }
  var h = F("rsw-editor", l == null ? void 0 : l.className);
  return u.htmlMode ? n.createElement(
    "div",
    i({}, l, { className: h }),
    a,
    n.createElement("textarea", i({}, d, { className: "rsw-ce rsw-html" }))
  ) : n.createElement(
    "div",
    i({}, l, { className: h }),
    a,
    n.createElement(z, i({}, d, { ref: p, onSelect: s }))
  );
});
function U() {
  return n.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", style: { verticalAlign: "text-top" } },
    n.createElement("path", { fill: "currentColor", d: "M6.99938 12.998v-2H20.9994v2H6.99938zm0 6.0001v-2H20.9994v2H6.99938zm0-12.00001v-2H20.9994v2H6.99938zm-4 1v-3h-1v-1h2v4h-1zm-1 9.00001v-1h3v4h-3v-1h2v-.5h-1v-1h1v-.5h-2zM4.25 10c.41421 0 .75.3358.75.75 0 .2024-.08017.3861-.2105.521L3.11983 13H5v1H2v-.9218L4 11H2v-1h2.25z" })
  );
}
function $() {
  return n.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", style: { verticalAlign: "text-top" } },
    n.createElement("path", { fill: "currentColor", d: "M7 5h14v2H7V5zm0 8v-2h14v2H7zM4 4.50001c.83 0 1.5.66992 1.5 1.5 0 .83007-.67 1.5-1.5 1.5s-1.5-.66993-1.5-1.5c0-.83008.67-1.5 1.5-1.5zM4 10.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM7 19v-2h14v2H7zm-3-2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" })
  );
}
var V = E("Bold", "𝐁", "bold"), K = E("Bullet list", n.createElement($, null), "insertUnorderedList"), q = E("Clear formatting", "T̲ₓ", "removeFormat"), _ = E("Italic", "𝑰", "italic"), Y = E("Strike through", n.createElement("s", null, "ab"), "strikeThrough"), G = E("Link", "🔗", function(t) {
  var e = t.$selection;
  (e == null ? void 0 : e.nodeName) === "A" ? document.execCommand("unlink") : document.execCommand("createLink", !1, prompt("URL", "") || void 0);
}), J = E("Numbered list", n.createElement(U, null), "insertOrderedList"), Q = E("Redo", "↷", "redo"), W = E("Underline", n.createElement("span", { style: { textDecoration: "underline" } }, "𝐔"), "underline"), X = E("Undo", "↶", "undo");
function E(t, e, r) {
  return o.displayName = t.replace(/\s/g, ""), o;
  function o(a) {
    var l = y(), c = l.$el, d = function() {
      return !!(c != null && c.contains(document.activeElement));
    }, u = !1;
    typeof r == "string" && (u = d() && document.queryCommandState(r));
    function m(s) {
      s.preventDefault(), d() || c == null || c.focus(), typeof r == "function" ? r(l) : document.execCommand(r);
    }
    return l.htmlMode ? null : n.createElement("button", i({ className: "rsw-btn", "data-active": u, onMouseDown: m, tabIndex: -1, title: t, type: "button" }, a), e);
  }
}
var Z = ee("Styles", [
  ["Normal", "formatBlock", "DIV"],
  ["𝗛𝗲𝗮𝗱𝗲𝗿 𝟭", "formatBlock", "H1"],
  ["Header 2", "formatBlock", "H2"],
  ["𝙲𝚘𝚍𝚎", "formatBlock", "PRE"]
]);
function ee(t, e) {
  return r.displayName = t, r;
  function r(o) {
    var a = y(), l = a.$el, c = a.$selection, d = a.htmlMode;
    if (d)
      return null;
    var u = e.findIndex(function(s) {
      return s[1] === "formatBlock" && (c == null ? void 0 : c.nodeName) === s[2];
    });
    return n.createElement(te, i({}, o, { items: e, onChange: m, selected: u, tabIndex: -1, title: t }));
    function m(s) {
      var p = s.target, h = p.value, f = parseInt(h, 10), g = e[f] || [], b = g[1], v = g[2];
      s.preventDefault(), document.activeElement !== l && (l == null || l.focus()), typeof b == "function" ? b(a) : b && document.execCommand(b, !1, v), setTimeout(function() {
        return p.value = h;
      }, 10);
    }
  }
}
function te(t) {
  var e = t.items, r = t.selected, o = C(t, ["items", "selected"]);
  return n.createElement(
    "select",
    i({ className: "rsw-dd" }, o, { value: r }),
    n.createElement("option", { hidden: !0 }, o.title),
    e.map(function(a, l) {
      return n.createElement("option", { key: a[2], value: l }, a[0]);
    })
  );
}
function ne(t) {
  var e = C(t, []), r = y();
  function o() {
    r.update({
      htmlMode: !r.htmlMode
    });
  }
  return n.createElement("button", i({ className: "rsw-btn", "data-active": r.htmlMode, onClick: o, tabIndex: -1, title: "HTML mode", type: "button" }, e), "</>");
}
function x(t) {
  var e = y();
  return e.htmlMode ? null : n.createElement("div", i({ className: "rsw-separator" }, t));
}
function re(t) {
  return n.createElement("div", i({ className: "rsw-toolbar" }, t));
}
var ae = n.forwardRef(function(e, r) {
  return n.createElement(
    I,
    null,
    n.createElement(j, i({}, e, { ref: r }), e.children || n.createElement(
      re,
      null,
      n.createElement(X, null),
      n.createElement(Q, null),
      n.createElement(x, null),
      n.createElement(V, null),
      n.createElement(_, null),
      n.createElement(W, null),
      n.createElement(Y, null),
      n.createElement(x, null),
      n.createElement(J, null),
      n.createElement(K, null),
      n.createElement(x, null),
      n.createElement(G, null),
      n.createElement(q, null),
      n.createElement(ne, null),
      n.createElement(x, null),
      n.createElement(Z, null)
    ))
  );
});
export {
  V as BtnBold,
  K as BtnBulletList,
  q as BtnClearFormatting,
  _ as BtnItalic,
  G as BtnLink,
  J as BtnNumberedList,
  Q as BtnRedo,
  Y as BtnStrikeThrough,
  Z as BtnStyles,
  W as BtnUnderline,
  X as BtnUndo,
  z as ContentEditable,
  ae as DefaultEditor,
  te as Dropdown,
  j as Editor,
  D as EditorContext,
  I as EditorProvider,
  ne as HtmlButton,
  x as Separator,
  re as Toolbar,
  E as createButton,
  ee as createDropdown,
  ae as default,
  y as useEditorState
};
//# sourceMappingURL=index.es-cqiRXIAF.js.map
