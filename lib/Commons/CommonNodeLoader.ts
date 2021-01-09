import DIContainer from '../DIContainer/Container';
import { CommonNode } from './CommonNode';

export default class CommonNodeLoader {
    private container: DIContainer;

    constructor(container: DIContainer) {
      this.container = container;
    }

    public get(prefix: string, name: string): CommonNode {
      return this.container.get(`${prefix}.${name}`);
    }

    public getList(prefix: string): Array<string> {
      const connectors: Array<string> = [];
      this.container.getAllByPrefix(prefix).forEach((node: CommonNode) => {
        connectors.push(node.getName());
      });

      return connectors;
    }
}
