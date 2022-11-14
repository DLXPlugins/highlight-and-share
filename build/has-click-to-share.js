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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../react/Components/ColorPicker */ "./src/react/Components/ColorPicker/index.js");
/* harmony import */ var _react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../react/Components/DimensionsBlock */ "./src/react/Components/DimensionsBlock/index.js");
/* harmony import */ var _react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../react/Hooks/useDeviceType */ "./src/react/Hooks/useDeviceType.js");
/* harmony import */ var _react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../react/Utils/DimensionsHelper */ "./src/react/Utils/DimensionsHelper.js");
/* harmony import */ var _react_Components_unit_picker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../react/Components/unit-picker */ "./src/react/Components/unit-picker/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * External dependencies
 */








var __ = wp.i18n.__;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  PanelRow = _wp$components.PanelRow,
  RangeControl = _wp$components.RangeControl,
  SelectControl = _wp$components.SelectControl,
  TextControl = _wp$components.TextControl,
  ButtonGroup = _wp$components.ButtonGroup,
  Button = _wp$components.Button,
  BaseControl = _wp$components.BaseControl;
var _wp$blockEditor = wp.blockEditor,
  InspectorControls = _wp$blockEditor.InspectorControls,
  RichText = _wp$blockEditor.RichText,
  useBlockProps = _wp$blockEditor.useBlockProps;
var useInstanceId = wp.compose.useInstanceId;
var HAS_Click_To_Share = function HAS_Click_To_Share(props) {
  var _useDeviceType = (0,_react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_4__["default"])('Desktop'),
    _useDeviceType2 = _slicedToArray(_useDeviceType, 2),
    deviceType = _useDeviceType2[0],
    setDeviceType = _useDeviceType2[1];
  var generatedUniqueId = useInstanceId(HAS_Click_To_Share, 'has-cts');
  var attributes = props.attributes,
    setAttributes = props.setAttributes;
  var shareText = attributes.shareText,
    backgroundColor = attributes.backgroundColor,
    backgroundColorHover = attributes.backgroundColorHover,
    textColor = attributes.textColor,
    textColorHover = attributes.textColorHover,
    shareTextColor = attributes.shareTextColor,
    shareTextColorHover = attributes.shareTextColorHover,
    fontSize = attributes.fontSize,
    clickText = attributes.clickText,
    padding = attributes.padding,
    border = attributes.border,
    borderRadius = attributes.borderRadius,
    borderColor = attributes.borderColor,
    iconColor = attributes.iconColor,
    iconColorHover = attributes.iconColorHover,
    borderColorHover = attributes.borderColorHover,
    fontWeight = attributes.fontWeight,
    clickShareFontSize = attributes.clickShareFontSize,
    maxWidth = attributes.maxWidth,
    maxWidthUnit = attributes.maxWidthUnit,
    alignment = attributes.alignment,
    align = attributes.align,
    marginTop = attributes.marginTop,
    marginRight = attributes.marginRight,
    marginBottom = attributes.marginBottom,
    marginLeft = attributes.marginLeft,
    marginSize = attributes.marginSize,
    paddingSize = attributes.paddingSize,
    borderWidth = attributes.borderWidth,
    borderRadiusSize = attributes.borderRadiusSize,
    uniqueId = attributes.uniqueId;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    // Set unique ID for block (for styling).
    setAttributes({
      uniqueId: generatedUniqueId
    });

    // Port padding to new dimensions object.
    if (padding !== -1) {
      var portPadding = paddingSize;
      portPadding.desktop = {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding,
        unit: 'px',
        unitSync: true
      };
      setAttributes({
        paddingSize: portPadding,
        padding: -1
      });
    }
    // Port margin to new dimensions object.
    if (marginTop !== -1) {
      var portMargin = marginSize;
      portMargin.desktop = {
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
        unit: 'px',
        unitSync: true
      };
      setAttributes({
        marginSize: portMargin,
        marginTop: -1
      });
    }
    // Port border width to new dimensions object.
    if (border !== -1) {
      var portBorderWidth = borderWidth;
      portBorderWidth.desktop = {
        top: border,
        right: border,
        bottom: border,
        left: border,
        unit: 'px',
        unitSync: true
      };
      setAttributes({
        borderWidth: portBorderWidth,
        border: -1
      });
    }
    // Port border radius to new dimensions object.
    if (borderRadius !== -1) {
      var portBorderRadius = borderRadiusSize;
      portBorderRadius.desktop = {
        top: borderRadius,
        right: borderRadius,
        bottom: borderRadius,
        left: borderRadius,
        unit: 'px',
        unitSync: true
      };
      setAttributes({
        borderRadiusSize: portBorderRadius,
        borderRadius: -1
      });
    }

    // Port alignment over to align variable.
    if (alignment !== 'none') {
      setAttributes({
        align: alignment,
        alignment: 'none'
      });
    }
  }, []);
  var hasStyles = {
    fontSize: fontSize + 'px',
    padding: (0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.buildDimensionsCSS)(paddingSize, deviceType),
    borderWidth: (0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.buildDimensionsCSS)(borderWidth, deviceType),
    borderRadius: (0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.buildDimensionsCSS)(borderRadiusSize, deviceType),
    maxWidth: "".concat(maxWidth).concat(maxWidthUnit),
    margin: (0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.buildDimensionsCSS)(marginSize, deviceType)
  };
  var styles = "\n\t\t#".concat(uniqueId, ".has-click-to-share {\n\t\t\tbackground-color: ").concat(backgroundColor, ";\n\t\t\tborder-color: ").concat(borderColor, ";\n\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share:hover {\n\t\t\tbackground-color: ").concat(backgroundColorHover, ";\n\t\t\tborder-color: ").concat(borderColorHover, ";\n\t\t}\n\t\t\n\t\t#").concat(uniqueId, " .has-click-to-share-cta {\n\t\t\tcolor: ").concat(shareTextColor, "\n\t\t}\n\t\t#").concat(uniqueId, ":hover .has-click-to-share-cta {\n\t\t\tcolor: ").concat(shareTextColorHover, "\n\t\t}\n\t\t#").concat(uniqueId, " .has-click-to-share-text {\n\t\t\tcolor: ").concat(textColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ":hover .has-click-to-share-text {\n\t\t\tcolor: ").concat(textColorHover, ";\n\t\t}\n\t\t#").concat(uniqueId, " .has-click-to-share-cta svg {\n\t\t\tcolor: ").concat(iconColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ":hover .has-click-to-share-cta svg {\n\t\t\tcolor: ").concat(iconColorHover, ";\n\t\t}\n\t");
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

  /* For sticky responsive: forked from GenerateBlocks */
  var panelHeader = document.querySelector('.edit-post-sidebar .edit-post-sidebar__panel-tabs');
  var panelHeaderHeight = panelHeader ? panelHeader.offsetHeight : 0;
  var inspectorControls = /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement("div", {
    id: "has-screensize-group",
    className: "has-screensize-variants",
    style: {
      top: panelHeaderHeight + 'px'
    }
  }, /*#__PURE__*/React.createElement(ButtonGroup, null, /*#__PURE__*/React.createElement(Button, {
    variant: deviceType === 'Desktop' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setDeviceType('Desktop');
    },
    icon: "laptop",
    iconSize: "14",
    label: __('Desktop', 'highlight-and-share')
  }), /*#__PURE__*/React.createElement(Button, {
    variant: deviceType === 'Tablet' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setDeviceType('Tablet');
    },
    icon: "tablet",
    label: __('Tablet', 'highlight-and-share')
  }), /*#__PURE__*/React.createElement(Button, {
    variant: deviceType === 'Mobile' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setDeviceType('Mobile');
    },
    icon: "smartphone",
    label: __('Mobile', 'highlight-and-share')
  }))), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Container Settings', 'highlight-and-share'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-unit-picker"
  }, /*#__PURE__*/React.createElement(_react_Components_unit_picker__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: __('Maximum Width', 'quotes-dlx'),
    value: maxWidthUnit,
    units: ['px', '%', 'vw'],
    onClick: function onClick(value) {
      setAttributes({
        maxWidthUnit: value
      });
    }
  }), /*#__PURE__*/React.createElement(TextControl, {
    type: 'text',
    value: maxWidth,
    onChange: function onChange(value) {
      setAttributes({
        maxWidth: value
      });
    }
  })), /*#__PURE__*/React.createElement("div", null, "Max Width"), /*#__PURE__*/React.createElement("div", null, "Background Image")), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Colors', 'highlight-and-share'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: backgroundColor,
    key: 'background-color',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        backgroundColor: newValue
      });
    },
    label: __('Background Color', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: backgroundColor,
    slug: 'background-color'
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: backgroundColorHover,
    key: 'background-color-hover',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        backgroundColorHover: newValue
      });
    },
    label: __('Background Color Hover', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: backgroundColorHover,
    slug: 'background-color-hover'
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: textColor,
    key: 'text-color',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        textColor: newValue
      });
    },
    label: __('Text Color', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: textColor,
    slug: 'text-color'
  }), ' '), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: textColorHover,
    key: 'text-color-hover',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        textColorHover: newValue
      });
    },
    label: __('Text Color Hover', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: textColorHover,
    slug: 'text-color-hover'
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: shareTextColor,
    key: 'share-text-color',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        shareTextColor: newValue
      });
    },
    label: __('Share Text Color', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: shareTextColor,
    slug: 'share-text-color'
  }), ' '), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: shareTextColorHover,
    key: 'share-text-color-hover',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        shareTextColorHover: newValue
      });
    },
    label: __('Share Text Color Hover', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: shareTextColorHover,
    slug: 'share-text-color-hover'
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: borderColor,
    key: 'border-color',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        borderColor: newValue
      });
    },
    label: __('Border Color', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: borderColor,
    slug: 'border-color'
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: borderColorHover,
    key: 'border-color-hover',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        borderColorHover: newValue
      });
    },
    label: __('Border Color Hover', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: borderColorHover,
    slug: 'border-color-hover'
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: iconColor,
    key: 'icon-color',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        iconColor: newValue
      });
    },
    label: __('Icon Color', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: iconColor,
    slug: 'icon-color'
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: iconColorHover,
    key: 'icon-color-hover',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        iconColorHover: newValue
      });
    },
    label: __('Icon Color Hover', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: iconColorHover,
    slug: 'icon-color-hover'
  }))), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Fonts and Typography', 'highlight-and-share'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement("div", null, "Coming Soon")), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Spacing and Border', 'highlight-and-share'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Inner Padding', 'highlight-and-share'),
    allowNegatives: false,
    values: paddingSize,
    labelTop: __('Top', 'highlight-and-share'),
    labelRight: __('Right', 'highlight-and-share'),
    labelBottom: __('Bottom', 'highlight-and-share'),
    labelLeft: __('Left', 'highlight-and-share'),
    units: ['px', 'em', 'rem'],
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        paddingSize: newValues
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Outer Margin', 'highlight-and-share'),
    allowNegatives: false,
    values: marginSize,
    labelTop: __('Top', 'highlight-and-share'),
    labelRight: __('Right', 'highlight-and-share'),
    labelBottom: __('Bottom', 'highlight-and-share'),
    labelLeft: __('Left', 'highlight-and-share'),
    units: ['px', 'em', 'rem'],
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        marginSize: newValues
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Border Width', 'highlight-and-share'),
    allowNegatives: false,
    values: borderWidth,
    labelTop: __('Top', 'highlight-and-share'),
    labelRight: __('Right', 'highlight-and-share'),
    labelBottom: __('Bottom', 'highlight-and-share'),
    labelLeft: __('Left', 'highlight-and-share'),
    units: ['px', 'em', 'rem'],
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        borderWidth: newValues
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: __('Border Radius', 'highlight-and-share'),
    allowNegatives: false,
    values: borderRadiusSize,
    labelTop: __('T-Left', 'highlight-and-share'),
    labelRight: __('T-Right', 'highlight-and-share'),
    labelBottom: __('B-Right', 'highlight-and-share'),
    labelLeft: __('B-Left', 'highlight-and-share'),
    units: ['px', 'em', 'rem'],
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        borderRadiusSize: newValues
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: borderColor,
    key: 'border-color',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        borderColor: newValue
      });
    },
    label: __('Border Color', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: borderColor,
    slug: 'border-color'
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: borderColorHover,
    key: 'border-color-hover',
    onChange: function onChange(slug, newValue) {
      setAttributes({
        borderColorHover: newValue
      });
    },
    label: __('Border Color Hover', 'highlight-and-share'),
    defaultColors: has_gutenberg.colorPalette,
    defaultColor: borderColorHover,
    slug: 'border-color-hover'
  }))), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Highlight and Share Settings', 'highlight-and-share')
  }, /*#__PURE__*/React.createElement(SelectControl, {
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
      setAttributes({
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
      return setAttributes({
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
      return setAttributes({
        clickShareFontSize: value
      });
    },
    min: 10,
    max: 40,
    step: 1
  }), /*#__PURE__*/React.createElement(RangeControl, {
    label: __('Border', 'highlight-and-share'),
    value: border,
    onChange: function onChange(value) {
      return setAttributes({
        border: value
      });
    },
    min: 0,
    max: 10,
    step: 1
  }), /*#__PURE__*/React.createElement(RangeControl, {
    label: __('Border Rounded', 'highlight-and-share'),
    value: borderRadius,
    onChange: function onChange(value) {
      setAttributes({
        borderRadius: value
      });
    },
    min: 0,
    max: 30,
    step: 1
  })));
  var block = /*#__PURE__*/React.createElement(React.Fragment, null, inspectorControls, /*#__PURE__*/React.createElement("style", null, styles), /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('has-click-to-share'),
    style: hasStyles,
    id: uniqueId
  }, /*#__PURE__*/React.createElement("div", {
    className: "has-click-to-share-wrapper"
  }, /*#__PURE__*/React.createElement(RichText, {
    tagName: "div",
    multiline: "p",
    placeholder: __('Add share text', 'highlight-and-share'),
    value: shareText,
    className: "has-click-to-share-text",
    allowedFormats: ['core/bold', 'core/italic', 'core/text-color', 'core/subscript', 'core/superscript', 'core/strikethrough'],
    onChange: function onChange(value) {
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
  }))))));
  var blockProps = useBlockProps({
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()("highlight-and-share", "align".concat(align))
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", blockProps, block));
};
/* harmony default export */ __webpack_exports__["default"] = (HAS_Click_To_Share);

/***/ }),

