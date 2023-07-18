import { mudConfig } from "@latticexyz/world/register";
import { resolveTableId } from "@latticexyz/config";
/**
 * Importing this enables "snap sync mode".
 * It allows clients to sync the latest state of the world using view functions.
 * This is a simple way to quickly sync without the use of an external indexer.
 * This could lead to expensive queries on live RPCs if the world is large,
 * so we suggest using MODE for production deployments.
 */
// import "@latticexyz/world/snapsync";

export default mudConfig({
    snapSync: false,
    deploysDirectory: "./deploys",
    namespace: "mc",
    enums: {
        EntityType: ["CORE", "CLAW", "FOOD_SOURCE", "PORTAL", "RESOURCE_SPLIT", "CONTROL_SPLIT", "COUNTER", "MODIFIER"],
        ConnectionType: ["RESOURCE", "CONTROL"]
    },
    tables: {
        Type: "EntityType",
        Name: "string",
        ReadyBlock: "uint256",
        StartBlock: "uint256",
        ResourceConnection: "bytes32",
        ControlConnection: "bytes32",
        Energy: "uint32",
        RealmId: "uint32",
        Voted: "bool",
        Counter: "uint32",
        Position: {
            schema: {
                x: "int32",
                y: "int32",
            },
        },
        GameConfig: {
            keySchema: {},
            schema: {
                worldHeight: "int32",
                worldWidth: "int32",
                coolDown: "uint32",
                coreEnergyCap: "uint32",
                coreInitialEnergy: "uint32",
                resourceConnectionCost: "uint32",
                controlConnectionCost: "uint32",
            },
            dataStruct: true,
        },
    },
    modules: [
        {
            name: "KeysWithValueModule",
            root: true,
            args: [resolveTableId("Position")],
        },
        {
            name: "KeysWithValueModule",
            root: true,
            args: [resolveTableId("Type")],
        },
        {
            name: "KeysWithValueModule",
            root: true,
            args: [resolveTableId("ResourceConnection")],
        },
        {
            name: "KeysWithValueModule",
            root: true,
            args: [resolveTableId("ControlConnection")],
        },
        {
            name: "KeysWithValueModule",
            root: true,
            args: [resolveTableId("RealmId")],
        },
        {
            name: "KeysInTableModule",
            root: true,
            args: [resolveTableId("StartBlock")],
        }
    ],
});
