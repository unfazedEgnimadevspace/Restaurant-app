// Saving new item

import {
  collection,
  doc,
  getDocs,
  orderBy,
  setDoc,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

export const getAllFoodItem = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data);
};
