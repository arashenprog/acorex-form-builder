import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXPopupService, EventService } from 'acorex-ui';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';

@Component({
    selector: '[axf-page]',
    templateUrl: './page-widget.designer.html',
    styleUrls: ['./page-widget.designer.scss']
})
export class AXFPageWidgetDesigner extends AXFWidgetDesigner {

    bgColor: string;
    boxStyle: AXFBoxStyleValue;

    constructor(
        private eventService: EventService,
        private hostElement: ElementRef) {
        super();
        eventService.on("SELECT", c => {
            if (c == null) {
                eventService.broadcast("SELECT", this);
            }
        });
    }

    handleStartClick() {
        this.widgetService.showPicker().then(w => {
            if (w) {
                this.widgetService.addWidget(w.name, this);
            };
        })
    }


    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        this.applyStyle(el);
    }


}

