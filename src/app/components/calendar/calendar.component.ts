import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions;
  projectId = '';
  tasks : any[] = [];
  events : Event[] = [];
  constructor(private taskService: TaskService, private route: ActivatedRoute, private eventService: EventService) {
    this.calendarOptions = {
      locale : frLocale,
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      dateClick: (arg) => this.handleDateClick(arg),
      selectable: true,
      select: (arg) => this.handleDateRangeSelect(arg),
      eventDrop: (arg) => this.handleEventDrop(arg),
      eventResize: (arg) => this.handleEventResize(arg),
      eventClick: (arg) => this.deleteEvent(arg),
      editable: true,
      eventResizableFromStart: true,

    };
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];
    this.loadEvents();
    this.loadTasks();
  }

  loadEvents() {
    this.eventService.getEventsByProjectId(this.projectId).subscribe(
      events => {
        this.events = events
        const eventList = events.map(event => ({
          id: event.id,
          title: event.title,
          start: event.startDate,
          end: event.endDate
        }));
        this.calendarOptions.events = eventList;
      },
      error => {
        console.error('Error loading events:', error);
      }
    );
  }

  loadTasks() {
    this.taskService.getTasksByProjectId(this.projectId).subscribe(tasks => {
      this.tasks = tasks;
      const taskList = tasks.map((task: any) => ({
        id: task.id,
        eventType: 'Tache',
        title: task.descriptionCourte,
        start: task.startDate,
        end: task.endDate
      }));
      var list: any = []
      list = this.calendarOptions.events;
      if (list.length > 0) {
        this.calendarOptions.events = [...list, ...taskList];
      } else {
        this.calendarOptions.events = taskList;
      }

    });
  }

  handleDateClick(arg: any) {
    const title = prompt('Entrez un titre pour l\'événement :');
    if (title) {
      const createdEvent: Event = { title, startDate: arg.startStr, endDate: arg.endStr, projectId: this.projectId };
      this.addEvent(createdEvent);
    }
  }

  handleDateRangeSelect(arg: any) {
    const title = prompt('Entrez un titre pour l\'événement :');
    if (title) {
      // Convert start and end strings to Date objects
      const startDate = new Date(arg.startStr);
      let endDate = new Date(arg.endStr);

      // Subtract one day from the end date
      endDate.setDate(endDate.getDate() - 1);

      // Create the event with adjusted dates
      const createdEvent: Event = { title, startDate, endDate, projectId: this.projectId };
      this.addEvent(createdEvent);
    }
  }


  handleEventDrop(arg: any) {
    const indexTask = this.tasks.findIndex((e : any)=>e.id===arg.event.id);
    const indexEvent = this.events.findIndex((e:any)=>e.id ===arg.event.id);
    if (indexEvent!==-1) {
      const updatedEvent: Event = {
        id: arg.event.id,
        title: arg.event.title,
        startDate: arg.event.start,
        endDate: arg.event.end,
        projectId: this.projectId
      };
      this.updateEvent(updatedEvent);
    } else if (indexTask !==-1) {
      this.taskService.getTaskById(arg.event.id).subscribe(task => {
        task.startDate = arg.event.start;
        task.endDate = arg.event.end;
        this.taskService.updateTask(task.id, task).subscribe(resp => {
          this.loadEvents();
          this.loadTasks();
        })
      })
    }
  }

  handleEventResize(arg: any) {
    const indexTask = this.tasks.findIndex((e : any)=>e.id===arg.event.id);
    const indexEvent = this.events.findIndex((e:any)=>e.id ===arg.event.id);
    if (indexEvent!==-1) {
      const updatedEvent: Event = {
        id: arg.event.id,
        title: arg.event.title,
        startDate: arg.event.start,
        endDate: arg.event.end,
        projectId: this.projectId
      };
      this.updateEvent(updatedEvent);
    } else if (indexTask!==-1) {
      this.taskService.getTaskById(arg.event.id).subscribe(task => {
        task.startDate = arg.event.start;
        task.endDate = arg.event.end;
        this.taskService.updateTask(task.id, task).subscribe(resp => {
          this.loadEvents();
          this.loadTasks();
        })
      })
    }
  }

  addEvent(event: Event) {
    this.eventService.createEvent(event).subscribe(
      () => {
        this.loadEvents();
        this.loadTasks();
      },
      error => {
        console.error('Error adding event:', error);
      }
    );
  }

  updateEvent(event: Event) {
    this.eventService.updateEvent(event).subscribe(
      () => {
        this.loadEvents();
        this.loadTasks();
      },
      error => {
        console.error('Error updating event:', error);
      }
    );
  }

  deleteEvent(arg : any) {
    const indexEvent = this.events.findIndex((e:any)=>e.id ===arg.event.id);
    if (indexEvent!==-1)
      if (confirm('Supprimer l\'événement ?'))
        this.eventService.deleteEvent(arg.event.id).subscribe(
          () => {
            this.loadEvents();
            this.loadTasks();
          },
          error => {
            console.error('Error deleting event:', error);
          }
        );
  }
}
