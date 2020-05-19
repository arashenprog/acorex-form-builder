import { Component, HostListener } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../services/widget.service';
import { AXBasePageComponent, AXDialogService } from 'acorex-ui';
import { AXFTemplateService } from '../../services/template/template.service';
import { AXFTemplateModel } from '../../services/db/database';

@Component({
    templateUrl: './widget-picker.component.html',
    styleUrls: ['./widget-picker.component.scss']
})
export class AXFWidgetPickerComponent extends AXBasePageComponent {

    list: WidgetConfig[];
    categories: string[] = [];
    templates: AXFTemplateModel[] = [];
    isMultiple: boolean = false;

    selectedWidgets: WidgetConfig[] = [];

    @HostListener('document:keydown', ['$event'])
    handleCtrlKeyboardEventDown(event: KeyboardEvent) {
        if (event.key === 'Control') {
            this.isMultiple = true;
        }
    }

    @HostListener('document:keyup', ['$event'])
    handleCtrlKeyboardEventUp(event: KeyboardEvent) {
        if (event.key === 'Control') {
            this.isMultiple = false;
        }
    }

    constructor(
        private templateService: AXFTemplateService,
        private widgetService: AXFWidgetService,
        private dialogService: AXDialogService,
    ) {
        super();
    }

    ngOnInit() {
        this.list = this.list.sort((a, b) => a.title.localeCompare(b.title));
        this.list.forEach(c => {
            if (!this.categories.includes(c.category)) {
                this.categories.push(c.category);
            }
        });
        this.templateService.getWidgetList().then(c => {
            if (c && c.length) {
                this.templates.push(...c.sort((a, b) => a.name.localeCompare(b.name)));
            }
        });
    }

    selectWidget(widget: WidgetConfig) {
        if (this.isMultiple || this.selectedWidgets.length > 0) {
            if (this.selectedWidgets.includes(widget)) {
                this.selectedWidgets = this.selectedWidgets.filter(c => c !== widget);
            } else {
                this.selectedWidgets.push(widget);
            }
        } else {
            this.close([widget]);
        }
    }

    getList(cat: string): WidgetConfig[] {
        return this.list.filter(c => c.category === cat);
    }


    selectTemplate(tpl: AXFTemplateModel) {
        if (this.isMultiple || this.selectedWidgets.length > 0) {
            this.templateService.get(tpl.id).then(c => {
                const w = this.selectedWidgets.find(i => i.options && i.options.widgetId === c.id);
                if (w) {
                    this.selectedWidgets = this.selectedWidgets.filter(i => i !== w);
                } else {
                    const outlet = this.widgetService.resolve('outlet');
                    outlet.options.widgetId = c.id;
                    outlet.options.widgetTitle = tpl.name;
                    this.selectedWidgets.push(outlet);
                }
            });
        } else {
            this.templateService.get(tpl.id).then(c => {

                const widget = this.widgetService.parse(c.template);
                this.dialogService.show(
                    'Add saved widget',
                    'Do you want to add it as a referenced widget?',
                    ...[
                        { name: 'cancel', text: 'Cancel', type: 'success' },
                        { name: 'no', text: 'No', type: 'danger' },
                        { name: 'yes', text: 'Yes', type: 'info' }
                    ]
                ).then(name => {
                    if (name === 'yes') {
                        const outlet = this.widgetService.resolve('outlet');
                        outlet.options.widgetId = c.id;
                        outlet.options.widgetTitle = tpl.name;
                        this.close([outlet]);
                    } else if (name === 'no') {
                        this.close(widget.options.widgets);
                    }
                });

            });
        }
    }


    insertMultiple() {
        if (this.selectedWidgets.length > 0) {
            return this.close(this.selectedWidgets);
        }
    }

    isSelectedWidget(widget: WidgetConfig) {
        return this.selectedWidgets.includes(widget);
    }

    isSelectedTemplate(tpl: AXFTemplateModel) {
        return this.selectedWidgets.some(c => c.options && c.options.widgetId === tpl.id);
    }




}
