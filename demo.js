const a = [{
        type: 0,
        label: '姓名',
        key: 'name',
        initVal: 'pdd',
        dataType: 'string',
        rules: [{
            required: false,
            trigger: 'blur',
            message: '输入姓名'
        }]
    },
    {
        type: 0,
        label: '年龄',
        key: 'age',
        initVal: 23,
        dataType: 'number',
        rules: [{
            required: true,
            message: '年龄',
            trigger: 'blur',
        }, {
            message: '输入数字',
            trigger: 'change',
            pattern: /^[0-9]+$/,
        }, {
            trigger: 'change',
            validator: function (rule, value, callback) {
                if (!value) {
                    return callback(new Error("Please enter amount."));
                }
                if (value <= 0) {
                    return callback(new Error("Total amount must be a positive integer."));
                }
                if (value > 150) {
                    return callback(new Error("Total amount can't over 150."));
                }
                callback();
            }
        }]
    },
    {
        type: 1,
        label: '擅长菜',
        key: 'food',
        initVal: [],
        // urlOptions: {
        //     url: './demo.js',
        //     keyName: 'records',
        //     method: 'get'
        // }
        options: [{
                label: '川菜',
                value: 0
            },
            {
                label: '粤菜',
                value: 1
            },
            {
                label: '杭帮菜',
                value: 2
            },
        ]
    },
    {
        type: 1,
        label: '性别',
        key: 'sex',
        initVal: 'male',
        dataType: 'string',
        rules: [{
            required: false,
            message: '年龄',
        }],
        options: [{
                label: '男',
                value: 'male'
            },
            {
                label: '女',
                value: 'female'
            },
        ]
    },
    {
        type: 2,
        label: '特长',
        key: 'skill',
        initVal: [],
        options: [{
                label: '唱',
                value: 0
            },
            {
                label: '跳',
                value: 1
            },
            {
                label: 'rap',
                value: 2
            },
            {
                label: '篮球',
                value: 3
            },
        ]
    },
    {
        type: 3,
        label: '出生日期',
        key: 'birthday',
        initVal: null,
        dateType: 'daterange'
    },
    {
        // index:
        type: 4,
        label: '是否加入会员',
        key: 'isMember',
        initVal: true
    },
    {
        type: 5,
        label: '户口性质',
        key: 'adressType',
        initVal: 0,
        options: [{
                label: '农村',
                value: 0
            },
            {
                label: '城市',
                value: 1
            }
        ]
    },
    {
        type: 0,
        label: '详情',
        key: 'detail',
        initVal: '',
        inputType: 'textarea',
        maxlength: 1000
    },
]

export default a