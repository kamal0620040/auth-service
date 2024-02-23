const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserRepository } = require("../repositories/index");
const { JWT_KEY } = require("../config/server-config");
const AppErrors = require("../utils/error-handler");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      console.log("Something went wrong in the service layer.");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      // fetch the user using the email
      const user = await this.userRepository.getByEmail(email);
      // compare incomming plain password which stores encryptes password
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect password" };
      }
      // if password match then create the token and send it to the user
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("Somethign went wrong in the signin process.");
      throw { error };
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);

      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getByID(response.id);
      if (!user) {
        throw { error: "No user with the corresponding user exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw { error };
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation.");
      throw { error };
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation.");
      throw { error };
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparision.");
      throw { error };
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong in service layer.");
      throw { error };
    }
  }
}

module.exports = UserService;
