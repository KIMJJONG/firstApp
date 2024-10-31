import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss'
})
export class NumberComponent {

  lottoNumbers: Array<number> = [0, 0, 0, 0, 0, 0];

  constructor() {}
  
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
    console.log(this.lottoNumbers);
    let balls = document.getElementsByClassName('ball');
    let index = 0;
    let showBall = setInterval(() => {
      balls[index].setAttribute('style', 'visibility: visible; background-color: ' + this.setBallColor(index));
      balls[index].innerHTML = this.lottoNumbers[index].toString();
      index++;
      if (balls.length === index) clearInterval(showBall);
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
    let balls = document.getElementsByClassName('ball');
    for (let index = 0; index < balls.length; index++) {
      balls[index].setAttribute('style', 'visibility: hidden;');
    }
    
    this.setLottoNumber();
    this.setLottoBall();
  }
}
