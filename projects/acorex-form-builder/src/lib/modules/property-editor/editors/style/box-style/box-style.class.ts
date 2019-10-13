export class AXFBoxStyleValue {
    padding: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();
    border: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();;
    margin: AXFBoxStyleBoxSizeValue = new AXFBoxStyleBoxSizeValue();;
}

export class AXFBoxStyleBoxSizeValue {
    left: string = "0";
    right: string = "0";
    top: string = "0";
    bottom: string = "0";
}