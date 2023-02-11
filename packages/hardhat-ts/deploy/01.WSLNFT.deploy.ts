import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironmentExtended } from "../helpers/types/hardhat-type-extensions";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("WSLNFT", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    log: true,
  });
};
export default func;
func.tags = ["WSLNFT"];
