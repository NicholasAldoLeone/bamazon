var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "root",

    database: "bamazon_db"
});

function displayTable() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) {
            console.log(err);

        }
        else {
            console.table(data);

        }
    })
}

function promptUser() {
    inquirer.prompt([
        { type: "list", message: "Would you like to broswe bamazon?", choices: ["Yes I Would", "No, I would like to Leave"], name: "userInput" }

    ]).then(function (response) {
        if (response.userInput === "Yes I Would") {
            displayTable();
            bamazon();

        }
        else {
            console.log("Ok Bye");
            connection.end();

        }
    })
}

function bamazon() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "list", message: "What would you like to buy?", choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].item);
                    }
                    return choiceArray;
                }, name: "item"
            },

            { type: "input", message: "How much would you like to buy?", name: "amount" }

        ]).then(function (response) {
            var amount = parseInt(response.amount);
            var itemChosen = response.item;

            connection.query("SELECT * FROM products WHERE item = ?", [itemChosen], function (err, data) {
                if (err) throw err;
                var totalStock = parseInt(data[0].total_stock);

                if (amount <= totalStock) {
                    newTotalStock = totalStock - amount
                    connection.query("UPDATE products SET total_stock =" + newTotalStock + " WHERE item = ?", [itemChosen],

                        function (err) {
                            if (err) throw err;
                            console.log("You bought " + amount + " " + response.item + "s")
                            promptUser();

                        })
                }
                else {
                    console.log("I'm sorry we dont have the much in stock right now");

                }
            })
        });
    })
}

connection.connect(function (err) {
    if (err) throw err;

    promptUser();
})