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
    sortBy: `6`
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
    // this.viewWorks = this.works;
    this.dataService.clickedCategory$.subscribe(data => this.currentCategory = data);
    this.filterWorksByCategory();
    console.log('fillViewWorks()---' + this.currentCategory);
    console.log('fillViewWorks()---' + this.viewWorks);
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
    // this.works.push(work);
    this.filterWorksByCategory();
  }

  private filterWorksByCategory(): void{
    if (this.currentCategory.categoryId !== 9){
      this.viewWorks = this.works.filter(work => work.category.categoryId === this.currentCategory.categoryId);
    }else{
      this.viewWorks = this.works;
    }
  }
}
