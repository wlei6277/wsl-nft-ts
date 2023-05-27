/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  WSLFantasyLeague,
  WSLFantasyLeagueInterface,
} from "../WSLFantasyLeague";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContractAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "firstTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "secondTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "thirdTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "firstWinnings",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "secondWinnings",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "thirdWinnings",
        type: "uint256",
      },
    ],
    name: "CompSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "championTokenId",
        type: "uint256",
      },
    ],
    name: "LeagueSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "COMPETITION_SHARE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "INITIAL_PRICE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NUM_COMPETITIONS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SHARE_FOR_FIRST",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SHARE_FOR_SECOND",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SHARE_FOR_THIRD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        internalType: "struct WSLFantasyLeague.Player",
        name: "player",
        type: "tuple",
      },
    ],
    name: "addPlayer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "buySurfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "calculateCompetitionWinnings",
    outputs: [
      {
        internalType: "uint256",
        name: "firstsWinnings",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "secondsWinnings",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "thirdsWinnings",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hasBeenSettled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numUnsettledCompetitions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "players",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "firstTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "secondTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "thirdTokenId",
        type: "uint256",
      },
    ],
    name: "settleCompetition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "championTokenId",
        type: "uint256",
      },
    ],
    name: "settleLeague",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wslNFT",
    outputs: [
      {
        internalType: "contract WSLNFT",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x6080604052600060035534801561001557600080fd5b50604051611574380380611574833981016040819052610034916100c1565b61003d33610071565b600180546001600160a01b0319166001600160a01b0392909216919091179055600a6002556005805460ff191690556100f1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100d357600080fd5b81516001600160a01b03811681146100ea57600080fd5b9392505050565b611474806101006000396000f3fe6080604052600436106101185760003560e01c80638a7001b7116100a0578063c558309f11610064578063c558309f146102b2578063e2eb41ff146102d2578063e3c8f490146102ff578063f11423751461031f578063f2fde38b1461034f57600080fd5b80638a7001b7146102355780638da5cb5b1461024b578063b3e8cee31461027d578063bf32ceb81461029d578063c2e9c7a01461016a57600080fd5b80635346ffc9116100e75780635346ffc9146101c657806358bd83fb146101d9578063624caaed146101ef578063715018a6146102055780637c5e27951461021a57600080fd5b806329e5d23f1461013b578063354a61131461016a578063465ae42a1461018e5780634ba2363a146101b057600080fd5b3661013657346003600082825461012f919061133c565b9091555050005b600080fd5b34801561014757600080fd5b506005546101559060ff1681565b60405190151581526020015b60405180910390f35b34801561017657600080fd5b5061018061138881565b604051908152602001610161565b34801561019a57600080fd5b506101ae6101a93660046110f6565b61036f565b005b3480156101bc57600080fd5b5061018060035481565b6101ae6101d43660046111ce565b6103d1565b3480156101e557600080fd5b506101806107d081565b3480156101fb57600080fd5b50610180610bb881565b34801561021157600080fd5b506101ae6105a7565b34801561022657600080fd5b506101806611c37937e0800081565b34801561024157600080fd5b5061018060025481565b34801561025757600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610161565b34801561028957600080fd5b506101ae610298366004611200565b6105dd565b3480156102a957600080fd5b50610180600a81565b3480156102be57600080fd5b506101ae6102cd3660046111ce565b610717565b3480156102de57600080fd5b506102f26102ed3660046110bc565b610caa565b604051610161919061122c565b34801561030b57600080fd5b50600154610265906001600160a01b031681565b34801561032b57600080fd5b50610334610d48565b60408051938452602084019290925290820152606001610161565b34801561035b57600080fd5b506101ae61036a3660046110bc565b610dba565b60055460ff161561039b5760405162461bcd60e51b815260040161039290611281565b60405180910390fd5b6001600160a01b03821660009081526004602090815260409091208251805184936103ca928492910190611023565b5050505050565b60055460ff16156103f45760405162461bcd60e51b815260040161039290611281565b6611c37937e08000341461044a5760405162461bcd60e51b815260206004820152601860248201527f496e636f7272656374207061796d656e7420616d6f756e7400000000000000006044820152606401610392565b6001546040516331a9108f60e11b81526004810183905230916001600160a01b031690636352211e9060240160206040518083038186803b15801561048e57600080fd5b505afa1580156104a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c691906110d9565b6001600160a01b03161461051c5760405162461bcd60e51b815260206004820152601e60248201527f5375726665722068617320616c7265616479206265656e20626f7567687400006044820152606401610392565b600154604051632142170760e11b8152306004820152336024820152604481018390526001600160a01b03909116906342842e0e90606401600060405180830381600087803b15801561056e57600080fd5b505af1158015610582573d6000803e3d6000fd5b505050506611c37937e080006003600082825461059f919061133c565b909155505050565b6000546001600160a01b031633146105d15760405162461bcd60e51b8152600401610392906112ad565b6105db6000610e55565b565b6000546001600160a01b031633146106075760405162461bcd60e51b8152600401610392906112ad565b60006002541161064d5760405162461bcd60e51b8152602060048201526011602482015270105b1b0818dbdb5c1cc81cd95d1d1b1959607a1b6044820152606401610392565b60055460ff16156106705760405162461bcd60e51b815260040161039290611281565b600080600061067d610d48565b92509250925061068d8684610ea5565b6106978583610ea5565b6106a18482610ea5565b6001600260008282546106b49190611395565b90915550506040805187815260208101879052908101859052606081018490526080810183905260a081018290527f85061aa24c2420d96b8548b9cdc4b4f26b18d720c89adc26b54382684cbc22319060c00160405180910390a1505050505050565b6000546001600160a01b031633146107415760405162461bcd60e51b8152600401610392906112ad565b60055460ff16156107645760405162461bcd60e51b815260040161039290611281565b600254156107a65760405162461bcd60e51b815260206004820152600f60248201526e556e736574746c656420636f6d707360881b6044820152606401610392565b6001546040516331a9108f60e11b8152600481018390526000916001600160a01b031690636352211e9060240160206040518083038186803b1580156107eb57600080fd5b505afa1580156107ff573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061082391906110d9565b90506001600160a01b038116301415610c2857600080600160009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561088757600080fd5b505afa15801561089b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108bf91906111e7565b67ffffffffffffffff8111156108d7576108d7611413565b604051908082528060200260200182016040528015610900578160200160208202803683370190505b5090504760005b600160009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561095557600080fd5b505afa158015610969573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098d91906111e7565b811015610aed57600154604051634f6ccce760e01b8152600481018390526000916001600160a01b031690636352211e908290634f6ccce79060240160206040518083038186803b1580156109e157600080fd5b505afa1580156109f5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a1991906111e7565b6040518263ffffffff1660e01b8152600401610a3791815260200190565b60206040518083038186803b158015610a4f57600080fd5b505afa158015610a63573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8791906110d9565b90506001600160a01b0381163014610ada57610aa460018661133c565b945080848381518110610ab957610ab96113fd565b60200260200101906001600160a01b031690816001600160a01b0316815250505b50610ae660018261133c565b9050610907565b5060005b600160009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b158015610b3f57600080fd5b505afa158015610b53573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b7791906111e7565b811015610c1f5760006001600160a01b0316838281518110610b9b57610b9b6113fd565b60200260200101516001600160a01b031614610c0d57828181518110610bc357610bc36113fd565b60200260200101516001600160a01b03166108fc8584610be39190611354565b6040518115909202916000818181858888f19350505050158015610c0b573d6000803e3d6000fd5b505b610c1860018261133c565b9050610af1565b50505050610c5f565b6040516001600160a01b038216904780156108fc02916000818181858888f19350505050158015610c5d573d6000803e3d6000fd5b505b6005805460ff191660011790556040517febd30240461d74f4c1096df86e9aafbcd22bb91ca9db5218d1f9c3358d4fd45290610c9e9084815260200190565b60405180910390a15050565b600460205260009081526040902080548190610cc5906113ac565b80601f0160208091040260200160405190810160405280929190818152602001828054610cf1906113ac565b8015610d3e5780601f10610d1357610100808354040283529160200191610d3e565b820191906000526020600020905b815481529060010190602001808311610d2157829003601f168201915b5050505050905081565b60008060008061271090506000610d7b82610d75600a610d7561138860035461100490919063ffffffff16565b90611017565b9050610d8d82610d7583611388611004565b610d9d83610d7584610bb8611004565b610dad84610d75856107d0611004565b9450945094505050909192565b6000546001600160a01b03163314610de45760405162461bcd60e51b8152600401610392906112ad565b6001600160a01b038116610e495760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610392565b610e5281610e55565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000546001600160a01b03163314610ecf5760405162461bcd60e51b8152600401610392906112ad565b600060025411610f155760405162461bcd60e51b8152602060048201526011602482015270105b1b0818dbdb5c1cc81cd95d1d1b1959607a1b6044820152606401610392565b60055460ff1615610f385760405162461bcd60e51b815260040161039290611281565b6001546040516331a9108f60e11b8152600481018490526000916001600160a01b031690636352211e9060240160206040518083038186803b158015610f7d57600080fd5b505afa158015610f91573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb591906110d9565b90506001600160a01b0381163014610fff576040516001600160a01b0382169083156108fc029084906000818181858888f19350505050158015610ffd573d6000803e3d6000fd5b505b505050565b60006110108284611376565b9392505050565b60006110108284611354565b82805461102f906113ac565b90600052602060002090601f0160209004810192826110515760008555611097565b82601f1061106a57805160ff1916838001178555611097565b82800160010185558215611097579182015b8281111561109757825182559160200191906001019061107c565b506110a39291506110a7565b5090565b5b808211156110a357600081556001016110a8565b6000602082840312156110ce57600080fd5b813561101081611429565b6000602082840312156110eb57600080fd5b815161101081611429565b6000806040838503121561110957600080fd5b823561111481611429565b915060208381013567ffffffffffffffff8082111561113257600080fd5b818601915082828803121561114657600080fd5b61114e6112e2565b82358281111561115d57600080fd5b80840193505087601f84011261117257600080fd5b82358281111561118457611184611413565b611196601f8201601f1916860161130b565b925080835288858286010111156111ac57600080fd5b8085850186850137600085828501015250818152809450505050509250929050565b6000602082840312156111e057600080fd5b5035919050565b6000602082840312156111f957600080fd5b5051919050565b60008060006060848603121561121557600080fd5b505081359360208301359350604090920135919050565b600060208083528351808285015260005b818110156112595785810183015185820160400152820161123d565b8181111561126b576000604083870101525b50601f01601f1916929092016040019392505050565b60208082526012908201527113195859dd59481a5cc8199a5b9a5cda195960721b604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6040516020810167ffffffffffffffff8111828210171561130557611305611413565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561133457611334611413565b604052919050565b6000821982111561134f5761134f6113e7565b500190565b60008261137157634e487b7160e01b600052601260045260246000fd5b500490565b6000816000190483118215151615611390576113906113e7565b500290565b6000828210156113a7576113a76113e7565b500390565b600181811c908216806113c057607f821691505b602082108114156113e157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610e5257600080fdfea2646970667358221220794230b87b405bcebd3cd1b64a273f4fd584c76db3cef06af6e26c39714e197764736f6c63430008060033";

export class WSLFantasyLeague__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    nftContractAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WSLFantasyLeague> {
    return super.deploy(
      nftContractAddress,
      overrides || {}
    ) as Promise<WSLFantasyLeague>;
  }
  getDeployTransaction(
    nftContractAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(nftContractAddress, overrides || {});
  }
  attach(address: string): WSLFantasyLeague {
    return super.attach(address) as WSLFantasyLeague;
  }
  connect(signer: Signer): WSLFantasyLeague__factory {
    return super.connect(signer) as WSLFantasyLeague__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WSLFantasyLeagueInterface {
    return new utils.Interface(_abi) as WSLFantasyLeagueInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WSLFantasyLeague {
    return new Contract(address, _abi, signerOrProvider) as WSLFantasyLeague;
  }
}
