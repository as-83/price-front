import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from '../../model/Category';
import {DataServiceService} from '../../service/data-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() categoryEvent = new EventEmitter();
  categories: Category[] = [];
  selectedCategory: Category;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.categories$.subscribe(data => {
      this.categories = data;
    });
    this.dataService.clickedCategory$.subscribe(data => {
      this.selectedCategory = data;
    });
  }

  categoryClick(category: Category): void {
    this.dataService.setCategory(category);
    this.categoryEvent.emit(null);
    console.log(category.title);
  }
}
