import Student from "./IStudent"

export default class PartTimeStudent implements Student{
  readonly sid: number
  snm:string
  per:number
  isPass:boolean
  studentType: string

  constructor(
    sid: number,
    snm:string,
    per:number,
    isPass:boolean,
    studentType: string
  ){
    this.sid = sid
    this.isPass=isPass
    this.snm = snm
    this.per = per
    this.studentType = studentType
  }

  display(): void{
    console.log(this.sid)
    console.log(this.studentType)
  }
}