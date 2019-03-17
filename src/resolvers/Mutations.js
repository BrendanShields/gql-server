import generateToken from '../utils/generateToken'
import getUserId from '../utils/getUserId'
import hashPassword from '../utils/hashPassword'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {

        
        const password = await hashPassword(args.data.password)


        const user = await prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async login(parent, args, { prisma }, info){
        const user = await prisma.query.user({
            where:{
                email: args.data.email
            }
        })

        if (!user){
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to log in')
        }
        
        return {
            user,
            token: generateToken(user.id)
        }

    },
    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const userExists = await prisma.exists.User({ id: args.id })

        if (!userExists) {
            throw new Error('User not found')
        }

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)

    },
    async createPost(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)
        return prisma.mutation.createPost({
            data: {
                title: data.title,
                body: data.body,
                published: data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)

    },
    async updatePost(parent, { id, data }, { prisma, request } , info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: id,
            author: {
                id: userId
            }
        })

        const isPublished = await prisma.exists.Post({
            id: args.id,
            published: true
        })


        if(!postExists) {
            throw new Error('Unable to update post')
        }

        if (isPublished && args.data.published === false){
            await prisma.mutation.deleteManyComments({
                where:{
                    post: {
                        id: args.id
                    }
                }
            })
        }

        return prisma.mutation.updatePost({ 
            where: {
                id: id
            },
             data: data }, info)

    },
    async deletePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.id,
            author:{
                id: userId
            }
        })

        if (!postExists){
            throw new Error('Unable to delete post')
        }

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            },
        }, info)

    },
    async createComment(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.data.post,
            published: true
        })

        if (!postExists) {
            throw new Error('Unable to find post')
        }
        return prisma.mutation.createComment({
            data: {
                text: data.text,
                author: {
                    connect:{
                        id: userId
                    }
                },
                post: {
                    connect: {
                        id: data.post
                    }
                }
            }
        }, info)

    },
    async updateComment(parent, {id, data}, { prisma, request }, info) {
        const userId = getUserId(request)
        const commentExists = await prisma.exists.Comment({
            id: id,
            author: {
                id: userId
            }
        })

        if (!commentExists) {
            throw new Error('Unable to update comment')
        }

        return prisma.mutation.updateComment({
            where:{
                id: id
            },
            data: data
        }, info)

    },
    async deleteComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExists){
            throw new Error('Unable to delete comment')
        }

        return prisma.mutation.deleteComment({
            where:{
                id: args.id
            }
        }, info)
    },
    async createBooking(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.createBooking({
            data:{
                user: {
                    connect:{
                        id: userId
                    }
                },
                event: {
                    connect: {
                        id: args.data.event
                    }
                }
            }
        }, info)
    },
    async deleteBooking(parent, args, { prisma, request }, info) {
        
        const userId = getUserId(request)
        const bookingExists = await prisma.exists.Booking({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!bookingtExists){
            throw new Error('Unable to delete comment')
        }


        return prisma.mutation.deleteBooking({
            id: args.id
        }, info)
    },
    async createEvent(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)
        return prisma.mutation.createEvent({
            data:{
                title: data.title,
                body: data.body,
                location: data.location,
                date: data.date,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    }, 
    async updateEvent(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        const eventExists = await prisma.exists.Event({
            id: args.id,
            author: {
                id: userId
            }
        })

        if(!eventExists) {
            throw new Error('Unable to update Event')
        }
        return prisma.mutation.updateEvent({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    async deleteEvent(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        const eventExists = await prisma.exists.Event({
            id: args.id,
            author:{
                id: userId
            }
        })

        if (!eventExists){
            throw new Error('Unable to delete event')
        }
        return prisma.mutation.deleteEvent({
            where: {
                id: args.id
            }
        }, info)
    }
}

export { Mutation as default }