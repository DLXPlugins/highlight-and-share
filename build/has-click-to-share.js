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
/* harmony import */ var _react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../react/Components/ColorPicker */ "./src/react/Components/ColorPicker/index.js");
/* harmony import */ var _react_Components_GradientPicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../react/Components/GradientPicker */ "./src/react/Components/GradientPicker/index.js");
/* harmony import */ var _react_Components_GradientSync__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../react/Components/GradientSync */ "./src/react/Components/GradientSync/index.js");
/* harmony import */ var _react_Components_GradientGenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../react/Components/GradientGenerator */ "./src/react/Components/GradientGenerator/index.js");
/* harmony import */ var _react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../react/Components/DimensionsBlock */ "./src/react/Components/DimensionsBlock/index.js");
/* harmony import */ var _react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../react/Hooks/useDeviceType */ "./src/react/Hooks/useDeviceType.js");
/* harmony import */ var _react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../react/Utils/DimensionsHelper */ "./src/react/Utils/DimensionsHelper.js");
/* harmony import */ var _react_Components_unit_picker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../react/Components/unit-picker */ "./src/react/Components/unit-picker/index.js");
/* harmony import */ var _react_Components_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../react/Components/Typography */ "./src/react/Components/Typography/index.js");
/* harmony import */ var _react_Components_BackgroundSelector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../react/Components/BackgroundSelector */ "./src/react/Components/BackgroundSelector/index.js");
/* harmony import */ var _react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../react/Utils/TypographyHelper */ "./src/react/Utils/TypographyHelper.js");
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
  TextControl = _wp$components.TextControl,
  ButtonGroup = _wp$components.ButtonGroup,
  Button = _wp$components.Button,
  ToggleControl = _wp$components.ToggleControl;
var escapeEditableHTML = wp.escapeHtml.escapeEditableHTML;
var _wp$blockEditor = wp.blockEditor,
  InspectorControls = _wp$blockEditor.InspectorControls,
  RichText = _wp$blockEditor.RichText,
  useBlockProps = _wp$blockEditor.useBlockProps,
  InnerBlocks = _wp$blockEditor.InnerBlocks;
var useInstanceId = wp.compose.useInstanceId;
var _wp$richText = wp.richText,
  create = _wp$richText.create,
  toHTMLString = _wp$richText.toHTMLString;
