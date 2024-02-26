import https from 'https';
import fs from 'fs';

// Return cookie
export async function requestCookie() {
	const response = await fetch("https://www.sigmaaldrich.com/IE/en");
	const cookie = response.headers.get('set-cookie');

	/*
		GUID, accessToken, dtCookie, 
		akaalb_origin-alb, ak_bmsc, bm_mi 
	*/

	if (cookie) {
        return cookie;
	} else {
		console.log(`None found`);
	}
};


// TODO: return in JSON format (from html)
// Return list of products
export async function requestList(cookie, prodQuery) {
    const option = {
        host: "www.sigmaaldrich.com",
        path: `/IE/en/search/${prodQuery}?focus=products&page=1&perpage=30&sort=relevance&term=${prodQuery}&type=product`,
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
			accept_language: "en-US,en;q=0.9",
			sec_ch_ua: "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
			sec_ch_ua_mobile: "?0",
			sec_ch_ua_platform: "\"Windows\"",
			sec_fetch_dest: "document",
			sec_fetch_mode: "navigate",
			sec_fetch_site: "none",
			sec_fetch_user: "?1",
			service_worker_navigation_preload: "true",
			upgrade_insecure_requests: "1",
			cookie: `${cookie}`
        },
		referrerPolicy: "strict-origin-when-cross-origin",
		body: null
    };

    return new Promise((resolve, reject) => {
        https.get(option, (response) => {
            let result = '';
			const filePath = 'got.html';

            response.on('data', function (chunk) {
                result += chunk;
            });

            response.on('end', function () {
				const doc = result;

				console.log(doc);

				// Write HTML content to file
				fs.writeFile(filePath, doc, (err) => {			
					if (err) {
						console.error('Error writing file:', err);
					} else {
						console.log('HTML file saved successfully!');
					}
				});

                resolve(result);
            });
        })
    });
};
