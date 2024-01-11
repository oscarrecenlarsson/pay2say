// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract pay2say is ERC721 {
    // Use the "updateState" function to interact with the contract.

    //EVENTS
    event NewState(State);
    event Withdrawal(address contractOwner, uint256 amount);

    //STRUCTS
    struct State {
        string text;
        uint256 amount;
        address creator;
    }

    struct NftState {
        string text;
        uint256 amount;
    }

    //MODIFIERS
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "You are not the contract owner");
        _;
    }

    //CONTRACT VARIABLES
    address public contractOwner;

    //NFT VARIABLES
    uint256 public _nftCounter = 0;
    mapping(uint256 => NftState) private _nftStates;

    //"STATE" OF THE CONTRACT
    string public text =
        "Do you have something better to say? Be prepared to pay!";
    uint256 public amount = 0;
    address public creator;

    //CONSTRUCTOR
    constructor() ERC721("Pay2Say", "P2S") {
        contractOwner = (msg.sender);
        creator = (msg.sender);
    }

    //FUNCTIONS
    function updateState(string memory _text) external payable {
        //INPUT VALIDATION
        require(bytes(_text).length <= 140, "Text must be 140 bytes or less");
        require(
            msg.value > amount,
            "msg.value must be higher than current amount"
        );

        //NFT
        _mint(msg.sender, _nftCounter);
        _nftStates[_nftCounter] = NftState({text: _text, amount: msg.value});
        _nftCounter++;

        //SET NEW "CONTRACT STATE"
        text = _text;
        amount = msg.value;
        creator = msg.sender;

        State memory newState = State({
            text: _text,
            amount: msg.value,
            creator: msg.sender
        });
        emit NewState(newState);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        try this.ownerOf(tokenId) {} catch {
            revert("ERC721Metadata: URI query for nonexistent token");
        }

        NftState memory nftState = _nftStates[tokenId];

        // Create an SVG image with the text embedded
        string memory svg = string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">',
                '<text x="10" y="20" class="small">Text: ',
                nftState.text,
                "</text>",
                "</svg>"
            )
        );

        // Encode the SVG
        string memory imageURI = string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(bytes(svg))
            )
        );

        // Encode the whole URI
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        "{",
                        '"name": "Pay2Say #',
                        Strings.toString(tokenId),
                        '", ',
                        '"description": "',
                        nftState.text,
                        '", ',
                        '"image": "',
                        imageURI,
                        '", ',
                        '"attributes": [',
                        '{ "trait_type": "Amount", "value": "',
                        Strings.toString(nftState.amount),
                        '" }',
                        "]",
                        "}"
                    )
                )
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        return output;
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
