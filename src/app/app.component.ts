import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<number>();

  public isAddTimerVisible: boolean = false;
  public isEndTimerVisible: boolean = false;
  public time: number = 0;
  public timers: Array<number> = [];

  constructor() { 
    this.timers = [3, 20, 184];
  }

  logCountdownEnd() {
    console.log("the countdown has finished");
  }

  showAddTimer() {
    this.isAddTimerVisible = true;
  }

  hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  showEndTimer() {
    this.isEndTimerVisible = true;
  }

  hideEndTimer() {
    this.isEndTimerVisible = false;
  }

  submitAddTimer() {
    this.timers.push(this.time);
    this.hideAddTimer();
  }
}
