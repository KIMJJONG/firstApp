import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FirebaseDatabaseService } from '../firebase-database.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  numberHistory: any;

  constructor(private db: FirebaseDatabaseService) {}

  ngOnInit() {
    this.db.getData(`history/${localStorage.getItem('Lotto-ID')}`).then((numbers) => {
      this.numberHistory = numbers.val();
      // console.log(numbers.val());
      for (let number of this.numberHistory) {
        console.log(number);
      }
      // if (!account.exists()) {
      //   const dialogRef = this.dialog.open(InputDialogComponent, {
      //     height: '335px',
      //     disableClose: true,
      //   });
      // }
    }).catch(() => {
      // this._snackBar.open('계정 확인 실패', '');
      //   setTimeout(() => {
      //     this._snackBar.dismiss();
      //   }, 3000)
    });
  }

}
