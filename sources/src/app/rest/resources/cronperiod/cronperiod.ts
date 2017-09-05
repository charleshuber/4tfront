import { Resource } from '../resource';

export class CronPeriod extends Resource {
  public expSeconds: string;
  public expMinutes: string;
  public expHours: string;
  public expDaysOfMonths: string;
  public expMonths: string;
  public expDaysOfWeeks: string;
  public expYears: string;
  
  public seconds: number;
  public minutes: number;
  public hours: number;
  public days: number;
  public months: number;
  public years: number;
}
