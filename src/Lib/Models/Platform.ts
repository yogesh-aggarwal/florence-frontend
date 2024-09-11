import { API } from "../API"
import { PlatformHomeSection_t } from "./Platform.types"

export namespace Platform {
   export async function FetchHome(): Promise<PlatformHomeSection_t | null> {
      const res = await new API().get<{ data: PlatformHomeSection_t }>(`/platform/home`)
      if (!res) return null

      return res.data
   }
}
