// src/firebase/firestoreUtils.js
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from './firebase';
import { auth } from './firebase';

export const listenToStations = (callback) => {
  const unsubscribes = [];

  const stationNames = ['PRP', 'SJT', 'TT', 'SMV', 'CDMM', 'GDN'];
  stationNames.forEach(name => {
    const ref = doc(db, 'stations', name);
    const unsub = onSnapshot(ref, (docSnap) => {
      callback(name, docSnap.data()?.availableCycles || 0);
    });
    unsubscribes.push(unsub);
  });

  return () => unsubscribes.forEach(unsub => unsub());
};

export const bookCycle = async (source, destination, cost) => {
  const user = auth.currentUser;
  if (!user) return;

  const sourceRef = doc(db, 'stations', source);
  const docSnap = await getDoc(sourceRef);

  if (docSnap.exists()) {
    const currentAvailable = docSnap.data().availableCycles;
    if (currentAvailable > 0) {
      await updateDoc(sourceRef, { availableCycles: currentAvailable - 1 });

      const bookingRef = collection(db, 'users', user.uid, 'bookings');
      await addDoc(bookingRef, {
        source,
        destination,
        cost,
        time: new Date().toLocaleString(),
      });

      return true;
    }
  }
  return false;
};

export const returnCycle = async (station) => {
  const ref = doc(db, 'stations', station);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const current = docSnap.data().availableCycles;
    await updateDoc(ref, { availableCycles: current + 1 });
  }
};

export const fetchUserBookings = async (uid, callback) => {
  const ref = collection(db, 'users', uid, 'bookings');
  return onSnapshot(ref, (snapshot) => {
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(bookings);
  });
};
