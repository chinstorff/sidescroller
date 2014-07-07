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

	A.blocks = game.add.group();
	A.blocks.enableBody = true;

	var block;
	for (var i = 0; i < 40; i++) {
	    block = A.blocks.create(21 * i, 294, 'blocks', 7);
	    block.body.immovable = true;
	}

	game.camera.bounds = null;
	game.camera.follow(A.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    },

    update: function () {
	game.physics.arcade.collide(A.player, A.blocks);

	this.updateControls();
    },

    createControls: function () {
	A.keys = game.input.keyboard.createCursorKeys();

	A.keys.up.onDown.add(function () {
	    if (A.player.body.touching.down) {
		A.player.body.velocity.y = -A.playerJumpSpeed;
	    }
	}, this);
    },

    updateControls: function () {
	A.player.body.velocity.x = A.keys.left.isDown ? -A.playerSpeed : 0;
	A.player.body.velocity.x += A.keys.right.isDown ? A.playerSpeed : 0;
    },
};
