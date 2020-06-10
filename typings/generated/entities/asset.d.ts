/// <reference types="node" />
import { Stream } from 'stream';
import { AxiosInstance } from 'axios';
import { MetaSysProps, DefaultElements, CollectionProp } from '../common-types';
export declare type AssetProps = {
    sys: {
        /** If present, indicates the locale which this asset uses */
        locale: string;
    } & MetaSysProps;
    fields: {
        /** Title for this asset */
        title: {
            [key: string]: string;
        };
        /** Description for this asset */
        description: {
            [key: string]: string;
        };
        /** File object for this asset */
        file: {
            [key: string]: {
                fileName: string;
                contentType: string;
                /** Url where the file is available to be downloaded from, into the Contentful asset system. After the asset is processed this field is gone. */
                upload?: string;
                /** Url where the file is available at the Contentful media asset system. This field won't be available until the asset is processed. */
                url?: string;
                /** Details for the file, depending on file type (example: image size in bytes, etc) */
                details?: Record<string, any>;
                uploadFrom?: Record<string, any>;
            };
        };
    };
};
export interface AssetFileProp {
    sys: MetaSysProps;
    fields: {
        title: {
            [key: string]: string;
        };
        description: {
            [key: string]: string;
        };
        file: {
            [key: string]: {
                file: string | ArrayBuffer | Stream;
                contentType: string;
                fileName: string;
            };
        };
    };
}
export interface AssetProcessingForLocale {
    processingCheckWait?: number;
    processingCheckRetries?: number;
}
declare type AssetApi = {
    /**
     * Triggers asset processing after an upload, for the files uploaded to all locales of an asset.
     * @param options - Additional options for processing
     * @prop options.processingCheckWait - Time in milliseconds to wait before checking again if the asset has been processed (default: 500ms)
     * @prop options.processingCheckRetries - Maximum amount of times to check if the asset has been processed (default: 5)
     * @return Object returned from the server with updated metadata.
     * @throws {AssetProcessingTimeout} If the asset takes too long to process. If this happens, retrieve the asset again, and if the url property is available, then processing has succeeded. If not, your file might be damaged.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createAssetWithId('<asset_id>', {
     *   title: {
     *     'en-US': 'Playsam Streamliner',
     *     'de-DE': 'Playsam Streamliner'
     *   },
     *   file: {
     *     'en-US': {
     *       contentType: 'image/jpeg',
     *       fileName: 'example.jpeg',
     *       upload: 'https://example.com/example.jpg'
     *     },
     *     'de-DE': {
     *       contentType: 'image/jpeg',
     *       fileName: 'example.jpeg',
     *       upload: 'https://example.com/example-de.jpg'
     *     }
     *   }
     * }))
     * .then((asset) => asset.processForAllLocales())
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    processForAllLocales(options?: AssetProcessingForLocale): Promise<Asset>;
    /**
     * Triggers asset processing after an upload, for the file uploaded to a specific locale.
     * @param locale - Locale which processing should be triggered for
     * @param options - Additional options for processing
     * @prop options.processingCheckWait - Time in milliseconds to wait before checking again if the asset has been processed (default: 500ms)
     * @prop options.processingCheckRetries - Maximum amount of times to check if the asset has been processed (default: 5)
     * @return Object returned from the server with updated metadata.
     * @throws {AssetProcessingTimeout} If the asset takes too long to process. If this happens, retrieve the asset again, and if the url property is available, then processing has succeeded. If not, your file might be damaged.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createAssetWithId('<asset_id>', {
     *   title: {
     *     'en-US': 'Playsam Streamliner',
     *   },
     *   file: {
     *     'en-US': {
     *       contentType: 'image/jpeg',
     *       fileName: 'example.jpeg',
     *       upload: 'https://example.com/example.jpg'
     *     }
     *   }
     * }))
     * .then((asset) => asset.processForLocale('en-US'))
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    processForLocale(locale: string, Options?: AssetProcessingForLocale): Promise<Asset>;
    /**
     * Publishes the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => asset.publish())
     * .then((asset) => console.log(`Asset ${asset.sys.id} published.`)
     * .catch(console.error)
     * ```
     */
    publish(): Promise<Asset>;
    /**
     * Archives the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => asset.archive())
     * .then((asset) => console.log(`Asset ${asset.sys.id} archived.`)
     * .catch(console.error)
     * ```
     */
    archive(): Promise<Asset>;
    /**
     * Deletes this object on the server.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => asset.delete())
     * .then((asset) => console.log(`Asset deleted.`)
     * .catch(console.error)
     * ```
     */
    delete(): Promise<void>;
    /**
     * Unarchives the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => asset.unarchive())
     * .then((asset) => console.log(`Asset ${asset.sys.id} unarchived.`)
     * .catch(console.error)
     * ```
     */
    unarchive(): Promise<Asset>;
    /**
     * Unpublishes the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => asset.unpublish())
     * .then((asset) => console.log(`Asset ${asset.sys.id} unpublished.`)
     * .catch(console.error)
     * ```
     */
    unpublish(): Promise<Asset>;
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getAsset('<asset_id>'))
     * .then((asset) => {
     *   asset.fields.title['en-US'] = 'New asset title'
     *   return asset.update()
     * })
     * .then((asset) => console.log(`Asset ${asset.sys.id} updated.`)
     * .catch(console.error)
     * ```
     */
    update(): Promise<Asset>;
    /**
     * Checks if the asset is published. A published asset might have unpublished changes
     */
    isPublished(): boolean;
    /**
     * Checks if the asset is updated. This means the asset was previously published but has unpublished changes.
     */
    isUpdated(): boolean;
    /**
     * Checks if the asset is in draft mode. This means it is not published.
     */
    isDraft(): boolean;
    /**
     * Checks if asset is archived. This means it's not exposed to the Delivery/Preview APIs.
     */
    isArchived(): boolean;
};
export interface Asset extends AssetProps, DefaultElements<AssetProps>, AssetApi {
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw asset data
 * @return Wrapped asset data
 */
export declare function wrapAsset(http: AxiosInstance, data: AssetProps): AssetProps & {
    toPlainObject(): AssetProps;
};
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw asset collection data
 * @return Wrapped asset collection data
 */
export declare function wrapAssetCollection(http: AxiosInstance, data: CollectionProp<AssetProps>): CollectionProp<AssetProps> & {
    toPlainObject(): CollectionProp<AssetProps>;
};
export {};