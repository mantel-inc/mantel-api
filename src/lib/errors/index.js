'use strict'

class ApiError extends Error {
  constructor (status, message, name) {
    super(message)
    this.name = name || 'ApiError'
    this.status = status
  }
}

module.exports = {
  ApiError
}
