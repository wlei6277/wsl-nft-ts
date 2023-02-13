pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

contract SendEthToContract {
  
  constructor() {
  }

  function transferToContract(address contractAddress) external payable {
    address(contractAddress).call{ value: msg.value }("");
  }
}