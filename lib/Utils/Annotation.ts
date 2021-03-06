export default class Annotation {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    public static getAllMethods = (inputInstance: any): string[] => {
      let props: string[] = [];
      let obj = inputInstance;
      do {
        const inLoopObj = obj;
        const inLoopProps = props;
        const listOfPropertyNames = Object.getOwnPropertyNames(obj)
          .concat(Object.getOwnPropertySymbols(obj).map((s) => s.toString()))
          .sort()
          .filter(
            (p, i, arr) => typeof inLoopObj[p] === 'function' // only the methods
                        && inLoopObj[p].name.toLowerCase().startsWith('sync')
                        && p !== 'constructor' // not the constructor
                        && (i === 0 || p !== arr[i - 1]) // not overriding in this prototype
                        && inLoopProps.indexOf(p) === -1,
            // not overridden in a child
          );
        props = props.concat(Annotation._formatSyncMethodName(listOfPropertyNames));
        obj = Object.getPrototypeOf(obj);// walk-up the prototype chain
      }
      while (obj && Object.getPrototypeOf(obj)); // not the the Object prototype methods (hasOwnProperty, etc...)

      return props;
    }

    private static _formatSyncMethodName = (input: string[]): string[] => {
      const formattedInput: string[] = [];
      input.forEach((method) => {
        if (method.length > 4) {
          formattedInput.push(method.substr(4).charAt(0).toLowerCase() + method.slice(5));
        }
      });
      return formattedInput;
    }
}
