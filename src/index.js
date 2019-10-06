const t = require("@babel/core").types;

module.exports = function() {
    return {
        visitor: {
            ObjectProperty(nodePath) {
                let { key: propKey, value: propValue } = nodePath.node;
                if (propKey.name == 'templateUrl') {
                    try {
                        nodePath.replaceWith(
                            t.objectProperty(
                                t.identifier('template'),
                                t.memberExpression(
                                    t.callExpression(t.identifier('require'), [ propValue ]),
                                    t.identifier('default')
                                )
                            )
                        );
                    } catch(e) {
                        console.error(`Error: ${e}`);
                    }
                } else if (propKey.name == 'styleUrls') {
                    try {
                        nodePath.replaceWith(
                            t.objectProperty(
                                t.identifier('styles'),
                                t.arrayExpression(
                                    propValue.elements.map(element => 
                                        t.memberExpression(
                                            t.callExpression(t.identifier('require'), [ element ]),
                                            t.identifier('default')
                                        )   
                                    )
                                )
                            )
                        );
                    } catch(e) {
                        console.error(`Error: ${e}`);
                    }
                }
            }
        }
    };
};