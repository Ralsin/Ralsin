// add to both camGame and camHUD, update timer variable with getSongPosition()
#pragma header
float force = -.1;
uniform float timer;
vec2 uv = openfl_TextureCoordv.xy;
vec2 fragCoord = openfl_TextureCoordv*openfl_TextureSize;
float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}
void main(){
    uv = uv*2.-1.;
    uv /= 1.+force*(uv.x*uv.x+uv.y*uv.y);
    uv = .5*(uv*(1.+force)+1.);
    float thing = rand(vec2(timer*fragCoord));
    vec4 color = flixel_texture2D(bitmap, uv);
    color.r = flixel_texture2D(bitmap, vec2(uv.x+thing*.002, uv.y)).r;
    color.g = flixel_texture2D(bitmap, vec2(uv.x-thing*.0015, uv.y)).g;
    color.b = flixel_texture2D(bitmap, vec2(uv.x+thing*.0025, uv.y)).b;
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {color = vec4(0.0, 0.0, 0.0, 1.0);}
    gl_FragColor = color;
}
