import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //private baseUrl = 'http://localhost:3000/api'; // Update this URL with your API endpoint
  private baseUrl = 'http://185.166.39.250:3000/api';
  constructor(private http: HttpClient) { }

  // Create Event
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.baseUrl+'/Event', event);
  }

  // Read Events by Project ID
  getEventsByProjectId(projectId: string): Observable<Event[]> {
    const url = `${this.baseUrl}/project/Event/${projectId}`;
    return this.http.get<Event[]>(url);
  }

  // Update Event
  updateEvent(event: Event): Observable<Event> {
    const url = `${this.baseUrl}/Event/${event.id}`;
    return this.http.put<Event>(url, event);
  }

  // Delete Event
  deleteEvent(eventId: string): Observable<void> {
    const url = `${this.baseUrl}/Event/${eventId}`;
    return this.http.delete<void>(url);
  }
}
