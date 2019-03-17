import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query'
import Mutation from './Mutations'
import Subscription from './Subscription'
import User from './Users'
import Post from './Posts'
import Comment from './Comments'


const resolvers = {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment 
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }