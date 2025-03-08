import Student from "./IStudent"
import FullTimeStudent, {COLLEGE} from "./FullTimeStudent"
import PartTimeStudent from "./PartTimeStudent"

console.log('Hello TypeScript')
var a = 100 //Number
console.log(a)


// a = "Hello"

var b:string
b = 'Hello'
var c:number = 100
var d:boolean = false
var e:String = "Hello"

// string is a type but String is an interface

function add(a:number, b:number):number{
  return a + b
}

const sum = add(10, 20)
console.log(sum)
console.log(typeof sum)

let x:string | number //Union
x = 100
x = "Hello"  

let y:unknown
y=true

console.log(`${y} is boolean`)

if(typeof y === 'string'){
  console.log(`${y} is string`)
}else if(typeof y === 'number'){
  console.log(`${y} is number`)
}


var s1: Student
s1 = {
  sid:1,
  snm:"Ramtin",
  per: 75,
  isPass:true
}
console.log(s1)



var s2 = new FullTimeStudent()
s2.studentType = "FulltimeStudent"
s2.print()

// Type
type StringOrNumber= string | number
type ID= null | number

var x1: StringOrNumber = 100
x1= "Hello"

var a1: ID = null
a1 = 100

type Address = {
  streetNo: number
  streetName: string
  city: string
  postalCode: string
}

type Geo = {
  lat: number
  lng: number
  alt: number
}

type FullAddress = Address & Geo

var home: FullAddress = {
  streetNo: 100,
  streetName: "Street Name",
  city: "TOR",
  postalCode: "M1M1M1M1",
  lat: 10,
  lng: 20,
  alt: 30
}

//Class access
var pts1 = new PartTimeStudent(1, "Patel", 10.89, false, "PartTimeStudent")
pts1.snm = "Ramtin" 
// pts1.sid = 100 //Error  because it is readonly
pts1.display()