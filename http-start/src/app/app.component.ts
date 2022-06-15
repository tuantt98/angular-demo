import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { iPost } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: iPost[] = [];
  isFetching = false;
  error = null;
  private errSub: Subscription;

  constructor(private http: HttpClient, private postService: PostsService) { }

  ngOnInit() {
    this.errSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    }
    );
    this.onFetchPosts();
  }

  onCreatePost(postData: iPost) {
    // Send Http request
    console.log(postData);
    this.postService.createAndStorePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true
    this.postService
      .fetchPosts()
      .subscribe((posts: iPost[]) => {
        console.log(posts);
        this.isFetching = false
        this.loadedPosts = posts
      },
        error => {
          this.isFetching = false
          this.error = error.message
          console.log(error);
        }
      )
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
  }

}
