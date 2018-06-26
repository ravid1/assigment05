import * as express from 'express';
import * as groupController from '../controllers/groups';

const router = express.Router();

router.get('/',groupController.getGroups);

router.delete('/',groupController.deleteGroup);

router.post('/',groupController.addGroup);

router.post('/user',groupController.addUserToGroup);


export default router;