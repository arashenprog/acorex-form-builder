import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { WidgetConfig } from '../../services/widget.service';
import { AXFWidget, AXFWidgetDesigner } from '../../config/widget';
import { AXFWidgetToolboxComponent } from '../widget-toolbox/widget-toolbox.component';
import { AXHtmlUtil, EventService } from 'acorex-ui';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

    @Input("parent")
    widgetParent: AXFWidgetDesigner;

    @Input()
    mode: "designer" | "view" | "print" = "designer";

    @Output()
    onSelect: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();

    constructor(
        private target: ViewContainerRef,
        private zone: NgZone,
        private componentFactoryResolver: ComponentFactoryResolver,
        private eventService: EventService
    ) {
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
        let widgetComponent = this.target.createComponent(widgetFactory);

        this.widgetInstance = (widgetComponent.instance as AXFWidget);
        Object.assign(this.widgetInstance, { config: this.widgetConfig });
        let pp: any = {};
        this.widgetConfig.properties.forEach(p => {
            if (this.widgetInstance[p.name] == null && p.defaultValue != null && this.widgetConfig.options[p.name] == null) {
                pp[p.name] = p.defaultValue;
                this.widgetConfig.options[p.name] = p.defaultValue;
            }
        });
        //

        Object.assign(this.widgetInstance, pp);
        Object.assign(this.widgetInstance, this.widgetConfig.options);
        // add parent
        if (this.widgetParent) {
            this.widgetInstance.parent = this.widgetParent;
        }
        // render widget toolbox on mouseover event in designer mode
        if (!this.widgetConfig.toolbox)
            this.widgetConfig.toolbox = {};
        if (this.mode == "designer") {
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
            // toolbox edit
            if (this.widgetConfig.toolbox.edite != false) {
                toolboxInstance.edit.subscribe(c => {
                    this.widgetInstance.edit();
                });
            }
            else {
                toolboxInstance.allowEdit = false;
            }
            // toolbox delete
            if (this.widgetConfig.toolbox.delete != false) {
                toolboxInstance.delete.subscribe(c => { this.widgetInstance.delete(); });
            }
            else {
                toolboxInstance.allowDelete = false;
            }
            this.toolboxElement = (toolboxComponent.location.nativeElement as HTMLElement);
            this.widgetElement = (widgetComponent.location.nativeElement as HTMLElement);

            this.zone.runOutsideAngular(() => {
                if (this.widgetConfig.container) {
                    this.widgetElement.addEventListener("dragover", (e: DragEvent) => {
                        let dragged = window["dragged"].element
                        if (!dragged.contains(this.widgetElement)) {
                            this.widgetElement.style.backgroundColor = "#ffcccc";
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                    this.widgetElement.addEventListener("dragleave", (e: DragEvent) => {
                        this.widgetElement.style.backgroundColor = this.widgetInstance.bgColor;
                    });
                    this.widgetElement.addEventListener("drop", (e: DragEvent) => {
                        let dragged = window["dragged"].element
                        let dropZone = this.widgetElement;
                        if (!dragged.contains(dropZone)) {
                            dropZone.style.backgroundColor = this.widgetInstance.bgColor;
                            let draggedWidget = <AXFWidgetDesigner>window["dragged"].widget

                            // if (event.previousContainer === event.container) {
                            //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
                            //   } else {
                            //     transferArrayItem(event.previousContainer.data,
                            //                       event.container.data,
                            //                       event.previousIndex,
                            //                       event.currentIndex);
                            //   }
                            let previousIndex = Array.prototype.indexOf.call(dragged.parentNode.childNodes, dragged);
                            let currentIndex = Array.prototype.indexOf.call(dragged.parentNode.childNodes, dragged);

                            transferArrayItem(draggedWidget.parent.widgets,
                                this.widgetInstance.widgets,
                                previousIndex,
                                currentIndex);
                            this.zone.run(() => {
                                draggedWidget.parent.refresh();
                                this.widgetInstance.refresh();
                                draggedWidget.parent = this.widgetInstance;
                            })

                            window["dragged"] = null;
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                }


                //setTimeout(() => {
                let handler = this.widgetElement.querySelector('.axf-widget-move-handler');
                if (handler) {
                    this.widgetElement.setAttribute("draggable", "true");
                    this.widgetElement.onmousedown = (e) => {
                        this.widgetInstance.dragTarget = e.target;
                        this.zone.run(() => {
                            this.widgetInstance.edit();
                        });
                        e.stopPropagation();
                    }
                    this.widgetElement.ondragstart = (e) => {
                        if (handler.contains(this.widgetInstance.dragTarget)) {
                            window["dragged"] = {
                                widget: this.widgetInstance,
                                element: this.widgetElement
                            }
                        } else {
                            e.preventDefault();
                        }
                    }
                }
                //}, 1000);
            });

            //
            if (this.widgetConfig.toolbox.visible != false) {
                this.zone.runOutsideAngular(() => {

                    this.widgetElement.style.position = "relative";
                    this.widgetElement.appendChild(this.toolboxElement)
                    this.toolboxElement.style.position = "absolute";
                    //
                    this.toolboxElement.addEventListener("click", this.handleSelectElement.bind(this));
                    //
                    this.widgetElement.addEventListener("mouseover", (c) => {
                        c.stopPropagation();
                        this.toolboxElement.style.display = "unset";
                        const bound = this.widgetElement.getBoundingClientRect();
                        this.toolboxElement.style.top = `0px`;
                        this.toolboxElement.style.left = `0px`
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
                            this.toolboxElement.style.display = "none";
                        }
                    });
                });
            }
            else {
                this.zone.runOutsideAngular(() => {
                    this.widgetElement.addEventListener("click", this.handleSelectElement.bind(this));
                });
            }
            // select after added to container
            this.widgetInstance.edit();
        }
    }

    private handleSelectElement(e: MouseEvent) {
        this.zone.run(() => {
            this.widgetInstance.edit();
        });
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
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