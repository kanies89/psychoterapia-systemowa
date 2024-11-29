module.exports = {
    jsx: {
        babelConfig: {
            plugins: [
                // Example: Remove 'id' attribute from svg elements
                [
                    '@svgr/babel-plugin-remove-jsx-attribute',
                    {
                        elements: ['svg'], // Apply only to svg elements
                        attributes: ['id'], // Remove 'id' attribute
                    },
                ],
                // Example: Replace 'fill' color dynamically
                [
                    '@svgr/babel-plugin-replace-jsx-attribute-value',
                    {
                        replace: {
                            fill: '#3498db', // Replace 'fill' color with default value
                            stroke: '#e74c3c', // Replace 'stroke' color
                        },
                    },
                ],
            ],
        },
    },
};
