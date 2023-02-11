import { ethers, BigNumber } from 'ethers';
import { multiply, number } from 'mathjs';

export const weiToUsd = (wei: BigNumber, ethPrice: number): string => {
  const eth = ethers.utils.formatEther(wei);
  const raw = multiply(number(eth), number(ethPrice));
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' }).format(raw);
};
