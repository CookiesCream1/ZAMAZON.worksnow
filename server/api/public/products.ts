import { useDbClient } from '~/composables/useDbClient'

export default defineEventHandler(async () => {
  const client = await useDbClient()

  const r = await client.query('select product_name, description, price, rating from products order by rating desc;') as { product_name: string, description: string, price: string, rating: number }[]
  return r.map(v => ({ productName: v.product_name, price: +v.price, description: v.description, rating: v.rating }))
})
