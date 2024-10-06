import { api } from "../core/api"
import { PlatformHomeSection_t } from "../types/platform"

export class PlatformAPI {
   static async FetchHome(): Promise<PlatformHomeSection_t | null> {
      const res = await api.get<{ data: PlatformHomeSection_t }>(`/platform/home`)
      if (!res) return null

      return res.data.data
   }
}
