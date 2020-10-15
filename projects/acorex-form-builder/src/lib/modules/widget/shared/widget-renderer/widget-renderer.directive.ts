import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../services/widget.service';
import { AXFWidget, AXFWidgetDesigner, AXFContextMenuItem } from '../../config/widget';
import { AXHtmlUtil, EventService, AXPoint } from 'acorex-ui';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Directive({
    selector: '[axf-widget-renderer]',
})
export class AXFWidgetRendererDirective {
    private widgetInstance: any;
    private widgetElement: HTMLElement;

    @Input('widget')
    widgetConfig: WidgetConfig;

    @Input('parent')
    widgetParent: AXFWidgetDesigner;

    @Input()
    mode: 'designer' | 'view' | 'print' = 'designer';


    private _rIndex: number;
    @Input()
    public get rIndex(): number {
        return this._rIndex;
    }
    public set rIndex(v: number) {
        this._rIndex = v;
    }

    @Output()
    onSelect: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();


    private resizeMov: number = 0;
    private isInResizng: boolean = false;

    constructor(
        private target: ViewContainerRef,
        private zone: NgZone,
        private componentFactoryResolver: ComponentFactoryResolver,
        private eventService: EventService,
        private widgetService: AXFWidgetService
    ) {
        this.eventService.on('SELECT', v => {
            this.zone.runOutsideAngular(() => {
                if (this.widgetElement) {
                    this.widgetElement.classList.remove('widget-selected');
                    if (v && this.widgetInstance && v.uid === this.widgetInstance.uid && v.uid !== undefined) {
                        this.widgetElement.classList.add('widget-selected');
                    }
                }

            });
        });
    }

    ngOnInit(): void {
        this.createComponent();
    }

