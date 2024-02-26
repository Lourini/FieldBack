
export interface Client {
    id?: string;
    numClient: string;
    denomination: string;
    adresse: string;
    adresse_2eme_ligne?: string;
    pays: string;
    province?: string;
    ville: string;
    code_postal: string;
    telephone: string;
    telephone_mobile: string;
    adresse_email: string;
    prenom_contact_principal: string;
    nom_contact_principal: string;
  }
  
  export interface ZoneEtude {
    id?: string;
    chefLieu: string;
    caidat: string;
    cercle: string;
    superficieTotale: number;
    nord: string;
    sud: string;
    est: string;
    ouest: string;
    typeClimat: 'Froid' | 'Tempéré' | 'Continental' | 'Tropical' | 'Désertique';
    pluviometrieMoyenneAnnuelle: number;
    temperatureMoyenneAnnuelle: number;
    temperatureMinimaleAnnuelle: number;
    temperatureMaximaleAnnuelle: number;
    ventsKmH: number;
    altitudeMaximale: number;
    altitudeMoyenne: number;
    altitudeMinimale: number;
    pourcentageHabitatsGroupes: number;
    pourcentageHabitatsDisperses: number;
  }
  

  export interface TypeOfConstruction {
    id?: string;
    name: string;
    Endure: string;
    Enpise: string;
    Autre: string;
    zoneEtudeId? : string;
  }