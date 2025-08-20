import { InscritFormationUser } from "./InscritFormationUser";

export interface Presence {
  id?: number;
  inscrit: InscritFormationUser;
  datePresence: Date;
  estPresent: boolean;
}