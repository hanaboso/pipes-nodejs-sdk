import ProcessDTO from '../Utils/ProcessDTO';

export interface CommonNode {
    getName(): string;

    processAction(dto: ProcessDTO): ProcessDTO;
}
