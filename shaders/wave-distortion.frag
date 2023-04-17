#pragma header
uniform float force;
uniform float waveSize;
void main()
{
    vec2 uv = openfl_TextureCoordv.xy;
    gl_FragColor = flixel_texture2D(bitmap, vec2(uv.x+sin(uv.y*waveSize)*force, uv.y));
}
