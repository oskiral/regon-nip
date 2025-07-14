
// I use .env to hide api key and url
require("dotenv").config();

// we gonna use this node module because gus included it in their manual
const Client = require("node-regon");

const api_key = process.env.api_key // place your api key here (example : abcdef1234567)

// ========================================

// returns object
// {
    //   Regon
    //   Nip
    //   StatusNip
    //   Nazwa
    //   Wojewodztwo
    //   Powiat
    //   Gmina
    //   Miejscowosc
    //   KodPocztowy
    //   Ulica
    //   NrNieruchomosci
    //   NrLokalu
    //   Typ
    //   SilosID
    //   DataZakonczeniaDzialalnosci
    //   MiejscowoscPoczty
// }
// all values are string type

function getCompanyDataByApi(nip) {

    return new Promise((resolve, reject) => {
        
        // create a connection
        conn = Client.createClient({
            key: api_key,
            sandbox: false,
            birVersion: '1.1'
        });
    
        conn.then((data) => {
    
    
            // target the data we need
            const gus = data.service;
    
            gus.findByNip(nip).then(function(findCompanyByNip) {
    
                // cleaning up the response becuase it returns object where values are type array so we can't access it directly
                const cleaned = {};
    
                for (const key in findCompanyByNip) {
                    if (findCompanyByNip.hasOwnProperty(key)) {
                        const value = findCompanyByNip[key];
    
                        if (Array.isArray(value)) {
                            cleaned[key] = value[0];
                        } else {
                            cleaned[key] = value;
                        }
                    }
                }
                resolve(cleaned);
            })
    
        }).catch(err => {
            console.log(err);
        })


    })


}

// printing out the returned object
getCompanyDataByApi(5552112610).then(result => console.log(result));
