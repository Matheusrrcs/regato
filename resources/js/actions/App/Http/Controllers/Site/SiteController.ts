import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Site\SiteController::home
 * @see app/Http/Controllers/Site/SiteController.php:22
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::home
 * @see app/Http/Controllers/Site/SiteController.php:22
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::home
 * @see app/Http/Controllers/Site/SiteController.php:22
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::home
 * @see app/Http/Controllers/Site/SiteController.php:22
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::home
 * @see app/Http/Controllers/Site/SiteController.php:22
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::home
 * @see app/Http/Controllers/Site/SiteController.php:22
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::home
 * @see app/Http/Controllers/Site/SiteController.php:22
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \App\Http\Controllers\Site\SiteController::about
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/sobre',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::about
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::about
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::about
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::about
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
    const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: about.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::about
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
        aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::about
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
        aboutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    about.form = aboutForm
/**
* @see \App\Http\Controllers\Site\SiteController::services
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
export const services = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: services.url(options),
    method: 'get',
})

services.definition = {
    methods: ["get","head"],
    url: '/servicos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::services
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
services.url = (options?: RouteQueryOptions) => {
    return services.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::services
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
services.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: services.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::services
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
services.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: services.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::services
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
    const servicesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: services.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::services
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
        servicesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: services.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::services
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
        servicesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: services.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    services.form = servicesForm
/**
* @see \App\Http\Controllers\Site\SiteController::portfolioIndex
 * @see app/Http/Controllers/Site/SiteController.php:49
 * @route '/portfolio'
 */
export const portfolioIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: portfolioIndex.url(options),
    method: 'get',
})

portfolioIndex.definition = {
    methods: ["get","head"],
    url: '/portfolio',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::portfolioIndex
 * @see app/Http/Controllers/Site/SiteController.php:49
 * @route '/portfolio'
 */
portfolioIndex.url = (options?: RouteQueryOptions) => {
    return portfolioIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::portfolioIndex
 * @see app/Http/Controllers/Site/SiteController.php:49
 * @route '/portfolio'
 */
portfolioIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: portfolioIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::portfolioIndex
 * @see app/Http/Controllers/Site/SiteController.php:49
 * @route '/portfolio'
 */
portfolioIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: portfolioIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::portfolioIndex
 * @see app/Http/Controllers/Site/SiteController.php:49
 * @route '/portfolio'
 */
    const portfolioIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: portfolioIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::portfolioIndex
 * @see app/Http/Controllers/Site/SiteController.php:49
 * @route '/portfolio'
 */
        portfolioIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: portfolioIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::portfolioIndex
 * @see app/Http/Controllers/Site/SiteController.php:49
 * @route '/portfolio'
 */
        portfolioIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: portfolioIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    portfolioIndex.form = portfolioIndexForm
/**
* @see \App\Http\Controllers\Site\SiteController::portfolioShow
 * @see app/Http/Controllers/Site/SiteController.php:57
 * @route '/portfolio/{slug}'
 */
export const portfolioShow = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: portfolioShow.url(args, options),
    method: 'get',
})

portfolioShow.definition = {
    methods: ["get","head"],
    url: '/portfolio/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::portfolioShow
 * @see app/Http/Controllers/Site/SiteController.php:57
 * @route '/portfolio/{slug}'
 */
portfolioShow.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                }

    return portfolioShow.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::portfolioShow
 * @see app/Http/Controllers/Site/SiteController.php:57
 * @route '/portfolio/{slug}'
 */
portfolioShow.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: portfolioShow.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::portfolioShow
 * @see app/Http/Controllers/Site/SiteController.php:57
 * @route '/portfolio/{slug}'
 */
portfolioShow.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: portfolioShow.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::portfolioShow
 * @see app/Http/Controllers/Site/SiteController.php:57
 * @route '/portfolio/{slug}'
 */
    const portfolioShowForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: portfolioShow.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::portfolioShow
 * @see app/Http/Controllers/Site/SiteController.php:57
 * @route '/portfolio/{slug}'
 */
        portfolioShowForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: portfolioShow.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::portfolioShow
 * @see app/Http/Controllers/Site/SiteController.php:57
 * @route '/portfolio/{slug}'
 */
        portfolioShowForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: portfolioShow.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    portfolioShow.form = portfolioShowForm
