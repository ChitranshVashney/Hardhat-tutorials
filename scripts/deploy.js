//imports 
const {ethers, run, network}=require("hardhat");

//async main
async function main(){
  const SimpleStoreageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("............Deploying.........");
  const simpleStorage=await SimpleStoreageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`deployed contract to ${simpleStorage.address}`);
  // console.log(network.config);
  const chainID1=network.config.chainId;
  // console.log(chainID1);
  if(process.env.ETHERSCAN_API_KEY && chainID1 === 4){
    console.log(".........waiting..........");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address,[]);
  }
  const currentValue =await simpleStorage.retrieve();
  console.log(`current value ${currentValue}`);
}

async function verify(contractAddress, args){
  console.log("..............verifying...........");
  try {await run("verify:verify",{
    address:contractAddress,
    constructorArguments :args,
   })}
  catch(e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("Already verified");
    }
    else{
      console.log(e);
    }
  }
}

//main

main()
  .then(()=>process.exit(0))
  .catch((error)=>{
    console.error(error);
    process.exit(1);
  });