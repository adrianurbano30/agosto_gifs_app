import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html',

})
export class GifListItemComponent {

  imageurl = input.required<string>();

}
