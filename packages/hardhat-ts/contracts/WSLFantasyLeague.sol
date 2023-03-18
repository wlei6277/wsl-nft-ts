pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

import "./WSLNFT.sol";

//SPDX-License-Identifier: MIT

contract WSLFantasyLeague is Ownable {
  using SafeMath for uint256; //outlines use of SafeMath for uint256 variables

  event CompSettled(uint256 firstTokenId, uint256 secondTokenId, uint256 thirdTokenId, uint256 firstWinnings, uint256 secondWinnings, uint256 thirdWinnings);
  event LeagueSettled(uint256 championTokenId);

  WSLNFT public wslNFT;
  struct Player {
    string name;
  }

  uint256 public constant INITIAL_PRICE = 0.005 ether;
  uint256 public constant COMPETITION_SHARE = 5000;
  uint256 public constant NUM_COMPETITIONS = 10;
  uint256 public numUnsettledCompetitions;
  uint256 public pot = 0;
  uint256 public constant SHARE_FOR_FIRST = 5000;
  uint256 public constant SHARE_FOR_SECOND = 3000;
  uint256 public constant SHARE_FOR_THIRD = 2000;
  mapping(address => Player) public players;
  bool public hasBeenSettled;

  constructor(address nftContractAddress) {
    wslNFT = WSLNFT(nftContractAddress);
    numUnsettledCompetitions = NUM_COMPETITIONS;
    hasBeenSettled = false;
  }

  modifier unsettledCompetitions() {
    require(numUnsettledCompetitions > 0, "All comps settled");
    _;
  }

  modifier isLive() {
    require(!hasBeenSettled, "League is finished");
    _;
  }

  receive() external payable {
    pot += msg.value;
  }

  function calculateCompetitionWinnings() public view returns (uint256 firstsWinnings, uint256 secondsWinnings, uint256 thirdsWinnings) {
    uint256 normaliser = 10000;
    uint256 competitionWinnings = (pot.mul(COMPETITION_SHARE).div(NUM_COMPETITIONS)).div(normaliser);

    return (
      competitionWinnings.mul(SHARE_FOR_FIRST).div(normaliser),
      competitionWinnings.mul(SHARE_FOR_SECOND).div(normaliser),
      competitionWinnings.mul(SHARE_FOR_THIRD).div(normaliser)
    );
  }

  function addPlayer(address playerAddress, Player memory player) public isLive {
    players[playerAddress] =  player;
  }

  function buySurfer(uint256 tokenId) public payable isLive {
    require(msg.value == INITIAL_PRICE, "Incorrect payment amount");
    require(wslNFT.ownerOf(tokenId) == address(this), "Surfer has already been bought");
    wslNFT.safeTransferFrom(address(this), msg.sender, tokenId);
    pot += INITIAL_PRICE;
  }

  function transferWinnings(uint256 tokenId, uint256 winnings) private onlyOwner unsettledCompetitions isLive {
    address tokenOwner = wslNFT.ownerOf(tokenId);
    if (tokenOwner != address(this)) {
      payable(tokenOwner).transfer(winnings);
    }
  }

  function settleCompetition(uint256 firstTokenId, uint256 secondTokenId, uint256 thirdTokenId) public onlyOwner unsettledCompetitions isLive {
    (uint256 firstWinnings, uint256 secondWinnings, uint256 thirdWinnings) = calculateCompetitionWinnings();
    transferWinnings(firstTokenId, firstWinnings);
    transferWinnings(secondTokenId, secondWinnings);
    transferWinnings(thirdTokenId, thirdWinnings);
    numUnsettledCompetitions -= 1;
    emit CompSettled(firstTokenId, secondTokenId, thirdTokenId, firstWinnings, secondWinnings, thirdWinnings);
  }

  function settleLeague(uint256 championTokenId) public onlyOwner isLive {
    require(numUnsettledCompetitions == 0, "Unsettled comps");
    address championOwner = wslNFT.ownerOf(championTokenId);
    // No one owns the champion distribute the league balance amongst all of the players
    if (championOwner == address(this)) {
      uint256 numBoughtSurfers = 0;
      address[] memory playersToRefund = new address[](wslNFT.totalSupply());
      uint balanceToDistribute = address(this).balance;
      for (uint256 i = 0; i < wslNFT.totalSupply(); i += 1) {
        address player = wslNFT.ownerOf(wslNFT.tokenByIndex(i));
        if (player != address(this)) {
          numBoughtSurfers += 1;
          playersToRefund[i] = player;
        }
      }

      for (uint256 i = 0; i < wslNFT.totalSupply(); i += 1) {
        if (playersToRefund[i] != address(0)) {
          payable(playersToRefund[i]).transfer(balanceToDistribute / numBoughtSurfers);
        }
      }
    } else {
      payable(championOwner).transfer(address(this).balance);
    }
    hasBeenSettled = true;
    emit LeagueSettled(championTokenId);
  }
}
