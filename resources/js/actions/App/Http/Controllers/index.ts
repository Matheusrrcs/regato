import Site from './Site'
import Auth from './Auth'
import Admin from './Admin'
const Controllers = {
    Site: Object.assign(Site, Site),
Auth: Object.assign(Auth, Auth),
Admin: Object.assign(Admin, Admin),
}

export default Controllers