// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.17;
import { console } from "forge-std/console.sol";
import { MudV2Test } from "./MudV2Test.t.sol";
import "../src/codegen/Tables.sol";
import "../src/libraries/Libraries.sol";
import { clawEntity, foodSourceEntity, portalEntity } from "../src/constants.sol";
import { EntityType } from "../src/codegen/Types.sol";

contract DeployTest is MudV2Test {
  function testWorldExists() public {
    setUp();
    uint256 codeSize;
    address addr = worldAddress;
    assembly {
      codeSize := extcodesize(addr)
    }
    assertTrue(codeSize > 0);
  }

  function testClawSpawn() public {
    setUp();
    assertEq(Position.get(world, clawEntity).x, 3);
    assertEq(Position.get(world, clawEntity).y, 3);
    assertEq(uint8(Type.get(world, clawEntity)), uint8(EntityType.CLAW));
  }

  function testFoodSourceSpawn() public {
    setUp();
    assertEq(Position.get(world, foodSourceEntity).x, 3);
    assertEq(Position.get(world, foodSourceEntity).y, 0);
    assertEq(uint8(Type.get(world, foodSourceEntity)), uint8(EntityType.FOOD_SOURCE));
  }

  function testPortalSpawn() public {
    setUp();
    assertEq(Position.get(world, portalEntity).x, 3);
    assertEq(Position.get(world, portalEntity).y, 6);
    assertEq(uint8(Type.get(world, portalEntity)), uint8(EntityType.PORTAL));
  }
}
