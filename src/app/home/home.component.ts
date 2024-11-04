import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseDatabaseService } from '../firebase-database.service';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);

  private _snackBar = inject(MatSnackBar);

  constructor(private db: FirebaseDatabaseService) {}

  ngOnInit() {
    this.db.getData(`account/${localStorage.getItem('Lotto-ID')}`).then((account) => {
      if (!account.exists()) {
        const dialogRef = this.dialog.open(InputDialogComponent, {
          height: '335px',
          disableClose: true,
        });
      }
    }).catch(() => {
      this._snackBar.open('계정 확인 실패', '');
        setTimeout(() => {
          this._snackBar.dismiss();
        }, 3000)
    });
  }

}