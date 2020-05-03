class Node {
	name = "";

	// Tree
	children = [];

	pos = { x: 0, y: 0 };
	size = 'auto';
	style = {};


	// Drawable is a state for all nodes
	// It specifies if node is ready to be drawen
	// or it always false for nodes that could never be drawen
	drawable = false;

	constructor(options = {}){
		this.name = options.name || 'Node_' + Math.floor(Math.random() * 1000000);

		this.pos = options.pos || this.pos;
		this.style = options.style || this.style;
	
		this.size = options.size || this.size; // Size is optional and is not used for most of scene objects
	
		this.drawable = options.drawable || false;
	}

	set_name(name){
		this.name = name;
	}

	get_name(){
		return this.name;
	}

	set_pos(x, y){
		this.pos = { x, y };
	}

	get_pos(){
		return this.pos;
	}

	set_size(x, y){
		this.size = { x, y };
	}

	get_size(){
		return this.size;
	}

	// Scene tree
	
	add_child(n){
		// if(n instanceof this.constructor){
			this.children.push(n);
		// }else{
			// throw "Child can only be type of Node";
		// }
	}

	get_child(name){
		return this.children.find(c => c.get_name() === name);
	}

	through_tree(func){
		if(typeof func !== 'function'){
			throw "Expected parameter type of function";
		}

		for(let c of this.children){
			c.through_tree(func);
		}

		func(this);
	}

}

export default Node;