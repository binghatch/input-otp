var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/input.tsx
import * as React3 from "react";

// src/regexp.ts
var REGEXP_ONLY_DIGITS = "^\\d+$";
var REGEXP_ONLY_CHARS = "^[a-zA-Z]+$";
var REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]+$";

// src/sync-timeouts.ts
function syncTimeouts(cb) {
  const t1 = setTimeout(cb, 0);
  const t2 = setTimeout(cb, 10);
  const t3 = setTimeout(cb, 50);
  return [t1, t2, t3];
}

// src/use-previous.ts
import * as React from "react";
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// src/use-pwm-badge.tsx
import * as React2 from "react";
var PWM_BADGE_MARGIN_RIGHT = 18;
var PWM_BADGE_SPACE_WIDTH_PX = 40;
var PWM_BADGE_SPACE_WIDTH = `${PWM_BADGE_SPACE_WIDTH_PX}px`;
var PASSWORD_MANAGERS_SELECTORS = [
  "[data-lastpass-icon-root]",
  // LastPass
  "com-1password-button",
  // 1Password
  "[data-dashlanecreated]",
  // Dashlane
  '[style$="2147483647 !important;"]'
  // Bitwarden
].join(",");
function usePasswordManagerBadge({
  containerRef,
  inputRef,
  pushPasswordManagerStrategy,
  isFocused
}) {
  const pwmMetadata = React2.useRef({
    done: false,
    refocused: false
  });
  const [hasPWMBadge, setHasPWMBadge] = React2.useState(false);
  const [hasPWMBadgeSpace, setHasPWMBadgeSpace] = React2.useState(false);
  const [done, setDone] = React2.useState(false);
  const willPushPWMBadge = React2.useMemo(() => {
    if (pushPasswordManagerStrategy === "none") {
      return false;
    }
    const increaseWidthCase = (pushPasswordManagerStrategy === "increase-width" || // TODO: remove 'experimental-no-flickering' support in 2.0.0
    pushPasswordManagerStrategy === "experimental-no-flickering") && hasPWMBadge && hasPWMBadgeSpace;
    return increaseWidthCase;
  }, [hasPWMBadge, hasPWMBadgeSpace, pushPasswordManagerStrategy]);
  const trackPWMBadge = React2.useCallback(() => {
    const container = containerRef.current;
    const input = inputRef.current;
    if (!container || !input || done || pushPasswordManagerStrategy === "none") {
      return;
    }
    const elementToCompare = container;
    const rightCornerX = elementToCompare.getBoundingClientRect().left + elementToCompare.offsetWidth;
    const centereredY = elementToCompare.getBoundingClientRect().top + elementToCompare.offsetHeight / 2;
    const x = rightCornerX - PWM_BADGE_MARGIN_RIGHT;
    const y = centereredY;
    const pmws = document.querySelectorAll(PASSWORD_MANAGERS_SELECTORS);
    if (pmws.length === 0) {
      const maybeBadgeEl = document.elementFromPoint(x, y);
      if (maybeBadgeEl === container) {
        return;
      }
    }
    setHasPWMBadge(true);
    setDone(true);
    if (!pwmMetadata.current.refocused && document.activeElement === input) {
      const sel = [input.selectionStart, input.selectionEnd];
      input.blur();
      input.focus();
      input.setSelectionRange(sel[0], sel[1]);
      pwmMetadata.current.refocused = true;
    }
  }, [containerRef, inputRef, done, pushPasswordManagerStrategy]);
  React2.useEffect(() => {
    const container = containerRef.current;
    if (!container || pushPasswordManagerStrategy === "none") {
      return;
    }
    function checkHasSpace() {
      const viewportWidth = window.innerWidth;
      const distanceToRightEdge = viewportWidth - container.getBoundingClientRect().right;
      setHasPWMBadgeSpace(distanceToRightEdge >= PWM_BADGE_SPACE_WIDTH_PX);
    }
    checkHasSpace();
    const interval = setInterval(checkHasSpace, 1e3);
    return () => {
      clearInterval(interval);
    };
  }, [containerRef, pushPasswordManagerStrategy]);
  React2.useEffect(() => {
    const _isFocused = isFocused || document.activeElement === inputRef.current;
    if (pushPasswordManagerStrategy === "none" || !_isFocused) {
      return;
    }
    const t1 = setTimeout(trackPWMBadge, 0);
    const t2 = setTimeout(trackPWMBadge, 2e3);
    const t3 = setTimeout(trackPWMBadge, 5e3);
    const t4 = setTimeout(() => {
      setDone(true);
    }, 6e3);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [inputRef, isFocused, pushPasswordManagerStrategy, trackPWMBadge]);
  return { hasPWMBadge, willPushPWMBadge, PWM_BADGE_SPACE_WIDTH };
}

// src/input.tsx
var OTPInputContext = React3.createContext(
  {}
);
var OTPInput = React3.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      value: uncheckedValue,
      onChange: uncheckedOnChange,
      maxLength,
      textAlign = "left",
      pattern = REGEXP_ONLY_DIGITS,
      inputMode = "numeric",
      onComplete,
      pushPasswordManagerStrategy = "increase-width",
      containerClassName,
      noScriptCSSFallback = NOSCRIPT_CSS_FALLBACK,
      render,
      children
    } = _b, props = __objRest(_b, [
      "value",
      "onChange",
      "maxLength",
      "textAlign",
      "pattern",
      "inputMode",
      "onComplete",
      "pushPasswordManagerStrategy",
      "containerClassName",
      "noScriptCSSFallback",
      "render",
      "children"
    ]);
    var _a2, _b2, _c, _d, _e;
    const [internalValue, setInternalValue] = React3.useState(
      typeof props.defaultValue === "string" ? props.defaultValue : ""
    );
    const value = uncheckedValue != null ? uncheckedValue : internalValue;
    const previousValue = usePrevious(value);
    const onChange = React3.useCallback(
      (newValue) => {
        uncheckedOnChange == null ? void 0 : uncheckedOnChange(newValue);
        setInternalValue(newValue);
      },
      [uncheckedOnChange]
    );
    const regexps = React3.useMemo(() => {
      if (typeof pattern === "string") {
        return Array(maxLength).fill(new RegExp(pattern));
      } else {
        return pattern.map((p) => p.regex);
      }
    }, [pattern, maxLength]);
    const inputRef = React3.useRef(null);
    const containerRef = React3.useRef(null);
    const initialLoadRef = React3.useRef({
      value,
      onChange,
      isIOS: typeof window !== "undefined" && ((_b2 = (_a2 = window == null ? void 0 : window.CSS) == null ? void 0 : _a2.supports) == null ? void 0 : _b2.call(_a2, "-webkit-touch-callout", "none"))
    });
    const inputMetadataRef = React3.useRef({
      prev: [
        (_c = inputRef.current) == null ? void 0 : _c.selectionStart,
        (_d = inputRef.current) == null ? void 0 : _d.selectionEnd,
        (_e = inputRef.current) == null ? void 0 : _e.selectionDirection
      ]
    });
    React3.useImperativeHandle(ref, () => inputRef.current, []);
    React3.useEffect(() => {
      const input = inputRef.current;
      const container = containerRef.current;
      if (!input || !container) {
        return;
      }
      if (initialLoadRef.current.value !== input.value) {
        initialLoadRef.current.onChange(input.value);
      }
      inputMetadataRef.current.prev = [
        input.selectionStart,
        input.selectionEnd,
        input.selectionDirection
      ];
      function onDocumentSelectionChange() {
        if (document.activeElement !== input) {
          setMirrorSelectionStart(null);
          setMirrorSelectionEnd(null);
          return;
        }
        const _s = input.selectionStart;
        const _e2 = input.selectionEnd;
        const _dir = input.selectionDirection;
        const _ml = input.maxLength;
        const _val = input.value;
        const _prev = inputMetadataRef.current.prev;
        let start = -1;
        let end = -1;
        let direction = void 0;
        if (_val.length !== 0 && _s !== null && _e2 !== null) {
          const isSingleCaret = _s === _e2;
          const isInsertMode = _s === _val.length && _val.length < _ml;
          if (isSingleCaret && !isInsertMode) {
            const c = _s;
            if (c === 0) {
              start = 0;
              end = 1;
              direction = "forward";
            } else if (c === _ml) {
              start = c - 1;
              end = c;
              direction = "backward";
            } else if (_ml > 1 && _val.length > 1) {
              let offset = 0;
              if (_prev[0] !== null && _prev[1] !== null) {
                direction = c < _prev[1] ? "backward" : "forward";
                const wasPreviouslyInserting = _prev[0] === _prev[1] && _prev[0] < _ml;
                if (direction === "backward" && !wasPreviouslyInserting) {
                  offset = -1;
                }
              }
              start = offset + c;
              end = offset + c + 1;
            }
          }
          if (start !== -1 && end !== -1 && start !== end) {
            inputRef.current.setSelectionRange(start, end, direction);
          }
        }
        const s = start !== -1 ? start : _s;
        const e = end !== -1 ? end : _e2;
        const dir = direction != null ? direction : _dir;
        setMirrorSelectionStart(s);
        setMirrorSelectionEnd(e);
        inputMetadataRef.current.prev = [s, e, dir];
      }
      document.addEventListener("selectionchange", onDocumentSelectionChange, {
        capture: true
      });
      onDocumentSelectionChange();
      document.activeElement === input && setIsFocused(true);
      if (!document.getElementById("input-otp-style")) {
        const styleEl = document.createElement("style");
        styleEl.id = "input-otp-style";
        document.head.appendChild(styleEl);
        if (styleEl.sheet) {
          const autofillStyles = "background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";
          safeInsertRule(
            styleEl.sheet,
            "[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"
          );
          safeInsertRule(
            styleEl.sheet,
            `[data-input-otp]:autofill { ${autofillStyles} }`
          );
          safeInsertRule(
            styleEl.sheet,
            `[data-input-otp]:-webkit-autofill { ${autofillStyles} }`
          );
          safeInsertRule(
            styleEl.sheet,
            `@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }`
          );
          safeInsertRule(
            styleEl.sheet,
            `[data-input-otp] + * { pointer-events: all !important; }`
          );
        }
      }
      const updateRootHeight = () => {
        if (container) {
          container.style.setProperty(
            "--root-height",
            `${input.clientHeight}px`
          );
        }
      };
      updateRootHeight();
      const resizeObserver = new ResizeObserver(updateRootHeight);
      resizeObserver.observe(input);
      return () => {
        document.removeEventListener(
          "selectionchange",
          onDocumentSelectionChange,
          { capture: true }
        );
        resizeObserver.disconnect();
      };
    }, []);
    const [isHoveringInput, setIsHoveringInput] = React3.useState(false);
    const [isFocused, setIsFocused] = React3.useState(false);
    const [mirrorSelectionStart, setMirrorSelectionStart] = React3.useState(null);
    const [mirrorSelectionEnd, setMirrorSelectionEnd] = React3.useState(null);
    React3.useEffect(() => {
      syncTimeouts(() => {
        var _a3, _b3, _c2, _d2;
        (_a3 = inputRef.current) == null ? void 0 : _a3.dispatchEvent(new Event("input"));
        const s = (_b3 = inputRef.current) == null ? void 0 : _b3.selectionStart;
        const e = (_c2 = inputRef.current) == null ? void 0 : _c2.selectionEnd;
        const dir = (_d2 = inputRef.current) == null ? void 0 : _d2.selectionDirection;
        if (s !== null && e !== null) {
          setMirrorSelectionStart(s);
          setMirrorSelectionEnd(e);
          inputMetadataRef.current.prev = [s, e, dir];
        }
      });
    }, [value, isFocused]);
    React3.useEffect(() => {
      if (previousValue === void 0) {
        return;
      }
      if (value !== previousValue && previousValue.length < maxLength && value.length === maxLength) {
        onComplete == null ? void 0 : onComplete(value);
      }
    }, [maxLength, onComplete, previousValue, value]);
    const pwmb = usePasswordManagerBadge({
      containerRef,
      inputRef,
      pushPasswordManagerStrategy,
      isFocused
    });
    const _changeListener = React3.useCallback(
      (e) => {
        const newValue = e.currentTarget.value.slice(0, maxLength);
        let isValid = true;
        Array.from(newValue).forEach((char, index) => {
          if (Array.isArray(pattern)) {
            if (pattern[index] && !pattern[index].regex.test(char)) {
              isValid = false;
            }
          } else {
            const regex = new RegExp(pattern);
            if (!regex.test(char)) {
              isValid = false;
            }
          }
        });
        if (!isValid) {
          e.preventDefault();
          return;
        }
        const maybeHasDeleted = typeof previousValue === "string" && newValue.length < previousValue.length;
        if (maybeHasDeleted) {
          document.dispatchEvent(new Event("selectionchange"));
        }
        onChange(newValue);
      },
      [maxLength, onChange, previousValue, pattern]
      // Ensure 'pattern' is included in dependency array
    );
    const _focusListener = React3.useCallback(() => {
      var _a3;
      if (inputRef.current) {
        const start = Math.min(inputRef.current.value.length, maxLength - 1);
        const end = inputRef.current.value.length;
        (_a3 = inputRef.current) == null ? void 0 : _a3.setSelectionRange(start, end);
        setMirrorSelectionStart(start);
        setMirrorSelectionEnd(end);
      }
      setIsFocused(true);
    }, [maxLength]);
    const _pasteListener = React3.useCallback(
      (e) => {
        const input = inputRef.current;
        if (!initialLoadRef.current.isIOS || !e.clipboardData || !input) {
          return;
        }
        const content = e.clipboardData.getData("text/plain");
        e.preventDefault();
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const isReplacing = start !== end;
        const newValueUncapped = isReplacing ? value.slice(0, start) + content + value.slice(end) : value.slice(0, start) + content + value.slice(start);
        const newValue = newValueUncapped.slice(0, maxLength);
        let isValid = true;
        Array.from(newValue).forEach((char, index) => {
          if (Array.isArray(pattern)) {
            if (pattern[index] && !pattern[index].regex.test(char)) {
              isValid = false;
            }
          } else {
            const regex = new RegExp(pattern);
            if (!regex.test(char)) {
              isValid = false;
            }
          }
        });
        if (!isValid) {
          return;
        }
        input.value = newValue;
        onChange(newValue);
        const _start = Math.min(newValue.length, maxLength - 1);
        const _end = newValue.length;
        input.setSelectionRange(_start, _end);
        setMirrorSelectionStart(_start);
        setMirrorSelectionEnd(_end);
      },
      [maxLength, onChange, pattern, value]
      // Update dependencies to include pattern
    );
    const rootStyle = React3.useMemo(
      () => ({
        position: "relative",
        cursor: props.disabled ? "default" : "text",
        userSelect: "none",
        WebkitUserSelect: "none",
        pointerEvents: "none"
      }),
      [props.disabled]
    );
    const inputStyle = React3.useMemo(
      () => ({
        position: "absolute",
        inset: 0,
        width: pwmb.willPushPWMBadge ? `calc(100% + ${pwmb.PWM_BADGE_SPACE_WIDTH})` : "100%",
        clipPath: pwmb.willPushPWMBadge ? `inset(0 ${pwmb.PWM_BADGE_SPACE_WIDTH} 0 0)` : void 0,
        height: "100%",
        display: "flex",
        textAlign,
        opacity: "1",
        // Mandatory for iOS hold-paste
        color: "transparent",
        pointerEvents: "all",
        background: "transparent",
        caretColor: "transparent",
        border: "0 solid transparent",
        outline: "0 solid transparent",
        boxShadow: "none",
        lineHeight: "1",
        letterSpacing: "-.5em",
        fontSize: "var(--root-height)",
        fontFamily: "monospace",
        fontVariantNumeric: "tabular-nums"
        // letterSpacing: '-1em',
        // transform: 'scale(1.5)',
        // paddingRight: '100%',
        // paddingBottom: '100%',
        // debugging purposes
        // inset: undefined,
        // position: undefined,
        // color: 'black',
        // background: 'white',
        // opacity: '1',
        // caretColor: 'black',
        // padding: '0',
        // letterSpacing: 'unset',
        // fontSize: 'unset',
        // paddingInline: '.5rem',
      }),
      [pwmb.PWM_BADGE_SPACE_WIDTH, pwmb.willPushPWMBadge, textAlign]
    );
    const renderedInput = React3.useMemo(
      () => /* @__PURE__ */ React3.createElement(
        "input",
        __spreadProps(__spreadValues({
          autoComplete: props.autoComplete || "one-time-code"
        }, props), {
          "data-input-otp": true,
          "data-input-otp-mss": mirrorSelectionStart,
          "data-input-otp-mse": mirrorSelectionEnd,
          inputMode,
          style: inputStyle,
          maxLength,
          value,
          ref: inputRef,
          onPaste: (e) => {
            var _a3;
            _pasteListener(e);
            (_a3 = props.onPaste) == null ? void 0 : _a3.call(props, e);
          },
          onChange: _changeListener,
          onMouseOver: (e) => {
            var _a3;
            setIsHoveringInput(true);
            (_a3 = props.onMouseOver) == null ? void 0 : _a3.call(props, e);
          },
          onMouseLeave: (e) => {
            var _a3;
            setIsHoveringInput(false);
            (_a3 = props.onMouseLeave) == null ? void 0 : _a3.call(props, e);
          },
          onFocus: (e) => {
            var _a3;
            _focusListener();
            (_a3 = props.onFocus) == null ? void 0 : _a3.call(props, e);
          },
          onBlur: (e) => {
            var _a3;
            setIsFocused(false);
            (_a3 = props.onBlur) == null ? void 0 : _a3.call(props, e);
          }
        })
      ),
      [
        _changeListener,
        _focusListener,
        _pasteListener,
        inputMode,
        inputStyle,
        maxLength,
        mirrorSelectionEnd,
        mirrorSelectionStart,
        props,
        value
      ]
    );
    const contextValue = React3.useMemo(() => {
      return {
        slots: Array.from({ length: maxLength }).map((_, slotIdx) => {
          const isActive = isFocused && mirrorSelectionStart !== null && mirrorSelectionEnd !== null && (mirrorSelectionStart === mirrorSelectionEnd && slotIdx === mirrorSelectionStart || slotIdx >= mirrorSelectionStart && slotIdx < mirrorSelectionEnd);
          const char = value[slotIdx] !== void 0 ? value[slotIdx] : null;
          return {
            char,
            isActive,
            hasFakeCaret: isActive && char === null
          };
        }),
        isFocused,
        isHovering: !props.disabled && isHoveringInput
      };
    }, [
      isFocused,
      isHoveringInput,
      maxLength,
      mirrorSelectionEnd,
      mirrorSelectionStart,
      props.disabled,
      value
    ]);
    const renderedChildren = React3.useMemo(() => {
      if (render) {
        return render(contextValue);
      }
      return /* @__PURE__ */ React3.createElement(OTPInputContext.Provider, { value: contextValue }, children);
    }, [children, contextValue, render]);
    return /* @__PURE__ */ React3.createElement(React3.Fragment, null, noScriptCSSFallback !== null && /* @__PURE__ */ React3.createElement("noscript", null, /* @__PURE__ */ React3.createElement("style", null, noScriptCSSFallback)), /* @__PURE__ */ React3.createElement(
      "div",
      {
        ref: containerRef,
        "data-input-otp-container": true,
        style: rootStyle,
        className: containerClassName
      },
      renderedChildren,
      /* @__PURE__ */ React3.createElement(
        "div",
        {
          style: {
            position: "absolute",
            inset: 0,
            pointerEvents: "none"
          }
        },
        renderedInput
      )
    ));
  }
);
OTPInput.displayName = "Input";
function safeInsertRule(sheet, rule) {
  try {
    sheet.insertRule(rule);
  } catch (e) {
    console.error("input-otp could not insert CSS rule:", rule);
  }
}
var NOSCRIPT_CSS_FALLBACK = `
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`;
export {
  OTPInput,
  OTPInputContext,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS
};
//# sourceMappingURL=index.mjs.map