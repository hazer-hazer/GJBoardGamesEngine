if(typeof $ === 'undefined'){
	throw "Please, include jQuery-like lib";
}

import Lobby from './core/Lobby.js'
import Sprite from './scene/Sprite.js'
import Card from './board/Card.js'
import Deck from './board/Deck.js'
import Dice from './board/Dice.js'

// Disable context menu on canvas
$('body').on('contextmenu', 'canvas', e => e.preventDefault());

const lobby = new Lobby(0);

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

	var deck,
		target_deck,
		dice;

	function preload(){
		for(let img in data.images){
			this.textures.addBase64(img, 'data:image/png;base64, ' + data.images[img]);
		}
	}

	function create(){
		dice = new Dice(this, 50, 50);

		deck = new Deck(this, 250, 250);

		deck.push(new Card(this, 0, 0, { front_image: 'face_base64', back_image: 'back_base64' }));
		deck.push(new Card(this, 0, 0, { front_image: 'face_base64', back_image: 'back_base64' }));
		deck.push(new Card(this, 0, 0, { front_image: 'face_base64', back_image: 'back_base64' }));

		target_deck = new Deck(this, 500, 250, { max_size: 1 });

		let dragStartDeck = null;
		let dragEndDeck = null;
		
		this.input.on('drag', function (pointer, gameObject, dragX, dragY) {			
			gameObject.x = dragX;
			gameObject.y = dragY;

			if(gameObject instanceof Card){
				dragStartDeck = gameObject.belong_to;
			}
		});

		this.input.on('pointerover', (pointer, objs) => {
			for(let x of objs){
				if(x instanceof Deck && x.notFull()){
					dragEndDeck = x;
				}
			}
		});

		this.input.on('dragend', function(pointer, gameObject){
			if(dragStartDeck && dragEndDeck){
				dragStartDeck.moveCardTo(dragEndDeck);
				dragEndDeck = null;
				dragStartDeck = null;
			}else{
				if(gameObject.fix_pos){
					gameObject.setPosition(gameObject.fix_pos.x, gameObject.fix_pos.y);
					return;
				}
			}
		});

	}

	function update(){
	}

	function render(){
		game.debug.inputInfo(32, 32);
	}
}