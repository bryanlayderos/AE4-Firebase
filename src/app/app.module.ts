import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AnimeCardComponent } from './anime-card/anime-card.component';
import { AddAnimeComponent } from './modal/add-anime/add-anime.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RateModalComponent } from './modal/rate-modal/rate-modal.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AnimeCardComponent,
    AddAnimeComponent,
    RateModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
