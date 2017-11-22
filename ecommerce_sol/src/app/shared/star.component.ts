import { 
        Component, 
        OnInit, 
        OnChanges, 
        Input, 
        Output,
        EventEmitter
      } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit, OnChanges {
  @Input() rating: number;
  @Output() ratingClicked: EventEmitter<boolean> 
                                = new EventEmitter<boolean>(); 
  starWidth: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    console.log("Cambio de estado en las propiedades");
    this.starWidth = this.rating * 86 / 5;
  }

  onClick(): void {
    this.ratingClicked.emit(false);
  }

}
