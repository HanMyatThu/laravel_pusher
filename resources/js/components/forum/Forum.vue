<template>
   <v-container fluid grid-list-md>
       <v-layout>
           <v-flex xs8>
               <question
                v-for='question in questions'
                :key='question.path'
                :data=question
                >

               </question>
           </v-flex>
           <v-flex xs4>
               <h1>side bar</h1>
           </v-flex>
       </v-layout>
   </v-container>
</template>

<script>
import question from './Question'
import AuthHeader from '../../Helpers/AuthHeader';
export default {
    data() {
        return {
            questions: null
        }
    },
    components: {question},
    created() {
        const headers = AuthHeader.getHeaders();
        axios.get('/api/questions', { headers })
            .then(res => this.questions = res.data.data)
            .catch(e => console.log(e.response.data));
    }
}
</script>
