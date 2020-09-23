import Constants from "expo-constants";
import * as Permissions from "expo-permissions";



class UserPermissions{

getCamaraPermission =async()=>{

    if(Constants.platform.android){
        const{status}= await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if(status !="granted"){
            alert("allow permission to use camara roll")
        }
    }
};

}
export default new UserPermissions();

