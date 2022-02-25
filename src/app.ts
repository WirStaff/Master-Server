import 'dotenv/config';
import { createSocket, RemoteInfo, Socket } from 'dgram';
import { ipPortRegex } from './consts/ip-port.regex';
import { startPacket } from './consts/start.packet';
import { Servers } from './servers';

export class App {
  private readonly socket: Socket;
  private readonly servers: Servers;

  constructor() {
    this.socket = createSocket('udp4');
    this.socket.bind(Number(process.env.SERVER_PORT), process.env.SERVER_ADDRESS, () => {
      console.log(`Master Server Start ${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}`);
      this.socket.on('message', messageEvent);
    });
    this.servers = new Servers();
  }

  public getSocket(): Socket {
    return this.socket;
  }

  public async startServers(): Promise<void> {
    await this.servers.start();
  }

  public getServers(): Servers {
    return this.servers;
  }
}

function messageEvent(message: Buffer, rinfo: RemoteInfo): void {
  const result = message.toString().match(ipPortRegex);

  if (result) {
    setTimeout(async () => {
      const reply = await app.getServers().reply(result[0], rinfo.address);

      const buffer = new Uint8Array([...startPacket, ...reply]);
      app.getSocket().send(buffer, 0, buffer.length, rinfo.port, rinfo.address, (error: Error | null) => {
        if (error) {
          console.error(error);
        }
      });
    }, 1000 * Number(process.env.INTERVAL_FOR_SEND));
  }
}

const app = new App();
app.startServers();
