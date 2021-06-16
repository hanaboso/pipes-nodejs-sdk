import express from 'express';
import CommonRouter from '../Commons/CommonRouter';
import ApplicationManager from './Manager/ApplicationManager';

export const APPLICATION_PREFIX = 'hbpf.application';

// TODO: move to OAuth2 Provider
function stateDecode(state: string): string[] {
  const params = Buffer.from(state, 'base64url').toString().split(':');

  return [params[0] ?? '', params[1] ?? ''];
}

export class ApplicationRouter extends CommonRouter {
  constructor(app: express.Application, private _manager: ApplicationManager) {
    super(app, 'ApplicationRouter');
  }

  configureRoutes(): express.Application {
    this.app.route('/applications').get((req, res) => {
      res.json(this._manager.getApplications());
    });

    this.app.route('/applications/:name').get((req, res) => {
      res.json(this._manager.getApplication(req.params.name).toArray());
    });

    this.app.route('/applications/:name/sync/list').get((req, res) => {
      res.json(this._manager.getSynchronousActions(req.params.name));
    });

    this.app.route('/applications/:name/sync/:method')
      .get((req, res) => {
        res.json(this._manager.runSynchronousAction(req.params.name, req.params.method, req));
      })
      .post((req, res) => {
        res.json(this._manager.runSynchronousAction(req.params.name, req.params.method, req));
      });

    this.app.route('/applications/:name/users/:user/authorize').get(async (req, res) => {
      const redirectUrl = req.query.redirect_url;
      if (!redirectUrl) {
        throw Error('Missing "redirect_url" query parameter.');
      }

      const url = await this._manager.authorizationApplication(
        req.params.name,
        req.params.user,
        redirectUrl.toString(),
      );

      res.json({ authorizeUrl: url });
    });

    this.app.route('/applications/:name/users/:user/authorize/token').get((req, res) => {
      const url = this._manager.saveAuthorizationToken(
        req.params.name,
        req.params.user,
        req.query.valueOf() as string[],
      );

      res.json({ redirectUrl: url });
    });

    this.app.route('/applications/authorize/token').get((req, res) => {
      const { state } = req.query;
      if (!state) {
        throw Error('Missing "state" query parameter.');
      }

      let user = '';
      let key = '';
      [user, key] = stateDecode(state.toString());
      const url = this._manager.saveAuthorizationToken(key, user, req.query.valueOf() as string[]);

      res.json({ redirectUrl: url });
    });

    return this.app;
  }
}
