import { useDbClient } from '~/composables/useDbClient'

export default defineEventHandler(async () => {
  const client = await useDbClient()
  const r = await client.query('select category_name from product_categories;') as { category_name: string}[]
  return { title: 'clothes', categories: r.map(v => ({ name: v.category_name, checked: false })) }
})
