import { Component, OnDestroy, OnInit } from '@angular/core';

import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.activatedEmitter.subscribe(
      (data) => this.userActivated = data
    )
  }

  ngOnDestroy(): void {
    this.userService.activatedEmitter.unsubscribe();
  }
}
