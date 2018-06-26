import * as express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/',controllers.getUsers);

router.post('/',express.json(),controllers.createUser);

router.delete('/',express.json(),controllers.deleteUser);

router.put('/',express.json(),controllers.updateUser);

export default router;