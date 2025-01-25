import React, { useState } from "react";
import axios from "axios";

function App() {
  const [certificate, setCertificate] = useState({
    doctorName: "",
    qualification: "",
    issuedBy: "",
    issueDate: "",
    certificateHash: "",
  });
  const [retrievedCert, setRetrievedCert] = useState(null);

  const handleInputChange = (e) => {
    setCertificate({ ...certificate, [e.target.name]: e.target.value });
  };

  const addCertificate = async () => {
    try {
      await axios.post("http://localhost:3000/addCertificate", certificate);
      alert("Certificate added successfully.");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getCertificate = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/getCertificate/${certificate.certificateHash}`
      );
      setRetrievedCert(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Blockchain Certificate Verification</h1>
      <div>
        <h2>Add Certificate</h2>
        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="issuedBy"
          placeholder="Issued By"
          onChange={handleInputChange}
        />
        <input type="date" name="issueDate" onChange={handleInputChange} />
        <input
          type="text"
          name="certificateHash"
          placeholder="Certificate Hash"
          onChange={handleInputChange}
        />
        <button onClick={addCertificate}>Add Certificate</button>
      </div>
      <div>
        <h2>Get Certificate</h2>
        <input
          type="text"
          placeholder="Certificate Hash"
          onChange={(e) =>
            setCertificate({ ...certificate, certificateHash: e.target.value })
          }
        />
        <button onClick={getCertificate}>Get Certificate</button>
        {retrievedCert && (
          <div>
            <h3>Certificate Details:</h3>
            <p>Doctor Name: {retrievedCert[0]}</p>
            <p>Qualification: {retrievedCert[1]}</p>
            <p>Issued By: {retrievedCert[2]}</p>
            <p>
              Issue Date:{" "}
              {new Date(parseInt(retrievedCert[3]) * 1000).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
