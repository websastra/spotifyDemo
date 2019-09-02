import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { HeaderComponent, FooterComponent, ContentLayoutComponent } from './layout';
import { UserComponent } from './user.component';
import { SpotifyAuthModule } from 'spotify-auth';
import { SpotifyAuthInterceptor2 } from './spotify-auth.interceptor';
import { InfoService }  from './info.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from '../app/pages/home/home.component'
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentLayoutComponent,
    UserComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SpotifyAuthModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [HomeComponent, { provide: NZ_I18N, useValue: en_US }, 
  
    InfoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpotifyAuthInterceptor2, //Force interception.
      multi: true
    }
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
