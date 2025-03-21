import { Component, OnInit } from '@angular/core';
import { MyhttpclientService } from '../services/myhttpclient.service';
import { CommonModule } from '@angular/common'; // ✅ Required for structural directives
import { PostdetailsComponent } from '../postdetails/postdetails.component';
@Component({
  selector: 'app-posts',
  imports: [CommonModule, PostdetailsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {


  posts: any[] = []
  constructor(private myhttpclientservice: MyhttpclientService) {}

  ngOnInit(): void {  
    this.getPosts()
  }

  getPosts(){
    this.myhttpclientservice.getPosts().subscribe(
      (data: any) => {
        console.log(data);
        this.posts = data
      },
      (error: any) => {  // ✅ Fixed arrow function syntax
        console.log(`Error: ${error}`);
      }
    );
  }

  createPosts(){
    const newPost = {title: "New Post", body: "This is a new post"}
    this.myhttpclientservice.createPosts(newPost).subscribe(
      (data: any) => {
        console.log('post created:', data);
        this.posts.push(data)
      },
      (error: any) => {  // ✅ Fixed arrow function syntax
        console.log(`Error: ${error}`);
      }
    );
  }

  deletePost(id: number):void{
    this.myhttpclientservice.deletePost(id).subscribe(
      (response: any) => {
        console.log('post deleted:', response);
        this.posts = this.posts.filter(post => post.id ! == id)
      },
      (error: any) => {  // ✅ Fixed arrow function syntax
        console.log(`Error: ${error}`);
      }
    );
  }
}