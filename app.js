

window.addEventListener('DOMContentLoaded', () => {
	console.log('[OK] Initializing WebGL');

	var canvas = document.getElementById('game-surface');
	var gl = canvas.getContext('webgl');
	if (!gl) {
		console.log('[WARN] WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		console.error('[ERR] Your browser does not support WebGL');
	}
    myPixArray = new PixArray(gl, 256);

    var frameCallback = () => {
        setCanvasDimensions(gl, canvas, window.innerWidth * 0.50, window.innerHeight * 0.75);
        for(var i = 0; i < 256; i++)
        {
            for(var j = 0; j < 256; j++)
            {
                myPixArray.putPixel(i, j, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
            }
        }
        myPixArray.draw(gl);
        requestAnimationFrame(frameCallback);
    };

    requestAnimationFrame(frameCallback);
});

function setCanvasDimensions(gl, canvas, width, height)
{
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
}