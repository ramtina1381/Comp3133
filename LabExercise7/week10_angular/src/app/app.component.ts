import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentComponent } from './student/student.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentComponent],
  template: "<h1>Hello world<h1>",
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'week10_angular';
  college = "George Brown";
  person_image = "https://randomuser.me/api/portraits/women/39.jpg"

  stud={
    sid: 1,
    firstname: "Ramtin",
    lastname: "Abolfazli",
    result: "PASS"
  }
  today: Date = new Date(2025, 3, 11)
  now = new Date()

  buttonClick(): void{
    alert('Hello: '+ this.today)

  }
}
