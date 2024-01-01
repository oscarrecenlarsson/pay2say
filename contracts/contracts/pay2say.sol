// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract pay2say {
    // Use the "updateState" function to interact with the contract.

    constructor() {
        contractOwner = (msg.sender);
        creator = (msg.sender);
    }

    event NewState(State);
    event Withdrawal(address contractOwner, uint amount);

    address public contractOwner;
    string public text =
        "Do you have something better to say? Be prepared to pay!";
    uint public amount = 0;
    address public creator;

    struct State {
        string text;
        uint amount;
        address creator;
    }

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "You are not the contract owner");
        _;
    }

    function updateState(string memory _text) external payable {
        require(bytes(_text).length <= 140, "Text must be 140 bytes or less");
        require(
            msg.value > amount,
            "msg.value must be higher than current amount"
        );
        amount = msg.value;
        text = _text;
        creator = msg.sender;

        State memory newState = State({
            text: _text,
            amount: msg.value,
            creator: msg.sender
        });

        emit NewState(newState);
    }

    function withdraw() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No balance to withdraw");
        payable(contractOwner).transfer(contractBalance);

        emit Withdrawal(contractOwner, contractBalance);
    }

    receive() external payable {
        revert("Use the updateState function to interact with the contract.");
    }
}
