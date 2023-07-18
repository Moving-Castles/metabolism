// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { IBaseWorld } from "@latticexyz/world/src/interfaces/IBaseWorld.sol";

import { IClawSystem } from "./IClawSystem.sol";
import { IConnectSystem } from "./IConnectSystem.sol";
import { ICSplitSystem } from "./ICSplitSystem.sol";
import { IDevSystem } from "./IDevSystem.sol";
import { IInitSystem } from "./IInitSystem.sol";
import { IModifierSystem } from "./IModifierSystem.sol";
import { IPortalSystem } from "./IPortalSystem.sol";
import { IRSplitSystem } from "./IRSplitSystem.sol";
import { ISpawnSystem } from "./ISpawnSystem.sol";

/**
 * The IWorld interface includes all systems dynamically added to the World
 * during the deploy process.
 */
interface IWorld is
  IBaseWorld,
  IClawSystem,
  IConnectSystem,
  ICSplitSystem,
  IDevSystem,
  IInitSystem,
  IModifierSystem,
  IPortalSystem,
  IRSplitSystem,
  ISpawnSystem
{

}