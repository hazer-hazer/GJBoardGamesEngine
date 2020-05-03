import Card from './Card.js'

class CardSet extends Phaser.GameObjects.Container {
	
	count = 6;

	cards = [];

	constructor(scene, x, y, opts = {}){
		super(scene, x, y);

		this.setPosition(x, y);

		this.count = opts.count || this.count;
	}
}

export default CardSet