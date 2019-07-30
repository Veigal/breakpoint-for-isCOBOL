"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate() {
    vscode.commands.registerCommand("extension.breakpointIsCOBOL", () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("Open a file first to make a breakpoint");
            return;
        }
        const selection = editor.selection;
        if (selection.isEmpty) {
            if (selectWord(editor)) {
                let breakp = editor.document.getText(editor.selection);
                breakp = 'br ' + breakp + ' ' + editor.document.fileName;
                vscode.env.clipboard.writeText(breakp);
            }
        }
        else {
            vscode.commands.executeCommand("editor.action.clipboardCopyAction");
        }
    });
    function selectWord(editor) {
        const selection = editor.selection;
        const doc = editor.document;
        if (selection.isEmpty) {
            const cursorWordRange = doc.getWordRangeAtPosition(selection.active);
            if (cursorWordRange) {
                const newSe = new vscode.Selection(cursorWordRange.start.line, cursorWordRange.start.character, cursorWordRange.end.line, cursorWordRange.end.character);
                editor.selection = newSe;
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map