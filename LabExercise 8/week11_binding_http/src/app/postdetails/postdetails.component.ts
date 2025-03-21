import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-postdetails',
  imports: [],
  templateUrl: './postdetails.component.html',
  styleUrl: './postdetails.component.css'
})
export class PostdetailsComponent {
  @Input() userpost: any; // ✅ Define this input property
}
