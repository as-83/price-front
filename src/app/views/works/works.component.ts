import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Work} from '../../model/Work';
import {Category} from '../../model/Category';
import {DataServiceService} from '../../service/data-service.service';
import {SubCategory} from '../../model/SubCategory';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {
  @Output() showAddWork = new EventEmitter<Work>();
  works: Work[];
  viewWorks: Work[];
  currentCategory: Category;
  filters = {
    keyword: '',
    sortBy: `2`
  };

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.works$.subscribe(works => {
        this.works = works;
        this.fillViewWorks();
      });
    this.dataService.clickedCategory$.subscribe(data => this.currentCategory = data);
  }

  fillViewWorks(): void {
    this.dataService.clickedCategory$.subscribe(data => this.currentCategory = data);
    this.filterWorksByCategory();
  }

  showAddWorkComponent(work: Work): void {
    if (work == null){
      work = new Work();
      work.category = this.currentCategory;
      this.works.push(work);
    }
    this.showAddWork.emit(work);
  }

  deleteWork(id: number): void {
    this.dataService.deleteWork(id).subscribe();
    this.works = this.works.filter(work => work.id !== id);
    this.viewWorks = this.viewWorks.filter(work => work.id !== id);
  }

  loadWorks(work: Work): void {
    this.filters.keyword = '';
    this.filterWorksByCategory();
  }

  private filterWorksByCategory(): void{
    if (this.currentCategory.categoryId !== 9){
      this.viewWorks = this.works.filter(work => work.category.categoryId === this.currentCategory.categoryId);
    }else{
      this.viewWorks = this.works;
    }
    this.orderViewWorks();
  }

  orderViewWorks(): void{
    this.viewWorks = this.viewWorks.sort((w1, w2) => {
      switch (this.filters.sortBy){
        case '1': return w1.title.toLowerCase() < w2.title.toLowerCase() ? 1 : -1;
        case '2': return w1.title.toLowerCase() < w2.title.toLowerCase() ? -1 : 1;
        case '3': return w2.subCategory.subCategoryId - w1.subCategory.subCategoryId;
        case '4': return w1.subCategory.subCategoryId - w2.subCategory.subCategoryId;
        case '5': return w1.creationDate < w2.creationDate ? 1 : -1;
        case '6': return w1.creationDate < w2.creationDate ? -1 : 1;
      }
    });
  }

  findWorks(): void {
    this.filterWorksByCategory();
    this.viewWorks = this.viewWorks.filter(work => work.title.toLowerCase().includes(this.filters.keyword.toLowerCase()));
  }
}
