Game.Play = function (game) { };

A.playerSpeed = 150;
A.playerJumpSpeed = 400;
A.playerGravity = 1000;

Game.Play.prototype = {
    create: function () {
	game.stage.backgroundColor = '#e5f2f3';
	game.physics.startSystem(Phaser.Physics.ARCADE);
	this.createControls();

	this.loadLevel(1);
    },

    update: function () {
	game.physics.arcade.collide(A.player, A.level.layer.blocks);

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

    createPlayer: function (x, y) {
	A.player = game.add.sprite(x, y, 'player', 1);
	A.player.anchor.setTo(0.5, -2.5);
	game.physics.arcade.enable(A.player);
	A.player.body.gravity.y = A.playerGravity;
	A.player.body.collideWorldBounds = true;
	A.player.fill = 0;

	game.camera.follow(A.player);
	game.camera.deadzone = new Phaser.Rectangle(A.w / 16 * 7, 0, A.w / 8, A.h);
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

    loadLevel: function (levelID) {
	A.level = { layer: {} };
	A.level.map = game.add.tilemap('level' + levelID);
	A.level.map.addTilesetImage('blocks', 'blocks');
	A.level.map.addTilesetImage('sky', 'sky');
	A.level.layer.sky = A.level.map.createLayer('sky');
	A.level.layer.blocks = A.level.map.createLayer('blocks');
	A.level.map.setCollisionBetween(8, 9, true, A.level.layer.blocks);
	A.level.layer.sky.resizeWorld();
	
	this.createPlayer(50, 100);
    },
};
