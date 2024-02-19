import { Component } from '@angular/core';
import { ProjetService } from '../projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from '../projet.model';
import { Client } from 'src/app/client-management/client.model';
import { ClientService } from 'src/app/client-management/client.service';
import { UserService } from 'src/app/user-management/user.service';
import { Anomalie } from '../anomalie.model';
import { AnomalieService } from '../anomalie.service';
import { CodeStandardService } from 'src/app/code-standard/code-standard.service';
import { CodeStandard } from 'src/app/code-standard/codestandard.model';
import { OuvragesHydrauliques, OuvragesHydrauliquesData } from '../ouvrageshydrauliques.model';
import { OuvrageshydrauliquesService } from '../ouvrageshydrauliques.service';
import { DonnesTroconsService } from '../donnes-trocons.service';
import { DonneTrocons } from '../donne-trocons.model';
import { AmenagementsProposes } from '../ammenagements.model';
import { AmenagementsService } from '../ammenagements.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-projet',
  templateUrl: './add-edit-projet.component.html',
  styleUrls: ['./add-edit-projet.component.scss']
})
export class AddEditProjetComponent {

  isReadonly: boolean = false; // Toggle to enable/disable input fields
  projetId!: string; // Holds the project ID if editing an existing project
  projet: Projet = {
    nuProjet: '',
    titre: '',
    description: '',
    numeroAppelOffre: '',
    typeProjet: 'Génie de la Construction',
    lineaire: 0.00, // sample value
    pointDepart: '',
    pointArrivee: '',
    dateDebut: new Date(), // sample value
    dateFin: new Date(), // sample value
    contactPrincipale: '',
    adresseMail: '',
    numeroTelephone: '',
    adresse: '',
    modeCommunicationPrefere: 'Mail',
    clientId: '',
    ChefOfprojet: '',
  };
  dateCreation : string | null ='';
  clients: Client[] = [];
  users: any[] = [];
  editMode!: boolean;
  popupImage = '';
  uploadImage = '';

  //// Anomalie Variable ////
  Anomalies: Anomalie[] = [];
  CodesStandardAnomalie: CodeStandard[] = [];
  currentAnomalie: Anomalie = { typeAnomalieId: '', etatAnomalie: '', projetId: this.projetId };
  titlemodelAnomalie = '';
  buttonTypeAnomalie!: boolean;

  //// ouvrages hydrauliques Variable ////
  existingHydraulics: OuvragesHydrauliquesData[] = [];
  CodesStandardOuvragesTypes: CodeStandard[] = [];
  CodesStandardOuvragesEtat: CodeStandard[] = [];
  currentExistingHydraulic: OuvragesHydrauliques = { projetId: this.projetId, typeId: '', coordonneesX: 0.00, coordonneesY: 0.00, etatIds: [], };
  titlemodelExistingHydraulic = '';
  buttonTypeExistingHydraulic!: boolean;

  //// Donnes de Troçons////
  DonnesTrocons: DonneTrocons[] = [];
  currentDonnesTrocons: DonneTrocons = {
    projetId: this.projetId, pointDepart: '',
    pointArrivee: '', lineaire: 0.00, largeur: 0.00, gnbProjet: 0.00, gnfProjet: 0.00,
  };
  titlemodelDonnesTrocon = '';
  buttonTypeDonnesTrocon!: boolean;

  ///// AmenagementsProposes ///////
  AmenagementsProposes : AmenagementsProposes[] =[];
  currentAmenagementsProposes : AmenagementsProposes = {projetId : this.projetId};
  CodesAmenagementsProposes : CodeStandard[] = [];
  titlemodelAmenagementsPropose = '';
  buttonTypeAmenagementsPropose!: boolean;
  typeAmmenagement !: boolean;

