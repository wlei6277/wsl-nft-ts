import '~helpers/hardhat-imports';
import '~tests/utils/chai-imports';

import { expect } from 'chai';
import { BigNumber, ContractReceipt, Signer } from 'ethers';
// import { WSLNFT__factory, WSLNFT, WSLFantasyLeague, WSLFantasyLeague__factory } from '../generated/artifacts/contracts/WSLFantasyLeague.sol';
import hre, { ethers } from 'hardhat';

import { getHardhatSigners } from '~helpers/functions/accounts';

function weiToAud(wei: BigNumber): string {
  const eth = Number(ethers.utils.formatEther(wei));
  return new Intl.NumberFormat('en', { style: 'currency', currency: 'AUD' }).format(eth * 2281);
}

describe('WSLFantasyLeague', function () {
  let wslNFTContract;
  let wslFantasyLeagueContract;
  let initialSurferPrice: BigNumber;
  let numComps: number;

  async function getLeagueBalance(): Promise<BigNumber> {
    return await ethers.provider.getBalance(wslFantasyLeagueContract.address);
  }

  async function mintSurfers(numSurfers = 3): Promise<void> {
    const mintTransactions = await Promise.all(
      [...new Array(numSurfers).fill(1)].map(
        async () => await wslNFTContract.mintItem(wslFantasyLeagueContract.address, 'QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr')
      )
    );
    await Promise.all(mintTransactions.map(async (transaction) => await transaction.wait()));
  }

  async function buySurfers(numPlayers = 3): Promise<ContractReceipt[]> {
    console.log(`Initial buying round commencing. Num players: ${numPlayers} at ${weiToAud(initialSurferPrice)} each`);
    const users = await getHardhatSigners(hre);
    console.log('\t', ' Buying surfer cards...');
    const purchaseTransactions = await Promise.all(
      [...new Array(numPlayers).fill(1)].map(async (_, i) => {
        const tokenId = i + 1;
        const user = users[`user${tokenId}`] as Signer;
        return await wslFantasyLeagueContract.connect(user).buySurfer(tokenId, { value: initialSurferPrice });
      })
    );

    console.log('\t', ' ⏳ Waiting for minting confirmation...');

    return await Promise.all(purchaseTransactions.map(async (tx) => await tx.wait()));
  }

  async function runLeague(numMinted = 3, numBought = 3): Promise<void> {
    await mintSurfers(numMinted);
    await buySurfers(numBought);
    for (let i = 0; i < numComps; i += 1) {
      await wslFantasyLeagueContract.settleCompetition(1, 2, 3);
    }
    const hasBeenSettledInitially = await wslFantasyLeagueContract.hasBeenSettled();
    expect(hasBeenSettledInitially).to.equal(false);
    // First time settling league should work
    await wslFantasyLeagueContract.settleLeague(1);
    const isSettled = await wslFantasyLeagueContract.hasBeenSettled();
    expect(isSettled).to.equal(true);
  }

  function getGasUsed({ cumulativeGasUsed, effectiveGasPrice }: ContractReceipt): BigNumber {
    return cumulativeGasUsed.mul(effectiveGasPrice);
  }

  beforeEach(async () => {
    console.log('\t', 'Deploying contracts.....');
    const { deployer } = await getHardhatSigners(hre);
    const factory = new WSLNFT__factory(deployer);
    wslNFTContract = await factory.deploy();
    const leagueFactory = new WSLFantasyLeague__factory(deployer);
    wslFantasyLeagueContract = await leagueFactory.deploy(wslNFTContract.address);
    console.log('\t', 'Contracts deployed');
    initialSurferPrice = await wslFantasyLeagueContract.INITIAL_PRICE();
    numComps = (await wslFantasyLeagueContract.NUM_COMPETITIONS()).toNumber();
  });

  describe('buySurfer()', function () {
    it('does not allow surfer to be bought if league has already been settled', async function () {
      const { user4 } = await getHardhatSigners(hre);
      await runLeague(4, 3);
      await expect(wslFantasyLeagueContract.connect(user4).buySurfer(4, { value: initialSurferPrice })).to.be.revertedWith('League is finished');
    });
    it('should allow an available surfer to be bought', async function () {
      const { user1 } = await getHardhatSigners(hre);
      console.log('\t', ' 🔨 Minting...');
      const tx1 = await wslNFTContract.mintItem(wslFantasyLeagueContract.address, 'QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr');
      console.log('\t', ' ⏳ Waiting for minting confirmation...');
      const tx1Receipt = await tx1.wait();
      const transferEvent = tx1Receipt.events?.find((event) => event.event === 'Transfer');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const mintedTokenId = transferEvent?.args?.tokenId?.toNumber() as number;
      const initialPrice = await wslFantasyLeagueContract.INITIAL_PRICE();
      console.log(
        '\t',
        ` League address ${wslNFTContract.address} owner of surfer address ${await wslNFTContract.ownerOf(mintedTokenId)} buyer address ${user1.address}`
      );
      console.log('\t', ' Buying surfer...');
      const tx2 = await wslFantasyLeagueContract.connect(user1).buySurfer(mintedTokenId, { value: initialPrice });
      console.log('\t', ' ⏳ Waiting for buying confirmation...');
      await tx2.wait();
      console.log('\t', ' Getting balance.....');
      const leagueBalance = await ethers.provider.getBalance(wslFantasyLeagueContract.address);
      expect(leagueBalance.toNumber()).to.equal(initialPrice.toNumber());
      expect(await wslNFTContract.ownerOf(mintedTokenId)).to.equal(user1.address);
    });
    it('should throw if the surfer has already been bought by somebody else', async function () {
      await mintSurfers();
      await buySurfers();
      console.log('\t', ' Attempting to buy already bought surfer.....');
      const { user4 } = await getHardhatSigners(hre);
      await expect(wslFantasyLeagueContract.connect(user4).buySurfer(1, { value: await wslFantasyLeagueContract.INITIAL_PRICE() })).to.be.revertedWith(
        'Surfer has already been bought'
      );
    });
  });

  describe('calculateCompetitionWinnings()', function () {
    it('works', async function () {
      await mintSurfers();
      await buySurfers();
      const compShare = await wslFantasyLeagueContract.COMPETITION_SHARE();
      const numUnsettledComps = await wslFantasyLeagueContract.numUnsettledCompetitions();
      const sharePerComp = compShare.div(numUnsettledComps);
      const leagueBalance = await ethers.provider.getBalance(wslFantasyLeagueContract.address);
      const winningsForThisComp = leagueBalance.mul(sharePerComp).div(10000);

      const shareForFirst = await wslFantasyLeagueContract.SHARE_FOR_FIRST();
      const shareForThird = await wslFantasyLeagueContract.SHARE_FOR_THIRD();
      const shareForSecond = await wslFantasyLeagueContract.SHARE_FOR_SECOND();

      const [first, second, third] = await wslFantasyLeagueContract.calculateCompetitionWinnings();

      expect([first.toNumber(), second.toNumber(), third.toNumber()]).to.eql([
        winningsForThisComp.mul(shareForFirst).div(10000).toNumber(),
        winningsForThisComp.mul(shareForSecond).div(10000).toNumber(),
        winningsForThisComp.mul(shareForThird).div(10000).toNumber(),
      ]);
    });
  });

  describe('settleCompetition()', function () {
    function calculatePostSettleBalance(originalBalance: BigNumber, purchaseTransaction: ContractReceipt, winnings: BigNumber): BigNumber {
      return originalBalance.sub(initialSurferPrice).sub(getGasUsed(purchaseTransaction)).add(winnings);
    }
    it('transfers winnings to the owners of 1st, 2nd and 3rd', async function () {
      const { user1, user2, user3 } = await getHardhatSigners(hre);

      const user1OriginalBalance = await user1.getBalance();
      const user2OriginalBalance = await user2.getBalance();
      const user3OriginalBalance = await user3.getBalance();

      await mintSurfers();
      const [tx4, tx5, tx6] = await buySurfers();

      const preSettleLeagueBalance = await ethers.provider.getBalance(wslFantasyLeagueContract.address);

      console.log('\t', 'Calculating winnings.....');
      const [firstWinnings, secondWinnings, thirdWinnings] = await wslFantasyLeagueContract.calculateCompetitionWinnings();

      console.log('\t', 'Settling competition.....');
      await wslFantasyLeagueContract.settleCompetition(1, 2, 3);

      expect(await user1.getBalance()).to.equal(calculatePostSettleBalance(user1OriginalBalance, tx4, firstWinnings));
      expect(await user2.getBalance()).to.equal(calculatePostSettleBalance(user2OriginalBalance, tx5, secondWinnings));
      expect(await user3.getBalance()).to.equal(calculatePostSettleBalance(user3OriginalBalance, tx6, thirdWinnings));

      // Check league balance was decremented by the winnings correctly
      const postSettleLeagueBalance = await ethers.provider.getBalance(wslFantasyLeagueContract.address);
      expect(postSettleLeagueBalance).to.equal(preSettleLeagueBalance.sub(firstWinnings).sub(secondWinnings).sub(thirdWinnings));
    });
    it('fires competition settled event correctly', async function () {
      await mintSurfers();
      const [firstWinnings, secondWinnings, thirdWinnings] = await wslFantasyLeagueContract.calculateCompetitionWinnings();
      await expect(wslFantasyLeagueContract.settleCompetition(1, 2, 3))
        .to.emit(wslFantasyLeagueContract, 'CompSettled')
        .withArgs(1, 2, 3, firstWinnings, secondWinnings, thirdWinnings);
    });
    it('throws if there are no more competitions to settle', async function () {
      await mintSurfers();
      for (let i = 0; i < numComps; i += 1) {
        await wslFantasyLeagueContract.settleCompetition(1, 2, 3);
      }
      await expect(wslFantasyLeagueContract.settleCompetition(1, 2, 3)).to.be.revertedWith('All comps settled');
    });
    it('does not transfer winnings if no one owns the 3rd place surfer', async function () {
      const { user1, user2 } = await getHardhatSigners(hre);

      const user1OriginalBalance = await user1.getBalance();
      const user2OriginalBalance = await user2.getBalance();

      await mintSurfers(4);
      const [tx1, tx2] = await buySurfers();

      const preSettleLeagueBalance = await ethers.provider.getBalance(wslFantasyLeagueContract.address);

      // Assert league is owner of 4th token
      expect(await wslNFTContract.ownerOf(4)).to.equal(wslFantasyLeagueContract.address);

      // Calculate the winnings before settling
      const [firstWinnings, secondWinnings] = await wslFantasyLeagueContract.calculateCompetitionWinnings();

      // Settle with 1st as the 4th token which is not yet owned by a player
      await wslFantasyLeagueContract.settleCompetition(1, 2, 4);

      // Check the league balance was only decremented by the second and third winnings
      const postSettleLeagueBalance = await ethers.provider.getBalance(wslFantasyLeagueContract.address);
      expect(postSettleLeagueBalance).to.equal(preSettleLeagueBalance.sub(firstWinnings).sub(secondWinnings));

      // Check second and third got their winnings ok
      expect(await user1.getBalance()).to.equal(calculatePostSettleBalance(user1OriginalBalance, tx1, firstWinnings));
      expect(await user2.getBalance()).to.equal(calculatePostSettleBalance(user2OriginalBalance, tx2, secondWinnings));
    });
  });

  describe('settleLeague()', function () {
    it('fires league settled event correctly', async function () {
      await mintSurfers();
      for (let i = 0; i < numComps; i += 1) {
        await wslFantasyLeagueContract.settleCompetition(1, 2, 3);
      }
      await expect(wslFantasyLeagueContract.settleLeague(1)).to.emit(wslFantasyLeagueContract, 'LeagueSettled').withArgs(1);
    });
    it('throws if the league has already been settled', async function () {
      await runLeague();
      // Second time should throw an error
      await expect(wslFantasyLeagueContract.settleLeague(2)).to.be.revertedWith('League is finished');
    });
    it('throws if there are still competitions to settle', async function () {
      await mintSurfers();
      // Settle 1 less than the overall amount of 12
      for (let i = 0; i < numComps - 1; i += 1) {
        await wslFantasyLeagueContract.settleCompetition(1, 2, 3);
      }
      await expect(wslFantasyLeagueContract.settleLeague(1)).to.be.revertedWith('Unsettled comps');
    });
    it('Once comps are settled transfers remaining balance to the owner of the champion', async function () {
      // TODO check hasBeenSettled
      await mintSurfers(4);
      await buySurfers();
      const initialLeagueBalance = await getLeagueBalance();
      console.log('League starting with ', weiToAud(initialLeagueBalance));
      // // Get the share of winnings expected by the winner
      for (let i = 0; i < numComps; i += 1) {
        console.log(`Settling competition ${i}`);
        await wslFantasyLeagueContract.settleCompetition(1, 2, 3);
      }
      const balanceAfterCompsBeforeSettling = await getLeagueBalance();
      console.log('Balance remaining after comps have been settled ', weiToAud(balanceAfterCompsBeforeSettling));
      const championOwnerAddress = await wslNFTContract.ownerOf(1);
      const balanceBeforeWinning = await ethers.provider.getBalance(championOwnerAddress);
      console.log('Settling league');
      await wslFantasyLeagueContract.settleLeague(1);
      const balanceAfterWinning = await ethers.provider.getBalance(championOwnerAddress);
      expect(balanceAfterWinning.eq(balanceBeforeWinning.add(balanceAfterCompsBeforeSettling))).to.equal(true);
      const finalLeagueBalance = await getLeagueBalance();
      expect(finalLeagueBalance.eq(0)).to.equal(true);
    });
    it('transfers the remaining balance evenly amongst all the token owners if the surfer has not been purchased', async function () {
      // TODO check hasBeenSettled
      const { user2, user3 } = await getHardhatSigners(hre);
      const numSurfers = 4;
      const numPlayers = 3;
      await mintSurfers(numSurfers);
      await buySurfers();

      // Get the share of winnings expected by the winner
      const leagueBalanceBeforeRunningComps = await getLeagueBalance();
      console.log('League balance before running comps ', weiToAud(leagueBalanceBeforeRunningComps));

      for (let i = 0; i < numComps; i += 1) {
        await wslFantasyLeagueContract.settleCompetition(1, 2, 3);
      }

      const leagueBalanceAfterRunningComps = await getLeagueBalance();
      console.log('League balance after running comps ', weiToAud(leagueBalanceAfterRunningComps));

      // Check the balance of the one of the surfers who didn't win before league settled
      const nonChampionOwnerAddress = await wslNFTContract.ownerOf(1);
      const balancePreSettle = await ethers.provider.getBalance(nonChampionOwnerAddress);
      const u2Pre = await user2.getBalance();
      const u3Pre = await user3.getBalance();

      await wslFantasyLeagueContract.settleLeague(4);

      const balancePostSettle = await ethers.provider.getBalance(nonChampionOwnerAddress);
      const eachPlayerOwed = weiToAud(leagueBalanceAfterRunningComps.div(3));

      console.log(`Each of the ${numPlayers} player should have been refunded `, eachPlayerOwed);
      expect(weiToAud(balancePostSettle.sub(balancePreSettle))).to.equal(eachPlayerOwed);
      expect(weiToAud((await user2.getBalance()).sub(u2Pre))).to.equal(eachPlayerOwed);
      expect(weiToAud((await user3.getBalance()).sub(u3Pre))).to.equal(eachPlayerOwed);
    });
  });
});
