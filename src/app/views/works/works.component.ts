import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Work} from '../../model/Work';
import {Category} from '../../model/Category';
import {DataServiceService} from '../../service/data-service.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {
  @Output() showAddWork = new EventEmitter();
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
    this.viewWorks = this.filterByCategory(this.works);
  }

  showAddWorkComponent(param): void {
  }

  deleteWork(id: number): void {
  }

  loadWorks(): void {
    this.dataService.loadWorks();
    this.dataService.works$.subscribe(data => {
      this.works = data;
      this.fillViewWorks();
    });
  }

  private filterByCategory(works: Work[]): Work[] {
    return works.filter(work => work.category.category_id === this.currentCategory.category_id);
  }
}
