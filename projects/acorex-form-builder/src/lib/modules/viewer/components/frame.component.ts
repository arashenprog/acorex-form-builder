import { Component, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';


@Component({
    selector: "acf-viewer-frame",
    template: `
        <iframe src="view" class="viewer"  frameBorder="0" #frame>
        </iframe>
    `,
    styles: [`
        .viewer
        {
            width: 100%;
            height: 100%;
        }
    `]
})
export class ACFViewerFrameComponent {

    constructor(private widgetService:AXFWidgetService)
    {

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
