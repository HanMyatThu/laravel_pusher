<template>
    <v-container>
        <div v-if='content'>
            <reply v-for="(reply,index) in content" :key='index' :index='index' :data='reply'>

            </reply>
        </div>
    </v-container>
</template>

<script>
import Reply from './reply';
import AuthHeader from '../../Helpers/AuthHeader';
export default {
    components: {
        Reply
    },
    data() {
        return {
            content: this.question.replies
        }
    },
    props : ['question'],
    mounted() {
        this.listen()
    },
    methods: {
        listen() {
            EventBus.$on('newReply', (reply) => {
                this.content.unshift(reply);
            });

            EventBus.$on('deleteReply', (index) => {
                const headers = AuthHeader.getHeaders();
                axios.delete(`/api/questions/${ this.question.slug }/replies/${this.content[index].id}`,{headers})
                .then(res => console.log('deleted'))
                .catch(e => console.log(e));
                this.content.splice(index,1);
            })
        }
    }
}
</script>
