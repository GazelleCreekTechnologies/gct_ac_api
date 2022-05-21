const express = require('express');

const app = require('express')();
const SwaggerJsDoc = require('swagger-jsdoc')
const SwaggerUI = require('swagger-ui-express')

// Load the MySQL pool connection
const pool = require('./data/config');

const PORT = process.env.PORT || 8080

console.log('Hello, world!');

// Swagger docs connection
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Gazelle Creek Technologies - Access Control API',
            description: "This is the endpoint to get the results and also update from the pi to the database, \
                          and also to and fro admin website interface. This is where we get admin http://access-control.gctza.co.za/ \
                         url, in this dashboard we view all the access control stats and summary of the users. This is were we also insert \
                         and manage the tenants and visitors, also extract timesheet records.\
                        ",
            contact: {
                name: "Lindani Mabaso | Gazelle Creek Technologies"
            },
            servers: ["http://localhost:8080"]
        }
    },
    // ['.routes/*.js']
    apis: ["src/*.js"]
};

const swaggerDocs = SwaggerJsDoc(swaggerOptions);

app.use(express.json())
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));

//============================================= GET =================================

//Get All The User Details
/**
 * @swagger
 * /userdetails:
 *  get:
 *    description: Get all the user details from the UserTbl
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: no users found response
 */
app.get('/userdetails',(request, response) =>{

    pool.query(`select * from UserTbl`, (err, result) => {
        if (err) {
            return err;
        }
        response.send(result);
    })
   
});

//Get All The Visitors
/**
 * @swagger
 * /visitors:
 *  get:
 *    description: Get all the visitor details from the VisitorTbl
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: no visitors found response
 */
 app.get('/visitors',(request, response) =>{

    pool.query(`select * from VisitorTbl`, (err, result) => {
        if (err) {
            return err;
        }
        response.send(result);
    })
   
});

//============================================= UPDATE =================================

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

//============================================= POST / INSERT =================================

//============================================= DELETE ========================================

//============================================= START =========================================
app.listen(PORT, () => { 
    var host = app
    var port = PORT
    
    console.log("App listening at http://%s:%s", host, port)
})