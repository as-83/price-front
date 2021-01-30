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
  works: Work[]; // Список всех работ
  viewWorks: Work[]; // Отфильтрованный список
  currentCategory: Category; // Текущая категория
  currentSubCategories: SubCategory[]; // Список подкатегорий текущей категории
  filters = {
    keyword: '', // Фильтр по названию
    sortBy: `2`, // Сортировка по умолчанию - "По названию, по алфавиту"
    subCategory: '0' // Подкатегория селекта
  };

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.works$.subscribe(works => {
        this.works = works;
        this.fillViewWorks();
        this.fillSubCategories();
      });
    this.dataService.clickedCategory$.subscribe(data => {
      this.currentCategory = data;
    });
  }

  // Инициализация массива работ, выводимого на экран
  fillViewWorks(): void {
    this.dataService.clickedCategory$.subscribe(data => this.currentCategory = data);
    this.filters.subCategory = '0';
    this.filters.keyword = '';
    this.filterWorksByCategory();
  }

  // Формирование массива подкатегорий для текущей категории
  // Селект подкатегорий
  fillSubCategories(): void{
    this.currentSubCategories = this.works.filter(work => work.category.categoryId === this.currentCategory.categoryId)
      .map(work => work.subCategory).filter((x, i, arr) => arr.findIndex(t => t.subCategoryId === x.subCategoryId) === i);
    console.log('this.currentSubCategories  ' + this.currentSubCategories[0].title);
  }

  // Вывод Всплывающего окна создания или редактирования пункта списка
  showAddWorkComponent(work: Work): void {
    if (work == null){
      work = new Work();
      work.category = this.currentCategory;
      this.works.push(work);
    }
    this.showAddWork.emit(work);
  }

  // Удаление пункта работ из списка и бд
  deleteWork(id: number): void {
    this.dataService.deleteWork(id).subscribe();
    this.works = this.works.filter(work => work.id !== id);
    this.viewWorks = this.viewWorks.filter(work => work.id !== id);
  }

  loadWorks(work: Work): void {
    this.filters.keyword = '';
    this.filters.subCategory = '0';
    this.filterWorksByCategory();
    this.fillSubCategories();
  }

  // Фильтрация по категории и подкатегории
  // Выполняется при клике по названию категории
  filterWorksByCategory(): void{
    if (this.currentCategory.categoryId !== 9){
      this.viewWorks = this.works.filter(work => work.category.categoryId === this.currentCategory.categoryId);
      if (this.filters.subCategory !== '0'){
        this.viewWorks = this.viewWorks.filter(work => work.subCategory.subCategoryId.toString() === this.filters.subCategory);
      }
    }else{
      this.viewWorks = this.works;
    }
    this.orderViewWorks();
  }

  // Упорядочивание списка работ по критерию
  // Выполняется при изменении селекта
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

  // Поиск по названию
  // Выполняется при вводе текста в поле поиска
  findWorks(): void {
    this.filterWorksByCategory();
    this.viewWorks = this.viewWorks.filter(work => work.title.toLowerCase().includes(this.filters.keyword.toLowerCase()));
  }

  // Выполняется при изменении селекта подкатегории
  subcategoryChanged(): void {
    this.filters.keyword = '';
    this.filterWorksByCategory();
  }
}