/***/ "./src/react/Components/ColorPicker/index.js":
/*!***************************************************!*\
  !*** ./src/react/Components/ColorPicker/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var hex_to_rgba__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hex-to-rgba */ "./node_modules/hex-to-rgba/build/index.js");
/* harmony import */ var hex_to_rgba__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hex_to_rgba__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */






var HASColorPicker = function HASColorPicker(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.slug),
    _useState2 = _slicedToArray(_useState, 2),
    colorKey = _useState2[0],
    setColorKey = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isVisible = _useState4[0],
    setIsVisible = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.value),
    _useState6 = _slicedToArray(_useState5, 2),
    color = _useState6[0],
    setColor = _useState6[1];
  var defaultColor = props.defaultColor,
    defaultColors = props.defaultColors,
    value = props.value,
    _onChange = props.onChange,
    onOpacityChange = props.onOpacityChange,
    label = props.label,
    _props$alpha = props.alpha,
    alpha = _props$alpha === void 0 ? false : _props$alpha,
    valueOpacity = props.valueOpacity,
    slug = props.slug;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setColor(value);
  }, [value]);

  // Retrieve colors while avoiding duplicates.
  var getDefaultColors = function getDefaultColors() {
    var existingColors = [];
    var newColors = [];
    defaultColors.forEach(function (maybeNewColor, index) {
      if (!existingColors.includes(maybeNewColor.color)) {
        existingColors.push(maybeNewColor.color);
        newColors.push(maybeNewColor);
      }
    });
    return newColors;
  };
  var opacityIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fad",
    "data-icon": "tint",
    className: "svg-inline--fa fa-tint fa-w-11",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 352 512"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", {
    className: "fa-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    className: "fa-secondary",
    fill: "currentColor",
    d: "M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448A112.14 112.14 0 0 1 64 336a16 16 0 0 1 32 0 80.09 80.09 0 0 0 80 80 16 16 0 0 1 0 32z",
    opacity: "0.4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    className: "fa-primary",
    fill: "currentColor",
    d: "M176 448A112.14 112.14 0 0 1 64 336a16 16 0 0 1 32 0 80.09 80.09 0 0 0 80 80 16 16 0 0 1 0 32z"
  })));

  /**
   * Toggle whether the color popup is showing.
   */
  var toggleVisible = function toggleVisible() {
    setIsVisible(true);
  };

  /**
   * Close color popup if visible.
   */
  var toggleClose = function toggleClose() {
    if (isVisible) {
      setIsVisible(false);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, {
    className: "has-component-color-picker-wrapper"
  }, !!label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-color-component-label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, label)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-component-color-picker"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-color-picker-area has-component-color-picker-palette"
  }, !isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('components-color-palette__item-wrapper components-circular-option-picker__option-wrapper has-color-picker-area has-component-color-picker-palette', value ? '' : 'components-color-palette__custom-color')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose Color', 'quotes-dlx')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    "aria-expanded": isVisible,
    className: "components-button components-circular-option-picker__option is-pressed",
    onClick: toggleVisible,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom color picker', 'quotes-dlx'),
    style: {
      background: color ? hex_to_rgba__WEBPACK_IMPORTED_MODULE_2___default()(color, valueOpacity) : 'transparent'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-color-palette__custom-color-gradient"
  }))))), isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('components-color-palette__item-wrapper components-circular-option-picker__option-wrapper has-color-picker-area has-component-color-picker-palette', value ? '' : 'components-color-palette__custom-color')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose Color', 'quotes-dlx')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    "aria-expanded": isVisible,
    className: "components-button components-circular-option-picker__option is-pressed",
    onClick: toggleClose,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom color picker', 'quotes-dlx'),
    style: {
      background: color ? hex_to_rgba__WEBPACK_IMPORTED_MODULE_2___default()(color, valueOpacity) : 'transparent'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-color-palette__custom-color-gradient"
  })))), isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Popover, {
    className: "has-component-color-picker",
    onClose: toggleClose,
    noArrow: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, {
    key: colorKey
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
    key: colorKey,
    color: color,
    onChangeComplete: function onChangeComplete(newColor) {
      setColor(newColor.hex);
      _onChange(slug, newColor.hex);
    },
    disableAlpha: true,
    defaultValue: defaultColor
  })), alpha && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-component-color-opacity"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Opacity', 'quotes-dlx')
  }, opacityIcon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    value: valueOpacity ? valueOpacity : 0,
    onChange: function onChange(opacityValue) {
      return onOpacityChange(opacityValue);
    },
    min: 0,
    max: 1,
    step: 0.01,
    initialPosition: 1
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, {
    className: "has-component-color-picker-palette"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    colors: getDefaultColors(),
    value: color,
    onChange: function onChange(newColor) {
      _onChange(slug, newColor);
      setColor(newColor);
      setColorKey(newColor);
    },
    disableCustomColors: true,
    clearable: false
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-color-clear-color"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: function onClick() {
      _onChange(slug, defaultColor);
      setColorKey(defaultColor);
      setColor(defaultColor);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Color', 'quotes-dlx')))))));
};
/* harmony default export */ __webpack_exports__["default"] = (HASColorPicker);

/***/ }),

/***/ "./src/react/Components/DimensionsBlock/index.js":
/*!*******************************************************!*\
  !*** ./src/react/Components/DimensionsBlock/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/react/Components/DimensionsBlock/editor.scss");
/* harmony import */ var _unit_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../unit-picker */ "./src/react/Components/unit-picker/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Utils/DimensionsHelper */ "./src/react/Utils/DimensionsHelper.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Dimensions Component.
 * Credit: Forked from @GenerateBlocks
 */


/**
 * External dependencies
 */







var DimensionsControlBlock = function DimensionsControlBlock(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('desktop'),
    _useState2 = _slicedToArray(_useState, 2),
    screenSize = _useState2[0],
    setScreenSize = _useState2[1];
  var getDefaultValues = function getDefaultValues() {
    return {
      mobile: {
        top: props.values.mobile.top,
        right: props.values.mobile.right,
        bottom: props.values.mobile.bottom,
        left: props.values.mobile.left,
        unit: props.values.mobile.unit,
        unitSync: props.values.mobile.unitSync
      },
      tablet: {
        top: props.values.tablet.top,
        right: props.values.tablet.right,
        bottom: props.values.tablet.bottom,
        left: props.values.tablet.left,
        unit: props.values.tablet.unit,
        unitSync: props.values.tablet.unitSync
      },
      desktop: {
        top: props.values.desktop.top,
        right: props.values.desktop.right,
        bottom: props.values.desktop.bottom,
        left: props.values.desktop.left,
        unit: props.values.desktop.unit,
        unitSync: props.values.desktop.unitSync
      }
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useForm)({
      defaultValues: getDefaultValues()
    }),
    register = _useForm.register,
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues,
    reset = _useForm.reset,
    trigger = _useForm.trigger;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useWatch)({
    control: control
  });
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors,
    isDirty = _useFormState.isDirty,
    dirtyFields = _useFormState.dirtyFields,
    touchedFields = _useFormState.touchedFields;
  var _props$label = props.label,
    label = _props$label === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Padding', 'highlight-and-share') : _props$label,
    _props$labelTop = props.labelTop,
    labelTop = _props$labelTop === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Top', 'highlight-and-share') : _props$labelTop,
    _props$labelRight = props.labelRight,
    labelRight = _props$labelRight === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Right', 'highlight-and-share') : _props$labelRight,
    _props$labelBottom = props.labelBottom,
    labelBottom = _props$labelBottom === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Bottom', 'highlight-and-share') : _props$labelBottom,
    _props$labelLeft = props.labelLeft,
    labelLeft = _props$labelLeft === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Left', 'highlight-and-share') : _props$labelLeft,
    units = props.units,
    onValuesChange = props.onValuesChange;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    onValuesChange(formValues);
  }, [formValues]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setScreenSize(props.screenSize.toLowerCase());
    setValue(props.screenSize.toLowerCase(), getValues(props.screenSize.toLowerCase()));
  }, [props.screenSize]);
  /**
   * Change the all values in parent.
   *
   * @param {number} value Value to change to.
   */
  var changeAllValues = function changeAllValues(value) {
    var values = getValues(screenSize);
    values.top = value;
    values.right = value;
    values.bottom = value;
    values.left = value;
    setValue(screenSize, values);
  };

  /**
   * When the sync value is selected, sync all values to the maximum number.
   */
  var syncUnits = function syncUnits() {
    // Toggle unit sync value.
    var values = getValues(screenSize);
    values.unitSync = !values.unitSync;
    setValue(screenSize, values);

    // If we're syncing, set all values to the maximum.
    if (values.unitSync) {
      var numbers = [getValues(screenSize).top, getValues(screenSize).right, getValues(screenSize).bottom, getValues(screenSize).left];
      var syncValue = Math.max.apply(null, numbers);
      changeAllValues(syncValue);
    }
  };

  /**
   * Change the units.
   *
   * @param {string} value Unit changing (px, em, rem, vh).
   */
  var onChangeUnits = function onChangeUnits(value) {
    var values = getValues(screenSize);
    values.unit = value;
    setValue(screenSize, values);
  };
  var onDimensionChange = function onDimensionChange(value) {
    if ((0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.getHierarchicalValueUnitSync)(props.values, screenSize, getValues(screenSize).unitSync)) {
      changeAllValues(value);
    }
  };
  var syncIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fad",
    "data-icon": "sync",
    className: "svg-inline--fa fa-sync fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", {
    className: "fa-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    className: "fa-secondary",
    fill: "currentColor",
    d: "M0 500V299.67a12 12 0 0 1 12-12h200.33a12 12 0 0 1 12 12v47.41a12 12 0 0 1-12.57 12l-101.87-4.88a176.07 176.07 0 0 0 317.25-56.94 12 12 0 0 1 11.67-9.26h49.09a12 12 0 0 1 11.8 14.18C478.07 417.08 377.19 504 256 504a247.43 247.43 0 0 1-188.76-87.17l4.13 82.57a12 12 0 0 1-12 12.6H12a12 12 0 0 1-12-12z",
    opacity: "0.4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    className: "fa-primary",
    fill: "currentColor",
    d: "M12.3 209.82C33.93 94.92 134.81 8 256 8a247.4 247.4 0 0 1 188.9 87.34l-4-82.77A12 12 0 0 1 452.92 0h47.41a12 12 0 0 1 12 12v200.33a12 12 0 0 1-12 12H300a12 12 0 0 1-12-12v-47.41a12 12 0 0 1 12.57-12l101.53 4.88a176.07 176.07 0 0 0-317.24 56.94A12 12 0 0 1 73.19 224H24.1a12 12 0 0 1-11.8-14.18z"
  })));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-base-control components-has-dimensions-control"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_7__.Controller, {
    name: "".concat(screenSize, ".unit"),
    control: control,
    render: function render(_ref) {
      var _ref$field = _ref.field,
        onChange = _ref$field.onChange,
        value = _ref$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_unit_picker__WEBPACK_IMPORTED_MODULE_2__["default"], {
        label: label,
        value: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.getHierarchicalValueUnit)(props.values, screenSize, getValues(screenSize).unit),
        units: units,
        onClick: function onClick(newValue) {
          onChange(newValue);
          onChangeUnits(newValue);
        }
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-dimensions-control__inputs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_7__.Controller, {
    name: "".concat(screenSize, ".top"),
    control: control,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
        value: getValues(screenSize).top,
        type: "number",
        label: labelTop,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).top, 'top')
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_7__.Controller, {
    name: "".concat(screenSize, ".right"),
    control: control,
    render: function render(_ref3) {
      var _ref3$field = _ref3.field,
        _onChange2 = _ref3$field.onChange,
        value = _ref3$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
        value: getValues(screenSize).right,
        type: "number",
        label: labelRight,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange2(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).right, 'right')
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_7__.Controller, {
    name: "".concat(screenSize, ".bottom"),
    control: control,
    render: function render(_ref4) {
      var _ref4$field = _ref4.field,
        _onChange3 = _ref4$field.onChange,
        value = _ref4$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
        value: getValues(screenSize).bottom,
        type: "number",
        label: labelBottom,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange3(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).bottom, 'bottom')
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_7__.Controller, {
    name: "".concat(screenSize, ".left"),
    control: control,
    render: function render(_ref5) {
      var _getValues$left;
      var _ref5$field = _ref5.field,
        _onChange4 = _ref5$field.onChange,
        value = _ref5$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
        value: (_getValues$left = getValues(screenSize).left) !== null && _getValues$left !== void 0 ? _getValues$left : 0,
        type: "number",
        label: labelLeft,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange4(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).left, 'left')
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
    text: !!getValues(screenSize).unitSync ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Unsync', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sync', 'highlight-and-share')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    className: "components-has-dimensions-control_sync",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sync Units', 'generateblocks'),
    isPrimary: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.getHierarchicalValueUnitSync)(props.values, screenSize, getValues(screenSize).unitSync),
    "aria-pressed": (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_6__.getHierarchicalValueUnitSync)(props.values, screenSize, getValues(screenSize).unitSync)
    // eslint-disable-next-line no-unused-vars
    ,
    onClick: function onClick(value) {
      return syncUnits();
    },
    isSmall: true
  }, syncIcon))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-dimensions-control__input-labels"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-has-dimensions-control__number-label"
  }, labelTop), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-has-dimensions-control__number-label"
  }, labelRight), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-has-dimensions-control__number-label"
  }, labelBottom), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-has-dimensions-control__number-label"
  }, labelLeft), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "components-has-dimensions-control__number-label"
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (DimensionsControlBlock);

