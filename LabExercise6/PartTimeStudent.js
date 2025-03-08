"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PartTimeStudent = /** @class */ (function () {
    function PartTimeStudent(sid, snm, per, isPass, studentType) {
        this.sid = sid;
        this.isPass = isPass;
        this.snm = snm;
        this.per = per;
        this.studentType = studentType;
    }
    PartTimeStudent.prototype.display = function () {
        console.log(this.sid);
        console.log(this.studentType);
    };
    return PartTimeStudent;
}());
exports.default = PartTimeStudent;
