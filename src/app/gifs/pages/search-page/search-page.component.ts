import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifServiceService } from '../../services/gif_service.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {

  gifsvc = inject(GifServiceService);

  gifs = signal<Gif[]>([]);

  onsearch(busqueda:string){

    this.gifsvc.searchGifs(busqueda).subscribe( (resp)=>{
      console.log(resp);
      this.gifs.set(resp);

    });

  }

 }