/***/ }),

/***/ "./src/react/Components/unit-picker/index.js":
/*!***************************************************!*\
  !*** ./src/react/Components/unit-picker/index.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/react/Components/unit-picker/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Unit Picker Component.
 * Credit: Forked from @GenerateBlocks
 */




var UnitChooser = function UnitChooser(props) {
  var label = props.label,
    value = props.value,
    _onClick = props.onClick,
    units = props.units;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-units-control-header__units"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-units-control-label__units"
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-control__units"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {
    className: "components-has-control-buttons__units",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Units', 'highlight-and-share')
  }, units.map(function (unit) {
    var unitName = unit;
    if ('px' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Pixel', 'A size unit for CSS markup', 'highlight-and-share');
    }
    if ('em' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Em', 'A size unit for CSS markup', 'highlight-and-share');
    }
    if ('%' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Percentage', 'A size unit for CSS markup', 'highlight-and-share');
    }
    if ('vw' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('View Width', 'A size unit for CSS markup', 'highlight-and-share');
    }
    if ('rem' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Rem', 'A size unit for CSS markup', 'highlight-and-share');
    }
    if ('deg' === unit) {
      unitName = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Degree', 'A size unit for CSS markup', 'highlight-and-share');
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: Unit type (px, em, %) */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%s Units', 'highlight-and-share'), unitName),
      key: unit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      key: unit,
      className: 'components-has-control-button__units--' + unit,
      isSmall: true,
      isPrimary: value === unit,
      "aria-pressed": value === unit,
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%s Units', 'highlight-and-share'), unitName),
      onClick: function onClick() {
        return _onClick(unit);
      }
    }, unit));
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (UnitChooser);

/***/ }),

/***/ "./src/react/Hooks/useDeviceType.js":
/*!******************************************!*\
  !*** ./src/react/Hooks/useDeviceType.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



/* Credits: Forked from GenerateBlocks */

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)('core/edit-post'),
    _useDispatch$__experi = _useDispatch.__experimentalSetPreviewDeviceType,
    setPreviewDeviceType = _useDispatch$__experi === void 0 ? function () {} : _useDispatch$__experi;
  var deviceType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(function (select) {
    var _select = select('core/edit-post'),
      _select$__experimenta = _select.__experimentalGetPreviewDeviceType,
      experimentalGetPreviewDeviceType = _select$__experimenta === void 0 ? function () {
        return false;
      } : _select$__experimenta;
    return experimentalGetPreviewDeviceType();
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {}, [deviceType]);
  var setDeviceType = function setDeviceType(type) {
    setPreviewDeviceType(type);
  };
  return [deviceType, setDeviceType];
});

/***/ }),

/***/ "./src/react/Utils/DimensionsHelper.js":
/*!*********************************************!*\
  !*** ./src/react/Utils/DimensionsHelper.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildDimensionsCSS": function() { return /* binding */ buildDimensionsCSS; },
/* harmony export */   "geHierarchicalPlaceholderValue": function() { return /* binding */ geHierarchicalPlaceholderValue; },
/* harmony export */   "getHierarchicalValueUnit": function() { return /* binding */ getHierarchicalValueUnit; },
/* harmony export */   "getHierarchicalValueUnitSync": function() { return /* binding */ getHierarchicalValueUnitSync; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShorthandCSS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShorthandCSS */ "./src/react/Utils/ShorthandCSS.js");



/**
 * Build CSS rules for dimensions and screen size.
 *
 * @param {Object} props      Dimensions array (see /components/DimensionsBlock).
 * @param {string} screenSize mobile|tablet|desktop.
 *
 * @return {string} CSS rules.
 */
function buildDimensionsCSS(props, screenSize) {
  screenSize = screenSize.toLowerCase();
  var dimensions = props[screenSize];
  if ('desktop' === screenSize) {
    var top = dimensions.top;
    var right = dimensions.right;
    var bottom = dimensions.bottom;
    var left = dimensions.left;
    var unit = dimensions.unit;
    return (0,_ShorthandCSS__WEBPACK_IMPORTED_MODULE_1__["default"])(top, right, bottom, left, unit);
  }
  if ('tablet' === screenSize || 'mobile' === screenSize) {
    var _top = geHierarchicalPlaceholderValue(props, screenSize, dimensions.top, 'top');
    var _right = geHierarchicalPlaceholderValue(props, screenSize, dimensions.right, 'right');
    var _bottom = geHierarchicalPlaceholderValue(props, screenSize, dimensions.bottom, 'bottom');
    var _left = geHierarchicalPlaceholderValue(props, screenSize, dimensions.left, 'left');
    var _unit = getHierarchicalValueUnit(props, screenSize, dimensions.unit);
    return (0,_ShorthandCSS__WEBPACK_IMPORTED_MODULE_1__["default"])(_top, _right, _bottom, _left, _unit);
  }
  return '';
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 * @param {string} type       Type of value (top, right, bottom, left, etc.).
 *
 * @return {string} Value placeholder.
 */
function geHierarchicalPlaceholderValue(props, screenSize, value, type) {
  // Check mobile screen size.
  if ('mobile' === screenSize && '' === value) {
    // Check tablet.
    if ('' !== props.tablet[type]) {
      return props.tablet[type];
    } else if ('' !== props.desktop[type]) {
      // Check desktop.
      return props.desktop[type];
    }
  }

  // Check tablet screen size.
  if ('tablet' === screenSize && '' === value) {
    if ('' !== props.desktop[type]) {
      // Check desktop.
      return props.desktop[type];
    }
  }
  if ('' !== value) {
    return value;
  }
  return '0';
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 *
 * @return {string} Value default or hierarchical value.
 */
function getHierarchicalValueUnit(props, screenSize, value) {
  // Check mobile screen size.
  if ('mobile' === screenSize && null === value) {
    if (null === props.tablet.unit) {
      return props.desktop.unit;
    }
    return props.tablet.unit;
  }
  if ('tablet' === screenSize && null === value) {
    return props.desktop.unit;
  }
  if (null === value) {
    return 'px';
  }
  return value;
}

/**
 * Get a value based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 *
 * @return {boolean} Value default or hierarchical value.
 */
function getHierarchicalValueUnitSync(props, screenSize, value) {
  // Check mobile screen size.
  if ('mobile' === screenSize && null === value) {
    if (null === props.tablet.unitSync) {
      return props.desktop.unitSync;
    }
    return props.tablet.unitSync;
  }
  if ('tablet' === screenSize && null === value) {
    return props.desktop.unitSync;
  }
  if (null === value) {
    return true;
  }
  return value;
}

/***/ }),

/***/ "./src/react/Utils/ShorthandCSS.js":
/*!*****************************************!*\
  !*** ./src/react/Utils/ShorthandCSS.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ shorthandCSS; }
/* harmony export */ });
/* Credits: Forked from GenerateBlocks */
function shorthandCSS(top, right, bottom, left, unit) {
  if ('' === top && '' === right && '' === bottom && '' === left) {
    return;
  }
  top = parseFloat(top) != 0 && '' !== top ? parseFloat(top) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq
  right = parseFloat(right) != 0 && '' !== right ? parseFloat(right) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq
  bottom = parseFloat(bottom) != 0 && '' !== bottom ? parseFloat(bottom) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq
  left = parseFloat(left) != 0 && '' !== left ? parseFloat(left) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq

  if (right === left) {
    left = '';
    if (top === bottom) {
      bottom = '';
      if (top === right) {
        right = '';
      }
    }
  }
  var output = top + right + bottom + left;
  return output.trim();
}

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

/***/ "./node_modules/hex-to-rgba/build/index.js":
/*!*************************************************!*\
  !*** ./node_modules/hex-to-rgba/build/index.js ***!
  \*************************************************/
/***/ (function(module) {

"use strict";


var removeHash = function removeHash(hex) {
  return hex.charAt(0) === '#' ? hex.slice(1) : hex;
};

var parseHex = function parseHex(nakedHex) {
  var isShort = nakedHex.length === 3 || nakedHex.length === 4;
  var twoDigitHexR = isShort ? "".concat(nakedHex.slice(0, 1)).concat(nakedHex.slice(0, 1)) : nakedHex.slice(0, 2);
  var twoDigitHexG = isShort ? "".concat(nakedHex.slice(1, 2)).concat(nakedHex.slice(1, 2)) : nakedHex.slice(2, 4);
  var twoDigitHexB = isShort ? "".concat(nakedHex.slice(2, 3)).concat(nakedHex.slice(2, 3)) : nakedHex.slice(4, 6);
  var twoDigitHexA = (isShort ? "".concat(nakedHex.slice(3, 4)).concat(nakedHex.slice(3, 4)) : nakedHex.slice(6, 8)) || 'ff'; // const numericA = +((parseInt(a, 16) / 255).toFixed(2));

  return {
    r: twoDigitHexR,
    g: twoDigitHexG,
    b: twoDigitHexB,
    a: twoDigitHexA
  };
};

var hexToDecimal = function hexToDecimal(hex) {
  return parseInt(hex, 16);
};

var hexesToDecimals = function hexesToDecimals(_ref) {
  var r = _ref.r,
      g = _ref.g,
      b = _ref.b,
      a = _ref.a;
  return {
    r: hexToDecimal(r),
    g: hexToDecimal(g),
    b: hexToDecimal(b),
    a: +(hexToDecimal(a) / 255).toFixed(2)
  };
};

var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}; // eslint-disable-line no-restricted-globals, max-len


var formatRgb = function formatRgb(decimalObject, parameterA) {
  var r = decimalObject.r,
      g = decimalObject.g,
      b = decimalObject.b,
      parsedA = decimalObject.a;
  var a = isNumeric(parameterA) ? parameterA : parsedA;
  return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
};
/**
 * Turns an old-fashioned css hex color value into a rgb color value.
 *
 * If you specify an alpha value, you'll get a rgba() value instead.
 *
 * @param The hex value to convert. ('123456'. '#123456', ''123', '#123')
 * @param An alpha value to apply. (optional) ('0.5', '0.25')
 * @return An rgb or rgba value. ('rgb(11, 22, 33)'. 'rgba(11, 22, 33, 0.5)')
 */


var hexToRgba = function hexToRgba(hex, a) {
  var hashlessHex = removeHash(hex);
  var hexObject = parseHex(hashlessHex);
  var decimalObject = hexesToDecimals(hexObject);
  return formatRgb(decimalObject, a);
};

module.exports = hexToRgba;

/***/ }),

/***/ "./src/react/Components/DimensionsBlock/editor.scss":
/*!**********************************************************!*\
  !*** ./src/react/Components/DimensionsBlock/editor.scss ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/react/Components/unit-picker/editor.scss":
/*!******************************************************!*\
  !*** ./src/react/Components/unit-picker/editor.scss ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/react-hook-form/dist/index.esm.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/react-hook-form/dist/index.esm.mjs ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": function() { return /* binding */ Controller; },
/* harmony export */   "FormProvider": function() { return /* binding */ FormProvider; },
/* harmony export */   "appendErrors": function() { return /* binding */ appendErrors; },
/* harmony export */   "get": function() { return /* binding */ get; },
/* harmony export */   "set": function() { return /* binding */ set; },
/* harmony export */   "useController": function() { return /* binding */ useController; },
/* harmony export */   "useFieldArray": function() { return /* binding */ useFieldArray; },
/* harmony export */   "useForm": function() { return /* binding */ useForm; },
/* harmony export */   "useFormContext": function() { return /* binding */ useFormContext; },
/* harmony export */   "useFormState": function() { return /* binding */ useFormState; },
/* harmony export */   "useWatch": function() { return /* binding */ useWatch; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


var isCheckBoxInput = (element) => element.type === 'checkbox';

var isDateObject = (value) => value instanceof Date;

var isNullOrUndefined = (value) => value == null;

const isObjectType = (value) => typeof value === 'object';
var isObject = (value) => !isNullOrUndefined(value) &&
    !Array.isArray(value) &&
    isObjectType(value) &&
    !isDateObject(value);

var getEventValue = (event) => isObject(event) && event.target
    ? isCheckBoxInput(event.target)
        ? event.target.checked
        : event.target.value
    : event;

var getNodeParentName = (name) => name.substring(0, name.search(/\.\d+(\.|$)/)) || name;

var isNameInFieldArray = (names, name) => names.has(getNodeParentName(name));

var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];

