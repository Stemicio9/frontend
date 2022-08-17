import {AbstractControl, ValidatorFn} from "@angular/forms";
import {UserService} from "../services/user.service";
import {map} from "rxjs/operators";

export default class Validation {




  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl!.errors && !checkControl!.errors['matching']) {
        return null;
      }
      if (control!.value !== checkControl!.value) {
        controls.get(checkControlName)!.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }


  static emailExists(userservice: UserService){
    return (control: AbstractControl) => {
      return userservice.chechemail(control.value).pipe(map((result:any) => {
         if(result.uploadok){
           return {"emailexists" : true};
         }
         return null;
      }))
    };
  }

  static emailExistsAndCurrentUser(userservice: UserService, currentUserEmail: string | undefined){
    return (control: AbstractControl) => {
      return userservice.chechemail(control.value).pipe(map((result:any) => {
        if(control.value === currentUserEmail){
          return null;
        }
        if(result.uploadok){
          return {"emailexists" : true};
        }
        return null;
      }))
    };
  }


  static userExists(userservice: UserService){
    return (control: AbstractControl) => {
      return userservice.existUser(control.value).pipe(map((result:any) => {
        if(result.exists){
          return {"userexists" : true};
        }
        return null;
      }))
    };
  }


}
