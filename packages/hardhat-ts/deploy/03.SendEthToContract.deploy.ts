import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironmentExtended } from "../helpers/types/hardhat-type-extensions";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const { address: fantasyLeagueAddress } = await hre.deployments.get(
    "WSLFantasyLeague"
  );

  await deploy("SendEthToContract", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    log: true,
    args: [fantasyLeagueAddress],
    value: ethers.utils.parseEther("1"),
  });
};
export default func;
func.tags = ["SendEthToContract"];
