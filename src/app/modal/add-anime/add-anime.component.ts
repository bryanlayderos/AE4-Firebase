import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-anime',
  templateUrl: './add-anime.component.html',
  styleUrls: ['./add-anime.component.css']
})
export class AddAnimeComponent implements OnInit {
  @Output() animeAdded = new EventEmitter<boolean>();
  public animeName: string;
  public showErrors: boolean;
  public isLoading: boolean;

  constructor(public bsModalRef: BsModalRef, public databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  closeModal(): void{
    this.bsModalRef.hide();
  }

  addAnime(): void{
    if (!this.animeName) {
      this.showErrors = true;
      return;
    } 

    this.isLoading = true;

    this.databaseService.insertAnime(this.animeName).then(
      (response) => {
        this.animeAdded.emit(true);
        this.closeModal();
      }, error => {
        alert('Something went wrong');
        this.isLoading = false;
      }
    );
  }
}
