import ProcessDTO from '../ProcessDTO';
import ResultCode from '../ResultCode';

describe('Tests ProcessDTO utils', () => {
  it('GetData', () => {
    const json = '{"some": "data"}';
    const dto = new ProcessDTO();
    dto.setData(json);

    expect(dto.getData()).toEqual(json);
  });

  it('GetJsonData', () => {
    const dto = new ProcessDTO();
    dto.setData('{"some": "data"}');

    expect(dto.getJsonData()).toEqual({ some: 'data' });
  });

  it('setJson', () => {
    const dto = new ProcessDTO();
    dto.setJsonData({ some: 'data' });

    expect(dto.getJsonData()).toEqual({ some: 'data' });
  });

  it('GetHeaders', () => {
    const dto = new ProcessDTO();
    dto.setHeaders({ 'pf-some': 'header' });

    expect(dto.getHeaders()).toEqual({ 'pf-some': 'header' });
  });

  it('GetHeader', () => {
    const dto = new ProcessDTO();
    dto.setHeaders({ 'pf-some': 'header' });

    expect(dto.getHeader('pf-some')).toEqual('header');
    expect(dto.getHeader('pf-none', 'default')).toEqual('default');
  });

  it('addHeader', () => {
    const dto = new ProcessDTO();
    dto.addHeader('new', 'n-header');

    expect(dto.getHeader('new')).toEqual('n-header');
  });

  it('removeHeader', () => {
    const dto = new ProcessDTO();
    dto.addHeader('new', 'n-header');
    dto.removeHeader('new');

    expect(dto.getHeader('new')).toBeUndefined();
  });

  it('removeHeaders', () => {
    const dto = new ProcessDTO();
    dto.addHeader('new', 'n-header');
    dto.removeHeaders();

    expect(dto.getHeaders()).toEqual({});
  });

  it('setSuccessProcess', () => {
    const dto = new ProcessDTO();
    dto.setSuccessProcess('ok');

    expect(dto.getHeader('pf-result-code')).toEqual('0');
    expect(dto.getHeader('pf-result-message')).toEqual('ok');
  });

  it('setSuccessProcess without message', () => {
    const dto = new ProcessDTO();
    dto.setSuccessProcess();

    expect(dto.getHeader('pf-result-code')).toEqual('0');
    expect(dto.getHeader('pf-result-message')).toBeUndefined();
  });

  it('setStopProcess', () => {
    const dto = new ProcessDTO();
    dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'nok');

    expect(dto.getHeader('pf-result-code')).toEqual('1006');
    expect(dto.getHeader('pf-result-message')).toEqual('nok');
  });

  it('setStopProcess with unsupported ResultCode', () => {
    const dto = new ProcessDTO();
    expect(() => dto.setStopProcess(10000, 'nok')).toThrow(Error);
  });

  it('setRepeater and removeRepeater', () => {
    const dto = new ProcessDTO();
    dto.setRepeater(2, 20, 10, 'rep-queue', 'rep-message');

    expect(dto.getHeader('pf-repeat-interval')).toEqual('2');
    expect(dto.getHeader('pf-repeat-hops')).toEqual('10');
    expect(dto.getHeader('pf-repeat-max-hops')).toEqual('20');
    expect(dto.getHeader('pf-repeat-queue')).toEqual('rep-queue');
    expect(dto.getHeader('pf-result-code')).toEqual('1001');
    expect(dto.getHeader('pf-result-message')).toEqual('rep-message');

    dto.removeRepeater();
    expect(dto.getHeader('pf-repeat-interval')).toBeUndefined();
    expect(dto.getHeader('pf-repeat-hops')).toBeUndefined();
    expect(dto.getHeader('pf-repeat-max-hops')).toBeUndefined();
    expect(dto.getHeader('pf-repeat-queue')).toBeUndefined();
  });

  it('setRepeater without optional attributes', () => {
    const dto = new ProcessDTO();
    dto.setRepeater(3, 30);

    expect(dto.getHeader('pf-result-code')).toEqual('1001');
    expect(dto.getHeader('pf-repeat-interval')).toEqual('3');
    expect(dto.getHeader('pf-repeat-max-hops')).toEqual('30');
    expect(dto.getHeader('pf-repeat-hops')).toBeUndefined();
    expect(dto.getHeader('pf-repeat-queue')).toBeUndefined();
    expect(dto.getHeader('pf-result-message')).toEqual('Repeater applied.');
  });

  it('setRepeater with unsupported parameters', () => {
    const dto = new ProcessDTO();
    expect(() => dto.setRepeater(-1, 1)).toThrow(Error);
    expect(() => dto.setRepeater(1, -1)).toThrow(Error);
  });

  it('increment current repeaterHop', () => {
    const dto = new ProcessDTO();
    dto.setRepeater(1, 2);
    expect(dto.getHeader('pf-repeat-hops')).toBeUndefined();

    dto.incrementRepeaterHop();
    expect(dto.getHeader('pf-repeat-hops')).toEqual('1');
  });

  it('setLimiter and removeLimiter', () => {
    const dto = new ProcessDTO();
    dto.setLimiter('limit-key|user', 60, 10000);

    expect(dto.getHeader('pf-limiter-key')).toEqual('limit-key|user;60;10000');

    dto.removeLimiter();
    expect(dto.getHeader('pf-limiter-key')).toBeUndefined();
  });

  it('setLimiter without optional attributes', () => {
    const dto = new ProcessDTO();
    dto.setLimiterWithGroup('limit-key2', 30, 5000, 'group1', 200, 4444);

    expect(dto.getHeader('pf-limiter-key')).toEqual('limit-key2|;30;5000;group1|;200;4444');
  });
});
