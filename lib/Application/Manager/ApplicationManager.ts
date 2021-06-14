import { Repository } from 'mongodb-typescript';
import { Request } from 'express';
import { ApplicationInstall, IApplicationSettings } from '../Database/ApplicationInstall';
import Annotation from '../../Utils/Annotation';
import CommonLoader from '../../Commons/CommonLoader';
import { IApplication } from '../Base/IApplication';
import { APPLICATION_PREFIX } from '../ApplicationRouter';
import HttpMethods from '../../Transport/HttpMethods';
import { IBasicApplication } from '../../Authorization/Type/Basic/IBasicApplication';
import { REDIRECT_URL } from '../Base/ApplicationAbstract';
import MongoDbClient from '../../Storage/Mongodb/Client';
import { IOAuth2Application } from '../../Authorization/Type/OAuth2/IOAuth2Application';

export default class ApplicationManager {
    private _repository: Repository<ApplicationInstall>;

    constructor(
        private _client: MongoDbClient,
        private _loader: CommonLoader,
    ) {
      this._client.getRepository(ApplicationInstall, ApplicationInstall.getCollection());
      this._repository = this._client.getRepository(ApplicationInstall, ApplicationInstall.getCollection()) as
            Repository<ApplicationInstall>;
    }

    public get applications(): string[] {
      return this._loader.getList(APPLICATION_PREFIX);
    }

    public getApplication(key: string): IApplication {
      return ((this._loader.get(APPLICATION_PREFIX, key)) as unknown) as IApplication;
    }

    public getSynchronousActions(key: string): string[] {
      const instanceOfClass = this.getApplication(key);
      return Annotation.getAllMethods(instanceOfClass);
    }

    public runSynchronousAction(key: string, method: string, request: Request): unknown {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const app = this.getApplication(key) as any;
      const syncMethod = `sync${method[0].toUpperCase()}${method.substr(1)}`;
      if (typeof app[syncMethod] === 'function') {
        if (request.method === HttpMethods.GET) {
          return app[syncMethod]();
        }
        return app[syncMethod](request);
      }
      throw new Error(`Method ${syncMethod} was not found for applicaton ${key}`);
    }

    public async saveApplicationSettings(
      key: string,
      user: string,
      data: IApplicationSettings,
    ): Promise<ApplicationInstall> {
      const app = this.getApplication(key);
      // TODO
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const appInstall = await this._repository.findOne({ _id: 1 });
      return app.setApplicationSettings(appInstall as ApplicationInstall, data);
    }

    public saveApplicationPassword(key: string, user: string, password: string): ApplicationInstall {
      const app = this.getApplication(key) as IBasicApplication;
      // TODO
      const appInstall = this._repository.findOne() as unknown as ApplicationInstall;

      return app.setApplicationPassword(appInstall, password);
    }

    public authorizationApplication(key: string, user: string, redirectUrl: string): string {
      const app = this.getApplication(key) as IOAuth2Application;

      // TODO
      const appInstall = this._repository.findOne() as unknown as ApplicationInstall;

      app.setFrontendRedirectUrl(appInstall, redirectUrl);

      return app.authorize(appInstall);
    }

    public saveAuthorizationToken(key: string, user: string, token: string): unknown {
      const app = this.getApplication(key) as IOAuth2Application;

      // TODO
      const appInstall = this._repository.findOne() as unknown as ApplicationInstall;

      app.setAuthorizationToken(appInstall, token);

      return { [REDIRECT_URL]: app.getFrontendRedirectUrl(appInstall) };
    }
}
