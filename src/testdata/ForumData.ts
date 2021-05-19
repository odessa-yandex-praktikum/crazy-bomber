const users = [
    {id: 1, img: 'https://freesvg.org/img/1514826571.png', login: 'user1', score: 123},
    {id: 2, img: 'https://freesvg.org/img/1514826571.png', login: 'user2', score: 229},
    {id: 3, img: 'https://freesvg.org/img/1514826571.png', login: 'user3', score: 111},
    {id: 4, img: 'https://freesvg.org/img/1514826571.png', login: 'user4', score: 228},
    {id: 5, img: 'https://freesvg.org/img/1514826571.png', login: 'user5', score: 109},
];
export const discussions = [
    {
        id: 111,
        topic: 'How to achieve 1000000 score?',
        author: users[0],
        //test Date object
        created: Date.parse('Sun, 16 May 2021 15:43:00'),
        votes: 5,
        messages: [
            {
                message:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nib, consectetuer adipiscing em nonummy nib, conse sed diam nonummy nib, consectetuer adipiscing em nonummy nib, conse',
                author: users[0],
                created: Date.parse('Sun, 16 May 2021 15:43:00'),
            },
            {
                message:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nib',
                author: users[1],
                created: Date.parse('Sun, 16 May 2021 15:47:00'),
            },
            {
                message:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nib, consectetuer adipiscing em nonummy nib, conse',
                author: users[0],
                created: Date.parse('Sun, 16 May 2021 15:56:00'),
            },
        ],
    },
    {
        id: 112,
        topic: 'Two players mode',
        author: users[2],
        //test Date object
        created: Date.parse('Mon, 17 May 2021 17:48:00'),
        votes: 3,
        messages: [
            {
                message:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nib, consectetuer adipiscing elit, sed diam nonummy nib m nonummy nib, conse',
                author: users[0],
                created: Date.parse('Mon, 17 May 2021 17:48:00'),
            },
            {
                message:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nib, consectetuer adipiscing elit, sed diam nonummy nib m nonummy nib, conse',
                author: users[0],
                created: Date.parse('Mon, 17 May 2021 17:58:00'),
            },
        ],
    },
    {
        id: 113,
        topic: 'The next level launch',
        author: users[1],
        created: Date.parse('Wed, 12 May 2021 18:28:00'),
        votes: 8,
        messages: [
            {
                message:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nib sed diam nonummy nib, consectetuer adipiscing em nonummy nib, conse',
                author: users[0],
                created: Date.parse('Wed, 12 May 2021 18:28:00'),
            },
            {
                message:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nib',
                author: users[1],
                created: Date.parse('Wed, 12 May 2021 19:35:00'),
            },
            {
                message:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nib sed diam nonummy nib, consectetuer adipiscing em nonummy nib, conse',
                author: users[0],
                created: Date.parse('Wed, 12 May 2021 19:46:00'),
            },
        ],
    },
];
