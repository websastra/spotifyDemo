import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../info.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
 @Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public tracks : string = '';
  public trackId :string = '';
  constructor(private infoSvc: InfoService, public activatedRoute : ActivatedRoute, public sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.trackId = params.get("id")      
    })
    this.infoSvc.fetchAlbumDetail(this.trackId).subscribe((x:any) => {
      this.tracks  = x.items.map((y :any) => {
        let trackUrl = 'https://open.spotify.com/embed/track/' + y.uri.split(':')[2];
        console.log(trackUrl, 'tracks')
        return trackUrl
      });
      console.log(this.tracks, 'tracks')
      // this.tracks = 'https://open.spotify.com/embed/track/' + trackItems[0].uri.split(':')[2];
      
    });
  }

}
