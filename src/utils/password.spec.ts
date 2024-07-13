import { comparePasswords, hashPassword } from './password';

describe('Password', () => {
  it('should generate a hash', async () => {
    const password = 'random_password';
    const hash = await hashPassword(password);
    expect(hash).not.toBe(password);
  });

  it('should compare the hash with password and return true', async () => {
    const password = 'random_password';
    const hash = await hashPassword(password);
    const isMatch = await comparePasswords(password, hash);
    expect(isMatch).toBeTruthy();
  });
});
