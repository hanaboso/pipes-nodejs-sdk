import {
  HttpHeaders,
  NODE_ID,
  createKey,
  get,
  clear,
  getCorrelationId,
  getNodeId,
  getProcessId,
  getParentId,
  getSequenceId,
  getRepeatHops,
  getRepeaterMaxHops,
} from '../Headers';

const mockedHeaders: HttpHeaders = {
  'pf-node-id': 'nodeId',
  'pf-correlation-id': 'correlationId',
  'pf-process-id': 'processId',
  'pf-parent-id': 'parentId',
  'pf-sequence-id': '1',
  'pf-repeat-hops': '2',
  'pf-repeat-max-hops': '10',
  fake: 'header',
};

describe('Test headers utils', () => {
  it('createKey', () => {
    const k = createKey('new-test-key');
    expect(k).toEqual('pf-new-test-key');
  });

  it('get header by key', () => {
    const v = get(NODE_ID, mockedHeaders);
    expect(v).toEqual('nodeId');
  });

  it('get non-exist key in headers', () => {
    const v = get('non-exist', mockedHeaders);
    expect(v).toBeUndefined();
  });

  it('clear unsupported headers', () => {
    const cleanedHeaders = clear(mockedHeaders);
    expect(cleanedHeaders).toEqual(
      {
        'pf-node-id': 'nodeId',
        'pf-correlation-id': 'correlationId',
        'pf-process-id': 'processId',
        'pf-parent-id': 'parentId',
        'pf-sequence-id': '1',
        'pf-repeat-hops': '2',
        'pf-repeat-max-hops': '10',
      },
    );
  });

  it('getCorrelationId', () => {
    const v = getCorrelationId(mockedHeaders);
    expect(v).toEqual('correlationId');
  });

  it('getNodeId', () => {
    const v = getNodeId(mockedHeaders);
    expect(v).toEqual('nodeId');
  });

  it('getProcessId', () => {
    const v = getProcessId(mockedHeaders);
    expect(v).toEqual('processId');
  });

  it('getParentId', () => {
    const v = getParentId(mockedHeaders);
    expect(v).toEqual('parentId');
  });

  it('getSequenceId', () => {
    const v = getSequenceId(mockedHeaders);
    expect(v).toEqual(1);
  });

  it('getSequenceId if not exist', () => {
    const updatedHeaders = mockedHeaders;
    delete (updatedHeaders['pf-sequence-id']);
    const v = getSequenceId(updatedHeaders);
    expect(v).toEqual(0);
  });

  it('getRepeatHops', () => {
    const v = getRepeatHops(mockedHeaders);
    expect(v).toEqual(2);
  });

  it('getRepeatHops if not exist', () => {
    const updatedHeaders = mockedHeaders;
    delete (updatedHeaders['pf-repeat-hops']);
    const v = getRepeatHops(updatedHeaders);
    expect(v).toEqual(0);
  });

  it('getRepeaterMaxHops', () => {
    const v = getRepeaterMaxHops(mockedHeaders);
    expect(v).toEqual(10);
  });

  it('getRepeaterMaxHops if not exist', () => {
    const updatedHeaders = mockedHeaders;
    delete (updatedHeaders['pf-repeat-max-hops']);
    const v = getRepeaterMaxHops(updatedHeaders);
    expect(v).toEqual(0);
  });
});
