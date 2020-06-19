<template>
    <v-container>
        <v-row>
            <v-col md='6' offset-md='3'>
                <v-form @submit.prevent='createCategory'>
                    <v-text-field
                        label='Category Name'
                        v-model='form.name'
                        required>

                    </v-text-field>

                    <v-btn type='submit' color='info' v-if='editSlug'>Update</v-btn>
                    <v-btn type='submit' color='teal' v-else>Create</v-btn>

                </v-form>


            <v-card
                class="mx-auto mt-5"
                tile
            >
                <v-toolbar color='indigo' dark dense>
                    <v-toolbar-title>Current Categories</v-toolbar-title>
                </v-toolbar>


                <v-list dense>
                    <div v-for='(category,index) in categories' :key='category.id'>
                        <v-list-item>
                            <v-list-item-action>
                                <v-btn icon small color='orange' @click='edit(index)'>
                                    <v-icon>mdi-brush</v-icon>
                                </v-btn>
                            </v-list-item-action>

                            <v-list-item-title>{{ category.name }}</v-list-item-title>

                            <v-list-item-action>
                                 <v-btn icon small color='red' @click='destory(category.slug,index)'>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider></v-divider>
                    </div>

                </v-list>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import AuthHeader from '../../Helpers/AuthHeader';
export default {
    data() {
        return {
            form: {
                name: null,
            },
            categories: {},
            editSlug: null
        }
    },
    created() {
        if(!User.admin()) {
            this.$router.push('/forum');
        }

        const headers = AuthHeader.getHeaders();
        axios.get('/api/categories',{headers})
            .then(res => this.categories = res.data)
            .catch(e => console.log(e.response.data));
    },
    methods: {
        createCategory() {
            this.editSlug ? this.update() : this.create();
        },
        create() {
            const headers = AuthHeader.getHeaders();
            axios.post('/api/categories',this.form, {headers})
                .then(res => {
                    this.categories.unshift(res.data);
                    this.form.name = null;
                })
                .catch(e => console.log(e.response.data));
        },
        update() {
            const headers = AuthHeader.getHeaders();
            axios.patch(`/api/categories/${this.editSlug}`,this.form, {headers})
                .then(res => {
                    this.categories.unshift(res.data);
                    this.form.name = null;
                    this.editSlug = null;
                })
                .catch(e => console.log(e.response.data));
        },
        destory(slug,index) {
            const headers = AuthHeader.getHeaders();
            axios.delete(`/api/categories/${slug}`,{headers})
                .then(res => this.categories.splice(index,1))
                .catch(e => console.log(e.response.data));
        },
        edit(index) {
            this.form.name = this.categories[index].name;
            this.editSlug =  this.categories[index].slug;
            this.categories.splice(index,1);
        }
    }
}
</script>
