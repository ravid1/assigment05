import * as express from 'express';
import * as routes from './routes';
/*import * as morgan from 'morgan';
import * as path from 'path';
import * as fs from 'fs';*/


const app = express();

/*var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(morgan('combined'));*/

app.use(express.json());

app.use('/translate',routes.TranslateRouter);

app.use('/tree',routes.TreeRouter);

app.use('/users',routes.UsersRouter);

app.use('/groups',routes.GroupsRouter);

//app.use('/messages',routes.UsersRouter);

export default app;