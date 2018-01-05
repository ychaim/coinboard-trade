const fetch = require('node-fetch')
const logger = require('../services/logger')
const { rateTemplate, resultTemplate } = require('../services/utils')

const meta = {
    name: 'CoinDesk.com',
    api: 'http://api.coindesk.com/v1/bpi/currentprice.json',
    url: 'http://coindesk.com',
    currencies: ['btc'],
}

const getCurrency = async () => {
    try {
        const currency = await fetch(meta.api)
        const json = await currency.json()
        const currencies = {
            btc: rateTemplate(json.bpi.USD.rate_float, json.bpi.EUR.rate_float),
        }

        return resultTemplate(meta, currencies)
    }

    catch (e) {
        logger.error(e)
    }
}

module.exports = {
    meta,
    getCurrency,
}
