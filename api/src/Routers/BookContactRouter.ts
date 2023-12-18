import { Router } from "express";
import RequestHandler from "../Helpers/RequestHandler";
import * as ContactsController from '../Controllers/ContactsController';

const routes = Router();

routes.post("/contacts", RequestHandler(ContactsController.create));
routes.get("/contacts", RequestHandler(ContactsController.list));
routes.get("/contacts/:id", RequestHandler(ContactsController.get));
routes.put("/contacts/:id", RequestHandler(ContactsController.update));
routes.delete("/contacts/:id", RequestHandler(ContactsController.remove));

export default routes;