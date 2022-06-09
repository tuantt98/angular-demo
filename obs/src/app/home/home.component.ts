import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs'
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  private firstBbsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstBbsSubscription = interval(1000).subscribe((count: number) => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable<number>((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        // if (count === 2) {
        //   observer.complete();
        // }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    })

    customIntervalObservable.pipe(
      map((data: number) => {
        console.log('map: ',data);

        return 'Round: ' + (data + 1);
      }),
      filter((data: string) => {
        console.log('filter: ',data);

        return data.indexOf('Round: 3') === -1;
      })
    ).subscribe((data: string) => {
      console.log('subscribe: ', data);
    }, (error: Error) => {
      console.log(error);
      // alert(error.message);
      console.log(error.message);

    }, () => {
      console.log('Completed!');
    });

    this.firstBbsSubscription = customIntervalObservable.subscribe(
    (data) => console.log(`Round: ${data + 1}`),
    (error) => console.log(error.message),
    () => console.log('Completed!')
  );
  }

ngOnDestroy(): void {
  this.firstBbsSubscription.unsubscribe();
  console.log('HomeComponent destroyed');
}
}
