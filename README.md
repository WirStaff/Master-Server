# Master Server

This application was created based on this [article](https://developer.valvesoftware.com/wiki/Master_Server_Query_Protocol)

### Description .env
1. SERVER_PORT = '27001' - Port to which requests will be sent
2. SERVER_ADDRESS = '0.0.0.0' - Address listened on
3. WEB_GET_SERVERS = 'http://localhost/index.php' - Link to get a list of servers in json format
4. WEB_SEND_STATS = 'http://localhost/index.php' - Link to the required statistics (IP address when requesting a list of servers)
5. WEB_SECRET='secret' - Secret key for the web part
6. GAME = 'css' - game name (you can specify any name - this is for identification on the web part)
7. INTERVAL_GET_SERVERS = '10' - How many times per second to get a list of servers from the web
8. RETURN_PER_STAGE = '1' - How many servers to give to clients per request
9. INTERVAL_FOR_SEND = '1' - Interval of message servers, for example every second will give RETURN_PER_STAGE servers

### Return of servers (Example):
```php
$servers = ['46.174.52.188:18888', '46.174.55.225:27015', '62.122.215.88:7777', '46.174.54.207:27777', '62.122.214.86:27015', '62.122.213.125:60006'];
echo json_encode($servers); 
```

### Getting statistics:
```php
$data = json_decode(file_get_contents('php://input'), true);

echo $data['address'];
echo $data['game'];
echo $data['secret'];
```

* P.S when sending a GET request to get servers, the query parameters will be: game&secret
* P.S when sending a POST request to save statistics, a json object is passed: {address, game, secret}

[Discord Support](https://discord.com/invite/bYQkNgRaG5)
