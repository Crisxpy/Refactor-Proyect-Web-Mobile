import { expect } from "chai";
import { login, getUserLevel, findUserByEmail } from "../src/index.js";

describe("Authentication Module", () => {
  it("should login with valid credentials", () => {
    const result = login("juan@mail.com", "1234");
    expect(result.ok).to.be.true;
    expect(result.data.user.nombre).to.equal("Juan Perez");
  });

  it("should fail login with invalid password", () => {
    const result = login("juan@mail.com", "wrong");
    expect(result.ok).to.be.false;
    expect(result.msg).to.include("Credenciales inválidas");
  });

  it("should get user level", () => {
    const level = getUserLevel(150);
    expect(level).to.equal("plata");
  });

  it("should find user by email", () => {
    const user = findUserByEmail("maria@mail.com");
    expect(user.nombre).to.equal("Maria Lopez");
  });
});
