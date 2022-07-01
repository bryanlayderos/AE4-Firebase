import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RateModalComponent } from '../modal/rate-modal/rate-modal.component';
import { AnimeCardModel } from '../models/anime-card.model';
import { AnimeModel } from '../models/anime.model';
import { ReviewModel } from '../models/review.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css']
})
export class AnimeCardComponent implements OnInit {
  public animeCardMap: Map<string, AnimeCardModel>;
  public animeCards: AnimeCardModel[];
  public dataRetrieved: boolean;

  constructor(private modalService: BsModalService, public databaseService: DatabaseService) {
  }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void{
    this.dataRetrieved = false;
    this.animeCardMap = new Map<string, AnimeCardModel>();
    this.animeCards = [];

    this.databaseService.getAnimes().subscribe(
      (animes) => {
        for (let anime of animes){
          const cardModel = new AnimeCardModel();
          cardModel.anime = anime;
          cardModel.reviews = [];
          this.animeCardMap.set(anime.id, cardModel);
        }

        this.databaseService.getReviews().subscribe(
          (reviews) => {
            if (reviews && reviews.length > 0) {
              for (let review of reviews) {
                if (this.animeCardMap.has(review.anime)){
                  const entry = this.animeCardMap.get(review.anime);
                  entry.reviews.push(review);
                }
              }
            }
           
            this.dataRetrieved = true;
          }
        )
      }, (error) => {
        this.dataRetrieved = true;
        alert('Something went wrong');
      }
    )
  }

  removeRating(rateId: string): void {
    this.databaseService.deleteReview(rateId);
    this.loadDocuments();
  }

  async removeAnime(animeId: string): Promise<void>{
    await this.databaseService.deleteAnime(animeId);
    this.loadDocuments();
  }

  showAddReviewModal(anime: AnimeModel): void {
    const modalRef = this.modalService.show(RateModalComponent);
    modalRef.content.animeId = anime.id;
    modalRef.content.rateAdded.subscribe(
      (response) => {
        this.loadDocuments();
      }
    );
  }
}