  constructor(private router : Router,private route: ActivatedRoute, private projectService: ProjetService, private clientService: ClientService,
    private userService: UserService, private anomalieService: AnomalieService, private codeStandardService: CodeStandardService,
    private ouvrageHydrauliquesService: OuvrageshydrauliquesService, private donnesTroconService: DonnesTroconsService,
    private ammenagementsService : AmenagementsService,private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.projetId = this.route.snapshot.params['id']; // Retrieve project ID from route parameters
    this.loadClients();
    this.loadUsers();
    if (this.projetId) {
      this.editMode = true;
      // If project ID is available, fetch the project details and set isReadonly to true (editing mode)
      this.projectService.getProjetById(this.projetId).subscribe(response => {
        this.projet = response;
        this.dateCreation = this.datePipe.transform(this.projet.createdAt, 'yyyy-MM-dd HH:mm:ss');
        // if (this.projet.planSituation) {
        //   this.convertBlobToBase64(this.projet.planSituation);
        // }
      }, error => {
        console.log(error);
      });
      this.getAnomalies();
      this.getCodeStandardAnomalie();
      this.getOuvragesHydrauliques();
      this.getDonnesTrocons();
      this.getAmenagements();
    }
  }


  private loadClients() {
    this.clientService.getClients().subscribe(response => {
      this.clients = response;
    }, error => {
      console.log(error);
    })
  }

  // convertBlobToBase64(bufferData: any) {
  //   // Convert buffer to Uint8Array
  //   const uintArray = new Uint8Array(bufferData.data);

  //   // Convert Uint8Array to Blob
  //   const blob = new Blob([uintArray], { type: 'image/jpeg' }); // Adjust the MIME type accordingly

  //   // Convert Blob to Base64
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     this.uploadImage = reader.result as string;
  //   };
  //   reader.readAsDataURL(blob);
  // }

