const rateTemplate = (usd, eur) => ({ usd, eur })

const resultTemplate = (meta, rates) => (
    {
        meta,
        rates,
        updated: new Date(),
    }
)

module.exports = {
    rateTemplate,
    resultTemplate,
}
