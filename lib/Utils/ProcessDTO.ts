import Dict = NodeJS.Dict;

interface ProcessDTOInterface {
    getBody(): string;

    getJsonBody(): unknown;

    getHeaders(): Dict<string | string[]>;
}

export default class ProcessDTO implements ProcessDTOInterface {
    private readonly body: string;

    private readonly headers: Dict<string | string[]>;

    constructor(body: string, headers: Dict<string | string[]>) {
      this.body = body;
      this.headers = headers;
    }

    getBody(): string {
      return this.body;
    }

    getHeaders(): Dict<string | string[]> {
      return this.headers;
    }

    getJsonBody(): unknown {
      return JSON.parse(this.body);
    }
}
