import Sprite from '../scene/Sprite.js'
import Deck from './Deck.js'

class Card extends Phaser.GameObjects.Container {

	// Draggable state does mean that Card can or cannot be moved freely
	// It means that if it is false then Card save its position after trying to move
	// draggable = true;

	fix_pos = { x: 0, y: 0 };

	open = false;

	belong_to = null;

	// The value is any-type object that stores game data about card, if need of course
	value = null;

	constructor(scene, x, y, opts = {}){
		super(scene, x, y);

		this.setPosition(x, y);
		this.setSize(100, 140);

		this.front_image = scene.add.existing( new Sprite(scene, x, y, { image: opts.front_image }) );
		this.back_image = scene.add.existing( new Sprite(scene, x, y, { image: opts.back_image }) );

		this.add([ this.front_image, this.back_image ]);

		this.front_image.hide();
		this.back_image.show();

		this.setInteractive();
		
		scene.input.setDraggable(this);

		this.on('pointerdown', pointer => {
			if(pointer.rightButtonDown()){
				this.flip();
			}
		});

		scene.add.existing(this);
	}

	setBelongTo(deck){
		if(deck instanceof Deck){
			this.belong_to = deck;
		}
	}

	setPosition(x, y){
		super.setPosition(x, y);
		this.fix_pos = { x, y };
	}

	preUpdate(time, delta){
	}

	flip(){
		this.front_image.toggle();
		this.back_image.toggle();
		open = this.front_image.visible;
	}
}

export default Card