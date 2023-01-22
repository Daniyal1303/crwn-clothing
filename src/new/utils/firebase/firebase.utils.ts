import { initializeApp } from 'firebase/app';
import {getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    DocumentSnapshot
} from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeazv_WpZk6COPy0kcENb8st6a6EUTKuw",
    authDomain: "crwn-clothing-db-fed97.firebaseapp.com",
    projectId: "crwn-clothing-db-fed97",
    storageBucket: "crwn-clothing-db-fed97.appspot.com",
    messagingSenderId: "1016089774044",
    appId: "1:1016089774044:web:580c77257207808deb3119"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider)
  export const db = getFirestore();


  export const addCollectionAndDocuments = async(collectionKey:any, objectsToAdd:any) => {
    const collectionRef = collection(db, collectionKey );
    const batch = writeBatch(db)

    objectsToAdd.forEach((object:any)=>{
      const docRef = doc(collectionRef,object.title.toLowerCase()); 
      batch.set(docRef,object);
    })
    await batch.commit();
    console.log('done');
    
  }
  export const getCategoriesAndDocuments= async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    
    
   
    const categoryMap = querySnapshot.docs.reduce((acc:any,docSnapshot)=>{
      const {title,items} = docSnapshot.data();
       acc[title.toLowerCase()] = items;
      return acc;
    },{})
    return categoryMap;
  }

  export const createUserDocumentFromAuth = async(userAuth:any,additionalInformation = {displayName:'Dani'}) => {
    if(!userAuth) return;
    const userDocRef = doc(db,'users', userAuth.uid);
   
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists())
    {
       const {displayName , email} = userAuth;
       const createdAt  = new Date();
       try{
        await setDoc(userDocRef, {
          
            displayName,
            email,
            createdAt,
            ...additionalInformation as object,
           
        });
       }catch(error:any){
        console.log('error creating the user',error.message );

       }
    }
   
    return userDocRef;
   
  }

  export const createAuthUserWithEmailAndPassword = async(email:string,password:string) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password)

  }

  export const signInAuthUserWithEmailAndPassword = async(email:string,password:string) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password)
  }

  export const signOutUser = async() => await signOut(auth);
  export const onAuthStateChangedListener = (callback:any) =>
   onAuthStateChanged(auth,callback);