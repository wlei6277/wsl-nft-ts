import { Modal } from 'antd';
import { TTransactor } from 'eth-components/functions';
import React, { FC, useState } from 'react';

import { SurferData } from '../main/Main';

import { SurferRow } from './SettleCompetionModal';

import { WSLFantasyLeague } from '../../../generated/contract-types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  surferData: SurferData[];
  league: WSLFantasyLeague;
  tx: TTransactor;
}

// TODO add validation maybe use a form
const SettleLeagueModal: FC<Props> = ({ isOpen, onClose, surferData, league, tx }) => {
  const [champTokenId, setChampTokenId] = useState('');

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      title={`Settle League`}
      okText="Settle"
      onOk={(): void => {
        if (champTokenId) {
          const confirm = window.confirm(
            'Are you sure you have chosen the champion correctly? this transaction will be irrevisilbe!'
          );
          if (confirm) {
            tx(league.settleLeague(champTokenId)).catch((error) => console.error(error));
            onClose();
          }
        } else {
          window.alert('First select a champion before settling');
        }
      }}>
      <SurferRow
        onSelect={(tokenId): void => setChampTokenId(tokenId)}
        position="champion"
        selected={champTokenId}
        surferData={surferData}
      />
    </Modal>
  );
};

export default SettleLeagueModal;
