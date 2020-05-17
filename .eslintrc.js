// Run 'npm i -g eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks  @typescript-eslint/parser @typescript-eslint/eslint-plugin
module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        },
        react: {
            version: 'detect'
        }
    },
    plugins: ['import', 'react', 'react-hooks', '@typescript-eslint'],
    rules: {
        // Common errors
        'for-direction': 'error',
        'getter-return': ['error', {allowImplicit: true}],
        'no-async-promise-executor': 'error',
        'no-await-in-loop': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-console': 'warn',
        'no-constant-condition': 'warn',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-dupe-args': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty': 'error',
        'no-empty-character-class': 'error',
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-semi': 'error',
        'no-func-assign': 'error',
        'no-inner-declarations': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-misleading-character-class': 'error',
        'no-obj-calls': 'error',
        'no-prototype-builtins': 'error',
        'no-regex-spaces': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-negated-in-lhs': 'off',
        'require-atomic-updates': 'off',
        'use-isnan': 'error',
        'valid-jsdoc': 'off',
        'valid-typeof': ['error', {requireStringLiterals: true}],

        // Es6
        'arrow-body-style': ['error', 'as-needed', {requireReturnForObjectLiteral: false}],
        'arrow-parens': ['warn', 'as-needed' /** , {requireForBlockBody: true} https://github.com/typescript-eslint/typescript-eslint/issues/14 **/ ],
        'arrow-spacing': ['error', {before: true, after: true}],
        'constructor-super': 'error',
        'generator-star-spacing': ['error', {before: false, after: true}],
        'no-class-assign': 'error',
        'no-confusing-arrow': ['error', {allowParens: true}],
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-duplicate-imports': 'error',
        'no-new-symbol': 'error',
        'no-restricted-imports': ['off', {paths: [], patterns: []}],
        'no-this-before-super': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': ['error', {
            ignoreDestructuring: false,
            ignoreImport: false,
            ignoreExport: false
        }],
        'no-var': 'error',
        'object-shorthand': ['error', 'always', {
            ignoreConstructors: false,
            avoidQuotes: true
        }],
        'prefer-arrow-callback': ['error', {
            allowNamedFunctions: false,
            allowUnboundThis: true
        }],
        'prefer-const': ['error', {
            destructuring: 'any',
            ignoreReadBeforeAssign: true
        }],
        'prefer-destructuring': ['error', {
            VariableDeclarator: {
                array: false,
                object: true
            },
            AssignmentExpression: {
                array: true,
                object: false
            }
        }, {
            enforceForRenamedProperties: false
        }],
        'prefer-numeric-literals': 'error',
        'prefer-reflect': 'off',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'require-yield': 'error',
        'rest-spread-spacing': ['error', 'never'],
        'sort-imports': ['off', { // Import plugin rules
            ignoreCase: false,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
        }],
        'symbol-description': 'error',
        'template-curly-spacing': 'error',
        'yield-star-spacing': ['error', 'after'],

        // Node
        'callback-return': 'off',
        'global-require': 'error',
        'handle-callback-err': 'off',
        'no-buffer-constructor': 'error',
        'no-mixed-requires': ['off', false],
        'no-new-require': 'error',
        'no-path-concat': 'error',
        'no-process-env': 'off',
        'no-process-exit': 'off',
        'no-restricted-modules': 'off',
        'no-sync': 'off',

        // Style
        'array-bracket-newline': ['warn', 'consistent'],
        'array-element-newline': ['warn', 'consistent'],
        'array-bracket-spacing': ['warn', 'never'],
        'block-spacing': ['warn', 'always'],
        'brace-style': ['warn', '1tbs', {allowSingleLine: true}],
        camelcase: ['warn', {
            properties: 'never',
            ignoreDestructuring: false
        }],
        'capitalized-comments': ['warn', 'always', {
            line: {
                ignorePattern: '',
                ignoreInlineComments: true,
                ignoreConsecutiveComments: true
            },
            block: {
                ignorePattern: '',
                ignoreInlineComments: true,
                ignoreConsecutiveComments: true
            }
        }],
        'comma-dangle': ['warn', {
            arrays: 'never',
            objects: 'never',
            imports: 'never',
            exports: 'never',
            functions: 'never'
        }],
        'comma-spacing': ['warn', {
            before: false,
            after: true
        }],
        'comma-style': ['warn', 'last', {
            exceptions: {
                ArrayExpression: false,
                ArrayPattern: false,
                ArrowFunctionExpression: false,
                CallExpression: false,
                FunctionDeclaration: false,
                FunctionExpression: false,
                ImportDeclaration: false,
                ObjectExpression: false,
                ObjectPattern: false,
                VariableDeclaration: false,
                NewExpression: false
            }
        }],
        'computed-property-spacing': ['warn', 'never'],
        'consistent-this': 'off',
        'eol-last': ['warn', 'never'],
        'func-call-spacing': ['warn', 'never'],
        'func-name-matching': ['off', 'always', {
            includeCommonJSModuleExports: false,
            considerPropertyDescriptor: true
        }],
        'func-names': 'warn',
        'func-style': ['off', 'expression'],
        'function-paren-newline': ['warn', 'multiline-arguments'],
        'id-blacklist': 'off',
        'id-length': ['warn', {
            max: 25,
            min: 3,
            exceptions: ['id', 'x', 'y']
        }],
        'id-match': 'off',
        'implicit-arrow-linebreak': ['off', 'beside'],
        indent: ['warn', 4, {
            ArrayExpression: 1,
            CallExpression: {arguments: 1},
            flatTernaryExpressions: false,
            FunctionDeclaration: {parameters: 1, body: 1},
            FunctionExpression: {parameters: 1, body: 1},
            ignoreComments: false,
            ImportDeclaration: 1,
            ObjectExpression: 1,
            outerIIFEBody: 1,
            MemberExpression: 1,
            SwitchCase: 1,
            VariableDeclarator: 'first'
        }],
        'key-spacing': ['warn', {beforeColon: false, afterColon: true, mode: 'strict'}],
        'keyword-spacing': ['warn', {
            after: true,
            before: true,
            overrides: {
                return: {
                    after: true
                },
                throw: {
                    after: true
                },
                case: {
                    after: true
                }
            }
        }],
        'line-comment-position': ['off', {
            applyDefaultPatterns: true,
            ignorePattern: '',
            position: 'above'
        }],
        'linebreak-style': ['warn', 'unix'],
        'lines-between-class-members': ['warn', 'always', {exceptAfterSingleLine: false}],
        'lines-around-comment': 'off',
        'lines-around-directive': ['warn', {before: 'always', after: 'always'}],
        'max-depth': ['off', 4],
        'max-len': ['warn', 100, 2, {
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreUrls: true
        }],
        'max-lines': ['warn', {
            max: 150,
            skipBlankLines: true,
            skipComments: true
        }],
        'max-lines-per-function': ['off', {
            IIFEs: true,
            max: 30,
            skipBlankLines: true,
            skipComments: true
        }],
        'max-nested-callbacks': 'off',
        'max-params': ['off', 3],
        'max-statements': ['warn', 20],
        'max-statements-per-line': ['warn', {max: 1}],
        'multiline-comment-style': ['warn', 'starred-block'],
        'multiline-ternary': ['warn', 'always-multiline'],
        'new-cap': ['error', {
            capIsNew: false,
            capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
            newIsCap: true,
            newIsCapExceptions: []
        }],
        'new-parens': 'warn',
        'newline-after-var': 'off',
        'newline-before-return': 'warn',
        'newline-per-chained-call': ['warn', {ignoreChainWithDepth: 3}],
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-continue': 'error',
        'no-inline-comments': 'off',
        'no-lonely-if': 'error',
        'no-mixed-operators': ['warn', {
            allowSamePrecedence: false,
            groups: [['%', '**'], ['%', '+'], ['%', '-'], ['%', '*'], ['%', '/'], ['/', '*'], ['&', '|', '<<', '>>', '>>>'], ['==', '!=', '===', '!=='], ['&&', '||']]
        }],
        'no-mixed-spaces-and-tabs': 'warn',
        'no-multi-assign': ['warn'],
        'no-multiple-empty-lines': ['warn', {max: 2, maxBOF: 0, maxEOF: 0}],
        'no-negated-condition': 'warn',
        'no-nested-ternary': 'error',
        'no-new-object': 'warn',
        'no-plusplus': 'off',
        'no-restricted-syntax': ['warn', {
            selector: 'ForInStatement',
            message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
        }, {
            selector: 'ForOfStatement',
            message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.'
        }, {
            selector: 'LabeledStatement',
            message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
        }, {
            selector: 'WithStatement',
            message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
        }],
        'no-spaced-func': 'warn',
        'no-tabs': 'warn',
        'no-ternary': 'off',
        'no-trailing-spaces': ['warn', {skipBlankLines: false, ignoreComments: false}],
        'no-underscore-dangle': ['warn', {
            allow: [],
            allowAfterThis: true,
            allowAfterSuper: false,
            enforceInMethodNames: true
        }],
        'no-unneeded-ternary': ['warn', {defaultAssignment: false}],
        'no-whitespace-before-property': 'warn',
        'nonblock-statement-body-position': ['warn', 'beside', {overrides: {}}],
        'object-curly-spacing': ['warn', 'never'],
        'object-curly-newline': ['warn', {consistent: true, multiline: true}],
        'object-property-newline': ['warn', {allowAllPropertiesOnSameLine: true}],
        'one-var': ['warn', 'consecutive'],
        'one-var-declaration-per-line': ['warn', 'always'],
        'operator-assignment': ['warn', 'always'],
        'operator-linebreak': ['warn', 'before', {
            overrides: {
                '=': 'none'
            }
        }],
        'padded-blocks': ['warn', {
            blocks: 'never',
            classes: 'always',
            switches: 'never'
        }, {
            allowSingleLineBlocks: true
        }],
        'padding-line-between-statements': 'off',
        'prefer-object-spread': 'warn',
        'quote-props': ['warn', 'as-needed', {
            keywords: false,
            unnecessary: true,
            numbers: false
        }],
        quotes: ['warn', 'single', {avoidEscape: true}],
        'require-jsdoc': 'off',
        semi: ['error', 'always'],
        'semi-spacing': ['warn', {before: false, after: true}],
        'semi-style': ['warn', 'last'],
        'sort-keys': ['off', 'asc', {caseSensitive: false, natural: true}],
        'sort-vars': 'off',
        'space-before-blocks': 'warn',
        'space-before-function-paren': ['warn', {anonymous: 'always', named: 'never', asyncArrow: 'always'}],
        'space-in-parens': ['warn', 'never'],
        'space-infix-ops': 'warn',
        'space-unary-ops': ['warn', {words: true, nonwords: false, overrides: {}}],
        'spaced-comment': ['warn', 'always', {
            line: {
                exceptions: ['-', '+'],
                markers: ['=', '!'] // Space here to support sprockets directives
            },
            block: {
                exceptions: ['-', '+'],
                markers: ['=', '!', ':', '::'], // Space here to support sprockets directives and flow comment types
                balanced: true
            }
        }],
        'switch-colon-spacing': ['warn', {after: true, before: false}],
        'template-tag-spacing': ['warn', 'never'],
        'unicode-bom': ['warn', 'never'],
        'wrap-regex': 'off',

        // Variables
        'init-declarations': 'off',
        'no-catch-shadow': 'off',
        'no-delete-var': 'error',
        'no-label-var': 'error',
        'no-restricted-globals': ['error', 'isFinite', 'isNaN'],
        'no-shadow': 'warn',
        'no-shadow-restricted-names': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'warn',
        'no-unused-vars': ['error', {vars: 'all', args: 'after-used', ignoreRestSiblings: true}],
        'no-use-before-define': ['error', {functions: true, classes: true, variables: true}],

        // Best-practices
        'accessor-pairs': 'off',
        'array-callback-return': ['error', {allowImplicit: true}],
        'block-scoped-var': 'error',
        complexity: ['off', 11],
        'class-methods-use-this': ['warn', {exceptMethods: []}],
        'consistent-return': 'error',
        curly: ['error', 'multi-line'],
        'default-case': ['error', {commentPattern: '^no default$'}],
        'dot-notation': ['error', {allowKeywords: true}],
        'dot-location': ['error', 'property'],
        eqeqeq: ['error', 'always', {null: 'ignore'}],
        'guard-for-in': 'error',
        'max-classes-per-file': ['warn', 1],
        'no-alert': 'warn',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-div-regex': 'off',
        'no-else-return': ['error', {allowElseIf: false}],
        'no-empty-function': ['error', {allow: ['arrowFunctions', 'functions', 'methods']}],
        'no-empty-pattern': 'error',
        'no-eq-null': 'off',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-fallthrough': 'error',
        'no-floating-decimal': 'error',
        'no-global-assign': ['error', {exceptions: []}],
        'no-native-reassign': 'off',
        'no-implicit-coercion': ['off', {
            boolean: false,
            number: true,
            string: true,
            allow: []
        }],
        'no-implicit-globals': 'warn',
        'no-implied-eval': 'error',
        'no-invalid-this': 'off',
        'no-iterator': 'error',
        'no-labels': ['error', {allowLoop: false, allowSwitch: false}],
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': ['warn', {
            ignore: [-1, 0, 1],
            ignoreArrayIndexes: true,
            enforceConst: true,
            detectObjects: false
        }],
        'no-multi-spaces': ['error', {ignoreEOLComments: false}],
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': ['warn', {
            props: true,
            ignorePropertyModificationsFor: [
                'e', // For e.returnvalue
                'ctx', // For Koa routing
                'req', // For Express requests
                'request', // For Express requests
                'res', // For Express responses
                'response', // For Express responses
                '$scope', // For Angular 1 scopes
                'staticContext' // For ReactRouter context
            ]
        }],
        'no-proto': 'error',
        'no-redeclare': 'error',
        'no-restricted-properties': ['error', {
            object: 'arguments',
            property: 'callee',
            message: 'arguments.callee is deprecated'
        }, {
            object: 'global',
            property: 'isFinite',
            message: 'Please use Number.isFinite instead'
        }, {
            object: 'self',
            property: 'isFinite',
            message: 'Please use Number.isFinite instead'
        }, {
            object: 'window',
            property: 'isFinite',
            message: 'Please use Number.isFinite instead'
        }, {
            object: 'global',
            property: 'isNaN',
            message: 'Please use Number.isNaN instead'
        }, {
            object: 'self',
            property: 'isNaN',
            message: 'Please use Number.isNaN instead'
        }, {
            object: 'window',
            property: 'isNaN',
            message: 'Please use Number.isNaN instead'
        }, {
            property: '__defineGetter__',
            message: 'Please use Object.defineProperty instead.'
        }, {
            property: '__defineSetter__',
            message: 'Please use Object.defineProperty instead.'
        }, {
            object: 'Math',
            property: 'pow',
            message: 'Use the exponentiation operator (**) instead.'
        }],
        'no-return-assign': ['error', 'always'],
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-assign': ['error', {props: true}],
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'off',
        'no-unused-expressions': ['error', {allowShortCircuit: false, allowTernary: false, allowTaggedTemplates: false}],
        'no-unused-labels': 'error',
        'no-useless-call': 'off',
        'no-useless-catch': 'error',
        'no-useless-concat': 'error',
        'no-useless-escape': 'error',
        'no-useless-return': 'error',
        'no-void': 'error',
        'no-warning-comments': ['warn', {terms: ['todo', 'fixme', 'xxx'], location: 'start'}],
        'no-with': 'error',
        'prefer-promise-reject-errors': ['error', {allowEmptyReject: true}],
        'prefer-named-capture-group': 'off',
        radix: 'error',
        'require-await': 'off',
        'require-unicode-regexp': 'off',
        'vars-on-top': 'error',
        'wrap-iife': ['error', 'outside', {functionPrototypeMethods: false}],
        yoda: 'error',

        // Import
        'import/default': 'warn',
        'import/dynamic-import-chunkname': ['off', {importFunctions: [], webpackChunknameFormat: '[0-9a-zA-Z-_/.]+'}],
        'import/export': 'error',
        'import/extensions': ['warn', 'never', {
            js: 'never',
            jsx: 'never'
        }],
        'import/exports-last': 'off',
        'import/first': 'warn',
        'import/group-exports': 'off',
        'import/max-dependencies': ['warn', {max: 10}],
        'import/named': 'error',
        'import/namespace': 'error',
        'import/newline-after-import': 'warn',
        'import/no-absolute-path': 'warn',
        'import/no-anonymous-default-export': ['off', {
            allowArray: false,
            allowArrowFunction: false,
            allowAnonymousClass: false,
            allowAnonymousFunction: false,
            allowLiteral: false,
            allowObject: false
        }],
        'import/no-amd': 'error',
        'import/no-commonjs': 'off',
        'import/no-cycle': ['error', {maxDepth: 3}],
        'import/no-default-export': 'off',
        'import/no-deprecated': 'off',
        'import/no-duplicates': 'error',
        'import/no-dynamic-require': 'error',
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: [
                'example/**', // Example folder
                'test/**', // Tape, common npm pattern
                'tests/**', // Also common npm pattern
                'spec/**', // Mocha, rspec-like pattern
                '**/__tests__/**', // Jest pattern
                '**/__mocks__/**', // Jest pattern
                'test.{js,jsx}', // Repos with a single test file
                'test-*.{js,jsx}', // Repos with multiple top-level test files
                '**/*{.,_}{test,spec}.{js,jsx}', // Tests where the extension or filename suffix denotes that it is a test
                '**/jest.config.js', // Jest config
                '**/jest.setup.js', // Jest setup
                '**/vue.config.js', // Vue-cli config
                '**/webpack.config.js', // Webpack config
                '**/webpack.config.*.js', // Webpack config
                '**/rollup.config.js', // Rollup config
                '**/rollup.config.*.js', // Rollup config
                '**/gulpfile.js', // Gulp config
                '**/gulpfile.*.js', // Gulp config
                '**/Gruntfile{,.js}' // Grunt config
            ],
            optionalDependencies: true
        }],
        'import/no-internal-modules': ['off', {allow: []}],
        'import/no-mutable-exports': 'error',
        'import/no-named-as-default-member': 'error',
        'import/no-named-as-default': 'error',
        'import/no-named-default': 'warn',
        'import/no-named-export': 'off',
        'import/no-namespace': 'off',
        'import/no-nodejs-modules': 'off',
        'import/no-relative-parent-imports': 'off',
        'import/no-restricted-paths': 'off',
        'import/no-self-import': 'error',
        'import/no-unassigned-import': 'off',
        'import/no-unused-modules': ['warn', {
            missingExports: false,
            ignoreExports: ['src'],
            unusedExports: true
        }],
        'import/no-unresolved': ['error', {commonjs: true, caseSensitive: true}],
        'import/no-useless-path-segments': ['error', {commonjs: true, noUselessIndex: true}],
        'import/no-webpack-loader-syntax': 'error',
        'import/order': ['warn', {
            alphabetize: {
                order: 'asc',
                caseInsensitive: true
            },
            groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
            'newlines-between': 'ignore'
        }],
        'import/prefer-default-export': 'warn',
        'import/unambiguous': 'off',

        // React
        'jsx-quotes': ['warn', 'prefer-double'],
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react/boolean-prop-naming': 'off',
        'react/button-has-type': 'error',
        'react/default-props-match-prop-types': 'error',
        'react/destructuring-assignment': 'off',
        'react/display-name': 'off',
        'react/forbid-component-props': 'error',
        'react/forbid-dom-props': 'off',
        'react/forbid-elements': 'off',
        'react/forbid-foreign-prop-types': 'off',
        'react/forbid-prop-types': 'off',
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-child-element-spacing': 'off',
        'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
        'react/jsx-closing-tag-location': 'warn',
        'react/jsx-curly-brace-presence': ['warn', 'never'],
        'react/jsx-curly-newline': 'warn',
        'react/jsx-curly-spacing': ['warn', 'never', {allowMultiline: true}],
        'react/jsx-equals-spacing': ['warn', 'never'],
        'react/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-handler-names': ['error', {eventHandlerPrefix: 'handle', eventHandlerPropPrefix: 'on'}],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-indent': ['warn', 4],
        'react/jsx-key': 'error',
        'react/jsx-max-props-per-line': ['error', {maximum: 3, when: 'multiline'}],
        'react/jsx-no-bind': ['error', {allowArrowFunctions: false, allowBind: false, ignoreRefs: false}],
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-literals': 'off',
        'react/jsx-no-target-blank': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-pascal-case': 'error',
        'react/jsx-props-no-multi-spaces': 'warn',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-sort-default-props': ['warn', {ignoreCase: true}],
        'react/jsx-sort-props': 'warn',
        'react/jsx-tag-spacing': ['warn', {afterOpening: 'never', beforeClosing: 'never', beforeSelfClosing: 'always', closingSlash: 'never'}],
        'react/jsx-uses-react': 'warn',
        'react/jsx-uses-vars': 'warn',
        'react/jsx-wrap-multilines': 'off',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'error',
        'react/no-children-prop': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-danger': 'error',
        'react/no-deprecated': 'error',
        'react/no-did-mount-set-state': 'error',
        'react/no-did-update-set-state': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-multi-comp': 'warn',
        'react/no-redundant-should-component-update': 'error',
        'react/no-set-state': 'off',
        'react/no-string-refs': 'error',
        'react/no-this-in-sfc': 'error',
        'react/no-typos': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',
        'react/no-unsafe': 'error',
        'react/no-unused-prop-types': 'error',
        'react/no-unused-state': 'error',
        'react/no-will-update-set-state': 'error',
        'react/prefer-es6-class': 'error',
        'react/prefer-read-only-props': 'warn',
        'react/prefer-stateless-function': ['warn', {ignorePureComponents: true}],
        'react/prop-types': ['error', {ignore: ['children']}],
        'react/react-in-jsx-scope': 'error',
        'react/require-default-props': ['error', {ignoreFunctionalComponents: true}],
        'react/require-render-return': 'error',
        'react/self-closing-comp': 'error',
        'react/sort-comp': ['warn', {
            order: [
                'static-variables',
                'static-methods',
                'instance-variables',
                'lifecycle',
                'everything-else',
                'render'
            ]
        }],
        'react/sort-prop-types': ['warn', {ignoreCase: true, requiredFirst: false}],
        'react/state-in-constructor': ['error', 'never'],
        'react/static-property-placement': 'error',
        'react/style-prop-object': 'error',
        'react/void-dom-elements-no-children': 'error',

        // type script
        "@typescript-eslint/no-extra-parens": ['warn', 'all', {
            conditionalAssign: true,
            nestedBinaryExpressions: false,
            ignoreJSX: 'all',
            enforceForArrowConditionals: false
        }]
    }
};