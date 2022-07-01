import { Component, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AnimeCardComponent } from './anime-card/anime-card.component';
import { AddAnimeComponent } from './modal/add-anime/add-anime.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(AnimeCardComponent) animeCard: AnimeCardComponent;
  title = 'anime-reviews';

  constructor(private modalService: BsModalService) {
  }

  showAddAnimeModal(): void {
    const modalRef = this.modalService.show(AddAnimeComponent);
    modalRef.content.animeAdded.subscribe(
      (response) => {
        this.animeCard.loadDocuments();
      }
    )
  }
}
