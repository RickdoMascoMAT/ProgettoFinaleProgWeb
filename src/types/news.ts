export interface NewsRoot {
  success: boolean;
  items: ItemElement[];
}

export interface ItemElement {
  item: ItemItem;
  link: string;
  text: string;
  title: string;
}

export interface ItemItem {
  material: string;
}
