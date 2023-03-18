import { Row, Col, Divider, Button } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ethers } from 'ethers';
import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';

import { SurferData } from '../main/Main';

import { WSLFantasyLeague } from '../../../generated/contract-types';

interface ResultsProps {
  fantasyRead: WSLFantasyLeague;
  surferData: SurferData[];
  weiToUsd: (wei: BigNumber) => string;
  setSettleLeagueModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setSettleCompModalIsOpen: Dispatch<SetStateAction<boolean>>;
}
const Results: FC<ResultsProps> = ({ fantasyRead, weiToUsd, setSettleLeagueModalIsOpen, setSettleCompModalIsOpen }) => {
  const ethersAppContext = useEthersContext();

  const [totalPrizeMoneyUsd, setTotalPrizeMoneyUsd] = useState('');

  const [championWinnings, setChampionWinnings] = useState('');
  const [numUnsettledComps, setNumUnsettledComps] = useState('');
  const [{ first, second, third }, setCompWinningsInUsd] = useState({ first: '', second: '', third: '' });
  const [leagueAdmin, setLeagueAdmin] = useState('');

  const { account } = ethersAppContext;
  const isOwner = account && leagueAdmin && account === leagueAdmin;
  const canSettleLeague = numUnsettledComps === '0';

  useEffect(() => {
    const updateChampionWinnings = async (): Promise<void> => {
      const shareForComps = await fantasyRead.COMPETITION_SHARE();
      const potInWei = await fantasyRead.pot();
      const leagueBalance = await fantasyRead.provider.getBalance(fantasyRead.address);

      if (potInWei) {
        setTotalPrizeMoneyUsd(weiToUsd(leagueBalance));
        const weiForComps = potInWei.mul(shareForComps).div(10000);
        const update = potInWei.sub(weiForComps);
        setChampionWinnings(weiToUsd(update));
      }
    };

    const updateNumUnsettledComps = async (): Promise<void> => {
      const numUnsettledCompetitions = await fantasyRead.numUnsettledCompetitions();
      setNumUnsettledComps(numUnsettledCompetitions.toString());
    };

    const updateCompetitionWinnings = async (): Promise<void> => {
      const [firstWinnings, secondWinnings, thirdWinnings] = await fantasyRead.calculateCompetitionWinnings();
      setCompWinningsInUsd({
        first: weiToUsd(firstWinnings),
        second: weiToUsd(secondWinnings),
        third: weiToUsd(thirdWinnings),
      });
    };

    const updateLeagueAdmin = async (): Promise<void> => {
      const leagueOwnerAddress = await fantasyRead.owner();
      setLeagueAdmin(leagueOwnerAddress);
    };

    if (fantasyRead?.address && ethersAppContext.library) {
      updateChampionWinnings().catch((error) => console.error(error));
      updateNumUnsettledComps().catch((error) => console.error(error));
      updateCompetitionWinnings().catch((error) => console.error(error));
      updateLeagueAdmin().catch((error) => console.error(error));
    }
  }, [fantasyRead, fantasyRead?.address, ethersAppContext?.library, weiToUsd]);

  const CompWinningsRow: FC<{ place: string; amount: string }> = ({ place, amount }) => (
    <Row justify="center" className="text-m font-semibold">
      <Col span={6}>{place}</Col>
      <Col span={6}>
        <p>{amount}</p>
      </Col>
    </Row>
  );

  return (
    <>
      <Row align="middle">
        <Col span={24}>
          <h1 className="m-0">Total prize money {totalPrizeMoneyUsd}</h1>
        </Col>
      </Row>
      <Divider />
      <Row align="middle">
        <Col span={24}>
          <h2 className="m-0 align-middle">
            The owner of the champion will claim {championWinnings}{' '}
            {isOwner && canSettleLeague && (
              <>
                <Button className="ml-4" type="primary" onClick={(): void => setSettleLeagueModalIsOpen(true)}>
                  Settle League
                </Button>
              </>
            )}
          </h2>
        </Col>
      </Row>
      <Divider />
      <Row align="middle">
        <Col span={12}>
          <p className="text-8xl mb-3 pr-3">{numUnsettledComps}</p>
          <h3 className="font-bold">Comps left</h3>
          {isOwner && !canSettleLeague && (
            <Row align="middle" justify="center">
              <Col span={12}>
                <Button type="primary" onClick={(): void => setSettleCompModalIsOpen(true)}>
                  Settle Competition
                </Button>
              </Col>
            </Row>
          )}
        </Col>

        <Col span={12}>
          <Row>
            <Col span={12}>
              <Row justify="center">
                <Col span={12}>
                  <h3 className="font-bold">Comp Winnings</h3>
                </Col>
              </Row>
              <CompWinningsRow place="1st" amount={first} />
              <CompWinningsRow place="2nd" amount={second} />
              <CompWinningsRow place="3rd" amount={third} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Results;
