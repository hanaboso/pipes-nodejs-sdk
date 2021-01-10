import ProcessDTO from '../Utils/ProcessDTO';

export interface ICommonNode {
    getName(): string;
    processAction(dto: ProcessDTO): Promise<ProcessDTO>;
}
