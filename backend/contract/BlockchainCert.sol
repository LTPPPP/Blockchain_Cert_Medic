// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {
    struct Certificate {
        string doctorName;
        string qualification;
        string issuedBy;
        uint256 issueDate;
        string certificateHash;
    }

    mapping(string => Certificate) public certificates; // certificateHash -> Certificate

    event CertificateAdded(string certificateHash, string doctorName);

    function addCertificate(
        string memory _doctorName,
        string memory _qualification,
        string memory _issuedBy,
        uint256 _issueDate,
        string memory _certificateHash
    ) public {
        require(bytes(_certificateHash).length > 0, "Invalid certificate hash");
        certificates[_certificateHash] = Certificate(
            _doctorName,
            _qualification,
            _issuedBy,
            _issueDate,
            _certificateHash
        );
        emit CertificateAdded(_certificateHash, _doctorName);
    }

    function getCertificate(
        string memory _certificateHash
    )
        public
        view
        returns (
            string memory doctorName,
            string memory qualification,
            string memory issuedBy,
            uint256 issueDate
        )
    {
        Certificate memory cert = certificates[_certificateHash];
        return (
            cert.doctorName,
            cert.qualification,
            cert.issuedBy,
            cert.issueDate
        );
    }
}
