import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Site\SiteController::store
 * @see app/Http/Controllers/Site/SiteController.php:97
 * @route '/contato'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/contato',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Site\SiteController::store
 * @see app/Http/Controllers/Site/SiteController.php:97
 * @route '/contato'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::store
 * @see app/Http/Controllers/Site/SiteController.php:97
 * @route '/contato'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::store
 * @see app/Http/Controllers/Site/SiteController.php:97
 * @route '/contato'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::store
 * @see app/Http/Controllers/Site/SiteController.php:97
 * @route '/contato'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const contato = {
    store: Object.assign(store, store),
}

export default contato