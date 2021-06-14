import { crypto_secretbox_MACBYTES, crypto_secretbox_NONCEBYTES } from 'sodium-native';
import WindWalkerCrypt from '../Impl/WindWalkerCrypt';

const expected = { user: 'data' };
const crypt = new WindWalkerCrypt('123scycycxvxvdvse5678IDLNJNCSKJfefefefeffJKkjbkjbkjnsl');

describe('Crypt tests', () => {
  it('Constants', () => {
    expect(crypto_secretbox_NONCEBYTES).toEqual(24);
    expect(crypto_secretbox_MACBYTES).toEqual(16);
  });

  it('Encrypt/Decrypt', () => {
    crypt.encrypt(expected);
    const encrypted = crypt.encrypt(expected);
    const decrypted = crypt.decrypt(encrypted);

    expect(decrypted).toEqual(expected);
  });

  it('Decrypt unknown test', () => {
    try {
      crypt.decrypt('_unknown');
      expect(false).toBeTruthy();
    } catch (e) {
      expect(e.message).toEqual('Unknown prefix in hash.');
    }
  });

  it('Invalid HMAC', () => {
    try {
      let encrypted = crypt.encrypt(expected);
      encrypted = encrypted.substr(crypt.getPrefixLength() + 2);

      crypt.decrypt(`${crypt.getPrefix()}${encrypted}`);
      expect(false).toBeTruthy();
    } catch (e) {
      expect(e.message).toEqual('HMAC Error: Invalid HMAC.');
    }
  });
});
