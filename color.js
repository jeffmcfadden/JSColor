var Color = function(){

    return {
        'color_r'   : 0,
        'color_g'   : 0,
        'color_b'   : 0,
        'color_h'   : 0,
        'color_s'   : 0,
        'color_v'   : 0,
        'color_hex' : '#000000',

        'r' : function( red ){
            if( typeof(red) == 'undefined' ){
                return this.color_r;
            }else{
                if( red > 255 ){ red = 255; }
                if( red < 0   ){ red = 0; }
                this.color_r = red;
                this.rgb2hsv();
                this.rgb2hex();
            }
        },
        
        'g' : function( green ){
            if( typeof(green) == 'undefined' ){
                return this.color_g;
            }else{
                if( green > 255 ){ green = 255; }
                if( green < 0   ){ green = 0; }
                this.color_g = green;
                this.rgb2hsv();
                this.rgb2hex();
            }
        },
        
        'b' : function( blue ){
            if( typeof(blue) == 'undefined' ){
                return this.color_b;
            }else{
                if( blue > 255 ){ blue = 255; }
                if( blue < 0   ){ blue = 0; }
                this.color_b = blue;
                this.rgb2hsv();
                this.rgb2hex();
            }
        },

        'h' : function( hue ){
            if( typeof(hue) == 'undefined' ){
                return this.color_h;
            }else{
                if( hue > 359 ){ hue = hue - 360; }
                if( hue < 0   ){ hue = hue + 360; }
                this.color_h = hue;
                this.hsv2rgb();
                this.rgb2hex();
            }
        },
        
        's' : function( sat ){
            if( typeof(sat) == 'undefined' ){
                return this.color_s;
            }else{
                if( sat > 100 ){ sat = 100; }
                if( sat < 0   ){ sat = 0; }
                this.color_s = sat;
                this.hsv2rgb();
                this.rgb2hex();
            }
        },

        'v' : function( val ){
            if( typeof(val) == 'undefined' ){
                return this.color_v;
            }else{
                if( val > 100 ){ val = 100; }
                if( val < 0   ){ val = 0; }
                this.color_v = val;
                this.hsv2rgb();
                this.rgb2hex();
            }
        },

        'hex' : function( hex ){
            if( typeof(hex) == 'undefined' ){
                return this.color_hex;
            }else{
                this.color_hex = hex;
                this.hex2rgb();
                this.rgb2hsv();
            }
        },


        'rgb2hsv' : function(){
            var r = this.color_r / 255; 
            var g = this.color_g / 255;
            var b = this.color_b / 255; // Scale to unity.
            var HSV = {};

            var minVal = Math.min(r, g, b);
            var maxVal = Math.max(r, g, b);
            var delta = maxVal - minVal;

            HSV.v = maxVal;

            if (delta == 0) {
                HSV.h = 0;
                HSV.s = 0;
            } else {
                HSV.s = delta / maxVal;
                var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
                var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
                var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

                if (r == maxVal) {HSV.h = del_B - del_G;}
                else if (g == maxVal) {HSV.h = (1 / 3) + del_R - del_B;}
                else if (b == maxVal) {HSV.h = (2 / 3) + del_G - del_R;}
                
                if (HSV.h < 0) {HSV.h += 1;}
                if (HSV.h > 1) {HSV.h -= 1;}
            }
            HSV.h *= 360;
            HSV.s *= 100;
            HSV.v *= 100;

            this.color_h = HSV.h;
            this.color_s = HSV.s;
            this.color_v = HSV.v;
        },

        'hsv2rgb' : function(){
            var h = this.color_h / 360; 
            var s = this.color_s / 100; 
            var v = this.color_v / 100;
            var RGB = {};
            
            if (s == 0) {
                RGB.r = v * 255;
                RGB.g = v * 255;
                RGB.b = v * 255;
            } else {
                var_h = h * 6;
                var_i = Math.floor(var_h);
                var_1 = v * (1 - s);
                var_2 = v * (1 - s * (var_h - var_i));
                var_3 = v * (1 - s * (1 - (var_h - var_i)));
                
                if (var_i == 0) {var_r = v; var_g = var_3; var_b = var_1}
                else if (var_i == 1) {var_r = var_2; var_g = v; var_b = var_1}
                else if (var_i == 2) {var_r = var_1; var_g = v; var_b = var_3}
                else if (var_i == 3) {var_r = var_1; var_g = var_2; var_b = v}
                else if (var_i == 4) {var_r = var_3; var_g = var_1; var_b = v}
                else {var_r = v; var_g = var_1; var_b = var_2};
                
                RGB.r = var_r * 255;
                RGB.g = var_g * 255;
                RGB.b = var_b * 255;
            }

            this.color_r = RGB.r;
            this.color_g = RGB.g;
            this.color_b = RGB.b;
        },

        'rgb2hex' : function(){
            this.color_hex = "#" + this.hexify(this.color_r) + this.hexify(this.color_g) + this.hexify(this.color_b);
        },

        'hex2rgb' : function(){
            this.color_r = this.decimalize(this.color_hex.substring(1,3));
            this.color_g = this.decimalize(this.color_hex.substring(3,5));
            this.color_b = this.decimalize(this.color_hex.substring(5,7));
        },

        'hexify' : function(number) {
            var digits = '0123456789ABCDEF';
            var lsd = number % 16;
            var msd = (number - lsd) / 16;
            var hexified = digits.charAt(msd) + digits.charAt(lsd);
            return hexified;
        },

        'decimalize' : function(hexNumber) {
            var digits = '0123456789ABCDEF';
            return ((digits.indexOf(hexNumber.charAt(0).toUpperCase()) * 16) + digits.indexOf(hexNumber.charAt(1).toUpperCase()));
        }

    }
};
