import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseDatabaseService } from '../firebase-database.service';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss'
})
export class NumberComponent {

  lottoNumbers: Array<number> = [0, 0, 0, 0, 0, 0];

  constructor(private db: FirebaseDatabaseService) {}
  
  ngOnInit() {
    this.setLottoNumber();
    this.setLottoBall();
  }

  setLottoNumber() {
    for (let index in this.lottoNumbers) {
      this.lottoNumbers[index] = Math.floor(Math.random() * 45 + 1);
    }

    while (true) {
      let isComplete = true;
      this.lottoNumbers.sort((a: number, b: number) => a - b);
      for (let index = 0; index < this.lottoNumbers.length - 1; index++) {
        if (this.lottoNumbers[index] === this.lottoNumbers[index + 1]) {
          isComplete = false;
          this.lottoNumbers[index + 1] = Math.floor(Math.random() * 45 + 1);
        }
      }
      if (isComplete) break;
    }
  }

  setLottoBall() {
    let balls = document.getElementsByClassName('ball');
    let index = 0;
    let showBall = setInterval(() => {
      balls[index].setAttribute('style', 'visibility: visible; background-color: ' + this.setBallColor(index));
      balls[index].innerHTML = this.lottoNumbers[index].toString();
      index++;
      if (balls.length === index) {
        clearInterval(showBall);
        let buttons = document.querySelector('button-area')?.childNodes;
        Array.from(buttons).forEach((button) => {
          console.log(button);
          button.removeAttribute('disabled');
        });
      }
    }, 1000);
  }

  setBallColor(index: number) {
    switch (true) {
      case (this.lottoNumbers[index] <= 10):
        return '#FBC400';
      case (this.lottoNumbers[index] <= 20):
        return '#69C8F2';
      case (this.lottoNumbers[index] <= 30):
        return '#FF7272';
      case (this.lottoNumbers[index] <= 40):
        return '#AAAAAA';
      default:
        return '#B0D840';
    }
  }

  remakeNumber() {
    // this.isSetting = true;
    let balls = document.getElementsByClassName('ball');
    for (let index = 0; index < balls.length; index++) {
      balls[index].setAttribute('style', 'visibility: hidden;');
    }
    
    this.setLottoNumber();
    this.setLottoBall();
    // this.isSetting = false;
  }

  saveNumber() {
    let balls = document.getElementsByClassName('ball');
    this.db.setData('history/kimjjong327/' + new Date().getTime(), {
      number1: balls[0].textContent,
      number2: balls[1].textContent,
      number3: balls[2].textContent,
      number4: balls[3].textContent,
      number5: balls[4].textContent,
      number6: balls[5].textContent,
    })
  }
}
