import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseDatabaseService } from '../firebase-database.service';

@Component({
  selector: 'app-input-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './input-dialog.component.html',
  styleUrl: './input-dialog.component.scss'
})
export class InputDialogComponent {
  readonly dialogRef = inject(MatDialogRef<InputDialogComponent>);

  idPattern = /^[a-zA-Z0-9]{5,19}$/g;
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  private formBuilder = inject(FormBuilder);
  registerForm = this.formBuilder.group({
    id: new FormControl<string>('', [Validators.required, Validators.pattern(this.idPattern)]),
    email: new FormControl<String>('', [Validators.required, Validators.pattern(this.emailPattern)])
  });

  private _snackBar = inject(MatSnackBar);

  constructor(private db: FirebaseDatabaseService) {

  }

  ngOnInit() {

  }

  saveUserInfo() {
    if (this.registerForm.valid) {
      this.db.setData('account/' + this.registerForm.controls.id.value, {
        id: this.registerForm.controls.id.value,
        email: this.registerForm.controls.email.value,
        date: new Date().getTime()
      }).then(() => {
        localStorage.setItem('Lotto-ID', this.registerForm.controls.id.value!);
        this.dialogRef.close();
      }).catch(() => {
        this._snackBar.open('계정 등록 실패', '');
        setTimeout(() => {
          this._snackBar.dismiss();
        }, 3000)
      });
    } else {
      if (this.registerForm.controls.id.invalid) {
        this._snackBar.open('계정은 영문 및 숫자 조합만 가능합니다.', '');
        setTimeout(() => {
          this._snackBar.dismiss();
        }, 3000)
      } 
      if (this.registerForm.controls.email.invalid) {
        this._snackBar.open('이메일 형식에 맞지 않습니다.', '');
        setTimeout(() => {
          this._snackBar.dismiss();
        }, 3000)
      }
    }
  }
}
