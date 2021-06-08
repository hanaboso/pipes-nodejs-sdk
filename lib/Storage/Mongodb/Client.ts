import { MongoClient } from 'mongodb';
import { ClassType, Repository } from 'mongodb-typescript';
import logger from '../../Logger/Logger';

export default class MongoDbClient {
  private readonly client: MongoClient

  private connectionPromise?: Promise<void> = undefined;

  constructor(private dsn: string) {
    this.client = new MongoClient(this.dsn, { useUnifiedTopology: true });
    this.reconnect();
  }

  public async waitOnConnect(): Promise<void> {
    await this.connectionPromise;
  }

  public async down(): Promise<void> {
    await this.client.close(true);
  }

  public isConnected(): boolean {
    return this.client.isConnected();
  }

  public reconnect(): void {
    this.connectionPromise = this.client.connect()
      .then(() => {
        logger.info('⚡️[server]: MongoDB Connected.');
      }).catch((err) => {
        logger.error(err.message);
      });
  }

  public getRepository(className: ClassType<unknown>, collection: string): Repository<unknown> {
    if (!this.client.isConnected()) {
      this.reconnect();
      this.waitOnConnect();
    }

    return new Repository(className, this.client, collection);
  }
}
