import { Injectable } from '@angular/core';

import { PromisResult, MenuItem, BaseMenuItem } from 'acorex-ui'
import { AXHeaderBarMenuService } from 'acorex-spa';

@Injectable()
export class HeaderBarMenuService extends AXHeaderBarMenuService {

    private mockItems: BaseMenuItem[] = [
        { icon: "fas fa-cogs", },
        { icon: "fas fa-expand" },
        { icon: "fas fa-comment-alt" },
        { icon: "fas fa-power-off", style: "bk-danger" },

    ]

    getItems(): PromisResult<MenuItem[]> {
        return new PromisResult((resolve) => {
            resolve(this.mockItems);
        });
    }

    clickItem(item: MenuItem): PromisResult<boolean> {
        return new PromisResult((resolve) => {
            resolve(true);
        });
    }

}
