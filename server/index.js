//NODE MODULE VARIABLES
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mysql = require("mysql");
//CREATES A CONNECTION POOL
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'freshchirper',
    password: 'jackson5',
    database: 'Chirper'
});

var app = express();
//STATICALLY HANDLES CLIENT FOLDER
var pathName = path.join(__dirname, "../client");
app.use(express.static(pathName));
//HANDLES JSON CONTENT
app.use(bodyParser.json());

// app.get('/chirps/*/update', function (req, res) {
//     res.sendFile(path.join(__dirname, '../client/single_update.html'));
// });

// app.get('/chirps/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../client/single_view.html'));
// });

// app.get('/chirps', function (req, res) {
//     res.sendFile(path.join(__dirname, '../client/list.html'));
// });
//GETS ALL USERS
function getAllUsers() {
    return new Promise(function (fulfill, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query('CALL GetAllUsers()', function (err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(resultsets);
                    }
                });
            }
        });
    });
}
app.get('/api/users', function (req, res) {
    getAllUsers().then(function (data) {
        res.send(data[0]);
    }, function (err) {
        console.log(err);
        res.sendStatus(500);

    });
});

//GETS ALL CHIRPS
// function getAllChirps() {
//     return new Promise(function(fulfill, reject) {
//         pool.getConnection(function(err, connection) {
//             if (err) {
//                 reject(err);
//             } else {
//                 connection.query('CALL GetAllChirps()', function(err, resultsets) {
//                     connection.release();
//                     if (err) {
//                         reject(err);
//                     } else {
//                         fulfill(resultsets);
//                     }
//                 });
//             }
//         });
//     });
// }
// app.get('/api/chirps', function (req, res) {
//     getAllChirps().then(function(data) {
//         res.send(data[0]);
//     }, function(err) {
//         console.log(err);
//         res.sendStatus(500);

//     });
// });

//GETS ALL USER AND CHIRPS
function getChirpsUsers(userName, message) {
    return new Promise(function (fulfill, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query('CALL GetChirpsUsers(?,?)', [userName, message], function (err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(resultsets);
                    }
                });
            }
        });
    });
}
app.get('/api/chirps', function (req, res) {
    getChirpsUsers(req.body.name, req.body.message).then(function (data) {
        res.send(data[0]);
    }, function (err) {
        console.log(err);
        res.sendStatus(500);

    });
});

//GET A SINGLE CHIRP 
function getSingleChirp(id) {
    return new Promise(function (fulfill, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query('CALL GetSingleChirp(?)', [id], function (err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(resultsets);
                    }
                });
            }
        });
    });
}
app.get('/api/chirps/:id', function (req, res) {
    getSingleChirp(req.params.id).then(function (data) {
        res.send(data[0]);
    }, function (err) {
        console.log(err);
        res.sendStatus(500);

    })
//     .then(
//         getChirpsUsers(req.body.name, req.body.message).then(function (data) {
//         res.send(data[0]);
//     }, function (err) {
//         console.log(err);
//         res.sendStatus(500);

//     })
// );
});
    
// });

//INSERTING A CHIRP 
function insertChirp(id, message, timestamp, userID) {
    return new Promise(function (fulfill, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query('CALL InsertChirp(?,?,?,?)', [id, message, timestamp, userID], function (err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(resultsets);
                    }
                });
            }
        });
    });
}
app.post('/api/chirps', function (req, res) {
    insertChirp(req.params.id, req.body.message, req.body.timestamp, req.body.userID).then(function (data) {
        res.send(data[0]);
        res.status(201).end();
    }, function (err) {
        console.log(err);
        res.sendStatus(500);

    });
});

//UPDATING A CHIRP 
function updateChirp(message, id) {
    return new Promise(function (fulfill, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query('CALL UpdateChirp(?,?)', [id, message], function (err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(resultsets);
                    }
                });
            }
        });
    });
}
app.put('/api/chirps/:id', function (req, res) {
    updateChirp(req.params.id, req.body.message).then(function (data) { //req.body.message because we will be sending an object with message in it 
        res.send(data[0]); //res.sendStatus(204) if it worked
        res.status(204).end();
    }, function (err) {
        console.log(err);
        res.sendStatus(500);

    });
});

//DELETING A CHIRP 
function deleteChirp(id) {
    return new Promise(function (fulfill, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query('CALL DeleteChirp(?)', [id], function (err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(resultsets);
                    }
                });
            }
        });
    });
}
app.delete('/api/chirps/:id', function (req, res) {
    deleteChirp(req.params.id).then(function (data) {
        res.send(data[0]); //res.sendStatus(204) if it worked 
        res.status(204).end();
    }, function (err) {
        console.log(err);
        res.sendStatus(500);

    });
});
app.listen(3000);