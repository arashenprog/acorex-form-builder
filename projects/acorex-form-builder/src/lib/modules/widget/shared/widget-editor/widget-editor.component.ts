import { Component, OnInit, Input, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { WidgetConfig, AXFWidgetProperty } from '../../services/widget.service';
import { AXFWidgetRendererDirective } from '../widget-renderer/widget-renderer.directive';
import { AXBasePageComponent } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';

@Component({
    selector: 'axf-widget-editor',
    templateUrl: './widget-editor.component.html',
    styleUrls: ['./widget-editor.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFWidgetEditorComponent extends AXBasePageComponent implements OnInit {

    public config: WidgetConfig;
    @ViewChild(AXFWidgetRendererDirective) widgetRenderer: AXFWidgetRendererDirective;


    tabNames: string[] = [];

    constructor(private cdr: ChangeDetectorRef) { 
        super();
    }

    ngOnInit(): void {
        this.config.properties.forEach(p => {
            if (!this.tabNames.includes(p.category)) {
                this.tabNames.push(p.category);
            }
        });
    }

    getProps(category: string): AXFWidgetProperty[] {
        return this.config.properties.filter(c => c.category == category);
    }

    handleValueChange(name: string, value: any) {
        this.config.options[name] = value;
        this.widgetRenderer.render();
    }

    onClosing(e:ClosingAction)
    {
        e.data = this.config.options;
        e.resolve();
    }
}
