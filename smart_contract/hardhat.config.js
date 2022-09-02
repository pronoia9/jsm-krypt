require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/Qlj2ZnIp1oDeP8bnJDIDJ6Ifwl9D4t4e',
      accounts: ['833bd8b5926cb4b1f438765b0a1430b7273093c87bfdc340a269e4c43ea17f38'],
    },
  },
};