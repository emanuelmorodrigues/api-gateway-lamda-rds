const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.RDS_LAMBDA_HOSTNAME,
    user: process.env.RDS_LAMBDA_USERNAME,
    password: process.env.RDS_LAMBDA_PASSWORD,
    port: process.env.RDS_LAMBDA_PORT,
    // calling direct inside code
    connectionLimit: 10,
    multipleStatements: true,
    // Prevent nested sql statements
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 60,
    timeout: 60 * 60 * 1000,
    debug: true
})

exports.handler = async (event) => {
    try {
        const data = await new Promisse((resolve, reject) => {
            connection.connect((err) => {
                if (err) reject(err)
                connection.query('CREATE DATABASE testdb', (err, result) => {
                    if (err) {
                        console.log("Error " + err)
                        reject(err)
                    }
                    resolve(result)
                })
            })
        })
    } catch (err) {
        return {
            statusCode: 400,
            body: err.message
        }
    }
}