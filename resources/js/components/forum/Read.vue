<template>
    <div v-if='question'>
        <edit-question
            :data=question
            v-if='editing'>
        </edit-question>
        <show-question
            v-else
            :data=question
        >
        </show-question>
        <replies :question='question'></replies>

        <new-reply :Questionslug='question.slug'></new-reply>
    </div>
</template>

<script>
import AuthHeader from '../../Helpers/AuthHeader';
import showQuestion from './showQuestion';
import editQuestion from './editQuestion';
import Replies from '../reply/replies'
import newReply from '../reply/newReply';
export default {
    components: {
        showQuestion,
        editQuestion,
        Replies,
        newReply
    },
    data() {
        return {
            question: null,
            editing : false
        }
    },
    created() {
        this.listen();
        this.getQuestion();
    },
    methods: {
        listen() {
            EventBus.$on('startEditing', () => {
                this.editing = true;
            })

            EventBus.$on('cancelEditing', () => {
                this.editing = false;
            })
        },
        getQuestion() {
            const headers = AuthHeader.getHeaders();
            axios.get(`/api/questions/${this.$route.params.slug}`,{headers})
                .then(res => {
                    this.question = res.data.data
                })
                .catch(e => console.log(e.response.data))
        }
    }
}
</script>
