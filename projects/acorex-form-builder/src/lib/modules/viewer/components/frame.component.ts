import { Component, HostListener, ViewChild, ElementRef, Input, Sanitizer, ViewEncapsulation } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { AXHtmlUtil } from 'acorex-ui';
import { AXFTemplateService } from '../../widget/services/template/template.service';
import { AXFDataService } from '../../widget/services/data.service';
import { AXFConnectService } from '../../widget/services/connect.service';


@Component({
    selector: "axf-viewer-frame",
    templateUrl: "./frame.component.html",
    styleUrls: ["./frame.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ACFViewerFrameComponent {

    url: SafeResourceUrl;
    @ViewChild('frame', { static: true })
    frame: ElementRef<HTMLIFrameElement>;

    private uid: string = AXHtmlUtil.getUID();

    constructor(
        private widgetService: AXFWidgetService,
        private dataService: AXFDataService,
        private templateService: AXFTemplateService,
        private sanitizer: DomSanitizer,
        private connectService: AXFConnectService
    ) {
        this.size = this.sizes[0].width;
        this.loadFrame();
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
            width: 768,
            active: false,
            mode: "view"
        },
        {
            title: "Mobile",
            icon: "fas fa-mobile-alt",
            width: 425,
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


    @HostListener('window:message', ['$event'])
    handleMessage(e) {
        if (!e.data || !e.data.action && e.data.uid != this.uid)
            return;
        let action = e.data.action;
        let reqId = e.data.reqId;
        let options = e.data.data ? JSON.parse(e.data.data) : {};
        switch (action) {
            case "load":
                if (options.id == null) {
                    this.postMessage(action, reqId, {
                        widgets: this.widgetService.serialize(this.page)
                    })
                }
                else {
                    this.templateService.get(options.id).then(c => {
                        this.postMessage(action, reqId, {
                            widgets: c.template
                        })
                    });
                }
                break;
            case "getModel":
                this.postMessage(action, reqId, this.dataService.getModel())
                break;
            case "getList":
                if (options.name) {
                    this.dataService.getList(options.name, options.params).then(items => {
                        this.postMessage(action, reqId, {
                            items: items
                        })
                    })
                }
                break;
            case "sync":
                if (options.height && this.frame) {
                    this.frame.nativeElement.style.height = options.height + "px";
                }
                break;
        }

    }

    private postMessage(action: string, reqId: number, data: any) {
        this.frame.nativeElement.contentWindow.postMessage({
            uid: this.uid,
            action: action,
            reqId: reqId,
            data: data ? JSON.stringify(data) : null
        }, '*');
    }


    ngOnInit() {
        this.widgets.push(this.widgetService.parse(this.widgetService.serialize(this.page)));
        // this.frame.nativeElement.addEventListener("load", () => {
        //     this.frame.nativeElement.scrollTop = 0;
        // });
    }

    handleSetSize(e) {
        this.sizes.forEach(c => {
            c.active = false;
        })
        this.size = e.width;
        this.mode = e.mode;
        e.active = true;
        this.frame.nativeElement.parentElement.scrollTo({ left: 0, top: 0 });
        this.loadFrame();
    }


    private loadFrame(): void {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`view?mode=${this.mode}&uid=${this.uid}&rnd=${AXHtmlUtil.getUID()}`);
    }

    pdfGenerate() {
        let printbody = this.frame.nativeElement.contentDocument.querySelector(".theme-wrapper> ng-component >ng-component>div ").innerHTML;
        var result = '<html><head><title>SmartForms Api Sample</title></head><body style="font-family: Segoe UI;padding: 0px;margin: 0px;  ">';
        result = result + printbody + "</body></html>";
        this.connectService.send("print", { data: result }).then(() => {
        });
    }

}
