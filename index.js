const mysql = require('mysql');
const apiHandler = require('apiHandler');

const connection = mysql.createConnection({
    host: process.env.RDS_LAMBDA_HOSTNAME,
    user: process.env.RDS_LAMBDA_USERNAME,
    password: process.env.RDS_LAMBDA_PASSWORD,
    port: process.env.RDS_LAMBDA_PORT,
    // calling direct inside code
    connectionLimit: 10,
    multipleStatements: true,
    // Prevent nested sql statements

    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 60,
    timeout: 60 * 60 * 1000,
    debug: true,
    database: 'task'
});

exports.handler = async (event) => {
    let sql = apiHandler(event)
    try {

        const data = await new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    console.log("Error " + err)
                    reject(err)
                }
                resolve(result)
            })
        })
        return {
            statusCode: 200,
            body: JSON.stringify(data)

        }
    } catch (err) {
        return {
            statusCode: 400,
            body: err.message
        }
    }
}
