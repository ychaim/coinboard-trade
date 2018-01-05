const fetch = require('node-fetch')
const logger = require('../services/logger')
const { rateTemplate, resultTemplate } = require('../services/utils')

const meta = {
    name: 'blockchain.info',
    api: 'https://blockchain.info/ticker',
    url: 'https://blockchain.info',
    currencies: ['btc'],
};

const getCurrency = async () => {
    try {
        const currency = await fetch(meta.api)
        const json = await currency.json()
        const currencies = {
            btc: rateTemplate(json.USD.last, json.EUR.last),
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
