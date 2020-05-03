class Node {
	pos = { x: 0, y: 0 };

	events = {};

	constructor(options = {}){
		this.pos = options.pos || this.pos;
	}

	on(name, cb){
		this.events[name] = this.events[name] || [];
		this.events[name].push(cb);
	}

	emit(name, data = undefined){
		if(!this.events[name]){
			return;
		}
		for(let f of this.events[name]){
			f(data);
		}
	}
}

export default Node