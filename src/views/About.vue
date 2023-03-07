<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="16" sm="2" md="8" lg="2">
        <v-btn @click="logout()" tile color="success" class="red darken-4">logout
          <v-icon right dark> mdi-logout</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-simple-table dark>
      <thead>
        <tr>
          <th scope="col">number</th>
          <th scope="col">name</th>
          <th scope="col">lastname</th>
          <th scope="col">ID</th>
          <th scope="col">phone</th>
          <th scope="col">EIEI</th>
          <th scope="col">E-mail</th>
          <th scope="col">password</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in table" :key="index">
        <tr>
          <th scope="row">{{ index }}</th>
          <td>{{ item.data.name }}</td>
          <td>{{ item.data.lastname }}</td>
          <td>{{ item.data.idcard }}</td>
          <td>{{ item.data.number }}</td>
          <td>{{ item.data.eiei }}</td>
          <td>{{ item.data.mail }}</td>
          <td>{{ item.data.password }}</td>

          <td>
            <v-btn color="error" @click="deleteData(item.id)">delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
/* import { db, auth } from "../plugins/firebaseInit"; */
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth()

export default {
  data() {
    return {
      dbData: "",
      nameC: "",
      lastnameC: "",
      checkedNames: [],
      mails: "",
      numberphone: "",
      table: [],
      dialog: false,
      iduser: "",
      password1: "",
      isAdmin: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async addData() {
      try {
        const docRef = await addDoc(collection(db, "note"), {
          name: this.nameC,
          lastname: this.lastnameC,
          eiei: this.checkedNames,
          idcard: this.iduser,
          mail: this.mails,
          number: this.numberphone,
          password: this.password1,
        });
        console.log("Document written with ID: ", docRef.id);
        this.resetForm();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async readData() {
      const q = query(collection(db, "note"));
      onSnapshot(q, (querySnapshot) => {
        this.table = [];
        querySnapshot.forEach((doc) => {
          this.table.push({ id: doc.id, data: doc.data() });
        });
        console.log("Data loaded successfully");
      });
    },
    checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user && user.uid == "Aw18wR1YfwhTunXfVCxlqlN42vw2") {
          console.log("User is logged in as admin");
          this.isAdmin = true;
          this.readData();
        } else {
          console.log("User is not logged in or is not an admin");
          this.$router.push("/");
          // alert("You must be logged in as an admin to access this page.");
        }
      });
    },
    logout() {
      signOut(auth)
        .then(() => {
          console.log("Logout successful");
          alert("Logout success");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async deleteData(id) {
      await deleteDoc(doc(db, "note", id));
      console.log("Document with ID ", id, " has been deleted.");
    },
    resetForm() {
      this.nameC = "";
      this.lastnameC = "";
      this.checkedNames = [];
      this.mails = "";
      this.numberphone = "";
      this.iduser = "";
      this.password1 = "";
    },
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.trang {
  position: relative;
  top: 0px;
  left: 400px;
}
</style>
