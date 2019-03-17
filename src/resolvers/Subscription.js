const Subscription = {
    comment: {
        subscribe(parent, { postId }, { prisma }, info) {
            return prisma.subscription.comment({
                where:{
                    node:{
                        post:{
                            id: postId
                        }
                    }
                }
            }, info)
         }
    },
    post: {
        subscribe(parent, { authorId }, { prisma }, info){
            return prisma.subscription.post({
                where:{
                    node:{
                        published:true
                    }
                }
            }, info)

            // return pubsub.asyncIterator(`post`)
        }
    },
    event: {
        subscribe(parent, args, { prisma }, info){
            return prisma.subscription.event(null, info)
        }
    }
}

export { Subscription as default }