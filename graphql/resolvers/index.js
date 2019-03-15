import { mergeResolvers } from "merge-graphql-schemas";
import UserResolvers from "./UserResolvers";

const resolvers = [UserResolvers];

export default mergeResolvers(resolvers);