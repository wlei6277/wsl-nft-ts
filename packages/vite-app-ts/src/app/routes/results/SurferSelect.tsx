import { Select, SelectProps } from 'antd';
import React, { FC } from 'react';

import { SurferData } from '../main/Main';

export interface SurferSelectProps {
  surferData: SurferData[];
  onSelect: (tokenId: SurferData['tokenId']) => void;
  position: 'first' | 'second' | 'third';
  selected: SurferData['tokenId'];
}

interface DefaultOptionType {
  label: SurferData['name'];
  value: SurferData['tokenId'];
}

// TODO make this so can only select unique surfers

const SurferSelect: FC<SurferSelectProps> = ({ surferData, onSelect, position, selected }) => {
  const options = surferData.map(({ name, tokenId }) => ({ value: tokenId, label: name }));
  const filterOption: SelectProps<DefaultOptionType>['filterOption'] = (input, option) =>
    ((option?.label as string) ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      value={selected}
      showSearch
      placeholder={`Select ${position} place`}
      onChange={onSelect}
      filterOption={filterOption}
      options={options}
      style={{ width: '100%' }}
    />
  );
};

export default SurferSelect;
