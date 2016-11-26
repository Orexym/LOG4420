import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  template: `
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

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroService : HeroService) {}

  ngOnInit() : void {
    this.getHeroes();
  }

  onSelect(param: Hero) : void {
    this.selectedHero = param;
  }
  getHeroes(): void {
      this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
}