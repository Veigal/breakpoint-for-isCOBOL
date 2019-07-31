import * as vscode from "vscode";

export function activate() { 

    vscode.commands.registerCommand("extension.breakpointIsCOBOL", () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
          vscode.window.showInformationMessage("Open a file first to make a breakpoint");
          return;
        }

        const selection = editor.selection;
        if (selection.isEmpty) {
            if (selectWord(editor)) {
                let paragraphName = editor.document.getText(editor.selection);
                let programName = editor.document.fileName.split('\\');
                let bp = 'br ' + paragraphName + ' ' + programName[programName.length -1];
                vscode.env.clipboard.writeText(bp);
            }
        } else {
            vscode.commands.executeCommand("editor.action.clipboardCopyAction");
        }
    });
    
    function selectWord(editor: vscode.TextEditor): boolean {
        const selection = editor.selection;
        const doc = editor.document;
        if (selection.isEmpty) {
            const cursorWordRange = doc.getWordRangeAtPosition(selection.active);
            
            if (cursorWordRange) {
                const newSe = new vscode.Selection(cursorWordRange.start.line, cursorWordRange.start.character, cursorWordRange.end.line, cursorWordRange.end.character);
                editor.selection = newSe;
                return true;
                
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

}
