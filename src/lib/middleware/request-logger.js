/**
 * mapRequest data
 * @param req
 * @returns {{method, ip: *, url}}
 */
const mapRequest = (req) => ({
    method: req.method,
    url: req.url,
    ip: req.ip,
})

/**
 * request logger
 * @param config
 * @returns {function(*, *, *): *}
 */
export default (config) => (req, res, next) => {
    req.log.info('Request received', mapRequest(req, config))
    return next()
}
