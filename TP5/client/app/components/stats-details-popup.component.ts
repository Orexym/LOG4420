import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-stats-details',
  templateUrl: 'templates/stats-details'
})

export class StatsDetailsPopupComponent {
	  
  constructor(
		//private statsService: StatsService,
	) {
      this.hide();
      
  }
  
  private isHidden = true;
  private visibleAnimate = false;

  public show(): void {
  console.log("showing");
    this.isHidden = false;
    console.log(this.isHidden);
  }

  public hide(): void {
    this.isHidden = true;
  }

  public getVisibility() {
      return this.isHidden ? "modalInVisible" : "modalVisible";
  }
}
