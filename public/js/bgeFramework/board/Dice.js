class Dice extends Phaser.GameObjects.Container {

	min_val = 1;
	max_val = 6;

	last_val = 0;

	text = null;

	border_color = 0xffffff;

	// Generating simulation
	gen_sim_count = 25;

	generating = false;

	constructor(scene, x, y, opts = {}){
		super(scene, x, y);

		this.setPosition(x, y);

		this.min_val = opts.min || this.min_val;
		this.max_val = opts.max || this.max_val;

		this.min_val--;

		this.setSize(50, 50);

		this.setInteractive();
	
		this.text = scene.add.text(this.x, this.y, '?', { font: 'serif' }).setOrigin(0.5);

		this.text.setFontSize(20);

		this.graphics = scene.add.graphics();
		this.drawBorder();

		this.on('pointerover', pointer => {
			if(this.generating) return;
			this.border_color = 0x00ddaa;
			this.drawBorder();
		});

		this.on('pointerout', pointer => {
			if(this.generating) return;
			this.border_color = 0xffffff;
			this.drawBorder();
		});
	
		this.on('pointerdown', pointer => {
			if(this.generating) return;
			this.toss();
		});
	}

	drawBorder(newColor = undefined){
		if(newColor){
			this.border_color = newColor;
		}
		this.graphics.lineStyle(1.5, this.border_color, 1);
		this.graphics.strokeRoundedRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height, 10);
	}

	setRange(min, max){
		this.min_val = min;
		this.max_val = max;
	}

	static generate(min, max){
		return Math.ceil(Math.random() * (max - min) + min);
	}

	toss(){
		// Simulate generating
		for(let i = 0; i < this.gen_sim_count; i++){
			setTimeout(() => {
				this.text.setText(Dice.generate(this.min_val, this.max_val));

				if(i === this.gen_sim_count - 1){
					this.drawBorder(0xffffff);
					this.emit('tossed');
				}else{
					this.drawBorder(0x6a7fee);
				}
			}, i * 50);
		}
		this.last_val = Dice.generate(this.min_val, this.max_val);
	}
}

export default Dice