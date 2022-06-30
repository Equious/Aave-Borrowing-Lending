const { getNamedAccounts, ethers } = require("hardhat")

const wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
const AMOUNT = ethers.utils.parseEther("0.02")
async function getWeth() {
    const { deployer } = await getNamedAccounts()
    console.log(deployer)
    const iWeth = await ethers.getContractAt(
        "IWeth",
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        deployer
    )
    const txResponse = await iWeth.deposit({
        value: AMOUNT,
    })
    await txResponse.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth, AMOUNT }
