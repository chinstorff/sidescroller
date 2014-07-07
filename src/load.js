Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen


	// load everything
	game.load.spritesheet('blocks', 'assets/img/blocks.png', 21, 21, 12);
	game.load.image('player', 'assets/img/player.png');

    },

    create: function () {
	game.state.start('Menu');
    }
};
