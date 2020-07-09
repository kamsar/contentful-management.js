import { TagProps } from './entities/tag'

export interface DefaultElements<TPlainObject extends object = object> {
  toPlainObject(): TPlainObject
}

export interface MetaSysProps {
  type: string
  id: string
  space?: { sys: MetaLinkProps }
  status?: { sys: MetaLinkProps }
  version: number
  createdBy?: { sys: MetaLinkProps }
  createdAt: string
  updatedBy?: { sys: MetaLinkProps }
  updatedAt: string
  publishedVersion?: number
  archivedVersion?: number
}

export interface MetaLinkProps {
  type: string
  linkType: string
  id: string
}

export interface MetadataProps {
  tags: TagProps[]
}

export interface CollectionProp<TObj> {
  sys: {
    type: 'Array'
  }
  total: number
  skip: number
  limit: number
  items: TObj[]
}

export interface Collection<T, TPlain>
  extends CollectionProp<T>,
    DefaultElements<CollectionProp<TPlain>> {}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface QueryOptions extends BasicQueryOptions {
  content_type?: string
  include?: number
}

export interface BasicQueryOptions {
  skip?: number
  limit?: number
  order?: string

  [key: string]: any
}
