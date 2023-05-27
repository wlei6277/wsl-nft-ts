import { Card, Spin, Button, Space, Avatar, Badge } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/app/routes/main/hooks/useScaffoldAppProviders';
import { FC } from 'react';
import { remainingSurferTokenIds } from '../../../common/cutoffSurfers';

import { SurferData } from '../Main';

const { Meta } = Card;

export interface SurfersProps {
  surferData: SurferData[];
  initialPriceUsd: string;
  buySurfer: (tokenId: string) => Promise<void>;
  nftContractAddress: string;
}

interface SurferProps {
  surfer: SurferData;
  initialPriceUsd: string;
  buySurfer: (tokenId: string) => Promise<void>;
  nftContractAddress: string;
  isDisabled: boolean;
}

const Surfer: FC<SurferProps> = ({ surfer, buySurfer, initialPriceUsd, nftContractAddress, isDisabled }) => {
  const { account } = useEthersContext();
  const { targetNetwork } = useScaffoldAppProviders();
  const { name, tokenId, imgUrl, isAvailable, ownerAddress, owner } = surfer;
  let description = account ? `Purchase for ${initialPriceUsd}` : 'Connect your wallet to purchase this surfer';
  const isOwner = ownerAddress === account;
  const ownerIdentifier = owner || ownerAddress;
  if (!isAvailable) {
    description = isOwner ? 'You own this surfer' : `This card is owned by ${ownerIdentifier}`;
  }
  let openseaLink = '';

  if (targetNetwork) {
    openseaLink =
      targetNetwork.name === 'optimism'
        ? `https://opensea.io/assets/optimism/${nftContractAddress}/${tokenId}`
        : `https://testnets.opensea.io/assets/${targetNetwork.name}/${nftContractAddress}/${surfer.tokenId}`;
  }

  return (
    <Card>
      <Meta
        title={name}
        description={description}
        avatar={<Avatar size={80} src={imgUrl} alt={`Headshot of ${name}`} />}
      />
      {isAvailable && account && !isOwner && (
        <Button
          type="primary"
          className="mt-4"
          block
          disabled={isDisabled}
          onClick={(): void => {
            buySurfer(tokenId).catch((error) => console.error(error));
          }}>
          Purchase
        </Button>
      )}
      {!isAvailable && account && !isOwner && openseaLink && (
        <Button type="link" className="mt-4 w-full" href={openseaLink} disabled={isDisabled}>
          Make Offer
        </Button>
      )}
    </Card>
  );
};

const Surfers: FC<SurfersProps> = ({ surferData, initialPriceUsd, buySurfer, nftContractAddress }) => {
  return (
    <Space wrap size="middle" align="center" className="justify-center">
      {surferData[0] ? (
        surferData.map((surfer) => {
          const madeCutoffRound = remainingSurferTokenIds.includes(Number(surfer.tokenId));
          const isDuplicateRioNFT = surfer.tokenId === '31';
          if (isDuplicateRioNFT) return;
          if (madeCutoffRound)
            return (
              <Surfer
                surfer={surfer}
                key={`nft-${surfer.tokenId}`}
                initialPriceUsd={initialPriceUsd}
                buySurfer={buySurfer}
                nftContractAddress={nftContractAddress}
                isDisabled={false}
              />
            );
          return (
            <Badge.Ribbon text="Eliminated" color="grey">
              <Surfer
                surfer={surfer}
                key={`nft-${surfer.tokenId}`}
                initialPriceUsd={initialPriceUsd}
                buySurfer={buySurfer}
                nftContractAddress={nftContractAddress}
                isDisabled
              />
            </Badge.Ribbon>
          );
        })
      ) : (
        <Spin tip="Loading surfers...." size="large" />
      )}
    </Space>
  );
};

export default Surfers;
