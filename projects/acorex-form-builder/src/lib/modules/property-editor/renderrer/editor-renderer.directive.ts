import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, EventEmitter, Output } from '@angular/core';
import { AXHtmlUtil } from 'acorex-ui';
import { AXFProperyEditor } from '../config/editor';
import { AXFEditorService } from '../services/editor.service';

@Directive({
    selector: '[axf-editor-renderer]',
})
export class AXFEditorRendererDirective {

    @Input()
    editor: any;

    @Input()
    options: any;

    @Input()
    value: any;

    @Output()
    valueChange: EventEmitter<any> = new EventEmitter<any>();



    constructor(
        private target: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private editorService: AXFEditorService
    ) { }

    ngOnInit(): void {
        this.createComponent();
    }

    createComponent() {
        const editorClass = this.editorService.resolve(this.editor);
        if (!editorClass)
            return;
        //

        let factory = this.componentFactoryResolver.resolveComponentFactory(editorClass);
        //
        let cmpRef = this.target.createComponent(factory)
        let instance = cmpRef.instance as AXFProperyEditor<any>;
        //
        Object.assign(instance, this.options);
        Object.assign(instance, { value: this.value });
        //
        instance.valueChange.subscribe(value => {
            this.valueChange.emit(value);
        })

        //(cmpRef.location.nativeElement as HTMLElement).classList.add("widget-editor");
    }

}