import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatabaseService } from 'src/app/services/database.service';
import { CreateRateRequestModel } from '../../models/rate-request.model';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.css']
})
export class RateModalComponent implements OnInit {
  @Output() animeId: string;
  @Output() rateAdded = new EventEmitter<boolean>();
  public rateRequest: CreateRateRequestModel;
  public showErrors: boolean;
  public isLoading: boolean;

  constructor(public bsModalRef: BsModalRef, public databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.rateRequest = new CreateRateRequestModel();
  }

  rateAnime(): void {
    this.isLoading = true;

    if (!this.rateRequest.rating || !this.rateRequest.note) {
      this.showErrors = true;
      this.isLoading = false;
      return;
    }

    this.rateRequest.anime = this.animeId;

    this.databaseService.addReview(this.rateRequest).then(
      (response) => {
        this.rateAdded.emit(true);
        this.closeModal();
      }, error => {
        alert('Something went wrong');
        this.isLoading = false;
      }
    );
  }

  

  closeModal(): void{
    this.bsModalRef.hide();
  }
}
