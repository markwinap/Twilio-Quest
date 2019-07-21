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


### Secure Your Twilio Credentials Please read
https://www.twilio.com/docs/usage/secure-credentials

## LINUX MAC
```sh
echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
source ./twilio.env
```
## WINDOWS
```sh
set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
set TWILIO_AUTH_TOKEN=your_auth_token

set TWILIO_TEST_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
set TWILIO_TEST_AUTH_TOKEN=your_auth_token
```