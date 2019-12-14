export class ItemsStructureEditor {
    types: ContentItemsStructureEditor[];
    content: any[]; 
}

export class ContentItemsStructureEditor {
    id: string;
    title: string;
    type: string;
    fillByUser: boolean = false;
    mode: boolean;
    subItems: string[];
    defaultValue: any;
    subText: string;

    constructor(json) {
        this.id = json.id;
        this.title = json.title;
        this.type = json.type;
        if (json.fillByUser)
            this.fillByUser = json.fillByUser;
        if (json.mode)
            this.mode = json.mode;
        if (json.subText)
            this.subText = json.subText;
        if (json.subItems && json.subItems.length > 0)
            this.subItems = json.subItems;
        this.defaultValue = this.setDefaultValue(json.type);
    }

    setDefaultValue(type) {
        switch (type) {
            case "string":
                return "Item";
            case "number":
                return 1;
            case "date":
                return Date.now;
            case "selectionList":
                return [];
            case "boolean":
                return false;
            case "image":
                return './assets/images/noimage.png';
        }
    }
} 