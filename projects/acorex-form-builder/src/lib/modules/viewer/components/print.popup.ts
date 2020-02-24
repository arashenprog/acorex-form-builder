import { Component, ViewEncapsulation } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';


@Component({
    template: `
        <div class='ax-pad-md'>
            <div>
                <label style='font-size: small;font-weight: 700;'>
                    Page Size
                </label>
                <ax-select-box [items]='items' [(selectedValues)]="selected">
                </ax-select-box>
            </div>
            <br>
            <div style='display: flex;justify-content: flex-end;'>
                <ax-button text="Cancel" type="light" (onClick)="close()">
                </ax-button>
                &nbsp;
                <ax-button text="Print" type="success" (onClick)="handlePrintClick()">
                </ax-button>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class ACFViewerPrintPopup extends AXBasePageComponent {

    constructor() {
        super();
    }

    selected: number = 0;
    //
    items: any[] = [
        {
            value: 0,
            text: 'A4 Portrate'
        },
        {
            value: 1,
            text: 'A4 Landscape'
        },
        {
            value: 2,
            text: 'A3 Portrate'
        },
        {
            value: 4,
            text: 'A4 Landscape'
        }
    ];

    handlePrintClick() {
        this.close({
            size: this.selected
        });
    }
}
