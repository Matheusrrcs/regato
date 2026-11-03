import DashboardController from './DashboardController'
import SettingsController from './SettingsController'
import ContactMessageController from './ContactMessageController'
import ResourceController from './ResourceController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
SettingsController: Object.assign(SettingsController, SettingsController),
ContactMessageController: Object.assign(ContactMessageController, ContactMessageController),
ResourceController: Object.assign(ResourceController, ResourceController),
}

export default Admin