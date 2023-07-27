const StudentContract = artifacts.require("StudentContract");

contract("StudentContract", (accounts) => {
  let studentContract;

  before(async () => {
    studentContract = await StudentContract.deployed();
  });

  it("should register a student", async () => {
    const studentAddress = accounts[0];
    const studentName = "John Doe";

    await studentContract.registerStudent(studentAddress, studentName);

    const registeredStudentName = await studentContract.getStudentName(studentAddress);
    assert.equal(registeredStudentName, studentName, "Student name is not correct");
  });
});
