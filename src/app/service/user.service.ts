import { Injectable } from '@angular/core';
import { CountService } from './count.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];
  constructor(private countService: CountService) { }
  setToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.countService.count({name: this.activeUsers[id], prevstatus: 'Active', status: 'Inactive'})
    this.activeUsers.splice(id, 1);
  }
  setToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.countService.count({name: this.inactiveUsers[id], prevstatus: 'Inactive', status: 'Active'})
    this.inactiveUsers.splice(id, 1);
  }
}
