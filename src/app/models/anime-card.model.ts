import { AnimeModel } from "./anime.model";
import { ReviewModel } from "./review.model";

export class AnimeCardModel {
    anime: AnimeModel;
    reviews: ReviewModel[];
}
