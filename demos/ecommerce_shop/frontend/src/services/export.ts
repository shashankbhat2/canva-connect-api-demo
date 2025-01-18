import type { GetDesignExportJobResponse } from "@canva/connect-api-ts/types.gen";
import { poll } from "../../../../common/utils/poll";
import type { Client } from "@hey-api/client-fetch";

export class Exports {
  constructor(private client: Client) {}

  async exportDesign({
    designId,
  }: {
    designId: string;
  }): Promise<GetDesignExportJobResponse> {
    try {
      const response = await this.client.post({
        url: `/exports/${designId}`,
      });

      if (response.error) {
        console.error(response.error);
        throw new Error(response.error as any);
      }

      const exportJobResponse = response.data as GetDesignExportJobResponse;
      return poll(() =>
        this.getDesignExportJobStatus(exportJobResponse.job.id),
      );
    } catch (error) {
      console.error("Error in exportDesign:", error);
      throw error;
    }
  }

  async getDesignExportJobStatus(
    exportId: string,
  ): Promise<GetDesignExportJobResponse> {
    try {
      const response = await this.client.get({
        url: `/exports/${exportId}/status`,
      });

      if (response.error) {
        console.error(response.error);
        throw new Error(response.error as any);
      }

      return response.data as GetDesignExportJobResponse;
    } catch (error) {
      console.error("Error in getDesignExportJobStatus:", error);
      throw error;
    }
  }
}
