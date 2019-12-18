import { Component, HostListener, ViewChild, ElementRef, Input, Sanitizer, ViewEncapsulation } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
    selector: "axf-viewer-frame",
    templateUrl: "./frame.component.html",
    styleUrls: ["./frame.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ACFViewerFrameComponent {

    constructor(
        private widgetService: AXFWidgetService,
        private sanitizer: DomSanitizer,
    ) {
        this.size = this.sizes[0].width;
    }

    @Input()
    page: WidgetConfig;

    widgets: WidgetConfig[] = [];


    sizes: any[] = [
        {
            title: "Desktop",
            icon: "fas fa-desktop",
            width: 1024,
            active: true,
            mode: "view"
        },
        {
            title: "Tablet",
            icon: "fas fa-tablet-alt",
            width: 500,
            active: false,
            mode: "view"
        },
        {
            title: "Mobile",
            icon: "fas fa-mobile-alt",
            width: 320,
            active: false,
            mode: "view"
        },
        {
            title: "Print",
            icon: "fas fa-print",
            width: 1024,
            active: false,
            mode: "print"
        }
    ];

    size: number;
    mode: string = "view";

    ngOnInit() {
        this.widgets.push(this.widgetService.parse(this.widgetService.serialize(this.page)));
    }

    handleSetSize(e) {
        this.sizes.forEach(c => {
            c.active = false;
        })
        this.size = e.width;
        this.mode = e.mode;
        e.active = true;
    }
}
