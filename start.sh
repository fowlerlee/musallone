killall dfx replica
rm -rf .dfx
dfx start --background --clean
npm install
dfx deploy --network=local --no-wallet 
