import { Request, Response } from "express";
import HttpResponse from "../Helpers/HttpResponse";
import HttpError from "../Helpers/HttpError";
import RawHttpResponse from "../Helpers/RawHttpResponse";
import pool from '../db';

export async function create(req: Request, res: Response): Promise<HttpResponse | RawHttpResponse> {
    const query = req.body;
    if (!query) {
        throw new HttpError("Missing body", 400);
    }

    const { first_name, last_name, phone_number } = query;
    const insertQuery = 'INSERT INTO contacts (first_name, last_name, phone_number) VALUES (?, ?, ?)';

    await pool.query(insertQuery, [first_name, last_name, phone_number]);

    return HttpResponse.Ok({ message: "Contact created" });
}

export async function update(req: Request, res: Response): Promise<HttpResponse | RawHttpResponse> {
    const updateQuery = 'UPDATE contacts SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?';

    await pool.query(updateQuery, [req.body.first_name, req.body.last_name, req.body.phone_number, req.params.id]);

    return HttpResponse.Ok({ message: "Contact updated" });
}

export async function list(req: Request, res: Response): Promise<HttpResponse | RawHttpResponse> {
    let selectQuery = 'SELECT * FROM contacts';
    if(req.query.last_name) {
        selectQuery += ' WHERE last_name like "%'+req.query.last_name+'%"';
    }

    const response = await pool.query(selectQuery);

    return HttpResponse.Ok(response[0]);
}

export async function get(req: Request, res: Response): Promise<HttpResponse | RawHttpResponse> {
    const selectQuery = 'SELECT * FROM contacts WHERE id = ?';

    const response = await pool.query(selectQuery, [req.params.id]);

    return HttpResponse.Ok(response[0]);
}

export async function remove(req: Request, res: Response): Promise<HttpResponse | RawHttpResponse> {
    const removeQuery = 'DELETE FROM contacts WHERE id = ?';

    await pool.query(removeQuery, [req.params.id]);

    return HttpResponse.Ok({ message: "Contact deleted" });
}
