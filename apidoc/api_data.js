define({ "api": [
  {
    "type": "get",
    "url": "/orders/:",
    "title": "Retrieve all the orders created by an user",
    "version": "0.3.0",
    "name": "GetOrders",
    "group": "Orders",
    "permission": [
      {
        "name": "AuthenticatedUser"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message containing an information.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data",
            "description": "<p>Date and time that the order was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "qtdbtc",
            "description": "<p>Amount of criptacoins bought.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "valorporbtc",
            "description": "<p>Value of the criptacoin.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tipo",
            "description": "<p>Type of order (compra|venda).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   {\n{\n   \"message\": \"Orders from the user teste@teste.com\",\n   \"orders\": [\n       {\n           \"data\": \"02/10/1995\",\n           \"qtdbtc\": \"0.3\",\n           \"valorporbtc\": \"9800\",\n           \"tipo\": \"compra\"\n       },\n       {\n           \"data\": \"02/10/1995\",\n           \"qtdbtc\": \"0.3\",\n           \"valorporbtc\": \"9230.92\",\n           \"tipo\": \"compra\"\n       },\n       {\n           \"data\": \"13/03/2018\",\n           \"qtdbtc\": \"0.2\",\n           \"valorporbtc\": \"9230.92\",\n           \"tipo\": \"venda\"\n       },\n       {\n           \"data\": \"13/03/2018\",\n           \"qtdbtc\": \"1.2\",\n           \"valorporbtc\": \"9194.85\",\n           \"tipo\": \"compra\"\n       },\n       {\n           \"data\": \"13/03/2018\",\n           \"qtdbtc\": \"1.5\",\n           \"valorporbtc\": \"9219.04\",\n           \"tipo\": \"compra\"\n       },\n       {\n           \"data\": \"13/03/2018\",\n           \"qtdbtc\": \"1.1\",\n           \"valorporbtc\": \"9219.04\",\n           \"tipo\": \"venda\"\n       },\n       {\n           \"data\": \"2018-3-13 23:30:58\",\n           \"qtdbtc\": \"1.1\",\n           \"valorporbtc\": \"9310.43\",\n           \"tipo\": \"compra\"\n       }\n   ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FailedAuthentication",
            "description": "<p>If the user is not authenticated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"message\": 'Authentication failed! Not allowed to access this data'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "post",
    "url": "/orders/",
    "title": "Add an order for an user",
    "name": "PostOrders",
    "group": "Orders",
    "permission": [
      {
        "name": "AuthenticatedUser"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "qtdbtc",
            "description": "<p>Amount of criptacoins that the user wants to buy.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tipo",
            "description": "<p>Type of order (compra|venda).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message containing an information.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "registeredOrder",
            "description": "<p>JSON object containing the order that will be registered.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"message\": \"Order successfully added for user teste@teste.com\",\n\t    \"registeredOrder\": {\n\t        \"usuarioid\": 13,\n\t        \"data\": \"2018-3-13 23:30:58\",\n\t        \"qtdbtc\": \"1.1\",\n\t        \"valorporbtc\": \"9310.43\",\n\t        \"tipo\": \"compra\"\n\t    }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FailedAuthentication",
            "description": "<p>If the user is not authenticated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"message\": 'Authentication failed! Not allowed to access this data'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/price/:",
    "title": "Retrieve information about all the bitcoin informations stored so far",
    "version": "0.3.0",
    "name": "GetPrice",
    "group": "Price",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message containing an information.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "differenceFromLastPrice",
            "description": "<p>Percentual difference between the current price and the last one.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "moeda",
            "description": "<p>The criptacoin name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data",
            "description": "<p>Date and time that the price was obtained.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "valor",
            "description": "<p>Value of the criptacoin.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "exchange",
            "description": "<p>Exchange used for purchasing the informations.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   {\n{\n   \"message\": \"Bitcoins values successfully fetched\",\n   \"differenceFromLastPrice\": \"0.33031531580493834 %\",\n   \"values\": [\n       {\n           \"moeda\": \"Bitcoin\",\n           \"data\": \"2018-3-13 19:31:01\",\n           \"valor\": \"9203.8\",\n           \"exchange\": \"CoinMarketCap\"\n       },\n       {\n           \"moeda\": \"Bitcoin\",\n           \"data\": \"2018-3-13 19:32:00\",\n           \"valor\": \"9203.8\",\n           \"exchange\": \"CoinMarketCap\"\n       },\n       {\n           \"moeda\": \"Bitcoin\",\n           \"data\": \"2018-3-13 19:58:01\",\n           \"valor\": \"9200.3\",\n           \"exchange\": \"CoinMarketCap\"\n       },\n       {\n           \"moeda\": \"Bitcoin\",\n           \"data\": \"2018-3-13 19:59:01\",\n           \"valor\": \"9200.3\",\n           \"exchange\": \"CoinMarketCap\"\n       },\n       {\n           \"moeda\": \"Bitcoin\",\n           \"data\": \"2018-3-13 20:00:00\",\n           \"valor\": \"9200.3\",\n           \"exchange\": \"CoinMarketCap\"\n       },\n       {\n           \"moeda\": \"Bitcoin\",\n           \"data\": \"2018-3-13 20:01:00\",\n           \"valor\": \"9200.3\",\n           \"exchange\": \"CoinMarketCap\"\n       },\n       {\n           \"moeda\": \"Bitcoin\",\n           \"data\": \"2018-3-13 20:16:01\",\n           \"valor\": \"9230.69\",\n           \"exchange\": \"CoinMarketCap\"\n       }\n   ]\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/price.js",
    "groupTitle": "Price"
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "User signup",
    "name": "Post2Users",
    "group": "Users",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senha",
            "description": "<p>User's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message containing an information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n\t\t\t\"message\": \"User successfully registered!\",\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyRegisteredUser",
            "description": "<p>If the User already exists in the database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"message\": \"Already registered email!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "User login",
    "name": "PostUsers",
    "group": "Users",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senha",
            "description": "<p>User's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message containing an information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token for using the /orders methods from the API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n\t\t\t\"message\": \"Successfull authentication!\",\n \t\t\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIiwiaWF0IjoxNTIwOTgzNTA3LCJleHAiOjE1MjA5OTA3MDd9.Ir3mtGsuIMzNNIl7L1zDA9B45eDyNAHuBRu4io59ahI\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FailedAuthentication",
            "description": "<p>If the User doesn't exist or the password is wrong.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"message\": \"Authentication failed!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/users.js",
    "groupTitle": "Users"
  }
] });
