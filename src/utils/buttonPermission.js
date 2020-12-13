import store from "../store/index"

export function buttonPermission (permission) {

    const role = store.getters['app/roles']
     
    if(role.indexOf('admin') != -1){
        return true
    }
    
    const button = store.getters['app/buttonPermission'] 
    return button.indexOf(permission) !=-1


}