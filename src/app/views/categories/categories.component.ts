import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() categoryEvent = new EventEmitter();
  categories: Category[] = [];
  selectedCategory: Category;

  constructor() { }

  ngOnInit(): void {
  }

  categoryClick(category: Category): void {
    console.log(category.title);
  }
}
