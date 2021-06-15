/* eslint-disable @typescript-eslint/naming-convention */
import { id, objectId } from 'mongodb-typescript';
import { ObjectId } from 'mongodb';

export interface IDocument {
  get collection(): string;
  toArray(): {[key: string]: unknown};
}

export default abstract class DocumentAbstract implements IDocument {
  @id @objectId
  protected _id?: ObjectId;

  public getId(): string {
    return this._id?.toHexString() ?? '';
  }

  // eslint-disable-next-line class-methods-use-this
  public get collection(): string {
    return DocumentAbstract.collection;
  }

  public static get collection(): string {
    return this.name;
  }

  // eslint-disable-next-line class-methods-use-this
  public toArray(): {[key: string]: unknown} {
    return {};
  }
}
