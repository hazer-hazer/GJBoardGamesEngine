import Card from './Card.js'

class Deck extends Phaser.GameObjects.Container {
	cards = [];

	counter = null;

	max_size = 52;

	update_counter = false;

	constructor(scene, x, y, opts = {}){
		super(scene, x, y);

		scene.add.existing(this);

		this.setPosition(x, y);

		this.max_size = opts.max_size || this.max_size;

		this.setSize(100, 140);
		this.setInteractive();
	
		let graphics = scene.add.graphics();
		graphics.lineStyle(2, this.border_color, 1);
		graphics.strokeRoundedRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, 10);

		this.counter = scene.add.text(this.x - this.width / 2 + 10, this.y - this.height / 2 - 15, this.size(), { font: 'sans-serif' });
	}

	preUpdate(time, delta){
		if(this.update_counter){
			this.counter.setText(this.size());
		}
	}

	push(card){
		if(!(card instanceof Card)){
			throw "Deck can only store Card objects";
		}

		card.setBelongTo(this);

		card.setPosition(0, 0);

		this.add(card);
		this.cards.push(card);

		this.update_counter = true;
		
		return card;
	}

	take(count = 1){
		if(count < 1){
			throw "Illegal count of cards to take";
		}
		
		if(this.cards.length === 0){
			return null;
		}
	
		this.update_counter = true;

		// Change if need always get array of card and in case of count=1 too
		if(count === 1){
			return this.cards.pop();
		}else{
			let cards = [];
			for(let x = 0; i < count && this.cards.length > 0; i++)
				cards.push(cards.pop());
			return cards;
		}
	}

	size(){
		return this.cards.length;
	}

	notFull(){
		return this.size() < this.max_size;
	}

	moveCardTo(deck){
		if(!(deck instanceof Deck)){
			throw "Cannot move card to Object not type of Deck";
		}
		this.update_counter = true;
		deck.push(this.take());
	}
}

export default Deck