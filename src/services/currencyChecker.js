const fs = require('fs')
const path = require('path')
const logger = require('./logger')
const config = require('../config')
const transportsDirectory = path.join(__dirname, '..', 'transports')
const transports = []
const rates = {}
let checkInterval

const initChecker = async () => {
    try {
        const transportFiles = fs.readdirSync(transportsDirectory)

        for (const transportFile of transportFiles) {
            logger.info(`Initialization transport: ${transportFile}`)
            const transport = require(`${transportsDirectory}/${transportFile}`)
            transports.push(transport)
        }
    }

    catch (e) {
        logger.error(e)
    }
}

const runTransports = async () => {
    for (const transport of transports) {
        rates[transport.meta.name] = await transport.getCurrency()
    }
}

const getCurrency = () => {
    if (!checkInterval) {
        checkInterval = setInterval(runTransports, config.updateInterval)
    }

    return rates
}

const destroyChecker = () => {
    clearInterval(checkInterval)
    checkInterval = undefined
}

module.exports = {
    getCurrency,
    initChecker,
    destroyChecker,
}
