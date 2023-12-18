const ResponseCodes = {
  CREATED: 201,
  OK: 200,
  NO_CONTENT: 204,
};

type Payload = any;

export default class RawHttpResponse {
  public payload: Payload;

  public statusCode: number;

  constructor(payload: Payload, statusCode: number = ResponseCodes.OK) {
    this.payload = payload;
    this.statusCode = statusCode;
  }

  static Created(payload: Payload) {
    return new RawHttpResponse(payload, ResponseCodes.CREATED);
  }

  static Ok(payload: Payload) {
    return new RawHttpResponse(payload, ResponseCodes.OK);
  }

  static NoContent() {
    return new RawHttpResponse({}, ResponseCodes.NO_CONTENT);
  }
}
