import { RequestHandler } from "express"

export const loadFromHiddenField : RequestHandler = (req, res)=> {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
        const method = req.body._method
        delete req.body._method
        return method
    }
}