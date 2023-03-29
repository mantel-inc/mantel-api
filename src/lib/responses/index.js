export const OkResponse = (data) => {
    return {
        data: data
    }
}

/**
 *
 * @param err
 * @param message
 * @param code
 * @returns {{error: {type: *, code: number, message: string}}}
 */
export const ErrorResponse = function(err, message = '', code = 504) {
    return {
        error: {
            type: err.toString(),
            code: code,
            message: message,
        },
    }
}
