import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskService } from '../task.service';
import { ProjetService } from 'src/app/projet-management/projet.service';
import { Projet } from 'src/app/projet-management/projet.model';
import { Anomalie } from 'src/app/projet-management/anomalie.model';
import { AnomalieService } from 'src/app/projet-management/anomalie.service';
import { OuvrageshydrauliquesService } from 'src/app/projet-management/ouvrageshydrauliques.service';
import { OuvragesHydrauliquesData } from 'src/app/projet-management/ouvrageshydrauliques.model';
import { AmenagementsService } from 'src/app/projet-management/ammenagements.service';
import { AmenagementsProposes } from 'src/app/projet-management/ammenagements.model';
import { User } from 'src/app/user-management/user.model';
import { UserService } from 'src/app/user-management/user.service';
import { Task } from './task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  constructor(private taskService: TaskService, private projetService: ProjetService, private anomalieService: AnomalieService,
    private ouvrageService: OuvrageshydrauliquesService, private ammenagementService: AmenagementsService,
    private userService: UserService, private datePipe: DatePipe) { }

  @Input() projetId = '';
  tasks: Task[] = [];
  projets: Projet[] = [];
  anomalies: Anomalie[] = [];
  Users: User[] = [];
  User: any;
  ouvrages: OuvragesHydrauliquesData[] = [];
  ammenagements: AmenagementsProposes[] = [];
  currentTask: Task = {
    numeroTache: 0, projetId: "", amenagementId: "", anomalieId: "", ouvrageId: "", creeePar: "",
    creeeLe: new Date(), descriptionCourte: "", descriptionLongue: "", assigneeLe: new Date(), assigneeA: "", statut: "A faire"
  };
  titleModel = '';
  buttonType = false;
  createdDate !: string | null;
  updatedDate !: string | null;

  ngOnInit() {
    this.User = JSON.parse(localStorage.getItem("currentUser") as string);
    if(this.projetId!=='' || this.projetId!==undefined || this.projetId!==null)
    
    this.getTasks();
  }


  private getTasks() {
    this.taskService.getTasksByProjectId(this.projetId).subscribe(resp => {
      this.tasks = resp;
    }, error => {
      console.log(error);
    })
  }

  onOpenModalAddTask() {
    this.titleModel = "Ajouter";
    this.buttonType = true;
    this.currentTask = {
      numeroTache: this.tasks.length + 1, projetId: "", amenagementId: null, anomalieId: null, ouvrageId: null, creeePar: this.User.id,
      creeeLe: new Date(), descriptionCourte: "", descriptionLongue: "", assigneeLe: new Date(), assigneeA: "", statut: "A faire"
    }
    this.createdDate ='';
    this.updatedDate ='';
    this.getProjets();
    this.onSelectChange();
  }
  onOpenModalUpdateTask(currentTask: Task) {
    this.titleModel = "Modifier";
    this.buttonType = false;
    this.currentTask = currentTask;
    this.getProjets();
    this.onSelectChange();
    this.createdDate = this.datePipe.transform(this.currentTask.createdAt, 'yyyy-MM-dd HH:mm:ss');
    this.updatedDate = this.datePipe.transform(this.currentTask.assigneeLe, 'yyyy-MM-dd HH:mm:ss');
  }
  onSelectChange() {
    if (this.currentTask.projetId) {
      this.getAnomalies();
      this.getOuvrages();
      this.getAmmenagements();
      this.getUsers();
    }
  }

  private getProjets() {
    this.projetService.getProjets().subscribe(resp => {
      this.projets = resp;
    }, error => {
      console.log(error);
    });
  }

  private getAnomalies() {
    if (this.currentTask.projetId)
      this.anomalieService.getAnomaliesByProjetId(this.currentTask.projetId).subscribe(resp => {
        this.anomalies = resp;
      }, error => {
        console.log(error);
      })
  }
  private getOuvrages() {
    if (this.currentTask.projetId)
      this.ouvrageService.getOuvragesHydrauliquesByProjetId(this.currentTask.projetId).subscribe(resp => {
        this.ouvrages = resp;
      }, error => {
        console.log(error);
      })
  }
  private getAmmenagements() {
    if (this.currentTask.projetId)
      this.ammenagementService.getAmenagementsProposesByProjectId(this.currentTask.projetId).subscribe(resp => {
        this.ammenagements = resp;
      }, error => {
        console.log(error);
      })
  }
  private getUsers() {
    this.userService.getUsers().subscribe(resp => {
      this.Users = resp;
    })
  }


  onDeleteTask(id: string | undefined) {
    if (id)
      this.taskService.deleteTask(id).subscribe(resp => {
        this.getTasks();
      })
  }
  onAddTask() {
    this.taskService.createTask(this.currentTask).subscribe(resp => {
      this.getTasks();
    }, error => {
      console.log(error);
    })
  }
  onUpdateTask() {
    if (this.currentTask.id) {
      this.taskService.updateTask(this.currentTask.id, this.currentTask).subscribe(resp => {
        this.getTasks();
      })
    }
  }

  onselectAnomalie() {
    if (this.currentTask.anomalieId === "") {
      this.currentTask.anomalieId = null;
    }
  }
  onselectOuvrages() {
    if (this.currentTask.ouvrageId === "") {
      this.currentTask.ouvrageId = null;
    }
  }
  onselectAmenagements() {
    if (this.currentTask.amenagementId === "") {
      this.currentTask.amenagementId = null;
    }
  }

}
