export interface Survey {
  _id: string;
  team: string;
  title: string;
  description: string;
  targetAudience: string;
  questions: any[];
  isActive: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
