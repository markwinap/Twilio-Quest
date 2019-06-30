# Twilio Quest


### Open Tunle Using Serveo
```sh
ssh -R 80:localhost:3000 serveo.net
```

## Ngrok
### Download ZIP file and Unzip it
```sh
https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip
```
### Connect Yout Account
To get your account token https://dashboard.ngrok.com/auth
```sh
./ngrok authtoken <YOUR_AUTH_TOKEN>
```

### Open Tunnel
```sh
./ngrok http 80
```