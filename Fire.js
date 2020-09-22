import firebase from "firebase";




var firebaseConfig = {
    apiKey: "AIzaSyBnvKh30KPuGrrPFzd33PTYikzrfZYZVYw",
    authDomain: "newsocialapp-ec1e2.firebaseapp.com",
    databaseURL: "https://newsocialapp-ec1e2.firebaseio.com",
    projectId: "newsocialapp-ec1e2",
    storageBucket: "newsocialapp-ec1e2.appspot.com",
    messagingSenderId: "492264735593",
    appId: "1:492264735593:web:9f14334bae9950cafe73f8"
  };

  class Fire {
      constructor(){
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }
        }

          addPost =async({text, localUri})=>{
              const remoteUri =await this.uploadPhotoAsync(localUri);

              return new Promise((res, rej)=> {
                  this.firestore
                  .collection("posts").add({
                      text,
                      uid: this.uid,
                     timestamp: this.timestamp,
                      image :remoteUri
                  })
                  .then(ref => {
                      res(ref);
                  })
                  .catch(error =>{
                      rej(error);
                  });
              });
          };


          uploadPhotoAsync =async uri => {
              const path =`photos/${this.uid}/${Date.now()}.jpg`

              return new Promise(async(res, rej) => {
                  const response = await fetch(uri)
                  const file =await response.blob()

                  let upload = firebase.storage().ref(path).put(file)

                  upload.on("state_changed", snapshot => {}, err =>{
                      rej(err)
                  },
                  async() => {
                      const url = await upload.snapshot.ref.getDownloadURL();
                      res(url);
                  }
                  );
              });
          };
        
      get firestore(){
          return firebase.firestore()
      }
      get uid(){
          return(firebase.auth().currentUser|| {}).uid;
      }
      get timestamp(){
          return Date.now();
      }
  }
  Fire.shared = new Fire();
  export default Fire;