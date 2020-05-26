import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner, AXFContextMenuItem } from '../../../config/widget';
import { AXFTemplateService } from '../../../services/template/template.service';
import { AXDialogService } from 'acorex-ui';

@Component({
    selector: '[axf-outlet]',
    templateUrl: './outlet-widget.designer.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFOutletWidgetDesigner extends AXFWidgetDesigner {

    widgetId: string;
    isLoading: boolean = true;


    constructor(
        private cdr: ChangeDetectorRef,
        private templateService: AXFTemplateService,
        private dialogService: AXDialogService) {
        super();
    }

    ngOnInit() {
        this.templateService.get(this.widgetId).then(c => {
            this.widgets = this.widgetService.parse(c.template).options.widgets;
            if (c.name && !this.config.options.widgetTitle) {
                this.config.options.widgetTitle = c.name;
            }
            this.isLoading = false;
            this.refresh();
        });
    }

    refresh(): void {
        this.cdr.markForCheck();
    }

    private unWrap() {
        this.dialogService.show(
            'Unwrap saved widget',
            'Are you sure you want to unwrap this widget?',
            ...[
                { name: 'no', text: 'No', type: 'light' },
                { name: 'yes', text: 'Yes', type: 'success' },
            ]
        ).then(name => {
            if (name === 'yes') {
                this.parent.widgets.splice(this.findIndex(), 0, ...this.widgets);
                this.delete();
            }
        });

    }

    onContextMenu(items: AXFContextMenuItem[]): AXFContextMenuItem[] {
        items.splice(1, 0, ...[
            {
                text: 'Unwrap Items',
                icon: 'fas fa-object-ungroup',
                action: 'unWrap',
                separator: true,
                widget: this
            }
        ]);
        return items;
    }
}

