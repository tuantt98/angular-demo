import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { iPost } from "./post.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {

  error = new Subject<string>();
  constructor(private http: HttpClient) { }

  URL = "https://angular-demo-eb623-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json";

  createAndStorePost(post: iPost) {
    this.http
      .post<{ name: string }>(this.URL, post,{
        observe: 'response'
      })
      .subscribe(responseData =>
        console.log(responseData),
        error => this.error.next(error.message)
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams =searchParams.append("custom", "key");
    console.log(searchParams);

    return this.http
      .get<{ [key: string]: iPost }>(this.URL,
        {
          headers: new HttpHeaders({
            'Custom-Header': 'Hello'
          }),
          params: searchParams,
        })
      .pipe(
        map((resData: { [key: string]: iPost }) => {
          const postsArray: iPost[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              postsArray.push({ id: key, ...resData[key] });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(this.URL,{
      observe: 'events',
      responseType: 'json'
    })
    .pipe(tap(event =>{
      console.log(event);
      if(event.type === HttpEventType.Response){
        console.log(event.body);
      }
      if(event.type === HttpEventType.Sent){
        console.log(event.type);
      }
    }))
    ;
  }
}
