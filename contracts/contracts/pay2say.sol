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

    //HANDLE DYNAMIC TEXT
    function splitText(
        string memory splitTextInput,
        uint256 maxLineLength
    ) public pure returns (string[] memory) {
        if (bytes(splitTextInput).length <= maxLineLength) {
            string[] memory singleLine = new string[](1);
            singleLine[0] = splitTextInput;
            return singleLine;
        }

        uint256 wordCount = countWords(splitTextInput);
        string[] memory words = getWords(splitTextInput, wordCount);

        string[] memory lines = new string[](wordCount); // Buffer for maximum possible lines
        uint256 lineCount = 0;
        string memory currentLine = words[0];
        string memory testLine;

        for (uint256 i = 1; i < wordCount; i++) {
            testLine = string(abi.encodePacked(currentLine, " ", words[i]));
            if (bytes(testLine).length <= maxLineLength) {
                currentLine = testLine;
            } else {
                lines[lineCount] = currentLine;
                lineCount++;
                currentLine = words[i];
            }
        }

        lines[lineCount] = currentLine;
        lineCount++;

        // Resize the array to the actual number of lines
        string[] memory finalLines = new string[](lineCount);
        for (uint256 j = 0; j < lineCount; j++) {
            finalLines[j] = lines[j];
        }

        return finalLines;
    }

    function countWords(
        string memory countWordsInput
    ) private pure returns (uint256) {
        uint256 wordCount = 0;
        bool inWord = false;
        bytes memory textBytes = bytes(countWordsInput);
        for (uint256 i = 0; i < textBytes.length; i++) {
            if (textBytes[i] != " " && !inWord) {
                wordCount++;
                inWord = true;
            } else if (textBytes[i] == " ") {
                inWord = false;
            }
        }
        return wordCount;
    }

    function getWords(
        string memory getWordsInput,
        uint256 wordCount
    ) private pure returns (string[] memory) {
        string[] memory words = new string[](wordCount);
        bytes memory textBytes = bytes(getWordsInput);
        uint256 wordIndex = 0;
        bytes memory word = new bytes(textBytes.length);
        uint256 letterIndex = 0;

        for (uint256 i = 0; i < textBytes.length; i++) {
            if (textBytes[i] != " ") {
                word[letterIndex] = textBytes[i];
                letterIndex++;
            } else if (letterIndex != 0) {
                bytes memory wordToAdd = new bytes(letterIndex);
                for (uint256 j = 0; j < letterIndex; j++) {
                    wordToAdd[j] = word[j];
                }
                words[wordIndex] = string(wordToAdd);
                wordIndex++;
                letterIndex = 0;
            }
        }

        // Add the last word if there is one
        if (letterIndex > 0) {
            bytes memory wordToAdd = new bytes(letterIndex);
            for (uint256 j = 0; j < letterIndex; j++) {
                wordToAdd[j] = word[j];
            }
            words[wordIndex] = string(wordToAdd);
        }

        return words;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        try this.ownerOf(tokenId) {} catch {
            revert("ERC721Metadata: URI query for nonexistent token");
        }

        NftState memory nftState = _nftStates[tokenId];
        string[] memory lines = splitText(nftState.text, 25);

        // Create the SVG
        string
            memory svgPart1 = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" />';
        string memory svgPart2 = "";

        for (uint256 i = 0; i < lines.length; i++) {
            uint256 yPosition = 20 + i * 20;
            svgPart2 = string(
                abi.encodePacked(
                    svgPart2,
                    '<text x="10" y="',
                    Strings.toString(yPosition),
                    '" class="base">',
                    lines[i],
                    "</text>"
                )
            );
        }

        string memory svg = string(
            abi.encodePacked(svgPart1, svgPart2, "</svg>")
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
