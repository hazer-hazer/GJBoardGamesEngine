import Node from './Node.js'

class Sprite extends Node {
	url = null;
	img = null;

	crop_rect = null;

	constructor(options = {}){
		super(options);

		this.url = options.url;

		this.crop_rect = options.crop_rect;
	}

	set_crop_rect(x, y, w, h){
		this.crop_rect = { pos: { x, y }, size: { w, h } };
	}

	_ready(){
		if(!this.url){
			throw "Failed to draw Sprite. No URL to image source was specified";
		}

		this.img = new Image(this.size.x, this.size.y);
		this.img.src = this.url;

		this.img.onload = () => this.drawable = true;
	}

	_draw(ctx){
		if(!this.img){
			throw "Failed to draw an image";
		}

		let size = this.size;

		if(size === 'auto'){
			size = { x: this.img.width, y: this.img.height };
		}

		if(this.crop_rect){
			ctx.draw_image(this.img, this.pos, size,
						   this.crop_rect.pos.x, this.crop_rect.pos.y,
						   this.crop_rect.size.x, this.crop_rect.size.y);
		}else{
			ctx.draw_image(this.img, this.pos, size);
		}
	}
}

export default Sprite