var HAS_Click_To_Share = function HAS_Click_To_Share(props) {
  var _useDeviceType = (0,_react_Hooks_useDeviceType__WEBPACK_IMPORTED_MODULE_2__["default"])('Desktop'),
    _useDeviceType2 = _slicedToArray(_useDeviceType, 2),
    deviceType = _useDeviceType2[0],
    setDeviceType = _useDeviceType2[1];
  var generatedUniqueId = useInstanceId(HAS_Click_To_Share, 'has-cts');
  var attributes = props.attributes,
    setAttributes = props.setAttributes;
  var shareText = attributes.shareText,
    backgroundType = attributes.backgroundType,
    backgroundColor = attributes.backgroundColor,
    backgroundColorHover = attributes.backgroundColorHover,
    backgroundGradient = attributes.backgroundGradient,
    backgroundGradientHover = attributes.backgroundGradientHover,
    backgroundGradientSync = attributes.backgroundGradientSync,
    backgroundImage = attributes.backgroundImage,
    textColor = attributes.textColor,
    textColorHover = attributes.textColorHover,
    shareTextColor = attributes.shareTextColor,
    shareTextColorHover = attributes.shareTextColorHover,
    showClickToShare = attributes.showClickToShare,
    showIcon = attributes.showIcon,
    fontSize = attributes.fontSize,
    iconSize = attributes.iconSize,
    clickText = attributes.clickText,
    padding = attributes.padding,
    border = attributes.border,
    borderRadius = attributes.borderRadius,
    borderColor = attributes.borderColor,
    iconColor = attributes.iconColor,
    iconColorHover = attributes.iconColorHover,
    borderColorHover = attributes.borderColorHover,
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
    uniqueId = attributes.uniqueId,
    typographyQuote = attributes.typographyQuote,
    typographyShareText = attributes.typographyShareText;
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
      // Convert text over.
      var portText = toHTMLString({
        // Stolen from: https://github.com/WordPress/gutenberg/pull/23562/files
        value: create({
          html: shareText,
          preserveWhiteSpace: true
        }),
        multilineTag: 'p'
      });
      setAttributes({
        paddingSize: portPadding,
        padding: -1,
        backgroundColorHover: backgroundColor,
        shareTextColor: textColor,
        shareTextColorHover: textColor,
        textColorHover: textColor,
        borderColorHover: borderColor,
        iconColorHover: textColor,
        iconColor: textColor,
        shareText: portText
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

    // Port over icon size.
    if (-1 === iconSize) {
      setAttributes({
        iconSize: clickShareFontSize
      });
    }

    // Port over RichText to new innerblocks.
    if ('' !== shareText) {
      var _portText = wp.blocks.rawHandler({
        HTML: shareText,
        mode: 'BLOCKS'
      });
      setAttributes({
        shareText: _portText
      });
    }
  }, []);
  var getFontStyles = function getFontStyles(fontObject) {
    var fontType = fontObject[deviceType.toLowerCase()].fontType;
    var fontSlug = fontObject[deviceType.toLowerCase()].fontFamilySlug;
    if ('google' === fontType) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("link", {
        rel: "stylesheet",
        href: "".concat(has_gutenberg.cssFolder, "/has-gfont-").concat(fontSlug, ".css")
      }));
    }
    if ('adobe' === fontType) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("link", {
        rel: "stylesheet",
        href: "".concat(has_gutenberg.adobeFontsUrl, "/").concat(has_gutenberg.adobeProjectId, ".css")
      }));
    }
    return null;
  };
  var screenSize = deviceType.toLowerCase();
  var styles = "\n\t\t#".concat(uniqueId, ".has-click-to-share {\n\t\t\tmargin: ").concat((0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_3__.buildDimensionsCSS)(marginSize, deviceType), ";\n\t\t\tborder-radius: ").concat((0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_3__.buildDimensionsCSS)(borderRadiusSize, deviceType), ";\n\t\t\tborder-style: solid;\n\t\t\tborder-width: ").concat((0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_3__.buildDimensionsCSS)(borderWidth, deviceType), ";\n\t\t\tmax-width: ").concat(maxWidth).concat(maxWidthUnit, ";\n\t\t\toverflow: hidden;\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share .has-click-to-share-cta,\n\t\t#").concat(uniqueId, ".has-click-to-share .has-click-to-share-text {\n\t\t\tposition: relative;\n\t\t\tz-index: 2;\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share .has-click-to-share-wrapper {\n\t\t\tposition: relative;\n\t\t\tpadding: ").concat((0,_react_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_3__.buildDimensionsCSS)(paddingSize, deviceType), ";\n\t\t\tfont-size: ").concat(clickShareFontSize, "px;\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-color {\n\t\t\tbackground-color: ").concat(backgroundColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-color:hover {\n\t\t\tbackground-color: ").concat(backgroundColorHover, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-gradient {\n\t\t\tbackground-image: ").concat(backgroundGradient, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-gradient:hover {\n\t\t\tbackground-image: ").concat(backgroundGradientHover, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share {\n\t\t\tborder-color: ").concat(borderColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share:hover {\n\t\t\tborder-color: ").concat(borderColorHover, ";\n\t\t}\n\t\t\n\t\t#").concat(uniqueId, " .has-click-to-share-cta {\n\t\t\tcolor: ").concat(shareTextColor, "\n\t\t}\n\t\t#").concat(uniqueId, ":hover .has-click-to-share-cta {\n\t\t\tcolor: ").concat(shareTextColorHover, "\n\t\t}\n\t\t#").concat(uniqueId, " .has-click-to-share-text {\n\t\t\tcolor: ").concat(textColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ":hover .has-click-to-share-text {\n\t\t\tcolor: ").concat(textColorHover, ";\n\t\t}\n\t\t#").concat(uniqueId, " .has-click-to-share-cta svg {\n\t\t\tcolor: ").concat(iconColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ":hover .has-click-to-share-cta svg {\n\t\t\tcolor: ").concat(iconColorHover, ";\n\t\t}\n\t\t#").concat(uniqueId, " .has-click-to-share-text,\n\t\t#").concat(uniqueId, " .has-click-to-share-text p {\n\t\t\tfont-family: \"").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].fontFamily, 'fontFamily'), "\";\n\t\t\tfont-weight: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].fontWeight, 'fontWeight'), ";\n\t\t\tfont-size: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].fontSize, 'fontSize') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.getHierarchicalValueUnit)(typographyQuote, screenSize, typographyQuote[screenSize].fontSizeUnit, 'fontSizeUnit'), ";\n\t\t\tline-height: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].lineHeight, 'lineHeight') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.getHierarchicalValueUnit)(typographyQuote, screenSize, typographyQuote[screenSize].lineHeightUnit, 'lineHeightUnit'), ";\n\t\t\tletter-spacing: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].letterSpacing, 'letterSpacing') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.getHierarchicalValueUnit)(typographyQuote, screenSize, typographyQuote[screenSize].letterSpacingUnit, 'letterSpacingUnit'), ";\n\t\t\ttext-transform: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyQuote, screenSize, typographyQuote[screenSize].textTransform, 'textTransform'), ";\n\t\t}\n\t\t#").concat(uniqueId, " .has-click-to-share-cta,\n\t\t#").concat(uniqueId, " .has-click-to-share-cta p {\n\t\t\tfont-family: \"").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].fontFamily, 'fontFamily'), "\";\n\t\t\tfont-weight: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].fontWeight, 'fontWeight'), ";\n\t\t\tfont-size: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].fontSize, 'fontSize') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.getHierarchicalValueUnit)(typographyShareText, screenSize, typographyShareText[screenSize].fontSizeUnit, 'fontSizeUnit'), ";\n\t\t\tline-height: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].lineHeight, 'lineHeight') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.getHierarchicalValueUnit)(typographyShareText, screenSize, typographyShareText[screenSize].lineHeightUnit, 'lineHeightUnit'), ";\n\t\t\tletter-spacing: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].letterSpacing, 'letterSpacing') + (0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.getHierarchicalValueUnit)(typographyShareText, screenSize, typographyShareText[screenSize].letterSpacingUnit, 'letterSpacingUnit'), ";\n\t\t\ttext-transform: ").concat((0,_react_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_4__.geHierarchicalPlaceholderValue)(typographyShareText, screenSize, typographyShareText[screenSize].textTransform, 'textTransform'), ";\n\t\t}\n\t");
  var backgroundImageStyles = '';
  if ('image' === backgroundType) {
    backgroundImageStyles = "\n\t\t#".concat(uniqueId, ".has-click-to-share.has-background-image {\n\t\t\tbackground-color: ").concat(backgroundImage.backgroundColor, ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-image .has-click-to-share-wrapper:after{\n\t\t\tdisplay: block;\n\t\t\tcontent: '';\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tz-index: 1;\n\t\t\tbackground-image: url('").concat(decodeURIComponent(encodeURIComponent(backgroundImage.url)), " ');\n\t\t\tbackground-position: ").concat(escapeEditableHTML(backgroundImage.backgroundPosition), ";\n\t\t\tbackground-repeat: ").concat(escapeEditableHTML(backgroundImage.backgroundRepeat), ";\n\t\t\tbackground-size: ").concat(escapeEditableHTML(backgroundImage.backgroundSize), ";\n\t\t\topacity: ").concat(parseFloat(backgroundImage.backgroundOpacity), ";\n\t\t}\n\t\t#").concat(uniqueId, ".has-click-to-share.has-background-image .has-click-to-share-wrapper:hover:after {\n\t\t\topacity: ").concat(parseFloat(backgroundImage.backgroundOpacityHover), ";\n\t\t}\n\t\t");
  }

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
  }))), deviceType === 'Desktop' && /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Share Settings', 'highlight-and-share'),
    initialOpen: true
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(ToggleControl, {
    label: __('Show Click to Share Text', 'alerts-dlx'),
    checked: showClickToShare,
    onChange: function onChange(value) {
      setAttributes({
        showClickToShare: value
      });
    }
  })), showClickToShare && /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
    label: __('Click to Share Text', 'highlight-and-share'),
    value: clickText,
    onChange: function onChange(value) {
      setAttributes({
        clickText: value
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(ToggleControl, {
    label: __('Show Share Icon', 'alerts-dlx'),
    checked: showIcon,
    onChange: function onChange(value) {
      setAttributes({
        showIcon: value
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-range-control"
  }, /*#__PURE__*/React.createElement(RangeControl, {
    label: __('Icon Size', 'highlight-and-share'),
    value: iconSize,
    onChange: function onChange(value) {
      return setAttributes({
        iconSize: value
      });
    },
    min: 10,
    max: 150,
    step: 1
  }))), deviceType === 'Desktop' && /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Background Settings', 'highlight-and-share'),
    initialOpen: true
  }, /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-background-type"
  }, /*#__PURE__*/React.createElement("h3", null, __('Background Type', 'highlight-and-share')), /*#__PURE__*/React.createElement(ButtonGroup, null, /*#__PURE__*/React.createElement(Button, {
    variant: backgroundType === 'solid' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setAttributes({
        backgroundType: 'solid'
      });
    },
    label: __('Solid Background', 'highlight-and-share')
  }, __('Solid', 'highlight-and-share')), /*#__PURE__*/React.createElement(Button, {
    variant: backgroundType === 'gradient' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setAttributes({
        backgroundType: 'gradient'
      });
    },
    label: __('Gradient Background', 'highlight-and-share')
  }, __('Gradient', 'highlight-and-share')), /*#__PURE__*/React.createElement(Button, {
    variant: backgroundType === 'image' ? 'primary' : 'secondary',
    onClick: function onClick(e) {
      setAttributes({
        backgroundType: 'image'
      });
    },
    label: __('Image Background', 'highlight-and-share')
  }, __('Image', 'highlight-and-share')))), backgroundType === 'solid' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  }))), backgroundType === 'gradient' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-background-gradient-sync"
  }, /*#__PURE__*/React.createElement(_react_Components_GradientSync__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    setAttributes: setAttributes,
    label: __('Sync Gradients', 'highlight-and-share')
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-background-gradient"
  }, /*#__PURE__*/React.createElement(_react_Components_GradientPicker__WEBPACK_IMPORTED_MODULE_7__["default"], {
    value: backgroundGradient,
    onChange: function onChange(newValue) {
      setAttributes({
        backgroundGradient: newValue
      });
    },
    label: __('Gradient Background', 'highlight-and-share'),
    clearable: false
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-background-gradient"
  }, /*#__PURE__*/React.createElement(_react_Components_GradientPicker__WEBPACK_IMPORTED_MODULE_7__["default"], {
    value: backgroundGradientHover,
    onChange: function onChange(newValue) {
      setAttributes({
        backgroundGradientHover: newValue
      });
    },
    label: __('Gradient Background Hover', 'highlight-and-share'),
    clearable: false
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-background-gradient-generator"
  }, /*#__PURE__*/React.createElement(_react_Components_GradientGenerator__WEBPACK_IMPORTED_MODULE_8__["default"], {
    setAttributes: setAttributes,
    label: __('Generate Random Gradient', 'highlight-and-share')
  }))), backgroundType === 'image' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_BackgroundSelector__WEBPACK_IMPORTED_MODULE_9__["default"], {
    label: __('Background Image', 'highlight-and-share'),
    values: backgroundImage,
    onValuesChange: function onValuesChange(newValue) {
      setAttributes({
        backgroundImage: newValue
      });
    }
  })))), deviceType === 'Desktop' && /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Colors', 'highlight-and-share'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  }), ' '), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  }), ' '), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
    initialOpen: true
  }, /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-typography-panel-row"
  }, /*#__PURE__*/React.createElement(_react_Components_Typography__WEBPACK_IMPORTED_MODULE_10__["default"], {
    values: typographyQuote,
    screenSize: deviceType,
    onValuesChange: function onValuesChange(formValues) {
      setAttributes({
        typographyQuote: formValues
      });
    },
    label: __('Quote Typography', 'highlight-and-share')
  })), /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-typography-panel-row"
  }, /*#__PURE__*/React.createElement(_react_Components_Typography__WEBPACK_IMPORTED_MODULE_10__["default"], {
    values: typographyShareText,
    screenSize: deviceType,
    onValuesChange: function onValuesChange(formValues) {
      setAttributes({
        typographyShareText: formValues
      });
    },
    label: __('Share Text Typography', 'highlight-and-share')
  }))), /*#__PURE__*/React.createElement(PanelBody, {
    title: __('Spacing and Border', 'highlight-and-share'),
    initialOpen: true
  }, deviceType === 'Desktop' && /*#__PURE__*/React.createElement(PanelRow, {
    className: "has-unit-picker"
  }, /*#__PURE__*/React.createElement(_react_Components_unit_picker__WEBPACK_IMPORTED_MODULE_11__["default"], {
    label: __('Maximum Width', 'quotes-dlx'),
    value: maxWidthUnit,
    units: ['px', '%', 'vw'],
    onClick: function onClick(value) {
      setAttributes({
        maxWidthUnit: value
      });
    }
  }), /*#__PURE__*/React.createElement(TextControl, {
    type: 'number',
    value: maxWidth,
    onChange: function onChange(value) {
      setAttributes({
        maxWidth: value
      });
    }
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_12__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_12__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_12__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_DimensionsBlock__WEBPACK_IMPORTED_MODULE_12__["default"], {
    label: __('Border Radius', 'highlight-and-share'),
    allowNegatives: false,
    values: borderRadiusSize,
    labelTop: __('Top Left', 'highlight-and-share'),
    labelRight: __('Top Right', 'highlight-and-share'),
    labelBottom: __('Bottom Right', 'highlight-and-share'),
    labelLeft: __('Bottom Left', 'highlight-and-share'),
    units: ['px', 'em', 'rem', '%'],
    screenSize: deviceType,
    onValuesChange: function onValuesChange(newValues) {
      setAttributes({
        borderRadiusSize: newValues
      });
    }
  })), deviceType === 'Desktop' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(_react_Components_ColorPicker__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
  })))));
  var block = /*#__PURE__*/React.createElement(React.Fragment, null, inspectorControls, getFontStyles(typographyQuote), getFontStyles(typographyShareText), /*#__PURE__*/React.createElement("style", null, styles), 'image' === backgroundType && /*#__PURE__*/React.createElement("style", null, backgroundImageStyles), /*#__PURE__*/React.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('has-click-to-share', {
      'has-background-color': 'solid' === backgroundType,
      'has-background-gradient': 'gradient' === backgroundType,
      'has-background-image': 'image' === backgroundType
    }),
    id: uniqueId
  }, /*#__PURE__*/React.createElement("div", {
    className: "has-click-to-share-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "has-click-to-share-text"
  }, /*#__PURE__*/React.createElement(InnerBlocks, {
    allowedBlocks: ['core/paragraph'],
    template: [['core/paragraph', {}]],
    value: !Array.isArray(shareText) ? undefined : shareText,
    onChange: function onChange(content) {
      return setAttributes({
        shareText: content
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "has-click-to-share-cta"
  }, showClickToShare && /*#__PURE__*/React.createElement(React.Fragment, null, clickText, " "), showIcon && /*#__PURE__*/React.createElement("svg", {
    style: {
      width: iconSize,
      height: iconSize
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

/***/ "./src/fonts/fonts.js":
/*!****************************!*\
  !*** ./src/fonts/fonts.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var fontFamilies = {
  Arial: {
    name: 'Arial',
    slug: 'arial',
    family: 'Arial',
    type: 'web',
    fallback: 'sans-serif'
  },
  Helvetica: {
    name: 'Helvetica',
    slug: 'helvetica',
    family: 'Helvetica',
    type: 'web',
    fallback: 'sans-serif'
  },
  'Times New Roman': {
    name: 'Times New Roman',
    slug: 'times-new-roman',
    family: 'Times New Roman',
    type: 'web',
    fallback: 'serif'
  },
  Times: {
    name: 'Times',
    slug: 'times',
    family: 'Times',
    type: 'web',
    fallback: 'serif'
  },
  'Courier New': {
    name: 'Courier New',
    slug: 'courier-new',
    family: 'Courier New',
    type: 'web',
    fallback: 'monospace'
  },
  Courier: {
    name: 'Courier',
    slug: 'courier',
    family: 'Courier',
    type: 'web',
    fallback: 'Courier'
  },
  Verdana: {
    name: 'Verdana',
    slug: 'verdana',
    family: 'Verdana',
    type: 'web',
    fallback: 'sans-serif'
  },
  Georgia: {
    name: 'Georgia',
    slug: 'georgia',
    family: 'Georgia',
    type: 'web',
    fallback: 'serif'
  },
  Palatino: {
    name: 'Palatino',
    slug: 'palatino',
    family: 'Palatino',
    type: 'web',
    fallback: 'serif'
  },
  Garamond: {
    name: 'Garamond',
    slug: 'garamond',
    family: 'Garamond',
    type: 'web',
    fallback: 'serif'
  },
  Bookman: {
    name: 'Bookman',
    slug: 'bookman',
    family: 'Bookman',
    type: 'web',
    fallback: 'serif'
  },
  'Trebuchet MS': {
    name: 'Trebuchet MS',
    slug: 'trebuchet-ms',
    family: 'Trebuchet MS',
    type: 'web',
    fallback: 'sans-serif'
  },
  'Arial Black': {
    name: 'Arial Black',
    slug: 'arial-black',
    family: 'Arial Black',
    type: 'web',
    fallback: 'sans-serif'
  },
  Impact: {
    name: 'Impact',
    slug: 'impact',
    family: 'Impact',
    type: 'web',
    fallback: 'sans-serif'
  },
  Roboto: {
    name: 'Roboto',
    slug: 'roboto',
    family: 'Roboto',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  'Josefin Sans': {
    name: 'Josefin Sans',
    slug: 'josefin-sans',
    family: 'Josefin Sans',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  Karla: {
    name: 'Karla',
    slug: 'karla',
    family: 'Karla',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  Lato: {
    name: 'Lato',
    slug: 'lato',
    family: 'Lato',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  Montserrat: {
    name: 'Montserrat',
    slug: 'montserrat',
    family: 'Montserrat',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  'Open Sans': {
    name: 'Open Sans',
    slug: 'open-sans',
    family: 'Open Sans',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  'Playfair Display': {
    name: 'Playfair Display',
    slug: 'playfair-display',
    family: 'Playfair Display',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  Raleway: {
    name: 'Raleway',
    slug: 'raleway',
    family: 'Raleway',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  },
  'Source Sans Pro': {
    name: 'Source Sans Pro',
    slug: 'source-sans-pro',
    family: 'Source Sans Pro',
    type: 'google',
    fallback: 'Helvetica, Arial, sans-serif'
  }
};
/* harmony default export */ __webpack_exports__["default"] = (fontFamilies);

/***/ }),

/***/ "./src/react/Components/BackgroundSelector/index.js":
/*!**********************************************************!*\
  !*** ./src/react/Components/BackgroundSelector/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _ColorPicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ColorPicker */ "./src/react/Components/ColorPicker/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var BackgroundSelector = function BackgroundSelector(props) {
  var mediaUploadButton = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    backgroundSettingsVisible = _useState2[0],
    setBackgroundSettingsVisible = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    backgroundSettingsPopoverAnchor = _useState4[0],
    setBackgroundSettingsPopoverAnchor = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isVisible = _useState6[0],
    setIsVisible = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isToggled = _useState8[0],
    setIsToggled = _useState8[1];

  // Background error image state.
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    errorImage = _useState10[0],
    setErrorImage = _useState10[1];
  var getDefaultValues = function getDefaultValues() {
    return {
      url: props.values.url,
      id: props.values.id,
      backgroundColor: props.values.backgroundColor,
      backgroundSize: props.values.backgroundSize,
      backgroundPosition: props.values.backgroundPosition,
      backgroundRepeat: props.values.backgroundRepeat,
      backgroundOpacity: props.values.backgroundOpacity,
      backgroundOpacityHover: props.values.backgroundOpacityHover
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__.useWatch)({
    control: control
  });
  var label = props.label;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    props.onValuesChange(formValues);
  }, [formValues]);
  var getBackgroundRepeat = function getBackgroundRepeat() {
    var backgroundRepeat = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('repeat-x', 'highlight-and-share'),
      value: 'repeat-x'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('repeat-y', 'highlight-and-share'),
      value: 'repeat-y'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('repeat', 'highlight-and-share'),
      value: 'repeat'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('no-repeat', 'highlight-and-share'),
      value: 'no-repeat'
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: 'backgroundRepeat',
      control: control,
      render: function render(_ref) {
        var _ref$field = _ref.field,
          _onChange = _ref$field.onChange,
          value = _ref$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Repeat', 'highlight-and-share'),
          value: value,
          options: backgroundRepeat,
          onChange: function onChange(newValue) {
            _onChange(newValue);
          }
        });
      }
    });
  };

  /**
   * Close color popup if visible.
   */
  var toggleClose = function toggleClose() {
    setIsToggled(true);
    setIsVisible(!isVisible);
    setTimeout(function () {
      setIsToggled(false);
    }, 500);
  };
  var getPopoverContent = function getPopoverContent() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
      className: "has-background-settings-popover"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-background-selector__row_item"
    }, getBackgroundRepeat()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-background-selector__row_item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: 'backgroundSize',
      control: control,
      render: function render(_ref2) {
        var _ref2$field = _ref2.field,
          _onChange2 = _ref2$field.onChange,
          value = _ref2$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Size', 'highlight-and-share'),
          value: value,
          onChange: function onChange(newValue) {
            _onChange2(newValue);
          }
        });
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-background-selector__row_item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: 'backgroundPosition',
      control: control,
      render: function render(_ref3) {
        var _ref3$field = _ref3.field,
          _onChange3 = _ref3$field.onChange,
          value = _ref3$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Position', 'highlight-and-share'),
          value: value,
          onChange: function onChange(newValue) {
            _onChange3(newValue);
          }
        });
      }
    })));
  };
  var getBackgroundUploader = function getBackgroundUploader() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-background-selector-upload-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
      name: 'url',
      control: control,
      render: function render(_ref4) {
        var _ref4$field = _ref4.field,
          _onChange4 = _ref4$field.onChange,
          value = _ref4$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Image', 'highlight-and-share'),
          value: value,
          onChange: function onChange(newValue) {
            _onChange4(newValue);
          },
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter URL', 'highlight-and-share')
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-background-selector-upload-button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
      onSelect: function onSelect(media) {
        if ('image' === media.type) {
          setValue('url', media.url);
          setValue('id', media.id);
        } else {
          setErrorImage(true);
          setValue('url', '');
          setValue('id', '0');
          mediaUploadButton.current.focus();
          setTimeout(function () {
            setErrorImage(false);
          }, 8000);
        }
      },
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Background Image', 'highlight-and-share'),
      mode: 'upload',
      multiple: false,
      allowedTypes: ['image'],
      value: getValues('id'),
      render: function render(_ref5) {
        var open = _ref5.open;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          isSecondary: true,
          className: classnames__WEBPACK_IMPORTED_MODULE_4___default()({
            'has-background-selector-image-button-error': errorImage
          }),
          onClick: function onClick() {
            setErrorImage(false);
            open();
          },
          label: !errorImage ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload Background Image', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please choose only images.', 'highlight-and-share'),
          icon: "format-image",
          showTooltip: errorImage,
          tooltipPosition: "top center",
          ref: mediaUploadButton
        });
      }
    }))));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    className: "has-background-selector-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-background-selector__row_item"
  }, getBackgroundUploader()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-background-selector__row_item has-background-selector__row_item-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Settings', 'highlight-and-share')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Settings', 'highlight-and-share'),
    onClick: function onClick() {
      if (isToggled) {
        setIsToggled(false);
      } else {
        setIsVisible(!isVisible);
      }
    },
    icon: "admin-settings",
    ref: setBackgroundSettingsPopoverAnchor
  }), true === isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
    className: "has-component-background-settings-popup",
    noArrow: false,
    anchorRef: backgroundSettingsPopoverAnchor,
    placement: "left",
    offset: 10,
    headerTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Settings', 'highlight-and-share'),
    onClose: toggleClose
  }, getPopoverContent())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-background-selector__row_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: 'backgroundColor',
    control: control,
    render: function render(_ref6) {
      var _ref6$field = _ref6.field,
        _onChange5 = _ref6$field.onChange,
        value = _ref6$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ColorPicker__WEBPACK_IMPORTED_MODULE_6__["default"], {
        value: value,
        key: 'background-color-image',
        onChange: function onChange(slug, newValue) {
          _onChange5(newValue);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'highlight-and-share'),
        defaultColors: has_gutenberg.colorPalette,
        defaultColor: '#000000',
        slug: 'background-color-image'
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-background-selector__row_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: 'backgroundOpacity',
    control: control,
    render: function render(_ref7) {
      var _ref7$field = _ref7.field,
        _onChange6 = _ref7$field.onChange,
        value = _ref7$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Opacity', 'highlight-and-share'),
        value: value,
        onChange: function onChange(newValue) {
          return _onChange6(newValue);
        },
        min: 0,
        max: 1,
        step: 0.01
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-background-selector__row_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_5__.Controller, {
    name: 'backgroundOpacityHover',
    control: control,
    render: function render(_ref8) {
      var _ref8$field = _ref8.field,
        _onChange7 = _ref8$field.onChange,
        value = _ref8$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Opacity Hover', 'highlight-and-share'),
        value: value,
        onChange: function onChange(newValue) {
          return _onChange7(newValue);
        },
        min: 0,
        max: 1,
        step: 0.01
      });
    }
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (BackgroundSelector);

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
  }, !!label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
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
/* harmony import */ var _unit_picker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../unit-picker */ "./src/react/Components/unit-picker/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utils/DimensionsHelper */ "./src/react/Utils/DimensionsHelper.js");
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
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useWatch)({
    control: control
  });
  var _props$label = props.label,
    label = _props$label === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Padding', 'highlight-and-share') : _props$label,
    _props$labelTop = props.labelTop,
    labelTop = _props$labelTop === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top', 'highlight-and-share') : _props$labelTop,
    _props$labelRight = props.labelRight,
    labelRight = _props$labelRight === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right', 'highlight-and-share') : _props$labelRight,
    _props$labelBottom = props.labelBottom,
    labelBottom = _props$labelBottom === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom', 'highlight-and-share') : _props$labelBottom,
    _props$labelLeft = props.labelLeft,
    labelLeft = _props$labelLeft === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left', 'highlight-and-share') : _props$labelLeft,
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
    if ((0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.getHierarchicalValueUnitSync)(props.values, screenSize, getValues(screenSize).unitSync)) {
      changeAllValues(value);
    }
  };
  var syncIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 512"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "currentColor",
    d: "M580.2 267.3c56.2-56.2 56.2-147.4 0-203.6s-147.4-56.3-203.6 0L365.3 75l45.3 45.3 11.3-11.3c31.2-31.2 81.9-31.2 113.1 0s31.2 81.9 0 113.1L421.8 335.2c-31.2 31.2-81.9 31.2-113.1 0-25.6-25.6-30.3-64.3-13.8-94.6 1.8-3.4 3.9-6.7 6.3-9.8L250 192.4c-4.3 5.7-8.1 11.6-11.4 17.8-29.5 54.6-21.3 124.2 24.9 170.3 56.2 56.2 147.4 56.2 203.6 0l113.1-113.2zM59.8 244.7c-56.2 56.2-56.2 147.4 0 203.6s147.4 56.2 203.6 0l11.3-11.3-45.3-45.3-11.3 11.3c-31.2 31.2-81.9 31.2-113.1 0s-31.2-81.9 0-113.1l113.2-113.1c31.2-31.2 81.9-31.2 113.1 0 25.6 25.6 30.3 64.3 13.8 94.6-1.8 3.4-3.9 6.7-6.3 9.8l51.2 38.4c4.3-5.7 8.1-11.6 11.4-17.8 29.5-54.6 21.3-124.2-24.9-170.3-56.2-56.2-147.4-56.2-203.6 0L59.8 244.7z"
  }));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-base-control components-has-dimensions-control"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "".concat(screenSize, ".unit"),
    control: control,
    render: function render(_ref) {
      var _ref$field = _ref.field,
        onChange = _ref$field.onChange,
        value = _ref$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_unit_picker__WEBPACK_IMPORTED_MODULE_6__["default"], {
        label: label,
        value: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.getHierarchicalValueUnit)(props.values, screenSize, getValues(screenSize).unit),
        units: units,
        onClick: function onClick(newValue) {
          onChange(newValue);
          onChangeUnits(newValue);
        }
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "components-has-dimensions-control__inputs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "".concat(screenSize, ".top"),
    control: control,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
        _onChange = _ref2$field.onChange,
        value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelTop
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        value: getValues(screenSize).top,
        type: "number",
        label: labelTop,
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).top, 'top'),
        "data-tooltip": labelTop
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "".concat(screenSize, ".right"),
    control: control,
    render: function render(_ref3) {
      var _ref3$field = _ref3.field,
        _onChange2 = _ref3$field.onChange,
        value = _ref3$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelRight
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        value: getValues(screenSize).right,
        type: "number",
        label: labelRight,
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange2(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).right, 'right'),
        "data-tooltip": labelRight
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "".concat(screenSize, ".bottom"),
    control: control,
    render: function render(_ref4) {
      var _ref4$field = _ref4.field,
        _onChange3 = _ref4$field.onChange,
        value = _ref4$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelBottom
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        value: getValues(screenSize).bottom,
        type: "number",
        label: labelBottom,
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange3(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).bottom, 'bottom')
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_4__.Controller, {
    name: "".concat(screenSize, ".left"),
    control: control,
    render: function render(_ref5) {
      var _getValues$left;
      var _ref5$field = _ref5.field,
        _onChange4 = _ref5$field.onChange,
        value = _ref5$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "components-has-dimensions-control__input",
        "data-tooltip": labelLeft
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        value: (_getValues$left = getValues(screenSize).left) !== null && _getValues$left !== void 0 ? _getValues$left : 0,
        type: "number",
        label: labelLeft,
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('components-has-dimensions-control__number'),
        onChange: function onChange(newValue) {
          onDimensionChange(newValue);
          _onChange4(newValue);
        },
        min: 0,
        placeholder: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).left, 'left')
      }));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
    text: !!getValues(screenSize).unitSync ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unsync', 'highlight-and-share') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sync', 'highlight-and-share')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "components-has-dimensions-control_sync",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sync Units', 'generateblocks'),
    isPrimary: (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.getHierarchicalValueUnitSync)(props.values, screenSize, getValues(screenSize).unitSync),
    "aria-pressed": (0,_Utils_DimensionsHelper__WEBPACK_IMPORTED_MODULE_5__.getHierarchicalValueUnitSync)(props.values, screenSize, getValues(screenSize).unitSync)
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

