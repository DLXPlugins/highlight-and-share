/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/click-to-share/edit.js":
/*!*******************************************!*\
  !*** ./src/blocks/click-to-share/edit.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/**
 * External dependencies
 */


var _wp$element = wp.element,
  Component = _wp$element.Component,
  Fragment = _wp$element.Fragment;
var __ = wp.i18n.__;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  RangeControl = _wp$components.RangeControl,
  SelectControl = _wp$components.SelectControl,
  TextControl = _wp$components.TextControl;
var _wp$blockEditor = wp.blockEditor,
  InspectorControls = _wp$blockEditor.InspectorControls,
  RichText = _wp$blockEditor.RichText,
  PanelColorSettings = _wp$blockEditor.PanelColorSettings;
var HAS_Click_To_Share = /*#__PURE__*/function (_Component) {
  _inherits(HAS_Click_To_Share, _Component);
  var _super = _createSuper(HAS_Click_To_Share);
  function HAS_Click_To_Share() {
    var _this;
    _classCallCheck(this, HAS_Click_To_Share);
    _this = _super.apply(this, arguments);
    _defineProperty(_assertThisInitialized(_this), "onChangeValue", function (value) {
      _this.setState({
        shareText: value
      });
    });
    _defineProperty(_assertThisInitialized(_this), "borderRoundedChange", function (value) {
      _this.setState({
        borderRadius: value
      });
    });
    _this.state = {
      shareText: __('Click to Share', 'highlight-and-share'),
      borderRadius: _this.props.attributes.borderRadius
    };
    return _this;
  }
  _createClass(HAS_Click_To_Share, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        _this$props$attribute = _this$props.attributes,
        shareText = _this$props$attribute.shareText,
        backgroundColor = _this$props$attribute.backgroundColor,
        textColor = _this$props$attribute.textColor,
        fontSize = _this$props$attribute.fontSize,
        clickText = _this$props$attribute.clickText,
        padding = _this$props$attribute.padding,
        border = _this$props$attribute.border,
        borderRadius = _this$props$attribute.borderRadius,
        borderColor = _this$props$attribute.borderColor,
        fontWeight = _this$props$attribute.fontWeight,
        clickShareFontSize = _this$props$attribute.clickShareFontSize,
        maxWidth = _this$props$attribute.maxWidth,
        alignment = _this$props$attribute.alignment,
        marginTop = _this$props$attribute.marginTop,
        marginRight = _this$props$attribute.marginRight,
        marginBottom = _this$props$attribute.marginBottom,
        marginLeft = _this$props$attribute.marginLeft,
        attributes = _this$props.attributes,
        isSelected = _this$props.isSelected,
        editable = _this$props.editable,
        className = _this$props.className,
        setAttributes = _this$props.setAttributes;
      var onChangeBackgroundColor = function onChangeBackgroundColor(value) {
        return setAttributes({
          backgroundColor: value
        });
      };
      var onChangeTextColor = function onChangeTextColor(value) {
        return setAttributes({
          textColor: value
        });
      };
      var onChangeBorderColor = function onChangeBorderColor(value) {
        return setAttributes({
          borderColor: value
        });
      };
      var hasStyles = {
        fontSize: fontSize + 'px',
        padding: padding + 'px',
        border: "".concat(border, "px solid ").concat(borderColor),
        borderRadius: borderRadius + 'px',
        backgroundColor: backgroundColor,
        color: textColor,
        maxWidth: "".concat(maxWidth, "%"),
        marginLeft: marginLeft + 'px',
        marginRight: marginRight + 'px',
        marginBottom: marginBottom + 'px',
        marginTop: marginTop + 'px'
      };
      if ('center' == alignment) {
        hasStyles.margin = '0 auto';
      }
      if ('left' == alignment) {
        hasStyles["float"] = 'left';
      }
      if ('right' == alignment) {
        hasStyles["float"] = 'right';
      }
      var fontWeightArr = Array();
      fontWeightArr.push({
        label: __('Normal', 'highlight-and-share'),
        value: 100
      });
      fontWeightArr.push({
        label: __('Bold', 'highlight-and-share'),
        value: 400
      });
      fontWeightArr.push({
        label: __('Bolder', 'highlight-and-share'),
        value: 700
      });
      var alignmentArr = Array();
      alignmentArr.push({
        label: __('Left', 'highlight-and-share'),
        value: 'left'
      });
      alignmentArr.push({
        label: __('center', 'highlight-and-share'),
        value: 'center'
      });
      alignmentArr.push({
        label: __('right', 'highlight-and-share'),
        value: 'right'
      });
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
        title: __('Highlight and Share Settings', 'highlight-and-share')
      }, /*#__PURE__*/React.createElement(PanelColorSettings, {
        title: __('Background Color', 'highlight-and-share'),
        initialOpen: false,
        colorSettings: [{
          value: backgroundColor,
          onChange: onChangeBackgroundColor,
          label: __('Background Color', 'highlight-and-share')
        }]
      }), /*#__PURE__*/React.createElement(PanelColorSettings, {
        title: __('Text Color', 'highlight-and-share'),
        initialOpen: false,
        colorSettings: [{
          value: textColor,
          onChange: onChangeTextColor,
          label: __('Text Color', 'highlight-and-share')
        }]
      }), /*#__PURE__*/React.createElement(SelectControl, {
        label: __('Font Weight', 'highlight-and-share'),
        value: fontWeight,
        options: fontWeightArr,
        onChange: function onChange(value) {
          setAttributes({
            fontWeight: value
          });
        }
      }), /*#__PURE__*/React.createElement(TextControl, {
        label: __('Click to Share Text', 'highlight-and-share'),
        value: clickText,
        onChange: function onChange(value) {
          _this2.props.setAttributes({
            clickText: value
          });
        }
      })), /*#__PURE__*/React.createElement(PanelBody, {
        title: __('Spacing and Font Settings', 'highlight-and-share'),
        initialOpen: false
      }, /*#__PURE__*/React.createElement(RangeControl, {
        label: __('Font Size', 'highlight-and-share'),
        value: fontSize,
        onChange: function onChange(value) {
          return _this2.props.setAttributes({
            fontSize: value
          });
        },
        min: 10,
        max: 40,
        step: 1
      }), /*#__PURE__*/React.createElement(RangeControl, {
        label: __('Click to Share Font Size', 'highlight-and-share'),
        value: clickShareFontSize,
        onChange: function onChange(value) {
          return _this2.props.setAttributes({
            clickShareFontSize: value
          });
        },
        min: 10,
        max: 40,
        step: 1
      }), /*#__PURE__*/React.createElement(RangeControl, {
        label: __('Padding', 'highlight-and-share'),
        value: padding,
        onChange: function onChange(value) {
          return _this2.props.setAttributes({
            padding: value
          });
        },
        min: 0,
        max: 60,
        step: 1
      }), /*#__PURE__*/React.createElement(RangeControl, {
        label: __('Border', 'highlight-and-share'),
        value: border,
        onChange: function onChange(value) {
          return _this2.props.setAttributes({
            border: value
          });
        },
        min: 0,
        max: 10,
        step: 1
      }), /*#__PURE__*/React.createElement(RangeControl, {
        label: __('Border Rounded', 'highlight-and-share'),
        value: this.state.borderRadius,
        onChange: function onChange(value) {
          _this2.borderRoundedChange(value);
          _this2.props.setAttributes({
            borderRadius: value
          });
        },
        min: 0,
        max: 30,
        step: 1
      }), /*#__PURE__*/React.createElement(PanelColorSettings, {
        title: __('Border Color', 'highlight-and-share'),
        initialOpen: false,
        colorSettings: [{
          value: borderColor,
          onChange: onChangeBorderColor,
          label: __('Border Color', 'highlight-and-share')
        }]
      })), /*#__PURE__*/React.createElement(PanelBody, {
        title: __('Alignment, Width, and Margins', 'highlight-and-share')
      }, /*#__PURE__*/React.createElement(RangeControl, {
        label: __('Max Width', 'highlight-and-share'),
        value: maxWidth,
        onChange: function onChange(value) {
          return _this2.props.setAttributes({
            maxWidth: value
          });
        },
        min: 0,
        max: 100,
        step: 5
      }), /*#__PURE__*/React.createElement(SelectControl, {
        label: __('Alignment', 'highlight-and-share'),
        value: alignment,
        options: alignmentArr,
        onChange: function onChange(value) {
          setAttributes({
            alignment: value
          });
        }
      }), /*#__PURE__*/React.createElement(RangeControl, {
        label: __('Margin Left', 'highlight-and-share'),
        value: marginLeft,
        onChange: function onChange(value) {
          return _this2.props.setAttributes({
            marginLeft: value
          });
        },
        min: 0,
        max: 20,
        step: 1
      }), /*#__PURE__*/React.createElement(RangeControl, {
        label: __('Margin Right', 'highlight-and-share'),
        value: marginRight,
        onChange: function onChange(value) {
          return _this2.props.setAttributes({
            marginRight: value
          });
        },
        min: 0,
        max: 20,
        step: 1
      }), /*#__PURE__*/React.createElement(RangeControl, {
        label: __('Margin Top', 'highlight-and-share'),
        value: marginTop,
        onChange: function onChange(value) {
          return _this2.props.setAttributes({
            marginTop: value
          });
        },
        min: 0,
        max: 20,
        step: 1
      }), /*#__PURE__*/React.createElement(RangeControl, {
        label: __('Margin Bottom', 'highlight-and-share'),
        value: marginBottom,
        onChange: function onChange(value) {
          return _this2.props.setAttributes({
            marginBottom: value
          });
        },
        min: 0,
        max: 20,
        step: 1
      }))), /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('has-click-to-share'),
        style: hasStyles
      }, /*#__PURE__*/React.createElement("div", {
        className: "has-click-to-share-wrapper"
      }, /*#__PURE__*/React.createElement(RichText, {
        tagName: "div",
        placeholder: __('Add share text', 'highlight-and-share'),
        value: shareText,
        className: "has-click-to-share-text",
        style: {
          color: textColor,
          fontSize: fontSize + 'px',
          fontWeight: fontWeight
        },
        allowedFormats: [],
        onChange: function onChange(value) {
          _this2.onChangeValue(value);
          setAttributes({
            shareText: value
          });
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "has-click-to-share-cta",
        style: {
          fontSize: clickShareFontSize
        }
      }, clickText, ' ', /*#__PURE__*/React.createElement("svg", {
        style: {
          width: clickShareFontSize,
          height: clickShareFontSize
        },
        "aria-hidden": "true",
        focusable: "false",
        "data-prefix": "fas",
        "data-icon": "share-alt",
        className: "svg-inline--fa fa-share-alt fa-w-14",
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 448 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
      })))))));
    }
  }]);
  return HAS_Click_To_Share;
}(Component);
/* harmony default export */ __webpack_exports__["default"] = (HAS_Click_To_Share);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/blocks/click-to-share/block.json":
/*!**********************************************!*\
  !*** ./src/blocks/click-to-share/block.json ***!
  \**********************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","title":"Bootstrap Alert","apiVersion":2,"name":"has/click-to-share","category":"text","icon":"<svg aria-hidden=\'true\' focusable=\'false\' data-prefix=\'fas\' data-icon=\'share-alt\' className=\'svg-inline--fa fa-share-alt fa-w-14\' role=\'img\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 448 512\'><path fill=\'currentColor\' d=\'M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z\'></path></svg>","description":"An easy-to-use content highlighter.","keywords":["click","social","tweet","better","twitter","facebook","share","quote","blockquote"],"version":"1.0.0","textdomain":"highlight-and-share","attributes":{"shareText":{"type":"string","default":""},"backgroundColor":{"type":"string","default":"#FFFFFF"},"textColor":{"type":"string","default":"#000000"},"fontSize":{"type":"integer","default":24},"clickShareFontSize":{"type":"integer","default":24},"clickText":{"type":"string","default":"Click to Share"},"padding":{"type":"integer","default":0},"border":{"type":"integer","default":true},"borderRadius":{"type":"integer","default":0},"borderColor":{"type":"string","default":"#FFFFFF"},"fontWeight":{"type":"string","default":"#FFFFFF"},"maxWidth":{"type":"integer","default":100},"alignment":{"type":"string","default":"center"},"marginLeft":{"type":"integer","default":0},"marginRight":{"type":"integer","default":0},"marginBottom":{"type":"integer","default":0},"marginTop":{"type":"integer","default":0}},"example":{"attributes":{"alertType":"success","alertTitle":"Sample alert title","alertDescription":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>","buttonEnabled":true,"baseFontSize":14,"buttonText":"Learn More","icon":"<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'currentColor\' className=\'bi bi-check\' viewBox=\'0 0 16 16\'><path d=\'M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z\' /></svg>"}},"supports":{"anchor":true,"align":true,"className":true},"editorScript":"has-click-to-share","editorStyle":"has-style-admin-css","style":"has-style-frontend-css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!********************************************!*\
  !*** ./src/blocks/click-to-share/block.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "name": function() { return /* binding */ name; }
/* harmony export */ });
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.json */ "./src/blocks/click-to-share/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/click-to-share/edit.js");

var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;

// Import JS


// Extend component
var Component = wp.element.Component;
var name = 'has/click-to-share';
registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_0__, {
  title: __('Highlight and Share: Click to Share', 'highlight-and-share'),
  // Block title.
  desription: __('A block for clicking and sharing text.', 'highlight-and-share'),
  icon: /*#__PURE__*/React.createElement("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "share-alt",
    className: "svg-inline--fa fa-share-alt fa-w-14",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
  })),
  category: 'common',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [__('click', 'highlight-and-share'), __('social', 'highlight-and-share'), __('better', 'highlight-and-share'), __('tweet', 'highlight-and-share'), __('twitter', 'highlight-and-share'), __('facebook', 'highlight-and-share'), __('share', 'highlight-and-share'), __('feature', 'highlight-and-share')],
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  // Render via PHP
  save: function save() {
    return null;
  }
});
}();
/******/ })()
;
//# sourceMappingURL=has-click-to-share.js.map