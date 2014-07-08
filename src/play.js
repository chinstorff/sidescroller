Game.Play = function (game) { };

A.playerSpeed = 150;
A.playerJumpSpeed = 400;
A.playerGravity = 1000;

Game.Play.prototype = {
    create: function () {
	game.stage.backgroundColor = '#eee';
	game.physics.startSystem(Phaser.Physics.ARCADE);
	this.createControls();

	A.player = game.add.sprite(50, 100, 'player');
	A.player.anchor.setTo(0.5, -2.5);
	game.physics.arcade.enable(A.player);
	A.player.body.gravity.y = A.playerGravity;
	A.player.body.collideWorldBounds = true;

	A.map = game.add.tilemap('level1');
	A.map.addTilesetImage('blocks', 'blocks');
	A.map.setCollisionBetween(8, 9);
	A.layer = A.map.createLayer('blocks');
	A.layer.resizeWorld();

	game.camera.follow(A.player);
	game.camera.deadzone = new Phaser.Rectangle(A.w / 16 * 7, 0, A.w / 8, A.h);
    },

    update: function () {
	game.physics.arcade.collide(A.player, A.layer);

	this.updateControls();
    },

    createControls: function () {
	A.keys = game.input.keyboard.createCursorKeys();

	A.keys.up.onDown.add(function () {
	    console.log('up');
	    if (A.player.body.velocity.y === 0) {
		console.log('and away');
		A.player.body.velocity.y = -A.playerJumpSpeed;
	    }
	}, this);
    },

    updateControls: function () {
	A.player.body.velocity.x = A.keys.left.isDown ? -A.playerSpeed : 0;
	A.player.body.velocity.x += A.keys.right.isDown ? A.playerSpeed : 0;
    },
};
