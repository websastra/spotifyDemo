import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService, ScopesBuilder, AuthConfig, TokenService } from 'spotify-auth';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { InfoService } from '../../info.service';
import { HomeComponent } from '../../pages/home/home.component'
import { omit } from 'lodash';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user : any;
  public searchResponse : any;

  query: FormControl = new FormControl();
  constructor(private authService: AuthService, public homeComponent : HomeComponent, public infoService : InfoService, private tokenSvc: TokenService,  private router: Router) { }
  ngOnInit() {
    this.query.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(query => this.infoService.fetchUserInfo()
        .subscribe(res => this.infoService.getSearchStream(query, 'album').subscribe(
          res => {
            this.infoService.albums = res['albums'] ? res['albums'].items.map((y:any) => omit(y)) : [];
          })
        ));
        this.infoService.fetchUserInfo().subscribe(data => {
          this.user = data
        })

    if(!!this.tokenSvc.oAuthToken){
      localStorage.setItem('token' , this.tokenSvc.oAuthToken);
      this.router.navigate(['home']);
    }
  }

  login() : void{
    const scopes = new ScopesBuilder().withScopes(ScopesBuilder.LIBRARY).build();
    const ac: AuthConfig = {
      client_id: environment.client_id,
      response_type: "token",
      redirect_uri: environment.redirect_uri,
      state: "",
      show_dialog: true,
      scope: scopes
    };
    this.authService.configure(ac).authorize();
  }
}
