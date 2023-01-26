class Shader
{
    constructor(gl, vs_source, fs_source)
    {
        this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(this.vertexShader, vs_source);
        gl.shaderSource(this.fragmentShader, fs_source);

        gl.compileShader(this.vertexShader);
        if (!gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS)) {
            console.error('[ERR] Error compiling vertex shader.', gl.getShaderInfoLog(this.vertexShader));
            return;
        }

        gl.compileShader(this.fragmentShader);
        if (!gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS)) {
            console.error('[ERR] Error compiling fragment shader.', gl.getShaderInfoLog(this.fragmentShader));
            return;
        }

        this.program = gl.createProgram();
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error('[ERR] Error linking shader program.', gl.getProgramInfoLog(this.program));
            return;
        }
        gl.validateProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.VALIDATE_STATUS)) {
            console.error('[ERR] Error validating shader program.', gl.getProgramInfoLog(program));
            return;
        }
    }

    applyShader(gl)
    {
        gl.useProgram(this.program);
    }

    getProgram()
    {
        return this.program;
    }
};