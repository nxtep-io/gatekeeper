import * as hat from 'hat';
import { User, OAuthCredentials } from '../../lib';

const TEST_CREDENTIALS = {
  token_type: 'bearer',
  access_token: hat(),
  refresh_token: hat(),
  user_id: hat(),
  expires_in: 3600,
};

const TEST_USER = {
  _id: hat(),
  name: 'Test User',
  email: 'user@test.com',
  role: 'user',
};

describe('lib.models.User', () => {
  it('should instantiate properly without credentials', async () => {
    const user = new User({ ...TEST_USER });

    expect(user).toBeTruthy();
    expect(user.id).toBe(TEST_USER._id);
    expect(user.name).toBe(TEST_USER.name);
    expect(user.email).toBe(TEST_USER.email);
    expect(user.credentials).toBeUndefined();
  });

  it('should instantiate properly with credentials instance', async () => {
    const credentials = new OAuthCredentials(TEST_CREDENTIALS);
    const user = new User({ credentials, ...TEST_USER });

    expect(user).toBeTruthy();
    expect(user.id).toBe(TEST_USER._id);
    expect(user.name).toBe(TEST_USER.name);
    expect(user.email).toBe(TEST_USER.email);
    expect(user.credentials).toBeInstanceOf(OAuthCredentials);
  });

  it('should instantiate properly with credentials raw data', async () => {
    const user = new User({ credentials: TEST_CREDENTIALS as any, ...TEST_USER });

    expect(user).toBeTruthy();
    expect(user.id).toBe(TEST_USER._id);
    expect(user.name).toBe(TEST_USER.name);
    expect(user.email).toBe(TEST_USER.email);
    expect(user.credentials).toBeInstanceOf(OAuthCredentials);
  });
});
