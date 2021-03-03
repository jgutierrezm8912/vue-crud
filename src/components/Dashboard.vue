<template>
  <div id="dashboard">
    <!-- this is where table starts-->
    <div class="container">
      <br />
      <div class="row">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr style="text-align: center">
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Email</th>
                <th scope="col">City</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style="text-align: center"
                v-for="(user, index) in users"
                v-bind:key="user.id"
              >
                <td>{{ user.firstname }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user["address"].city }}</td>
                <td>
                  <router-link
                    v-bind:to="{ name: 'view-user', params: { id: index } }"
                  >
                    <button type="button" class="btn btn-primary">
                      <i class="fa fa-eye"></i>
                    </button>
                  </router-link>
                  <router-link
                    v-bind:to="{ name: 'edit-user', params: { id: index } }"
                  >
                    <button type="button" class="btn btn-success">
                      <i class="fa fa-edit"></i>
                    </button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- this is where table ends-->
    <div>
      <router-link to="/new" class="float">
        <i class="fa fa-plus my-float"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
const SERVER_URL = "https://crud-challenge-74b3d-default-rtdb.firebaseio.com";
export default {
  name: "dashboard",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getGames() {
      const url = SERVER_URL + "/users.json";
      const r = await fetch(url);
      this.users = await r.json();
    },
  },
  async mounted() {
    await this.getGames();
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