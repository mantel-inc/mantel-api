const mapRequest = (req) => ({
    method: req.method,
    url: req.url,
    // userId: r
    // accountId: req.user.account_id,
    ip: req.ip,
})

export default (config) => (req, res, next) => {
    // if(config.ignorePaths.includes(req.path) || config.ignoreMethods.includes(req.method)) {
    //     return next()
    // }
    req.log.info('Request received', mapRequest(req, config))
    return next()
}
