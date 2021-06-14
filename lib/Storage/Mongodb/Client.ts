import { MongoClient } from 'mongodb';
import { ClassType, Repository } from 'mongodb-typescript';
import logger from '../../Logger/Logger';
import { IDocument } from './DocumentAbstract';

export default class MongoDbClient {
  private readonly _client: MongoClient

  private _connectionPromise?: Promise<void> = undefined;

  constructor(private _dsn: string) {
    this._client = new MongoClient(this._dsn, { useUnifiedTopology: true });
    this.reconnect();
  }

  public async waitOnConnect(): Promise<void> {
    await this._connectionPromise;
  }

  public async down(): Promise<void> {
    await this._client.close(true);
  }

  public isConnected(): boolean {
    return this._client.isConnected();
  }

  public reconnect(): void {
    this._connectionPromise = this._client.connect()
      .then(() => {
        logger.info('⚡️[server]: MongoDB Connected.');
      }).catch((err) => {
        logger.error(err.message);
      });
  }

  public getRepository(className: ClassType<IDocument>): Repository<unknown> {
    if (!this._client.isConnected()) {
      this.reconnect();
      this.waitOnConnect();
    }

    return new Repository(className, this._client, (className as unknown as IDocument).collection);
  }
}
