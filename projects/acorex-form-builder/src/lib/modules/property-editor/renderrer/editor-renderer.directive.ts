import { Directive, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { AXFProperyEditor } from '../config/editor';
import { AXFEditorService } from '../services/editor.service';
import { AXFWidgetDesigner } from '../../widget/config/widget';
import { AXFWidgetProperty } from '../../widget/services/widget.service';
import { EventService } from 'acorex-ui';
import { AXFChangeTrackerService } from '../../widget/services/change-tracker.service';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[axf-editor-renderer]',
})
export class AXFEditorRendererDirective {

    private instance: AXFProperyEditor<any>;

    @Input()
    widget: AXFWidgetDesigner;


    @Input()
    property: AXFWidgetProperty;

    private subscription: Subscription;

    constructor(
        private target: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private editorService: AXFEditorService,
        private eventService: EventService,
        private changeService: AXFChangeTrackerService,
    ) {

    }

    ngOnInit(): void {
        this.createComponent();
        this.eventService.on('BIND_RELATED_PROPS', () => {
            this.assignRelatedProps();
        });
        this.subscription = this.changeService.onChange.subscribe(c => {
            if (c.widget === this.widget && c.prop === this.property.name) {
                this.instance.value = c.value;
            }
        });
    }



    createComponent() {
        const editorClass = this.editorService.resolve(this.property.editor);
        if (!editorClass) {
            return;
        }
        //
        const factory = this.componentFactoryResolver.resolveComponentFactory(editorClass);
        //
        const cmpRef = this.target.createComponent(factory);
        this.instance = cmpRef.instance as AXFProperyEditor<any>;
        //
        this.instance.valueChange.subscribe(value => { 
            if (this.instance.initiated === true) {
                const oldValue: any = this.widget.config.options[this.property.name];
                this.widget.config.options[this.property.name] = value;
                this.eventService.broadcast('BIND_RELATED_PROPS');
                this.changeService.registerChange({ widget: this.widget, prop: this.property.name, oldValue: oldValue, value: value });
                this.widget.refresh();
            }
        });
        Object.assign(this.instance, this.property.options, { value: this.widget.config.options[this.property.name] });
        this.instance.locked = this.widget.locked;
        this.assignRelatedProps();
    }


    private assignRelatedProps() {
        for (const p in this.property.options) {
            if (this.property.options.hasOwnProperty(p)) {
                const opt = this.property.options[p];
                if (typeof opt === 'string' && opt.startsWith('$')) {
                    const key = opt.substring(1);
                    this.instance[p] = this.widget.config.options[key];
                }
            }
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}