import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXPopupService } from 'acorex-ui';
import { Subscription } from 'rxjs'; 
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { ExpandTextPage } from '../expandtext.page';

@Component({
    selector: '[axf-widget-text]',
    templateUrl: './text-area-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetView extends AXFValueWidgetView {

    placeholder: string;
    rows: number;
    private dataSubscription: Subscription;
 
    constructor(protected cdr: ChangeDetectorRef,private popupService: AXPopupService,private hostElement: ElementRef) {
        super(cdr);
        this.dataSubscription = this.dataService.onChange.subscribe(() => {
            this.refresh();
        });  
    }

    onRender(): void {
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value = this['dataContext'][this['name']];
        } 
        this.cdr.markForCheck();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement); 
        let axButtonPlace=(el.firstElementChild.firstElementChild.firstChild.lastChild as HTMLElement);
        axButtonPlace.innerHTML='<ax-button style="bottom: 2px;position: absolute;right: 6px;"/></ax-button>';
        var button = document.createElement('button');
        button.innerHTML = '<i class="fa-expand fas"></i>';
        button.className="btn btn-md btn-primary"; 
        let that=this;
        button.onclick = function(){  
            that.popupService.open(ExpandTextPage, {
                title: "Expand Text",
                size: "md",
                data: {
                    value: that.value,
                    readonly:that.readonly
                }
            }).closed(c => {
                if(c.data)
                that.value=c.data;
            })
        };
        (axButtonPlace.firstChild as HTMLElement).append(button);
        this.cdr.detectChanges();
    }  

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
        super.ngOnDestroy();
    }
 
}
