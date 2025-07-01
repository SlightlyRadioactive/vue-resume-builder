export type ItemKey = 'title' | 'place' | 'date_end' | 'date_start' | 'location' | 'description'
export type ListItem = { [K in ItemKey]?: string } & { isVisible?: boolean }
export type LongInfo = { title: string; list: ListItem[]; isVisible?: boolean }

export type InlineItem = { content?: string; isVisible?: boolean }
export type LineItem = { title: string; items: InlineItem[]; isVisible?: boolean }
export type ShortInfo = { title: string; list: LineItem[]; isVisible?: boolean }

export type ResumeData = {
  name: string
  contacts: InlineItem[]
  summary: { title: string; text: string; isVisible: boolean }
  works: LongInfo
  degrees: LongInfo
  projects: LongInfo
  extraInfo: ShortInfo
}

export const DEFAULT_DATA: ResumeData = {
  name: 'Your Name',
  contacts: [
    { content: 'Email', isVisible: true },
    { content: 'Phone', isVisible: true },
    { content: 'Location', isVisible: true },
    { content: 'Contact', isVisible: true },
  ],
  summary: { title: 'Summary', text: 'Description', isVisible: true },
  works: {
    title: 'Experience',
    list: [{ place: 'Company', title: 'Position', isVisible: true }],
    isVisible: true,
  },
  degrees: {
    title: 'Education',
    list: [{ place: 'Institution', title: 'Degree', isVisible: true }],
    isVisible: true,
  },
  projects: {
    title: 'Projects',
    list: [{ place: 'Project Name', title: 'Role', isVisible: true }],
    isVisible: true,
  },
  extraInfo: {
    title: 'Additional Info',
    list: [
      {
        title: 'Skills:',
        items: [
          { content: 'Item', isVisible: true },
          { content: 'Item2', isVisible: true },
          { content: 'Item3', isVisible: true },
        ],
        isVisible: true,
      },
    ],
    isVisible: true,
  },
}
