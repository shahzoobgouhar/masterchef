import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved = false;
  queryParams: Params

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.queryParams = this.route.snapshot.queryParams;
    console.log('From Snapshot', this.route.snapshot.queryParams);
    console.log('From Snapshot', this.route.snapshot.fragment);

    // this.route.queryParams.subscribe(data => console.log('from query param observable', data));
    this.route.queryParams.subscribe((queryParms: Params) => {
      this.allowEdit = queryParms['allowEdit'] === '1' ? true: false
    })
    this.route.fragment.subscribe(data => console.log('from fragment observable', data))
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((params: Params)=>{
      this.server = this.serversService.getServer(+params['id']);
    })
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route, queryParams:this.queryParams})
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    if(!this.allowEdit) {
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){
      return confirm('Do you want to discard changes ?')
    } else {
      return true
    }
  }

}
