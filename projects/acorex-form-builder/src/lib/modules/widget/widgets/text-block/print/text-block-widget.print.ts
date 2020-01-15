import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './text-block-widget.print.html', 
    changeDetection: ChangeDetectionStrategy.OnPush 
})
export class AXFTextBlockWidgetPrint extends AXFWidgetPrint {

    text: String;
    color:String;
    bgColor:String;
    fontSize:string;
    textStyle:string[];
    textAlign:string; 
    boxStyle:any;
    textDirection:string[];

    constructor(private hostElement: ElementRef) {
        super();
    }

    onRender(): void {
        // let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        // this.applyStyle(el); 
    }
}
