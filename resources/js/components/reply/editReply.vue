<template>
    <v-container class="mt-4">
        <v-row>
            <v-col md='12'>
                <vue-simplemde v-model="reply.reply" ref="markdownEditor" />
                <v-card-actions>
                    <v-btn icon color='green' @click='update'>
                        Save
                    </v-btn>
                    <v-btn icon color='red' @click="cancel">
                        <v-icon>mdi-cancel</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import AuthHeader from '../../Helpers/AuthHeader';
import VueSimplemde from 'vue-simplemde';
export default {
    data() {
        return {

        }
    },
    components: {
        VueSimplemde
    },
    props: ['reply'],
    methods: {
        update() {
            const headers = AuthHeader.getHeaders();
            axios.patch(`/api/questions/${this.reply.question_slug}/replies/${this.reply.id}`, {body: this.reply.reply},{headers})
                .then(res => this.cancel())
                .catch(e => console.log(e));
        },
        cancel() {
            EventBus.$emit('cancelEditing');
        }
    }
}
</script>
