import * as services from '../services';

import {Request,Response} from 'express';

export async function getGroups(req: Request, res: Response){
    const serviceResult = await services.getGroups();

    res.json(serviceResult);
}

export async function deleteGroup(req: Request, res: Response){
    const serviceResult = await services.deleteGroup(req.body.data);

    res.json(serviceResult);
}

export async function addGroup(req: Request, res: Response) {
    console.log(req.body);
    const serviceResult = await services.addGroup(req.body);
    console.log(serviceResult);
}

export async function addUserToGroup(req: Request, res: Response){
    console.log(req.body);
    const serviceResult = await services.addUserToGroup(req.body);
    console.log(serviceResult);
    res.json(serviceResult);
}