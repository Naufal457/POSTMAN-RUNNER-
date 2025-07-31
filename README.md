# Fraud & Risk Profile Automation Scripts

This repository contains scripts designed to automate the process of screening, claim checking, and risk profile assessments. The scripts are intended for use in the context of fraud detection, claim validation, and risk profiling within a financial or insurance-related API workflow.

The main scripts included in this repository are:

1. **ScreeningRunner.js**
2. **ClaimCheckingRunner.js**
3. **RiskProfileRunner.js**

Each script automates a specific part of the fraud-checking and risk assessment processes, interacting with API responses and validating key data points. These scripts are intended to be used with Postman or similar tools that support scripting for API requests and responses.

## Overview

### 1. **ScreeningRunner.js**

This script handles the API response from a fraud detection system and logs relevant details such as:

* **Fraud Status**
* **ID Number**
* **Name**
* **Date of Birth**

The script checks for errors, logs the results to the console, and generates test results without using assertions.

**Key Features:**

* Logs detailed response data
* Handles error cases with informative failure messages
* Supports fraud status, name, ID, and date of birth tracking

### 2. **ClaimCheckingRunner.js**

This script is responsible for processing claim information, extracting necessary fields, and validating claim statuses. It checks various risk profiles associated with a claim and logs the results.

**Key Features:**

* Tracks claim details like claim ID, claim number, claim amount, and more
* Extracts risk profiles and validation statuses from the API response
* Logs test results for each claim iteration

### 3. **RiskProfileRunner.js**

This script evaluates the risk profile of a policyholder based on the provided screening data and API response. It includes detailed logging of the risk status and score.

**Key Features:**

* Extracts and logs risk profile calculations, including risk status and total score
* Validates the data and logs errors where applicable
* Supports iteration tracking for detailed results

## Installation

To use these scripts, you will need to have Postman or a similar tool for API testing. You can load these scripts directly into Postman’s **Pre-request Script** or **Test Script** sections for the respective API requests.

1. Clone or download this repository.
2. Open Postman and navigate to your collection or environment.
3. Paste the contents of each `.js` file into the appropriate script section of your Postman collection.
4. Run the requests and check the console logs and test results for the output.

## Example Usage

Each script is designed to be used in the context of an API request/response cycle. For example, you can use these scripts to handle a fraud detection API call:

```bash
curl --location 'http://localhost:8080/v2/ao-fraud/workflow/fraud-checking' \
--header 'apiKey: your-api-key' \
--header 'Content-Type: application/json' \
--data '{
  "config": {
    "sourceRequest": "annuity_alteration", 
    "screeningApuppt": true
  },
  "screeningAPUPPT": {
    "name": "{{name}}",
    "idNumber": "{{idNumber}}",
    "idType": "NPWP",
    "dob": "{{dob}}"
  }
}'
```

## Contributing

Feel free to fork this repository, submit issues, and open pull requests for any improvements or fixes you'd like to contribute.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
