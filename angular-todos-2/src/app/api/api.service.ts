import { Injectable } from '@angular/core';
import { ToDo } from '../todos/todos.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  dataApi = 'http://localhost:3000';

  constructor(readonly httpClient: HttpClient) {}

  getTodos(): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>(`${this.dataApi}/todos`);
  }

  getOriginalTodoById(id: string): Observable<ToDo> {
    return this.httpClient.get<ToDo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
  }

  getTodoById(id: string): Observable<ToDo> {
    return this.httpClient.get<ToDo>(`${this.dataApi}/todos/${id}`);
  }

  getTodoBySearch(searchKey: string): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>(`${this.dataApi}/todos`, {
      params: {
        title_like: searchKey,
      },
    });
  }

  updateTodo(todo: ToDo): Observable<ToDo> {
    return this.httpClient.put<ToDo>(`${this.dataApi}/todos/${todo.id}`, todo);
  }
  createTodo(todo: ToDo): Observable<ToDo> {
    return this.httpClient.post<ToDo>(`${this.dataApi}/todos`, {
      ...todo,
      created: {
        by: Math.floor(Math.random() * 1000000),
        date: new Date().toISOString(),
      },
      id: Math.floor(Math.random() * 1000000), // FIXME: remove one backend server is set up
    });
  }
}
