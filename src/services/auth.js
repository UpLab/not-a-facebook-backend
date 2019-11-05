/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import uuid from 'uuid';
import md5 from 'md5';
import UserModel from '../models/user';

const THIRTY_MINUTES = 30 * 60 * 1000;
export const TOKEN_EXPIRATION_PERIOD = THIRTY_MINUTES;

export const encrypt = password => md5(password);

export const generateAccessToken = () => ({
  token: uuid(),
  expiresAt: new Date(new Date().getTime() + THIRTY_MINUTES),
});

export const initUserDocument = (username, password, profile) => ({
  username,
  password: encrypt(password),
  profile,
  accessTokens: [],
});

class Users {
  async createAccount(username, password, profile) {
    const isExist = await UserModel.findByUsername(username);
    if (isExist) {
      throw new Error('Username already taken!');
    }
    const user = initUserDocument(username, password, profile);
    const accessToken = this.addAccessTokenToUser(user);
    const userDoc = await UserModel.create(user);
    return { accessToken, user: userDoc };
  }

  login(username, password) {
    const encrypted = encrypt(password);
    const user = UserModel.findOne({ username, password: encrypted });
    if (!user) {
      throw new Error('Invalid username or password!');
    }
    UserModel.update({ _id: user._id }, { $set: { lastLoginDate: new Date() } });
    const accessToken = this.addAccessTokenToUser(user);
    return accessToken;
  }

  logout(token) {
    const user = UserModel.findByToken(token);
    if (!user) return;
    const filteredAccessTokens = user.accessTokens.filter(accessToken => accessToken.token !== token);
    UserModel.update({ _id: user._id }, { $set: { accessTokens: filteredAccessTokens } });
  }

  updateAccount(formData) {
    const { _id, ...modifier } = formData;
    const exists = !!UserModel.findById(_id);
    if (!exists) {
      throw new Error('User not found!');
    }
    UserModel.update({ _id }, { $set: { ...modifier } });
  }

  addAccessTokenToUser(user) {
    const accessToken = generateAccessToken();
    const accessTokens = [...user.accessTokens, accessToken];
    if (user._id) {
      UserModel.update({ _id: user._id }, { $set: { accessTokens } });
    }
    // eslint-disable-next-line no-param-reassign
    user.accessTokens = accessTokens;
    return accessToken;
  }
}

export default new Users();