/**
* @see \App\Http\Controllers\Site\SiteController::plans
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
export const plans = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: plans.url(options),
    method: 'get',
})

plans.definition = {
    methods: ["get","head"],
    url: '/planos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::plans
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
plans.url = (options?: RouteQueryOptions) => {
    return plans.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::plans
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
plans.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: plans.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::plans
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
plans.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: plans.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::plans
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
    const plansForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: plans.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::plans
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
        plansForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: plans.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::plans
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
        plansForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: plans.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    plans.form = plansForm
/**
* @see \App\Http\Controllers\Site\SiteController::process
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
export const process = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: process.url(options),
    method: 'get',
})

process.definition = {
    methods: ["get","head"],
    url: '/processo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::process
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
process.url = (options?: RouteQueryOptions) => {
    return process.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::process
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
process.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: process.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::process
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
process.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: process.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::process
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
    const processForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: process.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::process
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
        processForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: process.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::process
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
        processForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: process.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    process.form = processForm
/**
* @see \App\Http\Controllers\Site\SiteController::contact
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/contato',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::contact
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::contact
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::contact
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::contact
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
    const contactForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: contact.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::contact
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
        contactForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contact.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::contact
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
        contactForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contact.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    contact.form = contactForm
/**
* @see \App\Http\Controllers\Site\SiteController::contactStore
 * @see app/Http/Controllers/Site/SiteController.php:97
 * @route '/contato'
 */
export const contactStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: contactStore.url(options),
    method: 'post',
})

contactStore.definition = {
    methods: ["post"],
    url: '/contato',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Site\SiteController::contactStore
 * @see app/Http/Controllers/Site/SiteController.php:97
 * @route '/contato'
 */
contactStore.url = (options?: RouteQueryOptions) => {
    return contactStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::contactStore
 * @see app/Http/Controllers/Site/SiteController.php:97
 * @route '/contato'
 */
contactStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: contactStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::contactStore
 * @see app/Http/Controllers/Site/SiteController.php:97
 * @route '/contato'
 */
    const contactStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: contactStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::contactStore
 * @see app/Http/Controllers/Site/SiteController.php:97
 * @route '/contato'
 */
        contactStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: contactStore.url(options),
            method: 'post',
        })
    
    contactStore.form = contactStoreForm
/**
* @see \App\Http\Controllers\Site\SiteController::faq
 * @see app/Http/Controllers/Site/SiteController.php:112
 * @route '/faq'
 */
export const faq = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faq.url(options),
    method: 'get',
})

faq.definition = {
    methods: ["get","head"],
    url: '/faq',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::faq
 * @see app/Http/Controllers/Site/SiteController.php:112
 * @route '/faq'
 */
faq.url = (options?: RouteQueryOptions) => {
    return faq.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::faq
 * @see app/Http/Controllers/Site/SiteController.php:112
 * @route '/faq'
 */
faq.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faq.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::faq
 * @see app/Http/Controllers/Site/SiteController.php:112
 * @route '/faq'
 */
faq.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: faq.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::faq
 * @see app/Http/Controllers/Site/SiteController.php:112
 * @route '/faq'
 */
    const faqForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: faq.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::faq
 * @see app/Http/Controllers/Site/SiteController.php:112
 * @route '/faq'
 */
        faqForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: faq.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::faq
 * @see app/Http/Controllers/Site/SiteController.php:112
 * @route '/faq'
 */
        faqForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: faq.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    faq.form = faqForm
/**
* @see \App\Http\Controllers\Site\SiteController::privacy
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
export const privacy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacy.url(options),
    method: 'get',
})

privacy.definition = {
    methods: ["get","head"],
    url: '/privacidade',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::privacy
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
privacy.url = (options?: RouteQueryOptions) => {
    return privacy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::privacy
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
privacy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacy.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::privacy
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
privacy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: privacy.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::privacy
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
    const privacyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: privacy.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::privacy
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
        privacyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacy.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::privacy
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
        privacyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    privacy.form = privacyForm
/**
* @see \App\Http\Controllers\Site\SiteController::terms
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
export const terms = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})

terms.definition = {
    methods: ["get","head"],
    url: '/termos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::terms
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
terms.url = (options?: RouteQueryOptions) => {
    return terms.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::terms
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
terms.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::terms
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
terms.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: terms.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::terms
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
    const termsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: terms.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::terms
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
        termsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terms.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::terms
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
        termsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terms.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    terms.form = termsForm
const SiteController = { home, about, services, portfolioIndex, portfolioShow, plans, process, contact, contactStore, faq, privacy, terms }

export default SiteController