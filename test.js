const ADODB = require('node-adodb');
const fs = require('fs');

let dbPath = "C:/Users/rbking/Documents/Database1.accdb";
let connection = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbPath};`);

getQueryInformation("Select * from query3;");

function writeTestData (data) {
    
    fs.writeFile('testData.test.txt', JSON.stringify(data), function(err) {
        if (err) return console.log(err);
    });
    
    console.log('query Returned');
};

function getQueryInformation(sql) {
    return new Promise((resolve, reject) => {
        connection
            .query(sql)
            .on('done', function(data) {
                writeTestData(data);
                resolve(data);
            })
            .on('fail', (data) => {
                console.log(JSON.stringify(data));
                reject(data);
            });
    });
};