/***/ "./src/react/Components/GradientGenerator/index.js":
/*!*********************************************************!*\
  !*** ./src/react/Components/GradientGenerator/index.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utils_GetRandomGradient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/GetRandomGradient */ "./src/react/Utils/GetRandomGradient.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Gradient Generator (random)
 *
 */






var HASGradientGenerator = function HASGradientGenerator(props) {
  var label = props.label,
    setAttributes = props.setAttributes;
  var getGradient = function getGradient() {
    var gradient = (0,_Utils_GetRandomGradient__WEBPACK_IMPORTED_MODULE_3__["default"])();
    setAttributes({
      backgroundGradient: gradient,
      backgroundGradientHover: gradient
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    className: "has-component-gradient-generator-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "has-component-gradient-generator",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Generate Random Gradients', 'highlight-and-share'),
    icon: "randomize",
    onClick: function onClick() {
      getGradient();
    },
    variant: "secondary"
  }));
};
HASGradientGenerator.defaultProps = {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gradient Color', 'highlight-and-share'),
  setAttributes: function setAttributes() {}
};
HASGradientGenerator.propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string.isRequired),
  setAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (HASGradientGenerator);

/***/ }),

/***/ "./src/react/Components/GradientPicker/index.js":
/*!******************************************************!*\
  !*** ./src/react/Components/GradientPicker/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
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





var HASGradientPicker = function HASGradientPicker(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isVisible = _useState2[0],
    setIsVisible = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isToggled = _useState4[0],
    setIsToggled = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    gradientPickerButtonAnchor = _useState6[0],
    setGradientPickerButtonAnchor = _useState6[1];
  var label = props.label,
    onChange = props.onChange,
    value = props.value,
    clearable = props.clearable;

  /**
   * Get a gradient style object.
   *
   * @return {Object} Gradient style object.
   */
  var getGradientStyles = function getGradientStyles() {
    var hexRegex = /#?[0-9A-Fa-f]{6}/gm; // From: https://linuxhint.com/check-if-string-is-hex-in-javascript/
    if ('' === value) {
      return {
        background: '#FFFFFF'
      };
    }
    if (value.match(hexRegex)) {
      return {
        backgroundColor: value
      };
    }
    // Return gradient style value.
    return {
      backgroundImage: value
    };
  };

  /**
   * Close color popup if visible.
   */
  var toggleClose = function toggleClose() {
    setIsToggled(true);
    setIsVisible(!isVisible);
    setTimeout(function () {
      setIsToggled(false);
    }, 500);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    className: "has-component-gradient-picker-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "has-component-gradient-picker",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Open Gradient Picker', 'highlight-and-share'),
    style: getGradientStyles(),
    ref: gradientPickerButtonAnchor,
    onClick: function onClick() {
      if (isToggled) {
        setIsToggled(false);
      } else {
        setIsVisible(!isVisible);
      }
    }
  }), true === isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
    className: "has-component-gradient-picker-popover",
    noArrow: false,
    anchor: gradientPickerButtonAnchor,
    placement: "left",
    offset: 8,
    onClose: toggleClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.GradientPicker, {
    value: value,
    onChange: onChange,
    clearable: clearable
  })));
};
HASGradientPicker.defaultProps = {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gradient Color', 'highlight-and-share'),
  clearable: false,
  value: '',
  onChange: function onChange() {}
};
HASGradientPicker.propTypes = {
  clearable: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  value: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.isRequired),
  label: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.isRequired),
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (HASGradientPicker);

