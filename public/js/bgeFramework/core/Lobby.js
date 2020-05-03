class Lobby {
	id = null;
	game_data = null;

	events = {};

	constructor(id){
		this.id = id;

		$.post('/board_games/getLobbyData', { lobbyid: this.id }, res => {
			if(res.error){
				throw "An error occured: " + res.error;
			}
			this.game_data = JSON.parse(res);

			// this.game_data.images = {};

			// for(let i in this.game_data.assets){
			// 	let x = this.game_data.assets[i];
			// 	let id = x.type + '_' + i;

			// 	if(x.type === 'card'){
			// 		this.game_data.images[id + '_front_image'] = x['face_base64'];
			// 		this.game_data.images[id + '_back_image'] = x['back_base64'];
			// 	}
			// }

			for(let x of this.events['load'] || []){
				x(this.game_data);
			}
		});
	}

	on(name, cb){
		this.events[name] = this.events[name] || [];
		this.events[name].push(cb);
	}

	action(data, cb){
		const form = new FormData();
		form.append('lobby_id', this.id);
		form.append('player_id', this.player_id);
		form.append('json', data);
		$.post('/board_games/player_action', form, res => {
			if(res.status === 1){
				throw '[ERROR] ' + res.error;
			}
			cb(res);
		});
	}
}

export default Lobby