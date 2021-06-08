import dateFormat from 'dateformat';

export const DATE_TIME = 'yyyy-mm-dd hh:MM:ss';

export default class DateTimeUtils {
  public static get utcDate(): Date {
    return new Date(new Date().toUTCString());
  }

  public static getFormattedDate(date: Date, format: string): string {
    return dateFormat(date, format);
  }
}
