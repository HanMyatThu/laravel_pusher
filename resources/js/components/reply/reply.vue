<template>
    <v-container class="mt-3">
        <v-card>
            <v-card-title>
                <div class="headline">{{ data.user }}</div>
                <div class="ml-3"> said {{ data.created_at }}</div>
            </v-card-title>
            <v-divider></v-divider>
            <edit-reply v-if="editing" :reply=data>

            </edit-reply>

             <v-card-text v-else v-html="reply">
            </v-card-text>

            <v-divider></v-divider>
            <div v-if='!editing'>
                <v-card-actions v-if="own">
                    <v-btn icon color='green' @click='edit'>
                        <v-icon>mdi-brush</v-icon>
                    </v-btn>
                    <v-btn icon color='red' @click="destroy">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import editReply from './editReply';
export default {
    data() {
        return {
            editing : false
        }
    },
    components : {
        editReply
    },
    props: ['data','index'],
    computed: {
        own() {
            return User.own(this.data.user_id);
        },
        reply() {
            return md.parse(this.data.reply);
        }
    },
    methods: {
        destroy() {
            EventBus.$emit('deleteReply', this.index);
        },
        edit() {
            this.editing = true;
        },
        listen() {
            EventBus.$on('cancelEditing', () => {
                this.editing = false;
            });
        }
    },
    mounted() {
        this.listen();
    }
}
</script>
