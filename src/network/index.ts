/**
 * Network utility functions for interacting with PocketBase collections and generic HTTP endpoints.
 *
 * This module provides easy-to-use helpers for:
 *   - CRUD operations (Create, Read, Update, Delete) on PocketBase collections
 *   - User authentication (OAuth2, logout, etc.)
 *   - Generic HTTP requests
 *
 * All functions are asynchronous and return Promises.
 *
 * @module network/index
 */
/* eslint-disable no-useless-catch */

import { queryOperators } from '@/modules/global.types'
import { pb } from '@/network/setup'

/**
 * Fetches a list of records from a PocketBase collection.
 *
 * @param {string} collection - Name of the PocketBase collection.
 * @param {Record<string, any>} [queryParams] - (Optional) Query parameters for filtering, sorting, etc.
 * @returns {Promise<any[]>} Resolves to an array of records.
 *
 * @example
 *   const users = await pbGetList('users');
 *   const filtered = await pbGetList('posts', { filter: 'published=true' });
 */
export const pbGetList = async (collection: string, queryParams?: Record<string, any>) => {
   const records = await pb.collection(collection).getFullList(queryParams)
   return records
}

/**
 * Fetches a single record by its ID from a PocketBase collection.
 *
 * @param {string} collection - Name of the PocketBase collection.
 * @param {string} recordId - The unique record ID.
 * @param {any} [expand] - (Optional) Expand related fields/collections.
 * @returns {Promise<any>} Resolves to the record data.
 *
 * @example
 *   const user = await pbGetSingleRecord('users', 'abc123');
 */
export const pbGetSingleRecord = async ({
   collection,
   recordId,
   expand = null,
   fields = undefined
}: {
   collection: string
   recordId: string
   expand?: any
   fields?: string
}) => {
   const options: any = { expand }
   if (fields) {
      options.fields = fields
   }
   const records = await pb.collection(collection).getOne(recordId, options)
   return records
}

/**
 * Fetches a single record from a collection using a field, operator, and value.
 *
 * @param {Object} params - Query parameters.
 * @param {string} params.collection - Name of the PocketBase collection.
 * @param {string} [params.field='id'] - Field to filter by (default: 'id').
 * @param {string} [params.operator=queryOperators.EQUAL_TO] - Query operator (default: '='). See queryOperators.
 * @param {any} params.param - Value to match.
 * @returns {Promise<any>} Resolves to the record data.
 *
 * @example
 *   const user = await pbGetSingleRecordQuery({ collection: 'users', field: 'email', param: 'test@mail.com' });
 */
export const pbGetSingleRecordQuery = async ({
   collection,
   field = 'id',
   operator = queryOperators.EQUAL_TO,
   param,
   ...rest
}: {
   collection: string
   field?: string
   operator?: string
   param: any
   [key: string]: any
}) => {
   const records = await pb.collection(collection).getFirstListItem(`${field} ${operator} "${param}"`, { ...rest })
   return records
}

/**
 * Fetches a single record using a complex filter string.
 *
 * @param {Object} params - Query parameters.
 * @param {string} params.collection - Name of the PocketBase collection.
 * @param {string} params.filter - Filter string (PocketBase query syntax).
 * @param {any} [params.expand] - (Optional) Expand related fields/collections.
 * @returns {Promise<any>} Resolves to the record data.
 *
 * @example
 *   const user = await pbGetSingleRecordWithComplexfilter({
 *     collection: 'users',
 *     filter: 'username ~ "john" && active=true'
 *   });
 */
export const pbGetSingleRecordWithComplexfilter = async ({
   collection,
   filter,
   expand = null
}: {
   collection: string
   filter: string
   expand?: any
}) => {
   const record = await pb.collection(collection).getFirstListItem(filter, { expand })
   return record
}

/**
 * Creates a new record in a PocketBase collection.
 *
 * @param {string} collection - Name of the PocketBase collection.
 * @param {any} data - Data for the new record (object).
 * @returns {Promise<any>} Resolves to the created record.
 *
 * @example
 *   const newUser = await pbCreateRecord('users', { email: 'test@mail.com', password: '1234' });
 */
export const pbCreateRecord = async (collection: string, data: any) => {
   const recordResult = await pb.collection(collection).create(data, { $autoCancel: false })
   return recordResult
}

