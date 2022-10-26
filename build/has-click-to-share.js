/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/click-to-share/edit.js":
/*!*******************************************!*\
  !*** ./src/blocks/click-to-share/edit.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);

/**
 * External dependencies
 */


const {
  Component,
  Fragment
} = wp.element;
const {
  __
} = wp.i18n;
const {
  PanelBody,
  RangeControl,
  SelectControl,
  TextControl
} = wp.components;
const {
  InspectorControls,
  RichText,
  PanelColorSettings
} = wp.blockEditor;
class HAS_Click_To_Share extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      shareText: __('Click to Share', 'highlight-and-share'),
      borderRadius: this.props.attributes.borderRadius
    };
  }
  onChangeValue = value => {
    this.setState({
      shareText: value
    });
  };
  borderRoundedChange = value => {
    this.setState({
      borderRadius: value
    });
  };
  render() {
    let {
      attributes: {
        shareText,
        backgroundColor,
        textColor,
        fontSize,
        clickText,
        padding,
        border,
        borderRadius,
        borderColor,
        fontWeight,
        clickShareFontSize,
        maxWidth,
        alignment,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft
      },
      attributes,
      isSelected,
      editable,
      className,
      setAttributes
    } = this.props;
    const onChangeBackgroundColor = value => setAttributes({
      backgroundColor: value
    });
    const onChangeTextColor = value => setAttributes({
      textColor: value
    });
    const onChangeBorderColor = value => setAttributes({
      borderColor: value
    });
    let hasStyles = {
      fontSize: fontSize + 'px',
      padding: padding + 'px',
      border: `${border}px solid ${borderColor}`,
      borderRadius: borderRadius + 'px',
      backgroundColor: backgroundColor,
      color: textColor,
      maxWidth: `${maxWidth}%`,
      marginLeft: marginLeft + 'px',
      marginRight: marginRight + 'px',
      marginBottom: marginBottom + 'px',
      marginTop: marginTop + 'px'
    };
    if ('center' == alignment) {
      hasStyles.margin = '0 auto';
    }
    if ('left' == alignment) {
      hasStyles.float = 'left';
    }
    if ('right' == alignment) {
      hasStyles.float = 'right';
    }
    let fontWeightArr = Array();
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
    let alignmentArr = Array();
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
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      title: __('Highlight and Share Settings', 'highlight-and-share')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelColorSettings, {
      title: __('Background Color', 'highlight-and-share'),
      initialOpen: false,
      colorSettings: [{
        value: backgroundColor,
        onChange: onChangeBackgroundColor,
        label: __('Background Color', 'highlight-and-share')
      }]
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelColorSettings, {
      title: __('Text Color', 'highlight-and-share'),
      initialOpen: false,
      colorSettings: [{
        value: textColor,
        onChange: onChangeTextColor,
        label: __('Text Color', 'highlight-and-share')
      }]
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      label: __('Font Weight', 'highlight-and-share'),
      value: fontWeight,
      options: fontWeightArr,
      onChange: value => {
        setAttributes({
          fontWeight: value
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      label: __('Click to Share Text', 'highlight-and-share'),
      value: clickText,
      onChange: value => {
        this.props.setAttributes({
          clickText: value
        });
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      title: __('Spacing and Font Settings', 'highlight-and-share'),
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: __('Font Size', 'highlight-and-share'),
      value: fontSize,
      onChange: value => this.props.setAttributes({
        fontSize: value
      }),
      min: 10,
      max: 40,
      step: 1
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: __('Click to Share Font Size', 'highlight-and-share'),
      value: clickShareFontSize,
      onChange: value => this.props.setAttributes({
        clickShareFontSize: value
      }),
      min: 10,
      max: 40,
      step: 1
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: __('Padding', 'highlight-and-share'),
      value: padding,
      onChange: value => this.props.setAttributes({
        padding: value
      }),
      min: 0,
      max: 60,
      step: 1
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: __('Border', 'highlight-and-share'),
      value: border,
      onChange: value => this.props.setAttributes({
        border: value
      }),
      min: 0,
      max: 10,
      step: 1
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: __('Border Rounded', 'highlight-and-share'),
      value: this.state.borderRadius,
      onChange: value => {
        this.borderRoundedChange(value);
        this.props.setAttributes({
          borderRadius: value
        });
      },
      min: 0,
      max: 30,
      step: 1
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelColorSettings, {
      title: __('Border Color', 'highlight-and-share'),
      initialOpen: false,
      colorSettings: [{
        value: borderColor,
        onChange: onChangeBorderColor,
        label: __('Border Color', 'highlight-and-share')
      }]
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      title: __('Alignment, Width, and Margins', 'highlight-and-share')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: __('Max Width', 'highlight-and-share'),
      value: maxWidth,
      onChange: value => this.props.setAttributes({
        maxWidth: value
      }),
      min: 0,
      max: 100,
      step: 5
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      label: __('Alignment', 'highlight-and-share'),
      value: alignment,
      options: alignmentArr,
      onChange: value => {
        setAttributes({
          alignment: value
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: __('Margin Left', 'highlight-and-share'),
      value: marginLeft,
      onChange: value => this.props.setAttributes({
        marginLeft: value
      }),
      min: 0,
      max: 20,
      step: 1
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: __('Margin Right', 'highlight-and-share'),
      value: marginRight,
      onChange: value => this.props.setAttributes({
        marginRight: value
      }),
      min: 0,
      max: 20,
      step: 1
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: __('Margin Top', 'highlight-and-share'),
      value: marginTop,
      onChange: value => this.props.setAttributes({
        marginTop: value
      }),
      min: 0,
      max: 20,
      step: 1
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
      label: __('Margin Bottom', 'highlight-and-share'),
      value: marginBottom,
      onChange: value => this.props.setAttributes({
        marginBottom: value
      }),
      min: 0,
      max: 20,
      step: 1
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('has-click-to-share'),
      style: hasStyles
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "has-click-to-share-wrapper"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText, {
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
      onChange: value => {
        this.onChangeValue(value);
        setAttributes({
          shareText: value
        });
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "has-click-to-share-cta",
      style: {
        fontSize: clickShareFontSize
      }
    }, clickText, ' ', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
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
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      fill: "currentColor",
      d: "M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
    })))))));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HAS_Click_To_Share);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

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

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "./src/blocks/click-to-share/block.json":
/*!**********************************************!*\
  !*** ./src/blocks/click-to-share/block.json ***!
  \**********************************************/
/***/ ((module) => {

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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************************!*\
  !*** ./src/blocks/click-to-share/block.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "name": () => (/* binding */ name)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/click-to-share/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/click-to-share/edit.js");


const {
  __
} = wp.i18n;
const {
  registerBlockType
} = wp.blocks;

// Import JS


// Extend component
const {
  Component
} = wp.element;
const name = 'has/click-to-share';
registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_1__, {
  title: __('Highlight and Share: Click to Share', 'highlight-and-share'),
  // Block title.
  desription: __('A block for clicking and sharing text.', 'highlight-and-share'),
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "share-alt",
    className: "svg-inline--fa fa-share-alt fa-w-14",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "currentColor",
    d: "M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
  })),
  category: 'common',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [__('click', 'highlight-and-share'), __('social', 'highlight-and-share'), __('better', 'highlight-and-share'), __('tweet', 'highlight-and-share'), __('twitter', 'highlight-and-share'), __('facebook', 'highlight-and-share'), __('share', 'highlight-and-share'), __('feature', 'highlight-and-share')],
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  // Render via PHP
  save() {
    return null;
  }
});
})();

/******/ })()
;
//# sourceMappingURL=has-click-to-share.js.map