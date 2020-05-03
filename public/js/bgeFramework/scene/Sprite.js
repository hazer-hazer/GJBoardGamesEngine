class Sprite extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, opts = {}){
		super(scene, x, y);

		this.setPosition(x, y);

		this.width = 100;
		this.height = 140;

		this.setScale(0.25, 0.25);

		scene.textures.on('addtexture', () => {
			this.setTexture(opts.image);

			console.log(scene.textures.get(opts.image))
		});
		
		this.setInteractive();
	}

	show(){
		this.visible = true;
	}

	hide(){
		this.visible = false;
	}

	toggle(){
		this.visible = !this.visible;
	}
}

export default Sprite