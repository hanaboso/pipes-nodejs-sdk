import DIContainer from '../DIContainer/Container';
import { ICommonNode } from './ICommonNode';

export default class CommonLoader {
  // eslint-disable-next-line no-useless-constructor
  constructor(private _container: DIContainer) {
  }

  public get(prefix: string, name: string): ICommonNode {
    return this._container.get(`${prefix}.${name}`);
  }

  public getList(prefix: string): Array<string> {
    const connectors: Array<string> = [];
    this._container.getAllByPrefix(prefix).forEach((node: ICommonNode) => {
      connectors.push(node.getName());
    });

    return connectors;
  }
}
