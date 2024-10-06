type OrderItems_t = {
   [key: string]: number
}

type PriceItems_t = Record<string, number>

type Timestamps_t = {
   placed: number
   transit: number
   delivered: number
}

export enum OrderStatus {
   Placed = "placed",
   Transit = "transit",
   Delivered = "delivered",
}

export type Order_t = {
   id: string
   _id: string

   userID: string
   razorpay_payment_id: string
   razorpay_signature: string

   orderItems: OrderItems_t
   priceItems: PriceItems_t

   currentStatus: OrderStatus
   timestamps: Timestamps_t
}

export type OrderedProducts_t = {
   title: string
   image: string
   id: string
}
