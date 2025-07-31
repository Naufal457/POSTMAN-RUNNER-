try {
   
    const jsonData = pm.response.json();
    const fraudStatus = jsonData.data.memberListMaster.fraudStatus;
    const iteration = pm.info.iteration;
    const statusCode = pm.response.code;
    const idNumber = jsonData.data.memberListMaster.idNumber;
    const name = jsonData.data.memberListMaster.name;
    const dob = jsonData.data.memberListMaster.dob;
   
    // ✅ Tampilkan ke Console
    console.log(`Iteration: ${iteration}`);
    console.log(`Status Code: ${statusCode}`);
    console.log(`fraudStatus: ${fraudStatus}`);
    console.log(`idNumber: ${idNumber}`);
    console.log(`name: ${name}`);
    console.log(`dob: ${dob}`);

    // ✅ Tampilkan ke Test Results (tanpa assertion / true/false)
    pm.test(`Iteration ${iteration} , Status: ${statusCode} , fraudStatus: ${fraudStatus}  , idNumber: ${idNumber} , name: ${name} , dob: ${dob}, Error: ''`, function () {
        // Tidak perlu assertion, hanya deskripsi
    });


} catch (err) {
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
 
    const failMessage = `Iteration ${iteration} , Status: ${statusCode},fraudStatus: '', idNumber: ${idNumber} , name: ${name} , dob: ${dob} , Error: ${message}`;

    // ❌ Tampilkan di Console
    console.error(failMessage);

    // ❌ Tampilkan sebagai FAIL di Test Result
    pm.test(failMessage, function () {
        pm.expect.fail(failMessage);
    });
}


// curl --location 'http://localhost:8080/v2/ao-fraud/workflow/fraud-checking' \
// --header 'apiKey: E97baCBt8SxmDcYNyd3KwbEA0giw8ElF' \
// --header 'Content-Type: application/json' \
// --data '{
//     "config": {
//         "sourceRequest": "annuity_alteration", 
//         "screeningApuppt": true
//     },
//     "screeningAPUPPT": {
//         "name": "{{name}}",
//         "idNumber": "{{idNumber}}",
//         "idType": "NPWP",
//         "dob": "{{dob}}"
//     }
// }'