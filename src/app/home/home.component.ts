import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  counter: Observable<number>
  counterCubscription: Subscription
  constructor() { }

  ngOnInit() {
    // this.counter = interval(1000);

    this.counter = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        if (count === 2) {
          observer.complete()
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'))
        }
        observer.next(count);
        count++
      }, 1000)
    })

    this.counterCubscription = this.counter.pipe(filter(data=>{
      return data > 0
    }), map((data) => {
      return `Round ${data+1}`;
    })).subscribe((count) => {
      console.log(count);
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('completed!!');
    })
  }

  ngOnDestroy() {
    this.counterCubscription.unsubscribe()
  }
}
