
const licenseKey = require('license-key-gen');
const http = require('http');
const {argv} = require("node:process");

const userInfo = {company:"PEGASE.TM", city:"Maroua", state:"Far-north"}

let licenseData = {info:userInfo, prodCode:"", appVersion:"1.0", osType:'ANDROID'}

const options = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    host: 'localhost',
    path: '/api/license/create',
    method: 'POST',
    port: 3000
};

const _callback = function(response){
    let _data = '';
    response.on('data', function(chunk){
        _data += chunk;
    });

    response.on('end', function(){
        console.log(_data);
    })
}


//Generate from user input 
createKey(argv[2] || 0);


//Local function and utilities
function createKey(nBKeys){
    if(nBKeys <= 1005){
        const preProdCode = "LEN"+ Date.now();

        for(let i=1; i<=nBKeys; i++){
            let prev = (i<10)?"-00"+i:(i<=999)?"-0"+i:"-"+i;
            licenseData.prodCode = preProdCode +""+prev;
            try{
                let license = licenseKey.createLicense(licenseData);

                let req = http.request(options, _callback);

                const truncedKey = license.license.split("-").slice(0,3).join("-");
                req.write("serial="+truncedKey);
                req.end();
                console.log(`KEY: ${prev}==> ${truncedKey}`);
                
            }catch(err){
                console.log(err);
            }
        }
    }else{
        console.log("Desolé, je ne peux pas generer plus de 1005 clés !");
    } 
};