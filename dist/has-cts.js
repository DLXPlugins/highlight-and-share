/*! For license information please see has-cts.js.LICENSE.txt */
(()=>{var __webpack_modules__={184:(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)&&arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}else if("object"===argType)for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()}},__webpack_module_cache__={};function __webpack_require__(moduleId){if(__webpack_module_cache__[moduleId])return __webpack_module_cache__[moduleId].exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),(()=>{"use strict";var classnames=__webpack_require__(184),classnames_default=__webpack_require__.n(classnames);function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _setPrototypeOf(o,p){return(_setPrototypeOf=Object.setPrototypeOf||function(o,p){return o.__proto__=p,o})(o,p)}function _createSuper(Derived){var hasNativeReflectConstruct=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var result,Super=_getPrototypeOf(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return _possibleConstructorReturn(this,result)}}function _possibleConstructorReturn(self,call){return!call||"object"!==_typeof(call)&&"function"!=typeof call?_assertThisInitialized(self):call}function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}function _getPrototypeOf(o){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)})(o)}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var _wp$element=wp.element,Component=_wp$element.Component,Fragment=_wp$element.Fragment,__=wp.i18n.__,_wp$components=wp.components,PanelBody=_wp$components.PanelBody,RangeControl=_wp$components.RangeControl,SelectControl=_wp$components.SelectControl,TextControl=_wp$components.TextControl,_wp$blockEditor=wp.blockEditor,InspectorControls=_wp$blockEditor.InspectorControls,RichText=_wp$blockEditor.RichText,PanelColorSettings=_wp$blockEditor.PanelColorSettings;const edit=function(_Component){!function(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&_setPrototypeOf(subClass,superClass)}(HAS_Click_To_Share,_Component);var Constructor,protoProps,staticProps,_super=_createSuper(HAS_Click_To_Share);function HAS_Click_To_Share(){var _this;return _classCallCheck(this,HAS_Click_To_Share),_defineProperty(_assertThisInitialized(_this=_super.apply(this,arguments)),"onChangeValue",(function(value){_this.setState({shareText:value})})),_defineProperty(_assertThisInitialized(_this),"borderRoundedChange",(function(value){_this.setState({borderRadius:value})})),_this.state={borderRadius:_this.props.attributes.borderRadius},_this}return Constructor=HAS_Click_To_Share,(protoProps=[{key:"render",value:function(){var _this2=this,_this$props=this.props,_this$props$attribute=_this$props.attributes,shareText=_this$props$attribute.shareText,backgroundColor=_this$props$attribute.backgroundColor,textColor=_this$props$attribute.textColor,fontSize=_this$props$attribute.fontSize,clickText=_this$props$attribute.clickText,padding=_this$props$attribute.padding,border=_this$props$attribute.border,borderRadius=_this$props$attribute.borderRadius,borderColor=_this$props$attribute.borderColor,fontWeight=_this$props$attribute.fontWeight,clickShareFontSize=_this$props$attribute.clickShareFontSize,maxWidth=_this$props$attribute.maxWidth,alignment=_this$props$attribute.alignment,marginTop=_this$props$attribute.marginTop,marginRight=_this$props$attribute.marginRight,marginBottom=_this$props$attribute.marginBottom,marginLeft=_this$props$attribute.marginLeft,setAttributes=_this$props.setAttributes,hasStyles={fontSize:fontSize+"px",padding:padding+"px",border:"".concat(border,"px solid ").concat(borderColor),borderRadius:borderRadius+"px",backgroundColor,color:textColor,maxWidth:"".concat(maxWidth,"%"),marginLeft:marginLeft+"px",marginRight:marginRight+"px",marginBottom:marginBottom+"px",marginTop:marginTop+"px"};"center"===alignment&&(hasStyles.margin="0 auto"),"left"===alignment&&(hasStyles.float="left"),"right"===alignment&&(hasStyles.float="right");var fontWeightArr=Array();fontWeightArr.push({label:__("Normal","highlight-and-share"),value:100}),fontWeightArr.push({label:__("Bold","highlight-and-share"),value:400}),fontWeightArr.push({label:__("Bolder","highlight-and-share"),value:700});var alignmentArr=Array();return alignmentArr.push({label:__("Left","highlight-and-share"),value:"left"}),alignmentArr.push({label:__("center","highlight-and-share"),value:"center"}),alignmentArr.push({label:__("right","highlight-and-share"),value:"right"}),React.createElement(Fragment,null,React.createElement(InspectorControls,null,React.createElement(PanelBody,{title:__("Highlight and Share Settings","highlight-and-share")},React.createElement(PanelColorSettings,{title:__("Background Color","highlight-and-share"),initialOpen:!1,colorSettings:[{value:backgroundColor,onChange:function(value){return setAttributes({backgroundColor:value})},label:__("Background Color","highlight-and-share")}]}),React.createElement(PanelColorSettings,{title:__("Text Color","highlight-and-share"),initialOpen:!1,colorSettings:[{value:textColor,onChange:function(value){return setAttributes({textColor:value})},label:__("Text Color","highlight-and-share")}]}),React.createElement(SelectControl,{label:__("Font Weight","highlight-and-share"),value:fontWeight,options:fontWeightArr,onChange:function(value){setAttributes({fontWeight:value})}}),React.createElement(TextControl,{label:__("Click to Share Text","highlight-and-share"),value:clickText,onChange:function(value){_this2.props.setAttributes({clickText:value})}})),React.createElement(PanelBody,{title:__("Spacing and Font Settings","highlight-and-share"),initialOpen:!1},React.createElement(RangeControl,{label:__("Font Size","highlight-and-share"),value:fontSize,onChange:function(value){return _this2.props.setAttributes({fontSize:value})},min:10,max:40,step:1}),React.createElement(RangeControl,{label:__("Click to Share Font Size","highlight-and-share"),value:clickShareFontSize,onChange:function(value){return _this2.props.setAttributes({clickShareFontSize:value})},min:10,max:40,step:1}),React.createElement(RangeControl,{label:__("Padding","highlight-and-share"),value:padding,onChange:function(value){return _this2.props.setAttributes({padding:value})},min:0,max:60,step:1}),React.createElement(RangeControl,{label:__("Border","highlight-and-share"),value:border,onChange:function(value){return _this2.props.setAttributes({border:value})},min:0,max:10,step:1}),React.createElement(RangeControl,{label:__("Border Rounded","highlight-and-share"),value:this.state.borderRadius,onChange:function(value){_this2.borderRoundedChange(value),_this2.props.setAttributes({borderRadius:value})},min:0,max:30,step:1}),React.createElement(PanelColorSettings,{title:__("Border Color","highlight-and-share"),initialOpen:!1,colorSettings:[{value:borderColor,onChange:function(value){return setAttributes({borderColor:value})},label:__("Border Color","highlight-and-share")}]})),React.createElement(PanelBody,{title:__("Alignment, Width, and Margins","highlight-and-share")},React.createElement(RangeControl,{label:__("Max Width","highlight-and-share"),value:maxWidth,onChange:function(value){return _this2.props.setAttributes({maxWidth:value})},min:0,max:100,step:5}),React.createElement(SelectControl,{label:__("Alignment","highlight-and-share"),value:alignment,options:alignmentArr,onChange:function(value){setAttributes({alignment:value})}}),React.createElement(RangeControl,{label:__("Margin Left","highlight-and-share"),value:marginLeft,onChange:function(value){return _this2.props.setAttributes({marginLeft:value})},min:0,max:20,step:1}),React.createElement(RangeControl,{label:__("Margin Right","highlight-and-share"),value:marginRight,onChange:function(value){return _this2.props.setAttributes({marginRight:value})},min:0,max:20,step:1}),React.createElement(RangeControl,{label:__("Margin Top","highlight-and-share"),value:marginTop,onChange:function(value){return _this2.props.setAttributes({marginTop:value})},min:0,max:20,step:1}),React.createElement(RangeControl,{label:__("Margin Bottom","highlight-and-share"),value:marginBottom,onChange:function(value){return _this2.props.setAttributes({marginBottom:value})},min:0,max:20,step:1}))),React.createElement(Fragment,null,React.createElement("div",{className:classnames_default()("has-click-to-share"),style:hasStyles},React.createElement("div",{className:"has-click-to-share-wrapper"},React.createElement(RichText,{tagName:"div",placeholder:__("Add share text","highlight-and-share"),value:shareText,className:"has-click-to-share-text",style:{color:textColor,fontSize:fontSize+"px",fontWeight},allowedFormats:[],onChange:function(value){_this2.onChangeValue(value),setAttributes({shareText:value})}}),React.createElement("div",{className:"has-click-to-share-cta",style:{fontSize:clickShareFontSize}},clickText," ",React.createElement("svg",{style:{width:clickShareFontSize,height:clickShareFontSize},"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"share-alt",className:"svg-inline--fa fa-share-alt fa-w-14",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},React.createElement("path",{fill:"currentColor",d:"M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"})))))))}}])&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),HAS_Click_To_Share}(Component);var block_=wp.i18n.__;function _extends(){return(_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}(0,wp.blocks.registerBlockType)("has/click-to-share",{title:block_("Highlight and Share: Click to Share","highlight-and-share"),desription:block_("A block for clicking and sharing text.","highlight-and-share"),icon:React.createElement("svg",{"aria-hidden":"true",focusable:"false","data-prefix":"fas","data-icon":"share-alt",className:"svg-inline--fa fa-share-alt fa-w-14",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},React.createElement("path",{fill:"currentColor",d:"M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"})),category:"has",keywords:[block_("click","highlight-and-share"),block_("social","highlight-and-share"),block_("better","highlight-and-share"),block_("tweet","highlight-and-share"),block_("twitter","highlight-and-share"),block_("facebook","highlight-and-share"),block_("share","highlight-and-share"),block_("feature","highlight-and-share")],edit,save:function(){return null}});const circle_red=function(props){return React.createElement("svg",_extends({viewBox:"0 0 398 398",xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:1.5,background:"transparent"}},props),React.createElement("circle",{cx:1186.81,cy:972.734,r:198.415,style:{fill:"#d0121c",stroke:"#000",strokeWidth:1},transform:"translate(-987.894 -773.819)"}))};function circle_dark_extends(){return(circle_dark_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const circle_dark=function(props){return React.createElement("svg",circle_dark_extends({viewBox:"0 0 398 398",xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:1.5,background:"transparent"}},props),React.createElement("circle",{cx:1186.81,cy:972.734,r:198.415,style:{fill:"#2b2926",stroke:"#000",strokeWidth:1},transform:"translate(-987.894 -773.819)"}))};function circle_light_extends(){return(circle_light_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const circle_light=function(props){return React.createElement("svg",circle_light_extends({viewBox:"0 0 398 398",xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:1.5,background:"transparent"}},props),React.createElement("circle",{cx:1186.81,cy:972.734,r:198.415,style:{fill:"#ededed",stroke:"#000",strokeWidth:1},transform:"translate(-987.894 -773.819)"}))};function circle_pink_extends(){return(circle_pink_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const circle_pink=function(props){return React.createElement("svg",circle_pink_extends({viewBox:"0 0 398 398",xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:1.5,background:"transparent"}},props),React.createElement("circle",{cx:1186.81,cy:972.734,r:198.415,style:{fill:"#cd17cd",stroke:"#000",strokeWidth:1},transform:"translate(-987.894 -773.819)"}))};function circle_purple_extends(){return(circle_purple_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const circle_purple=function(props){return React.createElement("svg",circle_purple_extends({viewBox:"0 0 398 398",xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:1.5,background:"transparent"}},props),React.createElement("circle",{cx:1186.81,cy:972.734,r:198.415,style:{fill:"#9932cc",stroke:"#000",strokeWidth:1},transform:"translate(-987.894 -773.819)"}))};function circle_blue_extends(){return(circle_blue_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const circle_blue=function(props){return React.createElement("svg",circle_blue_extends({viewBox:"0 0 398 398",xmlns:"http://www.w3.org/2000/svg",xmlSpace:"preserve",style:{fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:1.5}},props),React.createElement("circle",{cx:1186.81,cy:972.734,r:198.415,style:{fill:"#0018a8",stroke:"#000",strokeWidth:1},transform:"translate(-987.894 -773.819)"}))};function edit_extends(){return(edit_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const icons_edit=function(props){return React.createElement("svg",edit_extends({"aria-hidden":"true","data-prefix":"fas","data-icon":"edit",className:"svg-inline--fa fa-edit fa-w-18",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512"},props),React.createElement("path",{fill:"currentColor",d:"m402.6 83.2 90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"}))};function paintbrush_extends(){return(paintbrush_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const paintbrush=function(props){return React.createElement("svg",paintbrush_extends({"aria-hidden":"true","data-prefix":"fas","data-icon":"paint-brush-alt",className:"svg-inline--fa fa-paint-brush-alt fa-w-16",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},props),React.createElement("path",{fill:props.fill,d:"M365.99 33.1 194.11 289.51l78 65 218.81-221.52C564.15 52.52 427.95-55.3 365.99 33.1zM167.87 309.29c-40.45 2.41-77.23 17.53-98.03 72.35-2.35 6.21-8 9.98-14.59 9.98-11.11 0-45.46-27.67-55.25-34.35C0 439.62 37.93 512 128 512c75.86 0 128-43.77 128-120.19 0-3.39-.68-6.64-1.06-9.96l-87.07-72.56z"}))};function settings_extends(){return(settings_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const settings=function(props){return React.createElement("svg",settings_extends({"aria-hidden":"true","data-prefix":"fas","data-icon":"cog",className:"svg-inline--fa fa-cog fa-w-16",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},props),React.createElement("path",{fill:"currentColor",d:"m487.4 315.7-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"}))};function _slicedToArray(arr,i){return function(arr){if(Array.isArray(arr))return arr}(arr)||function(arr,i){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(arr)))return;var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var edit_wp$element=wp.element,useEffect=edit_wp$element.useEffect,useState=edit_wp$element.useState,edit_=wp.i18n.__,edit_wp$components=wp.components,edit_PanelBody=edit_wp$components.PanelBody,ToolbarGroup=(edit_wp$components.Toolbar,edit_wp$components.ToolbarGroup),Popover=(edit_wp$components.ToolbarButton,edit_wp$components.Popover),edit_wp$blockEditor=wp.blockEditor,edit_InspectorControls=edit_wp$blockEditor.InspectorControls,edit_RichText=edit_wp$blockEditor.RichText,BlockControls=edit_wp$blockEditor.BlockControls;edit_wp$blockEditor.useBlockProps;const click_to_tweet_edit=function(props){var _useState2=_slicedToArray(useState(!1),2),editTweetPopoverVisible=_useState2[0],setEditTweetPopoverVisible=_useState2[1],attributes=props.attributes,setAttributes=props.setAttributes,template=(attributes.uniqueId,attributes.show_copy,attributes.show_permalink,attributes.template),share_text=(attributes.button_style,attributes.share_text);attributes.share_text_override;useEffect((function(){var id=props.clientId.substr(2,9).replace("-","");attributes.uniqueId||setAttributes({uniqueId:id})}),[]);var inspectorControls=React.createElement(React.Fragment,null,React.createElement(edit_PanelBody,{initialOpen:!0,title:edit_("Appearance","highlight-and-share")},React.createElement("div",null,"test")));return React.createElement(React.Fragment,null,React.createElement(edit_InspectorControls,null,inspectorControls),React.createElement(BlockControls,null,React.createElement(React.Fragment,null,React.createElement(ToolbarGroup,{icon:React.createElement(paintbrush,{width:"24",height:"24",fill:{light:"#BFBFBF",dark:"#2b2926",pink:"#cd17cd",purple:"#9932cc",red:"#d0121c",blue:"#0018a8"}[template]}),label:edit_("Select a Theme","highlight-and-share"),isCollapsed:!0,popoverProps:{className:"has-click-to-tweet-popover ".concat(template)},controls:[{title:edit_("Blue Theme","highlight-and-share"),isActive:"blue"===template,icon:React.createElement(circle_blue,{width:"16",height:"16",className:"blue"===template?"has selected":""}),onClick:function(){setAttributes({template:"blue"})}},{title:edit_("Dark Theme","highlight-and-share"),isActive:"dark"===template,icon:React.createElement(circle_dark,{width:"16",height:"16",className:"dark"===template?"has selected":""}),onClick:function(){setAttributes({template:"dark"})}},{title:edit_("Light Theme","highlight-and-share"),isActive:"light"===template,icon:React.createElement(circle_light,{width:"16",height:"16",className:"light"===template?"has selected":""}),onClick:function(){setAttributes({template:"light"})}},{title:edit_("Pink Theme","highlight-and-share"),isActive:"pink"===template,icon:React.createElement(circle_pink,{width:"16",height:"16",className:"pink"===template?"has selected":""}),onClick:function(){setAttributes({template:"pink"})}},{title:edit_("Purple Theme","highlight-and-share"),isActive:"purple"===template,icon:React.createElement(circle_purple,{width:"16",height:"16",className:"purple"===template?"has selected":""}),onClick:function(){setAttributes({template:"purple"})}},{title:edit_("Red Theme","highlight-and-share"),isActive:"red"===template,icon:React.createElement(circle_red,{width:"16",height:"16",className:"red"===template?"has selected":""}),onClick:function(){setAttributes({template:"red"})}}]}),React.createElement(ToolbarGroup,{icon:React.createElement(settings,{width:"24",height:"24"}),label:edit_("Tweet Settings","highlight-and-share"),isCollapsed:!0,controls:[{icon:React.createElement(icons_edit,{width:"16",height:"16"}),title:edit_("Edit Tweet","highlight-and-share"),isActive:!0===editTweetPopoverVisible,onClick:function(){setEditTweetPopoverVisible(!editTweetPopoverVisible)}}]}),editTweetPopoverVisible&&React.createElement(Popover,{position:"top",noArrow:!1,onFocusOutside:function(){setEditTweetPopoverVisible(!1)}},React.createElement("h2",null,"blah")))),React.createElement("div",{className:classnames_default()("has-click-to-share")},React.createElement("div",{className:"has-click-to-tweet-wrapper"},React.createElement(edit_RichText,{tagName:"div",placeholder:edit_("Add text to share","highlight-and-share"),value:share_text,preserveWhiteSpace:!0,className:"has-click-to-tweet-text",allowedFormats:["core/bold","core/italic","core/text-color","core/subscript","core/superscript","core/strikethrough","core/link"],onChange:function(value){setAttributes({share_text:value})}}))))};function twitter_extends(){return(twitter_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}const twitter=function(props){return React.createElement("svg",twitter_extends({"aria-hidden":"true","data-prefix":"fab","data-icon":"twitter",className:"prefix__svg-inline--fa prefix__fa-twitter prefix__fa-w-16",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},props),React.createElement("path",{fill:"#9932cc",d:"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"}))};var click_to_tweet_block_=wp.i18n.__;function has_icon_extends(){return(has_icon_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}(0,wp.blocks.registerBlockType)("has/click-to-tweet",{title:click_to_tweet_block_("Click to Tweet","highlight-and-share"),icon:React.createElement(twitter,{width:"24",height:"24"}),category:"has",supports:{anchor:!0,align:!0},edit:click_to_tweet_edit,save:function(){return null}});const has_icon=function(props){return React.createElement("svg",has_icon_extends({id:"has-icon-category",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 173.3 180.24"},props),React.createElement("path",{d:"M75.57 36.49a3.6 3.6 0 11-3.6-3.59 3.6 3.6 0 013.6 3.59z",fill:"#16c6cc"}),React.createElement("path",{d:"M8.38 73.78a4.19 4.19 0 11-4.19-4.2 4.19 4.19 0 014.19 4.2z",fill:"#242d3c"}),React.createElement("circle",{cx:30.79,cy:88.66,r:2.7,fill:"#e6e5e5"}),React.createElement("path",{d:"M89.65 5.99a6 6 0 11-6-6 6 6 0 016 6z",fill:"#e6e5e5"}),React.createElement("path",{d:"M173.3 94.05a7.79 7.79 0 11-7.78-7.78 7.79 7.79 0 017.78 7.78z",fill:"#16c6cc"}),React.createElement("path",{d:"M74.65 53.62a30 30 0 1030 30 30 30 0 00-30-30zm0 44.92a15 15 0 1115-15 15 15 0 01-15 15z",fill:"#f15424"}),React.createElement("circle",{cx:146.99,cy:155.88,r:24.36,fill:"#e6e5e5"}),React.createElement("path",{d:"M47.59 126.12a15.48 15.48 0 11-15.47-15.47 15.48 15.48 0 0115.47 15.47z",fill:"#f15424"}),React.createElement("path",{d:"M149.44 27.97A19.17 19.17 0 11130.27 8.8a19.17 19.17 0 0119.17 19.17z",fill:"#242d3c"}),React.createElement("circle",{cx:74.81,cy:65.24,r:9.33,transform:"rotate(-.72 -1526.757 3106.743)",fill:"#e6e5e5"}),React.createElement("path",{d:"M128.12 83.57a6.22 6.22 0 11-6.21-6.21 6.21 6.21 0 016.21 6.21z",fill:"#242d3c"}),React.createElement("path",{d:"M87.26 155.64a7.5 7.5 0 11-7.5-7.5 7.5 7.5 0 017.5 7.5z",fill:"#16c6cc"}),React.createElement("path",{d:"M45.65 55.69a1.13 1.13 0 11.79-1.92 1.14 1.14 0 01.33.8 1.13 1.13 0 01-1.12 1.12zM48.28 58.3a1.11 1.11 0 01-1.12-1.13 1.07 1.07 0 01.33-.79 1.12 1.12 0 11.79 1.92zM50.89 60.9a1.12 1.12 0 110-2.24 1.12 1.12 0 110 2.24zM108.31 84.69a1.12 1.12 0 111.12-1.12 1.12 1.12 0 01-1.12 1.12zM112 84.69a1.11 1.11 0 01-.79-.33 1.07 1.07 0 01-.33-.79 1.12 1.12 0 111.12 1.12zM45.65 113.7a1.15 1.15 0 01-.8-.33 1.13 1.13 0 01-.32-.8 1.1 1.1 0 01.32-.79 1.15 1.15 0 01.8-.33 1.13 1.13 0 011.12 1.12 1.14 1.14 0 01-.33.8 1.11 1.11 0 01-.79.33zM48.28 111.12a1.13 1.13 0 110-2.25 1.13 1.13 0 010 2.25zM50.88 108.48a1.13 1.13 0 01-.79-1.92 1.14 1.14 0 01.8-.33 1.11 1.11 0 01.79.33 1.14 1.14 0 01.33.8 1.11 1.11 0 01-.36.76 1.14 1.14 0 01-.77.36zM114.11 45.25a1.07 1.07 0 01-.79-.33 1.12 1.12 0 111.58 0 1.07 1.07 0 01-.79.33zM111.5 47.86a1.12 1.12 0 010-2.24 1.15 1.15 0 01.8.33 1.14 1.14 0 010 1.58 1.15 1.15 0 01-.8.33zM108.89 50.47a1.12 1.12 0 01-.79-1.91 1.07 1.07 0 01.79-.33 1.09 1.09 0 01.8.33 1.13 1.13 0 01-.04 1.56 1.15 1.15 0 01-.76.35zM106.28 53.12a1.13 1.13 0 010-2.25 1.13 1.13 0 01.8 1.92 1.14 1.14 0 01-.8.33zM103.65 55.69a1.15 1.15 0 01-.8-.33 1.13 1.13 0 01.8-1.92 1.13 1.13 0 010 2.25zM101.07 58.3a1.15 1.15 0 01-.8-.33 1.14 1.14 0 010-1.59 1.15 1.15 0 01.8-.33 1.13 1.13 0 011.12 1.12 1.14 1.14 0 01-.33.8 1.11 1.11 0 01-.79.33zM98.46 60.91a1.11 1.11 0 01-.79-.33 1.09 1.09 0 01-.33-.8 1.07 1.07 0 01.33-.79 1.12 1.12 0 011.91.79 1.15 1.15 0 01-.33.8 1.11 1.11 0 01-.79.33zM98.46 108.48a1.13 1.13 0 11.79-1.92 1.14 1.14 0 01.33.8 1.13 1.13 0 01-1.12 1.12zM101.07 111.12a1.15 1.15 0 01-.8-.33 1.13 1.13 0 01-.32-.8 1.1 1.1 0 01.32-.79 1.15 1.15 0 01.8-.33 1.13 1.13 0 010 2.25zM103.65 113.69a1.11 1.11 0 01-1.13-1.12 1.11 1.11 0 01.33-.79 1.15 1.15 0 01.8-.33 1.12 1.12 0 110 2.24zM106.28 116.3a1.09 1.09 0 01-.79-.33 1.11 1.11 0 010-1.58 1.124 1.124 0 011.59 1.59 1.11 1.11 0 01-.8.32zM108.89 118.91a1.07 1.07 0 01-.79-.33 1.11 1.11 0 010-1.58 1.07 1.07 0 01.79-.33 1.09 1.09 0 01.8.33 1.13 1.13 0 010 1.58 1.11 1.11 0 01-.8.33zM111.5 121.52a1.12 1.12 0 110-2.24 1.12 1.12 0 110 2.24zM114.11 124.12a1.12 1.12 0 111.12-1.12 1.07 1.07 0 01-.33.79 1.11 1.11 0 01-.79.33zM116.72 126.74a1.13 1.13 0 11.79-1.92 1.14 1.14 0 01.33.8 1.09 1.09 0 01-.33.79 1.11 1.11 0 01-.79.33zM119.33 129.35a1.15 1.15 0 01-.8-.33 1.14 1.14 0 010-1.59 1.15 1.15 0 01.8-.33 1.13 1.13 0 011.12 1.12 1.14 1.14 0 01-.33.8 1.11 1.11 0 01-.79.33zM121.94 131.95a1.12 1.12 0 110-2.24 1.13 1.13 0 011.12 1.12 1.15 1.15 0 01-.33.8 1.1 1.1 0 01-.79.32zM124.54 134.56a1.09 1.09 0 01-.79-.33 1.11 1.11 0 010-1.58 1.14 1.14 0 01.8-.33 1.12 1.12 0 01.79 1.91 1.08 1.08 0 01-.8.33zM127.15 137.17a1.07 1.07 0 01-.79-.33 1.11 1.11 0 010-1.58 1.09 1.09 0 01.79-.33 1.11 1.11 0 01.8.33 1.13 1.13 0 010 1.58 1.11 1.11 0 01-.8.33z",fill:"#242d3c"}))};var blocks_=wp.i18n.__,_window$wp$richText=window.wp.richText,registerFormatType=_window$wp$richText.registerFormatType,applyFormat=_window$wp$richText.applyFormat,removeFormat=_window$wp$richText.removeFormat,blocks_Fragment=wp.element.Fragment,RichTextToolbarButton=wp.blockEditor.RichTextToolbarButton;registerFormatType("has/inline",{title:blocks_("Highlight and Share","highlight-and-share"),tagName:"span",attributes:{class:"class"},className:"has-inline-text",edit:function(props){var onClick=function(){props.isActive?props.onChange(removeFormat(props.value,"has/inline")):(props.value.start!==props.value.end||props.isActive)&&props.onChange(applyFormat(props.value,{type:"has/inline",attributes:{class:"has-inline-text"}}))};return React.createElement(blocks_Fragment,null,!1===props.isActive&&React.createElement(RichTextToolbarButton,{icon:React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",enableBackground:"new 0 0 24 24",height:"24",viewBox:"0 0 24 24",width:"24"},React.createElement("g",null,React.createElement("rect",{fill:"none",height:"24",width:"24"})),React.createElement("g",null,React.createElement("g",null,React.createElement("g",null,React.createElement("path",{d:"M6,14l3,3v5h6v-5l3-3V9H6V14z M11,2h2v3h-2V2z M3.5,5.88l1.41-1.41l2.12,2.12L5.62,8L3.5,5.88z M16.96,6.59l2.12-2.12 l1.41,1.41L18.38,8L16.96,6.59z"}))))),title:blocks_("Highlight and Share","highlight-and-share"),onClick}),!0===props.isActive&&React.createElement(RichTextToolbarButton,{icon:React.createElement("svg",{style:{backgroundColor:"#555d66",color:"#FFFFFF"},xmlns:"http://www.w3.org/2000/svg",enableBackground:"new 0 0 24 24",height:"24",viewBox:"0 0 24 24",width:"24"},React.createElement("g",null,React.createElement("rect",{fill:"none",height:"24",width:"24"})),React.createElement("g",null,React.createElement("g",null,React.createElement("g",null,React.createElement("path",{d:"M6,14l3,3v5h6v-5l3-3V9H6V14z M11,2h2v3h-2V2z M3.5,5.88l1.41-1.41l2.12,2.12L5.62,8L3.5,5.88z M16.96,6.59l2.12-2.12 l1.41,1.41L18.38,8L16.96,6.59z"}))))),title:blocks_("Highlight and Share","highlight-and-share"),onClick}))}}),wp.blocks.updateCategory("has",{icon:has_icon})})()})();