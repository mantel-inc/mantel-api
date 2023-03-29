import _ from "lodash"

export const transformToSnakeCase = (data) => {
    return Object.entries(data).reduce((curr, acc, index) => {
        const key = _.snakeCase(acc[0])
        curr[key] = acc[1]
        return curr
    }, {})
}
