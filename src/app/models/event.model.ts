export interface Event {
    id?: string;
    title: string;
    startDate: Date;
    endDate: Date;
    projectId: string; // Assuming this is the ID of the project associated with the event
  }
  