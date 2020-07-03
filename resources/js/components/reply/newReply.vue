<template>
    <v-container class="mt-4">
        <v-row>
            <v-col md='12'>
                <vue-simplemde v-model="form.body" ref="markdownEditor" />
                <v-btn
                color="success"
                type="submit"
                @click="submit"
                >
                Submit
                </v-btn>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AuthHeader from '../../Helpers/AuthHeader';
import VueSimplemde from 'vue-simplemde';
export default {
    props: ['Questionslug'],
    components: {
        VueSimplemde
    },
    data() {
        return {
            form : {
                body: '',
            }
        }
    },
    methods: {
        submit() {
            const headers = AuthHeader.getHeaders();
            axios.post(`/api/questions/${this.Questionslug}/replies`,this.form,{headers})
            .then(res => {
                this.form.body = '';
                EventBus.$emit('newReply',res.data);

            }).catch(e =>
            console.log(e))
        }
    }
}
</script>
