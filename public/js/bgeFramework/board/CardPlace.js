class CardPlace extends Phaser.GameObjects.Container {

	border_color = 0xffffff;

	constructor(scene, x, y, opts = {}){
		super(scene, x, y);

		scene.add.existing(this);

		this.setPosition(x, y);

		this.setSize(100, 140);
		this.setInteractive();

		// Events
		scene.input.on('pointermove', pointer => {
			let stateChanged = false;
			if( pointer.x > this.x - this.width / 2		&&
				pointer.y > this.y - this.height / 2	&&
				pointer.x < this.x + this.width / 2 	&& 
				pointer.y < this.y + this.height / 2){

				stateChanged = true;

				if(this.size() < this.max_size){
					this.border_color = 0x00ddaa;
				}else{
					this.border_color = 0xf25959;
				}

				scene.input.emit('pointerover', pointer, [this]);
			}else{
				stateChanged = true;

				this.border_color = 0xffffff;

				scene.input.emit('pointerout', pointer, [this]);
			}

			if(stateChanged){
				graphics.lineStyle(2, this.border_color, 1);
				graphics.strokeRoundedRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, 10);
			}
		});
	}

}

export default CardPlace