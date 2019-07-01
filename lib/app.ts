import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from "./routes/routes";
import './controllers/playerController';
import './controllers/teamController';
import './controllers/wpController';
import './controllers/hvwController';

class App {

    public app: express.Express;
    // public routePrv: Routes = new Routes();
    private user = process.env.userID || 'default:zhDLnu7Y8RK3RzRr';
    private mongoUrl: string = `mongodb+srv://${this.user}@cluster0-pi16x.mongodb.net/wh`;

    constructor() {
        this.app = express();
        this.config();
        RegisterRoutes(this.app);
        // this.routePrv.routes(this.app);
        this.mongoSetup();

        this.swagger();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true
        });
    }

    private swagger(): void {
        try {
            const swaggerDocument = require('../swagger.json');
            this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        } catch (err) {
            console.error('Unable to read swagger.json', err);
        }
    }

}

export default new App().app;