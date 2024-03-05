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

// TODO: Make this code shorter/more efficient (can we combine them?)
export async function productListParser(html, type) {
    /*
    {
		id: '',
        ProductName: '',
		linearFormula: '',
		products: [
			{
				id: 0,
				productID: '',
				productDescription: '',
				href: '',
			}
		]
    }
    */

    const $ = cheerio.load(html);

    let results = [];
	let products = [];

    let id = 0;

	if (type === 'number') {
		console.log(`Entered ID section..`);

		// TODO: Monitor the class names as they have changed
		$('.jss215').each(function () {
			let productName = $(this).find('.jss217 > h2').text().trim();
			let linearFormula = $(this).find('.jss225').find('span.jss224').text().trim();	
			linearFormula = linearFormula && linearFormula.trim() !== '' ? linearFormula : 'N/A';
			let productID = $(this).find('td[class*="jss248"] a').text().trim();
			let href = $(this).find('td[class*="jss248"] > a').attr('href');
			let productDescription = $(this).find('span.jss252').text().trim();
			id += 1;

			products.push({
				productID: productID,
				productDescription: productDescription,
				href: href
			});			
	
			results.push({
				id: id,
				productName: productName,
				linearFormula: linearFormula,
				products
			});
		});
	} else {
		$('.jss215').each(function () {
			let products = [];
			let productName = $(this).find('.jss217 > h2').text().trim();
			let linearFormula = $(this).find('.jss225').find('span.jss224').text().trim();
			linearFormula = linearFormula && linearFormula.trim() !== '' ? linearFormula : 'N/A';
			
			// for each loop for productID here and description 
			// TODO: Not going to the correct section of divs
			$(this).find('tr[class*="jss244"]').each(function () {
				let productID = $(this).find('td[class*="jss248"] a').text().trim();
				let productDescription = $(this).find('.jss252').text().trim();
				let href = $(this).find('td[class*="jss248"] > a').attr('href');

				products.push({
					productID: productID,
					productDescription: productDescription,
					href: href
				});			
	
			});

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

export async function productDetailsParser(html, uploadPath) {
	console.log(`Entered product details parser with ${uploadPath}`);
	/*
		JSON TO RETURN:
		{
			id: uploadPath,
			ProductName: '',
			ProductDescription: '',
			productDetails: {
				// LOOP
			},
			productProperties: {
				// LOOP
			}
    	}
	*/

	/*
		PRODUCT NAME = span id="product-name"
		PRODUCT DESCRIPTION = span id="product-description"

		PRODUCT DETAILS:
		(ROOT) div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12" (unique)
		key = MuiTypography-root jss219 MuiTypography-caption
		value = MuiTypography-root jss220 MuiTypography-body1

		PRODUCT PROPERTIES:
		div id (ROOT) = pdp-properties--table
		key = h3.span 
		value = p.span
	*/

	const $ = cheerio.load(html);
	let product = {};
	let productDetails = {};
	let productProperties = {};
	
	let productName = $('span#product-name').text().trim();
	let productDescription = $('span#product-description').text().trim();

	// PRODUCT DETAILS
	let $productDetailsRoot = $('[class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"]');

	// Iterate through potential child divs
	$productDetailsRoot.find('div').each(function() {
		// Get the class attribute of the current div
		const classAttr = $(this).attr('class');

		// Check if this div's class ends with "MuiTypography-caption"
		if (classAttr && classAttr.endsWith('[class=$"MuiTypography-caption"]')) {

			// Add condition, if the next one is 'MuiTypography-body1' then append it
			if ($(this).next('[class=$"MuiTypography-body1]"')) {
				let key = $(this).text().trim();
	
				let value = $(this).next().text().trim();
	
				productDetails[key] = value;
			}
		} 
		// Entered Product Details container
		else if (classAttr && classAttr.endsWith('MuiGrid-container')) {
			$(this)
			.find('[class$="MuiGrid-container MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-lg-4"]')
			.each(function () {			
  				let key = $(this).find('[class="MuiGrid-root MuiGrid-item"]').first().text().trim();

			    let value = $(this).find('[class="MuiGrid-root MuiGrid-item"]').last().text().trim();

				productDetails[key] = value;
			}) 				
		};
	});

	
	// GrandParent: 
	// MuiGrid-container
	// Parent:
	// MuiGrid-container MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-lg-4
	// Child:
	// MuiGrid-root MuiGrid-item

	// PRODUCT PROPERTIES
	$('#pdp-properties--table').find('h3').each(function() {
		// Get the text content of the current h3 tag as the key
		let key = $(this).text();
		// console.log(`Current key: ${key}`);

		// Find the immediately following p tag and get its text content as the value
		let value = $(this).parent() // Moves to .parent
							.next() // Moves to .parent-sibling
							.find('p')
							.text()
							.trim(); 
		
		// console.log(`Current value: ${value}`);

		// Add the key-value pair to the propertiesObject
		productProperties[key] = value;
	});

	product = {
		id: uploadPath,
		productName: productName,
		productDescription: productDescription,
		productDetails: productDetails,
		productProperties: productProperties
	};

	return product;
};	

// Function to request product details 
export async function requestProductDetails(uploadPath) {
	console.log(`Upload path: ${uploadPath}`);

	const options = {
		host: "www.sigmaaldrich.com",
		path: `${uploadPath}`,
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
			upgrade_insecure_requests: "1"		
		},
		method: "GET",
		body: null
	};

	// TODO: Handle correctly if no results are found
	return new Promise((resolve, reject) => {
		https.get(options, (response) => {
			console.log(response.statusCode); // Logs the HTTP status code
            let result = '';

            response.on('data', function (chunk) {
                result += chunk;
            });

            response.on('end', function () {
				// const doc = result;
				// const filePath = 'got2.html';

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
}

// fetch("https://www.sigmaaldrich.com/IE/en/product/sigma/93337", {
// "headers": {
// 	"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
// 	"accept-language": "en-US,en;q=0.9",
// 	"sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
// 	"sec-ch-ua-mobile": "?0",
// 	"sec-ch-ua-platform": "\"Windows\"",
// 	"sec-fetch-dest": "document",
// 	"sec-fetch-mode": "navigate",
// 	"sec-fetch-site": "none",
// 	"sec-fetch-user": "?1",
// 	"upgrade-insecure-requests": "1"
// },
// "referrerPolicy": "strict-origin-when-cross-origin",
// "body": null,
// "method": "GET"
// });
