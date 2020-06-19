<template>
    <v-container>
        <v-row>
            <v-col md='6' offset-md='3'>
                <v-form @submit.prevent='createQuestion' >
                    <v-text-field
                    v-model="form.title"
                    label="Title"
                    type="text"
                    required
                    ></v-text-field>

                    <v-autocomplete
                        v-model="form.category_id"
                        :items="categories"
                        item-text='name'
                        item-value='id'
                        outlined
                        dense
                        chips
                        small-chips
                        label="Category"
                    ></v-autocomplete>

                    <vue-simplemde v-model="form.body" ref="markdownEditor" />

                    <v-btn
                    color="success"
                    type="submit"
                    >
                    Create
                    </v-btn>

                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AuthHeader from '../../Helpers/AuthHeader';
import VueSimplemde from 'vue-simplemde'
export default {
    components: {
      VueSimplemde
    },
    data() {
        return {
            categories: [],
            form: {
                title : null,
                category_id : null,
                body: null,
            },
            errors: {}
        }
    },
    created() {
        const headers = AuthHeader.getHeaders();
        axios.get('/api/categories', {headers})
            .then(res => {
                this.categories = res.data;
            })
            .catch(e => console.log(e.response.data));
    },
    methods: {
        createQuestion() {
            const headers = AuthHeader.getHeaders();
            axios.post('/api/questions',this.form, {headers})
                .then(res => this.$router.push(res.data.path))
                .catch(e => this.errors =  e.response.data.errors);
        }
    }
}
</script>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>
