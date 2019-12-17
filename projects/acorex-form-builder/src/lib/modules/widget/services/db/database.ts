import Dexie from 'dexie';

export interface AXFTemplateModel {
    id: string;
    name: string,
    description?: string,
    template?: string,
    type: "form" | "widget";
}

export class AXFDatabase extends Dexie {
    templates: Dexie.Table<AXFTemplateModel, string>;
    constructor() {
        super("AXF");
        this.version(1).stores({
            templates: "++id, &name, description, template, type",

        });
    }
}