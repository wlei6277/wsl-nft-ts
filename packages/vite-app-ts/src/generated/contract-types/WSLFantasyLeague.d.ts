/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface WSLFantasyLeagueInterface extends ethers.utils.Interface {
  functions: {
    "COMPETITION_SHARE()": FunctionFragment;
    "INITIAL_PRICE()": FunctionFragment;
    "NUM_COMPETITIONS()": FunctionFragment;
    "SHARE_FOR_FIRST()": FunctionFragment;
    "SHARE_FOR_SECOND()": FunctionFragment;
    "SHARE_FOR_THIRD()": FunctionFragment;
    "buySurfer(uint256)": FunctionFragment;
    "calculateCompetitionWinnings()": FunctionFragment;
    "hasBeenSettled()": FunctionFragment;
    "numUnsettledCompetitions()": FunctionFragment;
    "owner()": FunctionFragment;
    "pot()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "settleCompetition(uint256,uint256,uint256)": FunctionFragment;
    "settleLeague(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "wslNFT()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "COMPETITION_SHARE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "INITIAL_PRICE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "NUM_COMPETITIONS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SHARE_FOR_FIRST",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SHARE_FOR_SECOND",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SHARE_FOR_THIRD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "buySurfer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateCompetitionWinnings",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "hasBeenSettled",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "numUnsettledCompetitions",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pot", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "settleCompetition",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "settleLeague",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "wslNFT", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "COMPETITION_SHARE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "INITIAL_PRICE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "NUM_COMPETITIONS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SHARE_FOR_FIRST",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SHARE_FOR_SECOND",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SHARE_FOR_THIRD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buySurfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculateCompetitionWinnings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasBeenSettled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numUnsettledCompetitions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pot", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settleCompetition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settleLeague",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wslNFT", data: BytesLike): Result;

  events: {
    "CompSettled(uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
    "LeagueSettled(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CompSettled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LeagueSettled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type CompSettledEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
    firstTokenId: BigNumber;
    secondTokenId: BigNumber;
    thirdTokenId: BigNumber;
    firstWinnings: BigNumber;
    secondWinnings: BigNumber;
    thirdWinnings: BigNumber;
  }
>;

export type LeagueSettledEvent = TypedEvent<
  [BigNumber] & { championTokenId: BigNumber }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class WSLFantasyLeague extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: WSLFantasyLeagueInterface;

  functions: {
    COMPETITION_SHARE(overrides?: CallOverrides): Promise<[BigNumber]>;

    INITIAL_PRICE(overrides?: CallOverrides): Promise<[BigNumber]>;

    NUM_COMPETITIONS(overrides?: CallOverrides): Promise<[BigNumber]>;

    SHARE_FOR_FIRST(overrides?: CallOverrides): Promise<[BigNumber]>;

    SHARE_FOR_SECOND(overrides?: CallOverrides): Promise<[BigNumber]>;

    SHARE_FOR_THIRD(overrides?: CallOverrides): Promise<[BigNumber]>;

    buySurfer(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calculateCompetitionWinnings(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        firstsWinnings: BigNumber;
        secondsWinnings: BigNumber;
        thirdsWinnings: BigNumber;
      }
    >;

    hasBeenSettled(overrides?: CallOverrides): Promise<[boolean]>;

    numUnsettledCompetitions(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pot(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    settleCompetition(
      firstTokenId: BigNumberish,
      secondTokenId: BigNumberish,
      thirdTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    settleLeague(
      championTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    wslNFT(overrides?: CallOverrides): Promise<[string]>;
  };

  COMPETITION_SHARE(overrides?: CallOverrides): Promise<BigNumber>;

  INITIAL_PRICE(overrides?: CallOverrides): Promise<BigNumber>;

  NUM_COMPETITIONS(overrides?: CallOverrides): Promise<BigNumber>;

  SHARE_FOR_FIRST(overrides?: CallOverrides): Promise<BigNumber>;

  SHARE_FOR_SECOND(overrides?: CallOverrides): Promise<BigNumber>;

  SHARE_FOR_THIRD(overrides?: CallOverrides): Promise<BigNumber>;

  buySurfer(
    tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calculateCompetitionWinnings(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      firstsWinnings: BigNumber;
      secondsWinnings: BigNumber;
      thirdsWinnings: BigNumber;
    }
  >;

  hasBeenSettled(overrides?: CallOverrides): Promise<boolean>;

  numUnsettledCompetitions(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  pot(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  settleCompetition(
    firstTokenId: BigNumberish,
    secondTokenId: BigNumberish,
    thirdTokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  settleLeague(
    championTokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  wslNFT(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    COMPETITION_SHARE(overrides?: CallOverrides): Promise<BigNumber>;

    INITIAL_PRICE(overrides?: CallOverrides): Promise<BigNumber>;

    NUM_COMPETITIONS(overrides?: CallOverrides): Promise<BigNumber>;

    SHARE_FOR_FIRST(overrides?: CallOverrides): Promise<BigNumber>;

    SHARE_FOR_SECOND(overrides?: CallOverrides): Promise<BigNumber>;

    SHARE_FOR_THIRD(overrides?: CallOverrides): Promise<BigNumber>;

    buySurfer(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    calculateCompetitionWinnings(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        firstsWinnings: BigNumber;
        secondsWinnings: BigNumber;
        thirdsWinnings: BigNumber;
      }
    >;

    hasBeenSettled(overrides?: CallOverrides): Promise<boolean>;

    numUnsettledCompetitions(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    pot(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    settleCompetition(
      firstTokenId: BigNumberish,
      secondTokenId: BigNumberish,
      thirdTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    settleLeague(
      championTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    wslNFT(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "CompSettled(uint256,uint256,uint256,uint256,uint256,uint256)"(
      firstTokenId?: null,
      secondTokenId?: null,
      thirdTokenId?: null,
      firstWinnings?: null,
      secondWinnings?: null,
      thirdWinnings?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        firstTokenId: BigNumber;
        secondTokenId: BigNumber;
        thirdTokenId: BigNumber;
        firstWinnings: BigNumber;
        secondWinnings: BigNumber;
        thirdWinnings: BigNumber;
      }
    >;

    CompSettled(
      firstTokenId?: null,
      secondTokenId?: null,
      thirdTokenId?: null,
      firstWinnings?: null,
      secondWinnings?: null,
      thirdWinnings?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        firstTokenId: BigNumber;
        secondTokenId: BigNumber;
        thirdTokenId: BigNumber;
        firstWinnings: BigNumber;
        secondWinnings: BigNumber;
        thirdWinnings: BigNumber;
      }
    >;

    "LeagueSettled(uint256)"(
      championTokenId?: null
    ): TypedEventFilter<[BigNumber], { championTokenId: BigNumber }>;

    LeagueSettled(
      championTokenId?: null
    ): TypedEventFilter<[BigNumber], { championTokenId: BigNumber }>;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    COMPETITION_SHARE(overrides?: CallOverrides): Promise<BigNumber>;

    INITIAL_PRICE(overrides?: CallOverrides): Promise<BigNumber>;

    NUM_COMPETITIONS(overrides?: CallOverrides): Promise<BigNumber>;

    SHARE_FOR_FIRST(overrides?: CallOverrides): Promise<BigNumber>;

    SHARE_FOR_SECOND(overrides?: CallOverrides): Promise<BigNumber>;

    SHARE_FOR_THIRD(overrides?: CallOverrides): Promise<BigNumber>;

    buySurfer(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calculateCompetitionWinnings(overrides?: CallOverrides): Promise<BigNumber>;

    hasBeenSettled(overrides?: CallOverrides): Promise<BigNumber>;

    numUnsettledCompetitions(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pot(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    settleCompetition(
      firstTokenId: BigNumberish,
      secondTokenId: BigNumberish,
      thirdTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    settleLeague(
      championTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    wslNFT(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    COMPETITION_SHARE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    INITIAL_PRICE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    NUM_COMPETITIONS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SHARE_FOR_FIRST(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SHARE_FOR_SECOND(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SHARE_FOR_THIRD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buySurfer(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calculateCompetitionWinnings(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasBeenSettled(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    numUnsettledCompetitions(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    settleCompetition(
      firstTokenId: BigNumberish,
      secondTokenId: BigNumberish,
      thirdTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    settleLeague(
      championTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    wslNFT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
