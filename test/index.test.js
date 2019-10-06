const babel = require('@babel/core');
const plugin = require('../src/index.js');

const example1 = `
    const component = {
        templateUrl: "header.component.html",
        styleUrls: ["header.component.css", "header1.component.css"]
    };
`;

const example1Match = 'const component = {\n' +
'  template: require("header.component.html").default,\n' +
'  styles: [require("header.component.css").default, require("header1.component.css").default]\n' +
'};';

const plugins = [
    plugin
];

it('should adds require call', () => {
    const { code } = babel.transform(example1, { plugins });
    expect(code).toBe(example1Match);
});