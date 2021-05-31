import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IbdPageRoutingModule } from './ibd-routing.module';

import { IbdPage } from './ibd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IbdPageRoutingModule
  ],
  declarations: [IbdPage]
})
export class IbdPageModule {}
