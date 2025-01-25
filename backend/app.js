const express = require("express");
const Web3 = require("web3").default;
const app = express();
const port = 3000;

const CONTRACT_ABI = [[]]; // ABI của hợp đồng Solidity
const CONTRACT_ADDRESS = ""; // Địa chỉ contract sau khi deploy

const web3 = new Web3("");
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

app.use(express.json());

// Thêm certificate
app.post("/addCertificate", async (req, res) => {
  const { doctorName, qualification, issuedBy, issueDate, certificateHash } =
    req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .addCertificate(
        doctorName,
        qualification,
        issuedBy,
        issueDate,
        certificateHash
      )
      .send({ from: accounts[0] });
    res.send("Certificate added successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Truy xuất certificate
app.get("/getCertificate/:hash", async (req, res) => {
  const certificateHash = req.params.hash;

  try {
    const certificate = await contract.methods
      .getCertificate(certificateHash)
      .call();
    res.json(certificate);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
