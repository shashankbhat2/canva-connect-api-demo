import type { Design } from "@canva/connect-api-ts/types.gen";
import { Client } from "@hey-api/client-fetch";

interface DesignsResponse {
  items: Design[];
}
/**
 * Service for interacting with designs-related endpoints
 */
export class Designs {
    constructor(private client: Client) {}

  /**
   * Fetches all designs from the backend
   * @returns Promise resolving to an array of designs
   * @throws Error if the request fails
   */
  async getDesigns(): Promise<Design[]> {
    try {
      const response = await this.client.get({
        url: "/designs",
      });
      
      if (response.error) {
        console.error(response.error);
        throw new Error(response.error as any);
      }

      const data = (await response.data) as DesignsResponse;
      return data.items;
    } catch (error) {
      console.error("Error in getDesigns:", error);
      throw error;
    }   
  }
}