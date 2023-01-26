# WebGL_FrameBuffer_Test

A simple way to render an array of pixels to screen using WebGL.

```js
var canvas = document.getElementById('game-surface');
var gl = canvas.getContext('webgl');
  
/* Create a 256x256 framebuffer */
myPixArray = new PixArray(gl, 256);

var frameCallback = () => {
    setCanvasDimensions(gl, canvas, window.innerWidth * 0.50, window.innerHeight * 0.75);
    for(var i = 0; i < 256; i++)
    {
        for(var j = 0; j < 256; j++)
        {
            /* Put pixel on the screen */
            myPixArray.putPixel(i, j, Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
        }
    }
    myPixArray.draw(gl);
    requestAnimationFrame(frameCallback);
};
```
