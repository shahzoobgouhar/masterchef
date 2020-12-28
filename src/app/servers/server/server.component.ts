import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  constructor(
    private serversService: ServersService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data)=>{
      this.server = data['server'];
      console.log("************", this.server);
    })
    // const id = +this.route.snapshot.params['id']
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']);
    // })
  }

  onEdit() {
    // this.router.navigate(['/servers', this.server.id, 'edit']) also ok
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'}) //add relativeTo so that angular knows from whoch route it is relative to
  }

}
