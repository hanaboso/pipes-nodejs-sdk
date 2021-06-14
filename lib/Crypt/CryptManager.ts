import { ICrypt, NAME } from './ICrypt';

export const PREFIX_LENGTH = 4;

export default class CryptManager {
  private _providers: {[key: string]: ICrypt} = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(providers: any[] = []) {
    providers.forEach((provider) => {
      if (typeof provider.getType === 'function' && provider.getType() === NAME) {
        this._providers[provider.getPrefix()] = provider;
      }
    });
  }

  public encrypt(data: unknown, prefix?: string): string {
    return this._getImplementation(prefix).encrypt(data);
  }

  public decrypt(data: string): unknown {
    const prefix = data.substr(0, PREFIX_LENGTH);

    return this._getImplementation(prefix).decrypt(data);
  }

  public transfer(encryptedData: string, newCryptProviderPrefix: string): string {
    return this.encrypt(this.decrypt(encryptedData), newCryptProviderPrefix);
  }

  private _getImplementation(prefix?: string): ICrypt {
    const pfx = prefix ?? '';
    // Pick first if provider not specified
    const first = Object.values(this._providers).shift();
    if (pfx === '' && first !== undefined) {
      return first;
    }

    // Use selected provider
    if (this._providers[pfx] !== undefined) {
      return this._providers[pfx];
    }

    // BC break
    if (pfx === '00_') {
      throw Error('The prefix was removed for license reasons.');
    }

    throw Error('Unknown crypt service prefix.');
  }
}
