import { JSONFileDatabase } from "../database/database";
import { AUTH_COOKIE_NAME } from "../services/auth";
import { getAccessTokenForUser, getUserClient } from "../services/client";
import type { NextFunction, Request, Response } from "express";

export const injectClient = async (
  req: Request,
  res: Response,
  next: NextFunction,
  db: JSONFileDatabase,
) => {
  try {
    const token = await getAccessTokenForUser(
      req.signedCookies[AUTH_COOKIE_NAME],
      db,
    );
    
    if (!token) {
      return res.status(401).send("No token found");
    }

    const client = getUserClient(token);

    try {
      const testResponse = await client.get({
        url: "/v1/designs",
      });
      if (testResponse.error) {
        return res.status(401).send("Invalid or expired token");
      }
    } catch (error) {
      return res.status(401).send("Token validation failed");
    }

    req.client = client;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};
