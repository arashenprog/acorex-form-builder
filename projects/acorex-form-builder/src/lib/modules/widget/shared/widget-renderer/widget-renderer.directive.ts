import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { WidgetConfig } from '../../services/widget.service';
import { AXFWidget, AXFWidgetDesigner, AXFContextMenuItem } from '../../config/widget';
import { AXHtmlUtil, EventService, AXPoint } from 'acorex-ui';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Directive({
    selector: '[axf-widget-renderer]',
})
export class AXFWidgetRendererDirective {
    private widgetInstance: any;
    private widgetElement: HTMLElement;

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
        if (this.mode == "designer") {
            this.widgetInstance.onSelect.subscribe(c => {
                this.eventService.broadcast("SELECT", c);
            });
            //
            this.widgetInstance.onDelete.subscribe(c => {
                this.eventService.broadcast("SELECT", null);
            });
            this.widgetElement = (widgetComponent.location.nativeElement as HTMLElement);
            this.widgetElement.id = this.widgetConfig.options.uid;

            this.zone.runOutsideAngular(() => {
                this.widgetElement.style.position = "relative";
                this.widgetElement.addEventListener("contextmenu", this.handleContextMenu.bind(this));
                this.widgetElement.addEventListener("click", this.handleSelectElement.bind(this));
                this.widgetElement.addEventListener("mouseover", (c) => {
                    c.stopPropagation();
                    c.stopImmediatePropagation();
                    this.widgetElement.style.pointerEvents = "all";
                    const hoverDiv = document.createElement("div");
                    hoverDiv.id = `bb-${this.widgetElement.id}`;
                    hoverDiv.classList.add("axf-widget-hover");
                    const bound = this.widgetElement.getBoundingClientRect();
                    hoverDiv.style.top = `0px`;
                    hoverDiv.style.left = `0px`
                    hoverDiv.style.width = `${bound.width}px`
                    hoverDiv.style.height = `${bound.height}px`;
                    if (!this.widgetElement.querySelector(`#bb-${this.widgetElement.id}`) &&
                        this.widgetConfig.container != true &&
                        this.widgetConfig.droppable != false
                    ) {

                        hoverDiv.onclick = (z) => {
                            z.preventDefault();
                            z.stopPropagation();
                            this.zone.run(() => {
                                this.widgetInstance.edit();
                            });
                        }
                        this.widgetElement.appendChild(hoverDiv);
                    }
                    else if (
                        this.widgetConfig.droppable != false &&
                        this.widgetConfig.container != false &&
                        !this.widgetElement.querySelector(`#bb-${this.widgetElement.id}`) &&
                        (!this.widgetConfig.options.widgets || this.widgetConfig.options.widgets.length == 0)) {
                        hoverDiv.classList.add("axf-blank-container");
                        hoverDiv.innerHTML = "<div class='axf-add-widget-button'><i class='fas fa-plus'></i></div>";
                        hoverDiv.onclick = (z) => {
                            z.preventDefault();
                            z.stopPropagation();
                            this.zone.run(() => {
                                this.widgetInstance.addElement();
                            });
                        }
                        this.widgetElement.appendChild(hoverDiv);
                    }
                });
                this.widgetElement.addEventListener("mouseleave", (c) => {
                    const bb = this.widgetElement.querySelector(`#bb-${this.widgetElement.id}`);
                    if (bb) {
                        this.widgetElement.removeChild(bb);
                    }
                });
                // add drag and drop functionality
                if (this.widgetConfig.draggable != false) {
                    this.widgetElement.classList.add("axf-draggable-widget");
                    this.widgetElement.setAttribute("draggable", "true");
                    this.widgetElement.ondragstart = (e) => {
                        window["dragged"] = {
                            widget: this.widgetInstance,
                            element: this.widgetElement
                        }
                        e.stopPropagation();
                    }
                }
                //
                if (this.widgetConfig.droppable != false && this.widgetConfig.container) {
                    //this.widgetElement.classList.add("axf-drop-zone");
                    this.widgetElement.addEventListener("dragover", (e: DragEvent) => {
                        if (window["dragged"] == null)
                            return;
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
                        if (window["dragged"] == null)
                            return;
                        let droppedElement: HTMLDivElement = window["dragged"].element
                        let droppedParent = <HTMLDivElement>droppedElement.closest('.axf-drop-zone');
                        droppedParent.id = AXHtmlUtil.getUID();
                        //
                        let containerElement: HTMLElement;
                        if (this.widgetElement.classList.contains('axf-drop-zone'))
                            containerElement = this.widgetElement;
                        else
                            containerElement = this.widgetElement.querySelector('.axf-drop-zone');
                        containerElement.id = AXHtmlUtil.getUID();
                        //
                        let droppedWidget = <AXFWidgetDesigner>window["dragged"].widget
                        //
                        if (!droppedElement.contains(containerElement)) {
                            this.widgetElement.style.backgroundColor = this.widgetInstance.bgColor;

                            let previousIndex = Array.prototype.indexOf.call(document.querySelectorAll(`#${droppedParent.id} > .axf-draggable-widget`), droppedElement);
                            let currentIndex = 0;

                            let allDropZoneElement = document.querySelectorAll(`#${containerElement.id} > .axf-draggable-widget`);
                            for (let i = 0; i < allDropZoneElement.length; i++) {
                                const element = allDropZoneElement[i];
                                let bound = element.getBoundingClientRect();
                                if (e.clientY >= bound.top && e.clientY <= bound.bottom) {
                                    currentIndex = i;
                                    break;
                                }
                            }
                            for (let i = allDropZoneElement.length - 1; i > 0 && currentIndex == 0; i--) {
                                const element = allDropZoneElement[i];
                                let bound = element.getBoundingClientRect();
                                if (e.clientY >= bound.bottom) {
                                    currentIndex = i;
                                    break;
                                }
                            }


                            if (droppedElement.parentNode === this.widgetElement) {
                                moveItemInArray(droppedWidget.parent.widgets, previousIndex, currentIndex);
                            } else {
                                transferArrayItem(droppedWidget.parent.widgets,
                                    this.widgetInstance.widgets,
                                    previousIndex,
                                    currentIndex + 1);
                            }

                            this.zone.run(() => {
                                droppedWidget.parent.refresh();
                                this.widgetInstance.refresh();
                                droppedWidget.parent = this.widgetInstance;
                            })

                            window["dragged"] = null;
                            e.preventDefault();
                            e.stopPropagation();
                        }

                    });
                }
            });
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

    private handleContextMenu(e: MouseEvent) {
        this.zone.run(() => {
            this.widgetInstance.edit();
            this.showContextMenu({ x: e.clientX, y: e.clientY });
        });
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
    }

    private showContextMenu(pos: AXPoint) {
        this.closeContextMenu();
        if (this.widgetInstance["getContextMenu"]) {
            const menu = document.createElement("div");
            menu.classList.add("axf-widget-context-menu");
            menu.style.top = pos.y + "px";
            menu.style.left = pos.x + "px";
            document.body.appendChild(menu);
            let ul = document.createElement("ul")
            this.widgetInstance.getContextMenu().forEach((m: AXFContextMenuItem) => {
                let li = document.createElement("li");
                li.innerHTML = `<i class="${m.icon}"></i>&nbsp;${m.text}`;
                if (m.separator) {
                    li.classList.add("separator");
                }
                ul.appendChild(li);
                li.onclick = (e) => {
                    e.stopPropagation();
                    if (m.action && m.widget[m.action])
                        m.widget[m.action]();
                };
                if (m.items && m.items.length) {
                    li.classList.add("subitem");
                    let ul2 = document.createElement("ul")
                    ul2.classList.add("axf-widget-context-menu");
                    m.items.forEach(m2 => {
                        let li2 = document.createElement("li");
                        li2.innerHTML = `<i class="${m2.icon}"></i>&nbsp;${m2.text}`;
                        if (m2.separator) {
                            li2.classList.add("separator");
                        }
                        ul2.appendChild(li2);
                        li2.onclick = (e) => {
                            e.stopPropagation();
                            if (m2.action && m.widget && m.widget[m2.action])
                                m.widget[m2.action]();
                        };
                    });
                    li.appendChild(ul2);
                }
            });
            menu.appendChild(ul);
        }
        this.clearDocumentEvents();
        document.addEventListener("click", this.closeContextMenu.bind(this), true);
        document.addEventListener("contextmenu", this.closeContextMenu.bind(this), true);
    }

    private closeContextMenu() {
        document.querySelectorAll(".axf-widget-context-menu").forEach(element => {
            document.body.removeChild(element);
        });
        this.clearDocumentEvents();
    }

    ngOnDestroy(): void {
        this.zone.runOutsideAngular(() => {
            if (this.widgetElement) {
                this.widgetElement.removeEventListener("click", this.handleSelectElement.bind(this));
            }
        });
        this.clearDocumentEvents();
    }

    private clearDocumentEvents() {
        document.removeEventListener("click", this.closeContextMenu.bind(this));
        document.removeEventListener("contextmenu", this.closeContextMenu.bind(this));
    }



}