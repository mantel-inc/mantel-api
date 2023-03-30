class ApiError extends Error {
    constructor(status, name, message) {
        super(message)
        this.type = name || 'ApiError'
        this.status = status
    }
}

export {
    ApiError
}
