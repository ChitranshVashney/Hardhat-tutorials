const {task}=require("hardhat/config");
task("block-number","print the current block number").setAction(
    async ()=>{
        const blockNumber=await ethers.provider.getBlockNumber();
        console.log(`current block number:: ${blockNumber}`);
    }
)
module.exports={};