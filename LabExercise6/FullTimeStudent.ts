import Student from "./IStudent"

class FullTimeStudent implements Student{
  sid: number
  snm:string
  per:number
  isPass:boolean
  studentType: string

  print(){
    console.log(`studentType: ${this.studentType}`)
  }
}

const COLLEGE = "GBC"
export default FullTimeStudent
export {COLLEGE}