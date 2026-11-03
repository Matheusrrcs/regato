import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
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
* @see \App\Http\Controllers\Site\SiteController::sobre
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
export const sobre = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sobre.url(options),
    method: 'get',
})

sobre.definition = {
    methods: ["get","head"],
    url: '/sobre',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::sobre
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
sobre.url = (options?: RouteQueryOptions) => {
    return sobre.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::sobre
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
sobre.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sobre.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::sobre
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
sobre.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sobre.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::sobre
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
    const sobreForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sobre.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::sobre
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
        sobreForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sobre.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::sobre
 * @see app/Http/Controllers/Site/SiteController.php:33
 * @route '/sobre'
 */
        sobreForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sobre.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sobre.form = sobreForm
/**
* @see \App\Http\Controllers\Site\SiteController::servicos
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
export const servicos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: servicos.url(options),
    method: 'get',
})

servicos.definition = {
    methods: ["get","head"],
    url: '/servicos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::servicos
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
servicos.url = (options?: RouteQueryOptions) => {
    return servicos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::servicos
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
servicos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: servicos.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::servicos
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
servicos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: servicos.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::servicos
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
    const servicosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: servicos.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::servicos
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
        servicosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: servicos.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::servicos
 * @see app/Http/Controllers/Site/SiteController.php:41
 * @route '/servicos'
 */
        servicosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: servicos.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    servicos.form = servicosForm
/**
* @see \App\Http\Controllers\Site\SiteController::planos
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
export const planos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: planos.url(options),
    method: 'get',
})

planos.definition = {
    methods: ["get","head"],
    url: '/planos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::planos
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
planos.url = (options?: RouteQueryOptions) => {
    return planos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::planos
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
planos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: planos.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::planos
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
planos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: planos.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::planos
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
    const planosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: planos.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::planos
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
        planosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: planos.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::planos
 * @see app/Http/Controllers/Site/SiteController.php:74
 * @route '/planos'
 */
        planosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: planos.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    planos.form = planosForm
/**
* @see \App\Http\Controllers\Site\SiteController::processo
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
export const processo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: processo.url(options),
    method: 'get',
})

processo.definition = {
    methods: ["get","head"],
    url: '/processo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::processo
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
processo.url = (options?: RouteQueryOptions) => {
    return processo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::processo
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
processo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: processo.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::processo
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
processo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: processo.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::processo
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
    const processoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: processo.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::processo
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
        processoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: processo.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::processo
 * @see app/Http/Controllers/Site/SiteController.php:82
 * @route '/processo'
 */
        processoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: processo.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    processo.form = processoForm
/**
* @see \App\Http\Controllers\Site\SiteController::contato
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
export const contato = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contato.url(options),
    method: 'get',
})

contato.definition = {
    methods: ["get","head"],
    url: '/contato',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::contato
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
contato.url = (options?: RouteQueryOptions) => {
    return contato.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::contato
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
contato.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contato.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::contato
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
contato.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contato.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::contato
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
    const contatoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: contato.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::contato
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
        contatoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contato.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::contato
 * @see app/Http/Controllers/Site/SiteController.php:90
 * @route '/contato'
 */
        contatoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contato.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    contato.form = contatoForm
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
* @see \App\Http\Controllers\Site\SiteController::privacidade
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
export const privacidade = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacidade.url(options),
    method: 'get',
})

privacidade.definition = {
    methods: ["get","head"],
    url: '/privacidade',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::privacidade
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
privacidade.url = (options?: RouteQueryOptions) => {
    return privacidade.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::privacidade
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
privacidade.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacidade.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::privacidade
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
privacidade.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: privacidade.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::privacidade
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
    const privacidadeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: privacidade.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::privacidade
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
        privacidadeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacidade.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::privacidade
 * @see app/Http/Controllers/Site/SiteController.php:120
 * @route '/privacidade'
 */
        privacidadeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacidade.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    privacidade.form = privacidadeForm
/**
* @see \App\Http\Controllers\Site\SiteController::termos
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
export const termos = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: termos.url(options),
    method: 'get',
})

termos.definition = {
    methods: ["get","head"],
    url: '/termos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Site\SiteController::termos
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
termos.url = (options?: RouteQueryOptions) => {
    return termos.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Site\SiteController::termos
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
termos.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: termos.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Site\SiteController::termos
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
termos.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: termos.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Site\SiteController::termos
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
    const termosForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: termos.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Site\SiteController::termos
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
        termosForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: termos.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Site\SiteController::termos
 * @see app/Http/Controllers/Site/SiteController.php:127
 * @route '/termos'
 */
        termosForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: termos.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    termos.form = termosForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:37
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:37
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:37
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:37
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:37
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm