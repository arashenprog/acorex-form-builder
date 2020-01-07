import { Directive, ElementRef } from '@angular/core';


@Directive({
    selector: '[axf-widget-draggable]',
})
export class AXFWidgetDraggableDirective {

    constructor(
        private el: ElementRef<HTMLDivElement>
    ) {
        //el.nativeElement.setAttribute("allow")
        el.nativeElement.addEventListener("dragstart", this.handleDragStart.bind(this));
    }

    ngOnInit()
    {
        console.log("hello directive");
    }

    handleDragStart(): void {
        console.log();

    }



}