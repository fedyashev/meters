// playground requires you to assign document definition to a variable called dd

var dd = {
    pageSize: 'A4',
    pageMargins: [ 60, 30, 30, 30 ],
	content: [
	    {
            table: {
                widths: ['*', 100, '*'],
                body: [
                    [
                        {
                            text: '',
                            border: [0,0,0,0],
                        },
                        {
                            image: 'sampleImage.jpg',
                			width: 100,
                			height: 100,
                            border: [0,0,0,0]
                        },
                        {
                            text: '',
                            border: [0,0,0,0]
                        }
                    ]
                ]
            },
            margin: [0, 0, 0, 30]
	    },
	    {
	        text: 'AKT',
	        bold: true,
	        fontSize: 14,
	        alignment: 'center'
	    },
	    {
	        text: 'приема-передачи электрической энергии',
	        bold: true,
	        fontSize: 14,
	        alignment: 'center',
	        margin: [0, 0, 0, 30]
	    },
        {
            table: {
                widths: [ '35%', '*' ],
                body: [
                    [
                        {
                            border: [false, false, true, true],
                            text: 'Инспектор',
                            alignment: 'right',
                            margin: [0, 5, 10, 5]
                        },
                        {
                            border: [true, false, false, true],
                            text: `ООО "Инстасервис"\n${'Иванов Иван Иванович'}`,
                            alignment: 'center'
                        },
                    ],
                    [
                        {
                            border: [false, false, true, true],
                            text: 'Потребитель',
                            alignment: 'right',
                            margin: [0, 5, 10, 5]
                        },
                        {
                            border: [true, false, false, true],
                            text: `${'ИП Пупкин'}`,
                            alignment: 'center',
                            margin: [0, 5, 0, 5]
                        },
                    ],
                    [
                        {
                            border: [false, false, true, true],
                            text: 'Номер счетчика',
                            alignment: 'right',
                            margin: [0, 5, 10, 5]
                        },
                        {
                            border: [true, false, false, true],
                            text: `№${'1234567890'}`,
                            alignment: 'center',
                            margin: [0, 5, 0, 5]
                        },
                    ],
                    [
                        {
                            border: [false, false, true, true],
                            text: 'Место установки счетчика',
                            alignment: 'right',
                            margin: [0, 5, 10, 5]
                        },
                        {
                            border: [true, false, false, true],
                            text: `Рынок "Северный" ${'Ролет №Г-15'}`,
                            alignment: 'center',
                            margin: [0, 5]
                        },
                    ],
                ]
            },
            margin: [0, 0, 0, 30]
        },
        {
            table: {
                widths: ['35%', '35%', '*'],
                body: [
                    [
                        {
                            text: 'Предыдущие показания',
                            alignment: 'center',
                            margin: [0, 5]
                        },
                        {
                            text: 'Текущие показания',
                            alignment: 'center',
                            margin: [0, 5]
                        },
                        {
                            rowSpan: 4,
                            text: 'Потребление электроэнергии за отчетный период,\nкВтч',
                            alignment: 'center',
                            margin: [0, 40, 0, 0]
                        },
                    ],
                    [
                        {
                            text: 'Дата, время',
                            alignment: 'center'
                        },
                        {
                            text: 'Дата, время',
                            alignment: 'center'
                        },
                    ],
                    [
                        {
                            text: `${'01.01.2019 12:00:00'}`,
                            fontSize: 14,
                            bold: true,
                            alignment: 'center',
                            margin: [30, 5]
                        },
                        {
                            text: `${'01.02.2019 12:00:00'}`,
                            fontSize: 14,
                            bold: true,
                            alignment: 'center',
                            margin: [30, 5]
                        },
                    ],
                    [
                        {
                            text: 'Показания счетчика',
                            alignment: 'center',
                            margin: [0, 5]
                        },
                        {
                            text: 'Показания счетчика',
                            alignment: 'center',
                            margin: [0, 5]
                        },
                    ],
                    [
                        {
                            text: `${958}`,
                            fontSize: 14,
                            bold: true,
                            alignment: 'center',
                            margin: [0, 5]
                        },
                        {
                            text: `${1050}`,
                            fontSize: 14,
                            bold: true,
                            alignment: 'center',
                            margin: [0, 5]
                        },
                        {
                            text: `${92}`,
                            fontSize: 20,
                            bold: true,
                            color: 'red',
                            alignment: 'center',
                            margin: [0, 1]
                            
                        },
                    ],
                ]
            },
            margin: [0, 0]
        },
        {
            table: {
                widths: ['30%', 100, '*'],
                body: [
                    [
                        {
                            text: 'Подпись потребителя',
                            alignment: 'right',
                            border: [0,0,0,0],
                            margin: [0, 85, 0, 0]
                        },
                        {
                            image: 'sampleImage.jpg',
                			width: 100,
                			height: 100,
                            border: [0,0,0,1]
                        },
                        {
                            text: '',
                            border: [0,0,0,0]
                        }
                    ]
                ]
            },
            margin: [0, 0, 0, 90]
        },
        {
            text: 'Обслуживание электрохозяйства',
            alignment: 'right',
            color: 'gray'
        },
        {
            text: 'ООО «Инстасервис»',
            alignment: 'right',
            color: 'gray'
        },
        {
            text: 'instaservice.by',
            link: 'http://instaservice.by',
            alignment: 'right',
            color: 'gray'
        },
        {
            text: '8 (029) 530-51-15',
            alignment: 'right',
            color: 'gray'
        },
	],
}