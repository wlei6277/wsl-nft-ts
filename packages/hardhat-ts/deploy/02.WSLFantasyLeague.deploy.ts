import type { DeployFunction } from "hardhat-deploy/types";
import type { HardhatRuntimeEnvironmentExtended } from "../helpers/types/hardhat-type-extensions";
import type { SurferData } from "../helpers/parseSurferCsv";
import { ContractTransaction } from "ethers";

const fs = require("fs");
const path = require("path");

const { parseSurfers } = require("../helpers/parseSurferCsv");

const dotenv = require("dotenv");

const func: DeployFunction = async (hre: HardhatRuntimeEnvironmentExtended) => {
  dotenv.config();

  const SURFER_CSV_PATH = path.join(__dirname, "../assets/surfer_metadata.csv");
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const { address: nftContractAddress } = await hre.deployments.get("WSLNFT");
  const nftContract = await hre.ethers.getContractAt(
    "WSLNFT",
    nftContractAddress
  );

  const fantasyLeagueContract = await deploy("WSLFantasyLeague", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [nftContractAddress],
    log: true,
  });

  // const surferParser = parseSurfers();

  // // Read surfers data from CSV
  // console.log("Reading csv data");
  // const surferData = await new Promise<SurferData[]>((resolve, reject) => {
  //   const surferData: SurferData[] = [];
  //   return fs
  //     .createReadStream(SURFER_CSV_PATH)
  //     .pipe(surferParser)
  //     .on("data", (chunk: { Name: string; Country: string; Url: string }) => {
  //       surferData.push({
  //         name: chunk.Name,
  //         country: chunk.Country,
  //         ipfsUrl: chunk.Url,
  //       });
  //       console.log("Surfer: ", chunk);
  //     })
  //     .on("end", () => resolve(surferData))
  //     .on("error", (error: any) => reject(error));
  // });

  // const promises: ContractTransaction[] = [];
  // console.log("Minting surfers here we go!!!!");
  // for (let i = 0; i < surferData.length; i += 1) {
  //   const { name, ipfsUrl } = surferData[i];
  //   console.log(`Minting ${name} with tokenUri ${ipfsUrl}`);
  //   const tx = await nftContract.mintItem(
  //     fantasyLeagueContract.address,
  //     ipfsUrl.replace("ipfs://", "")
  //   );
  //   promises.push(tx);
  // }

  // console.log("Waiting for transactions to finish......");

  // await Promise.all(
  //   promises.map(async (transaction) => {
  //     const tx = await transaction.wait();
  //   })
  // );

  console.log(
    "Congratulations the league has been deployed, let the games begin!"
  );
};
export default func;
func.tags = ["WSLFantasyLeague"];
