//general function, can be used in any project to mitiigate the use of try-catch.

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
    }
}

export { asyncHandler } 