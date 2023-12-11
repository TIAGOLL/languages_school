import firebase from 'firebase/storage';

async function create(file) {
  const storageRef = firebase.ref(`usersContent/${file.name}`);

  const task = storageRef.put(file);
}

async function get() {}

async function update(file) {
  const storageRef = firebase.ref(`usersContent/${file.name}`);

  const task = storageRef.put(file);
}

async function remove(file) {
  const storageRef = firebase.ref(`usersContent/${file.name}`);

  const task = storageRef.put(file);
}

export default {
  create,
  get,
  update,
  remove,
};
