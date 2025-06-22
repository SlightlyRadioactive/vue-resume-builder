export type ItemKey = 'title' | 'place' | 'date_end' | 'date_start' | 'location' | 'description'
export type ListEntry = { [K in ItemKey]?: string }

export interface InfoEntry {
  title: string
  items: string[]
}

export interface LongInfo {
  title: string
  list: ListEntry[]
}

export interface ShortInfo {
  title: string
  list: InfoEntry[]
}

export interface ResumeData {
  name: string
  contacts: string[]
  summary: { title: string; text: string }
  works: LongInfo
  degrees: LongInfo
  projects: LongInfo
  extraInfo: ShortInfo
}

export const DEFAULT_DATA: ResumeData = {
  name: 'Your Name',
  contacts: ['Email', 'Phone', 'Location'],
  summary: { title: 'Summary', text: 'Description' },
  works: { title: 'Experience', list: [{ place: 'Company', title: 'Position' }] },
  degrees: { title: 'Education', list: [{ place: 'Institution', title: 'Degree' }] },
  projects: { title: 'Projects', list: [{ place: 'Project Name', title: 'Role' }] },
  extraInfo: {
    title: 'Additional Info',
    list: [{ title: 'Skills:', items: ['Item1', 'Item2', 'Item3'] }],
  },
}
