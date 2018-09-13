import { Component, OnInit } from '@angular/core';
import { UpdatesService } from '../../@core/updates/updates.service';
import { Update } from '../../@core/updates/update.model';



@Component({
  selector: 'updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

  constructor(private updatesService : UpdatesService) { }

  updates : Update[] = [];
  singleUpdate : Boolean = false;
  update : Update;

  ngOnInit() {
    this.updatesService.getUpdates().subscribe((result) => {
      this.updates = result.result;
      for(let update of this.updates) {
        update.date = new Date(update.date);
      }
  });
  }

  private singleUpdateSet(update : Update) {
    this.singleUpdate = true;
    this.update = update;
  }

}
