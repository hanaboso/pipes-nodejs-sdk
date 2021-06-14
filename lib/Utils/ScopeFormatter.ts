export const COMMA = ',';
export const SPACE = ' ';

export class ScopeFormatter {
    static getScopes(scopes: string[], separator: string = COMMA) {
        if (scopes.length === 0) {
            return '';
        }
        return '&scope=' + scopes.join(separator);
    }
}
