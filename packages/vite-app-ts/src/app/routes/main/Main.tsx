import { FC, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '~~/styles/main-page.css';
import { useGasPrice, useContractLoader, useBalance } from 'eth-hooks';
import { useDexEthPrice } from 'eth-hooks/dapps';

import { GenericContract } from 'eth-components/ant/generic-contract';
import { transactor } from 'eth-components/functions';

import { BigNumber } from 'ethers';
import { Spin } from 'antd';
import { weiToUsd } from '~~/app/common/helpers';

import SettleCompetitionModal from '../results/SettleCompetionModal';
import SettleLeagueModal from '../results/SettleLeagueModal';

import { useEventListener } from 'eth-hooks';
import { MainPageMenu, MainPageFooter, MainPageHeader } from './components';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/app/routes/main/hooks/useScaffoldAppProviders';
import { useScaffoldHooks as useScaffoldHooksExamples } from './hooks/useScaffoldHooksExamples';
import { useEthersContext } from 'eth-hooks/context';
import { NETWORKS } from '~~/models/constants/networks';
import { mainnetProvider } from '~~/config/providersConfig';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { useDebounce } from 'use-debounce';

import Surfers from './components/Surfers';
import Results from '../results/Results';
import SettledLeagueMessage from './components/SettledLeagueMessage';

import { WSLNFT, WSLFantasyLeague } from '../../../generated/contract-types';

export const DEBUG = false;

export interface SurferData {
  tokenId: string;
  name: string;
  imgUrl: string;
  ownerAddress: string;
  isAvailable: boolean;
}

export const Main: FC = () => {
  // -----------------------------
  // Providers, signers & wallets
  // -----------------------------
  const [settleCompModalIsOpen, setSettleCompModalIsOpen] = useState(false);
  const [settleLeagueModalIsOpen, setSettleLeagueModalIsOpen] = useState(false);

  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders();

  // 🦊 Get your web3 ethers context from current providers
  const ethersContext = useEthersContext();

  // if no user is found use a burner wallet on localhost as fallback if enabled
  // useBurnerFallback(scaffoldAppProviders, true);

  // -----------------------------
  // Contracts use examples
  // -----------------------------
  // ⚙ contract config
  // get the contracts configuration for the app
  const appContractConfig = useAppContracts();

  // Load in your 📝 readonly contract and read a value from it:
  const readContracts = useContractLoader(appContractConfig);

  // If you want to make 🔐 write transactions to your contracts, pass the signer:
  const writeContracts = useContractLoader(appContractConfig, ethersContext?.signer);

  // 👾 external contract example
  // If you want to bring in the mainnet DAI contract it would look like:
  // you need to pass the appropriate provider (readonly) or signer (write)
  const mainnetContracts = useContractLoader(appContractConfig, mainnetProvider, NETWORKS['mainnet'].chainId);

  const nft = readContracts['WSLNFT'] as WSLNFT;
  const fantasyLeague = readContracts['WSLFantasyLeague'] as WSLFantasyLeague;

  // -----------------------------
  // example for current contract and listners
  // -----------------------------
  // const yourContractRead = readContracts['Staker'] as Staker;
  // // keep track of a variable from the contract in the local React state:
  // const purpose = useContractReader<string>(yourContractRead, {
  //   contractName: 'YourContract',
  //   functionName: 'purpose',
  // });

  // 📟 Listen for broadcast events
  // const setPurposeEvents = useEventListener(yourContractRead, 'SetPurpose', 1);

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // 💵 This hook will get the price of ETH from 🦄 Uniswap:
  const ethPrice = useDexEthPrice(scaffoldAppProviders.mainnetProvider, scaffoldAppProviders.targetNetwork);
  const [initialPriceWei, setInitialPriceWei] = useState(BigNumber.from(0));
  const [initialPriceUsd, setInitialPriceUsd] = useState('');
  useEffect(() => {
    const updateInitialPriceUsd = async (): Promise<void> => {
      const initialPriceInWei = await fantasyLeague.INITIAL_PRICE();
      setInitialPriceWei(initialPriceInWei);

      console.log({ initialPriceInWei, ethPrice, usd: weiToUsd(initialPriceInWei, ethPrice) });

      setInitialPriceUsd(weiToUsd(initialPriceInWei, ethPrice));
    };
    if (fantasyLeague?.address) {
      updateInitialPriceUsd().catch((error) => console.error(error));
    }
  }, [fantasyLeague, ethPrice]);

  const [transferEvents] = useEventListener(nft, 'Transfer', 0);

  const [surferData, setSurferData] = useState<SurferData[]>([]);
  useEffect(() => {
    const updateSurferData = async (): Promise<void> => {
      const numTokens = await nft.totalSupply();
      console.log('Fetching data for this number of surfers: ', numTokens.toNumber());
      const getSurferData = async (i: number): Promise<SurferData> => {
        const tokenId = await nft.tokenByIndex(i);
        const tokenURI = await nft.tokenURI(tokenId);
        const ownerAddress = await nft.ownerOf(tokenId);
        const { name, image } = (await fetch(tokenURI).then((stream) => stream.json())) as {
          name: string;
          image: string;
        };
        return {
          name,
          imgUrl: image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          tokenId: tokenId.toString(),
          ownerAddress,
          isAvailable: ownerAddress === fantasyLeague?.address,
        };
      };
      const update = await Promise.all([...new Array(numTokens.toNumber()).fill(1)].map((_, i) => getSurferData(i)));
      setSurferData(update);
    };
    if (nft?.address) updateSurferData().catch((err) => console.error(err));
  }, [nft, fantasyLeague, transferEvents]);

  const [currentComp, setCurrentComp] = useState('');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const updateCurrentComp = async (): Promise<void> => {
      const numComps = await fantasyLeague.NUM_COMPETITIONS();
      const numUnsettledComps = await fantasyLeague.numUnsettledCompetitions();
      const currentComp = numComps && numUnsettledComps && Number(numComps) - Number(numUnsettledComps) + 1;
      setCurrentComp(currentComp.toString());
    };
    const updateIsLive = async (): Promise<void> => {
      const hasBeenSettled = await fantasyLeague.hasBeenSettled();
      setIsLive(!hasBeenSettled);
    };
    if (fantasyLeague?.address) {
      updateCurrentComp().catch((error) => console.error(error));
      updateIsLive().catch((error) => console.error(error));
    }
  }, [fantasyLeague]);

  // 💰 this hook will get your balance
  const yourCurrentBalance = useBalance(ethersContext.account ?? '');

  // -----------------------------
  // Hooks use and examples
  // -----------------------------
  // 🎉 Console logs & More hook examples:  Check out this to see how to get
  useScaffoldHooksExamples(scaffoldAppProviders, readContracts, writeContracts, mainnetContracts);

  // -----------------------------
  // .... 🎇 End of examples
  // -----------------------------

  const [route, setRoute] = useState<string>('');
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const gasPrice = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  const leagueWrite = writeContracts['WSLFantasyLeague'] as WSLFantasyLeague;

  const buySurfer = async (tokenId: string): Promise<void> => {
    if (tx && leagueWrite?.address) {
      try {
        await tx(leagueWrite.buySurfer(tokenId, { value: initialPriceWei }));
      } catch (error) {}
    } else {
      console.log('Contract has not loaded');
    }
  };

  const [accountAddress] = useDebounce<string | undefined>(ethersContext.account, 200, {
    trailing: true,
  });

  const hasLoadedContracts = Boolean(nft && fantasyLeague);

  return (
    <div className="App">
      <MainPageHeader scaffoldAppProviders={scaffoldAppProviders} price={ethPrice} readContracts={readContracts} />

      {/* Routes should be added between the <Switch> </Switch> as seen below */}
      <BrowserRouter>
        <MainPageMenu route={route} setRoute={setRoute} />
        <Switch>
          <section className="p-10 h-full w-full">
            {!hasLoadedContracts && <Spin tip="Loading contracts....." size="large" />}
            {hasLoadedContracts && !isLive && <SettledLeagueMessage />}
            {hasLoadedContracts && isLive && (
              <>
                <Route exact path="/">
                  <Surfers
                    buySurfer={buySurfer}
                    initialPriceUsd={initialPriceUsd}
                    surferData={surferData}
                    nftContractAddress={nft.address}
                  />
                </Route>
                <Route exact path="/results">
                  <Results
                    fantasyRead={fantasyLeague}
                    weiToUsd={(wei: BigNumber): string => weiToUsd(wei, ethPrice)}
                    surferData={surferData}
                    setSettleCompModalIsOpen={setSettleCompModalIsOpen}
                    setSettleLeagueModalIsOpen={setSettleLeagueModalIsOpen}
                  />
                </Route>
                <Route path="/mainnetdai">
                  {mainnetProvider != null && (
                    <GenericContract
                      contractName="DAI"
                      contract={mainnetContracts?.['DAI']}
                      mainnetProvider={scaffoldAppProviders.mainnetProvider}
                      blockExplorer={NETWORKS['mainnet'].blockExplorer}
                      contractConfig={appContractConfig}
                    />
                  )}
                </Route>
              </>
            )}
          </section>
        </Switch>
        {tx && (
          <SettleLeagueModal
            isOpen={settleLeagueModalIsOpen}
            league={leagueWrite}
            onClose={(): void => setSettleLeagueModalIsOpen(false)}
            surferData={surferData}
            tx={tx}
          />
        )}
        {tx && (
          <SettleCompetitionModal
            competitionNumber={currentComp}
            isOpen={settleCompModalIsOpen}
            league={leagueWrite}
            onClose={(): void => setSettleCompModalIsOpen(false)}
            surferData={surferData}
            tx={tx}
          />
        )}
      </BrowserRouter>

      <MainPageFooter scaffoldAppProviders={scaffoldAppProviders} price={ethPrice} />
    </div>
  );
};

export default Main;
