import https from 'https';

// Function to get list of medicines in JSON format
export async function autoComplete(input) {
    
    const option = {
        host: "go.drugbank.com",
        path: `/interaction_concept_search?term=${input}&_type=query&q=${input}`,
        headers: {
            accept: "*/*",
            accept_language: "en-US,en;q=0.9",
            sec_ch_ua: "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
            sec_ch_ua_mobile: "?0",
            sec_ch_ua_platform: "\"Windows\"",
            sec_fetch_dest: "empty",
            sec_fetch_mode: "cors",
            sec_fetch_site: "same-origin",
            Referer: "https://go.drugbank.com/drug-interaction-checker",
            Referrer_Policy: "strict-origin-when-cross-origin"
        },
        body: null,
        method: "GET"
    };

    return new Promise((resolve, reject) => {
        https.get(option, (response) => {
            let result = '';

            response.on('data', function (chunk) {
                result += chunk;
            });

            response.on('end', function () {
                try {
                    const parsed = JSON.parse(result);

                    resolve(parsed);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            });

            response.on('error', function (error) {
                console.error('Error:', error);
            });
        });
    });
};
