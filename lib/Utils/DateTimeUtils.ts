import dateFormat from 'dateformat';

export default class DateTimeUtils {
    public static DATE_TIME = 'yyyy-mm-dd hh:MM:ss';

    public static get utcDate(): Date {
      return new Date(new Date().toUTCString());
    }

    public static getFormatedDate(date: Date, format: string): string {
      return dateFormat(date, format);
    }
}
