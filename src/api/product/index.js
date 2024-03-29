import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, searchByKeyWord, searchByCategory, getRandomProduct, getProductDetail, getProductFavorites } from './controller'
import Product, { schema } from './model'
import { password as passwordAuth, master, token } from '../../services/passport'
const sequelize = require('sequelize')

const router = new Router()

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.post('/',
    master(),
    // token({ required: true, roles: ['admin'] }),
    body(),
    create)

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    token({ required: true, roles: ['admin'] }),
    query(),
    index)

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/detail/:id',
    master(),
    // token({ required: false }),
    getProductDetail)

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/id/:id',
    master(),
    token({ required: false }),
    show)

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/favorites/me',
    // master(),
    token({ required: true }),
    getProductFavorites)

/**
 * @api {get} /products/search:name Retrieve product by Search by Keywords
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/search/name/:name',
    master(),
    searchByKeyWord)

/**
 * @api {get} /products/search:name Retrieve product by Search by Keywords
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/search/category:category',
    master(),
    searchByCategory)

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
// router.get('/:id',
//     master(),
//     show)

/**
 * @api {get} /products/:id Retrieve product of authentication me
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/home',
    master(),
    // query(),
    // token({ required: true, roles: ["user"] }),
    getRandomProduct)

/**
 * @api {get} /products/:id Retrieve product of authentication me
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/me',
    master(),
    token({ required: true, roles: ["user"] }),
    show)

// /**
//  * @api {get} /products/:id Retrieve product of authentication me
//  * @apiName RetrieveProduct
//  * @apiGroup Product
//  * @apiSuccess {Object} product Product's data.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  * @apiError 404 Product not found.
//  */
// router.get('/me',
//     master(),
//     token({ required: true, roles: ["user"] }),
//     show)

/**
 * @api {put} /products/:id Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.put('/:id',
    master(),
    update)

/**
 * @api {delete} /products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 */
router.delete('/:id',
    token({ required: true, roles: ['admin'] }),
    destroy)

export default router