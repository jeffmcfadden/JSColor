# JSColor
A JavaScript library for handling storage of a color and easily converting between Hex, RGB, and HSV

For example, you can snag a color and adjust only the hue, keeping saturation and brightness even, to maintain a sort of gradient affect in a color range:
`var color1 = Color();
 color1.hex( '#74d04c' );
 color1.h( color1.h() - 40 );
 console.log( color1.hex() );`

## Usage
The following getters/setters are supported. Whenever you set a value the others will be immediately adjusted to match. So if you set the hex, you can grab the RGB or HSV immediately.

RGB values are 0-255
H is 0-360
S and V are 0-100
Hex is #000000 - #FFFFFF and *expects the leading hash*

### Methods
* r( val )
* g( val )
* b( val )

* h( val )
* s( val )
* v( val )

* hex( val )

