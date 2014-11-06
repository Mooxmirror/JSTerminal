var Terminal = Terminal || {};
Terminal.keySet = function(e) {
    // ---------------------- WARNING ----------------------------------------
    // I recommend to override this function
    // The keys only worked for my PC
    // Please test it on yours and create a '[keyboard-setup]-keyset.js' file
    // -----------------------------------------------------------------------
    switch (e.keyCode) {
        case 8:
            Terminal.data[Terminal.cursor.Y][Terminal.cursor.X] = "";
            Terminal.moveCursor(1);
            break;
        case 9:
            for (var j = 0; j < 4; j++) {
                if (Terminal.cursor.X >= Terminal.cols) {
                    break;
                }
                Terminal.insert(" ", Terminal.cursor.X, Terminal.cursor.Y);
                Terminal.moveCursor(0);
            }
        case 37:
            Terminal.moveCursor(1);
            break;
        case 38:
            Terminal.moveCursor(3);
            break;
        case 39:
            Terminal.moveCursor(0);
            break;
        case 40:
            Terminal.moveCursor(2);
            break;
        case 16:
            break;
        case 17:
            break;
        case 18:
            break;
        case 13:
            Terminal.moveCursor(2);
            Terminal.cursor.X = 0;
            break;
        default:
            var char = String.fromCharCode(e.keyCode);

            if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
                switch (e.keyCode) {
                    case 191:
                        char = "#";
                        break;
                    case 188:
                        char = ",";
                        break;
                    case 190:
                        char = ".";
                        break;
                    case 189:
                        char = "-";
                        break;
                    case 226:
                        char = "<";
                        break;
                    case 187:
                        char = "+";
                        break;
                    case 221:
                        char = "´";
                        break;
                    case 220:
                        char = "^";
                        break;
                    default:
                        char = char.toLowerCase();
                        break;
                }
            } else if (e.shiftKey && !e.ctrlKey && !e.altKey) {
                switch(e.keyCode) {
                    case 48: // SHIFT+0
                        char = "=";
                        break;
                    case 49: // SHIFT+1
                        char = "!";
                        break;
                    case 50:
                        char = "\"";
                        break;
                    case 51:
                        char = "^";
                        break;
                    case 52:
                        char ="$";
                        break;
                    case 53:
                        char ="%";
                        break;
                    case 54:
                        char = "&";
                        break;
                    case 55:
                        char ="/";
                        break;
                    case 56:
                        char = "(";
                        break;
                    case 57:
                        char = ")";
                        break;
                    case 191:
                        char ="'";
                        break;
                    case 188:
                        char = ";";
                        break;
                    case 190:
                        char = ":";
                        break;
                    case 189:
                        char = "_";
                        break;
                    case 226:
                        char =">";
                        break;
                    case 187:
                        char = "*";
                        break;
                    case 221:
                        char = "`";
                        break;
                    case 220:
                        char = "°";
                        break;
                }
            } else if (e.ctrlKey && e.altKey) {
                switch (e.keyCode) {
                    case 55:
                        char = "{";
                        break;
                    case 56:
                        char ="[";
                        break;
                    case 57:
                        char = "]";
                        break;
                    case 48:
                        char ="}";
                        break;
                    case 187:
                        char = "~";
                        break;
                    case 81:
                        char = "@";
                        break;
                    case 69:
                        char ="€";
                        break;
                    case 226:
                        char = "|";
                        break;
                }
            }
            Terminal.insert(char, Terminal.cursor.X, Terminal.cursor.Y);
            Terminal.moveCursor(0);
            e.preventDefault();
    }
}
