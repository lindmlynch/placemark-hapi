import { assert } from "chai";
import { trailService } from "./trail-service.js";
import { maggie, testPlacemarks, testTrails } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Trail API tests", () => {
  setup(async () => {
    await trailService.createUser(maggie);
    await trailService.authenticate(maggie);
    await trailService.deleteAllUsers();
    await trailService.createUser(maggie);
    await trailService.authenticate(maggie);
  });
  teardown(async () => {
    await trailService.deleteAllUsers();
  });

  test("update trail", async () => {
    const returnedPlacemark = await trailService.createPlacemark(testPlacemarks[0]);
    await trailService.updateTrail(returnedPlacemark._id, testTrails[0]);
    const returnedTrails = await trailService.getTrails(returnedPlacemark._id);
    assert.equal(returnedTrails.length, 1);
    assertSubset(returnedTrails[0], testTrails[0]);
  });
});