/***/ }),

/***/ "./src/react/Components/GradientSync/index.js":
/*!****************************************************!*\
  !*** ./src/react/Components/GradientSync/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */





var HASGradientSync = function HASGradientSync(props) {
  var label = props.label,
    attributes = props.attributes,
    setAttributes = props.setAttributes;
  var backgroundGradient = attributes.backgroundGradient,
    backgroundGradientSync = attributes.backgroundGradientSync;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (backgroundGradientSync) {
      setAttributes({
        backgroundGradientHover: backgroundGradient
      });
    }
  }, [backgroundGradient, backgroundGradientSync]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    className: "has-component-gradient-sync-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "has-component-gradient-sync",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sync Background Gradients', 'highlight-and-share'),
    icon: backgroundGradientSync ? 'admin-links' : 'editor-unlink',
    onClick: function onClick() {
      setAttributes({
        backgroundGradientSync: !backgroundGradientSync
      });
    },
    variant: backgroundGradientSync ? 'primary' : 'secondary'
  }));
};
HASGradientSync.defaultProps = {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gradient Color', 'highlight-and-share'),
  attributes: {},
  setAttributes: function setAttributes() {}
};
HASGradientSync.propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.isRequired),
  attributes: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object.isRequired),
  setAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func.isRequired)
};
/* harmony default export */ __webpack_exports__["default"] = (HASGradientSync);

/***/ }),

