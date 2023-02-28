export type BusinessTypes = {
  user_id?: string
  line_id?: string
  name?: string
  email?: string
  tele?: string
  street?: string
  address?: string
  open?: string
  close?: string
  image?: string
  color?: string
  website?: string
  notes?: string
  host?: string
  street_number?: string
  city?: string
  coordinates?: string
  zip?: string
  area?: string
  country?: string
  small?: number
  rate?: number
  category?: string
  raffle?: number
  promo?: number
  favorite?: any
  last_update?: string
  created?: string
  index?: number
}

export type management = {
  database_id?: number
  ID_NO?: string
  line_id?: string
  full_name?: string
  role?: string
  permissions?: 'Full-Access' | 'Limited-Access' |'No-Access'
  pin?: string
  index?: number
}