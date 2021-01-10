import DIContainer from '../DIContainer/Container';
import { ICommonNode } from './ICommonNode';

export default class CommonNodeLoader {
    private container: DIContainer;

    constructor(container: DIContainer) {
      this.container = container;
    }

    public get(prefix: string, name: string): ICommonNode {
      return this.container.get(`${prefix}.${name}`);
    }

    public getList(prefix: string): Array<string> {
      const connectors: Array<string> = [];
      this.container.getAllByPrefix(prefix).forEach((node: ICommonNode) => {
        connectors.push(node.getName());
      });

      return connectors;
    }
}
