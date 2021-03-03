<template>
    <div id="view-user">
        <br>
        <div class="card">
        <div class="card-header">
            <div class="float-left" style="font-size: 150%;">
                {{firstname}} {{lastname}}
            </div>
            <div class="float-right">
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash"></i></button>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title">User's information:</h5>
            <ul>
                <li><strong>Email:</strong> {{email}}</li>
                <li><strong>Birthdate:</strong> {{birthdate}}</li>
                <li><strong>Address:</strong> {{address.street}} - <strong>City:</strong> {{address.city}}</li>
                <li><strong>Country:</strong> {{address.country}} - <strong>Postal code:</strong> {{address.postalcode}}</li>
            </ul>
            <router-link to="/">
               <button type="button" class="btn btn-primary"><i class="fa fa-arrow-left"> Return to Dashboard</i></button>
            </router-link>
            
        </div>
        </div>

        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Delete user</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete "{{firstname}} {{lastname}}" with id "{{id}}"
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="deleteUser" type="button" class="btn btn-danger">Delete</button>
                </div>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="{name: 'edit-user', params: {id: id}}" class="float">
                <i class="fa fa-pencil my-float"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'view-user',
    data() {
        return {
            id: null,
            firstname: null,
            lastname: null,
            email: null,
            birthdate: null,
            address: {}
        }
    },
    // this is gonna run before the page loads
    beforeRouteEnter (to, from, next) {
        db.collection('users').where('id', '==', Number(to.params.id)).get()
        .then(querySnapShot => {
            querySnapShot.forEach(doc => {
                next(vm => {
                    vm.id = doc.data().id
                    vm.firstname = doc.data().firstname
                    vm.lastname = doc.data().lastname
                    vm.birthdate = doc.data().birthDate
                    vm.email = doc.data().email
                    vm.address = doc.data().address
                })
            })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            db.collection('users').where('id', '==', this.$route.params.id).get()
            .then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    this.id = doc.data().id,
                    this.firstname = doc.data().firstname,
                    this.lastname = doc.data().lastname,
                    this.birthdate = doc.data().birthDate,
                    this.email = doc.data().email,
                    this.address = doc.data().address
                })
            })
        },
        deleteUser () {
            $('#deleteModal').modal('hide');
            db.collection('users').where('id', '==', this.$route.params.id).get()
            .then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    doc.ref.delete()
                    this.$router.push("/")  
                    location.reload()                
                })
            })
        }
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