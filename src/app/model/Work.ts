import {Category} from './Category';
import {SubCategory} from './SubCategory';

export class Work {
  id?: number;
  title?: string;
  category?: Category;
  subCategory?: SubCategory;
  unit?: string;
  coast?: number;
  creationDate?: string;

  // tslint:disable-next-line:max-line-length
  constructor(id?: number, title?: string, completed?: boolean, category?: Category, subCategory?: SubCategory, unit?: string, coast?: number, creationDate?: string) {
    this.id = id;
    this.title = title;
    this.subCategory = subCategory;
    this.category = category;
    this.unit = unit;
    this.coast = coast;
    this.creationDate = creationDate;
  }
}
