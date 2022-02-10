/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./src/js/manager/editTabs.js ***!
  \************************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.delete-attribute').forEach(function (link) {
    link.addEventListener('click', deleteAttr);
  });
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', sendForm);
  });
});

var deleteAttr = function deleteAttr(event) {
  event.preventDefault();
  var dbID = event.target.dataset.id;
  var path = '/edit-tabs.php?method=' + event.target.dataset.action;
  var url = new URL(path, window.location.origin).toString();
  var undo = confirm("Вы действительно хотите удалить атрибут? Действия будут применены безвозвратно");
  if (!undo) return;
  var formData = new FormData();
  formData.append('id', dbID);

  if (event.target.dataset.type !== undefined) {
    formData.append('type', event.target.dataset.type);
  }

  fetch(url, {
    method: 'POST',
    body: formData
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    if (response.status === 'error') {
      errorAlert(event.target, response.text);
    } else {
      successAlert(event.target, response.text);
      document.querySelector("#attribute-".concat(dbID)).remove();
    }
  });
};

var sendForm = function sendForm(event) {
  event.preventDefault();
  var action = event.target.getAttribute('action');
  var path = new URL(action, window.location.origin).toString();
  var formData = new FormData();
  event.target.querySelectorAll('input, select').forEach(function (input) {
    if (input.type === 'file') {
      var _iterator = _createForOfIteratorHelper(input.files),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var file = _step.value;
          formData.append(input.getAttribute('id'), file, file.name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      formData.append(input.getAttribute('id'), input.value);
    }
  }); //seriaId is init in html template <script> tag in header

  formData.append('seriaId', seriaId);
  fetch(path, {
    method: 'POST',
    body: formData
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    if (response.status === 'error') {
      errorAlert(event.target, response.text);
    } else {
      successAlert(event.target, response.text);
    } //clear inputs if needed


    if (event.target.dataset.flushinputs === 'true') {
      event.target.querySelectorAll('input').forEach(function (input) {
        input.value = "";
      });
    }
  });
};

var errorAlert = function errorAlert(form, text) {
  form.querySelectorAll('.alert').forEach(function (alert) {
    alert.remove();
  });
  var alert = document.createElement('div');
  alert.classList.add('alert', 'alert-danger');
  alert.setAttribute('role', 'alert');
  alert.innerText = text;
  form.prepend(alert);
};

var successAlert = function successAlert(form, text) {
  form.querySelectorAll('.alert').forEach(function (alert) {
    alert.remove();
  });
  var alert = document.createElement('div');
  alert.classList.add('alert', 'alert-success');
  alert.setAttribute('role', 'alert');
  alert.innerText = text;
  form.prepend(alert);
};
/******/ })()
;
//# sourceMappingURL=editTabs.js.map