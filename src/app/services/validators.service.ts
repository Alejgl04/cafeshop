import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {


  public isFieldOneEqualFieldTwo( firstField: string, secondField: string ) {

    console.log({firstField,secondField});
    return ( formGroup: FormGroup ): ValidationErrors | null => {

      const firstFieldValue = formGroup.get(firstField)?.value;
      const secondFieldValue = formGroup.get(secondField)?.value;

      if ( firstFieldValue !== secondFieldValue ) {
        formGroup.get( secondField )?.setErrors({ notEqual: true });
        return { notEqual: true }
      }
      formGroup.get( secondField )?.setErrors(null);
      return null;
    }
  }

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError( form: FormGroup, field: string ): string | null {

    if ( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return `The ${field} field is required`;

        case 'minlength':
          return `Minimum ${errors['minlength'].requiredLength} characters`;

        case 'email':
          return `The ${field} field needs to be an valid email`;
      }
    }
    return null;
  }
}
