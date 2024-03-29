import { success, notFound } from '../../services/response/'
import Shop, { schema } from './model'
import Product, { productSchema } from '../product/model'

export const create = ({ body }, res, next) =>
    Shop.create(body)
    .then((shop) => shop.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Shop.find(query, select, cursor)
    .then((shops) => shops.map((shop) => shop.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => shop ? shop.view() : null)
    .then(success(res))
    .catch(next)

export const getDetailShop = async({ params }, res, next) => {

    let shopView = await Shop.findById(params.id)
        .then(notFound(res))
        .then((shop) => shop ? shop.view(true) : null)
        .catch(next)

    let productViews = await Product.find({ shop: params.id })
        .then(notFound(res))
        .then((products) => products.map((product) => product.view()))
        .catch(next)

    res.status(200).json({
        shop: shopView,
        products: productViews
    })
}

export const update = ({ body, params }, res, next) =>
    Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => shop ? Object.assign(shop, body).save() : null)
    .then((shop) => shop ? shop.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Shop.findById(params.id)
    .then(notFound(res))
    .then((shop) => shop ? shop.remove() : null)
    .then(success(res, 204))
    .catch(next)