var isUndefined = (val) => val === undefined;

var get = (obj, path, defaultValue) => {
    if (!path || !isObject(obj)) {
        return defaultValue;
    }
    const result = compact(path.split(/[,[\].]+?/)).reduce((result, key) => isNullOrUndefined(result) ? result : result[key], obj);
    return isUndefined(result) || result === obj
        ? isUndefined(obj[path])
            ? defaultValue
            : obj[path]
        : result;
};

const EVENTS = {
    BLUR: 'blur',
    FOCUS_OUT: 'focusout',
    CHANGE: 'change',
};
const VALIDATION_MODE = {
    onBlur: 'onBlur',
    onChange: 'onChange',
    onSubmit: 'onSubmit',
    onTouched: 'onTouched',
    all: 'all',
};
const INPUT_VALIDATION_RULES = {
    max: 'max',
    min: 'min',
    maxLength: 'maxLength',
    minLength: 'minLength',
    pattern: 'pattern',
    required: 'required',
    validate: 'validate',
};

const HookFormContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
/**
 * This custom hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop. To be used with {@link FormProvider}.
 *
 * @remarks
 * [API](https://react-hook-form.com/api/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @returns return all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const useFormContext = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(HookFormContext);
/**
 * A provider component that propagates the `useForm` methods to all children components via [React Context](https://reactjs.org/docs/context.html) API. To be used with {@link useFormContext}.
 *
 * @remarks
 * [API](https://react-hook-form.com/api/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @param props - all useFrom methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const FormProvider = (props) => {
    const { children, ...data } = props;
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(HookFormContext.Provider, { value: data }, children));
};

var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
    const result = {
        defaultValues: control._defaultValues,
    };
    for (const key in formState) {
        Object.defineProperty(result, key, {
            get: () => {
                const _key = key;
                if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
                    control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
                }
                localProxyFormState && (localProxyFormState[_key] = true);
                return formState[_key];
            },
        });
    }
    return result;
};

var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;

var shouldRenderFormState = (formStateData, _proxyFormState, isRoot) => {
    const { name, ...formState } = formStateData;
    return (isEmptyObject(formState) ||
        Object.keys(formState).length >= Object.keys(_proxyFormState).length ||
        Object.keys(formState).find((key) => _proxyFormState[key] ===
            (!isRoot || VALIDATION_MODE.all)));
};

var convertToArrayPayload = (value) => (Array.isArray(value) ? value : [value]);

var shouldSubscribeByName = (name, signalName, exact) => exact && signalName
    ? name === signalName
    : !name ||
        !signalName ||
        name === signalName ||
        convertToArrayPayload(name).some((currentName) => currentName &&
            (currentName.startsWith(signalName) ||
                signalName.startsWith(currentName)));

function useSubscribe(props) {
    const _props = react__WEBPACK_IMPORTED_MODULE_0__.useRef(props);
    _props.current = props;
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        const subscription = !props.disabled &&
            _props.current.subject.subscribe({
                next: _props.current.callback,
            });
        return () => {
            subscription && subscription.unsubscribe();
        };
    }, [props.disabled]);
}

/**
 * This custom hook allows you to subscribe to each form state, and isolate the re-render at the custom hook level. It has its scope in terms of form state subscription, so it would not affect other useFormState and useForm. Using this hook can reduce the re-render impact on large and complex form application.
 *
 * @remarks
 * [API](https://react-hook-form.com/api/useformstate) • [Demo](https://codesandbox.io/s/useformstate-75xly)
 *
 * @param props - include options on specify fields to subscribe. {@link UseFormStateReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, control } = useForm({
 *     defaultValues: {
 *     firstName: "firstName"
 *   }});
 *   const { dirtyFields } = useFormState({
 *     control
 *   });
 *   const onSubmit = (data) => console.log(data);
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register("firstName")} placeholder="First Name" />
 *       {dirtyFields.firstName && <p>Field is dirty.</p>}
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useFormState(props) {
    const methods = useFormContext();
    const { control = methods.control, disabled, name, exact } = props || {};
    const [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(control._formState);
    const _mounted = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    const _localProxyFormState = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
        isDirty: false,
        dirtyFields: false,
        touchedFields: false,
        isValidating: false,
        isValid: false,
        errors: false,
    });
    const _name = react__WEBPACK_IMPORTED_MODULE_0__.useRef(name);
    _name.current = name;
    useSubscribe({
        disabled,
        callback: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((value) => _mounted.current &&
            shouldSubscribeByName(_name.current, value.name, exact) &&
            shouldRenderFormState(value, _localProxyFormState.current) &&
            updateFormState({
                ...control._formState,
                ...value,
            }), [control, exact]),
        subject: control._subjects.state,
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        _mounted.current = true;
        return () => {
            _mounted.current = false;
        };
    }, []);
    return getProxyFormState(formState, control, _localProxyFormState.current, false);
}

var isString = (value) => typeof value === 'string';

var generateWatchOutput = (names, _names, formValues, isGlobal) => {
    const isArray = Array.isArray(names);
    if (isString(names)) {
        isGlobal && _names.watch.add(names);
        return get(formValues, names);
    }
    if (isArray) {
        return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName),
            get(formValues, fieldName)));
    }
    isGlobal && (_names.watchAll = true);
    return formValues;
};

var isFunction = (value) => typeof value === 'function';

var objectHasFunction = (data) => {
    for (const key in data) {
        if (isFunction(data[key])) {
            return true;
        }
    }
    return false;
};

/**
 * Custom hook to subscribe to field change and isolate re-rendering at the component level.
 *
 * @remarks
 *
 * [API](https://react-hook-form.com/api/usewatch) • [Demo](https://codesandbox.io/s/react-hook-form-v7-ts-usewatch-h9i5e)
 *
 * @example
 * ```tsx
 * const { watch } = useForm();
 * const values = useWatch({
 *   name: "fieldName"
 *   control,
 * })
 * ```
 */
function useWatch(props) {
    const methods = useFormContext();
    const { control = methods.control, name, defaultValue, disabled, exact, } = props || {};
    const _name = react__WEBPACK_IMPORTED_MODULE_0__.useRef(name);
    _name.current = name;
    useSubscribe({
        disabled,
        subject: control._subjects.watch,
        callback: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((formState) => {
            if (shouldSubscribeByName(_name.current, formState.name, exact)) {
                const fieldValues = generateWatchOutput(_name.current, control._names, formState.values || control._formValues);
                updateValue(isUndefined(_name.current) ||
                    (isObject(fieldValues) && !objectHasFunction(fieldValues))
                    ? { ...fieldValues }
                    : Array.isArray(fieldValues)
                        ? [...fieldValues]
                        : isUndefined(fieldValues)
                            ? defaultValue
                            : fieldValues);
            }
        }, [control, exact, defaultValue]),
    });
    const [value, updateValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(isUndefined(defaultValue)
        ? control._getWatch(name)
        : defaultValue);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => control._removeUnmounted());
    return value;
}

/**
 * Custom hook to work with controlled component, this function provide you with both form and field level state. Re-render is isolated at the hook level.
 *
 * @remarks
 * [API](https://react-hook-form.com/api/usecontroller) • [Demo](https://codesandbox.io/s/usecontroller-0o8px)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns field properties, field and form state. {@link UseControllerReturn}
 *
 * @example
 * ```tsx
 * function Input(props) {
 *   const { field, fieldState, formState } = useController(props);
 *   return (
 *     <div>
 *       <input {...field} placeholder={props.name} />
 *       <p>{fieldState.isTouched && "Touched"}</p>
 *       <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *     </div>
 *   );
 * }
 * ```
 */
function useController(props) {
    const methods = useFormContext();
    const { name, control = methods.control, shouldUnregister } = props;
    const isArrayField = isNameInFieldArray(control._names.array, name);
    const value = useWatch({
        control,
        name,
        defaultValue: get(control._formValues, name, get(control._defaultValues, name, props.defaultValue)),
        exact: true,
    });
    const formState = useFormState({
        control,
        name,
    });
    const _registerProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control.register(name, {
        ...props.rules,
        value,
    }));
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        const updateMounted = (name, value) => {
            const field = get(control._fields, name);
            if (field) {
                field._f.mount = value;
            }
        };
        updateMounted(name, true);
        return () => {
            const _shouldUnregisterField = control._options.shouldUnregister || shouldUnregister;
            (isArrayField
                ? _shouldUnregisterField && !control._stateFlags.action
                : _shouldUnregisterField)
                ? control.unregister(name)
                : updateMounted(name, false);
        };
    }, [name, control, isArrayField, shouldUnregister]);
    return {
        field: {
            name,
            value,
            onChange: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((event) => _registerProps.current.onChange({
                target: {
                    value: getEventValue(event),
                    name: name,
                },
                type: EVENTS.CHANGE,
            }), [name]),
            onBlur: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => _registerProps.current.onBlur({
                target: {
                    value: get(control._formValues, name),
                    name: name,
                },
                type: EVENTS.BLUR,
            }), [name, control]),
            ref: (elm) => {
                const field = get(control._fields, name);
                if (field && elm) {
                    field._f.ref = {
                        focus: () => elm.focus(),
                        select: () => elm.select(),
                        setCustomValidity: (message) => elm.setCustomValidity(message),
                        reportValidity: () => elm.reportValidity(),
                    };
                }
            },
        },
        formState,
        fieldState: Object.defineProperties({}, {
            invalid: {
                enumerable: true,
                get: () => !!get(formState.errors, name),
            },
            isDirty: {
                enumerable: true,
                get: () => !!get(formState.dirtyFields, name),
            },
            isTouched: {
                enumerable: true,
                get: () => !!get(formState.touchedFields, name),
            },
            error: {
                enumerable: true,
                get: () => get(formState.errors, name),
            },
        }),
    };
}

