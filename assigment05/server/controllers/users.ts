import * as services from '../services';

import {Request,Response} from 'express';

export async function getUsers(req: Request, res: Response){
    const serviceResult = await services.getUsers();

    res.json(serviceResult);
}

export async function createUser(req: Request, res: Response){
    console.log(req.body);
    const serviceResult = await services.createUser(req.body);

    res.json(serviceResult);
}

export async function deleteUser(req: Request, res: Response){
    console.log(req.body);
    const serviceResult = await services.deleteUser(req.body);

    res.json(serviceResult);
}

export async function updateUser(req: Request, res: Response){
    console.log(req.body+" CONTROLLER");
    const serviceResult = await services.updateUser(req.body);

    res.json(serviceResult);
}