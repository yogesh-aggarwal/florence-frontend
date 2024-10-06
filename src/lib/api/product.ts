import { api } from "../core/api"
import { Product_t } from "../models/product"

export class Product {
   static async FetchByID(id: string): Promise<Product_t | null> {
      const res = await api.get<{ data: Product_t }>(`/product/${id}`)
      if (!res) return null

      return res.data.data
   }

   static async FetchByIDS(ids: string[]): Promise<Product_t[] | null> {
      const res = await api.post<{ data: Product_t[] }>(`/product/getByIDS`, { ids: ids })
      if (!res) return null

      return res.data.data
   }

   static async FetchAll(): Promise<Product_t[] | null> {
      const res = await api.get<{ data: Product_t[] }>("/product/all")
      if (!res) return null

      return res.data.data
   }

   static async FetchByCategory(category: string): Promise<Product_t[] | null> {
      const res = await api.get<{ data: Product_t[] }>(`/product/category/${category}`)
      if (!res) return null

      return res.data.data
   }

   static async FetchTrending(): Promise<Product_t[] | null> {
      const res = await api.get<{ data: Product_t[] }>(`/product/trending`)
      if (!res) return null

      return res.data.data
   }

   static async FetchWishlist(): Promise<Product_t[] | null> {
      const res = await api.get<{ data: Product_t[] }>(`/product/wishlist`)
      if (!res) return null

      return res.data.data
   }

   static async FetchBySearchQuery(query: string): Promise<Product_t[] | null> {
      const res = await api.get<{ data: Product_t[] }>(`/product/search/${query}`)
      if (!res) return null

      return res.data.data
   }
}
