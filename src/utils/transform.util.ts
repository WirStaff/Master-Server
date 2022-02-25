export function transformUtil(servers: string[] | string): number[] {
  let buffer: number[] = [];

  if (Array.isArray(servers)) {
    servers.forEach(value => {
      buffer = buffer.concat(parseIp(value));
    });
  }
  else {
    buffer = buffer.concat(parseIp(servers));
  }

  return buffer;
}

function parseIp(server: string): number[] {
  const buffer: number[] = [];
  const [address, port]: string[] = server.split(':');

  const octet = address.split('.');

  octet.forEach(value => {
    buffer.push(Number(value));
  });

  const numberPort = Number(port);
  buffer.push((numberPort >> 8) & 0xFF);
  buffer.push(numberPort & 0xFF);

  return buffer;
}
