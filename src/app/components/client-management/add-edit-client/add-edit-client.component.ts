import { Component } from '@angular/core';
import { Client, ZoneEtude, TypeOfConstruction } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent {
  public isReadonly: boolean = false;
  formSubmitted: boolean = false;
  editMode: boolean = false;
  clientId: string  | null = null;
  ClientId ="";
  client: Client = {
    numClient: '',
    denomination: '',
    adresse: '',
    adresse_2eme_ligne: '',
    pays: '',
    province: '',
    ville: '',
    code_postal: '',
    telephone: '',
    telephone_mobile: '',
    adresse_email: '',
    prenom_contact_principal: '',
    nom_contact_principal: '',
  };
  zoneEtude: ZoneEtude = {
    chefLieu: '',
    caidat: '',
    cercle: '',
    superficieTotale: 0,
    nord: '',
    sud: '',
    est: '',
    ouest: '',
    typeClimat: 'Froid',
    pluviometrieMoyenneAnnuelle: 0,
    temperatureMoyenneAnnuelle: 0,
    temperatureMinimaleAnnuelle: 0,
    temperatureMaximaleAnnuelle: 0,
    ventsKmH: 0,
    altitudeMaximale: 0,
    altitudeMoyenne: 0,
    altitudeMinimale: 0,
    pourcentageHabitatsGroupes: 0,
    pourcentageHabitatsDisperses: 0,
    
  }

typeOfConstructions : TypeOfConstruction[] = [{
    "name": "Commune entière", "Endure": "", "Enpise": "", "Autre": "", "zoneEtudeId": ""
  },
  { "name": "Chef-lieu de la commune", "Endure": "", "Enpise": "", "Autre": ""}];

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    if (this.clientId) {
      this.ClientId = this.clientId;
      this.editMode = true;
      this.loadClient();
    }
  }

  private loadClient(): void {
    if (this.clientId) {
      this.clientService.getClientById(this.clientId).subscribe(
        response => {
          this.client = response.client;
          this.zoneEtude = response.zoneEtude;
          this.typeOfConstructions = response.typeOfConstruction;
        },
        error => {
          console.log('Error fetching client:', error);
        }
      );
    }
  }

  saveClient(): void {
    this.formSubmitted = this.isFormValid();
    if (this.formSubmitted) {
      if (this.editMode) {
        this.updateClient();
      } else {
        this.addClient();
      }
    }
  }

  private addClient(): void {
    this.clientService.createClient(this.client,this.zoneEtude,this.typeOfConstructions).subscribe(
      (response) => {
        console.log('Client added successfully.');
        // Show success message in French here
        this.client = response.client;
        this.zoneEtude = response.zoneEtude;
        this.typeOfConstructions = response.typeOfConstruction;
        this.router.navigate(['/clients/edit', response.client.id]);
      },
      error => {
        console.log('Error adding client:', error);
      }
    );
  }

  private updateClient(): void {
    if (this.clientId) {
      this.clientService.updateClient(this.clientId, this.client,this.zoneEtude,this.typeOfConstructions).subscribe(
        () => {
          console.log('Client updated successfully.');
          // Show success message in French here
          //this.router.navigate(['/client-list']);
        },
        error => {
          console.log('Error updating client:', error);
        }
      );
    }
  }

  public isFormValid(): boolean {
    // Check if all required fields are not null or empty
    return (
      this.client.numClient.trim() !== '' &&
      this.client.denomination.trim() !== '' &&
      this.client.adresse.trim() !== '' &&
      this.client.pays.trim() !== '' &&
      this.client.ville.trim() !== '' &&
      this.client.code_postal.trim() !== '' &&
      this.client.telephone.trim() !== '' &&
      this.client.telephone_mobile.trim() !== '' &&
      this.client.adresse_email.trim() !== '' &&
      this.client.prenom_contact_principal.trim() !== '' &&
      this.client.nom_contact_principal.trim() !== ''
      // Add additional checks for other required fields if needed
    );
  }

  formatInput(typecst: any, property: string) {
    // Get the input value
    let value = typecst[property];
    value = value.replace('%', '');
    // Check if the value is a number
    if (!isNaN(Number(value))) {
      // Add a percentage sign if it's a number
      typecst[property] = value + '%';
    } else {
      // Keep the input value unchanged if it's not a number
      typecst[property] = '';
    }
  }

}
