import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _snackBar: MatSnackBar) {}

  authMessages( message: string ) {
    this._snackBar.open(message, 'Accept');
  }

  confirmMessages( message: string ) {
    this._snackBar.open(message, 'Accept');
  }


}
