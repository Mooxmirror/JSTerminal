var Terminal = Terminal || {};

function initTerminal(element) {
    "use strict";
    Terminal.context = element.getContext("2d");
    Terminal.cursor = {
        X: 0,
        Y: 0
    }
    Terminal.cols = 100;
    Terminal.rows = 31;
    Terminal.fontSize = 16;
    Terminal.data = (function() {
        var yArr = [];
        for (var i = 0; i < Terminal.rows; i++) {
            var xArr = [];
            for (var j = 0; j < Terminal.cols; j++) {
                xArr.push("");
            }
            yArr.push(xArr);
        }
        return yArr;
    })();
    Terminal.render = function() {
        Terminal.context.fillStyle = "black";
        Terminal.context.fillRect(0, 0, Terminal.fontSize * Terminal.cols / 2, Terminal.fontSize * Terminal.rows * 1.2);
        // Setting up console font
        Terminal.context.font = Terminal.fontSize + "px monospace";
        Terminal.context.textAlign = "left";
        Terminal.context.textBaseline = "top";
        Terminal.context.fillStyle = "white";

        for (var y = 0; y < Terminal.data.length; y++) {
            for (var x = 0; x < Terminal.data[y].length; x++) {
                Terminal.context.fillText(Terminal.data[y][x], Terminal.fontSize * x / 2, y * Terminal.fontSize * 1.2);
            }
        }

        Terminal.invertRegion(Terminal.cursor.X * Terminal.fontSize / 2, Terminal.cursor.Y * Terminal.fontSize * 1.2, Terminal.fontSize / 2, Terminal.fontSize * 1.2);
    };
    Terminal.invertRegion = function(x,y,width,height) {
        var imageData = Terminal.context.getImageData(x,y,width,height);
        for (var i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i    ] = 255 - imageData.data[i    ];
            imageData.data[i + 1] = 255 - imageData.data[i + 1];
            imageData.data[i + 2] = 255 - imageData.data[i + 2];
            imageData.data[i + 3] = 255;
        }
        Terminal.context.putImageData(imageData, x, y);
    }
    Terminal.moveCursor = function(d) {
        switch(d) {
            case 0:
                if (Terminal.cursor.X < Terminal.data[Terminal.cursor.Y].length - 1) {
                    Terminal.cursor.X++;
                } else if (Terminal.cursor.Y < Terminal.data.length - 1){
                    Terminal.cursor.X = 0;
                    Terminal.cursor.Y++;
                }
                break;
            case 1:
                if (Terminal.cursor.X > 0) {
                    Terminal.cursor.X--;
                } else if (Terminal.cursor.Y > 0){
                    Terminal.cursor.X = Terminal.data[Terminal.cursor.Y].length - 1;
                    Terminal.cursor.Y--;
                }
                break;
            case 2:
                if (Terminal.cursor.Y < Terminal.data.length - 1) {
                    Terminal.cursor.Y++;
                }
                break;
            case 3:
                if (Terminal.cursor.Y > 0) {
                    Terminal.cursor.Y--;
                }
                break;
        };
    };
    Terminal.insert = function(c, x, y) {
        Terminal.data[y].splice(x, 1, c);
    }
    Terminal.keyDown = function(e) {
        Terminal.keySet(e);
        Terminal.render();
    }
    Terminal.print = function(e) {
        for (var j = 0; j < e.length; j++) {
            Terminal.insert(e.charAt(j), Terminal.cursor.X, Terminal.cursor.Y);
            Terminal.moveCursor(0);
        }
        Terminal.render();
    }
    Terminal.newLine = function() {
        Terminal.moveCursor(2);
        Terminal.cursor.X = 0;
        Terminal.render();
    }
    String.prototype.splice = function( idx, rem, s ) {
        return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
    };
    window.addEventListener("keydown", Terminal.keyDown);
    Terminal.render();
}
