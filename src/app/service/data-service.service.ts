import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Work} from '../model/Work';
import {Category} from '../model/Category';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private worksUrl = 'http://localhost:8080/price-list/works';
  private categUrl = 'http://localhost:8080/price-list/categories';
  worksSubject = new BehaviorSubject<Work[]>([]);
  categoriesSubject = new BehaviorSubject<Category[]>([]);
  works$: Observable<Work[]> = this.worksSubject.asObservable();
  categories$: Observable<Category[]> = this.categoriesSubject.asObservable();
  private currentCategSource = new BehaviorSubject<Category>(new Category(2, 'Все Категории'));
  clickedCategory$ = this.currentCategSource.asObservable();
  allWorks: Work[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadCategories();
    this.loadWorks();
  }

  private loadCategories(): void {
    this.categories$ = this.httpClient.get<Category[]>(this.categUrl).pipe(
      map(response => response),
      tap(categories => this.categoriesSubject.next(categories))
    );
  }

  loadWorks(): void {
    this.works$ = this.httpClient.get<Work[]>(this.worksUrl).pipe(
      map(response => response),
      tap(works => this.worksSubject.next(works))
    );
  }

  setCategory(clickedCategory: Category): void{
    this.currentCategSource.next(clickedCategory);
  }
}
