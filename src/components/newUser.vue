<template>
  <div id="new-user">
    <h3>New User</h3>
    <!-- Starting new user form-->
    <form @submit.prevent="saveUser">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="firstname">Firstname</label>
          <input
            type="text"
            class="form-control"
            id="firstname"
            placeholder="Firstname..."
            v-model="firstname"
            required
            oninvalid="this.setCustomValidity('Please enter a firstname')"
            oninput="this.setCustomValidity('')"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="lastname">Lastname</label>
          <input
            type="text"
            class="form-control"
            id="lastname"
            placeholder="Lastname..."
            v-model="lastname"
            required
            oninvalid="this.setCustomValidity('Please enter a lastname')"
            oninput="this.setCustomValidity('')"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Email..."
            v-model="email"
            required
            oninvalid="this.setCustomValidity('Please enter a valid email')"
            oninput="this.setCustomValidity('')"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="birthdate">Birthdate</label>
          <date-picker v-model="birthdate" :config="options"></date-picker>
        </div>
      </div>
      <div class="form-group">
        <label for="street">Street</label>
        <input
          type="text"
          class="form-control"
          id="street"
          placeholder="Please add a street - address"
          v-model="street"
          required
          oninvalid="this.setCustomValidity('Please enter a street')"
          oninput="this.setCustomValidity('')"
        />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="city">City</label>
          <input
            type="text"
            class="form-control"
            id="city"
            placeholder="City..."
            v-model="city"
            required
            oninvalid="this.setCustomValidity('Please enter a city')"
            oninput="this.setCustomValidity('')"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="country">Country</label>
          <input
            type="text"
            class="form-control"
            id="country"
            placeholder="Country..."
            v-model="country"
            required
            oninvalid="this.setCustomValidity('Please enter a country')"
            oninput="this.setCustomValidity('')"
          />
        </div>
        <div class="form-group col-md-2">
          <label for="postalcode">Postal code</label>
          <input
            type="number"
            class="form-control"
            id="postalcode"
            placeholder="Postal code..."
            v-model="postalcode"
            required
            oninvalid="this.setCustomValidity('Please enter a postal code')"
            oninput="this.setCustomValidity('')"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Save new user</button>
      <router-link to="/" class="btn btn-danger">Cancel</router-link>
    </form>
    <!-- End of user form-->
    <br />
  </div>
</template>

<script>
import Vue from "vue";
import VueToasted from "vue-toasted";
Vue.use(VueToasted);
import datePicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
const SERVER_URL = "https://crud-challenge-74b3d-default-rtdb.firebaseio.com";
export default {
  name: "new-user",
  data() {
    return {
      birthdate: new Date("11-10-1989"),
      options: {
        format: "DD/MM/YYYY",
        useCurrent: false,
      },
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      street: null,
      city: null,
      country: null,
      postalcode: null,
    };
  },
  methods: {
    async saveUser() {
      const uniqueId = () => parseInt(Date.now() * Math.random());
      const payload = JSON.stringify({
        id: uniqueId(),
        firstname: this.firstname,
        lastname: this.lastname,
        birthDate: this.birthdate,
        email: this.email,
        address: {
          id: uniqueId(),
          street: this.street,
          city: this.city,
          country: this.country,
          postalcode: this.postalcode,
        },
      });
      const url = `${SERVER_URL}/users.json`;
      const r = await fetch(url, {
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json",
        },
      });

      const response = await r.json();
      if (response) {
        this.$router.push("/");
        let toast = this.$toasted.show(
          "User has been successfully created...",
          {
            theme: "bubble",
            position: "top-center",
            duration: 5000,
          }
        );
      } else {
        let toast = this.$toasted.show(
          "Something went wrong creating new user, please try again...",
          {
            theme: "bubble",
            position: "top-center",
            duration: 5000,
          }
        );
      }
    },
  },
  components: {
    datePicker,
  },
};
</script>