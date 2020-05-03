import Sprite from '../scene/Sprite.js'
import Deck from './Deck.js'
import CardPlace from './CardPlace.js'

class Card extends Phaser.GameObjects.Container {

	// Draggable state does mean that Card can or cannot be moved freely
	// It means that if it is false then Card save its position after trying to move
	// draggable = true;

	fix_pos = { x: 0, y: 0 };

	open = false;

	belong_to = null;

	// The value is any-type object that stores game data about card, if need of course
	value = null;

	flippable = true;

	constructor(scene, x, y, opts = {}){
		super(scene, x, y);
	
		scene.add.existing(this);

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

		this.on('dragstart', (pointer, dragX, dragY) => {
			scene.data.set('dragStartCardPlace', this.belong_to);
		});
		
		scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
			if(gameObject !== this){
				return;
			}

			this.x = dragX;
			this.y = dragY;
		});

		scene.input.on('dragend', (pointer, gameObject) => {
			if(gameObject !== this){
				return;
			}

			let dragStartCardPlace = scene.data.get('dragEndCardPlace'),
				dragEndCardPlace = scene.data.get('dragStartCardPlace');

			if(dragStartCardPlace && dragEndCardPlace){
				dragStartCardPlace.moveCardTo(dragEndCardPlace);
				dragStartCardPlace = null;
				dragEndCardPlace = null;
			}else{
				if(this.fix_pos){
					this.setPosition(this.fix_pos.x, this.fix_pos.y);
					return;
				}
			}
		});
	}

	setBelongTo(place){
		if(place instanceof CardPlace){
			this.belong_to = place;
		}
	}

	setPosition(x, y){
		super.setPosition(x, y);
		this.fix_pos = { x, y };
	}

	preUpdate(time, delta){
	}

	flip(){
		if(!this.flippable) return;
		this.front_image.toggle();
		this.back_image.toggle();
		open = this.front_image.visible;

		this.emit('flip');
	}
}

export default Card