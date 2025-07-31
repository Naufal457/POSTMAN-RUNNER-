try {
    // Extract JSON data from the response
    const jsonData = pm.response.json();
    const requestBodyRaw = pm.request.body.raw;
    const statusCode = pm.response.code;
    let parsedRequest = {};
    let name = 'N/A';
    let idNumber = 'N/A';
    let dob = 'N/A';
 
    parsedRequest = JSON.parse(requestBodyRaw);
 
    // Ambil value dari field screeningAPUPPT
    name = parsedRequest.screeningAPUPPT?.name || 'N/A';
    idNumber = parsedRequest.screeningAPUPPT?.idNumber || 'N/A';
    dob = parsedRequest.screeningAPUPPT?.dob || 'N/A';
   
    const riskStatus = jsonData.data.retailRiskProfileCalculation.riskStatus;
    const ppatkStatus = jsonData.data.retailRiskProfileCalculation.ppatkStatus;
    const totalScore = jsonData.data.retailRiskProfileCalculation.totalScore;
 
    // Extract iteration for logging
    const iteration = pm.info.iteration + 1;
    const result = {
        iteration,
        status: statusCode,
        idNumber,
        name,
        dob,
        riskStatus,
        ppatkStatus,
        totalScore
    };
 
    // ✅ Tampilkan ke console sebagai JSON
    console.log(JSON.stringify(result, null, 2));
 
    pm.test(`Iteration: ${iteration} , Status: ${statusCode} , idNumber: ${idNumber} , name: ${name} , dob: ${dob}, riskStatus: ${riskStatus}, ppatkStatus: ${ppatkStatus}, totalScore: ${totalScore}`, function () {
       
       
    });
 
} catch (error) {
 
    const jsonData = pm.response.json();
    const statusCode = pm.response.code;
    const requestBodyRaw = pm.request.body.raw;
    let parsedRequest = {};
    let name = 'N/A';
    let idNumber = 'N/A';
    let dob = 'N/A';
    let message = jsonData.message || 'N/A';
 
    parsedRequest = JSON.parse(requestBodyRaw);
 
    // Ambil value dari field screeningAPUPPT
    name = parsedRequest.screeningAPUPPT?.name || 'N/A';
    idNumber = parsedRequest.screeningAPUPPT?.idNumber || 'N/A';
    dob = parsedRequest.screeningAPUPPT?.dob || 'N/A';
    sourceRequest = parsedRequest.config?.sourceRequest || 'N/A';
 
    const failMessage = `Iteration: ${iteration} , Status: ${statusCode}, idNumber: ${idNumber} , name: ${name} , dob: ${dob} , Error: ${message}`;
 
    // ❌ Tampilkan di Console
    console.error(failMessage);
 
    // ❌ Tampilkan sebagai FAIL di Test Result
    pm.test(failMessage, function () {
        pm.expect.fail(failMessage);
    });
}
 

// curl --location 'http://localhost:8080/v2/ao-fraud/workflow/fraud-checking' \
// --header 'Content-Type: application/json' \
// --header 'apiKey: E97baCBt8SxmDcYNyd3KwbEA0giw8ElF' \
// --data '{
//     "config": {
//         "sourceRequest": "GLP2025",
//         "isRiskProfile": {
//             "isRiskProfile": true,
//             "riskType": "Retail"
//         },
//         "screeningApuppt": true
//     },
//     "screeningAPUPPT": {
//         "name": "{{name}}",
//         "idNumber": "{{idNumber}}",
//         "idType": "NIK",
//         "dob": "{{dob}}"
//     },
//     "riskProfile": {
//         "retailRiskProfile": {
//             "policyHolderName": "{{name}}",
//             "alias": "",
//             "beneficiaryName": "{{idNumber}}",
//             "policyHolderIdNumber": "{{idNumber}}",
//             "policyHolderAddress": "",
//             "policyHolderPhone": "",
//             "policyHolderDateOfBirth": "{{dob}}",
//             "policyHolderPlaceOfBirth": "",
//             "beneficiaryDateOfBirth": "",
//             "nationality": "INDONESIA",
//             "policyHolderJob": "{{policyHolderJob}}",
//             "policyHolderJobAddress": "",
//             "policyHolderJobPhone": "",
//             "policyHolderGender": "",
//             "policyHolderMaritalStatus": "",
//             "averageEarnings": "",
//             "policyCoverageArea": "{{policyCoverageArea}}",
//             "typeOfInsurance": "{{typeOfInsurance}}",
//             "totalPremium": "",
//             "paymentMethod": "{{paymentMethod}}",
//             "insuranceStartDate": "2014-01-09",
//             "insuranceObjective": "",
//             "dataUpdated": "",
//             "insuranceProduct": "Group Life Protection"
//         }
//     }
// }
// '