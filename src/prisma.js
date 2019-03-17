import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'
const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: 'c@sperisaprettycoolc@t',
    fragmentReplacements
})

export { prisma as default }
// prisma.query, prisma.mutation, prisma.subscription, prisma.exists

// prisma.query.users(null, '{ id firstName surname surname email posts { id title } bookings { id }}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 4))
// }).catch((error) => {
//     console.log(error)
// })

// const createPostForUser = async (authorId, data) => {

//     const userExists = await prisma.exists.User({
//         id: authorId
//     })

//     if (!userExists) {
//         throw new Error('User not found')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id email posts { id title published }}}')
    // const user = await prisma.query.user({
    //     where: {
    //         id: authorId
    //     }
    // }, '{ id email posts { id title published }}')
    // return user
//     return post
// }

// createPostForUser('cjtar9v5t002x07815p52i8t', {
//     title: "the war of art",
//     body: "This is a book",
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })

// prisma.exists.User({
//     id: "cjtar9v5t002x07815p522i8t"
// }).then((exists) => {
//     console.log(exists)
// })
// prisma.mutation.createPost({
//     data: {
//         title: "this is another post",
//         body: "third post from this",
//         published: true,
//         author: {
//             connect: {
//                 id: "cjtarfs06006u0781bgsjsvki"
//             }
//         }
//     }
// }, '{ id title body published }').then((data) => {
//     console.log(data)
    
// return prisma.query.users(null, '{ id firstName surname surname email posts { id title } bookings { id }}')

// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 4))
// })

// prisma.mutation.updatePost({
//     where: {
//         id: "cjtatkg6y00ib0781rqlof42h"
//     },
//     data: {
//         body: "this is an update to the post"
//     }
// }, '{ id body }').then((data) => {
//     return prisma.query.posts(null, '{id title body}')
// }).then((data) => {
//     console.log(data)
// })