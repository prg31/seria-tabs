/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/user/ImageCarouselClass.js":
/*!*******************************************!*\
  !*** ./src/js/user/ImageCarouselClass.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImageCarousel)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ImageCarousel = /*#__PURE__*/function () {
  function ImageCarousel(_ref) {
    var _this = this;

    var allImagesWrapper = _ref.allImagesWrapper,
        activeImageWrapper = _ref.activeImageWrapper;

    _classCallCheck(this, ImageCarousel);

    this.allImagesWrapper = document.querySelector(allImagesWrapper);
    this.activeImageWrapper = document.querySelector(activeImageWrapper);
    this.allImages = this.allImagesWrapper.querySelectorAll('img');
    this.allImages[0].classList.add('active');
    this.initActiveImage(this.allImages[0].getAttribute('src'));
    this.allImages.forEach(function (img) {
      img.addEventListener('click', _this.replaceImage.bind(_this));
    });
  }

  _createClass(ImageCarousel, [{
    key: "initActiveImage",
    value: function initActiveImage(src) {
      var imgElem = document.createElement('img');
      imgElem.classList.add('active-view__img');
      imgElem.setAttribute('src', src);
      this.activeImageWrapper.appendChild(imgElem);
    }
  }, {
    key: "replaceImage",
    value: function replaceImage(event) {
      var target = event.target;
      this.activeImageWrapper.querySelector('img').setAttribute('src', target.getAttribute('src'));
      this.allImagesWrapper.querySelector('.active').classList.remove('active');
      target.classList.add('active');
    }
  }]);

  return ImageCarousel;
}();



/***/ }),

/***/ "./src/js/user/ImageZoomClass.js":
/*!***************************************!*\
  !*** ./src/js/user/ImageZoomClass.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImageZoom)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ImageZoom = /*#__PURE__*/function () {
  function ImageZoom(_ref) {
    var activeImageContainer = _ref.activeImageContainer,
        popupImageWrapper = _ref.popupImageWrapper,
        popupTemplate = _ref.popupTemplate,
        popupClose = _ref.popupClose;

    _classCallCheck(this, ImageZoom);

    this.activeImageContainer = document.querySelector(activeImageContainer);
    this.popupTemplate = document.querySelector(popupTemplate);
    this.popupImageWrapperSelector = popupImageWrapper;
    this.popupCloseSelector = popupClose;
    this.activeImageContainer.addEventListener('click', this.showPopup.bind(this));
  }

  _createClass(ImageZoom, [{
    key: "showPopup",
    value: function showPopup() {
      var _this = this;

      var wrapper = this.createPopup();
      document.querySelector('html').style.overflow = 'hidden';
      wrapper.addEventListener('click', function (event) {
        var classList = event.target.classList;

        var closeIconClass = _this.popupCloseSelector.replace(/\./, "");

        if (classList.contains('overlay') || classList.contains(closeIconClass)) {
          document.querySelector('#image-zoom-popup').remove();
          document.querySelector('html').style.overflow = 'initial';
        }
      });
    }
  }, {
    key: "createPopup",
    value: function createPopup() {
      var source = this.activeImageContainer.querySelector('img').getAttribute('src');
      var templateBody = this.popupTemplate.innerHTML;
      var wrapper = document.createElement('div');
      wrapper.classList.add('overlay');
      wrapper.setAttribute('id', 'image-zoom-popup');
      wrapper.innerHTML = templateBody;
      var yOffset = Math.abs(document.body.getBoundingClientRect().y);
      wrapper.style.top = "".concat(yOffset, "px");
      var img = document.createElement('img');
      img.classList.add('popup__image');
      img.setAttribute('src', source);
      wrapper.querySelector(this.popupImageWrapperSelector).append(img);
      document.body.append(wrapper);
      return wrapper;
    }
  }]);

  return ImageZoom;
}();



/***/ }),

