<template>
  <div id="view-user">
    <br />
    <div class="card">
      <div class="card-header">
        <div class="float-left" style="font-size: 150%">
          {{ firstname }} {{ lastname }}
        </div>
        <div class="float-right">
          <button
            type="button"
            class="btn btn-danger"
            data-toggle="modal"
            data-target="#deleteModal"
          >
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">User's information:</h5>
        <ul>
          <li><strong>Email:</strong> {{ email }}</li>
          <li><strong>Birthdate:</strong> {{ birthdate }}</li>
          <li>
            <strong>Address:</strong> {{ address.street }} -
            <strong>City:</strong> {{ address.city }}
          </li>
          <li>
            <strong>Country:</strong> {{ address.country }} -
            <strong>Postal code:</strong> {{ address.postalcode }}
          </li>
        </ul>
        <router-link to="/">
          <button type="button" class="btn btn-primary">
            <i class="fa fa-arrow-left"> Return to Dashboard</i>
          </button>
        </router-link>
      </div>
    </div>

    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Delete user</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete "{{ firstname }} {{ lastname }}"
            with id "{{ id }}"
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button @click="deleteUser" type="button" class="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <router-link
        v-bind:to="{ name: 'edit-user', params: { id: this.$route.params.id } }"
        class="float"
      >
        <i class="fa fa-pencil my-float"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
const SERVER_URL = "https://crud-challenge-74b3d-default-rtdb.firebaseio.com";
export default {
  name: "view-user",
  data() {
    return {
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      birthdate: null,
      address: {},
    };
  },
  async mounted() {
    await this.getUserDetails();
  },
  methods: {
    async getUserDetails() {
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
    async deleteUser() {
      $("#deleteModal").modal("hide");
      const r = await fetch(
        `${SERVER_URL}/users/${this.$route.params.id}.json`,
        {
          method: "DELETE",
        }
      );
      const response = await r.json();
      this.$router.push("/");
      let toast = this.$toasted.show("User has been successfully deleted...", {
        theme: "bubble",
        position: "top-center",
        duration: 5000,
      });
    },
  },
};
</script>

<style>
.float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #0c9;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
}

.my-float {
  margin-top: 22px;
}
</style>