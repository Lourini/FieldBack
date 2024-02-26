import { User } from "./user.model";

export interface Task{
    id?: string;
    projetId: string;
    anomalieId: string | null;
    ouvrageId: string | null;
    amenagementId: string | null;
    numeroTache: number;
    creeeLe: Date;
    creeePar: string;
    descriptionCourte: string;
    descriptionLongue: string;
    assigneeLe: Date | null;
    assigneeA: string | null;
    statut: 'A faire' | 'Traitee' | 'En cours';
    createdBy ?: User;
    assignedTo ?: User;
    createdAt?: string;
    updatedAt?:string;
    endDate : Date;
    startDate : Date;
}