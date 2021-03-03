<template>
  <div id="edit-user">
    <h3>Edit User</h3>
    <!-- Starting edit user form-->
    <form @submit.prevent="updateUser">
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
          v-model="address.street"
          required
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
            v-model="address.city"
            required
          />
        </div>
        <div class="form-group col-md-4">
          <label for="country">Country</label>
          <input
            type="text"
            class="form-control"
            id="country"
            placeholder="Country..."
            v-model="address.country"
            required
          />
        </div>
        <div class="form-group col-md-2">
          <label for="postalcode">Postal code</label>
          <input
            type="text"
            class="form-control"
            id="postalcode"
            placeholder="Postal code..."
            v-model="address.postalcode"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Edit user</button>
      <router-link to="/" class="btn btn-danger">Cancel</router-link>
    </form>
    <!-- End of user form-->
    <br />
  </div>
</template>

<script>
import datePicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
const SERVER_URL = "https://crud-challenge-74b3d-default-rtdb.firebaseio.com";
export default {
  name: "edit-user",
  data() {
    return {
      birthdate: new Date(),
      options: {
        format: "YYYY-MM-DD",
        useCurrent: false,
      },
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      address: {
        id: null,
        street: null,
        city: null,
        country: null,
        postalcode: null,
      },
    };
  },
  components: {
    datePicker,
  },
  async mounted() {
    await this.getGameDetails();
  },
  methods: {
    async getGameDetails() {
      const r = await fetch(
        `${SERVER_URL}/users/${this.$route.params.id}.json`
      );
      let gotUser = await r.json();
        (this.id = gotUser.id),
        (this.firstname = gotUser.firstname),
        (this.lastname = gotUser.lastname),
        (this.birthdate = gotUser.birthDate),
        (this.email = gotUser.email),
        (this.address = gotUser.address);
    },
    async updateUser() {
      const payload = JSON.stringify({
        id: this.id,
        firstname: this.firstname,
        lastname: this.lastname,
        birthDate: this.birthdate,
        email: this.email,
        address: {
          id: this.address.id,
          street: this.address.street,
          city: this.address.city,
          country: this.address.country,
          postalcode: this.address.postalcode,
        },
      });
      const url = `${SERVER_URL}/users/${this.$route.params.id}.json`;
      const r = await fetch(url, {
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json",
        },
      });
      const response = await r.json();
      if (response) {
        this.$router.push({
          name: "view-user",
          params: { id: this.$route.params.id },
        });
      }
    },
  },
};
</script>