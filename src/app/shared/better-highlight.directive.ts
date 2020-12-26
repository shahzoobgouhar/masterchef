import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'red'
  @HostBinding('style.backgroundColor') bgcolor: string;
  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.bgcolor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseenter(){
    // this.renderer.setStyle(this.element.nativeElement, 'background-color', 'blue');
    // this.bgcolor = 'blue';
    this.bgcolor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleve(){
    // this.renderer.setStyle(this.element.nativeElement, 'background-color', 'transparent');
    // this.bgcolor = 'transparent';
    this.bgcolor = this.defaultColor;
  }

}
