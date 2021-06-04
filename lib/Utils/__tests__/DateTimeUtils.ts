import DateTimeUtils from '../DateTimeUtils';

describe('DateTimeUtils tests', () => {
  it('utcDate', () => {
    const date = DateTimeUtils.utcDate;
    expect(date).toBeDefined();
    expect(date).toBeInstanceOf(Date);
  });
  it('getFormatedDate', () => {
    const date = new Date(2021, 5, 4, 10, 30, 15);
    const formated = DateTimeUtils.getFormatedDate(date, DateTimeUtils.DATE_TIME);
    expect(formated).toBeDefined();
    expect(formated).toEqual('2021-06-04 10:30:15');
  });
});
