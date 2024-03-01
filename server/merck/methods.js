import https from 'https';
import cheerio from 'cheerio';
import fs from 'fs';

// Return cookie
export async function requestCookie() {
	const response = await fetch("https://www.sigmaaldrich.com/IE/en/search/t1503?focus=products&page=1&perpage=30&sort=relevance&term=t1503&type=product_number");
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
export async function requestList(cookie, prodQuery, type) {
	console.log(`Query: ${prodQuery}`);
	console.log(`Type: ${type}`);

	// Turn to all lower case for first instance of the prodQuery
    const option = {
        host: "www.sigmaaldrich.com",
        path: `/IE/en/search/${prodQuery.toLowerCase()}?focus=products&page=1&perpage=30&sort=relevance&term=${prodQuery}&type=product_${type}`,
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
			accept_language: "en-US,en;q=0.9",
			sec_ch_ua: "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
			sec_ch_ua_mobile: "?0",
			sec_ch_ua_platform: "\"Windows\"",
			sec_fetch_dest: "document",
			sec_fetch_mode: "navigate",
			sec_fetch_site: "same-origin",
			sec_fetch_user: "?1",
			service_worker_navigation_preload: "true",
			upgrade_insecure_requests: "1",
			cookie: `${cookie}`,
			Referer: "https://www.sigmaaldrich.com/IE/en/search",
			ReferrerPolicy: "strict-origin-when-cross-origin",
        },
		method: "GET",
		body: null
    };

	// TODO: Handle correctly if no results are found
    return new Promise((resolve, reject) => {
        https.get(option, (response) => {
			console.log(response.statusCode); // Logs the HTTP status code
            let result = '';

            response.on('data', function (chunk) {
                result += chunk;
            });

            response.on('end', function () {
				// const doc = result;
				// const filePath = 'got.html';

				// // Write HTML content to file
				// fs.writeFile(filePath, doc, (err) => {			
				// 	if (err) {
				// 		console.error('Error writing file:', err);
				// 	} else {
				// 		console.log('HTML file saved successfully!');
				// 	}
				// });

				resolve(result);
            });
        })
    });
};

// Parse food interactions
// TODO: Make this code shorter/more efficient
export async function productListParser(html, type) {
    // RAW LOGIC:
	// Parent div .jss114
	// for every jss214
	//	get jss216.span as name
	//	get jss224.jss223 as linear formula (note the sub tags surrounding numbers)
	//	get into MuiTableBody-root
	//		get td class containing jss250.a as productID
	//		get span class jss254 as description
    // Return as JSON:
    /*
    {
        Product Name: "",
        Product ID: "",
		Product Description,
		Linear Formula: ""
    }
    */

	// TODO: Would it be faster to get the parent div before passing it into this method
    const $ = cheerio.load(html);

    let results = [];
    let id = 0;

	console.log(`Got type: ${type}`);

	if (type === 'number') {
		// for id searches
		// for every tr.jss246
		//  productName => td.jss250
		//	description => td.jss251 > a // span.254
		console.log(`Entered ID section..`);

		$('.jss214').each(function () {
			let products = {};
			let productName = $(this).find('.jss216 > h2').text().trim();
			let linearFormula = $(this).find('.jss224').find('span.jss223').text().trim();	// TODO: sub tags for numbers
			let productID = $(this).find('td[class*="jss250"] a').text().trim();
			let productDescription = $(this).find('.jss254').text().trim();
			// Append productID and productDescription to products
			products[productID] = productDescription;

			id += 1;
			
			console.log(`Product Name: ${productName}`);
	
			results.push({
				id: id,
				products,
				productName: productName,
				productDescription: productDescription,
				linearFormula: linearFormula
			});
		});
		// console.log(results);
	} else {
		// for name searches, there might be multiple productIDs and description (root= MuiTableBody-root > tr.jss830 )
		// for every 798
		// linearFormula => .jss808 > span.jss807
		// productName => .jss800 > h2.'jss803' > a
		// for every tr.jss830 
		// productID => td.jss834 > a
		// description => td.jss835 > a // span.jss838
		console.log(`Entered name section..`);

		$('.jss214').each(function () {
			let products = {};
			let productName = $(this).find('.jss216 > h2').text().trim();

			// TODO: Linear formula may not exist
			let linearFormula = $(this).find('.jss224').find('span.jss223').text().trim();
			
			// for each loop for productID here and description
			$(this).find('tr[class*="jss246"]').each(function () {
				let productID = $(this).find('td[class*="jss250"] a').text().trim();
				let productDescription = $(this).find('.jss254').text().trim();

				// Append productID and productDescription to products
				products[productID] = productDescription;
			});

			console.log(`Product Name: ${productName}`);

			results.push({
				id: id,
				products,
				productName,
				linearFormula: linearFormula
			});
		});
	};	

	return results;
};
