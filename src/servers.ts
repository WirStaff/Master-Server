import { Http } from './http';
import { transformUtil } from './utils/transform.util';
import { endPacket } from './consts/end.packet';

export class Servers {
  private servers: number[] = [];
  private readonly http: Http;

  private readonly step: number;
  private readonly SIZE = 6;

  constructor() {
    this.http = new Http();
    this.step = Number(process.env.RETURN_PER_STAGE);
  }

  public async start(): Promise<void> {
    await this.uploadServers();

    setInterval(() => {
      this.uploadServers();
    }, 1000 * Number(process.env.INTERVAL_GET_SERVERS));
  }

  public async reply(server: string, address?: string): Promise<number[]> {
    let index = 0;

    if (server == '0.0.0.0:0') {
      await this.http.sendStats(address);
    } else {
      const lastAddress = transformUtil(server);

      for (let i = 0, success = 0, stop = false; i < this.servers.length; i++) {
        if (this.servers[i] == lastAddress[0] && !success) {
          for (let j = 0; j < lastAddress.length; j++) {
            if (this.servers[i + j] == lastAddress[j]) {
              success++;

              if (success == lastAddress.length) {
                index = i + j + 1;
                stop = true;
                break;
              }
            } else {
              success = 0;
            }
          }
        }

        if (stop) {
          break;
        }
      }
    }

    return this.rangeServers(index);
  }

  private async uploadServers(): Promise<void> {
    const data: string[] = await this.http.getServers();
    this.servers = transformUtil(data);
    this.servers.concat(endPacket);
  }

  private rangeServers(index: number): number[] {
    const buffer: number[] = [];

    for (let i = index; i < index + this.SIZE * this.step; i++) {
      buffer.push(this.servers[i]);
    }

    return buffer;
  }
}
