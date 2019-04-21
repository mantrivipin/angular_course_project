import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding } from '@angular/core';
@Directive({
    selector: "[appDropdown]"
})

export class DropdownDirective implements OnInit{
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen(eventData: Event){
    // if (this.elementRef.nativeElement.parentElement.classList.contains('open')){
    //   this.renderer.removeClass(this.elementRef.nativeElement.parentElement, 'open');
    // } else {
    //   this.renderer.addClass(this.elementRef.nativeElement.parentElement, 'open');
    // }
    this.isOpen = !this.isOpen;
  }
//   constructor(private elementRef: ElementRef, private renderer: Renderer2){}

  ngOnInit() {}
}


