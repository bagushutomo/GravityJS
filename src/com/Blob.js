(function(){
	XM.define("com.Blob", {

		name: "Mr. Blob",
		x: 0,
		y: 0,
		side: 0,

		/*
		constructor: function(name, centerX, centerY, side) {
			console.log("com.Blob constructor");
			this.name = name;
			this.x = centerX;
			this.y = centerY;
			this.side = side;
			this.create();
		},
		*/


		create: function() {
			console.log(this.name, "is having", this.x, this.y, "with", this.side);
		}

	}, function() {

	});
})();