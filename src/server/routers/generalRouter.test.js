const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectDataBase = require("../../database");
const User = require("../../database/models/User");
const app = require("../index");

let mongoServer;
let initialToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectDataBase(connectionString);

  User.create({
    username: "normalUser",
    password: "$2b$10$mKBXw7GhooAwOTySr8HOFODbxJse18IfwLGB3BgfadhtzGYXyAPvS",
    name: "iamaName",
  });

  User.create({
    username: "normalUser2",
    password: "$2b$10$mKBXw7GhooAwOTySr8HOFODbxJse18IfwLGB3BgfadhtzGYXyAPvS",
    name: "iamaName",
  });

  const userCredentials = {
    username: "normalUser2",
    password: "iamsecure",
  };

  const { body } = await request(app).post("/").send(userCredentials);

  initialToken = body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a / endpoint", () => {
  describe("When it receive invalid credentials", () => {
    test("Then it shouldn't return a token", async () => {
      const userCredentials = {
        username: "elpapu",
        password: "iampass",
      };

      const { body } = await request(app)
        .post("/")
        .send(userCredentials)
        .expect(401);

      expect(body).not.toHaveProperty("token");
    });
  });

  describe("When it receives credentials with an incorrect password", () => {
    test("Then it shoudl return an error message with a message", async () => {
      const userCredentials = {
        username: "normalUser",
        password: "iampassto",
      };

      const { body } = await request(app)
        .post("/")
        .send(userCredentials)
        .expect(401);

      expect(body).not.toHaveProperty("token");
    });
  });

  describe("When it receive valid credentials", () => {
    test("Then it should return a token", async () => {
      const userCredentials = {
        username: "normalUser",
        password: "iamsecure",
      };

      const {
        body: { token },
      } = await request(app).post("/").send(userCredentials).expect(200);

      expect(token).toBeTruthy();
    });
  });
});

describe("Given a /register endpoint", () => {
  describe("When it receibes a valid schema ", () => {
    test("Then it should return a token", async () => {
      const newUser = {
        name: "emiliano",
        username: "elteclado",
        password: "iamsecure",
      };

      const {
        body: { token },
      } = await request(app).post("/register").send(newUser).expect(200);

      expect(token).toBeTruthy();
    });
  });

  describe("When it receibes a repeated username", () => {
    test("Then it should return an error message that says that the user alreadys exist", async () => {
      const expectedMessage = "The username isn't avaliable";
      const newUser = {
        name: "emiliano",
        username: "normalUser",
        password: "iamsecure",
      };

      const { body } = await request(app)
        .post("/register")
        .send(newUser)
        .expect(400);

      expect(body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a /home endpoint", () => {
  describe("When it receives a valid token", () => {
    test("Then it should return all the users", async () => {
      const { body } = await request(app)
        .get("/home")
        .set("Authorization", `Bearer ${initialToken}`);

      expect(body.users).toHaveLength(3);
    });
  });
});
