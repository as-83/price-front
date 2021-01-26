import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Work} from '../model/Work';
import {Category} from '../model/Category';
import {map, tap} from 'rxjs/operators';
import {SubCategory} from '../model/SubCategory';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private worksUrl = 'http://localhost:8080/price-list/works';
  private categUrl = 'http://localhost:8080/price-list/categories';
  private subCategUrl = 'http://localhost:8080/price-list/subCategories';
  worksSubject = new BehaviorSubject<Work[]>([]);
  categoriesSubject = new BehaviorSubject<Category[]>([]);
  subCategoriesSubject = new BehaviorSubject<SubCategory[]>([]);
  works$: Observable<Work[]> = this.worksSubject.asObservable();
  categories$: Observable<Category[]> = this.categoriesSubject.asObservable();
  subCategories$: Observable<SubCategory[]> = this.subCategoriesSubject.asObservable();
  private currentCategSource = new BehaviorSubject<Category>(new Category(1, 'Пол'));
  clickedCategory$ = this.currentCategSource.asObservable();
  allWorks: Work[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadCategories();
    this.loadWorks();
    this.loadSubCategories();
    this.works$.subscribe(data => this.allWorks = data );
  }

  loadCategories(): void {
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

  add(work: Work): Observable<Work> {
    return  this.httpClient.post<Work>(this.worksUrl, work);
  }

  private loadSubCategories(): void {
    this.subCategories$ = this.httpClient.get<SubCategory[]>(this.subCategUrl).pipe(
      map(response => response),
      tap(subCategories => this.subCategoriesSubject.next(subCategories))
    );
  }

  deleteWork(id: number): any {
    return this.httpClient.delete<any>(this.worksUrl + '/' + id);
  }
}
