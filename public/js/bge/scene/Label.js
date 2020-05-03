import Node from './Node.js'

class Label extends Node {
	text = '';

	constructor(options = {}){
		super(options);
		this.text = options.text;

		this.drawable = true;
	}

	_draw(ctx){
		ctx.draw_text(this.pos, this.text, this.style);
	}
}

export default Label;