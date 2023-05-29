import type { Icon } from 'tabler-icons-react'
import { Adjustments, FileAnalytics, Gauge, Home, PresentationAnalytics } from 'tabler-icons-react'

export type NavigationItem = {
  label: string
  icon: Icon
  initiallyOpened?: boolean
  link?: string
  childs?: NavigationChildItem[]
}

export type NavigationChildItem = {
  label: string
  link: string
}

export const navigation: NavigationItem[] = [
  { label: 'Dashboard', icon: Home, link: '/' },
  {
    label: 'Capacities',
    icon: Gauge,
    link: '/capacities',
  },
  { label: 'Analytics', icon: PresentationAnalytics },
  { label: 'Contracts', icon: FileAnalytics },
  { label: 'Settings', icon: Adjustments },
]
