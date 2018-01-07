const { initChecker, getCurrency, destroyChecker } = require('./currencyChecker')
const config = require('../config/index')

initChecker()

const initSocket = (socket) => {
    const sendCurrency = () => (socket.emit('updateCurrency', getCurrency()))
    sendCurrency()

    const interval = setInterval(sendCurrency, config.updateInterval)

    socket.on('disconnect', () => {
        clearInterval(interval)
        destroyChecker()
    })
}

module.exports = (io) => io.on('connection', initSocket)
