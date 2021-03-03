<template>
    <div id="dashboard">        
        <!-- this is where table starts-->
        <div class="container">
            <br>
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
                    <tr style="text-align: center" v-for="user in users" v-bind:key="user.id">
                        <td>{{user.firstname}}</td>
                        <td>{{user.lastname}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user['address'].city}}</td>
                        <td>
                        <router-link v-bind:to="{name: 'view-user', params: {id: user.id}}">
                            <button type="button" class="btn btn-primary"><i class="fa fa-eye"></i></button>
                        </router-link>
                        <router-link v-bind:to="{name: 'edit-user', params: {id: user.id}}">
                            <button type="button" class="btn btn-success"><i class="fa fa-edit"></i></button>
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
import db from './firebaseInit'
export default {
    name: 'dashboard',
    data() {
        return {
            users: []
        }
    },
    // this is gonna run when component is created, so it is gonna fetch data from firebase
    created () {
        db.collection('users').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.data().id,
                    'firstname': doc.data().firstname,
                    'lastname': doc.data().lastname,
                    'email': doc.data().email,
                    'birthdate': doc.data().birthdate,
                    'address': {
                        'id': doc.data().address.id,
                        'street': doc.data().address.street,
                        'city': doc.data().address.city,
                        'country': doc.data().address.country,
                        'postalcode': doc.data().address.postalcode
                    }
                }

                this.users.push(data)
            })
        })
    }
}
</script>

<style>
    .float{
        position:fixed;
        width:60px;
        height:60px;
        bottom:40px;
        right:40px;
        background-color:#0C9;
        color:#FFF;
        border-radius:50px;
        text-align:center;
        box-shadow: 2px 2px 3px #999;
    }

    .my-float{
        margin-top:22px;
    }
</style>