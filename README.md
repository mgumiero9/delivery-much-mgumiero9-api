# Recipes and Image API (programming test)

This test Api project has only 1 endpoint:

```
http://{HOST}/recipes/?i={ingredient_1},{ingredient_2}
```

Example:
```
http://127.0.0.1/recipes/?i=onion,tomato
```
* Use at maximum 3 ingredients!

## Installation

Configure your environment variables manually:

(you need to obtain your GIPHY api_key in your [Giphy Developers Dashboard](https://developers.giphy.com/dashboard/))
```
$ export IMAGE_API_KEY=<YOUR-API-KEY>
$ export DM_API_PORT=<YOUR-PORT-NUMBER> (optional)
```

Or create a file named: **.env** in the project root with this content:

```
NODE_ENV=development
IMAGE_API_KEY=<YOUR-GIPHY-KEY>
DM_API_PORT=<YOUR-PORT-NUMBER> (optional)
```

Use the package manager [npm](https://npmjs.com) to install it.

```bash
$ npm install
```

## Usage

Example:
```
http://127.0.0.1/recipes/?i=onion,tomato
```

Result:
```json
{
	"keywords": ["onion", "tomato"],
	"recipes": [{
		"title": "Greek Omelet with Feta",
		"ingredients": ["eggs", "feta cheese", "garlic", "red onions", "spinach", "tomato", "water"],
		"link": "http://www.kraftfoods.com/kf/recipes/greek-omelet-feta-104508.aspx",
		"gif": "https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif"
	   },{
		"title": "Guacamole Dip Recipe",
		"ingredients": ["avocado", "onions", "tomato"],
		"link":"http://cookeatshare.com/recipes/guacamole-dip-2783",
		"gif":"https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif"
	   }
	]
}
```
---------

##Docker
####Docker Pull Command:
```
docker pull mgumiero9/dlmuch-node-api-test-docker
```
####Docker public page
https://hub.docker.com/r/mgumiero9/dlmuch-node-api-test-docker

---------

##Gitpod
https://gitpod.io/#https://github.com/mgumiero9/delivery-much-mgumiero9-api

---------


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)