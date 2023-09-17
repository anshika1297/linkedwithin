import { auth, provider, storage } from "../Firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import db from "../Firebase";
import { signInWithPopup } from "firebase/auth";
import { SET_USER, SET_LODING_STATUS, GET_ARTICLES } from "./actionType";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const SetUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type: SET_LODING_STATUS,
  status: status,
});

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});
export function signInApi() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(SetUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export const GetUserAuth = () => {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(SetUser(user));
      }
    });
  };
};

export const SignOutApi = () => {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(SetUser(null));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const postArticleApi = (payload) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image !== "") {
      const upload = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(upload, payload.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress:${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`progress:${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            /*db.collection("articles").add({
              actor: {
                description: payload.user.email,
                titel: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              shareImage: downloadURL,
              comments: 0,
              description: payload.description,
            });*/

            const docData = {
              actor: {
                description: payload.user.email,
                titel: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              shareImage: downloadURL,
              comments: 0,
              description: payload.description,
            };
            const docref = addDoc(collection(db, "articles"), docData);
            console.log(docref.id);
            /* const firestore = doc(db, `articles/${payload.timestamp}`);
            setDoc(firestore, docData);*/
          });

          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      const docData = {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        shareImage: "",
        comments: 0,
        description: payload.description,
      };
      const docref = addDoc(collection(db, "articles"), docData);
      console.log(docref.id);
      /*const firestore = doc(db, `articles/${payload.timestamp}`);
      setDoc(firestore, docData);*/
      dispatch(setLoading(false));
    }
  };
};

export const getArticleApi = () => {
  return (dispatch) => {
    let payload;

    const q = query(collection(db, "articles"), orderBy("actor.date", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      payload = querySnapshot.docs.map((doc) => doc.data());
      console.log(payload);
      dispatch(getArticles(payload));
    });
    /* db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
      });*/
  };
};
