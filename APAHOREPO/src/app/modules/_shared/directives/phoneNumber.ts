import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[phoneNumber]'
})
export class PhoneNumberDirective {

    constructor(public ref: ElementRef) { }

    @HostListener('input', ['$event'])
    onInput(event) {
        this.ref.nativeElement.value = this.formatPrimPhone(event, event.target.value);
    }

    formatPrimPhone(event, primaryPhone) {
        let size: number, phone = primaryPhone;

        phone = phone.replace(/[&\/\\#,+()$~%.'":*?<>{}-\sa-zA-Z]/g, '');
        size = phone.length;

        if (event.inputType !== 'insertText' && (primaryPhone.length === 5 || primaryPhone.length === 11)) {
            phone = phone.substring(0, phone.length - 1);
            size--;
        }
        if (size < 3) {
            phone = phone;
        } else if (size === 3) {
            phone = '(' + phone.substring(0, 3) + ') ';
        } else if (size < 6) {
            phone = '(' + phone.substring(0, 3) + ') ' + phone.substring(3, phone.length);
        } else if (size === 6) {
            phone = '(' + phone.substring(0, 3) + ') ' + phone.substring(3, 6) + ' - ';
        } else if (size > 6) {
            phone = '(' + phone.substring(0, 3) + ') ' + phone.substring(3, 6) + ' - ' + phone.substring(6, 10);
        }

        return phone;
    }
}
