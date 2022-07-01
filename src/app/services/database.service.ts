import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AnimeModel } from '../models/anime.model';
import { ReviewModel } from '../models/review.model';
import { CreateRateRequestModel } from '../models/rate-request.model';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private fireService: AngularFirestore, private database: AngularFireDatabase) { }

  insertAnime(animeName: string) {
    return this.fireService.collection('animes').add({ name: animeName });
  }

  async deleteAnime(animeId: string) {
    this.fireService.collection<ReviewModel>('animes').doc(animeId).delete();
    const animeReviews = await this.fireService.collection<ReviewModel>('reviews').ref.where('anime', '==', animeId).get();
    animeReviews.forEach(doc => doc.ref.delete());
  }

  getAnimes() {
    return this.fireService.collection<AnimeModel>('animes').snapshotChanges().pipe(take(1)).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as AnimeModel;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getReviews() {
    return this.fireService.collection<ReviewModel>('reviews').snapshotChanges().pipe(take(1)).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ReviewModel;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addReview(request: CreateRateRequestModel) {
    return this.fireService.collection('reviews').add({ anime: request.anime, note: request.note, rating: request.rating });
  }

  deleteReview(rateId: string) {
    return this.fireService.collection<ReviewModel>('reviews').doc(rateId).delete();
  }


}
