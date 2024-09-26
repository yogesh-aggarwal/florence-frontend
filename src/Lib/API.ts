import { APIResponse } from "./API.types"

export class API {
   private readonly baseURL: string

   constructor() {
      this.baseURL = "http://localhost:3000/v1"
   }

   private async request<T>(
      method: RequestInit["method"],
      path: string,
      expectedStatusCodes: number[],
      body?: Record<string, unknown>
   ): Promise<APIResponse<T> | null> {
      const authToken = localStorage.getItem("token") ?? ""

      const res = await fetch(this.baseURL + path, {
         method: method,
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
         },
         body: JSON.stringify(body),
      })

      const status = res.status
      if (!expectedStatusCodes.includes(status)) {
         return null
      }

      try {
         const data = await res.json()
         const message = data["message"]
         delete data["message"]

         return { status, message, data }
      } catch {
         return null
      }
   }

   public async get<T>(path: string): Promise<APIResponse<T> | null> {
      try {
         return await this.request("GET", path, [200])
      } catch (e) {
         console.error("API ERROR", e)
         return null
      }
   }

   public async post<T>(path: string, body: Record<string, unknown>): Promise<APIResponse<T> | null> {
      try {
         return await this.request("POST", path, [200, 201], body)
      } catch (e) {
         console.error("API ERROR", e)
         return null
      }
   }

   public async put<T>(path: string, body: Record<string, unknown>): Promise<APIResponse<T> | null> {
      try {
         return await this.request("PUT", path, [200, 201], body)
      } catch (e) {
         console.error("API ERROR", e)
         return null
      }
   }

   public async delete<T>(path: string): Promise<APIResponse<T> | null> {
      try {
         return await this.request("DELETE", path, [200])
      } catch (e) {
         console.error("API ERROR", e)
         return null
      }
   }

   public async patch<T>(path: string, body: Record<string, unknown>): Promise<APIResponse<T> | null> {
      try {
         return await this.request("PATCH", path, [201], body)
      } catch (e) {
         console.error("API ERROR", e)
         return null
      }
   }
}
