import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFDataService } from '../../../services/data.service';
import { ContentItemsStructureEditor } from '../../../../property-editor/editors/items/itemstructure.editor';

@Component({
    templateUrl: './dropdown-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    items:{content:any[],types: ContentItemsStructureEditor[]};
    mode: string;
    fillBy: string;
    allowSearch: boolean;
    dsName: string;
    dsMode: string;

    constructor(private dataService: AXFDataService, private cdr: ChangeDetectorRef) {
        super()

    }

    ngAfterViewInit() {
     
        if (this.dsMode[0] == 'ds' && this.dsName) {
            this.dataService.getList(this.dsName).then(items => {
                this.items.content = items;
                this.cdr.markForCheck();
            });
        }
    }

    onRender(): void {
        this.applyStyle(this.el.nativeElement);
    }


    handleValueChnage(e: any[]) {
        this.value = e;
        this.invokeEvent("onValueChange");
    }
}