/**
 * Deletes a record from a PocketBase collection by its ID.
 *
 * @param {string} collection - Name of the PocketBase collection.
 * @param {string} id - The record ID to delete.
 * @returns {Promise<void>} Resolves when deletion is complete.
 *
 * @example
 *   await pbDeleteRecord('users', 'abc123');
 */
export const pbDeleteRecord = async (collection: string, id: string) => {
   await pb.collection(collection).delete(id)
}

/**
 * Updates a record in a PocketBase collection.
 *
 * @param {string} collection - Name of the PocketBase collection.
 * @param {string} recordID - The record ID to update.
 * @param {any} data - Updated data (object).
 * @returns {Promise<any>} Resolves to the updated record.
 *
 * @example
 *   const updated = await pbUpdateRecord('users', 'abc123', { name: 'New Name' });
 */
export const pbUpdateRecord = async (
   collection: string,
   recordID: string,
   data: Record<string, unknown> | FormData
) => {
   try {
      if (!collection || !recordID) {
         throw new Error('pbUpdateRecord: collection and recordID are required')
      }
      const recordResult = await pb.collection(collection).update(recordID, data)
      console.log('[PB_UPDATE] Success:', { recordId: recordResult?.id })
      return recordResult
   } catch (error) {
      console.error('[PB_UPDATE] Failed:', { collection, recordID, error })
      throw error
   }
}

/**
 * Generic fetch utility for making HTTP requests (GET, POST, etc).
 *
 * @param {Object} params - Request parameters.
 * @param {string} params.method - HTTP method (e.g., 'GET', 'POST').
 * @param {string} params.url - The endpoint URL.
 * @param {any} [params.body] - (Optional) Request body (object, will be JSON-stringified).
 * @param {Record<string, string>} [params.headers] - (Optional) Additional headers.
 * @returns {Promise<any>} Resolves to the parsed response data.
 *
 * @example
 *   const data = await fetchData({ method: 'GET', url: '/api/posts' });
 */
export const fetchData = async ({
   method,
   url,
   body = null,
   headers = {}
}: {
   method: string
   url: string
   body?: any
   headers?: Record<string, string>
}) => {
   try {
      const options: any = {
         method,
         headers: {
            'Content-Type': 'application/json',
            ...headers
         }
      }

      if (body) options.body = JSON.stringify(body)

      const response = await fetch(url, options)
      const data = await response.json() // Parse the response body as JSON
      let parsedData = data

      // Check if the data is still a string and parse it again
      if (typeof data === 'string') {
         try {
            parsedData = JSON.parse(data)
         } catch (error) {
            console.error('Failed to parse JSON string:', data)
            throw new Error('Invalid JSON response format')
         }
      }

      if (!response.ok) {
         console.error('fetchData error:', url, response.status, parsedData)
         throw new Error(parsedData.message || parsedData.error || 'Something went wrong')
      }

      return parsedData
   } catch (error) {
      throw error
   }
}

/**
 * Signs up or logs in a user using an OAuth2 provider (e.g., Google, GitHub).
 *
 * @param {string} provider - OAuth2 provider name (e.g., 'google', 'github').
 * @param {string} code - Authorization code from the OAuth2 flow.
 * @param {any} codeVerifier - Code verifier (PKCE).
 * @param {string} redirectUrl - Redirect URL used in the OAuth2 flow.
 * @returns {Promise<any>} Resolves to the login result data.
 *
 * @example
 *   const result = await pbSignUp('google', code, verifier, redirectUrl);
 */
export const pbSignUp = async (provider: string, code: string, codeVerifier: string, redirectUrl: string) => {
   const resultLoginData = await pb
      .collection('users')
      .authWithOAuth2Code(provider, code, codeVerifier, redirectUrl)
   return resultLoginData
}

/**
 * Lists available authentication methods for users (e.g., email, OAuth2 providers).
 *
 * @returns {Promise<any>} Resolves to the list of available auth methods.
 *
 * @example
 *   const methods = await pbListAuthMethods();
 */
export const pbListAuthMethods = async () => {
   const methods = await pb.collection('users').listAuthMethods()
   return methods
}

/**
 * Logs out the current user by clearing the PocketBase auth store.
 *
 * @example
 *   pbLogOut();
 */
export const pbLogOut = () => {
   pb.authStore.clear()
}
