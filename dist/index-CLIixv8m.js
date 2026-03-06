import D, { memo as ue, useState as F, useRef as m, useCallback as ae, useEffect as P } from "react";
function le(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function je(e) {
  if (Array.isArray(e)) return e;
}
function Me(e, t, r) {
  return (t = Ae(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function Pe(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, o, i, l, d = [], p = !0, h = !1;
    try {
      if (i = (r = r.call(e)).next, t !== 0) for (; !(p = (n = i.call(r)).done) && (d.push(n.value), d.length !== t); p = !0) ;
    } catch (S) {
      h = !0, o = S;
    } finally {
      try {
        if (!p && r.return != null && (l = r.return(), Object(l) !== l)) return;
      } finally {
        if (h) throw o;
      }
    }
    return d;
  }
}
function Se() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function se(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? se(Object(r), !0).forEach(function(n) {
      Me(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : se(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ee(e, t) {
  if (e == null) return {};
  var r, n, o = Ie(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function Ie(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Le(e, t) {
  return je(e) || Pe(e, t) || Te(e, t) || Se();
}
function Ce(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ae(e) {
  var t = Ce(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Te(e, t) {
  if (e) {
    if (typeof e == "string") return le(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? le(e, t) : void 0;
  }
}
function $e(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function de(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? de(Object(r), !0).forEach(function(n) {
      $e(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : de(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function De() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(n) {
    return t.reduceRight(function(o, i) {
      return i(o);
    }, n);
  };
}
function z(e) {
  return function t() {
    for (var r = this, n = arguments.length, o = new Array(n), i = 0; i < n; i++)
      o[i] = arguments[i];
    return o.length >= e.length ? e.apply(this, o) : function() {
      for (var l = arguments.length, d = new Array(l), p = 0; p < l; p++)
        d[p] = arguments[p];
      return t.apply(r, [].concat(o, d));
    };
  };
}
function Y(e) {
  return {}.toString.call(e).includes("Object");
}
function Ve(e) {
  return !Object.keys(e).length;
}
function H(e) {
  return typeof e == "function";
}
function xe(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Re(e, t) {
  return Y(t) || I("changeType"), Object.keys(t).some(function(r) {
    return !xe(e, r);
  }) && I("changeField"), t;
}
function Ne(e) {
  H(e) || I("selectorType");
}
function qe(e) {
  H(e) || Y(e) || I("handlerType"), Y(e) && Object.values(e).some(function(t) {
    return !H(t);
  }) && I("handlersType");
}
function ze(e) {
  e || I("initialIsRequired"), Y(e) || I("initialType"), Ve(e) && I("initialContent");
}
function Ue(e, t) {
  throw new Error(e[t] || e.default);
}
var Fe = {
  initialIsRequired: "initial state is required",
  initialType: "initial state should be an object",
  initialContent: "initial state shouldn't be an empty object",
  handlerType: "handler should be an object or a function",
  handlersType: "all handlers should be a functions",
  selectorType: "selector should be a function",
  changeType: "provided value of changes should be an object",
  changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state',
  default: "an unknown error accured in `state-local` package"
}, I = z(Ue)(Fe), K = {
  changes: Re,
  selector: Ne,
  handler: qe,
  initial: ze
};
function He(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  K.initial(e), K.handler(t);
  var r = {
    current: e
  }, n = z(Be)(r, t), o = z(We)(r), i = z(K.changes)(e), l = z(_e)(r);
  function d() {
    var h = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(S) {
      return S;
    };
    return K.selector(h), h(r.current);
  }
  function p(h) {
    De(n, o, i, l)(h);
  }
  return [d, p];
}
function _e(e, t) {
  return H(t) ? t(e.current) : t;
}
function We(e, t) {
  return e.current = pe(pe({}, e.current), t), t;
}
function Be(e, t, r) {
  return H(t) ? t(e.current) : Object.keys(r).forEach(function(n) {
    var o;
    return (o = t[n]) === null || o === void 0 ? void 0 : o.call(t, e.current[n]);
  }), r;
}
var Ke = {
  create: He
}, Ge = {
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs"
  }
};
function Ye(e) {
  return function t() {
    for (var r = this, n = arguments.length, o = new Array(n), i = 0; i < n; i++)
      o[i] = arguments[i];
    return o.length >= e.length ? e.apply(this, o) : function() {
      for (var l = arguments.length, d = new Array(l), p = 0; p < l; p++)
        d[p] = arguments[p];
      return t.apply(r, [].concat(o, d));
    };
  };
}
function Je(e) {
  return {}.toString.call(e).includes("Object");
}
function Qe(e) {
  return e || ge("configIsRequired"), Je(e) || ge("configType"), e.urls ? (Xe(), {
    paths: {
      vs: e.urls.monacoBase
    }
  }) : e;
}
function Xe() {
  console.warn(he.deprecation);
}
function Ze(e, t) {
  throw new Error(e[t] || e.default);
}
var he = {
  configIsRequired: "the configuration object is required",
  configType: "the configuration object should be an object",
  default: "an unknown error accured in `@monaco-editor/loader` package",
  deprecation: `Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `
}, ge = Ye(Ze)(he), ke = {
  config: Qe
}, et = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  return function(o) {
    return r.reduceRight(function(i, l) {
      return l(i);
    }, o);
  };
};
function ve(e, t) {
  return Object.keys(t).forEach(function(r) {
    t[r] instanceof Object && e[r] && Object.assign(t[r], ve(e[r], t[r]));
  }), fe(fe({}, e), t);
}
var tt = {
  type: "cancelation",
  msg: "operation is manually canceled"
};
function ne(e) {
  var t = !1, r = new Promise(function(n, o) {
    e.then(function(i) {
      return t ? o(tt) : n(i);
    }), e.catch(o);
  });
  return r.cancel = function() {
    return t = !0;
  }, r;
}
var rt = ["monaco"], nt = Ke.create({
  config: Ge,
  isInitialized: !1,
  resolve: null,
  reject: null,
  monaco: null
}), me = Le(nt, 2), _ = me[0], Q = me[1];
function ot(e) {
  var t = ke.config(e), r = t.monaco, n = Ee(t, rt);
  Q(function(o) {
    return {
      config: ve(o.config, n),
      monaco: r
    };
  });
}
function it() {
  var e = _(function(t) {
    var r = t.monaco, n = t.isInitialized, o = t.resolve;
    return {
      monaco: r,
      isInitialized: n,
      resolve: o
    };
  });
  if (!e.isInitialized) {
    if (Q({
      isInitialized: !0
    }), e.monaco)
      return e.resolve(e.monaco), ne(oe);
    if (window.monaco && window.monaco.editor)
      return be(window.monaco), e.resolve(window.monaco), ne(oe);
    et(at, ct)(lt);
  }
  return ne(oe);
}
function at(e) {
  return document.body.appendChild(e);
}
function ut(e) {
  var t = document.createElement("script");
  return e && (t.src = e), t;
}
function ct(e) {
  var t = _(function(n) {
    var o = n.config, i = n.reject;
    return {
      config: o,
      reject: i
    };
  }), r = ut("".concat(t.config.paths.vs, "/loader.js"));
  return r.onload = function() {
    return e();
  }, r.onerror = t.reject, r;
}
function lt() {
  var e = _(function(r) {
    var n = r.config, o = r.resolve, i = r.reject;
    return {
      config: n,
      resolve: o,
      reject: i
    };
  }), t = window.require;
  t.config(e.config), t(["vs/editor/editor.main"], function(r) {
    var n = r.m || r;
    be(n), e.resolve(n);
  }, function(r) {
    e.reject(r);
  });
}
function be(e) {
  _().monaco || Q({
    monaco: e
  });
}
function st() {
  return _(function(e) {
    var t = e.monaco;
    return t;
  });
}
var oe = new Promise(function(e, t) {
  return Q({
    resolve: e,
    reject: t
  });
}), J = {
  config: ot,
  init: it,
  __getMonacoInstance: st
}, ft = { wrapper: { display: "flex", position: "relative", textAlign: "initial" }, fullWidth: { width: "100%" }, hide: { display: "none" } }, ie = ft, dt = { container: { display: "flex", height: "100%", width: "100%", justifyContent: "center", alignItems: "center" } }, pt = dt;
function gt({ children: e }) {
  return D.createElement("div", { style: pt.container }, e);
}
var ht = gt, vt = ht;
function mt({ width: e, height: t, isEditorReady: r, loading: n, _ref: o, className: i, wrapperProps: l }) {
  return D.createElement("section", { style: { ...ie.wrapper, width: e, height: t }, ...l }, !r && D.createElement(vt, null, n), D.createElement("div", { ref: o, style: { ...ie.fullWidth, ...!r && ie.hide }, className: i }));
}
var bt = mt, ye = ue(bt);
function yt(e) {
  P(e, []);
}
var ce = yt;
function wt(e, t, r = !0) {
  let n = m(!0);
  P(n.current || !r ? () => {
    n.current = !1;
  } : e, t);
}
var j = wt;
function U() {
}
function $(e, t, r, n) {
  return Ot(e, n) || jt(e, t, r, n);
}
function Ot(e, t) {
  return e.editor.getModel(we(e, t));
}
function jt(e, t, r, n) {
  return e.editor.createModel(t, r, n ? we(e, n) : void 0);
}
function we(e, t) {
  return e.Uri.parse(t);
}
function Mt({ original: e, modified: t, language: r, originalLanguage: n, modifiedLanguage: o, originalModelPath: i, modifiedModelPath: l, keepCurrentOriginalModel: d = !1, keepCurrentModifiedModel: p = !1, theme: h = "light", loading: S = "Loading...", options: M = {}, height: X = "100%", width: Z = "100%", className: k, wrapperProps: ee = {}, beforeMount: te = U, onMount: re = U }) {
  let [w, V] = F(!1), [L, v] = F(!0), b = m(null), g = m(null), x = m(null), y = m(re), c = m(te), C = m(!1);
  ce(() => {
    let a = J.init();
    return a.then((s) => (g.current = s) && v(!1)).catch((s) => (s == null ? void 0 : s.type) !== "cancelation" && console.error("Monaco initialization: error:", s)), () => b.current ? R() : a.cancel();
  }), j(() => {
    if (b.current && g.current) {
      let a = b.current.getOriginalEditor(), s = $(g.current, e || "", n || r || "text", i || "");
      s !== a.getModel() && a.setModel(s);
    }
  }, [i], w), j(() => {
    if (b.current && g.current) {
      let a = b.current.getModifiedEditor(), s = $(g.current, t || "", o || r || "text", l || "");
      s !== a.getModel() && a.setModel(s);
    }
  }, [l], w), j(() => {
    let a = b.current.getModifiedEditor();
    a.getOption(g.current.editor.EditorOption.readOnly) ? a.setValue(t || "") : t !== a.getValue() && (a.executeEdits("", [{ range: a.getModel().getFullModelRange(), text: t || "", forceMoveMarkers: !0 }]), a.pushUndoStop());
  }, [t], w), j(() => {
    var a, s;
    (s = (a = b.current) == null ? void 0 : a.getModel()) == null || s.original.setValue(e || "");
  }, [e], w), j(() => {
    let { original: a, modified: s } = b.current.getModel();
    g.current.editor.setModelLanguage(a, n || r || "text"), g.current.editor.setModelLanguage(s, o || r || "text");
  }, [r, n, o], w), j(() => {
    var a;
    (a = g.current) == null || a.editor.setTheme(h);
  }, [h], w), j(() => {
    var a;
    (a = b.current) == null || a.updateOptions(M);
  }, [M], w);
  let W = ae(() => {
    var E;
    if (!g.current) return;
    c.current(g.current);
    let a = $(g.current, e || "", n || r || "text", i || ""), s = $(g.current, t || "", o || r || "text", l || "");
    (E = b.current) == null || E.setModel({ original: a, modified: s });
  }, [r, t, o, e, n, i, l]), B = ae(() => {
    var a;
    !C.current && x.current && (b.current = g.current.editor.createDiffEditor(x.current, { automaticLayout: !0, ...M }), W(), (a = g.current) == null || a.editor.setTheme(h), V(!0), C.current = !0);
  }, [M, h, W]);
  P(() => {
    w && y.current(b.current, g.current);
  }, [w]), P(() => {
    !L && !w && B();
  }, [L, w, B]);
  function R() {
    var s, E, A, N;
    let a = (s = b.current) == null ? void 0 : s.getModel();
    d || ((E = a == null ? void 0 : a.original) == null || E.dispose()), p || ((A = a == null ? void 0 : a.modified) == null || A.dispose()), (N = b.current) == null || N.dispose();
  }
  return D.createElement(ye, { width: Z, height: X, isEditorReady: w, loading: S, _ref: x, className: k, wrapperProps: ee });
}
var Pt = Mt, $t = ue(Pt);
function St() {
  let [e, t] = F(J.__getMonacoInstance());
  return ce(() => {
    let r;
    return e || (r = J.init(), r.then((n) => {
      t(n);
    })), () => r == null ? void 0 : r.cancel();
  }), e;
}
var Dt = St;
function Et(e) {
  let t = m();
  return P(() => {
    t.current = e;
  }, [e]), t.current;
}
var It = Et, G = /* @__PURE__ */ new Map();
function Lt({ defaultValue: e, defaultLanguage: t, defaultPath: r, value: n, language: o, path: i, theme: l = "light", line: d, loading: p = "Loading...", options: h = {}, overrideServices: S = {}, saveViewState: M = !0, keepCurrentModel: X = !1, width: Z = "100%", height: k = "100%", className: ee, wrapperProps: te = {}, beforeMount: re = U, onMount: w = U, onChange: V, onValidate: L = U }) {
  let [v, b] = F(!1), [g, x] = F(!0), y = m(null), c = m(null), C = m(null), W = m(w), B = m(re), R = m(), a = m(n), s = It(i), E = m(!1), A = m(!1);
  ce(() => {
    let u = J.init();
    return u.then((f) => (y.current = f) && x(!1)).catch((f) => (f == null ? void 0 : f.type) !== "cancelation" && console.error("Monaco initialization: error:", f)), () => c.current ? Oe() : u.cancel();
  }), j(() => {
    var f, O, q, T;
    let u = $(y.current, e || n || "", t || o || "", i || r || "");
    u !== ((f = c.current) == null ? void 0 : f.getModel()) && (M && G.set(s, (O = c.current) == null ? void 0 : O.saveViewState()), (q = c.current) == null || q.setModel(u), M && ((T = c.current) == null || T.restoreViewState(G.get(i))));
  }, [i], v), j(() => {
    var u;
    (u = c.current) == null || u.updateOptions(h);
  }, [h], v), j(() => {
    !c.current || n === void 0 || (c.current.getOption(y.current.editor.EditorOption.readOnly) ? c.current.setValue(n) : n !== c.current.getValue() && (A.current = !0, c.current.executeEdits("", [{ range: c.current.getModel().getFullModelRange(), text: n, forceMoveMarkers: !0 }]), c.current.pushUndoStop(), A.current = !1));
  }, [n], v), j(() => {
    var f, O;
    let u = (f = c.current) == null ? void 0 : f.getModel();
    u && o && ((O = y.current) == null || O.editor.setModelLanguage(u, o));
  }, [o], v), j(() => {
    var u;
    d !== void 0 && ((u = c.current) == null || u.revealLine(d));
  }, [d], v), j(() => {
    var u;
    (u = y.current) == null || u.editor.setTheme(l);
  }, [l], v);
  let N = ae(() => {
    var u;
    if (!(!C.current || !y.current) && !E.current) {
      B.current(y.current);
      let f = i || r, O = $(y.current, n || e || "", t || o || "", f || "");
      c.current = (u = y.current) == null ? void 0 : u.editor.create(C.current, { model: O, automaticLayout: !0, ...h }, S), M && c.current.restoreViewState(G.get(f)), y.current.editor.setTheme(l), d !== void 0 && c.current.revealLine(d), b(!0), E.current = !0;
    }
  }, [e, t, r, n, o, i, h, S, M, l, d]);
  P(() => {
    v && W.current(c.current, y.current);
  }, [v]), P(() => {
    !g && !v && N();
  }, [g, v, N]), a.current = n, P(() => {
    var u, f;
    v && V && ((u = R.current) == null || u.dispose(), R.current = (f = c.current) == null ? void 0 : f.onDidChangeModelContent((O) => {
      A.current || V(c.current.getValue(), O);
    }));
  }, [v, V]), P(() => {
    if (v) {
      let u = y.current.editor.onDidChangeMarkers((f) => {
        var q;
        let O = (q = c.current.getModel()) == null ? void 0 : q.uri;
        if (O && f.find((T) => T.path === O.path)) {
          let T = y.current.editor.getModelMarkers({ resource: O });
          L == null || L(T);
        }
      });
      return () => {
        u == null || u.dispose();
      };
    }
    return () => {
    };
  }, [v, L]);
  function Oe() {
    var u, f;
    (u = R.current) == null || u.dispose(), X ? M && G.set(i, c.current.saveViewState()) : (f = c.current.getModel()) == null || f.dispose(), c.current.dispose();
  }
  return D.createElement(ye, { width: Z, height: k, isEditorReady: v, loading: p, _ref: C, className: ee, wrapperProps: te });
}
var Ct = Lt, At = ue(Ct), Vt = At;
export {
  $t as DiffEditor,
  At as Editor,
  Vt as default,
  J as loader,
  Dt as useMonaco
};
//# sourceMappingURL=index-CLIixv8m.js.map
