import { GraphQLServer } from 'graphql-yoga'
import { isError } from 'util';
import uuidv4 from 'uuid/v4'
// Scalar types = String, Boolean, Int, Float, ID

// Demo user data
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

// Demo post data
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

// Demo post data
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


// Type Definitions (Schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`
// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts;
            }
            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
            })        
        },
        comments(parent, args, ctx, info) {
            return comments
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.email)
            if (emailTaken) {
                throw new Error('Email taken.')
            }
            
            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user)

            return user
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Started!');
})