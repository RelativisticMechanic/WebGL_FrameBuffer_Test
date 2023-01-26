class PixArray
{
    constructor(gl, size)
    {
        this.vs_source = 
        [
            'precision mediump float;',
            'attribute vec2 vertPosition;',
            'varying vec2 screenUV;',
            'void main()',
            '{',
            'screenUV = vertPosition.xy * 0.5 + 0.5;',
            'gl_Position = vec4(vertPosition, 0.0, 1.0);',
            '}'
        ].join('\n');

        this.fs_source =
        [
            'precision mediump float;',
            'varying vec2 screenUV;',
            'uniform sampler2D screen_texture;',
            'void main()',
            '{',
            'gl_FragColor = texture2D(screen_texture, screenUV);',
            '}'
        ].join('\n');
        
        this.screenVertices = 
        [ // X, Y
            1.0, 1.0,
            -1.0, 1.0,
            -1.0, -1.0,
            -1.0, -1.0,
            1.0, -1.0,
            1.0, 1.0
        ];

        this.screenVBO = gl.createBuffer();
        this.default_shader = new Shader(gl, this.vs_source, this.fs_source);
        this.size = size;
        this.screen_pixels = new Uint8Array(size * size * 4);
        this.screen_texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.screen_texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }

    putPixel(x, y, col_r, col_g, col_b, col_a)
    {
        this.screen_pixels[y * this.size * 4 + x * 4] = col_r;
        this.screen_pixels[y * this.size * 4 + (x * 4)+ 1] = col_g;
        this.screen_pixels[y * this.size * 4 + (x * 4) + 2] = col_b;
        this.screen_pixels[y * this.size * 4 + (x * 4) + 3] = col_a;
    }

    draw(gl)
    {
        this.default_shader.applyShader(gl);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.screen_texture);
        gl.texImage2D(
            gl.TEXTURE_2D, // target
            0, // mip level
            gl.RGBA, // internal format
            this.size, this.size, // width and height
            0, // border
            gl.RGBA, //format
            gl.UNSIGNED_BYTE, // type
            this.screen_pixels // texture data
        );

        gl.bindBuffer(gl.ARRAY_BUFFER, this.screenVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.screenVertices), gl.STATIC_DRAW);

        var positionAttribLocation = gl.getAttribLocation(this.default_shader.getProgram(), 'vertPosition');
        gl.vertexAttribPointer(
            positionAttribLocation, // Attribute location
            2, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        );

        var sampler_location = gl.getUniformLocation(this.default_shader.getProgram(), 'screen_texture');
        gl.uniform1i(sampler_location, 0);
	    gl.enableVertexAttribArray(positionAttribLocation);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
};