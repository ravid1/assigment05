import * as services from '../services'

import {Request, Response} from "express";

export default async function (req: Request, res: Response) {
    const serviceResult = await services.getTree();

    res.json(serviceResult);
}