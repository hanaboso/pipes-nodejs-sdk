import express from 'express';

export default abstract class CommonRouter {
  protected constructor(protected app: express.Application, protected name: string) {
    this.configureRoutes();
  }

  getName(): string {
    return this.name;
  }

    abstract configureRoutes(): express.Application;
}
