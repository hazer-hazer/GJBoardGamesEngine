const DEFAULT_FONT = "20px Verdana";
const DEFAULT_FILL_STYLE = "#000000";
const DEFAULT_LINE_WIDTH = 1;

class Context {
	canvas = null;
	ctx = null;

	constructor(element){	
		this.set_canvas(element);
	}

	set_canvas(cvs){
		this.ctx = cvs.getContext('2d');
		this.canvas = cvs;
	}

	// Style
	set_style(style){
		// Font
		this.ctx.font = style.font || DEFAULT_FONT;
		this.ctx.fillStyle = style.fillStyle || DEFAULT_FILL_STYLE;

		// Line
		this.ctx.lineWidth = style.lineWidth || DEFAULT_LINE_WIDTH;
	}

	// Draw API
	draw_text(pos, text = '', style = {}){
		this.set_style(style);

		style.text_style = style.text_style || 'fill';

		if(style.text_style === 'fill'){
			this.ctx.fillText(text, pos.x, pos.y);
		}else{
			this.ctx.strokeText(text, pos.x, pos.y);
		}
	}

	draw_image(img, pos, size, style = {}){
		this.set_style(style);

		this.ctx.drawImage(img, pos.x, pos.y, size.x, size.y);
	}
}

export default Context;