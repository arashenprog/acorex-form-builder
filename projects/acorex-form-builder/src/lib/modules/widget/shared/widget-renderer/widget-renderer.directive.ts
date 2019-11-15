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


            //if (this.widgetConfig.toolbox.visible != false) {
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
            //this.zone.runOutsideAngular(() => {
            let toolboxElement = (toolboxComponent.location.nativeElement as HTMLElement);
            let widgetElement = (widgetComponent.location.nativeElement as HTMLElement);
            this.eventService.on("SELECT", v => {
                widgetElement.classList.remove("widget-selected");
                if (v.uid == this.widgetInstance.uid) {
                    widgetElement.classList.add("widget-selected");
                }
            });
            //
            toolboxElement.addEventListener("click", (e) => {
                //this.zone.run(() => {
                this.widgetInstance.edit();
                //});
                e.stopPropagation();
                e.preventDefault();
                e.stopImmediatePropagation();
                e.cancelBubble = true;
                return false;
            });
            //
            if (this.widgetConfig.toolbox.visible != false) {
                widgetElement.addEventListener("mouseover", (c) => {
                    c.stopPropagation();
                    toolboxElement.style.visibility = "unset";
                    const bound = widgetElement.getBoundingClientRect();
                    toolboxElement.style.top = `${bound.top}px`;
                    toolboxElement.style.left = `${bound.left}px`
                    toolboxElement.style.width = `${bound.width}px`
                    toolboxElement.style.height = `${bound.height}px`;
                    //widgetElement.classList.add("widget-selected");
                });

                document.addEventListener("mousemove", (c) => {
                    let targetBound = widgetElement.getBoundingClientRect();
                    let pos = { x: c.clientX, y: c.clientY };
                    let inTarget = AXHtmlUtil.isInRecPoint(pos, {
                        left: targetBound.left,
                        width: targetBound.width,
                        top: targetBound.top,
                        height: targetBound.height
                    });
                    if (!inTarget) {
                        toolboxElement.style.visibility = "hidden";
                        //widgetElement.classList.remove("widget-selected");
                    }
                });
            }
            //});
            //}
        }
    }

}