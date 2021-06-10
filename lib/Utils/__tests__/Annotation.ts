import Annotation from '../Annotation';
import TestBasicApplication from '../../../test/Application/TestBasicApplication';

describe('Annotation utils tests', () => {
  it('getAllMethods ', () => {
    const listSyncMethod = Annotation.getAllMethods(new TestBasicApplication());
    expect(listSyncMethod.length > 0).toBeTruthy();
    expect(listSyncMethod[0]).toEqual('testSyncMethod');
  });
});
