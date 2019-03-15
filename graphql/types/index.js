import { mergeTypes } from "merge-graphql-schemas";
import UserTypes from "./UserTypes";

const typeDefs = [UserTypes];

export default mergeTypes(typeDefs, { all: true });