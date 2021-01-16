import ProcessDTO from '../Utils/ProcessDTO';

export default class OnRepeatException extends Error {
    private dto: ProcessDTO;

    private interval: number;

    private maxHops: number;

    constructor(dto: ProcessDTO, message?: string) {
      super(message);

      this.dto = dto;
      this.interval = 60000;
      this.maxHops = 10;
    }

    public getDto(): ProcessDTO {
      return this.dto;
    }

    public setDto(value: ProcessDTO): void {
      this.dto = value;
    }

    public getInterval(): number {
      return this.interval;
    }

    public setInterval(value: number): void {
      this.interval = value;
    }

    public getMaxHops(): number {
      return this.maxHops;
    }

    public setMaxHops(value: number): void {
      this.maxHops = value;
    }
}
