import axios from 'axios'
import _ from 'underscore'
import humps from 'humps'
import qs from 'qs'

import { VLS_API_ENDPOINT } from '../config/backend.config'

export default class Api {
  constructor(config = {}) {
    if (this.constructor === 'Api') {
      throw new TypeError('Cannot create instances of Api directly.')
    }
    this.config = _.extend(
      {},
      {
        baseURL: VLS_API_ENDPOINT,
        transformRequest: [
          this._transformRequest,
          ...axios.defaults.transformRequest,
        ],
        transformResponse: [
          this._transformResponse,
          ...axios.defaults.transformResponse,
        ],
        paramsSerializer: this._paramsSerializer,
      },
      config,
    )
    this.client = axios.create(this.config)
  }

  get = (url, params = {}, headers = {}) =>
    this._request({ method: 'GET', url, params, headers })

  post = (url, data, params = {}, headers = {}) =>
    this._request({ method: 'POST', url, data, params, headers })

  put = (url, data, params = {}, headers = {}) =>
    this._request({ method: 'PUT', url, data, params, headers })

  delete = (url, data = null, params = {}, headers = {}) =>
    this._request({ method: 'DELETE', url, data, params, headers })

  _request = config => {
    console.info(`${config.method} ${config.url}`)
    return this.client.request(config)
  }

  _transformRequest = (data, _headers) => {
    if (data) {
      data = humps.decamelizeKeys(data)
      console.info(data)
      return data
    }
    return data
  }

  _transformResponse = data => {
    if (data) {
      data = humps.camelizeKeys(data)
    }
    return data
  }

  _paramsSerializer = (params = {}) =>
    qs.stringify(humps.decamelizeKeys(params), { format: 'RFC1738' })
}
