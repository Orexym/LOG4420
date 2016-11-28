import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-stats-details',
  templateUrl: 'templates/stats-details'
})

export class StatsDetailsComponent {
	  
  public visible = false;
  private visibleAnimate = false;

  public show(): void {
  console.log("showing");
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }
}
