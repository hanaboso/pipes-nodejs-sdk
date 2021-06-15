import ProcessDTO from '../Utils/ProcessDTO';
import { IName } from './IName';

export interface ICommonNode extends IName{
    processAction(dto: ProcessDTO): Promise<ProcessDTO>;
}
