// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalDeviceContract {
    struct MedicalDevice {
        string deviceId;
        string deviceName;
        string manufacturer;
        uint256 productionDate;
        string regulatoryApproval;
        string deviceHash;
    }

    mapping(string => MedicalDevice) public medicalDevices;

    event DeviceRegistered(string indexed deviceId, string deviceName);

    function registerDevice(
        string memory _deviceId,
        string memory _deviceName,
        string memory _manufacturer,
        uint256 _productionDate,
        string memory _regulatoryApproval,
        string memory _deviceHash
    ) public {
        medicalDevices[_deviceId] = MedicalDevice(
            _deviceId,
            _deviceName,
            _manufacturer,
            _productionDate,
            _regulatoryApproval,
            _deviceHash
        );
        emit DeviceRegistered(_deviceId, _deviceName);
    }

    function getDevice(
        string memory _deviceId
    )
        public
        view
        returns (
            string memory name,
            string memory manufacturer,
            uint256 productionDate
        )
    {
        MedicalDevice memory device = medicalDevices[_deviceId];
        return (device.deviceName, device.manufacturer, device.productionDate);
    }
}
