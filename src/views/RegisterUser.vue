<template>
  <v-form v-model="valid">
    <v-container>
      <h1>กรอกข้อมูล</h1>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="nameC"
            :rules="nameRules"
            :counter="25"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastnameC"
            :rules="nameRules"
            :counter="25"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="iduser"
            :rules="emailRules"
            label="id Card"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <span></span>
      <v-col cols="12" sm="4" md="4">
        <v-checkbox
          v-model="checkedNames"
          label="male"
          color="red"
          value="femel"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-model="checkedNames"
          label="femel"
          color="success"
          value="-"
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="numberphone"
          :rules="nameRules"
          :counter="10"
          label="numberphone"
          required
        ></v-text-field>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="mails"
            :rules="nameRules"
            :counter="25"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            append-icon="mdi-lock"
            @click:append="showPassword = !showPassword"
            v-model="password1"
          />
        </v-col>
      </v-col>

      <v-row align="center" justify="space-around">
        <div class="text-center">
          <v-btn
            :disabled="dialog"
            :loading="dialog"
            class="white--text"
            color="purple darken-2"
            @click="(dialog = true), addData()"
            text
          >
            Save
          </v-btn>
          <v-dialog v-model="dialog" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Please stand by
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <div class="text-center">
          <v-btn @click="loginuser()" text color="error"> summit </v-btn>
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>/* 
import { db } from "../plugins/firebaseInit";
import { auth } from "../plugins/firebaseInit"; */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { collection, addDoc, getDocs,getFirestore } from "firebase/firestore";

export default {
  data() {
    return {
      dbData: "",
      nameC: " ",
      lastnameC: "",
      checkedNames: "",
      mails: "",
      numberphone: "",
      table: [],
      dialog: false,
      iduser: "",
      password1: "",
    };
  },
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 4000);
    },
  },

  methods: {
    async addData() {
      try {
        const db = getFirestore(initializeApp)
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
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      alert("Savedata");
    },
    async readData() {
      const querySnapshot = await getDocs(collection(db, "note"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        this.table.push({ id: doc.id, data: doc.data() });
      });
    },
    loginuser() {
      createUserWithEmailAndPassword(auth, this.mails, this.password1)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User=" + user);
          this.$router.replace("/Login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
    },
    checklogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid);

          this.uid = user.uid;
          this.emails = user.emails;
        } else {
          alert("Plses Login");
          this.$router.push("/login");
        }
      });
    },
    googlelogin() {
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          const user = result.user;

          console.log("Google Token=" + token);
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
    },
  },
};
</script>

<style>

.mt-9 {
  text-align: center;
}
</style>
