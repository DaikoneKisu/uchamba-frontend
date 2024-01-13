import { derived } from 'svelte/store'

import {
  careersFilter as c,
  locationFilter as lo,
  languageFilter as la,
  hardSkillsFilter as h,
  softSkillsFilter as s
} from './filters'

export const filters = derived([c, lo, la, h, s], ([$c, $lo, $la, $h, $s]) => ({
  careers: $c,
  country: $lo?.country,
  state: $lo?.state,
  city: $lo?.city,
  languages: $la,
  hSkills: $h,
  sSkills: $s
}))