/***/ "./src/react/Components/Typography/index.js":
/*!**************************************************!*\
  !*** ./src/react/Components/Typography/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fonts_fonts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../fonts/fonts */ "./src/fonts/fonts.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utils/TypographyHelper */ "./src/react/Utils/TypographyHelper.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var Typography = function Typography(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('desktop'),
    _useState2 = _slicedToArray(_useState, 2),
    screenSize = _useState2[0],
    setScreenSize = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    fontSizeUnitPopoverVisible = _useState4[0],
    setFontSizeUnitPopoverVisible = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    fontSizeUnitPopoverAnchor = _useState6[0],
    setFontSizeUnitPopoverAnchor = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    lineHeightUnitPopoverVisible = _useState8[0],
    setLineHeightUnitPopoverVisible = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    lineHeightUnitPopoverAnchor = _useState10[0],
    setLineHeightUnitPopoverAnchor = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    letterSpacingUnitPopoverVisible = _useState12[0],
    setLetterSpacingUnitPopoverVisible = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    letterSpacingUnitPopoverAnchor = _useState14[0],
    setLetterSpacingUnitPopoverAnchor = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    fontSettingsPopoverVisible = _useState16[0],
    setFontSettingsPopoverVisible = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState18 = _slicedToArray(_useState17, 2),
    fontSettingsPopoverAnchor = _useState18[0],
    setFontSettingsPopoverAnchor = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState20 = _slicedToArray(_useState19, 2),
    isVisible = _useState20[0],
    setIsVisible = _useState20[1]; // for the main typography settings popup.
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState22 = _slicedToArray(_useState21, 2),
    isToggled = _useState22[0],
    setIsToggled = _useState22[1]; // for the main typography settings popup.

  var getDefaultValues = function getDefaultValues() {
    return {
      mobile: {
        fontFamily: props.values.mobile.fontFamily,
        fontFamilySlug: props.values.mobile.fontFamilySlug,
        fontSize: props.values.mobile.fontSize,
        fontSizeUnit: props.values.mobile.fontSizeUnit,
        fontWeight: props.values.mobile.fontWeight,
        lineHeight: props.values.mobile.lineHeight,
        lineHeightUnit: props.values.mobile.lineHeightUnit,
        textTransform: props.values.mobile.textTransform,
        letterSpacing: props.values.mobile.letterSpacing,
        letterSpacingUnit: props.values.mobile.letterSpacingUnit,
        fontType: props.values.mobile.fontType,
        fontFallback: props.values.mobile.fontFallback
      },
      tablet: {
        fontFamily: props.values.tablet.fontFamily,
        fontFamilySlug: props.values.tablet.fontFamilySlug,
        fontSize: props.values.tablet.fontSize,
        fontSizeUnit: props.values.tablet.fontSizeUnit,
        fontWeight: props.values.tablet.fontWeight,
        lineHeight: props.values.tablet.lineHeight,
        lineHeightUnit: props.values.tablet.lineHeightUnit,
        textTransform: props.values.tablet.textTransform,
        letterSpacing: props.values.tablet.letterSpacing,
        letterSpacingUnit: props.values.tablet.letterSpacingUnit,
        fontType: props.values.tablet.fontType,
        fontFallback: props.values.tablet.fontFallback
      },
      desktop: {
        fontFamily: props.values.desktop.fontFamily,
        fontFamilySlug: props.values.desktop.fontFamilySlug,
        fontSize: props.values.desktop.fontSize,
        fontSizeUnit: props.values.desktop.fontSizeUnit,
        fontWeight: props.values.desktop.fontWeight,
        lineHeight: props.values.desktop.lineHeight,
        lineHeightUnit: props.values.desktop.lineHeightUnit,
        textTransform: props.values.desktop.textTransform,
        letterSpacing: props.values.desktop.letterSpacing,
        letterSpacingUnit: props.values.desktop.letterSpacingUnit,
        fontType: props.values.desktop.fontType,
        fontFallback: props.values.desktop.fontFallback
      }
    };
  };
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useForm)({
      defaultValues: getDefaultValues()
    }),
    control = _useForm.control,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_3__.useWatch)({
    control: control
  });
  var label = props.label;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    props.onValuesChange(formValues);
  }, [formValues]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setScreenSize(props.screenSize.toLowerCase());
    setValue(props.screenSize.toLowerCase(), getValues(props.screenSize.toLowerCase()));
  }, [props.screenSize]);

  /**
   * Close color popup if visible.
   */
  var toggleClose = function toggleClose() {
    setIsToggled(true);
    setIsVisible(!isVisible);
    setTimeout(function () {
      setIsToggled(false);
    }, 500);
  };

  // Retrieve the list all available fonts.
  var getFonts = function getFonts() {
    var adobeFonts = has_gutenberg.adobeFonts;
    var fonts = [];
    var families = Object.values(_fonts_fonts__WEBPACK_IMPORTED_MODULE_4__["default"]);
    var mergedFamilies = [];
    families.forEach(function (fontFamily) {
      fonts.push({
        label: fontFamily.name,
        value: fontFamily.slug
      });
      mergedFamilies.push({
        family: fontFamily.family,
        slug: fontFamily.slug,
        fallback: fontFamily.fallback,
        type: fontFamily.type
      });
    });
    // Push adobe fonts to the front.
    adobeFonts.forEach(function (font) {
      fonts.unshift({
        label: font.name,
        value: font.slug
      });
      mergedFamilies.push({
        family: font.family,
        slug: font.slug,
        fallback: font.fallback,
        type: 'adobe'
      });
    });
    // Add placeholder.
    fonts.unshift({
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a Font', 'highlight-and-share'),
      value: ''
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".fontFamilySlug"),
      control: control,
      render: function render(_ref) {
        var _ref$field = _ref.field,
          _onChange = _ref$field.onChange,
          value = _ref$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Family', 'highlight-and-share'),
          value: (0,_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_5__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).fontFamilySlug, 'fontFamilySlug'),
          options: fonts,
          onChange: function onChange(newValue) {
            _onChange(newValue);

            // Get font family name for CSS.
            mergedFamilies.forEach(function (font) {
              if (font.slug === newValue) {
                setValue("".concat(screenSize, ".fontFamily"), font.family);
                setValue("".concat(screenSize, ".fontFallback"), font.fallback);
                setValue("".concat(screenSize, ".fontType"), font.type);
              }
            });
          }
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".fontFamily"),
      control: control,
      render: function render(_ref2) {
        var value = _ref2.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).fontFamily
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".fontFallback"),
      control: control,
      render: function render(_ref3) {
        var value = _ref3.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).fontFallback
        });
      }
    }));
  };
  var getTextTransform = function getTextTransform() {
    var textTransform = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('None', 'highlight-and-share'),
      value: 'none'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Uppercase', 'highlight-and-share'),
      value: 'uppercase'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lowercase', 'highlight-and-share'),
      value: 'lowercase'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Capitalize', 'highlight-and-share'),
      value: 'capitalize'
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".textTransform"),
      control: control,
      render: function render(_ref4) {
        var _ref4$field = _ref4.field,
          _onChange2 = _ref4$field.onChange,
          value = _ref4$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text Transform', 'highlight-and-share'),
          value: (0,_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_5__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).textTransform, 'textTransform'),
          options: textTransform,
          onChange: function onChange(newValue) {
            _onChange2(newValue);
          }
        });
      }
    });
  };
  var getFontSize = function getFontSize() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".fontSize"),
      control: control,
      render: function render(_ref5) {
        var _onChange3 = _ref5.field.onChange;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Size', 'highlight-and-share'),
          value: getValues(screenSize).fontSize,
          onChange: function onChange(newValue) {
            _onChange3(newValue);
          },
          type: "number",
          placeholder: (0,_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_5__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).fontSize, 'fontSize')
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".fontSizeUnit"),
      control: control,
      render: function render(_ref6) {
        var value = _ref6.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).fontSizeUnit
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      variant: "secondary",
      label: getValues("".concat(screenSize, ".fontSizeUnit")),
      onClick: function onClick() {
        setFontSizeUnitPopoverVisible(!fontSizeUnitPopoverVisible);
      },
      ref: setFontSizeUnitPopoverAnchor
    }, getValues("".concat(screenSize, ".fontSizeUnit"))), true === fontSizeUnitPopoverVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
      className: "has-component-font-unit-picker",
      noArrow: true,
      anchor: fontSizeUnitPopoverAnchor
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: getValues("".concat(screenSize, ".fontSizeUnit")) === 'px',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".fontSizeUnit"), 'px');
        setFontSizeUnitPopoverVisible(false);
      }
    }, "px"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: getValues("".concat(screenSize, ".fontSizeUnit")) === 'em',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".fontSizeUnit"), 'em');
        setFontSizeUnitPopoverVisible(false);
      }
    }, "em"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: getValues("".concat(screenSize, ".fontSizeUnit")) === 'rem',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".fontSizeUnit"), 'rem');
        setFontSizeUnitPopoverVisible(false);
      }
    }, "rem"))));
  };
  var getFontWeights = function getFontWeights() {
    var fontWeights = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('100', 'highlight-and-share'),
      value: '100'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('200', 'highlight-and-share'),
      value: '200'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('300', 'highlight-and-share'),
      value: '300'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('400', 'highlight-and-share'),
      value: '400'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('500', 'highlight-and-share'),
      value: '500'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('600', 'highlight-and-share'),
      value: '600'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('700', 'highlight-and-share'),
      value: '700'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('800', 'highlight-and-share'),
      value: '800'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('900', 'highlight-and-share'),
      value: '900'
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".fontWeight"),
      control: control,
      render: function render(_ref7) {
        var _ref7$field = _ref7.field,
          _onChange4 = _ref7$field.onChange,
          value = _ref7$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Weight', 'highlight-and-share'),
          value: getValues(screenSize).fontWeight,
          options: fontWeights,
          onChange: function onChange(newValue) {
            _onChange4(newValue);
          }
        });
      }
    });
  };
  var getLineHeight = function getLineHeight() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".lineHeight"),
      control: control,
      render: function render(_ref8) {
        var _ref8$field = _ref8.field,
          _onChange5 = _ref8$field.onChange,
          value = _ref8$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Line Height', 'highlight-and-share'),
          value: getValues(screenSize).lineHeight,
          onChange: function onChange(newValue) {
            _onChange5(newValue);
          },
          type: "number",
          placeholder: (0,_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_5__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).lineHeight, 'lineHeight')
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".lineHeightUnit"),
      control: control,
      render: function render(_ref9) {
        var value = _ref9.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).lineHeightUnit
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      variant: "secondary",
      label: getValues("".concat(screenSize, ".lineHeightUnit")),
      onClick: function onClick() {
        setLineHeightUnitPopoverVisible(!lineHeightUnitPopoverVisible);
      },
      ref: setLineHeightUnitPopoverAnchor
    }, getValues("".concat(screenSize, ".lineHeightUnit"))), true === lineHeightUnitPopoverVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
      className: "has-component-font-unit-picker",
      noArrow: true,
      anchor: lineHeightUnitPopoverAnchor
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: getValues("".concat(screenSize, ".lineHeightUnit")) === 'px',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".lineHeightUnit"), 'px');
        setLineHeightUnitPopoverVisible(false);
      }
    }, "px"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: getValues("".concat(screenSize, ".lineHeightUnit")) === 'em',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".lineHeightUnit"), 'em');
        setLineHeightUnitPopoverVisible(false);
      }
    }, "em"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: getValues("".concat(screenSize, ".lineHeightUnit")) === 'rem',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".lineHeightUnit"), 'rem');
        setLineHeightUnitPopoverVisible(false);
      }
    }, "rem"))));
  };
  var getFontType = function getFontType() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".fontType"),
      control: control,
      render: function render(_ref10) {
        var value = _ref10.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).fontType
        });
      }
    });
  };
  var getFontFallback = function getFontFallback() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".fontFallback"),
      control: control,
      render: function render(_ref11) {
        var value = _ref11.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).fontFallback
        });
      }
    });
  };
  var getLetterSpacing = function getLetterSpacing() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".letterSpacing"),
      control: control,
      render: function render(_ref12) {
        var _ref12$field = _ref12.field,
          _onChange6 = _ref12$field.onChange,
          value = _ref12$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Letter Spacing', 'highlight-and-share'),
          value: getValues(screenSize).letterSpacing,
          onChange: function onChange(newValue) {
            _onChange6(newValue);
          },
          type: "number",
          placeholder: (0,_Utils_TypographyHelper__WEBPACK_IMPORTED_MODULE_5__.geHierarchicalPlaceholderValue)(props.values, screenSize, getValues(screenSize).letterSpacing, 'letterSpacing')
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_3__.Controller, {
      name: "".concat(screenSize, ".letterSpacingUnit"),
      control: control,
      render: function render(_ref13) {
        var value = _ref13.field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          type: "hidden",
          value: getValues(screenSize).letterSpacingUnit
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      variant: "secondary",
      label: getValues("".concat(screenSize, ".letterSpacingUnit")),
      onClick: function onClick() {
        setLetterSpacingUnitPopoverVisible(!letterSpacingUnitPopoverVisible);
      },
      ref: setLetterSpacingUnitPopoverAnchor
    }, getValues("".concat(screenSize, ".letterSpacingUnit"))), true === letterSpacingUnitPopoverVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
      className: "has-component-font-unit-picker",
      noArrow: true,
      anchor: letterSpacingUnitPopoverAnchor
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: getValues("".concat(screenSize, ".letterSpacingUnit")) === 'px',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".letterSpacingUnit"), 'px');
        setLetterSpacingUnitPopoverVisible(false);
      }
    }, "px"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: getValues("".concat(screenSize, ".letterSpacingUnit")) === 'em',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".letterSpacingUnit"), 'em');
        setLetterSpacingUnitPopoverVisible(false);
      }
    }, "em"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: getValues("".concat(screenSize, ".letterSpacingUnit")) === 'rem',
      onClick: function onClick() {
        setValue("".concat(screenSize, ".letterSpacingUnit"), 'rem');
        setLetterSpacingUnitPopoverVisible(false);
      }
    }, "rem"))));
  };
  var getPopoverContent = function getPopoverContent() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
      className: "has-typography-picker"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row has-typography-picker__row__col-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item"
    }, getFonts())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row has-typography-picker__row__col-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item"
    }, getTextTransform(), getFontType(), getFontFallback())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row has-typography-picker__row__col-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item has-units"
    }, getFontSize()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item"
    }, getFontWeights())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row has-typography-picker__row__col-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item has-units"
    }, getLineHeight()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "has-typography-picker__row_item has-units"
    }, getLetterSpacing())));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
    className: "has-typography-picker-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-typography-component-label"
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "has-typography-component-settings"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Settings', 'highlight-and-share'),
    onClick: function onClick() {
      if (isToggled) {
        setIsToggled(false);
      } else {
        setIsVisible(!isVisible);
      }
    },
    icon: "admin-settings"
  }), true === isVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
    className: "has-component-typography-popup",
    noArrow: false,
    anchor: fontSettingsPopoverAnchor,
    placement: "left",
    offset: 10,
    onClose: toggleClose
  }, getPopoverContent())));
};
/* harmony default export */ __webpack_exports__["default"] = (Typography);

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
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: Unit type (px, em, %) */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%s Units', 'highlight-and-share'), unitName),
      key: unit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
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

