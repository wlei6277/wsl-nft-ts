import { Card, Spin, Button, Space, Avatar } from 'antd';
import { useEthersContext } from 'eth-hooks/context';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/app/routes/main/hooks/useScaffoldAppProviders';
import { FC } from 'react';

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
}

const Surfer: FC<SurferProps> = ({ surfer, buySurfer, initialPriceUsd, nftContractAddress }) => {
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
          onClick={(): void => {
            buySurfer(tokenId).catch((error) => console.error(error));
          }}>
          Purchase
        </Button>
      )}
      {!isAvailable && account && !isOwner && openseaLink && (
        <Button type="link" className="mt-4 w-full" href={openseaLink}>
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
        surferData.map(
          (surfer) =>
            surfer.tokenId !== '31' && (
              <Surfer
                surfer={surfer}
                key={`nft-${surfer.tokenId}`}
                initialPriceUsd={initialPriceUsd}
                buySurfer={buySurfer}
                nftContractAddress={nftContractAddress}
              />
            )
        )
      ) : (
        <Spin tip="Loading surfers...." size="large" />
      )}
    </Space>
  );
};

export default Surfers;
