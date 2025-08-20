import { InscritFormationUser } from "./InscritFormationUser";

export interface Notification {
 id: number;
  userId: string;
  message: string;
  isRead: boolean;
  dateNotification: Date;
  inscription?: InscritFormationUser;
}