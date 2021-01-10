import { ICommonNode } from '../../lib/Commons/ICommonNode';
import ProcessDTO from '../../lib/Utils/ProcessDTO';
import ResultCode from '../../lib/Utils/ResultCode';
import send from '../../lib/Transport/Curl/Sender';
import RequestDto from '../../lib/Transport/Curl/RequestDto';
import ResponseDto from '../../lib/Transport/Curl/ResponseDto';
import HttpMethods from '../../lib/Transport/HttpMethods';

export default class TestConnector implements ICommonNode {
  getName(): string {
    return 'test';
  }

  processAction(dto: ProcessDTO): Promise<ProcessDTO> {
    dto.setJsonData({ test: 'ok', processed: Date.now().toString() });
    dto.setStopProcess(ResultCode.DO_NOT_CONTINUE);

    const requestDto = new RequestDto('http://jsonplaceholder.typicode.com/users', HttpMethods.GET, dto);
    return send(requestDto).then((r: ResponseDto) => {
      dto.setData(r.getBody());

      return dto;
    });
  }
}
