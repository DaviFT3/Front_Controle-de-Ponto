import { DashboardDates } from "./dashboard-dates";
export class Schedules{
  entryDate?: Date;
  lunchTimeDate?: Date;
  returnLunchTimeDate?: Date;
  departureTimeDate?: Date;
  workedHours?: number;
  collaboratorId?: number;
  entryHours?: number;

  entryTime?: string;
  lunchTime?: string;
  lunchReturnTime?: string;
  departureTime?: string;
  dashboardDates? : DashboardDates;
  dayOfTheWeek? : string;
}
