
# Scheduler Guide

## Install and start local host


    https://www.apollographql.com/docs/tutorial/schema/

start local service:
        
        npm install mongodb mongoose apollo-server-express apollo-server-lambda express jsonwebtoken jwks-rsa dotenv esm serverless graphql -save

        
If something is failing, try 

        npm  audit  fix

Then

        npm start

when the service  is running, in a different  tab deploy service:

        npx apollo service:push --graph=varadinum-instructional --key=user:gh.kerekesmarton:DtDc02arIhiV3PbSlzqxQw --endpoint=http://localhost:4000


## Schema Download

`schema.json` can be downloaded from
- [docs](https://github.com/apollographql/apollo-tooling#apollo-clientdownload-schema-output)
- [localhost](http://localhost:4000)


### aws 
        apollo client:download-schema --endpoint=https://eu1.prisma.sh/kerekes-marton-d1867d/instructional-cloud/dev

### localhost
        apollo client:download-schema --endpoint=http://localhost:4000/graphql


## Schema Introspection

Create API using downlaoded schema. For documentation go to [github](https://github.com/apollographql/apollo-tooling#apollo-clientcodegen-output)

A script is placed before the build phase:

        SCRIPT_PATH="${SRCROOT}/../../Carthage/Checkouts/apollo-ios/scripts"
        cd "${SRCROOT}/${TARGET_NAME}"
        "${SCRIPT_PATH}"/run-bundled-codegen.sh codegen:generate --target=swift --includes=./**/*.graphql --localSchemaFile="schema.json" API.swift
        
        
