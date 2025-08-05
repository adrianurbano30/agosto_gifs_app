import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifServiceService } from '../../services/gif_service.service';

interface MenuOptions{
  icon:string;
  label:string;
  route:string;
  sublabel:string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './gifs-side-menu-options.component.html',

})
export class GifsSideMenuOptionsComponent {

  gifSvc = inject(GifServiceService);

  menuOptions:MenuOptions[]=[
    {
      icon:"casa",
      label:'Trending',
      sublabel:'Most popular gifs',
      route:'/dashboard/trending'
    },
    {
      icon:`buscador`,
      label:'Buscador',
      sublabel:'Buscar gifs',
      route:'/dashboard/search'
    }
  ];

}