    createComponent() {
        if (!this.widgetConfig) {
            return;
        }
        //
        let widgetFactory = null;
        switch (this.mode) {
            case 'designer':
                widgetFactory = this.componentFactoryResolver.resolveComponentFactory(this.widgetConfig.designerClass);
                break;
            case 'view':
                widgetFactory = this.componentFactoryResolver.resolveComponentFactory(this.widgetConfig.viewClass);
                break;
            default:
                widgetFactory = this.componentFactoryResolver.resolveComponentFactory(this.widgetConfig.printClass);
        }


        // assign widgets value and options
        const widgetComponent = this.target.createComponent(widgetFactory);

        this.widgetInstance = (widgetComponent.instance as AXFWidget);
        Object.assign(this.widgetInstance, { config: this.widgetConfig });
        this.widgetInstance._rootElement = (widgetComponent.location.nativeElement as HTMLElement);
        const pp: any = {};
        this.widgetConfig.properties.forEach(p => {
            if (this.widgetInstance[p.name] == null && p.defaultValue != null && this.widgetConfig.options[p.name] == null) {
                let val = null;
                if (typeof p.defaultValue === 'function') {
                    val = p.defaultValue.call();
                } else {
                    val = p.defaultValue;
                }
                pp[p.name] = this.widgetConfig.options[p.name] = val;
            }
        });
        // add repeater index
        if (this.rIndex !== undefined) {
            this.widgetInstance.rIndex = this.rIndex;
        }
        // add parent
        if (this.widgetParent) {
            this.widgetInstance.parent = this.widgetParent;
            if (!this.widgetConfig.dataContext && this.widgetParent.config) {
                this.widgetConfig.dataContext = this.widgetParent.config.dataContext;
            }
        }
        // add data context
        this.widgetInstance.dataContext = this.widgetConfig.dataContext;
        //
        Object.assign(this.widgetInstance, pp);
        Object.assign(this.widgetInstance, this.widgetConfig.options);
        //
        if (this.widgetInstance.parent && this.widgetInstance.parent.tag !== undefined) {
            this.widgetInstance.tag = this.widgetInstance.parent.tag;
        }
        //debugger;
        this.widgetService.readPropsFromHost(this.widgetConfig.name, this.widgetInstance.name, this.widgetInstance.tag)
            .then(props => {
                Object.assign(this.widgetInstance, props);
                this.widgetInstance.onRender();
                if (this.widgetInstance.locked && this.widgetConfig.name !== 'page') {
                    this.widgetElement.classList.add('axf-disabled-widget');
                }
            });
        //
        (this.widgetConfig as any).componentRef = this.widgetInstance;
        //
        if (this.mode === 'designer') {
            this.widgetInstance.onSelect.subscribe(c => {
                this.eventService.broadcast('SELECT', c);
            });
            //
            this.widgetInstance.onDelete.subscribe(c => {
                this.eventService.broadcast('SELECT', null);
            });
            this.widgetElement = (widgetComponent.location.nativeElement as HTMLElement);
            this.widgetElement.id = this.widgetConfig.options.uid;
            this.zone.runOutsideAngular(() => {
                const dropZone = this.widgetElement.querySelector('.axf-drop-zone');
                this.widgetElement.style.position = 'relative';
                this.widgetElement.addEventListener('contextmenu', this.handleContextMenu.bind(this));
                this.widgetElement.addEventListener('click', this.handleSelectElement.bind(this));
                this.widgetElement.addEventListener('mouseover', (c) => {
                    c.stopPropagation();
                    c.stopImmediatePropagation();
                    if (this.isInResizng) {
                        return;
                    }
                    this.widgetElement.style.pointerEvents = 'all';
                    const hoverDiv = document.createElement('div');
                    hoverDiv.id = `bb-${this.widgetElement.id}`;
                    hoverDiv.classList.add('axf-widget-hover');
                    const bound = this.widgetElement.getBoundingClientRect();
                    hoverDiv.style.top = `0px`;
                    hoverDiv.style.left = `0px`;
                    if (dropZone) {
                        hoverDiv.style.width = `${dropZone.getBoundingClientRect().width}px`;
                        hoverDiv.style.height = `${dropZone.getBoundingClientRect().height}px`;
                    } else {
                        hoverDiv.style.width = `${bound.width}px`;
                        hoverDiv.style.height = `${bound.height}px`;
                    }

                    if (!this.widgetElement.querySelector(`#bb-${this.widgetElement.id}`) &&
                        this.widgetConfig.container !== true &&
                        this.widgetConfig.droppable !== false
                    ) {

                        hoverDiv.onclick = (z) => {
                            z.preventDefault();
                            z.stopPropagation();
                            this.zone.run(() => {
                                this.widgetInstance.edit();
                            });
                        };
                        this.widgetElement.appendChild(hoverDiv);
                    } else if (
                        this.widgetConfig.droppable !== false &&
                        this.widgetConfig.container !== false &&
                        this.widgetInstance.locked !== true &&
                        !this.widgetElement.querySelector(`#bb-${this.widgetElement.id}`) &&
                        (!this.widgetConfig.options.widgets || this.widgetConfig.options.widgets.length == 0)) {
                        hoverDiv.classList.add('axf-blank-container');
                        hoverDiv.innerHTML = '<div class=\'axf-add-widget-button\'><i class=\'fas fa-plus\'></i></div>';
                        hoverDiv.onclick = (z) => {
                            z.preventDefault();
                            z.stopPropagation();
                            this.zone.run(() => {
                                this.widgetInstance.addElement();
                            });
                        };

                        if (dropZone) {
                            dropZone.appendChild(hoverDiv);
                        } else {
                            this.widgetElement.appendChild(hoverDiv);
                        }
                    }
                });

                this.widgetElement.addEventListener('mouseleave', (c) => {
                    const bb = this.widgetElement.querySelector(`#bb-${this.widgetElement.id}`);
                    if (bb) {
                        bb.parentNode.removeChild(bb);
                    }
                });
                // add rezie functionality
                setTimeout(() => {
                    const resizeHorHandler = this.widgetElement.querySelector<HTMLSpanElement>('.resize-td');
                    if (resizeHorHandler) {
                        resizeHorHandler.onmousedown = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.isInResizng = true;
                            this.resizeMov = e.pageX;
                        };

                        const target = resizeHorHandler.getAttribute('data-target');
                        resizeHorHandler.style.height = resizeHorHandler.closest<HTMLElement>(target).offsetHeight + 'px';
                        window.addEventListener('mouseup', (e) => {
                            if (this.isInResizng) {
                                e.stopPropagation();
                                this.isInResizng = false;
                                this.resizeMov = 0;
                                this.zone.run(() => {
                                    this.widgetInstance.edit();
                                });
                            }
                        });
                        window.addEventListener('mousemove', (e) => {
                            if (this.isInResizng) {
                                const bb = this.widgetElement.querySelector(`#bb-${this.widgetElement.id}`);
                                if (bb) {
                                    bb.parentNode.removeChild(bb);
                                }
                                const movX = e.pageX - this.resizeMov;
                                let width = this.widgetConfig.options.width;
                                if (!width) {
                                    width = this.widgetElement.offsetWidth;
                                }
                                width += movX;
                                this.widgetConfig.options.width = width;
                                this.widgetElement.style.width = `${width}px`;
                            }
                        });
                    }
                }, 500);

                // add drag and drop functionality
                if (this.widgetConfig.draggable !== false && this.widgetInstance.locked !== true) {
                    this.widgetElement.classList.add('axf-draggable-widget');
                    this.widgetElement.setAttribute('draggable', 'true');
                    this.widgetElement.ondragstart = (e) => {
                        e.stopPropagation();
                        window['dragged'] = {
                            widget: this.widgetInstance,
                            element: this.widgetElement
                        };
                    };
                }
                //
                if (this.widgetConfig.droppable !== false && this.widgetConfig.container && this.widgetInstance.locked !== true) {
                    this.widgetElement.addEventListener('dragover', (e: DragEvent) => {
                        if (window['dragged'] == null) {
                            return;
                        }
                        const dragged = window['dragged'].element;
                        if (!dragged.contains(this.widgetElement)) {
                            let containerElement: HTMLElement;
                            if (this.widgetElement.classList.contains('axf-drop-zone')) {
                                containerElement = this.widgetElement;
                            } else {
                                containerElement = this.widgetElement.querySelector('.axf-drop-zone');
                            }
                            containerElement.style.backgroundColor = '#ffcccc';
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                    this.widgetElement.addEventListener('dragleave', (e: DragEvent) => {
                        let containerElement: HTMLElement;
                        if (this.widgetElement.classList.contains('axf-drop-zone')) {
                            containerElement = this.widgetElement;
                        } else {
                            containerElement = this.widgetElement.querySelector('.axf-drop-zone');
                        }
                        containerElement.style.backgroundColor = this.widgetInstance.bgColor || '';
                    });
                    this.widgetElement.addEventListener('drop', (e: DragEvent) => {
                        if (window['dragged'] == null) {
                            return;
                        }
                        const droppedElement: HTMLDivElement = window['dragged'].element;
                        const droppedParent = <HTMLDivElement>droppedElement.closest('.axf-drop-zone');
                        droppedParent.id = AXHtmlUtil.getUID();
                        //
                        let containerElement: HTMLElement;
                        if (this.widgetElement.classList.contains('axf-drop-zone')) {
                            containerElement = this.widgetElement;
                        } else {
                            containerElement = this.widgetElement.querySelector('.axf-drop-zone');
                        }
                        containerElement.id = AXHtmlUtil.getUID();
                        containerElement.style.backgroundColor = this.widgetInstance.bgColor || '';
                        //
                        const droppedWidget = <AXFWidgetDesigner>window['dragged'].widget;
                        //
                        if (!droppedElement.contains(containerElement)) {
                            this.widgetElement.style.backgroundColor = this.widgetInstance.bgColor;

                            const previousIndex = Array.prototype.indexOf.call(document.querySelectorAll(`#${droppedParent.id} > .axf-draggable-widget`), droppedElement);
                            let currentIndex = 0;

                            const allDropZoneElement = document.querySelectorAll(`#${containerElement.id} > .axf-draggable-widget`);
                            for (let i = 0; i < allDropZoneElement.length; i++) {
                                const element = allDropZoneElement[i];
                                const bound = element.getBoundingClientRect();
                                if (e.clientY >= bound.top && e.clientY <= bound.bottom) {
                                    currentIndex = i;
                                    break;
                                }
                            }
                            for (let i = allDropZoneElement.length - 1; i > 0 && currentIndex == 0; i--) {
                                const element = allDropZoneElement[i];
                                const bound = element.getBoundingClientRect();
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
                            });

                            window['dragged'] = null;
                            e.preventDefault();
                            e.stopPropagation();
                        }

                    });
                }
            });
        }
        //
        if (this.widgetConfig.onRendered) {
            this.widgetConfig.onRendered.next(this.widgetConfig);
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
        if (this.widgetInstance['getContextMenu']) {
            const menu = document.createElement('div');
            menu.classList.add('axf-widget-context-menu');
            menu.style.top = pos.y + 'px';
            menu.style.left = pos.x + 'px';
            document.body.appendChild(menu);
            const ul = document.createElement('ul');
            this.widgetInstance.getContextMenu().forEach((m: AXFContextMenuItem) => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="${m.icon}"></i>&nbsp;${m.text}`;
                if (m.separator) {
                    li.classList.add('separator');
                }
                ul.appendChild(li);
                li.onclick = (e) => {
                    e.stopPropagation();
                    if (m.action && m.widget[m.action]) {
                        m.widget[m.action]();
                    }
                };
                if (m.items && m.items.length) {
                    li.classList.add('subitem');
                    const ul2 = document.createElement('ul');
                    ul2.classList.add('axf-widget-context-menu');
                    m.items.forEach(m2 => {
                        const li2 = document.createElement('li');
                        li2.innerHTML = `<i class="${m2.icon}"></i>&nbsp;${m2.text}`;
                        if (m2.separator) {
                            li2.classList.add('separator');
                        }
                        ul2.appendChild(li2);
                        li2.onclick = (e) => {
                            e.stopPropagation();
                            if (m2.action && m.widget && m.widget[m2.action]) {
                                m.widget[m2.action]();
                            }
                        };
                    });
                    li.appendChild(ul2);
                    li.onmouseover = (e) => {
                        ul2.classList.add('show');
                        const liBound = li.getBoundingClientRect();
                        const bound = ul2.getBoundingClientRect();
                        if (bound.left + bound.width > window.innerWidth) {
                            ul2.style.left = -(liBound.width + 5) + 'px';
                        }
                        if (bound.top + bound.height > window.innerHeight) {
                            ul2.style.top = -(bound.height - liBound.height) + 'px';
                        }
                    };
                    li.onmouseout = (e) => {
                        ul2.classList.remove('show');
                    };
                }
            });
            menu.appendChild(ul);
            setTimeout(() => {
                menu.classList.add('show');
                const bound = menu.getBoundingClientRect();
                if (bound.left + bound.width > window.innerWidth) {
                    menu.style.left = window.innerWidth - bound.width - 20 + 'px';
                }
                if (bound.top + bound.height > window.innerHeight) {
                    menu.style.top = window.innerHeight - bound.height - 20 + 'px';
                }
            }, 50);
        }
        this.clearDocumentEvents();
        document.addEventListener('click', this.closeContextMenu.bind(this), true);
        document.addEventListener('contextmenu', this.closeContextMenu.bind(this), true);
        document.addEventListener('wheel', this.closeContextMenu.bind(this), true);
    }

    private closeContextMenu() {
        document.querySelectorAll('.axf-widget-context-menu').forEach(element => {
            element.parentElement.removeChild(element);
        });
        this.clearDocumentEvents();
    }

    ngOnDestroy(): void {
        this.zone.runOutsideAngular(() => {
            if (this.widgetElement) {
                this.widgetElement.removeEventListener('click', this.handleSelectElement.bind(this));
            }
        });
        this.clearDocumentEvents();
    }

    private clearDocumentEvents() {
        document.removeEventListener('click', this.closeContextMenu.bind(this));
        document.removeEventListener('contextmenu', this.closeContextMenu.bind(this));
        document.removeEventListener('wheel', this.closeContextMenu.bind(this), true);
    }
}
