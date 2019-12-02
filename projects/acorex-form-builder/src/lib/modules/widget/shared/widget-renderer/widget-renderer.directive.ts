import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { WidgetConfig } from '../../services/widget.service';
import { AXFWidget } from '../../config/widget';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXFWidgetToolboxComponent } from '../widget-toolbox/widget-toolbox.component';
import { AXHtmlUtil, EventService } from 'acorex-ui';

@Directive({
    selector: '[axf-widget-renderer]',
})
export class AXFWidgetRendererDirective {
    private renderChangeObserver: any;
    private widgetInstance: any;
    private widgetElement: HTMLElement;
    private toolboxElement: HTMLElement;

    @Input("widget")
    widgetConfig: WidgetConfig;

    @Input()
    mode: "designer" | "view" | "print" = "designer";

    @Output()
    onRender: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();

    @Output()
    onSelect: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();

    constructor(
        private target: ViewContainerRef,
        private zone: NgZone,
        private componentFactoryResolver: ComponentFactoryResolver,
        private eventService: EventService
    ) {
        eventService.on("VALUE_CHANGE", v => {
            if (v.uid == this.widgetInstance.uid) {
                this.refresh();
            }
        });
        this.eventService.on("SELECT", v => {
            this.zone.runOutsideAngular(() => {
                if (this.widgetElement)
                    this.widgetElement.classList.remove("widget-selected");
                if (v && this.widgetInstance && v.uid == this.widgetInstance.uid && v.uid != undefined) {
                    this.widgetElement.classList.add("widget-selected");
                }
            });
        });


    }

    ngOnInit(): void {
        this.render();
    }

    refresh() {
        if (!this.renderChangeObserver) {
            Observable.create(observer => {
                this.renderChangeObserver = observer;
            })
                .pipe(debounceTime(100))
                .pipe(distinctUntilChanged())
                .subscribe(c => {
                    Object.assign(this.widgetInstance, this.widgetConfig.options);
                    this.widgetInstance.refresh();
                });
        }

        this.renderChangeObserver.next(new Date().getTime());
    }

    render() {
        this.target.clear();
        this.createComponent();

    }


    createComponent() {
        if (!this.widgetConfig)
            return;
        //
        let widgetFactory = null;
        switch (this.mode) {
            case "designer":
                widgetFactory = this.componentFactoryResolver.resolveComponentFactory(this.widgetConfig.designerClass);
                break;
            case "view":
                widgetFactory = this.componentFactoryResolver.resolveComponentFactory(this.widgetConfig.viewClass);
                break;
            default:
                widgetFactory = this.componentFactoryResolver.resolveComponentFactory(this.widgetConfig.printClass);
        }
        // assign widgets value and options
        let widgetComponent = this.target.createComponent(widgetFactory)
        this.widgetInstance = (widgetComponent.instance as AXFWidget);
        Object.assign(this.widgetInstance, { config: this.widgetConfig });
        let pp: any = {};
        this.widgetConfig.properties.forEach(p => {
            if (!this.widgetInstance[p.name] && p.defaultValue && !this.widgetConfig.options[p.name]) {
                pp[p.name] = p.defaultValue;
                this.widgetConfig.options[p.name] = p.defaultValue;
            }
        });

        Object.assign(this.widgetInstance, pp);
        Object.assign(this.widgetInstance, this.widgetConfig.options);


        // render widget toolbox on mouseover event in designer mode
        if (!this.widgetConfig.toolbox)
            this.widgetConfig.toolbox = {};
        if (this.mode == "designer") {

            this.widgetInstance.onRefresh.subscribe(c => {
                Object.assign(this.widgetInstance, c);
                this.onRender.emit(this.widgetInstance);
            });
            //
            this.widgetInstance.onSelect.subscribe(c => {
                this.eventService.broadcast("SELECT", c);
            });
            //
            this.widgetInstance.onDelete.subscribe(c => {
                this.eventService.broadcast("SELECT", null);
            });


            let toolboxFactory = this.componentFactoryResolver.resolveComponentFactory(AXFWidgetToolboxComponent);
            let toolboxComponent = this.target.createComponent(toolboxFactory);
            let toolboxInstance = toolboxComponent.instance as AXFWidgetToolboxComponent;
            if (this.widgetConfig.toolbox.edite != false) {
                toolboxInstance.edit.subscribe(c => {
                    this.widgetInstance.edit();
                });
            }
            else {
                toolboxInstance.allowEdit = false;
            }
            // delete
            if (this.widgetConfig.toolbox.delete != false) {
                toolboxInstance.delete.subscribe(c => { this.widgetInstance.delete(); });
            }
            else {
                toolboxInstance.allowDelete = false;
            }
            //
            this.toolboxElement = (toolboxComponent.location.nativeElement as HTMLElement);
            this.widgetElement = (widgetComponent.location.nativeElement as HTMLElement);

            //
            if (this.widgetConfig.toolbox.visible != false) {
                //this.zone.runOutsideAngular(() => {
                this.toolboxElement.addEventListener("click", this.handleSelectElement.bind(this));
                //
                this.widgetElement.addEventListener("mouseover", (c) => {
                    c.stopPropagation();
                    this.toolboxElement.style.visibility = "unset";
                    const bound = this.widgetElement.getBoundingClientRect();
                    this.toolboxElement.style.top = `${bound.top}px`;
                    this.toolboxElement.style.left = `${bound.left}px`
                    this.toolboxElement.style.width = `${bound.width}px`
                    this.toolboxElement.style.height = `${bound.height}px`;
                });

                document.addEventListener("mousemove", (c) => {
                    let targetBound = this.widgetElement.getBoundingClientRect();
                    let pos = { x: c.clientX, y: c.clientY };
                    let inTarget = AXHtmlUtil.isInRecPoint(pos, {
                        left: targetBound.left,
                        width: targetBound.width,
                        top: targetBound.top,
                        height: targetBound.height
                    });
                    if (!inTarget) {
                        this.toolboxElement.style.visibility = "hidden";
                    }
                });
                //});
            }
            else {
                //this.zone.runOutsideAngular(() => {
                this.widgetElement.addEventListener("click", this.handleSelectElement.bind(this));
                //});
            }
            //});
            //}
        }
    }

    private handleSelectElement(e: MouseEvent) {
        this.widgetInstance.edit();
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
        e.cancelBubble = true;
        return false;
    }

    ngOnDestroy(): void {
        this.zone.runOutsideAngular(() => {
            if (this.widgetElement)
                this.widgetElement.removeEventListener("click", this.handleSelectElement);
            if (this.toolboxElement)
                this.toolboxElement.removeEventListener("click", this.handleSelectElement);
        });
    }

}