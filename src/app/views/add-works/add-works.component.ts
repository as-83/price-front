import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Work} from '../../model/Work';
import {Category} from '../../model/Category';
import {SubCategory} from '../../model/SubCategory';
import {DataServiceService} from '../../service/data-service.service';

@Component({
  selector: 'app-add-works',
  templateUrl: './add-works.component.html',
  styleUrls: ['./add-works.component.css']
})
export class AddWorksComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  visible: boolean;
  work: Work;
  categories: Category[];
  subCategories: SubCategory[];
  disabled = true;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.categories$.subscribe(
      data => this.categories = (this.categories = data).filter(category => category.categoryId !== 9));
    this.dataService.subCategories$.subscribe(data => this.subCategories = data);
  }

  filterCategories(): Category[] {
    return null;
  }

  filterSubCategories(): SubCategory[] {
    return null;
  }

  setCategory(event: any): void {
    this.work.category = this.categories[event.target.value];
    console.log('setCategory()=>' + event.target.value);
  }

  setSubCategory(event: any): void {
    this.work.subCategory = this.subCategories[event.target.value];
    console.log('setSubCategory()=>' + event.target.value);
  }

  showComponent($event: any): void {
    this.work = $event;
    if (this.work.subCategory == null){
      this.work.subCategory = this.subCategories[0];
    }
    this.visible = true;
    this.disabled = false;
  }

  hideComponent(): void {
    this.visible = false;
  }

  saveWork(): void {
    this.dataService.add(this.work).subscribe(data => this.work = data);
    this.closeEvent.emit(this.work);
    this.disabled = true;
  }

  deleteWork(id: number): void {
    this.dataService.deleteWork(id);
    this.work = new Work();
  }
}
