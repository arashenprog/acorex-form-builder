import { Component, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';


@Component({
    selector: "axf-viewer-frame",
    templateUrl: "./frame.component.html",
    styleUrls: ["./frame.component.scss"]
})
export class ACFViewerFrameComponent {

    constructor(private widgetService: AXFWidgetService) {
        this.size = this.sizes[0].width;
    }

    @ViewChild('frame')
    frame: ElementRef;

    @Input()
    widgets: WidgetConfig[] = [];




    sizes: any[] = [
        {
            title: "Desktop",
            icon: "fas fa-desktop",
            width: 1024,
            active: true
        },
        {
            title: "Tablet",
            icon: "fas fa-tablet-alt",
            width: 500,
            active: false
        },
        {
            title: "Mobile",
            icon: "fas fa-mobile-alt",
            width: 320,
            active: false
        }
    ];

    size: number;


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

    handleSetSize(e) {
        this.sizes.forEach(c => {
            c.active = false;
        })
        this.size = e.width;
        e.active = true;
    }
}
