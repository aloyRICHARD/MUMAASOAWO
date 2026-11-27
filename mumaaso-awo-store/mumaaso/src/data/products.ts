import raw from './products.json'
import type { Product } from '../types'
// NOTE: prices, stock and fabric details are PLACEHOLDERS - replace with real values.
export const products = raw as Product[]
export const getProduct = (slug?: string) => products.find(p => p.slug === slug)
