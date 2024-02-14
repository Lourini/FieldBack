export interface OuvragesHydrauliques{
    id?: string;
    projetId: string;
    numeroLigne?: string | null;
    typeId: string;
    coordonneesX: number;
    coordonneesY: number;
    etatIds: string[];
    ouvragesHydrauliques_etats?: any[];
}


interface CodeStandard {
    id: string;
    code: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface OuvragesHydrauliquesEtat {
    ouvragesHydrauliquesId: string;
    codeStandardId: string;
    createdAt: string;
    updatedAt: string;
    codeStandard: CodeStandard;
  }
  
  export interface OuvragesHydrauliquesData {
    id: string;
    projetId: string;
    numeroLigne: string;
    typeId: string;
    coordonneesX: number;
    coordonneesY: number;
    createdAt: string;
    updatedAt: string;
    type: CodeStandard;
    ouvragesHydrauliques_etats: OuvragesHydrauliquesEtat[];
  }
  