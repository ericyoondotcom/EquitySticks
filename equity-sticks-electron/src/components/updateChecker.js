import {VERSION_URL, CURRENT_VERSION} from "./const";


let alreadyFetched = false;
let fetchResult = null;

export function checkForUpdates(){
	
	
	return new Promise((resolve, reject) => {
		if(alreadyFetched){
			resolve(fetchResult);
			return;
		}
	
		const req = new XMLHttpRequest();
		req.open("GET", VERSION_URL + "?time=" + Date.now());

		req.onreadystatechange = (e) => {
			if(req.readyState === XMLHttpRequest.DONE) {
				var status = req.status;
				if (status === 0 || (status >= 200 && status < 400)) {
					const asNumber = parseInt(req.responseText);
					
					if(asNumber == NaN){
						alreadyFetched = true;
						fetchResult = false;
						resolve(false);
					}
					
					if(asNumber > CURRENT_VERSION){
						alreadyFetched = true;
						fetchResult = true;
						resolve(true);
					}
				}else{
					alreadyFetched = true;
					fetchResult = false;
					resolve(false);
				}
			}
		}

	req.send();
	});

}