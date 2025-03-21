import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyhttpclientService {

  private BASE_URL = "https://jsonplaceholder.typicode.com"
  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<any>{
    return this.httpClient.get(`${this.BASE_URL}/posts`)
  }

  createPosts(data: any): Observable<any>{
    return this.httpClient.post(`${this.BASE_URL}/posts`, data)
  }

  updatePost(id: number, data: any): Observable<any>{
    return this.httpClient.put(`${this.BASE_URL}/posts/${id}`, data)
  }

  deletePost(id: number): Observable<any>{
    return this.httpClient.delete(`${this.BASE_URL}/posts/${id}`)
  }
}
