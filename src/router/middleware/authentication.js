

export default ({ next, router, store }) => {
    // Your custom if statement

    store.dispatch("auth/GET_PROFILE").then(data => {
        if(data.success)
            next()
        else
            router.push("/signIn")
    })


}
