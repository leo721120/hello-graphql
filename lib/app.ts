import compress from 'compression'
import cors from 'cors'
import express from 'express'
import graphql from 'express-graphql'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'

Promise.resolve(
    express()
).then(async function (app) {
    app.use(cors());
    app.use(compress());
    app.use('/graphql', graphql({
        graphiql: true,
        schema: makeExecutableSchema({
            typeDefs: await importSchema('lib/*.gql'),
            resolvers: {
                Query: {
                    hello(_): string {
                        return 'gogogo';
                    },
                },
                Mutation: {
                    fire(_, { id, name }): string {
                        return `${id}:${name}`;
                    },
                },
            },
        }),
    }));

    const srv = app.listen(4000, function () {
        console.info(srv.address());
    }).on('close', function () {
        console.info('close');
    }).on('error', console.error);
}).catch(console.error);