/***/ "./src/react/Utils/GetRandomGradient.js":
/*!**********************************************!*\
  !*** ./src/react/Utils/GetRandomGradient.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var gradients = [{
  label: 'Warm Flame',
  value: 'linear-gradient(45deg, rgb(255,154,158) 0%, rgb(250,208,196) 99%, rgb(250,208,196) 100%)'
}, {
  label: 'Night Fade',
  value: 'linear-gradient(to top, rgb(161,140,209) 0%, rgb(251,194,235) 100%)'
}, {
  label: 'Spring Warmth',
  value: 'linear-gradient(to top, rgb(250,208,196) 0%, rgb(255,209,255) 100%)'
}, {
  label: 'Juicy Peach',
  value: 'linear-gradient(to right, rgb(255,236,210) 0%, rgb(252,182,159) 100%)'
}, {
  label: 'Young Passion',
  value: 'linear-gradient(to right, rgb(255,129,119) 0%, rgb(255,134,122) 0%, rgb(255,140,127) 21%, rgb(249,145,133) 52%, rgb(207,85,108) 78%, rgb(177,42,91) 100%)'
}, {
  label: 'Lady Lips',
  value: 'linear-gradient(to top, rgb(255,154,158) 0%, rgb(254,207,239) 99%, rgb(254,207,239) 100%)'
}, {
  label: 'Sunny Morning',
  value: 'linear-gradient(120deg, rgb(246,211,101) 0%, rgb(253,160,133) 100%)'
}, {
  label: 'Rainy Ashville',
  value: 'linear-gradient(to top, rgb(251,194,235) 0%, rgb(166,193,238) 100%)'
}, {
  label: 'Frozen Dreams',
  value: 'linear-gradient(to top, rgb(253,203,241) 0%, rgb(253,203,241) 1%, rgb(230,222,233) 100%)'
}, {
  label: 'Winter Neva',
  value: 'linear-gradient(120deg, rgb(161,196,253) 0%, rgb(194,233,251) 100%)'
}, {
  label: 'Dusty Grass',
  value: 'linear-gradient(120deg, rgb(212,252,121) 0%, rgb(150,230,161) 100%)'
}, {
  label: 'Tempting Azure',
  value: 'linear-gradient(120deg, rgb(132,250,176) 0%, rgb(143,211,244) 100%)'
}, {
  label: 'Heavy Rain',
  value: 'linear-gradient(to top, rgb(207,217,223) 0%, rgb(226,235,240) 100%)'
}, {
  label: 'Amy Crisp',
  value: 'linear-gradient(120deg, rgb(166,192,254) 0%, rgb(246,128,132) 100%)'
}, {
  label: 'Mean Fruit',
  value: 'linear-gradient(120deg, rgb(252,203,144) 0%, rgb(213,126,235) 100%)'
}, {
  label: 'Deep Blue',
  value: 'linear-gradient(120deg, rgb(224,195,252) 0%, rgb(142,197,252) 100%)'
}, {
  label: 'Ripe Malinka',
  value: 'linear-gradient(120deg, rgb(240,147,251) 0%, rgb(245,87,108) 100%)'
}, {
  label: 'Cloudy Knoxville',
  value: 'linear-gradient(120deg, rgb(253,251,251) 0%, rgb(235,237,238) 100%)'
}, {
  label: 'Malibu Beach',
  value: 'linear-gradient(to right, rgb(79,172,254) 0%, rgb(0,242,254) 100%)'
}, {
  label: 'New Life',
  value: 'linear-gradient(to right, rgb(67,233,123) 0%, rgb(56,249,215) 100%)'
}, {
  label: 'True Sunset',
  value: 'linear-gradient(to right, rgb(250,112,154) 0%, rgb(254,225,64) 100%)'
}, {
  label: 'Morpheus Den',
  value: 'linear-gradient(to top, rgb(48,207,208) 0%, rgb(51,8,103) 100%)'
}, {
  label: 'Rare Wind',
  value: 'linear-gradient(to top, rgb(168,237,234) 0%, rgb(254,214,227) 100%)'
}, {
  label: 'Near Moon',
  value: 'linear-gradient(to top, rgb(94,231,223) 0%, rgb(180,144,202) 100%)'
}, {
  label: 'Wild Apple',
  value: 'linear-gradient(to top, rgb(210,153,194) 0%, rgb(254,249,215) 100%)'
}, {
  label: 'Saint Petersburg',
  value: 'linear-gradient(135deg, rgb(245,247,250) 0%, rgb(195,207,226) 100%)'
}, {
  label: 'Arielles Smile',
  value: 'radial-gradient(circle 248px at center, rgb(22,217,227) 0%, rgb(48,199,236) 47%, rgb(70,174,247) 100%)'
}, {
  label: 'Plum Plate',
  value: 'linear-gradient(135deg, rgb(102,126,234) 0%, rgb(118,75,162) 100%)'
}, {
  label: 'Everlasting Sky',
  value: 'linear-gradient(135deg, rgb(253,252,251) 0%, rgb(226,209,195) 100%)'
}, {
  label: 'Happy Fisher',
  value: 'linear-gradient(120deg, rgb(137,247,254) 0%, rgb(102,166,255) 100%)'
}, {
  label: 'Blessing',
  value: 'linear-gradient(to top, rgb(253,219,146) 0%, rgb(209,253,255) 100%)'
}, {
  label: 'Sharpeye Eagle',
  value: 'linear-gradient(to top, rgb(152,144,227) 0%, rgb(177,244,207) 100%)'
}, {
  label: 'Ladoga Bottom',
  value: 'linear-gradient(to top, rgb(235,192,253) 0%, rgb(217,222,216) 100%)'
}, {
  label: 'Lemon Gate',
  value: 'linear-gradient(to top, rgb(150,251,196) 0%, rgb(249,245,134) 100%)'
}, {
  label: 'Itmeo Branding',
  value: 'linear-gradient(180deg, rgb(42,245,152) 0%, rgb(0,158,253) 100%)'
}, {
  label: 'Zeus Miracle',
  value: 'linear-gradient(to top, rgb(205,156,242) 0%, rgb(246,243,255) 100%)'
}, {
  label: 'Old Hat',
  value: 'linear-gradient(to right, rgb(228,175,203) 0%, rgb(184,203,184) 0%, rgb(184,203,184) 0%, rgb(226,197,139) 30%, rgb(194,206,156) 64%, rgb(126,219,220) 100%)'
}, {
  label: 'Star Wine',
  value: 'linear-gradient(to right, rgb(184,203,184) 0%, rgb(184,203,184) 0%, rgb(180,101,218) 0%, rgb(207,108,201) 33%, rgb(238,96,156) 66%, rgb(238,96,156) 100%)'
}, {
  label: 'Deep Blue',
  value: 'linear-gradient(to right, rgb(106,17,203) 0%, rgb(37,117,252) 100%)'
}, {
  label: 'Happy Acid',
  value: 'linear-gradient(to top, rgb(55,236,186) 0%, rgb(114,175,211) 100%)'
}, {
  label: 'Awesome Pine',
  value: 'linear-gradient(to top, rgb(235,187,167) 0%, rgb(207,199,248) 100%)'
}, {
  label: 'New York',
  value: 'linear-gradient(to top, rgb(255,241,235) 0%, rgb(172,224,249) 100%)'
}, {
  label: 'Shy Rainbow',
  value: 'linear-gradient(to right, rgb(238,162,162) 0%, rgb(187,193,191) 19%, rgb(87,198,225) 42%, rgb(180,159,218) 79%, rgb(122,197,216) 100%)'
}, {
  label: 'Mixed Hopes',
  value: 'linear-gradient(to top, rgb(196,113,245) 0%, rgb(250,113,205) 100%)'
}, {
  label: 'Fly High',
  value: 'linear-gradient(to top, rgb(72,198,239) 0%, rgb(111,134,214) 100%)'
}, {
  label: 'Strong Bliss',
  value: 'linear-gradient(to right, rgb(247,140,160) 0%, rgb(249,116,143) 19%, rgb(253,134,140) 60%, rgb(254,154,139) 100%)'
}, {
  label: 'Fresh Milk',
  value: 'linear-gradient(to top, rgb(254,173,166) 0%, rgb(245,239,239) 100%)'
}, {
  label: 'Snow Again',
  value: 'linear-gradient(to top, rgb(230,233,240) 0%, rgb(238,241,245) 100%)'
}, {
  label: 'February Ink',
  value: 'linear-gradient(to top, rgb(172,203,238) 0%, rgb(231,240,253) 100%)'
}, {
  label: 'Kind Steel',
  value: 'linear-gradient(-20deg, rgb(233,222,250) 0%, rgb(251,252,219) 100%)'
}, {
  label: 'Soft Grass',
  value: 'linear-gradient(to top, rgb(193,223,196) 0%, rgb(222,236,221) 100%)'
}, {
  label: 'Grown Early',
  value: 'linear-gradient(to top, rgb(11,163,96) 0%, rgb(60,186,146) 100%)'
}, {
  label: 'Sharp Blues',
  value: 'linear-gradient(to top, rgb(0,198,251) 0%, rgb(0,91,234) 100%)'
}, {
  label: 'Shady Water',
  value: 'linear-gradient(to right, rgb(116,235,213) 0%, rgb(159,172,230) 100%)'
}, {
  label: 'Dirty Beauty',
  value: 'linear-gradient(to top, rgb(106,133,182) 0%, rgb(186,200,224) 100%)'
}, {
  label: 'Great Whale',
  value: 'linear-gradient(to top, rgb(163,189,237) 0%, rgb(105,145,199) 100%)'
}, {
  label: 'Teen Notebook',
  value: 'linear-gradient(to top, rgb(151,149,240) 0%, rgb(251,200,212) 100%)'
}, {
  label: 'Polite Rumors',
  value: 'linear-gradient(to top, rgb(167,166,203) 0%, rgb(137,137,186) 52%, rgb(137,137,186) 100%)'
}, {
  label: 'Sweet Period',
  value: 'linear-gradient(to top, rgb(63,81,177) 0%, rgb(90,85,174) 13%, rgb(123,95,172) 25%, rgb(143,106,174) 38%, rgb(168,106,164) 50%, rgb(204,107,142) 62%, rgb(241,130,113) 75%, rgb(243,164,105) 87%, rgb(247,201,120) 100%)'
}, {
  label: 'Wide Matrix',
  value: 'linear-gradient(to top, rgb(252,197,228) 0%, rgb(253,163,75) 15%, rgb(255,120,130) 35%, rgb(200,105,158) 52%, rgb(112,70,170) 71%, rgb(12,29,184) 87%, rgb(2,15,117) 100%)'
}, {
  label: 'Soft Cherish',
  value: 'linear-gradient(to top, rgb(219,220,215) 0%, rgb(221,220,215) 24%, rgb(226,201,204) 30%, rgb(231,98,125) 46%, rgb(184,35,90) 59%, rgb(128,19,87) 71%, rgb(61,22,53) 84%, rgb(28,26,39) 100%)'
}, {
  label: 'Red Salvation',
  value: 'linear-gradient(to top, rgb(244,59,71) 0%, rgb(69,58,148) 100%)'
}, {
  label: 'Burning Spring',
  value: 'linear-gradient(to top, rgb(79,181,118) 0%, rgb(68,196,137) 30%, rgb(40,169,174) 46%, rgb(40,162,183) 59%, rgb(76,119,136) 71%, rgb(108,79,99) 86%, rgb(67,44,57) 100%)'
}, {
  label: 'Night Party',
  value: 'linear-gradient(to top, rgb(2,80,197) 0%, rgb(212,63,141) 100%)'
}, {
  label: 'Sky Glider',
  value: 'linear-gradient(to top, rgb(136,211,206) 0%, rgb(110,69,226) 100%)'
}, {
  label: 'Heaven Peach',
  value: 'linear-gradient(to top, rgb(217,175,217) 0%, rgb(151,217,225) 100%)'
}, {
  label: 'Purple Division',
  value: 'linear-gradient(to top, rgb(112,40,228) 0%, rgb(229,178,202) 100%)'
}, {
  label: 'Aqua Splash',
  value: 'linear-gradient(15deg, rgb(19,84,122) 0%, rgb(128,208,199) 100%)'
}, {
  label: 'Spiky Naga',
  value: 'linear-gradient(to top, rgb(80,82,133) 0%, rgb(88,94,146) 12%, rgb(101,104,159) 25%, rgb(116,116,176) 37%, rgb(126,126,187) 50%, rgb(131,137,199) 62%, rgb(151,149,212) 75%, rgb(162,161,220) 87%, rgb(181,174,228) 100%)'
}, {
  label: 'Love Kiss',
  value: 'linear-gradient(to top, rgb(255,8,68) 0%, rgb(255,177,153) 100%)'
}, {
  label: 'Cochiti Lake',
  value: 'linear-gradient(45deg, rgb(147,165,207) 0%, rgb(228,239,233) 100%)'
}, {
  label: 'Premium Dark',
  value: 'linear-gradient(to right, rgb(67,67,67) 0%, black 100%)'
}, {
  label: 'Cold Evening',
  value: 'linear-gradient(to top, rgb(12,52,131) 0%, rgb(162,182,223) 100%, rgb(107,140,206) 100%, rgb(162,182,223) 100%)'
}, {
  label: 'Summer Games',
  value: 'linear-gradient(to right, rgb(146,254,157) 0%, rgb(0,201,255) 100%)'
}, {
  label: 'Passionate Bed',
  value: 'linear-gradient(to right, rgb(255,117,140) 0%, rgb(255,126,179) 100%)'
}, {
  label: 'Mountain Rock',
  value: 'linear-gradient(to right, rgb(134,143,150) 0%, rgb(89,97,100) 100%)'
}, {
  label: 'Desert Hump',
  value: 'linear-gradient(to top, rgb(199,144,129) 0%, rgb(223,165,121) 100%)'
}, {
  label: 'Jungle Day',
  value: 'linear-gradient(45deg, rgb(139,170,170) 0%, rgb(174,139,156) 100%)'
}, {
  label: 'Phoenix Start',
  value: 'linear-gradient(to right, rgb(248,54,0) 0%, rgb(249,212,35) 100%)'
}, {
  label: 'October Silence',
  value: 'linear-gradient(-20deg, rgb(183,33,255) 0%, rgb(33,212,253) 100%)'
}, {
  label: 'Faraway River',
  value: 'linear-gradient(-20deg, rgb(110,69,226) 0%, rgb(136,211,206) 100%)'
}, {
  label: 'Alchemist Lab',
  value: 'linear-gradient(-20deg, rgb(213,88,200) 0%, rgb(36,210,146) 100%)'
}, {
  label: 'Over Sun',
  value: 'linear-gradient(60deg, rgb(171,236,214) 0%, rgb(251,237,150) 100%)'
}, {
  label: 'Premium White',
  value: 'linear-gradient(to top, rgb(213,212,208) 0%, rgb(213,212,208) 1%, rgb(238,238,236) 31%, rgb(239,238,236) 75%, rgb(233,233,231) 100%)'
}, {
  label: 'Mars Party',
  value: 'linear-gradient(to top, rgb(95,114,189) 0%, rgb(155,35,234) 100%)'
}, {
  label: 'Eternal Constance',
  value: 'linear-gradient(to top, rgb(9,32,63) 0%, rgb(83,120,149) 100%)'
}, {
  label: 'Japan Blush',
  value: 'linear-gradient(-20deg, rgb(221,214,243) 0%, rgb(250,172,168) 100%, rgb(250,172,168) 100%)'
}, {
  label: 'Smiling Rain',
  value: 'linear-gradient(-20deg, rgb(220,176,237) 0%, rgb(153,201,156) 100%)'
}, {
  label: 'Cloudy Apple',
  value: 'linear-gradient(to top, rgb(243,231,233) 0%, rgb(227,238,255) 99%, rgb(227,238,255) 100%)'
}, {
  label: 'Big Mango',
  value: 'linear-gradient(to top, rgb(199,29,111) 0%, rgb(208,150,147) 100%)'
}, {
  label: 'Healthy Water',
  value: 'linear-gradient(60deg, rgb(150,222,218) 0%, rgb(80,201,195) 100%)'
}, {
  label: 'Amour Amour',
  value: 'linear-gradient(to top, rgb(247,112,98) 0%, rgb(254,81,150) 100%)'
}, {
  label: 'Risky Concrete',
  value: 'linear-gradient(to top, rgb(196,197,199) 0%, rgb(220,221,223) 52%, rgb(235,235,235) 100%)'
}, {
  label: 'Strong Stick',
  value: 'linear-gradient(to right, rgb(168,202,186) 0%, rgb(93,65,87) 100%)'
}, {
  label: 'Vicious Stance',
  value: 'linear-gradient(60deg, rgb(41,50,60) 0%, rgb(72,85,99) 100%)'
}, {
  label: 'Palo Alto',
  value: 'linear-gradient(-60deg, rgb(22,160,133) 0%, rgb(244,208,63) 100%)'
}, {
  label: 'Happy Memories',
  value: 'linear-gradient(-60deg, rgb(255,88,88) 0%, rgb(240,152,25) 100%)'
}, {
  label: 'Midnight Bloom',
  value: 'linear-gradient(-20deg, rgb(43,88,118) 0%, rgb(78,67,118) 100%)'
}, {
  label: 'Crystalline',
  value: 'linear-gradient(-20deg, rgb(0,205,172) 0%, rgb(141,218,213) 100%)'
}, {
  label: 'River City',
  value: 'linear-gradient(to top, rgb(68,129,235) 0%, rgb(4,190,254) 100%)'
}, {
  label: 'Confident Cloud',
  value: 'linear-gradient(to top, rgb(218,212,236) 0%, rgb(218,212,236) 1%, rgb(243,231,233) 100%)'
}, {
  label: 'Le Cocktail',
  value: 'linear-gradient(45deg, rgb(135,77,162) 0%, rgb(196,58,48) 100%)'
}, {
  label: 'Frozen Berry',
  value: 'linear-gradient(to top, rgb(232,25,139) 0%, rgb(199,234,253) 100%)'
}, {
  label: 'Child Care',
  value: 'linear-gradient(-20deg, rgb(247,148,164) 0%, rgb(253,214,189) 100%)'
}, {
  label: 'Flying Lemon',
  value: 'linear-gradient(60deg, rgb(100,179,244) 0%, rgb(194,229,156) 100%)'
}, {
  label: 'New Retrowave',
  value: 'linear-gradient(to top, rgb(59,65,197) 0%, rgb(169,129,187) 49%, rgb(255,200,169) 100%)'
}, {
  label: 'Hidden Jaguar',
  value: 'linear-gradient(to top, rgb(15,216,80) 0%, rgb(249,240,71) 100%)'
}, {
  label: 'Above The Sky',
  value: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, rgb(224,224,224) 26%, rgb(239,239,239) 48%, rgb(217,217,217) 75%, rgb(188,188,188) 100%)'
}, {
  label: 'Nega',
  value: 'linear-gradient(45deg, rgb(238,156,167) 0%, rgb(255,221,225) 100%)'
}, {
  label: 'Dense Water',
  value: 'linear-gradient(to right, rgb(58,181,176) 0%, rgb(61,153,190) 31%, rgb(86,49,122) 100%)'
}, {
  label: 'Seashore',
  value: 'linear-gradient(to top, rgb(32,156,255) 0%, rgb(104,224,207) 100%)'
}, {
  label: 'Marble Wall',
  value: 'linear-gradient(to top, rgb(189,194,232) 0%, rgb(189,194,232) 1%, rgb(230,222,233) 100%)'
}, {
  label: 'Cheerful Caramel',
  value: 'linear-gradient(to top, rgb(230,185,128) 0%, rgb(234,205,163) 100%)'
}, {
  label: 'Night Sky',
  value: 'linear-gradient(to top, rgb(30,60,114) 0%, rgb(30,60,114) 1%, rgb(42,82,152) 100%)'
}, {
  label: 'Magic Lake',
  value: 'linear-gradient(to top, rgb(213,222,231) 0%, rgb(255,175,189) 0%, rgb(201,255,191) 100%)'
}, {
  label: 'Young Grass',
  value: 'linear-gradient(to top, rgb(155,225,93) 0%, rgb(0,227,174) 100%)'
}, {
  label: 'Royal Garden',
  value: 'linear-gradient(to right, rgb(237,110,160) 0%, rgb(236,140,105) 100%)'
}, {
  label: 'Gentle Care',
  value: 'linear-gradient(to right, rgb(255,195,160) 0%, rgb(255,175,189) 100%)'
}, {
  label: 'Plum Bath',
  value: 'linear-gradient(to top, rgb(204,32,142) 0%, rgb(103,19,210) 100%)'
}, {
  label: 'Happy Unicorn',
  value: 'linear-gradient(to top, rgb(179,255,171) 0%, rgb(18,255,247) 100%)'
}, {
  label: 'African Field',
  value: 'linear-gradient(-45deg, rgb(255,199,150) 0%, rgb(255,107,149) 100%)'
}, {
  label: 'Solid Stone',
  value: 'linear-gradient(to right, rgb(36,57,73) 0%, rgb(81,127,164) 100%)'
}, {
  label: 'Orange Juice',
  value: 'linear-gradient(-20deg, rgb(252,96,118) 0%, rgb(255,154,68) 100%)'
}, {
  label: 'Glass Water',
  value: 'linear-gradient(to top, rgb(223,233,243) 0%, white 100%)'
}, {
  label: 'North Miracle',
  value: 'linear-gradient(to right, rgb(0,219,222) 0%, rgb(252,0,255) 100%)'
}, {
  label: 'Fruit Blend',
  value: 'linear-gradient(to right, rgb(249,212,35) 0%, rgb(255,78,80) 100%)'
}, {
  label: 'Millennium Pine',
  value: 'linear-gradient(to top, rgb(80,204,127) 0%, rgb(245,209,0) 100%)'
}, {
  label: 'High Flight',
  value: 'linear-gradient(to right, rgb(10,207,254) 0%, rgb(73,90,255) 100%)'
}, {
  label: 'Mole Hall',
  value: 'linear-gradient(-20deg, rgb(97,97,97) 0%, rgb(155,197,195) 100%)'
}, {
  label: 'Space Shift',
  value: 'linear-gradient(60deg, rgb(61,51,147) 0%, rgb(43,118,185) 37%, rgb(44,172,209) 65%, rgb(53,235,147) 100%)'
}, {
  label: 'Forest Inei',
  value: 'linear-gradient(to top, rgb(223,137,181) 0%, rgb(191,217,254) 100%)'
}, {
  label: 'Rich Metal',
  value: 'linear-gradient(to right, rgb(215,210,204) 0%, rgb(48,67,82) 100%)'
}, {
  label: 'Juicy Cake',
  value: 'linear-gradient(to top, rgb(225,79,173) 0%, rgb(249,212,35) 100%)'
}, {
  label: 'Smart Indigo',
  value: 'linear-gradient(to top, rgb(178,36,239) 0%, rgb(117,121,255) 100%)'
}, {
  label: 'Sand Strike',
  value: 'linear-gradient(to right, rgb(193,193,97) 0%, rgb(193,193,97) 0%, rgb(212,212,177) 100%)'
}, {
  label: 'Norse Beauty',
  value: 'linear-gradient(to right, rgb(236,119,171) 0%, rgb(120,115,245) 100%)'
}, {
  label: 'Aqua Guidance',
  value: 'linear-gradient(to top, rgb(0,122,223) 0%, rgb(0,236,188) 100%)'
}, {
  label: 'Sun Veggie',
  value: 'linear-gradient(-225deg, rgb(32,226,215) 0%, rgb(249,254,165) 100%)'
}, {
  label: 'Sea Lord',
  value: 'linear-gradient(-225deg, rgb(44,216,213) 0%, rgb(197,193,255) 56%, rgb(255,186,195) 100%)'
}, {
  label: 'Black Sea',
  value: 'linear-gradient(-225deg, rgb(44,216,213) 0%, rgb(107,141,214) 48%, rgb(142,55,215) 100%)'
}, {
  label: 'Grass Shampoo',
  value: 'linear-gradient(-225deg, rgb(223,255,205) 0%, rgb(144,249,196) 48%, rgb(57,243,187) 100%)'
}, {
  label: 'Landing Aircraft',
  value: 'linear-gradient(-225deg, rgb(93,159,255) 0%, rgb(184,220,255) 48%, rgb(107,187,255) 100%)'
}, {
  label: 'Witch Dance',
  value: 'linear-gradient(-225deg, rgb(168,191,255) 0%, rgb(136,77,128) 100%)'
}, {
  label: 'Sleepless Night',
  value: 'linear-gradient(-225deg, rgb(82,113,196) 0%, rgb(177,159,255) 48%, rgb(236,161,254) 100%)'
}, {
  label: 'Angel Care',
  value: 'linear-gradient(-225deg, rgb(255,226,159) 0%, rgb(255,169,159) 48%, rgb(255,113,154) 100%)'
}, {
  label: 'Crystal River',
  value: 'linear-gradient(-225deg, rgb(34,225,255) 0%, rgb(29,143,225) 48%, rgb(98,94,177) 100%)'
}, {
  label: 'Soft Lipstick',
  value: 'linear-gradient(-225deg, rgb(182,206,232) 0%, rgb(245,120,220) 100%)'
}, {
  label: 'Salt Mountain',
  value: 'linear-gradient(-225deg, rgb(255,254,255) 0%, rgb(215,255,254) 100%)'
}, {
  label: 'Perfect White',
  value: 'linear-gradient(-225deg, rgb(227,253,245) 0%, rgb(255,230,250) 100%)'
}, {
  label: 'Fresh Oasis',
  value: 'linear-gradient(-225deg, rgb(125,226,252) 0%, rgb(185,182,229) 100%)'
}, {
  label: 'Strict November',
  value: 'linear-gradient(-225deg, rgb(203,186,204) 0%, rgb(37,128,179) 100%)'
}, {
  label: 'Morning Salad',
  value: 'linear-gradient(-225deg, rgb(183,248,219) 0%, rgb(80,167,194) 100%)'
}, {
  label: 'Deep Relief',
  value: 'linear-gradient(-225deg, rgb(112,133,182) 0%, rgb(135,167,217) 50%, rgb(222,243,248) 100%)'
}, {
  label: 'Sea Strike',
  value: 'linear-gradient(-225deg, rgb(119,255,210) 0%, rgb(98,151,219) 48%, rgb(30,236,255) 100%)'
}, {
  label: 'Night Call',
  value: 'linear-gradient(-225deg, rgb(172,50,228) 0%, rgb(121,24,242) 48%, rgb(72,1,255) 100%)'
}, {
  label: 'Supreme Sky',
  value: 'linear-gradient(-225deg, rgb(212,255,236) 0%, rgb(87,242,204) 48%, rgb(69,150,251) 100%)'
}, {
  label: 'Light Blue',
  value: 'linear-gradient(-225deg, rgb(158,251,211) 0%, rgb(87,233,242) 48%, rgb(69,212,251) 100%)'
}, {
  label: 'Mind Crawl',
  value: 'linear-gradient(-225deg, rgb(71,59,123) 0%, rgb(53,132,167) 51%, rgb(48,210,190) 100%)'
}, {
  label: 'Lily Meadow',
  value: 'linear-gradient(-225deg, rgb(101,55,155) 0%, rgb(136,106,234) 53%, rgb(100,87,198) 100%)'
}, {
  label: 'Sugar Lollipop',
  value: 'linear-gradient(-225deg, rgb(164,69,178) 0%, rgb(212,24,114) 52%, rgb(255,0,102) 100%)'
}, {
  label: 'Sweet Dessert',
  value: 'linear-gradient(-225deg, rgb(119,66,178) 0%, rgb(241,128,255) 52%, rgb(253,139,217) 100%)'
}, {
  label: 'Magic Ray',
  value: 'linear-gradient(-225deg, rgb(255,60,172) 0%, rgb(86,43,124) 52%, rgb(43,134,197) 100%)'
}, {
  label: 'Teen Party',
  value: 'linear-gradient(-225deg, rgb(255,5,124) 0%, rgb(141,11,147) 50%, rgb(50,21,117) 100%)'
}, {
  label: 'Frozen Heat',
  value: 'linear-gradient(-225deg, rgb(255,5,124) 0%, rgb(124,100,213) 48%, rgb(76,195,255) 100%)'
}, {
  label: 'Gagarin View',
  value: 'linear-gradient(-225deg, rgb(105,234,203) 0%, rgb(234,204,248) 48%, rgb(102,84,241) 100%)'
}, {
  label: 'Fabled Sunset',
  value: 'linear-gradient(-225deg, rgb(35,21,87) 0%, rgb(68,16,122) 29%, rgb(255,19,97) 67%, rgb(255,248,0) 100%)'
}, {
  label: 'Perfect Blue',
  value: 'linear-gradient(-225deg, rgb(61,78,129) 0%, rgb(87,83,201) 48%, rgb(110,127,243) 100%)'
}];
var getRandomGradient = function getRandomGradient() {
  var randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex].value;
};
/* harmony default export */ __webpack_exports__["default"] = (getRandomGradient);

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

