import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConferenceSpeakersPageRoutingModule } from './conference-speakers-routing.module';

import { ConferenceSpeakersPage } from './conference-speakers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConferenceSpeakersPageRoutingModule
  ],
  declarations: [ConferenceSpeakersPage]
})
export class ConferenceSpeakersPageModule {}
