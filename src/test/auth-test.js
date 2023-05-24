import { assert } from "chai";
import { trailService } from "./trail-service.js";
import { decodeToken } from "../api/jwt-utils.js";
import { maggie } from "./fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    trailService.clearAuth();
    await trailService.createUser(maggie);
    await trailService.authenticate(maggie);
    await trailService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await trailService.createUser(maggie);
    const response = await trailService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await trailService.createUser(maggie);
    const response = await trailService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    trailService.clearAuth();
    try {
      await trailService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
