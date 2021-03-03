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
    <br>
  </div>
</template>

<script>
import datePicker from "vue-bootstrap-datetimepicker";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
import db from "./firebaseInit";
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
  beforeRouteEnter(to, from, next) {
    db.collection("users")
      .where("id", "==", Number(to.params.id))
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          next((vm) => {
            vm.id = doc.data().id;
            vm.firstname = doc.data().firstname;
            vm.lastname = doc.data().lastname;
            vm.birthdate = doc.data().birthDate;
            vm.email = doc.data().email;
            vm.address = {
                id: doc.data().address.id,
                street: doc.data().address.street,
                city: doc.data().address.city,
                country: doc.data().address.country,
                postalcode: doc.data().address.postalcode,
            }
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  components: {
    datePicker,
  },
  methods: {
    fetchData() {
      db.collection("users")
        .where("id", "==", Number(this.$route.params.id))
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            this.id = doc.data().id,
            this.firstname = doc.data().firstname,
            this.lastname = doc.data().lastname,
            this.birthdate = doc.data().birthDate,
            this.email = doc.data().email,
            this.address = doc.data().address
          })
        })
    },
    updateUser() {
      db.collection("users")
        .where("id", "==", this.$route.params.id)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            doc.ref
              .update({
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
              })
              .then(() => {
                this.$router.push({
                  name: "view-user",
                  params: { id: this.id },
                });
              });
          });
        });
    }
  }
};
</script>