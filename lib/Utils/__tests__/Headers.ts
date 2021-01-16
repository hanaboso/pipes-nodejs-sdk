import {
  HttpHeaders, NODE_ID, createKey, get, clear, getCorrelationId, getNodeId, getProcessId, getParentId, getSequenceId,
} from '../Headers';

const mockedHeaders: HttpHeaders = {
  'pf-node-id': 'nodeId',
  'pf-correlation-id': 'correlationId',
  'pf-process-id': 'processId',
  'pf-parent-id': 'parentId',
  'pf-sequence-id': '1',
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
});
