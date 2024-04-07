import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _snackBar: MatSnackBar) {}

  authRegisterMesage( message: string ) {
    this._snackBar.open(message, 'Accept');
  }


}
