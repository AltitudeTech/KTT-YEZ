import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create(initialState, { getToken }) {
  // const uri = process.env.NODE_ENV !== 'production' ? 'http://localhost:7000/graphql' : 'https://ktt-yez-backend.herokuapp.com/graphql'
  // const uri = 'http://david-pc:7000/graphql'
  // const uri = 'http://192.168.0.124:7000/graphql'
  const uri = 'https://ktt-yez-backend.herokuapp.com/graphql'

  const httpLink = new HttpLink({
    uri: uri, // Server URL (must be absolute)
    credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
  })

  const authLink = setContext((_, { headers }) => {
    const token = getToken()

    let returnHeaders = {...headers}
    const authorization = token ? `Bearer ${token}` : null
    if (authorization){
      returnHeaders.authorization = authorization
    }
    return {
      headers: returnHeaders
    }
  })

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({}).restore(initialState || {})
    // cache: new InMemoryCache({
    //   cacheResolvers: {
    //     Query: {
    //       candidateUpdateById: {
    //         record : (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Candidate', id: args._id }))
    //       },
    //     },
    //   },
    // }).restore(initialState || {})
  })
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
