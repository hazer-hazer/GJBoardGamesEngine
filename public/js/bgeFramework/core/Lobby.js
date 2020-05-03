class Lobby {
	id = null;
	game_data = null;

	events = {};

	constructor(id){
		this.id = id;

		$.post('/game/' + this.id, res => {
			if(res.error){
				throw "An error occured: " + res.error;
			}
			this.game_data = JSON.parse(res);

			for(let x of this.events['load'] || []){
				x(this.game_data);
			}
		});
	}

	on(name, cb){
		this.events[name] = this.events[name] || [];
		this.events[name].push(cb);
	}
}

export default Lobby