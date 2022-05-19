export interface User {
  id: string
  name: string
  displayName: string
  avatar: any
  remark: any
  status: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  identifier: string
  remark: any
  status: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export interface Workload {
  id: string
  description: string
  duration: number
  date: string
  userId: string
  avatar: any
  projectId: string
  workItemId: string
  workItemTitle: string
  workItemDescription: string
  workItemIdentifier: string
  workItemType: string
  status: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  user: User
  project: Project
}
