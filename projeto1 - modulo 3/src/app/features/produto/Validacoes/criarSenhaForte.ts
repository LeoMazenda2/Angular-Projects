import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export function criarSenhaForte(): ValidatorFn {
    
        return (control: AbstractControl) : ValidationErrors | null => {

            const value = control.value;
            
            if(!value) {
                return null;
            }

            const temLetraMaiuscula = /[A-Z]+/.test(value);
            const temLetraMinuscula = /[a-z]+/.test(value);
            const temAlgumNumero = /[0-9]+/.test(value);

            const senhaValida = temLetraMaiuscula && temLetraMinuscula && temAlgumNumero;

            return !senhaValida ? {senhaForte: true}: null;
        }
}
