pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    string public data;
    uint256[] public ids;

    function getData() view public returns(string memory) {
        return data;
    }

    function setData(string memory _data) public {
        data = _data;
    }

    function addToIds(uint256 val) public {
        ids.push(val);
    }

    function getFromIds(uint256 position) view public returns(uint256){
        return ids[position];
    }

    function getAllIds() view public returns(uint256[] memory) {
        return ids;
    }

    function getLengthOfIds() view public returns(uint256) {
        return ids.length;
    }
}