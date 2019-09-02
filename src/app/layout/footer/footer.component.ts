import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../info.service';
import { omit } from 'lodash';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public infoSvc : InfoService) { }

  ngOnInit() {
  }

  getPlayer(){
    this.infoSvc.fetchUserPlayer().subscribe((x:any) => {
      console.log(x, 'user player');
      // if(x.albums){
      //   this.infoSvc.albums = x.albums.items.map((y:any) => omit(y));
      // }
    });
  }

}
