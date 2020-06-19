<template>
    <v-container>
        <v-form>
            <v-form @submit.prevent='update'>
                <v-text-field
                v-model="form.title"
                label="Title"
                type="text"
                required
                ></v-text-field>

                <vue-simplemde v-model="form.body" ref="markdownEditor" />

                <v-card-actions>
                    <v-btn icon small color="success" type='submit'><v-icon>mdi-brush</v-icon></v-btn>
                    <v-btn icon small color="teal" @click='cancel'><v-icon>mdi-cancel</v-icon></v-btn>
                </v-card-actions>

            </v-form>
        </v-form>
    </v-container>
</template>

<script>
import VueSimplemde from 'vue-simplemde'
import AuthHeader from '../../Helpers/AuthHeader';

export default {
    components: {
        VueSimplemde
    },
    data() {
        return {
            form: {
                title : null,
                category_id : null,
                body: null,
            },
            errors: {}
        }
    },
    props: ['data'],
    methods:  {
        cancel() {
            EventBus.$emit('cancelEditing');
        },
        update() {
            const headers = AuthHeader.getHeaders();
            axios.patch(`/api/questions/${this.form.slug}`,this.form, {headers})
                .then(res => this.cancel())
                .catch(e => this.errors = e.response.data);
        }
    },
    mounted() {
        this.form = this.data;
    }
}
</script>
