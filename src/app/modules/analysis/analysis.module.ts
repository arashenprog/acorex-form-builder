import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACInvoicesPage } from './invoices/invoices.page';
import { ACCostsPage } from './cost/cost.page';
import { ACFilesPage } from './files/files.page';

const Pages = [ACCostsPage, ACFilesPage, ACInvoicesPage]

@NgModule({
    declarations: [...Pages],
    imports: [CommonModule],
    exports: [...Pages],
    providers: [],
})
export class AnalysisModule { }