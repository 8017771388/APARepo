import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[zipConverter]'
})
export class ZipConverterDirective {

    constructor(public ref: ElementRef) { }

    @HostListener('input', ['$event'])
    onInput(event) {
        this.ref.nativeElement.value = this.formatPrimPhone(event, event.target.value);
    }

    formatPrimPhone(event, zipNumber) {
        let size: number,
            zip = zipNumber;

        zip = zip.replace(/[&\/\\#,+()$~%.'":*?<>{}-\sa-zA-Z]/g, '');
        size = zip.length;

        if (event.inputType !== 'insertText' && (zipNumber.length === 4 || zipNumber.length === 11)) {
            zip = zip.substring(0, zip.length - 1);
            size--;
        }
        if (size < 4) {
            zip = zip;
        } else if (size === 5) {
            zip = zip.substring(0, 4) + ' - ' + zip.substring(4, 5);
        } else if (size > 5) {
            zip = zip.substring(0, 4) + ' - ' + zip.substring(4, 8);
        }

        return zip;
    }
}
