import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[upperCase]'
})
export class UpperCaseDirective {

    constructor(public ref: ElementRef) { }

    @HostListener('input', ['$event']) onInput(event) {
        this.ref.nativeElement.value = event.target.value.toUpperCase();
    }

}
