import { Row, Col, Divider } from 'antd';
import { BigNumber } from 'ethers';
import oldLeagueCompSettledEvents from '../../../../oldLeagueCompSettledEvents.json';
import { SurferData } from '../main/Main';

interface CompResultsProps {
  surferData: SurferData[];
  weiToUsd: (wei: BigNumber) => string;
}

type ResultSet = BigNumber[];
type Result = [BigNumber, BigNumber];

const CompResults = ({ surferData, weiToUsd }: CompResultsProps) => {
  const [pipeResults, sunsetResults, portugalResults] = oldLeagueCompSettledEvents;
  const Result = ({ place, result }: { place: '1' | '2' | '3'; result: Result }) => {
    const [tokenId, winnings] = result;
    const surfer = surferData.find((surfer) => surfer.tokenId === tokenId.toString());
    if (!surfer) return null;
    return (
      <Row>
        <Col>{place}</Col>
        <Col>{surfer.name}</Col>
        <Col>{weiToUsd(winnings)}</Col>
      </Row>
    );
  };
  const ResultSet = ({ compName, set }: { compName: string; set: ResultSet }) => {
    const [firstTokenId, secondTokenId, thirdTokenId, firstWinnings, secondWinnigs, thirdWinnigs] = set;
    return (
      <>
        <h2>{compName}</h2>
        <Row>
          <Col>Place</Col>
          <Col>Surfer</Col>
          <Col>Winnings</Col>
        </Row>
        <Result place="1" result={[firstTokenId, firstWinnings]} />
        <Result place="2" result={[secondTokenId, secondWinnigs]} />
        <Result place="3" result={[thirdTokenId, thirdWinnigs]} />
      </>
    );
  };
  const genBigNumbers = (arr: { type: string; hex: string }[]) => arr.map((el) => BigNumber.from(el.hex));
  return (
    <>
      <ResultSet compName="Pipeline" set={genBigNumbers(pipeResults.args)} />
      <ResultSet compName="Sunset" set={genBigNumbers(sunsetResults.args)} />
      <ResultSet compName="Portugal" set={genBigNumbers(portugalResults.args)} />
    </>
  );
};

export default CompResults;
