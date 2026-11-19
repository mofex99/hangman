import express from "express";
import { randomUUID } from "node:crypto";
import { QueryCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamodb } from "./dynamodb.js";
import cors from "cors";


const app = express();
const PORT = 3001;


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());

// get routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/players", async (req, res) => {
  const playerName = req.query.playerName;

  //validate playerName
  if (typeof playerName !== "string" || !playerName.trim()) {
    return res.status(400).json({
      message: "playerName is required",
    });
  }

  try {
    // makes the Dynamo query
    const command = new QueryCommand({
      TableName: "HangmanPlayers",
      IndexName: "playerName-index",
      KeyConditionExpression: "playerName = :name",
      ExpressionAttributeValues: {
        ":name": playerName.trim(),
      },
    });

    const result = await dynamodb.send(command);

    // check if a player exists
    if (!result.Items || result.Items.length === 0) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    return res.status(200).json(result.Items[0]);
  } catch (error) {
    console.error("Error fetching player:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// post routes to make new player
app.post("/api/players", async (req, res) => {
  const { playerName } = req.body ?? {};

  if (typeof playerName !== "string" || !playerName.trim()) {
    return res.status(400).json({
      message: "playerName is required",
    });
  }

  const player = {
    playerID: randomUUID(),
    playerName: playerName.trim(),
    wins: 0,
    losses: 0,
  };

  try {
    const command = new PutCommand({
      TableName: "HangmanPlayers",
      Item: player,
      ConditionExpression: "attribute_not_exists(playerID)",
    });

    await dynamodb.send(command);

    return res.status(201).json(player);
  } catch (error) {
    console.error("Error creating player:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// put route to update player statistics
app.put("/api/players/:playerID", async (req, res) => {
  const { playerID } = req.params;
  const { wins, losses } = req.body ?? {};

  // Validate the player statistics
  if (
    !Number.isInteger(wins) ||
    !Number.isInteger(losses) ||
    wins < 0 ||
    losses < 0
  ) {
    return res.status(400).json({
      message: "wins and losses must be non-negative integers",
    });
  }

  try {
    const command = new UpdateCommand({
      TableName: "HangmanPlayers",

      Key: {
        playerID: playerID,
      },

      UpdateExpression: "SET wins = :wins, losses = :losses",

      ExpressionAttributeValues: {
        ":wins": wins,
        ":losses": losses,
      },

      ConditionExpression: "attribute_exists(playerID)",

      ReturnValues: "ALL_NEW",
    });

    const result = await dynamodb.send(command);

    return res.status(200).json(result.Attributes);
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    console.error("Error updating player:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});