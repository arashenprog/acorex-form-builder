import Dexie from 'dexie';

export interface AXFTemplateModel {
    id: number;
    name: string,
    template?: string,
    type: "form" | "widget";
}

export class AXFDatabase extends Dexie {
    templates: Dexie.Table<AXFTemplateModel, number>;
    constructor() {
        super("AXF");
        this.version(1).stores({
            templates: "++id,name,template,type"
        });
    }
}