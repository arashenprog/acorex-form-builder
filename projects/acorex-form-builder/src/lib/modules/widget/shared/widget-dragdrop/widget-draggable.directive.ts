import { Directive, ElementRef, ViewContainerRef } from '@angular/core';
import { AXFWidgetDesigner } from 'acorex-form-builder/lib/modules/widget/config/widget';


@Directive({
    selector: '[axf-widget-draggable]',
})
export class AXFWidgetDraggableDirective {

    private handler: HTMLDivElement

    constructor(
        private el: ElementRef<HTMLDivElement>,
        private _view: ViewContainerRef
    ) {

    }

    ngOnInit() {
        console.log("hello directive");
    }

    ngAfterViewInit() {
        debugger;
        let component = (<any>this._view)._element.component
        this.handler = this.el.nativeElement.querySelector('.axf-widget-move-handler');
        if (this.handler) {
            this.handler.addEventListener("dragstart", this.handleDragStart.bind(this));
        }
    }

    handleDragStart(): void {
        console.log("start drag");
    }



}