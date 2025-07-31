import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
