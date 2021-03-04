import type { AxiosInstance } from 'contentful-sdk-core'
import * as raw from './raw'
import copy from 'fast-copy'
import { CollectionProp } from '../../../common-types'
import { GetSpaceEnvironmentParams, QueryParams } from '../../../plain/common-types'
import { CreateTagProps, TagProps } from '../../../entities/tag'

export type GetTagParams = GetSpaceEnvironmentParams & { tagId: string }

const getBaseUrl = (params: GetSpaceEnvironmentParams) =>
  `/spaces/${params.spaceId}/environments/${params.environmentId}/tags`

const getTagUrl = (params: GetTagParams) => getBaseUrl(params) + `/${params.tagId}`

export const get = (http: AxiosInstance, params: GetTagParams) =>
  raw.get<TagProps>(http, getTagUrl(params))

export const getMany = (http: AxiosInstance, params: GetSpaceEnvironmentParams & QueryParams) =>
  raw.get<CollectionProp<TagProps>>(http, getBaseUrl(params), {
    params: params.query,
  })

export const createWithId = (
  http: AxiosInstance,
  params: GetTagParams,
  rawData: CreateTagProps
) => {
  const data = copy(rawData)

  return raw.put<TagProps>(http, getTagUrl(params), data)
}

export const update = (
  http: AxiosInstance,
  params: GetTagParams,
  rawData: TagProps,
  headers?: Record<string, unknown>
) => {
  const data = copy(rawData)
  delete data.sys

  return raw.put<TagProps>(http, getTagUrl(params), data, {
    headers: {
      'X-Contentful-Version': rawData.sys.version ?? 0,
      ...headers,
    },
  })
}

export const del = (http: AxiosInstance, params: GetTagParams, version: number) => {
  return raw.del(http, getTagUrl(params), { headers: { 'X-Contentful-Version': version } })
}