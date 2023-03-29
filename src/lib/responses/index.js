export const okResponse = (data) => {
    return {
        data,
    }
}

export const errorResponse = (data) => {
    return {
        code: 400,
        error: 'NotFound',
        message: ''
    }
}
