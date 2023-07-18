enum EntityType {
  CORE,
  CLAW,
  FOOD_SOURCE,
  PORTAL,
  RESOURCE_SPLIT,
  CONTROL_SPLIT,
  COUNTER,
  MODIFIER
}

enum ConnectionType {
  RESOURCE,
  CONTROL,
}

declare global {
  
  // Default type with all potential properties.
  type Entity = {
    type?: EntityType;
    name?: string;
    readyBlock?: number;
    startBlock?: number;
    resourceConnection?: string;
    controlConnection?: string;
    energy?: number;
    position?: Coord;
    realmId?: number;
    gameConfig?: GameConfig;
    voted?: boolean;
    counter?: number;
  };
  
  type Core = {
    type: EntityType.CORE;
    name: string;
    readyBlock: number;
    startBlock?: number;
    position: Coord;
    realmId: number;
    energy: number;
    resourceConnection?: string;
    controlConnection?: string;
    voted: boolean;
  };
  
  type Claw = {
    type: EntityType.CLAW;
    energy: number;
    position: Coord;
  };
  
  type FoodSource = {
    type: EntityType.FOOD_SOURCE;
    position: Coord;
  };
  
  type Portal = {
    type: EntityType.PORTAL;
    energy: number;
    position: Coord;
  };
  
  type ResourceSplit = {
    type: EntityType.RESOURCE_SPLIT;
    resourceConnection?: string;
    position: Coord;
  };
  
  type ControlSplit = {
    type: EntityType.CONTROL_SPLIT;
    controlConnection?: string;
    position: Coord;
  };
  
  type Counter = {
    type: EntityType.COUNTER;
    position: Coord;
    counter: number;
  };
  
  type Modifier = {
    type: EntityType.MODIFIER;
    position: Coord;
    resourceConnection?: string;
    controlConnection?: string;
  };
  
  type GameConfig = {
    gameConfig: {
      worldHeight: number;
      worldWidth: number;
      coolDown: number;
      coreEnergyCap: number;
      coreInitialEnergy: number;
      resourceConnectionCost: number;
      controlConnectionCost: number;
    }
  }
  
  type Entities = {
    [index: string]: Entity;
  };
  
  type Cores = {
    [index: string]: Core;
  };
  
  type Claws = {
    [index: string]: Claw;
  };
  
  type FoodSources = {
    [index: string]: FoodSource;
  };
  
  type Portals = {
    [index: string]: Portal;
  };
  
  type ResourceSplits = {
    [index: string]: ResourceSplit;
  };
  
  type ControlSplits = {
    [index: string]: ControlSplit;
  };
  
  type Counters = {
    [index: string]: Counter;
  };
  
  type Modifiers = {
    [index: string]: Modifier;
  };

  // ---
  type Organ = Claw | Portal | ResourceSplit | ControlSplit | Counter | Modifier
  
  // ---
  
  type Coord = {
    x: number;
    y: number;
  };
  
  type Connection = {
    type: ConnectionType;
    start: Coord,
    end: Coord
  };
  
  type CalculatedEnergies = {
    [index: string]: number;
  };

  interface GridTile {
    id: string
    coordinates: Coord;
  }

  type EntityStoreEntry = {
    address: string
    entity: Entity
  }
}

// Only explicitly export enums
export {
  EntityType,
  ConnectionType
}