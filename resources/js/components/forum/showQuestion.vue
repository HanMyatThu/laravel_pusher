<template>
    <v-card>
        <v-container fluid>
            <v-card-title>
                <div>
                    <div class="headling">
                        <h5>{{ data.title }}</h5>
                    </div>
                    <span class="grey--text">
                        {{data.user}} said {{ data.created_at}}
                    </span>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="teal" dark>{{ data.reply_count }} Replies</v-btn>
            </v-card-title>
            <v-card-text v-html="body"></v-card-text>

            <v-card-actions v-if="own">
                <v-btn icon color='green' @click='edit'>
                    <v-icon>mdi-brush</v-icon>
                </v-btn>
                 <v-btn icon color='red' @click='destroy'>
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>
<script>
import AuthHeader from '../../Helpers/AuthHeader';
export default {
    props: ['data'],
    data() {
        return {
            own: User.own(this.data.user_id)
        }
    },
    computed:{
        body() {
            return md.parse(this.data.body);
        }
    },
    methods: {
        destroy() {
            const headers = AuthHeader.getHeaders();
            axios.delete(`/api/questions/${this.data.slug}`, {headers})
                .then(res => this.$router.push('/forum'))
                .catch(e => console.log(e.response.data));
        },
        edit() {
            EventBus.$emit('startEditing')
        }
    }
}
</script>
