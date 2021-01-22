import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Work} from '../../model/Work';
import {Category} from '../../model/Category';
import {SubCategory} from '../../model/SubCategory';

@Component({
  selector: 'app-add-works',
  templateUrl: './add-works.component.html',
  styleUrls: ['./add-works.component.css']
})
export class AddWorksComponent implements OnInit {
  @Output() closeEvent = new EventEmitter();
  visible: boolean;
  work: Work;

  constructor() { }

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

  saveTask(): void {
  }

  hideComponent(): void {
  }

  deleteTask(id: number): void {
  }

  showComponent($event: any): void {
  }
}
