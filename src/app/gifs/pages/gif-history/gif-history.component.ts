import {  Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifServiceService } from '../../services/gif_service.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',

})
export class GifHistoryComponent {

  gifSVC = inject(GifServiceService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
     map(params=>params['query'])
    )
  )

  gifsbykey = computed(()=>{
    return this.gifSVC.getHistoryGifs(this.query());
  });

}
