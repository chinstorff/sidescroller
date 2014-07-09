Game.Play = function (game) { };

A.playerSpeed = 150;
A.playerJumpSpeed = 400;
A.playerGravity = 1000;

Game.Play.prototype = {
    create: function () {
	game.stage.backgroundColor = '#e5f2f3';
	game.physics.startSystem(Phaser.Physics.ARCADE);
	this.createControls();

	A.map = game.add.tilemap('level1');
	A.map.addTilesetImage('blocks', 'blocks');
	A.map.addTilesetImage('sky', 'sky');
	A.layerSky = A.map.createLayer('sky');
	A.layer = A.map.createLayer('blocks');
	A.map.setCollisionBetween(8, 9, true, A.layer);
	A.layer.resizeWorld();

	A.player = game.add.sprite(50, 100, 'player', 1);
	A.player.anchor.setTo(0.5, -2.5);
	game.physics.arcade.enable(A.player);
	A.player.body.gravity.y = A.playerGravity;
	A.player.body.collideWorldBounds = true;
	A.player.fill = 0;

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
	    if (A.player.body.velocity.y === 0) {
		A.player.body.velocity.y = -A.playerJumpSpeed;
	    }
	}, this);

	A.keys.down.onDown.add(function () {
	    A.player.fill += 1;
	    if (A.player.fill >= 9) {
		A.player.fill -= 9;
	    }
	}, this);
    },

    updateControls: function () {
	if (A.keys.left.isDown && !A.keys.right.isDown) {
	    A.player.body.velocity.x = -A.playerSpeed;
	    A.player.frame = 0 + A.player.fill * 3;
	}
	else if (A.keys.right.isDown && !A.keys.left.isDown) {
	    A.player.body.velocity.x = A.playerSpeed;
	    A.player.frame = 2 + A.player.fill * 3;
	}
	else {
	    A.player.body.velocity.x = 0;
	    A.player.frame = 1 + A.player.fill * 3;
	}
    },
};
