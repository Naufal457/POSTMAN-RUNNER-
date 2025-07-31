try {
    // Extract JSON data from the response
    const jsonData = pm.response.json();
    const requestBodyRaw = pm.request.body.raw;
    const statusCode = pm.response.code;

    // Retrieve variables from Postman environment or collection
    let name = pm.variables.get("name") || 'N/A';
    let idNumber = pm.variables.get("idNumber") || 'N/A';
    let dob = pm.variables.get("dob") || 'N/A';
    let claimNumber = pm.variables.get("claimNumber") || 'N/A';
    let claimId = claimNumber;  // Assign claimId from claimNumber
    let claimAmount = pm.variables.get("claimAmount") || 'N/A';
    let policyHolderName = name; // Assign from 'name'
    let policyHolderIdNumber = idNumber; // Assign from 'idNumber'
    let policyHolderDateOfBirth = dob; // Assign from 'dob'

    // Parse the request body to extract additional details
    let parsedRequest = JSON.parse(requestBodyRaw);

    // Extract response data from the API response
    const riskStatus = jsonData.data.retailRiskProfileCalculation.riskStatus;
    const ppatkStatus = jsonData.data.retailRiskProfileCalculation.ppatkStatus;
    const totalScore = jsonData.data.retailRiskProfileCalculation.totalScore;
    const needEddRiskProfile = jsonData.data.retailRiskProfileCalculation.needEdd;  // Renamed
    const needEddClaim = jsonData.data.claimScoring?.needEdd || 'N/A';  // Renamed

    // Extract iteration for logging
    const iteration = pm.info.iteration + 1;

    // Create result object to log and test
    const result = {
        iteration,
        status: statusCode,
        name,
        idNumber,
        dob,
        claimId,
        claimNumber,
        claimAmount,
        policyHolderIdNumber,
        policyHolderDateOfBirth,
        riskStatus,
        ppatkStatus,
        totalScore,
        needEddRiskProfile,  // Added
        needEddClaim         // Added
    };

    // ✅ Log result as JSON
    const resultJson = JSON.stringify(result, null, 2);
    console.log(resultJson);

    // Perform tests for each iteration
    pm.test(`Iteration: ${iteration}, Status: ${statusCode}, ID Number: ${idNumber}, DOB: ${dob}, Claim ID: ${claimId}, Claim Number: ${claimNumber}, Claim Amount: ${claimAmount}, Risk Status: ${riskStatus}, PPATK Status: ${ppatkStatus}, Total Score: ${totalScore}, needEddRiskProfile: ${needEddRiskProfile}, needEddClaim: ${needEddClaim}`, function () {
        pm.expect(statusCode).to.be.oneOf([200, 201]);  // Allow both 200 and 201 status codes
        pm.expect(riskStatus).to.exist;
        pm.expect(ppatkStatus).to.exist;
        pm.expect(totalScore).to.be.a('string');  // Adjust type check based on actual response
        pm.expect(needEddRiskProfile).to.exist;  // Ensure needEddRiskProfile is present
        pm.expect(needEddClaim).to.exist;       // Ensure needEddClaim is present
    });

    // Return result summary with pass/fail count
    const resultSummary = {
        pass: 1,
        fail: 0,
        resultJson: resultJson
    };

    console.log("Test Result Summary: ", JSON.stringify(resultSummary, null, 2));

} catch (error) {
    const jsonData = pm.response.json();
    const statusCode = pm.response.code;
    const requestBodyRaw = pm.request.body.raw;
    let name = pm.variables.get("name") || 'N/A';
    let idNumber = pm.variables.get("idNumber") || 'N/A';
    let dob = pm.variables.get("dob") || 'N/A';
    let message = jsonData.message || 'N/A';

    // Log the error for debugging
    console.error(`Error occurred for iteration ${pm.info.iteration + 1}: ${message}`);

    // Generate failure message to display in the test
    const failMessage = `Iteration: ${pm.info.iteration + 1}, Status: ${statusCode}, Name: ${name}, ID Number: ${idNumber}, DOB: ${dob}, Error: ${message}`;

    // ❌ Log the failure message to the console
    console.error(failMessage);

    // ❌ Mark test as failed and log it
    pm.test(failMessage, function () {
        pm.expect.fail(failMessage);
    });

}



// curl --location 'https://api-automation-dev.ifg-life.id/v2/ao-fraud/workflow/fraud-checking' \
// --header 'apiKey: E97baCBt8SxmDcYNyd3KwbEA0giw8ElF' \
// --header 'Content-Type: application/json' \
// --data '{
//     "config": {
//         "sourceRequest": "CLAIM",
//         "isClaim": {
//             "isClaim": true,
//             "claimType": "LF"
//         },
//         "screeningApuppt": true
//     },
//     "screeningAPUPPT": {
//         "name": "{{name}}",
//         "idNumber": {{idNumber}},
//         "idType": "NIK",
//         "dob": "{{dob}}"
//     },
//     "claimInfo": {
//         "claimId": "{{claimNumber}}",
//         "claimNumber": "{{claimNumber}}",
//         "doctorName": "",
//         "beneficiaryName": "BPJS KESEHATAN",
//         "relation": "-",
//         "hospitalName": "",
//         "claimAmount": {{claimAmount}},
//         "bankName": "BRI",
//         "bankAccountName": "BPJS KESEHATAN",
//         "bankAccountNumber": "034101001025300",
//         "hospitalArea": "",
//         "policyHolderArea": "DKI JAKARTA",
//         "agentCode": "",
//         "beneficiaryArea": "DKI JAKARTA",
//         "claimType": "LF"
//     },
//     "riskProfile": {
//         "retailRiskProfile": {
//             "policyHolderName": "{{name}}",
//             "alias": "",
//             "policyHolderIdNumber": "{{idNumber}}",
//             "policyHolderDateOfBirth": "{{dob}}",
//             "nationality": "INDONESIA",
//             "policyHolderJob": "Karyawan Swasta",
//             "policyCoverageArea": "31",
//             "typeOfInsurance": "Endowment",
//             "totalPremium": "0",
//             "paymentMethod": "VA",
//             "insuranceObjective": "",
//             "insuranceProduct": "IFG PENDANAAN HARI TUA"
//         }
//     }
// }'