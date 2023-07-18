// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17;
import { console } from "forge-std/console.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { GameConfig, GameConfigData } from "../codegen/tables/GameConfig.sol";
import { Type, Position, PositionData, Energy, ReadyBlock, Counter } from "../codegen/Tables.sol";
import { EntityType } from "../codegen/Types.sol";
import { clawEntity, foodSourceEntity, foodSourceTwoEntity, portalEntity, resourceSplitEntity, controlSplitEntity, counterEntity, modifierEntity } from "../constants.sol";

import { LibUtils, LibMap } from "../libraries/Libraries.sol";

contract InitSystem is System {
  function init() public {
    require(GameConfig.get().worldHeight == 0, "InitSystem: already initialized");
    GameConfig.set(
      GameConfigData({
        worldHeight: 7,
        worldWidth: 7,
        coolDown: 5,
        coreEnergyCap: 300,
        coreInitialEnergy: 100,
        resourceConnectionCost: 10,
        controlConnectionCost: 20
      })
    );
    // Create claw
    Type.set(clawEntity, EntityType.CLAW);
    Energy.set(clawEntity, 0);
    Position.set(clawEntity, PositionData({ x: 3, y: 3 }));
    // Create food source
    Type.set(foodSourceEntity, EntityType.FOOD_SOURCE);
    Position.set(foodSourceEntity, PositionData({ x: 3, y: 0 }));
    // Create portal
    Type.set(portalEntity, EntityType.PORTAL);
    Energy.set(portalEntity, 0);
    Position.set(portalEntity, PositionData({ x: 3, y: 6 }));
    // Create resource split
    Type.set(resourceSplitEntity, EntityType.RESOURCE_SPLIT);
    Position.set(resourceSplitEntity, PositionData({ x: 5, y: 2 }));
    // Create control split
    Type.set(controlSplitEntity, EntityType.CONTROL_SPLIT);
    Position.set(controlSplitEntity, PositionData({ x: 1, y: 4 }));
    // Create counter
    Type.set(counterEntity, EntityType.COUNTER);
    Position.set(counterEntity, PositionData({ x: 5, y: 5 }));
    Counter.set(counterEntity, 0);
    // Create modifier
    Type.set(modifierEntity, EntityType.MODIFIER);
    Position.set(modifierEntity, PositionData({ x: 1, y: 2 }));
    // Create food source 2
    Type.set(foodSourceTwoEntity, EntityType.FOOD_SOURCE);
    Position.set(foodSourceTwoEntity, PositionData({ x: 3, y: 5 })); 
  }
}
