Game = {};

A = {
    w: 420,
    h: 315,
};

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	// load images for loading screen
    },

    create: function () {
	game.state.start('Load');
    }
};
