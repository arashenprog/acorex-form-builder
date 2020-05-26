import { Directive, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { AXFProperyEditor } from '../config/editor';
import { AXFEditorService } from '../services/editor.service';
import { AXFWidgetDesigner } from '../../widget/config/widget';
import { AXFWidgetProperty } from '../../widget/services/widget.service';
import { EventService } from 'acorex-ui';

@Directive({
    selector: '[axf-editor-renderer]',
})
export class AXFEditorRendererDirective {

    private instance: AXFProperyEditor<any>;

    @Input()
    widget: AXFWidgetDesigner;


    @Input()
    property: AXFWidgetProperty;



    constructor(
        private target: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private editorService: AXFEditorService,
        private eventService: EventService
    ) {

    }

    ngOnInit(): void {
        this.createComponent();
        this.eventService.on("BIND_RELATED_PROPS", () => {
            this.assignRelatedProps();
        });
    }



    createComponent() {
        const editorClass = this.editorService.resolve(this.property.editor);
        if (!editorClass)
            return;
        //

        let factory = this.componentFactoryResolver.resolveComponentFactory(editorClass);
        //
        let cmpRef = this.target.createComponent(factory)
        this.instance = cmpRef.instance as AXFProperyEditor<any>;
        //
        this.instance.valueChange.subscribe(value => {
            this.widget.config.options[this.property.name] = value;
            this.eventService.broadcast("BIND_RELATED_PROPS");
            this.widget.refresh();
        });
        Object.assign(this.instance, this.property.options, { value: this.widget.config.options[this.property.name] });
        this.instance.locked = this.widget.locked;
        this.assignRelatedProps();
    }


    private assignRelatedProps() {
        for (const p in this.property.options) {
            if (this.property.options.hasOwnProperty(p)) {
                const opt = this.property.options[p];
                if (typeof opt == "string" && opt.startsWith("$")) {
                    let key = opt.substring(1);
                    this.instance[p] = this.widget.config.options[key];
                }
            }
        }
    }


}