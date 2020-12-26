import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit{
    constructor(private element: ElementRef){}

    ngOnInit(){
        this.element.nativeElement.style.backgroundColor = 'green';
    }
}