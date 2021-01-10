/* eslint-disable @typescript-eslint/no-explicit-any */
interface Container {
    get(name: string): any;
    getAllByPrefix(prefix: string): Array<any>;
    set(name: string, service: any): void;
    has(name: string): boolean;
}

export default class DIContainer implements Container {
    private services: Map<string, any>;

    constructor() {
      this.services = new Map<string, any>();
    }

    get(name: string): any {
      if (this.has(name)) {
        return this.services.get(name);
      }

      throw new Error(`Service with name "${name}" does not exist!`);
    }

    getAllByPrefix(prefix: string): Array<any> {
      const services: Array<any> = [];
      this.services.forEach((value, key) => {
        if (key.startsWith(prefix)) {
          services.push(value);
        }
      });

      return services;
    }

    has(name: string): boolean {
      return this.services.has(name);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    set(name: string, service: any): void {
      if (!this.has(name)) {
        this.services.set(name, service);
      } else {
        throw new Error(`Service with name "${name}" already exist!`);
      }
    }
}
