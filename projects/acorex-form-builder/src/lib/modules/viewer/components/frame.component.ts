import { Component, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';


@Component({
    selector: "axf-viewer-frame",
    templateUrl: "./frame.component.html",
    styleUrls: ["./frame.component.scss"]
})
export class ACFViewerFrameComponent {

    constructor(private widgetService: AXFWidgetService) {

    }

    @ViewChild('frame')
    frame: ElementRef;

    @Input()
    widgets: WidgetConfig[] = [];


    @HostListener('window:message', ['$event'])
    handleMessage(e) {
        if (e.data && e.data.action == "load") {
            this.frame.nativeElement.contentWindow.postMessage({
                action: "load",
                data: {
                    widgets: this.widgetService.serialize(this.widgets)
                }
            }, '*');
        }
    }
}
