import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GipyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { Gifmapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifServiceService {

  private http_ = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsloading = signal<boolean>(true);

  constructor(){
    this.loadtrendingGifs();
  }

  loadtrendingGifs(){

    this.http_.get<GipyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params:{
        api_key:environment.Giphyapikey,
        limit: 20
      }
    }).subscribe((resp)=>{

      const gifs = Gifmapper.mapGiphyItemsArrToGifArr(resp.data);

      this.trendingGifs.set(gifs);
      this.trendingGifsloading.set(false);

      //console.log(gifs)

    });

  }

  searchGifs(busqueda:string){

   return this.http_.get<GipyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params:{
        api_key:environment.Giphyapikey,
        limit: 20,
        q:busqueda
      }
    }).pipe(
      map(({data})=> Gifmapper.mapGiphyItemsArrToGifArr(data),

    )
    );
  }


}
