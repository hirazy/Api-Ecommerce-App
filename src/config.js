/* eslint-disable no-unused-vars */
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable')
    }
    return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv-safe')
    dotenv.config({
        path: path.join(__dirname, '../.env'),
        example: path.join(__dirname, '../.env.example')
    })
}

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        root: path.join(__dirname, '..'),
        port: process.env.PORT || 9000,
        ip: process.env.IP || '0.0.0.0',
        apiRoot: process.env.API_ROOT || '',
        defaultEmail: requireProcessEnv('DEFAULT_EMAIL'),
        sendgridKey: requireProcessEnv('SENDGRID_KEY'),
        masterKey: requireProcessEnv('MASTER_KEY'),
        jwtSecret: requireProcessEnv('JWT_SECRET'),
        stripeKey: requireProcessEnv('STRIPE_KEY'),
        firebaseTokenKey: requireProcessEnv('FIREBASE_TOKEN_KEY'),
        googleServiceKey: requireProcessEnv('GOOGLE_SERVICE_KEY'),
        hostNameMomo: requireProcessEnv('HOST_NAME_MOMO'),
        momoAccessKey: requireProcessEnv('MOMO_ACCESS_KEY'),
        momoSecretKey: requireProcessEnv('MOMO_SECRET_KEY'),
        momoPartnerCode: requireProcessEnv('MOMO_PARTNER_CODE'),
        momoPartnerName: requireProcessEnv('MOMO_PARTNER_NAME'),
        momoPublicKey: requireProcessEnv('MOMO_PUBLIC_KEY'),
        googleProjectId: requireProcessEnv('GOOGLE_PROJECT_ID'),
        twilioAccountSID: requireProcessEnv('TWILIO_ACCOUNT_SID'),
        twilioAuthToken: requireProcessEnv('TWILIO_AUTH_TOKEN'),
        passwordSecret: requireProcessEnv('PASSWORD_SECRET'),
        mongo: {
            options: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            }
        }
    },
    test: {},
    development: {
        mongo: {
            uri: 'mongodb://localhost/api-commerce-dev',
            options: {
                debug: true
            }
        }
    },
    production: {
        ip: process.env.IP || undefined,
        port: process.env.PORT || 8080,
        mongo: {
            uri: process.env.MONGODB_URI || 'mongodb://localhost/api-commerce'
        }
    }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports