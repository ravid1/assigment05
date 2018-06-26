import * as express from 'express';
import * as Controllers from '../controllers';

const router = express.Router();

router.get('/',Controllers.TreeController);

export default router;