import { readFileSync } from 'fs';
import * as util from 'util';
import logger from '../Logger/Logger';

const FILE_PROC_UPTIME = '/proc/uptime';
const FILE_PROC_STAT = '/proc/%s/stat';
const HERTZ = 100;

export interface ICpuTimes {
    cpuUserCodeTime: number
    cpuKernelCodeTime: number
    cpuStartTime: number
}

export function getCpuTimes(): ICpuTimes {
  try {
    const stats = readFileSync(util.format(FILE_PROC_STAT, process.pid)).toString().split(' ');

    return {
      cpuUserCodeTime: Number(stats[13]) + Number(stats[15]),
      cpuKernelCodeTime: Number(stats[14]) + Number(stats[16]),
      cpuStartTime: Number(stats[21]),
    };
  } catch (e) {
    logger.error(e.message);
    return {
      cpuUserCodeTime: 0,
      cpuKernelCodeTime: 0,
      cpuStartTime: 0,
    };
  }
}

export function getCpuUsage(): number {
  try {
    const upTime = readFileSync(FILE_PROC_UPTIME).toString().split(' ')[0];
    const cpuTimes = getCpuTimes();
    const totalTime = cpuTimes.cpuUserCodeTime + cpuTimes.cpuKernelCodeTime;
    const seconds = Number(upTime) - (cpuTimes.cpuStartTime / HERTZ);

    return (totalTime / HERTZ / seconds) * 100;
  } catch (e) {
    logger.error(e.message);
    return 0;
  }
}

export function getCurrentTimestamp(): bigint {
  return process.hrtime.bigint();
}
