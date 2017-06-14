import { Component } from '@angular/core';

import { MapPage,ListPage,HomePage} from '../';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  listRoot = ListPage;
  mapRoot = MapPage;

  constructor() {

  }
}
