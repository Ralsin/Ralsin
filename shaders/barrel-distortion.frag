#pragma header
uniform float force;
void main()
{
    vec2 uv = openfl_TextureCoordv.xy;
    uv = uv * 2.0 - 1.0;
    uv /= 1.0 + force * (uv.x*uv.x + uv.y*uv.y);
    uv = 0.5 * (uv + 1.0);
    gl_FragColor = flixel_texture2D(bitmap, uv);
}
