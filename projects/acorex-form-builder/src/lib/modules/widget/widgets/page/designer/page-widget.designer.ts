import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXPopupService, EventService } from 'acorex-ui';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

@Component({
    selector: '[axf-page]',
    templateUrl: './page-widget.designer.html',
    styleUrls: ['./page-widget.designer.scss']
})
export class AXFPageWidgetDesigner extends AXFWidgetDesigner {

    bgColor: string;
    boxStyle: AXFBoxStyleValue;
    pageDirection:string;



    constructor(
        private eventService: EventService,
        private picker: AXFWidgetPickerService,
        private hostElement: ElementRef) {
        super();
        eventService.on("SELECT", c => {
            if (c == null) {
                eventService.broadcast("SELECT", this);
            }
        });
    }

    handleStartClick() {
        this.picker.showPicker().then(widgets => {
            if (widgets) {
                widgets.forEach(w => {
                    this.addChild(w);
                });
            };
        })
    }


    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.style.direction= this.pageDirection;
        this.applyStyle(el);
    }


}

