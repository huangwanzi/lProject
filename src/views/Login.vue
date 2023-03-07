<template>
  <div>
    <v-content>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field label="E-mail" append-icon="mdi-account-circle" v-model="email" />
          <v-text-field
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            append-icon="mdi-lock"
            @click:append="showPassword = !showPassword"
            v-model="password"
          />
        </v-card-text>

        <v-bottom-navigation v-model="value" :background-color="color" shift>
          <v-btn @click="login()">
            <span>Login</span>

            <v-icon>mdi-login</v-icon>
          </v-btn>

          <v-btn>
            <span></span>

            <v-icon></v-icon>
          </v-btn>

          <v-btn>
            <span></span>

            <v-icon></v-icon>
          </v-btn>

          <v-btn @click="googlelogin()">
            <span>Google</span>

            <v-icon>mdi-google-chrome</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-card>
    </v-content>
  </div>
</template>

<script>
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut
} from 'firebase/auth'
import { initializeApp } from '@firebase/app'
/* import { auth } from "../plugins/firebaseInit";
 */

 const firebaseConfig = {
  apiKey: 'AIzaSyCbhtniYzILMt5QOJ_Fk00YSRbwfBWtta4',
  authDomain: 'covid-c9e6d.firebaseapp.com',
  projectId: 'covid-c9e6d',
  storageBucket: 'covid-c9e6d.appspot.com',
  messagingSenderId: '971477595106',
  appId: '1:971477595106:web:8fcdca2cb96d2fe647bfbb'
}

const provider = new GoogleAuthProvider()

const auth = getAuth(initializeApp(firebaseConfig))
export default {
  data() {
    return {
      email: '',
      password: '',
      loader: null,
      loading3: false
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },

  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('User=' + user)

          this.email = user.email
          this.$router.push('/')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode + ' ' + errorMessage)
        })
    },
    googlelogin() {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken

          const user = result.user

          console.log('Google Token=' + token)
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode + ' ' + errorMessage)
        })
    },
    logout() {
      signOut(auth)
        .then(() => {
          console.log('logout')
          this.$router.replace('/Home')
          alert('Logout')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
