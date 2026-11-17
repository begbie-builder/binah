import {mergeProgress} from './engine.js';
// Optional SDK: downloaded only when Firebase is configured. No SDK or network for guests.
let sdk, auth, db;
export const cloudConfigured=()=>!!(globalThis.BINAH_FIREBASE_CONFIG?.apiKey && globalThis.BINAH_FIREBASE_CONFIG?.projectId && globalThis.BINAH_FIREBASE_CONFIG?.authDomain && globalThis.BINAH_FIREBASE_CONFIG?.appId);
export async function initCloud(onUser){
 if(!cloudConfigured())return false;
 const [app,authentication,firestore]=await Promise.all([
 import('https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js'),
 import('https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js'),
 import('https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js')]);
 sdk={...authentication,...firestore};const instance=app.initializeApp(globalThis.BINAH_FIREBASE_CONFIG);
 auth=sdk.getAuth(instance);db=sdk.getFirestore(instance);
 sdk.onAuthStateChanged(auth,onUser);return true;
}
export async function signInGoogle(){if(!auth)throw new Error('Google sign-in is not available yet. Your guest progress is safe.');const provider=new sdk.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});return sdk.signInWithPopup(auth,provider);}
export const signOutGoogle=()=>sdk.signOut(auth);
export async function readCloud(uid){const snap=await sdk.getDoc(sdk.doc(db,'users',uid));return snap.exists()?snap.data().progress:null;}
export async function writeCloud(uid,progress){
 const ref=sdk.doc(db,'users',uid);
 return sdk.runTransaction(db,async transaction=>{
  const remote=await transaction.get(ref);
  const merged=remote.exists()?mergeProgress(progress,remote.data().progress):progress;
  transaction.set(ref,{progress:merged,updatedAt:sdk.serverTimestamp()});
  return merged;
 });
}
export async function deleteCloud(uid){await sdk.deleteDoc(sdk.doc(db,'users',uid));}
