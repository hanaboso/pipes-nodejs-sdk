import express from 'express';

export default abstract class CommonRouter {
    protected app: express.Application;

    protected name: string;

    protected constructor(app: express.Application, name: string) {
      this.app = app;
      this.name = name;
      this.configureRoutes();
    }

    getName(): string {
      return this.name;
    }

    abstract configureRoutes(): express.Application;
}
