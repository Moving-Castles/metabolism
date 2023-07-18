// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17;
import { console } from "forge-std/console.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { Position, Type, PositionData, PositionTableId, ReadyBlock, StartBlock, RealmId, Energy, ResourceConnection, ControlConnection, GameConfigData, GameConfig } from "../codegen/Tables.sol";
import { LibUtils, LibMap, LibEnergy } from "../libraries/Libraries.sol";
import { EntityType, ConnectionType } from "../codegen/Types.sol";

contract RSplitSystem is System {
  function connect(bytes32 _resourceSplitOrgan, bytes32 _targetOrgan) public {
    bytes32 coreEntity = LibUtils.addressToEntityKey(_msgSender());
    GameConfigData memory gameConfig = GameConfig.get();
    require(RealmId.get(coreEntity) == 0, "not in realm");
    require(ReadyBlock.get(coreEntity) < block.number, "in cooldown");
    require(ControlConnection.get(coreEntity) == _resourceSplitOrgan, "not connected");
    require(Type.get(_targetOrgan) == EntityType.FOOD_SOURCE, "not a food source");
    require(LibMap.getConnections(ConnectionType.RESOURCE, _targetOrgan).length == 0, "fully connected");

    LibEnergy.settleEnergy();

    uint32 distance = LibMap.manhattanDistance(Position.get(_resourceSplitOrgan), Position.get(_targetOrgan));
    uint32 cost = distance * gameConfig.controlConnectionCost;
    require(Energy.get(coreEntity) >= cost, "not enough energy");

    // ...
    ResourceConnection.set(_resourceSplitOrgan, _targetOrgan);
    Energy.set(coreEntity, Energy.get(coreEntity) - cost);
    // ...

    bytes32[][] memory connections = LibMap.getConnections(ConnectionType.RESOURCE, _resourceSplitOrgan);
    for (uint i = 0; i < connections.length; i++) {
      StartBlock.set(connections[i][0], block.number);
    }
  }

  function disconnect(bytes32 _resourceSplitOrgan) public {
    bytes32 coreEntity = LibUtils.addressToEntityKey(_msgSender());
    require(RealmId.get(coreEntity) == 0, "not in realm");
    require(ReadyBlock.get(coreEntity) < block.number, "in cooldown");
    require(ControlConnection.get(coreEntity) == _resourceSplitOrgan, "not connected");

    LibEnergy.settleEnergy();

    ResourceConnection.deleteRecord(_resourceSplitOrgan);

    // Get all connections to r-split
    bytes32[][] memory connections = LibMap.getConnections(ConnectionType.RESOURCE, _resourceSplitOrgan);
    for (uint i = 0; i < connections.length; i++) {
      StartBlock.deleteRecord(connections[i][0]);
    }
  }
}
