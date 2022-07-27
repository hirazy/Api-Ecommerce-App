import { success, notFound } from '../../services/response/'
import { middleware as body } from 'bodymen'
import Message, { schema } from './model'
import Room, { roomSchema } from '../room/model'
import Resource, { resourceSchema } from '../resource/model'

export const create = ({ bodymen: body, user }, res, next) => {
    const bodyMessage = {...body, sender: user.id }
    Message.create(bodyMessage)
        .then((message) => message.view(true))
        .then(success(res, 201))
        .catch(next)
}

export const createResourceMessage = (res, next) => {

}


export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Message.find(query, select, cursor)
    .then((messages) => messages.map((message) => message.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Message.findById(params.id)
    .then(notFound(res))
    .then((message) => message ? message.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Message.findById(params.id)
    .then(notFound(res))
    .then((message) => message ? Object.assign(message, body).save() : null)
    .then((message) => message ? message.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Message.findById(params.id)
    .then(notFound(res))
    .then((message) => message ? message.remove() : null)
    .then(success(res, 204))
    .catch(next)