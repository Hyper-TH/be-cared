import https from 'https';
import { load } from 'cheerio';
import Axios from 'axios';
import { rejects } from 'assert';

const regex = /<input type="hidden" name="authenticity_token" value="([^"]*)"[^>]*\/?>/;

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


// Return HTML interaction
export async function getInteractions(token, drugsArray) {

    const queryString = drugsArray.map(drug => `product_concept_ids%5B%5D=${encodeURIComponent(drug.id)}`).join('&');

    console.log(queryString);


    const options = {
        host: "go.drugbank.com",
        path: "/drug-interaction-checker",
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            accept_language: "en-GB,en;q=0.9",
            cache_control: "max-age=0",
            content_type: "application/x-www-form-urlencoded",
            sec_ch_ua: "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Opera GX\";v=\"106\"",
            sec_ch_ua_mobile: "?0",
            sec_ch_ua_platform: "\"Windows\"",
            sec_fetch_dest: "document",
            sec_fetch_mode: "navigate",
            sec_fetch_site: "same-origin",
            sec_fetch_user: "?1",
            upgrade_insecure_requests: "1",
            Referer: "https://go.drugbank.com/drug-interaction-checker",
            Referrer_Policy: "strict-origin-when-cross-origin"
        },
        // body: `authenticity_token=${token}&product_concept_ids%5B%5D=DBPC0014730&product_concept_names%5B%5D=Propranolol&product_concept_ids%5B%5D=DBPC0026582&product_concept_names%5B%5D=Epinephrine&button=`,
        body: `authenticity_token=${token}&${queryString}button=`,
        method: "POST"
    }    

    return new Promise((resolve, reject) => {
        https.get(options, (res) => {
            let result = '';

            res.on('data', function (chunk) {
                result += chunk;
            });

            res.on('end', function () {

                console.log(result);

                htmlParser(result);

                resolve(result);
            });

            res.on('error', function (error) {
                console.error('Error:', error);
            });
        });
    });
};

function htmlParser(html) {
    const mainDiv = "interactions-box";

    // Load HTML content into Cheerio
    const $ = load(html);

    // Find all div elements with class "interactions-box"
    const interactionsBoxes = $('div.interactions-box');

    // Get the number of instances
    const count = interactionsBoxes.length;

    console.log(`Found ${count} interactions`);
};

export async function getToken() {
    let authToken = "";

    const options = {
        host: "go.drugbank.com",
        path: "/drug-interaction-checker",
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            accept_language: "en-US,en;q=0.9",
            sec_ch_ua: "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
            sec_ch_ua_mobile: "?0",
            sec_ch_ua_platform: "\"Windows\"",
            sec_fetch_dest: "document",
            sec_fetch_mode: "navigate",
            sec_fetch_site: "none",
            sec_fetch_user: "?1",
            upgrade_insecure_requests: "1"
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET"
    };

    return new Promise((resolve, reject) => {
        https.get(options, (res) => {
            let result = '';
    
            res.on('data', function (chunk) {
                result += chunk;
            });
    
            res.on('end', function () {
                const match = regex.exec(result);
    
                if (match && match.length > 1) {
                    authToken = match[1];
    
                    console.log(authToken); // Output: AUTHTOKEN
                    resolve(authToken);
                } else {
                    console.log("Authenticity token not found.");
                }        
            });

            res.on('error', function (error) {
                console.error('Error:', error);
            });
        })
    })
};

// Function to get cookie
async function getCookie() {
    return new Promise((resolve, reject) => {

    // Make a GET request to the URL
    Axios.get('https://go.drugbank.com/drug-interaction-checker')
      .then((response) => {
        // Access cookies from the response headers
        console.log(response.headers);
        const cookies = response.headers['set-cookie'];
        
        // Parse cookies to extract name and value
        if (cookies && cookies.length > 0) {
            const cookie = cookies[0]; // Assuming you want to access the first cookie
            const [name, value] = cookie.split(';')[0].split('=');

            // console.log(`Cookie:${value}`);
            // console.log('Name:', name);
            // console.log('Value:', value);

            resolve(value);
        } else {
            console.log('No cookies found in response');
        }
      })
      .catch((error) => {
            console.error('Error fetching data:', error);
      });   
    })
}