  private loadUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }

  // Method to handle saving/updating the project
  saveProject() {
    if (this.editMode) {
      // If editing an existing project, call the service method to update the project
      this.projectService.updateProjet(this.projetId, this.projet).subscribe(response => {
        this.projet = response;
        // if (this.projet.planSituation)
        //   this.uploadImage = URL.createObjectURL(this.projet.planSituation);
      }, error => {
        console.log(error);
      });
    } else {
      // If adding a new project, call the service method to add the project
      this.projectService.createProjet(this.projet).subscribe(response => {
        this.projet = response;
        this.router.navigate(['projects/edit/',this.projet.id]);
        // if (this.projet.planSituation)
        //   this.uploadImage = URL.createObjectURL(this.projet.planSituation);
      }, error => {
        console.log(error);
      });
    }
  }
  onSelectClient(){
    const client = this.clients.find(e=>e.id===this.projet.clientId);
    this.projet.contactPrincipale = client?.prenom_contact_principal+' '+client?.nom_contact_principal;
    this.projet.adresseMail = client?.adresse_email;
    this.projet.numeroTelephone = client?.telephone;
    this.projet.adresse = client?.adresse;
  }
  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.projet.planSituation = e.target.result
        this.uploadImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  openPopup() {
    this.popupImage = this.uploadImage;
  }

  closePopup() {
    this.popupImage = '';
  }
  ////////////////////////////// Anomalies ///////////////////////////////////////////////
  getAnomalies() {
    this.anomalieService.getAnomaliesByProjetId(this.projetId).subscribe(resp => {
      this.Anomalies = resp;
    }, error => {
      this.Anomalies = [];
      console.log('error anomalie', error);
    })
  }

  onOpenModalToAddAnomalie() {
    this.titlemodelAnomalie = 'Ajouter';
    this.buttonTypeAnomalie = true;
    this.currentAnomalie = { typeAnomalieId: '', etatAnomalie: '', projetId: this.projetId };
    this.getCodeStandardAnomalie();
  }
  onOpenMdalToUpdateAnomalie(currentAnomalie: any) {
    this.titlemodelAnomalie = 'Modifier';
    this.buttonTypeAnomalie = false;
    this.currentAnomalie = currentAnomalie;
    this.getCodeStandardAnomalie();
  }
  formatTypeAnomalie(id: string): string | null | undefined {
    var description = this.CodesStandardAnomalie.find((e: any) => e.id === id)?.description;
    return description;
  }
  private getCodeStandardAnomalie() {
    this.codeStandardService.getCodeStandardByType('Anomalie').subscribe(resp => {
      this.CodesStandardAnomalie = resp;
    }, error => {
      console.log(error);
    })
  }
  onAddAnomalie() {
    this.anomalieService.createAnomalie(this.currentAnomalie).subscribe(resp => {
      this.getAnomalies();
    }, error => {
      console.log(error);
    });
  }
  onDelete(id: string | undefined) {
    if (id)
      this.anomalieService.deleteAnomalie(id).subscribe(resp => {
        this.getAnomalies();
      }, error => {
        console.log(error);
      });
  }

  onUpdate() {
    if (this.currentAnomalie.id)
      this.anomalieService.updateAnomalie(this.currentAnomalie.id, this.currentAnomalie).subscribe(resp => {
        this.getAnomalies();
      }, error => {
        console.log(error);
      });
  }

  /////////////////////////// Ouvrages Hydrauliques ////////////////////////////////////
  private getOuvragesHydrauliques() {
    this.ouvrageHydrauliquesService.getOuvragesHydrauliquesByProjetId(this.projetId).subscribe(resp => {
      this.existingHydraulics = resp;
    }, error => {
      this.existingHydraulics = [];
      console.log('error existingHydraulics', error);
    })
  }
  onOpenModalToAddExistingHydraulic() {
    this.titlemodelExistingHydraulic = 'Ajouter';
    this.buttonTypeExistingHydraulic = true;
    this.currentExistingHydraulic = { projetId: this.projetId, typeId: '', coordonneesX: 0.00, coordonneesY: 0.00, etatIds: [], };
    this.getCodeStandardExistingHydraulicType();
    this.getCodeStandardExistingHydraulicEtat();
  }
  onOpenMdalToUpdateExistingHydraulic(currentExistingHydraulic: OuvragesHydrauliquesData) {
    this.titlemodelExistingHydraulic = 'Modifier';
    this.buttonTypeExistingHydraulic = false;
    this.currentExistingHydraulic.projetId = this.projetId;
    this.currentExistingHydraulic.typeId = currentExistingHydraulic.typeId;
    this.currentExistingHydraulic.coordonneesX = currentExistingHydraulic.coordonneesX;
    this.currentExistingHydraulic.coordonneesY = currentExistingHydraulic.coordonneesY;
    this.currentExistingHydraulic.id = currentExistingHydraulic.id;
    this.currentExistingHydraulic.etatIds = currentExistingHydraulic.ouvragesHydrauliques_etats.map(e => e.codeStandardId);
    this.currentExistingHydraulic.numeroLigne = currentExistingHydraulic.numeroLigne;
    this.getCodeStandardExistingHydraulicType();
    this.getCodeStandardExistingHydraulicEtat();
  }

  private getCodeStandardExistingHydraulicType() {
    this.codeStandardService.getCodeStandardByType('Type ouvrage hydraulique').subscribe(resp => {
      this.CodesStandardOuvragesTypes = resp;
    }, error => {
      console.log(error);
    })
  }
  private getCodeStandardExistingHydraulicEtat() {
    this.codeStandardService.getCodeStandardByType('Etat ouvrage hydraulique').subscribe(resp => {
      this.CodesStandardOuvragesEtat = resp;
    }, error => {
      console.log(error);
    })
  }

  onAddExistingHydraulic() {
    this.currentExistingHydraulic.numeroLigne = this.existingHydraulics.length.toString();
    this.ouvrageHydrauliquesService.createOuvragesHydrauliques(this.currentExistingHydraulic).subscribe(resp => {
      this.getOuvragesHydrauliques();
    }, error => {
      console.log(error);
    });
  }
  onDeleteExistingHydraulic(id: string | undefined) {
    if (id)
      this.ouvrageHydrauliquesService.deleteOuvragesHydrauliques(id).subscribe(resp => {
        this.getOuvragesHydrauliques();
      }, error => {
        console.log(error);
      });
  }

  onUpdateExistingHydraulic() {
    if (this.currentExistingHydraulic.id) {
      var id = this.currentExistingHydraulic.id
      this.currentExistingHydraulic.ouvragesHydrauliques_etats = this.currentExistingHydraulic.etatIds.map(
        function (e: string) {
          return { "codeStandardId": e, "ouvragesHydrauliquesId": id }
        });
      this.ouvrageHydrauliquesService.updateOuvragesHydrauliques(this.currentExistingHydraulic.id, this.currentExistingHydraulic).subscribe(resp => {
        this.getOuvragesHydrauliques();
      }, error => {
        console.log(error);
      });
    }
  }
  //////////////////////////////////////////// DonnnesDeTrocons //////////////////////////////////////

  private getDonnesTrocons() {

    this.donnesTroconService.getDonneTroconsByProjetId(this.projetId).subscribe(resp => {
      this.DonnesTrocons = resp;
    }, error => {
      console.log(error);
    });
  }

  onOpenModalToAddDonnesTrocons() {
    this.titlemodelDonnesTrocon = 'Ajouter';
    this.buttonTypeDonnesTrocon = true;
    this.currentDonnesTrocons = {
      projetId: this.projetId, pointDepart: '',
      pointArrivee: '', lineaire: 0.00, largeur: 0.00, gnbProjet: 0.00, gnfProjet: 0.00,
    };
  }
  onOpenMdalToUpdateDonnesTrocons(currentDonnesTrocons: any) {
    this.titlemodelDonnesTrocon = 'Modifier';
    this.buttonTypeDonnesTrocon = false;
    this.currentDonnesTrocons = currentDonnesTrocons;
  }
  onAddDonnesTrocons() {
    this.donnesTroconService.createDonneTrocons(this.currentDonnesTrocons).subscribe(resp => {
      this.getDonnesTrocons();
    }, error => {
      console.log(error);
    })
  }
  onUpdateDonnesTrocons() {
    if (this.currentDonnesTrocons.id)
      this.donnesTroconService.updateDonneTrocons(this.currentDonnesTrocons.id, this.currentDonnesTrocons).subscribe(resp => {
        this.getDonnesTrocons();
      })
  }
  onDeleteDonnesTrocons(id: string | undefined) {
    if (id)
      this.donnesTroconService.deleteDonneTrocons(id).subscribe(resp => {
        this.getDonnesTrocons();
      }, error => {
        console.log(error);
      })
  }

  ////////////////////// Amménagement Proposées ///////////////

  private getAmenagements(){
    this.ammenagementsService.getAmenagementsProposesByProjectId(this.projetId).subscribe(resp=>{
      this.AmenagementsProposes = resp;
    },error=>{
      console.log("error amenagement " , error);
    })
  }
  private getAmenagementsProposes(codestandard : string){
    this.codeStandardService.getCodeStandardByType(codestandard).subscribe(resp=>{
      this.CodesAmenagementsProposes = resp;
    },error=>{
      console.log(error);
    })
  }
  onOpenModalToAddAmenagements() {
    this.titlemodelAmenagementsPropose = 'Ajouter';
    this.buttonTypeAmenagementsPropose = true;
    this.currentAmenagementsProposes = {projetId : this.projetId};
  }
  onOpenMdalToUpdateAmenagements(currentAmenagements: any) {
    this.titlemodelAmenagementsPropose = 'Modifier';
    this.buttonTypeAmenagementsPropose = false;
    this.currentAmenagementsProposes = currentAmenagements;
  }
  onSelectChangeAmmenagements(){
    if(this.currentAmenagementsProposes.type==="Ouvrage hydraulique"){
      this.typeAmmenagement=true;
      this.getOuvragesHydrauliques();
      this.getAmenagementsProposes("Aménagement proposé – Ouvrage hydraulique");
    }else if(this.currentAmenagementsProposes.type==="Corps de la chaussée"){
      this.typeAmmenagement=false;
      this.getAnomalies();
      this.getAmenagementsProposes("Aménagement proposé – Corps de la chaussée");
    }
  }

  onAddAmmenagements(){
    this.ammenagementsService.createAmenagementPropose(this.currentAmenagementsProposes).subscribe(resp=>{
        this.getAmenagements();
    },error=>{
      console.log(error);
    })
  }
  OnDeleteAmmenagements(id : string | undefined){
    if(id)
    this.ammenagementsService.deleteAmenagementPropose(id).subscribe(resp=>{
      this.getAmenagements();
    },error=>{
      console.log(error);
    })
  }

  onUpdateAmenagements(){
    if(this.currentAmenagementsProposes.id)
    this.ammenagementsService.updateAmenagementPropose(this.currentAmenagementsProposes.id,this.currentAmenagementsProposes).subscribe(resp=>{
      this.getAmenagements();
    },error=>{
      console.log(error);
    })
  }


}