/***/ "./src/react/Utils/TypographyHelper.js":
/*!*********************************************!*\
  !*** ./src/react/Utils/TypographyHelper.js ***!
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
 * @param {string} type       Type of value (fontFamily, fontSize, fontWeight, letterSpacing, etc.).
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
  return '';
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {Object} props      Values object.
 * @param {string} screenSize mobile|tablet|desktop.
 * @param {string} value      Current value.
 * @param {string} type       Type of value (fontSizeUnit, etc.).
 *
 * @return {string} Value default or hierarchical value.
 */
function getHierarchicalValueUnit(props, screenSize, value, type) {
  // Check mobile screen size.
  if ('mobile' === screenSize && null === value) {
    if (null === props.tablet[type]) {
      return props.desktop[type];
    }
    return props.tablet[type];
  }
  if ('tablet' === screenSize && null === value) {
    return props.desktop[type];
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

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ (function(module) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ (function(module) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ (function(module) {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

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
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","title":"Click to Share","apiVersion":2,"name":"has/click-to-share","category":"text","icon":"<svg aria-hidden=\'true\' focusable=\'false\' data-prefix=\'fas\' data-icon=\'share-alt\' className=\'svg-inline--fa fa-share-alt fa-w-14\' role=\'img\' xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 448 512\'><path fill=\'currentColor\' d=\'M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z\'></path></svg>","description":"An easy-to-use Click to Share block.","keywords":["click","social","tweet","better","twitter","facebook","share","quote","blockquote"],"version":"1.0.0","textdomain":"highlight-and-share","attributes":{"uniqueId":{"type":"string","default":""},"showClickToShare":{"type":"boolean","default":true},"showIcon":{"type":"boolean","default":true},"iconSize":{"type":"number","default":-1},"shareText":{"type":"string","default":""},"backgroundColor":{"type":"string","default":"#FFFFFF"},"backgroundColorHover":{"type":"string","default":"#FFFFFF"},"backgroundType":{"type":"string","default":"solid"},"backgroundGradient":{"type":"string","default":""},"backgroundGradientHover":{"type":"string","default":""},"backgroundGradientSync":{"type":"boolean","default":true},"backgroundImage":{"type":"object","default":{"url":"","id":0,"backgroundColor":"#000000","backgroundSize":"cover","backgroundPosition":"center center","backgroundRepeat":"no-repeat","backgroundOpacity":1,"backgroundOpacityHover":1}},"iconColor":{"type":"string","default":"#000000"},"iconColorHover":{"type":"string","default":"#000000"},"textColor":{"type":"string","default":"#000000"},"textColorHover":{"type":"string","default":"#000000"},"shareTextColor":{"type":"string","default":"#000000"},"shareTextColorHover":{"type":"string","default":"#000000"},"fontSize":{"type":"integer","default":24},"clickShareFontSize":{"type":"integer","default":24},"clickText":{"type":"string","default":"Click to Share"},"padding":{"type":"integer","default":-1},"border":{"type":"integer","default":-1},"borderRadius":{"type":"integer","default":0},"borderColor":{"type":"string","default":"#000000"},"borderColorHover":{"type":"string","default":"#000000"},"fontWeight":{"type":"string","default":"#FFFFFF"},"maxWidth":{"type":"string","default":"80"},"maxWidthUnit":{"type":"string","default":"%"},"align":{"type":"string","default":"center"},"alignment":{"type":"string","default":"center"},"marginLeft":{"type":"integer","default":0},"marginRight":{"type":"integer","default":0},"marginBottom":{"type":"integer","default":0},"marginTop":{"type":"integer","default":0},"paddingSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"20","right":"20","bottom":"20","left":"20","unit":"px","unitSync":true}}},"marginSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"20","right":"","bottom":"20","left":"","unit":"px","unitSync":true}}},"borderWidth":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"1","right":"1","bottom":"1","left":"1","unit":"px","unitSync":true}}},"borderRadiusSize":{"type":"object","default":{"mobile":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"tablet":{"top":"","right":"","bottom":"","left":"","unit":null,"unitSync":null},"desktop":{"top":"","right":"","bottom":"","left":"","unit":"px","unitSync":true}}},"typographyQuote":{"type":"object","default":{"mobile":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontFallback":"","fontType":"web"},"tablet":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontFallback":"","fontType":"web"},"desktop":{"fontFamily":"Arial","fontFamilySlug":"arial","fontSize":"24","fontSizeUnit":"px","fontWeight":"normal","lineHeight":"1.3","lineHeightUnit":"em","textTransform":"none","letterSpacing":"0","letterSpacingUnit":"px","fontFallback":"serif","fontType":"web"}}},"typographyShareText":{"type":"object","default":{"mobile":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontType":"web","fontFallback":"sans-serif"},"tablet":{"fontFamily":"","fontFamilySlug":"","fontSize":"","fontSizeUnit":"px","fontWeight":"","lineHeight":"","lineHeightUnit":"em","textTransform":"","letterSpacing":"","letterSpacingUnit":"px","fontType":"web","fontFallback":"sans-serif"},"desktop":{"fontFamily":"Arial","fontFamilySlug":"arial","fontSize":"24","fontSizeUnit":"px","fontWeight":"normal","lineHeight":"1.3","lineHeightUnit":"em","textTransform":"none","letterSpacing":"0","letterSpacingUnit":"px","fontType":"web","fontFallback":"sans-serif"}}}},"supports":{"anchor":true,"align":true,"className":true},"editorScript":"has-click-to-share","editorStyle":"has-style-admin-css","style":"has-style-frontend-css"}');

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