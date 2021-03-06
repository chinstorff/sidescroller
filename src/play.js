Game.Play = function (game) { };

A.playerSpeed = 120;
A.playerGravity = 1000;
A.currentLevel = 0;

A.level = {};

A.level5 = function () {
    A.score = 9;
    Game.Play.prototype.loadLevel(5);
};

Game.Play.prototype = {
    create: function () {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	this.createControls();

	this.nextLevel();
    },

    update: function () {
	game.physics.arcade.collide(A.player, A.level.layer.blocks);
	game.physics.arcade.overlap(A.player, A.scarabs, this.takeScarab, null, this);
	game.physics.arcade.overlap(A.player, A.endZones, this.nextLevel, null, this);

	this.updateControls();
    },

    createControls: function () {
	A.keys = game.input.keyboard.createCursorKeys();

	A.keys.A = game.input.keyboard.addKey(Phaser.Keyboard.A);
	A.keys.S = game.input.keyboard.addKey(Phaser.Keyboard.S);
	A.keys.D = game.input.keyboard.addKey(Phaser.Keyboard.D);
	A.keys.W = game.input.keyboard.addKey(Phaser.Keyboard.W);

	A.keys.R = game.input.keyboard.addKey(Phaser.Keyboard.R);

	var jump = function () {
	    if (A.player.body.blocked.down) {
		A.player.body.velocity.y = -A.playerJumpSpeed;
	    }
	};

	A.keys.up.onDown.add(jump, this);
	A.keys.W.onDown.add(jump, this);

	A.keys.R.onDown.add(this.restartLevel, this);
    },

    createPlayer: function () {
	A.player = A.players.children[A.players.length - 1];
	A.player.anchor.setTo(0.5, -2.5);
	A.player.x += A.player.width * 0.5;
	A.player.y -= A.player.height * 2.5;
	A.player.body.gravity.y = A.playerGravity;
	A.player.body.collideWorldBounds = true;
	A.player.fill = 0;

	game.camera.follow(A.player);
	game.camera.deadzone = new Phaser.Rectangle(A.w / 16 * 7, 0, A.w / 8, A.h);
    },

    updateControls: function () {
	var left = (A.keys.left.isDown || A.keys.A.isDown) && !(A.keys.right.isDown || A.keys.D.isDown);
	var right = (A.keys.right.isDown || A.keys.D.isDown) && !(A.keys.left.isDown || A.keys.A.isDown);

	if (left) {
	    A.player.body.velocity.x = -A.playerSpeed;
	    A.player.frame = 0 + this.playerFill() * 3;
	}
	else if (right) {
	    A.player.body.velocity.x = A.playerSpeed;
	    A.player.frame = 2 + this.playerFill() * 3;
	}
	else {
	    A.player.body.velocity.x = 0;
	    A.player.frame = 1 + this.playerFill() * 3;
	}
    },

    loadLevel: function (levelID) {
	A.currentLevel = levelID;

	this.clearMap();
	
	A.level = { layer: {} };
	A.level.score = A.score;

	A.level.map = game.add.tilemap('level' + levelID);
	A.level.map.addTilesetImage('blocks', 'blocks');
	A.level.map.addTilesetImage('sky', 'sky');

	A.level.layer.sky = A.level.map.createLayer('sky');
	A.level.layer.blocks = A.level.map.createLayer('blocks');
	A.level.map.setCollisionBetween(1, 12, true, A.level.layer.blocks);
	A.level.layer.sky.resizeWorld();

	A.players = game.add.group();
	A.players.enableBody = true;
	A.level.map.createFromObjects('objects', 16, 'player', 1, true, false, A.players);
	this.createPlayer();

	A.scarabs = game.add.group();
	A.scarabs.enableBody = true;
	A.level.map.createFromObjects('objects', 14, 'scarab', 0, true, false, A.scarabs);

	A.endZones = game.add.group();
	A.endZones.enableBody = true;
	A.level.map.createFromObjects('objects', 5, 'blocks', 5, true, false, A.endZones);

	this.updatePowerups();
    },

    nextLevel: function () {
	A.score = A.level.score || 0;

	this.loadLevel(++A.currentLevel);
    },

    restartLevel: function () {
	this.loadLevel(A.currentLevel);
    },

    clearMap: function() {

    },
    
    playerFill: function () {
	var fill = A.level.score;
	while (fill >= 9) {
	    fill -= 9;
	}
	return fill;
    },

    updatePowerups: function () {
	A.playerJumpSpeed = A.level.score >= 9 ? 325 : 250;
    },

    takeScarab: function (player, scarab) {
	scarab.kill();
	A.level.score++;
	if (A.level.score === 8) {
	    A.level.score++;
	}
	this.updatePowerups();
    },
};
