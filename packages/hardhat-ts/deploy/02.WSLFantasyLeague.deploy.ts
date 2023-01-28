import type { DeployFunction } from 'hardhat-deploy/types';
import type { HardhatRuntimeEnvironmentExtended } from 'helpers/types/hardhat-type-extensions';
import type { SurferData } from '../helpers/parseSurferCsv';

const fs = require('fs');
const path = require('path');

const { NFTStorage, File } = require('nft.storage');
const voca = require('voca');

const { parseSurfers } = require('../helpers/parseSurferCsv');

const dotenv = require('dotenv');

const func: DeployFunction = async (hre: HardhatRuntimeEnvironmentExtended) => {
  dotenv.config();

  const SURFER_CSV_PATH = path.join(__dirname, '../assets/surfer_metadata.csv');
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const { address: nftContractAddress } = await hre.deployments.get('WSLNFT');
  const nftContract = await hre.ethers.getContractAt('WSLNFT', nftContractAddress);

  const fantasyLeagueContract = await deploy('WSLFantasyLeague', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [nftContractAddress],
    log: true,
  });

  const surferParser = parseSurfers();

  // Read surfers data from CSV
  console.log('Reading csv data');
  const surferData = await new Promise<SurferData[]>((resolve, reject) => {
    const surferData: SurferData[] = [];
    return fs
      .createReadStream(SURFER_CSV_PATH)
      .pipe(surferParser)
      .on('data', (chunk: { Name: string; Country: string }) => {
        surferData.push({ name: chunk.Name as string, country: chunk.Country as string });
        console.log('Surfer: ', chunk);
      })
      .on('end', () => resolve(surferData))
      .on('error', (error: any) => reject(error));
  });

  console.log('Storing data on IPFS');
  const nftStorageClient = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY as string });
  const SURFER_PHOTO_PATH = path.join(__dirname, '../assets/surfer-images');
  // Read the images
  // Send image + surfer data to IPFS to generate the IPFS URL
  const ipfsUrls = [];
  for (let i = 0; i < surferData.length; i += 1) {
    const { name } = surferData[i];
    const filename = `${voca.snakeCase(name)}.png`;
    const { url: ipfsUrl } = await nftStorageClient.store({
      name,
      description: `NFT trading card for ${name}`,
      image: new File([await fs.promises.readFile(`${SURFER_PHOTO_PATH}/${filename}`)], filename, { type: 'image/png' }),
    });
    console.log(`${name} uploaded to successfully uploaded to ${ipfsUrl}`);
    ipfsUrls.push(ipfsUrl);
  }

  console.log('Minting surfers here we go!!!!');
  const promises = [];

  for (let i = 0; i < ipfsUrls.length; i += 1) {
    const url = ipfsUrls[i];
    console.log('Minting ', url);
    const mintTx = await nftContract.mintItem(fantasyLeagueContract.address, url.replace('ipfs://', ''));

    promises.push(mintTx.wait());
  }
  console.log('Waiting for transactions to finish......');
  await Promise.all(promises);
};
export default func;
func.tags = ['WSLFantasyLeague'];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
