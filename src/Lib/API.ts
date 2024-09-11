export class API {
   private readonly baseURL: string

   constructor() {
      this.baseURL = "http://localhost:3000"
   }

   private request(method: RequestInit["method"], path: string, body?: Record<string, unknown>) {
      const authToken = localStorage.getItem("token") ?? ""

      return fetch(this.baseURL + path, {
         method: method,
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
         },
         body: JSON.stringify(body),
      })
   }

   public async get<T>(path: string): Promise<T | null> {
      try {
         const res = await this.request("GET", path)
         return await res.json()
      } catch (e) {
         console.error("API ERROR", e)
         return null
      }
   }

   public async post<T>(path: string, body: Record<string, unknown>): Promise<T | null> {
      try {
         const res = await this.request("POST", path, body)
         return await res.json()
      } catch (e) {
         console.error("API ERROR", e)
         return null
      }
   }

   public async put<T>(path: string, body: Record<string, unknown>): Promise<T | null> {
      try {
         const res = await this.request("PUT", path, body)
         return await res.json()
      } catch (e) {
         console.error("API ERROR", e)
         return null
      }
   }

   public async delete<T>(path: string): Promise<T | null> {
      try {
         const res = await this.request("DELETE", path)
         return await res.json()
      } catch (e) {
         console.error("API ERROR", e)
         return null
      }
   }

   public async patch<T>(path: string, body: Record<string, unknown>): Promise<T | null> {
      try {
         const res = await this.request("PATCH", path, body)
         return await res.json()
      } catch (e) {
         console.error("API ERROR", e)
         return null
      }
   }
}
