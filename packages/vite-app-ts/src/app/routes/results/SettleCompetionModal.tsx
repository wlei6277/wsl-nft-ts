import { Modal, Row, Col } from 'antd';
import { TTransactor } from 'eth-components/functions';
import { FC, useState } from 'react';
import voca from 'voca';

import { SurferData } from '../main/Main';

import SurferSelect, { SurferSelectProps } from './SurferSelect';

import { WSLFantasyLeague } from '../../../generated/contract-types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  surferData: SurferData[];
  league: WSLFantasyLeague;
  tx: TTransactor;
  competitionNumber: string;
}

interface SurferSelectRowProps {
  position: string;
  onSelect: SurferSelectProps['onSelect'];
  selected: string;
  surferData: SurferData[];
}

export const SurferRow: FC<SurferSelectRowProps> = ({ position, onSelect, selected, surferData }) => (
  <Row align="middle" justify="center" className="mb-4">
    <Col span={5}>
      <span className="font-semibold">{voca.titleCase(position)}</span>
    </Col>
    <Col span={15}>
      <SurferSelect surferData={surferData} onSelect={onSelect} position="first" selected={selected} />
    </Col>
  </Row>
);

// TODO add validation maybe use a form
const SettleCompetitionModal: FC<Props> = ({ isOpen, onClose, surferData, league, tx, competitionNumber }) => {
  const [firstTokenId, setFirstTokenId] = useState('');
  const [secondTokenId, setSecondTokenId] = useState('');
  const [thirdTokenId, setThirdTokenId] = useState('');

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      title={`Settle Competition ${competitionNumber}`}
      okText="Settle"
      onOk={(): void => {
        if (firstTokenId && secondTokenId && thirdTokenId) {
          const confirm = window.confirm('Are you sure these surfers are correct this transaction will be irrevisilbe');
          if (confirm) {
            tx(league.settleCompetition(firstTokenId, secondTokenId, thirdTokenId)).catch((error) =>
              console.error(error)
            );
            onClose();
          }
        } else {
          window.alert('First select all surfers before settling');
        }
      }}>
      <SurferRow
        onSelect={(tokenId): void => setFirstTokenId(tokenId)}
        position="first"
        selected={firstTokenId}
        surferData={surferData}
      />
      <SurferRow
        onSelect={(tokenId): void => setSecondTokenId(tokenId)}
        position="second"
        selected={secondTokenId}
        surferData={surferData}
      />
      <SurferRow
        onSelect={(tokenId): void => setThirdTokenId(tokenId)}
        position="third"
        selected={thirdTokenId}
        surferData={surferData}
      />
    </Modal>
  );
};

export default SettleCompetitionModal;
