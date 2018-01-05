const fetch = require('node-fetch')
const logger = require('../services/logger')
const { rateTemplate, resultTemplate } = require('../services/utils')

const meta = {
    name: 'CryptoCompare',
    api: 'https://min-api.cryptocompare.com/data/price',
    url: 'https://cryptocompare.com',
    currencies: ['eth', 'btc', 'ltc', 'xmr', 'rep', 'zec'],
}

const getCurrency = async () => {
    try {
        const currencies = {}

        for (const key of meta.currencies) {
            const currency = await fetch(`${meta.api}?fsym=${key.toUpperCase()}&tsyms=USD,EUR`)
            const json = await currency.json()

            currencies[key] = rateTemplate(json.USD, json.EUR)
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
