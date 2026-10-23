//importing blueprint. ...= require("") command
import express, { type Express, type Request, type Response } from 'express';


//declaration bleprint. Express is a type.
const app: Express = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Protocol Restaurant API is running",
    });
});

//exportation blueprint. if in case of compactability with standard JS.
//use. export = app;
export default app;