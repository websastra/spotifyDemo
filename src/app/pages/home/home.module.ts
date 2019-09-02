import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout'
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router'
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzGridModule,
    RouterModule
  ],
  providers : [HeaderComponent]
})
export class HomeModule { }
