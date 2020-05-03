if(typeof $ === 'undefined'){
	throw "Please, include jQuery-like lib";
}

import Lobby from './core/Lobby.js'
import Sprite from './scene/Sprite.js'
import Card from './board/Card.js'
import Deck from './board/Deck.js'
import Dice from './board/Dice.js'
import CardPlace from './board/CardPlace.js'
import Player from './player/Player.js'

// Disable context menu on canvas
$('body').on('contextmenu', 'canvas', e => e.preventDefault());

const lobby = new Lobby(1588541624);

lobby.on('load', start);

function start(data){

	const config = {
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		scene: {
			preload,
			create,
			update,
			render
		}
	};

	var game = new Phaser.Game(config);

	var game_objects = {};

	function preload(){

		for(let a in data.assets){
			if(data.assets[a].type === 'card'){
				this.textures.addBase64('card_' + a + '_front_image', 'data:image/png;base64, ' + data.assets[a].face_base64);
				this.textures.addBase64('card_' + a + '_back_image', 'data:image/png;base64, ' + data.assets[a].back_base64);
			}
		}

		// console.log('data', data);

		// for(let name in data.scene){
		// 	let obj = data.scene[name];

		// 	let obj_id = obj.type + '_' + name;

		// 	if(obj.type === 'deck'){
		// 		let tmp_deck = new Deck(this, obj.whereis.x, obj.whereis.y);
		// 		for(let card of obj.queue){
		// 			let card_id = 'card_' + data.scene[card].type;
		// 			tmp_deck.push(new Card(this, 0, 0, { front_image: card_id + '_front_image', back_image: card_id + '_back_image' }));
		// 		}

		// 		// Register events [ Future - replace to server side ]
		// 		tmp_deck.last.on('flip', () => {

		// 		});

		// 		game_objects[obj_id] = tmp_deck;
		// 	}
		// }


		// for(let card in data.scene.cards){
		// 	let x = data.scene.cards[card];
		// 	let front_image = 'card_' + x.type + '_front_image',
		// 		back_image = 'card_' + x.type + '_back_image';

		// 	game_objects['card_' + card] = new Card(this, x.whereis.x, x.whereis.y, { front_image, back_image });
		// }

		// for(let obj in data.scene.map){
		// 	let x = data.scene.map[obj];
		// 	let name = x.type + '_' + obj;
		// 	if(x.type === 'deck'){
		// 		game_objects[name] = new Deck(this, x.whereis.x, x.whereis.y);
		// 		for(let card of x.queue){
		// 			console.log(card)
		// 			game_objects[name].push(game_objects['card_' + card]);
		// 		}
		// 	}
		// }
	}

	function create(){

		let pn = 0;
		
		for(let uid in data.players){
			if(pn >= 2){
				throw "This game only supports two players";
			}

			let player = new Player(this, pn * this.sys.game.canvas.width + (pn === 0 ? 100 : -100), this.sys.game.canvas.height / 2);

			game_objects['player_' + uid] = player;

			let player_deck = new Deck(this, 0, 0);
			
			player.add(player_deck);
			
			for(let c of data.scene['deck_' + uid].queue){
				let card = data.scene[c];

				let front_image = 'card_' + card.type + '_front_image',
					back_image = 'card_' + card.type + '_back_image';

				let card_obj = new Card(this, 0, 0, { front_image, back_image });

				card_obj.visible = false;

				player_deck.push(card_obj);
			}

			player_deck.last.visible = true;

			// Register events [ Future - replace to server side ]
			player_deck.last.on('flip', () => {
				lobby.action({
					kek: 'lol'
				});
			});

			pn++;
		}
		
		// let cardPlace = new CardPlace(this, 250, 250);
		// let cardPlace1 = new CardPlace(this, 500, 250);

		// let deck = new Deck(this, 0, 0);

		// deck.push(new Card(this, 0, 0, { front_image: 'face_base64', back_image: 'back_base64' }));
		// deck.push(new Card(this, 0, 0, { front_image: 'face_base64', back_image: 'back_base64' }));
		// deck.push(new Card(this, 0, 0, { front_image: 'face_base64', back_image: 'back_base64' }));

		// cardPlace.add(deck);

		// let dice = new Dice(this, 50, 50);

		// let target_deck = new Deck(this, 500, 250, { max_size: 1 });

		// this.input.on('pointerover', (pointer, objs) => {
		// 	for(let x of objs){
		// 		if(x instanceof Deck && x.notFull()){
		// 			dragEndDeck = x;
		// 		}
		// 	}
		// });

	}

	function update(){
	}

	function render(){
		game.debug.inputInfo(32, 32);
	}
}