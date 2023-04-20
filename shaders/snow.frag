/*
Thing for Psych 0.6.3 lua
function onCreatePost()
    setShaderFloat('snowShader', 'aspect_ratio', 16/9)
end
function onUpdatePost()
    setShaderFloat('snowShader', 'time', getSongPosition()/1000)
    setShaderFloat('snowShader', 'posX', cameraX / screenWidth)
    setShaderFloat('snowShader', 'posY', cameraY / screenHeight)
    setShaderFloat('snowShader', 'camZoom', getProperty('camGame.zoom'))
end
*/

#pragma header
vec2 uv = openfl_TextureCoordv.xy;
uniform float time;
uniform float aspect_ratio;
uniform float posX;
uniform float posY;
uniform float camZoom;

float snow(vec2 uv, float scale) {
	float w = smoothstep(1.,0.,-uv.y*(scale*.15));
	if (w < .1) { return 0.; }
	float c = time / scale * 2.; // general speed
	uv.y -= c * 2.; // fall speed
	uv.x -= c; // + left, - right
	uv.x += cos(uv.y+time*.5) / scale;
	uv *= scale;
	vec2 f = fract(uv);
	vec2 p = vec2(0.);
	p = .5+.35*sin(11.*fract(sin((floor(uv)+p+scale)*mat2(7,3,6,5))*5.))-f;
	float k = min(length(p),3.);
	k = smoothstep(.03,k,sin(f.x+f.y)*.01);
	return k*w;
}
void main() {
	vec2 uv2 = (vec2(uv.x*aspect_ratio, uv.y) + vec2(posX, posY)) * camZoom;
	float c = 0.;
	// layers, the bigger the number is, the "further" it is
	c += snow(uv2, 8.);
	c += snow(uv2, 12.);
	c += snow(uv2, 16.);
	gl_FragColor = texture2D(bitmap, uv) + vec4(vec3(c), 0.0);
}
