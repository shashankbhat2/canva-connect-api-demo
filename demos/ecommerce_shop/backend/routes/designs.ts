import express from "express";
import { injectClient } from "../../../common/backend/middleware/client";
import { db } from "../database/database";

const router = express.Router();

router.use((req, res, next) => injectClient(req, res, next, db));

router.get("/designs", async (req, res) => {
  try {
    const response = await req.client.get({
      url: "/v1/designs",
    });

    if (response.error) {
      return res.status(400).json({ error: response.error });
    }

    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching designs:", error);
    return res.status(500).json({ error: "Failed to fetch designs" });
  }
});

export default router;
