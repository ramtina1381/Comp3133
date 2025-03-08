"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLLEGE = void 0;
var FullTimeStudent = /** @class */ (function () {
    function FullTimeStudent() {
    }
    FullTimeStudent.prototype.print = function () {
        console.log("studentType: ".concat(this.studentType));
    };
    return FullTimeStudent;
}());
var COLLEGE = "GBC";
exports.COLLEGE = COLLEGE;
exports.default = FullTimeStudent;
