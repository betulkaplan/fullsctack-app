import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { ToDo } from '../../todos.interface';

@Component({
  selector: 'app-todos-search',
  template: `
    <sl-input
      type="text"
      (sl-input)="searchKeyword(inputElement.value)"
      placeholder="Search"
      #inputElement
    ></sl-input>
  `,
})
export class TodosSearchComponent implements OnInit {
  @Output()
  search: EventEmitter<ToDo[]> = new EventEmitter<ToDo[]>();

  readonly searchKey$ = new Subject<string>();

  constructor(readonly apiService: ApiService) {}

  ngOnInit() {
    // mergeMap: executes all requests in parallel
    // switchMap: executes the most recent one and cancels the unfinished ones
    // concatMap: executes all requests in sequence

    this.searchKey$
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          return this.apiService.getTodoBySearch(value);
        }),
      )
      .subscribe({
        next: (value) => {
          this.search.emit(value);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  searchKeyword(value: string) {
    this.searchKey$.next(value);
  }
}