/**
 * Component based on `useController` hook to work with controlled component.
 *
 * @remarks
 * [API](https://react-hook-form.com/api/usecontroller/controller) • [Demo](https://codesandbox.io/s/react-hook-form-v6-controller-ts-jwyzw) • [Video](https://www.youtube.com/watch?v=N2UNk_UCVyA)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns provide field handler functions, field and form state.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control } = useForm<FormValues>({
 *     defaultValues: {
 *       test: ""
 *     }
 *   });
 *
 *   return (
 *     <form>
 *       <Controller
 *         control={control}
 *         name="test"
 *         render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
 *           <>
 *             <input
 *               onChange={onChange} // send value to hook form
 *               onBlur={onBlur} // notify when input is touched
 *               value={value} // return updated value
 *               ref={ref} // set ref for focus management
 *             />
 *             <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *             <p>{fieldState.isTouched ? "touched" : ""}</p>
 *           </>
 *         )}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
const Controller = (props) => props.render(useController(props));

var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria
    ? {
        ...errors[name],
        types: {
            ...(errors[name] && errors[name].types ? errors[name].types : {}),
            [type]: message || true,
        },
    }
    : {};

var isKey = (value) => /^\w*$/.test(value);

var stringToPath = (input) => compact(input.replace(/["|']|\]/g, '').split(/\.|\[/));

function set(object, path, value) {
    let index = -1;
    const tempPath = isKey(path) ? [path] : stringToPath(path);
    const length = tempPath.length;
    const lastIndex = length - 1;
    while (++index < length) {
        const key = tempPath[index];
        let newValue = value;
        if (index !== lastIndex) {
            const objValue = object[key];
            newValue =
                isObject(objValue) || Array.isArray(objValue)
                    ? objValue
                    : !isNaN(+tempPath[index + 1])
                        ? []
                        : {};
        }
        object[key] = newValue;
        object = object[key];
    }
    return object;
}

const focusFieldBy = (fields, callback, fieldsNames) => {
    for (const key of fieldsNames || Object.keys(fields)) {
        const field = get(fields, key);
        if (field) {
            const { _f, ...currentField } = field;
            if (_f && callback(_f.name)) {
                if (_f.ref.focus) {
                    _f.ref.focus();
                    break;
                }
                else if (_f.refs && _f.refs[0].focus) {
                    _f.refs[0].focus();
                    break;
                }
            }
            else if (isObject(currentField)) {
                focusFieldBy(currentField, callback);
            }
        }
    }
};

var generateId = () => {
    const d = typeof performance === 'undefined' ? Date.now() : performance.now() * 1000;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16 + d) % 16 | 0;
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
};

var getFocusFieldName = (name, index, options = {}) => options.shouldFocus || isUndefined(options.shouldFocus)
    ? options.focusName ||
        `${name}.${isUndefined(options.focusIndex) ? index : options.focusIndex}.`
    : '';

var isWatched = (name, _names, isBlurEvent) => !isBlurEvent &&
    (_names.watchAll ||
        _names.watch.has(name) ||
        [..._names.watch].some((watchName) => name.startsWith(watchName) &&
            /^\.\w+/.test(name.slice(watchName.length))));

var updateFieldArrayRootError = (errors, error, name) => {
    const fieldArrayErrors = compact(get(errors, name));
    set(fieldArrayErrors, 'root', error[name]);
    set(errors, name, fieldArrayErrors);
    return errors;
};

var isBoolean = (value) => typeof value === 'boolean';

var isFileInput = (element) => element.type === 'file';

var isMessage = (value) => isString(value) || react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(value);

var isRadioInput = (element) => element.type === 'radio';

var isRegex = (value) => value instanceof RegExp;

const defaultResult = {
    value: false,
    isValid: false,
};
const validResult = { value: true, isValid: true };
var getCheckboxValue = (options) => {
    if (Array.isArray(options)) {
        if (options.length > 1) {
            const values = options
                .filter((option) => option && option.checked && !option.disabled)
                .map((option) => option.value);
            return { value: values, isValid: !!values.length };
        }
        return options[0].checked && !options[0].disabled
            ? // @ts-expect-error expected to work in the browser
                options[0].attributes && !isUndefined(options[0].attributes.value)
                    ? isUndefined(options[0].value) || options[0].value === ''
                        ? validResult
                        : { value: options[0].value, isValid: true }
                    : validResult
            : defaultResult;
    }
    return defaultResult;
};

const defaultReturn = {
    isValid: false,
    value: null,
};
var getRadioValue = (options) => Array.isArray(options)
    ? options.reduce((previous, option) => option && option.checked && !option.disabled
        ? {
            isValid: true,
            value: option.value,
        }
        : previous, defaultReturn)
    : defaultReturn;

function getValidateError(result, ref, type = 'validate') {
    if (isMessage(result) ||
        (Array.isArray(result) && result.every(isMessage)) ||
        (isBoolean(result) && !result)) {
        return {
            type,
            message: isMessage(result) ? result : '',
            ref,
        };
    }
}

var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData)
    ? validationData
    : {
        value: validationData,
        message: '',
    };

var validateField = async (field, inputValue, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
    const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount, disabled, } = field._f;
    if (!mount || disabled) {
        return {};
    }
    const inputRef = refs ? refs[0] : ref;
    const setCustomValidity = (message) => {
        if (shouldUseNativeValidation && inputRef.reportValidity) {
            inputRef.setCustomValidity(isBoolean(message) ? '' : message || ' ');
            inputRef.reportValidity();
        }
    };
    const error = {};
    const isRadio = isRadioInput(ref);
    const isCheckBox = isCheckBoxInput(ref);
    const isRadioOrCheckbox = isRadio || isCheckBox;
    const isEmpty = ((valueAsNumber || isFileInput(ref)) && !ref.value) ||
        inputValue === '' ||
        (Array.isArray(inputValue) && !inputValue.length);
    const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
    const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
        const message = exceedMax ? maxLengthMessage : minLengthMessage;
        error[name] = {
            type: exceedMax ? maxType : minType,
            message,
            ref,
            ...appendErrorsCurry(exceedMax ? maxType : minType, message),
        };
    };
    if (isFieldArray
        ? !Array.isArray(inputValue) || !inputValue.length
        : required &&
            ((!isRadioOrCheckbox && (isEmpty || isNullOrUndefined(inputValue))) ||
                (isBoolean(inputValue) && !inputValue) ||
                (isCheckBox && !getCheckboxValue(refs).isValid) ||
                (isRadio && !getRadioValue(refs).isValid))) {
        const { value, message } = isMessage(required)
            ? { value: !!required, message: required }
            : getValueAndMessage(required);
        if (value) {
            error[name] = {
                type: INPUT_VALIDATION_RULES.required,
                message,
                ref: inputRef,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message),
            };
            if (!validateAllFieldCriteria) {
                setCustomValidity(message);
                return error;
            }
        }
    }
    if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
        let exceedMax;
        let exceedMin;
        const maxOutput = getValueAndMessage(max);
        const minOutput = getValueAndMessage(min);
        if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
            const valueNumber = ref.valueAsNumber ||
                (inputValue ? +inputValue : inputValue);
            if (!isNullOrUndefined(maxOutput.value)) {
                exceedMax = valueNumber > maxOutput.value;
            }
            if (!isNullOrUndefined(minOutput.value)) {
                exceedMin = valueNumber < minOutput.value;
            }
        }
        else {
            const valueDate = ref.valueAsDate || new Date(inputValue);
            const convertTimeToDate = (time) => new Date(new Date().toDateString() + ' ' + time);
            const isTime = ref.type == 'time';
            const isWeek = ref.type == 'week';
            if (isString(maxOutput.value) && inputValue) {
                exceedMax = isTime
                    ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value)
                    : isWeek
                        ? inputValue > maxOutput.value
                        : valueDate > new Date(maxOutput.value);
            }
            if (isString(minOutput.value) && inputValue) {
                exceedMin = isTime
                    ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value)
                    : isWeek
                        ? inputValue < minOutput.value
                        : valueDate < new Date(minOutput.value);
            }
        }
        if (exceedMax || exceedMin) {
            getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
            if (!validateAllFieldCriteria) {
                setCustomValidity(error[name].message);
                return error;
            }
        }
    }
    if ((maxLength || minLength) &&
        !isEmpty &&
        (isString(inputValue) || (isFieldArray && Array.isArray(inputValue)))) {
        const maxLengthOutput = getValueAndMessage(maxLength);
        const minLengthOutput = getValueAndMessage(minLength);
        const exceedMax = !isNullOrUndefined(maxLengthOutput.value) &&
            inputValue.length > maxLengthOutput.value;
        const exceedMin = !isNullOrUndefined(minLengthOutput.value) &&
            inputValue.length < minLengthOutput.value;
        if (exceedMax || exceedMin) {
            getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
            if (!validateAllFieldCriteria) {
                setCustomValidity(error[name].message);
                return error;
            }
        }
    }
    if (pattern && !isEmpty && isString(inputValue)) {
        const { value: patternValue, message } = getValueAndMessage(pattern);
        if (isRegex(patternValue) && !inputValue.match(patternValue)) {
            error[name] = {
                type: INPUT_VALIDATION_RULES.pattern,
                message,
                ref,
                ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message),
            };
            if (!validateAllFieldCriteria) {
                setCustomValidity(message);
                return error;
            }
        }
    }
    if (validate) {
        if (isFunction(validate)) {
            const result = await validate(inputValue);
            const validateError = getValidateError(result, inputRef);
            if (validateError) {
                error[name] = {
                    ...validateError,
                    ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message),
                };
                if (!validateAllFieldCriteria) {
                    setCustomValidity(validateError.message);
                    return error;
                }
            }
        }
        else if (isObject(validate)) {
            let validationResult = {};
            for (const key in validate) {
                if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
                    break;
                }
                const validateError = getValidateError(await validate[key](inputValue), inputRef, key);
                if (validateError) {
                    validationResult = {
                        ...validateError,
                        ...appendErrorsCurry(key, validateError.message),
                    };
                    setCustomValidity(validateError.message);
                    if (validateAllFieldCriteria) {
                        error[name] = validationResult;
                    }
                }
            }
            if (!isEmptyObject(validationResult)) {
                error[name] = {
                    ref: inputRef,
                    ...validationResult,
                };
                if (!validateAllFieldCriteria) {
                    return error;
                }
            }
        }
    }
    setCustomValidity(true);
    return error;
};

function append(data, value) {
    return [...data, ...convertToArrayPayload(value)];
}

var isPlainObject = (tempObject) => {
    const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
    return (isObject(prototypeCopy) && prototypeCopy.hasOwnProperty('isPrototypeOf'));
};

var isWeb = typeof window !== 'undefined' &&
    typeof window.HTMLElement !== 'undefined' &&
    typeof document !== 'undefined';

function cloneObject(data) {
    let copy;
    const isArray = Array.isArray(data);
    if (data instanceof Date) {
        copy = new Date(data);
    }
    else if (data instanceof Set) {
        copy = new Set(data);
    }
    else if (!(isWeb && (data instanceof Blob || data instanceof FileList)) &&
        (isArray || isObject(data))) {
        copy = isArray ? [] : {};
        if (!Array.isArray(data) && !isPlainObject(data)) {
            copy = data;
        }
        else {
            for (const key in data) {
                copy[key] = cloneObject(data[key]);
            }
        }
    }
    else {
        return data;
    }
    return copy;
}

var fillEmptyArray = (value) => Array.isArray(value) ? value.map(() => undefined) : undefined;

var getValidationModes = (mode) => ({
    isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
    isOnBlur: mode === VALIDATION_MODE.onBlur,
    isOnChange: mode === VALIDATION_MODE.onChange,
    isOnAll: mode === VALIDATION_MODE.all,
    isOnTouch: mode === VALIDATION_MODE.onTouched,
});

function insert(data, index, value) {
    return [
        ...data.slice(0, index),
        ...convertToArrayPayload(value),
        ...data.slice(index),
    ];
}

var moveArrayAt = (data, from, to) => {
    if (!Array.isArray(data)) {
        return [];
    }
    if (isUndefined(data[to])) {
        data[to] = undefined;
    }
    data.splice(to, 0, data.splice(from, 1)[0]);
    return data;
};

function prepend(data, value) {
    return [...convertToArrayPayload(value), ...convertToArrayPayload(data)];
}

function removeAtIndexes(data, indexes) {
    let i = 0;
    const temp = [...data];
    for (const index of indexes) {
        temp.splice(index - i, 1);
        i++;
    }
    return compact(temp).length ? temp : [];
}
var removeArrayAt = (data, index) => isUndefined(index)
    ? []
    : removeAtIndexes(data, convertToArrayPayload(index).sort((a, b) => a - b));

var swapArrayAt = (data, indexA, indexB) => {
    data[indexA] = [data[indexB], (data[indexB] = data[indexA])][0];
};

function baseGet(object, updatePath) {
    const length = updatePath.slice(0, -1).length;
    let index = 0;
    while (index < length) {
        object = isUndefined(object) ? index++ : object[updatePath[index++]];
    }
    return object;
}
function isEmptyArray(obj) {
    for (const key in obj) {
        if (!isUndefined(obj[key])) {
            return false;
        }
    }
    return true;
}
function unset(object, path) {
    const updatePath = isKey(path) ? [path] : stringToPath(path);
    const childObject = updatePath.length == 1 ? object : baseGet(object, updatePath);
    const key = updatePath[updatePath.length - 1];
    let previousObjRef;
    if (childObject) {
        delete childObject[key];
    }
    for (let k = 0; k < updatePath.slice(0, -1).length; k++) {
        let index = -1;
        let objectRef;
        const currentPaths = updatePath.slice(0, -(k + 1));
        const currentPathsLength = currentPaths.length - 1;
        if (k > 0) {
            previousObjRef = object;
        }
        while (++index < currentPaths.length) {
            const item = currentPaths[index];
            objectRef = objectRef ? objectRef[item] : object[item];
            if (currentPathsLength === index &&
                ((isObject(objectRef) && isEmptyObject(objectRef)) ||
                    (Array.isArray(objectRef) && isEmptyArray(objectRef)))) {
                previousObjRef ? delete previousObjRef[item] : delete object[item];
            }
            previousObjRef = objectRef;
        }
    }
    return object;
}

var updateAt = (fieldValues, index, value) => {
    fieldValues[index] = value;
    return fieldValues;
};

/**
 * A custom hook that exposes convenient methods to perform operations with a list of dynamic inputs that need to be appended, updated, removed etc. • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn) • [Video](https://youtu.be/4MrbfGSFY2A)
 *
 * @remarks
 * [API](https://react-hook-form.com/api/usefieldarray) • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn)
 *
 * @param props - useFieldArray props
 *
 * @returns methods - functions to manipulate with the Field Arrays (dynamic inputs) {@link UseFieldArrayReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, control, handleSubmit, reset, trigger, setError } = useForm({
 *     defaultValues: {
 *       test: []
 *     }
 *   });
 *   const { fields, append } = useFieldArray({
 *     control,
 *     name: "test"
 *   });
 *
 *   return (
 *     <form onSubmit={handleSubmit(data => console.log(data))}>
 *       {fields.map((item, index) => (
 *          <input key={item.id} {...register(`test.${index}.firstName`)}  />
 *       ))}
 *       <button type="button" onClick={() => append({ firstName: "bill" })}>
 *         append
 *       </button>
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useFieldArray(props) {
    const methods = useFormContext();
    const { control = methods.control, name, keyName = 'id', shouldUnregister, } = props;
    const [fields, setFields] = react__WEBPACK_IMPORTED_MODULE_0__.useState(control._getFieldArray(name));
    const ids = react__WEBPACK_IMPORTED_MODULE_0__.useRef(control._getFieldArray(name).map(generateId));
    const _fieldIds = react__WEBPACK_IMPORTED_MODULE_0__.useRef(fields);
    const _name = react__WEBPACK_IMPORTED_MODULE_0__.useRef(name);
    const _actioned = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    _name.current = name;
    _fieldIds.current = fields;
    control._names.array.add(name);
    props.rules &&
        control.register(name, props.rules);
    const callback = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(({ values, name: fieldArrayName, }) => {
        if (fieldArrayName === _name.current || !fieldArrayName) {
            const fieldValues = get(values, _name.current);
            if (Array.isArray(fieldValues)) {
                setFields(fieldValues);
                ids.current = fieldValues.map(generateId);
            }
        }
    }, []);
    useSubscribe({
        callback,
        subject: control._subjects.array,
    });
    const updateValues = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((updatedFieldArrayValues) => {
        _actioned.current = true;
        control._updateFieldArray(name, updatedFieldArrayValues);
    }, [control, name]);
    const append$1 = (value, options) => {
        const appendValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = append(control._getFieldArray(name), appendValue);
        control._names.focus = getFocusFieldName(name, updatedFieldArrayValues.length - 1, options);
        ids.current = append(ids.current, appendValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, append, {
            argA: fillEmptyArray(value),
        });
    };
    const prepend$1 = (value, options) => {
        const prependValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = prepend(control._getFieldArray(name), prependValue);
        control._names.focus = getFocusFieldName(name, 0, options);
        ids.current = prepend(ids.current, prependValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, prepend, {
            argA: fillEmptyArray(value),
        });
    };
    const remove = (index) => {
        const updatedFieldArrayValues = removeArrayAt(control._getFieldArray(name), index);
        ids.current = removeArrayAt(ids.current, index);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, removeArrayAt, {
            argA: index,
        });
    };
    const insert$1 = (index, value, options) => {
        const insertValue = convertToArrayPayload(cloneObject(value));
        const updatedFieldArrayValues = insert(control._getFieldArray(name), index, insertValue);
        control._names.focus = getFocusFieldName(name, index, options);
        ids.current = insert(ids.current, index, insertValue.map(generateId));
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, insert, {
            argA: index,
            argB: fillEmptyArray(value),
        });
    };
    const swap = (indexA, indexB) => {
        const updatedFieldArrayValues = control._getFieldArray(name);
        swapArrayAt(updatedFieldArrayValues, indexA, indexB);
        swapArrayAt(ids.current, indexA, indexB);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, swapArrayAt, {
            argA: indexA,
            argB: indexB,
        }, false);
    };
    const move = (from, to) => {
        const updatedFieldArrayValues = control._getFieldArray(name);
        moveArrayAt(updatedFieldArrayValues, from, to);
        moveArrayAt(ids.current, from, to);
        updateValues(updatedFieldArrayValues);
        setFields(updatedFieldArrayValues);
        control._updateFieldArray(name, updatedFieldArrayValues, moveArrayAt, {
            argA: from,
            argB: to,
        }, false);
    };
    const update = (index, value) => {
        const updateValue = cloneObject(value);
        const updatedFieldArrayValues = updateAt(control._getFieldArray(name), index, updateValue);
        ids.current = [...updatedFieldArrayValues].map((item, i) => !item || i === index ? generateId() : ids.current[i]);
        updateValues(updatedFieldArrayValues);
        setFields([...updatedFieldArrayValues]);
        control._updateFieldArray(name, updatedFieldArrayValues, updateAt, {
            argA: index,
            argB: updateValue,
        }, true, false);
    };
    const replace = (value) => {
        const updatedFieldArrayValues = convertToArrayPayload(cloneObject(value));
        ids.current = updatedFieldArrayValues.map(generateId);
        updateValues([...updatedFieldArrayValues]);
        setFields([...updatedFieldArrayValues]);
        control._updateFieldArray(name, [...updatedFieldArrayValues], (data) => data, {}, true, false);
    };
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        control._stateFlags.action = false;
        isWatched(name, control._names) && control._subjects.state.next({});
        if (_actioned.current &&
            (!getValidationModes(control._options.mode).isOnSubmit ||
                control._formState.isSubmitted)) {
            if (control._options.resolver) {
                control._executeSchema([name]).then((result) => {
                    const error = get(result.errors, name);
                    const existingError = get(control._formState.errors, name);
                    if (existingError ? !error && existingError.type : error && error.type) {
                        error
                            ? set(control._formState.errors, name, error)
                            : unset(control._formState.errors, name);
                        control._subjects.state.next({
                            errors: control._formState.errors,
                        });
                    }
                });
            }
            else {
                const field = get(control._fields, name);
                if (field && field._f) {
                    validateField(field, get(control._formValues, name), control._options.criteriaMode === VALIDATION_MODE.all, control._options.shouldUseNativeValidation, true).then((error) => !isEmptyObject(error) &&
                        control._subjects.state.next({
                            errors: updateFieldArrayRootError(control._formState.errors, error, name),
                        }));
                }
            }
        }
        control._subjects.watch.next({
            name,
            values: control._formValues,
        });
        control._names.focus &&
            focusFieldBy(control._fields, (key) => !!key && key.startsWith(control._names.focus));
        control._names.focus = '';
        control._proxyFormState.isValid && control._updateValid();
    }, [fields, name, control]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        !get(control._formValues, name) && control._updateFieldArray(name);
        return () => {
            (control._options.shouldUnregister || shouldUnregister) &&
                control.unregister(name);
        };
    }, [name, control, keyName, shouldUnregister]);
    return {
        swap: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(swap, [updateValues, name, control]),
        move: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(move, [updateValues, name, control]),
        prepend: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(prepend$1, [updateValues, name, control]),
        append: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(append$1, [updateValues, name, control]),
        remove: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(remove, [updateValues, name, control]),
        insert: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(insert$1, [updateValues, name, control]),
        update: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(update, [updateValues, name, control]),
        replace: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(replace, [updateValues, name, control]),
        fields: react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => fields.map((field, index) => ({
            ...field,
            [keyName]: ids.current[index] || generateId(),
        })), [fields, keyName]),
    };
}

function createSubject() {
    let _observers = [];
    const next = (value) => {
        for (const observer of _observers) {
            observer.next(value);
        }
    };
    const subscribe = (observer) => {
        _observers.push(observer);
        return {
            unsubscribe: () => {
                _observers = _observers.filter((o) => o !== observer);
            },
        };
    };
    const unsubscribe = () => {
        _observers = [];
    };
    return {
        get observers() {
            return _observers;
        },
        next,
        subscribe,
        unsubscribe,
    };
}

var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);

function deepEqual(object1, object2) {
    if (isPrimitive(object1) || isPrimitive(object2)) {
        return object1 === object2;
    }
    if (isDateObject(object1) && isDateObject(object2)) {
        return object1.getTime() === object2.getTime();
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        if (!keys2.includes(key)) {
            return false;
        }
        if (key !== 'ref') {
            const val2 = object2[key];
            if ((isDateObject(val1) && isDateObject(val2)) ||
                (isObject(val1) && isObject(val2)) ||
                (Array.isArray(val1) && Array.isArray(val2))
                ? !deepEqual(val1, val2)
                : val1 !== val2) {
                return false;
            }
        }
    }
    return true;
}

var isHTMLElement = (value) => {
    const owner = value ? value.ownerDocument : 0;
    const ElementClass = owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement;
    return value instanceof ElementClass;
};

var isMultipleSelect = (element) => element.type === `select-multiple`;

var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);

var live = (ref) => isHTMLElement(ref) && ref.isConnected;

function markFieldsDirty(data, fields = {}) {
    const isParentNodeArray = Array.isArray(data);
    if (isObject(data) || isParentNodeArray) {
        for (const key in data) {
            if (Array.isArray(data[key]) ||
                (isObject(data[key]) && !objectHasFunction(data[key]))) {
                fields[key] = Array.isArray(data[key]) ? [] : {};
                markFieldsDirty(data[key], fields[key]);
            }
            else if (!isNullOrUndefined(data[key])) {
                fields[key] = true;
            }
        }
    }
    return fields;
}
function getDirtyFieldsFromDefaultValues(data, formValues, dirtyFieldsFromValues) {
    const isParentNodeArray = Array.isArray(data);
    if (isObject(data) || isParentNodeArray) {
        for (const key in data) {
            if (Array.isArray(data[key]) ||
                (isObject(data[key]) && !objectHasFunction(data[key]))) {
                if (isUndefined(formValues) ||
                    isPrimitive(dirtyFieldsFromValues[key])) {
                    dirtyFieldsFromValues[key] = Array.isArray(data[key])
                        ? markFieldsDirty(data[key], [])
                        : { ...markFieldsDirty(data[key]) };
                }
                else {
                    getDirtyFieldsFromDefaultValues(data[key], isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
                }
            }
            else {
                dirtyFieldsFromValues[key] = !deepEqual(data[key], formValues[key]);
            }
        }
    }
    return dirtyFieldsFromValues;
}
var getDirtyFields = (defaultValues, formValues) => getDirtyFieldsFromDefaultValues(defaultValues, formValues, markFieldsDirty(formValues));

var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value)
    ? value
    : valueAsNumber
        ? value === ''
            ? NaN
            : value
                ? +value
                : value
        : valueAsDate && isString(value)
            ? new Date(value)
            : setValueAs
                ? setValueAs(value)
                : value;

function getFieldValue(_f) {
    const ref = _f.ref;
    if (_f.refs ? _f.refs.every((ref) => ref.disabled) : ref.disabled) {
        return;
    }
    if (isFileInput(ref)) {
        return ref.files;
    }
    if (isRadioInput(ref)) {
        return getRadioValue(_f.refs).value;
    }
    if (isMultipleSelect(ref)) {
        return [...ref.selectedOptions].map(({ value }) => value);
    }
    if (isCheckBoxInput(ref)) {
        return getCheckboxValue(_f.refs).value;
    }
    return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}

var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
    const fields = {};
    for (const name of fieldsNames) {
        const field = get(_fields, name);
        field && set(fields, name, field._f);
    }
    return {
        criteriaMode,
        names: [...fieldsNames],
        fields,
        shouldUseNativeValidation,
    };
};

var getRuleValue = (rule) => isUndefined(rule)
    ? undefined
    : isRegex(rule)
        ? rule.source
        : isObject(rule)
            ? isRegex(rule.value)
                ? rule.value.source
                : rule.value
            : rule;

var hasValidation = (options) => options.mount &&
    (options.required ||
        options.min ||
        options.max ||
        options.maxLength ||
        options.minLength ||
        options.pattern ||
        options.validate);

function schemaErrorLookup(errors, _fields, name) {
    const error = get(errors, name);
    if (error || isKey(name)) {
        return {
            error,
            name,
        };
    }
    const names = name.split('.');
    while (names.length) {
        const fieldName = names.join('.');
        const field = get(_fields, fieldName);
        const foundError = get(errors, fieldName);
        if (field && !Array.isArray(field) && name !== fieldName) {
            return { name };
        }
        if (foundError && foundError.type) {
            return {
                name: fieldName,
                error: foundError,
            };
        }
        names.pop();
    }
    return {
        name,
    };
}

var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
    if (mode.isOnAll) {
        return false;
    }
    else if (!isSubmitted && mode.isOnTouch) {
        return !(isTouched || isBlurEvent);
    }
    else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
        return !isBlurEvent;
    }
    else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
        return isBlurEvent;
    }
    return true;
};

var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);

const defaultOptions = {
    mode: VALIDATION_MODE.onSubmit,
    reValidateMode: VALIDATION_MODE.onChange,
    shouldFocusError: true,
};
function createFormControl(props = {}) {
    let _options = {
        ...defaultOptions,
        ...props,
    };
    let _formState = {
        submitCount: 0,
        isDirty: false,
        isValidating: false,
        isSubmitted: false,
        isSubmitting: false,
        isSubmitSuccessful: false,
        isValid: false,
        touchedFields: {},
        dirtyFields: {},
        errors: {},
    };
    let _fields = {};
    let _defaultValues = cloneObject(_options.defaultValues) || {};
    let _formValues = _options.shouldUnregister
        ? {}
        : cloneObject(_defaultValues);
    let _stateFlags = {
        action: false,
        mount: false,
        watch: false,
    };
    let _names = {
        mount: new Set(),
        unMount: new Set(),
        array: new Set(),
        watch: new Set(),
    };
    let delayErrorCallback;
    let timer = 0;
    let validateFields = {};
    const _proxyFormState = {
        isDirty: false,
        dirtyFields: false,
        touchedFields: false,
        isValidating: false,
        isValid: false,
        errors: false,
    };
    const _subjects = {
        watch: createSubject(),
        array: createSubject(),
        state: createSubject(),
    };
    const validationModeBeforeSubmit = getValidationModes(_options.mode);
    const validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
    const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
    const debounce = (callback) => (wait) => {
        clearTimeout(timer);
        timer = window.setTimeout(callback, wait);
    };
    const _updateValid = async (shouldSkipRender) => {
        let isValid = false;
        if (_proxyFormState.isValid) {
            isValid = _options.resolver
                ? isEmptyObject((await _executeSchema()).errors)
                : await executeBuiltInValidation(_fields, true);
            if (!shouldSkipRender && isValid !== _formState.isValid) {
                _formState.isValid = isValid;
                _subjects.state.next({
                    isValid,
                });
            }
        }
        return isValid;
    };
    const _updateFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
        if (args && method) {
            _stateFlags.action = true;
            if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
                const fieldValues = method(get(_fields, name), args.argA, args.argB);
                shouldSetValues && set(_fields, name, fieldValues);
            }
            if (_proxyFormState.errors &&
                shouldUpdateFieldsAndState &&
                Array.isArray(get(_formState.errors, name))) {
                const errors = method(get(_formState.errors, name), args.argA, args.argB);
                shouldSetValues && set(_formState.errors, name, errors);
                unsetEmptyArray(_formState.errors, name);
            }
            if (_proxyFormState.touchedFields &&
                shouldUpdateFieldsAndState &&
                Array.isArray(get(_formState.touchedFields, name))) {
                const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
                shouldSetValues && set(_formState.touchedFields, name, touchedFields);
            }
            if (_proxyFormState.dirtyFields) {
                _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
            }
            _subjects.state.next({
                isDirty: _getDirty(name, values),
                dirtyFields: _formState.dirtyFields,
                errors: _formState.errors,
                isValid: _formState.isValid,
            });
        }
        else {
            set(_formValues, name, values);
        }
    };
    const updateErrors = (name, error) => {
        set(_formState.errors, name, error);
        _subjects.state.next({
            errors: _formState.errors,
        });
    };
    const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
        const field = get(_fields, name);
        if (field) {
            const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
            isUndefined(defaultValue) ||
                (ref && ref.defaultChecked) ||
                shouldSkipSetValueAs
                ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f))
                : setFieldValue(name, defaultValue);
            _stateFlags.mount && _updateValid();
        }
    };
    const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
        let isFieldDirty = false;
        const output = {
            name,
        };
        const isPreviousFieldTouched = get(_formState.touchedFields, name);
        if (_proxyFormState.isDirty) {
            const isPreviousFormDirty = _formState.isDirty;
            _formState.isDirty = output.isDirty = _getDirty();
            isFieldDirty = isPreviousFormDirty !== output.isDirty;
        }
        if (_proxyFormState.dirtyFields && (!isBlurEvent || shouldDirty)) {
            const isPreviousFieldDirty = get(_formState.dirtyFields, name);
            const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
            isCurrentFieldPristine
                ? unset(_formState.dirtyFields, name)
                : set(_formState.dirtyFields, name, true);
            output.dirtyFields = _formState.dirtyFields;
            isFieldDirty =
                isFieldDirty ||
                    isPreviousFieldDirty !== get(_formState.dirtyFields, name);
        }
        if (isBlurEvent && !isPreviousFieldTouched) {
            set(_formState.touchedFields, name, isBlurEvent);
            output.touchedFields = _formState.touchedFields;
            isFieldDirty =
                isFieldDirty ||
                    (_proxyFormState.touchedFields &&
                        isPreviousFieldTouched !== isBlurEvent);
        }
        isFieldDirty && shouldRender && _subjects.state.next(output);
        return isFieldDirty ? output : {};
    };
    const shouldRenderByError = async (name, isValid, error, fieldState) => {
        const previousFieldError = get(_formState.errors, name);
        const shouldUpdateValid = _proxyFormState.isValid && _formState.isValid !== isValid;
        if (props.delayError && error) {
            delayErrorCallback = debounce(() => updateErrors(name, error));
            delayErrorCallback(props.delayError);
        }
        else {
            clearTimeout(timer);
            delayErrorCallback = null;
            error
                ? set(_formState.errors, name, error)
                : unset(_formState.errors, name);
        }
        if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) ||
            !isEmptyObject(fieldState) ||
            shouldUpdateValid) {
            const updatedFormState = {
                ...fieldState,
                ...(shouldUpdateValid ? { isValid } : {}),
                errors: _formState.errors,
                name,
            };
            _formState = {
                ..._formState,
                ...updatedFormState,
            };
            _subjects.state.next(updatedFormState);
        }
        validateFields[name]--;
        if (_proxyFormState.isValidating &&
            !Object.values(validateFields).some((v) => v)) {
            _subjects.state.next({
                isValidating: false,
            });
            validateFields = {};
        }
    };
    const _executeSchema = async (name) => _options.resolver
        ? await _options.resolver({ ..._formValues }, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation))
        : {};
    const executeSchemaAndUpdateState = async (names) => {
        const { errors } = await _executeSchema();
        if (names) {
            for (const name of names) {
                const error = get(errors, name);
                error
                    ? set(_formState.errors, name, error)
                    : unset(_formState.errors, name);
            }
        }
        else {
            _formState.errors = errors;
        }
        return errors;
    };
    const executeBuiltInValidation = async (fields, shouldOnlyCheckValid, context = {
        valid: true,
    }) => {
        for (const name in fields) {
            const field = fields[name];
            if (field) {
                const { _f, ...fieldValue } = field;
                if (_f) {
                    const isFieldArrayRoot = _names.array.has(_f.name);
                    const fieldError = await validateField(field, get(_formValues, _f.name), shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation, isFieldArrayRoot);
                    if (fieldError[_f.name]) {
                        context.valid = false;
                        if (shouldOnlyCheckValid) {
                            break;
                        }
                    }
                    !shouldOnlyCheckValid &&
                        (get(fieldError, _f.name)
                            ? isFieldArrayRoot
                                ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name)
                                : set(_formState.errors, _f.name, fieldError[_f.name])
                            : unset(_formState.errors, _f.name));
                }
                fieldValue &&
                    (await executeBuiltInValidation(fieldValue, shouldOnlyCheckValid, context));
            }
        }
        return context.valid;
    };
    const _removeUnmounted = () => {
        for (const name of _names.unMount) {
            const field = get(_fields, name);
            field &&
                (field._f.refs
                    ? field._f.refs.every((ref) => !live(ref))
                    : !live(field._f.ref)) &&
                unregister(name);
        }
        _names.unMount = new Set();
    };
    const _getDirty = (name, data) => (name && data && set(_formValues, name, data),
        !deepEqual(getValues(), _defaultValues));
    const _getWatch = (names, defaultValue, isGlobal) => {
        const fieldValues = {
            ...(_stateFlags.mount
                ? _formValues
                : isUndefined(defaultValue)
                    ? _defaultValues
                    : isString(names)
                        ? { [names]: defaultValue }
                        : defaultValue),
        };
        return generateWatchOutput(names, _names, fieldValues, isGlobal);
    };
    const _getFieldArray = (name) => compact(get(_stateFlags.mount ? _formValues : _defaultValues, name, props.shouldUnregister ? get(_defaultValues, name, []) : []));
    const setFieldValue = (name, value, options = {}) => {
        const field = get(_fields, name);
        let fieldValue = value;
        if (field) {
            const fieldReference = field._f;
            if (fieldReference) {
                !fieldReference.disabled &&
                    set(_formValues, name, getFieldValueAs(value, fieldReference));
                fieldValue =
                    isWeb && isHTMLElement(fieldReference.ref) && isNullOrUndefined(value)
                        ? ''
                        : value;
                if (isMultipleSelect(fieldReference.ref)) {
                    [...fieldReference.ref.options].forEach((optionRef) => (optionRef.selected = fieldValue.includes(optionRef.value)));
                }
                else if (fieldReference.refs) {
                    if (isCheckBoxInput(fieldReference.ref)) {
                        fieldReference.refs.length > 1
                            ? fieldReference.refs.forEach((checkboxRef) => (!checkboxRef.defaultChecked || !checkboxRef.disabled) &&
                                (checkboxRef.checked = Array.isArray(fieldValue)
                                    ? !!fieldValue.find((data) => data === checkboxRef.value)
                                    : fieldValue === checkboxRef.value))
                            : fieldReference.refs[0] &&
                                (fieldReference.refs[0].checked = !!fieldValue);
                    }
                    else {
                        fieldReference.refs.forEach((radioRef) => (radioRef.checked = radioRef.value === fieldValue));
                    }
                }
                else if (isFileInput(fieldReference.ref)) {
                    fieldReference.ref.value = '';
                }
                else {
                    fieldReference.ref.value = fieldValue;
                    if (!fieldReference.ref.type) {
                        _subjects.watch.next({
                            name,
                        });
                    }
                }
            }
        }
        (options.shouldDirty || options.shouldTouch) &&
            updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, true);
        options.shouldValidate && trigger(name);
    };
    const setValues = (name, value, options) => {
        for (const fieldKey in value) {
            const fieldValue = value[fieldKey];
            const fieldName = `${name}.${fieldKey}`;
            const field = get(_fields, fieldName);
            (_names.array.has(name) ||
                !isPrimitive(fieldValue) ||
                (field && !field._f)) &&
                !isDateObject(fieldValue)
                ? setValues(fieldName, fieldValue, options)
                : setFieldValue(fieldName, fieldValue, options);
        }
    };
    const setValue = (name, value, options = {}) => {
        const field = get(_fields, name);
        const isFieldArray = _names.array.has(name);
        const cloneValue = cloneObject(value);
        set(_formValues, name, cloneValue);
        if (isFieldArray) {
            _subjects.array.next({
                name,
                values: _formValues,
            });
            if ((_proxyFormState.isDirty || _proxyFormState.dirtyFields) &&
                options.shouldDirty) {
                _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
                _subjects.state.next({
                    name,
                    dirtyFields: _formState.dirtyFields,
                    isDirty: _getDirty(name, cloneValue),
                });
            }
        }
        else {
            field && !field._f && !isNullOrUndefined(cloneValue)
                ? setValues(name, cloneValue, options)
                : setFieldValue(name, cloneValue, options);
        }
        isWatched(name, _names) && _subjects.state.next({});
        _subjects.watch.next({
            name,
        });
    };
    const onChange = async (event) => {
        const target = event.target;
        let name = target.name;
        const field = get(_fields, name);
        if (field) {
            let error;
            let isValid;
            const fieldValue = target.type
                ? getFieldValue(field._f)
                : getEventValue(event);
            const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
            const shouldSkipValidation = (!hasValidation(field._f) &&
                !_options.resolver &&
                !get(_formState.errors, name) &&
                !field._f.deps) ||
                skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, validationModeAfterSubmit, validationModeBeforeSubmit);
            const watched = isWatched(name, _names, isBlurEvent);
            set(_formValues, name, fieldValue);
            if (isBlurEvent) {
                field._f.onBlur && field._f.onBlur(event);
                delayErrorCallback && delayErrorCallback(0);
            }
            else if (field._f.onChange) {
                field._f.onChange(event);
            }
            const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent, false);
            const shouldRender = !isEmptyObject(fieldState) || watched;
            !isBlurEvent &&
                _subjects.watch.next({
                    name,
                    type: event.type,
                });
            if (shouldSkipValidation) {
                return (shouldRender &&
                    _subjects.state.next({ name, ...(watched ? {} : fieldState) }));
            }
            !isBlurEvent && watched && _subjects.state.next({});
            validateFields[name] = validateFields[name] ? +1 : 1;
            _subjects.state.next({
                isValidating: true,
            });
            if (_options.resolver) {
                const { errors } = await _executeSchema([name]);
                const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
                const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
                error = errorLookupResult.error;
                name = errorLookupResult.name;
                isValid = isEmptyObject(errors);
            }
            else {
                error = (await validateField(field, get(_formValues, name), shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
                isValid = await _updateValid(true);
            }
            field._f.deps &&
                trigger(field._f.deps);
            shouldRenderByError(name, isValid, error, fieldState);
        }
    };
    const trigger = async (name, options = {}) => {
        let isValid;
        let validationResult;
        const fieldNames = convertToArrayPayload(name);
        _subjects.state.next({
            isValidating: true,
        });
        if (_options.resolver) {
            const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
            isValid = isEmptyObject(errors);
            validationResult = name
                ? !fieldNames.some((name) => get(errors, name))
                : isValid;
        }
        else if (name) {
            validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
                const field = get(_fields, fieldName);
                return await executeBuiltInValidation(field && field._f ? { [fieldName]: field } : field);
            }))).every(Boolean);
            !(!validationResult && !_formState.isValid) && _updateValid();
        }
        else {
            validationResult = isValid = await executeBuiltInValidation(_fields);
        }
        _subjects.state.next({
            ...(!isString(name) ||
                (_proxyFormState.isValid && isValid !== _formState.isValid)
                ? {}
                : { name }),
            ...(_options.resolver || !name ? { isValid } : {}),
            errors: _formState.errors,
            isValidating: false,
        });
        options.shouldFocus &&
            !validationResult &&
            focusFieldBy(_fields, (key) => key && get(_formState.errors, key), name ? fieldNames : _names.mount);
        return validationResult;
    };
    const getValues = (fieldNames) => {
        const values = {
            ..._defaultValues,
            ...(_stateFlags.mount ? _formValues : {}),
        };
        return isUndefined(fieldNames)
            ? values
            : isString(fieldNames)
                ? get(values, fieldNames)
                : fieldNames.map((name) => get(values, name));
    };
    const getFieldState = (name, formState) => ({
        invalid: !!get((formState || _formState).errors, name),
        isDirty: !!get((formState || _formState).dirtyFields, name),
        isTouched: !!get((formState || _formState).touchedFields, name),
        error: get((formState || _formState).errors, name),
    });
    const clearErrors = (name) => {
        name
            ? convertToArrayPayload(name).forEach((inputName) => unset(_formState.errors, inputName))
            : (_formState.errors = {});
        _subjects.state.next({
            errors: _formState.errors,
        });
    };
    const setError = (name, error, options) => {
        const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
        set(_formState.errors, name, {
            ...error,
            ref,
        });
        _subjects.state.next({
            name,
            errors: _formState.errors,
            isValid: false,
        });
        options && options.shouldFocus && ref && ref.focus && ref.focus();
    };
    const watch = (name, defaultValue) => isFunction(name)
        ? _subjects.watch.subscribe({
            next: (info) => name(_getWatch(undefined, defaultValue), info),
        })
        : _getWatch(name, defaultValue, true);
    const unregister = (name, options = {}) => {
        for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
            _names.mount.delete(fieldName);
            _names.array.delete(fieldName);
            if (get(_fields, fieldName)) {
                if (!options.keepValue) {
                    unset(_fields, fieldName);
                    unset(_formValues, fieldName);
                }
                !options.keepError && unset(_formState.errors, fieldName);
                !options.keepDirty && unset(_formState.dirtyFields, fieldName);
                !options.keepTouched && unset(_formState.touchedFields, fieldName);
                !_options.shouldUnregister &&
                    !options.keepDefaultValue &&
                    unset(_defaultValues, fieldName);
            }
        }
        _subjects.watch.next({});
        _subjects.state.next({
            ..._formState,
            ...(!options.keepDirty ? {} : { isDirty: _getDirty() }),
        });
        !options.keepIsValid && _updateValid();
    };
    const register = (name, options = {}) => {
        let field = get(_fields, name);
        const disabledIsDefined = isBoolean(options.disabled);
        set(_fields, name, {
            ...(field || {}),
            _f: {
                ...(field && field._f ? field._f : { ref: { name } }),
                name,
                mount: true,
                ...options,
            },
        });
        _names.mount.add(name);
        field
            ? disabledIsDefined &&
                set(_formValues, name, options.disabled
                    ? undefined
                    : get(_formValues, name, getFieldValue(field._f)))
            : updateValidAndValue(name, true, options.value);
        return {
            ...(disabledIsDefined ? { disabled: options.disabled } : {}),
            ...(_options.shouldUseNativeValidation
                ? {
                    required: !!options.required,
                    min: getRuleValue(options.min),
                    max: getRuleValue(options.max),
                    minLength: getRuleValue(options.minLength),
                    maxLength: getRuleValue(options.maxLength),
                    pattern: getRuleValue(options.pattern),
                }
                : {}),
            name,
            onChange,
            onBlur: onChange,
            ref: (ref) => {
                if (ref) {
                    register(name, options);
                    field = get(_fields, name);
                    const fieldRef = isUndefined(ref.value)
                        ? ref.querySelectorAll
                            ? ref.querySelectorAll('input,select,textarea')[0] || ref
                            : ref
                        : ref;
                    const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
                    const refs = field._f.refs || [];
                    if (radioOrCheckbox
                        ? refs.find((option) => option === fieldRef)
                        : fieldRef === field._f.ref) {
                        return;
                    }
                    set(_fields, name, {
                        _f: {
                            ...field._f,
                            ...(radioOrCheckbox
                                ? {
                                    refs: [
                                        ...refs.filter(live),
                                        fieldRef,
                                        ...(!!Array.isArray(get(_defaultValues, name))
                                            ? [{}]
                                            : []),
                                    ],
                                    ref: { type: fieldRef.type, name },
                                }
                                : { ref: fieldRef }),
                        },
                    });
                    updateValidAndValue(name, false, undefined, fieldRef);
                }
                else {
                    field = get(_fields, name, {});
                    if (field._f) {
                        field._f.mount = false;
                    }
                    (_options.shouldUnregister || options.shouldUnregister) &&
                        !(isNameInFieldArray(_names.array, name) && _stateFlags.action) &&
                        _names.unMount.add(name);
                }
            },
        };
    };
    const _focusError = () => _options.shouldFocusError &&
        focusFieldBy(_fields, (key) => key && get(_formState.errors, key), _names.mount);
    const handleSubmit = (onValid, onInvalid) => async (e) => {
        if (e) {
            e.preventDefault && e.preventDefault();
            e.persist && e.persist();
        }
        let hasNoPromiseError = true;
        let fieldValues = cloneObject(_formValues);
        _subjects.state.next({
            isSubmitting: true,
        });
        try {
            if (_options.resolver) {
                const { errors, values } = await _executeSchema();
                _formState.errors = errors;
                fieldValues = values;
            }
            else {
                await executeBuiltInValidation(_fields);
            }
            if (isEmptyObject(_formState.errors)) {
                _subjects.state.next({
                    errors: {},
                    isSubmitting: true,
                });
                await onValid(fieldValues, e);
            }
            else {
                if (onInvalid) {
                    await onInvalid({ ..._formState.errors }, e);
                }
                _focusError();
            }
        }
        catch (err) {
            hasNoPromiseError = false;
            throw err;
        }
        finally {
            _formState.isSubmitted = true;
            _subjects.state.next({
                isSubmitted: true,
                isSubmitting: false,
                isSubmitSuccessful: isEmptyObject(_formState.errors) && hasNoPromiseError,
                submitCount: _formState.submitCount + 1,
                errors: _formState.errors,
            });
        }
    };
    const resetField = (name, options = {}) => {
        if (get(_fields, name)) {
            if (isUndefined(options.defaultValue)) {
                setValue(name, get(_defaultValues, name));
            }
            else {
                setValue(name, options.defaultValue);
                set(_defaultValues, name, options.defaultValue);
            }
            if (!options.keepTouched) {
                unset(_formState.touchedFields, name);
            }
            if (!options.keepDirty) {
                unset(_formState.dirtyFields, name);
                _formState.isDirty = options.defaultValue
                    ? _getDirty(name, get(_defaultValues, name))
                    : _getDirty();
            }
            if (!options.keepError) {
                unset(_formState.errors, name);
                _proxyFormState.isValid && _updateValid();
            }
            _subjects.state.next({ ..._formState });
        }
    };
    const _reset = (formValues, keepStateOptions = {}) => {
        const updatedValues = formValues || _defaultValues;
        const cloneUpdatedValues = cloneObject(updatedValues);
        const values = formValues && !isEmptyObject(formValues)
            ? cloneUpdatedValues
            : _defaultValues;
        if (!keepStateOptions.keepDefaultValues) {
            _defaultValues = updatedValues;
        }
        if (!keepStateOptions.keepValues) {
            if (keepStateOptions.keepDirtyValues) {
                for (const fieldName of _names.mount) {
                    get(_formState.dirtyFields, fieldName)
                        ? set(values, fieldName, get(_formValues, fieldName))
                        : setValue(fieldName, get(values, fieldName));
                }
            }
            else {
                if (isWeb && isUndefined(formValues)) {
                    for (const name of _names.mount) {
                        const field = get(_fields, name);
                        if (field && field._f) {
                            const fieldReference = Array.isArray(field._f.refs)
                                ? field._f.refs[0]
                                : field._f.ref;
                            try {
                                if (isHTMLElement(fieldReference)) {
                                    fieldReference.closest('form').reset();
                                    break;
                                }
                            }
                            catch (_a) { }
                        }
                    }
                }
                _fields = {};
            }
            _formValues = props.shouldUnregister
                ? keepStateOptions.keepDefaultValues
                    ? cloneObject(_defaultValues)
                    : {}
                : cloneUpdatedValues;
            _subjects.array.next({
                values,
            });
            _subjects.watch.next({
                values,
            });
        }
        _names = {
            mount: new Set(),
            unMount: new Set(),
            array: new Set(),
            watch: new Set(),
            watchAll: false,
            focus: '',
        };
        _stateFlags.mount =
            !_proxyFormState.isValid || !!keepStateOptions.keepIsValid;
        _stateFlags.watch = !!props.shouldUnregister;
        _subjects.state.next({
            submitCount: keepStateOptions.keepSubmitCount
                ? _formState.submitCount
                : 0,
            isDirty: keepStateOptions.keepDirty || keepStateOptions.keepDirtyValues
                ? _formState.isDirty
                : !!(keepStateOptions.keepDefaultValues &&
                    !deepEqual(formValues, _defaultValues)),
            isSubmitted: keepStateOptions.keepIsSubmitted
                ? _formState.isSubmitted
                : false,
            dirtyFields: keepStateOptions.keepDirty || keepStateOptions.keepDirtyValues
                ? _formState.dirtyFields
                : keepStateOptions.keepDefaultValues && formValues
                    ? getDirtyFields(_defaultValues, formValues)
                    : {},
            touchedFields: keepStateOptions.keepTouched
                ? _formState.touchedFields
                : {},
            errors: keepStateOptions.keepErrors ? _formState.errors : {},
            isSubmitting: false,
            isSubmitSuccessful: false,
        });
    };
    const reset = (formValues, keepStateOptions) => _reset(isFunction(formValues)
        ? formValues(_formValues)
        : formValues, keepStateOptions);
    const setFocus = (name, options = {}) => {
        const field = get(_fields, name);
        const fieldReference = field && field._f;
        if (fieldReference) {
            const fieldRef = fieldReference.refs
                ? fieldReference.refs[0]
                : fieldReference.ref;
            if (fieldRef.focus) {
                fieldRef.focus();
                options.shouldSelect && fieldRef.select();
            }
        }
    };
    return {
        control: {
            register,
            unregister,
            getFieldState,
            _executeSchema,
            _focusError,
            _getWatch,
            _getDirty,
            _updateValid,
            _removeUnmounted,
            _updateFieldArray,
            _getFieldArray,
            _subjects,
            _proxyFormState,
            get _fields() {
                return _fields;
            },
            get _formValues() {
                return _formValues;
            },
            get _stateFlags() {
                return _stateFlags;
            },
            set _stateFlags(value) {
                _stateFlags = value;
            },
            get _defaultValues() {
                return _defaultValues;
            },
            get _names() {
                return _names;
            },
            set _names(value) {
                _names = value;
            },
            get _formState() {
                return _formState;
            },
            set _formState(value) {
                _formState = value;
            },
            get _options() {
                return _options;
            },
            set _options(value) {
                _options = {
                    ..._options,
                    ...value,
                };
            },
        },
        trigger,
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        reset,
        resetField,
        clearErrors,
        unregister,
        setError,
        setFocus,
        getFieldState,
    };
}

/**
 * Custom hook to manage the entire form.
 *
 * @remarks
 * [API](https://react-hook-form.com/api/useform) • [Demo](https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm) • [Video](https://www.youtube.com/watch?v=RkXv4AXXC_4)
 *
 * @param props - form configuration and validation parameters.
 *
 * @returns methods - individual functions to manage the form state. {@link UseFormReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, watch, formState: { errors } } = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   console.log(watch("example"));
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input defaultValue="test" {...register("example")} />
 *       <input {...register("exampleRequired", { required: true })} />
 *       {errors.exampleRequired && <span>This field is required</span>}
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useForm(props = {}) {
    const _formControl = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
    const [formState, updateFormState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
        isDirty: false,
        isValidating: false,
        isSubmitted: false,
        isSubmitting: false,
        isSubmitSuccessful: false,
        isValid: false,
        submitCount: 0,
        dirtyFields: {},
        touchedFields: {},
        errors: {},
        defaultValues: props.defaultValues,
    });
    if (!_formControl.current) {
        _formControl.current = {
            ...createFormControl(props),
            formState,
        };
    }
    const control = _formControl.current.control;
    control._options = props;
    useSubscribe({
        subject: control._subjects.state,
        callback: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((value) => {
            if (shouldRenderFormState(value, control._proxyFormState, true)) {
                control._formState = {
                    ...control._formState,
                    ...value,
                };
                updateFormState({ ...control._formState });
            }
        }, [control]),
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        if (!control._stateFlags.mount) {
            control._proxyFormState.isValid && control._updateValid();
            control._stateFlags.mount = true;
        }
        if (control._stateFlags.watch) {
            control._stateFlags.watch = false;
            control._subjects.state.next({});
        }
        control._removeUnmounted();
    });
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        formState.submitCount && control._focusError();
    }, [control, formState.submitCount]);
    _formControl.current.formState = getProxyFormState(formState, control);
    return _formControl.current;
}


//# sourceMappingURL=index.esm.mjs.map


/***/ }),

