import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor() { }
  count(user){
    console.log(`The user ${user.name} switched from being ${user.prevstatus} to ${user.status}`);
  }
}
