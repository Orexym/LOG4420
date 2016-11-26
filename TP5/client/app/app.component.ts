import { Component  } from '@angular/core';
import { Hero } from './hero';

const HEROES: Hero[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];

@Component({
  selector: 'mon-app',
  template: `
    <h1>{{title}}</h1>
    <h2>My heroes</h2>
    <ul class="heroes">
        <li *ngFor="let item of heroes" 
        [class.selected]="item === selectedHero"
        (click)="onSelect(item)">
            <span class="badge">{{item.id}}</span> {{item.name}}
        </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    `
})

export class AppComponent {
  title = "Tour of heroes";
  heroes: Hero[] = HEROES;
  selectedHero: Hero;

  onSelect(param: Hero) : void {
    this.selectedHero = param;
  }
}