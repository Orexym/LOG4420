import { Component } from '@angular/core';

@Component({
    selector: 'my-index',
    templateUrl: 'templates/index'
})

export class IndexComponent {
	title = 'Accueil'
	private bannerHidden = true;
}
