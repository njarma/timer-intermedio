import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-timer-none',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService], // seteo aquí el provider para que cada timer tenga su propia gestión independiente
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TimerNoneComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;
  private countdownEndSubscription: Subscription = null;
  private countdownSubscription: Subscription = null;
  public countdown: number = 0;

  // definir getter para evitar colocar lógica en el template html (buena práctica)
  get progress() {
    console.log("getting progress");
    return (this.init - this.countdown) / this.init * 100;
  }

  constructor(public timer: TimerService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.timer.restartCountdown(this.init);
    this.countdownEndSubscription = this.timer.countdownEnd$.subscribe(() => {
      console.log("--countdown end--");
      this.onComplete.emit();
    });

    this.countdownSubscription = this.timer.countdown$.subscribe((data) => {
      this.countdown = data;
      // Obligo que se verifique si hubieron cambios (cuando manejo objetos mutables)
      this.cdref.markForCheck();
    });

  }

  ngOnDestroy(): void {
    this.timer.destroy();
    this.countdownEndSubscription.unsubscribe();
    this.countdownSubscription.unsubscribe();
  }

}
