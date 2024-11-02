import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  readonly dialog = inject(MatDialog);

  ngOnInit() {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      height: '335px',
    });
  }

  animal() {

  }

}