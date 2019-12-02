import { Component, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
    selector: "axf-viewer-frame",
    templateUrl: "./frame.component.html",
    styleUrls: ["./frame.component.scss"]
})
export class ACFViewerFrameComponent {

    constructor(
        private widgetService: AXFWidgetService,
        private sanitizer: DomSanitizer,
        //private sanitizer:Sanitizer,
    ) {
        this.size = this.sizes[0].width;
        this.url = sanitizer.bypassSecurityTrustResourceUrl("view?mode=view");
    }

    @ViewChild('frame', { static: true })
    frame: ElementRef;

    @Input()
    page: WidgetConfig;




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
    url: SafeUrl;


    @HostListener('window:message', ['$event'])
    handleMessage(e) {
        if (e.data && e.data.action == "load") {
            this.frame.nativeElement.contentWindow.postMessage({
                action: "load",
                data: {
                    widgets: this.widgetService.serialize(this.page)
                }
            }, '*');
        }
    }

    handleSetSize(e) {
        this.sizes.forEach(c => {
            c.active = false;
        })
        this.size = e.width;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`view?mode=${e.mode}`);
        e.active = true;
    }
}
