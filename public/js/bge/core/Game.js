import Context from './Context.js'
import Node from '../scene/Node.js'

class Game {
	root_node = null;
	context = null;

	constructor(options = {}){
		if(!window || !document){
			throw "Window Context was not found (use this library only in browser)";
		}

		let cvs = document.querySelector('#bge_canvas') || document.querySelector(options.canvas);

		if(!cvs){
			throw "Canvas element was not found";
		}

		const ratio = (function () {
			var ctx = document.createElement("canvas").getContext("2d"),
			dpr = window.devicePixelRatio || 1,
			bsr = ctx.webkitBackingStorePixelRatio ||
				  ctx.mozBackingStorePixelRatio ||
				  ctx.msBackingStorePixelRatio ||
				  ctx.oBackingStorePixelRatio ||
				  ctx.backingStorePixelRatio || 1;

			return dpr / bsr;
		})();

		if(options.size_to_parent){
			options.width = cvs.parentElement.clientWidth;
			options.height = cvs.parentElement.clientHeight;
		}
		
		cvs.width = options.width * ratio;
		cvs.height = options.height * ratio;
		cvs.style.width = options.width + "px";
		cvs.style.height = options.height + "px";
		cvs.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);

		this.context = new Context(cvs);

		this.root_node = new Node({
			name: 'Scene'
		});
	}

	get_scene(){
		return this.root_node;
	}

	draw(){
		this.root_node.through_tree(n => {
			if(n._draw && n.drawable){
				n._draw(this.context);
			}
		});
	}

	update(){
		this.root_node.through_tree(n => {
			if(n._update){
				n._update();
			}
		});
	}

	launch(){
		this.root_node.through_tree(n => {
			if(n._ready){
				n._ready();
			}
		});

		const cycle = () => {
			this.update();
			this.draw();

			window.requestAnimationFrame(cycle);
		}

		window.requestAnimationFrame(cycle);
	}
}

export default Game;