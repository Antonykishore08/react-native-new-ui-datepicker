"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCalendarContext = exports.default = void 0;
var _react = require("react");
const CalendarContext = /*#__PURE__*/(0, _react.createContext)({});
const useCalendarContext = () => (0, _react.useContext)(CalendarContext);
exports.useCalendarContext = useCalendarContext;
var _default = exports.default = CalendarContext;
//# sourceMappingURL=CalendarContext.js.map