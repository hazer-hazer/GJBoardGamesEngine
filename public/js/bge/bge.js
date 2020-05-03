import Game from './core/Game.js'
import Label from './scene/Label.js'
import Sprite from './scene/Sprite.js'
import Card from './board/Card.js'

// Example logic 

const game = new Game({
	canvas: 'bge_canvas',
	size_to_parent: true
});

// game.get_scene().add_child(new Label({
// 	name: 'Label',
// 	text: 'lorem ipsum',
// 	pos: { x: 150, y: 150 },
// 	style: {
// 		font: '20px Monospace'
// 	}
// }));

// game.get_scene().add_child(new Sprite({
// 	name: 'Sprite',
// 	url: 'https://images.pexels.com/photos/479454/pexels-photo-479454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
// 	pos: { x: 250, y: 250 },
// 	size: { x: 10, y: 100 }
// }));

game.get_scene().add_child(new Card({
	name: 'Card0',
	front_image: 'https://images.pexels.com/photos/479454/pexels-photo-479454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	pos: { x: 150, y: 150 },
	size: { x: 250, y: 450 }
}));

game.launch();