/***/ "./src/js/user/TabsClass.js":
/*!**********************************!*\
  !*** ./src/js/user/TabsClass.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TabsClass)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TabsClass = /*#__PURE__*/function () {
  function TabsClass(_ref) {
    var _this = this;

    var tabNamesContainer = _ref.tabNamesContainer,
        tabName = _ref.tabName,
        tabContainer = _ref.tabContainer,
        tab = _ref.tab,
        prevBtn = _ref.prevBtn,
        nextBtn = _ref.nextBtn;

    _classCallCheck(this, TabsClass);

    _defineProperty(this, "tabIndex", 0);

    _defineProperty(this, "tabMinIndex", 0);

    _defineProperty(this, "tabMaxIndex", 0);

    this.tabNames = document.querySelector(tabNamesContainer).querySelectorAll(tabName);
    this.tabContainer = document.querySelector(tabContainer);
    this.tabs = this.tabContainer.querySelectorAll(tab);
    this.prevBtn = document.querySelector(prevBtn);
    this.nextBtn = document.querySelector(nextBtn);
    this.tabMaxIndex = this.tabs.length - 1;

    if (this.tabMaxIndex === 0) {
      this.prevBtn.style.display = 'none';
      this.nextBtn.style.display = 'none';
    }

    this.activateTab();
    this.tabNames.forEach(function (tabName) {
      tabName.addEventListener('click', _this.handleNameClick.bind(_this));
    });
    this.prevBtn.addEventListener('click', this.showPrevTab.bind(this));
    this.nextBtn.addEventListener('click', this.showNextTab.bind(this));
  }

  _createClass(TabsClass, [{
    key: "handleNameClick",
    value: function handleNameClick(event) {
      var _this2 = this;

      this.tabNames.forEach(function (tabName, i) {
        if (event.target === tabName) {
          _this2.tabIndex = i;

          _this2.activateTab();
        }
      });
    }
  }, {
    key: "activateTab",
    value: function activateTab() {
      this.hideAllTabs();
      this.tabNames[this.tabIndex].classList.add('active');
      this.tabs[this.tabIndex].style.display = 'block';

      if (this.tabIndex === this.tabMinIndex) {
        this.prevBtn.classList.add('disabled');
      }

      if (this.tabIndex === this.tabMaxIndex) {
        this.nextBtn.classList.add('disabled');
      }
    }
  }, {
    key: "hideAllTabs",
    value: function hideAllTabs() {
      this.prevBtn.classList.remove('disabled');
      this.nextBtn.classList.remove('disabled');
      this.tabNames.forEach(function (tabName) {
        tabName.classList.remove('active');
      });
      this.tabs.forEach(function (tab) {
        tab.style.display = 'none';
      });
    }
  }, {
    key: "showPrevTab",
    value: function showPrevTab() {
      if (this.tabIndex - 1 < this.tabMinIndex) {
        return;
      }

      this.tabIndex--;
      this.activateTab();
    }
  }, {
    key: "showNextTab",
    value: function showNextTab() {
      if (this.tabIndex + 1 > this.tabMaxIndex) {
        return;
      }

      this.tabIndex++;
      this.activateTab();
    }
  }]);

  return TabsClass;
}();



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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************************!*\
  !*** ./src/js/user/ProductTabAttributes.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImageCarouselClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageCarouselClass.js */ "./src/js/user/ImageCarouselClass.js");
/* harmony import */ var _ImageZoomClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageZoomClass.js */ "./src/js/user/ImageZoomClass.js");
/* harmony import */ var _TabsClass_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabsClass.js */ "./src/js/user/TabsClass.js");



window.addEventListener('DOMContentLoaded', function () {
  new _ImageCarouselClass_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    allImagesWrapper: '.image-carousel',
    activeImageWrapper: '.active-view'
  });
  new _ImageZoomClass_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    activeImageContainer: '.active-view',
    popupImageWrapper: '.popup__image-wrapper',
    popupTemplate: '#image-zoom-popup-template',
    popupClose: '.popup__close'
  });
  new _TabsClass_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    tabNamesContainer: '.info-tabs__tabs',
    tabName: '.info-tabs__tab',
    tabContainer: '.tab-content',
    tab: '.tab-content__item',
    prevBtn: '.control.left',
    nextBtn: '.control.right'
  });
});
})();

/******/ })()
;
//# sourceMappingURL=ProductTabAttributes.js.map