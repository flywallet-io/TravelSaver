# Travel Saver

a WEB3 travel plan payment subsription wallet service

## Included:

- smart contract
- smart contract test - coverage and audit
- deployment tools (muliple networks)

## NotIncluded:

- off chain integrators
- real time RPC log consumer and ETL services

<br/>
<p align="center">
<a href="https://flywallet.io" target="_blank">
<img src="img/fw.jpeg" width="225" alt="fw logo">
</a>
</p>
<br/>

# Travel Saver Smart Contract

1. `TravelPlan`: escrow and crowd-funding service: where user creates campaign(s) against flywallet travel-plan(s).

   - User creates a `WEB3-TravelPlan` against `Flywallet-TravelPlan` that locks funds in escrow service.
   - Contributions can be made ad hoc by anyone or/and scheduled with `PaymentPlan` contract.
   - User can claim specific `Plan` that will result in funds to be withdawn to Flywallet web3-wallet address, followed by the actual booking.

2. `PaymentPlan`: A companion object that allows any user to schedule payments to specific `TravelPlan`(s).

   - user creates `PaymentPlan`(s) againts specific `TravelPlan`(s) that creates scheduled payments to it
   - user can cancel any plan at any time but funds are locked in `TravelPlan` unless user `claims` it
   - off chain application will attempt to make shceduled payment on behalf of the user
   - in case of insufficent funds: next scheduled attempt will trigger any missed payments on top of scheduled one
   - user can also make missing payments manually

# User Story

<br/>
<p align="center">
<img src="img/user_story.drawio.png" width="625" alt="web3-arch">
</a>
</p>
<br/>

User wants to make multiple future travel reservation and crowd-fund - schedule payments towards them.

Follow the above diagram:

1. User makes a travel plan(s) via [flywallet](https://flywallet.io) booking service.

2. User creates savings plan(s) this time in `TravelPlan` smart contract where contributions will be made and funds will be stored against `1`.

3. User creates `PaymentPlan`(s) againts specific `TravelPlan` and defining how much, how many and how ofter he/she wishes to make payments of.

4. Schedules payments are triggered automatically as per `3`. Funds are moved from user's wallet to `TravelPlan`'s contract.
5. In addition, user can contribute directly to any `TravelPlan`(s) as long as they exist and have not been claimed.

6. User decided that ammout he/she collected is sufficient for the desired trip(s), and claims specific `TravelPlan`

7. `TravelPlan` makes a withdrawal to the `flywallet-web3-address` for the ammount contributed in this plan UUID.

8. `FW` receives web3 funds, acknowleges their recepit and transferes the ammount into user's fiat account inside `FW-web-app`

9. Immadiatelly after, `FW` purchases the travel booking(s)

# Smart Contract Usage

## TravelPlan:

- `createTravelPlan(uint256 operatorPlanID_, uint256 operatorUserID_`

- `contributeToTravelPlan(uint256 UUID, uint256 amount)`

- `claimTravelPlan(uint256 UUID, uint256 amount)`

- `travelPlanDetails(uint256 UUID) returns (TravelPlan)`

## PaymentPlan:

- `createPaymentPlan(uint256 _travelPlanID, uint256 amountPerInterval, uint256 totalIntervals,uint256 intervalLength)`

- `cancelPaymentPlan(uint256 UUID)`

- `paymentPlanDetails(uint256 UUID) returns (PaymentPlan)`

- `runInterval(uint256 UUID)`

## TravelPaymentPlan

- `createTravelPaymentPlan(uint256 operatorPlanID_,uint256 operatorUserID_, uint256 amountPerInterval,uint256 totalIntervals,uint256 intervalLength)`

## NOTES:

- NOTE: user's address needs to approve to spend agreed ammount by calling:
  `token.approve(address(TravelSaver), totalAmount)` and `token.approve(address(TravelSaver), totalAmount)`
- NOTE: both contracts interact with eachother only within deployed specfic network with specfic `IERC20` address.

# DEPLOYMENTS

## Deployed at {network_name} with IERC20 token, smart-contract and operator address as:

1. - Celo

   - alfajores:

     - cEUR: `0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F`
     - TravelSaver: ``
     - [verified](https://explorer.celo.org/alfajores/address/0x16e5D0988Ae96bAe6A3B72A9137854BB337C632e/contracts)

     - cUSD: `0x765de816845861e75a25fca122bb6898b8b1282a`
     - TravelSaver: `0x54713127daf2bFD5129C980Ea800E3fCD616B547`
     - [verified](https://explorer.celo.org/alfajores/address/0x54713127daf2bFD5129C980Ea800E3fCD616B547/contracts)

     - operatorWalletAddress: `0x2b5Fc7f001a173D49B29e34993bB2feF41Ccd803`

   - mainnet:

     - cEUR: `0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73`
     - TravelSaver: `0xCd58b4544d75CDA2f1F02CC4B423867689A3601A`
     - [verified](https://explorer.celo.org/mainnet/address/0xCd58b4544d75CDA2f1F02CC4B423867689A3601A/read-contract#address-tabs)

     - cUSD: `0x765de816845861e75a25fca122bb6898b8b1282a`
     - TravelSaver: `0x207856B02b264b7C60fdE304658d683184254330`
     - [verified](https://explorer.celo.org/mainnet/address/0x207856B02b264b7C60fdE304658d683184254330/read-contract#address-tabs)

     - operatorWalletAddress: `0x2e7997BaF30435d70b5a2EC3eA334975b16C5204`

2. - Polygon

   - mumbai:

     - USDC: `0xe11A86849d99F524cAC3E7A0Ec1241828e332C62`
     - TravelSaver: `0x54713127daf2bFD5129C980Ea800E3fCD616B547`
     - [verified](https://mumbai.polygonscan.com/address/0x54713127daf2bFD5129C980Ea800E3fCD616B547#code)

     - operatorWalletAddress: `0x2b5Fc7f001a173D49B29e34993bB2feF41Ccd803`

   - mainnet:

     - USDC: `0x2791bca1f2de4661ed88a30c99a7a9449aa84174`
     - TravelSaver: `0x6Bd249181BAdf2a389296D68f80A8B1c74fDDAC1`
     - [verified](https://polygonscan.com/address/0x6Bd249181BAdf2a389296D68f80A8B1c74fDDAC1#code)

     - operatorWalletAddress: `0x383bC9Eae0DfAEC56d10a12BaF23603701A4A004`

## TravelSaver constructor params:

- `address _IERC20` hardcoded address of the ERC20 EUR/USD PEGGED and NON DEFLACTIONARY token that serves a currency of the contract
- `address _operatorWallet` wallet address where all funds will be transfered when saving plan is sucessful, hardcoded address of the operator wallet where funds are send from travel-plan as external multisg wallet that is opearated and solely responsible for by the ticket issuer

## Re-Deploying to a networks, tests and scripts:

- `npm install hardhat`

- `npx hardhat coverage`

- `npx hardhat run --network {NETWORK} scripts/deploy-{NETWORK}-{BRANCH}-{ERC20}.ts`

## Architecture: all services off and onchain

<br/>
<p align="center">
<img src="img/flyaway_web3_arch.png" width="625" alt="web3-arch">
</a>
</p>
<br/>

## TESTS COVERAGE

<br/>
<p align="center">
<img src="img/coverage.png" >
</a>
</p>
<br/>

# LICENSE

Copyright (c) 2023-present Flywallet Inc.

Licensed under [Apache-2.0](./LICENSE)
