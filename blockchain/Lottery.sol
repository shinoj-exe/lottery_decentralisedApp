// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Lottery{
    address public owner;
    //it is made payable because they have to send and recieve credits
    address payable[] public players ; //array 
    uint public lotteryId;

    // to keep of track of the winner of the lottery
    mapping(uint=> address payable)public lotteryWinners;

    constructor(){
        owner = msg.sender;
        lotteryId=1;
    }

    function getWinnerByLottery(uint idLottery) public view returns(address payable){
        return lotteryWinners[idLottery];
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getPlayer() public view returns(address payable[] memory){ //store in temp memory only for the function duration
        return players;
    }

    function enter() public payable {
        require(msg.value > .01 ether); //entrance fee
        // address of those who want to enter the lottery
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns (uint){
    // generate a pseudo random number using a hashing algorithm
        return uint(keccak256(abi.encodePacked(owner,block.timestamp))); //gives the timestamp of the current block
        // abi encodepacked is used to easily concatenate two strings hashes it and converts to uint
    }

    function pickWinner() public onlyOwner{
        uint index = getRandomNumber() % players.length; //to make it in betwwen the indecis of player array
        // transfer funds to the winner
         players[index].transfer(address(this).balance); //the balance remaining in the current smart contract
        // which will be the mney that is send in by the players

        // always update states after transfer for more protection of the smart contract
        lotteryWinners[lotteryId]=players[index];
        lotteryId++;

        // reset the state of the contract
        players = new address payable[](0);

    }

    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }
}