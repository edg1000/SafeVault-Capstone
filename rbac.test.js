const { authorizeRole } = require('../src/auth');
const jwt = require('jsonwebtoken');

describe("RBAC Tests", () => {
  const secret = "testSecret";
  const adminToken = jwt.sign({ id: 1, role: "admin" }, secret);
  const userToken = jwt.sign({ id: 2, role: "user" }, secret);

  test("allows admin to access protected route", () => {
    const req = { headers: { authorization: `Bearer ${adminToken}` } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    authorizeRole("admin")(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test("denies user from accessing admin route", () => {
    const req = { headers: { authorization: `Bearer ${userToken}` } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const next = jest.fn();

    authorizeRole("admin")(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Access denied");
  });
});
