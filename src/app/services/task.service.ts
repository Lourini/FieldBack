import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //private baseUrl = 'http://localhost:3000/api';
  private baseUrl = 'http://185.166.39.250:3000/api'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  createTask(taskData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/task`, taskData);
  }

  getTasksByProjectId(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/project/task/${projectId}`);
  }

  getTaskById(taskId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/task/${taskId}`);
  }

  updateTask(taskId: string, taskData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/task/${taskId}`, taskData);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/task/${taskId}`);
  }
}
