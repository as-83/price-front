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

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
  }

  filterCategories(): Category[] {
    return null;
  }

  setCategory($event: Event): void {
  }

  setSubCategory($event: Event): void {
  }

  filterSubCategories(): SubCategory[] {
    return null;
  }

  saveWork(): void {
    this.dataService.add(this.work).subscribe(data => this.work = data);
    this.closeEvent.emit();
  }

  deleteWork(id: number): void {
  }

  showComponent($event: any): void {
    if ($event != null){
      this.work = $event.valueOf();
    }
    this.visible = true;
  }

  hideComponent(): void {
    this.visible = false;
  }
}
