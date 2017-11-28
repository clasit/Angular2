import { Component, OnInit } from '@angular/core';
import { AlboomService } from '../../alboom.service';
import { IPhoto } from '../photo/photo.interface';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})


export class CollectionComponent implements OnInit {

  private _photos: IPhoto[];
  private cols = 1;
  private rows = 2;
  private color = 'lightblue';


  constructor(private _alboomService: AlboomService) { }


  set photos(p){ this._photos = p; }
  get photos(){ return this._photos; }
  

  ngOnInit() {
    this._alboomService.getProducts()
      .subscribe(
        (photos) => {
          this.photos = photos;
        },
        (error) => { alert('Error.CollectionComponent.ngOnInit'); }
      )
  }
}
