import { Component, OnInit, ElementRef, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget'; 
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({ 
    selector: "[axf-repeater]",
    templateUrl: './repeater-widget.view.html',
    //styleUrls: ['./repeater-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetView extends AXFWidgetView {
 
    constructor(private hostElement: ElementRef, private cdr: ChangeDetectorRef) {
        super()  
    }
    dataSource: AXFDataSourceOption;

    items:any[]=[];
    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement); 
        this.applyStyle(el);  
    }
    ngOnInit()
    { 
        if(this.dataSource.mode=="remote")
        {
            this.items=this.dataSource.dataItems;
        }
        else
        {
            if(this.dataSource.dataItems.length==0)
                this.items=[{}];
            else
                this.items=this.dataSource.dataItems;
        }
        this.cdr.markForCheck();
    }

    addItemClick()
    {
        this.items.push({});
        this.cdr.markForCheck();
    }
}
