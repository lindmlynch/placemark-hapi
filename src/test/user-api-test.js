import { assert } from "chai";
import { assertSubset } from "./test-utils.js";
import { trailService } from "./trail-service.js";
import { maggie, maggieCredentials, testUsers } from "./fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    trailService.clearAuth();
    await trailService.createUser(maggie);
    await trailService.authenticate(maggieCredentials);
    await trailService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await trailService.createUser(testUsers[i]);
    }
    await trailService.createUser(maggie);
    await trailService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await trailService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await trailService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await trailService.deleteAllUsers();
    await trailService.createUser(maggie);
    await trailService.authenticate(maggieCredentials);
    returnedUsers = await trailService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await trailService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await trailService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await trailService.deleteAllUsers();
    await trailService.createUser(maggie);
    await trailService.authenticate(maggieCredentials);
    try {
      const returnedUser = await trailService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
