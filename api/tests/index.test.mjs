import { describe, before, after } from 'node:test'
import Payments from './Payments.mjs'

let _server = {}
let BASE_URL = ""
let ENV = {}

export const baseUrl = () => BASE_URL;
export const server = () => _server;
export const getEnv = () => ENV;

describe("Api Workflow", () => {
    before(async () => {
        try{
            _server = (await import('../dist/server.js'))
            ENV = _server.ENV
            _server = _server.default.default
            await new Promise((resolve) => {
                _server.once("listening", () => {
                    var addr = _server.address();
                    BASE_URL = typeof addr === 'string' ? addr : 'http://localhost:' + addr.port;
                    resolve()
                })
            })
        }catch(err){
            console.log(err)
            throw err
        }
    })
    after(done => _server.close(done))
    Payments()


})