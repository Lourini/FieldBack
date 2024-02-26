export interface Projet {
    id?: string;
    nuProjet: string;
    titre: string;
    description?: string;
    numeroAppelOffre?: string;
    typeProjet: 'Génie de la Construction' | 'Génie Environnemental' | 'Génie Ferroviaire' | 'Génie Géotechnique' | 'Génie Hydraulique' | 'Génie Maritime' | 'Génie des Ponts' | 'Génie Routier' | 'Génie Sismique' | 'Génie des Structures' | 'Génie Urbain';
    lineaire?: number;
    pointDepart?: string;
    pointArrivee?: string;
    planSituation?: any;
    dateDebut?: Date;
    dateFin?: Date;
    contactPrincipale?: string;
    adresseMail?: string;
    numeroTelephone?: string;
    adresse?: string;
    modeCommunicationPrefere?: 'Mail' | 'Téléphone';
    clientId?: string;
    ChefOfprojet?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
