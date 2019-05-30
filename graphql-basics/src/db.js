const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: '27'
},
{
    id: '2',
    name: 'John',
    email: 'john@example.com',
    age: '18'
},
{
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
    age: '43'
}]

const posts = [{
    id: '1',
    title: 'Post 1',
    body: 'andrew@example.com',
    published: true,
    author: '1'
},
{
    id: '2',
    title: 'Post 2',
    body: 'john@example.com',
    published: true,
    author: '1'
},
{
    id: '3',
    title: 'Post 3',
    body: 'mike@example.com',
    published: false,
    author: '2'
}]

const comments = [{
    id: '1',
    text: 'This is so cool!',
    author: '2',
    post: '2'
},
{
    id: '2',
    text: 'Wow this is not that good.',
    author: '2',
    post: '1'
},
{
    id: '3',
    text: 'Can you help me with this?',
    author: '3',
    post: '1'
}]

const db = {
    users,
    posts,
    comments
}

export { db as default }