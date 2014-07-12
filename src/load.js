Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen


	// load everything
	game.load.spritesheet('blocks', 'assets/img/blocks.png', 21, 21, 12);
	game.load.spritesheet('player', 'assets/img/player.png', 20, 30, 27);
	game.load.image('sky', 'assets/img/block-sky.png');
	game.load.image('scarab', 'assets/img/scarab.png');

	game.load.tilemap('level1', 'assets/js/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level2', 'assets/js/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level3', 'assets/js/levels/level3.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level4', 'assets/js/levels/level4.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('level5', 'assets/js/levels/level5.json', null, Phaser.Tilemap.TILED_JSON);
    },

    create: function () {
	game.state.start('Menu');
    }
};
