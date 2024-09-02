import { API } from "../API"
import { Product_t } from "./Product.types"

export namespace Product {
	export async function FetchByID(id: string): Promise<Product_t | null> {
		const res = await new API().get<{ data: Product_t }>(`/product/${id}`)
		if (!res) return null

		return res.data
	}

	export async function FetchByIDS(ids: string[]): Promise<Product_t[] | null> {
		const res = await new API().post<{ data: Product_t[] }>(
			`/product/getByIDS`,
			{ ids: ids }
		)
		if (!res) return null

		return res.data
	}

	export async function FetchAll(): Promise<Product_t[] | null> {
		const res = await new API().get<{ data: Product_t[] }>("/product/all")
		if (!res) return null

		return res.data
	}

	export async function FetchByCategory(
		category: string
	): Promise<Product_t[] | null> {
		const res = await new API().get<{ data: Product_t[] }>(
			`/product/category/${category}`
		)
		if (!res) return null

		return res.data
	}

	export async function FetchTrending(): Promise<Product_t[] | null> {
		const res = await new API().get<{ data: Product_t[] }>(`/product/trending`)
		if (!res) return null

		return res.data
	}

	export async function FetchWishlist(): Promise<Product_t[] | null> {
		const res = await new API().get<{ data: Product_t[] }>(`/product/wishlist`)
		if (!res) return null

		return res.data
	}

	export async function FetchBySearchQuery(
		query: string
	): Promise<Product_t[] | null> {
		const res = await new API().get<{ data: Product_t[] }>(
			`/product/search/${query}`
		)
		if (!res) return null

		return res.data
	}
}
