import { Component, OnInit, Directive, Input, AfterViewInit, ViewChild } from '@angular/core';
import { InfoService } from '../../info.service';
import { TokenService } from 'spotify-auth';
import { omit } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { isEmpty } from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  private stream: Subscription | null = null;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  public  albumUrl: string = '';
  constructor(public infoSvc: InfoService, private tokenSvc: TokenService, public sanitizer : DomSanitizer, public router : Router) {
    
   }
  ngOnDestroy(): void {
    if(this.stream){
      this.stream.unsubscribe();
    }
  }

  ngAfterViewInit(){   
    
  }

  ngOnInit() {
    this.infoSvc.fetchNewAlbums().subscribe((x:any) => {
      if(x.albums){
        this.infoSvc.albums = x.albums.items.map((y:any) => omit(y));
      }
    });
  }

  viewAlbum(id){
    console.log(id, 'id')
    this.router.navigate(['album/' + id]);    
  }

  onScrollUp() {
    console.log('scrolled up!!');
  }

  public hasAlbums(): boolean{
    return !isEmpty(this.infoSvc.albums);
  }

  public get jAlbums(): {} {
    return JSON.stringify(this.infoSvc.albums, null, 2);
  }

}
