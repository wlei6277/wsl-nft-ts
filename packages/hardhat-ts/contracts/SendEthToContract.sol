pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

contract SendEthToContract {
  constructor(address contractAddress) payable {
    selfdestruct(payable(contractAddress));
  }
}