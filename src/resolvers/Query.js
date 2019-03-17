import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip
        }

        if (args.query) {
            opArgs.where = {
                OR: [{
                    firstName_contains: args.query
                }, {
                    surname_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
        // if (!args.query) {
        //     return db.users
        // }

        // return db.users.filter((user) => {
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        // })
    },
    me(parent, args, { prisma, request}, info) {
        const userId = getUserId(request)
        return prisma.query.user({
            where: {
                id: userId
            }
        })
    },
    myposts(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        const opArgs = {
            where: {
                author: {
                    id: userId
                }
            }
        }
        if (args.query){
            opArgs.Where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }

        return prisma.query.posts(opArgs, info)
    },
    posts(parent, args, { prisma }, info) {
        return prisma.query.posts(null, info)
        
        const opArgs = {
            first: args.first,
            skip: args.skip,
            where: {
                published: true
            }
        }
    
        if (args.query) {
            opArge.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }
        
        return prisma.query.posts(opArgs, info)
    },
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info)

        const opArgs = {
            first: args.first,
            skip: args.skip
        }

        if (args.query) {
            opArgs.where = {
                text_contains: args.query
            }
        }
        return prisma.query.comments(opArgs, info)
    //     return db.comments
    },
    events(parent, args, { prisma }, info) {
        return prisma.query.events(null, info)

        const opArgs = {      
            first: args.first,
            skip: args.skip
        }

        if (args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }
        return prisma.query.events(opArgs, info)
    },
    async post(parent, args, { prisma, request }, info){
        const userId = getUserId(request, false)
        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)
        
        if (posts.length === 0) {
            throw new Error('Post not found')
        }

        return posts[0]
    }
 }

 export { Query as default }