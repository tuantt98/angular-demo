import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f') signupForm: NgForm;

  answer = '';
  genders = ["male", "female"]
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    gender: '',
    answer: ''
  }
  submitted = false
  suggestUserName() {
    const suggestedName = 'Superuser';

    this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    })
    // this.signupForm.form.patchValue({
    //   userData:{
    //     username: suggestedName
    //   }
    // })
  }


  defaultQuestion = 'pet';
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.submitted = true;
    console.log(this.signupForm.form);
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.userData.secret;
    this.user.gender = this.signupForm.value.gender;
    this.user.answer = this.answer;

    this.signupForm.reset();
  }
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
}
