import { Component, Input } from '@angular/core';
import {User} from "../objects/user";
import {UserService} from "../services/user.service";
import {QuestionService} from "../services/question.service";

@Component({
  selector: 'my-stats-details',
  templateUrl: 'templates/stats-details'
})

export class StatsDetailsPopupComponent {

  user: User;
  static uIDgenerator: number = 0;
  uID: number;


  // strings
  testScore: string;
  examScore: string;

  //Show and hide stats details box
  private isHidden = true;
  private visibleAnimate = false;

  
  
  constructor(
	private userService: UserService,
    private questionService: QuestionService
    ) {
      this.hide();
      this.uID = StatsDetailsPopupComponent.uIDgenerator++;
        this.user = new User();
        questionService.refreshForStats.subscribe( (newUser) => {
            this.user = newUser;
            console.log("Updated user by refreshForStats in Stats by " + this.uID);
            this.populateStatistics();
        });
        userService.newUser.subscribe( (newUser) => {
            this.user = newUser;
            console.log("Updated user by newUser in Stats");
            this.populateStatistics();
        });
    }

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
  
  
  //Actual stats

    private initialise() {
        this.userService.getUser().then(data => {
            this.user = data;
            console.log("Updated user by init in Stats");
            this.populateStatistics();
        });
    }

    populateStatistics() : void {
        this.testScore = (this.user.test.score+this.user.test.currenttest.score || 0) + " / " + (this.user.test.total+this.user.test.currenttest.total || 0);
        this.examScore = this.calculatePercent(this.user.examen.score, this.user.examen.total) + "%";
    }

    ngOnInit() : void {
        this.initialise();
    }

    calculatePercent(score: number, total: number) : number {
        return (Math.round(score / total * 100) || 0);
    }

  
}
