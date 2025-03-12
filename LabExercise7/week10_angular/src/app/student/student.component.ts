import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student',
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  @Input() student: any
  x = 100
  y = 100
}
