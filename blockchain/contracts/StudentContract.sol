// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentContract {
    mapping(address => string) private studentNames;

    event StudentRegistered(address indexed student, string name);

    function registerStudent(address studentAddress, string memory name) public {
        require(bytes(studentNames[studentAddress]).length == 0, "Student already registered");
        studentNames[studentAddress] = name;
        emit StudentRegistered(studentAddress, name);
    }

    function getStudentName(address studentAddress) public view returns (string memory) {
        return studentNames[studentAddress];
    }
}
