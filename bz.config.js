module.exports = {
    name: "MongoDB",
    description: "MongoDB (from humongous) is a free and open-source cross-platform document-oriented database program.",
    url: "https://www.mongodb.com",
	icon: require("./logo"),
	author: 'Julio Torres',
	version: '0.0.43',
	actions: require("./actions.json"),
	auth: [
		{
			name: 'host',
			required: true,
			hide: false
		},
		{
			name: 'port',
			required: true,
			hide: false
		}
	]
};