/***/ "./src/blocks/click-to-share/block.json":
/*!**********************************************!*\
  !*** ./src/blocks/click-to-share/block.json ***!
  \**********************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","title":"Click to Share","apiVersion":2,"name":"has/click-to-share","category":"text","icon":"<svg aria-hidden=\'true\' focusable=\'false\' data-prefix=\'fas\' data-icon=\'share-alt\' className=\'svg-inline--fa fa-share-alt fa-w-14\' role=\'img\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 448 512\'><path fill=\'currentColor\' d=\'M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z\'></path></svg>","description":"An easy-to-use content highlighter.","keywords":["click","social","tweet","better","twitter","facebook","share","quote","blockquote"],"version":"1.0.0","textdomain":"highlight-and-share","attributes":{"uniqueId":{"type":"string","default":""},"shareText":{"type":"string","default":""},"backgroundColor":{"type":"string","default":"#FFFFFF"},"backgroundColorHover":{"type":"string","default":"#FFFFFF"},"iconColor":{"type":"string","default":"#000000"},"iconColorHover":{"type":"string","default":"#000000"},"textColor":{"type":"string","default":"#000000"},"textColorHover":{"type":"string","default":"#000000"},"shareTextColor":{"type":"string","default":"#000000"},"shareTextColorHover":{"type":"string","default":"#000000"},"fontSize":{"type":"integer","default":24},"clickShareFontSize":{"type":"integer","default":24},"clickText":{"type":"string","default":"Click to Share"},"padding":{"type":"integer","default":-1},"border":{"type":"integer","default":-1},"borderRadius":{"type":"integer","default":0},"borderColor":{"type":"string","default":"#000000"},"borderColorHover":{"type":"string","default":"#000000"},"fontWeight":{"type":"string","default":"#FFFFFF"},"maxWidth":{"type":"integer","default":80},"maxWidthUnit":{"type":"string","default":"%"},"align":{"type":"string","default":"center"},"alignment":{"type":"string","default":"center"},"marginLeft":{"type":"integer","default":0},"marginRight":{"type":"integer","default":0},"marginBottom":{"type":"integer","default":0},"marginTop":{"type":"integer","default":0},"paddingSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"20","right":"20","bottom":"20","left":"20","unit":"px","unitSync":true}}},"marginSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"20","right":"","bottom":"20","left":"","unit":"px","unitSync":true}}},"borderWidth":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"1","right":"1","bottom":"1","left":"1","unit":"px","unitSync":true}}},"borderRadiusSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"","right":"","bottom":"","left":"","unit":"px","unitSync":true}}}},"supports":{"anchor":true,"align":true,"className":true},"editorScript":"has-click-to-share","editorStyle":"has-style-admin-css","style":"has-style-frontend-css"}');

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

var name = 'has/click-to-share';
registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_0__, {
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