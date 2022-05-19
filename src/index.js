const express = require('express');

const app = require('express')();
const SwaggerJsDoc = require('swagger-jsdoc')
const SwaggerUI = require('swagger-ui-express')
const mysql = require('mysql');

const PORT = process.env.PORT || 8080

console.log('Hello, world!');

// Swagger docs connection
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Access Control API',
            description: "Access Control Endpoint",
            contact: {
                name: "Lindani Mabaso"
            },
            servers: ["http://localhost:8080"]
        }
    },
    // ['.routes/*.js']
    apis: ["src/index.js"]
};

const swaggerDocs = SwaggerJsDoc(swaggerOptions);

app.use(express.json())
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));

//Database Connection
// mysql://gctzapmw_access_control:access_control@165.73.83.171:3306/gctzapmw_access_control_db
const connection = mysql.createConnection({
    host: "165.73.83.171",
    user: "gctzapmw_access_control",
    password: "access_control",
    database: "gctzapmw_access_control_db",
    connectionLimit: 10
})

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

connection.query(`select * from Persons`, (err, result, fields) => {
    if (err) {
        console.log('Error connecting');

        return console.log(err);
    }
    return console.log(result);
})

connection.end()

//Test
/**
 * @swagger
 * /test:
 *  get:
 *    description: Use to request all test
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/test',(req,res) =>{
    res.status(200).send({
        'test':'This',
        'sixe': 'large'
    })
});

/**
 * @swagger
 * /customers:
 *    put:
 *      description: Get
 *    parameters:
 *      - name: customer
 *        in: query
 *        description: Name of our customer
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 */
app.post('/test/:id',(req,res) =>{

    const {id} = req.params;
    const {logo} = req.body;

    if(!logo){
        res.status(418).send({
            message : 'We need a logo'
        })
    }
    
    res.send({
        message : `Succssfuly sent ${logo} message ${id} `,
    })
});

app.listen(PORT, () => { 
    console.log(`Its alive on http://localhost:${PORT}`);
})