import { CodeStandard } from "./codestandard.model";

export interface AmenagementsProposes {

    id?: string;
    projetId: string;
    type?: 'Ouvrage hydraulique' | 'Corps de la chaussée';
    designationId?: string;
    amenagementId?: string;
    designation ?: CodeStandard;
    amenagement ?: CodeStandard;
    // Timestamps
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

