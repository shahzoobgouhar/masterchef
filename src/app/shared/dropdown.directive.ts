import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    /***************method 1 ***************/
    // @HostListener('click') onclick() {
    //     const classList = this.elemRef.nativeElement.classList;
    //     if(classList.contains('open')) {
    //         this.elemRef.nativeElement.classList.remove('open');
    //     } else {
    //         this.elemRef.nativeElement.classList.add('open');
    //     }
    // }
    // constructor(private elemRef: ElementRef){}

    /***************method 2 ***************/
    @HostBinding('class.open') isOpen: boolean = false;
    @HostListener('click') toggle() {
        this.isOpen = !this.isOpen;
    }
}