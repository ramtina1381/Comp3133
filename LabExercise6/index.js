"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FullTimeStudent_1 = require("./FullTimeStudent");
var PartTimeStudent_1 = require("./PartTimeStudent");
console.log('Hello TypeScript');
var a = 100; //Number
console.log(a);
// a = "Hello"
var b;
b = 'Hello';
var c = 100;
var d = false;
var e = "Hello";
// string is a type but String is an interface
function add(a, b) {
    return a + b;
}
var sum = add(10, 20);
console.log(sum);
console.log(typeof sum);
var x; //Union
x = 100;
x = "Hello";
var y;
y = true;
console.log("".concat(y, " is boolean"));
if (typeof y === 'string') {
    console.log("".concat(y, " is string"));
}
else if (typeof y === 'number') {
    console.log("".concat(y, " is number"));
}
var s1;
s1 = {
    sid: 1,
    snm: "Ramtin",
    per: 75,
    isPass: true
};
console.log(s1);
var s2 = new FullTimeStudent_1.default();
s2.studentType = "FulltimeStudent";
s2.print();
var x1 = 100;
x1 = "Hello";
var a1 = null;
a1 = 100;
var home = {
    streetNo: 100,
    streetName: "Street Name",
    city: "TOR",
    postalCode: "M1M1M1M1",
    lat: 10,
    lng: 20,
    alt: 30
};
//Class access
var pts1 = new PartTimeStudent_1.default(1, "Patel", 10.89, false, "PartTimeStudent");
pts1.snm = "Ramtin";
// pts1.sid = 100 //Error  because it is readonly
pts1.display();
