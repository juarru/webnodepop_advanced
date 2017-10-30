## WebNodepop_advanced by Juan Arillo

  API service for IOs and Android of second hands article´s selling.  
  Final [node](http://nodejs.org) module practise, using also [express](https://github.com/expressjs/express) framework and [mongoDB](https://www.mongodb.com/) database.
  

## Previous Requirement

For using WebNodepop you first need to install the next resources:

- [node](http://nodejs.org): You can download an installation file for Window or Mac, or through a package manager like [brew](http://brew.sh/) using console.
- [mongoDB](https://www.mongodb.com/): Nodepop use mongoDB as database. You can download the project from [mongo´s webpage](https://www.mongodb.com/).


## Installation

### Downloading

You can download WebNodepop´s project from [the GitHub repository](https://github.com/juarru/webnodepop.git).

You can also clone the project from GitHub using [git](https://git-scm.com/) commands into the console. You first need to install [git](https://git-scm.com/) in this case:  

```bash
$ git clone https://github.com/juarru/webnodepop.git
```

### Installing

Once downloaded or cloned the project, you need to access to the directory using the console:

```bash
$ cd <project_directory> 
```

Then you can install Nodepop:

```bash
$ npm install
```

All the modules needed for running the server will be install at that moment. Nodepop will be ready for run.

## Running MongoDB

To use the service, first thing you have to do is start the database service. If it´s the first time you use [mongoDB](https://www.mongodb.com/), please follow the next instructions:

- Unzip the file you downloaded previously.
- Copy the unzipped folder with mongoDB where you want.
- Using a console, go to the directory where you copy mongo folder:

```bash
$ cd <mongoDB_directory>
```

- Now write the next instruction:

```bash
$ bin/mongod --dbpath ./data/db --directoryperdb
```

In this moment mongoDB is running, listening by default at `port=27017`

## Running WebNodepop

### Option One - Install example data

Perhaps you want to test the project using some previous data. Perfect!!!, you can do it. Before starting WebNodepop, please execute the next instruction into the nodepop´s directory:

```bash
$ npm run installDB
```

Now you can start WebNodepop service:

```bash
$ npm start
```

### Option two - Run empty

You only want to start the service and introduce the data later using the API instruction. Ok, please, start the service:

```bash
$ npm start
```

## Debugging WebNodepop
Perhaps you are thinking about use WebNodepop and add some features or change existing one. Please, feel free to do it.
  
In that case is possible you want to use a debugging mode to analize more in depth how the service is working. For this situation you can run WebNodepop this way:

```bash
$ npm run debug
```

## API - Languajes

WebNodepop supports english and spanish languaje. You must pass a `x-lang` parameter with `en` or `es` value to receive messages in the desired languaje. Option `en` is set as default.

## API - Commercials

### Adding Commercials

For adding Commercials, use a `POST` request to the route:

`http://server_ip:3000/api/v1/commercials`

The commercial data model is:

```js
{
    name: {type: String, required: true},
    sell: {type: Boolean, required: true},
    price: {type: Number, required: true},
    photo: String,
    tags: [String]
}
```

If the request is correct you will receive a success response:

```js
{
  "success": true,
  "saved": {
    "__v": 0,
    "name": "Samsung Galaxy",
    "sell": true,
    "price": 253.2,
    "_id": "572cd8e60cd355cd32c73078",
    "tags": [
      "lifestyle",
      "mobile"
    ]
  }
}
```

If is not, the response will be like this:

```js
{
  "success": false,
  "error": "Validation error. One or more required fields haven´t been inserted"
}
```

### Selecting Commercials

For selecting commercial please use a `GET` request to this route:

`http://server_ip:3000/api/v1/commercials?`

followed by the parameters you want to filter

*1- Tags:*

`http://server_ip:3000/api/v1/commercials?tags=lifestyle&tags=mobile`


*2- Selling Commercial or Searching Commercial:*

`http://server_ip:3000/api/v1/commercials?sell=true` for selling

`http://server_ip:3000/api/v1/commercials?sell=false` for searching

*3- Price:*

You can filter price ranges using a '-'

`http://server_ip:3000/api/v1/commercials?price=100` for the exact value.

`http://server_ip:3000/api/v1/commercials?price=10-60` for range values.

`http://server_ip:3000/api/v1/commercials?price=10-` for 'greater or equal' values.

`http://server_ip:3000/api/v1/commercials?price=-60` for 'lower or equal' values.

*4- Name:*

You can filter using the 'name' field using a complete match or introducing the first letters of the string you want to find.

`http://server_ip:3000/api/v1/commercials?name=ip` returning all the results beginning from 'ip' either lower or upper case.

## Author

The author of Nodepop is [Juan Arillo](https://github.com/juarru)

## License

  [MIT](LICENSE)
