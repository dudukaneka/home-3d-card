/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vr = globalThis, To = vr.ShadowRoot && (vr.ShadyCSS === void 0 || vr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ao = Symbol(), hl = /* @__PURE__ */ new WeakMap();
let sh = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== Ao) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (To && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = hl.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && hl.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const cu = (i) => new sh(typeof i == "string" ? i : i + "", void 0, Ao), wo = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((n, s, r) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[r + 1], i[0]);
  return new sh(t, i, Ao);
}, hu = (i, e) => {
  if (To) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), s = vr.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = t.cssText, i.appendChild(n);
  }
}, ul = To ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return cu(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: uu, defineProperty: du, getOwnPropertyDescriptor: fu, getOwnPropertyNames: pu, getOwnPropertySymbols: mu, getPrototypeOf: gu } = Object, Xn = globalThis, dl = Xn.trustedTypes, _u = dl ? dl.emptyScript : "", Gr = Xn.reactiveElementPolyfillSupport, bs = (i, e) => i, Ar = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? _u : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ro = (i, e) => !uu(i, e), fl = { attribute: !0, type: String, converter: Ar, reflect: !1, useDefault: !1, hasChanged: Ro };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Xn.litPropertyMetadata ?? (Xn.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Li = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = fl) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(e, n, t);
      s !== void 0 && du(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: s, set: r } = fu(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: s, set(a) {
      const o = s == null ? void 0 : s.call(this);
      r == null || r.call(this, a), this.requestUpdate(e, o, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? fl;
  }
  static _$Ei() {
    if (this.hasOwnProperty(bs("elementProperties"))) return;
    const e = gu(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(bs("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(bs("properties"))) {
      const t = this.properties, n = [...pu(t), ...mu(t)];
      for (const s of n) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [n, s] of t) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, n] of this.elementProperties) {
      const s = this._$Eu(t, n);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const s of n) t.unshift(ul(s));
    } else e !== void 0 && t.push(ul(e));
    return t;
  }
  static _$Eu(e, t) {
    const n = t.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return hu(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var n;
      return (n = t.hostConnected) == null ? void 0 : n.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var n;
      return (n = t.hostDisconnected) == null ? void 0 : n.call(t);
    });
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n);
  }
  _$ET(e, t) {
    var r;
    const n = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, n);
    if (s !== void 0 && n.reflect === !0) {
      const a = (((r = n.converter) == null ? void 0 : r.toAttribute) !== void 0 ? n.converter : Ar).toAttribute(t, n.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var r, a;
    const n = this.constructor, s = n._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const o = n.getPropertyOptions(s), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : Ar;
      this._$Em = s;
      const c = l.fromAttribute(t, o.type);
      this[s] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, n, s = !1, r) {
    var a;
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[e]), n ?? (n = o.getPropertyOptions(e)), !((n.hasChanged ?? Ro)(r, t) || n.useDefault && n.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, n)))) return;
      this.C(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: n, reflect: s, wrapped: r }, a) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, a] of s) {
        const { wrapped: o } = a, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, a, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (n = this._$EO) == null || n.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((n) => {
      var s;
      return (s = n.hostUpdated) == null ? void 0 : s.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Li.elementStyles = [], Li.shadowRootOptions = { mode: "open" }, Li[bs("elementProperties")] = /* @__PURE__ */ new Map(), Li[bs("finalized")] = /* @__PURE__ */ new Map(), Gr == null || Gr({ ReactiveElement: Li }), (Xn.reactiveElementVersions ?? (Xn.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Es = globalThis, pl = (i) => i, wr = Es.trustedTypes, ml = wr ? wr.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, rh = "$lit$", Vn = `lit$${Math.random().toFixed(9).slice(2)}$`, ah = "?" + Vn, vu = `<${ah}>`, ui = document, ws = () => ui.createComment(""), Rs = (i) => i === null || typeof i != "object" && typeof i != "function", Co = Array.isArray, xu = (i) => Co(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", Wr = `[ 	
\f\r]`, hs = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gl = /-->/g, _l = />/g, Zn = RegExp(`>|${Wr}(?:([^\\s"'>=/]+)(${Wr}*=${Wr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vl = /'/g, xl = /"/g, oh = /^(?:script|style|textarea|title)$/i, Mu = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), Ne = Mu(1), ki = Symbol.for("lit-noChange"), Fe = Symbol.for("lit-nothing"), Ml = /* @__PURE__ */ new WeakMap(), li = ui.createTreeWalker(ui, 129);
function lh(i, e) {
  if (!Co(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ml !== void 0 ? ml.createHTML(e) : e;
}
const yu = (i, e) => {
  const t = i.length - 1, n = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = hs;
  for (let o = 0; o < t; o++) {
    const l = i[o];
    let c, h, u = -1, d = 0;
    for (; d < l.length && (a.lastIndex = d, h = a.exec(l), h !== null); ) d = a.lastIndex, a === hs ? h[1] === "!--" ? a = gl : h[1] !== void 0 ? a = _l : h[2] !== void 0 ? (oh.test(h[2]) && (s = RegExp("</" + h[2], "g")), a = Zn) : h[3] !== void 0 && (a = Zn) : a === Zn ? h[0] === ">" ? (a = s ?? hs, u = -1) : h[1] === void 0 ? u = -2 : (u = a.lastIndex - h[2].length, c = h[1], a = h[3] === void 0 ? Zn : h[3] === '"' ? xl : vl) : a === xl || a === vl ? a = Zn : a === gl || a === _l ? a = hs : (a = Zn, s = void 0);
    const p = a === Zn && i[o + 1].startsWith("/>") ? " " : "";
    r += a === hs ? l + vu : u >= 0 ? (n.push(c), l.slice(0, u) + rh + l.slice(u) + Vn + p) : l + Vn + (u === -2 ? o : p);
  }
  return [lh(i, r + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class Cs {
  constructor({ strings: e, _$litType$: t }, n) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const o = e.length - 1, l = this.parts, [c, h] = yu(e, t);
    if (this.el = Cs.createElement(c, n), li.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = li.nextNode()) !== null && l.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(rh)) {
          const d = h[a++], p = s.getAttribute(u).split(Vn), g = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: r, name: g[2], strings: p, ctor: g[1] === "." ? bu : g[1] === "?" ? Eu : g[1] === "@" ? Tu : Dr }), s.removeAttribute(u);
        } else u.startsWith(Vn) && (l.push({ type: 6, index: r }), s.removeAttribute(u));
        if (oh.test(s.tagName)) {
          const u = s.textContent.split(Vn), d = u.length - 1;
          if (d > 0) {
            s.textContent = wr ? wr.emptyScript : "";
            for (let p = 0; p < d; p++) s.append(u[p], ws()), li.nextNode(), l.push({ type: 2, index: ++r });
            s.append(u[d], ws());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ah) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(Vn, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += Vn.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const n = ui.createElement("template");
    return n.innerHTML = e, n;
  }
}
function Hi(i, e, t = i, n) {
  var a, o;
  if (e === ki) return e;
  let s = n !== void 0 ? (a = t._$Co) == null ? void 0 : a[n] : t._$Cl;
  const r = Rs(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((o = s == null ? void 0 : s._$AO) == null || o.call(s, !1), r === void 0 ? s = void 0 : (s = new r(i), s._$AT(i, t, n)), n !== void 0 ? (t._$Co ?? (t._$Co = []))[n] = s : t._$Cl = s), s !== void 0 && (e = Hi(i, s._$AS(i, e.values), s, n)), e;
}
class Su {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: n } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? ui).importNode(t, !0);
    li.currentNode = s;
    let r = li.nextNode(), a = 0, o = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new Us(r, r.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (c = new Au(r, this, e)), this._$AV.push(c), l = n[++o];
      }
      a !== (l == null ? void 0 : l.index) && (r = li.nextNode(), a++);
    }
    return li.currentNode = ui, s;
  }
  p(e) {
    let t = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++;
  }
}
class Us {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, n, s) {
    this.type = 2, this._$AH = Fe, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Hi(this, e, t), Rs(e) ? e === Fe || e == null || e === "" ? (this._$AH !== Fe && this._$AR(), this._$AH = Fe) : e !== this._$AH && e !== ki && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : xu(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== Fe && Rs(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ui.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: t, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Cs.createElement(lh(n.h, n.h[0]), this.options)), n);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(t);
    else {
      const a = new Su(s, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Ml.get(e.strings);
    return t === void 0 && Ml.set(e.strings, t = new Cs(e)), t;
  }
  k(e) {
    Co(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, s = 0;
    for (const r of e) s === t.length ? t.push(n = new Us(this.O(ws()), this.O(ws()), this, this.options)) : n = t[s], n._$AI(r), s++;
    s < t.length && (this._$AR(n && n._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = pl(e).nextSibling;
      pl(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class Dr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, n, s, r) {
    this.type = 1, this._$AH = Fe, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = Fe;
  }
  _$AI(e, t = this, n, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = Hi(this, e, t, 0), a = !Rs(e) || e !== this._$AH && e !== ki, a && (this._$AH = e);
    else {
      const o = e;
      let l, c;
      for (e = r[0], l = 0; l < r.length - 1; l++) c = Hi(this, o[n + l], t, l), c === ki && (c = this._$AH[l]), a || (a = !Rs(c) || c !== this._$AH[l]), c === Fe ? e = Fe : e !== Fe && (e += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === Fe ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class bu extends Dr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === Fe ? void 0 : e;
  }
}
class Eu extends Dr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== Fe);
  }
}
class Tu extends Dr {
  constructor(e, t, n, s, r) {
    super(e, t, n, s, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Hi(this, e, t, 0) ?? Fe) === ki) return;
    const n = this._$AH, s = e === Fe && n !== Fe || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== Fe && (n === Fe || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Au {
  constructor(e, t, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Hi(this, e);
  }
}
const $r = Es.litHtmlPolyfillSupport;
$r == null || $r(Cs, Us), (Es.litHtmlVersions ?? (Es.litHtmlVersions = [])).push("3.3.3");
const wu = (i, e, t) => {
  const n = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    n._$litPart$ = s = new Us(e.insertBefore(ws(), r), r, void 0, t ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ci = globalThis;
class hi extends Li {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = wu(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return ki;
  }
}
var ih;
hi._$litElement$ = !0, hi.finalized = !0, (ih = ci.litElementHydrateSupport) == null || ih.call(ci, { LitElement: hi });
const Xr = ci.litElementPolyfillSupport;
Xr == null || Xr({ LitElement: hi });
(ci.litElementVersions ?? (ci.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Po = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ru = { attribute: !0, type: String, converter: Ar, reflect: !1, hasChanged: Ro }, Cu = (i = Ru, e, t) => {
  const { kind: n, metadata: s } = t;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(t.name, i), n === "accessor") {
    const { name: a } = t;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, l, i, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, i, o), o;
    } };
  }
  if (n === "setter") {
    const { name: a } = t;
    return function(o) {
      const l = this[a];
      e.call(this, o), this.requestUpdate(a, l, i, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function ts(i) {
  return (e, t) => typeof t == "object" ? Cu(i, e, t) : ((n, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(i, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function dt(i) {
  return ts({ ...i, state: !0, attribute: !1 });
}
const Pu = /* @__PURE__ */ new Set(["sensor", "binary_sensor"]), Lu = /* @__PURE__ */ new Set([
  "light",
  "switch",
  "climate",
  "fan",
  "cover",
  "media_player",
  "lock",
  "vacuum",
  "humidifier",
  "water_heater"
]);
function Ns(i) {
  const e = i.indexOf(".");
  return e > 0 ? i.slice(0, e) : "";
}
function Du(i) {
  return Pu.has(Ns(i));
}
function Iu(i) {
  return Lu.has(Ns(i));
}
function ch(i, e) {
  var c;
  if (!(i != null && i.states))
    return {
      sensors: [],
      appliances: [],
      activeApplianceCount: 0,
      primaryTemperature: null
    };
  const t = new Set(e.sensors ?? []), n = new Set(e.appliances ?? []);
  if (e.ha_area_id && i.entities)
    for (const h of Object.values(i.entities)) {
      if (h.disabled_by || h.hidden_by) continue;
      const u = h.device_id && i.devices ? (c = i.devices[h.device_id]) == null ? void 0 : c.area_id : null;
      (h.area_id ?? u) === e.ha_area_id && (Du(h.entity_id) ? t.add(h.entity_id) : Iu(h.entity_id) && n.add(h.entity_id));
    }
  const s = [...t].map((h) => i.states[h]).filter((h) => !!h), r = [...n].map((h) => i.states[h]).filter((h) => !!h), a = r.filter((h) => hh(h)).length, o = s.find(
    (h) => h.attributes.device_class === "temperature" || h.attributes.unit_of_measurement === "°C" || h.attributes.unit_of_measurement === "°F"
  ), l = o && o.state !== "unavailable" && o.state !== "unknown" ? `${o.state}${o.attributes.unit_of_measurement ?? ""}` : null;
  return {
    sensors: s,
    appliances: r,
    activeApplianceCount: a,
    primaryTemperature: l
  };
}
function hh(i) {
  const e = i.state.toLowerCase(), t = Ns(i.entity_id);
  return t === "climate" ? e !== "off" && e !== "unavailable" && e !== "unknown" : t === "cover" ? e === "open" || e === "opening" : t === "lock" ? e === "unlocked" : e === "on" || e === "playing" || e === "cleaning" || e === "home" || e === "open";
}
function yl(i) {
  if (Ns(i.entity_id) === "climate") {
    const n = i.attributes.temperature, s = i.attributes.current_temperature;
    if (n !== void 0)
      return `${i.state} · ${n}°${s !== void 0 ? ` (${s}°)` : ""}`;
  }
  const t = i.attributes.unit_of_measurement;
  return t ? `${i.state} ${t}` : i.state;
}
async function Uu(i, e) {
  if (!i) return;
  const t = Ns(e.entity_id), n = { entity_id: e.entity_id };
  switch (t) {
    case "light":
    case "switch":
    case "fan":
    case "humidifier":
      await i.callService(t, "toggle", n);
      return;
    case "cover":
      await i.callService("cover", "toggle", n);
      return;
    case "lock":
      await i.callService("lock", e.state === "locked" ? "unlock" : "lock", n);
      return;
    case "media_player":
      await i.callService("media_player", "media_play_pause", n);
      return;
    case "climate": {
      const s = e.state === "off" ? "heat_cool" : "off", r = e.attributes.hvac_modes, a = s === "off" ? "off" : (r == null ? void 0 : r.find((o) => o !== "off")) ?? "auto";
      await i.callService("climate", "set_hvac_mode", { ...n, hvac_mode: a });
      return;
    }
    default:
      await i.callService("homeassistant", "toggle", n);
  }
}
function Sl(i, e) {
  i.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: e }
    })
  );
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const Lo = "170", Ui = { ROTATE: 0, DOLLY: 1, PAN: 2 }, Di = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, Nu = 0, bl = 1, Fu = 2, uh = 1, dh = 2, Sn = 3, Cn = 0, Nt = 1, Zt = 2, Yn = 0, Ni = 1, El = 2, Tl = 3, Al = 4, Ou = 5, ai = 100, Bu = 101, zu = 102, ku = 103, Hu = 104, Vu = 200, Gu = 201, Wu = 202, $u = 203, La = 204, Da = 205, Xu = 206, Yu = 207, qu = 208, ju = 209, Ku = 210, Zu = 211, Ju = 212, Qu = 213, ed = 214, Ia = 0, Ua = 1, Na = 2, Vi = 3, Fa = 4, Oa = 5, Ba = 6, za = 7, fh = 0, td = 1, nd = 2, qn = 0, id = 1, sd = 2, rd = 3, ph = 4, ad = 5, od = 6, ld = 7, wl = "attached", cd = "detached", mh = 300, Gi = 301, Wi = 302, ka = 303, Ha = 304, Ir = 306, $i = 1e3, Wn = 1001, Rr = 1002, Ct = 1003, gh = 1004, Ms = 1005, zt = 1006, xr = 1007, En = 1008, Pn = 1009, _h = 1010, vh = 1011, Ps = 1012, Do = 1013, di = 1014, Qt = 1015, Fs = 1016, Io = 1017, Uo = 1018, Xi = 1020, xh = 35902, Mh = 1021, yh = 1022, $t = 1023, Sh = 1024, bh = 1025, Fi = 1026, Yi = 1027, No = 1028, Fo = 1029, Eh = 1030, Oo = 1031, Bo = 1033, Mr = 33776, yr = 33777, Sr = 33778, br = 33779, Va = 35840, Ga = 35841, Wa = 35842, $a = 35843, Xa = 36196, Ya = 37492, qa = 37496, ja = 37808, Ka = 37809, Za = 37810, Ja = 37811, Qa = 37812, eo = 37813, to = 37814, no = 37815, io = 37816, so = 37817, ro = 37818, ao = 37819, oo = 37820, lo = 37821, Er = 36492, co = 36494, ho = 36495, Th = 36283, uo = 36284, fo = 36285, po = 36286, Ls = 2300, Ds = 2301, Yr = 2302, Rl = 2400, Cl = 2401, Pl = 2402, hd = 2500, ud = 0, Ah = 1, mo = 2, dd = 3200, fd = 3201, wh = 0, pd = 1, Gn = "", xt = "srgb", Lt = "srgb-linear", Ur = "linear", Qe = "srgb", gi = 7680, Ll = 519, md = 512, gd = 513, _d = 514, Rh = 515, vd = 516, xd = 517, Md = 518, yd = 519, go = 35044, Dl = "300 es", Tn = 2e3, Cr = 2001;
class pi {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === void 0) return;
    const s = this._listeners[e];
    if (s !== void 0) {
      const r = s.indexOf(t);
      r !== -1 && s.splice(r, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const n = this._listeners[e.type];
    if (n !== void 0) {
      e.target = this;
      const s = n.slice(0);
      for (let r = 0, a = s.length; r < a; r++)
        s[r].call(this, e);
      e.target = null;
    }
  }
}
const bt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let Il = 1234567;
const Oi = Math.PI / 180, qi = 180 / Math.PI;
function en() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (bt[i & 255] + bt[i >> 8 & 255] + bt[i >> 16 & 255] + bt[i >> 24 & 255] + "-" + bt[e & 255] + bt[e >> 8 & 255] + "-" + bt[e >> 16 & 15 | 64] + bt[e >> 24 & 255] + "-" + bt[t & 63 | 128] + bt[t >> 8 & 255] + "-" + bt[t >> 16 & 255] + bt[t >> 24 & 255] + bt[n & 255] + bt[n >> 8 & 255] + bt[n >> 16 & 255] + bt[n >> 24 & 255]).toLowerCase();
}
function Mt(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function zo(i, e) {
  return (i % e + e) % e;
}
function Sd(i, e, t, n, s) {
  return n + (i - e) * (s - n) / (t - e);
}
function bd(i, e, t) {
  return i !== e ? (t - i) / (e - i) : 0;
}
function Ts(i, e, t) {
  return (1 - t) * i + t * e;
}
function Ed(i, e, t, n) {
  return Ts(i, e, 1 - Math.exp(-t * n));
}
function Td(i, e = 1) {
  return e - Math.abs(zo(i, e * 2) - e);
}
function Ad(i, e, t) {
  return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e), i * i * (3 - 2 * i));
}
function wd(i, e, t) {
  return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e), i * i * i * (i * (i * 6 - 15) + 10));
}
function Rd(i, e) {
  return i + Math.floor(Math.random() * (e - i + 1));
}
function Cd(i, e) {
  return i + Math.random() * (e - i);
}
function Pd(i) {
  return i * (0.5 - Math.random());
}
function Ld(i) {
  i !== void 0 && (Il = i);
  let e = Il += 1831565813;
  return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
}
function Dd(i) {
  return i * Oi;
}
function Id(i) {
  return i * qi;
}
function Ud(i) {
  return (i & i - 1) === 0 && i !== 0;
}
function Nd(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function Fd(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function Od(i, e, t, n, s) {
  const r = Math.cos, a = Math.sin, o = r(t / 2), l = a(t / 2), c = r((e + n) / 2), h = a((e + n) / 2), u = r((e - n) / 2), d = a((e - n) / 2), p = r((n - e) / 2), g = a((n - e) / 2);
  switch (s) {
    case "XYX":
      i.set(o * h, l * u, l * d, o * c);
      break;
    case "YZY":
      i.set(l * d, o * h, l * u, o * c);
      break;
    case "ZXZ":
      i.set(l * u, l * d, o * h, o * c);
      break;
    case "XZX":
      i.set(o * h, l * g, l * p, o * c);
      break;
    case "YXY":
      i.set(l * p, o * h, l * g, o * c);
      break;
    case "ZYZ":
      i.set(l * g, l * p, o * h, o * c);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + s);
  }
}
function Jt(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Ze(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const ko = {
  DEG2RAD: Oi,
  RAD2DEG: qi,
  generateUUID: en,
  clamp: Mt,
  euclideanModulo: zo,
  mapLinear: Sd,
  inverseLerp: bd,
  lerp: Ts,
  damp: Ed,
  pingpong: Td,
  smoothstep: Ad,
  smootherstep: wd,
  randInt: Rd,
  randFloat: Cd,
  randFloatSpread: Pd,
  seededRandom: Ld,
  degToRad: Dd,
  radToDeg: Id,
  isPowerOfTwo: Ud,
  ceilPowerOfTwo: Nd,
  floorPowerOfTwo: Fd,
  setQuaternionFromProperEuler: Od,
  normalize: Ze,
  denormalize: Jt
};
class Te {
  constructor(e = 0, t = 0) {
    Te.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, s = e.elements;
    return this.x = s[0] * t + s[3] * n + s[6], this.y = s[1] * t + s[4] * n + s[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Mt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const n = Math.cos(t), s = Math.sin(t), r = this.x - e.x, a = this.y - e.y;
    return this.x = r * n - a * s + e.x, this.y = r * s + a * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class De {
  constructor(e, t, n, s, r, a, o, l, c) {
    De.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, s, r, a, o, l, c);
  }
  set(e, t, n, s, r, a, o, l, c) {
    const h = this.elements;
    return h[0] = e, h[1] = s, h[2] = o, h[3] = t, h[4] = r, h[5] = l, h[6] = n, h[7] = a, h[8] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, s = t.elements, r = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], h = n[4], u = n[7], d = n[2], p = n[5], g = n[8], _ = s[0], m = s[3], f = s[6], T = s[1], b = s[4], M = s[7], N = s[2], w = s[5], R = s[8];
    return r[0] = a * _ + o * T + l * N, r[3] = a * m + o * b + l * w, r[6] = a * f + o * M + l * R, r[1] = c * _ + h * T + u * N, r[4] = c * m + h * b + u * w, r[7] = c * f + h * M + u * R, r[2] = d * _ + p * T + g * N, r[5] = d * m + p * b + g * w, r[8] = d * f + p * M + g * R, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[1], s = e[2], r = e[3], a = e[4], o = e[5], l = e[6], c = e[7], h = e[8];
    return t * a * h - t * o * c - n * r * h + n * o * l + s * r * c - s * a * l;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], s = e[2], r = e[3], a = e[4], o = e[5], l = e[6], c = e[7], h = e[8], u = h * a - o * c, d = o * l - h * r, p = c * r - a * l, g = t * u + n * d + s * p;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const _ = 1 / g;
    return e[0] = u * _, e[1] = (s * c - h * n) * _, e[2] = (o * n - s * a) * _, e[3] = d * _, e[4] = (h * t - s * l) * _, e[5] = (s * r - o * t) * _, e[6] = p * _, e[7] = (n * l - c * t) * _, e[8] = (a * t - n * r) * _, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, n, s, r, a, o) {
    const l = Math.cos(r), c = Math.sin(r);
    return this.set(
      n * l,
      n * c,
      -n * (l * a + c * o) + a + e,
      -s * c,
      s * l,
      -s * (-c * a + l * o) + o + t,
      0,
      0,
      1
    ), this;
  }
  //
  scale(e, t) {
    return this.premultiply(qr.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(qr.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(qr.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let s = 0; s < 9; s++)
      if (t[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const qr = /* @__PURE__ */ new De();
function Ch(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function Is(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Bd() {
  const i = Is("canvas");
  return i.style.display = "block", i;
}
const Ul = {};
function ys(i) {
  i in Ul || (Ul[i] = !0, console.warn(i));
}
function zd(i, e, t) {
  return new Promise(function(n, s) {
    function r() {
      switch (i.clientWaitSync(e, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          s();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(r, t);
          break;
        default:
          n();
      }
    }
    setTimeout(r, t);
  });
}
function kd(i) {
  const e = i.elements;
  e[2] = 0.5 * e[2] + 0.5 * e[3], e[6] = 0.5 * e[6] + 0.5 * e[7], e[10] = 0.5 * e[10] + 0.5 * e[11], e[14] = 0.5 * e[14] + 0.5 * e[15];
}
function Hd(i) {
  const e = i.elements;
  e[11] === -1 ? (e[10] = -e[10] - 1, e[14] = -e[14]) : (e[10] = -e[10], e[14] = -e[14] + 1);
}
const ke = {
  enabled: !0,
  workingColorSpace: Lt,
  /**
   * Implementations of supported color spaces.
   *
   * Required:
   *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
   *	- whitePoint: reference white [ x y ]
   *	- transfer: transfer function (pre-defined)
   *	- toXYZ: Matrix3 RGB to XYZ transform
   *	- fromXYZ: Matrix3 XYZ to RGB transform
   *	- luminanceCoefficients: RGB luminance coefficients
   *
   * Optional:
   *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }
   *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
   *
   * Reference:
   * - https://www.russellcottrell.com/photo/matrixCalculator.htm
   */
  spaces: {},
  convert: function(i, e, t) {
    return this.enabled === !1 || e === t || !e || !t || (this.spaces[e].transfer === Qe && (i.r = Rn(i.r), i.g = Rn(i.g), i.b = Rn(i.b)), this.spaces[e].primaries !== this.spaces[t].primaries && (i.applyMatrix3(this.spaces[e].toXYZ), i.applyMatrix3(this.spaces[t].fromXYZ)), this.spaces[t].transfer === Qe && (i.r = Bi(i.r), i.g = Bi(i.g), i.b = Bi(i.b))), i;
  },
  fromWorkingColorSpace: function(i, e) {
    return this.convert(i, this.workingColorSpace, e);
  },
  toWorkingColorSpace: function(i, e) {
    return this.convert(i, e, this.workingColorSpace);
  },
  getPrimaries: function(i) {
    return this.spaces[i].primaries;
  },
  getTransfer: function(i) {
    return i === Gn ? Ur : this.spaces[i].transfer;
  },
  getLuminanceCoefficients: function(i, e = this.workingColorSpace) {
    return i.fromArray(this.spaces[e].luminanceCoefficients);
  },
  define: function(i) {
    Object.assign(this.spaces, i);
  },
  // Internal APIs
  _getMatrix: function(i, e, t) {
    return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ);
  },
  _getDrawingBufferColorSpace: function(i) {
    return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
  },
  _getUnpackColorSpace: function(i = this.workingColorSpace) {
    return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
  }
};
function Rn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function Bi(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const Nl = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], Fl = [0.2126, 0.7152, 0.0722], Ol = [0.3127, 0.329], Bl = /* @__PURE__ */ new De().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), zl = /* @__PURE__ */ new De().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
ke.define({
  [Lt]: {
    primaries: Nl,
    whitePoint: Ol,
    transfer: Ur,
    toXYZ: Bl,
    fromXYZ: zl,
    luminanceCoefficients: Fl,
    workingColorSpaceConfig: { unpackColorSpace: xt },
    outputColorSpaceConfig: { drawingBufferColorSpace: xt }
  },
  [xt]: {
    primaries: Nl,
    whitePoint: Ol,
    transfer: Qe,
    toXYZ: Bl,
    fromXYZ: zl,
    luminanceCoefficients: Fl,
    outputColorSpaceConfig: { drawingBufferColorSpace: xt }
  }
});
let _i;
class Vd {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      _i === void 0 && (_i = Is("canvas")), _i.width = e.width, _i.height = e.height;
      const n = _i.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = _i;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = Is("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const s = n.getImageData(0, 0, e.width, e.height), r = s.data;
      for (let a = 0; a < r.length; a++)
        r[a] = Rn(r[a] / 255) * 255;
      return n.putImageData(s, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(Rn(t[n] / 255) * 255) : t[n] = Rn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Gd = 0;
class Ph {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Gd++ }), this.uuid = en(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, s = this.data;
    if (s !== null) {
      let r;
      if (Array.isArray(s)) {
        r = [];
        for (let a = 0, o = s.length; a < o; a++)
          s[a].isDataTexture ? r.push(jr(s[a].image)) : r.push(jr(s[a]));
      } else
        r = jr(s);
      n.url = r;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function jr(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Vd.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Wd = 0;
class vt extends pi {
  constructor(e = vt.DEFAULT_IMAGE, t = vt.DEFAULT_MAPPING, n = Wn, s = Wn, r = zt, a = En, o = $t, l = Pn, c = vt.DEFAULT_ANISOTROPY, h = Gn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Wd++ }), this.uuid = en(), this.name = "", this.source = new Ph(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new Te(0, 0), this.repeat = new Te(1, 1), this.center = new Te(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new De(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== mh) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case $i:
          e.x = e.x - Math.floor(e.x);
          break;
        case Wn:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case Rr:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case $i:
          e.y = e.y - Math.floor(e.y);
          break;
        case Wn:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case Rr:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
vt.DEFAULT_IMAGE = null;
vt.DEFAULT_MAPPING = mh;
vt.DEFAULT_ANISOTROPY = 1;
class Ye {
  constructor(e = 0, t = 0, n = 0, s = 1) {
    Ye.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = s;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, s) {
    return this.x = e, this.y = t, this.z = n, this.w = s, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, s = this.z, r = this.w, a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * s + a[12] * r, this.y = a[1] * t + a[5] * n + a[9] * s + a[13] * r, this.z = a[2] * t + a[6] * n + a[10] * s + a[14] * r, this.w = a[3] * t + a[7] * n + a[11] * s + a[15] * r, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, s, r;
    const l = e.elements, c = l[0], h = l[4], u = l[8], d = l[1], p = l[5], g = l[9], _ = l[2], m = l[6], f = l[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(u - _) < 0.01 && Math.abs(g - m) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(u + _) < 0.1 && Math.abs(g + m) < 0.1 && Math.abs(c + p + f - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const b = (c + 1) / 2, M = (p + 1) / 2, N = (f + 1) / 2, w = (h + d) / 4, R = (u + _) / 4, U = (g + m) / 4;
      return b > M && b > N ? b < 0.01 ? (n = 0, s = 0.707106781, r = 0.707106781) : (n = Math.sqrt(b), s = w / n, r = R / n) : M > N ? M < 0.01 ? (n = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(M), n = w / s, r = U / s) : N < 0.01 ? (n = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(N), n = R / r, s = U / r), this.set(n, s, r, t), this;
    }
    let T = Math.sqrt((m - g) * (m - g) + (u - _) * (u - _) + (d - h) * (d - h));
    return Math.abs(T) < 1e-3 && (T = 1), this.x = (m - g) / T, this.y = (u - _) / T, this.z = (d - h) / T, this.w = Math.acos((c + p + f - 1) / 2), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class $d extends pi {
  constructor(e = 1, t = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new Ye(0, 0, e, t), this.scissorTest = !1, this.viewport = new Ye(0, 0, e, t);
    const s = { width: e, height: t, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: zt,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const r = new vt(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    r.flipY = !1, r.generateMipmaps = n.generateMipmaps, r.internalFormat = n.internalFormat, this.textures = [];
    const a = n.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = r.clone(), this.textures[o].isRenderTargetTexture = !0;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let s = 0, r = this.textures.length; s < r; s++)
        this.textures[s].image.width = e, this.textures[s].image.height = t, this.textures[s].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let n = 0, s = e.textures.length; n < s; n++)
      this.textures[n] = e.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0;
    const t = Object.assign({}, e.texture.image);
    return this.texture.source = new Ph(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class fi extends $d {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class Lh extends vt {
  constructor(e = null, t = 1, n = 1, s = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: s }, this.magFilter = Ct, this.minFilter = Ct, this.wrapR = Wn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class Xd extends vt {
  constructor(e = null, t = 1, n = 1, s = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: s }, this.magFilter = Ct, this.minFilter = Ct, this.wrapR = Wn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class ln {
  constructor(e = 0, t = 0, n = 0, s = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = s;
  }
  static slerpFlat(e, t, n, s, r, a, o) {
    let l = n[s + 0], c = n[s + 1], h = n[s + 2], u = n[s + 3];
    const d = r[a + 0], p = r[a + 1], g = r[a + 2], _ = r[a + 3];
    if (o === 0) {
      e[t + 0] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = u;
      return;
    }
    if (o === 1) {
      e[t + 0] = d, e[t + 1] = p, e[t + 2] = g, e[t + 3] = _;
      return;
    }
    if (u !== _ || l !== d || c !== p || h !== g) {
      let m = 1 - o;
      const f = l * d + c * p + h * g + u * _, T = f >= 0 ? 1 : -1, b = 1 - f * f;
      if (b > Number.EPSILON) {
        const N = Math.sqrt(b), w = Math.atan2(N, f * T);
        m = Math.sin(m * w) / N, o = Math.sin(o * w) / N;
      }
      const M = o * T;
      if (l = l * m + d * M, c = c * m + p * M, h = h * m + g * M, u = u * m + _ * M, m === 1 - o) {
        const N = 1 / Math.sqrt(l * l + c * c + h * h + u * u);
        l *= N, c *= N, h *= N, u *= N;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = h, e[t + 3] = u;
  }
  static multiplyQuaternionsFlat(e, t, n, s, r, a) {
    const o = n[s], l = n[s + 1], c = n[s + 2], h = n[s + 3], u = r[a], d = r[a + 1], p = r[a + 2], g = r[a + 3];
    return e[t] = o * g + h * u + l * p - c * d, e[t + 1] = l * g + h * d + c * u - o * p, e[t + 2] = c * g + h * p + o * d - l * u, e[t + 3] = h * g - o * u - l * d - c * p, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, s) {
    return this._x = e, this._y = t, this._z = n, this._w = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const n = e._x, s = e._y, r = e._z, a = e._order, o = Math.cos, l = Math.sin, c = o(n / 2), h = o(s / 2), u = o(r / 2), d = l(n / 2), p = l(s / 2), g = l(r / 2);
    switch (a) {
      case "XYZ":
        this._x = d * h * u + c * p * g, this._y = c * p * u - d * h * g, this._z = c * h * g + d * p * u, this._w = c * h * u - d * p * g;
        break;
      case "YXZ":
        this._x = d * h * u + c * p * g, this._y = c * p * u - d * h * g, this._z = c * h * g - d * p * u, this._w = c * h * u + d * p * g;
        break;
      case "ZXY":
        this._x = d * h * u - c * p * g, this._y = c * p * u + d * h * g, this._z = c * h * g + d * p * u, this._w = c * h * u - d * p * g;
        break;
      case "ZYX":
        this._x = d * h * u - c * p * g, this._y = c * p * u + d * h * g, this._z = c * h * g - d * p * u, this._w = c * h * u + d * p * g;
        break;
      case "YZX":
        this._x = d * h * u + c * p * g, this._y = c * p * u + d * h * g, this._z = c * h * g - d * p * u, this._w = c * h * u - d * p * g;
        break;
      case "XZY":
        this._x = d * h * u - c * p * g, this._y = c * p * u - d * h * g, this._z = c * h * g + d * p * u, this._w = c * h * u + d * p * g;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, s = Math.sin(n);
    return this._x = e.x * s, this._y = e.y * s, this._z = e.z * s, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], s = t[4], r = t[8], a = t[1], o = t[5], l = t[9], c = t[2], h = t[6], u = t[10], d = n + o + u;
    if (d > 0) {
      const p = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / p, this._x = (h - l) * p, this._y = (r - c) * p, this._z = (a - s) * p;
    } else if (n > o && n > u) {
      const p = 2 * Math.sqrt(1 + n - o - u);
      this._w = (h - l) / p, this._x = 0.25 * p, this._y = (s + a) / p, this._z = (r + c) / p;
    } else if (o > u) {
      const p = 2 * Math.sqrt(1 + o - n - u);
      this._w = (r - c) / p, this._x = (s + a) / p, this._y = 0.25 * p, this._z = (l + h) / p;
    } else {
      const p = 2 * Math.sqrt(1 + u - n - o);
      this._w = (a - s) / p, this._x = (r + c) / p, this._y = (l + h) / p, this._z = 0.25 * p;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Mt(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const s = Math.min(1, t / n);
    return this.slerp(e, s), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x, s = e._y, r = e._z, a = e._w, o = t._x, l = t._y, c = t._z, h = t._w;
    return this._x = n * h + a * o + s * c - r * l, this._y = s * h + a * l + r * o - n * c, this._z = r * h + a * c + n * l - s * o, this._w = a * h - n * o - s * l - r * c, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    const n = this._x, s = this._y, r = this._z, a = this._w;
    let o = a * e._w + n * e._x + s * e._y + r * e._z;
    if (o < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, o = -o) : this.copy(e), o >= 1)
      return this._w = a, this._x = n, this._y = s, this._z = r, this;
    const l = 1 - o * o;
    if (l <= Number.EPSILON) {
      const p = 1 - t;
      return this._w = p * a + t * this._w, this._x = p * n + t * this._x, this._y = p * s + t * this._y, this._z = p * r + t * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), h = Math.atan2(c, o), u = Math.sin((1 - t) * h) / c, d = Math.sin(t * h) / c;
    return this._w = a * u + this._w * d, this._x = n * u + this._x * d, this._y = s * u + this._y * d, this._z = r * u + this._z * d, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), s = Math.sqrt(1 - n), r = Math.sqrt(n);
    return this.set(
      s * Math.sin(e),
      s * Math.cos(e),
      r * Math.sin(t),
      r * Math.cos(t)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class A {
  constructor(e = 0, t = 0, n = 0) {
    A.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n;
  }
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(kl.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(kl.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, s = this.z, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6] * s, this.y = r[1] * t + r[4] * n + r[7] * s, this.z = r[2] * t + r[5] * n + r[8] * s, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, s = this.z, r = e.elements, a = 1 / (r[3] * t + r[7] * n + r[11] * s + r[15]);
    return this.x = (r[0] * t + r[4] * n + r[8] * s + r[12]) * a, this.y = (r[1] * t + r[5] * n + r[9] * s + r[13]) * a, this.z = (r[2] * t + r[6] * n + r[10] * s + r[14]) * a, this;
  }
  applyQuaternion(e) {
    const t = this.x, n = this.y, s = this.z, r = e.x, a = e.y, o = e.z, l = e.w, c = 2 * (a * s - o * n), h = 2 * (o * t - r * s), u = 2 * (r * n - a * t);
    return this.x = t + l * c + a * u - o * h, this.y = n + l * h + o * c - r * u, this.z = s + l * u + r * h - a * c, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x, n = this.y, s = this.z, r = e.elements;
    return this.x = r[0] * t + r[4] * n + r[8] * s, this.y = r[1] * t + r[5] * n + r[9] * s, this.z = r[2] * t + r[6] * n + r[10] * s, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const n = e.x, s = e.y, r = e.z, a = t.x, o = t.y, l = t.z;
    return this.x = s * l - r * o, this.y = r * a - n * l, this.z = n * o - s * a, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return Kr.copy(this).projectOnVector(e), this.sub(Kr);
  }
  reflect(e) {
    return this.sub(Kr.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Mt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, s = this.z - e.z;
    return t * t + n * n + s * s;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    const s = Math.sin(t) * e;
    return this.x = s * Math.sin(n), this.y = Math.cos(t) * e, this.z = s * Math.cos(n), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), s = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = s, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Kr = /* @__PURE__ */ new A(), kl = /* @__PURE__ */ new ln();
class Tt {
  constructor(e = new A(1 / 0, 1 / 0, 1 / 0), t = new A(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(qt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(qt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = qt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const r = n.getAttribute("position");
      if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0)
        for (let a = 0, o = r.count; a < o; a++)
          e.isMesh === !0 ? e.getVertexPosition(a, qt) : qt.fromBufferAttribute(r, a), qt.applyMatrix4(e.matrixWorld), this.expandByPoint(qt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), ks.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), ks.copy(n.boundingBox)), ks.applyMatrix4(e.matrixWorld), this.union(ks);
    }
    const s = e.children;
    for (let r = 0, a = s.length; r < a; r++)
      this.expandByObject(s[r], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, qt), qt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(us), Hs.subVectors(this.max, us), vi.subVectors(e.a, us), xi.subVectors(e.b, us), Mi.subVectors(e.c, us), Un.subVectors(xi, vi), Nn.subVectors(Mi, xi), Jn.subVectors(vi, Mi);
    let t = [
      0,
      -Un.z,
      Un.y,
      0,
      -Nn.z,
      Nn.y,
      0,
      -Jn.z,
      Jn.y,
      Un.z,
      0,
      -Un.x,
      Nn.z,
      0,
      -Nn.x,
      Jn.z,
      0,
      -Jn.x,
      -Un.y,
      Un.x,
      0,
      -Nn.y,
      Nn.x,
      0,
      -Jn.y,
      Jn.x,
      0
    ];
    return !Zr(t, vi, xi, Mi, Hs) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Zr(t, vi, xi, Mi, Hs)) ? !1 : (Vs.crossVectors(Un, Nn), t = [Vs.x, Vs.y, Vs.z], Zr(t, vi, xi, Mi, Hs));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, qt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(qt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (gn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), gn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), gn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), gn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), gn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), gn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), gn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), gn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(gn), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const gn = [
  /* @__PURE__ */ new A(),
  /* @__PURE__ */ new A(),
  /* @__PURE__ */ new A(),
  /* @__PURE__ */ new A(),
  /* @__PURE__ */ new A(),
  /* @__PURE__ */ new A(),
  /* @__PURE__ */ new A(),
  /* @__PURE__ */ new A()
], qt = /* @__PURE__ */ new A(), ks = /* @__PURE__ */ new Tt(), vi = /* @__PURE__ */ new A(), xi = /* @__PURE__ */ new A(), Mi = /* @__PURE__ */ new A(), Un = /* @__PURE__ */ new A(), Nn = /* @__PURE__ */ new A(), Jn = /* @__PURE__ */ new A(), us = /* @__PURE__ */ new A(), Hs = /* @__PURE__ */ new A(), Vs = /* @__PURE__ */ new A(), Qn = /* @__PURE__ */ new A();
function Zr(i, e, t, n, s) {
  for (let r = 0, a = i.length - 3; r <= a; r += 3) {
    Qn.fromArray(i, r);
    const o = s.x * Math.abs(Qn.x) + s.y * Math.abs(Qn.y) + s.z * Math.abs(Qn.z), l = e.dot(Qn), c = t.dot(Qn), h = n.dot(Qn);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o)
      return !1;
  }
  return !0;
}
const Yd = /* @__PURE__ */ new Tt(), ds = /* @__PURE__ */ new A(), Jr = /* @__PURE__ */ new A();
class un {
  constructor(e = new A(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : Yd.setFromPoints(e).getCenter(n);
    let s = 0;
    for (let r = 0, a = e.length; r < a; r++)
      s = Math.max(s, n.distanceToSquared(e[r]));
    return this.radius = Math.sqrt(s), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    ds.subVectors(e, this.center);
    const t = ds.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), s = (n - this.radius) * 0.5;
      this.center.addScaledVector(ds, s / n), this.radius += s;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Jr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(ds.copy(e.center).add(Jr)), this.expandByPoint(ds.copy(e.center).sub(Jr))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _n = /* @__PURE__ */ new A(), Qr = /* @__PURE__ */ new A(), Gs = /* @__PURE__ */ new A(), Fn = /* @__PURE__ */ new A(), ea = /* @__PURE__ */ new A(), Ws = /* @__PURE__ */ new A(), ta = /* @__PURE__ */ new A();
class ns {
  constructor(e = new A(), t = new A(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, _n)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = _n.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (_n.copy(this.origin).addScaledVector(this.direction, t), _n.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, s) {
    Qr.copy(e).add(t).multiplyScalar(0.5), Gs.copy(t).sub(e).normalize(), Fn.copy(this.origin).sub(Qr);
    const r = e.distanceTo(t) * 0.5, a = -this.direction.dot(Gs), o = Fn.dot(this.direction), l = -Fn.dot(Gs), c = Fn.lengthSq(), h = Math.abs(1 - a * a);
    let u, d, p, g;
    if (h > 0)
      if (u = a * l - o, d = a * o - l, g = r * h, u >= 0)
        if (d >= -g)
          if (d <= g) {
            const _ = 1 / h;
            u *= _, d *= _, p = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * l) + c;
          } else
            d = r, u = Math.max(0, -(a * d + o)), p = -u * u + d * (d + 2 * l) + c;
        else
          d = -r, u = Math.max(0, -(a * d + o)), p = -u * u + d * (d + 2 * l) + c;
      else
        d <= -g ? (u = Math.max(0, -(-a * r + o)), d = u > 0 ? -r : Math.min(Math.max(-r, -l), r), p = -u * u + d * (d + 2 * l) + c) : d <= g ? (u = 0, d = Math.min(Math.max(-r, -l), r), p = d * (d + 2 * l) + c) : (u = Math.max(0, -(a * r + o)), d = u > 0 ? r : Math.min(Math.max(-r, -l), r), p = -u * u + d * (d + 2 * l) + c);
    else
      d = a > 0 ? -r : r, u = Math.max(0, -(a * d + o)), p = -u * u + d * (d + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, u), s && s.copy(Qr).addScaledVector(Gs, d), p;
  }
  intersectSphere(e, t) {
    _n.subVectors(e.center, this.origin);
    const n = _n.dot(this.direction), s = _n.dot(_n) - n * n, r = e.radius * e.radius;
    if (s > r) return null;
    const a = Math.sqrt(r - s), o = n - a, l = n + a;
    return l < 0 ? null : o < 0 ? this.at(l, t) : this.at(o, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, s, r, a, o, l;
    const c = 1 / this.direction.x, h = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
    return c >= 0 ? (n = (e.min.x - d.x) * c, s = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, s = (e.min.x - d.x) * c), h >= 0 ? (r = (e.min.y - d.y) * h, a = (e.max.y - d.y) * h) : (r = (e.max.y - d.y) * h, a = (e.min.y - d.y) * h), n > a || r > s || ((r > n || isNaN(n)) && (n = r), (a < s || isNaN(s)) && (s = a), u >= 0 ? (o = (e.min.z - d.z) * u, l = (e.max.z - d.z) * u) : (o = (e.max.z - d.z) * u, l = (e.min.z - d.z) * u), n > l || o > s) || ((o > n || n !== n) && (n = o), (l < s || s !== s) && (s = l), s < 0) ? null : this.at(n >= 0 ? n : s, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, _n) !== null;
  }
  intersectTriangle(e, t, n, s, r) {
    ea.subVectors(t, e), Ws.subVectors(n, e), ta.crossVectors(ea, Ws);
    let a = this.direction.dot(ta), o;
    if (a > 0) {
      if (s) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    Fn.subVectors(this.origin, e);
    const l = o * this.direction.dot(Ws.crossVectors(Fn, Ws));
    if (l < 0)
      return null;
    const c = o * this.direction.dot(ea.cross(Fn));
    if (c < 0 || l + c > a)
      return null;
    const h = -o * Fn.dot(ta);
    return h < 0 ? null : this.at(h / a, r);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Ce {
  constructor(e, t, n, s, r, a, o, l, c, h, u, d, p, g, _, m) {
    Ce.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, s, r, a, o, l, c, h, u, d, p, g, _, m);
  }
  set(e, t, n, s, r, a, o, l, c, h, u, d, p, g, _, m) {
    const f = this.elements;
    return f[0] = e, f[4] = t, f[8] = n, f[12] = s, f[1] = r, f[5] = a, f[9] = o, f[13] = l, f[2] = c, f[6] = h, f[10] = u, f[14] = d, f[3] = p, f[7] = g, f[11] = _, f[15] = m, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new Ce().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const t = this.elements, n = e.elements, s = 1 / yi.setFromMatrixColumn(e, 0).length(), r = 1 / yi.setFromMatrixColumn(e, 1).length(), a = 1 / yi.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * s, t[1] = n[1] * s, t[2] = n[2] * s, t[3] = 0, t[4] = n[4] * r, t[5] = n[5] * r, t[6] = n[6] * r, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, s = e.y, r = e.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(s), c = Math.sin(s), h = Math.cos(r), u = Math.sin(r);
    if (e.order === "XYZ") {
      const d = a * h, p = a * u, g = o * h, _ = o * u;
      t[0] = l * h, t[4] = -l * u, t[8] = c, t[1] = p + g * c, t[5] = d - _ * c, t[9] = -o * l, t[2] = _ - d * c, t[6] = g + p * c, t[10] = a * l;
    } else if (e.order === "YXZ") {
      const d = l * h, p = l * u, g = c * h, _ = c * u;
      t[0] = d + _ * o, t[4] = g * o - p, t[8] = a * c, t[1] = a * u, t[5] = a * h, t[9] = -o, t[2] = p * o - g, t[6] = _ + d * o, t[10] = a * l;
    } else if (e.order === "ZXY") {
      const d = l * h, p = l * u, g = c * h, _ = c * u;
      t[0] = d - _ * o, t[4] = -a * u, t[8] = g + p * o, t[1] = p + g * o, t[5] = a * h, t[9] = _ - d * o, t[2] = -a * c, t[6] = o, t[10] = a * l;
    } else if (e.order === "ZYX") {
      const d = a * h, p = a * u, g = o * h, _ = o * u;
      t[0] = l * h, t[4] = g * c - p, t[8] = d * c + _, t[1] = l * u, t[5] = _ * c + d, t[9] = p * c - g, t[2] = -c, t[6] = o * l, t[10] = a * l;
    } else if (e.order === "YZX") {
      const d = a * l, p = a * c, g = o * l, _ = o * c;
      t[0] = l * h, t[4] = _ - d * u, t[8] = g * u + p, t[1] = u, t[5] = a * h, t[9] = -o * h, t[2] = -c * h, t[6] = p * u + g, t[10] = d - _ * u;
    } else if (e.order === "XZY") {
      const d = a * l, p = a * c, g = o * l, _ = o * c;
      t[0] = l * h, t[4] = -u, t[8] = c * h, t[1] = d * u + _, t[5] = a * h, t[9] = p * u - g, t[2] = g * u - p, t[6] = o * h, t[10] = _ * u + d;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(qd, e, jd);
  }
  lookAt(e, t, n) {
    const s = this.elements;
    return Ot.subVectors(e, t), Ot.lengthSq() === 0 && (Ot.z = 1), Ot.normalize(), On.crossVectors(n, Ot), On.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ot.x += 1e-4 : Ot.z += 1e-4, Ot.normalize(), On.crossVectors(n, Ot)), On.normalize(), $s.crossVectors(Ot, On), s[0] = On.x, s[4] = $s.x, s[8] = Ot.x, s[1] = On.y, s[5] = $s.y, s[9] = Ot.y, s[2] = On.z, s[6] = $s.z, s[10] = Ot.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, s = t.elements, r = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], h = n[1], u = n[5], d = n[9], p = n[13], g = n[2], _ = n[6], m = n[10], f = n[14], T = n[3], b = n[7], M = n[11], N = n[15], w = s[0], R = s[4], U = s[8], S = s[12], y = s[1], C = s[5], X = s[9], z = s[13], W = s[2], K = s[6], V = s[10], Q = s[14], H = s[3], ie = s[7], ce = s[11], xe = s[15];
    return r[0] = a * w + o * y + l * W + c * H, r[4] = a * R + o * C + l * K + c * ie, r[8] = a * U + o * X + l * V + c * ce, r[12] = a * S + o * z + l * Q + c * xe, r[1] = h * w + u * y + d * W + p * H, r[5] = h * R + u * C + d * K + p * ie, r[9] = h * U + u * X + d * V + p * ce, r[13] = h * S + u * z + d * Q + p * xe, r[2] = g * w + _ * y + m * W + f * H, r[6] = g * R + _ * C + m * K + f * ie, r[10] = g * U + _ * X + m * V + f * ce, r[14] = g * S + _ * z + m * Q + f * xe, r[3] = T * w + b * y + M * W + N * H, r[7] = T * R + b * C + M * K + N * ie, r[11] = T * U + b * X + M * V + N * ce, r[15] = T * S + b * z + M * Q + N * xe, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], s = e[8], r = e[12], a = e[1], o = e[5], l = e[9], c = e[13], h = e[2], u = e[6], d = e[10], p = e[14], g = e[3], _ = e[7], m = e[11], f = e[15];
    return g * (+r * l * u - s * c * u - r * o * d + n * c * d + s * o * p - n * l * p) + _ * (+t * l * p - t * c * d + r * a * d - s * a * p + s * c * h - r * l * h) + m * (+t * c * u - t * o * p - r * a * u + n * a * p + r * o * h - n * c * h) + f * (-s * o * h - t * l * u + t * o * d + s * a * u - n * a * d + n * l * h);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, n) {
    const s = this.elements;
    return e.isVector3 ? (s[12] = e.x, s[13] = e.y, s[14] = e.z) : (s[12] = e, s[13] = t, s[14] = n), this;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], s = e[2], r = e[3], a = e[4], o = e[5], l = e[6], c = e[7], h = e[8], u = e[9], d = e[10], p = e[11], g = e[12], _ = e[13], m = e[14], f = e[15], T = u * m * c - _ * d * c + _ * l * p - o * m * p - u * l * f + o * d * f, b = g * d * c - h * m * c - g * l * p + a * m * p + h * l * f - a * d * f, M = h * _ * c - g * u * c + g * o * p - a * _ * p - h * o * f + a * u * f, N = g * u * l - h * _ * l - g * o * d + a * _ * d + h * o * m - a * u * m, w = t * T + n * b + s * M + r * N;
    if (w === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const R = 1 / w;
    return e[0] = T * R, e[1] = (_ * d * r - u * m * r - _ * s * p + n * m * p + u * s * f - n * d * f) * R, e[2] = (o * m * r - _ * l * r + _ * s * c - n * m * c - o * s * f + n * l * f) * R, e[3] = (u * l * r - o * d * r - u * s * c + n * d * c + o * s * p - n * l * p) * R, e[4] = b * R, e[5] = (h * m * r - g * d * r + g * s * p - t * m * p - h * s * f + t * d * f) * R, e[6] = (g * l * r - a * m * r - g * s * c + t * m * c + a * s * f - t * l * f) * R, e[7] = (a * d * r - h * l * r + h * s * c - t * d * c - a * s * p + t * l * p) * R, e[8] = M * R, e[9] = (g * u * r - h * _ * r - g * n * p + t * _ * p + h * n * f - t * u * f) * R, e[10] = (a * _ * r - g * o * r + g * n * c - t * _ * c - a * n * f + t * o * f) * R, e[11] = (h * o * r - a * u * r - h * n * c + t * u * c + a * n * p - t * o * p) * R, e[12] = N * R, e[13] = (h * _ * s - g * u * s + g * n * d - t * _ * d - h * n * m + t * u * m) * R, e[14] = (g * o * s - a * _ * s - g * n * l + t * _ * l + a * n * m - t * o * m) * R, e[15] = (a * u * s - h * o * s + h * n * l - t * u * l - a * n * d + t * o * d) * R, this;
  }
  scale(e) {
    const t = this.elements, n = e.x, s = e.y, r = e.z;
    return t[0] *= n, t[4] *= s, t[8] *= r, t[1] *= n, t[5] *= s, t[9] *= r, t[2] *= n, t[6] *= s, t[10] *= r, t[3] *= n, t[7] *= s, t[11] *= r, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], s = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, s));
  }
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(e, t) {
    const n = Math.cos(t), s = Math.sin(t), r = 1 - n, a = e.x, o = e.y, l = e.z, c = r * a, h = r * o;
    return this.set(
      c * a + n,
      c * o - s * l,
      c * l + s * o,
      0,
      c * o + s * l,
      h * o + n,
      h * l - s * a,
      0,
      c * l - s * o,
      h * l + s * a,
      r * l * l + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(e, t, n, s, r, a) {
    return this.set(
      1,
      n,
      r,
      0,
      e,
      1,
      a,
      0,
      t,
      s,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, t, n) {
    const s = this.elements, r = t._x, a = t._y, o = t._z, l = t._w, c = r + r, h = a + a, u = o + o, d = r * c, p = r * h, g = r * u, _ = a * h, m = a * u, f = o * u, T = l * c, b = l * h, M = l * u, N = n.x, w = n.y, R = n.z;
    return s[0] = (1 - (_ + f)) * N, s[1] = (p + M) * N, s[2] = (g - b) * N, s[3] = 0, s[4] = (p - M) * w, s[5] = (1 - (d + f)) * w, s[6] = (m + T) * w, s[7] = 0, s[8] = (g + b) * R, s[9] = (m - T) * R, s[10] = (1 - (d + _)) * R, s[11] = 0, s[12] = e.x, s[13] = e.y, s[14] = e.z, s[15] = 1, this;
  }
  decompose(e, t, n) {
    const s = this.elements;
    let r = yi.set(s[0], s[1], s[2]).length();
    const a = yi.set(s[4], s[5], s[6]).length(), o = yi.set(s[8], s[9], s[10]).length();
    this.determinant() < 0 && (r = -r), e.x = s[12], e.y = s[13], e.z = s[14], jt.copy(this);
    const c = 1 / r, h = 1 / a, u = 1 / o;
    return jt.elements[0] *= c, jt.elements[1] *= c, jt.elements[2] *= c, jt.elements[4] *= h, jt.elements[5] *= h, jt.elements[6] *= h, jt.elements[8] *= u, jt.elements[9] *= u, jt.elements[10] *= u, t.setFromRotationMatrix(jt), n.x = r, n.y = a, n.z = o, this;
  }
  makePerspective(e, t, n, s, r, a, o = Tn) {
    const l = this.elements, c = 2 * r / (t - e), h = 2 * r / (n - s), u = (t + e) / (t - e), d = (n + s) / (n - s);
    let p, g;
    if (o === Tn)
      p = -(a + r) / (a - r), g = -2 * a * r / (a - r);
    else if (o === Cr)
      p = -a / (a - r), g = -a * r / (a - r);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = c, l[4] = 0, l[8] = u, l[12] = 0, l[1] = 0, l[5] = h, l[9] = d, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = p, l[14] = g, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(e, t, n, s, r, a, o = Tn) {
    const l = this.elements, c = 1 / (t - e), h = 1 / (n - s), u = 1 / (a - r), d = (t + e) * c, p = (n + s) * h;
    let g, _;
    if (o === Tn)
      g = (a + r) * u, _ = -2 * u;
    else if (o === Cr)
      g = r * u, _ = -1 * u;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -d, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -p, l[2] = 0, l[6] = 0, l[10] = _, l[14] = -g, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let s = 0; s < 16; s++)
      if (t[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
}
const yi = /* @__PURE__ */ new A(), jt = /* @__PURE__ */ new Ce(), qd = /* @__PURE__ */ new A(0, 0, 0), jd = /* @__PURE__ */ new A(1, 1, 1), On = /* @__PURE__ */ new A(), $s = /* @__PURE__ */ new A(), Ot = /* @__PURE__ */ new A(), Hl = /* @__PURE__ */ new Ce(), Vl = /* @__PURE__ */ new ln();
class cn {
  constructor(e = 0, t = 0, n = 0, s = cn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = s;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, n, s = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const s = e.elements, r = s[0], a = s[4], o = s[8], l = s[1], c = s[5], h = s[9], u = s[2], d = s[6], p = s[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(Mt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-a, r)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Mt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-u, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Mt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-u, p), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, r));
        break;
      case "ZYX":
        this._y = Math.asin(-Mt(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(d, p), this._z = Math.atan2(l, r)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(Mt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-u, r)) : (this._x = 0, this._y = Math.atan2(o, p));
        break;
      case "XZY":
        this._z = Math.asin(-Mt(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, r)) : (this._x = Math.atan2(-h, p), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return Hl.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Hl, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return Vl.setFromEuler(this), this.setFromQuaternion(Vl, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
cn.DEFAULT_ORDER = "XYZ";
class Ho {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Kd = 0;
const Gl = /* @__PURE__ */ new A(), Si = /* @__PURE__ */ new ln(), vn = /* @__PURE__ */ new Ce(), Xs = /* @__PURE__ */ new A(), fs = /* @__PURE__ */ new A(), Zd = /* @__PURE__ */ new A(), Jd = /* @__PURE__ */ new ln(), Wl = /* @__PURE__ */ new A(1, 0, 0), $l = /* @__PURE__ */ new A(0, 1, 0), Xl = /* @__PURE__ */ new A(0, 0, 1), Yl = { type: "added" }, Qd = { type: "removed" }, bi = { type: "childadded", child: null }, na = { type: "childremoved", child: null };
class ot extends pi {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Kd++ }), this.uuid = en(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ot.DEFAULT_UP.clone();
    const e = new A(), t = new cn(), n = new ln(), s = new A(1, 1, 1);
    function r() {
      n.setFromEuler(t, !1);
    }
    function a() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(r), n._onChange(a), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: s
      },
      modelViewMatrix: {
        value: new Ce()
      },
      normalMatrix: {
        value: new De()
      }
    }), this.matrix = new Ce(), this.matrixWorld = new Ce(), this.matrixAutoUpdate = ot.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Ho(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return Si.setFromAxisAngle(e, t), this.quaternion.multiply(Si), this;
  }
  rotateOnWorldAxis(e, t) {
    return Si.setFromAxisAngle(e, t), this.quaternion.premultiply(Si), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(Wl, e);
  }
  rotateY(e) {
    return this.rotateOnAxis($l, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(Xl, e);
  }
  translateOnAxis(e, t) {
    return Gl.copy(e).applyQuaternion(this.quaternion), this.position.add(Gl.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(Wl, e);
  }
  translateY(e) {
    return this.translateOnAxis($l, e);
  }
  translateZ(e) {
    return this.translateOnAxis(Xl, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(vn.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? Xs.copy(e) : Xs.set(e, t, n);
    const s = this.parent;
    this.updateWorldMatrix(!0, !1), fs.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? vn.lookAt(fs, Xs, this.up) : vn.lookAt(Xs, fs, this.up), this.quaternion.setFromRotationMatrix(vn), s && (vn.extractRotation(s.matrixWorld), Si.setFromRotationMatrix(vn), this.quaternion.premultiply(Si.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Yl), bi.child = e, this.dispatchEvent(bi), bi.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Qd), na.child = e, this.dispatchEvent(na), na.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), vn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), vn.multiply(e.parent.matrixWorld)), e.applyMatrix4(vn), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(Yl), bi.child = e, this.dispatchEvent(bi), bi.child = null, this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, s = this.children.length; n < s; n++) {
      const a = this.children[n].getObjectByProperty(e, t);
      if (a !== void 0)
        return a;
    }
  }
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const s = this.children;
    for (let r = 0, a = s.length; r < a; r++)
      s[r].getObjectsByProperty(e, t, n);
    return n;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(fs, e, Zd), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(fs, Jd, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, s = t.length; n < s; n++)
      t[n].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, s = t.length; n < s; n++)
      t[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, s = t.length; n < s; n++)
      t[n].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, t) {
    const n = this.parent;
    if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) {
      const s = this.children;
      for (let r = 0, a = s.length; r < a; r++)
        s[r].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const s = {};
    s.uuid = this.uuid, s.type = this.type, this.name !== "" && (s.name = this.name), this.castShadow === !0 && (s.castShadow = !0), this.receiveShadow === !0 && (s.receiveShadow = !0), this.visible === !1 && (s.visible = !1), this.frustumCulled === !1 && (s.frustumCulled = !1), this.renderOrder !== 0 && (s.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (s.userData = this.userData), s.layers = this.layers.mask, s.matrix = this.matrix.toArray(), s.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (s.matrixAutoUpdate = !1), this.isInstancedMesh && (s.type = "InstancedMesh", s.count = this.count, s.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (s.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (s.type = "BatchedMesh", s.perObjectFrustumCulled = this.perObjectFrustumCulled, s.sortObjects = this.sortObjects, s.drawRanges = this._drawRanges, s.reservedRanges = this._reservedRanges, s.visibility = this._visibility, s.active = this._active, s.bounds = this._bounds.map((o) => ({
      boxInitialized: o.boxInitialized,
      boxMin: o.box.min.toArray(),
      boxMax: o.box.max.toArray(),
      sphereInitialized: o.sphereInitialized,
      sphereRadius: o.sphere.radius,
      sphereCenter: o.sphere.center.toArray()
    })), s.maxInstanceCount = this._maxInstanceCount, s.maxVertexCount = this._maxVertexCount, s.maxIndexCount = this._maxIndexCount, s.geometryInitialized = this._geometryInitialized, s.geometryCount = this._geometryCount, s.matricesTexture = this._matricesTexture.toJSON(e), this._colorsTexture !== null && (s.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (s.boundingSphere = {
      center: s.boundingSphere.center.toArray(),
      radius: s.boundingSphere.radius
    }), this.boundingBox !== null && (s.boundingBox = {
      min: s.boundingBox.min.toArray(),
      max: s.boundingBox.max.toArray()
    }));
    function r(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? s.background = this.background.toJSON() : this.background.isTexture && (s.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (s.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      s.geometry = r(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l))
          for (let c = 0, h = l.length; c < h; c++) {
            const u = l[c];
            r(e.shapes, u);
          }
        else
          r(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(e.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          o.push(r(e.materials, this.material[l]));
        s.material = o;
      } else
        s.material = r(e.materials, this.material);
    if (this.children.length > 0) {
      s.children = [];
      for (let o = 0; o < this.children.length; o++)
        s.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      s.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        s.animations.push(r(e.animations, l));
      }
    }
    if (t) {
      const o = a(e.geometries), l = a(e.materials), c = a(e.textures), h = a(e.images), u = a(e.shapes), d = a(e.skeletons), p = a(e.animations), g = a(e.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), u.length > 0 && (n.shapes = u), d.length > 0 && (n.skeletons = d), p.length > 0 && (n.animations = p), g.length > 0 && (n.nodes = g);
    }
    return n.object = s, n;
    function a(o) {
      const l = [];
      for (const c in o) {
        const h = o[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const s = e.children[n];
        this.add(s.clone());
      }
    return this;
  }
}
ot.DEFAULT_UP = /* @__PURE__ */ new A(0, 1, 0);
ot.DEFAULT_MATRIX_AUTO_UPDATE = !0;
ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const Kt = /* @__PURE__ */ new A(), xn = /* @__PURE__ */ new A(), ia = /* @__PURE__ */ new A(), Mn = /* @__PURE__ */ new A(), Ei = /* @__PURE__ */ new A(), Ti = /* @__PURE__ */ new A(), ql = /* @__PURE__ */ new A(), sa = /* @__PURE__ */ new A(), ra = /* @__PURE__ */ new A(), aa = /* @__PURE__ */ new A(), oa = /* @__PURE__ */ new Ye(), la = /* @__PURE__ */ new Ye(), ca = /* @__PURE__ */ new Ye();
class Wt {
  constructor(e = new A(), t = new A(), n = new A()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, s) {
    s.subVectors(n, t), Kt.subVectors(e, t), s.cross(Kt);
    const r = s.lengthSq();
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, t, n, s, r) {
    Kt.subVectors(s, t), xn.subVectors(n, t), ia.subVectors(e, t);
    const a = Kt.dot(Kt), o = Kt.dot(xn), l = Kt.dot(ia), c = xn.dot(xn), h = xn.dot(ia), u = a * c - o * o;
    if (u === 0)
      return r.set(0, 0, 0), null;
    const d = 1 / u, p = (c * l - o * h) * d, g = (a * h - o * l) * d;
    return r.set(1 - p - g, g, p);
  }
  static containsPoint(e, t, n, s) {
    return this.getBarycoord(e, t, n, s, Mn) === null ? !1 : Mn.x >= 0 && Mn.y >= 0 && Mn.x + Mn.y <= 1;
  }
  static getInterpolation(e, t, n, s, r, a, o, l) {
    return this.getBarycoord(e, t, n, s, Mn) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(r, Mn.x), l.addScaledVector(a, Mn.y), l.addScaledVector(o, Mn.z), l);
  }
  static getInterpolatedAttribute(e, t, n, s, r, a) {
    return oa.setScalar(0), la.setScalar(0), ca.setScalar(0), oa.fromBufferAttribute(e, t), la.fromBufferAttribute(e, n), ca.fromBufferAttribute(e, s), a.setScalar(0), a.addScaledVector(oa, r.x), a.addScaledVector(la, r.y), a.addScaledVector(ca, r.z), a;
  }
  static isFrontFacing(e, t, n, s) {
    return Kt.subVectors(n, t), xn.subVectors(e, t), Kt.cross(xn).dot(s) < 0;
  }
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  setFromPointsAndIndices(e, t, n, s) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[s]), this;
  }
  setFromAttributeAndIndices(e, t, n, s) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, s), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return Kt.subVectors(this.c, this.b), xn.subVectors(this.a, this.b), Kt.cross(xn).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Wt.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Wt.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, n, s, r) {
    return Wt.getInterpolation(e, this.a, this.b, this.c, t, n, s, r);
  }
  containsPoint(e) {
    return Wt.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Wt.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a, s = this.b, r = this.c;
    let a, o;
    Ei.subVectors(s, n), Ti.subVectors(r, n), sa.subVectors(e, n);
    const l = Ei.dot(sa), c = Ti.dot(sa);
    if (l <= 0 && c <= 0)
      return t.copy(n);
    ra.subVectors(e, s);
    const h = Ei.dot(ra), u = Ti.dot(ra);
    if (h >= 0 && u <= h)
      return t.copy(s);
    const d = l * u - h * c;
    if (d <= 0 && l >= 0 && h <= 0)
      return a = l / (l - h), t.copy(n).addScaledVector(Ei, a);
    aa.subVectors(e, r);
    const p = Ei.dot(aa), g = Ti.dot(aa);
    if (g >= 0 && p <= g)
      return t.copy(r);
    const _ = p * c - l * g;
    if (_ <= 0 && c >= 0 && g <= 0)
      return o = c / (c - g), t.copy(n).addScaledVector(Ti, o);
    const m = h * g - p * u;
    if (m <= 0 && u - h >= 0 && p - g >= 0)
      return ql.subVectors(r, s), o = (u - h) / (u - h + (p - g)), t.copy(s).addScaledVector(ql, o);
    const f = 1 / (m + _ + d);
    return a = _ * f, o = d * f, t.copy(n).addScaledVector(Ei, a).addScaledVector(Ti, o);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const Dh = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Bn = { h: 0, s: 0, l: 0 }, Ys = { h: 0, s: 0, l: 0 };
function ha(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class Ee {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const s = e;
      s && s.isColor ? this.copy(s) : typeof s == "number" ? this.setHex(s) : typeof s == "string" && this.setStyle(s);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = xt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, ke.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, n, s = ke.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, ke.toWorkingColorSpace(this, s), this;
  }
  setHSL(e, t, n, s = ke.workingColorSpace) {
    if (e = zo(e, 1), t = Mt(t, 0, 1), n = Mt(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + t) : n + t - n * t, a = 2 * n - r;
      this.r = ha(a, r, e + 1 / 3), this.g = ha(a, r, e), this.b = ha(a, r, e - 1 / 3);
    }
    return ke.toWorkingColorSpace(this, s), this;
  }
  setStyle(e, t = xt) {
    function n(r) {
      r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let s;
    if (s = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let r;
      const a = s[1], o = s[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(r[4]), this.setRGB(
              Math.min(255, parseInt(r[1], 10)) / 255,
              Math.min(255, parseInt(r[2], 10)) / 255,
              Math.min(255, parseInt(r[3], 10)) / 255,
              t
            );
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(r[4]), this.setRGB(
              Math.min(100, parseInt(r[1], 10)) / 100,
              Math.min(100, parseInt(r[2], 10)) / 100,
              Math.min(100, parseInt(r[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(r[4]), this.setHSL(
              parseFloat(r[1]) / 360,
              parseFloat(r[2]) / 100,
              parseFloat(r[3]) / 100,
              t
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (s = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const r = s[1], a = r.length;
      if (a === 3)
        return this.setRGB(
          parseInt(r.charAt(0), 16) / 15,
          parseInt(r.charAt(1), 16) / 15,
          parseInt(r.charAt(2), 16) / 15,
          t
        );
      if (a === 6)
        return this.setHex(parseInt(r, 16), t);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = xt) {
    const n = Dh[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = Rn(e.r), this.g = Rn(e.g), this.b = Rn(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = Bi(e.r), this.g = Bi(e.g), this.b = Bi(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = xt) {
    return ke.fromWorkingColorSpace(Et.copy(this), e), Math.round(Mt(Et.r * 255, 0, 255)) * 65536 + Math.round(Mt(Et.g * 255, 0, 255)) * 256 + Math.round(Mt(Et.b * 255, 0, 255));
  }
  getHexString(e = xt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = ke.workingColorSpace) {
    ke.fromWorkingColorSpace(Et.copy(this), t);
    const n = Et.r, s = Et.g, r = Et.b, a = Math.max(n, s, r), o = Math.min(n, s, r);
    let l, c;
    const h = (o + a) / 2;
    if (o === a)
      l = 0, c = 0;
    else {
      const u = a - o;
      switch (c = h <= 0.5 ? u / (a + o) : u / (2 - a - o), a) {
        case n:
          l = (s - r) / u + (s < r ? 6 : 0);
          break;
        case s:
          l = (r - n) / u + 2;
          break;
        case r:
          l = (n - s) / u + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = c, e.l = h, e;
  }
  getRGB(e, t = ke.workingColorSpace) {
    return ke.fromWorkingColorSpace(Et.copy(this), t), e.r = Et.r, e.g = Et.g, e.b = Et.b, e;
  }
  getStyle(e = xt) {
    ke.fromWorkingColorSpace(Et.copy(this), e);
    const t = Et.r, n = Et.g, s = Et.b;
    return e !== xt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(Bn), this.setHSL(Bn.h + e, Bn.s + t, Bn.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(Bn), e.getHSL(Ys);
    const n = Ts(Bn.h, Ys.h, t), s = Ts(Bn.s, Ys.s, t), r = Ts(Bn.l, Ys.l, t);
    return this.setHSL(n, s, r), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, n = this.g, s = this.b, r = e.elements;
    return this.r = r[0] * t + r[3] * n + r[6] * s, this.g = r[1] * t + r[4] * n + r[7] * s, this.b = r[2] * t + r[5] * n + r[8] * s, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const Et = /* @__PURE__ */ new Ee();
Ee.NAMES = Dh;
let ef = 0;
class tn extends pi {
  static get type() {
    return "Material";
  }
  get type() {
    return this.constructor.type;
  }
  set type(e) {
  }
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: ef++ }), this.uuid = en(), this.name = "", this.blending = Ni, this.side = Cn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = La, this.blendDst = Da, this.blendEquation = ai, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Ee(0, 0, 0), this.blendAlpha = 0, this.depthFunc = Vi, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = Ll, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = gi, this.stencilZFail = gi, this.stencilZPass = gi, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const s = this[t];
        if (s === void 0) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        s && s.isColor ? s.set(n) : s && s.isVector3 && n && n.isVector3 ? s.copy(n) : this[t] = n;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== Ni && (n.blending = this.blending), this.side !== Cn && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== La && (n.blendSrc = this.blendSrc), this.blendDst !== Da && (n.blendDst = this.blendDst), this.blendEquation !== ai && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== Vi && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== Ll && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== gi && (n.stencilFail = this.stencilFail), this.stencilZFail !== gi && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== gi && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function s(r) {
      const a = [];
      for (const o in r) {
        const l = r[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (t) {
      const r = s(e.textures), a = s(e.images);
      r.length > 0 && (n.textures = r), a.length > 0 && (n.images = a);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const s = t.length;
      n = new Array(s);
      for (let r = 0; r !== s; ++r)
        n[r] = t[r].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class An extends tn {
  static get type() {
    return "MeshBasicMaterial";
  }
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.color = new Ee(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new cn(), this.combine = fh, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const ut = /* @__PURE__ */ new A(), qs = /* @__PURE__ */ new Te();
class Pt {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = go, this.updateRanges = [], this.gpuType = Qt, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let s = 0, r = this.itemSize; s < r; s++)
      this.array[e + s] = t.array[n + s];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        qs.fromBufferAttribute(this, t), qs.applyMatrix3(e), this.setXY(t, qs.x, qs.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        ut.fromBufferAttribute(this, t), ut.applyMatrix3(e), this.setXYZ(t, ut.x, ut.y, ut.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ut.fromBufferAttribute(this, t), ut.applyMatrix4(e), this.setXYZ(t, ut.x, ut.y, ut.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ut.fromBufferAttribute(this, t), ut.applyNormalMatrix(e), this.setXYZ(t, ut.x, ut.y, ut.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ut.fromBufferAttribute(this, t), ut.transformDirection(e), this.setXYZ(t, ut.x, ut.y, ut.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = Jt(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = Ze(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Jt(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Jt(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Jt(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Jt(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, s) {
    return e *= this.itemSize, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array), s = Ze(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = s, this;
  }
  setXYZW(e, t, n, s, r) {
    return e *= this.itemSize, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array), s = Ze(s, this.array), r = Ze(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = s, this.array[e + 3] = r, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== go && (e.usage = this.usage), e;
  }
}
class Ih extends Pt {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class Uh extends Pt {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class on extends Pt {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
let tf = 0;
const Vt = /* @__PURE__ */ new Ce(), ua = /* @__PURE__ */ new ot(), Ai = /* @__PURE__ */ new A(), Bt = /* @__PURE__ */ new Tt(), ps = /* @__PURE__ */ new Tt(), _t = /* @__PURE__ */ new A();
class sn extends pi {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: tf++ }), this.uuid = en(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (Ch(e) ? Uh : Ih)(e, 1) : this.index = e, this;
  }
  setIndirect(e) {
    return this.indirect = e, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const r = new De().getNormalMatrix(e);
      n.applyNormalMatrix(r), n.needsUpdate = !0;
    }
    const s = this.attributes.tangent;
    return s !== void 0 && (s.transformDirection(e), s.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return Vt.makeRotationFromQuaternion(e), this.applyMatrix4(Vt), this;
  }
  rotateX(e) {
    return Vt.makeRotationX(e), this.applyMatrix4(Vt), this;
  }
  rotateY(e) {
    return Vt.makeRotationY(e), this.applyMatrix4(Vt), this;
  }
  rotateZ(e) {
    return Vt.makeRotationZ(e), this.applyMatrix4(Vt), this;
  }
  translate(e, t, n) {
    return Vt.makeTranslation(e, t, n), this.applyMatrix4(Vt), this;
  }
  scale(e, t, n) {
    return Vt.makeScale(e, t, n), this.applyMatrix4(Vt), this;
  }
  lookAt(e) {
    return ua.lookAt(e), ua.updateMatrix(), this.applyMatrix4(ua.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Ai).negate(), this.translate(Ai.x, Ai.y, Ai.z), this;
  }
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const n = [];
      for (let s = 0, r = e.length; s < r; s++) {
        const a = e[s];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new on(n, 3));
    } else {
      for (let n = 0, s = t.count; n < s; n++) {
        const r = e[n];
        t.setXYZ(n, r.x, r.y, r.z || 0);
      }
      e.length > t.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Tt());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new A(-1 / 0, -1 / 0, -1 / 0),
        new A(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, s = t.length; n < s; n++) {
          const r = t[n];
          Bt.setFromBufferAttribute(r), this.morphTargetsRelative ? (_t.addVectors(this.boundingBox.min, Bt.min), this.boundingBox.expandByPoint(_t), _t.addVectors(this.boundingBox.max, Bt.max), this.boundingBox.expandByPoint(_t)) : (this.boundingBox.expandByPoint(Bt.min), this.boundingBox.expandByPoint(Bt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new un());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new A(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Bt.setFromBufferAttribute(e), t)
        for (let r = 0, a = t.length; r < a; r++) {
          const o = t[r];
          ps.setFromBufferAttribute(o), this.morphTargetsRelative ? (_t.addVectors(Bt.min, ps.min), Bt.expandByPoint(_t), _t.addVectors(Bt.max, ps.max), Bt.expandByPoint(_t)) : (Bt.expandByPoint(ps.min), Bt.expandByPoint(ps.max));
        }
      Bt.getCenter(n);
      let s = 0;
      for (let r = 0, a = e.count; r < a; r++)
        _t.fromBufferAttribute(e, r), s = Math.max(s, n.distanceToSquared(_t));
      if (t)
        for (let r = 0, a = t.length; r < a; r++) {
          const o = t[r], l = this.morphTargetsRelative;
          for (let c = 0, h = o.count; c < h; c++)
            _t.fromBufferAttribute(o, c), l && (Ai.fromBufferAttribute(e, c), _t.add(Ai)), s = Math.max(s, n.distanceToSquared(_t));
        }
      this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.position, s = t.normal, r = t.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Pt(new Float32Array(4 * n.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let U = 0; U < n.count; U++)
      o[U] = new A(), l[U] = new A();
    const c = new A(), h = new A(), u = new A(), d = new Te(), p = new Te(), g = new Te(), _ = new A(), m = new A();
    function f(U, S, y) {
      c.fromBufferAttribute(n, U), h.fromBufferAttribute(n, S), u.fromBufferAttribute(n, y), d.fromBufferAttribute(r, U), p.fromBufferAttribute(r, S), g.fromBufferAttribute(r, y), h.sub(c), u.sub(c), p.sub(d), g.sub(d);
      const C = 1 / (p.x * g.y - g.x * p.y);
      isFinite(C) && (_.copy(h).multiplyScalar(g.y).addScaledVector(u, -p.y).multiplyScalar(C), m.copy(u).multiplyScalar(p.x).addScaledVector(h, -g.x).multiplyScalar(C), o[U].add(_), o[S].add(_), o[y].add(_), l[U].add(m), l[S].add(m), l[y].add(m));
    }
    let T = this.groups;
    T.length === 0 && (T = [{
      start: 0,
      count: e.count
    }]);
    for (let U = 0, S = T.length; U < S; ++U) {
      const y = T[U], C = y.start, X = y.count;
      for (let z = C, W = C + X; z < W; z += 3)
        f(
          e.getX(z + 0),
          e.getX(z + 1),
          e.getX(z + 2)
        );
    }
    const b = new A(), M = new A(), N = new A(), w = new A();
    function R(U) {
      N.fromBufferAttribute(s, U), w.copy(N);
      const S = o[U];
      b.copy(S), b.sub(N.multiplyScalar(N.dot(S))).normalize(), M.crossVectors(w, S);
      const C = M.dot(l[U]) < 0 ? -1 : 1;
      a.setXYZW(U, b.x, b.y, b.z, C);
    }
    for (let U = 0, S = T.length; U < S; ++U) {
      const y = T[U], C = y.start, X = y.count;
      for (let z = C, W = C + X; z < W; z += 3)
        R(e.getX(z + 0)), R(e.getX(z + 1)), R(e.getX(z + 2));
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Pt(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let d = 0, p = n.count; d < p; d++)
          n.setXYZ(d, 0, 0, 0);
      const s = new A(), r = new A(), a = new A(), o = new A(), l = new A(), c = new A(), h = new A(), u = new A();
      if (e)
        for (let d = 0, p = e.count; d < p; d += 3) {
          const g = e.getX(d + 0), _ = e.getX(d + 1), m = e.getX(d + 2);
          s.fromBufferAttribute(t, g), r.fromBufferAttribute(t, _), a.fromBufferAttribute(t, m), h.subVectors(a, r), u.subVectors(s, r), h.cross(u), o.fromBufferAttribute(n, g), l.fromBufferAttribute(n, _), c.fromBufferAttribute(n, m), o.add(h), l.add(h), c.add(h), n.setXYZ(g, o.x, o.y, o.z), n.setXYZ(_, l.x, l.y, l.z), n.setXYZ(m, c.x, c.y, c.z);
        }
      else
        for (let d = 0, p = t.count; d < p; d += 3)
          s.fromBufferAttribute(t, d + 0), r.fromBufferAttribute(t, d + 1), a.fromBufferAttribute(t, d + 2), h.subVectors(a, r), u.subVectors(s, r), h.cross(u), n.setXYZ(d + 0, h.x, h.y, h.z), n.setXYZ(d + 1, h.x, h.y, h.z), n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      _t.fromBufferAttribute(e, t), _t.normalize(), e.setXYZ(t, _t.x, _t.y, _t.z);
  }
  toNonIndexed() {
    function e(o, l) {
      const c = o.array, h = o.itemSize, u = o.normalized, d = new c.constructor(l.length * h);
      let p = 0, g = 0;
      for (let _ = 0, m = l.length; _ < m; _++) {
        o.isInterleavedBufferAttribute ? p = l[_] * o.data.stride + o.offset : p = l[_] * h;
        for (let f = 0; f < h; f++)
          d[g++] = c[p++];
      }
      return new Pt(d, h, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new sn(), n = this.index.array, s = this.attributes;
    for (const o in s) {
      const l = s[o], c = e(l, n);
      t.setAttribute(o, c);
    }
    const r = this.morphAttributes;
    for (const o in r) {
      const l = [], c = r[o];
      for (let h = 0, u = c.length; h < u; h++) {
        const d = c[h], p = e(d, n);
        l.push(p);
      }
      t.morphAttributes[o] = l;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      t.addGroup(c.start, c.count, c.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (e[c] = l[c]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      e.data.attributes[l] = c.toJSON(e.data);
    }
    const s = {};
    let r = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let u = 0, d = c.length; u < d; u++) {
        const p = c[u];
        h.push(p.toJSON(e.data));
      }
      h.length > 0 && (s[l] = h, r = !0);
    }
    r && (e.data.morphAttributes = s, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (e.data.boundingSphere = {
      center: o.center.toArray(),
      radius: o.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone(t));
    const s = e.attributes;
    for (const c in s) {
      const h = s[c];
      this.setAttribute(c, h.clone(t));
    }
    const r = e.morphAttributes;
    for (const c in r) {
      const h = [], u = r[c];
      for (let d = 0, p = u.length; d < p; d++)
        h.push(u[d].clone(t));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let c = 0, h = a.length; c < h; c++) {
      const u = a[c];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const jl = /* @__PURE__ */ new Ce(), ei = /* @__PURE__ */ new ns(), js = /* @__PURE__ */ new un(), Kl = /* @__PURE__ */ new A(), Ks = /* @__PURE__ */ new A(), Zs = /* @__PURE__ */ new A(), Js = /* @__PURE__ */ new A(), da = /* @__PURE__ */ new A(), Qs = /* @__PURE__ */ new A(), Zl = /* @__PURE__ */ new A(), er = /* @__PURE__ */ new A();
class pt extends ot {
  constructor(e = new sn(), t = new An()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const s = t[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, s = n.attributes.position, r = n.morphAttributes.position, a = n.morphTargetsRelative;
    t.fromBufferAttribute(s, e);
    const o = this.morphTargetInfluences;
    if (r && o) {
      Qs.set(0, 0, 0);
      for (let l = 0, c = r.length; l < c; l++) {
        const h = o[l], u = r[l];
        h !== 0 && (da.fromBufferAttribute(u, e), a ? Qs.addScaledVector(da, h) : Qs.addScaledVector(da.sub(t), h));
      }
      t.add(Qs);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, s = this.material, r = this.matrixWorld;
    s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), js.copy(n.boundingSphere), js.applyMatrix4(r), ei.copy(e.ray).recast(e.near), !(js.containsPoint(ei.origin) === !1 && (ei.intersectSphere(js, Kl) === null || ei.origin.distanceToSquared(Kl) > (e.far - e.near) ** 2)) && (jl.copy(r).invert(), ei.copy(e.ray).applyMatrix4(jl), !(n.boundingBox !== null && ei.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, ei)));
  }
  _computeIntersections(e, t, n) {
    let s;
    const r = this.geometry, a = this.material, o = r.index, l = r.attributes.position, c = r.attributes.uv, h = r.attributes.uv1, u = r.attributes.normal, d = r.groups, p = r.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let g = 0, _ = d.length; g < _; g++) {
          const m = d[g], f = a[m.materialIndex], T = Math.max(m.start, p.start), b = Math.min(o.count, Math.min(m.start + m.count, p.start + p.count));
          for (let M = T, N = b; M < N; M += 3) {
            const w = o.getX(M), R = o.getX(M + 1), U = o.getX(M + 2);
            s = tr(this, f, e, n, c, h, u, w, R, U), s && (s.faceIndex = Math.floor(M / 3), s.face.materialIndex = m.materialIndex, t.push(s));
          }
        }
      else {
        const g = Math.max(0, p.start), _ = Math.min(o.count, p.start + p.count);
        for (let m = g, f = _; m < f; m += 3) {
          const T = o.getX(m), b = o.getX(m + 1), M = o.getX(m + 2);
          s = tr(this, a, e, n, c, h, u, T, b, M), s && (s.faceIndex = Math.floor(m / 3), t.push(s));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(a))
        for (let g = 0, _ = d.length; g < _; g++) {
          const m = d[g], f = a[m.materialIndex], T = Math.max(m.start, p.start), b = Math.min(l.count, Math.min(m.start + m.count, p.start + p.count));
          for (let M = T, N = b; M < N; M += 3) {
            const w = M, R = M + 1, U = M + 2;
            s = tr(this, f, e, n, c, h, u, w, R, U), s && (s.faceIndex = Math.floor(M / 3), s.face.materialIndex = m.materialIndex, t.push(s));
          }
        }
      else {
        const g = Math.max(0, p.start), _ = Math.min(l.count, p.start + p.count);
        for (let m = g, f = _; m < f; m += 3) {
          const T = m, b = m + 1, M = m + 2;
          s = tr(this, a, e, n, c, h, u, T, b, M), s && (s.faceIndex = Math.floor(m / 3), t.push(s));
        }
      }
  }
}
function nf(i, e, t, n, s, r, a, o) {
  let l;
  if (e.side === Nt ? l = n.intersectTriangle(a, r, s, !0, o) : l = n.intersectTriangle(s, r, a, e.side === Cn, o), l === null) return null;
  er.copy(o), er.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo(er);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: er.clone(),
    object: i
  };
}
function tr(i, e, t, n, s, r, a, o, l, c) {
  i.getVertexPosition(o, Ks), i.getVertexPosition(l, Zs), i.getVertexPosition(c, Js);
  const h = nf(i, e, t, n, Ks, Zs, Js, Zl);
  if (h) {
    const u = new A();
    Wt.getBarycoord(Zl, Ks, Zs, Js, u), s && (h.uv = Wt.getInterpolatedAttribute(s, o, l, c, u, new Te())), r && (h.uv1 = Wt.getInterpolatedAttribute(r, o, l, c, u, new Te())), a && (h.normal = Wt.getInterpolatedAttribute(a, o, l, c, u, new A()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a: o,
      b: l,
      c,
      normal: new A(),
      materialIndex: 0
    };
    Wt.getNormal(Ks, Zs, Js, d.normal), h.face = d, h.barycoord = u;
  }
  return h;
}
class is extends sn {
  constructor(e = 1, t = 1, n = 1, s = 1, r = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: s,
      heightSegments: r,
      depthSegments: a
    };
    const o = this;
    s = Math.floor(s), r = Math.floor(r), a = Math.floor(a);
    const l = [], c = [], h = [], u = [];
    let d = 0, p = 0;
    g("z", "y", "x", -1, -1, n, t, e, a, r, 0), g("z", "y", "x", 1, -1, n, t, -e, a, r, 1), g("x", "z", "y", 1, 1, e, n, t, s, a, 2), g("x", "z", "y", 1, -1, e, n, -t, s, a, 3), g("x", "y", "z", 1, -1, e, t, n, s, r, 4), g("x", "y", "z", -1, -1, e, t, -n, s, r, 5), this.setIndex(l), this.setAttribute("position", new on(c, 3)), this.setAttribute("normal", new on(h, 3)), this.setAttribute("uv", new on(u, 2));
    function g(_, m, f, T, b, M, N, w, R, U, S) {
      const y = M / R, C = N / U, X = M / 2, z = N / 2, W = w / 2, K = R + 1, V = U + 1;
      let Q = 0, H = 0;
      const ie = new A();
      for (let ce = 0; ce < V; ce++) {
        const xe = ce * C - z;
        for (let Oe = 0; Oe < K; Oe++) {
          const tt = Oe * y - X;
          ie[_] = tt * T, ie[m] = xe * b, ie[f] = W, c.push(ie.x, ie.y, ie.z), ie[_] = 0, ie[m] = 0, ie[f] = w > 0 ? 1 : -1, h.push(ie.x, ie.y, ie.z), u.push(Oe / R), u.push(1 - ce / U), Q += 1;
        }
      }
      for (let ce = 0; ce < U; ce++)
        for (let xe = 0; xe < R; xe++) {
          const Oe = d + xe + K * ce, tt = d + xe + K * (ce + 1), $ = d + (xe + 1) + K * (ce + 1), ee = d + (xe + 1) + K * ce;
          l.push(Oe, tt, ee), l.push(tt, $, ee), H += 6;
        }
      o.addGroup(p, H, S), p += H, d += Q;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new is(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function ji(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const s = i[t][n];
      s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture || s.isQuaternion) ? s.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = s.clone() : Array.isArray(s) ? e[t][n] = s.slice() : e[t][n] = s;
    }
  }
  return e;
}
function wt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = ji(i[t]);
    for (const s in n)
      e[s] = n[s];
  }
  return e;
}
function sf(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function Nh(i) {
  const e = i.getRenderTarget();
  return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : ke.workingColorSpace;
}
const rf = { clone: ji, merge: wt };
var af = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, of = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class jn extends tn {
  static get type() {
    return "ShaderMaterial";
  }
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = af, this.fragmentShader = of, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = ji(e.uniforms), this.uniformsGroups = sf(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const s in this.uniforms) {
      const a = this.uniforms[s].value;
      a && a.isTexture ? t.uniforms[s] = {
        type: "t",
        value: a.toJSON(e).uuid
      } : a && a.isColor ? t.uniforms[s] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? t.uniforms[s] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? t.uniforms[s] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? t.uniforms[s] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? t.uniforms[s] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? t.uniforms[s] = {
        type: "m4",
        value: a.toArray()
      } : t.uniforms[s] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const s in this.extensions)
      this.extensions[s] === !0 && (n[s] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}
class Fh extends ot {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Ce(), this.projectionMatrix = new Ce(), this.projectionMatrixInverse = new Ce(), this.coordinateSystem = Tn;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const zn = /* @__PURE__ */ new A(), Jl = /* @__PURE__ */ new Te(), Ql = /* @__PURE__ */ new Te();
class Rt extends Fh {
  constructor(e = 50, t = 1, n = 0.1, s = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = s, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = qi * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(Oi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return qi * 2 * Math.atan(
      Math.tan(Oi * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   */
  getViewBounds(e, t, n) {
    zn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(zn.x, zn.y).multiplyScalar(-e / zn.z), zn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(zn.x, zn.y).multiplyScalar(-e / zn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, Jl, Ql), t.subVectors(Ql, Jl);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(e, t, n, s, r, a) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(Oi * 0.5 * this.fov) / this.zoom, n = 2 * t, s = this.aspect * n, r = -0.5 * s;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, c = a.fullHeight;
      r += a.offsetX * s / l, t -= a.offsetY * n / c, s *= a.width / l, n *= a.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (r += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + s, t, t - n, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const wi = -90, Ri = 1;
class lf extends ot {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const s = new Rt(wi, Ri, e, t);
    s.layers = this.layers, this.add(s);
    const r = new Rt(wi, Ri, e, t);
    r.layers = this.layers, this.add(r);
    const a = new Rt(wi, Ri, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Rt(wi, Ri, e, t);
    o.layers = this.layers, this.add(o);
    const l = new Rt(wi, Ri, e, t);
    l.layers = this.layers, this.add(l);
    const c = new Rt(wi, Ri, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, s, r, a, o, l] = t;
    for (const c of t) this.remove(c);
    if (e === Tn)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === Cr)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), s.up.set(0, -1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: s } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [r, a, o, l, c, h] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), p = e.getActiveMipmapLevel(), g = e.xr.enabled;
    e.xr.enabled = !1;
    const _ = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, s), e.render(t, r), e.setRenderTarget(n, 1, s), e.render(t, a), e.setRenderTarget(n, 2, s), e.render(t, o), e.setRenderTarget(n, 3, s), e.render(t, l), e.setRenderTarget(n, 4, s), e.render(t, c), n.texture.generateMipmaps = _, e.setRenderTarget(n, 5, s), e.render(t, h), e.setRenderTarget(u, d, p), e.xr.enabled = g, n.texture.needsPMREMUpdate = !0;
  }
}
class Oh extends vt {
  constructor(e, t, n, s, r, a, o, l, c, h) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : Gi, super(e, t, n, s, r, a, o, l, c, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class cf extends fi {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, s = [n, n, n, n, n, n];
    this.texture = new Oh(s, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : zt;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, s = new is(5, 5, 5), r = new jn({
      name: "CubemapFromEquirect",
      uniforms: ji(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: Nt,
      blending: Yn
    });
    r.uniforms.tEquirect.value = t;
    const a = new pt(s, r), o = t.minFilter;
    return t.minFilter === En && (t.minFilter = zt), new lf(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(e, t, n, s) {
    const r = e.getRenderTarget();
    for (let a = 0; a < 6; a++)
      e.setRenderTarget(this, a), e.clear(t, n, s);
    e.setRenderTarget(r);
  }
}
const fa = /* @__PURE__ */ new A(), hf = /* @__PURE__ */ new A(), uf = /* @__PURE__ */ new De();
class Hn {
  constructor(e = new A(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, n, s) {
    return this.normal.set(e, t, n), this.constant = s, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const s = fa.subVectors(n, t).cross(hf.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(s, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const n = e.delta(fa), s = this.normal.dot(n);
    if (s === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const r = -(e.start.dot(this.normal) + this.constant) / s;
    return r < 0 || r > 1 ? null : t.copy(e.start).addScaledVector(n, r);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || uf.getNormalMatrix(e), s = this.coplanarPoint(fa).applyMatrix4(e), r = this.normal.applyMatrix3(n).normalize();
    return this.constant = -s.dot(r), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const ti = /* @__PURE__ */ new un(), nr = /* @__PURE__ */ new A();
class Vo {
  constructor(e = new Hn(), t = new Hn(), n = new Hn(), s = new Hn(), r = new Hn(), a = new Hn()) {
    this.planes = [e, t, n, s, r, a];
  }
  set(e, t, n, s, r, a) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(s), o[4].copy(r), o[5].copy(a), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = Tn) {
    const n = this.planes, s = e.elements, r = s[0], a = s[1], o = s[2], l = s[3], c = s[4], h = s[5], u = s[6], d = s[7], p = s[8], g = s[9], _ = s[10], m = s[11], f = s[12], T = s[13], b = s[14], M = s[15];
    if (n[0].setComponents(l - r, d - c, m - p, M - f).normalize(), n[1].setComponents(l + r, d + c, m + p, M + f).normalize(), n[2].setComponents(l + a, d + h, m + g, M + T).normalize(), n[3].setComponents(l - a, d - h, m - g, M - T).normalize(), n[4].setComponents(l - o, d - u, m - _, M - b).normalize(), t === Tn)
      n[5].setComponents(l + o, d + u, m + _, M + b).normalize();
    else if (t === Cr)
      n[5].setComponents(o, u, _, b).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(ti);
  }
  intersectsSprite(e) {
    return ti.center.set(0, 0, 0), ti.radius = 0.7071067811865476, ti.applyMatrix4(e.matrixWorld), this.intersectsSphere(ti);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, s = -e.radius;
    for (let r = 0; r < 6; r++)
      if (t[r].distanceToPoint(n) < s)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const s = t[n];
      if (nr.x = s.normal.x > 0 ? e.max.x : e.min.x, nr.y = s.normal.y > 0 ? e.max.y : e.min.y, nr.z = s.normal.z > 0 ? e.max.z : e.min.z, s.distanceToPoint(nr) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function Bh() {
  let i = null, e = !1, t = null, n = null;
  function s(r, a) {
    t(r, a), n = i.requestAnimationFrame(s);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (n = i.requestAnimationFrame(s), e = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(r) {
      t = r;
    },
    setContext: function(r) {
      i = r;
    }
  };
}
function df(i) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(o, l) {
    const c = o.array, h = o.usage, u = c.byteLength, d = i.createBuffer();
    i.bindBuffer(l, d), i.bufferData(l, c, h), o.onUploadCallback();
    let p;
    if (c instanceof Float32Array)
      p = i.FLOAT;
    else if (c instanceof Uint16Array)
      o.isFloat16BufferAttribute ? p = i.HALF_FLOAT : p = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      p = i.SHORT;
    else if (c instanceof Uint32Array)
      p = i.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      p = i.INT;
    else if (c instanceof Int8Array)
      p = i.BYTE;
    else if (c instanceof Uint8Array)
      p = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      p = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: d,
      type: p,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: u
    };
  }
  function n(o, l, c) {
    const h = l.array, u = l.updateRanges;
    if (i.bindBuffer(c, o), u.length === 0)
      i.bufferSubData(c, 0, h);
    else {
      u.sort((p, g) => p.start - g.start);
      let d = 0;
      for (let p = 1; p < u.length; p++) {
        const g = u[d], _ = u[p];
        _.start <= g.start + g.count + 1 ? g.count = Math.max(
          g.count,
          _.start + _.count - g.start
        ) : (++d, u[d] = _);
      }
      u.length = d + 1;
      for (let p = 0, g = u.length; p < g; p++) {
        const _ = u[p];
        i.bufferSubData(
          c,
          _.start * h.BYTES_PER_ELEMENT,
          h,
          _.start,
          _.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function s(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), e.get(o);
  }
  function r(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = e.get(o);
    l && (i.deleteBuffer(l.buffer), e.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const h = e.get(o);
      (!h || h.version < o.version) && e.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = e.get(o);
    if (c === void 0)
      e.set(o, t(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: s,
    remove: r,
    update: a
  };
}
class Ki extends sn {
  constructor(e = 1, t = 1, n = 1, s = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: s
    };
    const r = e / 2, a = t / 2, o = Math.floor(n), l = Math.floor(s), c = o + 1, h = l + 1, u = e / o, d = t / l, p = [], g = [], _ = [], m = [];
    for (let f = 0; f < h; f++) {
      const T = f * d - a;
      for (let b = 0; b < c; b++) {
        const M = b * u - r;
        g.push(M, -T, 0), _.push(0, 0, 1), m.push(b / o), m.push(1 - f / l);
      }
    }
    for (let f = 0; f < l; f++)
      for (let T = 0; T < o; T++) {
        const b = T + c * f, M = T + c * (f + 1), N = T + 1 + c * (f + 1), w = T + 1 + c * f;
        p.push(b, M, w), p.push(M, N, w);
      }
    this.setIndex(p), this.setAttribute("position", new on(g, 3)), this.setAttribute("normal", new on(_, 3)), this.setAttribute("uv", new on(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Ki(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var ff = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, pf = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, mf = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, gf = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, _f = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, vf = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, xf = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Mf = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, yf = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, Sf = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, bf = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Ef = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Tf = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, Af = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, wf = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Rf = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, Cf = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Pf = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Lf = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Df = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, If = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Uf = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, Nf = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, Ff = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Of = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Bf = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, zf = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, kf = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Hf = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Vf = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Gf = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Wf = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, $f = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Xf = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Yf = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, qf = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, jf = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Kf = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Zf = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Jf = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Qf = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, ep = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, tp = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, np = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, ip = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, sp = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, rp = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, ap = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, op = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, lp = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, cp = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, hp = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, up = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, dp = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, fp = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, pp = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, mp = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, gp = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, _p = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, vp = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, xp = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Mp = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, yp = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, Sp = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, bp = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Ep = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Tp = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Ap = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, wp = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Rp = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, Cp = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Pp = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Lp = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Dp = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Ip = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Up = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Np = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Fp = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Op = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Bp = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, zp = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, kp = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Hp = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, Vp = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Gp = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Wp = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, $p = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Xp = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Yp = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, qp = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, jp = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Kp = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Zp = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Jp = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Qp = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, em = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, tm = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, nm = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, im = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, sm = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, rm = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, am = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, om = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, lm = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, cm = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, hm = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, um = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const dm = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, fm = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, pm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, mm = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, gm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, _m = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, vm = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, xm = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, Mm = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, ym = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, Sm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, bm = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Em = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Tm = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Am = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, wm = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Rm = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Cm = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Pm = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Lm = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Dm = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Im = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, Um = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Nm = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Fm = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Om = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Bm = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, zm = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, km = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Hm = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Vm = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Gm = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Wm = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, $m = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ue = {
  alphahash_fragment: ff,
  alphahash_pars_fragment: pf,
  alphamap_fragment: mf,
  alphamap_pars_fragment: gf,
  alphatest_fragment: _f,
  alphatest_pars_fragment: vf,
  aomap_fragment: xf,
  aomap_pars_fragment: Mf,
  batching_pars_vertex: yf,
  batching_vertex: Sf,
  begin_vertex: bf,
  beginnormal_vertex: Ef,
  bsdfs: Tf,
  iridescence_fragment: Af,
  bumpmap_pars_fragment: wf,
  clipping_planes_fragment: Rf,
  clipping_planes_pars_fragment: Cf,
  clipping_planes_pars_vertex: Pf,
  clipping_planes_vertex: Lf,
  color_fragment: Df,
  color_pars_fragment: If,
  color_pars_vertex: Uf,
  color_vertex: Nf,
  common: Ff,
  cube_uv_reflection_fragment: Of,
  defaultnormal_vertex: Bf,
  displacementmap_pars_vertex: zf,
  displacementmap_vertex: kf,
  emissivemap_fragment: Hf,
  emissivemap_pars_fragment: Vf,
  colorspace_fragment: Gf,
  colorspace_pars_fragment: Wf,
  envmap_fragment: $f,
  envmap_common_pars_fragment: Xf,
  envmap_pars_fragment: Yf,
  envmap_pars_vertex: qf,
  envmap_physical_pars_fragment: rp,
  envmap_vertex: jf,
  fog_vertex: Kf,
  fog_pars_vertex: Zf,
  fog_fragment: Jf,
  fog_pars_fragment: Qf,
  gradientmap_pars_fragment: ep,
  lightmap_pars_fragment: tp,
  lights_lambert_fragment: np,
  lights_lambert_pars_fragment: ip,
  lights_pars_begin: sp,
  lights_toon_fragment: ap,
  lights_toon_pars_fragment: op,
  lights_phong_fragment: lp,
  lights_phong_pars_fragment: cp,
  lights_physical_fragment: hp,
  lights_physical_pars_fragment: up,
  lights_fragment_begin: dp,
  lights_fragment_maps: fp,
  lights_fragment_end: pp,
  logdepthbuf_fragment: mp,
  logdepthbuf_pars_fragment: gp,
  logdepthbuf_pars_vertex: _p,
  logdepthbuf_vertex: vp,
  map_fragment: xp,
  map_pars_fragment: Mp,
  map_particle_fragment: yp,
  map_particle_pars_fragment: Sp,
  metalnessmap_fragment: bp,
  metalnessmap_pars_fragment: Ep,
  morphinstance_vertex: Tp,
  morphcolor_vertex: Ap,
  morphnormal_vertex: wp,
  morphtarget_pars_vertex: Rp,
  morphtarget_vertex: Cp,
  normal_fragment_begin: Pp,
  normal_fragment_maps: Lp,
  normal_pars_fragment: Dp,
  normal_pars_vertex: Ip,
  normal_vertex: Up,
  normalmap_pars_fragment: Np,
  clearcoat_normal_fragment_begin: Fp,
  clearcoat_normal_fragment_maps: Op,
  clearcoat_pars_fragment: Bp,
  iridescence_pars_fragment: zp,
  opaque_fragment: kp,
  packing: Hp,
  premultiplied_alpha_fragment: Vp,
  project_vertex: Gp,
  dithering_fragment: Wp,
  dithering_pars_fragment: $p,
  roughnessmap_fragment: Xp,
  roughnessmap_pars_fragment: Yp,
  shadowmap_pars_fragment: qp,
  shadowmap_pars_vertex: jp,
  shadowmap_vertex: Kp,
  shadowmask_pars_fragment: Zp,
  skinbase_vertex: Jp,
  skinning_pars_vertex: Qp,
  skinning_vertex: em,
  skinnormal_vertex: tm,
  specularmap_fragment: nm,
  specularmap_pars_fragment: im,
  tonemapping_fragment: sm,
  tonemapping_pars_fragment: rm,
  transmission_fragment: am,
  transmission_pars_fragment: om,
  uv_pars_fragment: lm,
  uv_pars_vertex: cm,
  uv_vertex: hm,
  worldpos_vertex: um,
  background_vert: dm,
  background_frag: fm,
  backgroundCube_vert: pm,
  backgroundCube_frag: mm,
  cube_vert: gm,
  cube_frag: _m,
  depth_vert: vm,
  depth_frag: xm,
  distanceRGBA_vert: Mm,
  distanceRGBA_frag: ym,
  equirect_vert: Sm,
  equirect_frag: bm,
  linedashed_vert: Em,
  linedashed_frag: Tm,
  meshbasic_vert: Am,
  meshbasic_frag: wm,
  meshlambert_vert: Rm,
  meshlambert_frag: Cm,
  meshmatcap_vert: Pm,
  meshmatcap_frag: Lm,
  meshnormal_vert: Dm,
  meshnormal_frag: Im,
  meshphong_vert: Um,
  meshphong_frag: Nm,
  meshphysical_vert: Fm,
  meshphysical_frag: Om,
  meshtoon_vert: Bm,
  meshtoon_frag: zm,
  points_vert: km,
  points_frag: Hm,
  shadow_vert: Vm,
  shadow_frag: Gm,
  sprite_vert: Wm,
  sprite_frag: $m
}, te = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Ee(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new De() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new De() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new De() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new De() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new De() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new De() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new De() },
    normalScale: { value: /* @__PURE__ */ new Te(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new De() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new De() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new De() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new De() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Ee(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Ee(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new De() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Ee(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Te(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new De() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 }
  }
}, an = {
  basic: {
    uniforms: /* @__PURE__ */ wt([
      te.common,
      te.specularmap,
      te.envmap,
      te.aomap,
      te.lightmap,
      te.fog
    ]),
    vertexShader: Ue.meshbasic_vert,
    fragmentShader: Ue.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ wt([
      te.common,
      te.specularmap,
      te.envmap,
      te.aomap,
      te.lightmap,
      te.emissivemap,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      te.fog,
      te.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ee(0) }
      }
    ]),
    vertexShader: Ue.meshlambert_vert,
    fragmentShader: Ue.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ wt([
      te.common,
      te.specularmap,
      te.envmap,
      te.aomap,
      te.lightmap,
      te.emissivemap,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      te.fog,
      te.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ee(0) },
        specular: { value: /* @__PURE__ */ new Ee(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Ue.meshphong_vert,
    fragmentShader: Ue.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ wt([
      te.common,
      te.envmap,
      te.aomap,
      te.lightmap,
      te.emissivemap,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      te.roughnessmap,
      te.metalnessmap,
      te.fog,
      te.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ee(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphysical_vert,
    fragmentShader: Ue.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ wt([
      te.common,
      te.aomap,
      te.lightmap,
      te.emissivemap,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      te.gradientmap,
      te.fog,
      te.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ee(0) }
      }
    ]),
    vertexShader: Ue.meshtoon_vert,
    fragmentShader: Ue.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ wt([
      te.common,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      te.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Ue.meshmatcap_vert,
    fragmentShader: Ue.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ wt([
      te.points,
      te.fog
    ]),
    vertexShader: Ue.points_vert,
    fragmentShader: Ue.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ wt([
      te.common,
      te.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ue.linedashed_vert,
    fragmentShader: Ue.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ wt([
      te.common,
      te.displacementmap
    ]),
    vertexShader: Ue.depth_vert,
    fragmentShader: Ue.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ wt([
      te.common,
      te.bumpmap,
      te.normalmap,
      te.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshnormal_vert,
    fragmentShader: Ue.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ wt([
      te.sprite,
      te.fog
    ]),
    vertexShader: Ue.sprite_vert,
    fragmentShader: Ue.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new De() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ue.background_vert,
    fragmentShader: Ue.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new De() }
    },
    vertexShader: Ue.backgroundCube_vert,
    fragmentShader: Ue.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ue.cube_vert,
    fragmentShader: Ue.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Ue.equirect_vert,
    fragmentShader: Ue.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ wt([
      te.common,
      te.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new A() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ue.distanceRGBA_vert,
    fragmentShader: Ue.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ wt([
      te.lights,
      te.fog,
      {
        color: { value: /* @__PURE__ */ new Ee(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.shadow_vert,
    fragmentShader: Ue.shadow_frag
  }
};
an.physical = {
  uniforms: /* @__PURE__ */ wt([
    an.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new De() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new De() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Te(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new De() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new De() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new De() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Ee(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new De() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new De() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new De() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new Te() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new De() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Ee(0) },
      specularColor: { value: /* @__PURE__ */ new Ee(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new De() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new De() },
      anisotropyVector: { value: /* @__PURE__ */ new Te() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new De() }
    }
  ]),
  vertexShader: Ue.meshphysical_vert,
  fragmentShader: Ue.meshphysical_frag
};
const ir = { r: 0, b: 0, g: 0 }, ni = /* @__PURE__ */ new cn(), Xm = /* @__PURE__ */ new Ce();
function Ym(i, e, t, n, s, r, a) {
  const o = new Ee(0);
  let l = r === !0 ? 0 : 1, c, h, u = null, d = 0, p = null;
  function g(T) {
    let b = T.isScene === !0 ? T.background : null;
    return b && b.isTexture && (b = (T.backgroundBlurriness > 0 ? t : e).get(b)), b;
  }
  function _(T) {
    let b = !1;
    const M = g(T);
    M === null ? f(o, l) : M && M.isColor && (f(M, 1), b = !0);
    const N = i.xr.getEnvironmentBlendMode();
    N === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : N === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || b) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function m(T, b) {
    const M = g(b);
    M && (M.isCubeTexture || M.mapping === Ir) ? (h === void 0 && (h = new pt(
      new is(1, 1, 1),
      new jn({
        name: "BackgroundCubeMaterial",
        uniforms: ji(an.backgroundCube.uniforms),
        vertexShader: an.backgroundCube.vertexShader,
        fragmentShader: an.backgroundCube.fragmentShader,
        side: Nt,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(N, w, R) {
      this.matrixWorld.copyPosition(R.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), s.update(h)), ni.copy(b.backgroundRotation), ni.x *= -1, ni.y *= -1, ni.z *= -1, M.isCubeTexture && M.isRenderTargetTexture === !1 && (ni.y *= -1, ni.z *= -1), h.material.uniforms.envMap.value = M, h.material.uniforms.flipEnvMap.value = M.isCubeTexture && M.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = b.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = b.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(Xm.makeRotationFromEuler(ni)), h.material.toneMapped = ke.getTransfer(M.colorSpace) !== Qe, (u !== M || d !== M.version || p !== i.toneMapping) && (h.material.needsUpdate = !0, u = M, d = M.version, p = i.toneMapping), h.layers.enableAll(), T.unshift(h, h.geometry, h.material, 0, 0, null)) : M && M.isTexture && (c === void 0 && (c = new pt(
      new Ki(2, 2),
      new jn({
        name: "BackgroundMaterial",
        uniforms: ji(an.background.uniforms),
        vertexShader: an.background.vertexShader,
        fragmentShader: an.background.fragmentShader,
        side: Cn,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), s.update(c)), c.material.uniforms.t2D.value = M, c.material.uniforms.backgroundIntensity.value = b.backgroundIntensity, c.material.toneMapped = ke.getTransfer(M.colorSpace) !== Qe, M.matrixAutoUpdate === !0 && M.updateMatrix(), c.material.uniforms.uvTransform.value.copy(M.matrix), (u !== M || d !== M.version || p !== i.toneMapping) && (c.material.needsUpdate = !0, u = M, d = M.version, p = i.toneMapping), c.layers.enableAll(), T.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function f(T, b) {
    T.getRGB(ir, Nh(i)), n.buffers.color.setClear(ir.r, ir.g, ir.b, b, a);
  }
  return {
    getClearColor: function() {
      return o;
    },
    setClearColor: function(T, b = 1) {
      o.set(T), l = b, f(o, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(T) {
      l = T, f(o, l);
    },
    render: _,
    addToRenderList: m
  };
}
function qm(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, s = d(null);
  let r = s, a = !1;
  function o(y, C, X, z, W) {
    let K = !1;
    const V = u(z, X, C);
    r !== V && (r = V, c(r.object)), K = p(y, z, X, W), K && g(y, z, X, W), W !== null && e.update(W, i.ELEMENT_ARRAY_BUFFER), (K || a) && (a = !1, M(y, C, X, z), W !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(W).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(y) {
    return i.bindVertexArray(y);
  }
  function h(y) {
    return i.deleteVertexArray(y);
  }
  function u(y, C, X) {
    const z = X.wireframe === !0;
    let W = n[y.id];
    W === void 0 && (W = {}, n[y.id] = W);
    let K = W[C.id];
    K === void 0 && (K = {}, W[C.id] = K);
    let V = K[z];
    return V === void 0 && (V = d(l()), K[z] = V), V;
  }
  function d(y) {
    const C = [], X = [], z = [];
    for (let W = 0; W < t; W++)
      C[W] = 0, X[W] = 0, z[W] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: C,
      enabledAttributes: X,
      attributeDivisors: z,
      object: y,
      attributes: {},
      index: null
    };
  }
  function p(y, C, X, z) {
    const W = r.attributes, K = C.attributes;
    let V = 0;
    const Q = X.getAttributes();
    for (const H in Q)
      if (Q[H].location >= 0) {
        const ce = W[H];
        let xe = K[H];
        if (xe === void 0 && (H === "instanceMatrix" && y.instanceMatrix && (xe = y.instanceMatrix), H === "instanceColor" && y.instanceColor && (xe = y.instanceColor)), ce === void 0 || ce.attribute !== xe || xe && ce.data !== xe.data) return !0;
        V++;
      }
    return r.attributesNum !== V || r.index !== z;
  }
  function g(y, C, X, z) {
    const W = {}, K = C.attributes;
    let V = 0;
    const Q = X.getAttributes();
    for (const H in Q)
      if (Q[H].location >= 0) {
        let ce = K[H];
        ce === void 0 && (H === "instanceMatrix" && y.instanceMatrix && (ce = y.instanceMatrix), H === "instanceColor" && y.instanceColor && (ce = y.instanceColor));
        const xe = {};
        xe.attribute = ce, ce && ce.data && (xe.data = ce.data), W[H] = xe, V++;
      }
    r.attributes = W, r.attributesNum = V, r.index = z;
  }
  function _() {
    const y = r.newAttributes;
    for (let C = 0, X = y.length; C < X; C++)
      y[C] = 0;
  }
  function m(y) {
    f(y, 0);
  }
  function f(y, C) {
    const X = r.newAttributes, z = r.enabledAttributes, W = r.attributeDivisors;
    X[y] = 1, z[y] === 0 && (i.enableVertexAttribArray(y), z[y] = 1), W[y] !== C && (i.vertexAttribDivisor(y, C), W[y] = C);
  }
  function T() {
    const y = r.newAttributes, C = r.enabledAttributes;
    for (let X = 0, z = C.length; X < z; X++)
      C[X] !== y[X] && (i.disableVertexAttribArray(X), C[X] = 0);
  }
  function b(y, C, X, z, W, K, V) {
    V === !0 ? i.vertexAttribIPointer(y, C, X, W, K) : i.vertexAttribPointer(y, C, X, z, W, K);
  }
  function M(y, C, X, z) {
    _();
    const W = z.attributes, K = X.getAttributes(), V = C.defaultAttributeValues;
    for (const Q in K) {
      const H = K[Q];
      if (H.location >= 0) {
        let ie = W[Q];
        if (ie === void 0 && (Q === "instanceMatrix" && y.instanceMatrix && (ie = y.instanceMatrix), Q === "instanceColor" && y.instanceColor && (ie = y.instanceColor)), ie !== void 0) {
          const ce = ie.normalized, xe = ie.itemSize, Oe = e.get(ie);
          if (Oe === void 0) continue;
          const tt = Oe.buffer, $ = Oe.type, ee = Oe.bytesPerElement, ge = $ === i.INT || $ === i.UNSIGNED_INT || ie.gpuType === Do;
          if (ie.isInterleavedBufferAttribute) {
            const se = ie.data, be = se.stride, Re = ie.offset;
            if (se.isInstancedInterleavedBuffer) {
              for (let Be = 0; Be < H.locationSize; Be++)
                f(H.location + Be, se.meshPerAttribute);
              y.isInstancedMesh !== !0 && z._maxInstanceCount === void 0 && (z._maxInstanceCount = se.meshPerAttribute * se.count);
            } else
              for (let Be = 0; Be < H.locationSize; Be++)
                m(H.location + Be);
            i.bindBuffer(i.ARRAY_BUFFER, tt);
            for (let Be = 0; Be < H.locationSize; Be++)
              b(
                H.location + Be,
                xe / H.locationSize,
                $,
                ce,
                be * ee,
                (Re + xe / H.locationSize * Be) * ee,
                ge
              );
          } else {
            if (ie.isInstancedBufferAttribute) {
              for (let se = 0; se < H.locationSize; se++)
                f(H.location + se, ie.meshPerAttribute);
              y.isInstancedMesh !== !0 && z._maxInstanceCount === void 0 && (z._maxInstanceCount = ie.meshPerAttribute * ie.count);
            } else
              for (let se = 0; se < H.locationSize; se++)
                m(H.location + se);
            i.bindBuffer(i.ARRAY_BUFFER, tt);
            for (let se = 0; se < H.locationSize; se++)
              b(
                H.location + se,
                xe / H.locationSize,
                $,
                ce,
                xe * ee,
                xe / H.locationSize * se * ee,
                ge
              );
          }
        } else if (V !== void 0) {
          const ce = V[Q];
          if (ce !== void 0)
            switch (ce.length) {
              case 2:
                i.vertexAttrib2fv(H.location, ce);
                break;
              case 3:
                i.vertexAttrib3fv(H.location, ce);
                break;
              case 4:
                i.vertexAttrib4fv(H.location, ce);
                break;
              default:
                i.vertexAttrib1fv(H.location, ce);
            }
        }
      }
    }
    T();
  }
  function N() {
    U();
    for (const y in n) {
      const C = n[y];
      for (const X in C) {
        const z = C[X];
        for (const W in z)
          h(z[W].object), delete z[W];
        delete C[X];
      }
      delete n[y];
    }
  }
  function w(y) {
    if (n[y.id] === void 0) return;
    const C = n[y.id];
    for (const X in C) {
      const z = C[X];
      for (const W in z)
        h(z[W].object), delete z[W];
      delete C[X];
    }
    delete n[y.id];
  }
  function R(y) {
    for (const C in n) {
      const X = n[C];
      if (X[y.id] === void 0) continue;
      const z = X[y.id];
      for (const W in z)
        h(z[W].object), delete z[W];
      delete X[y.id];
    }
  }
  function U() {
    S(), a = !0, r !== s && (r = s, c(r.object));
  }
  function S() {
    s.geometry = null, s.program = null, s.wireframe = !1;
  }
  return {
    setup: o,
    reset: U,
    resetDefaultState: S,
    dispose: N,
    releaseStatesOfGeometry: w,
    releaseStatesOfProgram: R,
    initAttributes: _,
    enableAttribute: m,
    disableUnusedAttributes: T
  };
}
function jm(i, e, t) {
  let n;
  function s(c) {
    n = c;
  }
  function r(c, h) {
    i.drawArrays(n, c, h), t.update(h, n, 1);
  }
  function a(c, h, u) {
    u !== 0 && (i.drawArraysInstanced(n, c, h, u), t.update(h, n, u));
  }
  function o(c, h, u) {
    if (u === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, u);
    let p = 0;
    for (let g = 0; g < u; g++)
      p += h[g];
    t.update(p, n, 1);
  }
  function l(c, h, u, d) {
    if (u === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let g = 0; g < c.length; g++)
        a(c[g], h[g], d[g]);
    else {
      p.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, d, 0, u);
      let g = 0;
      for (let _ = 0; _ < u; _++)
        g += h[_] * d[_];
      t.update(g, n, 1);
    }
  }
  this.setMode = s, this.render = r, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l;
}
function Km(i, e, t, n) {
  let s;
  function r() {
    if (s !== void 0) return s;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const R = e.get("EXT_texture_filter_anisotropic");
      s = i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      s = 0;
    return s;
  }
  function a(R) {
    return !(R !== $t && n.convert(R) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(R) {
    const U = R === Fs && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(R !== Pn && n.convert(R) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    R !== Qt && !U);
  }
  function l(R) {
    if (R === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      R = "mediump";
    }
    return R === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = t.precision !== void 0 ? t.precision : "highp";
  const h = l(c);
  h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const u = t.logarithmicDepthBuffer === !0, d = t.reverseDepthBuffer === !0 && e.has("EXT_clip_control"), p = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_TEXTURE_SIZE), m = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), f = i.getParameter(i.MAX_VERTEX_ATTRIBS), T = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), b = i.getParameter(i.MAX_VARYING_VECTORS), M = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), N = g > 0, w = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: r,
    getMaxPrecision: l,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: c,
    logarithmicDepthBuffer: u,
    reverseDepthBuffer: d,
    maxTextures: p,
    maxVertexTextures: g,
    maxTextureSize: _,
    maxCubemapSize: m,
    maxAttributes: f,
    maxVertexUniforms: T,
    maxVaryings: b,
    maxFragmentUniforms: M,
    vertexTextures: N,
    maxSamples: w
  };
}
function Zm(i) {
  const e = this;
  let t = null, n = 0, s = !1, r = !1;
  const a = new Hn(), o = new De(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, d) {
    const p = u.length !== 0 || d || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || s;
    return s = d, n = u.length, p;
  }, this.beginShadows = function() {
    r = !0, h(null);
  }, this.endShadows = function() {
    r = !1;
  }, this.setGlobalState = function(u, d) {
    t = h(u, d, 0);
  }, this.setState = function(u, d, p) {
    const g = u.clippingPlanes, _ = u.clipIntersection, m = u.clipShadows, f = i.get(u);
    if (!s || g === null || g.length === 0 || r && !m)
      r ? h(null) : c();
    else {
      const T = r ? 0 : n, b = T * 4;
      let M = f.clippingState || null;
      l.value = M, M = h(g, d, b, p);
      for (let N = 0; N !== b; ++N)
        M[N] = t[N];
      f.clippingState = M, this.numIntersection = _ ? this.numPlanes : 0, this.numPlanes += T;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(u, d, p, g) {
    const _ = u !== null ? u.length : 0;
    let m = null;
    if (_ !== 0) {
      if (m = l.value, g !== !0 || m === null) {
        const f = p + _ * 4, T = d.matrixWorldInverse;
        o.getNormalMatrix(T), (m === null || m.length < f) && (m = new Float32Array(f));
        for (let b = 0, M = p; b !== _; ++b, M += 4)
          a.copy(u[b]).applyMatrix4(T, o), a.normal.toArray(m, M), m[M + 3] = a.constant;
      }
      l.value = m, l.needsUpdate = !0;
    }
    return e.numPlanes = _, e.numIntersection = 0, m;
  }
}
function Jm(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(a, o) {
    return o === ka ? a.mapping = Gi : o === Ha && (a.mapping = Wi), a;
  }
  function n(a) {
    if (a && a.isTexture) {
      const o = a.mapping;
      if (o === ka || o === Ha)
        if (e.has(a)) {
          const l = e.get(a).texture;
          return t(l, a.mapping);
        } else {
          const l = a.image;
          if (l && l.height > 0) {
            const c = new cf(l.height);
            return c.fromEquirectangularTexture(i, a), e.set(a, c), a.addEventListener("dispose", s), t(c.texture, a.mapping);
          } else
            return null;
        }
    }
    return a;
  }
  function s(a) {
    const o = a.target;
    o.removeEventListener("dispose", s);
    const l = e.get(o);
    l !== void 0 && (e.delete(o), l.dispose());
  }
  function r() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: r
  };
}
class Go extends Fh {
  constructor(e = -1, t = 1, n = 1, s = -1, r = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = s, this.near = r, this.far = a, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, s, r, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, s = (this.top + this.bottom) / 2;
    let r = n - e, a = n + e, o = s + t, l = s - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += c * this.view.offsetX, a = r + c * this.view.width, o -= h * this.view.offsetY, l = o - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, a, o, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const Ii = 4, ec = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], oi = 20, pa = /* @__PURE__ */ new Go(), tc = /* @__PURE__ */ new Ee();
let ma = null, ga = 0, _a = 0, va = !1;
const ri = (1 + Math.sqrt(5)) / 2, Ci = 1 / ri, nc = [
  /* @__PURE__ */ new A(-ri, Ci, 0),
  /* @__PURE__ */ new A(ri, Ci, 0),
  /* @__PURE__ */ new A(-Ci, 0, ri),
  /* @__PURE__ */ new A(Ci, 0, ri),
  /* @__PURE__ */ new A(0, ri, -Ci),
  /* @__PURE__ */ new A(0, ri, Ci),
  /* @__PURE__ */ new A(-1, 1, -1),
  /* @__PURE__ */ new A(1, 1, -1),
  /* @__PURE__ */ new A(-1, 1, 1),
  /* @__PURE__ */ new A(1, 1, 1)
];
class ic {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(e, t = 0, n = 0.1, s = 100) {
    ma = this._renderer.getRenderTarget(), ga = this._renderer.getActiveCubeFace(), _a = this._renderer.getActiveMipmapLevel(), va = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const r = this._allocateTargets();
    return r.depthBuffer = !0, this._sceneToCubeUV(e, n, s, r), t > 0 && this._blur(r, 0, 0, t), this._applyPMREM(r), this._cleanup(r), r;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = ac(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = rc(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(ma, ga, _a), this._renderer.xr.enabled = va, e.scissorTest = !1, sr(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === Gi || e.mapping === Wi ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), ma = this._renderer.getRenderTarget(), ga = this._renderer.getActiveCubeFace(), _a = this._renderer.getActiveMipmapLevel(), va = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: zt,
      minFilter: zt,
      generateMipmaps: !1,
      type: Fs,
      format: $t,
      colorSpace: Lt,
      depthBuffer: !1
    }, s = sc(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = sc(e, t, n);
      const { _lodMax: r } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Qm(r)), this._blurMaterial = eg(r, e, t);
    }
    return s;
  }
  _compileMaterial(e) {
    const t = new pt(this._lodPlanes[0], e);
    this._renderer.compile(t, pa);
  }
  _sceneToCubeUV(e, t, n, s) {
    const o = new Rt(90, 1, t, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, u = h.autoClear, d = h.toneMapping;
    h.getClearColor(tc), h.toneMapping = qn, h.autoClear = !1;
    const p = new An({
      name: "PMREM.Background",
      side: Nt,
      depthWrite: !1,
      depthTest: !1
    }), g = new pt(new is(), p);
    let _ = !1;
    const m = e.background;
    m ? m.isColor && (p.color.copy(m), e.background = null, _ = !0) : (p.color.copy(tc), _ = !0);
    for (let f = 0; f < 6; f++) {
      const T = f % 3;
      T === 0 ? (o.up.set(0, l[f], 0), o.lookAt(c[f], 0, 0)) : T === 1 ? (o.up.set(0, 0, l[f]), o.lookAt(0, c[f], 0)) : (o.up.set(0, l[f], 0), o.lookAt(0, 0, c[f]));
      const b = this._cubeSize;
      sr(s, T * b, f > 2 ? b : 0, b, b), h.setRenderTarget(s), _ && h.render(g, o), h.render(e, o);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = d, h.autoClear = u, e.background = m;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, s = e.mapping === Gi || e.mapping === Wi;
    s ? (this._cubemapMaterial === null && (this._cubemapMaterial = ac()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = rc());
    const r = s ? this._cubemapMaterial : this._equirectMaterial, a = new pt(this._lodPlanes[0], r), o = r.uniforms;
    o.envMap.value = e;
    const l = this._cubeSize;
    sr(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(a, pa);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const s = this._lodPlanes.length;
    for (let r = 1; r < s; r++) {
      const a = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), o = nc[(s - r - 1) % nc.length];
      this._blur(e, r - 1, r, a, o);
    }
    t.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(e, t, n, s, r) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      a,
      t,
      n,
      s,
      "latitudinal",
      r
    ), this._halfBlur(
      a,
      e,
      n,
      n,
      s,
      "longitudinal",
      r
    );
  }
  _halfBlur(e, t, n, s, r, a, o) {
    const l = this._renderer, c = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, u = new pt(this._lodPlanes[s], c), d = c.uniforms, p = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * p) : 2 * Math.PI / (2 * oi - 1), _ = r / g, m = isFinite(r) ? 1 + Math.floor(h * _) : oi;
    m > oi && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${oi}`);
    const f = [];
    let T = 0;
    for (let R = 0; R < oi; ++R) {
      const U = R / _, S = Math.exp(-U * U / 2);
      f.push(S), R === 0 ? T += S : R < m && (T += 2 * S);
    }
    for (let R = 0; R < f.length; R++)
      f[R] = f[R] / T;
    d.envMap.value = e.texture, d.samples.value = m, d.weights.value = f, d.latitudinal.value = a === "latitudinal", o && (d.poleAxis.value = o);
    const { _lodMax: b } = this;
    d.dTheta.value = g, d.mipInt.value = b - n;
    const M = this._sizeLods[s], N = 3 * M * (s > b - Ii ? s - b + Ii : 0), w = 4 * (this._cubeSize - M);
    sr(t, N, w, 3 * M, 2 * M), l.setRenderTarget(t), l.render(u, pa);
  }
}
function Qm(i) {
  const e = [], t = [], n = [];
  let s = i;
  const r = i - Ii + 1 + ec.length;
  for (let a = 0; a < r; a++) {
    const o = Math.pow(2, s);
    t.push(o);
    let l = 1 / o;
    a > i - Ii ? l = ec[a - i + Ii - 1] : a === 0 && (l = 0), n.push(l);
    const c = 1 / (o - 2), h = -c, u = 1 + c, d = [h, h, u, h, u, u, h, h, u, u, h, u], p = 6, g = 6, _ = 3, m = 2, f = 1, T = new Float32Array(_ * g * p), b = new Float32Array(m * g * p), M = new Float32Array(f * g * p);
    for (let w = 0; w < p; w++) {
      const R = w % 3 * 2 / 3 - 1, U = w > 2 ? 0 : -1, S = [
        R,
        U,
        0,
        R + 2 / 3,
        U,
        0,
        R + 2 / 3,
        U + 1,
        0,
        R,
        U,
        0,
        R + 2 / 3,
        U + 1,
        0,
        R,
        U + 1,
        0
      ];
      T.set(S, _ * g * w), b.set(d, m * g * w);
      const y = [w, w, w, w, w, w];
      M.set(y, f * g * w);
    }
    const N = new sn();
    N.setAttribute("position", new Pt(T, _)), N.setAttribute("uv", new Pt(b, m)), N.setAttribute("faceIndex", new Pt(M, f)), e.push(N), s > Ii && s--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: n };
}
function sc(i, e, t) {
  const n = new fi(i, e, t);
  return n.texture.mapping = Ir, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function sr(i, e, t, n, s) {
  i.viewport.set(e, t, n, s), i.scissor.set(e, t, n, s);
}
function eg(i, e, t) {
  const n = new Float32Array(oi), s = new A(0, 1, 0);
  return new jn({
    name: "SphericalGaussianBlur",
    defines: {
      n: oi,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: s }
    },
    vertexShader: Wo(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: Yn,
    depthTest: !1,
    depthWrite: !1
  });
}
function rc() {
  return new jn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Wo(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: Yn,
    depthTest: !1,
    depthWrite: !1
  });
}
function ac() {
  return new jn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Wo(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: Yn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Wo() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function tg(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function n(o) {
    if (o && o.isTexture) {
      const l = o.mapping, c = l === ka || l === Ha, h = l === Gi || l === Wi;
      if (c || h) {
        let u = e.get(o);
        const d = u !== void 0 ? u.texture.pmremVersion : 0;
        if (o.isRenderTargetTexture && o.pmremVersion !== d)
          return t === null && (t = new ic(i)), u = c ? t.fromEquirectangular(o, u) : t.fromCubemap(o, u), u.texture.pmremVersion = o.pmremVersion, e.set(o, u), u.texture;
        if (u !== void 0)
          return u.texture;
        {
          const p = o.image;
          return c && p && p.height > 0 || h && p && s(p) ? (t === null && (t = new ic(i)), u = c ? t.fromEquirectangular(o) : t.fromCubemap(o), u.texture.pmremVersion = o.pmremVersion, e.set(o, u), o.addEventListener("dispose", r), u.texture) : null;
        }
      }
    }
    return o;
  }
  function s(o) {
    let l = 0;
    const c = 6;
    for (let h = 0; h < c; h++)
      o[h] !== void 0 && l++;
    return l === c;
  }
  function r(o) {
    const l = o.target;
    l.removeEventListener("dispose", r);
    const c = e.get(l);
    c !== void 0 && (e.delete(l), c.dispose());
  }
  function a() {
    e = /* @__PURE__ */ new WeakMap(), t !== null && (t.dispose(), t = null);
  }
  return {
    get: n,
    dispose: a
  };
}
function ng(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    let s;
    switch (n) {
      case "WEBGL_depth_texture":
        s = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        s = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        s = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        s = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        s = i.getExtension(n);
    }
    return e[n] = s, s;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const s = t(n);
      return s === null && ys("THREE.WebGLRenderer: " + n + " extension not supported."), s;
    }
  };
}
function ig(i, e, t, n) {
  const s = {}, r = /* @__PURE__ */ new WeakMap();
  function a(u) {
    const d = u.target;
    d.index !== null && e.remove(d.index);
    for (const g in d.attributes)
      e.remove(d.attributes[g]);
    for (const g in d.morphAttributes) {
      const _ = d.morphAttributes[g];
      for (let m = 0, f = _.length; m < f; m++)
        e.remove(_[m]);
    }
    d.removeEventListener("dispose", a), delete s[d.id];
    const p = r.get(d);
    p && (e.remove(p), r.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, t.memory.geometries--;
  }
  function o(u, d) {
    return s[d.id] === !0 || (d.addEventListener("dispose", a), s[d.id] = !0, t.memory.geometries++), d;
  }
  function l(u) {
    const d = u.attributes;
    for (const g in d)
      e.update(d[g], i.ARRAY_BUFFER);
    const p = u.morphAttributes;
    for (const g in p) {
      const _ = p[g];
      for (let m = 0, f = _.length; m < f; m++)
        e.update(_[m], i.ARRAY_BUFFER);
    }
  }
  function c(u) {
    const d = [], p = u.index, g = u.attributes.position;
    let _ = 0;
    if (p !== null) {
      const T = p.array;
      _ = p.version;
      for (let b = 0, M = T.length; b < M; b += 3) {
        const N = T[b + 0], w = T[b + 1], R = T[b + 2];
        d.push(N, w, w, R, R, N);
      }
    } else if (g !== void 0) {
      const T = g.array;
      _ = g.version;
      for (let b = 0, M = T.length / 3 - 1; b < M; b += 3) {
        const N = b + 0, w = b + 1, R = b + 2;
        d.push(N, w, w, R, R, N);
      }
    } else
      return;
    const m = new (Ch(d) ? Uh : Ih)(d, 1);
    m.version = _;
    const f = r.get(u);
    f && e.remove(f), r.set(u, m);
  }
  function h(u) {
    const d = r.get(u);
    if (d) {
      const p = u.index;
      p !== null && d.version < p.version && c(u);
    } else
      c(u);
    return r.get(u);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: h
  };
}
function sg(i, e, t) {
  let n;
  function s(d) {
    n = d;
  }
  let r, a;
  function o(d) {
    r = d.type, a = d.bytesPerElement;
  }
  function l(d, p) {
    i.drawElements(n, p, r, d * a), t.update(p, n, 1);
  }
  function c(d, p, g) {
    g !== 0 && (i.drawElementsInstanced(n, p, r, d * a, g), t.update(p, n, g));
  }
  function h(d, p, g) {
    if (g === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, p, 0, r, d, 0, g);
    let m = 0;
    for (let f = 0; f < g; f++)
      m += p[f];
    t.update(m, n, 1);
  }
  function u(d, p, g, _) {
    if (g === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let f = 0; f < d.length; f++)
        c(d[f] / a, p[f], _[f]);
    else {
      m.multiDrawElementsInstancedWEBGL(n, p, 0, r, d, 0, _, 0, g);
      let f = 0;
      for (let T = 0; T < g; T++)
        f += p[T] * _[T];
      t.update(f, n, 1);
    }
  }
  this.setMode = s, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = u;
}
function rg(i) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(r, a, o) {
    switch (t.calls++, a) {
      case i.TRIANGLES:
        t.triangles += o * (r / 3);
        break;
      case i.LINES:
        t.lines += o * (r / 2);
        break;
      case i.LINE_STRIP:
        t.lines += o * (r - 1);
        break;
      case i.LINE_LOOP:
        t.lines += o * r;
        break;
      case i.POINTS:
        t.points += o * r;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function s() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: s,
    update: n
  };
}
function ag(i, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), s = new Ye();
  function r(a, o, l) {
    const c = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, u = h !== void 0 ? h.length : 0;
    let d = n.get(o);
    if (d === void 0 || d.count !== u) {
      let S = function() {
        R.dispose(), n.delete(o), o.removeEventListener("dispose", S);
      };
      d !== void 0 && d.texture.dispose();
      const p = o.morphAttributes.position !== void 0, g = o.morphAttributes.normal !== void 0, _ = o.morphAttributes.color !== void 0, m = o.morphAttributes.position || [], f = o.morphAttributes.normal || [], T = o.morphAttributes.color || [];
      let b = 0;
      p === !0 && (b = 1), g === !0 && (b = 2), _ === !0 && (b = 3);
      let M = o.attributes.position.count * b, N = 1;
      M > e.maxTextureSize && (N = Math.ceil(M / e.maxTextureSize), M = e.maxTextureSize);
      const w = new Float32Array(M * N * 4 * u), R = new Lh(w, M, N, u);
      R.type = Qt, R.needsUpdate = !0;
      const U = b * 4;
      for (let y = 0; y < u; y++) {
        const C = m[y], X = f[y], z = T[y], W = M * N * 4 * y;
        for (let K = 0; K < C.count; K++) {
          const V = K * U;
          p === !0 && (s.fromBufferAttribute(C, K), w[W + V + 0] = s.x, w[W + V + 1] = s.y, w[W + V + 2] = s.z, w[W + V + 3] = 0), g === !0 && (s.fromBufferAttribute(X, K), w[W + V + 4] = s.x, w[W + V + 5] = s.y, w[W + V + 6] = s.z, w[W + V + 7] = 0), _ === !0 && (s.fromBufferAttribute(z, K), w[W + V + 8] = s.x, w[W + V + 9] = s.y, w[W + V + 10] = s.z, w[W + V + 11] = z.itemSize === 4 ? s.w : 1);
        }
      }
      d = {
        count: u,
        texture: R,
        size: new Te(M, N)
      }, n.set(o, d), o.addEventListener("dispose", S);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", a.morphTexture, t);
    else {
      let p = 0;
      for (let _ = 0; _ < c.length; _++)
        p += c[_];
      const g = o.morphTargetsRelative ? 1 : 1 - p;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", g), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", d.texture, t), l.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return {
    update: r
  };
}
function og(i, e, t, n) {
  let s = /* @__PURE__ */ new WeakMap();
  function r(l) {
    const c = n.render.frame, h = l.geometry, u = e.get(l, h);
    if (s.get(u) !== c && (e.update(u), s.set(u, c)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === !1 && l.addEventListener("dispose", o), s.get(l) !== c && (t.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER), s.set(l, c))), l.isSkinnedMesh) {
      const d = l.skeleton;
      s.get(d) !== c && (d.update(), s.set(d, c));
    }
    return u;
  }
  function a() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function o(l) {
    const c = l.target;
    c.removeEventListener("dispose", o), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor);
  }
  return {
    update: r,
    dispose: a
  };
}
class zh extends vt {
  constructor(e, t, n, s, r, a, o, l, c, h = Fi) {
    if (h !== Fi && h !== Yi)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === Fi && (n = di), n === void 0 && h === Yi && (n = Xi), super(null, s, r, a, o, l, h, n, c), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = o !== void 0 ? o : Ct, this.minFilter = l !== void 0 ? l : Ct, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
const kh = /* @__PURE__ */ new vt(), oc = /* @__PURE__ */ new zh(1, 1), Hh = /* @__PURE__ */ new Lh(), Vh = /* @__PURE__ */ new Xd(), Gh = /* @__PURE__ */ new Oh(), lc = [], cc = [], hc = new Float32Array(16), uc = new Float32Array(9), dc = new Float32Array(4);
function ss(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const s = e * t;
  let r = lc[s];
  if (r === void 0 && (r = new Float32Array(s), lc[s] = r), e !== 0) {
    n.toArray(r, 0);
    for (let a = 1, o = 0; a !== e; ++a)
      o += t, i[a].toArray(r, o);
  }
  return r;
}
function mt(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function gt(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function Nr(i, e) {
  let t = cc[e];
  t === void 0 && (t = new Int32Array(e), cc[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function lg(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function cg(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (mt(t, e)) return;
    i.uniform2fv(this.addr, e), gt(t, e);
  }
}
function hg(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (mt(t, e)) return;
    i.uniform3fv(this.addr, e), gt(t, e);
  }
}
function ug(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (mt(t, e)) return;
    i.uniform4fv(this.addr, e), gt(t, e);
  }
}
function dg(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (mt(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), gt(t, e);
  } else {
    if (mt(t, n)) return;
    dc.set(n), i.uniformMatrix2fv(this.addr, !1, dc), gt(t, n);
  }
}
function fg(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (mt(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), gt(t, e);
  } else {
    if (mt(t, n)) return;
    uc.set(n), i.uniformMatrix3fv(this.addr, !1, uc), gt(t, n);
  }
}
function pg(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (mt(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), gt(t, e);
  } else {
    if (mt(t, n)) return;
    hc.set(n), i.uniformMatrix4fv(this.addr, !1, hc), gt(t, n);
  }
}
function mg(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function gg(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (mt(t, e)) return;
    i.uniform2iv(this.addr, e), gt(t, e);
  }
}
function _g(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (mt(t, e)) return;
    i.uniform3iv(this.addr, e), gt(t, e);
  }
}
function vg(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (mt(t, e)) return;
    i.uniform4iv(this.addr, e), gt(t, e);
  }
}
function xg(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function Mg(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (mt(t, e)) return;
    i.uniform2uiv(this.addr, e), gt(t, e);
  }
}
function yg(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (mt(t, e)) return;
    i.uniform3uiv(this.addr, e), gt(t, e);
  }
}
function Sg(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (mt(t, e)) return;
    i.uniform4uiv(this.addr, e), gt(t, e);
  }
}
function bg(i, e, t) {
  const n = this.cache, s = t.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s);
  let r;
  this.type === i.SAMPLER_2D_SHADOW ? (oc.compareFunction = Rh, r = oc) : r = kh, t.setTexture2D(e || r, s);
}
function Eg(i, e, t) {
  const n = this.cache, s = t.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), t.setTexture3D(e || Vh, s);
}
function Tg(i, e, t) {
  const n = this.cache, s = t.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), t.setTextureCube(e || Gh, s);
}
function Ag(i, e, t) {
  const n = this.cache, s = t.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), t.setTexture2DArray(e || Hh, s);
}
function wg(i) {
  switch (i) {
    case 5126:
      return lg;
    case 35664:
      return cg;
    case 35665:
      return hg;
    case 35666:
      return ug;
    case 35674:
      return dg;
    case 35675:
      return fg;
    case 35676:
      return pg;
    case 5124:
    case 35670:
      return mg;
    case 35667:
    case 35671:
      return gg;
    case 35668:
    case 35672:
      return _g;
    case 35669:
    case 35673:
      return vg;
    case 5125:
      return xg;
    case 36294:
      return Mg;
    case 36295:
      return yg;
    case 36296:
      return Sg;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return bg;
    case 35679:
    case 36299:
    case 36307:
      return Eg;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Tg;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Ag;
  }
}
function Rg(i, e) {
  i.uniform1fv(this.addr, e);
}
function Cg(i, e) {
  const t = ss(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function Pg(i, e) {
  const t = ss(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function Lg(i, e) {
  const t = ss(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function Dg(i, e) {
  const t = ss(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function Ig(i, e) {
  const t = ss(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function Ug(i, e) {
  const t = ss(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function Ng(i, e) {
  i.uniform1iv(this.addr, e);
}
function Fg(i, e) {
  i.uniform2iv(this.addr, e);
}
function Og(i, e) {
  i.uniform3iv(this.addr, e);
}
function Bg(i, e) {
  i.uniform4iv(this.addr, e);
}
function zg(i, e) {
  i.uniform1uiv(this.addr, e);
}
function kg(i, e) {
  i.uniform2uiv(this.addr, e);
}
function Hg(i, e) {
  i.uniform3uiv(this.addr, e);
}
function Vg(i, e) {
  i.uniform4uiv(this.addr, e);
}
function Gg(i, e, t) {
  const n = this.cache, s = e.length, r = Nr(t, s);
  mt(n, r) || (i.uniform1iv(this.addr, r), gt(n, r));
  for (let a = 0; a !== s; ++a)
    t.setTexture2D(e[a] || kh, r[a]);
}
function Wg(i, e, t) {
  const n = this.cache, s = e.length, r = Nr(t, s);
  mt(n, r) || (i.uniform1iv(this.addr, r), gt(n, r));
  for (let a = 0; a !== s; ++a)
    t.setTexture3D(e[a] || Vh, r[a]);
}
function $g(i, e, t) {
  const n = this.cache, s = e.length, r = Nr(t, s);
  mt(n, r) || (i.uniform1iv(this.addr, r), gt(n, r));
  for (let a = 0; a !== s; ++a)
    t.setTextureCube(e[a] || Gh, r[a]);
}
function Xg(i, e, t) {
  const n = this.cache, s = e.length, r = Nr(t, s);
  mt(n, r) || (i.uniform1iv(this.addr, r), gt(n, r));
  for (let a = 0; a !== s; ++a)
    t.setTexture2DArray(e[a] || Hh, r[a]);
}
function Yg(i) {
  switch (i) {
    case 5126:
      return Rg;
    case 35664:
      return Cg;
    case 35665:
      return Pg;
    case 35666:
      return Lg;
    case 35674:
      return Dg;
    case 35675:
      return Ig;
    case 35676:
      return Ug;
    case 5124:
    case 35670:
      return Ng;
    case 35667:
    case 35671:
      return Fg;
    case 35668:
    case 35672:
      return Og;
    case 35669:
    case 35673:
      return Bg;
    case 5125:
      return zg;
    case 36294:
      return kg;
    case 36295:
      return Hg;
    case 36296:
      return Vg;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Gg;
    case 35679:
    case 36299:
    case 36307:
      return Wg;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return $g;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Xg;
  }
}
class qg {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = wg(t.type);
  }
}
class jg {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Yg(t.type);
  }
}
class Kg {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const s = this.seq;
    for (let r = 0, a = s.length; r !== a; ++r) {
      const o = s[r];
      o.setValue(e, t[o.id], n);
    }
  }
}
const xa = /(\w+)(\])?(\[|\.)?/g;
function fc(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function Zg(i, e, t) {
  const n = i.name, s = n.length;
  for (xa.lastIndex = 0; ; ) {
    const r = xa.exec(n), a = xa.lastIndex;
    let o = r[1];
    const l = r[2] === "]", c = r[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === s) {
      fc(t, c === void 0 ? new qg(o, i, e) : new jg(o, i, e));
      break;
    } else {
      let u = t.map[o];
      u === void 0 && (u = new Kg(o), fc(t, u)), t = u;
    }
  }
}
class Tr {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const r = e.getActiveUniform(t, s), a = e.getUniformLocation(t, r.name);
      Zg(r, a, this);
    }
  }
  setValue(e, t, n, s) {
    const r = this.map[t];
    r !== void 0 && r.setValue(e, n, s);
  }
  setOptional(e, t, n) {
    const s = t[n];
    s !== void 0 && this.setValue(e, n, s);
  }
  static upload(e, t, n, s) {
    for (let r = 0, a = t.length; r !== a; ++r) {
      const o = t[r], l = n[o.id];
      l.needsUpdate !== !1 && o.setValue(e, l.value, s);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let s = 0, r = e.length; s !== r; ++s) {
      const a = e[s];
      a.id in t && n.push(a);
    }
    return n;
  }
}
function pc(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const Jg = 37297;
let Qg = 0;
function e_(i, e) {
  const t = i.split(`
`), n = [], s = Math.max(e - 6, 0), r = Math.min(e + 6, t.length);
  for (let a = s; a < r; a++) {
    const o = a + 1;
    n.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`);
  }
  return n.join(`
`);
}
const mc = /* @__PURE__ */ new De();
function t_(i) {
  ke._getMatrix(mc, ke.workingColorSpace, i);
  const e = `mat3( ${mc.elements.map((t) => t.toFixed(4))} )`;
  switch (ke.getTransfer(i)) {
    case Ur:
      return [e, "LinearTransferOETF"];
    case Qe:
      return [e, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [e, "LinearTransferOETF"];
  }
}
function gc(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), s = i.getShaderInfoLog(e).trim();
  if (n && s === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(s);
  if (r) {
    const a = parseInt(r[1]);
    return t.toUpperCase() + `

` + s + `

` + e_(i.getShaderSource(e), a);
  } else
    return s;
}
function n_(i, e) {
  const t = t_(e);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function i_(i, e) {
  let t;
  switch (e) {
    case id:
      t = "Linear";
      break;
    case sd:
      t = "Reinhard";
      break;
    case rd:
      t = "Cineon";
      break;
    case ph:
      t = "ACESFilmic";
      break;
    case od:
      t = "AgX";
      break;
    case ld:
      t = "Neutral";
      break;
    case ad:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const rr = /* @__PURE__ */ new A();
function s_() {
  ke.getLuminanceCoefficients(rr);
  const i = rr.x.toFixed(4), e = rr.y.toFixed(4), t = rr.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function r_(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Ss).join(`
`);
}
function a_(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function o_(i, e) {
  const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < n; s++) {
    const r = i.getActiveAttrib(e, s), a = r.name;
    let o = 1;
    r.type === i.FLOAT_MAT2 && (o = 2), r.type === i.FLOAT_MAT3 && (o = 3), r.type === i.FLOAT_MAT4 && (o = 4), t[a] = {
      type: r.type,
      location: i.getAttribLocation(e, a),
      locationSize: o
    };
  }
  return t;
}
function Ss(i) {
  return i !== "";
}
function _c(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function vc(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const l_ = /^[ \t]*#include +<([\w\d./]+)>/gm;
function _o(i) {
  return i.replace(l_, h_);
}
const c_ = /* @__PURE__ */ new Map();
function h_(i, e) {
  let t = Ue[e];
  if (t === void 0) {
    const n = c_.get(e);
    if (n !== void 0)
      t = Ue[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return _o(t);
}
const u_ = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function xc(i) {
  return i.replace(u_, d_);
}
function d_(i, e, t, n) {
  let s = "";
  for (let r = parseInt(e); r < parseInt(t); r++)
    s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function Mc(i) {
  let e = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function f_(i) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === uh ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === dh ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === Sn && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function p_(i) {
  let e = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case Gi:
      case Wi:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case Ir:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function m_(i) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case Wi:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function g_(i) {
  let e = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case fh:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case td:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case nd:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function __(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 7 * 16)), texelHeight: n, maxMip: t };
}
function v_(i, e, t, n) {
  const s = i.getContext(), r = t.defines;
  let a = t.vertexShader, o = t.fragmentShader;
  const l = f_(t), c = p_(t), h = m_(t), u = g_(t), d = __(t), p = r_(t), g = a_(r), _ = s.createProgram();
  let m, f, T = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g
  ].filter(Ss).join(`
`), m.length > 0 && (m += `
`), f = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g
  ].filter(Ss).join(`
`), f.length > 0 && (f += `
`)) : (m = [
    Mc(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + h : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Ss).join(`
`), f = [
    Mc(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + h : "",
    t.envMap ? "#define " + u : "",
    d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
    d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
    d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor || t.batchingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== qn ? "#define TONE_MAPPING" : "",
    t.toneMapping !== qn ? Ue.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== qn ? i_("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Ue.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    n_("linearToOutputTexel", t.outputColorSpace),
    s_(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Ss).join(`
`)), a = _o(a), a = _c(a, t), a = vc(a, t), o = _o(o), o = _c(o, t), o = vc(o, t), a = xc(a), o = xc(o), t.isRawShaderMaterial !== !0 && (T = `#version 300 es
`, m = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, f = [
    "#define varying in",
    t.glslVersion === Dl ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === Dl ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + f);
  const b = T + m + a, M = T + f + o, N = pc(s, s.VERTEX_SHADER, b), w = pc(s, s.FRAGMENT_SHADER, M);
  s.attachShader(_, N), s.attachShader(_, w), t.index0AttributeName !== void 0 ? s.bindAttribLocation(_, 0, t.index0AttributeName) : t.morphTargets === !0 && s.bindAttribLocation(_, 0, "position"), s.linkProgram(_);
  function R(C) {
    if (i.debug.checkShaderErrors) {
      const X = s.getProgramInfoLog(_).trim(), z = s.getShaderInfoLog(N).trim(), W = s.getShaderInfoLog(w).trim();
      let K = !0, V = !0;
      if (s.getProgramParameter(_, s.LINK_STATUS) === !1)
        if (K = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(s, _, N, w);
        else {
          const Q = gc(s, N, "vertex"), H = gc(s, w, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(_, s.VALIDATE_STATUS) + `

Material Name: ` + C.name + `
Material Type: ` + C.type + `

Program Info Log: ` + X + `
` + Q + `
` + H
          );
        }
      else X !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", X) : (z === "" || W === "") && (V = !1);
      V && (C.diagnostics = {
        runnable: K,
        programLog: X,
        vertexShader: {
          log: z,
          prefix: m
        },
        fragmentShader: {
          log: W,
          prefix: f
        }
      });
    }
    s.deleteShader(N), s.deleteShader(w), U = new Tr(s, _), S = o_(s, _);
  }
  let U;
  this.getUniforms = function() {
    return U === void 0 && R(this), U;
  };
  let S;
  this.getAttributes = function() {
    return S === void 0 && R(this), S;
  };
  let y = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return y === !1 && (y = s.getProgramParameter(_, Jg)), y;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), s.deleteProgram(_), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = Qg++, this.cacheKey = e, this.usedTimes = 1, this.program = _, this.vertexShader = N, this.fragmentShader = w, this;
}
let x_ = 0;
class M_ {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, s = this._getShaderStage(t), r = this._getShaderStage(n), a = this._getShaderCacheForMaterial(e);
    return a.has(s) === !1 && (a.add(s), s.usedTimes++), a.has(r) === !1 && (a.add(r), r.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new y_(e), t.set(e, n)), n;
  }
}
class y_ {
  constructor(e) {
    this.id = x_++, this.code = e, this.usedTimes = 0;
  }
}
function S_(i, e, t, n, s, r, a) {
  const o = new Ho(), l = new M_(), c = /* @__PURE__ */ new Set(), h = [], u = s.logarithmicDepthBuffer, d = s.vertexTextures;
  let p = s.precision;
  const g = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function _(S) {
    return c.add(S), S === 0 ? "uv" : `uv${S}`;
  }
  function m(S, y, C, X, z) {
    const W = X.fog, K = z.geometry, V = S.isMeshStandardMaterial ? X.environment : null, Q = (S.isMeshStandardMaterial ? t : e).get(S.envMap || V), H = Q && Q.mapping === Ir ? Q.image.height : null, ie = g[S.type];
    S.precision !== null && (p = s.getMaxPrecision(S.precision), p !== S.precision && console.warn("THREE.WebGLProgram.getParameters:", S.precision, "not supported, using", p, "instead."));
    const ce = K.morphAttributes.position || K.morphAttributes.normal || K.morphAttributes.color, xe = ce !== void 0 ? ce.length : 0;
    let Oe = 0;
    K.morphAttributes.position !== void 0 && (Oe = 1), K.morphAttributes.normal !== void 0 && (Oe = 2), K.morphAttributes.color !== void 0 && (Oe = 3);
    let tt, $, ee, ge;
    if (ie) {
      const Ke = an[ie];
      tt = Ke.vertexShader, $ = Ke.fragmentShader;
    } else
      tt = S.vertexShader, $ = S.fragmentShader, l.update(S), ee = l.getVertexShaderID(S), ge = l.getFragmentShaderID(S);
    const se = i.getRenderTarget(), be = i.state.buffers.depth.getReversed(), Re = z.isInstancedMesh === !0, Be = z.isBatchedMesh === !0, lt = !!S.map, We = !!S.matcap, ht = !!Q, I = !!S.aoMap, kt = !!S.lightMap, He = !!S.bumpMap, Ve = !!S.normalMap, ye = !!S.displacementMap, st = !!S.emissiveMap, Me = !!S.metalnessMap, E = !!S.roughnessMap, v = S.anisotropy > 0, F = S.clearcoat > 0, Y = S.dispersion > 0, j = S.iridescence > 0, G = S.sheen > 0, _e = S.transmission > 0, re = v && !!S.anisotropyMap, he = F && !!S.clearcoatMap, $e = F && !!S.clearcoatNormalMap, Z = F && !!S.clearcoatRoughnessMap, ue = j && !!S.iridescenceMap, Se = j && !!S.iridescenceThicknessMap, Ae = G && !!S.sheenColorMap, de = G && !!S.sheenRoughnessMap, Ge = !!S.specularMap, Ie = !!S.specularColorMap, nt = !!S.specularIntensityMap, P = _e && !!S.transmissionMap, ne = _e && !!S.thicknessMap, k = !!S.gradientMap, q = !!S.alphaMap, le = S.alphaTest > 0, ae = !!S.alphaHash, Pe = !!S.extensions;
    let ct = qn;
    S.toneMapped && (se === null || se.isXRRenderTarget === !0) && (ct = i.toneMapping);
    const St = {
      shaderID: ie,
      shaderType: S.type,
      shaderName: S.name,
      vertexShader: tt,
      fragmentShader: $,
      defines: S.defines,
      customVertexShaderID: ee,
      customFragmentShaderID: ge,
      isRawShaderMaterial: S.isRawShaderMaterial === !0,
      glslVersion: S.glslVersion,
      precision: p,
      batching: Be,
      batchingColor: Be && z._colorsTexture !== null,
      instancing: Re,
      instancingColor: Re && z.instanceColor !== null,
      instancingMorph: Re && z.morphTexture !== null,
      supportsVertexTextures: d,
      outputColorSpace: se === null ? i.outputColorSpace : se.isXRRenderTarget === !0 ? se.texture.colorSpace : Lt,
      alphaToCoverage: !!S.alphaToCoverage,
      map: lt,
      matcap: We,
      envMap: ht,
      envMapMode: ht && Q.mapping,
      envMapCubeUVHeight: H,
      aoMap: I,
      lightMap: kt,
      bumpMap: He,
      normalMap: Ve,
      displacementMap: d && ye,
      emissiveMap: st,
      normalMapObjectSpace: Ve && S.normalMapType === pd,
      normalMapTangentSpace: Ve && S.normalMapType === wh,
      metalnessMap: Me,
      roughnessMap: E,
      anisotropy: v,
      anisotropyMap: re,
      clearcoat: F,
      clearcoatMap: he,
      clearcoatNormalMap: $e,
      clearcoatRoughnessMap: Z,
      dispersion: Y,
      iridescence: j,
      iridescenceMap: ue,
      iridescenceThicknessMap: Se,
      sheen: G,
      sheenColorMap: Ae,
      sheenRoughnessMap: de,
      specularMap: Ge,
      specularColorMap: Ie,
      specularIntensityMap: nt,
      transmission: _e,
      transmissionMap: P,
      thicknessMap: ne,
      gradientMap: k,
      opaque: S.transparent === !1 && S.blending === Ni && S.alphaToCoverage === !1,
      alphaMap: q,
      alphaTest: le,
      alphaHash: ae,
      combine: S.combine,
      //
      mapUv: lt && _(S.map.channel),
      aoMapUv: I && _(S.aoMap.channel),
      lightMapUv: kt && _(S.lightMap.channel),
      bumpMapUv: He && _(S.bumpMap.channel),
      normalMapUv: Ve && _(S.normalMap.channel),
      displacementMapUv: ye && _(S.displacementMap.channel),
      emissiveMapUv: st && _(S.emissiveMap.channel),
      metalnessMapUv: Me && _(S.metalnessMap.channel),
      roughnessMapUv: E && _(S.roughnessMap.channel),
      anisotropyMapUv: re && _(S.anisotropyMap.channel),
      clearcoatMapUv: he && _(S.clearcoatMap.channel),
      clearcoatNormalMapUv: $e && _(S.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Z && _(S.clearcoatRoughnessMap.channel),
      iridescenceMapUv: ue && _(S.iridescenceMap.channel),
      iridescenceThicknessMapUv: Se && _(S.iridescenceThicknessMap.channel),
      sheenColorMapUv: Ae && _(S.sheenColorMap.channel),
      sheenRoughnessMapUv: de && _(S.sheenRoughnessMap.channel),
      specularMapUv: Ge && _(S.specularMap.channel),
      specularColorMapUv: Ie && _(S.specularColorMap.channel),
      specularIntensityMapUv: nt && _(S.specularIntensityMap.channel),
      transmissionMapUv: P && _(S.transmissionMap.channel),
      thicknessMapUv: ne && _(S.thicknessMap.channel),
      alphaMapUv: q && _(S.alphaMap.channel),
      //
      vertexTangents: !!K.attributes.tangent && (Ve || v),
      vertexColors: S.vertexColors,
      vertexAlphas: S.vertexColors === !0 && !!K.attributes.color && K.attributes.color.itemSize === 4,
      pointsUvs: z.isPoints === !0 && !!K.attributes.uv && (lt || q),
      fog: !!W,
      useFog: S.fog === !0,
      fogExp2: !!W && W.isFogExp2,
      flatShading: S.flatShading === !0,
      sizeAttenuation: S.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reverseDepthBuffer: be,
      skinning: z.isSkinnedMesh === !0,
      morphTargets: K.morphAttributes.position !== void 0,
      morphNormals: K.morphAttributes.normal !== void 0,
      morphColors: K.morphAttributes.color !== void 0,
      morphTargetsCount: xe,
      morphTextureStride: Oe,
      numDirLights: y.directional.length,
      numPointLights: y.point.length,
      numSpotLights: y.spot.length,
      numSpotLightMaps: y.spotLightMap.length,
      numRectAreaLights: y.rectArea.length,
      numHemiLights: y.hemi.length,
      numDirLightShadows: y.directionalShadowMap.length,
      numPointLightShadows: y.pointShadowMap.length,
      numSpotLightShadows: y.spotShadowMap.length,
      numSpotLightShadowsWithMaps: y.numSpotLightShadowsWithMaps,
      numLightProbes: y.numLightProbes,
      numClippingPlanes: a.numPlanes,
      numClipIntersection: a.numIntersection,
      dithering: S.dithering,
      shadowMapEnabled: i.shadowMap.enabled && C.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: ct,
      decodeVideoTexture: lt && S.map.isVideoTexture === !0 && ke.getTransfer(S.map.colorSpace) === Qe,
      decodeVideoTextureEmissive: st && S.emissiveMap.isVideoTexture === !0 && ke.getTransfer(S.emissiveMap.colorSpace) === Qe,
      premultipliedAlpha: S.premultipliedAlpha,
      doubleSided: S.side === Zt,
      flipSided: S.side === Nt,
      useDepthPacking: S.depthPacking >= 0,
      depthPacking: S.depthPacking || 0,
      index0AttributeName: S.index0AttributeName,
      extensionClipCullDistance: Pe && S.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Pe && S.extensions.multiDraw === !0 || Be) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: S.customProgramCacheKey()
    };
    return St.vertexUv1s = c.has(1), St.vertexUv2s = c.has(2), St.vertexUv3s = c.has(3), c.clear(), St;
  }
  function f(S) {
    const y = [];
    if (S.shaderID ? y.push(S.shaderID) : (y.push(S.customVertexShaderID), y.push(S.customFragmentShaderID)), S.defines !== void 0)
      for (const C in S.defines)
        y.push(C), y.push(S.defines[C]);
    return S.isRawShaderMaterial === !1 && (T(y, S), b(y, S), y.push(i.outputColorSpace)), y.push(S.customProgramCacheKey), y.join();
  }
  function T(S, y) {
    S.push(y.precision), S.push(y.outputColorSpace), S.push(y.envMapMode), S.push(y.envMapCubeUVHeight), S.push(y.mapUv), S.push(y.alphaMapUv), S.push(y.lightMapUv), S.push(y.aoMapUv), S.push(y.bumpMapUv), S.push(y.normalMapUv), S.push(y.displacementMapUv), S.push(y.emissiveMapUv), S.push(y.metalnessMapUv), S.push(y.roughnessMapUv), S.push(y.anisotropyMapUv), S.push(y.clearcoatMapUv), S.push(y.clearcoatNormalMapUv), S.push(y.clearcoatRoughnessMapUv), S.push(y.iridescenceMapUv), S.push(y.iridescenceThicknessMapUv), S.push(y.sheenColorMapUv), S.push(y.sheenRoughnessMapUv), S.push(y.specularMapUv), S.push(y.specularColorMapUv), S.push(y.specularIntensityMapUv), S.push(y.transmissionMapUv), S.push(y.thicknessMapUv), S.push(y.combine), S.push(y.fogExp2), S.push(y.sizeAttenuation), S.push(y.morphTargetsCount), S.push(y.morphAttributeCount), S.push(y.numDirLights), S.push(y.numPointLights), S.push(y.numSpotLights), S.push(y.numSpotLightMaps), S.push(y.numHemiLights), S.push(y.numRectAreaLights), S.push(y.numDirLightShadows), S.push(y.numPointLightShadows), S.push(y.numSpotLightShadows), S.push(y.numSpotLightShadowsWithMaps), S.push(y.numLightProbes), S.push(y.shadowMapType), S.push(y.toneMapping), S.push(y.numClippingPlanes), S.push(y.numClipIntersection), S.push(y.depthPacking);
  }
  function b(S, y) {
    o.disableAll(), y.supportsVertexTextures && o.enable(0), y.instancing && o.enable(1), y.instancingColor && o.enable(2), y.instancingMorph && o.enable(3), y.matcap && o.enable(4), y.envMap && o.enable(5), y.normalMapObjectSpace && o.enable(6), y.normalMapTangentSpace && o.enable(7), y.clearcoat && o.enable(8), y.iridescence && o.enable(9), y.alphaTest && o.enable(10), y.vertexColors && o.enable(11), y.vertexAlphas && o.enable(12), y.vertexUv1s && o.enable(13), y.vertexUv2s && o.enable(14), y.vertexUv3s && o.enable(15), y.vertexTangents && o.enable(16), y.anisotropy && o.enable(17), y.alphaHash && o.enable(18), y.batching && o.enable(19), y.dispersion && o.enable(20), y.batchingColor && o.enable(21), S.push(o.mask), o.disableAll(), y.fog && o.enable(0), y.useFog && o.enable(1), y.flatShading && o.enable(2), y.logarithmicDepthBuffer && o.enable(3), y.reverseDepthBuffer && o.enable(4), y.skinning && o.enable(5), y.morphTargets && o.enable(6), y.morphNormals && o.enable(7), y.morphColors && o.enable(8), y.premultipliedAlpha && o.enable(9), y.shadowMapEnabled && o.enable(10), y.doubleSided && o.enable(11), y.flipSided && o.enable(12), y.useDepthPacking && o.enable(13), y.dithering && o.enable(14), y.transmission && o.enable(15), y.sheen && o.enable(16), y.opaque && o.enable(17), y.pointsUvs && o.enable(18), y.decodeVideoTexture && o.enable(19), y.decodeVideoTextureEmissive && o.enable(20), y.alphaToCoverage && o.enable(21), S.push(o.mask);
  }
  function M(S) {
    const y = g[S.type];
    let C;
    if (y) {
      const X = an[y];
      C = rf.clone(X.uniforms);
    } else
      C = S.uniforms;
    return C;
  }
  function N(S, y) {
    let C;
    for (let X = 0, z = h.length; X < z; X++) {
      const W = h[X];
      if (W.cacheKey === y) {
        C = W, ++C.usedTimes;
        break;
      }
    }
    return C === void 0 && (C = new v_(i, y, S, r), h.push(C)), C;
  }
  function w(S) {
    if (--S.usedTimes === 0) {
      const y = h.indexOf(S);
      h[y] = h[h.length - 1], h.pop(), S.destroy();
    }
  }
  function R(S) {
    l.remove(S);
  }
  function U() {
    l.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: f,
    getUniforms: M,
    acquireProgram: N,
    releaseProgram: w,
    releaseShaderCache: R,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: U
  };
}
function b_() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(a) {
    return i.has(a);
  }
  function t(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function s(a, o, l) {
    i.get(a)[o] = l;
  }
  function r() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: n,
    update: s,
    dispose: r
  };
}
function E_(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function yc(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function Sc() {
  const i = [];
  let e = 0;
  const t = [], n = [], s = [];
  function r() {
    e = 0, t.length = 0, n.length = 0, s.length = 0;
  }
  function a(u, d, p, g, _, m) {
    let f = i[e];
    return f === void 0 ? (f = {
      id: u.id,
      object: u,
      geometry: d,
      material: p,
      groupOrder: g,
      renderOrder: u.renderOrder,
      z: _,
      group: m
    }, i[e] = f) : (f.id = u.id, f.object = u, f.geometry = d, f.material = p, f.groupOrder = g, f.renderOrder = u.renderOrder, f.z = _, f.group = m), e++, f;
  }
  function o(u, d, p, g, _, m) {
    const f = a(u, d, p, g, _, m);
    p.transmission > 0 ? n.push(f) : p.transparent === !0 ? s.push(f) : t.push(f);
  }
  function l(u, d, p, g, _, m) {
    const f = a(u, d, p, g, _, m);
    p.transmission > 0 ? n.unshift(f) : p.transparent === !0 ? s.unshift(f) : t.unshift(f);
  }
  function c(u, d) {
    t.length > 1 && t.sort(u || E_), n.length > 1 && n.sort(d || yc), s.length > 1 && s.sort(d || yc);
  }
  function h() {
    for (let u = e, d = i.length; u < d; u++) {
      const p = i[u];
      if (p.id === null) break;
      p.id = null, p.object = null, p.geometry = null, p.material = null, p.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: s,
    init: r,
    push: o,
    unshift: l,
    finish: h,
    sort: c
  };
}
function T_() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, s) {
    const r = i.get(n);
    let a;
    return r === void 0 ? (a = new Sc(), i.set(n, [a])) : s >= r.length ? (a = new Sc(), r.push(a)) : a = r[s], a;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function A_() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new A(),
            color: new Ee()
          };
          break;
        case "SpotLight":
          t = {
            position: new A(),
            direction: new A(),
            color: new Ee(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new A(),
            color: new Ee(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new A(),
            skyColor: new Ee(),
            groundColor: new Ee()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Ee(),
            position: new A(),
            halfWidth: new A(),
            halfHeight: new A()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function w_() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Te()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Te()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Te(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let R_ = 0;
function C_(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function P_(i) {
  const e = new A_(), t = w_(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) n.probe.push(new A());
  const s = new A(), r = new Ce(), a = new Ce();
  function o(c) {
    let h = 0, u = 0, d = 0;
    for (let S = 0; S < 9; S++) n.probe[S].set(0, 0, 0);
    let p = 0, g = 0, _ = 0, m = 0, f = 0, T = 0, b = 0, M = 0, N = 0, w = 0, R = 0;
    c.sort(C_);
    for (let S = 0, y = c.length; S < y; S++) {
      const C = c[S], X = C.color, z = C.intensity, W = C.distance, K = C.shadow && C.shadow.map ? C.shadow.map.texture : null;
      if (C.isAmbientLight)
        h += X.r * z, u += X.g * z, d += X.b * z;
      else if (C.isLightProbe) {
        for (let V = 0; V < 9; V++)
          n.probe[V].addScaledVector(C.sh.coefficients[V], z);
        R++;
      } else if (C.isDirectionalLight) {
        const V = e.get(C);
        if (V.color.copy(C.color).multiplyScalar(C.intensity), C.castShadow) {
          const Q = C.shadow, H = t.get(C);
          H.shadowIntensity = Q.intensity, H.shadowBias = Q.bias, H.shadowNormalBias = Q.normalBias, H.shadowRadius = Q.radius, H.shadowMapSize = Q.mapSize, n.directionalShadow[p] = H, n.directionalShadowMap[p] = K, n.directionalShadowMatrix[p] = C.shadow.matrix, T++;
        }
        n.directional[p] = V, p++;
      } else if (C.isSpotLight) {
        const V = e.get(C);
        V.position.setFromMatrixPosition(C.matrixWorld), V.color.copy(X).multiplyScalar(z), V.distance = W, V.coneCos = Math.cos(C.angle), V.penumbraCos = Math.cos(C.angle * (1 - C.penumbra)), V.decay = C.decay, n.spot[_] = V;
        const Q = C.shadow;
        if (C.map && (n.spotLightMap[N] = C.map, N++, Q.updateMatrices(C), C.castShadow && w++), n.spotLightMatrix[_] = Q.matrix, C.castShadow) {
          const H = t.get(C);
          H.shadowIntensity = Q.intensity, H.shadowBias = Q.bias, H.shadowNormalBias = Q.normalBias, H.shadowRadius = Q.radius, H.shadowMapSize = Q.mapSize, n.spotShadow[_] = H, n.spotShadowMap[_] = K, M++;
        }
        _++;
      } else if (C.isRectAreaLight) {
        const V = e.get(C);
        V.color.copy(X).multiplyScalar(z), V.halfWidth.set(C.width * 0.5, 0, 0), V.halfHeight.set(0, C.height * 0.5, 0), n.rectArea[m] = V, m++;
      } else if (C.isPointLight) {
        const V = e.get(C);
        if (V.color.copy(C.color).multiplyScalar(C.intensity), V.distance = C.distance, V.decay = C.decay, C.castShadow) {
          const Q = C.shadow, H = t.get(C);
          H.shadowIntensity = Q.intensity, H.shadowBias = Q.bias, H.shadowNormalBias = Q.normalBias, H.shadowRadius = Q.radius, H.shadowMapSize = Q.mapSize, H.shadowCameraNear = Q.camera.near, H.shadowCameraFar = Q.camera.far, n.pointShadow[g] = H, n.pointShadowMap[g] = K, n.pointShadowMatrix[g] = C.shadow.matrix, b++;
        }
        n.point[g] = V, g++;
      } else if (C.isHemisphereLight) {
        const V = e.get(C);
        V.skyColor.copy(C.color).multiplyScalar(z), V.groundColor.copy(C.groundColor).multiplyScalar(z), n.hemi[f] = V, f++;
      }
    }
    m > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = te.LTC_FLOAT_1, n.rectAreaLTC2 = te.LTC_FLOAT_2) : (n.rectAreaLTC1 = te.LTC_HALF_1, n.rectAreaLTC2 = te.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = u, n.ambient[2] = d;
    const U = n.hash;
    (U.directionalLength !== p || U.pointLength !== g || U.spotLength !== _ || U.rectAreaLength !== m || U.hemiLength !== f || U.numDirectionalShadows !== T || U.numPointShadows !== b || U.numSpotShadows !== M || U.numSpotMaps !== N || U.numLightProbes !== R) && (n.directional.length = p, n.spot.length = _, n.rectArea.length = m, n.point.length = g, n.hemi.length = f, n.directionalShadow.length = T, n.directionalShadowMap.length = T, n.pointShadow.length = b, n.pointShadowMap.length = b, n.spotShadow.length = M, n.spotShadowMap.length = M, n.directionalShadowMatrix.length = T, n.pointShadowMatrix.length = b, n.spotLightMatrix.length = M + N - w, n.spotLightMap.length = N, n.numSpotLightShadowsWithMaps = w, n.numLightProbes = R, U.directionalLength = p, U.pointLength = g, U.spotLength = _, U.rectAreaLength = m, U.hemiLength = f, U.numDirectionalShadows = T, U.numPointShadows = b, U.numSpotShadows = M, U.numSpotMaps = N, U.numLightProbes = R, n.version = R_++);
  }
  function l(c, h) {
    let u = 0, d = 0, p = 0, g = 0, _ = 0;
    const m = h.matrixWorldInverse;
    for (let f = 0, T = c.length; f < T; f++) {
      const b = c[f];
      if (b.isDirectionalLight) {
        const M = n.directional[u];
        M.direction.setFromMatrixPosition(b.matrixWorld), s.setFromMatrixPosition(b.target.matrixWorld), M.direction.sub(s), M.direction.transformDirection(m), u++;
      } else if (b.isSpotLight) {
        const M = n.spot[p];
        M.position.setFromMatrixPosition(b.matrixWorld), M.position.applyMatrix4(m), M.direction.setFromMatrixPosition(b.matrixWorld), s.setFromMatrixPosition(b.target.matrixWorld), M.direction.sub(s), M.direction.transformDirection(m), p++;
      } else if (b.isRectAreaLight) {
        const M = n.rectArea[g];
        M.position.setFromMatrixPosition(b.matrixWorld), M.position.applyMatrix4(m), a.identity(), r.copy(b.matrixWorld), r.premultiply(m), a.extractRotation(r), M.halfWidth.set(b.width * 0.5, 0, 0), M.halfHeight.set(0, b.height * 0.5, 0), M.halfWidth.applyMatrix4(a), M.halfHeight.applyMatrix4(a), g++;
      } else if (b.isPointLight) {
        const M = n.point[d];
        M.position.setFromMatrixPosition(b.matrixWorld), M.position.applyMatrix4(m), d++;
      } else if (b.isHemisphereLight) {
        const M = n.hemi[_];
        M.direction.setFromMatrixPosition(b.matrixWorld), M.direction.transformDirection(m), _++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: n
  };
}
function bc(i) {
  const e = new P_(i), t = [], n = [];
  function s(h) {
    c.camera = h, t.length = 0, n.length = 0;
  }
  function r(h) {
    t.push(h);
  }
  function a(h) {
    n.push(h);
  }
  function o() {
    e.setup(t);
  }
  function l(h) {
    e.setupView(t, h);
  }
  const c = {
    lightsArray: t,
    shadowsArray: n,
    camera: null,
    lights: e,
    transmissionRenderTarget: {}
  };
  return {
    init: s,
    state: c,
    setupLights: o,
    setupLightsView: l,
    pushLight: r,
    pushShadow: a
  };
}
function L_(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(s, r = 0) {
    const a = e.get(s);
    let o;
    return a === void 0 ? (o = new bc(i), e.set(s, [o])) : r >= a.length ? (o = new bc(i), a.push(o)) : o = a[r], o;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
class D_ extends tn {
  static get type() {
    return "MeshDepthMaterial";
  }
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.depthPacking = dd, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class I_ extends tn {
  static get type() {
    return "MeshDistanceMaterial";
  }
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const U_ = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, N_ = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function F_(i, e, t) {
  let n = new Vo();
  const s = new Te(), r = new Te(), a = new Ye(), o = new D_({ depthPacking: fd }), l = new I_(), c = {}, h = t.maxTextureSize, u = { [Cn]: Nt, [Nt]: Cn, [Zt]: Zt }, d = new jn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Te() },
      radius: { value: 4 }
    },
    vertexShader: U_,
    fragmentShader: N_
  }), p = d.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const g = new sn();
  g.setAttribute(
    "position",
    new Pt(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const _ = new pt(g, d), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = uh;
  let f = this.type;
  this.render = function(w, R, U) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || w.length === 0) return;
    const S = i.getRenderTarget(), y = i.getActiveCubeFace(), C = i.getActiveMipmapLevel(), X = i.state;
    X.setBlending(Yn), X.buffers.color.setClear(1, 1, 1, 1), X.buffers.depth.setTest(!0), X.setScissorTest(!1);
    const z = f !== Sn && this.type === Sn, W = f === Sn && this.type !== Sn;
    for (let K = 0, V = w.length; K < V; K++) {
      const Q = w[K], H = Q.shadow;
      if (H === void 0) {
        console.warn("THREE.WebGLShadowMap:", Q, "has no shadow.");
        continue;
      }
      if (H.autoUpdate === !1 && H.needsUpdate === !1) continue;
      s.copy(H.mapSize);
      const ie = H.getFrameExtents();
      if (s.multiply(ie), r.copy(H.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / ie.x), s.x = r.x * ie.x, H.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / ie.y), s.y = r.y * ie.y, H.mapSize.y = r.y)), H.map === null || z === !0 || W === !0) {
        const xe = this.type !== Sn ? { minFilter: Ct, magFilter: Ct } : {};
        H.map !== null && H.map.dispose(), H.map = new fi(s.x, s.y, xe), H.map.texture.name = Q.name + ".shadowMap", H.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(H.map), i.clear();
      const ce = H.getViewportCount();
      for (let xe = 0; xe < ce; xe++) {
        const Oe = H.getViewport(xe);
        a.set(
          r.x * Oe.x,
          r.y * Oe.y,
          r.x * Oe.z,
          r.y * Oe.w
        ), X.viewport(a), H.updateMatrices(Q, xe), n = H.getFrustum(), M(R, U, H.camera, Q, this.type);
      }
      H.isPointLightShadow !== !0 && this.type === Sn && T(H, U), H.needsUpdate = !1;
    }
    f = this.type, m.needsUpdate = !1, i.setRenderTarget(S, y, C);
  };
  function T(w, R) {
    const U = e.update(_);
    d.defines.VSM_SAMPLES !== w.blurSamples && (d.defines.VSM_SAMPLES = w.blurSamples, p.defines.VSM_SAMPLES = w.blurSamples, d.needsUpdate = !0, p.needsUpdate = !0), w.mapPass === null && (w.mapPass = new fi(s.x, s.y)), d.uniforms.shadow_pass.value = w.map.texture, d.uniforms.resolution.value = w.mapSize, d.uniforms.radius.value = w.radius, i.setRenderTarget(w.mapPass), i.clear(), i.renderBufferDirect(R, null, U, d, _, null), p.uniforms.shadow_pass.value = w.mapPass.texture, p.uniforms.resolution.value = w.mapSize, p.uniforms.radius.value = w.radius, i.setRenderTarget(w.map), i.clear(), i.renderBufferDirect(R, null, U, p, _, null);
  }
  function b(w, R, U, S) {
    let y = null;
    const C = U.isPointLight === !0 ? w.customDistanceMaterial : w.customDepthMaterial;
    if (C !== void 0)
      y = C;
    else if (y = U.isPointLight === !0 ? l : o, i.localClippingEnabled && R.clipShadows === !0 && Array.isArray(R.clippingPlanes) && R.clippingPlanes.length !== 0 || R.displacementMap && R.displacementScale !== 0 || R.alphaMap && R.alphaTest > 0 || R.map && R.alphaTest > 0) {
      const X = y.uuid, z = R.uuid;
      let W = c[X];
      W === void 0 && (W = {}, c[X] = W);
      let K = W[z];
      K === void 0 && (K = y.clone(), W[z] = K, R.addEventListener("dispose", N)), y = K;
    }
    if (y.visible = R.visible, y.wireframe = R.wireframe, S === Sn ? y.side = R.shadowSide !== null ? R.shadowSide : R.side : y.side = R.shadowSide !== null ? R.shadowSide : u[R.side], y.alphaMap = R.alphaMap, y.alphaTest = R.alphaTest, y.map = R.map, y.clipShadows = R.clipShadows, y.clippingPlanes = R.clippingPlanes, y.clipIntersection = R.clipIntersection, y.displacementMap = R.displacementMap, y.displacementScale = R.displacementScale, y.displacementBias = R.displacementBias, y.wireframeLinewidth = R.wireframeLinewidth, y.linewidth = R.linewidth, U.isPointLight === !0 && y.isMeshDistanceMaterial === !0) {
      const X = i.properties.get(y);
      X.light = U;
    }
    return y;
  }
  function M(w, R, U, S, y) {
    if (w.visible === !1) return;
    if (w.layers.test(R.layers) && (w.isMesh || w.isLine || w.isPoints) && (w.castShadow || w.receiveShadow && y === Sn) && (!w.frustumCulled || n.intersectsObject(w))) {
      w.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse, w.matrixWorld);
      const z = e.update(w), W = w.material;
      if (Array.isArray(W)) {
        const K = z.groups;
        for (let V = 0, Q = K.length; V < Q; V++) {
          const H = K[V], ie = W[H.materialIndex];
          if (ie && ie.visible) {
            const ce = b(w, ie, S, y);
            w.onBeforeShadow(i, w, R, U, z, ce, H), i.renderBufferDirect(U, null, z, ce, w, H), w.onAfterShadow(i, w, R, U, z, ce, H);
          }
        }
      } else if (W.visible) {
        const K = b(w, W, S, y);
        w.onBeforeShadow(i, w, R, U, z, K, null), i.renderBufferDirect(U, null, z, K, w, null), w.onAfterShadow(i, w, R, U, z, K, null);
      }
    }
    const X = w.children;
    for (let z = 0, W = X.length; z < W; z++)
      M(X[z], R, U, S, y);
  }
  function N(w) {
    w.target.removeEventListener("dispose", N);
    for (const U in c) {
      const S = c[U], y = w.target.uuid;
      y in S && (S[y].dispose(), delete S[y]);
    }
  }
}
const O_ = {
  [Ia]: Ua,
  [Na]: Ba,
  [Fa]: za,
  [Vi]: Oa,
  [Ua]: Ia,
  [Ba]: Na,
  [za]: Fa,
  [Oa]: Vi
};
function B_(i, e) {
  function t() {
    let P = !1;
    const ne = new Ye();
    let k = null;
    const q = new Ye(0, 0, 0, 0);
    return {
      setMask: function(le) {
        k !== le && !P && (i.colorMask(le, le, le, le), k = le);
      },
      setLocked: function(le) {
        P = le;
      },
      setClear: function(le, ae, Pe, ct, St) {
        St === !0 && (le *= ct, ae *= ct, Pe *= ct), ne.set(le, ae, Pe, ct), q.equals(ne) === !1 && (i.clearColor(le, ae, Pe, ct), q.copy(ne));
      },
      reset: function() {
        P = !1, k = null, q.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let P = !1, ne = !1, k = null, q = null, le = null;
    return {
      setReversed: function(ae) {
        if (ne !== ae) {
          const Pe = e.get("EXT_clip_control");
          ne ? Pe.clipControlEXT(Pe.LOWER_LEFT_EXT, Pe.ZERO_TO_ONE_EXT) : Pe.clipControlEXT(Pe.LOWER_LEFT_EXT, Pe.NEGATIVE_ONE_TO_ONE_EXT);
          const ct = le;
          le = null, this.setClear(ct);
        }
        ne = ae;
      },
      getReversed: function() {
        return ne;
      },
      setTest: function(ae) {
        ae ? se(i.DEPTH_TEST) : be(i.DEPTH_TEST);
      },
      setMask: function(ae) {
        k !== ae && !P && (i.depthMask(ae), k = ae);
      },
      setFunc: function(ae) {
        if (ne && (ae = O_[ae]), q !== ae) {
          switch (ae) {
            case Ia:
              i.depthFunc(i.NEVER);
              break;
            case Ua:
              i.depthFunc(i.ALWAYS);
              break;
            case Na:
              i.depthFunc(i.LESS);
              break;
            case Vi:
              i.depthFunc(i.LEQUAL);
              break;
            case Fa:
              i.depthFunc(i.EQUAL);
              break;
            case Oa:
              i.depthFunc(i.GEQUAL);
              break;
            case Ba:
              i.depthFunc(i.GREATER);
              break;
            case za:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          q = ae;
        }
      },
      setLocked: function(ae) {
        P = ae;
      },
      setClear: function(ae) {
        le !== ae && (ne && (ae = 1 - ae), i.clearDepth(ae), le = ae);
      },
      reset: function() {
        P = !1, k = null, q = null, le = null, ne = !1;
      }
    };
  }
  function s() {
    let P = !1, ne = null, k = null, q = null, le = null, ae = null, Pe = null, ct = null, St = null;
    return {
      setTest: function(Ke) {
        P || (Ke ? se(i.STENCIL_TEST) : be(i.STENCIL_TEST));
      },
      setMask: function(Ke) {
        ne !== Ke && !P && (i.stencilMask(Ke), ne = Ke);
      },
      setFunc: function(Ke, Xt, pn) {
        (k !== Ke || q !== Xt || le !== pn) && (i.stencilFunc(Ke, Xt, pn), k = Ke, q = Xt, le = pn);
      },
      setOp: function(Ke, Xt, pn) {
        (ae !== Ke || Pe !== Xt || ct !== pn) && (i.stencilOp(Ke, Xt, pn), ae = Ke, Pe = Xt, ct = pn);
      },
      setLocked: function(Ke) {
        P = Ke;
      },
      setClear: function(Ke) {
        St !== Ke && (i.clearStencil(Ke), St = Ke);
      },
      reset: function() {
        P = !1, ne = null, k = null, q = null, le = null, ae = null, Pe = null, ct = null, St = null;
      }
    };
  }
  const r = new t(), a = new n(), o = new s(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, u = {}, d = /* @__PURE__ */ new WeakMap(), p = [], g = null, _ = !1, m = null, f = null, T = null, b = null, M = null, N = null, w = null, R = new Ee(0, 0, 0), U = 0, S = !1, y = null, C = null, X = null, z = null, W = null;
  const K = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let V = !1, Q = 0;
  const H = i.getParameter(i.VERSION);
  H.indexOf("WebGL") !== -1 ? (Q = parseFloat(/^WebGL (\d)/.exec(H)[1]), V = Q >= 1) : H.indexOf("OpenGL ES") !== -1 && (Q = parseFloat(/^OpenGL ES (\d)/.exec(H)[1]), V = Q >= 2);
  let ie = null, ce = {};
  const xe = i.getParameter(i.SCISSOR_BOX), Oe = i.getParameter(i.VIEWPORT), tt = new Ye().fromArray(xe), $ = new Ye().fromArray(Oe);
  function ee(P, ne, k, q) {
    const le = new Uint8Array(4), ae = i.createTexture();
    i.bindTexture(P, ae), i.texParameteri(P, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(P, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Pe = 0; Pe < k; Pe++)
      P === i.TEXTURE_3D || P === i.TEXTURE_2D_ARRAY ? i.texImage3D(ne, 0, i.RGBA, 1, 1, q, 0, i.RGBA, i.UNSIGNED_BYTE, le) : i.texImage2D(ne + Pe, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, le);
    return ae;
  }
  const ge = {};
  ge[i.TEXTURE_2D] = ee(i.TEXTURE_2D, i.TEXTURE_2D, 1), ge[i.TEXTURE_CUBE_MAP] = ee(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), ge[i.TEXTURE_2D_ARRAY] = ee(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), ge[i.TEXTURE_3D] = ee(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), se(i.DEPTH_TEST), a.setFunc(Vi), He(!1), Ve(bl), se(i.CULL_FACE), I(Yn);
  function se(P) {
    h[P] !== !0 && (i.enable(P), h[P] = !0);
  }
  function be(P) {
    h[P] !== !1 && (i.disable(P), h[P] = !1);
  }
  function Re(P, ne) {
    return u[P] !== ne ? (i.bindFramebuffer(P, ne), u[P] = ne, P === i.DRAW_FRAMEBUFFER && (u[i.FRAMEBUFFER] = ne), P === i.FRAMEBUFFER && (u[i.DRAW_FRAMEBUFFER] = ne), !0) : !1;
  }
  function Be(P, ne) {
    let k = p, q = !1;
    if (P) {
      k = d.get(ne), k === void 0 && (k = [], d.set(ne, k));
      const le = P.textures;
      if (k.length !== le.length || k[0] !== i.COLOR_ATTACHMENT0) {
        for (let ae = 0, Pe = le.length; ae < Pe; ae++)
          k[ae] = i.COLOR_ATTACHMENT0 + ae;
        k.length = le.length, q = !0;
      }
    } else
      k[0] !== i.BACK && (k[0] = i.BACK, q = !0);
    q && i.drawBuffers(k);
  }
  function lt(P) {
    return g !== P ? (i.useProgram(P), g = P, !0) : !1;
  }
  const We = {
    [ai]: i.FUNC_ADD,
    [Bu]: i.FUNC_SUBTRACT,
    [zu]: i.FUNC_REVERSE_SUBTRACT
  };
  We[ku] = i.MIN, We[Hu] = i.MAX;
  const ht = {
    [Vu]: i.ZERO,
    [Gu]: i.ONE,
    [Wu]: i.SRC_COLOR,
    [La]: i.SRC_ALPHA,
    [Ku]: i.SRC_ALPHA_SATURATE,
    [qu]: i.DST_COLOR,
    [Xu]: i.DST_ALPHA,
    [$u]: i.ONE_MINUS_SRC_COLOR,
    [Da]: i.ONE_MINUS_SRC_ALPHA,
    [ju]: i.ONE_MINUS_DST_COLOR,
    [Yu]: i.ONE_MINUS_DST_ALPHA,
    [Zu]: i.CONSTANT_COLOR,
    [Ju]: i.ONE_MINUS_CONSTANT_COLOR,
    [Qu]: i.CONSTANT_ALPHA,
    [ed]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function I(P, ne, k, q, le, ae, Pe, ct, St, Ke) {
    if (P === Yn) {
      _ === !0 && (be(i.BLEND), _ = !1);
      return;
    }
    if (_ === !1 && (se(i.BLEND), _ = !0), P !== Ou) {
      if (P !== m || Ke !== S) {
        if ((f !== ai || M !== ai) && (i.blendEquation(i.FUNC_ADD), f = ai, M = ai), Ke)
          switch (P) {
            case Ni:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case El:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case Tl:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case Al:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        else
          switch (P) {
            case Ni:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case El:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case Tl:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case Al:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        T = null, b = null, N = null, w = null, R.set(0, 0, 0), U = 0, m = P, S = Ke;
      }
      return;
    }
    le = le || ne, ae = ae || k, Pe = Pe || q, (ne !== f || le !== M) && (i.blendEquationSeparate(We[ne], We[le]), f = ne, M = le), (k !== T || q !== b || ae !== N || Pe !== w) && (i.blendFuncSeparate(ht[k], ht[q], ht[ae], ht[Pe]), T = k, b = q, N = ae, w = Pe), (ct.equals(R) === !1 || St !== U) && (i.blendColor(ct.r, ct.g, ct.b, St), R.copy(ct), U = St), m = P, S = !1;
  }
  function kt(P, ne) {
    P.side === Zt ? be(i.CULL_FACE) : se(i.CULL_FACE);
    let k = P.side === Nt;
    ne && (k = !k), He(k), P.blending === Ni && P.transparent === !1 ? I(Yn) : I(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.blendColor, P.blendAlpha, P.premultipliedAlpha), a.setFunc(P.depthFunc), a.setTest(P.depthTest), a.setMask(P.depthWrite), r.setMask(P.colorWrite);
    const q = P.stencilWrite;
    o.setTest(q), q && (o.setMask(P.stencilWriteMask), o.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), o.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), st(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === !0 ? se(i.SAMPLE_ALPHA_TO_COVERAGE) : be(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function He(P) {
    y !== P && (P ? i.frontFace(i.CW) : i.frontFace(i.CCW), y = P);
  }
  function Ve(P) {
    P !== Nu ? (se(i.CULL_FACE), P !== C && (P === bl ? i.cullFace(i.BACK) : P === Fu ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : be(i.CULL_FACE), C = P;
  }
  function ye(P) {
    P !== X && (V && i.lineWidth(P), X = P);
  }
  function st(P, ne, k) {
    P ? (se(i.POLYGON_OFFSET_FILL), (z !== ne || W !== k) && (i.polygonOffset(ne, k), z = ne, W = k)) : be(i.POLYGON_OFFSET_FILL);
  }
  function Me(P) {
    P ? se(i.SCISSOR_TEST) : be(i.SCISSOR_TEST);
  }
  function E(P) {
    P === void 0 && (P = i.TEXTURE0 + K - 1), ie !== P && (i.activeTexture(P), ie = P);
  }
  function v(P, ne, k) {
    k === void 0 && (ie === null ? k = i.TEXTURE0 + K - 1 : k = ie);
    let q = ce[k];
    q === void 0 && (q = { type: void 0, texture: void 0 }, ce[k] = q), (q.type !== P || q.texture !== ne) && (ie !== k && (i.activeTexture(k), ie = k), i.bindTexture(P, ne || ge[P]), q.type = P, q.texture = ne);
  }
  function F() {
    const P = ce[ie];
    P !== void 0 && P.type !== void 0 && (i.bindTexture(P.type, null), P.type = void 0, P.texture = void 0);
  }
  function Y() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function j() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function G() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function _e() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function re() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function he() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function $e() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Z() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ue() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Se() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Ae(P) {
    tt.equals(P) === !1 && (i.scissor(P.x, P.y, P.z, P.w), tt.copy(P));
  }
  function de(P) {
    $.equals(P) === !1 && (i.viewport(P.x, P.y, P.z, P.w), $.copy(P));
  }
  function Ge(P, ne) {
    let k = c.get(ne);
    k === void 0 && (k = /* @__PURE__ */ new WeakMap(), c.set(ne, k));
    let q = k.get(P);
    q === void 0 && (q = i.getUniformBlockIndex(ne, P.name), k.set(P, q));
  }
  function Ie(P, ne) {
    const q = c.get(ne).get(P);
    l.get(ne) !== q && (i.uniformBlockBinding(ne, q, P.__bindingPointIndex), l.set(ne, q));
  }
  function nt() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), a.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, ie = null, ce = {}, u = {}, d = /* @__PURE__ */ new WeakMap(), p = [], g = null, _ = !1, m = null, f = null, T = null, b = null, M = null, N = null, w = null, R = new Ee(0, 0, 0), U = 0, S = !1, y = null, C = null, X = null, z = null, W = null, tt.set(0, 0, i.canvas.width, i.canvas.height), $.set(0, 0, i.canvas.width, i.canvas.height), r.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: r,
      depth: a,
      stencil: o
    },
    enable: se,
    disable: be,
    bindFramebuffer: Re,
    drawBuffers: Be,
    useProgram: lt,
    setBlending: I,
    setMaterial: kt,
    setFlipSided: He,
    setCullFace: Ve,
    setLineWidth: ye,
    setPolygonOffset: st,
    setScissorTest: Me,
    activeTexture: E,
    bindTexture: v,
    unbindTexture: F,
    compressedTexImage2D: Y,
    compressedTexImage3D: j,
    texImage2D: ue,
    texImage3D: Se,
    updateUBOMapping: Ge,
    uniformBlockBinding: Ie,
    texStorage2D: $e,
    texStorage3D: Z,
    texSubImage2D: G,
    texSubImage3D: _e,
    compressedTexSubImage2D: re,
    compressedTexSubImage3D: he,
    scissor: Ae,
    viewport: de,
    reset: nt
  };
}
function Ec(i, e, t, n) {
  const s = z_(n);
  switch (t) {
    case Mh:
      return i * e;
    case Sh:
      return i * e;
    case bh:
      return i * e * 2;
    case No:
      return i * e / s.components * s.byteLength;
    case Fo:
      return i * e / s.components * s.byteLength;
    case Eh:
      return i * e * 2 / s.components * s.byteLength;
    case Oo:
      return i * e * 2 / s.components * s.byteLength;
    case yh:
      return i * e * 3 / s.components * s.byteLength;
    case $t:
      return i * e * 4 / s.components * s.byteLength;
    case Bo:
      return i * e * 4 / s.components * s.byteLength;
    case Mr:
    case yr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Sr:
    case br:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case Ga:
    case $a:
      return Math.max(i, 16) * Math.max(e, 8) / 4;
    case Va:
    case Wa:
      return Math.max(i, 8) * Math.max(e, 8) / 2;
    case Xa:
    case Ya:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case qa:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case ja:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case Ka:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case Za:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case Ja:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case Qa:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case eo:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case to:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case no:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case io:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case so:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case ro:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case ao:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case oo:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case lo:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    case Er:
    case co:
    case ho:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    case Th:
    case uo:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case fo:
    case po:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function z_(i) {
  switch (i) {
    case Pn:
    case _h:
      return { byteLength: 1, components: 1 };
    case Ps:
    case vh:
    case Fs:
      return { byteLength: 2, components: 1 };
    case Io:
    case Uo:
      return { byteLength: 2, components: 4 };
    case di:
    case Do:
    case Qt:
      return { byteLength: 4, components: 1 };
    case xh:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function k_(i, e, t, n, s, r, a) {
  const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new Te(), h = /* @__PURE__ */ new WeakMap();
  let u;
  const d = /* @__PURE__ */ new WeakMap();
  let p = !1;
  try {
    p = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(E, v) {
    return p ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(E, v)
    ) : Is("canvas");
  }
  function _(E, v, F) {
    let Y = 1;
    const j = Me(E);
    if ((j.width > F || j.height > F) && (Y = F / Math.max(j.width, j.height)), Y < 1)
      if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap || typeof VideoFrame < "u" && E instanceof VideoFrame) {
        const G = Math.floor(Y * j.width), _e = Math.floor(Y * j.height);
        u === void 0 && (u = g(G, _e));
        const re = v ? g(G, _e) : u;
        return re.width = G, re.height = _e, re.getContext("2d").drawImage(E, 0, 0, G, _e), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + j.width + "x" + j.height + ") to (" + G + "x" + _e + ")."), re;
      } else
        return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + j.width + "x" + j.height + ")."), E;
    return E;
  }
  function m(E) {
    return E.generateMipmaps;
  }
  function f(E) {
    i.generateMipmap(E);
  }
  function T(E) {
    return E.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : E.isWebGL3DRenderTarget ? i.TEXTURE_3D : E.isWebGLArrayRenderTarget || E.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function b(E, v, F, Y, j = !1) {
    if (E !== null) {
      if (i[E] !== void 0) return i[E];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let G = v;
    if (v === i.RED && (F === i.FLOAT && (G = i.R32F), F === i.HALF_FLOAT && (G = i.R16F), F === i.UNSIGNED_BYTE && (G = i.R8)), v === i.RED_INTEGER && (F === i.UNSIGNED_BYTE && (G = i.R8UI), F === i.UNSIGNED_SHORT && (G = i.R16UI), F === i.UNSIGNED_INT && (G = i.R32UI), F === i.BYTE && (G = i.R8I), F === i.SHORT && (G = i.R16I), F === i.INT && (G = i.R32I)), v === i.RG && (F === i.FLOAT && (G = i.RG32F), F === i.HALF_FLOAT && (G = i.RG16F), F === i.UNSIGNED_BYTE && (G = i.RG8)), v === i.RG_INTEGER && (F === i.UNSIGNED_BYTE && (G = i.RG8UI), F === i.UNSIGNED_SHORT && (G = i.RG16UI), F === i.UNSIGNED_INT && (G = i.RG32UI), F === i.BYTE && (G = i.RG8I), F === i.SHORT && (G = i.RG16I), F === i.INT && (G = i.RG32I)), v === i.RGB_INTEGER && (F === i.UNSIGNED_BYTE && (G = i.RGB8UI), F === i.UNSIGNED_SHORT && (G = i.RGB16UI), F === i.UNSIGNED_INT && (G = i.RGB32UI), F === i.BYTE && (G = i.RGB8I), F === i.SHORT && (G = i.RGB16I), F === i.INT && (G = i.RGB32I)), v === i.RGBA_INTEGER && (F === i.UNSIGNED_BYTE && (G = i.RGBA8UI), F === i.UNSIGNED_SHORT && (G = i.RGBA16UI), F === i.UNSIGNED_INT && (G = i.RGBA32UI), F === i.BYTE && (G = i.RGBA8I), F === i.SHORT && (G = i.RGBA16I), F === i.INT && (G = i.RGBA32I)), v === i.RGB && F === i.UNSIGNED_INT_5_9_9_9_REV && (G = i.RGB9_E5), v === i.RGBA) {
      const _e = j ? Ur : ke.getTransfer(Y);
      F === i.FLOAT && (G = i.RGBA32F), F === i.HALF_FLOAT && (G = i.RGBA16F), F === i.UNSIGNED_BYTE && (G = _e === Qe ? i.SRGB8_ALPHA8 : i.RGBA8), F === i.UNSIGNED_SHORT_4_4_4_4 && (G = i.RGBA4), F === i.UNSIGNED_SHORT_5_5_5_1 && (G = i.RGB5_A1);
    }
    return (G === i.R16F || G === i.R32F || G === i.RG16F || G === i.RG32F || G === i.RGBA16F || G === i.RGBA32F) && e.get("EXT_color_buffer_float"), G;
  }
  function M(E, v) {
    let F;
    return E ? v === null || v === di || v === Xi ? F = i.DEPTH24_STENCIL8 : v === Qt ? F = i.DEPTH32F_STENCIL8 : v === Ps && (F = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : v === null || v === di || v === Xi ? F = i.DEPTH_COMPONENT24 : v === Qt ? F = i.DEPTH_COMPONENT32F : v === Ps && (F = i.DEPTH_COMPONENT16), F;
  }
  function N(E, v) {
    return m(E) === !0 || E.isFramebufferTexture && E.minFilter !== Ct && E.minFilter !== zt ? Math.log2(Math.max(v.width, v.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? v.mipmaps.length : 1;
  }
  function w(E) {
    const v = E.target;
    v.removeEventListener("dispose", w), U(v), v.isVideoTexture && h.delete(v);
  }
  function R(E) {
    const v = E.target;
    v.removeEventListener("dispose", R), y(v);
  }
  function U(E) {
    const v = n.get(E);
    if (v.__webglInit === void 0) return;
    const F = E.source, Y = d.get(F);
    if (Y) {
      const j = Y[v.__cacheKey];
      j.usedTimes--, j.usedTimes === 0 && S(E), Object.keys(Y).length === 0 && d.delete(F);
    }
    n.remove(E);
  }
  function S(E) {
    const v = n.get(E);
    i.deleteTexture(v.__webglTexture);
    const F = E.source, Y = d.get(F);
    delete Y[v.__cacheKey], a.memory.textures--;
  }
  function y(E) {
    const v = n.get(E);
    if (E.depthTexture && (E.depthTexture.dispose(), n.remove(E.depthTexture)), E.isWebGLCubeRenderTarget)
      for (let Y = 0; Y < 6; Y++) {
        if (Array.isArray(v.__webglFramebuffer[Y]))
          for (let j = 0; j < v.__webglFramebuffer[Y].length; j++) i.deleteFramebuffer(v.__webglFramebuffer[Y][j]);
        else
          i.deleteFramebuffer(v.__webglFramebuffer[Y]);
        v.__webglDepthbuffer && i.deleteRenderbuffer(v.__webglDepthbuffer[Y]);
      }
    else {
      if (Array.isArray(v.__webglFramebuffer))
        for (let Y = 0; Y < v.__webglFramebuffer.length; Y++) i.deleteFramebuffer(v.__webglFramebuffer[Y]);
      else
        i.deleteFramebuffer(v.__webglFramebuffer);
      if (v.__webglDepthbuffer && i.deleteRenderbuffer(v.__webglDepthbuffer), v.__webglMultisampledFramebuffer && i.deleteFramebuffer(v.__webglMultisampledFramebuffer), v.__webglColorRenderbuffer)
        for (let Y = 0; Y < v.__webglColorRenderbuffer.length; Y++)
          v.__webglColorRenderbuffer[Y] && i.deleteRenderbuffer(v.__webglColorRenderbuffer[Y]);
      v.__webglDepthRenderbuffer && i.deleteRenderbuffer(v.__webglDepthRenderbuffer);
    }
    const F = E.textures;
    for (let Y = 0, j = F.length; Y < j; Y++) {
      const G = n.get(F[Y]);
      G.__webglTexture && (i.deleteTexture(G.__webglTexture), a.memory.textures--), n.remove(F[Y]);
    }
    n.remove(E);
  }
  let C = 0;
  function X() {
    C = 0;
  }
  function z() {
    const E = C;
    return E >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + s.maxTextures), C += 1, E;
  }
  function W(E) {
    const v = [];
    return v.push(E.wrapS), v.push(E.wrapT), v.push(E.wrapR || 0), v.push(E.magFilter), v.push(E.minFilter), v.push(E.anisotropy), v.push(E.internalFormat), v.push(E.format), v.push(E.type), v.push(E.generateMipmaps), v.push(E.premultiplyAlpha), v.push(E.flipY), v.push(E.unpackAlignment), v.push(E.colorSpace), v.join();
  }
  function K(E, v) {
    const F = n.get(E);
    if (E.isVideoTexture && ye(E), E.isRenderTargetTexture === !1 && E.version > 0 && F.__version !== E.version) {
      const Y = E.image;
      if (Y === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (Y.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        $(F, E, v);
        return;
      }
    }
    t.bindTexture(i.TEXTURE_2D, F.__webglTexture, i.TEXTURE0 + v);
  }
  function V(E, v) {
    const F = n.get(E);
    if (E.version > 0 && F.__version !== E.version) {
      $(F, E, v);
      return;
    }
    t.bindTexture(i.TEXTURE_2D_ARRAY, F.__webglTexture, i.TEXTURE0 + v);
  }
  function Q(E, v) {
    const F = n.get(E);
    if (E.version > 0 && F.__version !== E.version) {
      $(F, E, v);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, F.__webglTexture, i.TEXTURE0 + v);
  }
  function H(E, v) {
    const F = n.get(E);
    if (E.version > 0 && F.__version !== E.version) {
      ee(F, E, v);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, F.__webglTexture, i.TEXTURE0 + v);
  }
  const ie = {
    [$i]: i.REPEAT,
    [Wn]: i.CLAMP_TO_EDGE,
    [Rr]: i.MIRRORED_REPEAT
  }, ce = {
    [Ct]: i.NEAREST,
    [gh]: i.NEAREST_MIPMAP_NEAREST,
    [Ms]: i.NEAREST_MIPMAP_LINEAR,
    [zt]: i.LINEAR,
    [xr]: i.LINEAR_MIPMAP_NEAREST,
    [En]: i.LINEAR_MIPMAP_LINEAR
  }, xe = {
    [md]: i.NEVER,
    [yd]: i.ALWAYS,
    [gd]: i.LESS,
    [Rh]: i.LEQUAL,
    [_d]: i.EQUAL,
    [Md]: i.GEQUAL,
    [vd]: i.GREATER,
    [xd]: i.NOTEQUAL
  };
  function Oe(E, v) {
    if (v.type === Qt && e.has("OES_texture_float_linear") === !1 && (v.magFilter === zt || v.magFilter === xr || v.magFilter === Ms || v.magFilter === En || v.minFilter === zt || v.minFilter === xr || v.minFilter === Ms || v.minFilter === En) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(E, i.TEXTURE_WRAP_S, ie[v.wrapS]), i.texParameteri(E, i.TEXTURE_WRAP_T, ie[v.wrapT]), (E === i.TEXTURE_3D || E === i.TEXTURE_2D_ARRAY) && i.texParameteri(E, i.TEXTURE_WRAP_R, ie[v.wrapR]), i.texParameteri(E, i.TEXTURE_MAG_FILTER, ce[v.magFilter]), i.texParameteri(E, i.TEXTURE_MIN_FILTER, ce[v.minFilter]), v.compareFunction && (i.texParameteri(E, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(E, i.TEXTURE_COMPARE_FUNC, xe[v.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (v.magFilter === Ct || v.minFilter !== Ms && v.minFilter !== En || v.type === Qt && e.has("OES_texture_float_linear") === !1) return;
      if (v.anisotropy > 1 || n.get(v).__currentAnisotropy) {
        const F = e.get("EXT_texture_filter_anisotropic");
        i.texParameterf(E, F.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(v.anisotropy, s.getMaxAnisotropy())), n.get(v).__currentAnisotropy = v.anisotropy;
      }
    }
  }
  function tt(E, v) {
    let F = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, v.addEventListener("dispose", w));
    const Y = v.source;
    let j = d.get(Y);
    j === void 0 && (j = {}, d.set(Y, j));
    const G = W(v);
    if (G !== E.__cacheKey) {
      j[G] === void 0 && (j[G] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, F = !0), j[G].usedTimes++;
      const _e = j[E.__cacheKey];
      _e !== void 0 && (j[E.__cacheKey].usedTimes--, _e.usedTimes === 0 && S(v)), E.__cacheKey = G, E.__webglTexture = j[G].texture;
    }
    return F;
  }
  function $(E, v, F) {
    let Y = i.TEXTURE_2D;
    (v.isDataArrayTexture || v.isCompressedArrayTexture) && (Y = i.TEXTURE_2D_ARRAY), v.isData3DTexture && (Y = i.TEXTURE_3D);
    const j = tt(E, v), G = v.source;
    t.bindTexture(Y, E.__webglTexture, i.TEXTURE0 + F);
    const _e = n.get(G);
    if (G.version !== _e.__version || j === !0) {
      t.activeTexture(i.TEXTURE0 + F);
      const re = ke.getPrimaries(ke.workingColorSpace), he = v.colorSpace === Gn ? null : ke.getPrimaries(v.colorSpace), $e = v.colorSpace === Gn || re === he ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, v.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, v.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, v.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, $e);
      let Z = _(v.image, !1, s.maxTextureSize);
      Z = st(v, Z);
      const ue = r.convert(v.format, v.colorSpace), Se = r.convert(v.type);
      let Ae = b(v.internalFormat, ue, Se, v.colorSpace, v.isVideoTexture);
      Oe(Y, v);
      let de;
      const Ge = v.mipmaps, Ie = v.isVideoTexture !== !0, nt = _e.__version === void 0 || j === !0, P = G.dataReady, ne = N(v, Z);
      if (v.isDepthTexture)
        Ae = M(v.format === Yi, v.type), nt && (Ie ? t.texStorage2D(i.TEXTURE_2D, 1, Ae, Z.width, Z.height) : t.texImage2D(i.TEXTURE_2D, 0, Ae, Z.width, Z.height, 0, ue, Se, null));
      else if (v.isDataTexture)
        if (Ge.length > 0) {
          Ie && nt && t.texStorage2D(i.TEXTURE_2D, ne, Ae, Ge[0].width, Ge[0].height);
          for (let k = 0, q = Ge.length; k < q; k++)
            de = Ge[k], Ie ? P && t.texSubImage2D(i.TEXTURE_2D, k, 0, 0, de.width, de.height, ue, Se, de.data) : t.texImage2D(i.TEXTURE_2D, k, Ae, de.width, de.height, 0, ue, Se, de.data);
          v.generateMipmaps = !1;
        } else
          Ie ? (nt && t.texStorage2D(i.TEXTURE_2D, ne, Ae, Z.width, Z.height), P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Z.width, Z.height, ue, Se, Z.data)) : t.texImage2D(i.TEXTURE_2D, 0, Ae, Z.width, Z.height, 0, ue, Se, Z.data);
      else if (v.isCompressedTexture)
        if (v.isCompressedArrayTexture) {
          Ie && nt && t.texStorage3D(i.TEXTURE_2D_ARRAY, ne, Ae, Ge[0].width, Ge[0].height, Z.depth);
          for (let k = 0, q = Ge.length; k < q; k++)
            if (de = Ge[k], v.format !== $t)
              if (ue !== null)
                if (Ie) {
                  if (P)
                    if (v.layerUpdates.size > 0) {
                      const le = Ec(de.width, de.height, v.format, v.type);
                      for (const ae of v.layerUpdates) {
                        const Pe = de.data.subarray(
                          ae * le / de.data.BYTES_PER_ELEMENT,
                          (ae + 1) * le / de.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, k, 0, 0, ae, de.width, de.height, 1, ue, Pe);
                      }
                      v.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, k, 0, 0, 0, de.width, de.height, Z.depth, ue, de.data);
                } else
                  t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, k, Ae, de.width, de.height, Z.depth, 0, de.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Ie ? P && t.texSubImage3D(i.TEXTURE_2D_ARRAY, k, 0, 0, 0, de.width, de.height, Z.depth, ue, Se, de.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, k, Ae, de.width, de.height, Z.depth, 0, ue, Se, de.data);
        } else {
          Ie && nt && t.texStorage2D(i.TEXTURE_2D, ne, Ae, Ge[0].width, Ge[0].height);
          for (let k = 0, q = Ge.length; k < q; k++)
            de = Ge[k], v.format !== $t ? ue !== null ? Ie ? P && t.compressedTexSubImage2D(i.TEXTURE_2D, k, 0, 0, de.width, de.height, ue, de.data) : t.compressedTexImage2D(i.TEXTURE_2D, k, Ae, de.width, de.height, 0, de.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ie ? P && t.texSubImage2D(i.TEXTURE_2D, k, 0, 0, de.width, de.height, ue, Se, de.data) : t.texImage2D(i.TEXTURE_2D, k, Ae, de.width, de.height, 0, ue, Se, de.data);
        }
      else if (v.isDataArrayTexture)
        if (Ie) {
          if (nt && t.texStorage3D(i.TEXTURE_2D_ARRAY, ne, Ae, Z.width, Z.height, Z.depth), P)
            if (v.layerUpdates.size > 0) {
              const k = Ec(Z.width, Z.height, v.format, v.type);
              for (const q of v.layerUpdates) {
                const le = Z.data.subarray(
                  q * k / Z.data.BYTES_PER_ELEMENT,
                  (q + 1) * k / Z.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, q, Z.width, Z.height, 1, ue, Se, le);
              }
              v.clearLayerUpdates();
            } else
              t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Z.width, Z.height, Z.depth, ue, Se, Z.data);
        } else
          t.texImage3D(i.TEXTURE_2D_ARRAY, 0, Ae, Z.width, Z.height, Z.depth, 0, ue, Se, Z.data);
      else if (v.isData3DTexture)
        Ie ? (nt && t.texStorage3D(i.TEXTURE_3D, ne, Ae, Z.width, Z.height, Z.depth), P && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, Z.width, Z.height, Z.depth, ue, Se, Z.data)) : t.texImage3D(i.TEXTURE_3D, 0, Ae, Z.width, Z.height, Z.depth, 0, ue, Se, Z.data);
      else if (v.isFramebufferTexture) {
        if (nt)
          if (Ie)
            t.texStorage2D(i.TEXTURE_2D, ne, Ae, Z.width, Z.height);
          else {
            let k = Z.width, q = Z.height;
            for (let le = 0; le < ne; le++)
              t.texImage2D(i.TEXTURE_2D, le, Ae, k, q, 0, ue, Se, null), k >>= 1, q >>= 1;
          }
      } else if (Ge.length > 0) {
        if (Ie && nt) {
          const k = Me(Ge[0]);
          t.texStorage2D(i.TEXTURE_2D, ne, Ae, k.width, k.height);
        }
        for (let k = 0, q = Ge.length; k < q; k++)
          de = Ge[k], Ie ? P && t.texSubImage2D(i.TEXTURE_2D, k, 0, 0, ue, Se, de) : t.texImage2D(i.TEXTURE_2D, k, Ae, ue, Se, de);
        v.generateMipmaps = !1;
      } else if (Ie) {
        if (nt) {
          const k = Me(Z);
          t.texStorage2D(i.TEXTURE_2D, ne, Ae, k.width, k.height);
        }
        P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, ue, Se, Z);
      } else
        t.texImage2D(i.TEXTURE_2D, 0, Ae, ue, Se, Z);
      m(v) && f(Y), _e.__version = G.version, v.onUpdate && v.onUpdate(v);
    }
    E.__version = v.version;
  }
  function ee(E, v, F) {
    if (v.image.length !== 6) return;
    const Y = tt(E, v), j = v.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, E.__webglTexture, i.TEXTURE0 + F);
    const G = n.get(j);
    if (j.version !== G.__version || Y === !0) {
      t.activeTexture(i.TEXTURE0 + F);
      const _e = ke.getPrimaries(ke.workingColorSpace), re = v.colorSpace === Gn ? null : ke.getPrimaries(v.colorSpace), he = v.colorSpace === Gn || _e === re ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, v.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, v.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, v.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, he);
      const $e = v.isCompressedTexture || v.image[0].isCompressedTexture, Z = v.image[0] && v.image[0].isDataTexture, ue = [];
      for (let q = 0; q < 6; q++)
        !$e && !Z ? ue[q] = _(v.image[q], !0, s.maxCubemapSize) : ue[q] = Z ? v.image[q].image : v.image[q], ue[q] = st(v, ue[q]);
      const Se = ue[0], Ae = r.convert(v.format, v.colorSpace), de = r.convert(v.type), Ge = b(v.internalFormat, Ae, de, v.colorSpace), Ie = v.isVideoTexture !== !0, nt = G.__version === void 0 || Y === !0, P = j.dataReady;
      let ne = N(v, Se);
      Oe(i.TEXTURE_CUBE_MAP, v);
      let k;
      if ($e) {
        Ie && nt && t.texStorage2D(i.TEXTURE_CUBE_MAP, ne, Ge, Se.width, Se.height);
        for (let q = 0; q < 6; q++) {
          k = ue[q].mipmaps;
          for (let le = 0; le < k.length; le++) {
            const ae = k[le];
            v.format !== $t ? Ae !== null ? Ie ? P && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, le, 0, 0, ae.width, ae.height, Ae, ae.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, le, Ge, ae.width, ae.height, 0, ae.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Ie ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, le, 0, 0, ae.width, ae.height, Ae, de, ae.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, le, Ge, ae.width, ae.height, 0, Ae, de, ae.data);
          }
        }
      } else {
        if (k = v.mipmaps, Ie && nt) {
          k.length > 0 && ne++;
          const q = Me(ue[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, ne, Ge, q.width, q.height);
        }
        for (let q = 0; q < 6; q++)
          if (Z) {
            Ie ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, 0, 0, ue[q].width, ue[q].height, Ae, de, ue[q].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, Ge, ue[q].width, ue[q].height, 0, Ae, de, ue[q].data);
            for (let le = 0; le < k.length; le++) {
              const Pe = k[le].image[q].image;
              Ie ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, le + 1, 0, 0, Pe.width, Pe.height, Ae, de, Pe.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, le + 1, Ge, Pe.width, Pe.height, 0, Ae, de, Pe.data);
            }
          } else {
            Ie ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, 0, 0, Ae, de, ue[q]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, Ge, Ae, de, ue[q]);
            for (let le = 0; le < k.length; le++) {
              const ae = k[le];
              Ie ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, le + 1, 0, 0, Ae, de, ae.image[q]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, le + 1, Ge, Ae, de, ae.image[q]);
            }
          }
      }
      m(v) && f(i.TEXTURE_CUBE_MAP), G.__version = j.version, v.onUpdate && v.onUpdate(v);
    }
    E.__version = v.version;
  }
  function ge(E, v, F, Y, j, G) {
    const _e = r.convert(F.format, F.colorSpace), re = r.convert(F.type), he = b(F.internalFormat, _e, re, F.colorSpace), $e = n.get(v), Z = n.get(F);
    if (Z.__renderTarget = v, !$e.__hasExternalTextures) {
      const ue = Math.max(1, v.width >> G), Se = Math.max(1, v.height >> G);
      j === i.TEXTURE_3D || j === i.TEXTURE_2D_ARRAY ? t.texImage3D(j, G, he, ue, Se, v.depth, 0, _e, re, null) : t.texImage2D(j, G, he, ue, Se, 0, _e, re, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, E), Ve(v) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, Y, j, Z.__webglTexture, 0, He(v)) : (j === i.TEXTURE_2D || j >= i.TEXTURE_CUBE_MAP_POSITIVE_X && j <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, Y, j, Z.__webglTexture, G), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function se(E, v, F) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, E), v.depthBuffer) {
      const Y = v.depthTexture, j = Y && Y.isDepthTexture ? Y.type : null, G = M(v.stencilBuffer, j), _e = v.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, re = He(v);
      Ve(v) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, re, G, v.width, v.height) : F ? i.renderbufferStorageMultisample(i.RENDERBUFFER, re, G, v.width, v.height) : i.renderbufferStorage(i.RENDERBUFFER, G, v.width, v.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, _e, i.RENDERBUFFER, E);
    } else {
      const Y = v.textures;
      for (let j = 0; j < Y.length; j++) {
        const G = Y[j], _e = r.convert(G.format, G.colorSpace), re = r.convert(G.type), he = b(G.internalFormat, _e, re, G.colorSpace), $e = He(v);
        F && Ve(v) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, $e, he, v.width, v.height) : Ve(v) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, $e, he, v.width, v.height) : i.renderbufferStorage(i.RENDERBUFFER, he, v.width, v.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function be(E, v) {
    if (v && v.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(i.FRAMEBUFFER, E), !(v.depthTexture && v.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const Y = n.get(v.depthTexture);
    Y.__renderTarget = v, (!Y.__webglTexture || v.depthTexture.image.width !== v.width || v.depthTexture.image.height !== v.height) && (v.depthTexture.image.width = v.width, v.depthTexture.image.height = v.height, v.depthTexture.needsUpdate = !0), K(v.depthTexture, 0);
    const j = Y.__webglTexture, G = He(v);
    if (v.depthTexture.format === Fi)
      Ve(v) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, j, 0, G) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, j, 0);
    else if (v.depthTexture.format === Yi)
      Ve(v) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, j, 0, G) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, j, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Re(E) {
    const v = n.get(E), F = E.isWebGLCubeRenderTarget === !0;
    if (v.__boundDepthTexture !== E.depthTexture) {
      const Y = E.depthTexture;
      if (v.__depthDisposeCallback && v.__depthDisposeCallback(), Y) {
        const j = () => {
          delete v.__boundDepthTexture, delete v.__depthDisposeCallback, Y.removeEventListener("dispose", j);
        };
        Y.addEventListener("dispose", j), v.__depthDisposeCallback = j;
      }
      v.__boundDepthTexture = Y;
    }
    if (E.depthTexture && !v.__autoAllocateDepthBuffer) {
      if (F) throw new Error("target.depthTexture not supported in Cube render targets");
      be(v.__webglFramebuffer, E);
    } else if (F) {
      v.__webglDepthbuffer = [];
      for (let Y = 0; Y < 6; Y++)
        if (t.bindFramebuffer(i.FRAMEBUFFER, v.__webglFramebuffer[Y]), v.__webglDepthbuffer[Y] === void 0)
          v.__webglDepthbuffer[Y] = i.createRenderbuffer(), se(v.__webglDepthbuffer[Y], E, !1);
        else {
          const j = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, G = v.__webglDepthbuffer[Y];
          i.bindRenderbuffer(i.RENDERBUFFER, G), i.framebufferRenderbuffer(i.FRAMEBUFFER, j, i.RENDERBUFFER, G);
        }
    } else if (t.bindFramebuffer(i.FRAMEBUFFER, v.__webglFramebuffer), v.__webglDepthbuffer === void 0)
      v.__webglDepthbuffer = i.createRenderbuffer(), se(v.__webglDepthbuffer, E, !1);
    else {
      const Y = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, j = v.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, j), i.framebufferRenderbuffer(i.FRAMEBUFFER, Y, i.RENDERBUFFER, j);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Be(E, v, F) {
    const Y = n.get(E);
    v !== void 0 && ge(Y.__webglFramebuffer, E, E.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), F !== void 0 && Re(E);
  }
  function lt(E) {
    const v = E.texture, F = n.get(E), Y = n.get(v);
    E.addEventListener("dispose", R);
    const j = E.textures, G = E.isWebGLCubeRenderTarget === !0, _e = j.length > 1;
    if (_e || (Y.__webglTexture === void 0 && (Y.__webglTexture = i.createTexture()), Y.__version = v.version, a.memory.textures++), G) {
      F.__webglFramebuffer = [];
      for (let re = 0; re < 6; re++)
        if (v.mipmaps && v.mipmaps.length > 0) {
          F.__webglFramebuffer[re] = [];
          for (let he = 0; he < v.mipmaps.length; he++)
            F.__webglFramebuffer[re][he] = i.createFramebuffer();
        } else
          F.__webglFramebuffer[re] = i.createFramebuffer();
    } else {
      if (v.mipmaps && v.mipmaps.length > 0) {
        F.__webglFramebuffer = [];
        for (let re = 0; re < v.mipmaps.length; re++)
          F.__webglFramebuffer[re] = i.createFramebuffer();
      } else
        F.__webglFramebuffer = i.createFramebuffer();
      if (_e)
        for (let re = 0, he = j.length; re < he; re++) {
          const $e = n.get(j[re]);
          $e.__webglTexture === void 0 && ($e.__webglTexture = i.createTexture(), a.memory.textures++);
        }
      if (E.samples > 0 && Ve(E) === !1) {
        F.__webglMultisampledFramebuffer = i.createFramebuffer(), F.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, F.__webglMultisampledFramebuffer);
        for (let re = 0; re < j.length; re++) {
          const he = j[re];
          F.__webglColorRenderbuffer[re] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, F.__webglColorRenderbuffer[re]);
          const $e = r.convert(he.format, he.colorSpace), Z = r.convert(he.type), ue = b(he.internalFormat, $e, Z, he.colorSpace, E.isXRRenderTarget === !0), Se = He(E);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Se, ue, E.width, E.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + re, i.RENDERBUFFER, F.__webglColorRenderbuffer[re]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), E.depthBuffer && (F.__webglDepthRenderbuffer = i.createRenderbuffer(), se(F.__webglDepthRenderbuffer, E, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (G) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, Y.__webglTexture), Oe(i.TEXTURE_CUBE_MAP, v);
      for (let re = 0; re < 6; re++)
        if (v.mipmaps && v.mipmaps.length > 0)
          for (let he = 0; he < v.mipmaps.length; he++)
            ge(F.__webglFramebuffer[re][he], E, v, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + re, he);
        else
          ge(F.__webglFramebuffer[re], E, v, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + re, 0);
      m(v) && f(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (_e) {
      for (let re = 0, he = j.length; re < he; re++) {
        const $e = j[re], Z = n.get($e);
        t.bindTexture(i.TEXTURE_2D, Z.__webglTexture), Oe(i.TEXTURE_2D, $e), ge(F.__webglFramebuffer, E, $e, i.COLOR_ATTACHMENT0 + re, i.TEXTURE_2D, 0), m($e) && f(i.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let re = i.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (re = E.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(re, Y.__webglTexture), Oe(re, v), v.mipmaps && v.mipmaps.length > 0)
        for (let he = 0; he < v.mipmaps.length; he++)
          ge(F.__webglFramebuffer[he], E, v, i.COLOR_ATTACHMENT0, re, he);
      else
        ge(F.__webglFramebuffer, E, v, i.COLOR_ATTACHMENT0, re, 0);
      m(v) && f(re), t.unbindTexture();
    }
    E.depthBuffer && Re(E);
  }
  function We(E) {
    const v = E.textures;
    for (let F = 0, Y = v.length; F < Y; F++) {
      const j = v[F];
      if (m(j)) {
        const G = T(E), _e = n.get(j).__webglTexture;
        t.bindTexture(G, _e), f(G), t.unbindTexture();
      }
    }
  }
  const ht = [], I = [];
  function kt(E) {
    if (E.samples > 0) {
      if (Ve(E) === !1) {
        const v = E.textures, F = E.width, Y = E.height;
        let j = i.COLOR_BUFFER_BIT;
        const G = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, _e = n.get(E), re = v.length > 1;
        if (re)
          for (let he = 0; he < v.length; he++)
            t.bindFramebuffer(i.FRAMEBUFFER, _e.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + he, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, _e.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + he, i.TEXTURE_2D, null, 0);
        t.bindFramebuffer(i.READ_FRAMEBUFFER, _e.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, _e.__webglFramebuffer);
        for (let he = 0; he < v.length; he++) {
          if (E.resolveDepthBuffer && (E.depthBuffer && (j |= i.DEPTH_BUFFER_BIT), E.stencilBuffer && E.resolveStencilBuffer && (j |= i.STENCIL_BUFFER_BIT)), re) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, _e.__webglColorRenderbuffer[he]);
            const $e = n.get(v[he]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, $e, 0);
          }
          i.blitFramebuffer(0, 0, F, Y, 0, 0, F, Y, j, i.NEAREST), l === !0 && (ht.length = 0, I.length = 0, ht.push(i.COLOR_ATTACHMENT0 + he), E.depthBuffer && E.resolveDepthBuffer === !1 && (ht.push(G), I.push(G), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, I)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, ht));
        }
        if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), re)
          for (let he = 0; he < v.length; he++) {
            t.bindFramebuffer(i.FRAMEBUFFER, _e.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + he, i.RENDERBUFFER, _e.__webglColorRenderbuffer[he]);
            const $e = n.get(v[he]).__webglTexture;
            t.bindFramebuffer(i.FRAMEBUFFER, _e.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + he, i.TEXTURE_2D, $e, 0);
          }
        t.bindFramebuffer(i.DRAW_FRAMEBUFFER, _e.__webglMultisampledFramebuffer);
      } else if (E.depthBuffer && E.resolveDepthBuffer === !1 && l) {
        const v = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [v]);
      }
    }
  }
  function He(E) {
    return Math.min(s.maxSamples, E.samples);
  }
  function Ve(E) {
    const v = n.get(E);
    return E.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && v.__useRenderToTexture !== !1;
  }
  function ye(E) {
    const v = a.render.frame;
    h.get(E) !== v && (h.set(E, v), E.update());
  }
  function st(E, v) {
    const F = E.colorSpace, Y = E.format, j = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || F !== Lt && F !== Gn && (ke.getTransfer(F) === Qe ? (Y !== $t || j !== Pn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", F)), v;
  }
  function Me(E) {
    return typeof HTMLImageElement < "u" && E instanceof HTMLImageElement ? (c.width = E.naturalWidth || E.width, c.height = E.naturalHeight || E.height) : typeof VideoFrame < "u" && E instanceof VideoFrame ? (c.width = E.displayWidth, c.height = E.displayHeight) : (c.width = E.width, c.height = E.height), c;
  }
  this.allocateTextureUnit = z, this.resetTextureUnits = X, this.setTexture2D = K, this.setTexture2DArray = V, this.setTexture3D = Q, this.setTextureCube = H, this.rebindTextures = Be, this.setupRenderTarget = lt, this.updateRenderTargetMipmap = We, this.updateMultisampleRenderTarget = kt, this.setupDepthRenderbuffer = Re, this.setupFrameBufferTexture = ge, this.useMultisampledRTT = Ve;
}
function H_(i, e) {
  function t(n, s = Gn) {
    let r;
    const a = ke.getTransfer(s);
    if (n === Pn) return i.UNSIGNED_BYTE;
    if (n === Io) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === Uo) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === xh) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === _h) return i.BYTE;
    if (n === vh) return i.SHORT;
    if (n === Ps) return i.UNSIGNED_SHORT;
    if (n === Do) return i.INT;
    if (n === di) return i.UNSIGNED_INT;
    if (n === Qt) return i.FLOAT;
    if (n === Fs) return i.HALF_FLOAT;
    if (n === Mh) return i.ALPHA;
    if (n === yh) return i.RGB;
    if (n === $t) return i.RGBA;
    if (n === Sh) return i.LUMINANCE;
    if (n === bh) return i.LUMINANCE_ALPHA;
    if (n === Fi) return i.DEPTH_COMPONENT;
    if (n === Yi) return i.DEPTH_STENCIL;
    if (n === No) return i.RED;
    if (n === Fo) return i.RED_INTEGER;
    if (n === Eh) return i.RG;
    if (n === Oo) return i.RG_INTEGER;
    if (n === Bo) return i.RGBA_INTEGER;
    if (n === Mr || n === yr || n === Sr || n === br)
      if (a === Qe)
        if (r = e.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
          if (n === Mr) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === yr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === Sr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === br) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (r = e.get("WEBGL_compressed_texture_s3tc"), r !== null) {
        if (n === Mr) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === yr) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === Sr) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === br) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === Va || n === Ga || n === Wa || n === $a)
      if (r = e.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (n === Va) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === Ga) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === Wa) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === $a) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === Xa || n === Ya || n === qa)
      if (r = e.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (n === Xa || n === Ya) return a === Qe ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (n === qa) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === ja || n === Ka || n === Za || n === Ja || n === Qa || n === eo || n === to || n === no || n === io || n === so || n === ro || n === ao || n === oo || n === lo)
      if (r = e.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (n === ja) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === Ka) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === Za) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === Ja) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === Qa) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === eo) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === to) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === no) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === io) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === so) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === ro) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === ao) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === oo) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === lo) return a === Qe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === Er || n === co || n === ho)
      if (r = e.get("EXT_texture_compression_bptc"), r !== null) {
        if (n === Er) return a === Qe ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === co) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === ho) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === Th || n === uo || n === fo || n === po)
      if (r = e.get("EXT_texture_compression_rgtc"), r !== null) {
        if (n === Er) return r.COMPRESSED_RED_RGTC1_EXT;
        if (n === uo) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === fo) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === po) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === Xi ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
class V_ extends Rt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class wn extends ot {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const G_ = { type: "move" };
class Ma {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new wn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new wn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new A(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new A()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new wn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new A(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new A()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let s = null, r = null, a = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        a = !0;
        for (const _ of e.hand.values()) {
          const m = t.getJointPose(_, n), f = this._getHandJoint(c, _);
          m !== null && (f.matrix.fromArray(m.transform.matrix), f.matrix.decompose(f.position, f.rotation, f.scale), f.matrixWorldNeedsUpdate = !0, f.jointRadius = m.radius), f.visible = m !== null;
        }
        const h = c.joints["index-finger-tip"], u = c.joints["thumb-tip"], d = h.position.distanceTo(u.position), p = 0.02, g = 5e-3;
        c.inputState.pinching && d > p + g ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && d <= p - g && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (r = t.getPose(e.gripSpace, n), r !== null && (l.matrix.fromArray(r.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(r.linearVelocity)) : l.hasLinearVelocity = !1, r.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(r.angularVelocity)) : l.hasAngularVelocity = !1));
      o !== null && (s = t.getPose(e.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (o.matrix.fromArray(s.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(s.linearVelocity)) : o.hasLinearVelocity = !1, s.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(s.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(G_)));
    }
    return o !== null && (o.visible = s !== null), l !== null && (l.visible = r !== null), c !== null && (c.visible = a !== null), this;
  }
  // private method
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new wn();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const W_ = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, $_ = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class X_ {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t, n) {
    if (this.texture === null) {
      const s = new vt(), r = e.properties.get(s);
      r.__webglTexture = t.texture, (t.depthNear != n.depthNear || t.depthFar != n.depthFar) && (this.depthNear = t.depthNear, this.depthFar = t.depthFar), this.texture = s;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new jn({
        vertexShader: W_,
        fragmentShader: $_,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new pt(new Ki(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class Y_ extends pi {
  constructor(e, t) {
    super();
    const n = this;
    let s = null, r = 1, a = null, o = "local-floor", l = 1, c = null, h = null, u = null, d = null, p = null, g = null;
    const _ = new X_(), m = t.getContextAttributes();
    let f = null, T = null;
    const b = [], M = [], N = new Te();
    let w = null;
    const R = new Rt();
    R.viewport = new Ye();
    const U = new Rt();
    U.viewport = new Ye();
    const S = [R, U], y = new V_();
    let C = null, X = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function($) {
      let ee = b[$];
      return ee === void 0 && (ee = new Ma(), b[$] = ee), ee.getTargetRaySpace();
    }, this.getControllerGrip = function($) {
      let ee = b[$];
      return ee === void 0 && (ee = new Ma(), b[$] = ee), ee.getGripSpace();
    }, this.getHand = function($) {
      let ee = b[$];
      return ee === void 0 && (ee = new Ma(), b[$] = ee), ee.getHandSpace();
    };
    function z($) {
      const ee = M.indexOf($.inputSource);
      if (ee === -1)
        return;
      const ge = b[ee];
      ge !== void 0 && (ge.update($.inputSource, $.frame, c || a), ge.dispatchEvent({ type: $.type, data: $.inputSource }));
    }
    function W() {
      s.removeEventListener("select", z), s.removeEventListener("selectstart", z), s.removeEventListener("selectend", z), s.removeEventListener("squeeze", z), s.removeEventListener("squeezestart", z), s.removeEventListener("squeezeend", z), s.removeEventListener("end", W), s.removeEventListener("inputsourceschange", K);
      for (let $ = 0; $ < b.length; $++) {
        const ee = M[$];
        ee !== null && (M[$] = null, b[$].disconnect(ee));
      }
      C = null, X = null, _.reset(), e.setRenderTarget(f), p = null, d = null, u = null, s = null, T = null, tt.stop(), n.isPresenting = !1, e.setPixelRatio(w), e.setSize(N.width, N.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function($) {
      r = $, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function($) {
      o = $, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function($) {
      c = $;
    }, this.getBaseLayer = function() {
      return d !== null ? d : p;
    }, this.getBinding = function() {
      return u;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return s;
    }, this.setSession = async function($) {
      if (s = $, s !== null) {
        if (f = e.getRenderTarget(), s.addEventListener("select", z), s.addEventListener("selectstart", z), s.addEventListener("selectend", z), s.addEventListener("squeeze", z), s.addEventListener("squeezestart", z), s.addEventListener("squeezeend", z), s.addEventListener("end", W), s.addEventListener("inputsourceschange", K), m.xrCompatible !== !0 && await t.makeXRCompatible(), w = e.getPixelRatio(), e.getSize(N), s.renderState.layers === void 0) {
          const ee = {
            antialias: m.antialias,
            alpha: !0,
            depth: m.depth,
            stencil: m.stencil,
            framebufferScaleFactor: r
          };
          p = new XRWebGLLayer(s, t, ee), s.updateRenderState({ baseLayer: p }), e.setPixelRatio(1), e.setSize(p.framebufferWidth, p.framebufferHeight, !1), T = new fi(
            p.framebufferWidth,
            p.framebufferHeight,
            {
              format: $t,
              type: Pn,
              colorSpace: e.outputColorSpace,
              stencilBuffer: m.stencil
            }
          );
        } else {
          let ee = null, ge = null, se = null;
          m.depth && (se = m.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, ee = m.stencil ? Yi : Fi, ge = m.stencil ? Xi : di);
          const be = {
            colorFormat: t.RGBA8,
            depthFormat: se,
            scaleFactor: r
          };
          u = new XRWebGLBinding(s, t), d = u.createProjectionLayer(be), s.updateRenderState({ layers: [d] }), e.setPixelRatio(1), e.setSize(d.textureWidth, d.textureHeight, !1), T = new fi(
            d.textureWidth,
            d.textureHeight,
            {
              format: $t,
              type: Pn,
              depthTexture: new zh(d.textureWidth, d.textureHeight, ge, void 0, void 0, void 0, void 0, void 0, void 0, ee),
              stencilBuffer: m.stencil,
              colorSpace: e.outputColorSpace,
              samples: m.antialias ? 4 : 0,
              resolveDepthBuffer: d.ignoreDepthValues === !1
            }
          );
        }
        T.isXRRenderTarget = !0, this.setFoveation(l), c = null, a = await s.requestReferenceSpace(o), tt.setContext(s), tt.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (s !== null)
        return s.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return _.getDepthTexture();
    };
    function K($) {
      for (let ee = 0; ee < $.removed.length; ee++) {
        const ge = $.removed[ee], se = M.indexOf(ge);
        se >= 0 && (M[se] = null, b[se].disconnect(ge));
      }
      for (let ee = 0; ee < $.added.length; ee++) {
        const ge = $.added[ee];
        let se = M.indexOf(ge);
        if (se === -1) {
          for (let Re = 0; Re < b.length; Re++)
            if (Re >= M.length) {
              M.push(ge), se = Re;
              break;
            } else if (M[Re] === null) {
              M[Re] = ge, se = Re;
              break;
            }
          if (se === -1) break;
        }
        const be = b[se];
        be && be.connect(ge);
      }
    }
    const V = new A(), Q = new A();
    function H($, ee, ge) {
      V.setFromMatrixPosition(ee.matrixWorld), Q.setFromMatrixPosition(ge.matrixWorld);
      const se = V.distanceTo(Q), be = ee.projectionMatrix.elements, Re = ge.projectionMatrix.elements, Be = be[14] / (be[10] - 1), lt = be[14] / (be[10] + 1), We = (be[9] + 1) / be[5], ht = (be[9] - 1) / be[5], I = (be[8] - 1) / be[0], kt = (Re[8] + 1) / Re[0], He = Be * I, Ve = Be * kt, ye = se / (-I + kt), st = ye * -I;
      if (ee.matrixWorld.decompose($.position, $.quaternion, $.scale), $.translateX(st), $.translateZ(ye), $.matrixWorld.compose($.position, $.quaternion, $.scale), $.matrixWorldInverse.copy($.matrixWorld).invert(), be[10] === -1)
        $.projectionMatrix.copy(ee.projectionMatrix), $.projectionMatrixInverse.copy(ee.projectionMatrixInverse);
      else {
        const Me = Be + ye, E = lt + ye, v = He - st, F = Ve + (se - st), Y = We * lt / E * Me, j = ht * lt / E * Me;
        $.projectionMatrix.makePerspective(v, F, Y, j, Me, E), $.projectionMatrixInverse.copy($.projectionMatrix).invert();
      }
    }
    function ie($, ee) {
      ee === null ? $.matrixWorld.copy($.matrix) : $.matrixWorld.multiplyMatrices(ee.matrixWorld, $.matrix), $.matrixWorldInverse.copy($.matrixWorld).invert();
    }
    this.updateCamera = function($) {
      if (s === null) return;
      let ee = $.near, ge = $.far;
      _.texture !== null && (_.depthNear > 0 && (ee = _.depthNear), _.depthFar > 0 && (ge = _.depthFar)), y.near = U.near = R.near = ee, y.far = U.far = R.far = ge, (C !== y.near || X !== y.far) && (s.updateRenderState({
        depthNear: y.near,
        depthFar: y.far
      }), C = y.near, X = y.far), R.layers.mask = $.layers.mask | 2, U.layers.mask = $.layers.mask | 4, y.layers.mask = R.layers.mask | U.layers.mask;
      const se = $.parent, be = y.cameras;
      ie(y, se);
      for (let Re = 0; Re < be.length; Re++)
        ie(be[Re], se);
      be.length === 2 ? H(y, R, U) : y.projectionMatrix.copy(R.projectionMatrix), ce($, y, se);
    };
    function ce($, ee, ge) {
      ge === null ? $.matrix.copy(ee.matrixWorld) : ($.matrix.copy(ge.matrixWorld), $.matrix.invert(), $.matrix.multiply(ee.matrixWorld)), $.matrix.decompose($.position, $.quaternion, $.scale), $.updateMatrixWorld(!0), $.projectionMatrix.copy(ee.projectionMatrix), $.projectionMatrixInverse.copy(ee.projectionMatrixInverse), $.isPerspectiveCamera && ($.fov = qi * 2 * Math.atan(1 / $.projectionMatrix.elements[5]), $.zoom = 1);
    }
    this.getCamera = function() {
      return y;
    }, this.getFoveation = function() {
      if (!(d === null && p === null))
        return l;
    }, this.setFoveation = function($) {
      l = $, d !== null && (d.fixedFoveation = $), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = $);
    }, this.hasDepthSensing = function() {
      return _.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return _.getMesh(y);
    };
    let xe = null;
    function Oe($, ee) {
      if (h = ee.getViewerPose(c || a), g = ee, h !== null) {
        const ge = h.views;
        p !== null && (e.setRenderTargetFramebuffer(T, p.framebuffer), e.setRenderTarget(T));
        let se = !1;
        ge.length !== y.cameras.length && (y.cameras.length = 0, se = !0);
        for (let Re = 0; Re < ge.length; Re++) {
          const Be = ge[Re];
          let lt = null;
          if (p !== null)
            lt = p.getViewport(Be);
          else {
            const ht = u.getViewSubImage(d, Be);
            lt = ht.viewport, Re === 0 && (e.setRenderTargetTextures(
              T,
              ht.colorTexture,
              d.ignoreDepthValues ? void 0 : ht.depthStencilTexture
            ), e.setRenderTarget(T));
          }
          let We = S[Re];
          We === void 0 && (We = new Rt(), We.layers.enable(Re), We.viewport = new Ye(), S[Re] = We), We.matrix.fromArray(Be.transform.matrix), We.matrix.decompose(We.position, We.quaternion, We.scale), We.projectionMatrix.fromArray(Be.projectionMatrix), We.projectionMatrixInverse.copy(We.projectionMatrix).invert(), We.viewport.set(lt.x, lt.y, lt.width, lt.height), Re === 0 && (y.matrix.copy(We.matrix), y.matrix.decompose(y.position, y.quaternion, y.scale)), se === !0 && y.cameras.push(We);
        }
        const be = s.enabledFeatures;
        if (be && be.includes("depth-sensing")) {
          const Re = u.getDepthInformation(ge[0]);
          Re && Re.isValid && Re.texture && _.init(e, Re, s.renderState);
        }
      }
      for (let ge = 0; ge < b.length; ge++) {
        const se = M[ge], be = b[ge];
        se !== null && be !== void 0 && be.update(se, ee, c || a);
      }
      xe && xe($, ee), ee.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: ee }), g = null;
    }
    const tt = new Bh();
    tt.setAnimationLoop(Oe), this.setAnimationLoop = function($) {
      xe = $;
    }, this.dispose = function() {
    };
  }
}
const ii = /* @__PURE__ */ new cn(), q_ = /* @__PURE__ */ new Ce();
function j_(i, e) {
  function t(m, f) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), f.value.copy(m.matrix);
  }
  function n(m, f) {
    f.color.getRGB(m.fogColor.value, Nh(i)), f.isFog ? (m.fogNear.value = f.near, m.fogFar.value = f.far) : f.isFogExp2 && (m.fogDensity.value = f.density);
  }
  function s(m, f, T, b, M) {
    f.isMeshBasicMaterial || f.isMeshLambertMaterial ? r(m, f) : f.isMeshToonMaterial ? (r(m, f), u(m, f)) : f.isMeshPhongMaterial ? (r(m, f), h(m, f)) : f.isMeshStandardMaterial ? (r(m, f), d(m, f), f.isMeshPhysicalMaterial && p(m, f, M)) : f.isMeshMatcapMaterial ? (r(m, f), g(m, f)) : f.isMeshDepthMaterial ? r(m, f) : f.isMeshDistanceMaterial ? (r(m, f), _(m, f)) : f.isMeshNormalMaterial ? r(m, f) : f.isLineBasicMaterial ? (a(m, f), f.isLineDashedMaterial && o(m, f)) : f.isPointsMaterial ? l(m, f, T, b) : f.isSpriteMaterial ? c(m, f) : f.isShadowMaterial ? (m.color.value.copy(f.color), m.opacity.value = f.opacity) : f.isShaderMaterial && (f.uniformsNeedUpdate = !1);
  }
  function r(m, f) {
    m.opacity.value = f.opacity, f.color && m.diffuse.value.copy(f.color), f.emissive && m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity), f.map && (m.map.value = f.map, t(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, t(f.alphaMap, m.alphaMapTransform)), f.bumpMap && (m.bumpMap.value = f.bumpMap, t(f.bumpMap, m.bumpMapTransform), m.bumpScale.value = f.bumpScale, f.side === Nt && (m.bumpScale.value *= -1)), f.normalMap && (m.normalMap.value = f.normalMap, t(f.normalMap, m.normalMapTransform), m.normalScale.value.copy(f.normalScale), f.side === Nt && m.normalScale.value.negate()), f.displacementMap && (m.displacementMap.value = f.displacementMap, t(f.displacementMap, m.displacementMapTransform), m.displacementScale.value = f.displacementScale, m.displacementBias.value = f.displacementBias), f.emissiveMap && (m.emissiveMap.value = f.emissiveMap, t(f.emissiveMap, m.emissiveMapTransform)), f.specularMap && (m.specularMap.value = f.specularMap, t(f.specularMap, m.specularMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
    const T = e.get(f), b = T.envMap, M = T.envMapRotation;
    b && (m.envMap.value = b, ii.copy(M), ii.x *= -1, ii.y *= -1, ii.z *= -1, b.isCubeTexture && b.isRenderTargetTexture === !1 && (ii.y *= -1, ii.z *= -1), m.envMapRotation.value.setFromMatrix4(q_.makeRotationFromEuler(ii)), m.flipEnvMap.value = b.isCubeTexture && b.isRenderTargetTexture === !1 ? -1 : 1, m.reflectivity.value = f.reflectivity, m.ior.value = f.ior, m.refractionRatio.value = f.refractionRatio), f.lightMap && (m.lightMap.value = f.lightMap, m.lightMapIntensity.value = f.lightMapIntensity, t(f.lightMap, m.lightMapTransform)), f.aoMap && (m.aoMap.value = f.aoMap, m.aoMapIntensity.value = f.aoMapIntensity, t(f.aoMap, m.aoMapTransform));
  }
  function a(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, f.map && (m.map.value = f.map, t(f.map, m.mapTransform));
  }
  function o(m, f) {
    m.dashSize.value = f.dashSize, m.totalSize.value = f.dashSize + f.gapSize, m.scale.value = f.scale;
  }
  function l(m, f, T, b) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.size.value = f.size * T, m.scale.value = b * 0.5, f.map && (m.map.value = f.map, t(f.map, m.uvTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, t(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function c(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.rotation.value = f.rotation, f.map && (m.map.value = f.map, t(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, t(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function h(m, f) {
    m.specular.value.copy(f.specular), m.shininess.value = Math.max(f.shininess, 1e-4);
  }
  function u(m, f) {
    f.gradientMap && (m.gradientMap.value = f.gradientMap);
  }
  function d(m, f) {
    m.metalness.value = f.metalness, f.metalnessMap && (m.metalnessMap.value = f.metalnessMap, t(f.metalnessMap, m.metalnessMapTransform)), m.roughness.value = f.roughness, f.roughnessMap && (m.roughnessMap.value = f.roughnessMap, t(f.roughnessMap, m.roughnessMapTransform)), f.envMap && (m.envMapIntensity.value = f.envMapIntensity);
  }
  function p(m, f, T) {
    m.ior.value = f.ior, f.sheen > 0 && (m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen), m.sheenRoughness.value = f.sheenRoughness, f.sheenColorMap && (m.sheenColorMap.value = f.sheenColorMap, t(f.sheenColorMap, m.sheenColorMapTransform)), f.sheenRoughnessMap && (m.sheenRoughnessMap.value = f.sheenRoughnessMap, t(f.sheenRoughnessMap, m.sheenRoughnessMapTransform))), f.clearcoat > 0 && (m.clearcoat.value = f.clearcoat, m.clearcoatRoughness.value = f.clearcoatRoughness, f.clearcoatMap && (m.clearcoatMap.value = f.clearcoatMap, t(f.clearcoatMap, m.clearcoatMapTransform)), f.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap, t(f.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), f.clearcoatNormalMap && (m.clearcoatNormalMap.value = f.clearcoatNormalMap, t(f.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale), f.side === Nt && m.clearcoatNormalScale.value.negate())), f.dispersion > 0 && (m.dispersion.value = f.dispersion), f.iridescence > 0 && (m.iridescence.value = f.iridescence, m.iridescenceIOR.value = f.iridescenceIOR, m.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1], f.iridescenceMap && (m.iridescenceMap.value = f.iridescenceMap, t(f.iridescenceMap, m.iridescenceMapTransform)), f.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = f.iridescenceThicknessMap, t(f.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), f.transmission > 0 && (m.transmission.value = f.transmission, m.transmissionSamplerMap.value = T.texture, m.transmissionSamplerSize.value.set(T.width, T.height), f.transmissionMap && (m.transmissionMap.value = f.transmissionMap, t(f.transmissionMap, m.transmissionMapTransform)), m.thickness.value = f.thickness, f.thicknessMap && (m.thicknessMap.value = f.thicknessMap, t(f.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = f.attenuationDistance, m.attenuationColor.value.copy(f.attenuationColor)), f.anisotropy > 0 && (m.anisotropyVector.value.set(f.anisotropy * Math.cos(f.anisotropyRotation), f.anisotropy * Math.sin(f.anisotropyRotation)), f.anisotropyMap && (m.anisotropyMap.value = f.anisotropyMap, t(f.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = f.specularIntensity, m.specularColor.value.copy(f.specularColor), f.specularColorMap && (m.specularColorMap.value = f.specularColorMap, t(f.specularColorMap, m.specularColorMapTransform)), f.specularIntensityMap && (m.specularIntensityMap.value = f.specularIntensityMap, t(f.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function g(m, f) {
    f.matcap && (m.matcap.value = f.matcap);
  }
  function _(m, f) {
    const T = e.get(f).light;
    m.referencePosition.value.setFromMatrixPosition(T.matrixWorld), m.nearDistance.value = T.shadow.camera.near, m.farDistance.value = T.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: s
  };
}
function K_(i, e, t, n) {
  let s = {}, r = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(T, b) {
    const M = b.program;
    n.uniformBlockBinding(T, M);
  }
  function c(T, b) {
    let M = s[T.id];
    M === void 0 && (g(T), M = h(T), s[T.id] = M, T.addEventListener("dispose", m));
    const N = b.program;
    n.updateUBOMapping(T, N);
    const w = e.render.frame;
    r[T.id] !== w && (d(T), r[T.id] = w);
  }
  function h(T) {
    const b = u();
    T.__bindingPointIndex = b;
    const M = i.createBuffer(), N = T.__size, w = T.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, M), i.bufferData(i.UNIFORM_BUFFER, N, w), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, b, M), M;
  }
  function u() {
    for (let T = 0; T < o; T++)
      if (a.indexOf(T) === -1)
        return a.push(T), T;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(T) {
    const b = s[T.id], M = T.uniforms, N = T.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, b);
    for (let w = 0, R = M.length; w < R; w++) {
      const U = Array.isArray(M[w]) ? M[w] : [M[w]];
      for (let S = 0, y = U.length; S < y; S++) {
        const C = U[S];
        if (p(C, w, S, N) === !0) {
          const X = C.__offset, z = Array.isArray(C.value) ? C.value : [C.value];
          let W = 0;
          for (let K = 0; K < z.length; K++) {
            const V = z[K], Q = _(V);
            typeof V == "number" || typeof V == "boolean" ? (C.__data[0] = V, i.bufferSubData(i.UNIFORM_BUFFER, X + W, C.__data)) : V.isMatrix3 ? (C.__data[0] = V.elements[0], C.__data[1] = V.elements[1], C.__data[2] = V.elements[2], C.__data[3] = 0, C.__data[4] = V.elements[3], C.__data[5] = V.elements[4], C.__data[6] = V.elements[5], C.__data[7] = 0, C.__data[8] = V.elements[6], C.__data[9] = V.elements[7], C.__data[10] = V.elements[8], C.__data[11] = 0) : (V.toArray(C.__data, W), W += Q.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, X, C.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function p(T, b, M, N) {
    const w = T.value, R = b + "_" + M;
    if (N[R] === void 0)
      return typeof w == "number" || typeof w == "boolean" ? N[R] = w : N[R] = w.clone(), !0;
    {
      const U = N[R];
      if (typeof w == "number" || typeof w == "boolean") {
        if (U !== w)
          return N[R] = w, !0;
      } else if (U.equals(w) === !1)
        return U.copy(w), !0;
    }
    return !1;
  }
  function g(T) {
    const b = T.uniforms;
    let M = 0;
    const N = 16;
    for (let R = 0, U = b.length; R < U; R++) {
      const S = Array.isArray(b[R]) ? b[R] : [b[R]];
      for (let y = 0, C = S.length; y < C; y++) {
        const X = S[y], z = Array.isArray(X.value) ? X.value : [X.value];
        for (let W = 0, K = z.length; W < K; W++) {
          const V = z[W], Q = _(V), H = M % N, ie = H % Q.boundary, ce = H + ie;
          M += ie, ce !== 0 && N - ce < Q.storage && (M += N - ce), X.__data = new Float32Array(Q.storage / Float32Array.BYTES_PER_ELEMENT), X.__offset = M, M += Q.storage;
        }
      }
    }
    const w = M % N;
    return w > 0 && (M += N - w), T.__size = M, T.__cache = {}, this;
  }
  function _(T) {
    const b = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof T == "number" || typeof T == "boolean" ? (b.boundary = 4, b.storage = 4) : T.isVector2 ? (b.boundary = 8, b.storage = 8) : T.isVector3 || T.isColor ? (b.boundary = 16, b.storage = 12) : T.isVector4 ? (b.boundary = 16, b.storage = 16) : T.isMatrix3 ? (b.boundary = 48, b.storage = 48) : T.isMatrix4 ? (b.boundary = 64, b.storage = 64) : T.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", T), b;
  }
  function m(T) {
    const b = T.target;
    b.removeEventListener("dispose", m);
    const M = a.indexOf(b.__bindingPointIndex);
    a.splice(M, 1), i.deleteBuffer(s[b.id]), delete s[b.id], delete r[b.id];
  }
  function f() {
    for (const T in s)
      i.deleteBuffer(s[T]);
    a = [], s = {}, r = {};
  }
  return {
    bind: l,
    update: c,
    dispose: f
  };
}
class Z_ {
  constructor(e = {}) {
    const {
      canvas: t = Bd(),
      context: n = null,
      depth: s = !0,
      stencil: r = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: u = !1,
      reverseDepthBuffer: d = !1
    } = e;
    this.isWebGLRenderer = !0;
    let p;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      p = n.getContextAttributes().alpha;
    } else
      p = a;
    const g = new Uint32Array(4), _ = new Int32Array(4);
    let m = null, f = null;
    const T = [], b = [];
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = xt, this.toneMapping = qn, this.toneMappingExposure = 1;
    const M = this;
    let N = !1, w = 0, R = 0, U = null, S = -1, y = null;
    const C = new Ye(), X = new Ye();
    let z = null;
    const W = new Ee(0);
    let K = 0, V = t.width, Q = t.height, H = 1, ie = null, ce = null;
    const xe = new Ye(0, 0, V, Q), Oe = new Ye(0, 0, V, Q);
    let tt = !1;
    const $ = new Vo();
    let ee = !1, ge = !1;
    const se = new Ce(), be = new Ce(), Re = new A(), Be = new Ye(), lt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let We = !1;
    function ht() {
      return U === null ? H : 1;
    }
    let I = n;
    function kt(x, L) {
      return t.getContext(x, L);
    }
    try {
      const x = {
        alpha: !0,
        depth: s,
        stencil: r,
        antialias: o,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: h,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${Lo}`), t.addEventListener("webglcontextlost", q, !1), t.addEventListener("webglcontextrestored", le, !1), t.addEventListener("webglcontextcreationerror", ae, !1), I === null) {
        const L = "webgl2";
        if (I = kt(L, x), I === null)
          throw kt(L) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (x) {
      throw console.error("THREE.WebGLRenderer: " + x.message), x;
    }
    let He, Ve, ye, st, Me, E, v, F, Y, j, G, _e, re, he, $e, Z, ue, Se, Ae, de, Ge, Ie, nt, P;
    function ne() {
      He = new ng(I), He.init(), Ie = new H_(I, He), Ve = new Km(I, He, e, Ie), ye = new B_(I, He), Ve.reverseDepthBuffer && d && ye.buffers.depth.setReversed(!0), st = new rg(I), Me = new b_(), E = new k_(I, He, ye, Me, Ve, Ie, st), v = new Jm(M), F = new tg(M), Y = new df(I), nt = new qm(I, Y), j = new ig(I, Y, st, nt), G = new og(I, j, Y, st), Ae = new ag(I, Ve, E), Z = new Zm(Me), _e = new S_(M, v, F, He, Ve, nt, Z), re = new j_(M, Me), he = new T_(), $e = new L_(He), Se = new Ym(M, v, F, ye, G, p, l), ue = new F_(M, G, Ve), P = new K_(I, st, Ve, ye), de = new jm(I, He, st), Ge = new sg(I, He, st), st.programs = _e.programs, M.capabilities = Ve, M.extensions = He, M.properties = Me, M.renderLists = he, M.shadowMap = ue, M.state = ye, M.info = st;
    }
    ne();
    const k = new Y_(M, I);
    this.xr = k, this.getContext = function() {
      return I;
    }, this.getContextAttributes = function() {
      return I.getContextAttributes();
    }, this.forceContextLoss = function() {
      const x = He.get("WEBGL_lose_context");
      x && x.loseContext();
    }, this.forceContextRestore = function() {
      const x = He.get("WEBGL_lose_context");
      x && x.restoreContext();
    }, this.getPixelRatio = function() {
      return H;
    }, this.setPixelRatio = function(x) {
      x !== void 0 && (H = x, this.setSize(V, Q, !1));
    }, this.getSize = function(x) {
      return x.set(V, Q);
    }, this.setSize = function(x, L, O = !0) {
      if (k.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      V = x, Q = L, t.width = Math.floor(x * H), t.height = Math.floor(L * H), O === !0 && (t.style.width = x + "px", t.style.height = L + "px"), this.setViewport(0, 0, x, L);
    }, this.getDrawingBufferSize = function(x) {
      return x.set(V * H, Q * H).floor();
    }, this.setDrawingBufferSize = function(x, L, O) {
      V = x, Q = L, H = O, t.width = Math.floor(x * O), t.height = Math.floor(L * O), this.setViewport(0, 0, x, L);
    }, this.getCurrentViewport = function(x) {
      return x.copy(C);
    }, this.getViewport = function(x) {
      return x.copy(xe);
    }, this.setViewport = function(x, L, O, B) {
      x.isVector4 ? xe.set(x.x, x.y, x.z, x.w) : xe.set(x, L, O, B), ye.viewport(C.copy(xe).multiplyScalar(H).round());
    }, this.getScissor = function(x) {
      return x.copy(Oe);
    }, this.setScissor = function(x, L, O, B) {
      x.isVector4 ? Oe.set(x.x, x.y, x.z, x.w) : Oe.set(x, L, O, B), ye.scissor(X.copy(Oe).multiplyScalar(H).round());
    }, this.getScissorTest = function() {
      return tt;
    }, this.setScissorTest = function(x) {
      ye.setScissorTest(tt = x);
    }, this.setOpaqueSort = function(x) {
      ie = x;
    }, this.setTransparentSort = function(x) {
      ce = x;
    }, this.getClearColor = function(x) {
      return x.copy(Se.getClearColor());
    }, this.setClearColor = function() {
      Se.setClearColor.apply(Se, arguments);
    }, this.getClearAlpha = function() {
      return Se.getClearAlpha();
    }, this.setClearAlpha = function() {
      Se.setClearAlpha.apply(Se, arguments);
    }, this.clear = function(x = !0, L = !0, O = !0) {
      let B = 0;
      if (x) {
        let D = !1;
        if (U !== null) {
          const J = U.texture.format;
          D = J === Bo || J === Oo || J === Fo;
        }
        if (D) {
          const J = U.texture.type, oe = J === Pn || J === di || J === Ps || J === Xi || J === Io || J === Uo, fe = Se.getClearColor(), pe = Se.getClearAlpha(), we = fe.r, Le = fe.g, me = fe.b;
          oe ? (g[0] = we, g[1] = Le, g[2] = me, g[3] = pe, I.clearBufferuiv(I.COLOR, 0, g)) : (_[0] = we, _[1] = Le, _[2] = me, _[3] = pe, I.clearBufferiv(I.COLOR, 0, _));
        } else
          B |= I.COLOR_BUFFER_BIT;
      }
      L && (B |= I.DEPTH_BUFFER_BIT), O && (B |= I.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), I.clear(B);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", q, !1), t.removeEventListener("webglcontextrestored", le, !1), t.removeEventListener("webglcontextcreationerror", ae, !1), he.dispose(), $e.dispose(), Me.dispose(), v.dispose(), F.dispose(), G.dispose(), nt.dispose(), P.dispose(), _e.dispose(), k.dispose(), k.removeEventListener("sessionstart", nl), k.removeEventListener("sessionend", il), Kn.stop();
    };
    function q(x) {
      x.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), N = !0;
    }
    function le() {
      console.log("THREE.WebGLRenderer: Context Restored."), N = !1;
      const x = st.autoReset, L = ue.enabled, O = ue.autoUpdate, B = ue.needsUpdate, D = ue.type;
      ne(), st.autoReset = x, ue.enabled = L, ue.autoUpdate = O, ue.needsUpdate = B, ue.type = D;
    }
    function ae(x) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", x.statusMessage);
    }
    function Pe(x) {
      const L = x.target;
      L.removeEventListener("dispose", Pe), ct(L);
    }
    function ct(x) {
      St(x), Me.remove(x);
    }
    function St(x) {
      const L = Me.get(x).programs;
      L !== void 0 && (L.forEach(function(O) {
        _e.releaseProgram(O);
      }), x.isShaderMaterial && _e.releaseShaderCache(x));
    }
    this.renderBufferDirect = function(x, L, O, B, D, J) {
      L === null && (L = lt);
      const oe = D.isMesh && D.matrixWorld.determinant() < 0, fe = au(x, L, O, B, D);
      ye.setMaterial(B, oe);
      let pe = O.index, we = 1;
      if (B.wireframe === !0) {
        if (pe = j.getWireframeAttribute(O), pe === void 0) return;
        we = 2;
      }
      const Le = O.drawRange, me = O.attributes.position;
      let Xe = Le.start * we, it = (Le.start + Le.count) * we;
      J !== null && (Xe = Math.max(Xe, J.start * we), it = Math.min(it, (J.start + J.count) * we)), pe !== null ? (Xe = Math.max(Xe, 0), it = Math.min(it, pe.count)) : me != null && (Xe = Math.max(Xe, 0), it = Math.min(it, me.count));
      const rt = it - Xe;
      if (rt < 0 || rt === 1 / 0) return;
      nt.setup(D, B, fe, O, pe);
      let It, qe = de;
      if (pe !== null && (It = Y.get(pe), qe = Ge, qe.setIndex(It)), D.isMesh)
        B.wireframe === !0 ? (ye.setLineWidth(B.wireframeLinewidth * ht()), qe.setMode(I.LINES)) : qe.setMode(I.TRIANGLES);
      else if (D.isLine) {
        let ve = B.linewidth;
        ve === void 0 && (ve = 1), ye.setLineWidth(ve * ht()), D.isLineSegments ? qe.setMode(I.LINES) : D.isLineLoop ? qe.setMode(I.LINE_LOOP) : qe.setMode(I.LINE_STRIP);
      } else D.isPoints ? qe.setMode(I.POINTS) : D.isSprite && qe.setMode(I.TRIANGLES);
      if (D.isBatchedMesh)
        if (D._multiDrawInstances !== null)
          qe.renderMultiDrawInstances(D._multiDrawStarts, D._multiDrawCounts, D._multiDrawCount, D._multiDrawInstances);
        else if (He.get("WEBGL_multi_draw"))
          qe.renderMultiDraw(D._multiDrawStarts, D._multiDrawCounts, D._multiDrawCount);
        else {
          const ve = D._multiDrawStarts, mn = D._multiDrawCounts, je = D._multiDrawCount, Yt = pe ? Y.get(pe).bytesPerElement : 1, mi = Me.get(B).currentProgram.getUniforms();
          for (let Ft = 0; Ft < je; Ft++)
            mi.setValue(I, "_gl_DrawID", Ft), qe.render(ve[Ft] / Yt, mn[Ft]);
        }
      else if (D.isInstancedMesh)
        qe.renderInstances(Xe, rt, D.count);
      else if (O.isInstancedBufferGeometry) {
        const ve = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, mn = Math.min(O.instanceCount, ve);
        qe.renderInstances(Xe, rt, mn);
      } else
        qe.render(Xe, rt);
    };
    function Ke(x, L, O) {
      x.transparent === !0 && x.side === Zt && x.forceSinglePass === !1 ? (x.side = Nt, x.needsUpdate = !0, zs(x, L, O), x.side = Cn, x.needsUpdate = !0, zs(x, L, O), x.side = Zt) : zs(x, L, O);
    }
    this.compile = function(x, L, O = null) {
      O === null && (O = x), f = $e.get(O), f.init(L), b.push(f), O.traverseVisible(function(D) {
        D.isLight && D.layers.test(L.layers) && (f.pushLight(D), D.castShadow && f.pushShadow(D));
      }), x !== O && x.traverseVisible(function(D) {
        D.isLight && D.layers.test(L.layers) && (f.pushLight(D), D.castShadow && f.pushShadow(D));
      }), f.setupLights();
      const B = /* @__PURE__ */ new Set();
      return x.traverse(function(D) {
        if (!(D.isMesh || D.isPoints || D.isLine || D.isSprite))
          return;
        const J = D.material;
        if (J)
          if (Array.isArray(J))
            for (let oe = 0; oe < J.length; oe++) {
              const fe = J[oe];
              Ke(fe, O, D), B.add(fe);
            }
          else
            Ke(J, O, D), B.add(J);
      }), b.pop(), f = null, B;
    }, this.compileAsync = function(x, L, O = null) {
      const B = this.compile(x, L, O);
      return new Promise((D) => {
        function J() {
          if (B.forEach(function(oe) {
            Me.get(oe).currentProgram.isReady() && B.delete(oe);
          }), B.size === 0) {
            D(x);
            return;
          }
          setTimeout(J, 10);
        }
        He.get("KHR_parallel_shader_compile") !== null ? J() : setTimeout(J, 10);
      });
    };
    let Xt = null;
    function pn(x) {
      Xt && Xt(x);
    }
    function nl() {
      Kn.stop();
    }
    function il() {
      Kn.start();
    }
    const Kn = new Bh();
    Kn.setAnimationLoop(pn), typeof self < "u" && Kn.setContext(self), this.setAnimationLoop = function(x) {
      Xt = x, k.setAnimationLoop(x), x === null ? Kn.stop() : Kn.start();
    }, k.addEventListener("sessionstart", nl), k.addEventListener("sessionend", il), this.render = function(x, L) {
      if (L !== void 0 && L.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (N === !0) return;
      if (x.matrixWorldAutoUpdate === !0 && x.updateMatrixWorld(), L.parent === null && L.matrixWorldAutoUpdate === !0 && L.updateMatrixWorld(), k.enabled === !0 && k.isPresenting === !0 && (k.cameraAutoUpdate === !0 && k.updateCamera(L), L = k.getCamera()), x.isScene === !0 && x.onBeforeRender(M, x, L, U), f = $e.get(x, b.length), f.init(L), b.push(f), be.multiplyMatrices(L.projectionMatrix, L.matrixWorldInverse), $.setFromProjectionMatrix(be), ge = this.localClippingEnabled, ee = Z.init(this.clippingPlanes, ge), m = he.get(x, T.length), m.init(), T.push(m), k.enabled === !0 && k.isPresenting === !0) {
        const J = M.xr.getDepthSensingMesh();
        J !== null && Vr(J, L, -1 / 0, M.sortObjects);
      }
      Vr(x, L, 0, M.sortObjects), m.finish(), M.sortObjects === !0 && m.sort(ie, ce), We = k.enabled === !1 || k.isPresenting === !1 || k.hasDepthSensing() === !1, We && Se.addToRenderList(m, x), this.info.render.frame++, ee === !0 && Z.beginShadows();
      const O = f.state.shadowsArray;
      ue.render(O, x, L), ee === !0 && Z.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const B = m.opaque, D = m.transmissive;
      if (f.setupLights(), L.isArrayCamera) {
        const J = L.cameras;
        if (D.length > 0)
          for (let oe = 0, fe = J.length; oe < fe; oe++) {
            const pe = J[oe];
            rl(B, D, x, pe);
          }
        We && Se.render(x);
        for (let oe = 0, fe = J.length; oe < fe; oe++) {
          const pe = J[oe];
          sl(m, x, pe, pe.viewport);
        }
      } else
        D.length > 0 && rl(B, D, x, L), We && Se.render(x), sl(m, x, L);
      U !== null && (E.updateMultisampleRenderTarget(U), E.updateRenderTargetMipmap(U)), x.isScene === !0 && x.onAfterRender(M, x, L), nt.resetDefaultState(), S = -1, y = null, b.pop(), b.length > 0 ? (f = b[b.length - 1], ee === !0 && Z.setGlobalState(M.clippingPlanes, f.state.camera)) : f = null, T.pop(), T.length > 0 ? m = T[T.length - 1] : m = null;
    };
    function Vr(x, L, O, B) {
      if (x.visible === !1) return;
      if (x.layers.test(L.layers)) {
        if (x.isGroup)
          O = x.renderOrder;
        else if (x.isLOD)
          x.autoUpdate === !0 && x.update(L);
        else if (x.isLight)
          f.pushLight(x), x.castShadow && f.pushShadow(x);
        else if (x.isSprite) {
          if (!x.frustumCulled || $.intersectsSprite(x)) {
            B && Be.setFromMatrixPosition(x.matrixWorld).applyMatrix4(be);
            const oe = G.update(x), fe = x.material;
            fe.visible && m.push(x, oe, fe, O, Be.z, null);
          }
        } else if ((x.isMesh || x.isLine || x.isPoints) && (!x.frustumCulled || $.intersectsObject(x))) {
          const oe = G.update(x), fe = x.material;
          if (B && (x.boundingSphere !== void 0 ? (x.boundingSphere === null && x.computeBoundingSphere(), Be.copy(x.boundingSphere.center)) : (oe.boundingSphere === null && oe.computeBoundingSphere(), Be.copy(oe.boundingSphere.center)), Be.applyMatrix4(x.matrixWorld).applyMatrix4(be)), Array.isArray(fe)) {
            const pe = oe.groups;
            for (let we = 0, Le = pe.length; we < Le; we++) {
              const me = pe[we], Xe = fe[me.materialIndex];
              Xe && Xe.visible && m.push(x, oe, Xe, O, Be.z, me);
            }
          } else fe.visible && m.push(x, oe, fe, O, Be.z, null);
        }
      }
      const J = x.children;
      for (let oe = 0, fe = J.length; oe < fe; oe++)
        Vr(J[oe], L, O, B);
    }
    function sl(x, L, O, B) {
      const D = x.opaque, J = x.transmissive, oe = x.transparent;
      f.setupLightsView(O), ee === !0 && Z.setGlobalState(M.clippingPlanes, O), B && ye.viewport(C.copy(B)), D.length > 0 && Bs(D, L, O), J.length > 0 && Bs(J, L, O), oe.length > 0 && Bs(oe, L, O), ye.buffers.depth.setTest(!0), ye.buffers.depth.setMask(!0), ye.buffers.color.setMask(!0), ye.setPolygonOffset(!1);
    }
    function rl(x, L, O, B) {
      if ((O.isScene === !0 ? O.overrideMaterial : null) !== null)
        return;
      f.state.transmissionRenderTarget[B.id] === void 0 && (f.state.transmissionRenderTarget[B.id] = new fi(1, 1, {
        generateMipmaps: !0,
        type: He.has("EXT_color_buffer_half_float") || He.has("EXT_color_buffer_float") ? Fs : Pn,
        minFilter: En,
        samples: 4,
        stencilBuffer: r,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: ke.workingColorSpace
      }));
      const J = f.state.transmissionRenderTarget[B.id], oe = B.viewport || C;
      J.setSize(oe.z, oe.w);
      const fe = M.getRenderTarget();
      M.setRenderTarget(J), M.getClearColor(W), K = M.getClearAlpha(), K < 1 && M.setClearColor(16777215, 0.5), M.clear(), We && Se.render(O);
      const pe = M.toneMapping;
      M.toneMapping = qn;
      const we = B.viewport;
      if (B.viewport !== void 0 && (B.viewport = void 0), f.setupLightsView(B), ee === !0 && Z.setGlobalState(M.clippingPlanes, B), Bs(x, O, B), E.updateMultisampleRenderTarget(J), E.updateRenderTargetMipmap(J), He.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Le = !1;
        for (let me = 0, Xe = L.length; me < Xe; me++) {
          const it = L[me], rt = it.object, It = it.geometry, qe = it.material, ve = it.group;
          if (qe.side === Zt && rt.layers.test(B.layers)) {
            const mn = qe.side;
            qe.side = Nt, qe.needsUpdate = !0, al(rt, O, B, It, qe, ve), qe.side = mn, qe.needsUpdate = !0, Le = !0;
          }
        }
        Le === !0 && (E.updateMultisampleRenderTarget(J), E.updateRenderTargetMipmap(J));
      }
      M.setRenderTarget(fe), M.setClearColor(W, K), we !== void 0 && (B.viewport = we), M.toneMapping = pe;
    }
    function Bs(x, L, O) {
      const B = L.isScene === !0 ? L.overrideMaterial : null;
      for (let D = 0, J = x.length; D < J; D++) {
        const oe = x[D], fe = oe.object, pe = oe.geometry, we = B === null ? oe.material : B, Le = oe.group;
        fe.layers.test(O.layers) && al(fe, L, O, pe, we, Le);
      }
    }
    function al(x, L, O, B, D, J) {
      x.onBeforeRender(M, L, O, B, D, J), x.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, x.matrixWorld), x.normalMatrix.getNormalMatrix(x.modelViewMatrix), D.onBeforeRender(M, L, O, B, x, J), D.transparent === !0 && D.side === Zt && D.forceSinglePass === !1 ? (D.side = Nt, D.needsUpdate = !0, M.renderBufferDirect(O, L, B, D, x, J), D.side = Cn, D.needsUpdate = !0, M.renderBufferDirect(O, L, B, D, x, J), D.side = Zt) : M.renderBufferDirect(O, L, B, D, x, J), x.onAfterRender(M, L, O, B, D, J);
    }
    function zs(x, L, O) {
      L.isScene !== !0 && (L = lt);
      const B = Me.get(x), D = f.state.lights, J = f.state.shadowsArray, oe = D.state.version, fe = _e.getParameters(x, D.state, J, L, O), pe = _e.getProgramCacheKey(fe);
      let we = B.programs;
      B.environment = x.isMeshStandardMaterial ? L.environment : null, B.fog = L.fog, B.envMap = (x.isMeshStandardMaterial ? F : v).get(x.envMap || B.environment), B.envMapRotation = B.environment !== null && x.envMap === null ? L.environmentRotation : x.envMapRotation, we === void 0 && (x.addEventListener("dispose", Pe), we = /* @__PURE__ */ new Map(), B.programs = we);
      let Le = we.get(pe);
      if (Le !== void 0) {
        if (B.currentProgram === Le && B.lightsStateVersion === oe)
          return ll(x, fe), Le;
      } else
        fe.uniforms = _e.getUniforms(x), x.onBeforeCompile(fe, M), Le = _e.acquireProgram(fe, pe), we.set(pe, Le), B.uniforms = fe.uniforms;
      const me = B.uniforms;
      return (!x.isShaderMaterial && !x.isRawShaderMaterial || x.clipping === !0) && (me.clippingPlanes = Z.uniform), ll(x, fe), B.needsLights = lu(x), B.lightsStateVersion = oe, B.needsLights && (me.ambientLightColor.value = D.state.ambient, me.lightProbe.value = D.state.probe, me.directionalLights.value = D.state.directional, me.directionalLightShadows.value = D.state.directionalShadow, me.spotLights.value = D.state.spot, me.spotLightShadows.value = D.state.spotShadow, me.rectAreaLights.value = D.state.rectArea, me.ltc_1.value = D.state.rectAreaLTC1, me.ltc_2.value = D.state.rectAreaLTC2, me.pointLights.value = D.state.point, me.pointLightShadows.value = D.state.pointShadow, me.hemisphereLights.value = D.state.hemi, me.directionalShadowMap.value = D.state.directionalShadowMap, me.directionalShadowMatrix.value = D.state.directionalShadowMatrix, me.spotShadowMap.value = D.state.spotShadowMap, me.spotLightMatrix.value = D.state.spotLightMatrix, me.spotLightMap.value = D.state.spotLightMap, me.pointShadowMap.value = D.state.pointShadowMap, me.pointShadowMatrix.value = D.state.pointShadowMatrix), B.currentProgram = Le, B.uniformsList = null, Le;
    }
    function ol(x) {
      if (x.uniformsList === null) {
        const L = x.currentProgram.getUniforms();
        x.uniformsList = Tr.seqWithValue(L.seq, x.uniforms);
      }
      return x.uniformsList;
    }
    function ll(x, L) {
      const O = Me.get(x);
      O.outputColorSpace = L.outputColorSpace, O.batching = L.batching, O.batchingColor = L.batchingColor, O.instancing = L.instancing, O.instancingColor = L.instancingColor, O.instancingMorph = L.instancingMorph, O.skinning = L.skinning, O.morphTargets = L.morphTargets, O.morphNormals = L.morphNormals, O.morphColors = L.morphColors, O.morphTargetsCount = L.morphTargetsCount, O.numClippingPlanes = L.numClippingPlanes, O.numIntersection = L.numClipIntersection, O.vertexAlphas = L.vertexAlphas, O.vertexTangents = L.vertexTangents, O.toneMapping = L.toneMapping;
    }
    function au(x, L, O, B, D) {
      L.isScene !== !0 && (L = lt), E.resetTextureUnits();
      const J = L.fog, oe = B.isMeshStandardMaterial ? L.environment : null, fe = U === null ? M.outputColorSpace : U.isXRRenderTarget === !0 ? U.texture.colorSpace : Lt, pe = (B.isMeshStandardMaterial ? F : v).get(B.envMap || oe), we = B.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4, Le = !!O.attributes.tangent && (!!B.normalMap || B.anisotropy > 0), me = !!O.morphAttributes.position, Xe = !!O.morphAttributes.normal, it = !!O.morphAttributes.color;
      let rt = qn;
      B.toneMapped && (U === null || U.isXRRenderTarget === !0) && (rt = M.toneMapping);
      const It = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, qe = It !== void 0 ? It.length : 0, ve = Me.get(B), mn = f.state.lights;
      if (ee === !0 && (ge === !0 || x !== y)) {
        const Ht = x === y && B.id === S;
        Z.setState(B, x, Ht);
      }
      let je = !1;
      B.version === ve.__version ? (ve.needsLights && ve.lightsStateVersion !== mn.state.version || ve.outputColorSpace !== fe || D.isBatchedMesh && ve.batching === !1 || !D.isBatchedMesh && ve.batching === !0 || D.isBatchedMesh && ve.batchingColor === !0 && D.colorTexture === null || D.isBatchedMesh && ve.batchingColor === !1 && D.colorTexture !== null || D.isInstancedMesh && ve.instancing === !1 || !D.isInstancedMesh && ve.instancing === !0 || D.isSkinnedMesh && ve.skinning === !1 || !D.isSkinnedMesh && ve.skinning === !0 || D.isInstancedMesh && ve.instancingColor === !0 && D.instanceColor === null || D.isInstancedMesh && ve.instancingColor === !1 && D.instanceColor !== null || D.isInstancedMesh && ve.instancingMorph === !0 && D.morphTexture === null || D.isInstancedMesh && ve.instancingMorph === !1 && D.morphTexture !== null || ve.envMap !== pe || B.fog === !0 && ve.fog !== J || ve.numClippingPlanes !== void 0 && (ve.numClippingPlanes !== Z.numPlanes || ve.numIntersection !== Z.numIntersection) || ve.vertexAlphas !== we || ve.vertexTangents !== Le || ve.morphTargets !== me || ve.morphNormals !== Xe || ve.morphColors !== it || ve.toneMapping !== rt || ve.morphTargetsCount !== qe) && (je = !0) : (je = !0, ve.__version = B.version);
      let Yt = ve.currentProgram;
      je === !0 && (Yt = zs(B, L, D));
      let mi = !1, Ft = !1, ls = !1;
      const at = Yt.getUniforms(), rn = ve.uniforms;
      if (ye.useProgram(Yt.program) && (mi = !0, Ft = !0, ls = !0), B.id !== S && (S = B.id, Ft = !0), mi || y !== x) {
        ye.buffers.depth.getReversed() ? (se.copy(x.projectionMatrix), kd(se), Hd(se), at.setValue(I, "projectionMatrix", se)) : at.setValue(I, "projectionMatrix", x.projectionMatrix), at.setValue(I, "viewMatrix", x.matrixWorldInverse);
        const Dn = at.map.cameraPosition;
        Dn !== void 0 && Dn.setValue(I, Re.setFromMatrixPosition(x.matrixWorld)), Ve.logarithmicDepthBuffer && at.setValue(
          I,
          "logDepthBufFC",
          2 / (Math.log(x.far + 1) / Math.LN2)
        ), (B.isMeshPhongMaterial || B.isMeshToonMaterial || B.isMeshLambertMaterial || B.isMeshBasicMaterial || B.isMeshStandardMaterial || B.isShaderMaterial) && at.setValue(I, "isOrthographic", x.isOrthographicCamera === !0), y !== x && (y = x, Ft = !0, ls = !0);
      }
      if (D.isSkinnedMesh) {
        at.setOptional(I, D, "bindMatrix"), at.setOptional(I, D, "bindMatrixInverse");
        const Ht = D.skeleton;
        Ht && (Ht.boneTexture === null && Ht.computeBoneTexture(), at.setValue(I, "boneTexture", Ht.boneTexture, E));
      }
      D.isBatchedMesh && (at.setOptional(I, D, "batchingTexture"), at.setValue(I, "batchingTexture", D._matricesTexture, E), at.setOptional(I, D, "batchingIdTexture"), at.setValue(I, "batchingIdTexture", D._indirectTexture, E), at.setOptional(I, D, "batchingColorTexture"), D._colorsTexture !== null && at.setValue(I, "batchingColorTexture", D._colorsTexture, E));
      const cs = O.morphAttributes;
      if ((cs.position !== void 0 || cs.normal !== void 0 || cs.color !== void 0) && Ae.update(D, O, Yt), (Ft || ve.receiveShadow !== D.receiveShadow) && (ve.receiveShadow = D.receiveShadow, at.setValue(I, "receiveShadow", D.receiveShadow)), B.isMeshGouraudMaterial && B.envMap !== null && (rn.envMap.value = pe, rn.flipEnvMap.value = pe.isCubeTexture && pe.isRenderTargetTexture === !1 ? -1 : 1), B.isMeshStandardMaterial && B.envMap === null && L.environment !== null && (rn.envMapIntensity.value = L.environmentIntensity), Ft && (at.setValue(I, "toneMappingExposure", M.toneMappingExposure), ve.needsLights && ou(rn, ls), J && B.fog === !0 && re.refreshFogUniforms(rn, J), re.refreshMaterialUniforms(rn, B, H, Q, f.state.transmissionRenderTarget[x.id]), Tr.upload(I, ol(ve), rn, E)), B.isShaderMaterial && B.uniformsNeedUpdate === !0 && (Tr.upload(I, ol(ve), rn, E), B.uniformsNeedUpdate = !1), B.isSpriteMaterial && at.setValue(I, "center", D.center), at.setValue(I, "modelViewMatrix", D.modelViewMatrix), at.setValue(I, "normalMatrix", D.normalMatrix), at.setValue(I, "modelMatrix", D.matrixWorld), B.isShaderMaterial || B.isRawShaderMaterial) {
        const Ht = B.uniformsGroups;
        for (let Dn = 0, In = Ht.length; Dn < In; Dn++) {
          const cl = Ht[Dn];
          P.update(cl, Yt), P.bind(cl, Yt);
        }
      }
      return Yt;
    }
    function ou(x, L) {
      x.ambientLightColor.needsUpdate = L, x.lightProbe.needsUpdate = L, x.directionalLights.needsUpdate = L, x.directionalLightShadows.needsUpdate = L, x.pointLights.needsUpdate = L, x.pointLightShadows.needsUpdate = L, x.spotLights.needsUpdate = L, x.spotLightShadows.needsUpdate = L, x.rectAreaLights.needsUpdate = L, x.hemisphereLights.needsUpdate = L;
    }
    function lu(x) {
      return x.isMeshLambertMaterial || x.isMeshToonMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isShadowMaterial || x.isShaderMaterial && x.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return w;
    }, this.getActiveMipmapLevel = function() {
      return R;
    }, this.getRenderTarget = function() {
      return U;
    }, this.setRenderTargetTextures = function(x, L, O) {
      Me.get(x.texture).__webglTexture = L, Me.get(x.depthTexture).__webglTexture = O;
      const B = Me.get(x);
      B.__hasExternalTextures = !0, B.__autoAllocateDepthBuffer = O === void 0, B.__autoAllocateDepthBuffer || He.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), B.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(x, L) {
      const O = Me.get(x);
      O.__webglFramebuffer = L, O.__useDefaultFramebuffer = L === void 0;
    }, this.setRenderTarget = function(x, L = 0, O = 0) {
      U = x, w = L, R = O;
      let B = !0, D = null, J = !1, oe = !1;
      if (x) {
        const pe = Me.get(x);
        if (pe.__useDefaultFramebuffer !== void 0)
          ye.bindFramebuffer(I.FRAMEBUFFER, null), B = !1;
        else if (pe.__webglFramebuffer === void 0)
          E.setupRenderTarget(x);
        else if (pe.__hasExternalTextures)
          E.rebindTextures(x, Me.get(x.texture).__webglTexture, Me.get(x.depthTexture).__webglTexture);
        else if (x.depthBuffer) {
          const me = x.depthTexture;
          if (pe.__boundDepthTexture !== me) {
            if (me !== null && Me.has(me) && (x.width !== me.image.width || x.height !== me.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            E.setupDepthRenderbuffer(x);
          }
        }
        const we = x.texture;
        (we.isData3DTexture || we.isDataArrayTexture || we.isCompressedArrayTexture) && (oe = !0);
        const Le = Me.get(x).__webglFramebuffer;
        x.isWebGLCubeRenderTarget ? (Array.isArray(Le[L]) ? D = Le[L][O] : D = Le[L], J = !0) : x.samples > 0 && E.useMultisampledRTT(x) === !1 ? D = Me.get(x).__webglMultisampledFramebuffer : Array.isArray(Le) ? D = Le[O] : D = Le, C.copy(x.viewport), X.copy(x.scissor), z = x.scissorTest;
      } else
        C.copy(xe).multiplyScalar(H).floor(), X.copy(Oe).multiplyScalar(H).floor(), z = tt;
      if (ye.bindFramebuffer(I.FRAMEBUFFER, D) && B && ye.drawBuffers(x, D), ye.viewport(C), ye.scissor(X), ye.setScissorTest(z), J) {
        const pe = Me.get(x.texture);
        I.framebufferTexture2D(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, I.TEXTURE_CUBE_MAP_POSITIVE_X + L, pe.__webglTexture, O);
      } else if (oe) {
        const pe = Me.get(x.texture), we = L || 0;
        I.framebufferTextureLayer(I.FRAMEBUFFER, I.COLOR_ATTACHMENT0, pe.__webglTexture, O || 0, we);
      }
      S = -1;
    }, this.readRenderTargetPixels = function(x, L, O, B, D, J, oe) {
      if (!(x && x.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let fe = Me.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && oe !== void 0 && (fe = fe[oe]), fe) {
        ye.bindFramebuffer(I.FRAMEBUFFER, fe);
        try {
          const pe = x.texture, we = pe.format, Le = pe.type;
          if (!Ve.textureFormatReadable(we)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Ve.textureTypeReadable(Le)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          L >= 0 && L <= x.width - B && O >= 0 && O <= x.height - D && I.readPixels(L, O, B, D, Ie.convert(we), Ie.convert(Le), J);
        } finally {
          const pe = U !== null ? Me.get(U).__webglFramebuffer : null;
          ye.bindFramebuffer(I.FRAMEBUFFER, pe);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(x, L, O, B, D, J, oe) {
      if (!(x && x.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let fe = Me.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && oe !== void 0 && (fe = fe[oe]), fe) {
        const pe = x.texture, we = pe.format, Le = pe.type;
        if (!Ve.textureFormatReadable(we))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Ve.textureTypeReadable(Le))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (L >= 0 && L <= x.width - B && O >= 0 && O <= x.height - D) {
          ye.bindFramebuffer(I.FRAMEBUFFER, fe);
          const me = I.createBuffer();
          I.bindBuffer(I.PIXEL_PACK_BUFFER, me), I.bufferData(I.PIXEL_PACK_BUFFER, J.byteLength, I.STREAM_READ), I.readPixels(L, O, B, D, Ie.convert(we), Ie.convert(Le), 0);
          const Xe = U !== null ? Me.get(U).__webglFramebuffer : null;
          ye.bindFramebuffer(I.FRAMEBUFFER, Xe);
          const it = I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return I.flush(), await zd(I, it, 4), I.bindBuffer(I.PIXEL_PACK_BUFFER, me), I.getBufferSubData(I.PIXEL_PACK_BUFFER, 0, J), I.deleteBuffer(me), I.deleteSync(it), J;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(x, L = null, O = 0) {
      x.isTexture !== !0 && (ys("WebGLRenderer: copyFramebufferToTexture function signature has changed."), L = arguments[0] || null, x = arguments[1]);
      const B = Math.pow(2, -O), D = Math.floor(x.image.width * B), J = Math.floor(x.image.height * B), oe = L !== null ? L.x : 0, fe = L !== null ? L.y : 0;
      E.setTexture2D(x, 0), I.copyTexSubImage2D(I.TEXTURE_2D, O, 0, 0, oe, fe, D, J), ye.unbindTexture();
    }, this.copyTextureToTexture = function(x, L, O = null, B = null, D = 0) {
      x.isTexture !== !0 && (ys("WebGLRenderer: copyTextureToTexture function signature has changed."), B = arguments[0] || null, x = arguments[1], L = arguments[2], D = arguments[3] || 0, O = null);
      let J, oe, fe, pe, we, Le, me, Xe, it;
      const rt = x.isCompressedTexture ? x.mipmaps[D] : x.image;
      O !== null ? (J = O.max.x - O.min.x, oe = O.max.y - O.min.y, fe = O.isBox3 ? O.max.z - O.min.z : 1, pe = O.min.x, we = O.min.y, Le = O.isBox3 ? O.min.z : 0) : (J = rt.width, oe = rt.height, fe = rt.depth || 1, pe = 0, we = 0, Le = 0), B !== null ? (me = B.x, Xe = B.y, it = B.z) : (me = 0, Xe = 0, it = 0);
      const It = Ie.convert(L.format), qe = Ie.convert(L.type);
      let ve;
      L.isData3DTexture ? (E.setTexture3D(L, 0), ve = I.TEXTURE_3D) : L.isDataArrayTexture || L.isCompressedArrayTexture ? (E.setTexture2DArray(L, 0), ve = I.TEXTURE_2D_ARRAY) : (E.setTexture2D(L, 0), ve = I.TEXTURE_2D), I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL, L.flipY), I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha), I.pixelStorei(I.UNPACK_ALIGNMENT, L.unpackAlignment);
      const mn = I.getParameter(I.UNPACK_ROW_LENGTH), je = I.getParameter(I.UNPACK_IMAGE_HEIGHT), Yt = I.getParameter(I.UNPACK_SKIP_PIXELS), mi = I.getParameter(I.UNPACK_SKIP_ROWS), Ft = I.getParameter(I.UNPACK_SKIP_IMAGES);
      I.pixelStorei(I.UNPACK_ROW_LENGTH, rt.width), I.pixelStorei(I.UNPACK_IMAGE_HEIGHT, rt.height), I.pixelStorei(I.UNPACK_SKIP_PIXELS, pe), I.pixelStorei(I.UNPACK_SKIP_ROWS, we), I.pixelStorei(I.UNPACK_SKIP_IMAGES, Le);
      const ls = x.isDataArrayTexture || x.isData3DTexture, at = L.isDataArrayTexture || L.isData3DTexture;
      if (x.isRenderTargetTexture || x.isDepthTexture) {
        const rn = Me.get(x), cs = Me.get(L), Ht = Me.get(rn.__renderTarget), Dn = Me.get(cs.__renderTarget);
        ye.bindFramebuffer(I.READ_FRAMEBUFFER, Ht.__webglFramebuffer), ye.bindFramebuffer(I.DRAW_FRAMEBUFFER, Dn.__webglFramebuffer);
        for (let In = 0; In < fe; In++)
          ls && I.framebufferTextureLayer(I.READ_FRAMEBUFFER, I.COLOR_ATTACHMENT0, Me.get(x).__webglTexture, D, Le + In), x.isDepthTexture ? (at && I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER, I.COLOR_ATTACHMENT0, Me.get(L).__webglTexture, D, it + In), I.blitFramebuffer(pe, we, J, oe, me, Xe, J, oe, I.DEPTH_BUFFER_BIT, I.NEAREST)) : at ? I.copyTexSubImage3D(ve, D, me, Xe, it + In, pe, we, J, oe) : I.copyTexSubImage2D(ve, D, me, Xe, it + In, pe, we, J, oe);
        ye.bindFramebuffer(I.READ_FRAMEBUFFER, null), ye.bindFramebuffer(I.DRAW_FRAMEBUFFER, null);
      } else
        at ? x.isDataTexture || x.isData3DTexture ? I.texSubImage3D(ve, D, me, Xe, it, J, oe, fe, It, qe, rt.data) : L.isCompressedArrayTexture ? I.compressedTexSubImage3D(ve, D, me, Xe, it, J, oe, fe, It, rt.data) : I.texSubImage3D(ve, D, me, Xe, it, J, oe, fe, It, qe, rt) : x.isDataTexture ? I.texSubImage2D(I.TEXTURE_2D, D, me, Xe, J, oe, It, qe, rt.data) : x.isCompressedTexture ? I.compressedTexSubImage2D(I.TEXTURE_2D, D, me, Xe, rt.width, rt.height, It, rt.data) : I.texSubImage2D(I.TEXTURE_2D, D, me, Xe, J, oe, It, qe, rt);
      I.pixelStorei(I.UNPACK_ROW_LENGTH, mn), I.pixelStorei(I.UNPACK_IMAGE_HEIGHT, je), I.pixelStorei(I.UNPACK_SKIP_PIXELS, Yt), I.pixelStorei(I.UNPACK_SKIP_ROWS, mi), I.pixelStorei(I.UNPACK_SKIP_IMAGES, Ft), D === 0 && L.generateMipmaps && I.generateMipmap(ve), ye.unbindTexture();
    }, this.copyTextureToTexture3D = function(x, L, O = null, B = null, D = 0) {
      return x.isTexture !== !0 && (ys("WebGLRenderer: copyTextureToTexture3D function signature has changed."), O = arguments[0] || null, B = arguments[1] || null, x = arguments[2], L = arguments[3], D = arguments[4] || 0), ys('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(x, L, O, B, D);
    }, this.initRenderTarget = function(x) {
      Me.get(x).__webglFramebuffer === void 0 && E.setupRenderTarget(x);
    }, this.initTexture = function(x) {
      x.isCubeTexture ? E.setTextureCube(x, 0) : x.isData3DTexture ? E.setTexture3D(x, 0) : x.isDataArrayTexture || x.isCompressedArrayTexture ? E.setTexture2DArray(x, 0) : E.setTexture2D(x, 0), ye.unbindTexture();
    }, this.resetState = function() {
      w = 0, R = 0, U = null, ye.reset(), nt.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return Tn;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorspace = ke._getDrawingBufferColorSpace(e), t.unpackColorSpace = ke._getUnpackColorSpace();
  }
}
class J_ extends ot {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new cn(), this.environmentIntensity = 1, this.environmentRotation = new cn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
class Q_ {
  constructor(e, t) {
    this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e !== void 0 ? e.length / t : 0, this.usage = go, this.updateRanges = [], this.version = 0, this.uuid = en();
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
  }
  copyAt(e, t, n) {
    e *= this.stride, n *= t.stride;
    for (let s = 0, r = this.stride; s < r; s++)
      this.array[e + s] = t.array[n + s];
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  clone(e) {
    e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = en()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(t, this.stride);
    return n.setUsage(this.usage), n;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  toJSON(e) {
    return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = en()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const At = /* @__PURE__ */ new A();
class $o {
  constructor(e, t, n, s = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = n, this.normalized = s;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(e) {
    this.data.needsUpdate = e;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.data.count; t < n; t++)
      At.fromBufferAttribute(this, t), At.applyMatrix4(e), this.setXYZ(t, At.x, At.y, At.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      At.fromBufferAttribute(this, t), At.applyNormalMatrix(e), this.setXYZ(t, At.x, At.y, At.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      At.fromBufferAttribute(this, t), At.transformDirection(e), this.setXYZ(t, At.x, At.y, At.z);
    return this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.data.stride + this.offset + t];
    return this.normalized && (n = Jt(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = Ze(n, this.array)), this.data.array[e * this.data.stride + this.offset + t] = n, this;
  }
  setX(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this;
  }
  setY(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this;
  }
  setZ(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this;
  }
  setW(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this;
  }
  getX(e) {
    let t = this.data.array[e * this.data.stride + this.offset];
    return this.normalized && (t = Jt(t, this.array)), t;
  }
  getY(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 1];
    return this.normalized && (t = Jt(t, this.array)), t;
  }
  getZ(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 2];
    return this.normalized && (t = Jt(t, this.array)), t;
  }
  getW(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 3];
    return this.normalized && (t = Jt(t, this.array)), t;
  }
  setXY(e, t, n) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, s) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array), s = Ze(s, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = s, this;
  }
  setXYZW(e, t, n, s, r) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array), s = Ze(s, this.array), r = Ze(r, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = s, this.data.array[e + 3] = r, this;
  }
  clone(e) {
    if (e === void 0) {
      console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const t = [];
      for (let n = 0; n < this.count; n++) {
        const s = n * this.data.stride + this.offset;
        for (let r = 0; r < this.itemSize; r++)
          t.push(this.data.array[s + r]);
      }
      return new Pt(new this.array.constructor(t), this.itemSize, this.normalized);
    } else
      return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new $o(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(e) {
    if (e === void 0) {
      console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const t = [];
      for (let n = 0; n < this.count; n++) {
        const s = n * this.data.stride + this.offset;
        for (let r = 0; r < this.itemSize; r++)
          t.push(this.data.array[s + r]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: t,
        normalized: this.normalized
      };
    } else
      return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
        isInterleavedBufferAttribute: !0,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized
      };
  }
}
const Tc = /* @__PURE__ */ new A(), Ac = /* @__PURE__ */ new Ye(), wc = /* @__PURE__ */ new Ye(), ev = /* @__PURE__ */ new A(), Rc = /* @__PURE__ */ new Ce(), ar = /* @__PURE__ */ new A(), ya = /* @__PURE__ */ new un(), Cc = /* @__PURE__ */ new Ce(), Sa = /* @__PURE__ */ new ns();
class tv extends pt {
  constructor(e, t) {
    super(e, t), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = wl, this.bindMatrix = new Ce(), this.bindMatrixInverse = new Ce(), this.boundingBox = null, this.boundingSphere = null;
  }
  computeBoundingBox() {
    const e = this.geometry;
    this.boundingBox === null && (this.boundingBox = new Tt()), this.boundingBox.makeEmpty();
    const t = e.getAttribute("position");
    for (let n = 0; n < t.count; n++)
      this.getVertexPosition(n, ar), this.boundingBox.expandByPoint(ar);
  }
  computeBoundingSphere() {
    const e = this.geometry;
    this.boundingSphere === null && (this.boundingSphere = new un()), this.boundingSphere.makeEmpty();
    const t = e.getAttribute("position");
    for (let n = 0; n < t.count; n++)
      this.getVertexPosition(n, ar), this.boundingSphere.expandByPoint(ar);
  }
  copy(e, t) {
    return super.copy(e, t), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  raycast(e, t) {
    const n = this.material, s = this.matrixWorld;
    n !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), ya.copy(this.boundingSphere), ya.applyMatrix4(s), e.ray.intersectsSphere(ya) !== !1 && (Cc.copy(s).invert(), Sa.copy(e.ray).applyMatrix4(Cc), !(this.boundingBox !== null && Sa.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(e, t, Sa)));
  }
  getVertexPosition(e, t) {
    return super.getVertexPosition(e, t), this.applyBoneTransform(e, t), t;
  }
  bind(e, t) {
    this.skeleton = e, t === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const e = new Ye(), t = this.geometry.attributes.skinWeight;
    for (let n = 0, s = t.count; n < s; n++) {
      e.fromBufferAttribute(t, n);
      const r = 1 / e.manhattanLength();
      r !== 1 / 0 ? e.multiplyScalar(r) : e.set(1, 0, 0, 0), t.setXYZW(n, e.x, e.y, e.z, e.w);
    }
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.bindMode === wl ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === cd ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  applyBoneTransform(e, t) {
    const n = this.skeleton, s = this.geometry;
    Ac.fromBufferAttribute(s.attributes.skinIndex, e), wc.fromBufferAttribute(s.attributes.skinWeight, e), Tc.copy(t).applyMatrix4(this.bindMatrix), t.set(0, 0, 0);
    for (let r = 0; r < 4; r++) {
      const a = wc.getComponent(r);
      if (a !== 0) {
        const o = Ac.getComponent(r);
        Rc.multiplyMatrices(n.bones[o].matrixWorld, n.boneInverses[o]), t.addScaledVector(ev.copy(Tc).applyMatrix4(Rc), a);
      }
    }
    return t.applyMatrix4(this.bindMatrixInverse);
  }
}
class Wh extends ot {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}
class $h extends vt {
  constructor(e = null, t = 1, n = 1, s, r, a, o, l, c = Ct, h = Ct, u, d) {
    super(null, a, o, l, c, h, s, r, u, d), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const Pc = /* @__PURE__ */ new Ce(), nv = /* @__PURE__ */ new Ce();
class Xo {
  constructor(e = [], t = []) {
    this.uuid = en(), this.bones = e.slice(0), this.boneInverses = t, this.boneMatrices = null, this.boneTexture = null, this.init();
  }
  init() {
    const e = this.bones, t = this.boneInverses;
    if (this.boneMatrices = new Float32Array(e.length * 16), t.length === 0)
      this.calculateInverses();
    else if (e.length !== t.length) {
      console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
      for (let n = 0, s = this.bones.length; n < s; n++)
        this.boneInverses.push(new Ce());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const n = new Ce();
      this.bones[e] && n.copy(this.bones[e].matrixWorld).invert(), this.boneInverses.push(n);
    }
  }
  pose() {
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const n = this.bones[e];
      n && n.matrixWorld.copy(this.boneInverses[e]).invert();
    }
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const n = this.bones[e];
      n && (n.parent && n.parent.isBone ? (n.matrix.copy(n.parent.matrixWorld).invert(), n.matrix.multiply(n.matrixWorld)) : n.matrix.copy(n.matrixWorld), n.matrix.decompose(n.position, n.quaternion, n.scale));
    }
  }
  update() {
    const e = this.bones, t = this.boneInverses, n = this.boneMatrices, s = this.boneTexture;
    for (let r = 0, a = e.length; r < a; r++) {
      const o = e[r] ? e[r].matrixWorld : nv;
      Pc.multiplyMatrices(o, t[r]), Pc.toArray(n, r * 16);
    }
    s !== null && (s.needsUpdate = !0);
  }
  clone() {
    return new Xo(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let e = Math.sqrt(this.bones.length * 4);
    e = Math.ceil(e / 4) * 4, e = Math.max(e, 4);
    const t = new Float32Array(e * e * 4);
    t.set(this.boneMatrices);
    const n = new $h(t, e, e, $t, Qt);
    return n.needsUpdate = !0, this.boneMatrices = t, this.boneTexture = n, this;
  }
  getBoneByName(e) {
    for (let t = 0, n = this.bones.length; t < n; t++) {
      const s = this.bones[t];
      if (s.name === e)
        return s;
    }
  }
  dispose() {
    this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null);
  }
  fromJSON(e, t) {
    this.uuid = e.uuid;
    for (let n = 0, s = e.bones.length; n < s; n++) {
      const r = e.bones[n];
      let a = t[r];
      a === void 0 && (console.warn("THREE.Skeleton: No bone found with UUID:", r), a = new Wh()), this.bones.push(a), this.boneInverses.push(new Ce().fromArray(e.boneInverses[n]));
    }
    return this.init(), this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    e.uuid = this.uuid;
    const t = this.bones, n = this.boneInverses;
    for (let s = 0, r = t.length; s < r; s++) {
      const a = t[s];
      e.bones.push(a.uuid);
      const o = n[s];
      e.boneInverses.push(o.toArray());
    }
    return e;
  }
}
class vo extends Pt {
  constructor(e, t, n, s = 1) {
    super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = s;
  }
  copy(e) {
    return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
  }
}
const Pi = /* @__PURE__ */ new Ce(), Lc = /* @__PURE__ */ new Ce(), or = [], Dc = /* @__PURE__ */ new Tt(), iv = /* @__PURE__ */ new Ce(), ms = /* @__PURE__ */ new pt(), gs = /* @__PURE__ */ new un();
class sv extends pt {
  constructor(e, t, n) {
    super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new vo(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let s = 0; s < n; s++)
      this.setMatrixAt(s, iv);
  }
  computeBoundingBox() {
    const e = this.geometry, t = this.count;
    this.boundingBox === null && (this.boundingBox = new Tt()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < t; n++)
      this.getMatrixAt(n, Pi), Dc.copy(e.boundingBox).applyMatrix4(Pi), this.boundingBox.union(Dc);
  }
  computeBoundingSphere() {
    const e = this.geometry, t = this.count;
    this.boundingSphere === null && (this.boundingSphere = new un()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < t; n++)
      this.getMatrixAt(n, Pi), gs.copy(e.boundingSphere).applyMatrix4(Pi), this.boundingSphere.union(gs);
  }
  copy(e, t) {
    return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  getColorAt(e, t) {
    t.fromArray(this.instanceColor.array, e * 3);
  }
  getMatrixAt(e, t) {
    t.fromArray(this.instanceMatrix.array, e * 16);
  }
  getMorphAt(e, t) {
    const n = t.morphTargetInfluences, s = this.morphTexture.source.data.data, r = n.length + 1, a = e * r + 1;
    for (let o = 0; o < n.length; o++)
      n[o] = s[a + o];
  }
  raycast(e, t) {
    const n = this.matrixWorld, s = this.count;
    if (ms.geometry = this.geometry, ms.material = this.material, ms.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), gs.copy(this.boundingSphere), gs.applyMatrix4(n), e.ray.intersectsSphere(gs) !== !1))
      for (let r = 0; r < s; r++) {
        this.getMatrixAt(r, Pi), Lc.multiplyMatrices(n, Pi), ms.matrixWorld = Lc, ms.raycast(e, or);
        for (let a = 0, o = or.length; a < o; a++) {
          const l = or[a];
          l.instanceId = r, l.object = this, t.push(l);
        }
        or.length = 0;
      }
  }
  setColorAt(e, t) {
    this.instanceColor === null && (this.instanceColor = new vo(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3);
  }
  setMatrixAt(e, t) {
    t.toArray(this.instanceMatrix.array, e * 16);
  }
  setMorphAt(e, t) {
    const n = t.morphTargetInfluences, s = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new $h(new Float32Array(s * this.count), s, this.count, No, Qt));
    const r = this.morphTexture.source.data.data;
    let a = 0;
    for (let c = 0; c < n.length; c++)
      a += n[c];
    const o = this.geometry.morphTargetsRelative ? 1 : 1 - a, l = s * e;
    r[l] = o, r.set(n, l + 1);
  }
  updateMorphTargets() {
  }
  dispose() {
    return this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null), this;
  }
}
class Yo extends tn {
  static get type() {
    return "LineBasicMaterial";
  }
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.color = new Ee(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}
const Pr = /* @__PURE__ */ new A(), Lr = /* @__PURE__ */ new A(), Ic = /* @__PURE__ */ new Ce(), _s = /* @__PURE__ */ new ns(), lr = /* @__PURE__ */ new un(), ba = /* @__PURE__ */ new A(), Uc = /* @__PURE__ */ new A();
class qo extends ot {
  constructor(e = new sn(), t = new Yo()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [0];
      for (let s = 1, r = t.count; s < r; s++)
        Pr.fromBufferAttribute(t, s - 1), Lr.fromBufferAttribute(t, s), n[s] = n[s - 1], n[s] += Pr.distanceTo(Lr);
      e.setAttribute("lineDistance", new on(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const n = this.geometry, s = this.matrixWorld, r = e.params.Line.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), lr.copy(n.boundingSphere), lr.applyMatrix4(s), lr.radius += r, e.ray.intersectsSphere(lr) === !1) return;
    Ic.copy(s).invert(), _s.copy(e.ray).applyMatrix4(Ic);
    const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = o * o, c = this.isLineSegments ? 2 : 1, h = n.index, d = n.attributes.position;
    if (h !== null) {
      const p = Math.max(0, a.start), g = Math.min(h.count, a.start + a.count);
      for (let _ = p, m = g - 1; _ < m; _ += c) {
        const f = h.getX(_), T = h.getX(_ + 1), b = cr(this, e, _s, l, f, T);
        b && t.push(b);
      }
      if (this.isLineLoop) {
        const _ = h.getX(g - 1), m = h.getX(p), f = cr(this, e, _s, l, _, m);
        f && t.push(f);
      }
    } else {
      const p = Math.max(0, a.start), g = Math.min(d.count, a.start + a.count);
      for (let _ = p, m = g - 1; _ < m; _ += c) {
        const f = cr(this, e, _s, l, _, _ + 1);
        f && t.push(f);
      }
      if (this.isLineLoop) {
        const _ = cr(this, e, _s, l, g - 1, p);
        _ && t.push(_);
      }
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const s = t[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
        }
      }
    }
  }
}
function cr(i, e, t, n, s, r) {
  const a = i.geometry.attributes.position;
  if (Pr.fromBufferAttribute(a, s), Lr.fromBufferAttribute(a, r), t.distanceSqToSegment(Pr, Lr, ba, Uc) > n) return;
  ba.applyMatrix4(i.matrixWorld);
  const l = e.ray.origin.distanceTo(ba);
  if (!(l < e.near || l > e.far))
    return {
      distance: l,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: Uc.clone().applyMatrix4(i.matrixWorld),
      index: s,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i
    };
}
const Nc = /* @__PURE__ */ new A(), Fc = /* @__PURE__ */ new A();
class Xh extends qo {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [];
      for (let s = 0, r = t.count; s < r; s += 2)
        Nc.fromBufferAttribute(t, s), Fc.fromBufferAttribute(t, s + 1), n[s] = s === 0 ? 0 : n[s - 1], n[s + 1] = n[s] + Nc.distanceTo(Fc);
      e.setAttribute("lineDistance", new on(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class rv extends qo {
  constructor(e, t) {
    super(e, t), this.isLineLoop = !0, this.type = "LineLoop";
  }
}
class Yh extends tn {
  static get type() {
    return "PointsMaterial";
  }
  constructor(e) {
    super(), this.isPointsMaterial = !0, this.color = new Ee(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
const Oc = /* @__PURE__ */ new Ce(), xo = /* @__PURE__ */ new ns(), hr = /* @__PURE__ */ new un(), ur = /* @__PURE__ */ new A();
class av extends ot {
  constructor(e = new sn(), t = new Yh()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  raycast(e, t) {
    const n = this.geometry, s = this.matrixWorld, r = e.params.Points.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), hr.copy(n.boundingSphere), hr.applyMatrix4(s), hr.radius += r, e.ray.intersectsSphere(hr) === !1) return;
    Oc.copy(s).invert(), xo.copy(e.ray).applyMatrix4(Oc);
    const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = o * o, c = n.index, u = n.attributes.position;
    if (c !== null) {
      const d = Math.max(0, a.start), p = Math.min(c.count, a.start + a.count);
      for (let g = d, _ = p; g < _; g++) {
        const m = c.getX(g);
        ur.fromBufferAttribute(u, m), Bc(ur, m, l, s, e, t, this);
      }
    } else {
      const d = Math.max(0, a.start), p = Math.min(u.count, a.start + a.count);
      for (let g = d, _ = p; g < _; g++)
        ur.fromBufferAttribute(u, g), Bc(ur, g, l, s, e, t, this);
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const s = t[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = r;
        }
      }
    }
  }
}
function Bc(i, e, t, n, s, r, a) {
  const o = xo.distanceSqToPoint(i);
  if (o < t) {
    const l = new A();
    xo.closestPointToPoint(i, l), l.applyMatrix4(n);
    const c = s.ray.origin.distanceTo(l);
    if (c < s.near || c > s.far) return;
    r.push({
      distance: c,
      distanceToRay: Math.sqrt(o),
      point: l,
      index: e,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: a
    });
  }
}
const dr = /* @__PURE__ */ new A(), fr = /* @__PURE__ */ new A(), Ea = /* @__PURE__ */ new A(), pr = /* @__PURE__ */ new Wt();
class ov extends sn {
  constructor(e = null, t = 1) {
    if (super(), this.type = "EdgesGeometry", this.parameters = {
      geometry: e,
      thresholdAngle: t
    }, e !== null) {
      const s = Math.pow(10, 4), r = Math.cos(Oi * t), a = e.getIndex(), o = e.getAttribute("position"), l = a ? a.count : o.count, c = [0, 0, 0], h = ["a", "b", "c"], u = new Array(3), d = {}, p = [];
      for (let g = 0; g < l; g += 3) {
        a ? (c[0] = a.getX(g), c[1] = a.getX(g + 1), c[2] = a.getX(g + 2)) : (c[0] = g, c[1] = g + 1, c[2] = g + 2);
        const { a: _, b: m, c: f } = pr;
        if (_.fromBufferAttribute(o, c[0]), m.fromBufferAttribute(o, c[1]), f.fromBufferAttribute(o, c[2]), pr.getNormal(Ea), u[0] = `${Math.round(_.x * s)},${Math.round(_.y * s)},${Math.round(_.z * s)}`, u[1] = `${Math.round(m.x * s)},${Math.round(m.y * s)},${Math.round(m.z * s)}`, u[2] = `${Math.round(f.x * s)},${Math.round(f.y * s)},${Math.round(f.z * s)}`, !(u[0] === u[1] || u[1] === u[2] || u[2] === u[0]))
          for (let T = 0; T < 3; T++) {
            const b = (T + 1) % 3, M = u[T], N = u[b], w = pr[h[T]], R = pr[h[b]], U = `${M}_${N}`, S = `${N}_${M}`;
            S in d && d[S] ? (Ea.dot(d[S].normal) <= r && (p.push(w.x, w.y, w.z), p.push(R.x, R.y, R.z)), d[S] = null) : U in d || (d[U] = {
              index0: c[T],
              index1: c[b],
              normal: Ea.clone()
            });
          }
      }
      for (const g in d)
        if (d[g]) {
          const { index0: _, index1: m } = d[g];
          dr.fromBufferAttribute(o, _), fr.fromBufferAttribute(o, m), p.push(dr.x, dr.y, dr.z), p.push(fr.x, fr.y, fr.z);
        }
      this.setAttribute("position", new on(p, 3));
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
}
class lv extends tn {
  static get type() {
    return "ShadowMaterial";
  }
  constructor(e) {
    super(), this.isShadowMaterial = !0, this.color = new Ee(0), this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.fog = e.fog, this;
  }
}
class Fr extends tn {
  static get type() {
    return "MeshStandardMaterial";
  }
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.color = new Ee(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ee(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = wh, this.normalScale = new Te(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new cn(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class dn extends Fr {
  static get type() {
    return "MeshPhysicalMaterial";
  }
  constructor(e) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new Te(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function() {
        return Mt(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function(t) {
        this.ior = (1 + 0.4 * t) / (1 - 0.4 * t);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Ee(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Ee(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Ee(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(e);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(e) {
    this._anisotropy > 0 != e > 0 && this.version++, this._anisotropy = e;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(e) {
    this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(e) {
    this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e;
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(e) {
    this._dispersion > 0 != e > 0 && this.version++, this._dispersion = e;
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(e) {
    this._sheen > 0 != e > 0 && this.version++, this._sheen = e;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(e) {
    this._transmission > 0 != e > 0 && this.version++, this._transmission = e;
  }
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
  }
}
function mr(i, e, t) {
  return !i || // let 'undefined' and 'null' pass
  !t && i.constructor === e ? i : typeof e.BYTES_PER_ELEMENT == "number" ? new e(i) : Array.prototype.slice.call(i);
}
function cv(i) {
  return ArrayBuffer.isView(i) && !(i instanceof DataView);
}
function hv(i) {
  function e(s, r) {
    return i[s] - i[r];
  }
  const t = i.length, n = new Array(t);
  for (let s = 0; s !== t; ++s) n[s] = s;
  return n.sort(e), n;
}
function zc(i, e, t) {
  const n = i.length, s = new i.constructor(n);
  for (let r = 0, a = 0; a !== n; ++r) {
    const o = t[r] * e;
    for (let l = 0; l !== e; ++l)
      s[a++] = i[o + l];
  }
  return s;
}
function qh(i, e, t, n) {
  let s = 1, r = i[0];
  for (; r !== void 0 && r[n] === void 0; )
    r = i[s++];
  if (r === void 0) return;
  let a = r[n];
  if (a !== void 0)
    if (Array.isArray(a))
      do
        a = r[n], a !== void 0 && (e.push(r.time), t.push.apply(t, a)), r = i[s++];
      while (r !== void 0);
    else if (a.toArray !== void 0)
      do
        a = r[n], a !== void 0 && (e.push(r.time), a.toArray(t, t.length)), r = i[s++];
      while (r !== void 0);
    else
      do
        a = r[n], a !== void 0 && (e.push(r.time), t.push(a)), r = i[s++];
      while (r !== void 0);
}
class Os {
  constructor(e, t, n, s) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = s !== void 0 ? s : new t.constructor(n), this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let n = this._cachedIndex, s = t[n], r = t[n - 1];
    n: {
      e: {
        let a;
        t: {
          i: if (!(e < s)) {
            for (let o = n + 2; ; ) {
              if (s === void 0) {
                if (e < r) break i;
                return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
              }
              if (n === o) break;
              if (r = s, s = t[++n], e < s)
                break e;
            }
            a = t.length;
            break t;
          }
          if (!(e >= r)) {
            const o = t[1];
            e < o && (n = 2, r = o);
            for (let l = n - 2; ; ) {
              if (r === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (n === l) break;
              if (s = r, r = t[--n - 1], e >= r)
                break e;
            }
            a = n, n = 0;
            break t;
          }
          break n;
        }
        for (; n < a; ) {
          const o = n + a >>> 1;
          e < t[o] ? a = o : n = o + 1;
        }
        if (s = t[n], r = t[n - 1], r === void 0)
          return this._cachedIndex = 0, this.copySampleValue_(0);
        if (s === void 0)
          return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
      }
      this._cachedIndex = n, this.intervalChanged_(n, r, s);
    }
    return this.interpolate_(n, r, e, s);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, s = this.valueSize, r = e * s;
    for (let a = 0; a !== s; ++a)
      t[a] = n[r + a];
    return t;
  }
  // Template methods for derived classes:
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {
  }
}
class uv extends Os {
  constructor(e, t, n, s) {
    super(e, t, n, s), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: Rl,
      endingEnd: Rl
    };
  }
  intervalChanged_(e, t, n) {
    const s = this.parameterPositions;
    let r = e - 2, a = e + 1, o = s[r], l = s[a];
    if (o === void 0)
      switch (this.getSettings_().endingStart) {
        case Cl:
          r = e, o = 2 * t - n;
          break;
        case Pl:
          r = s.length - 2, o = t + s[r] - s[r + 1];
          break;
        default:
          r = e, o = n;
      }
    if (l === void 0)
      switch (this.getSettings_().endingEnd) {
        case Cl:
          a = e, l = 2 * n - t;
          break;
        case Pl:
          a = 1, l = n + s[1] - s[0];
          break;
        default:
          a = e - 1, l = t;
      }
    const c = (n - t) * 0.5, h = this.valueSize;
    this._weightPrev = c / (t - o), this._weightNext = c / (l - n), this._offsetPrev = r * h, this._offsetNext = a * h;
  }
  interpolate_(e, t, n, s) {
    const r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, l = e * o, c = l - o, h = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, p = this._weightNext, g = (n - t) / (s - t), _ = g * g, m = _ * g, f = -d * m + 2 * d * _ - d * g, T = (1 + d) * m + (-1.5 - 2 * d) * _ + (-0.5 + d) * g + 1, b = (-1 - p) * m + (1.5 + p) * _ + 0.5 * g, M = p * m - p * _;
    for (let N = 0; N !== o; ++N)
      r[N] = f * a[h + N] + T * a[c + N] + b * a[l + N] + M * a[u + N];
    return r;
  }
}
class dv extends Os {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  interpolate_(e, t, n, s) {
    const r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, l = e * o, c = l - o, h = (n - t) / (s - t), u = 1 - h;
    for (let d = 0; d !== o; ++d)
      r[d] = a[c + d] * u + a[l + d] * h;
    return r;
  }
}
class fv extends Os {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}
class fn {
  constructor(e, t, n, s) {
    if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = mr(t, this.TimeBufferType), this.values = mr(n, this.ValueBufferType), this.setInterpolation(s || this.DefaultInterpolation);
  }
  // Serialization (in static context, because of constructor invocation
  // and automatic invocation of .toJSON):
  static toJSON(e) {
    const t = e.constructor;
    let n;
    if (t.toJSON !== this.toJSON)
      n = t.toJSON(e);
    else {
      n = {
        name: e.name,
        times: mr(e.times, Array),
        values: mr(e.values, Array)
      };
      const s = e.getInterpolation();
      s !== e.DefaultInterpolation && (n.interpolation = s);
    }
    return n.type = e.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new fv(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new dv(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new uv(this.times, this.values, this.getValueSize(), e);
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case Ls:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case Ds:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case Yr:
        t = this.InterpolantFactoryMethodSmooth;
        break;
    }
    if (t === void 0) {
      const n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0)
        if (e !== this.DefaultInterpolation)
          this.setInterpolation(this.DefaultInterpolation);
        else
          throw new Error(n);
      return console.warn("THREE.KeyframeTrack:", n), this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return Ls;
      case this.InterpolantFactoryMethodLinear:
        return Ds;
      case this.InterpolantFactoryMethodSmooth:
        return Yr;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  // move all keyframes either forwards or backwards in time
  shift(e) {
    if (e !== 0) {
      const t = this.times;
      for (let n = 0, s = t.length; n !== s; ++n)
        t[n] += e;
    }
    return this;
  }
  // scale all keyframe times by a factor (useful for frame <-> seconds conversions)
  scale(e) {
    if (e !== 1) {
      const t = this.times;
      for (let n = 0, s = t.length; n !== s; ++n)
        t[n] *= e;
    }
    return this;
  }
  // removes keyframes before and after animation without changing any values within the range [startTime, endTime].
  // IMPORTANT: We do not shift around keys to the start of the track time, because for interpolated keys this will change their values
  trim(e, t) {
    const n = this.times, s = n.length;
    let r = 0, a = s - 1;
    for (; r !== s && n[r] < e; )
      ++r;
    for (; a !== -1 && n[a] > t; )
      --a;
    if (++a, r !== 0 || a !== s) {
      r >= a && (a = Math.max(a, 1), r = a - 1);
      const o = this.getValueSize();
      this.times = n.slice(r, a), this.values = this.values.slice(r * o, a * o);
    }
    return this;
  }
  // ensure we do not get a GarbageInGarbageOut situation, make sure tracks are at least minimally viable
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), e = !1);
    const n = this.times, s = this.values, r = n.length;
    r === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), e = !1);
    let a = null;
    for (let o = 0; o !== r; o++) {
      const l = n[o];
      if (typeof l == "number" && isNaN(l)) {
        console.error("THREE.KeyframeTrack: Time is not a valid number.", this, o, l), e = !1;
        break;
      }
      if (a !== null && a > l) {
        console.error("THREE.KeyframeTrack: Out of order keys.", this, o, l, a), e = !1;
        break;
      }
      a = l;
    }
    if (s !== void 0 && cv(s))
      for (let o = 0, l = s.length; o !== l; ++o) {
        const c = s[o];
        if (isNaN(c)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, o, c), e = !1;
          break;
        }
      }
    return e;
  }
  // removes equivalent sequential keys as common in morph target sequences
  // (0,0,0,0,1,1,1,0,0,0,0,0,0,0) --> (0,0,1,1,0,0)
  optimize() {
    const e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), s = this.getInterpolation() === Yr, r = e.length - 1;
    let a = 1;
    for (let o = 1; o < r; ++o) {
      let l = !1;
      const c = e[o], h = e[o + 1];
      if (c !== h && (o !== 1 || c !== e[0]))
        if (s)
          l = !0;
        else {
          const u = o * n, d = u - n, p = u + n;
          for (let g = 0; g !== n; ++g) {
            const _ = t[u + g];
            if (_ !== t[d + g] || _ !== t[p + g]) {
              l = !0;
              break;
            }
          }
        }
      if (l) {
        if (o !== a) {
          e[a] = e[o];
          const u = o * n, d = a * n;
          for (let p = 0; p !== n; ++p)
            t[d + p] = t[u + p];
        }
        ++a;
      }
    }
    if (r > 0) {
      e[a] = e[r];
      for (let o = r * n, l = a * n, c = 0; c !== n; ++c)
        t[l + c] = t[o + c];
      ++a;
    }
    return a !== e.length ? (this.times = e.slice(0, a), this.values = t.slice(0, a * n)) : (this.times = e, this.values = t), this;
  }
  clone() {
    const e = this.times.slice(), t = this.values.slice(), n = this.constructor, s = new n(this.name, e, t);
    return s.createInterpolant = this.createInterpolant, s;
  }
}
fn.prototype.TimeBufferType = Float32Array;
fn.prototype.ValueBufferType = Float32Array;
fn.prototype.DefaultInterpolation = Ds;
class rs extends fn {
  // No interpolation parameter because only InterpolateDiscrete is valid.
  constructor(e, t, n) {
    super(e, t, n);
  }
}
rs.prototype.ValueTypeName = "bool";
rs.prototype.ValueBufferType = Array;
rs.prototype.DefaultInterpolation = Ls;
rs.prototype.InterpolantFactoryMethodLinear = void 0;
rs.prototype.InterpolantFactoryMethodSmooth = void 0;
class jh extends fn {
}
jh.prototype.ValueTypeName = "color";
class Zi extends fn {
}
Zi.prototype.ValueTypeName = "number";
class pv extends Os {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  interpolate_(e, t, n, s) {
    const r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, l = (n - t) / (s - t);
    let c = e * o;
    for (let h = c + o; c !== h; c += 4)
      ln.slerpFlat(r, 0, a, c - o, a, c, l);
    return r;
  }
}
class Ji extends fn {
  InterpolantFactoryMethodLinear(e) {
    return new pv(this.times, this.values, this.getValueSize(), e);
  }
}
Ji.prototype.ValueTypeName = "quaternion";
Ji.prototype.InterpolantFactoryMethodSmooth = void 0;
class as extends fn {
  // No interpolation parameter because only InterpolateDiscrete is valid.
  constructor(e, t, n) {
    super(e, t, n);
  }
}
as.prototype.ValueTypeName = "string";
as.prototype.ValueBufferType = Array;
as.prototype.DefaultInterpolation = Ls;
as.prototype.InterpolantFactoryMethodLinear = void 0;
as.prototype.InterpolantFactoryMethodSmooth = void 0;
class Qi extends fn {
}
Qi.prototype.ValueTypeName = "vector";
class mv {
  constructor(e = "", t = -1, n = [], s = hd) {
    this.name = e, this.tracks = n, this.duration = t, this.blendMode = s, this.uuid = en(), this.duration < 0 && this.resetDuration();
  }
  static parse(e) {
    const t = [], n = e.tracks, s = 1 / (e.fps || 1);
    for (let a = 0, o = n.length; a !== o; ++a)
      t.push(_v(n[a]).scale(s));
    const r = new this(e.name, e.duration, t, e.blendMode);
    return r.uuid = e.uuid, r;
  }
  static toJSON(e) {
    const t = [], n = e.tracks, s = {
      name: e.name,
      duration: e.duration,
      tracks: t,
      uuid: e.uuid,
      blendMode: e.blendMode
    };
    for (let r = 0, a = n.length; r !== a; ++r)
      t.push(fn.toJSON(n[r]));
    return s;
  }
  static CreateFromMorphTargetSequence(e, t, n, s) {
    const r = t.length, a = [];
    for (let o = 0; o < r; o++) {
      let l = [], c = [];
      l.push(
        (o + r - 1) % r,
        o,
        (o + 1) % r
      ), c.push(0, 1, 0);
      const h = hv(l);
      l = zc(l, 1, h), c = zc(c, 1, h), !s && l[0] === 0 && (l.push(r), c.push(c[0])), a.push(
        new Zi(
          ".morphTargetInfluences[" + t[o].name + "]",
          l,
          c
        ).scale(1 / n)
      );
    }
    return new this(e, -1, a);
  }
  static findByName(e, t) {
    let n = e;
    if (!Array.isArray(e)) {
      const s = e;
      n = s.geometry && s.geometry.animations || s.animations;
    }
    for (let s = 0; s < n.length; s++)
      if (n[s].name === t)
        return n[s];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(e, t, n) {
    const s = {}, r = /^([\w-]*?)([\d]+)$/;
    for (let o = 0, l = e.length; o < l; o++) {
      const c = e[o], h = c.name.match(r);
      if (h && h.length > 1) {
        const u = h[1];
        let d = s[u];
        d || (s[u] = d = []), d.push(c);
      }
    }
    const a = [];
    for (const o in s)
      a.push(this.CreateFromMorphTargetSequence(o, s[o], t, n));
    return a;
  }
  // parse the animation.hierarchy format
  static parseAnimation(e, t) {
    if (!e)
      return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
    const n = function(u, d, p, g, _) {
      if (p.length !== 0) {
        const m = [], f = [];
        qh(p, m, f, g), m.length !== 0 && _.push(new u(d, m, f));
      }
    }, s = [], r = e.name || "default", a = e.fps || 30, o = e.blendMode;
    let l = e.length || -1;
    const c = e.hierarchy || [];
    for (let u = 0; u < c.length; u++) {
      const d = c[u].keys;
      if (!(!d || d.length === 0))
        if (d[0].morphTargets) {
          const p = {};
          let g;
          for (g = 0; g < d.length; g++)
            if (d[g].morphTargets)
              for (let _ = 0; _ < d[g].morphTargets.length; _++)
                p[d[g].morphTargets[_]] = -1;
          for (const _ in p) {
            const m = [], f = [];
            for (let T = 0; T !== d[g].morphTargets.length; ++T) {
              const b = d[g];
              m.push(b.time), f.push(b.morphTarget === _ ? 1 : 0);
            }
            s.push(new Zi(".morphTargetInfluence[" + _ + "]", m, f));
          }
          l = p.length * a;
        } else {
          const p = ".bones[" + t[u].name + "]";
          n(
            Qi,
            p + ".position",
            d,
            "pos",
            s
          ), n(
            Ji,
            p + ".quaternion",
            d,
            "rot",
            s
          ), n(
            Qi,
            p + ".scale",
            d,
            "scl",
            s
          );
        }
    }
    return s.length === 0 ? null : new this(r, l, s, o);
  }
  resetDuration() {
    const e = this.tracks;
    let t = 0;
    for (let n = 0, s = e.length; n !== s; ++n) {
      const r = this.tracks[n];
      t = Math.max(t, r.times[r.times.length - 1]);
    }
    return this.duration = t, this;
  }
  trim() {
    for (let e = 0; e < this.tracks.length; e++)
      this.tracks[e].trim(0, this.duration);
    return this;
  }
  validate() {
    let e = !0;
    for (let t = 0; t < this.tracks.length; t++)
      e = e && this.tracks[t].validate();
    return e;
  }
  optimize() {
    for (let e = 0; e < this.tracks.length; e++)
      this.tracks[e].optimize();
    return this;
  }
  clone() {
    const e = [];
    for (let t = 0; t < this.tracks.length; t++)
      e.push(this.tracks[t].clone());
    return new this.constructor(this.name, this.duration, e, this.blendMode);
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
}
function gv(i) {
  switch (i.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return Zi;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return Qi;
    case "color":
      return jh;
    case "quaternion":
      return Ji;
    case "bool":
    case "boolean":
      return rs;
    case "string":
      return as;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + i);
}
function _v(i) {
  if (i.type === void 0)
    throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const e = gv(i.type);
  if (i.times === void 0) {
    const t = [], n = [];
    qh(i.keys, t, n, "value"), i.times = t, i.values = n;
  }
  return e.parse !== void 0 ? e.parse(i) : new e(i.name, i.times, i.values, i.interpolation);
}
const $n = {
  enabled: !1,
  files: {},
  add: function(i, e) {
    this.enabled !== !1 && (this.files[i] = e);
  },
  get: function(i) {
    if (this.enabled !== !1)
      return this.files[i];
  },
  remove: function(i) {
    delete this.files[i];
  },
  clear: function() {
    this.files = {};
  }
};
class vv {
  constructor(e, t, n) {
    const s = this;
    let r = !1, a = 0, o = 0, l;
    const c = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this.itemStart = function(h) {
      o++, r === !1 && s.onStart !== void 0 && s.onStart(h, a, o), r = !0;
    }, this.itemEnd = function(h) {
      a++, s.onProgress !== void 0 && s.onProgress(h, a, o), a === o && (r = !1, s.onLoad !== void 0 && s.onLoad());
    }, this.itemError = function(h) {
      s.onError !== void 0 && s.onError(h);
    }, this.resolveURL = function(h) {
      return l ? l(h) : h;
    }, this.setURLModifier = function(h) {
      return l = h, this;
    }, this.addHandler = function(h, u) {
      return c.push(h, u), this;
    }, this.removeHandler = function(h) {
      const u = c.indexOf(h);
      return u !== -1 && c.splice(u, 2), this;
    }, this.getHandler = function(h) {
      for (let u = 0, d = c.length; u < d; u += 2) {
        const p = c[u], g = c[u + 1];
        if (p.global && (p.lastIndex = 0), p.test(h))
          return g;
      }
      return null;
    };
  }
}
const xv = /* @__PURE__ */ new vv();
class os {
  constructor(e) {
    this.manager = e !== void 0 ? e : xv, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(e, t) {
    const n = this;
    return new Promise(function(s, r) {
      n.load(e, s, t, r);
    });
  }
  parse() {
  }
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  setPath(e) {
    return this.path = e, this;
  }
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
}
os.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const yn = {};
class Mv extends Error {
  constructor(e, t) {
    super(e), this.response = t;
  }
}
class Kh extends os {
  constructor(e) {
    super(e);
  }
  load(e, t, n, s) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = $n.get(e);
    if (r !== void 0)
      return this.manager.itemStart(e), setTimeout(() => {
        t && t(r), this.manager.itemEnd(e);
      }, 0), r;
    if (yn[e] !== void 0) {
      yn[e].push({
        onLoad: t,
        onProgress: n,
        onError: s
      });
      return;
    }
    yn[e] = [], yn[e].push({
      onLoad: t,
      onProgress: n,
      onError: s
    });
    const a = new Request(e, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin"
      // An abort controller could be added within a future PR
    }), o = this.mimeType, l = this.responseType;
    fetch(a).then((c) => {
      if (c.status === 200 || c.status === 0) {
        if (c.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || c.body === void 0 || c.body.getReader === void 0)
          return c;
        const h = yn[e], u = c.body.getReader(), d = c.headers.get("X-File-Size") || c.headers.get("Content-Length"), p = d ? parseInt(d) : 0, g = p !== 0;
        let _ = 0;
        const m = new ReadableStream({
          start(f) {
            T();
            function T() {
              u.read().then(({ done: b, value: M }) => {
                if (b)
                  f.close();
                else {
                  _ += M.byteLength;
                  const N = new ProgressEvent("progress", { lengthComputable: g, loaded: _, total: p });
                  for (let w = 0, R = h.length; w < R; w++) {
                    const U = h[w];
                    U.onProgress && U.onProgress(N);
                  }
                  f.enqueue(M), T();
                }
              }, (b) => {
                f.error(b);
              });
            }
          }
        });
        return new Response(m);
      } else
        throw new Mv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`, c);
    }).then((c) => {
      switch (l) {
        case "arraybuffer":
          return c.arrayBuffer();
        case "blob":
          return c.blob();
        case "document":
          return c.text().then((h) => new DOMParser().parseFromString(h, o));
        case "json":
          return c.json();
        default:
          if (o === void 0)
            return c.text();
          {
            const u = /charset="?([^;"\s]*)"?/i.exec(o), d = u && u[1] ? u[1].toLowerCase() : void 0, p = new TextDecoder(d);
            return c.arrayBuffer().then((g) => p.decode(g));
          }
      }
    }).then((c) => {
      $n.add(e, c);
      const h = yn[e];
      delete yn[e];
      for (let u = 0, d = h.length; u < d; u++) {
        const p = h[u];
        p.onLoad && p.onLoad(c);
      }
    }).catch((c) => {
      const h = yn[e];
      if (h === void 0)
        throw this.manager.itemError(e), c;
      delete yn[e];
      for (let u = 0, d = h.length; u < d; u++) {
        const p = h[u];
        p.onError && p.onError(c);
      }
      this.manager.itemError(e);
    }).finally(() => {
      this.manager.itemEnd(e);
    }), this.manager.itemStart(e);
  }
  setResponseType(e) {
    return this.responseType = e, this;
  }
  setMimeType(e) {
    return this.mimeType = e, this;
  }
}
class yv extends os {
  constructor(e) {
    super(e);
  }
  load(e, t, n, s) {
    this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = this, a = $n.get(e);
    if (a !== void 0)
      return r.manager.itemStart(e), setTimeout(function() {
        t && t(a), r.manager.itemEnd(e);
      }, 0), a;
    const o = Is("img");
    function l() {
      h(), $n.add(e, this), t && t(this), r.manager.itemEnd(e);
    }
    function c(u) {
      h(), s && s(u), r.manager.itemError(e), r.manager.itemEnd(e);
    }
    function h() {
      o.removeEventListener("load", l, !1), o.removeEventListener("error", c, !1);
    }
    return o.addEventListener("load", l, !1), o.addEventListener("error", c, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), r.manager.itemStart(e), o.src = e, o;
  }
}
class Sv extends os {
  constructor(e) {
    super(e);
  }
  load(e, t, n, s) {
    const r = new vt(), a = new yv(this.manager);
    return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, function(o) {
      r.image = o, r.needsUpdate = !0, t !== void 0 && t(r);
    }, n, s), r;
  }
}
class Or extends ot {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Ee(e), this.intensity = t;
  }
  dispose() {
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (t.object.distance = this.distance), this.angle !== void 0 && (t.object.angle = this.angle), this.decay !== void 0 && (t.object.decay = this.decay), this.penumbra !== void 0 && (t.object.penumbra = this.penumbra), this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (t.object.target = this.target.uuid), t;
  }
}
class bv extends Or {
  constructor(e, t, n) {
    super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(ot.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Ee(t);
  }
  copy(e, t) {
    return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
  }
}
const Ta = /* @__PURE__ */ new Ce(), kc = /* @__PURE__ */ new A(), Hc = /* @__PURE__ */ new A();
class jo {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Te(512, 512), this.map = null, this.mapPass = null, this.matrix = new Ce(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Vo(), this._frameExtents = new Te(1, 1), this._viewportCount = 1, this._viewports = [
      new Ye(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, n = this.matrix;
    kc.setFromMatrixPosition(e.matrixWorld), t.position.copy(kc), Hc.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(Hc), t.updateMatrixWorld(), Ta.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Ta), n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), n.multiply(Ta);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
class Ev extends jo {
  constructor() {
    super(new Rt(50, 1, 0.5, 500)), this.isSpotLightShadow = !0, this.focus = 1;
  }
  updateMatrices(e) {
    const t = this.camera, n = qi * 2 * e.angle * this.focus, s = this.mapSize.width / this.mapSize.height, r = e.distance || t.far;
    (n !== t.fov || s !== t.aspect || r !== t.far) && (t.fov = n, t.aspect = s, t.far = r, t.updateProjectionMatrix()), super.updateMatrices(e);
  }
  copy(e) {
    return super.copy(e), this.focus = e.focus, this;
  }
}
class Tv extends Or {
  constructor(e, t, n = 0, s = Math.PI / 3, r = 0, a = 2) {
    super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(ot.DEFAULT_UP), this.updateMatrix(), this.target = new ot(), this.distance = n, this.angle = s, this.penumbra = r, this.decay = a, this.map = null, this.shadow = new Ev();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / Math.PI;
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
const Vc = /* @__PURE__ */ new Ce(), vs = /* @__PURE__ */ new A(), Aa = /* @__PURE__ */ new A();
class Av extends jo {
  constructor() {
    super(new Rt(90, 1, 0.5, 500)), this.isPointLightShadow = !0, this._frameExtents = new Te(4, 2), this._viewportCount = 6, this._viewports = [
      // These viewports map a cube-map onto a 2D texture with the
      // following orientation:
      //
      //  xzXZ
      //   y Y
      //
      // X - Positive x direction
      // x - Negative x direction
      // Y - Positive y direction
      // y - Negative y direction
      // Z - Positive z direction
      // z - Negative z direction
      // positive X
      new Ye(2, 1, 1, 1),
      // negative X
      new Ye(0, 1, 1, 1),
      // positive Z
      new Ye(3, 1, 1, 1),
      // negative Z
      new Ye(1, 1, 1, 1),
      // positive Y
      new Ye(3, 0, 1, 1),
      // negative Y
      new Ye(1, 0, 1, 1)
    ], this._cubeDirections = [
      new A(1, 0, 0),
      new A(-1, 0, 0),
      new A(0, 0, 1),
      new A(0, 0, -1),
      new A(0, 1, 0),
      new A(0, -1, 0)
    ], this._cubeUps = [
      new A(0, 1, 0),
      new A(0, 1, 0),
      new A(0, 1, 0),
      new A(0, 1, 0),
      new A(0, 0, 1),
      new A(0, 0, -1)
    ];
  }
  updateMatrices(e, t = 0) {
    const n = this.camera, s = this.matrix, r = e.distance || n.far;
    r !== n.far && (n.far = r, n.updateProjectionMatrix()), vs.setFromMatrixPosition(e.matrixWorld), n.position.copy(vs), Aa.copy(n.position), Aa.add(this._cubeDirections[t]), n.up.copy(this._cubeUps[t]), n.lookAt(Aa), n.updateMatrixWorld(), s.makeTranslation(-vs.x, -vs.y, -vs.z), Vc.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Vc);
  }
}
class wv extends Or {
  constructor(e, t, n = 0, s = 2) {
    super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = s, this.shadow = new Av();
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(e) {
    this.intensity = e / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
  }
}
class Rv extends jo {
  constructor() {
    super(new Go(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class Mo extends Or {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(ot.DEFAULT_UP), this.updateMatrix(), this.target = new ot(), this.shadow = new Rv();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
class As {
  static decodeText(e) {
    if (console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."), typeof TextDecoder < "u")
      return new TextDecoder().decode(e);
    let t = "";
    for (let n = 0, s = e.length; n < s; n++)
      t += String.fromCharCode(e[n]);
    try {
      return decodeURIComponent(escape(t));
    } catch {
      return t;
    }
  }
  static extractUrlBase(e) {
    const t = e.lastIndexOf("/");
    return t === -1 ? "./" : e.slice(0, t + 1);
  }
  static resolveURL(e, t) {
    return typeof e != "string" || e === "" ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
  }
}
class Cv extends os {
  constructor(e) {
    super(e), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" };
  }
  setOptions(e) {
    return this.options = e, this;
  }
  load(e, t, n, s) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = this, a = $n.get(e);
    if (a !== void 0) {
      if (r.manager.itemStart(e), a.then) {
        a.then((c) => {
          t && t(c), r.manager.itemEnd(e);
        }).catch((c) => {
          s && s(c);
        });
        return;
      }
      return setTimeout(function() {
        t && t(a), r.manager.itemEnd(e);
      }, 0), a;
    }
    const o = {};
    o.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", o.headers = this.requestHeader;
    const l = fetch(e, o).then(function(c) {
      return c.blob();
    }).then(function(c) {
      return createImageBitmap(c, Object.assign(r.options, { colorSpaceConversion: "none" }));
    }).then(function(c) {
      return $n.add(e, c), t && t(c), r.manager.itemEnd(e), c;
    }).catch(function(c) {
      s && s(c), $n.remove(e), r.manager.itemError(e), r.manager.itemEnd(e);
    });
    $n.add(e, l), r.manager.itemStart(e);
  }
}
const Ko = "\\[\\]\\.:\\/", Pv = new RegExp("[" + Ko + "]", "g"), Zo = "[^" + Ko + "]", Lv = "[^" + Ko.replace("\\.", "") + "]", Dv = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", Zo), Iv = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", Lv), Uv = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Zo), Nv = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Zo), Fv = new RegExp(
  "^" + Dv + Iv + Uv + Nv + "$"
), Ov = ["material", "materials", "bones", "map"];
class Bv {
  constructor(e, t, n) {
    const s = n || Je.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, s);
  }
  getValue(e, t) {
    this.bind();
    const n = this._targetGroup.nCachedObjects_, s = this._bindings[n];
    s !== void 0 && s.getValue(e, t);
  }
  setValue(e, t) {
    const n = this._bindings;
    for (let s = this._targetGroup.nCachedObjects_, r = n.length; s !== r; ++s)
      n[s].setValue(e, t);
  }
  bind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)
      e[t].bind();
  }
  unbind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)
      e[t].unbind();
  }
}
class Je {
  constructor(e, t, n) {
    this.path = t, this.parsedPath = n || Je.parseTrackName(t), this.node = Je.findNode(e, this.parsedPath.nodeName), this.rootNode = e, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(e, t, n) {
    return e && e.isAnimationObjectGroup ? new Je.Composite(e, t, n) : new Je(e, t, n);
  }
  /**
   * Replaces spaces with underscores and removes unsupported characters from
   * node names, to ensure compatibility with parseTrackName().
   *
   * @param {string} name Node name to be sanitized.
   * @return {string}
   */
  static sanitizeNodeName(e) {
    return e.replace(/\s/g, "_").replace(Pv, "");
  }
  static parseTrackName(e) {
    const t = Fv.exec(e);
    if (t === null)
      throw new Error("PropertyBinding: Cannot parse trackName: " + e);
    const n = {
      // directoryName: matches[ 1 ], // (tschw) currently unused
      nodeName: t[2],
      objectName: t[3],
      objectIndex: t[4],
      propertyName: t[5],
      // required
      propertyIndex: t[6]
    }, s = n.nodeName && n.nodeName.lastIndexOf(".");
    if (s !== void 0 && s !== -1) {
      const r = n.nodeName.substring(s + 1);
      Ov.indexOf(r) !== -1 && (n.nodeName = n.nodeName.substring(0, s), n.objectName = r);
    }
    if (n.propertyName === null || n.propertyName.length === 0)
      throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e);
    return n;
  }
  static findNode(e, t) {
    if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid)
      return e;
    if (e.skeleton) {
      const n = e.skeleton.getBoneByName(t);
      if (n !== void 0)
        return n;
    }
    if (e.children) {
      const n = function(r) {
        for (let a = 0; a < r.length; a++) {
          const o = r[a];
          if (o.name === t || o.uuid === t)
            return o;
          const l = n(o.children);
          if (l) return l;
        }
        return null;
      }, s = n(e.children);
      if (s)
        return s;
    }
    return null;
  }
  // these are used to "bind" a nonexistent property
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  // Getters
  _getValue_direct(e, t) {
    e[t] = this.targetObject[this.propertyName];
  }
  _getValue_array(e, t) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      e[t++] = n[s];
  }
  _getValue_arrayElement(e, t) {
    e[t] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(e, t) {
    this.resolvedProperty.toArray(e, t);
  }
  // Direct
  _setValue_direct(e, t) {
    this.targetObject[this.propertyName] = e[t];
  }
  _setValue_direct_setNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  // EntireArray
  _setValue_array(e, t) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      n[s] = e[t++];
  }
  _setValue_array_setNeedsUpdate(e, t) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      n[s] = e[t++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      n[s] = e[t++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  // ArrayElement
  _setValue_arrayElement(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t];
  }
  _setValue_arrayElement_setNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  // HasToFromArray
  _setValue_fromArray(e, t) {
    this.resolvedProperty.fromArray(e, t);
  }
  _setValue_fromArray_setNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(e, t) {
    this.bind(), this.getValue(e, t);
  }
  _setValue_unbound(e, t) {
    this.bind(), this.setValue(e, t);
  }
  // create getter / setter pair for a property in the scene graph
  bind() {
    let e = this.node;
    const t = this.parsedPath, n = t.objectName, s = t.propertyName;
    let r = t.propertyIndex;
    if (e || (e = Je.findNode(this.rootNode, t.nodeName), this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) {
      console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (n) {
      let c = t.objectIndex;
      switch (n) {
        case "materials":
          if (!e.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!e.material.materials) {
            console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          e = e.material.materials;
          break;
        case "bones":
          if (!e.skeleton) {
            console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          e = e.skeleton.bones;
          for (let h = 0; h < e.length; h++)
            if (e[h].name === c) {
              c = h;
              break;
            }
          break;
        case "map":
          if ("map" in e) {
            e = e.map;
            break;
          }
          if (!e.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!e.material.map) {
            console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          e = e.material.map;
          break;
        default:
          if (e[n] === void 0) {
            console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          e = e[n];
      }
      if (c !== void 0) {
        if (e[c] === void 0) {
          console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
          return;
        }
        e = e[c];
      }
    }
    const a = e[s];
    if (a === void 0) {
      const c = t.nodeName;
      console.error("THREE.PropertyBinding: Trying to update property for track: " + c + "." + s + " but it wasn't found.", e);
      return;
    }
    let o = this.Versioning.None;
    this.targetObject = e, e.needsUpdate !== void 0 ? o = this.Versioning.NeedsUpdate : e.matrixWorldNeedsUpdate !== void 0 && (o = this.Versioning.MatrixWorldNeedsUpdate);
    let l = this.BindingType.Direct;
    if (r !== void 0) {
      if (s === "morphTargetInfluences") {
        if (!e.geometry) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!e.geometry.morphAttributes) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        e.morphTargetDictionary[r] !== void 0 && (r = e.morphTargetDictionary[r]);
      }
      l = this.BindingType.ArrayElement, this.resolvedProperty = a, this.propertyIndex = r;
    } else a.fromArray !== void 0 && a.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = a) : Array.isArray(a) ? (l = this.BindingType.EntireArray, this.resolvedProperty = a) : this.propertyName = s;
    this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][o];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
}
Je.Composite = Bv;
Je.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
Je.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
Je.prototype.GetterByBindingType = [
  Je.prototype._getValue_direct,
  Je.prototype._getValue_array,
  Je.prototype._getValue_arrayElement,
  Je.prototype._getValue_toArray
];
Je.prototype.SetterByBindingTypeAndVersioning = [
  [
    // Direct
    Je.prototype._setValue_direct,
    Je.prototype._setValue_direct_setNeedsUpdate,
    Je.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    // EntireArray
    Je.prototype._setValue_array,
    Je.prototype._setValue_array_setNeedsUpdate,
    Je.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    // ArrayElement
    Je.prototype._setValue_arrayElement,
    Je.prototype._setValue_arrayElement_setNeedsUpdate,
    Je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    // HasToFromArray
    Je.prototype._setValue_fromArray,
    Je.prototype._setValue_fromArray_setNeedsUpdate,
    Je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
const Gc = /* @__PURE__ */ new Ce();
class zv {
  constructor(e, t, n = 0, s = 1 / 0) {
    this.ray = new ns(e, t), this.near = n, this.far = s, this.camera = null, this.layers = new Ho(), this.params = {
      Mesh: {},
      Line: { threshold: 1 },
      LOD: {},
      Points: { threshold: 1 },
      Sprite: {}
    };
  }
  set(e, t) {
    this.ray.set(e, t);
  }
  setFromCamera(e, t) {
    t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, 0.5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t) : console.error("THREE.Raycaster: Unsupported camera type: " + t.type);
  }
  setFromXRController(e) {
    return Gc.identity().extractRotation(e.matrixWorld), this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Gc), this;
  }
  intersectObject(e, t = !0, n = []) {
    return yo(e, this, n, t), n.sort(Wc), n;
  }
  intersectObjects(e, t = !0, n = []) {
    for (let s = 0, r = e.length; s < r; s++)
      yo(e[s], this, n, t);
    return n.sort(Wc), n;
  }
}
function Wc(i, e) {
  return i.distance - e.distance;
}
function yo(i, e, t, n) {
  let s = !0;
  if (i.layers.test(e.layers) && i.raycast(e, t) === !1 && (s = !1), s === !0 && n === !0) {
    const r = i.children;
    for (let a = 0, o = r.length; a < o; a++)
      yo(r[a], e, t, !0);
  }
}
class $c {
  constructor(e = 1, t = 0, n = 0) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  set(e, t, n) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  // restrict phi to be between EPS and PI-EPS
  makeSafe() {
    return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(Mt(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class kv extends pi {
  constructor(e, t = null) {
    super(), this.object = e, this.domElement = t, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }, this.touches = { ONE: null, TWO: null };
  }
  connect() {
  }
  disconnect() {
  }
  dispose() {
  }
  update() {
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: Lo
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Lo);
const Hv = 12, Xc = ["#38bdf8", "#34d399", "#fbbf24", "#a78bfa", "#fb7185", "#2dd4bf"];
function Zh(i) {
  var h;
  if (i.byteLength < 20)
    throw new Error("File is too small to be a valid .glb binary");
  const e = new DataView(i);
  if (e.getUint32(0, !0) !== 1179937895)
    throw new Error("Invalid GLB file header");
  const n = e.getUint32(12, !0);
  if (e.getUint32(16, !0) !== 1313821514 || 20 + n > i.byteLength)
    throw new Error("Missing or truncated glTF JSON chunk");
  const r = new Uint8Array(i, 20, n), a = new TextDecoder("utf-8").decode(r), o = JSON.parse(a), l = [...new Set((o.nodes ?? []).map((u) => u.name).filter((u) => !!u))], c = [...new Set((o.meshes ?? []).map((u) => u.name).filter((u) => !!u))];
  return {
    generator: (h = o.asset) == null ? void 0 : h.generator,
    nodeNames: l,
    meshNames: c
  };
}
function Vv(i) {
  return i.replace(/[_-]+/g, " ").trim().replace(/\b\w/g, (e) => e.toUpperCase());
}
function Jh(i, e, t = []) {
  const n = new Set(t.flatMap((o) => o.mesh_names ?? [])), s = new Set(t.map((o) => o.id)), r = e ? Object.values(e) : [], a = [];
  for (const o of i) {
    const l = /^(?:area|zone)[_-](.+)$/i.exec(o);
    if (!l || n.has(o)) continue;
    const c = l[1], h = c.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    if (!h || s.has(h)) continue;
    const u = r.find(
      (p) => p.area_id.toLowerCase() === h || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "_") === h
    );
    s.add(h), n.add(o);
    const d = t.length + a.length;
    a.push({
      id: h,
      name: (u == null ? void 0 : u.name) ?? Vv(c),
      color: Xc[d % Xc.length],
      mesh_names: [o],
      ha_area_id: (u == null ? void 0 : u.area_id) ?? h
    });
  }
  return a;
}
function Gv(i, e = "auto") {
  return e === "z" ? !0 : e === "y" ? !1 : i.z > 0 && i.z < i.x * 0.65 && i.z < i.y * 0.65 && i.y >= i.z;
}
function Wv(i, e = "auto") {
  i.updateMatrixWorld(!0);
  const n = new Tt().setFromObject(i).getSize(new A()), s = Gv(n, e);
  s && (i.rotation.x = -Math.PI / 2, i.updateMatrixWorld(!0));
  const a = new Tt().setFromObject(i).getSize(new A()), o = Math.max(a.x, a.z, 1e-4), l = Hv / o;
  i.scale.multiplyScalar(l), i.updateMatrixWorld(!0);
  const c = new Tt().setFromObject(i), h = c.getCenter(new A());
  i.position.x -= h.x, i.position.z -= h.z, i.position.y -= c.min.y, i.updateMatrixWorld(!0);
  const u = new Tt().setFromObject(i);
  return {
    appliedZUpRotation: s,
    scaleFactor: l,
    bounds: u,
    size: u.getSize(new A()),
    center: u.getCenter(new A())
  };
}
function $v(i, e, t = [0, 1]) {
  const [n, s, r, a] = e, [o, l] = t, c = i.getSize(new A()), h = i.min.x + Math.min(n, r) * c.x, u = i.min.x + Math.max(n, r) * c.x, d = i.min.z + Math.min(s, a) * c.z, p = i.min.z + Math.max(s, a) * c.z, g = i.min.y + Math.min(o, l) * c.y, _ = i.min.y + Math.max(o, l) * c.y;
  return new Tt(
    new A(h, g, d),
    new A(u, _, p)
  );
}
function Xv(i, e) {
  const t = i.getSize(new A()), n = t.x > 0 ? (e.x - i.min.x) / t.x : 0.5, s = t.z > 0 ? (e.z - i.min.z) / t.z : 0.5;
  return {
    normX: Number(Math.min(1, Math.max(0, n)).toFixed(3)),
    normZ: Number(Math.min(1, Math.max(0, s)).toFixed(3))
  };
}
function Yc(i, e, t, n = [0.65, 0.95, 0.85], s = 1.35) {
  const r = i.getCenter(new A()), a = i.getSize(new A()), o = Math.max(a.length() * 0.5, 0.6), l = ko.degToRad(e), c = o / Math.sin(l / 2), h = c / Math.max(t, 0.5), u = Math.max(c, h) * s, d = new A(...n).normalize(), p = r.clone().addScaledVector(d, u);
  return { target: r, position: p };
}
const Yv = "home-3d-card-db", qv = 1, hn = "models", Jo = "home-3d-default-view:", Br = /* @__PURE__ */ new Map(), Qo = /* @__PURE__ */ new Map();
function qc(i) {
  return Array.isArray(i) && i.length === 3 && i.every((e) => typeof e == "number" && Number.isFinite(e));
}
function jv(i) {
  return {
    position: [
      Number(i.position[0].toFixed(3)),
      Number(i.position[1].toFixed(3)),
      Number(i.position[2].toFixed(3))
    ],
    target: [
      Number(i.target[0].toFixed(3)),
      Number(i.target[1].toFixed(3)),
      Number(i.target[2].toFixed(3))
    ]
  };
}
function el() {
  try {
    if (typeof globalThis.localStorage < "u" && typeof globalThis.localStorage.getItem == "function")
      return globalThis.localStorage;
  } catch {
  }
  return null;
}
function Kv(i, e) {
  const t = i.trim(), n = jv(e);
  if (!t) return n;
  const s = `${Jo}${t}`, r = el();
  return r ? r.setItem(s, JSON.stringify(n)) : Qo.set(s, n), typeof window < "u" && window.dispatchEvent(
    new CustomEvent("home-3d-default-view-changed", {
      detail: { modelUrl: t, pose: n }
    })
  ), n;
}
function Qh(i) {
  const e = i == null ? void 0 : i.trim();
  if (!e) return null;
  const t = `${Jo}${e}`, n = el();
  if (!n)
    return Qo.get(t) ?? null;
  try {
    const s = n.getItem(t);
    if (!s) return null;
    const r = JSON.parse(s);
    return qc(r.position) && qc(r.target) ? { position: r.position, target: r.target } : null;
  } catch {
    return null;
  }
}
function eu(i) {
  const e = i == null ? void 0 : i.trim();
  if (!e) return;
  const t = `${Jo}${e}`, n = el();
  n ? n.removeItem(t) : Qo.delete(t), typeof window < "u" && window.dispatchEvent(
    new CustomEvent("home-3d-default-view-changed", {
      detail: { modelUrl: e, pose: null }
    })
  );
}
function zr(i) {
  return !!(i && i.startsWith("idb://"));
}
function tu(i) {
  return i.slice(6);
}
function kr() {
  return typeof indexedDB > "u" ? Promise.resolve(null) : new Promise((i, e) => {
    const t = indexedDB.open(Yv, qv);
    t.onupgradeneeded = () => {
      const n = t.result;
      n.objectStoreNames.contains(hn) || n.createObjectStore(hn, { keyPath: "name" });
    }, t.onsuccess = () => i(t.result), t.onerror = () => e(t.error ?? new Error("Failed to open IndexedDB"));
  });
}
async function nu(i, e) {
  const t = i.trim().replace(/[\\/]+/g, "_") || "model.glb", n = Zh(e), s = {
    name: t,
    data: e,
    sizeBytes: e.byteLength,
    updatedAt: Date.now()
  }, r = await kr();
  return r ? (await new Promise((a, o) => {
    const l = r.transaction(hn, "readwrite");
    l.objectStore(hn).put(s), l.oncomplete = () => {
      r.close(), a();
    }, l.onerror = () => {
      r.close(), o(l.error ?? new Error("Failed to store GLB in IndexedDB"));
    };
  }), { url: `idb://${t}`, meta: n }) : (Br.set(t, s), { url: `idb://${t}`, meta: n });
}
async function So(i) {
  var n;
  if (!zr(i)) return null;
  const e = tu(i), t = await kr();
  return t ? new Promise((s, r) => {
    const o = t.transaction(hn, "readonly").objectStore(hn).get(e);
    o.onsuccess = () => {
      t.close();
      const l = o.result;
      s((l == null ? void 0 : l.data) ?? null);
    }, o.onerror = () => {
      t.close(), r(o.error ?? new Error("Failed to read GLB from IndexedDB"));
    };
  }) : ((n = Br.get(e)) == null ? void 0 : n.data) ?? null;
}
async function Zv() {
  const i = await kr();
  return i ? new Promise((e, t) => {
    const s = i.transaction(hn, "readonly").objectStore(hn).getAll();
    s.onsuccess = () => {
      i.close();
      const r = s.result ?? [];
      e(
        r.map((a) => ({
          name: a.name,
          url: `idb://${a.name}`,
          sizeBytes: a.sizeBytes,
          updatedAt: a.updatedAt
        })).sort((a, o) => o.updatedAt - a.updatedAt)
      );
    }, s.onerror = () => {
      i.close(), t(s.error ?? new Error("Failed to list stored GLB models"));
    };
  }) : [...Br.values()].map((e) => ({
    name: e.name,
    url: `idb://${e.name}`,
    sizeBytes: e.sizeBytes,
    updatedAt: e.updatedAt
  }));
}
async function Jv(i) {
  const e = await kr();
  if (!e) {
    Br.delete(i);
    return;
  }
  await new Promise((t, n) => {
    const s = e.transaction(hn, "readwrite");
    s.objectStore(hn).delete(i), s.oncomplete = () => {
      e.close(), t();
    }, s.onerror = () => {
      e.close(), n(s.error ?? new Error("Failed to delete GLB from IndexedDB"));
    };
  });
}
const jc = { type: "change" }, tl = { type: "start" }, iu = { type: "end" }, gr = new ns(), Kc = new Hn(), Qv = Math.cos(70 * ko.DEG2RAD), ft = new A(), Ut = 2 * Math.PI, et = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, wa = 1e-6;
class ex extends kv {
  constructor(e, t = null) {
    super(e, t), this.state = et.NONE, this.enabled = !0, this.target = new A(), this.cursor = new A(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Ui.ROTATE, MIDDLE: Ui.DOLLY, RIGHT: Ui.PAN }, this.touches = { ONE: Di.ROTATE, TWO: Di.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new A(), this._lastQuaternion = new ln(), this._lastTargetPosition = new A(), this._quat = new ln().setFromUnitVectors(e.up, new A(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new $c(), this._sphericalDelta = new $c(), this._scale = 1, this._panOffset = new A(), this._rotateStart = new Te(), this._rotateEnd = new Te(), this._rotateDelta = new Te(), this._panStart = new Te(), this._panEnd = new Te(), this._panDelta = new Te(), this._dollyStart = new Te(), this._dollyEnd = new Te(), this._dollyDelta = new Te(), this._dollyDirection = new A(), this._mouse = new Te(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = nx.bind(this), this._onPointerDown = tx.bind(this), this._onPointerUp = ix.bind(this), this._onContextMenu = hx.bind(this), this._onMouseWheel = ax.bind(this), this._onKeyDown = ox.bind(this), this._onTouchStart = lx.bind(this), this._onTouchMove = cx.bind(this), this._onMouseDown = sx.bind(this), this._onMouseMove = rx.bind(this), this._interceptControlDown = ux.bind(this), this._interceptControlUp = dx.bind(this), this.domElement !== null && this.connect(), this.update();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(jc), this.update(), this.state = et.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    ft.copy(t).sub(this.target), ft.applyQuaternion(this._quat), this._spherical.setFromVector3(ft), this.autoRotate && this.state === et.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(n) && isFinite(s) && (n < -Math.PI ? n += Ut : n > Math.PI && (n -= Ut), s < -Math.PI ? s += Ut : s > Math.PI && (s -= Ut), n <= s ? this._spherical.theta = Math.max(n, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + s) / 2 ? Math.max(n, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const a = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = a != this._spherical.radius;
    }
    if (ft.setFromSpherical(this._spherical), ft.applyQuaternion(this._quatInverse), t.copy(this.target).add(ft), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let a = null;
      if (this.object.isPerspectiveCamera) {
        const o = ft.length();
        a = this._clampDistance(o * this._scale);
        const l = o - a;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), r = !!l;
      } else if (this.object.isOrthographicCamera) {
        const o = new A(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = l !== this.object.zoom;
        const c = new A(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(o), this.object.updateMatrixWorld(), a = ft.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      a !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position) : (gr.origin.copy(this.object.position), gr.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(gr.direction)) < Qv ? this.object.lookAt(this.target) : (Kc.setFromNormalAndCoplanarPoint(this.object.up, this.target), gr.intersectPlane(Kc, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const a = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), a !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > wa || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > wa || this._lastTargetPosition.distanceToSquared(this.target) > wa ? (this.dispatchEvent(jc), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? Ut / 60 * this.autoRotateSpeed * e : Ut / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const t = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * t);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, t) {
    ft.setFromMatrixColumn(t, 0), ft.multiplyScalar(-e), this._panOffset.add(ft);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? ft.setFromMatrixColumn(t, 1) : (ft.setFromMatrixColumn(t, 0), ft.crossVectors(this.object.up, ft)), ft.multiplyScalar(e), this._panOffset.add(ft);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      ft.copy(s).sub(this.target);
      let r = ft.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * r / n.clientHeight, this.object.matrix), this._panUp(2 * t * r / n.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, t) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const n = this.domElement.getBoundingClientRect(), s = e - n.left, r = t - n.top, a = n.width, o = n.height;
    this._mouse.x = s / a * 2 - 1, this._mouse.y = -(r / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(Ut * this._rotateDelta.x / t.clientHeight), this._rotateUp(Ut * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let t = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(Ut * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(-Ut * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(Ut * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(-Ut * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1)
      this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(n, s);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1)
      this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._panStart.set(n, s);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, s = e.pageY - t.y, r = Math.sqrt(n * n + s * s);
    this._dollyStart.set(0, r);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const n = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + n.x), r = 0.5 * (e.pageY + n.y);
      this._rotateEnd.set(s, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(Ut * this._rotateDelta.x / t.clientHeight), this._rotateUp(Ut * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1)
      this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._panEnd.set(n, s);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, s = e.pageY - t.y, r = Math.sqrt(n * n + s * s);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const a = (e.pageX + t.x) * 0.5, o = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(a, o);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  // pointers
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) {
        this._pointers.splice(t, 1);
        return;
      }
  }
  _isTrackingPointer(e) {
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) return !0;
    return !1;
  }
  _trackPointer(e) {
    let t = this._pointerPositions[e.pointerId];
    t === void 0 && (t = new Te(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  //
  _customWheelEvent(e) {
    const t = e.deltaMode, n = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        n.deltaY *= 16;
        break;
      case 2:
        n.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
  }
}
function tx(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function nx(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function ix(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(iu), this.state = et.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function sx(i) {
  let e;
  switch (i.button) {
    case 0:
      e = this.mouseButtons.LEFT;
      break;
    case 1:
      e = this.mouseButtons.MIDDLE;
      break;
    case 2:
      e = this.mouseButtons.RIGHT;
      break;
    default:
      e = -1;
  }
  switch (e) {
    case Ui.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(i), this.state = et.DOLLY;
      break;
    case Ui.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = et.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = et.ROTATE;
      }
      break;
    case Ui.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = et.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = et.PAN;
      }
      break;
    default:
      this.state = et.NONE;
  }
  this.state !== et.NONE && this.dispatchEvent(tl);
}
function rx(i) {
  switch (this.state) {
    case et.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(i);
      break;
    case et.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(i);
      break;
    case et.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function ax(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== et.NONE || (i.preventDefault(), this.dispatchEvent(tl), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(iu));
}
function ox(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function lx(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case Di.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(i), this.state = et.TOUCH_ROTATE;
          break;
        case Di.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(i), this.state = et.TOUCH_PAN;
          break;
        default:
          this.state = et.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case Di.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(i), this.state = et.TOUCH_DOLLY_PAN;
          break;
        case Di.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(i), this.state = et.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = et.NONE;
      }
      break;
    default:
      this.state = et.NONE;
  }
  this.state !== et.NONE && this.dispatchEvent(tl);
}
function cx(i) {
  switch (this._trackPointer(i), this.state) {
    case et.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case et.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(i), this.update();
      break;
    case et.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case et.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = et.NONE;
  }
}
function hx(i) {
  this.enabled !== !1 && i.preventDefault();
}
function ux(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function dx(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Zc(i, e) {
  if (e === ud)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), i;
  if (e === mo || e === Ah) {
    let t = i.getIndex();
    if (t === null) {
      const a = [], o = i.getAttribute("position");
      if (o !== void 0) {
        for (let l = 0; l < o.count; l++)
          a.push(l);
        i.setIndex(a), t = i.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), i;
    }
    const n = t.count - 2, s = [];
    if (e === mo)
      for (let a = 1; a <= n; a++)
        s.push(t.getX(0)), s.push(t.getX(a)), s.push(t.getX(a + 1));
    else
      for (let a = 0; a < n; a++)
        a % 2 === 0 ? (s.push(t.getX(a)), s.push(t.getX(a + 1)), s.push(t.getX(a + 2))) : (s.push(t.getX(a + 2)), s.push(t.getX(a + 1)), s.push(t.getX(a)));
    s.length / 3 !== n && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = i.clone();
    return r.setIndex(s), r.clearGroups(), r;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), i;
}
class fx extends os {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new vx(t);
    }), this.register(function(t) {
      return new xx(t);
    }), this.register(function(t) {
      return new Rx(t);
    }), this.register(function(t) {
      return new Cx(t);
    }), this.register(function(t) {
      return new Px(t);
    }), this.register(function(t) {
      return new yx(t);
    }), this.register(function(t) {
      return new Sx(t);
    }), this.register(function(t) {
      return new bx(t);
    }), this.register(function(t) {
      return new Ex(t);
    }), this.register(function(t) {
      return new _x(t);
    }), this.register(function(t) {
      return new Tx(t);
    }), this.register(function(t) {
      return new Mx(t);
    }), this.register(function(t) {
      return new wx(t);
    }), this.register(function(t) {
      return new Ax(t);
    }), this.register(function(t) {
      return new mx(t);
    }), this.register(function(t) {
      return new Lx(t);
    }), this.register(function(t) {
      return new Dx(t);
    });
  }
  load(e, t, n, s) {
    const r = this;
    let a;
    if (this.resourcePath !== "")
      a = this.resourcePath;
    else if (this.path !== "") {
      const c = As.extractUrlBase(e);
      a = As.resolveURL(c, this.path);
    } else
      a = As.extractUrlBase(e);
    this.manager.itemStart(e);
    const o = function(c) {
      s ? s(c) : console.error(c), r.manager.itemError(e), r.manager.itemEnd(e);
    }, l = new Kh(this.manager);
    l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(this.withCredentials), l.load(e, function(c) {
      try {
        r.parse(c, a, function(h) {
          t(h), r.manager.itemEnd(e);
        }, o);
      } catch (h) {
        o(h);
      }
    }, n, o);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, n, s) {
    let r;
    const a = {}, o = {}, l = new TextDecoder();
    if (typeof e == "string")
      r = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (l.decode(new Uint8Array(e, 0, 4)) === su) {
        try {
          a[ze.KHR_BINARY_GLTF] = new Ix(e);
        } catch (u) {
          s && s(u);
          return;
        }
        r = JSON.parse(a[ze.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(l.decode(e));
    else
      r = e;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new Xx(r, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let h = 0; h < this.pluginCallbacks.length; h++) {
      const u = this.pluginCallbacks[h](c);
      u.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[u.name] = u, a[u.name] = !0;
    }
    if (r.extensionsUsed)
      for (let h = 0; h < r.extensionsUsed.length; ++h) {
        const u = r.extensionsUsed[h], d = r.extensionsRequired || [];
        switch (u) {
          case ze.KHR_MATERIALS_UNLIT:
            a[u] = new gx();
            break;
          case ze.KHR_DRACO_MESH_COMPRESSION:
            a[u] = new Ux(r, this.dracoLoader);
            break;
          case ze.KHR_TEXTURE_TRANSFORM:
            a[u] = new Nx();
            break;
          case ze.KHR_MESH_QUANTIZATION:
            a[u] = new Fx();
            break;
          default:
            d.indexOf(u) >= 0 && o[u] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + u + '".');
        }
      }
    c.setExtensions(a), c.setPlugins(o), c.parse(n, s);
  }
  parseAsync(e, t) {
    const n = this;
    return new Promise(function(s, r) {
      n.parse(e, t, s, r);
    });
  }
}
function px() {
  let i = {};
  return {
    get: function(e) {
      return i[e];
    },
    add: function(e, t) {
      i[e] = t;
    },
    remove: function(e) {
      delete i[e];
    },
    removeAll: function() {
      i = {};
    }
  };
}
const ze = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class mx {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let n = 0, s = t.length; n < s; n++) {
      const r = t[n];
      r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, n = "light:" + e;
    let s = t.cache.get(n);
    if (s) return s;
    const r = t.json, l = ((r.extensions && r.extensions[this.name] || {}).lights || [])[e];
    let c;
    const h = new Ee(16777215);
    l.color !== void 0 && h.setRGB(l.color[0], l.color[1], l.color[2], Lt);
    const u = l.range !== void 0 ? l.range : 0;
    switch (l.type) {
      case "directional":
        c = new Mo(h), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new wv(h), c.distance = u;
        break;
      case "spot":
        c = new Tv(h), c.distance = u, l.spot = l.spot || {}, l.spot.innerConeAngle = l.spot.innerConeAngle !== void 0 ? l.spot.innerConeAngle : 0, l.spot.outerConeAngle = l.spot.outerConeAngle !== void 0 ? l.spot.outerConeAngle : Math.PI / 4, c.angle = l.spot.outerConeAngle, c.penumbra = 1 - l.spot.innerConeAngle / l.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + l.type);
    }
    return c.position.set(0, 0, 0), c.decay = 2, bn(c, l), l.intensity !== void 0 && (c.intensity = l.intensity), c.name = t.createUniqueName(l.name || "light_" + e), s = Promise.resolve(c), t.cache.add(n, s), s;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, n = this.parser, r = n.json.nodes[e], o = (r.extensions && r.extensions[this.name] || {}).light;
    return o === void 0 ? null : this._loadLight(o).then(function(l) {
      return n._getNodeRef(t.cache, o, l);
    });
  }
}
class gx {
  constructor() {
    this.name = ze.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return An;
  }
  extendParams(e, t, n) {
    const s = [];
    e.color = new Ee(1, 1, 1), e.opacity = 1;
    const r = t.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const a = r.baseColorFactor;
        e.color.setRGB(a[0], a[1], a[2], Lt), e.opacity = a[3];
      }
      r.baseColorTexture !== void 0 && s.push(n.assignTexture(e, "map", r.baseColorTexture, xt));
    }
    return Promise.all(s);
  }
}
class _x {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name].emissiveStrength;
    return r !== void 0 && (t.emissiveIntensity = r), Promise.resolve();
  }
}
class vx {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : dn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], a = s.extensions[this.name];
    if (a.clearcoatFactor !== void 0 && (t.clearcoat = a.clearcoatFactor), a.clearcoatTexture !== void 0 && r.push(n.assignTexture(t, "clearcoatMap", a.clearcoatTexture)), a.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = a.clearcoatRoughnessFactor), a.clearcoatRoughnessTexture !== void 0 && r.push(n.assignTexture(t, "clearcoatRoughnessMap", a.clearcoatRoughnessTexture)), a.clearcoatNormalTexture !== void 0 && (r.push(n.assignTexture(t, "clearcoatNormalMap", a.clearcoatNormalTexture)), a.clearcoatNormalTexture.scale !== void 0)) {
      const o = a.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new Te(o, o);
    }
    return Promise.all(r);
  }
}
class xx {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : dn;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name];
    return t.dispersion = r.dispersion !== void 0 ? r.dispersion : 0, Promise.resolve();
  }
}
class Mx {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : dn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], a = s.extensions[this.name];
    return a.iridescenceFactor !== void 0 && (t.iridescence = a.iridescenceFactor), a.iridescenceTexture !== void 0 && r.push(n.assignTexture(t, "iridescenceMap", a.iridescenceTexture)), a.iridescenceIor !== void 0 && (t.iridescenceIOR = a.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), a.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = a.iridescenceThicknessMinimum), a.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = a.iridescenceThicknessMaximum), a.iridescenceThicknessTexture !== void 0 && r.push(n.assignTexture(t, "iridescenceThicknessMap", a.iridescenceThicknessTexture)), Promise.all(r);
  }
}
class yx {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : dn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [];
    t.sheenColor = new Ee(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const a = s.extensions[this.name];
    if (a.sheenColorFactor !== void 0) {
      const o = a.sheenColorFactor;
      t.sheenColor.setRGB(o[0], o[1], o[2], Lt);
    }
    return a.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = a.sheenRoughnessFactor), a.sheenColorTexture !== void 0 && r.push(n.assignTexture(t, "sheenColorMap", a.sheenColorTexture, xt)), a.sheenRoughnessTexture !== void 0 && r.push(n.assignTexture(t, "sheenRoughnessMap", a.sheenRoughnessTexture)), Promise.all(r);
  }
}
class Sx {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : dn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], a = s.extensions[this.name];
    return a.transmissionFactor !== void 0 && (t.transmission = a.transmissionFactor), a.transmissionTexture !== void 0 && r.push(n.assignTexture(t, "transmissionMap", a.transmissionTexture)), Promise.all(r);
  }
}
class bx {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : dn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], a = s.extensions[this.name];
    t.thickness = a.thicknessFactor !== void 0 ? a.thicknessFactor : 0, a.thicknessTexture !== void 0 && r.push(n.assignTexture(t, "thicknessMap", a.thicknessTexture)), t.attenuationDistance = a.attenuationDistance || 1 / 0;
    const o = a.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new Ee().setRGB(o[0], o[1], o[2], Lt), Promise.all(r);
  }
}
class Ex {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : dn;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name];
    return t.ior = r.ior !== void 0 ? r.ior : 1.5, Promise.resolve();
  }
}
class Tx {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : dn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], a = s.extensions[this.name];
    t.specularIntensity = a.specularFactor !== void 0 ? a.specularFactor : 1, a.specularTexture !== void 0 && r.push(n.assignTexture(t, "specularIntensityMap", a.specularTexture));
    const o = a.specularColorFactor || [1, 1, 1];
    return t.specularColor = new Ee().setRGB(o[0], o[1], o[2], Lt), a.specularColorTexture !== void 0 && r.push(n.assignTexture(t, "specularColorMap", a.specularColorTexture, xt)), Promise.all(r);
  }
}
class Ax {
  constructor(e) {
    this.parser = e, this.name = ze.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : dn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], a = s.extensions[this.name];
    return t.bumpScale = a.bumpFactor !== void 0 ? a.bumpFactor : 1, a.bumpTexture !== void 0 && r.push(n.assignTexture(t, "bumpMap", a.bumpTexture)), Promise.all(r);
  }
}
class wx {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : dn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], a = s.extensions[this.name];
    return a.anisotropyStrength !== void 0 && (t.anisotropy = a.anisotropyStrength), a.anisotropyRotation !== void 0 && (t.anisotropyRotation = a.anisotropyRotation), a.anisotropyTexture !== void 0 && r.push(n.assignTexture(t, "anisotropyMap", a.anisotropyTexture)), Promise.all(r);
  }
}
class Rx {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, n = t.json, s = n.textures[e];
    if (!s.extensions || !s.extensions[this.name])
      return null;
    const r = s.extensions[this.name], a = t.options.ktx2Loader;
    if (!a) {
      if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, r.source, a);
  }
}
class Cx {
  constructor(e) {
    this.parser = e, this.name = ze.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, s = n.json, r = s.textures[e];
    if (!r.extensions || !r.extensions[t])
      return null;
    const a = r.extensions[t], o = s.images[a.source];
    let l = n.textureLoader;
    if (o.uri) {
      const c = n.options.manager.getHandler(o.uri);
      c !== null && (l = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return n.loadTextureImage(e, a.source, l);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class Px {
  constructor(e) {
    this.parser = e, this.name = ze.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, s = n.json, r = s.textures[e];
    if (!r.extensions || !r.extensions[t])
      return null;
    const a = r.extensions[t], o = s.images[a.source];
    let l = n.textureLoader;
    if (o.uri) {
      const c = n.options.manager.getHandler(o.uri);
      c !== null && (l = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return n.loadTextureImage(e, a.source, l);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class Lx {
  constructor(e) {
    this.name = ze.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, n = t.bufferViews[e];
    if (n.extensions && n.extensions[this.name]) {
      const s = n.extensions[this.name], r = this.parser.getDependency("buffer", s.buffer), a = this.parser.options.meshoptDecoder;
      if (!a || !a.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return r.then(function(o) {
        const l = s.byteOffset || 0, c = s.byteLength || 0, h = s.count, u = s.byteStride, d = new Uint8Array(o, l, c);
        return a.decodeGltfBufferAsync ? a.decodeGltfBufferAsync(h, u, d, s.mode, s.filter).then(function(p) {
          return p.buffer;
        }) : a.ready.then(function() {
          const p = new ArrayBuffer(h * u);
          return a.decodeGltfBuffer(new Uint8Array(p), h, u, d, s.mode, s.filter), p;
        });
      });
    } else
      return null;
  }
}
class Dx {
  constructor(e) {
    this.name = ze.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, n = t.nodes[e];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0)
      return null;
    const s = t.meshes[n.mesh];
    for (const c of s.primitives)
      if (c.mode !== Gt.TRIANGLES && c.mode !== Gt.TRIANGLE_STRIP && c.mode !== Gt.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const a = n.extensions[this.name].attributes, o = [], l = {};
    for (const c in a)
      o.push(this.parser.getDependency("accessor", a[c]).then((h) => (l[c] = h, l[c])));
    return o.length < 1 ? null : (o.push(this.parser.createNodeMesh(e)), Promise.all(o).then((c) => {
      const h = c.pop(), u = h.isGroup ? h.children : [h], d = c[0].count, p = [];
      for (const g of u) {
        const _ = new Ce(), m = new A(), f = new ln(), T = new A(1, 1, 1), b = new sv(g.geometry, g.material, d);
        for (let M = 0; M < d; M++)
          l.TRANSLATION && m.fromBufferAttribute(l.TRANSLATION, M), l.ROTATION && f.fromBufferAttribute(l.ROTATION, M), l.SCALE && T.fromBufferAttribute(l.SCALE, M), b.setMatrixAt(M, _.compose(m, f, T));
        for (const M in l)
          if (M === "_COLOR_0") {
            const N = l[M];
            b.instanceColor = new vo(N.array, N.itemSize, N.normalized);
          } else M !== "TRANSLATION" && M !== "ROTATION" && M !== "SCALE" && g.geometry.setAttribute(M, l[M]);
        ot.prototype.copy.call(b, g), this.parser.assignFinalMaterial(b), p.push(b);
      }
      return h.isGroup ? (h.clear(), h.add(...p), h) : p[0];
    }));
  }
}
const su = "glTF", xs = 12, Jc = { JSON: 1313821514, BIN: 5130562 };
class Ix {
  constructor(e) {
    this.name = ze.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, xs), n = new TextDecoder();
    if (this.header = {
      magic: n.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== su)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - xs, r = new DataView(e, xs);
    let a = 0;
    for (; a < s; ) {
      const o = r.getUint32(a, !0);
      a += 4;
      const l = r.getUint32(a, !0);
      if (a += 4, l === Jc.JSON) {
        const c = new Uint8Array(e, xs + a, o);
        this.content = n.decode(c);
      } else if (l === Jc.BIN) {
        const c = xs + a;
        this.body = e.slice(c, c + o);
      }
      a += o;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Ux {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = ze.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const n = this.json, s = this.dracoLoader, r = e.extensions[this.name].bufferView, a = e.extensions[this.name].attributes, o = {}, l = {}, c = {};
    for (const h in a) {
      const u = bo[h] || h.toLowerCase();
      o[u] = a[h];
    }
    for (const h in e.attributes) {
      const u = bo[h] || h.toLowerCase();
      if (a[h] !== void 0) {
        const d = n.accessors[e.attributes[h]], p = zi[d.componentType];
        c[u] = p.name, l[u] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", r).then(function(h) {
      return new Promise(function(u, d) {
        s.decodeDracoFile(h, function(p) {
          for (const g in p.attributes) {
            const _ = p.attributes[g], m = l[g];
            m !== void 0 && (_.normalized = m);
          }
          u(p);
        }, o, c, Lt, d);
      });
    });
  }
}
class Nx {
  constructor() {
    this.name = ze.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Fx {
  constructor() {
    this.name = ze.KHR_MESH_QUANTIZATION;
  }
}
class ru extends Os {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, s = this.valueSize, r = e * s * 3 + s;
    for (let a = 0; a !== s; a++)
      t[a] = n[r + a];
    return t;
  }
  interpolate_(e, t, n, s) {
    const r = this.resultBuffer, a = this.sampleValues, o = this.valueSize, l = o * 2, c = o * 3, h = s - t, u = (n - t) / h, d = u * u, p = d * u, g = e * c, _ = g - c, m = -2 * p + 3 * d, f = p - d, T = 1 - m, b = f - d + u;
    for (let M = 0; M !== o; M++) {
      const N = a[_ + M + o], w = a[_ + M + l] * h, R = a[g + M + o], U = a[g + M] * h;
      r[M] = T * N + b * w + m * R + f * U;
    }
    return r;
  }
}
const Ox = new ln();
class Bx extends ru {
  interpolate_(e, t, n, s) {
    const r = super.interpolate_(e, t, n, s);
    return Ox.fromArray(r).normalize().toArray(r), r;
  }
}
const Gt = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, zi = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Qc = {
  9728: Ct,
  9729: zt,
  9984: gh,
  9985: xr,
  9986: Ms,
  9987: En
}, eh = {
  33071: Wn,
  33648: Rr,
  10497: $i
}, Ra = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, bo = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, kn = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, zx = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Ds,
  STEP: Ls
}, Ca = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function kx(i) {
  return i.DefaultMaterial === void 0 && (i.DefaultMaterial = new Fr({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Cn
  })), i.DefaultMaterial;
}
function si(i, e, t) {
  for (const n in t.extensions)
    i[n] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[n] = t.extensions[n]);
}
function bn(i, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(i.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Hx(i, e, t) {
  let n = !1, s = !1, r = !1;
  for (let c = 0, h = e.length; c < h; c++) {
    const u = e[c];
    if (u.POSITION !== void 0 && (n = !0), u.NORMAL !== void 0 && (s = !0), u.COLOR_0 !== void 0 && (r = !0), n && s && r) break;
  }
  if (!n && !s && !r) return Promise.resolve(i);
  const a = [], o = [], l = [];
  for (let c = 0, h = e.length; c < h; c++) {
    const u = e[c];
    if (n) {
      const d = u.POSITION !== void 0 ? t.getDependency("accessor", u.POSITION) : i.attributes.position;
      a.push(d);
    }
    if (s) {
      const d = u.NORMAL !== void 0 ? t.getDependency("accessor", u.NORMAL) : i.attributes.normal;
      o.push(d);
    }
    if (r) {
      const d = u.COLOR_0 !== void 0 ? t.getDependency("accessor", u.COLOR_0) : i.attributes.color;
      l.push(d);
    }
  }
  return Promise.all([
    Promise.all(a),
    Promise.all(o),
    Promise.all(l)
  ]).then(function(c) {
    const h = c[0], u = c[1], d = c[2];
    return n && (i.morphAttributes.position = h), s && (i.morphAttributes.normal = u), r && (i.morphAttributes.color = d), i.morphTargetsRelative = !0, i;
  });
}
function Vx(i, e) {
  if (i.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, n = e.weights.length; t < n; t++)
      i.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (i.morphTargetInfluences.length === t.length) {
      i.morphTargetDictionary = {};
      for (let n = 0, s = t.length; n < s; n++)
        i.morphTargetDictionary[t[n]] = n;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Gx(i) {
  let e;
  const t = i.extensions && i.extensions[ze.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + Pa(t.attributes) : e = i.indices + ":" + Pa(i.attributes) + ":" + i.mode, i.targets !== void 0)
    for (let n = 0, s = i.targets.length; n < s; n++)
      e += ":" + Pa(i.targets[n]);
  return e;
}
function Pa(i) {
  let e = "";
  const t = Object.keys(i).sort();
  for (let n = 0, s = t.length; n < s; n++)
    e += t[n] + ":" + i[t[n]] + ";";
  return e;
}
function Eo(i) {
  switch (i) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function Wx(i) {
  return i.search(/\.jpe?g($|\?)/i) > 0 || i.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : i.search(/\.webp($|\?)/i) > 0 || i.search(/^data\:image\/webp/) === 0 ? "image/webp" : i.search(/\.ktx2($|\?)/i) > 0 || i.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const $x = new Ce();
class Xx {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new px(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, s = -1, r = !1, a = -1;
    if (typeof navigator < "u") {
      const o = navigator.userAgent;
      n = /^((?!chrome|android).)*safari/i.test(o) === !0;
      const l = o.match(/Version\/(\d+)/);
      s = n && l ? parseInt(l[1], 10) : -1, r = o.indexOf("Firefox") > -1, a = r ? o.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || n && s < 17 || r && a < 98 ? this.textureLoader = new Sv(this.options.manager) : this.textureLoader = new Cv(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Kh(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const n = this, s = this.json, r = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(a) {
      return a._markDefs && a._markDefs();
    }), Promise.all(this._invokeAll(function(a) {
      return a.beforeRoot && a.beforeRoot();
    })).then(function() {
      return Promise.all([
        n.getDependencies("scene"),
        n.getDependencies("animation"),
        n.getDependencies("camera")
      ]);
    }).then(function(a) {
      const o = {
        scene: a[0][s.scene || 0],
        scenes: a[0],
        animations: a[1],
        cameras: a[2],
        asset: s.asset,
        parser: n,
        userData: {}
      };
      return si(r, o, s), bn(o, s), Promise.all(n._invokeAll(function(l) {
        return l.afterRoot && l.afterRoot(o);
      })).then(function() {
        for (const l of o.scenes)
          l.updateMatrixWorld();
        e(o);
      });
    }).catch(t);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || [];
    for (let s = 0, r = t.length; s < r; s++) {
      const a = t[s].joints;
      for (let o = 0, l = a.length; o < l; o++)
        e[a[o]].isBone = !0;
    }
    for (let s = 0, r = e.length; s < r; s++) {
      const a = e[s];
      a.mesh !== void 0 && (this._addNodeRef(this.meshCache, a.mesh), a.skin !== void 0 && (n[a.mesh].isSkinnedMesh = !0)), a.camera !== void 0 && this._addNodeRef(this.cameraCache, a.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(e, t, n) {
    if (e.refs[t] <= 1) return n;
    const s = n.clone(), r = (a, o) => {
      const l = this.associations.get(a);
      l != null && this.associations.set(o, l);
      for (const [c, h] of a.children.entries())
        r(h, o.children[c]);
    };
    return r(n, s), s.name += "_instance_" + e.uses[t]++, s;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let n = 0; n < t.length; n++) {
      const s = e(t[n]);
      if (s) return s;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const n = [];
    for (let s = 0; s < t.length; s++) {
      const r = e(t[s]);
      r && n.push(r);
    }
    return n;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(e, t) {
    const n = e + ":" + t;
    let s = this.cache.get(n);
    if (!s) {
      switch (e) {
        case "scene":
          s = this.loadScene(t);
          break;
        case "node":
          s = this._invokeOne(function(r) {
            return r.loadNode && r.loadNode(t);
          });
          break;
        case "mesh":
          s = this._invokeOne(function(r) {
            return r.loadMesh && r.loadMesh(t);
          });
          break;
        case "accessor":
          s = this.loadAccessor(t);
          break;
        case "bufferView":
          s = this._invokeOne(function(r) {
            return r.loadBufferView && r.loadBufferView(t);
          });
          break;
        case "buffer":
          s = this.loadBuffer(t);
          break;
        case "material":
          s = this._invokeOne(function(r) {
            return r.loadMaterial && r.loadMaterial(t);
          });
          break;
        case "texture":
          s = this._invokeOne(function(r) {
            return r.loadTexture && r.loadTexture(t);
          });
          break;
        case "skin":
          s = this.loadSkin(t);
          break;
        case "animation":
          s = this._invokeOne(function(r) {
            return r.loadAnimation && r.loadAnimation(t);
          });
          break;
        case "camera":
          s = this.loadCamera(t);
          break;
        default:
          if (s = this._invokeOne(function(r) {
            return r != this && r.getDependency && r.getDependency(e, t);
          }), !s)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(n, s);
    }
    return s;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const n = this, s = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(s.map(function(r, a) {
        return n.getDependency(e, a);
      })), this.cache.add(e, t);
    }
    return t;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(e) {
    const t = this.json.buffers[e], n = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[ze.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(r, a) {
      n.load(As.resolveURL(t.uri, s.path), r, void 0, function() {
        a(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(n) {
      const s = t.byteLength || 0, r = t.byteOffset || 0;
      return n.slice(r, r + s);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const t = this, n = this.json, s = this.json.accessors[e];
    if (s.bufferView === void 0 && s.sparse === void 0) {
      const a = Ra[s.type], o = zi[s.componentType], l = s.normalized === !0, c = new o(s.count * a);
      return Promise.resolve(new Pt(c, a, l));
    }
    const r = [];
    return s.bufferView !== void 0 ? r.push(this.getDependency("bufferView", s.bufferView)) : r.push(null), s.sparse !== void 0 && (r.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(r).then(function(a) {
      const o = a[0], l = Ra[s.type], c = zi[s.componentType], h = c.BYTES_PER_ELEMENT, u = h * l, d = s.byteOffset || 0, p = s.bufferView !== void 0 ? n.bufferViews[s.bufferView].byteStride : void 0, g = s.normalized === !0;
      let _, m;
      if (p && p !== u) {
        const f = Math.floor(d / p), T = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + f + ":" + s.count;
        let b = t.cache.get(T);
        b || (_ = new c(o, f * p, s.count * p / h), b = new Q_(_, p / h), t.cache.add(T, b)), m = new $o(b, l, d % p / h, g);
      } else
        o === null ? _ = new c(s.count * l) : _ = new c(o, d, s.count * l), m = new Pt(_, l, g);
      if (s.sparse !== void 0) {
        const f = Ra.SCALAR, T = zi[s.sparse.indices.componentType], b = s.sparse.indices.byteOffset || 0, M = s.sparse.values.byteOffset || 0, N = new T(a[1], b, s.sparse.count * f), w = new c(a[2], M, s.sparse.count * l);
        o !== null && (m = new Pt(m.array.slice(), m.itemSize, m.normalized)), m.normalized = !1;
        for (let R = 0, U = N.length; R < U; R++) {
          const S = N[R];
          if (m.setX(S, w[R * l]), l >= 2 && m.setY(S, w[R * l + 1]), l >= 3 && m.setZ(S, w[R * l + 2]), l >= 4 && m.setW(S, w[R * l + 3]), l >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        m.normalized = g;
      }
      return m;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(e) {
    const t = this.json, n = this.options, r = t.textures[e].source, a = t.images[r];
    let o = this.textureLoader;
    if (a.uri) {
      const l = n.manager.getHandler(a.uri);
      l !== null && (o = l);
    }
    return this.loadTextureImage(e, r, o);
  }
  loadTextureImage(e, t, n) {
    const s = this, r = this.json, a = r.textures[e], o = r.images[t], l = (o.uri || o.bufferView) + ":" + a.sampler;
    if (this.textureCache[l])
      return this.textureCache[l];
    const c = this.loadImageSource(t, n).then(function(h) {
      h.flipY = !1, h.name = a.name || o.name || "", h.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (h.name = o.uri);
      const d = (r.samplers || {})[a.sampler] || {};
      return h.magFilter = Qc[d.magFilter] || zt, h.minFilter = Qc[d.minFilter] || En, h.wrapS = eh[d.wrapS] || $i, h.wrapT = eh[d.wrapT] || $i, h.generateMipmaps = !h.isCompressedTexture && h.minFilter !== Ct && h.minFilter !== zt, s.associations.set(h, { textures: e }), h;
    }).catch(function() {
      return null;
    });
    return this.textureCache[l] = c, c;
  }
  loadImageSource(e, t) {
    const n = this, s = this.json, r = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((u) => u.clone());
    const a = s.images[e], o = self.URL || self.webkitURL;
    let l = a.uri || "", c = !1;
    if (a.bufferView !== void 0)
      l = n.getDependency("bufferView", a.bufferView).then(function(u) {
        c = !0;
        const d = new Blob([u], { type: a.mimeType });
        return l = o.createObjectURL(d), l;
      });
    else if (a.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const h = Promise.resolve(l).then(function(u) {
      return new Promise(function(d, p) {
        let g = d;
        t.isImageBitmapLoader === !0 && (g = function(_) {
          const m = new vt(_);
          m.needsUpdate = !0, d(m);
        }), t.load(As.resolveURL(u, r.path), g, void 0, p);
      });
    }).then(function(u) {
      return c === !0 && o.revokeObjectURL(l), bn(u, a), u.userData.mimeType = a.mimeType || Wx(a.uri), u;
    }).catch(function(u) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", l), u;
    });
    return this.sourceCache[e] = h, h;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(e, t, n, s) {
    const r = this;
    return this.getDependency("texture", n.index).then(function(a) {
      if (!a) return null;
      if (n.texCoord !== void 0 && n.texCoord > 0 && (a = a.clone(), a.channel = n.texCoord), r.extensions[ze.KHR_TEXTURE_TRANSFORM]) {
        const o = n.extensions !== void 0 ? n.extensions[ze.KHR_TEXTURE_TRANSFORM] : void 0;
        if (o) {
          const l = r.associations.get(a);
          a = r.extensions[ze.KHR_TEXTURE_TRANSFORM].extendTexture(a, o), r.associations.set(a, l);
        }
      }
      return s !== void 0 && (a.colorSpace = s), e[t] = a, a;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(e) {
    const t = e.geometry;
    let n = e.material;
    const s = t.attributes.tangent === void 0, r = t.attributes.color !== void 0, a = t.attributes.normal === void 0;
    if (e.isPoints) {
      const o = "PointsMaterial:" + n.uuid;
      let l = this.cache.get(o);
      l || (l = new Yh(), tn.prototype.copy.call(l, n), l.color.copy(n.color), l.map = n.map, l.sizeAttenuation = !1, this.cache.add(o, l)), n = l;
    } else if (e.isLine) {
      const o = "LineBasicMaterial:" + n.uuid;
      let l = this.cache.get(o);
      l || (l = new Yo(), tn.prototype.copy.call(l, n), l.color.copy(n.color), l.map = n.map, this.cache.add(o, l)), n = l;
    }
    if (s || r || a) {
      let o = "ClonedMaterial:" + n.uuid + ":";
      s && (o += "derivative-tangents:"), r && (o += "vertex-colors:"), a && (o += "flat-shading:");
      let l = this.cache.get(o);
      l || (l = n.clone(), r && (l.vertexColors = !0), a && (l.flatShading = !0), s && (l.normalScale && (l.normalScale.y *= -1), l.clearcoatNormalScale && (l.clearcoatNormalScale.y *= -1)), this.cache.add(o, l), this.associations.set(l, this.associations.get(n))), n = l;
    }
    e.material = n;
  }
  getMaterialType() {
    return Fr;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, n = this.json, s = this.extensions, r = n.materials[e];
    let a;
    const o = {}, l = r.extensions || {}, c = [];
    if (l[ze.KHR_MATERIALS_UNLIT]) {
      const u = s[ze.KHR_MATERIALS_UNLIT];
      a = u.getMaterialType(), c.push(u.extendParams(o, r, t));
    } else {
      const u = r.pbrMetallicRoughness || {};
      if (o.color = new Ee(1, 1, 1), o.opacity = 1, Array.isArray(u.baseColorFactor)) {
        const d = u.baseColorFactor;
        o.color.setRGB(d[0], d[1], d[2], Lt), o.opacity = d[3];
      }
      u.baseColorTexture !== void 0 && c.push(t.assignTexture(o, "map", u.baseColorTexture, xt)), o.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1, o.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1, u.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(o, "metalnessMap", u.metallicRoughnessTexture)), c.push(t.assignTexture(o, "roughnessMap", u.metallicRoughnessTexture))), a = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, o);
      })));
    }
    r.doubleSided === !0 && (o.side = Zt);
    const h = r.alphaMode || Ca.OPAQUE;
    if (h === Ca.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, h === Ca.MASK && (o.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && a !== An && (c.push(t.assignTexture(o, "normalMap", r.normalTexture)), o.normalScale = new Te(1, 1), r.normalTexture.scale !== void 0)) {
      const u = r.normalTexture.scale;
      o.normalScale.set(u, u);
    }
    if (r.occlusionTexture !== void 0 && a !== An && (c.push(t.assignTexture(o, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && a !== An) {
      const u = r.emissiveFactor;
      o.emissive = new Ee().setRGB(u[0], u[1], u[2], Lt);
    }
    return r.emissiveTexture !== void 0 && a !== An && c.push(t.assignTexture(o, "emissiveMap", r.emissiveTexture, xt)), Promise.all(c).then(function() {
      const u = new a(o);
      return r.name && (u.name = r.name), bn(u, r), t.associations.set(u, { materials: e }), r.extensions && si(s, u, r), u;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(e) {
    const t = Je.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(e) {
    const t = this, n = this.extensions, s = this.primitiveCache;
    function r(o) {
      return n[ze.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o, t).then(function(l) {
        return th(l, o, t);
      });
    }
    const a = [];
    for (let o = 0, l = e.length; o < l; o++) {
      const c = e[o], h = Gx(c), u = s[h];
      if (u)
        a.push(u.promise);
      else {
        let d;
        c.extensions && c.extensions[ze.KHR_DRACO_MESH_COMPRESSION] ? d = r(c) : d = th(new sn(), c, t), s[h] = { primitive: c, promise: d }, a.push(d);
      }
    }
    return Promise.all(a);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(e) {
    const t = this, n = this.json, s = this.extensions, r = n.meshes[e], a = r.primitives, o = [];
    for (let l = 0, c = a.length; l < c; l++) {
      const h = a[l].material === void 0 ? kx(this.cache) : this.getDependency("material", a[l].material);
      o.push(h);
    }
    return o.push(t.loadGeometries(a)), Promise.all(o).then(function(l) {
      const c = l.slice(0, l.length - 1), h = l[l.length - 1], u = [];
      for (let p = 0, g = h.length; p < g; p++) {
        const _ = h[p], m = a[p];
        let f;
        const T = c[p];
        if (m.mode === Gt.TRIANGLES || m.mode === Gt.TRIANGLE_STRIP || m.mode === Gt.TRIANGLE_FAN || m.mode === void 0)
          f = r.isSkinnedMesh === !0 ? new tv(_, T) : new pt(_, T), f.isSkinnedMesh === !0 && f.normalizeSkinWeights(), m.mode === Gt.TRIANGLE_STRIP ? f.geometry = Zc(f.geometry, Ah) : m.mode === Gt.TRIANGLE_FAN && (f.geometry = Zc(f.geometry, mo));
        else if (m.mode === Gt.LINES)
          f = new Xh(_, T);
        else if (m.mode === Gt.LINE_STRIP)
          f = new qo(_, T);
        else if (m.mode === Gt.LINE_LOOP)
          f = new rv(_, T);
        else if (m.mode === Gt.POINTS)
          f = new av(_, T);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + m.mode);
        Object.keys(f.geometry.morphAttributes).length > 0 && Vx(f, r), f.name = t.createUniqueName(r.name || "mesh_" + e), bn(f, r), m.extensions && si(s, f, m), t.assignFinalMaterial(f), u.push(f);
      }
      for (let p = 0, g = u.length; p < g; p++)
        t.associations.set(u[p], {
          meshes: e,
          primitives: p
        });
      if (u.length === 1)
        return r.extensions && si(s, u[0], r), u[0];
      const d = new wn();
      r.extensions && si(s, d, r), t.associations.set(d, { meshes: e });
      for (let p = 0, g = u.length; p < g; p++)
        d.add(u[p]);
      return d;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(e) {
    let t;
    const n = this.json.cameras[e], s = n[n.type];
    if (!s) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return n.type === "perspective" ? t = new Rt(ko.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : n.type === "orthographic" && (t = new Go(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), n.name && (t.name = this.createUniqueName(n.name)), bn(t, n), Promise.resolve(t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const t = this.json.skins[e], n = [];
    for (let s = 0, r = t.joints.length; s < r; s++)
      n.push(this._loadNodeShallow(t.joints[s]));
    return t.inverseBindMatrices !== void 0 ? n.push(this.getDependency("accessor", t.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function(s) {
      const r = s.pop(), a = s, o = [], l = [];
      for (let c = 0, h = a.length; c < h; c++) {
        const u = a[c];
        if (u) {
          o.push(u);
          const d = new Ce();
          r !== null && d.fromArray(r.array, c * 16), l.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]);
      }
      return new Xo(o, l);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const t = this.json, n = this, s = t.animations[e], r = s.name ? s.name : "animation_" + e, a = [], o = [], l = [], c = [], h = [];
    for (let u = 0, d = s.channels.length; u < d; u++) {
      const p = s.channels[u], g = s.samplers[p.sampler], _ = p.target, m = _.node, f = s.parameters !== void 0 ? s.parameters[g.input] : g.input, T = s.parameters !== void 0 ? s.parameters[g.output] : g.output;
      _.node !== void 0 && (a.push(this.getDependency("node", m)), o.push(this.getDependency("accessor", f)), l.push(this.getDependency("accessor", T)), c.push(g), h.push(_));
    }
    return Promise.all([
      Promise.all(a),
      Promise.all(o),
      Promise.all(l),
      Promise.all(c),
      Promise.all(h)
    ]).then(function(u) {
      const d = u[0], p = u[1], g = u[2], _ = u[3], m = u[4], f = [];
      for (let T = 0, b = d.length; T < b; T++) {
        const M = d[T], N = p[T], w = g[T], R = _[T], U = m[T];
        if (M === void 0) continue;
        M.updateMatrix && M.updateMatrix();
        const S = n._createAnimationTracks(M, N, w, R, U);
        if (S)
          for (let y = 0; y < S.length; y++)
            f.push(S[y]);
      }
      return new mv(r, void 0, f);
    });
  }
  createNodeMesh(e) {
    const t = this.json, n = this, s = t.nodes[e];
    return s.mesh === void 0 ? null : n.getDependency("mesh", s.mesh).then(function(r) {
      const a = n._getNodeRef(n.meshCache, s.mesh, r);
      return s.weights !== void 0 && a.traverse(function(o) {
        if (o.isMesh)
          for (let l = 0, c = s.weights.length; l < c; l++)
            o.morphTargetInfluences[l] = s.weights[l];
      }), a;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(e) {
    const t = this.json, n = this, s = t.nodes[e], r = n._loadNodeShallow(e), a = [], o = s.children || [];
    for (let c = 0, h = o.length; c < h; c++)
      a.push(n.getDependency("node", o[c]));
    const l = s.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", s.skin);
    return Promise.all([
      r,
      Promise.all(a),
      l
    ]).then(function(c) {
      const h = c[0], u = c[1], d = c[2];
      d !== null && h.traverse(function(p) {
        p.isSkinnedMesh && p.bind(d, $x);
      });
      for (let p = 0, g = u.length; p < g; p++)
        h.add(u[p]);
      return h;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, n = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const r = t.nodes[e], a = r.name ? s.createUniqueName(r.name) : "", o = [], l = s._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(e);
    });
    return l && o.push(l), r.camera !== void 0 && o.push(s.getDependency("camera", r.camera).then(function(c) {
      return s._getNodeRef(s.cameraCache, r.camera, c);
    })), s._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(e);
    }).forEach(function(c) {
      o.push(c);
    }), this.nodeCache[e] = Promise.all(o).then(function(c) {
      let h;
      if (r.isBone === !0 ? h = new Wh() : c.length > 1 ? h = new wn() : c.length === 1 ? h = c[0] : h = new ot(), h !== c[0])
        for (let u = 0, d = c.length; u < d; u++)
          h.add(c[u]);
      if (r.name && (h.userData.name = r.name, h.name = a), bn(h, r), r.extensions && si(n, h, r), r.matrix !== void 0) {
        const u = new Ce();
        u.fromArray(r.matrix), h.applyMatrix4(u);
      } else
        r.translation !== void 0 && h.position.fromArray(r.translation), r.rotation !== void 0 && h.quaternion.fromArray(r.rotation), r.scale !== void 0 && h.scale.fromArray(r.scale);
      return s.associations.has(h) || s.associations.set(h, {}), s.associations.get(h).nodes = e, h;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const t = this.extensions, n = this.json.scenes[e], s = this, r = new wn();
    n.name && (r.name = s.createUniqueName(n.name)), bn(r, n), n.extensions && si(t, r, n);
    const a = n.nodes || [], o = [];
    for (let l = 0, c = a.length; l < c; l++)
      o.push(s.getDependency("node", a[l]));
    return Promise.all(o).then(function(l) {
      for (let h = 0, u = l.length; h < u; h++)
        r.add(l[h]);
      const c = (h) => {
        const u = /* @__PURE__ */ new Map();
        for (const [d, p] of s.associations)
          (d instanceof tn || d instanceof vt) && u.set(d, p);
        return h.traverse((d) => {
          const p = s.associations.get(d);
          p != null && u.set(d, p);
        }), u;
      };
      return s.associations = c(r), r;
    });
  }
  _createAnimationTracks(e, t, n, s, r) {
    const a = [], o = e.name ? e.name : e.uuid, l = [];
    kn[r.path] === kn.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && l.push(d.name ? d.name : d.uuid);
    }) : l.push(o);
    let c;
    switch (kn[r.path]) {
      case kn.weights:
        c = Zi;
        break;
      case kn.rotation:
        c = Ji;
        break;
      case kn.position:
      case kn.scale:
        c = Qi;
        break;
      default:
        switch (n.itemSize) {
          case 1:
            c = Zi;
            break;
          case 2:
          case 3:
          default:
            c = Qi;
            break;
        }
        break;
    }
    const h = s.interpolation !== void 0 ? zx[s.interpolation] : Ds, u = this._getArrayFromAccessor(n);
    for (let d = 0, p = l.length; d < p; d++) {
      const g = new c(
        l[d] + "." + kn[r.path],
        t.array,
        u,
        h
      );
      s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(g), a.push(g);
    }
    return a;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const n = Eo(t.constructor), s = new Float32Array(t.length);
      for (let r = 0, a = t.length; r < a; r++)
        s[r] = t[r] * n;
      t = s;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(n) {
      const s = this instanceof Ji ? Bx : ru;
      return new s(this.times, this.values, this.getValueSize() / 3, n);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function Yx(i, e, t) {
  const n = e.attributes, s = new Tt();
  if (n.POSITION !== void 0) {
    const o = t.json.accessors[n.POSITION], l = o.min, c = o.max;
    if (l !== void 0 && c !== void 0) {
      if (s.set(
        new A(l[0], l[1], l[2]),
        new A(c[0], c[1], c[2])
      ), o.normalized) {
        const h = Eo(zi[o.componentType]);
        s.min.multiplyScalar(h), s.max.multiplyScalar(h);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const r = e.targets;
  if (r !== void 0) {
    const o = new A(), l = new A();
    for (let c = 0, h = r.length; c < h; c++) {
      const u = r[c];
      if (u.POSITION !== void 0) {
        const d = t.json.accessors[u.POSITION], p = d.min, g = d.max;
        if (p !== void 0 && g !== void 0) {
          if (l.setX(Math.max(Math.abs(p[0]), Math.abs(g[0]))), l.setY(Math.max(Math.abs(p[1]), Math.abs(g[1]))), l.setZ(Math.max(Math.abs(p[2]), Math.abs(g[2]))), d.normalized) {
            const _ = Eo(zi[d.componentType]);
            l.multiplyScalar(_);
          }
          o.max(l);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    s.expandByVector(o);
  }
  i.boundingBox = s;
  const a = new un();
  s.getCenter(a.center), a.radius = s.min.distanceTo(s.max) / 2, i.boundingSphere = a;
}
function th(i, e, t) {
  const n = e.attributes, s = [];
  function r(a, o) {
    return t.getDependency("accessor", a).then(function(l) {
      i.setAttribute(o, l);
    });
  }
  for (const a in n) {
    const o = bo[a] || a.toLowerCase();
    o in i.attributes || s.push(r(n[a], o));
  }
  if (e.indices !== void 0 && !i.index) {
    const a = t.getDependency("accessor", e.indices).then(function(o) {
      i.setIndex(o);
    });
    s.push(a);
  }
  return ke.workingColorSpace !== Lt && "COLOR_0" in n && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ke.workingColorSpace}" not supported.`), bn(i, e), Yx(i, e, t), Promise.all(s).then(function() {
    return e.targets !== void 0 ? Hx(i, e.targets, t) : i;
  });
}
const nh = ["#38bdf8", "#34d399", "#fbbf24", "#a78bfa", "#fb7185", "#2dd4bf"];
class qx {
  constructor(e) {
    this.raycaster = new zv(), this.pointer = new Te(), this.modelGroup = null, this.modelBounds = new Tt(), this.zoneGroup = new wn(), this.areaVolumes = [], this.originalMaterials = /* @__PURE__ */ new Map(), this.autoOverviewTarget = new A(0, 0.5, 0), this.autoOverviewPosition = new A(8, 9, 10), this.overviewTarget = new A(0, 0.5, 0), this.overviewPosition = new A(8, 9, 10), this.targetGoal = new A(), this.positionGoal = new A(), this.animatingCamera = !1, this.selectedAreaId = null, this.hoveredAreaId = null, this.pointerDownPos = { x: 0, y: 0 }, this.rafId = 0, this.disposed = !1, this.handlePointerDown = (r) => {
      this.pointerDownPos = { x: r.clientX, y: r.clientY };
    }, this.handlePointerMove = (r) => {
      const a = this.pickArea(r);
      a !== this.hoveredAreaId && (this.hoveredAreaId = a, this.renderer.domElement.style.cursor = a ? "pointer" : "grab", this.refreshVisualHighlights(), this.options.onAreaHover(a));
    }, this.handlePointerUp = (r) => {
      var c, h;
      const a = r.clientX - this.pointerDownPos.x, o = r.clientY - this.pointerDownPos.y;
      if (Math.hypot(a, o) > 6) return;
      if (this.options.debugPicker && this.modelGroup) {
        this.updatePointer(r), this.raycaster.setFromCamera(this.pointer, this.camera);
        const u = this.raycaster.intersectObject(this.modelGroup, !0);
        if (u.length > 0) {
          const d = u[0], p = Xv(this.modelBounds, d.point);
          (h = (c = this.options).onDebugPick) == null || h.call(c, {
            ...p,
            meshName: d.object.name || null
          });
        }
      }
      const l = this.pickArea(r);
      l && (this.focusArea(l), this.options.onAreaSelect(l));
    }, this.animate = () => {
      this.disposed || (this.rafId = requestAnimationFrame(this.animate), this.animatingCamera && (this.camera.position.lerp(this.positionGoal, 0.12), this.controls.target.lerp(this.targetGoal, 0.12), this.camera.position.distanceTo(this.positionGoal) < 0.03 && this.controls.target.distanceTo(this.targetGoal) < 0.03 && (this.camera.position.copy(this.positionGoal), this.controls.target.copy(this.targetGoal), this.animatingCamera = !1)), this.controls.update(), this.renderer.render(this.scene, this.camera), this.emitProjectedLabels());
    }, this.options = e, this.container = e.container, this.scene = new J_(), this.scene.add(this.zoneGroup);
    const t = Math.max(this.container.clientWidth, 320), n = Math.max(this.container.clientHeight, 240);
    this.camera = new Rt(42, t / n, 0.1, 200), this.camera.position.copy(this.overviewPosition), this.renderer = new Z_({ antialias: !0, alpha: !0 }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)), this.renderer.setSize(t, n), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = dh, this.renderer.toneMapping = ph, this.renderer.toneMappingExposure = 1.05, this.container.appendChild(this.renderer.domElement), this.controls = new ex(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.dampingFactor = 0.08, this.controls.maxPolarAngle = Math.PI / 2 - 0.04, this.controls.minDistance = 1.5, this.controls.maxDistance = 40, this.setupLighting(), this.applyTheme(e.darkMode), this.resizeObserver = new ResizeObserver(() => this.handleResize()), this.resizeObserver.observe(this.container);
    const s = this.renderer.domElement;
    s.addEventListener("pointerdown", this.handlePointerDown), s.addEventListener("pointermove", this.handlePointerMove), s.addEventListener("pointerup", this.handlePointerUp), this.controls.addEventListener("start", () => {
      this.animatingCamera = !1;
    }), this.animate();
  }
  setupLighting() {
    const e = new bv(16317180, 3359061, 1.15);
    this.scene.add(e);
    const t = new Mo(16777215, 1.35);
    t.position.set(10, 18, 12), t.castShadow = !0, t.shadow.mapSize.set(1024, 1024), t.shadow.camera.near = 1, t.shadow.camera.far = 45;
    const n = 10;
    t.shadow.camera.left = -n, t.shadow.camera.right = n, t.shadow.camera.top = n, t.shadow.camera.bottom = -n, t.shadow.bias = -5e-4, this.scene.add(t);
    const s = new Mo(9684477, 0.45);
    s.position.set(-10, 8, -8), this.scene.add(s);
    const r = new Ki(48, 48), a = new lv({ opacity: 0.16 }), o = new pt(r, a);
    o.rotation.x = -Math.PI / 2, o.position.y = -5e-3, o.receiveShadow = !0, this.scene.add(o);
  }
  applyTheme(e) {
    this.options.darkMode = e, this.scene.background = new Ee(e ? 988970 : 15857145);
  }
  updateOptions(e) {
    this.options = { ...this.options, ...e }, e.darkMode !== void 0 && this.applyTheme(e.darkMode), e.defaultView !== void 0 && this.setDefaultView(e.defaultView), this.refreshVisualHighlights();
  }
  getCameraPose() {
    return {
      position: [
        Number(this.camera.position.x.toFixed(3)),
        Number(this.camera.position.y.toFixed(3)),
        Number(this.camera.position.z.toFixed(3))
      ],
      target: [
        Number(this.controls.target.x.toFixed(3)),
        Number(this.controls.target.y.toFixed(3)),
        Number(this.controls.target.z.toFixed(3))
      ]
    };
  }
  setDefaultView(e) {
    this.options.defaultView = e ?? null, e ? (this.overviewPosition.set(...e.position), this.overviewTarget.set(...e.target)) : (this.overviewPosition.copy(this.autoOverviewPosition), this.overviewTarget.copy(this.autoOverviewTarget));
  }
  async loadModel(e, t) {
    var s, r, a, o;
    const n = new fx();
    try {
      let l;
      if (zr(e)) {
        const _ = await So(e);
        if (!_)
          throw new Error(
            `Model "${tu(e)}" is not saved in this browser yet. Upload the .glb or host it at /local/.`
          );
        l = await n.parseAsync(_, "");
      } else
        l = await n.loadAsync(e);
      if (this.disposed) return;
      this.modelGroup && this.scene.remove(this.modelGroup), this.originalMaterials.clear();
      const c = l.scene, h = new wn();
      h.add(c);
      const u = Wv(c, this.options.upAxis);
      this.modelBounds = u.bounds.clone();
      const d = [];
      h.traverse((_) => {
        if (_ instanceof pt) {
          _.name && d.push(_.name), _.castShadow = !0, _.receiveShadow = !0;
          const f = (Array.isArray(_.material) ? _.material : [_.material]).map((T) => {
            const b = T.clone();
            return b instanceof Fr && (b.roughness = Math.max(b.roughness, 0.72), b.metalness = Math.min(b.metalness, 0.15)), this.originalMaterials.set(b, {
              opacity: b.opacity,
              transparent: b.transparent
            }), b;
          });
          _.material = Array.isArray(_.material) ? f : f[0];
        }
      }), this.modelGroup = h, this.scene.add(h);
      const p = this.camera.aspect || 1.5, g = Yc(
        this.modelBounds,
        this.camera.fov,
        p,
        [0.42, 0.96, 0.92],
        1.1
      );
      this.autoOverviewTarget.copy(g.target), this.autoOverviewPosition.copy(g.position), this.options.defaultView ? (this.overviewTarget.set(...this.options.defaultView.target), this.overviewPosition.set(...this.options.defaultView.position)) : (this.overviewTarget.copy(g.target), this.overviewPosition.copy(g.position)), this.camera.position.copy(this.overviewPosition), this.controls.target.copy(this.overviewTarget), this.controls.update(), this.setAreas(t), (r = (s = this.options).onLoadComplete) == null || r.call(s, d);
    } catch (l) {
      const c = l instanceof Error ? l.message : String(l);
      (o = (a = this.options).onLoadError) == null || o.call(a, c);
    }
  }
  clearModel() {
    for (this.modelGroup && (this.scene.remove(this.modelGroup), this.modelGroup = null), this.originalMaterials.clear(), this.selectedAreaId = null, this.hoveredAreaId = null; this.zoneGroup.children.length > 0; )
      this.zoneGroup.remove(this.zoneGroup.children.pop());
    this.areaVolumes = [], this.options.onLabelsUpdate([]);
  }
  setAreas(e) {
    for (; this.zoneGroup.children.length > 0; ) {
      const t = this.zoneGroup.children.pop();
      this.zoneGroup.remove(t);
    }
    this.areaVolumes = [], this.modelGroup && (e.forEach((t, n) => {
      var b;
      const s = new Tt(), r = [];
      if ((b = t.mesh_names) != null && b.length) {
        const M = new Set(t.mesh_names);
        this.modelGroup.traverse((N) => {
          var w;
          N instanceof pt && (M.has(N.name) || M.has(((w = N.parent) == null ? void 0 : w.name) ?? "")) && (r.push(N), s.expandByObject(N));
        });
      }
      if (t.bounds) {
        const M = $v(
          this.modelBounds,
          t.bounds,
          t.height_bounds ?? [0, 1]
        );
        s.union(M);
      }
      if (s.isEmpty()) return;
      const a = s.getSize(new A()), o = s.getCenter(new A()), l = new Ee(t.color ?? nh[n % nh.length]), c = new is(
        Math.max(a.x, 0.25),
        Math.max(a.y, 0.35),
        Math.max(a.z, 0.25)
      ), h = new An({
        transparent: !0,
        opacity: 0,
        depthWrite: !1
      }), u = new pt(c, h);
      u.position.copy(o), u.userData.areaId = t.id, this.zoneGroup.add(u);
      const d = new Ki(Math.max(a.x, 0.25), Math.max(a.z, 0.25)), p = new An({
        color: l,
        transparent: !0,
        opacity: 0.08,
        side: Zt,
        depthWrite: !1
      }), g = new pt(d, p);
      g.rotation.x = -Math.PI / 2, g.position.set(o.x, s.min.y + 0.015, o.z), this.zoneGroup.add(g);
      const _ = new ov(c), m = new Yo({
        color: l,
        transparent: !0,
        opacity: 0.2
      }), f = new Xh(_, m);
      f.position.copy(o), this.zoneGroup.add(f);
      const T = new A(o.x, s.max.y + 0.28, o.z);
      this.areaVolumes.push({
        config: t,
        box: s,
        anchor: T,
        hitbox: u,
        highlightPad: g,
        outline: f,
        meshes: r,
        color: l
      });
    }), this.refreshVisualHighlights());
  }
  focusArea(e) {
    if (this.selectedAreaId = e, !e) {
      this.resetView();
      return;
    }
    const t = this.areaVolumes.find((s) => s.config.id === e);
    if (!t) return;
    const n = Yc(
      t.box,
      this.camera.fov,
      this.camera.aspect || 1.5,
      t.config.camera_offset ?? [0.65, 0.95, 0.85],
      1.45
    );
    this.targetGoal.copy(n.target), this.positionGoal.copy(n.position), this.animatingCamera = !0, this.refreshVisualHighlights();
  }
  resetView() {
    this.selectedAreaId = null, this.targetGoal.copy(this.overviewTarget), this.positionGoal.copy(this.overviewPosition), this.animatingCamera = !0, this.refreshVisualHighlights();
  }
  refreshVisualHighlights() {
    const e = this.options.showZoneOverlay, t = /* @__PURE__ */ new Set();
    if (this.selectedAreaId) {
      const n = this.areaVolumes.find((s) => s.config.id === this.selectedAreaId);
      n == null || n.meshes.forEach((s) => t.add(s));
    }
    for (const n of this.areaVolumes) {
      const s = n.config.id === this.selectedAreaId, r = n.config.id === this.hoveredAreaId, a = n.highlightPad.material, o = n.outline.material;
      n.highlightPad.visible = e || s || r, n.outline.visible = e || s || r, a.opacity = s ? 0.28 : r ? 0.18 : 0.06, o.opacity = s ? 0.9 : r ? 0.65 : 0.18;
    }
    if (this.modelGroup) {
      const n = !!(this.selectedAreaId && this.options.dimUnselected && t.size > 0);
      this.modelGroup.traverse((s) => {
        if (!(s instanceof pt)) return;
        const r = !n || t.has(s), a = Array.isArray(s.material) ? s.material : [s.material];
        for (const o of a) {
          const l = this.originalMaterials.get(o);
          l && (o.transparent = r ? l.transparent : !0, o.opacity = r ? l.opacity : 0.22, o.needsUpdate = !0);
        }
      });
    }
  }
  updatePointer(e) {
    const t = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = (e.clientX - t.left) / t.width * 2 - 1, this.pointer.y = -((e.clientY - t.top) / t.height) * 2 + 1;
  }
  pickArea(e) {
    this.updatePointer(e), this.raycaster.setFromCamera(this.pointer, this.camera);
    const t = this.areaVolumes.map((s) => s.hitbox), n = this.raycaster.intersectObjects(t, !1);
    return n.length > 0 ? n[0].object.userData.areaId ?? null : null;
  }
  handleResize() {
    if (this.disposed) return;
    const e = Math.max(this.container.clientWidth, 320), t = Math.max(this.container.clientHeight, 240);
    this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t);
  }
  emitProjectedLabels() {
    const e = this.container.clientWidth, t = this.container.clientHeight;
    if (!e || !t) return;
    const n = this.areaVolumes.map((s) => {
      const r = s.anchor.clone().project(this.camera), a = r.z >= -1 && r.z <= 1;
      return {
        id: s.config.id,
        name: s.config.name,
        color: `#${s.color.getHexString()}`,
        x: (r.x * 0.5 + 0.5) * e,
        y: (-r.y * 0.5 + 0.5) * t,
        visible: a,
        selected: s.config.id === this.selectedAreaId
      };
    });
    this.options.onLabelsUpdate(n);
  }
  dispose() {
    this.disposed = !0, cancelAnimationFrame(this.rafId), this.resizeObserver.disconnect();
    const e = this.renderer.domElement;
    e.removeEventListener("pointerdown", this.handlePointerDown), e.removeEventListener("pointermove", this.handlePointerMove), e.removeEventListener("pointerup", this.handlePointerUp), this.controls.dispose(), this.renderer.dispose(), e.remove();
  }
}
var jx = Object.defineProperty, Kx = Object.getOwnPropertyDescriptor, Hr = (i, e, t, n) => {
  for (var s = n > 1 ? void 0 : n ? Kx(e, t) : e, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (n ? a(e, t, s) : a(s)) || s);
  return n && s && jx(e, t, s), s;
};
let es = class extends hi {
  constructor() {
    super(...arguments), this.mode = "slide-over";
  }
  emitClose() {
    this.dispatchEvent(new CustomEvent("close-area", { bubbles: !0, composed: !0 }));
  }
  emitToggleMode() {
    const i = this.mode === "slide-over" ? "fullscreen" : "slide-over";
    this.dispatchEvent(
      new CustomEvent("change-panel-mode", {
        detail: { mode: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
  renderSensor(i) {
    const e = i.attributes.friendly_name ?? i.entity_id;
    return Ne`
      <div
        class="sensor-card"
        @click=${() => Sl(this, i.entity_id)}
        title="Open Home Assistant details"
      >
        <div class="entity-meta">
          <div class="entity-name">${e}</div>
          <div class="entity-id">${i.entity_id}</div>
        </div>
        <div class="entity-state">${yl(i)}</div>
      </div>
    `;
  }
  renderAppliance(i) {
    const e = i.attributes.friendly_name ?? i.entity_id, t = hh(i);
    return Ne`
      <div
        class="appliance-card ${t ? "active" : ""}"
        @click=${() => Uu(this.hass, i)}
      >
        <div class="entity-meta">
          <div class="entity-name">${e}</div>
          <div class="entity-id">${i.entity_id}</div>
        </div>
        <div class="appliance-controls">
          <span class="pill-toggle">${yl(i)}</span>
          <button
            class="more-btn"
            title="More info"
            @click=${(n) => {
      n.stopPropagation(), Sl(this, i.entity_id);
    }}
          >
            ⋯
          </button>
        </div>
      </div>
    `;
  }
  render() {
    if (!this.area) return Fe;
    const i = ch(this.hass, this.area), e = this.area.color ?? "#38bdf8";
    return Ne`
      <div class="hud ${this.mode}">
        <div class="header">
          <div class="title-group">
            <span class="accent-dot" style="background: ${e}"></span>
            <div class="title-text">
              <h3 class="title">${this.area.name}</h3>
              <div class="subtitle">
                ${i.sensors.length} sensor(s) · ${i.activeApplianceCount}/${i.appliances.length} active
              </div>
            </div>
          </div>
          <div class="header-actions">
            <button
              class="icon-btn"
              @click=${this.emitToggleMode}
              title="Switch between slide-over and fullscreen"
            >
              ${this.mode === "slide-over" ? "⛶ Expand" : "◨ Slide-over"}
            </button>
            <button class="icon-btn" @click=${this.emitClose}>✕ Overview</button>
          </div>
        </div>

        <div>
          <p class="section-label">Appliances & Controls</p>
          ${i.appliances.length > 0 ? Ne`<div class="grid">${i.appliances.map((t) => this.renderAppliance(t))}</div>` : Ne`<div class="empty">
                No appliances mapped yet. Add <code>appliances</code> or set
                <code>ha_area_id</code> in card config.
              </div>`}
        </div>

        <div>
          <p class="section-label">Sensors</p>
          ${i.sensors.length > 0 ? Ne`<div class="grid">${i.sensors.map((t) => this.renderSensor(t))}</div>` : Ne`<div class="empty">
                No sensors mapped yet. Add <code>sensors</code> or set
                <code>ha_area_id</code> in card config.
              </div>`}
        </div>
      </div>
    `;
  }
};
es.styles = wo`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, system-ui, -apple-system, sans-serif);
    }

    .hud {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 16px;
      color: var(--primary-text-color, #e2e8f0);
      background: var(--ha-card-background, rgba(15, 23, 42, 0.92));
      backdrop-filter: blur(14px);
      overflow-y: auto;
    }

    .hud.slide-over {
      position: absolute;
      top: 12px;
      right: 12px;
      bottom: 12px;
      width: min(350px, calc(100% - 24px));
      border-radius: 14px;
      border: 1px solid rgba(148, 163, 184, 0.24);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
      animation: slideIn 0.22s ease-out;
      z-index: 20;
    }

    .hud.fullscreen {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      z-index: 25;
      animation: fadeIn 0.18s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(18px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    }

    .title-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1 1 140px;
      min-width: 0;
    }

    .title-text {
      min-width: 0;
      flex: 1;
    }

    .accent-dot {
      width: 11px;
      height: 11px;
      border-radius: 999px;
      flex-shrink: 0;
    }

    .title {
      font-size: 1.05rem;
      font-weight: 700;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .subtitle {
      font-size: 0.78rem;
      opacity: 0.72;
      margin-top: 2px;
    }

    .header-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }

    button.icon-btn {
      appearance: none;
      border: 1px solid rgba(148, 163, 184, 0.28);
      background: rgba(148, 163, 184, 0.12);
      color: inherit;
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
    }

    button.icon-btn:hover {
      background: rgba(148, 163, 184, 0.22);
    }

    .section-label {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0.68;
      margin: 0 0 8px 0;
    }

    .grid {
      display: grid;
      gap: 8px;
      grid-template-columns: 1fr;
    }

    .hud.fullscreen .grid {
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }

    .sensor-card,
    .appliance-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid rgba(148, 163, 184, 0.18);
      background: rgba(148, 163, 184, 0.08);
    }

    .appliance-card {
      cursor: pointer;
      transition: border-color 0.15s ease, background 0.15s ease;
    }

    .appliance-card:hover {
      background: rgba(148, 163, 184, 0.15);
    }

    .appliance-card.active {
      border-color: rgba(56, 189, 248, 0.55);
      background: rgba(56, 189, 248, 0.14);
    }

    .entity-meta {
      min-width: 0;
    }

    .entity-name {
      font-size: 0.86rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-id {
      font-size: 0.7rem;
      opacity: 0.58;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-state {
      font-size: 0.85rem;
      font-weight: 700;
      text-align: right;
      white-space: nowrap;
    }

    .appliance-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .pill-toggle {
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.74rem;
      font-weight: 700;
      text-transform: uppercase;
      white-space: nowrap;
      flex-shrink: 0;
      border: 1px solid rgba(148, 163, 184, 0.3);
      background: rgba(15, 23, 42, 0.35);
      color: inherit;
    }

    .appliance-card.active .pill-toggle {
      background: #38bdf8;
      color: #0f172a;
      border-color: transparent;
    }

    .more-btn {
      border: none;
      background: transparent;
      color: inherit;
      opacity: 0.65;
      cursor: pointer;
      padding: 4px;
      font-size: 0.9rem;
    }

    .more-btn:hover {
      opacity: 1;
    }

    .empty {
      font-size: 0.84rem;
      opacity: 0.7;
      padding: 12px;
      border-radius: 10px;
      border: 1px dashed rgba(148, 163, 184, 0.25);
    }

    @media (max-width: 600px) {
      .hud.slide-over {
        top: auto;
        left: 8px;
        right: 8px;
        bottom: 8px;
        width: auto;
        max-height: 55%;
      }
    }
  `;
Hr([
  ts({ attribute: !1 })
], es.prototype, "hass", 2);
Hr([
  ts({ attribute: !1 })
], es.prototype, "area", 2);
Hr([
  ts({ type: String })
], es.prototype, "mode", 2);
es = Hr([
  Po("home-3d-area-hud")
], es);
var Zx = Object.defineProperty, Jx = Object.getOwnPropertyDescriptor, Ln = (i, e, t, n) => {
  for (var s = n > 1 ? void 0 : n ? Jx(e, t) : e, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (n ? a(e, t, s) : a(s)) || s);
  return n && s && Zx(e, t, s), s;
};
const _r = ["#38bdf8", "#34d399", "#fbbf24", "#a78bfa", "#fb7185", "#2dd4bf"];
let nn = class extends hi {
  constructor() {
    super(...arguments), this._discoveredMeshes = [], this._uploadedModels = [], this._inspectStatus = null, this._inspectError = null, this._dragActive = !1, this._capturedView = null, this.handleViewChangedEvent = (i) => {
      var t, n, s;
      const e = i.detail;
      if (!(!e || e.modelUrl !== ((n = (t = this._config) == null ? void 0 : t.model_url) == null ? void 0 : n.trim()))) {
        if (this._capturedView = e.pose, e.pose)
          this.updateField("default_view", e.pose);
        else if ((s = this._config) != null && s.default_view) {
          const r = { ...this._config };
          delete r.default_view, this.emitConfig(r);
        }
      }
    }, this.handleInspectUrl = async () => {
      var e, t;
      const i = (t = (e = this._config) == null ? void 0 : e.model_url) == null ? void 0 : t.trim();
      if (!i) {
        this._inspectError = "Enter a Model URL or upload a .glb file first.";
        return;
      }
      try {
        if (this._inspectStatus = "Inspecting .glb…", this._inspectError = null, zr(i)) {
          const r = await So(i);
          if (!r) throw new Error("Uploaded model not found in this browser");
          this.inspectBuffer(r, i);
          return;
        }
        const n = await fetch(i);
        if (!n.ok) throw new Error(`HTTP ${n.status}`);
        const s = await n.arrayBuffer();
        this.inspectBuffer(s, i);
      } catch (n) {
        this._inspectStatus = null, this._inspectError = `Could not inspect GLB: ${n instanceof Error ? n.message : String(n)}`;
      }
    }, this.handleUploadInput = (i) => {
      var t;
      const e = (t = i.target.files) == null ? void 0 : t[0];
      e && this.handleUploadGlbFile(e);
    }, this.handleDrop = (i) => {
      var t, n;
      i.preventDefault(), this._dragActive = !1;
      const e = (n = (t = i.dataTransfer) == null ? void 0 : t.files) == null ? void 0 : n[0];
      e && this.handleUploadGlbFile(e);
    }, this.handleSelectSavedModel = async (i) => {
      this.updateField("model_url", i.url);
      const e = await So(i.url);
      e && this.inspectBuffer(e, i.name);
    }, this.handleDeleteSavedModel = async (i) => {
      var e;
      await Jv(i.name), ((e = this._config) == null ? void 0 : e.model_url) === i.url && this.updateField("model_url", ""), await this.refreshUploadedModels();
    }, this.handleAutoCreateAreas = () => {
      var s;
      if (!this._config || this._discoveredMeshes.length === 0) return;
      const i = this._config.areas ?? [], e = new Set(i.flatMap((r) => r.mesh_names ?? [])), t = Jh(this._discoveredMeshes, (s = this.hass) == null ? void 0 : s.areas, i);
      if (t.length > 0) {
        this.updateField("areas", [...i, ...t]);
        return;
      }
      const n = [];
      for (const r of this._discoveredMeshes) {
        if (e.has(r)) continue;
        const a = r.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
        !a || i.some((o) => o.id === a) || n.some((o) => o.id === a) || n.push({
          id: a,
          name: r,
          color: _r[(i.length + n.length) % _r.length],
          mesh_names: [r]
        });
      }
      n.length > 0 && this.updateField("areas", [...i, ...n]);
    }, this.handleAddArea = () => {
      if (!this._config) return;
      const i = [...this._config.areas ?? []], e = i.length + 1;
      i.push({
        id: `area_${e}`,
        name: `Area ${e}`,
        color: _r[(e - 1) % _r.length]
      }), this.updateField("areas", i);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("home-3d-default-view-changed", this.handleViewChangedEvent);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("home-3d-default-view-changed", this.handleViewChangedEvent);
  }
  setConfig(i) {
    this._config = { ...i }, this._capturedView = Qh(i.model_url), this.refreshUploadedModels();
  }
  async refreshUploadedModels() {
    try {
      this._uploadedModels = await Zv();
    } catch {
      this._uploadedModels = [];
    }
  }
  emitConfig(i) {
    this._config = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
  updateField(i, e) {
    this._config && this.emitConfig({ ...this._config, [i]: e });
  }
  inspectBuffer(i, e) {
    const t = Zh(i), n = [.../* @__PURE__ */ new Set([...t.meshNames, ...t.nodeNames])];
    this._discoveredMeshes = n, this._inspectError = null, this._inspectStatus = `Inspected ${e}: ${n.length} node/mesh name(s)${t.generator ? ` · ${t.generator}` : ""}`;
  }
  async handleUploadGlbFile(i) {
    try {
      this._inspectStatus = `Uploading ${i.name}…`, this._inspectError = null;
      const e = await i.arrayBuffer(), { url: t, meta: n } = await nu(i.name, e), s = [.../* @__PURE__ */ new Set([...n.meshNames, ...n.nodeNames])];
      this._discoveredMeshes = s, this._inspectStatus = `Uploaded & saved ${i.name} (${(e.byteLength / 1024).toFixed(1)} KB, ${s.length} mesh/node names). Click Save below to persist.`, await this.refreshUploadedModels(), this.updateField("model_url", t);
    } catch (e) {
      this._inspectStatus = null, this._inspectError = `Upload failed: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
  updateArea(i, e) {
    if (!this._config) return;
    const t = [...this._config.areas ?? []];
    t[i] = { ...t[i], ...e }, this.updateField("areas", t);
  }
  removeArea(i) {
    if (!this._config) return;
    const e = [...this._config.areas ?? []];
    e.splice(i, 1), this.updateField("areas", e);
  }
  toggleAreaMesh(i, e) {
    var s, r;
    const t = (r = (s = this._config) == null ? void 0 : s.areas) == null ? void 0 : r[i];
    if (!t) return;
    const n = new Set(t.mesh_names ?? []);
    n.has(e) ? n.delete(e) : n.add(e), this.updateArea(i, { mesh_names: [...n] });
  }
  render() {
    var t;
    if (!this._config) return Fe;
    const i = this._config.areas ?? [], e = (t = this.hass) != null && t.areas ? Object.values(this.hass.areas) : [];
    return Ne`
      <div class="editor">
        <div class="row">
          <label class="field">
            Card Title
            <input
              type="text"
              .value=${this._config.title ?? "My 3D Home"}
              @input=${(n) => this.updateField("title", n.target.value)}
            />
          </label>
          <label class="field">
            Area Detail Mode
            <select
              .value=${this._config.panel_mode ?? "slide-over"}
              @change=${(n) => this.updateField("panel_mode", n.target.value)}
            >
              <option value="slide-over">Slide-over (Default)</option>
              <option value="fullscreen">Fullscreen</option>
            </select>
          </label>
        </div>

        <div
          class="dropzone ${this._dragActive ? "active" : ""}"
          @dragover=${(n) => {
      n.preventDefault(), this._dragActive = !0;
    }}
          @dragleave=${() => {
      this._dragActive = !1;
    }}
          @drop=${this.handleDrop}
        >
          <span>
            <strong>Upload .glb Model:</strong> Drag &amp; drop a <code>.glb</code> file here or
            browse (saved in this browser; use <code>/local/...</code> for all devices).
          </span>
          <label class="btn primary">
            Upload .glb
            <input type="file" accept=".glb" @change=${this.handleUploadInput} />
          </label>
        </div>

        ${this._uploadedModels.length > 0 ? Ne`
              <div class="saved-models">
                <span>Uploaded in browser:</span>
                ${this._uploadedModels.map(
      (n) => {
        var s;
        return Ne`
                    <span class="saved-pill ${((s = this._config) == null ? void 0 : s.model_url) === n.url ? "active" : ""}">
                      <button type="button" @click=${() => void this.handleSelectSavedModel(n)}>
                        ${n.name} (${(n.sizeBytes / 1024).toFixed(0)} KB)
                      </button>
                      <button
                        type="button"
                        title="Delete stored model"
                        @click=${() => void this.handleDeleteSavedModel(n)}
                      >
                        ✕
                      </button>
                    </span>
                  `;
      }
    )}
              </div>
            ` : Fe}

        <div class="model-bar">
          <label class="field">
            3D Model URL (<code>/local/...</code> or <code>idb://...</code>)
            <input
              type="text"
              placeholder="/local/home-3d/my-home.glb"
              .value=${this._config.model_url ?? ""}
              @input=${(n) => this.updateField("model_url", n.target.value)}
            />
          </label>
          <button type="button" class="btn" @click=${this.handleInspectUrl}>Inspect URL</button>
        </div>

        ${this._inspectStatus ? Ne`<div class="status">${this._inspectStatus}</div>` : Fe}
        ${this._inspectError ? Ne`<div class="status error">${this._inspectError}</div>` : Fe}

        <div class="dropzone">
          <span>
            <strong>Default Camera View:</strong>
            ${this._config.default_view ? Ne`Saved in card config (pos: ${this._config.default_view.position.join(", ")})` : this._capturedView ? Ne`Captured from card preview — click <em>Apply to Config</em> &amp; Save` : Ne`Auto-fit on first load (orbit/zoom card &amp; click <code>⌖ Set Default</code>)`}
          </span>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${this._capturedView ? Ne`
                  <button
                    type="button"
                    class="btn primary"
                    @click=${() => this.updateField("default_view", this._capturedView)}
                  >
                    Apply to Config
                  </button>
                ` : Fe}
            ${this._config.default_view || this._capturedView ? Ne`
                  <button
                    type="button"
                    class="btn"
                    @click=${() => {
      var n;
      if (eu((n = this._config) == null ? void 0 : n.model_url), this._capturedView = null, this._config) {
        const s = { ...this._config };
        delete s.default_view, this.emitConfig(s);
      }
    }}
                  >
                    Reset Auto
                  </button>
                ` : Fe}
          </div>
        </div>

        <div class="row">
          <label class="field">
            Card Height (px)
            <input
              type="number"
              min="320"
              max="1200"
              step="20"
              .value=${String(this._config.card_height ?? 560)}
              @input=${(n) => this.updateField("card_height", Number(n.target.value) || 560)}
            />
          </label>
          <label class="field">
            Model Up Axis
            <select
              .value=${this._config.up_axis ?? "auto"}
              @change=${(n) => this.updateField("up_axis", n.target.value)}
            >
              <option value="auto">Auto (SolidCraft & glTF ready)</option>
              <option value="z">Z-Up (Raw CAD)</option>
              <option value="y">Y-Up (Standard glTF)</option>
            </select>
          </label>
        </div>

        <div class="toggles">
          <label class="check">
            <input
              type="checkbox"
              .checked=${this._config.show_labels !== !1}
              @change=${(n) => this.updateField("show_labels", n.target.checked)}
            />
            Show floating room labels
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this._config.dim_unselected !== !1}
              @change=${(n) => this.updateField("dim_unselected", n.target.checked)}
            />
            Dim unselected meshes
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this._config.show_zone_overlay !== !1}
              @change=${(n) => this.updateField("show_zone_overlay", n.target.checked)}
            />
            Show zone footprint highlights
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this._config.auto_map_area_meshes !== !1}
              @change=${(n) => this.updateField("auto_map_area_meshes", n.target.checked)}
            />
            Auto-map <code>area_*</code> / <code>zone_*</code> meshes
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${!!this._config.debug_picker}
              @change=${(n) => this.updateField("debug_picker", n.target.checked)}
            />
            Debug coordinate picker
          </label>
        </div>

        <div class="section-header">
          <h4>Areas (${i.length})</h4>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            ${this._discoveredMeshes.length > 0 ? Ne`
                  <button type="button" class="btn" @click=${this.handleAutoCreateAreas}>
                    ⚡ Auto-create from GLB
                  </button>
                ` : Fe}
            <button type="button" class="btn primary" @click=${this.handleAddArea}>
              + Add Area
            </button>
          </div>
        </div>

        ${i.map(
      (n, s) => Ne`
            <div class="area-card">
              <div class="area-top">
                <strong>${n.name || n.id}</strong>
                <button type="button" class="btn danger" @click=${() => this.removeArea(s)}>
                  Remove
                </button>
              </div>
              <div class="row">
                <label class="field">
                  Display Name
                  <input
                    type="text"
                    .value=${n.name}
                    @input=${(r) => this.updateArea(s, { name: r.target.value })}
                  />
                </label>
                <label class="field">
                  Home Assistant Area
                  ${e.length > 0 ? Ne`
                        <select
                          .value=${n.ha_area_id ?? ""}
                          @change=${(r) => this.updateArea(s, {
        ha_area_id: r.target.value || void 0
      })}
                        >
                          <option value="">— Manual entities only —</option>
                          ${e.map(
        (r) => Ne`<option value=${r.area_id}>${r.name}</option>`
      )}
                        </select>
                      ` : Ne`
                        <input
                          type="text"
                          placeholder="e.g. living_room"
                          .value=${n.ha_area_id ?? ""}
                          @input=${(r) => this.updateArea(s, {
        ha_area_id: r.target.value || void 0
      })}
                        />
                      `}
                </label>
              </div>

              <div class="row">
                <label class="field">
                  Mesh Names (comma-separated)
                  <input
                    type="text"
                    placeholder="e.g. area_living, Body17"
                    .value=${(n.mesh_names ?? []).join(", ")}
                    @input=${(r) => {
        const a = r.target.value.split(",").map((o) => o.trim()).filter(Boolean);
        this.updateArea(s, { mesh_names: a.length ? a : void 0 });
      }}
                  />
                </label>
                <label class="field">
                  Footprint Bounds [minX, minZ, maxX, maxZ]
                  <input
                    type="text"
                    placeholder="e.g. 0.50, 0.45, 0.80, 0.96"
                    .value=${n.bounds ? n.bounds.join(", ") : ""}
                    @change=${(r) => {
        const a = r.target.value.split(",").map((o) => Number(o.trim())).filter((o) => !Number.isNaN(o));
        this.updateArea(s, {
          bounds: a.length === 4 ? a : void 0
        });
      }}
                  />
                </label>
              </div>

              ${this._discoveredMeshes.length > 0 ? Ne`
                    <div class="mesh-chips">
                      ${this._discoveredMeshes.map((r) => {
        var o;
        const a = (o = n.mesh_names) == null ? void 0 : o.includes(r);
        return Ne`
                          <button
                            type="button"
                            class="chip ${a ? "selected" : ""}"
                            @click=${() => this.toggleAreaMesh(s, r)}
                          >
                            ${r}
                          </button>
                        `;
      })}
                    </div>
                  ` : Fe}
            </div>
          `
    )}
      </div>
    `;
  }
};
nn.styles = wo`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 8px 0;
      font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
      color: var(--primary-text-color, #f8fafc);
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    label.field {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 0.84rem;
      font-weight: 600;
    }

    input[type='text'],
    input[type='number'],
    select {
      box-sizing: border-box;
      width: 100%;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #475569);
      background: var(--card-background-color, #1e293b);
      color: var(--primary-text-color, #f8fafc);
      font-size: 0.88rem;
    }

    .model-bar {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      flex-wrap: wrap;
    }

    .model-bar label.field {
      flex: 1 1 220px;
    }

    .dropzone {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 10px;
      border: 1.5px dashed rgba(148, 163, 184, 0.4);
      background: rgba(148, 163, 184, 0.06);
      font-size: 0.82rem;
    }

    .dropzone.active {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
    }

    .saved-models {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      font-size: 0.78rem;
    }

    .saved-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.35);
      background: rgba(148, 163, 184, 0.12);
    }

    .saved-pill.active {
      border-color: #38bdf8;
      background: rgba(2, 132, 199, 0.35);
    }

    .saved-pill button {
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 0 2px;
      font-size: 0.78rem;
      font-weight: 600;
    }

    button.btn,
    label.btn {
      appearance: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid rgba(148, 163, 184, 0.3);
      background: rgba(148, 163, 184, 0.14);
      color: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
    }

    button.btn:hover,
    label.btn:hover {
      background: rgba(148, 163, 184, 0.24);
    }

    button.btn.primary,
    label.btn.primary {
      background: #0284c7;
      border-color: transparent;
      color: #f8fafc;
    }

    button.btn.danger {
      color: #fda4af;
      border-color: rgba(251, 113, 133, 0.35);
    }

    label.btn input {
      display: none;
    }

    .toggles {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    label.check {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.84rem;
      cursor: pointer;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(148, 163, 184, 0.2);
    }

    .section-header h4 {
      margin: 0;
      font-size: 0.94rem;
    }

    .area-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid rgba(148, 163, 184, 0.22);
      background: rgba(148, 163, 184, 0.06);
    }

    .area-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .mesh-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip {
      padding: 4px 8px;
      border-radius: 999px;
      font-size: 0.75rem;
      border: 1px solid rgba(148, 163, 184, 0.32);
      background: transparent;
      color: inherit;
      cursor: pointer;
    }

    .chip.selected {
      background: #0284c7;
      border-color: #7dd3fc;
      color: #f8fafc;
    }

    .status {
      font-size: 0.78rem;
      opacity: 0.84;
    }

    .status.error {
      color: #fda4af;
    }
  `;
Ln([
  ts({ attribute: !1 })
], nn.prototype, "hass", 2);
Ln([
  dt()
], nn.prototype, "_config", 2);
Ln([
  dt()
], nn.prototype, "_discoveredMeshes", 2);
Ln([
  dt()
], nn.prototype, "_uploadedModels", 2);
Ln([
  dt()
], nn.prototype, "_inspectStatus", 2);
Ln([
  dt()
], nn.prototype, "_inspectError", 2);
Ln([
  dt()
], nn.prototype, "_dragActive", 2);
Ln([
  dt()
], nn.prototype, "_capturedView", 2);
nn = Ln([
  Po("home-3d-card-editor")
], nn);
var Qx = Object.defineProperty, e0 = Object.getOwnPropertyDescriptor, Dt = (i, e, t, n) => {
  for (var s = n > 1 ? void 0 : n ? e0(e, t) : e, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (s = (n ? a(e, t, s) : a(s)) || s);
  return n && s && Qx(e, t, s), s;
};
let yt = class extends hi {
  constructor() {
    super(...arguments), this._selectedAreaId = null, this._hoveredAreaId = null, this._panelModeOverride = null, this._labels = [], this._loading = !1, this._error = null, this._debugPick = null, this._discoveredMeshes = [], this._localUploadedUrl = null, this._localFileName = null, this._dragActive = !1, this._viewSavedFlash = !1, this.loadedModelUrl = null, this.handleExternalViewChange = (i) => {
      var t;
      const e = i.detail;
      !e || e.modelUrl !== this.getActiveModelUrl() || (this.sceneManager && !((t = this._config) != null && t.default_view) && this.sceneManager.setDefaultView(e.pose), this.requestUpdate());
    }, this.handleLocalFileSelect = (i) => {
      var n;
      const t = (n = i.target.files) == null ? void 0 : n[0];
      t && this.handleUploadFile(t);
    }, this.handleDrop = (i) => {
      var t, n;
      i.preventDefault(), this._dragActive = !1;
      const e = (n = (t = i.dataTransfer) == null ? void 0 : t.files) == null ? void 0 : n[0];
      e && this.handleUploadFile(e);
    }, this.clearSelection = () => {
      var i;
      this._selectedAreaId = null, (i = this.sceneManager) == null || i.resetView();
    }, this.handleSaveDefaultView = () => {
      const i = this.getActiveModelUrl();
      if (!this.sceneManager || !i || !this._config) return;
      const e = Kv(i, this.sceneManager.getCameraPose());
      this.sceneManager.setDefaultView(e), this._config = { ...this._config, default_view: e }, this._viewSavedFlash = !0, this.viewSavedTimer && window.clearTimeout(this.viewSavedTimer), this.viewSavedTimer = window.setTimeout(() => {
        this._viewSavedFlash = !1;
      }, 2200), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: this._config },
          bubbles: !0,
          composed: !0
        })
      );
    }, this.handleClearDefaultView = () => {
      const i = this.getActiveModelUrl();
      if (!this.sceneManager || !this._config) return;
      eu(i);
      const e = { ...this._config };
      delete e.default_view, this._config = e, this.sceneManager.setDefaultView(null), this.sceneManager.resetView(), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: e },
          bubbles: !0,
          composed: !0
        })
      );
    }, this.handleModeChange = (i) => {
      this._panelModeOverride = i.detail.mode;
    };
  }
  static getConfigElement() {
    return document.createElement("home-3d-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:home-3d-card",
      title: "My 3D Home",
      model_url: "",
      panel_mode: "slide-over",
      up_axis: "auto",
      card_height: 560,
      dim_unselected: !0,
      show_labels: !0,
      show_zone_overlay: !0,
      auto_map_area_meshes: !0,
      debug_picker: !1,
      areas: []
    };
  }
  setConfig(i) {
    var e, t;
    if (this._config = {
      title: "My 3D Home",
      model_url: "",
      panel_mode: "slide-over",
      up_axis: "auto",
      card_height: 560,
      dim_unselected: !0,
      show_labels: !0,
      show_zone_overlay: !0,
      auto_map_area_meshes: !0,
      debug_picker: !1,
      areas: [],
      ...i
    }, this._panelModeOverride = null, this._config.model_url && this._localUploadedUrl && (this._localUploadedUrl = null, this._localFileName = null), this.sceneManager) {
      this.sceneManager.updateOptions({
        upAxis: this._config.up_axis ?? "auto",
        dimUnselected: this._config.dim_unselected !== !1,
        showZoneOverlay: this._config.show_zone_overlay !== !1,
        debugPicker: !!this._config.debug_picker,
        darkMode: !!(((t = (e = this.hass) == null ? void 0 : e.themes) == null ? void 0 : t.darkMode) ?? !0),
        defaultView: this.getEffectiveDefaultView()
      });
      const n = this.getActiveModelUrl();
      n && this.loadedModelUrl !== n ? this.loadCurrentModel() : n ? this.sceneManager.setAreas(this.getEffectiveAreas()) : (this.loadedModelUrl = null, this._discoveredMeshes = [], this._labels = [], this._selectedAreaId = null, this._loading = !1, this.sceneManager.clearModel());
    }
  }
  getCardSize() {
    var i;
    return Math.ceil((((i = this._config) == null ? void 0 : i.card_height) ?? 560) / 50);
  }
  getActiveModelUrl() {
    var i, e;
    return ((e = (i = this._config) == null ? void 0 : i.model_url) == null ? void 0 : e.trim()) || this._localUploadedUrl || "";
  }
  getEffectiveDefaultView() {
    var i;
    return ((i = this._config) == null ? void 0 : i.default_view) ?? Qh(this.getActiveModelUrl());
  }
  getEffectiveAreas() {
    var t, n, s;
    const i = ((t = this._config) == null ? void 0 : t.areas) ?? [];
    if (((n = this._config) == null ? void 0 : n.auto_map_area_meshes) === !1)
      return i;
    const e = Jh(
      this._discoveredMeshes,
      (s = this.hass) == null ? void 0 : s.areas,
      i
    );
    return [...i, ...e];
  }
  firstUpdated() {
    var e, t;
    const i = this.renderRoot.querySelector(".canvas-host");
    !i || !this._config || (window.addEventListener("home-3d-default-view-changed", this.handleExternalViewChange), this.sceneManager = new qx({
      container: i,
      upAxis: this._config.up_axis ?? "auto",
      dimUnselected: this._config.dim_unselected !== !1,
      showZoneOverlay: this._config.show_zone_overlay !== !1,
      debugPicker: !!this._config.debug_picker,
      darkMode: !!(((t = (e = this.hass) == null ? void 0 : e.themes) == null ? void 0 : t.darkMode) ?? !0),
      defaultView: this.getEffectiveDefaultView(),
      onAreaSelect: (n) => {
        this._selectedAreaId = n;
      },
      onAreaHover: (n) => {
        this._hoveredAreaId = n;
      },
      onLabelsUpdate: (n) => {
        this._labels = n;
      },
      onDebugPick: (n) => {
        this._debugPick = n;
      },
      onLoadComplete: (n) => {
        var s;
        this._discoveredMeshes = n, (s = this.sceneManager) == null || s.setAreas(this.getEffectiveAreas()), this._loading = !1, this._error = null;
      },
      onLoadError: (n) => {
        this._loading = !1, this._error = `Failed to load 3D model (${n})`;
      }
    }), this.getActiveModelUrl() && this.loadCurrentModel());
  }
  updated(i) {
    var e;
    i.has("hass") && this.sceneManager && ((e = this.hass) != null && e.themes) && this.sceneManager.applyTheme(!!this.hass.themes.darkMode);
  }
  disconnectedCallback() {
    var i;
    super.disconnectedCallback(), window.removeEventListener("home-3d-default-view-changed", this.handleExternalViewChange), this.viewSavedTimer && window.clearTimeout(this.viewSavedTimer), (i = this.sceneManager) == null || i.dispose(), this.sceneManager = void 0;
  }
  async loadCurrentModel() {
    const i = this.getActiveModelUrl();
    !this.sceneManager || !this._config || !i || (this._loading = !0, this._error = null, this.loadedModelUrl = i, await this.sceneManager.loadModel(i, this.getEffectiveAreas()));
  }
  async handleUploadFile(i) {
    try {
      this._loading = !0, this._error = null;
      const e = await i.arrayBuffer(), { url: t } = await nu(i.name, e);
      this._localUploadedUrl = t, this._localFileName = i.name, this._selectedAreaId = null, this._config && (this._config = { ...this._config, model_url: t }), await this.loadCurrentModel();
    } catch (e) {
      this._loading = !1, this._error = `Upload failed (${e instanceof Error ? e.message : String(e)})`;
    }
  }
  selectArea(i) {
    var e;
    this._selectedAreaId = i, (e = this.sceneManager) == null || e.focusArea(i);
  }
  getSelectedArea() {
    return this.getEffectiveAreas().find((i) => i.id === this._selectedAreaId);
  }
  render() {
    if (!this._config) return Fe;
    const i = this._config.card_height ?? 560, e = this.getActiveModelUrl(), t = this.getEffectiveAreas(), n = this.getSelectedArea(), s = this._panelModeOverride ?? this._config.panel_mode ?? "slide-over";
    return Ne`
      <div class="card-shell">
        <div class="viewport-wrap" style="height: ${i}px">
          <div class="canvas-host"></div>

          <div class="topbar">
            <div class="brand-pill">
              <span>${this._config.title ?? "My 3D Home"}</span>
              ${this._localFileName ? Ne`<small>(Uploaded: ${this._localFileName})</small>` : Fe}
            </div>
            ${this._selectedAreaId || e ? Ne`
                  <div class="toolbar">
                    ${this._selectedAreaId ? Ne`<button @click=${this.clearSelection}>↺ Home Overview</button>` : Ne`
                          <span>${t.length > 0 ? "Click an area to inspect" : "Orbit & zoom to frame"}</span>
                          <button
                            @click=${this.handleSaveDefaultView}
                            title="Remember current camera position and zoom for first load"
                          >
                            ${this._viewSavedFlash ? "✓ Default Saved" : "⌖ Set Default"}
                          </button>
                          ${this.getEffectiveDefaultView() ? Ne`
                                <button
                                  @click=${this.handleClearDefaultView}
                                  title="Reset first-load camera to automatic fit"
                                >
                                  ↺ Auto
                                </button>
                              ` : Fe}
                        `}
                  </div>
                ` : Fe}
          </div>

          ${this._config.show_labels !== !1 ? Ne`
                <div class="labels-layer">
                  ${this._labels.filter((r) => r.visible).map((r) => {
      const a = t.find((c) => c.id === r.id), o = a ? ch(this.hass, a) : null, l = [];
      return o != null && o.primaryTemperature && l.push(o.primaryTemperature), o && o.activeApplianceCount > 0 && l.push(`${o.activeApplianceCount} on`), Ne`
                        <button
                          class="area-badge ${r.selected ? "selected" : ""} ${this._hoveredAreaId === r.id ? "hovered" : ""}"
                          style="left: ${r.x.toFixed(1)}px; top: ${r.y.toFixed(1)}px"
                          @click=${() => this.selectArea(r.id)}
                        >
                          <span class="badge-dot" style="background: ${r.color}"></span>
                          <span>${r.name}</span>
                          ${l.length > 0 ? Ne`<span class="badge-meta">· ${l.join(" · ")}</span>` : Fe}
                        </button>
                      `;
    })}
                </div>
              ` : Fe}

          ${e ? Fe : Ne`
                <div
                  class="onboarding ${this._dragActive ? "drag-active" : ""}"
                  @dragover=${(r) => {
      r.preventDefault(), this._dragActive = !0;
    }}
                  @dragleave=${() => {
      this._dragActive = !1;
    }}
                  @drop=${this.handleDrop}
                >
                  <h4>Upload or Select Your 3D Home (.glb)</h4>
                  <p>
                    Drag &amp; drop a <code>.glb</code> file here or click below to upload and save
                    it in this browser, or enter a <code>/local/...</code> path in Edit Card for
                    multi-device access.
                  </p>
                  <label class="upload-btn">
                    Upload .glb File
                    <input type="file" accept=".glb" @change=${this.handleLocalFileSelect} />
                  </label>
                </div>
              `}

          ${this._loading ? Ne`<div class="status-banner">Loading 3D home model…</div>` : Fe}
          ${this._error ? Ne`
                <div class="status-banner error">
                  <div>${this._error}</div>
                  ${zr(e) ? Ne`
                        <label class="upload-btn">
                          Upload .glb File Here
                          <input type="file" accept=".glb" @change=${this.handleLocalFileSelect} />
                        </label>
                      ` : Fe}
                </div>
              ` : Fe}
          ${this._config.debug_picker && this._debugPick ? Ne`
                <div class="debug-bar">
                  normX=${this._debugPick.normX}, normZ=${this._debugPick.normZ}
                  ${this._debugPick.meshName ? ` · mesh=${this._debugPick.meshName}` : ""}
                </div>
              ` : Fe}

          <home-3d-area-hud
            .hass=${this.hass}
            .area=${n}
            .mode=${s}
            @close-area=${this.clearSelection}
            @change-panel-mode=${this.handleModeChange}
          ></home-3d-area-hud>
        </div>
      </div>
    `;
  }
};
yt.styles = wo`
    :host {
      display: block;
    }

    ha-card,
    .card-shell {
      position: relative;
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 14px);
      background: var(--ha-card-background, #0f172a);
      color: var(--primary-text-color, #f8fafc);
      box-shadow: var(--ha-card-box-shadow, 0 8px 24px rgba(0, 0, 0, 0.22));
      font-family: var(--paper-font-body1_-_font-family, system-ui, -apple-system, sans-serif);
    }

    .viewport-wrap {
      position: relative;
      width: 100%;
    }

    .canvas-host {
      width: 100%;
      height: 100%;
    }

    .topbar {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      pointer-events: none;
      z-index: 10;
    }

    .brand-pill,
    .toolbar {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.72);
      color: #f8fafc;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(148, 163, 184, 0.22);
      font-size: 0.85rem;
      font-weight: 600;
    }

    .toolbar button {
      appearance: none;
      border: none;
      background: rgba(148, 163, 184, 0.16);
      color: #f8fafc;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
    }

    .toolbar button:hover {
      background: rgba(148, 163, 184, 0.3);
    }

    .labels-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 8;
    }

    .area-badge {
      pointer-events: auto;
      position: absolute;
      transform: translate(-50%, -100%);
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 8px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(15, 23, 42, 0.84);
      color: #f8fafc;
      font-size: 0.72rem;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      backdrop-filter: blur(8px);
      transition: transform 0.12s ease, border-color 0.12s ease;
      z-index: 1;
    }

    .area-badge:hover,
    .area-badge.hovered {
      transform: translate(-50%, -108%) scale(1.04);
      border-color: rgba(255, 255, 255, 0.55);
      z-index: 3;
    }

    .area-badge.selected {
      background: #0284c7;
      border-color: #7dd3fc;
      z-index: 4;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
    }

    .badge-meta {
      opacity: 0.8;
      font-weight: 500;
    }

    .status-banner,
    .onboarding {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 24px;
      border-radius: 14px;
      background: rgba(15, 23, 42, 0.92);
      color: #f8fafc;
      border: 1px solid rgba(148, 163, 184, 0.28);
      font-size: 0.9rem;
      z-index: 15;
      max-width: min(460px, calc(100% - 32px));
      text-align: center;
      backdrop-filter: blur(12px);
    }

    .onboarding.drag-active {
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25);
    }

    .onboarding h4 {
      margin: 0 0 8px 0;
      font-size: 1.05rem;
    }

    .onboarding p {
      margin: 0 0 12px 0;
      font-size: 0.84rem;
      line-height: 1.45;
      opacity: 0.86;
    }

    .onboarding code {
      background: rgba(148, 163, 184, 0.16);
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 0.8rem;
    }

    .upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 15px;
      border-radius: 10px;
      background: #0284c7;
      color: #f8fafc;
      font-size: 0.84rem;
      font-weight: 600;
      cursor: pointer;
    }

    .upload-btn:hover {
      background: #0369a1;
    }

    .upload-btn input {
      display: none;
    }

    .status-banner.error {
      border-color: #fb7185;
      color: #fecdd3;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }

    .debug-bar {
      position: absolute;
      left: 12px;
      bottom: 12px;
      padding: 6px 10px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.84);
      color: #bae6fd;
      border: 1px solid rgba(56, 189, 248, 0.35);
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.74rem;
      z-index: 12;
    }
  `;
Dt([
  ts({ attribute: !1 })
], yt.prototype, "hass", 2);
Dt([
  dt()
], yt.prototype, "_config", 2);
Dt([
  dt()
], yt.prototype, "_selectedAreaId", 2);
Dt([
  dt()
], yt.prototype, "_hoveredAreaId", 2);
Dt([
  dt()
], yt.prototype, "_panelModeOverride", 2);
Dt([
  dt()
], yt.prototype, "_labels", 2);
Dt([
  dt()
], yt.prototype, "_loading", 2);
Dt([
  dt()
], yt.prototype, "_error", 2);
Dt([
  dt()
], yt.prototype, "_debugPick", 2);
Dt([
  dt()
], yt.prototype, "_discoveredMeshes", 2);
Dt([
  dt()
], yt.prototype, "_localUploadedUrl", 2);
Dt([
  dt()
], yt.prototype, "_localFileName", 2);
Dt([
  dt()
], yt.prototype, "_dragActive", 2);
Dt([
  dt()
], yt.prototype, "_viewSavedFlash", 2);
yt = Dt([
  Po("home-3d-card")
], yt);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "home-3d-card",
  name: "Home 3D Dashboard Card",
  description: "Interactive 3D floorplan dashboard with click-to-maximize area sensors and appliances.",
  preview: !0
});
export {
  yt as Home3DCard
};
