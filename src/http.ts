import axios from 'axios';

export class Http {
  private readonly game: string;
  private readonly urlServers: string;
  private readonly urlStats: string;
  private readonly secret: string;

  constructor() {
    this.game = process.env.GAME!;
    this.urlServers = process.env.WEB_GET_SERVERS!;
    this.urlStats = process.env.WEB_SEND_STATS!;
    this.secret = process.env.WEB_SECRET!;
  }

  public async getServers<T>(): Promise<T> {
    const query = new URL(this.urlServers);
    query.searchParams.append('game', this.game);
    query.searchParams.append('secret', this.secret);

    const result = await axios.get(query.href);

    if (result.status != 200) {
      throw new Error('Invalid status code');
    }

    return result.data;
  }

  public async sendStats(address?: string): Promise<void> {
    if (address) {
      const data = JSON.stringify({ address, game: this.game, secret: this.secret });

      try {
        await axios.post(this.urlStats, data);
      }
      catch (e) {
        console.error(e);
      }
    }
  }
}
