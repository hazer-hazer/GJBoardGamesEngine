import Card from './Card.js'
import CardPlace from './CardPlace.js'

class Deck extends Phaser.GameObjects.Container {
	cards = [];

	counter = null;

	max_size = 52;

	belong_to = null;

	border_color = 0xffffff;

	constructor(scene, x, y, opts = {}){
		super(scene, x, y);

		scene.add.existing(this);

		this.setPosition(x, y);

		this.setSize(100, 140);

		this.counter = scene.add.text(this.x - this.width / 2 + 10, this.y - this.height / 2 - 15, this.size(), { font: 'sans-serif' });

		this.graphics = scene.add.graphics();

		this.drawBorder();

		this.max_size = opts.max_size || this.max_size;

		// Events
		this.on('pointerover', pointer => {
			if(this.available()){
				this.border_color = 0x00ddaa;
				scene.data.set('dragEndCardPlace', this);
			}else{
				this.border_color = 0xf25959;
			}
			this.drawBorder();
		});

		this.on('pointerout', pointer => {
			this.border_color = 0xffffff;
			this.drawBorder();
			scene.data.reset('dragEndCardPlace');
		});
	}

	available(){
		return this.notFull();
	}

	drawBorder(){
		// console.log(this.parent)
		// this.graphics.lineStyle(2, this.border_color, 1);
		// this.graphics.strokeRoundedRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, 10);
	}

	update_counter(){
		this.counter.setText(this.size());
	}

	setBelongTo(place){
		if(place instanceof CardPlace){
			this.belong_to = place;
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

		this.update_counter();
		
		return card;
	}

	take(count = 1){
		if(count < 1){
			throw "Illegal count of cards to take";
		}
		
		if(this.cards.length === 0){
			return null;
		}
	
		this.update_counter();

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

	moveCardTo(placeable){
		if(placeable instanceof Deck){
			placeable.push(this.take());
		}else if(placeable instanceof CardPlace){
			placeable.add(this.take());
		}else{
			throw "Cannot move card to Object not type of Deck or CardPlace";
		}

		this.update_counter();
	}
}

export default Deck