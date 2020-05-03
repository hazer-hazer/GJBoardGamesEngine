class Player extends Phaser.GameObjects.Container {

	constructor(scene, x, y, opts = {}){
		super(scene, x, y);

		scene.add.existing(this);

		this.setPosition(x, y);
	}

	// addToHands(handsObject){
	// 	// Check for available type of handsObject
	// 	if(!(handsObject instanceof Deck)){
	// 		throw "Tryed to add not available hands object";
	// 	}

	// 	this.add(handsObject);
	// }
}

export default Player