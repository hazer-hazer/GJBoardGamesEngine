import Node from '../scene/Node.js'
import Sprite from '../scene/Sprite.js'

const DEFAULT_SIZE = { x: 250, y: 400 };

class Card extends Node {
	front_img = null;
	back_img = null;

	flipped = false;

	constructor(options = {}){
		super(options);

		this.size = this.size || DEFAULT_SIZE;

		if(options.front_image){
			this.add_child(new Sprite({
				name: 'FrontImage',
				url: options.front_image,
				size: this.size
			}));
		}

		if(options.back_image){
			this.add_child(new Sprite({
				name: 'BackImage',
				url: options.back_image,
				size: this.size
			}));
		}
	
		this.drawable = true;
	}

	flip(){
		this.flipped = !this.flipped;
	}

	_ready(){
	}

	_draw(ctx){
		
	}

	// Card API
	/**
	 * TODO:
	 * 
	 */
}

export default Card