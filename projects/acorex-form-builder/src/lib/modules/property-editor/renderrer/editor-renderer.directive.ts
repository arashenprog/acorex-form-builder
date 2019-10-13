import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, EventEmitter, Output } from '@angular/core';
import { AXHtmlUtil } from 'acorex-ui';
import { AXFProperyEditor } from '../config/editor';

@Directive({
    selector: '[axf-editor-renderer]',
})
export class AXFEditorRendererDirective {

    @Input()
    editor: any;

    @Input()
    value: any;

    @Output()
    valueChange: EventEmitter<any> = new EventEmitter<any>();



    constructor(
        private target: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    ngOnInit(): void {
        this.createComponent();
    }

    createComponent() {
        if (!this.editor)
            return;
        //
        let factory = this.componentFactoryResolver.resolveComponentFactory(this.editor);
        //
        let cmpRef = this.target.createComponent(factory)
        let instance = cmpRef.instance as AXFProperyEditor<any>;
        //
        Object.assign(instance, { value: this.value });
        //
        instance.valueChange.subscribe(value => {
            this.valueChange.emit(value);
        })

        //(cmpRef.location.nativeElement as HTMLElement).classList.add("widget-editor");
    }

}