import Card from './Card.js'
import Deck from './Deck.js'

class CardPlace extends Phaser.GameObjects.Container {

	border_color = 0xffffff;

	constructor(scene, x, y, opts = {}){
		super(scene, x, y);

		scene.add.existing(this);

		this.setPosition(x, y);

		this.setSize(100, 140);
		this.setInteractive();

		this.graphics = scene.add.graphics();

		this.drawBorder();

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
		return this.count() === 0 && (this.first instanceof Deck ? this.first.notFull() : true);
	}

	add(placeable){
		if(!(placeable instanceof Card || placeable instanceof Deck)){
			throw "Only Card or Deck can be placed in CardPlace";
		}

		placeable.setBelongTo(this);

		this.addAt(placeable, 0);
	}

	drawBorder(){
		this.graphics.lineStyle(2, this.border_color, 1);
		this.graphics.strokeRoundedRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, 10);
	}

	moveCardTo(placeable){
		if(!(placeable instanceof CardPlace)){
			throw "Cannot move card to Object not type of CardPlace or Deck";
		}
		placeable.add(this.first);
		this.removeAll();
	}
}

export default CardPlace